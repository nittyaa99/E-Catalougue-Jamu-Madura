from flask import Blueprint, jsonify, request
from models.produsen_models import db, Produsen # Pastikan P besar sesuai class di model
from flask_jwt_extended import jwt_required

produsen_bp = Blueprint('produsen', __name__)

# --- READ (GET ALL) ---
@produsen_bp.route('/produsen', methods=['GET'])
@jwt_required()
def get_produsen():
    try:
        # Gunakan nama Class yang benar (Produsen)
        data_produsen = Produsen.query.all()
        # item.to_dict() aman karena item bersifat lokal di dalam list ini
        hasil_json = [item.to_dict() for item in data_produsen]

        return jsonify({
            "status": "success",
            "message": "Data produsen berhasil diambil",
            "data": hasil_json
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- INSERT (POST) ---
@produsen_bp.route('/produsen', methods=['POST'])
@jwt_required()
def tambah_produsen():
    try:
        data = request.json
        input_nama = data.get('nama_produsen')
        input_kabupaten = data.get('id_kabupaten') 

        if not input_nama:
            return jsonify({"status": "error", "message": "Nama produsen tidak boleh kosong!"}), 400
            
        # Buat objek baru pakai class Produsen
        produsen_baru = Produsen(
            nama_produsen=input_nama,
            id_kabupaten=input_kabupaten 
        )

        db.session.add(produsen_baru)
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data produsen berhasil ditambahkan!"
        }), 201
    except Exception as e:
        db.session.rollback() # Selalu bagus buat jaga-jaga kalau error pas commit
        return jsonify({"status": "error", "message": str(e)}), 500

# --- UPDATE (PUT) ---
@produsen_bp.route('/produsen/<int:id_edit>', methods=['PUT'])
@jwt_required()
def edit_produsen(id_edit):
    try:
        target = Produsen.query.get(id_edit)
        if not target:
            return jsonify({"status": "error", "message": "Data produsen tidak ditemukan"}), 404
      
        data = request.json
        
        # Update nama jika dikirim di json
        if data.get('nama_produsen'):
            target.nama_produsen = data.get('nama_produsen')
        
        # Update kabupaten jika dikirim di json
        if data.get('id_kabupaten'):
            target.id_kabupaten = data.get('id_kabupaten')
        
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data produsen berhasil diperbarui!"
        }), 200
    except Exception as e: 
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

# --- DELETE (DELETE) ---
@produsen_bp.route('/produsen/<int:id_hapus>', methods=['DELETE'])
@jwt_required()
def hapus_produsen(id_hapus):
    try: 
        target = Produsen.query.get(id_hapus)
        if not target:
            return jsonify({"status": "error", "message": "Data produsen tidak ditemukan"}), 404 
        
        db.session.delete(target)
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data produsen berhasil dihapus"
        }), 200
    except Exception as e: 
        return jsonify({"status": "error", "message": str(e)}), 500