import { apiRequest } from "./api.js";

const STORAGE_KEY = "transrota.usuario";

export async function login(credentials) {
  const usuario = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
  return usuario;
}

export function getUsuarioLogado() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
