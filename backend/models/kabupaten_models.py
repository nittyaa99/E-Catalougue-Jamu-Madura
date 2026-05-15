from flask_sqlalchemy import SQLAlchemy

# Cukup di sini saja db dibuat
db = SQLAlchemy()

class Kabupaten(db.Model): 
    __tablename__ = "kabupaten"

    id_kabupaten = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_kabupaten = db.Column(db.String(100), nullable=False)
    
    # PERBAIKAN: Ganti 'produsen' jadi 'Produsen' (Sesuai nama Class)
    produsen_list = db.relationship('Produsen', backref='kabupaten_relasi', lazy=True)

    def to_dict(self):
        return {
            "id_kabupaten": self.id_kabupaten,
            "nama_kabupaten": self.nama_kabupaten
        }