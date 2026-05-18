import React from 'react';

export interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any; 
}

const DetailProduk: React.FC<ProductDetailProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-white/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards] cursor-pointer"
        onClick={onClose}
      ></div>
      
      {/* Definisi Animasi Khusus untuk Modal */}
      <style>
        {`
          @keyframes modalPop {
            0% { opacity: 0; transform: scale(0.9) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-[950px] bg-[#d9d9d9] rounded-[20px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row min-h-[500px] animate-[modalPop_0.4s_ease-out_forwards] max-h-[90vh] overflow-y-auto md:overflow-y-visible">
         
         {/* Left Side */}
         <div className="w-full md:w-[45%] flex flex-col relative md:pr-8 md:border-r border-gray-400 mb-8 md:mb-0">
            <button 
              onClick={onClose}
              className="self-start bg-[#b58e1b] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#9a7815] transition-colors shadow-md text-[15px]"
            >
              Kembali
            </button>
            
            <div className="mt-8 w-full flex-grow flex items-center justify-center">
               {/* DINAMIS: Cek ketersediaan file gambar fisik dari backend */}
               {product.image ? (
                  <img 
                    src={`http://localhost:5000/static/uploads/${product.image}`} 
                    alt={product.nama_jamu} 
                    className="w-full aspect-square max-w-[360px] object-cover rounded-[24px] shadow-lg border-[4px] border-orange-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Gambar+Tidak+Ditemukan";
                    }}
                  />
               ) : (
                  /* Fallback: Desain kartu jika tidak ada gambar */
                  <div className="w-full aspect-square max-w-[360px] bg-gradient-to-b from-yellow-100 to-orange-400 rounded-[24px] overflow-hidden shadow-lg relative flex flex-col items-center justify-center p-4 text-center border-[4px] border-orange-300">
                      <span className="text-red-600 font-black text-[22px] sm:text-[26px] leading-tight mb-1 uppercase break-words w-full px-2">
                        {product.nama_jamu}
                      </span>
                      <span className="text-red-600 font-black text-[13px] sm:text-[15px] leading-tight mb-4 uppercase">
                        {product.nama_jenis || 'Tradisional'}
                      </span>
                      <div className="w-20 h-28 bg-black rounded-xl flex flex-col items-center justify-center border-2 border-yellow-500 shadow-xl shrink-0">
                         <span className="text-yellow-500 text-[10px] font-bold mt-1 leading-tight px-1">Jamu Tradisional</span>
                      </div>
                  </div>
               )}
            </div>
         </div>
         
         {/* Right Side */}
         <div className="w-full md:w-[55%] md:pl-8 flex flex-col justify-center">
            {/* Nama Jamu Utama */}
            <h2 className="text-[26px] sm:text-[32px] font-bold text-center mb-6 leading-tight text-[#222] font-serif capitalize">
              {product.nama_jamu}
            </h2>
            
            {/* Desain Tabel yang Lebih Rapi & Proporsional */}
            <div className="w-full overflow-hidden rounded-xl border border-neutral-500/40 shadow-lg mb-6">
              <table className="w-full text-[13px] sm:text-[14px] bg-[#323232] text-[#f5f5f5] table-fixed border-collapse">
                <tbody>
                  <tr className="border-b border-neutral-600/50 hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 w-[110px] sm:w-[150px] font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Nama Jamu
                    </td>
                    <td className="p-3 sm:p-4 break-words font-medium text-white capitalize">
                      {product.nama_jamu || "-"}
                    </td>
                  </tr>
                  
                  <tr className="border-b border-neutral-600/50 hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Asal Daerah
                    </td>
                    <td className="p-3 sm:p-4 text-emerald-400 font-semibold tracking-wide">
                      {product.nama_kabupaten || "Lokal"}
                    </td>
                  </tr>
                  
                  <tr className="border-b border-neutral-600/50 hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Jenis Bentuk
                    </td>
                    <td className="p-3 sm:p-4 font-medium text-neutral-200">
                      {product.nama_jenis || "Tradisional"}
                    </td>
                  </tr>
                  
                  <tr className="border-b border-neutral-600/50 hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Legalitas
                    </td>
                    <td className="p-3 sm:p-4 text-amber-400 font-bold tracking-wider uppercase text-[12px]">
                      {product.nama_perizinan || "Tanpa Perizinan"}
                    </td>
                  </tr>
                  
                  <tr className="border-b border-neutral-600/50 hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Bahan Baku
                    </td>
                    <td className="p-3 sm:p-4 italic text-neutral-300 break-words leading-relaxed">
                      {product.kandungan || "Kandungan Alami Tradisional"}
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-[#3a3a3a] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-gray-400 bg-[#252525] border-r border-neutral-600/50 uppercase text-[10px] tracking-wider text-center md:text-left">
                      Aturan Minum
                    </td>
                    <td className="p-3 sm:p-4 break-words text-orange-300 font-medium leading-relaxed">
                      {product.aturan_minum || "Tidak ada keterangan spesifik"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Bagian Deskripsi Khasiat */}
            <div className="flex flex-col">
              <span className="font-bold text-[#222] mb-2 text-[14px] tracking-wide uppercase">🎯 Khasiat Utama :</span>
              <div className="bg-[#cdcdcd] rounded-[15px] p-4 text-[13px] sm:text-[14px] text-[#222] text-justify leading-relaxed max-h-36 overflow-y-auto border border-gray-400 shadow-inner custom-scrollbar">
                {product.khasiat || "Belum ada deskripsi khasiat yang dimasukkan untuk produk jamu ini, Bang."}
              </div>
            </div>
         </div>
         
      </div>
    </div>
  );
};

export default DetailProduk;