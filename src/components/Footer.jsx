import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #050503 100%)', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
        {/* 4-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(201,168,76,0.4)', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Cormorant Garamond, serif' }}>L</span>
              </div>
              <span className="shimmer-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.15em' }}>LookIn</span>
            </div>
            <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.78rem', lineHeight: 1.8, letterSpacing: '0.05em', marginBottom: 24 }}>
              Crafting timeless elegance for the modern woman. Every piece tells a story of grace, beauty, and luxury.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.2, y: -2 }}
                  style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(201,168,76,0.7)', transition: 'all 0.3s ease', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.8)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#e8c97a'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.color = 'rgba(201,168,76,0.7)'; }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="gold-gradient" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ label: 'Home', path: '/' }, { label: 'Collections', path: '/collections' }, { label: 'About Us', path: '/about' }, { label: 'Contact', path: '/contact' }].map(item => (
                <li key={item.path}>
                  <Link to={item.path} style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.78rem', letterSpacing: '0.08em', transition: 'color 0.3s ease', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e8c97a'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,248,240,0.5)'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="gold-gradient" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 20 }}>Collections</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Anklets', 'Bangles'].map(item => (
                <li key={item}>
                  <Link to="/collections" style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.78rem', letterSpacing: '0.08em', transition: 'color 0.3s ease', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e8c97a'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,248,240,0.5)'}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="gold-gradient" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 20 }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[{ Icon: Mail, text: 'hello@lookin.com' }, { Icon: Phone, text: '+91 98765 43210' }, { Icon: MapPin, text: 'Mumbai, Maharashtra, India' }].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={14} style={{ color: '#c9a84c', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.78rem', letterSpacing: '0.05em', lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Newsletter</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, padding: '9px 12px', fontSize: '0.75rem', borderRadius: 2, minWidth: 0 }} />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ padding: '9px 16px', fontSize: '0.65rem', letterSpacing: '0.1em', borderRadius: 2, border: 'none', flexShrink: 0 }}>
                Join
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.72rem', letterSpacing: '0.08em', margin: 0 }}>
            © 2025 LookIn Jewellery. All rights reserved.
          </p>
          <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.72rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4, margin: 0 }}>
            Crafted with <Heart size={11} style={{ color: '#c9a84c' }} fill="#c9a84c" /> for every woman
          </p>
        </div>
      </div>
    </footer>
  );
}
