import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ShoppingBag, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';
import './Home.css';

// Hero images carousel
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    tag: 'New Collection 2026',
    title: ['Define Your', 'Signature', 'Style'],
    subtitle: 'Handpicked luxury watches, accessories & lifestyle products. Crafted for the modern gentleman.',
  },
  {
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80',
    tag: 'Smart Watches',
    title: ['Smart. Sleek.', 'Always', 'On Time.'],
    subtitle: 'Next-generation smartwatches that blend technology with timeless elegance.',
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    tag: 'Bags & Wallets',
    title: ['Carry What', 'Matters', 'Most.'],
    subtitle: 'Premium leather bags and wallets built for everyday excellence.',
  },
];

const TRUST_BADGES = [
  { icon: '🔒', title: 'Secure Payments', desc: '256-bit SSL encryption on all transactions' },
  { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $75 worldwide' },
  { icon: '↩', title: 'Easy Returns', desc: '30-day hassle-free returns & exchanges' },
  { icon: '⭐', title: 'Quality Guarantee', desc: 'Authentic products from trusted brands' },
];

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-advance hero
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 8);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const slide = HERO_SLIDES[currentSlide];

  return (
    <div>
      {/* ====== HERO ====== */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slide.image}
              alt=""
              className="hero-bg-image"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.22, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>
          <div className="hero-gradient" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>

        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          {/* Text Side */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero-eyebrow">
                  <span>✦</span> {slide.tag}
                </span>
                <h1 className="hero-title">
                  {slide.title.map((line, i) => (
                    <span key={i} className={i === 1 ? 'highlight' : ''} style={{ display: 'block' }}>
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <button className="btn-primary" onClick={() => navigate('/shop')}>
                <ShoppingBag size={17} /> Shop Now
              </button>
              <button className="btn-outline" onClick={() => navigate('/about')}>
                <Play size={15} fill="currentColor" /> Our Story
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { val: 120, suffix: '+', label: 'Products' },
                { val: 5, suffix: 'K+', label: 'Happy Customers' },
                { val: 4.8, suffix: '★', label: 'Avg. Rating' },
              ].map(s => (
                <div key={s.label}>
                  <div className="hero-stat-val">
                    <CountUp target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Side */}
          <div className="hero-visual">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-image-card">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slide.image}
                    alt="Featured Product"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
              </div>

              {/* Floating Badges */}
              <motion.div
                className="hero-floating-badge top-right"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <div className="hfb-label">Best Seller</div>
                <div className="hfb-value">4.9 ★</div>
              </motion.div>
              <motion.div
                className="hero-floating-badge bottom-left"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="hfb-label">Today's Deal</div>
                <div className="hfb-value">Up to 40% OFF</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide Dots */}
        <div style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 2 }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentSlide ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">Scroll</div>
          <motion.div
            className="scroll-line"
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-tag">Collections</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link to="/shop" className="section-link">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="category-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
            >
              {/* Background gradient */}
              <div
                className="category-card-gradient"
                style={{ background: `radial-gradient(ellipse at 60% 40%, ${cat.color}25, transparent 70%)` }}
              />

              {/* Content */}
              <div className="category-card-body">
                <div className="category-icon">{cat.icon}</div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.productCount} Products</p>
                <div className="category-btn">
                  Shop Now <ArrowRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== NEW ARRIVALS ====== */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="section-header">
          <div>
            <span className="section-tag">Just Dropped</span>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link to="/shop?sort=newest" className="section-link">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="products-grid">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ====== PROMO BANNER ====== */}
      <section className="section" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <motion.div
          className="promo-banner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="promo-tag">Limited Time Offer</span>
            <h2 className="promo-title">Get <span>20% OFF</span> Your<br />First Order</h2>
            <p className="promo-subtitle">Use code at checkout. Valid on all products storewide. Today only!</p>
          </div>
          <div className="promo-code-box">
            <div className="promo-code">
              <div className="promo-code-label">Use Code</div>
              <div className="promo-code-value">RACE20</div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/shop')}>
              Claim Deal <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ====== BEST SELLERS ====== */}
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="section-header">
          <div>
            <span className="section-tag">Top Rated</span>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <Link to="/shop?sort=bestseller" className="section-link">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="products-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ====== TRUST BADGES ====== */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="trust-badges">
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.title}
              className="trust-badge-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="trust-badge-icon">{badge.icon}</div>
              <h4 className="trust-badge-title">{badge.title}</h4>
              <p className="trust-badge-desc">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
