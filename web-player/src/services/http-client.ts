async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string; title?: string };
    return body.message ?? body.title ?? response.statusText;
  } catch {
    return response.statusText || "Erro na requisição.";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
}

async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return handleResponse<T>(response);
}

export { apiGet };
