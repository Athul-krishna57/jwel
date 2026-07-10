import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const labelStyle = { display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 };
const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 440, width: '100%', padding: '24px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Welcome Back</p>
          <h1 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 400, marginBottom: 16 }}>Sign In</h1>
          <div className="section-divider" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="card-dark glow-border" style={{ padding: '36px 32px', borderRadius: 2 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Username *</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} required placeholder="yourname" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
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
              <LogIn size={14} /> {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(253,248,240,0.4)', fontSize: '0.78rem', marginTop: 24 }}>
            New to LookIn?{' '}
            <Link to="/register" style={{ color: '#e8c97a', textDecoration: 'underline' }}>Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
