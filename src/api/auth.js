import { apiRequest, clearToken, setToken } from './client';

export async function register(data) {
  const result = await apiRequest('/register', { method: 'POST', body: data });
  setToken(result.token);
  return result.user;
}

export async function login(username, password) {
  const result = await apiRequest('/login', { method: 'POST', body: { username, password } });
  setToken(result.token);
  return result.user;
}

export async function logout() {
  try {
    await apiRequest('/logout', { method: 'POST' });
  } finally {
    clearToken();
  }
}

export function getProfile() {
  return apiRequest('/profile');
}

export function updateProfile(data) {
  return apiRequest('/profile', { method: 'PUT', body: data });
}

export function adminListUsers() {
  return apiRequest('/admin/users');
}
