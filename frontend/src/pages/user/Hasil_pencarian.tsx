import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarUser from '../../components/navbar_user';
import FooterUser from '../../components/footer_user';
import DetailProduk from './Detail_produk';
import bgImageLeft from './Background hadap kiri.png';

const Recommendation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 TANGKAP TEKS KELUHAN YANG DIKIRIM DARI DASHBOARD UTAMA
  const kataKunciAwal = location.state?.pencarian || "";

  // State Modal Detail Produk
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // State Input Teks & Penampung Data Hasil Prediksi Machine Learning
  const [searchText, setSearchText] = useState(kataKunciAwal);
  const [dataRekomendasi, setDataRekomendasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ FUNGSI HIT API BACKEND FLASK UNTUK MENDAPATKAN REKOMENDASI ML
  const ambilRekomendasiML = async (queryTeks: string) => {
    if (!queryTeks.trim()) return;
    
    setLoading(true);
    try {
      // Mengirimkan teks keluhan ke endpoint Machine Learning Flask Abang
      const response = await fetch('http://localhost:5000/api/jamu/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keluhan: queryTeks }),
      });
      
      const jsonResult = await response.json();
      
      if (jsonResult.status === 'success') {
        // Backend me-return array data jamu lengkap hasil query matching label prediksi ML
        setDataRekomendasi(jsonResult.data || []);
      } else {
        setDataRekomendasi([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data rekomendasi ML:", error);
      setDataRekomendasi([]);
    } finally {
      setLoading(false);
    }
  };

  // AUTOMATIS JALANKAN PREDIKSI ML SAAT USER MASUK PERTAMA KALI DARI DASHBOARD
  useEffect(() => {
    if (kataKunciAwal) {
      ambilRekomendasiML(kataKunciAwal);
    }
  }, [kataKunciAwal]);

  // Handler saat user mengetik keluhan baru di halaman ini lalu menekan Enter/Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ambilRekomendasiML(searchText);
  };

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <NavbarUser />

      {/* Main Content dengan background kiri terkunci (bg-fixed) agar tidak melar saat zoom */}
      <main 
        className="flex-grow pt-40 pb-24 flex flex-col items-center bg-cover bg-fixed bg-left bg-no-repeat relative"
        style={{ backgroundImage: `url('${bgImageLeft}')` }}
      >
        {/* Overlay tipis agar teks tetap terbaca tajam */}
        <div className="absolute inset-0 bg-white/50 pointer-events-none z-0"></div>
        
        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col">
          
          {/* TOP SECTION: JUDUL HALAMAN & KAPSUL PENCARIAN */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6 animate-[slideDownFade_0.8s_ease-out_forwards]">
            <h1 className="text-[36px] sm:text-[46px] font-bold font-serif text-[#222] tracking-tight">
              Hasil Rekomendasi
            </h1>
            
            {/* Search Input Kapsul */}
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#e8dbdf] rounded-full px-6 py-4 w-full sm:w-auto sm:min-w-[420px] shadow-md transition-transform focus-within:scale-[1.02] border border-gray-300/40"
            >
              {/* Tombol Panah Kembali ke Dashboard */}
              <button 
                type="button"
                onClick={() => navigate("/")} 
                className="text-[#555] hover:text-black transition-colors focus:outline-none mr-3"
                title="Kembali ke Halaman Utama"
              >
                 <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                 </svg>
              </button>
              
              {/* Input Field Gejala Baru */}
              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tulis keluhan tubuh Anda di sini..." 
                className="bg-transparent border-none outline-none flex-grow text-[#222] px-2 text-[18px] placeholder-[#777] focus:ring-0"
              />
              
              {/* Tombol Reset/Clear Teks */}
              {searchText && (
                <button 
                  type="button"
                  onClick={() => setSearchText("")} 
                  className="text-[#666] hover:text-red-600 transition-colors focus:outline-none ml-2"
                >
                   <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>
              )}
            </form>
          </div>
          
          {/* LOGIKA LOADING SPINNER SAAT MACHINE LEARNING BERHITUNG */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 w-full col-span-full">
              <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-bold text-lg animate-pulse">Model AI sedang menganalisis ramuan jamu terbaik...</p>
            </div>
          ) : (
            /* GRID KATALOG REKOMENDASI (Dinamis Sesuai ID Hasil Output ML) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 sm:gap-10 justify-items-center justify-center">
              {dataRekomendasi.length > 0 ? (
                dataRekomendasi.map((item, idx) => (
                  <div 
                    key={item.id_jamu || idx}
                    onClick={() => handleCardClick(item)}
                    className="bg-[#eef6ec] w-full max-w-[340px] rounded-[20px] p-4 pb-6 shadow-lg flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl cursor-pointer transition-all duration-300 border border-green-100 animate-[slideUpFade_0.8s_ease-out_forwards]"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Gambar Produk */}
                    <div className="w-full aspect-[4/5] bg-gradient-to-b from-yellow-100 to-orange-400 rounded-2xl shadow-inner overflow-hidden mb-6 relative flex flex-col items-center justify-center p-2 text-center border-[4px] border-orange-300">
                       {item.image ? (
                          <img 
                            src={`http://localhost:5000/static/uploads/${item.image}`} 
                            alt={item.nama_jamu} 
                            className="w-full h-full object-cover rounded-xl"
                          />
                       ) : (
                          <>
                            <span className="text-red-600 font-black text-[22px] leading-tight mb-2 uppercase px-2">{item.nama_jamu}</span>
                            <span className="text-red-600 font-black text-[14px] leading-tight mb-4 uppercase">{item.nama_jenis || 'Tradisional'}</span>
                          </>
                       )}
                    </div>
                    
                    {/* Detail Informasi Teks Kartu */}
                    <div className="w-full text-center flex-grow flex flex-col justify-between">
                       <div>
                          <h3 className="text-gray-900 font-bold text-[22px] mb-2 truncate w-full px-2 capitalize">{item.nama_jamu}</h3>
                          <p className="text-gray-600 text-[16px] font-semibold mb-3 uppercase tracking-wide">{item.nama_jenis || "Jamu Madura"}</p>
                          <span className="inline-block px-4 py-1 bg-green-100 text-green-800 text-[14px] font-bold italic rounded-full shadow-sm">{item.nama_kabupaten || "Lokal"}</span>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                /* TAMPILAN JIKA KELUHAN TIDAK COCOK DENGAN RAMUAN APAPUN */
                <div className="col-span-full py-28 text-center text-gray-500 font-medium text-xl italic bg-white/60 w-full rounded-2xl border-2 border-dashed border-gray-300 shadow-inner px-6">
                   Tidak ada ramuan jamu yang cocok dengan keluhan "{searchText || kataKunciAwal}", Bang. Coba masukkan gejala lain.
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <FooterUser />

      {/* Modal Detail Produk (Otomatis membaca data lengkap jamu saat kartu diklik) */}
      <DetailProduk 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />

      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDownFade {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Recommendation;