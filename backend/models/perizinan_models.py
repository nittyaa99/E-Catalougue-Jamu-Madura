from models.kabupaten_models import db

class Perizinan(db.Model): 
    __tablename__ = "perizinan"

    id_perizinan = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    nama_perizinan = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_perizinan": self.id_perizinan,
            "nama_perizinan": self.nama_perizinan
        }