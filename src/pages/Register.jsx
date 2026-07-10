import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../api/client';

const labelStyle = { display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 };
const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register({
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.data) {
        const firstField = Object.keys(err.data)[0];
        const message = Array.isArray(err.data[firstField]) ? err.data[firstField][0] : err.data[firstField];
        setError(typeof message === 'string' ? message : 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 460, width: '100%', padding: '24px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Join Us</p>
          <h1 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 400, marginBottom: 16 }}>Create Account</h1>
          <div className="section-divider" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="card-dark glow-border" style={{ padding: '36px 32px', borderRadius: 2 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Username *</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} required placeholder="yourname" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Password *</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password *</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
              </div>
            </div>

            {error && (
              <p style={{ color: '#e88a7a', fontSize: '0.78rem', letterSpacing: '0.03em' }}>{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="btn-gold"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px', fontSize: '0.72rem', borderRadius: 2, border: 'none', opacity: loading ? 0.8 : 1, marginTop: 8 }}
            >
              <UserPlus size={14} /> {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(253,248,240,0.4)', fontSize: '0.78rem', marginTop: 24 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e8c97a', textDecoration: 'underline' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
