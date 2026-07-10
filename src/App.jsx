import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import Admin from './pages/Admin';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: 'easeIn' } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/collections" element={<AnimatedPage><Collections /></AnimatedPage>} />
            <Route path="/product/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
            <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
            <Route path="/wishlist" element={<AnimatedPage><ProtectedRoute><Wishlist /></ProtectedRoute></AnimatedPage>} />
            <Route path="/cart" element={<AnimatedPage><ProtectedRoute><Cart /></ProtectedRoute></AnimatedPage>} />
            <Route path="/checkout" element={<AnimatedPage><ProtectedRoute><Checkout /></ProtectedRoute></AnimatedPage>} />
            <Route path="/order-success/:id" element={<AnimatedPage><ProtectedRoute><OrderSuccess /></ProtectedRoute></AnimatedPage>} />
            <Route path="/profile" element={<AnimatedPage><ProtectedRoute><Profile /></ProtectedRoute></AnimatedPage>} />
            <Route path="/my-orders" element={<AnimatedPage><ProtectedRoute><MyOrders /></ProtectedRoute></AnimatedPage>} />
            <Route path="/admin" element={<AnimatedPage><ProtectedRoute adminOnly><Admin /></ProtectedRoute></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
