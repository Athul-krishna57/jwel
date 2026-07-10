import { apiRequest } from './client';

export function listCart() {
  return apiRequest('/cart');
}

export function addToCart(productId, quantity = 1) {
  return apiRequest('/cart', { method: 'POST', body: { product_id: productId, quantity } });
}

export function updateCartItem(id, quantity) {
  return apiRequest(`/cart/${id}`, { method: 'PUT', body: { quantity } });
}

export function removeCartItem(id) {
  return apiRequest(`/cart/${id}`, { method: 'DELETE' });
}
