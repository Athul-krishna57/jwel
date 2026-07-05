import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Crown, Gem, Heart, Sparkles, Award, Users, Star } from 'lucide-react';

const values = [
  { icon: Crown, title: 'Craftsmanship', desc: 'Every piece is handcrafted by master artisans with decades of experience in traditional goldsmithing.' },
  { icon: Gem, title: 'Authenticity', desc: 'All our jewellery is BIS hallmarked and certified, ensuring you receive only the finest quality gold.' },
  { icon: Heart, title: 'Passion', desc: 'We pour our hearts into every design, creating pieces that resonate with the modern woman\'s spirit.' },
  { icon: Sparkles, title: 'Innovation', desc: 'Blending ancient techniques with contemporary aesthetics to create timeless yet modern designs.' },
];

const team = [
  { name: 'Kavitha Menon', role: 'Founder & Creative Director', emoji: '✦', bio: '20+ years in luxury jewellery design' },
  { name: 'Arjun Pillai', role: 'Master Goldsmith', emoji: '◈', bio: 'Third-generation artisan craftsman' },
  { name: 'Divya Krishnan', role: 'Design Lead', emoji: '✿', bio: 'NIFT graduate, specializes in bridal' },
];

const milestones = [
  { year: '2009', event: 'LookIn was founded in Mumbai with a single workshop' },
  { year: '2012', event: 'Launched our first bridal collection, sold out in 3 days' },
  { year: '2015', event: 'Expanded to 5 cities across India' },
  { year: '2018', event: 'Won the National Jewellery Design Award' },
  { year: '2021', event: 'Launched online store, reaching customers across India' },
  { year: '2024', event: '12,000+ happy customers and counting' },
];

export default function About() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ position: 'relative', padding: '60px 24px 70px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Our Story
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 400, marginBottom: 16 }}>
          About LookIn
        </motion.h1>
        <div className="section-divider" style={{ marginBottom: 20 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', letterSpacing: '0.08em', maxWidth: 520, margin: '0 auto' }}>
          Born from a love of beauty and a passion for craftsmanship, LookIn has been adorning women with timeless elegance since 2009.
        </motion.p>
      </div>

      {/* Brand Story */}
      <section style={{ padding: '60px 32px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: 'linear-gradient(135deg, #1a1508, #0e0b04)', borderRadius: 2, border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.07)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ position: 'absolute', width: '55%', height: '55%', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.12)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ position: 'absolute', width: '30%', height: '30%', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.2)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Crown size={52} style={{ color: 'rgba(201,168,76,0.65)', margin: '0 auto 16px' }} />
                <div className="font-serif shimmer-text" style={{ fontSize: '2.5rem', fontWeight: 300 }}>LookIn</div>
                <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 8 }}>Est. 2009</div>
              </div>
              {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
                <div key={i} style={{ position: 'absolute', [v]: 16, [h]: 16, width: 24, height: 24, [`border${v.charAt(0).toUpperCase() + v.slice(1)}`]: '1px solid rgba(201,168,76,0.4)', [`border${h.charAt(0).toUpperCase() + h.slice(1)}`]: '1px solid rgba(201,168,76,0.4)' }} />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>Who We Are</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: 20 }}>
              More Than Jewellery — It's a Legacy
            </h2>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: 24 }} />
            <p style={{ color: 'rgba(253,248,240,0.55)', fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: 16 }}>
              LookIn was born in 2009 from a simple belief: every woman deserves jewellery that makes her feel extraordinary. Founded by Kavitha Menon in a small Mumbai workshop, our brand has grown from a passion project into a beloved jewellery house.
            </p>
            <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: 16 }}>
              We work with master artisans who have inherited their craft through generations. Each piece is a conversation between tradition and modernity — rooted in ancient goldsmithing techniques, yet designed for the contemporary woman.
            </p>
            <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: 32 }}>
              From bridal sets to everyday elegance, every LookIn piece is crafted to become a cherished heirloom — a piece that carries your memories and celebrates your milestones.
            </p>
            <Link to="/collections" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                Explore Collections <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 32px', background: 'linear-gradient(90deg, rgba(201,168,76,0.03), rgba(201,168,76,0.07), rgba(201,168,76,0.03))', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[
            { icon: Award, num: '15+', label: 'Years of Excellence' },
            { icon: Users, num: '12K+', label: 'Happy Customers' },
            { icon: Gem, num: '500+', label: 'Unique Designs' },
            { icon: Star, num: '4.9', label: 'Average Rating' },
          ].map(({ icon: Icon, num, label }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <Icon size={20} style={{ color: 'rgba(201,168,76,0.5)', margin: '0 auto 12px' }} />
              <div className="gold-gradient font-serif" style={{ fontSize: '2.2rem', fontWeight: 600, lineHeight: 1 }}>{num}</div>
              <div style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>What Drives Us</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 16 }}>Our Core Values</h2>
            <div className="section-divider" />
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} className="card-dark" style={{ borderRadius: 2, textAlign: 'center', padding: '36px 24px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', background: 'rgba(201,168,76,0.05)' }}>
                  <Icon size={22} style={{ color: '#c9a84c' }} />
                </div>
                <h3 className="font-serif" style={{ color: '#fdf8f0', fontSize: '1.15rem', fontWeight: 500, marginBottom: 12, letterSpacing: '0.05em' }}>{title}</h3>
                <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.8rem', lineHeight: 1.8, letterSpacing: '0.04em' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(180deg, #0a0a0a, #0d0b06 50%, #0a0a0a)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Our Journey</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 16 }}>Milestones</h2>
            <div className="section-divider" />
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: 32, marginBottom: 40 }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div className="gold-gradient font-serif" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 4 }}>{m.year}</div>
                  <p style={{ color: 'rgba(253,248,240,0.55)', fontSize: '0.82rem', lineHeight: 1.7, letterSpacing: '0.04em' }}>{m.event}</p>
                </div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', flexShrink: 0, boxShadow: '0 0 12px rgba(201,168,76,0.5)', zIndex: 1 }} />
                <div style={{ flex: 1 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>The Artisans</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 16 }}>Meet Our Team</h2>
            <div className="section-divider" />
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }} className="card-dark" style={{ borderRadius: 2, textAlign: 'center', padding: '40px 28px' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: 'rgba(201,168,76,0.7)', boxShadow: '0 0 20px rgba(201,168,76,0.1)' }}>
                  {member.emoji}
                </div>
                <h3 className="font-serif" style={{ color: '#fdf8f0', fontSize: '1.15rem', fontWeight: 500, marginBottom: 6 }}>{member.name}</h3>
                <p style={{ color: '#c9a84c', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{member.role}</p>
                <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 32px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ padding: '56px 40px', background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02), rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Join the LookIn Family</p>
            <h2 className="font-serif gold-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: 16 }}>Ready to Find Your Piece?</h2>
            <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: 36, lineHeight: 1.8 }}>
              Explore our collections or get in touch with us to create a custom piece just for you.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <Link to="/collections" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 40px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                  Shop Now <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-outline-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 40px', fontSize: '0.72rem', borderRadius: 2 }}>
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
