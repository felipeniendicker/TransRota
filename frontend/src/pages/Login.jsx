import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUsuarioLogado, login } from "../services/authService.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (getUsuarioLogado()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Informe email e senha para acessar.");
      return;
    }

    try {
      setCarregando(true);
      await login({ email, senha });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErro(error.message || "Credenciais invalidas.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="login-screen">
      <form className="login-panel" onSubmit={handleSubmit}>
        <div className="login-brand">
          <h1>TransRota</h1>
          <p>Acesse o sistema operacional</p>
        </div>

        {erro && <div className="feedback erro">{erro}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="chefe@transrota.com"
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
          />
        </div>

        <button className="btn-primary btn-login" type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
}
