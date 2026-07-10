import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/formatCurrency';
import { getProductVisual } from '../utils/categoryVisuals';

export default function ProductCard({ product, index = 0, isWishlisted = false, onToggleWishlist, onAddToCart }) {
  const navigate = useNavigate();
  const visual = getProductVisual(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer', background: 'linear-gradient(135deg, rgba(20,18,12,0.9), rgba(15,13,8,0.95))', border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.4s ease' }}
    >
      <div style={{ height: 220, background: visual.image ? `url(${visual.image}) center/cover` : visual.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {!visual.image && (
          <>
            <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            <motion.div whileHover={{ scale: 1.15, rotate: 15 }} transition={{ duration: 0.4 }} style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1, color: 'rgba(201,168,76,0.75)' }}>
              {visual.emoji}
            </motion.div>
          </>
        )}

        {product.tag && (
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 9px', borderRadius: 2 }}>
            {product.tag}
          </div>
        )}

        {onToggleWishlist && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
            style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', background: isWishlisted ? 'rgba(201,168,76,0.2)' : 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isWishlisted ? '#e8c97a' : 'rgba(201,168,76,0.5)', backdropFilter: 'blur(4px)' }}
          >
            <Heart size={12} fill={isWishlisted ? '#e8c97a' : 'none'} />
          </motion.button>
        )}
      </div>

      <div style={{ padding: '18px 18px 22px' }}>
        <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>{product.category_name}</p>
        <h3 style={{ color: '#fdf8f0', fontSize: '1.05rem', fontWeight: 500, marginBottom: 5, fontFamily: 'serif' }}>{product.name}</h3>
        <p style={{ color: 'rgba(253,248,240,0.38)', fontSize: '0.72rem', marginBottom: 14, lineHeight: 1.6 }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="gold-gradient" style={{ fontSize: '1.05rem', fontWeight: 600 }}>{formatINR(product.price)}</span>
          {onAddToCart && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              style={{ padding: '8px 16px', fontSize: '0.62rem', letterSpacing: '0.12em', borderRadius: 2, border: 'none', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a' }}
            >
              Add to Bag
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
