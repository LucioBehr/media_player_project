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

  return response.json() as Promise<T>;
}

async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return handleResponse<T>(response);
}

async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
}

async function apiPut<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
}

async function apiDelete(url: string): Promise<void> {
  const response = await fetch(url, { method: "DELETE" });
  return handleResponse<void>(response);
}

async function apiDeleteJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { method: "DELETE" });
  return handleResponse<T>(response);
}

async function apiPostFormData<T>(url: string, body: FormData): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    body,
  });

  return handleResponse<T>(response);
}

async function apiPutFormData<T>(url: string, body: FormData): Promise<T> {
  const response = await fetch(url, {
    method: "PUT",
    body,
  });

  return handleResponse<T>(response);
}

export { apiGet, apiPost, apiPut, apiDelete, apiDeleteJson, apiPostFormData, apiPutFormData };
