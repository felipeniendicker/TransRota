import { getUsuarioLogado } from "./authService.js";
import { apiRequest } from "./api.js";

function authHeaders() {
  const usuario = getUsuarioLogado();

  return usuario?.perfil ? { perfil: usuario.perfil } : {};
}

export function listarManutencoes() {
  return apiRequest("/manutencoes");
}

export function cadastrarManutencao(manutencao) {
  return apiRequest("/manutencoes", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(manutencao)
  });
}

export function atualizarManutencao(id, manutencao) {
  return apiRequest(`/manutencoes/${id}`, {
    method: "PUT",
    body: JSON.stringify(manutencao)
  });
}

export function desativarManutencao(id) {
  return apiRequest(`/manutencoes/${id}`, {
    method: "DELETE"
  });
}
