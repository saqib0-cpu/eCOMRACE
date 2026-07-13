import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const MOCK_REVIEWS = [
  { id: 1, name: 'James H.', rating: 5, date: 'June 2026', text: 'Absolutely stunning product. The quality exceeded my expectations and shipping was super fast. Will definitely buy again!' },
  { id: 2, name: 'Marcus T.', rating: 4, date: 'May 2026', text: 'Great value for money. Looks exactly as in the photos. The packaging was premium too.' },
  { id: 3, name: 'Alex W.', rating: 5, date: 'May 2026', text: 'Premium quality and fast delivery. This is my third purchase from eCOMRACE and I\'m never disappointed.' },
];

function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#d4af37' : 'none'}
          stroke={i <= Math.round(rating) ? '#d4af37' : '#1f2937'}
          strokeWidth={2}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedMsg, setAddedMsg] = useState(false);

  if (!product) {
    return (
      <div style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  return (
    <div className="product-detail">
      <div className="product-detail-inner">
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{ marginBottom: 32 }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="breadcrumb-sep">/</span>
          <span style={{ color: 'var(--accent-gold)' }}>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* ---- Image Gallery ---- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="gallery-main">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
            <div className="gallery-thumbs">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`gallery-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---- Product Info ---- */}
          <motion.div
            className="product-info"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="product-info-eyebrow">
              <span className="badge badge-new" style={{ fontSize: '0.7rem' }}>{product.subcategory}</span>
              <span className="product-sku">SKU: {product.sku}</span>
            </div>

            <h1 className="product-info-name">{product.name}</h1>

            <div className="product-info-rating">
              <StarRating rating={product.rating} size={16} />
              <span className="product-rating-val">{product.rating}</span>
              <span className="product-review-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-info-price">
              <span className="product-price-current">${product.salePrice || product.price}</span>
              {product.salePrice && (
                <>
                  <span className="product-price-original">${product.price}</span>
                  <span className="product-discount-badge">-{discountPct}%</span>
                </>
              )}
            </div>

            <div className="product-stock-indicator">
              <div className={`stock-dot ${product.inStock ? 'in' : 'out'}`} />
              <span style={{ color: product.inStock ? '#22c55e' : '#ef4444' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="product-info-desc">{product.description}</p>

            {/* Qty */}
            <div className="qty-row">
              <span className="qty-label">Quantity:</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="product-cta-row">
              <motion.button
                className="btn-add-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingCart size={18} />
                {addedMsg ? '✓ Added to Cart!' : 'Add to Cart'}
              </motion.button>
              <button
                className="btn-buy-now"
                onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
                disabled={!product.inStock}
              >
                Buy Now
              </button>
              <button
                className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 12px',
                  background: 'var(--surface-color-light)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---- Tabs ---- */}
        <div className="product-tabs">
          <div className="tab-list">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && ` (${MOCK_REVIEWS.length})`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'description' && (
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700 }}>
                  {product.description}
                  {' '}This product is carefully crafted with premium materials and undergoes strict quality control to ensure it meets our high standards. Perfect for daily use and gifting alike.
                </p>
              )}

              {activeTab === 'specifications' && (
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-list">
                  {MOCK_REVIEWS.map(r => (
                    <div key={r.id} className="review-card">
                      <div className="review-header">
                        <div className="review-avatar">{r.name[0]}</div>
                        <div>
                          <div className="review-name">{r.name}</div>
                          <div className="review-date">{r.date}</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <StarRating rating={r.rating} size={13} />
                        </div>
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---- Related Products ---- */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <div className="section-header" style={{ margin: '0 0 32px' }}>
              <div>
                <span className="section-tag">You May Also Like</span>
                <h2 className="section-title">Related Products</h2>
              </div>
            </div>
            <div className="related-grid">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
