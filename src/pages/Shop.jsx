import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import './Shop.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'bestseller', label: 'Best Selling' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [priceMax, setPriceMax] = useState(600);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery] = useState(searchParams.get('search') || '');
  const { products: PRODUCTS, categories: CATEGORIES } = useProducts();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (onlyInStock) list = list.filter(p => p.inStock);
    list = list.filter(p => (p.salePrice || p.price) <= priceMax);
    if (selectedSubs.length) list = list.filter(p => selectedSubs.includes(p.subcategory));
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-desc': return list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'bestseller': return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default: return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [activeCategory, sort, priceMax, onlyInStock, selectedSubs, searchQuery]);

  const subcategories = currentCategory ? currentCategory.subcategories : [...new Set(PRODUCTS.map(p => p.subcategory))];

  const toggleSub = (sub) => {
    setSelectedSubs(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  const clearFilters = () => {
    setPriceMax(600);
    setOnlyInStock(false);
    setSelectedSubs([]);
  };

  const FilterPanel = () => (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-section">
        <p className="filter-section-title">Subcategory</p>
        {subcategories.map(sub => (
          <div key={sub} className="filter-check-item">
            <label>
              <input
                type="checkbox"
                checked={selectedSubs.includes(sub)}
                onChange={() => toggleSub(sub)}
              />
              {sub}
            </label>
            <span className="filter-count">
              {PRODUCTS.filter(p => p.subcategory === sub).length}
            </span>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <p className="filter-section-title">Price Range</p>
        <div className="price-range-labels">
          <span>Rs 0</span>
          <span>Rs {priceMax}</span>
        </div>
        <input
          type="range"
          min={10}
          max={600}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <p className="filter-section-title">Availability</p>
        <div className="filter-check-item">
          <label>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={e => setOnlyInStock(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-inner">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Shop</span>
            {currentCategory && (
              <>
                <span className="breadcrumb-sep">/</span>
                <span style={{ color: 'var(--accent-gold)' }}>{currentCategory.name}</span>
              </>
            )}
          </div>

          {/* Title Row */}
          <div className="shop-title-row">
            <div>
              <h1 className="shop-title">
                {currentCategory ? currentCategory.name : 'All Products'}
              </h1>
              <p className="shop-count">{filteredProducts.length} products found</p>
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="category-pills">
            <button
              className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="shop-content">
        {/* Filter Sidebar - Desktop */}
        <div className="filter-sidebar-desktop">
          <FilterPanel />
        </div>

        {/* Grid Area */}
        <div className="shop-grid-area">
          {/* Mobile Filter Toggle */}
          <button className="mobile-filter-toggle" onClick={() => setShowFilter(true)}>
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={activeCategory + sort}
                className="shop-products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="clear-filters-btn" style={{ maxWidth: 200, margin: '20px auto 0' }} onClick={clearFilters}>
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 500 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
            />
            <motion.div
              style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 300, zIndex: 501, overflowY: 'auto', padding: 16 }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <button onClick={() => setShowFilter(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              <FilterPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
