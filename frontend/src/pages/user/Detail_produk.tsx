import React from 'react';

export interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any; // Bisa disesuaikan dengan tipe data produk yang sebenarnya
}

const DetailProduk: React.FC<ProductDetailProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-white/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards]"
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
      <div className="relative z-10 w-full max-w-[950px] bg-[#d9d9d9] rounded-[20px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row min-h-[500px] animate-[modalPop_0.4s_ease-out_forwards]">
         
         {/* Left Side */}
         <div className="w-full md:w-[45%] flex flex-col relative md:pr-8 md:border-r border-gray-400 mb-8 md:mb-0">
            <button 
              onClick={onClose}
              className="self-start bg-[#b58e1b] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#9a7815] transition-colors shadow-md text-[15px]"
            >
              Kembali
            </button>
            
            <div className="mt-8 w-full flex-grow flex items-center justify-center">
               {/* Product Image - Karena gambar spesifik tidak ada, pakai dummy desain yang mirip */}
               <div className="w-full aspect-square max-w-[400px] bg-gradient-to-b from-yellow-100 to-orange-400 rounded-[24px] overflow-hidden shadow-lg relative flex flex-col items-center justify-center p-3 text-center border-[4px] border-orange-300">
                   <span className="text-red-600 font-black text-[28px] leading-tight mb-2">GALIAN RAPET</span>
                   <span className="text-red-600 font-black text-[16px] leading-tight mb-4">SARI RAPET (KAPSUL)</span>
                   <div className="w-24 h-32 bg-black rounded-xl flex flex-col items-center justify-center border-2 border-yellow-500 shadow-xl">
                      <span className="text-yellow-500 text-[12px] font-bold mt-1 leading-tight px-1">Jamu Tradisional</span>
                   </div>
               </div>
            </div>
         </div>
         
         {/* Right Side */}
         <div className="w-full md:w-[55%] md:pl-8 flex flex-col justify-center">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-center mb-6 leading-tight text-[#222]">
              Jamu abang empot<br/>pasti suka
            </h2>
            
            <table className="w-full text-[13px] sm:text-[14px] bg-[#3e3e3e] text-[#f5f5f5] rounded-[6px] overflow-hidden mb-8 shadow-md">
              <tbody>
                <tr className="border-b border-[#555]">
                  <td className="p-3 sm:p-4 w-[130px] font-medium border-r border-[#555]">Nama Jamu</td>
                  <td className="p-3 sm:p-4">Jamu abang empot pasti suka asal mau minum</td>
                </tr>
                <tr className="border-b border-[#555]">
                  <td className="p-3 sm:p-4 font-medium border-r border-[#555]">Asal</td>
                  <td className="p-3 sm:p-4">Bangkalan</td>
                </tr>
                <tr className="border-b border-[#555]">
                  <td className="p-3 sm:p-4 font-medium border-r border-[#555]">Produsen</td>
                  <td className="p-3 sm:p-4">PT Madura Sejahtera bersama tretan</td>
                </tr>
                <tr className="border-b border-[#555]">
                  <td className="p-3 sm:p-4 font-medium border-r border-[#555]">Pemasaran</td>
                  <td className="p-3 sm:p-4">Pasar senin bangkalan, sampang kota, pamekasan kota dan sumenep kota</td>
                </tr>
                <tr className="border-b border-[#555]">
                  <td className="p-3 sm:p-4 font-medium border-r border-[#555]">Jenis</td>
                  <td className="p-3 sm:p-4">Cair</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium border-r border-[#555]">Aturan minum</td>
                  <td className="p-3 sm:p-4">Tidak ada</td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex flex-col">
              <span className="font-bold text-[#222] mb-3 text-[16px]">Khasiat :</span>
              <div className="bg-[#cdcdcd] rounded-[15px] p-5 text-[13px] sm:text-[14px] text-[#333] text-center leading-relaxed">
                Jamu Mantap Mama Suka dipercaya dapat membantu menjaga daya tahan tubuh, menghangatkan badan, menjaga stamina dan kebugaran, membantu melancarkan peredaran darah, meredakan pegal dan capek, menjaga kesehatan pria, membantu meningkatkan nafsu makan, serta membuat tubuh terasa lebih segar dan fit untuk menjalani aktivitas sehari-hari
              </div>
            </div>
         </div>
         
      </div>
    </div>
  );
};

export default DetailProduk;