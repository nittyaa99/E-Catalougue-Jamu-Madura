import csv
import sqlite3
from pathlib import Path

# =========================
# CONNECT DATABASE
# =========================
conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# =========================
# NORMALISASI VALUE
# =========================
def normalize_value(value):
    """
    Membersihkan data:
    - None -> None
    - hapus spasi depan belakang
    - kosong -> None
    - ubah jadi lowercase
    """

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

    # cek data dulu
    cursor.execute(
        f"""
        SELECT id_{table}
        FROM {table}
        WHERE LOWER(TRIM({column})) = ?
        """,
        (value,)
    )

    result = cursor.fetchone()

    # kalau ada langsung return id
    if result:
        return result[0]

    # insert kalau belum ada
    cursor.execute(
        f"""
        INSERT INTO {table} ({column})
        VALUES (?)
        """,
        (value,)
    )

    conn.commit()

    return cursor.lastrowid


# =========================
# MIGRASI CSV
# =========================
def migrate_csv():

    csv_file = "Dataset jamu madura(with img).csv"

    # cek file ada atau tidak
    if not Path(csv_file).exists():
        print(f"❌ File {csv_file} tidak ditemukan")
        return

    with open(csv_file, newline='', encoding='utf-8') as file:

        reader = csv.DictReader(file)

        success = 0
        failed = 0

        for index, row in enumerate(reader, start=1):

            try:

                # =========================
                # AMBIL FOREIGN KEY
                # =========================
                id_jenis = get_or_create(
                    "jenis",
                    "nama_jenis",
                    row.get("JENIS")
                )

                id_produsen = get_or_create(
                    "produsen",
                    "nama_produsen",
                    row.get("PRODUSEN")
                )

                id_kabupaten = get_or_create(
                    "kabupaten",
                    "nama_kabupaten",
                    row.get("KABUPATEN")
                )

                id_perizinan = get_or_create(
                    "perizinan",
                    "nama_perizinan",
                    row.get("PERIZINAN")
                )

                id_lokasi_produksi = get_or_create(
                    "lokasi_produksi",
                    "nama_lokasi_produksi",
                    row.get("LOKASI PRODUKSI")
                )

                id_lokasi_pemasaran = get_or_create(
                    "lokasi_pemasaran",
                    "nama_lokasi_pemasaran",
                    row.get("LOKASI PEMASARAN")
                )

                # =========================
                # INSERT DATA JAMU
                # =========================
                cursor.execute("""
                    INSERT INTO jamu (
                        nama_jamu,
                        khasiat,
                        kandungan,
                        aturan_minum,
                        efek_samping,
                        image,
                        id_jenis,
                        id_produsen,
                        id_lokasi_produksi,
                        id_kabupaten,
                        id_perizinan,
                        id_lokasi_pemasaran
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row.get("NAMA JAMU"),
                    row.get("KHASIAT"),
                    row.get("KANDUNGAN"),
                    row.get("ATURAN MINUM"),
                    row.get("EFEK SAMPING"),
                    row.get("image"),
                    id_jenis,
                    id_produsen,
                    id_lokasi_produksi,
                    id_kabupaten,
                    id_perizinan,
                    id_lokasi_pemasaran
                ))

                success += 1

                print(f"✅ Baris {index} berhasil")

            except Exception as e:

                failed += 1

                print(f"\n❌ Error pada baris {index}")
                print(e)
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