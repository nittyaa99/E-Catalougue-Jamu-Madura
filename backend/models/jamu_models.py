from models.kabupaten_models import db
from models.jenis_models import JenisJamu  # ← Tambah import ini


class Jamu(db.Model):
    __tablename__ = "jamu"

    id_jamu = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_jamu = db.Column(db.String(150), nullable=False)
    khasiat = db.Column(db.Text, nullable=True)
    kandungan = db.Column(db.Text, nullable=True)
    aturan_minum = db.Column(db.Text, nullable=True)
    efek_samping = db.Column(db.Text, nullable=True)
    image = db.Column(db.Text, nullable=True)

    id_jenis = db.Column(db.Integer, db.ForeignKey("jenis.id_jenis"), nullable=True)
    id_produsen = db.Column(db.Integer, db.ForeignKey("produsen.id_produsen"), nullable=True)
    id_lokasi_produksi = db.Column(db.Integer, db.ForeignKey("lokasi_produksi.id_lokasi_produksi"), nullable=True)
    id_kabupaten = db.Column(db.Integer, db.ForeignKey("kabupaten.id_kabupaten"), nullable=True)
    id_perizinan = db.Column(db.Integer, db.ForeignKey("perizinan.id_perizinan"), nullable=True)
    id_lokasi_pemasaran = db.Column(db.Integer, db.ForeignKey("lokasi_pemasaran.id_lokasi_pemasaran"), nullable=True)

    # ← TAMBAH RELATIONSHIP INI:
    jenis_rel = db.relationship('JenisJamu', backref='jamu_list', lazy=True)
    kabupaten_rel = db.relationship('Kabupaten', backref='jamu_list', lazy=True)

    def to_dict(self):
        return {
            "id_jamu": self.id_jamu,
            "nama_jamu": self.nama_jamu,
            "khasiat": self.khasiat,
            "kandungan": self.kandungan,
            "aturan_minum": self.aturan_minum,
            "efek_samping": self.efek_samping,
            "image": self.image,
            "id_jenis": self.id_jenis,
            "id_produsen": self.id_produsen,
            "id_lokasi_produksi": self.id_lokasi_produksi,
            "id_kabupaten": self.id_kabupaten,
            "id_perizinan": self.id_perizinan,
            "id_lokasi_pemasaran": self.id_lokasi_pemasaran,
            # ← UNCOMMENT INI:
            "nama_jenis": self.jenis_rel.nama_jenis if self.jenis_rel else "Tanpa Jenis",
            "nama_kabupaten": self.kabupaten_rel.nama_kabupaten if self.kabupaten_rel else "Lokal"
        }