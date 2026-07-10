const TOKEN_KEY = 'lookin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(status, data) {
    super(extractMessage(data) || `Request failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}

function extractMessage(data) {
  if (!data) return null;
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const value = data[firstKey];
    const text = Array.isArray(value) ? value[0] : value;
    return typeof text === 'string' ? text : null;
  }
  return null;
}

export async function apiRequest(path, { method = 'GET', body, isMultipart = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Token ${token}`;

  let payload = body;
  if (body && !isMultipart) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const response = await fetch(`/api${path}`, { method, headers, body: payload });

  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }
  return data;
}
