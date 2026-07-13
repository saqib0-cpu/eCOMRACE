import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, MapPin, User, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const MOCK_ORDERS = [
  { id: '#ORD-8821', date: 'June 28, 2026', items: 3, total: 389, status: 'Delivered' },
  { id: '#ORD-8756', date: 'June 12, 2026', items: 1, total: 79, status: 'Shipped' },
  { id: '#ORD-8601', date: 'May 30, 2026', items: 2, total: 218, status: 'Delivered' },
];

const STATUS_COLORS = {
  Delivered: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  Shipped: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  Processing: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  Pending: { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
};

const TABS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('orders');
  const { wishlist, toggleWishlist } = useCart();

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: 800, color: '#000', flexShrink: 0,
          }}>
            J
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>John Doe</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>john.doe@email.com · Member since June 2026</p>
            <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
              {[{ label: 'Orders', val: MOCK_ORDERS.length }, { label: 'Wishlist', val: wishlist.length }, { label: 'Reviews', val: 5 }].map(s => (
                <div key={s.label}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-gold)', marginRight: 4 }}>{s.val}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <LogOut size={15} /> Sign Out
          </Link>
        </motion.div>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Sidebar Nav */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 18,
              padding: 12,
              position: 'sticky',
              top: 90,
            }}
          >
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 14px',
                    borderRadius: 10,
                    background: activeTab === tab.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-main)',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    marginBottom: 4,
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Orders */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Order History</h3>
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 16,
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, marginBottom: 4 }}>{order.id}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                      background: STATUS_COLORS[order.status]?.bg, color: STATUS_COLORS[order.status]?.color,
                    }}>
                      {order.status}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-gold)' }}>Rs {order.total}</span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-main)' }}>
                      View <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>
                  Wishlist ({wishlist.length})
                </h3>
                {wishlist.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <Heart size={48} style={{ marginBottom: 16 }} />
                    <p>Your wishlist is empty.</p>
                    <Link to="/shop" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Start exploring →</Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Saved Addresses</h3>
                <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 16, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--accent-gold)', padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Default</span>
                  </div>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>John Doe</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    123 Main Street, Apt 4B<br />New York, NY 10001<br />United States
                  </p>
                </div>
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 18, padding: 32 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 28 }}>Profile Settings</h3>
                <div style={{ display: 'grid', gap: 18 }}>
                  {[
                    { label: 'First Name', val: 'John' },
                    { label: 'Last Name', val: 'Doe' },
                    { label: 'Email', val: 'john.doe@email.com' },
                    { label: 'Phone', val: '+1 555 0000' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>{f.label}</label>
                      <input
                        defaultValue={f.val}
                        style={{
                          background: 'var(--surface-color-light)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 10,
                          padding: '11px 14px',
                          color: 'var(--text-main)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          width: '100%',
                        }}
                      />
                    </div>
                  ))}
                  <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
