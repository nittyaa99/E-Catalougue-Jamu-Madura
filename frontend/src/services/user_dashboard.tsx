import api from '../api/axiosConfig';

// 1. Fungsi ambil katalog jamu (yang sudah ada)
export const fetchKatalogJamuPublik = async () => {
  try {
    const response = await api.get('/jamu/public');
    if (response.data.status === 'success') return response.data.data || [];
    return [];
  } catch (error) {
    console.error("Gagal menarik data katalog jamu publik:", error);
    return [];
  }
};

// 🔥 2. TAMBAHAN: Fungsi ambil opsi menu filter dari Backend
export const fetchFilterOptionsPublik = async () => {
  try {
    const response = await api.get('/jamu/public-filters');
    if (response.data.status === 'success') {
      return response.data.data; // Mengembalikan { jenis: [], kabupaten: [], perizinan: [] }
    }
    return { jenis: [], kabupaten: [], perizinan: [] };
  } catch (error) {
    console.error("Gagal menarik data opsi filter:", error);
    return { jenis: [], kabupaten: [], perizinan: [] };
  }
};