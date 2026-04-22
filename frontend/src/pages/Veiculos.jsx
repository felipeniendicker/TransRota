import { useEffect, useMemo, useState } from "react";
import {
  atualizarVeiculo,
  cadastrarVeiculo,
  desativarVeiculo,
  listarVeiculos
} from "../services/veiculoService.js";

const estadoInicial = {
  placa: "",
  modelo: "",
  marca: "",
  ano: "",
  categoria: "",
  capacidadeKg: "",
  status: ""
};

const categorias = ["Van", "Caminhao", "Utilitario"];
const statusVeiculo = ["DISPONIVEL", "EM_ROTA", "MANUTENCAO", "BAIXADO"];

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarVeiculos();
  }, []);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 3500);
    return () => clearTimeout(timer);
  }, [feedback]);

  const veiculosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return veiculos.filter((veiculo) => {
      const correspondeBusca =
        !termo ||
        [veiculo.placa, veiculo.modelo, veiculo.marca]
          .filter(Boolean)
          .some((valor) => valor.toLowerCase().includes(termo));

      const correspondeCategoria = !categoriaFiltro || veiculo.categoria === categoriaFiltro;
      const correspondeStatus = !statusFiltro || veiculo.status === statusFiltro;

      return correspondeBusca && correspondeCategoria && correspondeStatus;
    });
  }, [veiculos, busca, categoriaFiltro, statusFiltro]);

  async function carregarVeiculos() {
    try {
      setCarregando(true);
      const dados = await listarVeiculos();
      setVeiculos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel carregar veiculos.", "erro");
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

  function editar(veiculo) {
    setEditandoId(veiculo.id);
    setForm({
      placa: veiculo.placa || "",
      modelo: veiculo.modelo || "",
      marca: veiculo.marca || "",
      ano: veiculo.ano || "",
      categoria: veiculo.categoria || "",
      capacidadeKg: veiculo.capacidadeKg || "",
      status: veiculo.status || ""
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
      placa: form.placa.trim().toUpperCase(),
      modelo: form.modelo.trim(),
      marca: form.marca.trim(),
      ano: Number(form.ano),
      categoria: form.categoria,
      capacidadeKg: Number(form.capacidadeKg),
      status: form.status,
      ativo: true
    };

    try {
      setSalvando(true);

      if (editandoId) {
        await atualizarVeiculo(editandoId, payload);
        mostrarFeedback("Veiculo atualizado com sucesso.", "sucesso");
      } else {
        await cadastrarVeiculo(payload);
        mostrarFeedback("Veiculo cadastrado com sucesso.", "sucesso");
      }

      fecharForm();
      await carregarVeiculos();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel salvar o veiculo.", "erro");
    } finally {
      setSalvando(false);
    }
  }

  async function desativar(id) {
    const confirmado = window.confirm("Deseja desativar este veiculo?");

    if (!confirmado) {
      return;
    }

    try {
      await desativarVeiculo(id);
      mostrarFeedback("Veiculo desativado com sucesso.", "sucesso");
      await carregarVeiculos();
    } catch (error) {
      mostrarFeedback(error.message || "Nao foi possivel desativar o veiculo.", "erro");
    }
  }

  function validarForm() {
    const anoAtual = new Date().getFullYear() + 1;

    if (!form.placa.trim()) return "Placa e obrigatoria.";
    if (!form.modelo.trim()) return "Modelo e obrigatorio.";
    if (!form.marca.trim()) return "Marca e obrigatoria.";
    if (!form.ano || Number(form.ano) < 1980 || Number(form.ano) > anoAtual) {
      return "Informe um ano valido.";
    }
    if (!form.categoria) return "Categoria e obrigatoria.";
    if (!form.capacidadeKg || Number(form.capacidadeKg) <= 0) {
      return "Capacidade deve ser maior que zero.";
    }
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
          <h2>Veiculos</h2>
          <p>Cadastro, consulta e desativacao logica da frota.</p>
        </div>
        <button className="btn-primary" type="button" onClick={abrirCadastro}>
          + Novo veiculo
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar por placa, modelo ou marca"
        />

        <select value={categoriaFiltro} onChange={(event) => setCategoriaFiltro(event.target.value)}>
          <option value="">Todas as categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {rotuloCategoria(categoria)}
            </option>
          ))}
        </select>

        <select value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)}>
          <option value="">Todos os status</option>
          {statusVeiculo.map((status) => (
            <option key={status} value={status}>
              {rotuloStatus(status)}
            </option>
          ))}
        </select>
      </div>

      {feedback && <div className={`feedback ${feedback.tipo}`}>{feedback.mensagem}</div>}

      {formAberto && (
        <form className="form-card" onSubmit={salvar}>
          <h3>{editandoId ? "Editar veiculo" : "Cadastrar veiculo"}</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Placa</label>
              <input
                type="text"
                value={form.placa}
                onChange={(event) => atualizarCampo("placa", event.target.value)}
                placeholder="ABC1D23"
                maxLength={8}
              />
            </div>

            <div className="form-group">
              <label>Modelo</label>
              <input
                type="text"
                value={form.modelo}
                onChange={(event) => atualizarCampo("modelo", event.target.value)}
                placeholder="Sprinter"
              />
            </div>

            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                value={form.marca}
                onChange={(event) => atualizarCampo("marca", event.target.value)}
                placeholder="Mercedes-Benz"
              />
            </div>

            <div className="form-group">
              <label>Ano</label>
              <input
                type="number"
                value={form.ano}
                onChange={(event) => atualizarCampo("ano", event.target.value)}
                placeholder="2022"
                min="1980"
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select value={form.categoria} onChange={(event) => atualizarCampo("categoria", event.target.value)}>
                <option value="">Selecione</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {rotuloCategoria(categoria)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Capacidade (Kg)</label>
              <input
                type="number"
                value={form.capacidadeKg}
                onChange={(event) => atualizarCampo("capacidadeKg", event.target.value)}
                placeholder="1200"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={(event) => atualizarCampo("status", event.target.value)}>
                <option value="">Selecione</option>
                {statusVeiculo.map((status) => (
                  <option key={status} value={status}>
                    {rotuloStatus(status)}
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
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Ano</th>
              <th>Categoria</th>
              <th>Capacidade</th>
              <th>Status</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {veiculosFiltrados.map((veiculo) => (
              <tr key={veiculo.id}>
                <td>
                  <strong>{veiculo.placa}</strong>
                </td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.ano}</td>
                <td>{rotuloCategoria(veiculo.categoria)}</td>
                <td>{formatarKg(veiculo.capacidadeKg)}</td>
                <td>
                  <span className={`status ${classeStatus(veiculo.status)}`}>{rotuloStatus(veiculo.status)}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="btn-icon btn-edit" type="button" onClick={() => editar(veiculo)}>
                      Editar
                    </button>
                    <button className="btn-icon btn-delete" type="button" onClick={() => desativar(veiculo.id)}>
                      Desativar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!carregando && veiculosFiltrados.length === 0 && (
        <div className="empty-state">Nenhum veiculo ativo encontrado para os filtros selecionados.</div>
      )}

      {carregando && <div className="empty-state">Carregando veiculos...</div>}
    </section>
  );
}

function rotuloCategoria(categoria) {
  const rotulos = {
    Caminhao: "Caminhao",
    Utilitario: "Utilitario"
  };

  return rotulos[categoria] || categoria;
}

function rotuloStatus(status) {
  const rotulos = {
    DISPONIVEL: "Disponivel",
    EM_ROTA: "Em rota",
    MANUTENCAO: "Manutencao",
    BAIXADO: "Baixado"
  };

  return rotulos[status] || status;
}

function classeStatus(status) {
  const classes = {
    DISPONIVEL: "disponivel",
    EM_ROTA: "rota",
    MANUTENCAO: "manutencao",
    BAIXADO: "baixado"
  };

  return classes[status] || "baixado";
}

function formatarKg(valor) {
  return `${Number(valor || 0).toLocaleString("pt-BR")} kg`;
}
