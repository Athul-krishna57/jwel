import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/auth';

const labelStyle = { display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 };
const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', boxSizing: 'border-box' };

export default function Profile() {
  const { user, isAdmin, updateUser } = useAuth();
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const updated = await updateProfile(form);
      updateUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Account
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 400, marginBottom: 16 }}>
          My Profile
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-dark glow-border" style={{ padding: 32, borderRadius: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <p style={{ color: '#fdf8f0', fontSize: '1.05rem', fontWeight: 500 }}>{user?.username}</p>
              <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.78rem' }}>{user?.email}</p>
            </div>
            {isAdmin && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 2, color: '#e8c97a', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <ShieldCheck size={13} /> Admin
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {error && <p style={{ color: '#e88a7a', fontSize: '0.78rem' }}>{error}</p>}
            {saved && <p style={{ color: '#e8c97a', fontSize: '0.78rem' }}>Profile updated.</p>}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              className="btn-gold"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, fontSize: '0.72rem', borderRadius: 2, border: 'none', opacity: saving ? 0.8 : 1, marginTop: 8 }}
            >
              <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>

          <div style={{ display: 'flex', gap: 20, marginTop: 24, borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 20 }}>
            <Link to="/my-orders" style={{ color: '#e8c97a', fontSize: '0.78rem', textDecoration: 'underline' }}>My Orders</Link>
            <Link to="/wishlist" style={{ color: '#e8c97a', fontSize: '0.78rem', textDecoration: 'underline' }}>My Wishlist</Link>
            {isAdmin && <Link to="/admin" style={{ color: '#e8c97a', fontSize: '0.78rem', textDecoration: 'underline' }}>Admin Dashboard</Link>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
