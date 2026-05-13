import React from 'react';
import { Link } from 'react-router-dom';

// --- DATA DUMMY DETAIL PRODUK ---
const detailedProducts = [
  {
    id: 1, name: "Jamu Pelancar Haid",
    desc: "Minuman herbal yang membantu melancarkan siklus haid dan mengurangi ketidaknyamanan saat menstruasi.",
    manfaat: ["Meredakan nyeri haid", "Melancarkan peredaran darah", "Anti-inflamasi"],
    aturan: "Diminum 1 kali sehari, pagi atau siang hari",
    harga: "Rp 15.000",
    img: "https://images.unsplash.com/photo-1615486171448-4fb627d2c3be?w=150&h=150&fit=crop"
  },
  {
    id: 2, name: "Beras Kencur",
    desc: "Jamu tradisional berbahan beras dan kencur yang menyegarkan dan menambah energi.",
    manfaat: ["Menambah stamina", "Mengurangi pegal", "Meningkatkan nafsu makan"],
    aturan: "Diminum 1 kali sehari, pagi atau siang hari",
    harga: "Rp 13.000",
    img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=150&h=150&fit=crop"
  },
  {
    id: 3, name: "Kunyit Asam",
    desc: "Minuman herbal dari kunyit dan asam jawa yang menyegarkan dan menyehatkan.",
    manfaat: ["Meredakan nyeri haid", "Melancarkan peredaran darah", "Anti-inflamasi"],
    aturan: "Diminum 1-2 kali sehari",
    harga: "Rp 12.000",
    img: "https://images.unsplash.com/photo-1628151012353-bd1fb9c74bca?w=150&h=150&fit=crop"
  },
  {
    id: 4, name: "Sidomuncul JSH",
    desc: "Mendetoks racun di saluran pencernaan.",
    manfaat: ["Menetralkan Racun (Detoksifikasi)", "Mengatasi Masalah Pencernaan", "Meningkatkan Daya Tahan Tubuh"],
    aturan: "Diminum saat hangat, 1-2 kali sehari",
    harga: "Rp 15.000",
    img: "" // Kosong
  },
  {
    id: 5, name: "Pegal Linu",
    desc: "Jamu untuk membantu meredakan nyeri otot dan pegal pada tubuh.",
    manfaat: ["Mengurangi pegal", "Meredakan nyeri otot", "Melancarkan peredaran darah"],
    aturan: "Diminum setelah aktivitas berat",
    harga: "Rp 10.000",
    img: "https://images.unsplash.com/photo-1608265386093-9b242ca91b6e?w=150&h=150&fit=crop"
  },
  {
    id: 6, name: "Temulawak",
    desc: "Jamu herbal dari temulawak yang baik untuk kesehatan hati dan pencernaan.",
    manfaat: ["Menjaga kesehatan hati", "Meningkatkan nafsu makan", "Melancarkan pencernaan"],
    aturan: "Diminum 1 kali sehari sebelum makan",
    harga: "Rp 11.000",
    img: "https://images.unsplash.com/photo-1615486511484-92e1720543bc?w=150&h=150&fit=crop"
  },
  {
    id: 7, name: "Sehat Wanita",
    desc: "Jamu herbal untuk menjaga kesehatan dan keseimbangan tubuh wanita.",
    manfaat: ["Menjaga kesehatan reproduksi", "Menyeimbangkan hormon", "Menyegarkan tubuh"],
    aturan: "Diminum secara rutin 1 kali sehari",
    harga: "Rp 13.000",
    img: "https://images.unsplash.com/photo-1556910115-467ea3f1d933?w=150&h=150&fit=crop"
  },
  {
    id: 8, name: "Sehat Pria",
    desc: "Jamu khusus untuk membantu menjaga stamina dan vitalitas pria.",
    manfaat: ["Meningkatkan stamina", "Menjaga vitalitas", "Mengurangi kelelahan"],
    aturan: "Diminum 1 kali sehari",
    harga: "Rp 13.000",
    img: "https://images.unsplash.com/photo-1564222256577-45e728f2c611?w=150&h=150&fit=crop"
  },
  {
    id: 9, name: "Jahe Merah AMH",
    desc: "Meningkatkan daya tahan tubuh serta meredakan gejala masuk angin seperti perut kembung dan mual.",
    manfaat: ["Menghangatkan Tubuh", "Melancarkan Peredaran Darah", "Mengurangi Nyeri Sendi"],
    aturan: "1-3 kali sehari, diseduh dengan 150ml air hangat",
    harga: "Rp 14.000",
    img: "" // Kosong
  },
  {
    id: 10, name: "Kunci Sirih",
    desc: "Jamu tradisional yang membantu menjaga kesehatan organ kewanitaan.",
    manfaat: ["Menjaga kebersihan organ intim", "Mengurangi bau tidak sedap", "Menjaga kesehatan wanita"],
    aturan: "Diminum 1 kali sehari",
    harga: "Rp 10.000",
    img: "https://images.unsplash.com/photo-1620888998522-8d76a742ce44?w=150&h=150&fit=crop"
  }
];

