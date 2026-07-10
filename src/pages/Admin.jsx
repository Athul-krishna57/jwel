import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Pencil, Plus, ShoppingCart, Trash2, Users as UsersIcon } from 'lucide-react';
import { adminListProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { listCategories } from '../api/categories';
import { adminListOrders } from '../api/orders';
import { adminListUsers } from '../api/auth';
import { formatINR } from '../utils/formatCurrency';

const labelStyle = { display: 'block', color: 'rgba(201,168,76,0.6)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 };
const inputStyle = { width: '100%', padding: '9px 12px', borderRadius: 2, fontSize: '0.8rem', boxSizing: 'border-box' };
const tabs = [
  { key: 'products', label: 'Products', icon: Package },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'users', label: 'Users', icon: UsersIcon },
];

const emptyForm = { id: null, name: '', category: '', price: '', tag: '', description: '', stock: 10, image: null };

function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminListProducts().then(data => setProducts(data.results ?? data)).catch(() => setProducts([]));
  };

  useEffect(() => {
    load();
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      tag: product.tag,
      description: product.description,
      stock: product.stock,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    await deleteProduct(product.id);
    load();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('category', form.category);
      data.append('price', form.price);
      data.append('tag', form.tag);
      data.append('description', form.description);
      data.append('stock', form.stock);
      if (form.image) data.append('image', form.image);

      if (form.id) {
        await updateProduct(form.id, data);
      } else {
        await createProduct(data);
      }
      setForm(emptyForm);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message || 'Could not save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.8rem' }}>{products.length} products</p>
        <motion.button whileHover={{ scale: 1.03 }} onClick={() => { setForm(emptyForm); setShowForm(!showForm); }} className="btn-outline-gold" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: '0.68rem', borderRadius: 2 }}>
          <Plus size={13} /> {showForm ? 'Cancel' : 'Add Product'}
        </motion.button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleSubmit} className="card-dark glow-border" style={{ padding: 24, borderRadius: 2, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category *</label>
            <select required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inputStyle}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Price (₹) *</label>
            <input required type="number" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tag</label>
            <input value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} placeholder="New / Bestseller / Limited" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Image</label>
            <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, image: e.target.files[0] }))} style={{ ...inputStyle, padding: '6px 0' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          {error && <p style={{ gridColumn: '1 / -1', color: '#e88a7a', fontSize: '0.75rem' }}>{error}</p>}
          <motion.button type="submit" whileHover={{ scale: 1.02 }} disabled={saving} className="btn-gold" style={{ gridColumn: '1 / -1', padding: 11, fontSize: '0.7rem', borderRadius: 2, border: 'none', opacity: saving ? 0.8 : 1 }}>
            {saving ? 'Saving...' : form.id ? 'Update Product' : 'Create Product'}
          </motion.button>
        </motion.form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {products.map(product => (
          <div key={product.id} className="card-dark" style={{ padding: '14px 20px', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ color: '#fdf8f0', fontSize: '0.85rem', fontWeight: 500 }}>{product.name}</p>
              <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.72rem' }}>{product.category_name} · Stock: {product.stock} {!product.is_active && '· Hidden'}</p>
            </div>
            <span className="gold-gradient" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{formatINR(product.price)}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => handleEdit(product)} style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 2, padding: 7, color: '#e8c97a' }}><Pencil size={13} /></button>
              <button onClick={() => handleDelete(product)} style={{ background: 'transparent', border: '1px solid rgba(232,138,122,0.3)', borderRadius: 2, padding: 7, color: '#e88a7a' }}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminListOrders().then(data => setOrders(data.results ?? data)).catch(() => setOrders([]));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {orders.map(order => (
        <Link key={order.id} to={`/order-success/${order.id}`} style={{ textDecoration: 'none' }}>
          <div className="card-dark" style={{ padding: '14px 20px', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', cursor: 'pointer' }}>
            <div>
              <p style={{ color: '#fdf8f0', fontSize: '0.85rem', fontWeight: 500 }}>Order #{order.id} · {order.username}</p>
              <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.72rem' }}>{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
            </div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8c97a' }}>{order.status} / {order.payment_status}</span>
            <span className="gold-gradient" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{formatINR(order.total_amount)}</span>
          </div>
        </Link>
      ))}
      {orders.length === 0 && <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.82rem' }}>No orders yet.</p>}
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminListUsers().then(data => setUsers(data.results ?? data)).catch(() => setUsers([]));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {users.map(u => (
        <div key={u.id} className="card-dark" style={{ padding: '14px 20px', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: '#fdf8f0', fontSize: '0.85rem', fontWeight: 500 }}>{u.username} {u.is_admin && <span style={{ color: '#e8c97a', fontSize: '0.65rem', marginLeft: 8 }}>ADMIN</span>}</p>
            <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.72rem' }}>{u.email} {u.phone && `· ${u.phone}`}</p>
          </div>
          <span style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.72rem' }}>Joined {new Date(u.date_joined).toLocaleDateString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState('products');

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ position: 'relative', padding: '48px 24px 32px', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, marginBottom: 12 }}>
          Admin Dashboard
        </motion.h1>
        <div className="section-divider" />
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 80px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 2, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                border: tab === key ? '1px solid rgba(201,168,76,0.8)' : '1px solid rgba(201,168,76,0.2)',
                background: tab === key ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'transparent',
                color: tab === key ? '#0a0a0a' : 'rgba(253,248,240,0.6)',
                fontWeight: tab === key ? 600 : 400,
              }}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'users' && <UsersTab />}
      </div>
    </div>
  );
}
