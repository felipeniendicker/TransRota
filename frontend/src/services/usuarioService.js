import { getUsuarioLogado } from "./authService.js";
import { apiRequest } from "./api.js";

function authHeaders() {
  const usuario = getUsuarioLogado();

  return usuario?.perfil ? { perfil: usuario.perfil } : {};
}

export function listarUsuarios() {
  return apiRequest("/usuarios");
}

export function cadastrarUsuario(usuario) {
  return apiRequest("/usuarios", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(usuario)
  });
}

export function atualizarUsuario(id, usuario) {
  return apiRequest(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(usuario)
  });
}

export function desativarUsuario(id) {
  return apiRequest(`/usuarios/${id}`, {
    method: "DELETE"
  });
}
