import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <motion.div
      className="product-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Image */}
      <div
        className="product-card-img-wrap"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Badges */}
        <div className="product-card-badges">
          {product.isNew && <span className="badge badge-new">New</span>}
          {discountPct && <span className="badge badge-sale">-{discountPct}%</span>}
          {!product.inStock && <span className="badge badge-sold-out">Out of Stock</span>}
        </div>

        {/* Actions (appear on hover via CSS parent) */}
        <div className="product-card-actions">
          <button
            className={`card-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
            title="Add to Wishlist"
          >
            <Heart size={15} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            className="card-action-btn"
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            title="Quick View"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card-body">
        <p className="product-card-cat">{product.subcategory}</p>
        <h3
          className="product-card-name"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-card-footer">
          <div className="price-group">
            <span className="price-current">${product.salePrice || product.price}</span>
            {product.salePrice && <span className="price-original">${product.price}</span>}
          </div>
          <button
            className="add-cart-btn"
            disabled={!product.inStock}
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            {product.inStock ? '+ Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
