import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { listCart } from '../api/cart';
import { listWishlist } from '../api/wishlist';
import { useAuth } from './AuthContext';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshCounts = useCallback(async () => {
    if (!isAuthenticated) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }
    try {
      const [cart, wishlist] = await Promise.all([listCart(), listWishlist()]);
      setCartCount(cart.count ?? cart.results?.length ?? 0);
      setWishlistCount(wishlist.count ?? wishlist.results?.length ?? 0);
    } catch {
      setCartCount(0);
      setWishlistCount(0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCounts();
  }, [refreshCounts]);

  return (
    <ShopContext.Provider value={{ cartCount, wishlistCount, refreshCounts }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within a ShopProvider');
  return ctx;
}
