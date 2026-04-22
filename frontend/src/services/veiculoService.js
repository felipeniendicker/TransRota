import { getUsuarioLogado } from "./authService.js";
import { apiRequest } from "./api.js";

function authHeaders() {
  const usuario = getUsuarioLogado();

  return usuario?.perfil ? { perfil: usuario.perfil } : {};
}

export function listarVeiculos() {
  return apiRequest("/veiculos");
}

export function cadastrarVeiculo(veiculo) {
  return apiRequest("/veiculos", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(veiculo)
  });
}

export function atualizarVeiculo(id, veiculo) {
  return apiRequest(`/veiculos/${id}`, {
    method: "PUT",
    body: JSON.stringify(veiculo)
  });
}

export function desativarVeiculo(id) {
  return apiRequest(`/veiculos/${id}`, {
    method: "DELETE"
  });
}
