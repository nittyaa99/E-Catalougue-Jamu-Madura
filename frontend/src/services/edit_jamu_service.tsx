import api from '../api/axiosConfig';

export const fetchJamuById = async (id: number) => {
  try {
    const response = await api.get(`/jamu/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching jamu:', error);
    throw error;
  }
};

export const updateJamu = async (id: number, formData: any) => {
  try {
    const response = await api.put(`/jamu/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating jamu:', error);
    throw error;
  }
};

export const deleteJamu = async (id: number) => {
  try {
    const response = await api.delete(`/jamu/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jamu:', error);
    throw error;
  }
};

export const fetchAllJenis = async () => {
  try {
    const response = await api.get(`/jenis`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching jenis:', error);
    return [];
  }
};

export const fetchAllKabupaten = async () => {
  try {
    const response = await api.get(`/kabupaten`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching kabupaten:', error);
    return [];
  }
};

export const fetchAllProdusen = async () => {
  try {
    const response = await api.get(`/produsen`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching produsen:', error);
    return [];
  }
};

export const fetchAllLokasiProduksi = async () => {
  try {
    const response = await api.get(`/lokasi_produksi`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching lokasi produksi:', error);
    return [];
  }
};

export const fetchAllPerizinan = async () => {
  try {
    const response = await api.get(`/perizinan`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching perizinan:', error);
    return [];
  }
};

export const fetchAllLokasiPemasaran = async () => {
  try {
    const response = await api.get(`/lokasi_pemasaran`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching lokasi pemasaran:', error);
    return [];
  }
};