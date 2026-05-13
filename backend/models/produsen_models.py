from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Produsen(db.Model): 
    __tablename__ = "produsen"

    id_produsen = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_produsen = db.Column(db.String(100), nullable=False)

    # PERBAIKAN: Huruf besar dan benerin tulisan ForeignKey
    id_kabupaten = db.Column(db.Integer, db.ForeignKey('kabupaten.id_kabupaten'), nullable=True)

    def to_dict(self):
        return {
            "id_produsen": self.id_produsen,
            "nama_produsen": self.nama_produsen, 
            "id_kabupaten": self.id_kabupaten,
            "nama_kabupaten": self.kabupaten_relasi.nama_kabupaten if self.kabupaten_relasi else None
        }