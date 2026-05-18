import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarUser from '../../components/navbar_user';
import FooterUser from '../../components/footer_user';
import DetailProduk from './Detail_produk';
import bgImageLeft from './Background hadap kiri.png';

const dummyData = [
  { id: 1, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1615486511484-92e1720543bc?w=300&h=300&fit=crop" },
  { id: 2, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?w=300&h=300&fit=crop" },
  { id: 3, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1628151012353-bd1fb9c74bca?w=300&h=300&fit=crop" },
  { id: 4, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1608265386093-9b242ca91b6e?w=300&h=300&fit=crop" },
  { id: 5, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1556910115-467ea3f1d933?w=300&h=300&fit=crop" },
  { id: 6, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1564222256577-45e728f2c611?w=300&h=300&fit=crop" },
  { id: 7, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1620888998522-8d76a742ce44?w=300&h=300&fit=crop" },
  { id: 8, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1615486171448-4fb627d2c3be?w=300&h=300&fit=crop" },
  { id: 9, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1615486511484-92e1720543bc?w=300&h=300&fit=crop" },
  { id: 10, name: "Jamu rasa enak", desc: "Merapatkan apa yang perlu di rapatkan", img: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?w=300&h=300&fit=crop" },
];

const Recommendation: React.FC = () => {
  const navigate = useNavigate();
  // State for Modal Detail Produk
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Search text logic
  const [searchText, setSearchText] = useState("");

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <NavbarUser />

      {/* Main Content dengan background kiri */}
      <main 
        className="flex-grow pt-36 pb-16 flex flex-col items-center bg-cover bg-left bg-no-repeat relative"
        style={{ backgroundImage: `url('${bgImageLeft}')` }}
      >
        {/* Overlay tipis agar konten lebih terbaca */}
        <div className="absolute inset-0 bg-white/50 pointer-events-none z-0"></div>
        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col">
          
          {/* TOP SECTION: TITLE & SEARCH */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 animate-[slideDownFade_0.8s_ease-out_forwards]">
            <h1 className="text-[34px] sm:text-[40px] font-bold font-serif text-[#222]">
              Hasil pencarian
            </h1>
            
            {/* Search Input Berbentuk Kapsul */}
            <div className="flex items-center bg-[#e8dbdf] rounded-full px-5 py-3 w-full sm:w-auto sm:min-w-[320px] shadow-sm transition-transform focus-within:scale-[1.02]">
              {/* Back Arrow */}
              <button 
                onClick={() => navigate("/")} 
                className="text-[#666] hover:text-black transition-colors focus:outline-none mr-2"
              >
                 <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                 </svg>
              </button>
              
              {/* Input Field */}
              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Input text" 
                className="bg-transparent border-none outline-none flex-grow text-[#333] px-2 text-[16px] placeholder-[#888]"
              />
              
              {/* Clear Icon */}
              <button 
                onClick={() => setSearchText("")} 
                className="text-[#666] hover:text-black transition-colors focus:outline-none ml-2"
              >
                 <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>
            </div>
          </div>
          
          {/* GRID CARDS (Hasil Pencarian) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 justify-items-center">
            {dummyData.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-[#ebf3ea] w-full max-w-[260px] rounded-[20px] p-4 pb-6 shadow-md flex flex-col items-center hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300 animate-[slideUpFade_0.8s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Gambar Produk */}
                <div className="w-full aspect-[4/5] bg-white rounded-[15px] shadow-sm overflow-hidden mb-4 flex items-center justify-center p-1 border border-gray-100 relative group">
                   {/* Fallback image jamu madura */}
                   <img 
                     src={item.img} 
                     alt={item.name} 
                     className="w-full h-full object-cover rounded-[10px] group-hover:scale-110 transition-transform duration-500" 
                   />
                </div>
                
                {/* Teks Judul dan Deskripsi */}
                <h3 className="text-[#333] font-bold text-[16px] text-center leading-tight mb-1">{item.name}</h3>
                <p className="text-[#666] text-[11px] font-medium text-center leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <FooterUser />

      {/* Modal Detail Produk */}
      <DetailProduk 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />

      <style>
        {`
          @keyframes slideUpFade {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDownFade {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Recommendation;