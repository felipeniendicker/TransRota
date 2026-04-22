import { useEffect, useMemo, useState } from "react";
import { getUsuarioLogado } from "../services/authService.js";
import {
  atualizarManutencao,
  cadastrarManutencao,
  desativarManutencao,
  listarManutencoes
} from "../services/manutencaoService.js";
import { listarVeiculos } from "../services/veiculoService.js";

const estadoInicial = {
  veiculoId: "",
  descricao: "",
  dataAbertura: "",
  status: "",
  observacao: ""
};

const statusManutencao = ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"];

export default function Manutencoes() {
  const usuarioLogado = getUsuarioLogado();
  const podeGerenciar = ["CHEFE", "MANUTENCAO"].includes(usuarioLogado?.perfil);
  const [manutencoes, setManutencoes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [detalhes, setDetalhes] = useState(null);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 3500);
    return () => clearTimeout(timer);
  }, [feedback]);

  const manutencoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return manutencoes.filter((manutencao) => {
      const correspondeBusca =
        !termo ||
        [manutencao.placaVeiculo, manutencao.descricao]
          .filter(Boolean)
          .some((valor) => valor.toLowerCase().includes(termo));

      const correspondeStatus = !statusFiltro || manutencao.status === statusFiltro;

      return correspondeBusca && correspondeStatus;
    });
  }, [manutencoes, busca, statusFiltro]);

  async function carregarDados() {
    try {
      setCarregando(true);
      const [manutencoesData, veiculosData] = await Promise.all([
        listarManutencoes(),
        listarVeiculos()
      ]);
      setManutencoes(Array.isArray(manutencoesData) ? manutencoesData : []);
      setVeiculos(Array.isArray(veiculosData) ? veiculosData : []);
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel carregar manutencoes.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  function abrirCadastro() {
    setEditandoId(null);
    setForm(estadoInicial);
    setFormAberto(true);
    setDetalhes(null);
    setFeedback(null);
  }

  function fecharForm() {
    setEditandoId(null);
    setForm(estadoInicial);
    setFormAberto(false);
  }

  function editar(manutencao) {
    setEditandoId(manutencao.id);
    setForm({
      veiculoId: String(manutencao.veiculoId || ""),
      descricao: manutencao.descricao || "",
      dataAbertura: manutencao.dataAbertura || "",
      status: manutencao.status || "",
      observacao: manutencao.observacao || ""
    });
    setFormAberto(true);
    setDetalhes(null);
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
      veiculoId: Number(form.veiculoId),
      descricao: form.descricao.trim(),
      dataAbertura: form.dataAbertura,
      status: form.status,
      observacao: form.observacao.trim(),
      ativo: true
    };

    try {
      setSalvando(true);

      if (editandoId) {
        await atualizarManutencao(editandoId, payload);
        mostrarFeedback("Manutencao atualizada com sucesso.", "sucesso");
      } else {
        await cadastrarManutencao(payload);
        mostrarFeedback("Manutencao cadastrada com sucesso.", "sucesso");
      }

      fecharForm();
      await carregarDados();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel salvar a manutencao.", "erro");
    } finally {
      setSalvando(false);
    }
  }

  async function desativar(id) {
    const confirmado = window.confirm("Deseja desativar esta manutencao?");

    if (!confirmado) {
      return;
    }

    try {
      await desativarManutencao(id);
      setDetalhes(null);
      mostrarFeedback("Manutencao desativada com sucesso.", "sucesso");
      await carregarDados();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel desativar a manutencao.", "erro");
    }
  }

  function validarForm() {
    if (!form.veiculoId) return "Veiculo e obrigatorio.";
    if (!form.descricao.trim()) return "Descricao e obrigatoria.";
    if (!form.dataAbertura) return "Data de abertura e obrigatoria.";
    if (!form.status) return "Status e obrigatorio.";

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
          <h2>Manutencoes</h2>
          <p>Registro e acompanhamento basico das manutencoes da frota.</p>
        </div>
        <button className="btn-primary" type="button" onClick={abrirCadastro} disabled={!podeGerenciar}>
          + Nova manutencao
        </button>
      </div>

      {!podeGerenciar && (
        <div className="admin-note">
          <strong>Acesso operacional</strong>
          <span>Somente perfis CHEFE e MANUTENCAO podem cadastrar ou editar manutencoes.</span>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar por placa ou descricao"
        />

        <select value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)}>
          <option value="">Todos os status</option>
          {statusManutencao.map((status) => (
            <option key={status} value={status}>
              {rotuloStatus(status)}
            </option>
          ))}
        </select>
      </div>

      {feedback && <div className={`feedback ${feedback.tipo}`}>{feedback.mensagem}</div>}

      {formAberto && (
        <form className="form-card" onSubmit={salvar}>
          <h3>{editandoId ? "Editar manutencao" : "Cadastrar manutencao"}</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Veiculo</label>
              <select value={form.veiculoId} onChange={(event) => atualizarCampo("veiculoId", event.target.value)}>
                <option value="">Selecione</option>
                {veiculos.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
                    {veiculo.placa} - {veiculo.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={(event) => atualizarCampo("status", event.target.value)}>
                <option value="">Selecione</option>
                {statusManutencao.map((status) => (
                  <option key={status} value={status}>
                    {rotuloStatus(status)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Data de abertura</label>
              <input
                type="date"
                value={form.dataAbertura}
                onChange={(event) => atualizarCampo("dataAbertura", event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Descricao</label>
              <input
                type="text"
                value={form.descricao}
                onChange={(event) => atualizarCampo("descricao", event.target.value)}
                placeholder="Ex: Revisao de freios"
              />
            </div>

            <div className="form-group form-wide">
              <label>Observacao</label>
              <input
                type="text"
                value={form.observacao}
                onChange={(event) => atualizarCampo("observacao", event.target.value)}
                placeholder="Observacao operacional"
              />
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
              <th>Veiculo</th>
              <th>Descricao</th>
              <th>Data de abertura</th>
              <th>Status</th>
              <th>Observacao</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {manutencoesFiltradas.map((manutencao) => (
              <tr key={manutencao.id}>
                <td>
                  <strong>{manutencao.placaVeiculo}</strong>
                </td>
                <td>{manutencao.descricao}</td>
                <td>{formatarData(manutencao.dataAbertura)}</td>
                <td>
                  <span className={`status ${classeStatus(manutencao.status)}`}>
                    {rotuloStatus(manutencao.status)}
                  </span>
                </td>
                <td>{manutencao.observacao || "-"}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn-icon btn-secondary" type="button" onClick={() => setDetalhes(manutencao)}>
                      Detalhes
                    </button>
                    <button
                      className="btn-icon btn-edit"
                      type="button"
                      onClick={() => editar(manutencao)}
                      disabled={!podeGerenciar}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      type="button"
                      onClick={() => desativar(manutencao.id)}
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

      {!carregando && manutencoesFiltradas.length === 0 && (
        <div className="empty-state">Nenhuma manutencao ativa encontrada para os filtros selecionados.</div>
      )}

      {carregando && <div className="empty-state">Carregando manutencoes...</div>}

      {detalhes && (
        <div className="details-panel">
          <div className="details-header">
            <h3>Detalhes da manutencao</h3>
            <button className="btn-secondary" type="button" onClick={() => setDetalhes(null)}>
              Fechar
            </button>
          </div>

          <div className="details-grid">
            <div>
              <span>Veiculo</span>
              <strong>{detalhes.placaVeiculo}</strong>
            </div>
            <div>
              <span>Descricao</span>
              <strong>{detalhes.descricao}</strong>
            </div>
            <div>
              <span>Data de abertura</span>
              <strong>{formatarData(detalhes.dataAbertura)}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{rotuloStatus(detalhes.status)}</strong>
            </div>
            <div>
              <span>Observacao</span>
              <strong>{detalhes.observacao || "Sem observacao"}</strong>
            </div>
            <div>
              <span>Situacao</span>
              <strong>{detalhes.ativo ? "Ativa" : "Inativa"}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function rotuloStatus(status) {
  const rotulos = {
    ABERTA: "Aberta",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDA: "Concluida"
  };

  return rotulos[status] || status;
}

function classeStatus(status) {
  const classes = {
    ABERTA: "aberta",
    EM_ANDAMENTO: "andamento",
    CONCLUIDA: "concluida"
  };

  return classes[status] || "baixado";
}

function formatarData(valor) {
  if (!valor) return "-";

  const partes = valor.split("-");

  if (partes.length !== 3) {
    return valor;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
