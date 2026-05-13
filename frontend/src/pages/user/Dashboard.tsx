import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- STYLING (CSS Inline) ---
const containerStyle: React.CSSProperties = {
  // Saya beri overlay gradient putih agar teks hitam lebih terbaca, 
  // ganti URL ini dengan path gambar aslimu nanti (misal: "url('/assets/bg-home.jpg')")
  background: "url('https://images.unsplash.com/photo-1596649280018-b21764ccb0fb?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat",
  minHeight: "100vh",
  position: "relative",
  color: "#111", // Warna teks diubah menjadi gelap
  display: "flex",
  flexDirection: "column",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.7)", // Overlay putih transparan agar seperti desain
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1, 
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 50px",
};

const logoStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  fontFamily: "'Playfair Display', serif", 
  color: "#000",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "15px",
};

const navButtonStyle: React.CSSProperties = {
  background: "#b58e1b", // Warna emas kecoklatan sesuai gambar baru
  color: "white",
  border: "none",
  padding: "10px 25px",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  textDecoration: "none", 
};

const heroStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexGrow: 1, 
  padding: "0 20px 80px", 
};

const titleStyle: React.CSSProperties = {
  fontSize: "64px",
  fontWeight: "bold",
  margin: "0",
  fontFamily: "'Playfair Display', serif",
  color: "#000",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "18px",
  margin: "20px 0 40px",
  maxWidth: "600px",
  lineHeight: "1.6",
  color: "#333",
};

const searchFormStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(117, 117, 117, 0.9)", // Warna abu-abu gelap
  borderRadius: "30px",
  padding: "12px 25px",
  width: "600px",
  maxWidth: "90%",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  fontSize: "16px",
  outline: "none",
  marginLeft: "15px",
};

const searchIconStyle: React.CSSProperties = {
  cursor: "pointer",
};

// --- KOMPONEN UTAMA ---

const UserDashboard: React.FC = () => {
  const [keluhan, setKeluhan] = useState("");
  const navigate = useNavigate();

  // Fungsi yang dipanggil ketika user menekan tombol Enter atau klik icon Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Langsung arahkan ke halaman Rekomendasi
    // (Nantinya kamu bisa mengirim isi variabel 'keluhan' ini ke halaman rekomendasi jika diperlukan)
    navigate("/recommendation");
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>

      <div style={contentStyle}>
        <header style={headerStyle}>
          <div style={logoStyle}>JamuKita</div>

          <nav style={navStyle}>
            {/* Hanya 2 tombol sesuai instruksi baru */}
            <Link to="/" style={navButtonStyle}>Home</Link>
            <Link to="/Catalog" style={navButtonStyle}>Catalog</Link>
          </nav>
        </header>

        <main style={heroStyle}>
          <h1 style={titleStyle}>Selamat Datang di<br/>JamuKita</h1>
          <p style={subtitleStyle}>
            Temukan dan Sampaikan jika Anda memiliki keluhan, kami akan memaparkan rekomendasi terbaik dari produk kami
          </p>

          {/* SEARCH BAR PENGGANTI TOMBOL MULAI */}
          <form style={searchFormStyle} onSubmit={handleSearch}>
            {/* Icon Kaca Pembesar */}
            <div style={searchIconStyle} onClick={handleSearch}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <input 
              type="text" 
              placeholder="for ex: jamu untuk sakit kepala dan pegal pegal............." 
              style={searchInputStyle}
              value={keluhan}
              onChange={(e) => setKeluhan(e.target.value)}
            />
          </form>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;