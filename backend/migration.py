import csv
import os
import sqlite3
import re  # <--- 🔥 SEKARANG AKTIF: Untuk membongkar HTML Google Photos
from pathlib import Path
import requests  # <-- Pastikan sudah running 'pip install requests'

# =========================
# CONFIG & CONNECT DATABASE
# =========================
conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# Buat folder penyimpanan gambar otomatis jika belum ada
UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Header palsu biar Shopee/Tokopedia/Blibli lolos Anti-Bot (Anti-403)
HTTP_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# ========================================================
# 🔥 PONDASI: OTOMATIS BUAT TABEL JIKA BELUM ADA DI DB
# ========================================================
cursor.executescript("""
CREATE TABLE IF NOT EXISTS kabupaten (
    id_kabupaten INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_kabupaten TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS jenis (
    id_jenis INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jenis TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS perizinan (
    id_perizinan INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_perizinan TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS lokasi_pemasaran (
    id_lokasi_pemasaran INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lokasi_pemasaran TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS produsen (
    id_produsen INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_produsen TEXT NOT NULL,
    id_kabupaten INTEGER,
    FOREIGN KEY (id_kabupaten) REFERENCES kabupaten(id_kabupaten)
);
CREATE TABLE IF NOT EXISTS lokasi_produksi (
    id_lokasi_produksi INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lokasi TEXT NOT NULL,
    id_kabupaten INTEGER,
    FOREIGN KEY (id_kabupaten) REFERENCES kabupaten(id_kabupaten)
);
CREATE TABLE IF NOT EXISTS jamu (
    id_jamu INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jamu TEXT NOT NULL,
    khasiat TEXT,
    kandungan TEXT,
    aturan_minum TEXT,
    efek_samping TEXT,
    id_jenis INTEGER,
    id_produsen INTEGER,
    id_lokasi_produksi INTEGER,
    id_kabupaten INTEGER,
    id_perizinan INTEGER,
    id_lokasi_pemasaran INTEGER,
    image TEXT,
    FOREIGN KEY (id_jenis) REFERENCES jenis(id_jenis),
    FOREIGN KEY (id_produsen) REFERENCES produsen(id_produsen),
    FOREIGN KEY (id_lokasi_produksi) REFERENCES lokasi_produksi(id_lokasi_produksi),
    FOREIGN KEY (id_kabupaten) REFERENCES kabupaten(id_kabupaten),
    FOREIGN KEY (id_perizinan) REFERENCES perizinan(id_perizinan),
    FOREIGN KEY (id_lokasi_pemasaran) REFERENCES lokasi_pemasaran(id_lokasi_pemasaran)
);
""")
conn.commit()
print("✔ Pengecekan struktur tabel selesai. Semua tabel aman!")


# =========================
# NORMALISASI VALUE
# =========================
def normalize_value(value):
    if value is None:
        return None
    value = str(value).strip()
    if value == "":
        return None
    return value.lower()


# =========================
# GET ATAU CREATE DATA
# =========================
def get_or_create(table, column, value):
    value = normalize_value(value)
    if value is None:
        return None

    cursor.execute(
        f"SELECT id_{table} FROM {table} WHERE LOWER(TRIM({column})) = ?",
        (value,)
    )
    result = cursor.fetchone()

    if result:
        return result[0]

    cursor.execute(
        f"INSERT INTO {table} ({column}) VALUES (?)",
        (value,)
    )
    conn.commit()
    return cursor.lastrowid


