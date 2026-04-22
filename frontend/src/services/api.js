const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const { headers, ...requestOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });

  const contentType = response.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  const body = hasJson ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message || body?.mensagem || "Nao foi possivel concluir a operacao.";
    throw new Error(message);
  }

  return body;
}
