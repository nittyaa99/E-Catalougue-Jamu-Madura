import os
from flask import Blueprint, jsonify, request
from models.jamu_models import db, Jamu
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename

jamu_bp = Blueprint('jamu', __name__)

# Folder untuk menyimpan gambar upload dari form react
UPLOAD_FOLDER = os.path.join('static', 'uploads')

# ====================================================================
# 🎯 1. GET ALL JAMU (Dipakai Dashboard untuk nampilin seluruh tabel)
# ====================================================================
@jamu_bp.route('/jamu', methods=['GET'])
@jwt_required()
def get_all_jamu():
    try:
        # Mengambil SEMUA data jamu untuk dashboard
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
        # Mengambil HANYA SATU data jamu sesuai ID yang diklik
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
# 🎯 3. INSERT (Tambah Jamu Baru - Support FormData & Gambar)
# ====================================================================
@jamu_bp.route('/jamu', methods=['POST'])
@jwt_required()
def tambah_jamu():
    try:
        # 🔥 DIUBAH: Pakai request.form karena React mengirim via FormData
        nama_jamu = request.form.get('nama_jamu')
        
        # Handle file gambar jika ada yang di-upload
        nama_file_gambar = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
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
# 🎯 4. UPDATE (Edit Jamu - Support FormData & Ganti Gambar)
# ====================================================================
@jamu_bp.route('/jamu/<int:id_edit>', methods=['PUT'])
@jwt_required()
def edit_jamu(id_edit):
    try:
        target = Jamu.query.get(id_edit)
        if not target:
            return jsonify({"status": "error", "message": "Jamu tidak ditemukan"}), 404
        
        # 🔥 DIUBAH: Ambil data dari request.form
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

        # Logika jika user mengupload gambar baru saat edit
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                target.image = filename # Ganti nama file gambar di DB dengan yang baru

        db.session.commit()
        return jsonify({"status": "success", "message": "Data Jamu berhasil diupdate"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


# ====================================================================
# 🎯 5. DELETE
# ====================================================================
@jamu_bp.route('/jamu/<int:id_hapus>', methods=['DELETE'])
@jwt_required()
def hapus_jamu(id_hapus):
    try:
        target = Jamu.query.get(id_hapus)
        if not target:
            return jsonify({"status": "error", "message": "Data tidak ditemukan"}), 404
        
        db.session.delete(target)
        db.session.commit()
        return jsonify({"status": "success", "message": "Jamu berhasil dihapus"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500