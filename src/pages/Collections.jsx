import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react';

const allItems = [
  { id: 1, name: 'Celestial Necklace', category: 'Necklaces', price: 12500, tag: 'Bestseller', emoji: '✦', desc: 'Delicate gold chain with star pendant', gradient: 'linear-gradient(135deg, #1a1508, #2a2010)' },
  { id: 2, name: 'Aurora Earrings', category: 'Earrings', price: 8200, tag: 'New', emoji: '◈', desc: 'Drop earrings with pearl accents', gradient: 'linear-gradient(135deg, #0e1218, #151c28)' },
  { id: 3, name: 'Eternal Bangle', category: 'Bangles', price: 15800, tag: 'Limited', emoji: '◯', desc: 'Hand-engraved 22k gold bangle', gradient: 'linear-gradient(135deg, #180e0e, #281515)' },
  { id: 4, name: 'Bloom Ring', category: 'Rings', price: 6900, tag: 'Popular', emoji: '✿', desc: 'Floral motif with ruby stone', gradient: 'linear-gradient(135deg, #0e1808, #152810)' },
  { id: 5, name: 'Moonrise Necklace', category: 'Necklaces', price: 18500, tag: 'New', emoji: '☽', desc: 'Crescent moon with diamond dust', gradient: 'linear-gradient(135deg, #0e0e18, #151528)' },
  { id: 6, name: 'Petal Earrings', category: 'Earrings', price: 5400, tag: 'Popular', emoji: '✾', desc: 'Lightweight floral gold drops', gradient: 'linear-gradient(135deg, #181208, #281e10)' },
  { id: 7, name: 'Heritage Bracelet', category: 'Bracelets', price: 22000, tag: 'Limited', emoji: '∞', desc: 'Traditional filigree gold bracelet', gradient: 'linear-gradient(135deg, #180e18, #281528)' },
  { id: 8, name: 'Solitaire Ring', category: 'Rings', price: 32000, tag: 'Bestseller', emoji: '◉', desc: 'Classic solitaire diamond ring', gradient: 'linear-gradient(135deg, #0e1818, #152828)' },
  { id: 9, name: 'Cascade Anklet', category: 'Anklets', price: 4200, tag: 'New', emoji: '〜', desc: 'Delicate gold chain with charms', gradient: 'linear-gradient(135deg, #181808, #282810)' },
  { id: 10, name: 'Royal Choker', category: 'Necklaces', price: 28000, tag: 'Limited', emoji: '❋', desc: 'Layered gold choker with gems', gradient: 'linear-gradient(135deg, #1a1208, #2a1e10)' },
  { id: 11, name: 'Stardust Studs', category: 'Earrings', price: 3800, tag: 'Popular', emoji: '★', desc: 'Tiny gold star stud earrings', gradient: 'linear-gradient(135deg, #0e1218, #181e28)' },
  { id: 12, name: 'Vine Bangle', category: 'Bangles', price: 11200, tag: 'Bestseller', emoji: '❧', desc: 'Intricate vine pattern bangle', gradient: 'linear-gradient(135deg, #0e1808, #182810)' },
];

const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bangles', 'Bracelets', 'Anklets'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = allItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
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
          {categories.map(cat => (
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
          Showing {filtered.length} pieces
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer', background: 'linear-gradient(135deg, rgba(20,18,12,0.9), rgba(15,13,8,0.95))', border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.4s ease' }}
              >
                {/* Image area */}
                <div style={{ height: 220, background: item.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                  <motion.div whileHover={{ scale: 1.15, rotate: 15 }} transition={{ duration: 0.4 }} style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1, color: 'rgba(201,168,76,0.75)' }}>
                    {item.emoji}
                  </motion.div>

                  {/* Tag */}
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 9px', borderRadius: 2 }}>
                    {item.tag}
                  </div>

                  {/* Wishlist */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(item.id)}
                    style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', background: wishlist.includes(item.id) ? 'rgba(201,168,76,0.2)' : 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: wishlist.includes(item.id) ? '#e8c97a' : 'rgba(201,168,76,0.5)', backdropFilter: 'blur(4px)' }}
                  >
                    <Heart size={12} fill={wishlist.includes(item.id) ? '#e8c97a' : 'none'} />
                  </motion.button>
                </div>

                {/* Info */}
                <div style={{ padding: '18px 18px 22px' }}>
                  <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>{item.category}</p>
                  <h3 style={{ color: '#fdf8f0', fontSize: '1.05rem', fontWeight: 500, marginBottom: 5, fontFamily: 'serif' }}>{item.name}</h3>
                  <p style={{ color: 'rgba(253,248,240,0.38)', fontSize: '0.72rem', marginBottom: 14, lineHeight: 1.6 }}>{item.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'linear-gradient(135deg, #c9a84c, #e8c97a)' }}>₹{item.price.toLocaleString('en-IN')}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ padding: '8px 16px', fontSize: '0.62rem', letterSpacing: '0.12em', borderRadius: 2, border: 'none', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a' }}
                    >
                      Add to Bag
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '96px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: 'rgba(201,168,76,0.3)' }}>✦</div>
            <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>No pieces found. Try a different search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
