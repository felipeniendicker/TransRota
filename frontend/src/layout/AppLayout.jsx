import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { getUsuarioLogado } from "../services/authService.js";

export default function AppLayout() {
  const location = useLocation();
  const usuario = getUsuarioLogado();

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Topbar pathname={location.pathname} usuario={usuario} />
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
