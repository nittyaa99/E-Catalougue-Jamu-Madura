import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Admin
import Login from "./pages/Admin/auth/login";
import DashboardAdmin from "./pages/Admin/dashboard/dashboard";

// Import User Pages
import UserDashboard from "./pages/user/Dashboard";
import Catalog from "./pages/user/Catalog";
import Recommendation from "./pages/user/Recommendation";
import DetailProduk from "./pages/user/Detail_produk";
import KeteranganJamu from "./pages/user/Keterangan_jamu";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rute User */}
        <Route path="/" element={<UserDashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/detail-produk" element={<DetailProduk />} />
        <Route path="/keterangan-jamu" element={<KeteranganJamu />} />

        {/* Rute Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />

        {/* Redirect jika path tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
