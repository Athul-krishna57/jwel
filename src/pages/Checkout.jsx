import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { listCart } from '../api/cart';
import { createOrder, pay } from '../api/orders';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatCurrency';

const labelStyle = { display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 };
const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' };

export default function Checkout() {
  const { user } = useAuth();
  const { refreshCounts } = useShop();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ shipping_name: '', shipping_address: '', phone: '' });
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    listCart().then(data => setItems(data.results ?? data)).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        shipping_name: prev.shipping_name || `${user.first_name} ${user.last_name}`.trim() || user.username,
        phone: prev.phone || user.phone || '',
        shipping_address: prev.shipping_address || user.address || '',
      }));
    }
  }, [user]);

  const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      const order = await createOrder(form);
      await pay(order.id, 'stub');
      await refreshCounts();
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      setError(err.message || 'Could not place your order.');
    } finally {
      setPlacing(false);
    }
  };

  if (!loading && items.length === 0) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 120, textAlign: 'center' }}>
        <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.9rem', marginBottom: 24 }}>Your bag is empty — add something before checking out.</p>
        <Link to="/collections" style={{ textDecoration: 'none' }}>
          <motion.button whileHover={{ scale: 1.05 }} className="btn-gold" style={{ padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
            Explore Collections
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Almost There
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 400, marginBottom: 16 }}>
          Checkout
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 80px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 40, alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-dark glow-border" style={{ padding: 32, borderRadius: 2 }}>
          <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>Shipping Details</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" name="shipping_name" value={form.shipping_name} onChange={handleChange} required placeholder="Priya Sharma" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Shipping Address *</label>
              <textarea name="shipping_address" value={form.shipping_address} onChange={handleChange} required rows={4} placeholder="House no, street, city, state, PIN" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {error && <p style={{ color: '#e88a7a', fontSize: '0.78rem' }}>{error}</p>}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={placing}
              className="btn-gold"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 14, fontSize: '0.72rem', borderRadius: 2, border: 'none', opacity: placing ? 0.8 : 1, marginTop: 8 }}
            >
              <CreditCard size={14} /> {placing ? 'Placing Order...' : `Pay ${formatINR(total)} (Demo)`}
            </motion.button>
            <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.7rem', textAlign: 'center' }}>
              Demo payment — no real charge is made. Razorpay/Stripe integration coming soon.
            </p>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-dark" style={{ padding: 28, borderRadius: 2 }}>
          <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>Order Summary</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(253,248,240,0.6)' }}>
                <span>{item.product.name} × {item.quantity}</span>
                <span>{formatINR(item.subtotal)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#fdf8f0', fontWeight: 600 }}>Total</span>
            <span className="gold-gradient" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatINR(total)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
