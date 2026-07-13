import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const discount = couponApplied ? cartTotal * 0.2 : 0;
  const shipping = cartTotal > 75 ? 0 : 9.99;
  const finalTotal = cartTotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'RACE20') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: '130px 20px 80px' }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <ShoppingBag size={80} color="var(--text-muted)" />
        </motion.div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 360 }}>
          Looks like you haven't added anything yet. Explore our premium collection!
        </p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>
          Start Shopping <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.h1
          style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart
        </motion.h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>{cartItems.length} items in your cart</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 30, alignItems: 'start' }}>
          {/* Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 18,
                    padding: 20,
                    display: 'flex',
                    gap: 20,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 90, height: 90, borderRadius: 12, objectFit: 'cover', cursor: 'pointer', flexShrink: 0 }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                      {item.subcategory}
                    </p>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, cursor: 'pointer' }}
                      onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--surface-color-light)', border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-main)' }}>−</button>
                        <span style={{ width: 36, textAlign: 'center', fontSize: '0.875rem', fontWeight: 700, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.qty}
                        </span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-main)' }}>+</button>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        ${((item.salePrice || item.price) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: 8, borderRadius: 8, background: 'none', border: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/shop" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 0' }}>
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} style={{ marginLeft: 'auto', color: '#ef4444', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 20,
              padding: 28,
              position: 'sticky',
              top: 90,
            }}
          >
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[
                { label: 'Subtotal', val: `$${cartTotal.toFixed(2)}` },
                { label: 'Discount', val: couponApplied ? `-$${discount.toFixed(2)}` : '—', color: couponApplied ? '#22c55e' : undefined },
                { label: 'Shipping', val: shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}`, color: shipping === 0 ? '#22c55e' : undefined },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: r.color }}>{r.val}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-gold)' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Tag size={13} /> Promo Code
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Enter code"
                  style={{
                    flex: 1, background: 'var(--surface-color-light)', border: '1px solid var(--border-color)',
                    borderRadius: 10, padding: '10px 14px', color: 'var(--text-main)',
                    fontFamily: 'var(--font-main)', fontSize: '0.875rem', outline: 'none',
                  }}
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    background: couponApplied ? '#22c55e' : 'var(--surface-color-light)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 10, padding: '10px 16px',
                    color: couponApplied ? '#fff' : 'var(--text-main)',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'var(--font-main)',
                  }}
                >
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              {couponError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 6 }}>{couponError}</p>}
              {couponApplied && <p style={{ color: '#22c55e', fontSize: '0.75rem', marginTop: 6 }}>20% discount applied!</p>}
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '15px' }}
              onClick={() => navigate('/checkout')}
            >
              Checkout <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18 }}>
              {['🔒 SSL Secure', '🏦 Bank Transfer', '💵 Cash on Delivery'].map(t => (
                <span key={t} style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
