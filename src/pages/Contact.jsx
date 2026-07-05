import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter, CheckCircle } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@lookin.com', sub: 'We reply within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 10am – 7pm' },
  { icon: MapPin, label: 'Visit Us', value: 'Bandra West, Mumbai', sub: 'Maharashtra, India 400050' },
  { icon: Clock, label: 'Store Hours', value: 'Mon–Sat: 10am – 8pm', sub: 'Sunday: 11am – 6pm' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ position: 'relative', padding: '60px 24px 70px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Reach Out
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 400, marginBottom: 16 }}>
          Contact Us
        </motion.h1>
        <div className="section-divider" style={{ marginBottom: 20 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.85rem', letterSpacing: '0.08em', maxWidth: 480, margin: '0 auto' }}>
          We'd love to hear from you. Whether it's a question, a custom order, or just to say hello — we're here.
        </motion.p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 48, alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>Get In Touch</p>
              <h2 className="font-serif" style={{ color: '#fdf8f0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: 12, lineHeight: 1.3 }}>
                We're Always <span className="gold-gradient">Here For You</span>
              </h2>
              <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: 24 }} />
              <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.82rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: 36 }}>
                Have a question about a piece? Want to create something custom for a special occasion? Our team of jewellery experts is ready to help you find the perfect piece.
              </p>

              {/* Contact Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {contactInfo.map(({ icon: Icon, label, value, sub }, i) => (
                  <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: 'linear-gradient(135deg, rgba(20,18,12,0.8), rgba(12,10,5,0.9))', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 2, transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(201,168,76,0.05)' }}>
                      <Icon size={15} style={{ color: '#c9a84c' }} />
                    </div>
                    <div>
                      <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
                      <p style={{ color: '#fdf8f0', fontSize: '0.82rem', fontWeight: 500, marginBottom: 2 }}>{value}</p>
                      <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.72rem' }}>{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p style={{ color: 'rgba(253,248,240,0.3)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>Follow Us</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { Icon: Instagram, label: '@lookin.jewels' },
                    { Icon: Facebook, label: 'LookIn' },
                    { Icon: Twitter, label: '@lookin' },
                  ].map(({ Icon, label }, i) => (
                    <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2, color: 'rgba(201,168,76,0.6)', fontSize: '0.7rem', letterSpacing: '0.05em', transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = '#e8c97a'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = 'rgba(201,168,76,0.6)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Icon size={13} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} style={{ padding: '40px 36px', background: 'linear-gradient(135deg, rgba(20,18,12,0.9), rgba(12,10,5,0.95))', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 2 }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }}>
                    <CheckCircle size={56} style={{ color: '#c9a84c', margin: '0 auto 20px' }} />
                  </motion.div>
                  <h3 className="font-serif gold-gradient" style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.85rem', lineHeight: 1.8, letterSpacing: '0.05em', marginBottom: 28 }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="btn-outline-gold" style={{ padding: '12px 32px', fontSize: '0.72rem', borderRadius: 2 }}>
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>Send a Message</p>
                  <h3 className="font-serif" style={{ color: '#fdf8f0', fontSize: '1.5rem', fontWeight: 400, marginBottom: 28 }}>
                    Let's <span className="gold-gradient">Connect</span>
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Your Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="priya@email.com" style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Subject</label>
                        <select name="subject" value={form.subject} onChange={handleChange} style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', cursor: 'pointer', boxSizing: 'border-box' }}>
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="custom">Custom Order</option>
                          <option value="bridal">Bridal Collection</option>
                          <option value="repair">Repair & Care</option>
                          <option value="wholesale">Wholesale</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Your Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell us how we can help you..." rows={5} style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', resize: 'vertical', minHeight: 120 }} />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="btn-gold"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px', fontSize: '0.72rem', borderRadius: 2, border: 'none', opacity: loading ? 0.8 : 1 }}
                    >
                      {loading ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#0a0a0a', borderRadius: '50%' }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={13} /> Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Map placeholder */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginTop: 60, padding: '48px', background: 'linear-gradient(135deg, rgba(20,18,12,0.8), rgba(12,10,5,0.9))', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 2, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.04), transparent)', pointerEvents: 'none' }} />
          <MapPin size={32} style={{ color: 'rgba(201,168,76,0.5)', margin: '0 auto 16px' }} />
          <h3 className="font-serif gold-gradient" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: 8 }}>Visit Our Showroom</h3>
          <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: 4 }}>LookIn Jewellery House</p>
          <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.78rem', letterSpacing: '0.05em', marginBottom: 4 }}>14, Hill Road, Bandra West</p>
          <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.78rem', letterSpacing: '0.05em', marginBottom: 24 }}>Mumbai, Maharashtra 400050</p>
          <div style={{ display: 'inline-flex', gap: 24, padding: '16px 32px', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 2, background: 'rgba(201,168,76,0.03)' }}>
            {[['Mon – Sat', '10:00 AM – 8:00 PM'], ['Sunday', '11:00 AM – 6:00 PM']].map(([day, time]) => (
              <div key={day} style={{ textAlign: 'center' }}>
                <div style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{day}</div>
                <div style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.78rem' }}>{time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
