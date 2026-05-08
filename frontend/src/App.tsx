// import React as from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Admin/auth/login";
// import NavbarAdmin from './components/navbar_admin';
import Dashboard from "./pages/Admin/dashboard/dashboard";

// IMPORT BARU: Memanggil file Dashboard untuk User
import UserDashboard from "./pages/user/Dashboard";
// IMPORT KATALOG: Memanggil file Catalog untuk User
import Catalog from "./pages/user/Catalog";
// IMPORT BARU: Memanggil halaman Rekomendasi
import Recommendation from "./pages/user/Recommendation";
import DetailProduk from './pages/user/Detail_produk';
import KeteranganJamu from './pages/user/Keterangan_jamu';

// --- FUNGSI SATPAM (PROTECTED ROUTE) ---
// Tugasnya ngecek apakah user punya "tiket" masuk ke dashboard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  if (!isAuthenticated) {
    // Kalau nggak ada tiket, tendang balik ke halaman Login (/4dm13n)
    return <Navigate to="/4dm13n" replace />;
  }

  // Kalau ada tiket, silakan masuk
  return children;
};

function App() {
  return (
    // Router wajib membungkus seluruh aplikasi agar fitur pindah halaman aktif
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            {/* RUTE BARU: Halaman Utama User (Bisa langsung diakses) */}
            <Route path="/" element={<UserDashboard />} />

            {/* RUTE KATALOG: Halaman Pencarian Jamu */}
            <Route path="/catalog" element={<Catalog />} />

            {/* RUTE 1: Halaman Login Admin (Bebas diakses siapa saja) */}
            <Route path="/4dm13n" element={<Login />} />

            {/* RUTE BARU: Jalur untuk halaman Rekomendasi */}
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/detail-produk" element={<DetailProduk />} />
            <Route path="/keterangan-jamu" element={<KeteranganJamu />} />

            {/* RUTE 2: Halaman Dashboard Admin (Dilindungi Satpam) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
