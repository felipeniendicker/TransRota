const pageMeta = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Visao geral do sistema"
  },
  "/veiculos": {
    title: "Veiculos",
    subtitle: "Gestao operacional da frota"
  },
  "/usuarios": {
    title: "Usuarios",
    subtitle: "Gestao de usuarios e perfis"
  },
  "/manutencoes": {
    title: "Manutencoes",
    subtitle: "Controle basico de manutencoes"
  }
};

export default function Topbar({ pathname, usuario }) {
  const meta = pageMeta[pathname] || pageMeta["/dashboard"];
  const perfilClass = usuario?.perfil ? `perfil-${usuario.perfil.toLowerCase()}` : "";

  return (
    <header className="topbar">
      <div>
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>

      <div className="topbar-right">
        <span className="user-chip">{usuario?.nome || "Usuario"}</span>
        <span className={`perfil-badge ${perfilClass}`}>{usuario?.perfil || "PERFIL"}</span>
      </div>
    </header>
  );
}
