from flask import Blueprint, jsonify, request
from models.kabupaten_models import db, Kabupaten 
from flask_jwt_extended import jwt_required

# Bikin blueprint khusus kabupaten
kabupaten_bp = Blueprint('kabupaten', __name__)
# read
@kabupaten_bp.route('/kabupaten', methods=['GET'])
@jwt_required()
def get_kabupaten():
    try:
        data_kabupaten = Kabupaten.query.all()
        hasil_json = [kab.to_dict() for kab in data_kabupaten]

        return jsonify({
            "status": "success",
            "message": "Data kabupaten berhasil diambil",
            "data": hasil_json
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#  insert
@kabupaten_bp.route('/kabupaten', methods=['POST'])
@jwt_required()
def tambah_kabupaten():
    try:
        data = request.json
        input_nama = data.get('nama_kabupaten')

        if not input_nama:
            return jsonify({
                "status": "error", 
                "message": "Nama kabupaten tidak boleh kosong!"
            }), 400

        kab_baru = Kabupaten(nama_kabupaten=input_nama)
        db.session.add(kab_baru)
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data kabupaten berhasil ditambahkan!"
        }), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# update
@kabupaten_bp.route('/kabupaten/<int:id_edit>', methods=['PUT'])
@jwt_required()
def edit_kabupaten(id_edit):
    try:
        kab_target = Kabupaten.query.get(id_edit)

        if not kab_target:
            return jsonify({
                "status": "error",
                "message": "Data kabupaten tidak ditemukan"
            }), 404
        
        data = request.json
        input_nama_baru = data.get('nama_kabupaten')

        if not input_nama_baru:
             return jsonify({
                "status": "error", 
                "message": "Nama kabupaten baru tidak boleh kosong!"
            }), 400

        kab_target.nama_kabupaten = input_nama_baru
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Data kabupaten berhasil diupdate!"
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@kabupaten_bp.route('/kabupaten/<int:id_hapus>', methods=['DELETE'])
@jwt_required()
def hapus_kabupaten(id_hapus):
    try: 
        kab_target = Kabupaten.query.get(id_hapus)

        if not kab_target:
            return jsonify({
                "status": "error",
                "message": "Data kabupaten tidak ditemukan"
            }), 404 
        
        db.session.delete(kab_target)
        db.session.commit()

        return jsonify({"status": "success", "message": "Data kabupaten berhasil dihapus"}), 200

    except Exception as e: 
        return jsonify({
            "status": "error",
            "message": str(e), 
        }), 500