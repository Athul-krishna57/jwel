import { apiRequest } from './client';

export function listProductReviews(productId) {
  return apiRequest(`/reviews/${productId}`);
}

export function createReview(data) {
  return apiRequest('/reviews', { method: 'POST', body: data });
}
