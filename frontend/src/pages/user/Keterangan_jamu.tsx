import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const KeteranganJamu: React.FC = () => {
  const navigate = useNavigate();

  // Data dummy (bisa disesuaikan dengan data dinamis dari backend nantinya)
  const jamuData = {
    name: "Kunyit Asam",
    netto: "500ml",
    img: "https://images.unsplash.com/photo-1628151012353-bd1fb9c74bca?w=400&h=600&fit=crop",
    deskripsi: "Jamu kunyit asam adalah minuman tradisional yang terbuat dari perpaduan kunyit dan asam jawa. Minuman ini dikenal memiliki rasa segar dengan sedikit asam dan manis, serta kaya akan manfaat bagi kesehatan. Kunyit asam membantu meredakan nyeri haid, melancarkan peredaran darah, serta memiliki sifat antioksidan yang baik untuk menjaga daya tahan tubuh. Selain itu, jamu ini juga dapat membantu mengurangi peradangan dan menjaga kesehatan kulit. Cocok dikonsumsi secara rutin untuk menjaga kebugaran tubuh, terutama bagi wanita yang sering mengalami keluhan saat menstruasi.",
    kegunaan: "Jamu kunyit asam memiliki berbagai kegunaan bagi kesehatan tubuh karena kandungan alami dari kunyit dan asam jawa. Minuman tradisional ini dikenal efektif membantu meredakan nyeri haid pada wanita, melancarkan peredaran darah, serta mengurangi peradangan dalam tubuh. Selain itu, kunyit asam juga berperan sebagai antioksidan yang dapat meningkatkan daya tahan tubuh dan membantu melawan radikal bebas. Konsumsi secara rutin juga dipercaya dapat membantu menjaga kesehatan kulit, melancarkan pencernaan, serta memberikan efek menyegarkan bagi tubuh sehingga cocok diminum dalam kondisi lelah atau kurang fit."
  };

  return (
    <>
      <style>
        {`
          .nav-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-btn:hover {
            background-color: #e0b020 !important;
            transform: scale(1.05);
          }
          .info-box {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .info-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
          .img-container {
            transition: transform 0.4s ease;
          }
          .img-container:hover {
            transform: scale(1.02) rotate(-1deg);
          }
          .back-btn {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .back-btn:hover {
            background-color: #218c21 !important;
            transform: scale(1.05);
          }
        `}
      </style>

      <div style={{
        backgroundColor: "#4f585e", // Background sesuai desain
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

        {/* MAIN CONTENT */}
        <main style={{
          flexGrow: 1,
          padding: "20px 60px 60px",
          display: "flex",
          gap: "50px",
          alignItems: "flex-start"
        }}>
          
          {/* KOLOM KIRI: Foto Produk dengan Frame Elegan */}
          <div style={{ flex: "0 0 350px", position: "relative", marginTop: "20px" }}>
            {/* Bayangan putih di belakang */}
            <div style={{
              position: "absolute", top: "15px", left: "-15px", width: "100%", height: "100%",
              backgroundColor: "#e2e2e2", borderRadius: "24px", zIndex: 1
            }}></div>
            
            {/* Frame Emas */}
            <div className="img-container" style={{
              backgroundColor: "#b89414", // Warna emas gelap
              borderRadius: "24px",
              padding: "20px",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
            }}>
              <img src={jamuData.img} alt={jamuData.name} style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "16px",
                display: "block"
              }} />
            </div>
          </div>

          {/* KOLOM KANAN: Informasi Detail */}
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            
            {/* Header Judul Jamu */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "18px", marginBottom: "10px", color: "#e0e0e0" }}>Nama Jamu:</div>
              <div style={{
                backgroundColor: "#e2e2e2",
                color: "#111",
                padding: "12px 40px",
                borderRadius: "30px",
                display: "inline-block",
                fontSize: "24px",
                fontWeight: "900",
                minWidth: "300px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.15)"
              }}>
                {jamuData.name}
              </div>
              <div style={{ fontSize: "16px", marginTop: "15px", color: "#d1d5db" }}>
                Neto/Kemasan: {jamuData.netto}
              </div>
            </div>

            {/* Kontainer Deskripsi & Kegunaan (Berdampingan) */}
            <div style={{ display: "flex", gap: "30px" }}>
              
              {/* Box Deskripsi */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "20px", marginBottom: "15px", textAlign: "center", fontWeight: "normal" }}>Deskripsi Jamu:</h3>
                <div className="info-box" style={{
                  backgroundColor: "#e2e2e2",
                  color: "#222",
                  padding: "25px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  textAlign: "justify",
                  height: "350px",
                  overflowY: "auto"
                }}>
                  {jamuData.deskripsi}
                </div>
              </div>

              {/* Box Kegunaan */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "20px", marginBottom: "15px", textAlign: "center", fontWeight: "normal" }}>Kegunaan Jamu:</h3>
                <div className="info-box" style={{
                  backgroundColor: "#e2e2e2",
                  color: "#222",
                  padding: "25px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  textAlign: "justify",
                  height: "350px",
                  overflowY: "auto"
                }}>
                  {jamuData.kegunaan}
                </div>
              </div>

            </div>

            {/* Tombol Kembali (Pojok Kanan Bawah) */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
              <button 
                onClick={() => navigate(-1)} // Fungsi untuk kembali ke halaman sebelumnya
                className="back-btn" 
                style={{
                  backgroundColor: "#2aaa2a", // Hijau
                  color: "white",
                  border: "none",
                  padding: "10px 40px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              >
                Kembali
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default KeteranganJamu;