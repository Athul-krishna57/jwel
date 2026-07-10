import { apiRequest } from './client';

export function createOrder(shipping) {
  return apiRequest('/orders', { method: 'POST', body: shipping });
}

export function listOrders() {
  return apiRequest('/orders');
}

export function getOrder(id) {
  return apiRequest(`/orders/${id}`);
}

export function pay(orderId, method = 'stub') {
  return apiRequest('/payment', { method: 'POST', body: { order_id: orderId, method } });
}

export function adminListOrders() {
  return apiRequest('/admin/orders');
}
