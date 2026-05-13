from flask import Blueprint, jsonify, request
from models.perizinan_models import db, Perizinan 
from flask_jwt_extended import jwt_required

perizinan_bp = Blueprint('perizinan', __name__)

# --- READ (GET SEMUA PERIZINAN) ---
@perizinan_bp.route('/perizinan', methods=['GET'])
@jwt_required()
def get_perizinan():
    try:
        data_perizinan = Perizinan.query.all()
        # Pakai 'item' biar aman dan konsisten
        hasil_json = [item.to_dict() for item in data_perizinan]

        return jsonify({
            "status": "success",
            "message": "Data perizinan berhasil diambil",
            "data": hasil_json
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- INSERT (POST PERIZINAN BARU) ---
@perizinan_bp.route('/perizinan', methods=['POST'])
@jwt_required()
def tambah_perizinan():
    try:
        data = request.json
        input_nama = data.get('nama_perizinan') # Ganti field sesuai database abang

        if not input_nama:
            return jsonify({
                "status": "error",
                "message": "Nama perizinan tidak boleh kosong!"
            }), 400
            
        perizinan_baru = Perizinan(nama_perizinan=input_nama)

        db.session.add(perizinan_baru)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Data perizinan berhasil ditambahkan"
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- UPDATE (PUT PERIZINAN) ---
@perizinan_bp.route('/perizinan/<int:id_edit>', methods=['PUT'])
@jwt_required()
def edit_perizinan(id_edit):
    try:
        target = Perizinan.query.get(id_edit)

        if not target:
            return jsonify({
                "status": "error",
                "message": "Data tidak ditemukan"
            }), 404
      
        data = request.json
        input_nama_baru = data.get('nama_perizinan')

        if not input_nama_baru:
            return jsonify({
                "status": "error",
                "message": "Data tidak boleh kosong"
            }), 400
        
        target.nama_perizinan = input_nama_baru
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Data perizinan berhasil diupdate!"
        }), 200
    except Exception as e: 
        return jsonify({"status": "error", "message": str(e)}), 500

# --- DELETE (DELETE PERIZINAN) ---
@perizinan_bp.route('/perizinan/<int:id_hapus>', methods=['DELETE'])
@jwt_required()
def hapus_perizinan(id_hapus):
    try: 
        target = Perizinan.query.get(id_hapus)

        if not target:
            return jsonify({
                "status": "error",
                "message": "Data tidak ditemukan"
            }), 404 
        
        db.session.delete(target)
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data perizinan berhasil dihapus"
        }), 200
    except Exception as e: 
        return jsonify({"status": "error", "message": str(e)}), 500