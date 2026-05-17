CREATE TABLE kabupaten (
    id_kabupaten INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_kabupaten TEXT
);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE jenis (
    id_jenis INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jenis TEXT
);
CREATE TABLE perizinan (
    id_perizinan INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_perizinan TEXT
);
CREATE TABLE lokasi_pemasaran (
    id_lokasi_pemasaran INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lokasi_pemasaran TEXT
);
CREATE TABLE produsen (
    id_produsen INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_produsen TEXT,
    id_kabupaten INTEGER,
    FOREIGN KEY (id_kabupaten) REFERENCES kabupaten(id_kabupaten)
);
CREATE TABLE lokasi_produksi (
    id_lokasi_produksi INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lokasi_produksi TEXT,
    id_kabupaten INTEGER,
    FOREIGN KEY (id_kabupaten) REFERENCES kabupaten(id_kabupaten)
);
CREATE TABLE jamu (
    id_jamu INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jamu TEXT,
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