# =========================
# FUNGSI AUTO DOWNLOAD GAMBAR (Mendukung GDrive & GPhotos)
# =========================
def download_jamu_image(url, index):
    """
    Mendeteksi jika gambar berupa link internet (Shopee/Blibli/GDrive/GPhotos), 
    mengonversinya jika perlu, lalu mendownloadnya menjadi file lokal.
    """
    if not url:
        return None
        
    url = str(url).strip()
    
    if url.startswith("http"):
        # === 🎯 KASUS 1: LOGIKA JINAKKAN LINK GOOGLE DRIVE ===
        if "drive.google.com" in url:
            file_id = None
            try:
                if "/d/" in url:
                    file_id = url.split("/d/")[1].split("/")[0]
                elif "id=" in url:
                    file_id = url.split("id=")[1].split("&")[0]
                
                if file_id:
                    url = f"https://docs.google.com/uc?export=download&id={file_id}"
                    print(f"🔗 Baris {index}: Berhasil bypass & konversi link Google Drive")
                else:
                    print(f"⚠️  Baris {index}: Gagal mengekstrak ID Google Drive.")
                    return None
            except Exception:
                print(f"⚠️  Baris {index}: Format link Google Drive rusak/tidak dikenali.")
                return None

        # === 📸 KASUS 2: LOGIKA DETEKSI & BONGKAR LINK GOOGLE PHOTOS ===
        elif "share.google" in url or "photos.google.com" in url:
            try:
                print(f"📸 Baris {index}: Mendeteksi link Google Photos. Membongkar HTML halaman...")
                # Kunjungi link pendeknya dan ikuti redirect sampai ke galeri aslinya
                response_web = requests.get(url, headers=HTTP_HEADERS, timeout=15, allow_redirects=True)
                
                # Cari tag meta og:image di dalam tumpukan kode HTML web Google
                match = re.search(r'property="og:image"\s+content="([^"]+)"', response_web.text)
                if not match:
                    match = re.search(r'content="([^"]+)"\s+property="og:image"', response_web.text)
                    
                if match:
                    # Ganti URL tujuan ke direct link biner gambar yang tersembunyi
                    url = match.group(1)
                    print(f"✅ Baris {index}: Sukses mengekstrak Direct Link Google Photos!")
                else:
                    print(f"⚠️  Baris {index}: Gagal menemukan meta foto di Google Photos (Mungkin album privat).")
                    return None
            except Exception as e:
                print(f"⚠️  Baris {index}: Error saat membedah Google Photos: {e}")
                return None

        # === 🚀 PROSES DOWNLOAD FILE FISIK ===
        try:
            filename = f"jamu_{index}.jpg"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            
            response = requests.get(url, headers=HTTP_HEADERS, timeout=15)
            
            if response.status_code == 200:
                # Cek isi konten. Kalau mengembalikan teks HTML (berarti link mati/privat)
                content_type = response.headers.get("Content-Type", "")
                if "text/html" in content_type:
                    print(f"❌ Baris {index}: Gagal! Server mengembalikan HTML web, bukan file gambar biner asli.")
                    return None

                with open(filepath, 'wb') as f:
                    f.write(response.content)
                return filename 
            else:
                print(f" ⚠️  Gambar baris {index} gagal didownload (Status: {response.status_code})")
                return None
        except Exception as e:
            print(f" ⚠️  Error download gambar baris {index}: {e}")
            return None
            
    return url


# =========================
# MIGRASI CSV
# =========================
def migrate_csv():
    csv_file = "Dataset jamu madura(with img).csv"

    if not Path(csv_file).exists():
        print(f"❌ File {csv_file} tidak ditemukan")
        return

    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        success = 0
        failed = 0

        print("\n🚀 Memulai Proses Migrasi dan Auto-Download Gambar (Shopee, GDrive, & GPhotos)...\n")

        for index, row in enumerate(reader, start=1):
            try:
                # 1. AMBIL FOREIGN KEY
                id_jenis = get_or_create("jenis", "nama_jenis", row.get("JENIS"))
                id_produsen = get_or_create("produsen", "nama_produsen", row.get("PRODUSEN"))
                id_kabupaten = get_or_create("kabupaten", "nama_kabupaten", row.get("KABUPATEN"))
                id_perizinan = get_or_create("perizinan", "nama_perizinan", row.get("PERIZINAN"))
                id_lokasi_pemasaran = get_or_create("lokasi_pemasaran", "nama_lokasi_pemasaran", row.get("LOKASI PEMASARAN"))
                
                # SINKRON: Menggunakan "nama_lokasi" sesuai dengan skema tabel SQLite asli Abang
                id_lokasi_produksi = get_or_create("lokasi_produksi", "nama_lokasi", row.get("LOKASI PRODUKSI"))

                # 2. PROSES DOWNLOAD GAMBAR INTERNET KE LOKAL
                raw_image_url = row.get("image")
                final_image_value = download_jamu_image(raw_image_url, index)

                # 3. INSERT DATA JAMU DENGAN NAMA FILENAME LOKAL
                cursor.execute("""
                    INSERT INTO jamu (
                        nama_jamu, khasiat, kandungan, aturan_minum, efek_samping, image,
                        id_jenis, id_produsen, id_lokasi_produksi, id_kabupaten, id_perizinan, id_lokasi_pemasaran
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("NAMA JAMU"),
                    row.get("KHASIAT"),
                    row.get("KANDUNGAN"),
                    row.get("ATURAN MINUM"),
                    row.get("EFEK SAMPING"),
                    final_image_value,
                    id_jenis,
                    id_produsen,
                    id_lokasi_produksi,
                    id_kabupaten,
                    id_perizinan,
                    id_lokasi_pemasaran
                ))

                success += 1
                print(f"✅ Baris {index} sukses dimasukkan")

            except Exception as e:
                failed += 1
                print(f"\n❌ Error pada baris {index}: {e}")
                print(row)

    # =========================
    # SAVE DATABASE
    # =========================
    conn.commit()
    conn.close()

    print("\n====================")
    print("🚀 MIGRASI SELESAI")
    print("====================")
    print(f"✅ Berhasil : {success}")
    print(f"❌ Gagal    : {failed}")


# =========================
# RUN PROGRAM
# =========================
if __name__ == "__main__":
    migrate_csv()