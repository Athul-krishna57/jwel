import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../api/products';
import { listCategories } from '../api/categories';
import { listWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low'];

export default function Collections() {
  const { isAuthenticated } = useAuth();
  const { refreshCounts } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({}); // productId -> wishlistItemId
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      listProducts({ search, category: activeCategory })
        .then(data => setProducts(data.results ?? data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, activeCategory]);

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistMap({});
      return;
    }
    listWishlist().then(data => {
      const items = data.results ?? data;
      setWishlistMap(Object.fromEntries(items.map(item => [item.product.id, item.id])));
    }).catch(() => setWishlistMap({}));
  }, [isAuthenticated]);

  const handleToggleWishlist = async (product) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const existingId = wishlistMap[product.id];
    if (existingId) {
      await removeFromWishlist(existingId);
      setWishlistMap(prev => { const next = { ...prev }; delete next[product.id]; return next; });
    } else {
      const item = await addToWishlist(product.id);
      setWishlistMap(prev => ({ ...prev, [product.id]: item.id }));
    }
    refreshCounts();
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    await addToCart(product.id, 1);
    refreshCounts();
  };

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'Price: High to Low') return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', padding: '60px 24px 50px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Explore
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 400, marginBottom: 16 }}>
          Our Collections
        </motion.h1>
        <div className="section-divider" style={{ marginBottom: 20 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', letterSpacing: '0.08em', maxWidth: 480, margin: '0 auto' }}>
          Every piece handcrafted with love, designed to make you shine.
        </motion.p>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Search + Filter Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: 400 }}>
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,168,76,0.5)' }} />
            <input
              type="text"
              placeholder="Search jewellery..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 2, fontSize: '0.8rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 2, fontSize: '0.78rem', cursor: 'pointer' }}
            >
              {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowFilter(!showFilter)}
              style={{ padding: '10px 16px', borderRadius: 2, border: '1px solid rgba(201,168,76,0.3)', background: showFilter ? 'rgba(201,168,76,0.1)' : 'transparent', color: '#e8c97a', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              <SlidersHorizontal size={13} /> Filter
            </motion.button>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
          {['All', ...categories.map(c => c.name)].map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 20px',
                borderRadius: 2,
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: activeCategory === cat ? '1px solid rgba(201,168,76,0.8)' : '1px solid rgba(201,168,76,0.2)',
                background: activeCategory === cat ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'transparent',
                color: activeCategory === cat ? '#0a0a0a' : 'rgba(253,248,240,0.6)',
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: 'all 0.3s ease',
                boxShadow: activeCategory === cat ? '0 0 15px rgba(201,168,76,0.3)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Results count */}
        <div style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: 24 }}>
          {loading ? 'Loading pieces...' : `Showing ${sorted.length} pieces`}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {sorted.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isWishlisted={!!wishlistMap[product.id]}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {!loading && sorted.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '96px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: 'rgba(201,168,76,0.3)' }}>✦</div>
            <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>No pieces found. Try a different search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
