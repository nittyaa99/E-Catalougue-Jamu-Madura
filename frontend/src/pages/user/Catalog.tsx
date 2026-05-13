import React from 'react';
import { Link } from 'react-router-dom';

// --- DATA DUMMY PRODUK (Dibuat 15 item agar pas 5 kolom x 3 baris) ---
const products = [
  { id: 1, name: "Jamu Pelancar Haid", desc: "Membantu melancarkan siklus haid dan meredakan nyeri", img: "https://images.unsplash.com/photo-1615486171448-4fb627d2c3be?w=150&h=150&fit=crop" },
  { id: 2, name: "Beras Kencur", desc: "Menambah energi dan mengurangi pegal linu", img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=150&h=150&fit=crop" },
  { id: 3, name: "Kunyit Asam", desc: "Meredakan nyeri haid dan melancarkan peredaran darah", img: "https://images.unsplash.com/photo-1628151012353-bd1fb9c74bca?w=150&h=150&fit=crop" },
  { id: 4, name: "Sidomuncul JSH", desc: "Mendetoks racun di dalam saluran pencernaan tubuh", img: "" }, // Kosongkan foto untuk test
  { id: 5, name: "Pegal Linu", desc: "Meredakan pegal dan nyeri otot setelah beraktivitas", img: "https://images.unsplash.com/photo-1608265386093-9b242ca91b6e?w=150&h=150&fit=crop" },
  { id: 6, name: "Temulawak", desc: "Meningkatkan nafsu makan dan menjaga kesehatan hati", img: "https://images.unsplash.com/photo-1615486511484-92e1720543bc?w=150&h=150&fit=crop" },
  { id: 7, name: "Sehat Wanita", desc: "Menjaga kesehatan dan keseimbangan hormon wanita", img: "https://images.unsplash.com/photo-1556910115-467ea3f1d933?w=150&h=150&fit=crop" },
  { id: 8, name: "Sehat Pria", desc: "Membantu menjaga stamina dan vitalitas tubuh pria", img: "https://images.unsplash.com/photo-1564222256577-45e728f2c611?w=150&h=150&fit=crop" },
  { id: 9, name: "Jahe Merah AMH", desc: "Meningkatkan daya tahan tubuh serta meredakan gejala masuk angin", img: "" }, // Kosongkan foto
  { id: 10, name: "Kunci Sirih", desc: "Menjaga kesehatan organ kewanitaan dan kurangi bau tidak sedap", img: "https://images.unsplash.com/photo-1620888998522-8d76a742ce44?w=150&h=150&fit=crop" },
  { id: 11, name: "Pahitan", desc: "Membersihkan darah kotor dan mengatasi gatal-gatal", img: "https://images.unsplash.com/photo-1587049352847-8d4e8941554a?w=150&h=150&fit=crop" },
  { id: 12, name: "Cabe Puyang", desc: "Menghilangkan kesemutan dan pegal-pegal di tubuh", img: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?w=150&h=150&fit=crop" },
  { id: 13, name: "Sari Rapet", desc: "Mengencangkan otot kewanitaan dan meremajakan kulit", img: "https://images.unsplash.com/photo-1611078813636-c3a105c92842?w=150&h=150&fit=crop" },
  { id: 14, name: "Uyup-Uyup", desc: "Meningkatkan produksi ASI bagi ibu menyusui", img: "" }, // Kosong
  { id: 15, name: "Wedang Uwuh", desc: "Menghangatkan tubuh secara alami saat cuaca dingin", img: "https://images.unsplash.com/photo-1576092762791-dd9e2220c4c7?w=150&h=150&fit=crop" },
];

const Catalog: React.FC = () => {
  return (
    <>
      {/* CSS Tambahan untuk Efek Hover agar UI terasa lebih modern dan interaktif */}
      <style>
        {`
          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }
          .nav-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-btn:hover {
            background-color: #e0b020 !important;
            transform: scale(1.05);
          }
          .page-num {
            transition: color 0.2s ease;
          }
          .page-num:hover {
            color: #D4AF37;
          }
          .page-active {
            color: #D4AF37;
            border-bottom: 2px solid #D4AF37;
          }
        `}
      </style>

      <div style={{
        background: "linear-gradient(135deg, #4b535a 0%, #353b40 100%)", // Latar belakang gradient yang elegan
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}>
        
        {/* HEADER */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 60px",
        }}>
          <div style={{
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "1px"
          }}>JamuKita</div>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/" className="nav-btn" style={{
              background: "#c59b15", 
              color: "white", 
              border: "none", 
              padding: "10px 25px", 
              borderRadius: "30px", 
              fontWeight: "600", 
              textDecoration: "none"
            }}>Home</Link>
            <Link to="/catalog" className="nav-btn" style={{
              background: "#c59b15", 
              color: "white", 
              border: "none", 
              padding: "10px 25px", 
              borderRadius: "30px", 
              fontWeight: "600", 
              textDecoration: "none"
            }}>Catalog</Link>
          </nav>
        </header>

        {/* KONTEN UTAMA */}
        <main style={{ flexGrow: 1, padding: "10px 60px 40px", display: "flex", flexDirection: "column" }}>
          
          <h1 style={{
            fontSize: "46px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 0 50px 0",
            fontFamily: "'Playfair Display', serif",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)" // Sedikit bayangan pada teks
          }}>Catalog Produk JamuKita</h1>

          {/* GRID KARTU PRODUK (5 Kolom x 3 Baris) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "25px",
            marginBottom: "50px",
          }}>
            {products.map((product) => (
              <div key={product.id} className="product-card" style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "16px",
                padding: "20px",
                color: "#222",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}>
                {/* Bagian Atas: Gambar (Kiri) & Judul (Kanan) */}
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px", minHeight: "75px" }}>
                  {product.img ? (
                    <img src={product.img} alt={product.name} style={{
                      width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover", flexShrink: 0,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }} />
                  ) : (
                    // Kotak placeholder jika tidak ada gambar
                    <div style={{
                      width: "70px", height: "70px", borderRadius: "12px", backgroundColor: "#d1d5db", 
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}>
                       <span style={{fontSize:"10px", color:"#888"}}>No Image</span>
                    </div>
                  )}
                  <div style={{
                    fontSize: "16px", fontWeight: "bold", fontFamily: "'Playfair Display', serif", lineHeight: "1.2"
                  }}>{product.name}</div>
                </div>
                
                {/* Bagian Bawah: Deskripsi */}
                <div style={{
                  fontSize: "13px", textAlign: "center", lineHeight: "1.5", color: "#555", marginTop: "auto"
                }}>
                  {product.desc}
                </div>
              </div>
            ))}
          </div>

          {/* BAGIAN BAWAH: Tombol & Paginasi */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
            
            {/* Tombol Kiri Bawah */}
            <Link to="/detail-produk" className="nav-btn" style={{
              background: "#c59b15",
              color: "white",
              padding: "12px 25px",
              borderRadius: "10px", // Bentuk sedikit berbeda dari tombol navbar
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
            }}>
              Lihat semua Detail Produk
            </Link>

            {/* Paginasi Kanan Bawah */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center", fontWeight: "bold", fontSize: "16px" }}>
              <span className="page-num page-active" style={{ cursor: "pointer", paddingBottom: "3px" }}>1</span>
              <span className="page-num" style={{ cursor: "pointer" }}>2</span>
              <span className="page-num" style={{ cursor: "pointer" }}>3</span>
              <span className="page-num" style={{ cursor: "pointer" }}>4</span>
              <span className="page-num" style={{ cursor: "pointer" }}>5</span>
              <span className="page-num" style={{ cursor: "pointer", marginLeft: "15px" }}>Berikutnya</span>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Catalog;