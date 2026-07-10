import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { getProduct } from '../api/products';
import { listProductReviews, createReview } from '../api/reviews';
import { listWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatCurrency';
import { getProductVisual } from '../utils/categoryVisuals';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { refreshCounts } = useShop();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [wishlistId, setWishlistId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => setProduct(null));
    listProductReviews(id).then(data => setReviews(data.results ?? data)).catch(() => setReviews([]));
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistId(null);
      return;
    }
    listWishlist().then(data => {
      const items = data.results ?? data;
      const match = items.find(item => String(item.product.id) === String(id));
      setWishlistId(match ? match.id : null);
    }).catch(() => setWishlistId(null));
  }, [isAuthenticated, id]);

  const requireLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) return requireLogin();
    if (wishlistId) {
      await removeFromWishlist(wishlistId);
      setWishlistId(null);
    } else {
      const item = await addToWishlist(product.id);
      setWishlistId(item.id);
    }
    refreshCounts();
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) return requireLogin();
    await addToCart(product.id, quantity);
    refreshCounts();
    setAddedMessage('Added to bag!');
    setTimeout(() => setAddedMessage(''), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return requireLogin();
    setReviewError('');
    setSubmittingReview(true);
    try {
      const review = await createReview({ product: product.id, rating: reviewForm.rating, comment: reviewForm.comment });
      setReviews(prev => [review, ...prev]);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      setReviewError(err.message || 'Could not submit your review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) {
    return <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }} />;
  }

  const visual = getProductVisual(product);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 40px' }}>
        <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.75rem', marginBottom: 32 }}>
          <Link to="/collections" style={{ color: 'rgba(201,168,76,0.7)' }}>Collections</Link> / {product.category_name} / {product.name}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1fr)', gap: 56 }}>
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="glow-border" style={{ height: 460, borderRadius: 2, background: visual.image ? `url(${visual.image}) center/cover` : visual.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {!visual.image && (
              <>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.14), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                <div style={{ fontSize: '7rem', position: 'relative', zIndex: 1, color: 'rgba(201,168,76,0.75)' }}>{visual.emoji}</div>
              </>
            )}
            {product.tag && (
              <div style={{ position: 'absolute', top: 20, left: 20, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a0a0a', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 2 }}>
                {product.tag}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>{product.category_name}</p>
            <h1 className="font-serif gold-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: 16 }}>{product.name}</h1>
            <p style={{ fontSize: '1.6rem', fontWeight: 600, color: '#fdf8f0', marginBottom: 20 }}>{formatINR(product.price)}</p>
            <div className="section-divider" style={{ margin: '0 0 24px', width: 60 }} />
            <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: '0.88rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: 32 }}>
              {product.description || 'A timeless piece, handcrafted with care.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid rgba(201,168,76,0.25)', borderRadius: 2 }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: 'transparent', border: 'none', color: '#e8c97a', padding: '8px 12px' }}><Minus size={13} /></button>
                <span style={{ padding: '0 14px', color: '#fdf8f0', fontSize: '0.85rem', minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ background: 'transparent', border: 'none', color: '#e8c97a', padding: '8px 12px' }}><Plus size={13} /></button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAddToCart} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.72rem', borderRadius: 2, border: 'none' }}>
                <ShoppingBag size={14} /> Add to Bag
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleToggleWishlist} className="btn-outline-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px', fontSize: '0.72rem', borderRadius: 2 }}>
                <Heart size={14} fill={wishlistId ? '#e8c97a' : 'none'} /> {wishlistId ? 'Wishlisted' : 'Wishlist'}
              </motion.button>
            </div>
            {addedMessage && <p style={{ color: '#e8c97a', fontSize: '0.78rem' }}>{addedMessage}</p>}
          </motion.div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 80 }}>
          <h2 className="font-serif" style={{ color: '#fdf8f0', fontSize: '1.6rem', fontWeight: 400, marginBottom: 8 }}>
            Customer <span className="gold-gradient">Reviews</span>
          </h2>
          <div className="section-divider" style={{ margin: '0 0 32px', width: 60 }} />

          <div className="card-dark glow-border" style={{ padding: '28px 28px', borderRadius: 2, marginBottom: 32 }}>
            <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Write a Review</p>
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" onClick={() => setReviewForm(prev => ({ ...prev, rating: n }))} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <Star size={20} style={{ color: '#c9a84c', fill: n <= reviewForm.rating ? '#c9a84c' : 'none' }} />
                  </button>
                ))}
              </div>
              <textarea
                placeholder={isAuthenticated ? 'Share your thoughts on this piece...' : 'Sign in to write a review'}
                value={reviewForm.comment}
                onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                rows={3}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 2, fontSize: '0.82rem', resize: 'vertical', boxSizing: 'border-box' }}
              />
              {reviewError && <p style={{ color: '#e88a7a', fontSize: '0.78rem' }}>{reviewError}</p>}
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={submittingReview} className="btn-gold" style={{ alignSelf: 'flex-start', padding: '11px 28px', fontSize: '0.68rem', borderRadius: 2, border: 'none', opacity: submittingReview ? 0.8 : 1 }}>
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </motion.button>
            </form>
          </div>

          {reviews.length === 0 ? (
            <p style={{ color: 'rgba(253,248,240,0.35)', fontSize: '0.82rem' }}>No reviews yet. Be the first to share your thoughts.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {reviews.map(review => (
                <div key={review.id} className="card-dark" style={{ padding: '20px 24px', borderRadius: 2 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                    {Array(5).fill(0).map((_, j) => (
                      <Star key={j} size={12} style={{ color: '#c9a84c', fill: j < review.rating ? '#c9a84c' : 'none' }} />
                    ))}
                  </div>
                  {review.comment && <p style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 10 }}>{review.comment}</p>}
                  <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>{review.username}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
