import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo-area">
            <div className="logo-icon">⌚</div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
              e<span style={{ color: 'var(--accent-gold)' }}>COM</span>RACE
            </span>
          </div>
          <p>
            Premium watches, mobile accessories, bags & home décor — curated for the modern man who values style and quality.
          </p>
          <div className="footer-socials">
            {['𝕏', 'f', 'in', '▶'].map((icon, i) => (
              <button key={i} className="social-btn">{icon}</button>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=watches">Watches</Link></li>
            <li><Link to="/shop?category=mobile-accessories">Mobile Accessories</Link></li>
            <li><Link to="/shop?category=bags-wallets">Bags & Wallets</Link></li>
            <li><Link to="/shop?category=home-decor">Home Décor</Link></li>
            <li><Link to="/shop">All Products</Link></li>
          </ul>
        </div>

        {/* Info Links */}
        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 14, lineHeight: 1.6 }}>
            Get exclusive deals & early access to new arrivals.
          </p>
          <div className="footer-newsletter-input">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={() => { if (email) { alert('Subscribed!'); setEmail(''); } }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 eCOMRACE. All rights reserved.</p>
        <div className="footer-badges">
          <span className="footer-badge">🔒 Secure Payments</span>
          <span className="footer-badge">🚚 Free Shipping</span>
          <span className="footer-badge">↩ Easy Returns</span>
        </div>
      </div>
    </footer>
  );
}
