from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Perizinan(db.Model): 
    __tablename__ = "perizinan"

    id_perizinan = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    nama_perizinan = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_perizinan": self.id_jenis,
            "nama_perizinan": self.nama_jenis
        }