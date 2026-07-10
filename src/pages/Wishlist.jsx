import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { listWishlist, removeFromWishlist } from '../api/wishlist';
import { addToCart } from '../api/cart';
import { useShop } from '../context/ShopContext';

export default function Wishlist() {
  const { refreshCounts } = useShop();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listWishlist()
      .then(data => setItems(data.results ?? data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (product) => {
    const item = items.find(i => i.product.id === product.id);
    if (!item) return;
    await removeFromWishlist(item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    refreshCounts();
  };

  const handleMoveToBag = async (product) => {
    const item = items.find(i => i.product.id === product.id);
    if (!item) return;
    await addToCart(product.id, 1);
    await removeFromWishlist(item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    refreshCounts();
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '60px 24px 50px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Saved For Later
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 400, marginBottom: 16 }}>
          Your Wishlist
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        {!loading && items.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '96px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: 'rgba(201,168,76,0.3)' }}>♡</div>
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: 24 }}>Your wishlist is empty.</p>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-gold" style={{ padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Explore Collections
              </motion.button>
            </Link>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {items.map((item, i) => (
              <ProductCard
                key={item.id}
                product={item.product}
                index={i}
                isWishlisted
                onToggleWishlist={handleRemove}
                onAddToCart={handleMoveToBag}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
