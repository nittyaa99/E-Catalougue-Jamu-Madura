import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubAdminNavbar from '../../components/sub_admin';
import api from '../../api/axiosConfig';

export default function DetailItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State for form data
  const [formData, setFormData] = useState({
    nama_jenis: 'Kunir Asem',
    id_jamu: id || '001',
    perizinan: 'BPOM',
    jenis: 'Cair',
    kabupaten: 'Bangkalan',
    khasiat: 'Kunir Asem adalah minuman tradisional khas Jawa dengan rasa perpaduan pahit ringan dan asam segar.\nBahan yang digunakan meliputi kunyit, asam jawa, gula merah, gula pasir (opsional), garam, dan air. Cara pembuatannya cukup sederhana, yaitu kunyit dihaluskan lalu direbus dengan air, kemudian ditambahkan asam jawa dan gula hingga larut. Setelah matang, disaring untuk memisahkan ampas, lalu didinginkan sebelum disajikan',
    kandungan: 'Kunir Asem membantu meredakan berbagai keluhan ringan. Minuman ini umumnya digunakan untuk membantu mengurangi rasa tidak nyaman pada perut, seperti kembung atau perut terasa penuh. Selain itu, kunir asem juga sering diminum untuk membantu meredakan nyeri haid dan memberikan rasa segar pada tubuh saat terasa lelah.',
    aturan_minum: '1-2 gelas per hari atau 3-4 kali seminggu, baik disajikan hangat maupun dingin',
    efek_samping: 'gangguan pencernaan (mual, diare, kembung), risiko peningkatan asam lambung, pendarahan (terutama jika dikonsumsi dengan obat pengencer darah).',
    produsen: 'Jamu Tradisional Madura',
    lokasi_produksi: 'JL Pahlawan 21 Sampang'
  });

  // Example fetch, can be hooked to API
  useEffect(() => {
    const fetchJamu = async () => {
      try {
        const response = await api.get(`/jenis/${id}`);
        // Populate actual data if available
        if(response.data && response.data.data) {
           const item = response.data.data;
           setFormData(prev => ({
             ...prev,
             nama_jenis: item.nama_jenis || prev.nama_jenis,
             id_jamu: item.id_jenis || prev.id_jamu,
             // Map other fields as needed
           }));
        }
      } catch (error) {
        console.error("Failed to fetch jamu details", error);
      }
    };
    if (id && id !== '001') fetchJamu();
  }, [id]);

  const handleHapus = async () => {
    const konfirmasi = window.confirm("Yakin mau hapus data ini?");
    if (konfirmasi) {
      try {
        await api.delete(`/jenis/${id}`);
        alert("Data berhasil dihapus");
        navigate('/dashboard_4dm13n');
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Gagal menghapus data.");
      }
    }
  };

  const handleSimpan = async () => {
    try {
      // Logic for saving/updating goes here
      // await api.put(`/jenis/${id}`, formData);
      alert("Data berhasil disimpan");
      navigate('/dashboard_4dm13n');
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F3E6] font-sans pb-10">
      <SubAdminNavbar />
      
      {/* Sub Header */}
      <div className="w-full bg-[#344F51] flex items-center justify-start px-12 py-3 gap-12 shrink-0">
         <div 
           className="flex items-center gap-2 text-white font-semibold cursor-pointer hover:text-gray-300 transition-colors"
           onClick={() => navigate('/admin/add-jamu')}
         >
            <span className="text-2xl font-light leading-none">+</span>
            <span className="text-[15px] tracking-wide">Tambah item</span>
         </div>
         <div className="flex items-center gap-2 text-white font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <span className="text-[15px] tracking-wide">Edit item</span>
         </div>
      </div>
      
      {/* Content */}
      <div className="px-8 py-8 md:px-12 md:py-10 flex flex-col lg:flex-row gap-10">
        
        {/* Left Section (Image & Buttons) */}
        <div className="flex flex-col gap-6 lg:w-[350px] shrink-0 items-center">
          <div className="bg-[#666B6C] w-full aspect-[4/5] rounded-[2rem] flex items-center justify-center p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <img 
              src="https://raw.githubusercontent.com/SeinalArifin149/E-Catalougue-Jamu-Madura/main/images/kunyit_asem.png" 
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x500/FFA500/FFFFFF?text=Jamu" }}
              alt="Jamu" 
              className="h-full w-full object-contain drop-shadow-2xl" 
            />
          </div>
          <div className="flex justify-center gap-4 w-full">
            <button className="bg-[#FFF000] hover:bg-[#E6D800] text-black text-sm font-bold py-2.5 px-4 rounded shadow-md flex items-center justify-center gap-2 flex-1 transition-transform hover:scale-105">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
              Ambil Foto
            </button>
            <button className="bg-[#FFF000] hover:bg-[#E6D800] text-black text-sm font-bold py-2.5 px-4 rounded shadow-md flex items-center justify-center gap-2 flex-1 transition-transform hover:scale-105">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Unggah Foto
            </button>
          </div>
        </div>

        {/* Right Section (Form Fields) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="flex flex-col gap-1.5">
               <label className="font-bold text-lg">Nama Jamu:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-semibold rounded-md px-4 py-3 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] placeholder-white/80" 
                 value={formData.nama_jenis} 
                 onChange={e => setFormData({...formData, nama_jenis: e.target.value})}
               />
            </div>
            <div className="flex flex-col gap-1.5">
               <label className="font-bold text-lg">Id Jamu:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-semibold rounded-md px-4 py-3 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] placeholder-white/80" 
                 value={formData.id_jamu} 
                 onChange={e => setFormData({...formData, id_jamu: e.target.value})}
               />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-6 gap-y-4 items-center">
             <div className="flex items-center gap-3">
               <label className="font-bold text-lg whitespace-nowrap">Perizinan:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-semibold rounded-md px-4 py-2 w-32 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] text-center" 
                 value={formData.perizinan} 
                 onChange={e => setFormData({...formData, perizinan: e.target.value})}
               />
             </div>
             
             <div className="flex items-center gap-3">
               <label className="font-bold text-lg whitespace-nowrap">Jenis:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-semibold rounded-md px-4 py-2 w-32 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] text-center" 
                 value={formData.jenis} 
                 onChange={e => setFormData({...formData, jenis: e.target.value})}
               />
             </div>
             
             <div className="flex items-center gap-3">
               <label className="font-bold text-lg whitespace-nowrap">Kabupaten:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-semibold rounded-md px-4 py-2 w-40 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] text-center" 
                 value={formData.kabupaten} 
                 onChange={e => setFormData({...formData, kabupaten: e.target.value})}
               />
             </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Khasiat:</label>
               <textarea 
                 className="bg-[#DD8B43] text-white/95 text-[14px] font-medium rounded-md p-5 h-48 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] resize-none leading-relaxed custom-scrollbar" 
                 value={formData.khasiat} 
                 onChange={e => setFormData({...formData, khasiat: e.target.value})}
               />
            </div>
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Kandungan:</label>
               <textarea 
                 className="bg-[#DD8B43] text-white/95 text-[14px] font-medium rounded-md p-5 h-48 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)] resize-none leading-relaxed custom-scrollbar" 
                 value={formData.kandungan} 
                 onChange={e => setFormData({...formData, kandungan: e.target.value})}
               />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Aturan Minum:</label>
               <textarea 
                 className="bg-white text-black text-[14px] font-bold rounded-xl p-5 h-28 focus:outline-none shadow-md resize-none flex items-center justify-center text-center custom-scrollbar" 
                 value={formData.aturan_minum} 
                 onChange={e => setFormData({...formData, aturan_minum: e.target.value})}
               />
            </div>
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Efek Samping:</label>
               <textarea 
                 className="bg-white text-black text-[14px] font-bold rounded-xl p-5 h-28 focus:outline-none shadow-md resize-none flex items-center justify-center text-center custom-scrollbar" 
                 value={formData.efek_samping} 
                 onChange={e => setFormData({...formData, efek_samping: e.target.value})}
               />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Produsen:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-bold text-center rounded-md p-3.5 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)]" 
                 value={formData.produsen} 
                 onChange={e => setFormData({...formData, produsen: e.target.value})}
               />
            </div>
            <div className="flex flex-col gap-2">
               <label className="font-bold text-xl text-center">Lokasi Produksi:</label>
               <input 
                 className="bg-[#DD8B43] text-white text-lg font-bold text-center rounded-md p-3.5 focus:outline-none shadow-[0_4px_6px_rgba(0,0,0,0.1)]" 
                 value={formData.lokasi_produksi} 
                 onChange={e => setFormData({...formData, lokasi_produksi: e.target.value})}
               />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-8 md:px-12 flex justify-between items-center mt-4">
        <button 
          onClick={() => navigate('/dashboard_4dm13n')} 
          className="bg-[#6D7779] hover:bg-[#5A6365] text-white font-semibold py-2 px-4 rounded shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </button>

        <div className="flex gap-4">
          <button 
            onClick={handleHapus}
            className="bg-[#8B0000] hover:bg-[#660000] text-white font-semibold py-2 px-6 rounded shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Hapus
          </button>
          <button 
            onClick={handleSimpan}
            className="bg-[#008000] hover:bg-[#006600] text-white font-semibold py-2 px-6 rounded shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Simpan
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6); 
        }
      `}</style>
    </div>
  );
}
