import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { listCart, updateCartItem, removeCartItem } from '../api/cart';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatCurrency';
import { getProductVisual } from '../utils/categoryVisuals';

export default function Cart() {
  const navigate = useNavigate();
  const { refreshCounts } = useShop();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCart()
      .then(data => setItems(data.results ?? data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleQuantityChange = async (item, quantity) => {
    if (quantity < 1) return;
    const updated = await updateCartItem(item.id, quantity);
    setItems(prev => prev.map(i => (i.id === item.id ? updated : i)));
    refreshCounts();
  };

  const handleRemove = async (item) => {
    await removeCartItem(item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    refreshCounts();
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '60px 24px 50px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Your Selections
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 400, marginBottom: 16 }}>
          Your Bag
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px' }}>
        {!loading && items.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '96px 0' }}>
            <ShoppingBag size={44} style={{ color: 'rgba(201,168,76,0.3)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: 24 }}>Your bag is empty.</p>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-gold" style={{ padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Explore Collections
              </motion.button>
            </Link>
          </motion.div>
        )}

        {items.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AnimatePresence>
                {items.map(item => {
                  const visual = getProductVisual(item.product);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="card-dark"
                      style={{ display: 'flex', gap: 20, padding: 16, borderRadius: 2, alignItems: 'center' }}
                    >
                      <div style={{ width: 84, height: 84, borderRadius: 2, flexShrink: 0, background: visual.image ? `url(${visual.image}) center/cover` : visual.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'rgba(201,168,76,0.75)' }}>
                        {!visual.image && visual.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{item.product.category_name}</p>
                        <Link to={`/product/${item.product.id}`} style={{ color: '#fdf8f0', fontSize: '0.95rem', fontWeight: 500 }}>{item.product.name}</Link>
                        <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.78rem', marginTop: 4 }}>{formatINR(item.product.price)} each</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 2 }}>
                        <button onClick={() => handleQuantityChange(item, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#e8c97a', padding: '6px 10px' }}><Minus size={12} /></button>
                        <span style={{ padding: '0 12px', color: '#fdf8f0', fontSize: '0.82rem' }}>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#e8c97a', padding: '6px 10px' }}><Plus size={12} /></button>
                      </div>
                      <span className="gold-gradient" style={{ fontSize: '0.95rem', fontWeight: 600, minWidth: 90, textAlign: 'right' }}>{formatINR(item.subtotal)}</span>
                      <button onClick={() => handleRemove(item)} style={{ background: 'transparent', border: 'none', color: 'rgba(232,138,122,0.7)', padding: 6 }}>
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="card-dark glow-border" style={{ padding: 28, borderRadius: 2, position: 'sticky', top: 100 }}>
              <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>Order Summary</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(253,248,240,0.6)', fontSize: '0.85rem', marginBottom: 12 }}>
                <span>Subtotal</span><span>{formatINR(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(253,248,240,0.4)', fontSize: '0.8rem', marginBottom: 20 }}>
                <span>Shipping</span><span>Free</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ color: '#fdf8f0', fontWeight: 600 }}>Total</span>
                <span className="gold-gradient" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatINR(total)}</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/checkout')} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
