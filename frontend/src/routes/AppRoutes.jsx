import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Manutencoes from "../pages/Manutencoes.jsx";
import Usuarios from "../pages/Usuarios.jsx";
import Veiculos from "../pages/Veiculos.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/veiculos" element={<Veiculos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/manutencoes" element={<Manutencoes />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
