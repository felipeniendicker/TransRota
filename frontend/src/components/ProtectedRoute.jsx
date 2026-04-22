import { Navigate, Outlet } from "react-router-dom";
import { getUsuarioLogado } from "../services/authService.js";

export default function ProtectedRoute() {
  const usuario = getUsuarioLogado();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
