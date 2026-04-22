import { useEffect, useMemo, useState } from "react";
import { getUsuarioLogado } from "../services/authService.js";
import {
  atualizarUsuario,
  cadastrarUsuario,
  desativarUsuario,
  listarUsuarios
} from "../services/usuarioService.js";

const estadoInicial = {
  nome: "",
  email: "",
  senha: "",
  perfil: ""
};

const perfis = ["CHEFE", "COMERCIAL", "MANUTENCAO"];

export default function Usuarios() {
  const usuarioLogado = getUsuarioLogado();
  const podeGerenciar = usuarioLogado?.perfil === "CHEFE";
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [perfilFiltro, setPerfilFiltro] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 3500);
    return () => clearTimeout(timer);
  }, [feedback]);

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return usuarios.filter((usuario) => {
      const correspondeBusca =
        !termo ||
        [usuario.nome, usuario.email]
          .filter(Boolean)
          .some((valor) => valor.toLowerCase().includes(termo));

      const correspondePerfil = !perfilFiltro || usuario.perfil === perfilFiltro;

      return correspondeBusca && correspondePerfil;
    });
  }, [usuarios, busca, perfilFiltro]);

  async function carregarUsuarios() {
    try {
      setCarregando(true);
      const dados = await listarUsuarios();
      setUsuarios(Array.isArray(dados) ? dados : []);
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel carregar usuarios.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  function abrirCadastro() {
    setEditandoId(null);
    setForm(estadoInicial);
    setFormAberto(true);
    setFeedback(null);
  }

  function fecharForm() {
    setEditandoId(null);
    setForm(estadoInicial);
    setFormAberto(false);
  }

  function editar(usuario) {
    setEditandoId(usuario.id);
    setForm({
      nome: usuario.nome || "",
      email: usuario.email || "",
      senha: "",
      perfil: usuario.perfil || ""
    });
    setFormAberto(true);
    setFeedback(null);
  }

  async function salvar(event) {
    event.preventDefault();

    const erro = validarForm();

    if (erro) {
      mostrarFeedback(erro, "erro");
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      email: form.email.trim().toLowerCase(),
      senha: form.senha,
      perfil: form.perfil,
      ativo: true
    };

    try {
      setSalvando(true);

      if (editandoId) {
        await atualizarUsuario(editandoId, payload);
        mostrarFeedback("Usuario atualizado com sucesso.", "sucesso");
      } else {
        await cadastrarUsuario(payload);
        mostrarFeedback("Usuario cadastrado com sucesso.", "sucesso");
      }

      fecharForm();
      await carregarUsuarios();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel salvar o usuario.", "erro");
    } finally {
      setSalvando(false);
    }
  }

  async function desativar(id) {
    const confirmado = window.confirm("Deseja desativar este usuario?");

    if (!confirmado) {
      return;
    }

    try {
      await desativarUsuario(id);
      mostrarFeedback("Usuario desativado com sucesso.", "sucesso");
      await carregarUsuarios();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel desativar o usuario.", "erro");
    }
  }

  function validarForm() {
    if (!form.nome.trim()) return "Nome e obrigatorio.";
    if (!form.email.trim() || !form.email.includes("@")) return "Informe um email valido.";
    if (!form.senha) return "Senha e obrigatoria.";
    if (!form.perfil) return "Perfil e obrigatorio.";

    return "";
  }

  function mostrarFeedback(mensagem, tipo) {
    setFeedback({ mensagem, tipo });
  }

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  return (
    <section className="view active">
      <div className="page-header">
        <div>
          <h2>Usuarios</h2>
          <p>Modulo administrativo para gerenciamento de acesso.</p>
        </div>
        <button className="btn-primary" type="button" onClick={abrirCadastro} disabled={!podeGerenciar}>
          + Novo usuario
        </button>
      </div>

      {!podeGerenciar && (
        <div className="admin-note">
          <strong>Acesso administrativo</strong>
          <span>Somente perfil CHEFE pode cadastrar usuarios. A listagem permanece disponivel para consulta.</span>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar por nome ou email"
        />

        <select value={perfilFiltro} onChange={(event) => setPerfilFiltro(event.target.value)}>
          <option value="">Todos os perfis</option>
          {perfis.map((perfil) => (
            <option key={perfil} value={perfil}>
              {perfil}
            </option>
          ))}
        </select>
      </div>

      {feedback && <div className={`feedback ${feedback.tipo}`}>{feedback.mensagem}</div>}

      {formAberto && (
        <form className="form-card" onSubmit={salvar}>
          <h3>{editandoId ? "Editar usuario" : "Cadastrar usuario"}</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={form.nome}
                onChange={(event) => atualizarCampo("nome", event.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => atualizarCampo("email", event.target.value)}
                placeholder="usuario@transrota.com"
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={form.senha}
                onChange={(event) => atualizarCampo("senha", event.target.value)}
                placeholder={editandoId ? "Informe a nova senha" : "Senha inicial"}
              />
            </div>

            <div className="form-group">
              <label>Perfil</label>
              <select value={form.perfil} onChange={(event) => atualizarCampo("perfil", event.target.value)}>
                <option value="">Selecione</option>
                {perfis.map((perfil) => (
                  <option key={perfil} value={perfil}>
                    {perfil}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button className="btn-secondary" type="button" onClick={fecharForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <strong>{usuario.nome}</strong>
                </td>
                <td>{usuario.email}</td>
                <td>
                  <span className="perfil-tag">{usuario.perfil}</span>
                </td>
                <td>
                  <span className="status disponivel">Ativo</span>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      className="btn-icon btn-edit"
                      type="button"
                      onClick={() => editar(usuario)}
                      disabled={!podeGerenciar}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      type="button"
                      onClick={() => desativar(usuario.id)}
                      disabled={!podeGerenciar}
                    >
                      Desativar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!carregando && usuariosFiltrados.length === 0 && (
        <div className="empty-state">Nenhum usuario ativo encontrado para os filtros selecionados.</div>
      )}

      {carregando && <div className="empty-state">Carregando usuarios...</div>}
    </section>
  );
}
