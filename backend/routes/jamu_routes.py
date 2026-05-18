import os
import joblib  
from flask import Blueprint, jsonify, request
from models.jamu_models import db, Jamu
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from sklearn.base import BaseEstimator, TransformerMixin  # <-- Tambah ini untuk custom transformer pipeline

jamu_bp = Blueprint('jamu', __name__)

# Folder tempat berkas gambar fisik disimpan di backend
UPLOAD_FOLDER = os.path.join('static', 'uploads')


# ====================================================================
# 🧠 0A. DEFINISI CUSTOM CLASS TEXT PREPROCESSOR (SUNTIK NAMESPACE)
# ====================================================================
# Joblib mewajibkan struktur kelas ini ada di file eksekusi utama agar proses load .pkl lancar.
class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        # 💡 CATATAN: Jika di Jupyter Notebook kemarin class ini memiliki logika 
        # pembersihan teks khusus (case folding, stopword removal, dll), copas logikanya di sini.
        # Minimal pastikan mengembalikan list string agar pipeline skikit-learn tidak pecah.
        return [str(text) for text in X]

# ⚡ Trik sakti menyuntikkan kelas ke module __main__ Flask
import __main__
__main__.TextPreprocessor = TextPreprocessor


# ====================================================================
# 🤖 0B. LOAD MODEL MACHINE LEARNING (Otomatis melacak folder NLP)
# ====================================================================
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Folder /backend/routes
ROOT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))  # Mundur ke root project
MODEL_PATH = os.path.join(ROOT_DIR, "NLP", "nlp2", "model_pipeline.pkl")

print("\n==============================================")
print(f"🔬 Melacak Model ML ke: {MODEL_PATH}")
print("==============================================\n")

try:
    model_ml = joblib.load(MODEL_PATH)
    print("✅ Model Machine Learning Berhasil Dimuat!")
except Exception as e:
    print(f"⚠️ GAGAL MEMUAT MODEL ML: {e}")
    model_ml = None

# Fungsi Koreksi Typo Keluhan Bawaan NLP Abang
def typo_correction(text):
    # Tempel isi logika/kamus pembersihan typo buatan Abang di sini jika ada
    return text


