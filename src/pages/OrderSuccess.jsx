import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { getOrder } from '../api/orders';
import { formatINR } from '../utils/formatCurrency';

const STATUS_LABEL = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrder(id).then(setOrder).catch(() => setError('Order not found.'));
  }, [id]);

  if (error) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 120, textAlign: 'center' }}>
        <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.9rem' }}>{error}</p>
      </div>
    );
  }

  if (!order) {
    return <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }} />;
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%', padding: '40px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="card-dark glow-border" style={{ padding: '48px 40px', borderRadius: 2, textAlign: 'center' }}>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }}>
            <CheckCircle size={56} style={{ color: '#c9a84c', margin: '0 auto 20px' }} />
          </motion.div>
          <h1 className="font-serif gold-gradient" style={{ fontSize: '2rem', fontWeight: 400, marginBottom: 8 }}>
            {order.payment_status === 'paid' ? 'Order Confirmed!' : 'Order Placed!'}
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.85rem', marginBottom: 28 }}>
            Thank you, your order #{order.id} has been {order.payment_status === 'paid' ? 'paid and confirmed' : 'received'}.
          </p>

          <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 2, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(253,248,240,0.5)', marginBottom: 10 }}>
              <span>Status</span><span style={{ color: '#e8c97a' }}>{STATUS_LABEL[order.status] || order.status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(253,248,240,0.5)', marginBottom: 14 }}>
              <span>Payment</span><span style={{ color: '#e8c97a' }}>{STATUS_LABEL[order.payment_status] || order.payment_status}</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {order.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(253,248,240,0.6)' }}>
                  <span>{item.product_name} × {item.quantity}</span>
                  <span>{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', marginTop: 14, paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#fdf8f0', fontWeight: 600 }}>Total</span>
              <span className="gold-gradient" style={{ fontWeight: 700 }}>{formatINR(order.total_amount)}</span>
            </div>
            <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.72rem', marginTop: 16 }}>
              Shipping to {order.shipping_name}, {order.shipping_address}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/my-orders" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-gold" style={{ padding: '12px 28px', fontSize: '0.7rem', borderRadius: 2, border: 'none' }}>
                View My Orders
              </motion.button>
            </Link>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-outline-gold" style={{ padding: '12px 28px', fontSize: '0.7rem', borderRadius: 2 }}>
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
