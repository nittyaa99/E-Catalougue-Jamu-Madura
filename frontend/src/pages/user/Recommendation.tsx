import React from 'react';
import { Link } from 'react-router-dom';

// --- DATA DUMMY REKOMENDASI ---
const recommendations = [
  {
    id: 1,
    name: "Temulawak",
    desc: "Meningkatkan nafsu makan dan menjaga kesehatan fungsi hati",
    img: "https://images.unsplash.com/photo-1615486511484-92e1720543bc?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Jahe Hangat",
    desc: "Menghangatkan tubuh dan mengurangi rasa tidak nyaman pada perut",
    img: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Kunyit Asam",
    desc: "Membantu meredakan nyeri haid dan melancarkan peredaran darah",
    img: "https://images.unsplash.com/photo-1628151012353-bd1fb9c74bca?w=150&h=150&fit=crop"
  }
];

const Recommendation: React.FC = () => {
  return (
    <>
      {/* CSS KHUSUS UNTUK EFEK HOVER */}
      <style>
        {`
          .rec-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .rec-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          }
          .nav-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-btn:hover {
            background-color: #e0b020 !important;
            transform: scale(1.05);
          }
          .btn-all {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .btn-all:hover {
            background-color: #d4d4d4 !important;
            transform: scale(1.05);
          }
        `}
      </style>

      <div style={{
        backgroundColor: "#4f585e", // Latar belakang abu-abu gelap
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}>
        
        {/* HEADER */}
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px 60px",
        }}>
          <div style={{ fontSize: "36px", fontWeight: "bold", fontFamily: "'Playfair Display', serif" }}>
            JamuKita
          </div>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/" className="nav-btn" style={{
              background: "#c59b15", color: "white", border: "none", padding: "10px 25px", 
              borderRadius: "30px", fontWeight: "600", textDecoration: "none"
            }}>Home</Link>
            <Link to="/catalog" className="nav-btn" style={{
              background: "#c59b15", color: "white", border: "none", padding: "10px 25px", 
              borderRadius: "30px", fontWeight: "600", textDecoration: "none"
            }}>Catalog</Link>
          </nav>
        </header>

        {/* KONTEN UTAMA */}
        <main style={{ flexGrow: 1, padding: "20px 60px 60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <h1 style={{
            fontSize: "42px", fontWeight: "bold", textAlign: "center", margin: "0 0 10px 0",
            fontFamily: "'Playfair Display', serif"
          }}>Rekomendasi Jamu Untuk Anda</h1>
          
          <h2 style={{
            fontSize: "20px", fontWeight: "normal", textAlign: "center", margin: "0 0 60px 0",
            color: "#e0e0e0"
          }}>Berdasarkan Pencarian yang Anda masukkan</h2>

          {/* CONTAINER KARTU REKOMENDASI */}
          <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}>
            {recommendations.map((item) => (
              // Membungkus seluruh kartu dengan Link agar bisa diklik menuju Detail Produk
              <Link to="/keterangan-jamu" key={item.id} className="rec-card" style={{
                backgroundColor: "#fcecd9", // Warna krem/beige sesuai gambar
                borderRadius: "12px",
                padding: "25px",
                color: "#222",
                textDecoration: "none", // Menghilangkan garis bawah khas link
                display: "flex",
                flexDirection: "column",
                width: "320px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}>
                {/* Bagian Atas: Gambar (Kiri) & Nama (Kanan) */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  <img src={item.img} alt={item.name} style={{
                    width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover", flexShrink: 0,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }} />
                  <div style={{ fontSize: "22px", fontWeight: "bold", fontFamily: "'Playfair Display', serif" }}>
                    {item.name}
                  </div>
                </div>
                
                {/* Bagian Bawah: Deskripsi (Tengah) */}
                <div style={{ fontSize: "16px", textAlign: "center", lineHeight: "1.5", color: "#333" }}>
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>

          {/* TOMBOL BAWAH */}
          <Link to="/catalog" className="btn-all" style={{
            backgroundColor: "#e2e2e2", // Abu-abu terang
            color: "#222",
            border: "none",
            borderRadius: "8px",
            padding: "12px 40px",
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 4px 6px rgba(0,0,0,0.15)"
          }}>
            Lihat semua Catalog
          </Link>

        </main>
      </div>
    </>
  );
};

export default Recommendation;