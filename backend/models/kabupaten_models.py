from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class JenisJamu(db.Model): 
    __tablename__ = "kabupaten"

    id_kabupaten = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    nama_kabupaten = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_kabupaten": self.id_jenis,
            "nama_kabupaten": self.nama_jenis
        }