import { apiRequest } from './client';

export function listWishlist() {
  return apiRequest('/wishlist');
}

export function addToWishlist(productId) {
  return apiRequest('/wishlist', { method: 'POST', body: { product_id: productId } });
}

export function removeFromWishlist(wishlistId) {
  return apiRequest(`/wishlist/${wishlistId}`, { method: 'DELETE' });
}
