import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/veiculos", label: "Veiculos" },
  { to: "/usuarios", label: "Usuarios" },
  { to: "/manutencoes", label: "Manutencoes" }
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>TransRota</h2>
        <p>Sistema de Gestao</p>
      </div>

      <nav className="sidebar-menu" aria-label="Navegacao principal">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
