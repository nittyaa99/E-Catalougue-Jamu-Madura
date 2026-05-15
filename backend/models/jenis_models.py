# models/jenis_models.py
from models.kabupaten_models import db # <--- Ambil dari pusat

class JenisJamu(db.Model): 
    __tablename__ = "jenis"

    id_jenis = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_jenis = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_jenis": self.id_jenis,
            "nama_jenis": self.nama_jenis
        }