const DetailProduk: React.FC = () => {
  return (
    <>
      <style>
        {`
          .detail-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .detail-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
          }
          .nav-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-btn:hover {
            background-color: #e0b020 !important;
            transform: scale(1.05);
          }
          .price-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .price-btn:hover {
            background-color: #a88312 !important;
            transform: scale(1.03);
          }
          .page-num {
            transition: color 0.2s ease;
            cursor: pointer;
          }
          .page-num:hover {
            color: #D4AF37;
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
        <main style={{ flexGrow: 1, padding: "10px 60px 40px", display: "flex", flexDirection: "column" }}>
          
          <h1 style={{
            fontSize: "42px", fontWeight: "bold", textAlign: "center", margin: "0 0 50px 0",
            fontFamily: "'Playfair Display', serif"
          }}>Detail Produk JamuKita</h1>

          {/* GRID KARTU PRODUK (5 Kolom) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "25px", marginBottom: "50px" }}>
            {detailedProducts.map((product) => (
              <div key={product.id} className="detail-card" style={{
                backgroundColor: "#fdf3e1", // Warna krem/beige terang
                borderRadius: "16px",
                padding: "20px 15px",
                color: "#222",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}>
                
                {/* Header Kartu: Gambar & Judul */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px", minHeight: "65px" }}>
                  {product.img ? (
                    <img src={product.img} alt={product.name} style={{
                      width: "65px", height: "65px", borderRadius: "10px", objectFit: "cover", flexShrink: 0
                    }} />
                  ) : (
                    <div style={{
                      width: "65px", height: "65px", borderRadius: "10px", backgroundColor: "#ccc", 
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <span style={{fontSize:"10px", color:"#777"}}>No Image</span>
                    </div>
                  )}
                  <div style={{
                    fontSize: "15px", fontWeight: "bold", fontFamily: "'Playfair Display', serif", lineHeight: "1.2", textAlign: "center", flexGrow: 1
                  }}>{product.name}</div>
                </div>
                
                {/* Deskripsi Singkat */}
                <div style={{ fontSize: "11px", textAlign: "center", lineHeight: "1.4", color: "#444", marginBottom: "15px" }}>
                  {product.desc}
                </div>

                {/* Kotak Manfaat (Abu-abu) */}
                <div style={{
                  backgroundColor: "#8c949a", // Warna kotak abu-abu di dalam kartu
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "15px",
                  color: "#111", // Teks gelap
                  fontSize: "10px",
                }}>
                  <strong style={{ display: "block", marginBottom: "5px", fontSize: "11px" }}>Manfaat:</strong>
                  <ol style={{ margin: "0", paddingLeft: "15px", lineHeight: "1.5" }}>
                    {product.manfaat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>

                {/* Aturan Minum */}
                <div style={{ fontSize: "10px", textAlign: "center", color: "#444", fontStyle: "italic", marginBottom: "20px" }}>
                  {product.aturan}
                </div>

                {/* Tombol Harga (Didorong ke bawah) */}
                <div style={{ marginTop: "auto", textAlign: "center" }}>
                  <button className="price-btn" style={{
                    backgroundColor: "#c59b15",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 25px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "80%"
                  }}>
                    {product.harga}
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* PAGINASI BAWAH */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", fontWeight: "bold", fontSize: "16px", marginTop: "auto" }}>
            <span className="page-num">1</span>
            <span className="page-num">2</span>
            <span className="page-num">3</span>
            <span className="page-num">4</span>
            <span className="page-num">5</span>
            <span className="page-num">6</span>
            <span className="page-num">7</span>
            <span className="page-num" style={{ marginLeft: "10px" }}>Berikutnya</span>
          </div>

        </main>
      </div>
    </>
  );
};

export default DetailProduk;