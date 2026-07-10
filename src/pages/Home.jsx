import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Crown, Heart, Star } from 'lucide-react';
import { listProducts } from '../api/products';
import { listWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatCurrency';
import { getProductVisual } from '../utils/categoryVisuals';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

function SectionTitle({ tag, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} style={{ textAlign: 'center', marginBottom: 64 }}>
      <motion.p variants={fadeUp} style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>{tag}</motion.p>
      <motion.h2 variants={fadeUp} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: 16 }}>{title}</motion.h2>
      <motion.div variants={fadeUp} className="section-divider" style={{ marginBottom: 20 }} />
      {subtitle && <motion.p variants={fadeUp} style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.85rem', letterSpacing: '0.08em', maxWidth: 500, margin: '0 auto' }}>{subtitle}</motion.p>}
    </motion.div>
  );
}

const testimonials = [
  { name: 'Priya Sharma', role: 'Fashion Blogger', text: 'LookIn pieces are absolutely breathtaking. The craftsmanship is unmatched and I get compliments everywhere I go.', stars: 5 },
  { name: 'Ananya Reddy', role: 'Bride 2024', text: 'Wore LookIn jewellery on my wedding day. Every piece was perfect — elegant, timeless, and truly special.', stars: 5 },
  { name: 'Meera Nair', role: 'Loyal Customer', text: 'I have been collecting LookIn pieces for 3 years. Each one is a work of art. Worth every rupee.', stars: 5 },
];