# ====================================================================
# 🎯 1. GET ALL JAMU (Dipakai Dashboard untuk nampilin seluruh tabel)
# ====================================================================
@jamu_bp.route('/jamu', methods=['GET'])
@jwt_required()
def get_all_jamu():
    try:
        data_jamu = Jamu.query.all()
        hasil_json = [item.to_dict() for item in data_jamu] 

        return jsonify({
            "status": "success",
            "message": "Seluruh data Jamu berhasil diambil",
            "data": hasil_json
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 2. GET SINGLE JAMU BY ID (Dipakai Halaman Edit saat pertama dimuat)
# ====================================================================
@jamu_bp.route('/jamu/<int:id_jamu>', methods=['GET'])
@jwt_required()
def get_jamu_by_id(id_jamu):
    try:
        target = Jamu.query.get(id_jamu)
        if not target:
            return jsonify({"status": "error", "message": "Jamu tidak ditemukan"}), 404
            
        return jsonify({
            "status": "success",
            "message": "Detail data Jamu berhasil diambil",
            "data": target.to_dict()
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 3. INSERT (Tambah Jamu Baru - Support FormData dari React AddJamu)
# ====================================================================
@jamu_bp.route('/jamu', methods=['POST'])
@jwt_required()
def tambah_jamu():
    try:
        nama_jamu = request.form.get('nama_jamu')
        if not nama_jamu:
            return jsonify({"status": "error", "message": "Nama jamu tidak boleh kosong!"}), 400
        
        nama_file_gambar = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                
                if not os.path.exists(UPLOAD_FOLDER):
                    os.makedirs(UPLOAD_FOLDER)
                    
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                nama_file_gambar = filename

        jamu_baru = Jamu(
            nama_jamu=nama_jamu,
            khasiat=request.form.get('khasiat'),
            kandungan=request.form.get('kandungan'),
            aturan_minum=request.form.get('aturan_minum'),
            efek_samping=request.form.get('efek_samping'),
            image=nama_file_gambar,
            
            id_jenis=request.form.get('id_jenis'),
            id_produsen=request.form.get('id_produsen'),
            id_lokasi_produksi=request.form.get('id_lokasi_produksi'),
            id_kabupaten=request.form.get('id_kabupaten'),
            id_perizinan=request.form.get('id_perizinan'),
            id_lokasi_pemasaran=request.form.get('id_lokasi_pemasaran')
        )

        db.session.add(jamu_baru)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": f"Jamu {jamu_baru.nama_jamu} berhasil didaftarkan!"
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 4. UPDATE (Edit Jamu - Bersihkan Gambar Lama jika User Ganti Foto)
# ====================================================================
@jamu_bp.route('/jamu/<int:id_edit>', methods=['PUT'])
@jwt_required()
def edit_jamu(id_edit):
    try:
        target = Jamu.query.get(id_edit)
        if not target:
            return jsonify({"status": "error", "message": "Jamu tidak ditemukan"}), 404
        
        target.nama_jamu = request.form.get('nama_jamu', target.nama_jamu)
        target.khasiat = request.form.get('khasiat', target.khasiat)
        target.kandungan = request.form.get('kandungan', target.kandungan)
        target.aturan_minum = request.form.get('aturan_minum', target.aturan_minum)
        target.efek_samping = request.form.get('efek_samping', target.efek_samping)
        
        target.id_jenis = request.form.get('id_jenis', target.id_jenis)
        target.id_produsen = request.form.get('id_produsen', target.id_produsen)
        target.id_lokasi_produksi = request.form.get('id_lokasi_produksi', target.id_lokasi_produksi)
        target.id_kabupaten = request.form.get('id_kabupaten', target.id_kabupaten)
        target.id_perizinan = request.form.get('id_perizinan', target.id_perizinan)
        target.id_lokasi_pemasaran = request.form.get('id_lokasi_pemasaran', target.id_lokasi_pemasaran)

        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                if target.image:
                    path_gambar_lama = os.path.join(UPLOAD_FOLDER, target.image)
                    if os.path.exists(path_gambar_lama):
                        os.remove(path_gambar_lama)

                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                target.image = filename 

        db.session.commit()
        return jsonify({"status": "success", "message": "Data Jamu berhasil diupdate"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 5. DELETE (Hapus Baris DB + Otomatis Menyapu Bersih Berkas Gambar)
# ====================================================================
@jamu_bp.route('/jamu/<int:id_hapus>', methods=['DELETE'])
@jwt_required()
def hapus_jamu(id_hapus):
    try:
        target = Jamu.query.get(id_hapus)
        if not target:
            return jsonify({"status": "error", "message": "Data tidak ditemukan"}), 404
        
        if target.image:
            path_file_fisik = os.path.join(UPLOAD_FOLDER, target.image)
            if os.path.exists(path_file_fisik):
                os.remove(path_file_fisik) 

        db.session.delete(target)
        db.session.commit()
        return jsonify({"status": "success", "message": "Jamu beserta file gambarnya berhasil dihapus"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 6. GET ALL JAMU FOR PUBLIC (Dipakai Katalog Dashboard User Umum)
# ====================================================================
@jamu_bp.route('/jamu/public', methods=['GET'])
def get_public_jamu():
    try:
        data_jamu = Jamu.query.all()
        hasil_json = [item.to_dict() for item in data_jamu] 

        return jsonify({
            "status": "success",
            "message": "Data katalog jamu publik berhasil diambil",
            "data": hasil_json
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 7. GET UNIQUE FILTERS FOR PUBLIC (Dinamis dari Database)
# ====================================================================
@jamu_bp.route('/jamu/public-filters', methods=['GET'])
def get_public_filters():
    try:
        all_jamu = Jamu.query.all()
        all_jamu_dict = [item.to_dict() for item in all_jamu]
        
        if all_jamu_dict:
            print("\n==================================================================")
            print("🔬 ISI DATA JAMU PERTAMA:", all_jamu_dict[0])
            print("==================================================================\n")
        
        jenis_unik = sorted(list(set([item.get('nama_jenis') for item in all_jamu_dict if item.get('nama_jenis')])))
        kabupaten_unik = sorted(list(set([item.get('nama_kabupaten') for item in all_jamu_dict if item.get('nama_kabupaten')])))
        perizinan_unik = sorted(list(set([item.get('nama_perizinan') for item in all_jamu_dict if item.get('nama_perizinan')])))
        
        return jsonify({
            "status": "success",
            "message": "Data pilihan filter berhasil diekstrak",
            "data": {
                "jenis": jenis_unik,
                "kabupaten": kabupaten_unik,
                "perizinan": perizinan_unik
            }
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 8. POST RECOMMENDATION VIA ML PIPELINE (Menjawab Hasil Pencarian)
# ====================================================================
@jamu_bp.route('/jamu/recommend', methods=['POST', 'OPTIONS'])
def dapatkan_rekomendasi_ml():
    # 🔥 FIX 1: Cegat request OPTIONS (Preflight) dan langsung beri lampu hijau 200
    if request.method == 'OPTIONS':
        return jsonify({"status": "success"}), 200

    if model_ml is None:
        return jsonify({"status": "error", "message": "Model ML pkl tidak aktif di server", "data": []}), 500

    try:
        # 🔥 FIX 2: Tambahkan silent=True agar tidak melempar error 415 jika content-type meleset
        data = request.get_json(silent=True) or {}
        teks_input = data.get('keluhan', '')

        if not teks_input or not teks_input.strip():
            return jsonify({"status": "error", "message": "Teks keluhan tidak boleh kosong!"}), 400

        # 🧠 1. Jalankan NLP ML Pipeline milik Abang
        teks_terkoreksi = typo_correction(teks_input)
        label_prediksi = model_ml.predict([teks_terkoreksi])[0]
        probabilitas = model_ml.predict_proba([teks_terkoreksi]).max()

        print("\n================== 🧠 AI PREDICTION LOG ==================")
        print(f"Input User      : {teks_input}")
        print(f"Koreksi Typo    : {teks_terkoreksi}")
        print(f"Hasil Prediksi  : {label_prediksi}")
        print(f"Confidence Score: {probabilitas:.4f}")
        print("==========================================================\n")

        # 🔍 2. Ambil data jamu lengkap dari SQLite berdasarkan kecocokan Label Prediksi
        data_jamu = Jamu.query.filter(Jamu.khasiat.like(f"%{label_prediksi}%")).all()
        hasil_json = [item.to_dict() for item in data_jamu]

        return jsonify({
            "status": "success",
            "message": "Model AI berhasil meramu rekomendasi jamu",
            "prediksi_label": str(label_prediksi),
            "confidence": float(probabilitas),
            "data": hasil_json
        }), 200

    except Exception as e:
        print(f"❌ ERROR DI RUTE /recommend: {e}")
        return jsonify({"status": "error", "message": str(e), "data": []}), 500