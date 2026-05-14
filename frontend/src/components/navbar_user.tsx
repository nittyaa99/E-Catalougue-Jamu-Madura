import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoJamu from '../pages/user/Logo jamu madura.png';

const NavbarUser: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk mengubah background navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi pembantu untuk mengecek halaman aktif
  const isActive = (path: string) => {
    return location.pathname.toLowerCase() === path.toLowerCase() 
           ? 'bg-[#967515] scale-105 shadow-lg' 
           : 'bg-[#b58e1b] hover:bg-[#a37f18] hover:scale-105 hover:shadow-lg';
  };

  return (
    <>
      <style>
        {`
          /* Animasi Masuk (Entrance) */
          @keyframes slideDownFade {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-navbar {
            animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          /* Animasi Denyut (Pulse) saat Hover Logo */
          @keyframes pulseSoft {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .hover-pulse:hover {
            animation: pulseSoft 1.5s infinite;
          }
        `}
      </style>

      {/* Kontainer Navbar - Fixed mengikuti scroll */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-16 flex justify-between items-center animate-navbar transition-all duration-300 ${
        isScrolled ? 'bg-[#FDFBF7]/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        
        {/* Kiri: Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-[65px] h-[75px] overflow-hidden hover-pulse transition-all duration-300">
            <img src={logoJamu} alt="Logo Jamu Madura" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div className="flex flex-col text-left font-serif text-[#333]">
            <span className="text-[26px] leading-[1.1] drop-shadow-sm transition-colors group-hover:text-[#b58e1b]">JamuMadura</span>
            <span className="text-[26px] leading-[1.1] text-center ml-2 drop-shadow-sm transition-colors group-hover:text-[#b58e1b]">Kita</span>
          </div>
        </Link>

        {/* Tengah: Tautan Navigasi (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`px-8 py-2.5 rounded-full text-white font-medium transition-all duration-300 ${isActive('/')}`}
          >
            Home
          </Link>
          <Link 
            to="/Catalog" 
            className={`px-8 py-2.5 rounded-full text-white font-medium transition-all duration-300 ${isActive('/catalog')}`}
          >
            Catalog
          </Link>
          <Link 
            to="/tentang-kami" 
            className={`px-8 py-2.5 rounded-full text-white font-medium transition-all duration-300 ${isActive('/tentang-kami')}`}
          >
            Tentang kami
          </Link>
        </div>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 p-2 rounded-md hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-8 h-8 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Mobile */}
      <div 
        className={`md:hidden absolute top-[90px] left-0 w-full bg-white/95 backdrop-blur-md shadow-xl z-40 flex flex-col items-center py-6 gap-4 transition-all duration-500 ease-in-out origin-top transform ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
      >
        <Link 
          to="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-3/4 text-center px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${isActive('/')}`}
        >
          Home
        </Link>
        <Link 
          to="/Catalog" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-3/4 text-center px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${isActive('/catalog')}`}
        >
          Catalog
        </Link>
        <Link 
          to="/tentang-kami" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-3/4 text-center px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${isActive('/tentang-kami')}`}
        >
          Tentang kami
        </Link>
      </div>
    </>
  );
};

export default NavbarUser;