const categories = [
  { name: 'Necklaces', icon: '✦', count: '48 pieces' },
  { name: 'Earrings', icon: '◈', count: '62 pieces' },
  { name: 'Rings', icon: '◯', count: '35 pieces' },
  { name: 'Bangles', icon: '◉', count: '29 pieces' },
  { name: 'Bracelets', icon: '∞', count: '41 pieces' },
  { name: 'Anklets', icon: '✿', count: '18 pieces' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { isAuthenticated } = useAuth();
  const { refreshCounts } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [featured, setFeatured] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});

  useEffect(() => {
    listProducts().then(data => setFeatured((data.results ?? data).slice(0, 4))).catch(() => setFeatured([]));
  }, []);

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

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        {[
          { width: 4, height: 4, top: '15%', left: '10%', animationDelay: '0s', animationDuration: '7s' },
          { width: 6, height: 6, top: '25%', right: '15%', animationDelay: '1s', animationDuration: '9s' },
          { width: 3, height: 3, top: '60%', left: '8%', animationDelay: '2s', animationDuration: '6s' },
          { width: 5, height: 5, top: '70%', right: '10%', animationDelay: '0.5s', animationDuration: '8s' },
          { width: 4, height: 4, top: '40%', left: '20%', animationDelay: '3s', animationDuration: '10s' },
        ].map((p, i) => <div key={i} className="particle" style={p} />)}

        <motion.div style={{ y: heroY, opacity: heroOpacity, textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Luxury Jewellery</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="font-serif"  style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 8 }}>
            <span className="shimmer-text">Look</span><span style={{ color: 'rgba(253,248,240,0.9)' }}>In</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="font-serif"  style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)', fontWeight: 300, color: 'rgba(253,248,240,0.55)', letterSpacing: '0.15em', marginBottom: 32, fontStyle: 'italic' }}>
            Where elegance meets eternity
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.8 }}>
            Discover handcrafted jewellery that celebrates the beauty of every woman. Timeless pieces, extraordinary craftsmanship.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Explore Collections <ArrowRight size={14} />
              </motion.button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-outline-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.72rem', borderRadius: 2 }}>
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(201,168,76,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.03), rgba(201,168,76,0.07), rgba(201,168,76,0.03))', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[{ num: '500+', label: 'Unique Designs' }, { num: '12K+', label: 'Happy Customers' }, { num: '15', label: 'Years of Craft' }, { num: '100%', label: 'Hallmarked Gold' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <div className="gold-gradient font-serif" style={{ fontSize: '2.2rem', fontWeight: 600, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionTitle tag="Curated for You" title="Featured Collections" subtitle="Each piece is a masterwork of artistry, designed to adorn the modern woman with grace and sophistication." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {featured.map((item, i) => {
              const visual = getProductVisual(item);
              const isWishlisted = !!wishlistMap[item.id];
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.12, duration: 0.7 }} className="card-dark" style={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>
                  <div style={{ height: 240, background: visual.image ? `url(${visual.image}) center/cover` : visual.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {!visual.image && (
                      <>
                        <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.4 }} style={{ fontSize: '4rem', position: 'relative', zIndex: 1, color: 'rgba(201,168,76,0.7)' }}>{visual.emoji}</motion.div>
                      </>
                    )}
                    {item.tag && <div style={{ position: 'absolute', top: 14, left: 14, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 2 }}>{item.tag}</div>}
                  </div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{item.category_name}</p>
                    <h3 className="font-serif" style={{ color: '#fdf8f0', fontSize: '1.15rem', fontWeight: 500, marginBottom: 6 }}>{item.name}</h3>
                    <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.75rem', marginBottom: 14, lineHeight: 1.6 }}>{item.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="gold-gradient font-serif" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formatINR(item.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); handleToggleWishlist(item); }}
                        style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', background: isWishlisted ? 'rgba(201,168,76,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}
                      >
                        <Heart size={13} fill={isWishlisted ? '#e8c97a' : 'none'} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-outline-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 40px', fontSize: '0.72rem', borderRadius: 2 }}>
                View All Collections <ArrowRight size={13} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(180deg, #0a0a0a, #0d0b06 50%, #0a0a0a)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle tag="Browse By Type" title="Shop by Category" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <Link to="/collections" style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ y: -6, scale: 1.03 }} className="glow-border" style={{ borderRadius: 2, textAlign: 'center', cursor: 'pointer', padding: '28px 16px', background: 'linear-gradient(135deg, rgba(20,18,12,0.8), rgba(12,10,5,0.9))', transition: 'all 0.3s ease' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: 10, color: 'rgba(201,168,76,0.7)' }}>{cat.icon}</div>
                    <div style={{ color: '#fdf8f0', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', marginBottom: 4 }}>{cat.name}</div>
                    <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{cat.count}</div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '16px 0', background: 'rgba(201,168,76,0.03)' }}>
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array(8).fill(['✦ Handcrafted', '◈ 22K Gold', '✿ Hallmarked', '◯ Timeless', '✦ Luxury', '◈ Elegant']).flat().map((t, i) => (
            <span key={i} style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* BRAND STORY */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/5', background: 'linear-gradient(135deg, #1a1508, #0e0b04)', borderRadius: 2, border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.07)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.12)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.2)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Crown size={48} style={{ color: 'rgba(201,168,76,0.6)', margin: '0 auto 16px' }} />
                <div className="font-serif gold-gradient" style={{ fontSize: '3rem', fontWeight: 300 }}>LookIn</div>
                <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 8 }}>Est. 2009</div>
              </div>
              {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
                <div key={i} style={{ position: 'absolute', [v]: 16, [h]: 16, width: 24, height: 24, [`border${v.charAt(0).toUpperCase() + v.slice(1)}`]: '1px solid rgba(201,168,76,0.4)', [`border${h.charAt(0).toUpperCase() + h.slice(1)}`]: '1px solid rgba(201,168,76,0.4)' }} />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>Our Promise</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: 20 }}>Jewellery That Tells Your Story</h2>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: 24 }} />
            <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.05em', marginBottom: 16 }}>
              At LookIn, we believe every woman deserves to feel like royalty. Our artisans pour their heart into each piece, blending ancient goldsmithing traditions with contemporary design.
            </p>
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.05em', marginBottom: 32 }}>
              From the first sketch to the final polish, every LookIn jewel is crafted to become a cherished heirloom — a piece that carries your memories and celebrates your milestones.
            </p>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Discover Our Story <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(180deg, #0a0a0a, #0c0a05 50%, #0a0a0a)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle tag="What They Say" title="Loved by Women Everywhere" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }} className="card-dark" style={{ borderRadius: 2, padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={12} style={{ color: '#c9a84c', fill: '#c9a84c' }} />)}
                </div>
                <p style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.85rem', lineHeight: 1.8, letterSpacing: '0.04em', marginBottom: 24, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 16 }}>
                  <div style={{ color: '#fdf8f0', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.08em' }}>{t.name}</div>
                  <div style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ padding: '64px 48px', background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02), rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent)', pointerEvents: 'none' }} />
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Limited Time</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 400, marginBottom: 16 }}>Begin Your Collection Today</h2>
            <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: 36, lineHeight: 1.8 }}>
              Every piece is a promise of beauty. Explore our full collection and find the jewel that speaks to your soul.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <Link to="/collections" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 40px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                  Shop Collections <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-outline-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 40px', fontSize: '0.72rem', borderRadius: 2 }}>
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
