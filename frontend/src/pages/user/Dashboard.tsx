import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../../components/navbar_user';
import FooterUser from '../../components/footer_user';
import bgImageRight from './Background kanan .png';
import bgImageLeft from './Background hadap kiri.png';
import DetailProduk from './Detail_produk';

const UserDashboard: React.FC = () => {
  const [keluhan, setKeluhan] = useState("");
  const navigate = useNavigate();
  
  // Referensi untuk scroll ke area pencarian
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // State untuk membuka/menutup filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State untuk Modal Detail Produk
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Data dummy diperbanyak untuk menguji pagination (32 item = 4 halaman)
  const allCards = Array(32).fill(null);

  // State untuk Pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allCards.length / itemsPerPage);

  // Memotong array kartu untuk halaman yang aktif
  const currentCards = allCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Efek untuk animasi scroll-in (Intersection Observer)
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-animate');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hide-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [currentCards]); // Re-observe ketika halaman berganti

  // Fungsi pencarian untuk mengarahkan user ke halaman rekomendasi
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keluhan.trim() !== "") {
       navigate("/recommendation");
    }
  };

  // Fungsi untuk scroll mulus ke kolom search
  const scrollToSearch = () => {
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Opsional: fokus ke input setelah scroll
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 500);
  };

  // ...

  return (
    <div className="flex flex-col bg-gray-50">
      
      {/* ================= HERO SECTION ================= */}
      <div 
        className="min-h-screen relative flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url('${bgImageRight}')` }}
      >
        {/* Overlay untuk teks lebih terbaca */}
        <div className="absolute inset-0 bg-white/20 sm:bg-transparent pointer-events-none z-0"></div>

        {/* Navbar */}
        <div className="relative z-50">
          <NavbarUser />
        </div>

        {/* Hero Content */}
        <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 pt-32 pb-16">
          
          <div className="text-center animate-[slideUpFade_1s_ease-out_forwards] opacity-0 max-w-4xl mx-auto">
            <h1 className="text-[50px] sm:text-[64px] md:text-[76px] font-bold font-serif text-[#111] leading-[1.1] mb-6 drop-shadow-md">
              Selamat Datang di<br />JamuKita
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#333] font-medium leading-relaxed mb-14 drop-shadow-sm max-w-2xl mx-auto">
              Temukan dan Sampaikan jika Anda memiliki keluhan, <br className="hidden md:block"/>
              kami akan memaparkan rekomendasi terbaik dari produk kami
            </p>
          </div>

          <form 
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-[750px] bg-[#757575]/95 backdrop-blur-md rounded-full px-6 py-4 sm:py-5 shadow-2xl animate-[slideUpFade_1s_ease-out_0.3s_forwards] opacity-0 transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02] focus-within:ring-4 focus-within:ring-[#b58e1b]/40"
          >
            <button type="submit" className="focus:outline-none group p-1 flex-shrink-0" aria-label="Search">
              <svg className="w-7 h-7 text-black group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <input 
              ref={searchInputRef}
              type="text"
              className="flex-grow bg-transparent border-none text-white placeholder-gray-300 px-5 text-[16px] sm:text-[18px] focus:outline-none focus:ring-0"
              placeholder="for ex: jamu untuk sakit kepala dan pegal pegal............."
              value={keluhan}
              onChange={(e) => setKeluhan(e.target.value)}
            />
          </form>
        </main>
      </div>

      {/* ================= CATALOG SECTION ================= */}
      <div 
        id="catalog-section"
        className="min-h-screen relative flex flex-col bg-cover bg-center bg-no-repeat py-16 pb-32"
        style={{ backgroundImage: `url('${bgImageLeft}')` }}
      >
        <div className="absolute inset-0 bg-white/30 sm:bg-transparent pointer-events-none z-0"></div>

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 mx-auto flex-grow flex flex-col">
           
            {/* Top Row: Title, Button Cari*/}
            <div className="flex justify-between items-start mb-12 relative min-h-[50px] sm:min-h-[100px] hide-animate">
               
               <div className="absolute left-1/2 transform -translate-x-1/2 text-center font-serif text-[#111] w-full max-w-lg pointer-events-none">
                  <h2 className="text-[32px] md:text-[38px] font-bold leading-tight drop-shadow-sm">Daftar Produk</h2>
                  <h2 className="text-[32px] md:text-[38px] font-bold leading-tight drop-shadow-sm">Jamu Madura kita</h2>
               </div>


              <div 
                className={`transition-all duration-500 ease-in-out flex flex-col absolute right-0 z-20 origin-top-right
                  ${isFilterOpen ? 'bg-[#34C759] rounded-[20px] w-[280px] p-6 shadow-2xl' : 'bg-transparent w-auto p-0'}
                `}
              >
                 {/* Header Panell */}
                 <div className={`flex items-center justify-end gap-6 ${isFilterOpen ? 'mb-6' : 'mb-0'}`}>
                    <button 
                      onClick={scrollToSearch}
                      className="text-[22px] font-bold text-[#111] hover:opacity-70 transition-opacity whitespace-nowrap"
                    >
                      Cari
                    </button>
                    
                    {/* rotasi vertikal/horizontal */}
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex justify-center items-center focus:outline-none"
                      aria-label="Toggle Filter"
                    >
                       <div className={`transition-transform duration-500 ease-in-out flex flex-col gap-[5px] ${isFilterOpen ? 'rotate-90' : 'rotate-0'}`}>
                          <div className="w-[28px] h-[4px] bg-[#111] rounded-full"></div>
                          <div className="w-[28px] h-[4px] bg-[#111] rounded-full"></div>
                          <div className="w-[28px] h-[4px] bg-[#111] rounded-full"></div>
                       </div>
                    </button>
                 </div>

                 {/* Isi Konten Dropdown Filter */}
                 {/* Disembunyikan saat isFilterOpen false */}
                 <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFilterOpen ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0'}`}>
                    <div className="w-[232px] text-white">
                       <h3 className="text-[22px] font-bold text-[#111] mb-5">Filter Jamu</h3>
                       
                       {/* Filter Jenis */}
                       <div className="mb-5">
                         <h4 className="font-bold text-[#111] text-[15px] mb-2">Jenis</h4>
                         <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[14px] font-medium text-white">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Cair</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Pil</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Kapsul</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Krim</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Selai</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Serbuk</label>
                         </div>
                       </div>

                       {/* Filter Asal */}
                       <div className="mb-5">
                         <h4 className="font-bold text-[#111] text-[15px] mb-2">Asal</h4>
                         <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[14px] font-medium text-white">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Bangkalan</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Pamekasan</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Sampang</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> Sumenep</label>
                         </div>
                       </div>

                       {/* Filter Perizinan */}
                       <div>
                         <h4 className="font-bold text-[#111] text-[15px] mb-2">Perizinan</h4>
                         <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[12px] font-medium text-white">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> KEMENKES</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> P.IRT</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> BPOM</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#111] rounded-sm cursor-pointer" /> TDI & UKOT</label>
                         </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

            {/* Layout Grid Katalog */}
            {/* Memberikan padding kanan otomatis agar tidak menimpa dropdown saat terbuka */}
            <div className={`transition-all duration-500 ease-in-out grid gap-5 sm:gap-6 justify-items-center justify-center mb-10 w-full max-w-7xl mx-auto mt-[80px] sm:mt-0
               ${isFilterOpen ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:pr-[310px]' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
            `}>
               {currentCards.map((_, idx) => (
                  <div 
                    key={`${currentPage}-${idx}`} 
                    className="hide-animate bg-[#eef6ec] w-full max-w-[310px] rounded-[15px] p-3 shadow-md flex flex-col items-center hover:scale-105 hover:shadow-xl cursor-pointer" 
                    style={{transitionDelay: `${idx * 0.05}s`}}
                    onClick={() => handleCardClick({ id: idx, namaJamu: `Galian Rapet ${(currentPage - 1) * itemsPerPage + idx + 1}` })}
                  >
                    {/* Placeholder Gambar Produk yang Diperbesar */}
                    <div className="w-full aspect-[4/5] bg-gradient-to-b from-yellow-100 to-orange-400 rounded-xl shadow-inner overflow-hidden mb-5 relative flex flex-col items-center justify-center p-2 text-center border-[3px] border-orange-300">
                       <span className="text-red-600 font-black text-[18px] leading-tight mb-2">GALIAN RAPET</span>
                       <span className="text-red-600 font-black text-[12px] leading-tight mb-4">SARI RAPET (KAPSUL)</span>
                       <div className="w-20 h-28 bg-black rounded-lg flex flex-col items-center justify-center border-2 border-yellow-500 shadow-xl">
                          <span className="text-yellow-500 text-[10px] font-bold mt-1 leading-tight px-1">Jamu Tradisional</span>
                       </div>
                    </div>
                    
                    {/* Detail Teks */}
                    <div className="w-full text-center flex-grow flex flex-col justify-between">
                       <div>
                          <h3 className="text-gray-800 font-bold text-[20px] mb-1">Galian Rapet {(currentPage - 1) * itemsPerPage + idx + 1}</h3>
                          <p className="text-gray-500 text-[14px] font-medium mb-5">Kapsul</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

            {/* ================= PAGINATION (SLICER) "JAMU" ================= */}
            {totalPages > 1 && (
               <div className="flex justify-center mt-12 mb-16 w-full z-20 relative hide-animate" style={{transitionDelay: '0.2s'}}>
                 <div className="flex items-start font-serif text-[38px] md:text-[48px] font-bold text-[#34C759] select-none">
                    
                    {/* Tombol Previous */}
                    <button 
                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                       disabled={currentPage === 1}
                       className={`hover:-translate-x-1 transition-transform mr-4 ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                       &lt;
                    </button>
                    
                    <span className="tracking-tight">ja</span>
                    
                    {/* Huruf 'm' dinamis beserta angkanya */}
                    <div className="flex">
                       {Array.from({length: totalPages}).map((_, i) => {
                          const pageNum = i + 1;
                          const isActive = currentPage === pageNum;
                          return (
                             <div 
                                key={pageNum} 
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => setCurrentPage(pageNum)}
                             >
                                <span className={`leading-none tracking-tight transition-colors ${isActive ? 'text-[#34C759]' : 'text-[#34C759]/60 group-hover:text-[#34C759]/80'}`}>
                                   m
                                </span>
                                <span className={`text-[16px] md:text-[20px] font-black mt-1 font-sans transition-colors ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                   {pageNum}
                                </span>
                             </div>
                          );
                       })}
                    </div>
                    
                    <span className="tracking-tight">u</span>
                    
                    {/* Tombol Next */}
                    <button 
                       onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                       disabled={currentPage === totalPages}
                       className={`hover:translate-x-1 transition-transform ml-4 ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                       &gt;
                    </button>
                 </div>
              </div>
           )}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <FooterUser />

      {/* Modal Detail Produk */}
      <DetailProduk 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />

      {/* Definisi Animasi Khusus */}
      <style>
        {`
          @keyframes slideUpFade {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .hide-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .show-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
    </div>
  );
};

export default UserDashboard;