from models.kabupaten_models import db 

class LokasiProduksi(db.Model): 
    __tablename__ = "lokasi_produksi"

    id_lokasi_produksi = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    # 🔥 INI YANG BIKIN ERROR TADI (Udah diganti jadi nama_lokasi)
    nama_lokasi = db.Column(db.String(100), nullable=False) 

    id_kabupaten = db.Column(db.Integer, db.ForeignKey('kabupaten.id_kabupaten'), nullable=True)

    kabupaten_relasi = db.relationship('Kabupaten', backref='lokasi_produksi_relasi')

    def to_dict(self):
        return {
            "id_lokasi_produksi": self.id_lokasi_produksi,
            "nama_lokasi": self.nama_lokasi,  # <--- Manggilnya juga nama_lokasi
            "id_kabupaten": self.id_kabupaten,
            "nama_kabupaten": self.kabupaten_relasi.nama_kabupaten if self.kabupaten_relasi else None
        }