import { apiRequest } from './client';

export function listProducts({ search, category } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category && category !== 'All') params.set('category', category);
  const qs = params.toString();
  return apiRequest(`/products${qs ? `?${qs}` : ''}`);
}

export function getProduct(id) {
  return apiRequest(`/products/${id}`);
}

export function createProduct(formData) {
  return apiRequest('/products', { method: 'POST', body: formData, isMultipart: true });
}

export function updateProduct(id, formData) {
  return apiRequest(`/products/${id}`, { method: 'PUT', body: formData, isMultipart: true });
}

export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, { method: 'DELETE' });
}

export function adminListProducts() {
  return apiRequest('/admin/products');
}
