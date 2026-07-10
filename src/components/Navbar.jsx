import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, Heart, ShoppingBag, User, LogOut, Package, ShieldCheck } from 'lucide-react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function IconLink({ to, Icon, count }) {
  return (
    <Link to={to} style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'rgba(253,248,240,0.8)' }}>
      <Icon size={19} />
      {count > 0 && (
        <span style={{ position: 'absolute', top: -8, right: -9, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a', fontSize: '0.6rem', fontWeight: 700, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, isAdmin, logout } = useAuth();
  const { cartCount, wishlistCount } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? 'rgba(8,7,4,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} alt="LookIn Logo" style={{ height: 40, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
              <span className="shimmer-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.15em' }}>
                LookIn
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right side */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <IconLink to="/wishlist" Icon={Heart} count={wishlistCount} />
              <IconLink to="/cart" Icon={ShoppingBag} count={cartCount} />

              {user ? (
                <Menu as="div" style={{ position: 'relative' }}>
                  <MenuButton style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 2, padding: '8px 14px', color: '#e8c97a', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                    <User size={14} /> {user.username}
                  </MenuButton>
                  <MenuItems anchor="bottom end" style={{ marginTop: 8, minWidth: 180, background: 'rgba(10,9,6,0.98)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2, padding: 6, backdropFilter: 'blur(12px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                    <MenuItem>
                      <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: 'rgba(253,248,240,0.8)', fontSize: '0.78rem', borderRadius: 2 }} className="dropdown-item">
                        <User size={14} /> Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/my-orders" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: 'rgba(253,248,240,0.8)', fontSize: '0.78rem', borderRadius: 2 }} className="dropdown-item">
                        <Package size={14} /> My Orders
                      </Link>
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem>
                        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: 'rgba(253,248,240,0.8)', fontSize: '0.78rem', borderRadius: 2 }} className="dropdown-item">
                          <ShieldCheck size={14} /> Admin Dashboard
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: '#e88a7a', fontSize: '0.78rem', borderRadius: 2, background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }} className="dropdown-item">
                        <LogOut size={14} /> Logout
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ padding: '10px 24px', fontSize: '0.7rem', borderRadius: 2, border: 'none' }}>
                    Sign In
                  </motion.button>
                </Link>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <IconLink to="/wishlist" Icon={Heart} count={wishlistCount} />
              <IconLink to="/cart" Icon={ShoppingBag} count={cartCount} />
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#e8c97a', background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', top: 68, left: 0, right: 0, zIndex: 40, background: 'rgba(8,7,4,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '32px 24px' }}>
              {navItems.map((item, i) => (
                <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <NavLink to={item.path} end={item.path === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              {user ? (
                <>
                  <NavLink to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>Profile</NavLink>
                  <NavLink to="/my-orders" className="nav-link" onClick={() => setMenuOpen(false)}>My Orders</NavLink>
                  {isAdmin && <NavLink to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>Admin Dashboard</NavLink>}
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                  <button className="btn-gold" style={{ padding: '10px 28px', fontSize: '0.7rem', borderRadius: 2, border: 'none', marginTop: 8 }}>
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
