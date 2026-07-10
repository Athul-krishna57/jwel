import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { listOrders } from '../api/orders';
import { formatINR } from '../utils/formatCurrency';

const STATUS_COLOR = {
  pending: '#e8c97a',
  paid: '#8fd19e',
  shipped: '#8fbfd1',
  delivered: '#8fd19e',
  cancelled: '#e88a7a',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listOrders().then(data => setOrders(data.results ?? data)).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Order History
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 400, marginBottom: 16 }}>
          My Orders
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 80px' }}>
        {!loading && orders.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '96px 0' }}>
            <Package size={44} style={{ color: 'rgba(201,168,76,0.3)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: 24 }}>You haven't placed any orders yet.</p>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-gold" style={{ padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Explore Collections
              </motion.button>
            </Link>
          </motion.div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={`/order-success/${order.id}`} style={{ textDecoration: 'none' }}>
                <div className="card-dark" style={{ padding: '20px 24px', borderRadius: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, cursor: 'pointer' }}>
                  <div>
                    <p style={{ color: '#fdf8f0', fontSize: '0.9rem', fontWeight: 500, marginBottom: 4 }}>Order #{order.id}</p>
                    <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.75rem' }}>{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: STATUS_COLOR[order.status] || '#e8c97a' }}>{order.status}</span>
                    <span className="gold-gradient" style={{ fontSize: '1rem', fontWeight: 700 }}>{formatINR(order.total_amount)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
