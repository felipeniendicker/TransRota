import { useEffect, useMemo, useState } from "react";
import { listarManutencoes } from "../services/manutencaoService.js";
import { listarVeiculos } from "../services/veiculoService.js";

export default function Dashboard() {
  const [veiculos, setVeiculos] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarResumo();
  }, []);

  const resumo = useMemo(() => {
    return {
      veiculosAtivos: veiculos.length,
      emRota: veiculos.filter((veiculo) => veiculo.status === "EM_ROTA").length,
      emManutencao: veiculos.filter((veiculo) => veiculo.status === "MANUTENCAO").length,
      manutencoesAbertas: manutencoes.filter((manutencao) => manutencao.status !== "CONCLUIDA").length
    };
  }, [veiculos, manutencoes]);

  async function carregarResumo() {
    try {
      const [veiculosData, manutencoesData] = await Promise.all([
        listarVeiculos(),
        listarManutencoes()
      ]);
      setVeiculos(Array.isArray(veiculosData) ? veiculosData : []);
      setManutencoes(Array.isArray(manutencoesData) ? manutencoesData : []);
    } catch (error) {
      setErro(error.message || "Nao foi possivel carregar o resumo operacional.");
    }
  }

  return (
    <section className="view active">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Visao geral do sistema TransRota.</p>
        </div>
      </div>

      {erro && <div className="feedback erro">{erro}</div>}

      <div className="cards">
        <div className="card">
          <h3>Veiculos ativos</h3>
          <p>{resumo.veiculosAtivos}</p>
        </div>
        <div className="card">
          <h3>Em rota</h3>
          <p>{resumo.emRota}</p>
        </div>
        <div className="card">
          <h3>Em manutencao</h3>
          <p>{resumo.emManutencao}</p>
        </div>
      </div>

      <div className="module-placeholder dashboard-note">
        <h3>Manutencoes em acompanhamento</h3>
        <p>{resumo.manutencoesAbertas} registros ativos ainda nao concluidos.</p>
      </div>
    </section>
  );
}
