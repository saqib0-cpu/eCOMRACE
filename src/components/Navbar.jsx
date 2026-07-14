import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, User, X, ChevronDown, Menu, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { useAdmin } from '../context/AdminContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const { products: PRODUCTS, categories: CATEGORIES } = useProducts();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const filteredProducts = searchQuery.length > 1
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⌚</div>
          <div className="logo-text">
            e<span>COM</span>RACE
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Categories Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              Categories <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      className="dropdown-item"
                      onClick={() => navigate(`/shop?category=${cat.id}`)}
                    >
                      <span className="dropdown-item-icon">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
          </button>
          <Link to="/wishlist" className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/account" className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} />
          </Link>
          <Link to="/admin" className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isAdmin ? '#d4af37' : undefined }} title="Admin Panel">
            <Shield size={17} />
          </Link>

          {/* Hamburger */}
          <button className="hamburger-btn icon-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="mobile-nav-link">
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                Categories
              </p>
              {CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  className="mobile-nav-link"
                  onClick={() => navigate(`/shop?category=${cat.id}`)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              style={{ width: '100%', maxWidth: 600, padding: '0 20px' }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="search-box">
                <Search size={20} color="var(--text-muted)" />
                <input
                  ref={searchRef}
                  className="search-input"
                  placeholder="Search watches, bags, accessories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && searchQuery) {
                      navigate(`/shop?search=${searchQuery}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={20} color="var(--text-muted)" />
                </button>
              </div>
              <AnimatePresence>
                {filteredProducts.length > 0 && (
                  <motion.div
                    className="search-box search-results"
                    style={{ marginTop: 10 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredProducts.map(p => (
                      <div
                        key={p.id}
                        className="search-result-item"
                        onClick={() => {
                          navigate(`/product/${p.id}`);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <img src={p.image} alt={p.name} className="search-result-img" />
                        <div className="search-result-info">
                          <h4>{p.name}</h4>
                          <p>Rs {p.salePrice || p.price}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
