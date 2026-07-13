import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h1
          style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Wishlist
        </motion.h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>{wishlist.length} saved items</p>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}
          >
            <Heart size={80} color="var(--text-muted)" style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Your wishlist is empty</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Save items you love to buy them later.</p>
            <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
