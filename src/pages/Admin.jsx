import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, FolderOpen, ShoppingCart, Settings,
  LogOut, Plus, Pencil, Trash2, X, Check, Upload, Search,
  TrendingUp, Users, DollarSign, Star, Eye, ChevronDown,
  AlertCircle, RotateCcw, Image as ImageIcon
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

/* ────────────────────────────────────────────────────── */
/*  ADMIN LOGIN SCREEN                                    */
/* ────────────────────────────────────────────────────── */
function AdminLogin() {
  const { login } = useAdmin();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const pwRef = useRef(null);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    if (!login(form.username, form.password)) {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#070d1a', padding: 20,
    }}>
      {/* Background decorations */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06), transparent)', top: -150, right: -150 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.04), transparent)', bottom: -100, left: -100 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '48px 44px', width: '100%', maxWidth: 440,
          backdropFilter: 'blur(20px)', position: 'relative', zIndex: 1,
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #d4af37, #f5c518)',
            borderRadius: 18, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(212,175,55,0.35)',
          }}>🔐</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
            Admin Portal
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            eCOMRACE — Management Console
          </p>
        </div>

        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
              USERNAME
            </label>
            <input
              type="text" placeholder="admin" autoFocus
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && form.username && pwRef.current?.focus()}
              style={inputSty}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
              PASSWORD
            </label>
            <input
              ref={pwRef} type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={inputSty}
            />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px' }}>
              <AlertCircle size={15} color="#ef4444" />
              <span style={{ fontSize: '0.85rem', color: '#ef4444' }}>{error}</span>
            </motion.div>
          )}

          <motion.button
            type="submit" whileTap={{ scale: 0.97 }}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #d4af37, #f5c518)',
              color: '#000', fontWeight: 800, fontSize: '0.95rem',
              padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 6px 20px rgba(212,175,55,0.3)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '⌛ Signing in...' : '🔑 Sign In to Admin'}
          </motion.button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
            Default: admin / admin123
          </p>
        </form>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  SHARED STYLES                                         */
/* ────────────────────────────────────────────────────── */
const inputSty = {
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '12px 14px', color: '#fff',
  fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', outline: 'none',
  width: '100%', transition: 'border-color 0.2s', boxSizing: 'border-box',
};

const cardSty = {
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 18, padding: 24,
};

/* ────────────────────────────────────────────────────── */
/*  STAT CARD                                             */
/* ────────────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={{ ...cardSty, display: 'flex', gap: 18, alignItems: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 0%, ${color}12, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}22`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4, letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{sub}</div>}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  PRODUCT FORM MODAL                                    */
/* ────────────────────────────────────────────────────── */
function ProductModal({ product, categories, onSave, onClose }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || categories[0]?.id || '',
    subcategory: product?.subcategory || '',
    price: product?.price || '',
    salePrice: product?.salePrice || '',
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0,
    inStock: product?.inStock ?? true,
    isNew: product?.isNew ?? false,
    isBestSeller: product?.isBestSeller ?? false,
    image: product?.image || '',
    description: product?.description || '',
    sku: product?.sku || '',
  });
  const [imgPreview, setImgPreview] = useState(product?.image || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.category) e.category = 'Category is required';
    if (!form.image.trim()) e.image = 'Image URL is required';
    if (!form.description.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      images: [form.image],
      tags: [],
      specs: {},
    });
  };

  const currentCat = categories.find(c => c.id === form.category);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        style={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: '100%', maxWidth: 800, maxHeight: '90vh', overflow: 'auto', padding: 32 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
            {isEdit ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Name */}
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Product Name *" error={errors.name}>
              <input type="text" placeholder="e.g. Phantom Noir Chronograph" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{ ...inputSty, borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)' }} />
            </FormField>
          </div>

          {/* Category */}
          <FormField label="Category *" error={errors.category}>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              style={{ ...inputSty, borderColor: errors.category ? '#ef4444' : 'rgba(255,255,255,0.1)' }}>
              {categories.map(c => <option key={c.id} value={c.id} style={{ background: '#0d1626' }}>{c.name}</option>)}
            </select>
          </FormField>

          {/* Subcategory */}
          <FormField label="Subcategory">
            <select value={form.subcategory} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
              style={inputSty}>
              <option value="" style={{ background: '#0d1626' }}>Select subcategory</option>
              {(currentCat?.subcategories || []).map(s => <option key={s} value={s} style={{ background: '#0d1626' }}>{s}</option>)}
            </select>
          </FormField>

          {/* Price */}
          <FormField label="Price (Rs) *" error={errors.price}>
            <input type="number" placeholder="299" value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              style={{ ...inputSty, borderColor: errors.price ? '#ef4444' : 'rgba(255,255,255,0.1)' }} />
          </FormField>

          {/* Sale Price */}
          <FormField label="Sale Price (Rs) — optional">
            <input type="number" placeholder="Leave empty for no discount" value={form.salePrice}
              onChange={e => setForm(f => ({ ...f, salePrice: e.target.value }))}
              style={inputSty} />
          </FormField>

          {/* SKU */}
          <FormField label="SKU">
            <input type="text" placeholder="WCH-001" value={form.sku}
              onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
              style={inputSty} />
          </FormField>

          {/* Rating */}
          <FormField label="Rating (0–5)">
            <input type="number" min="0" max="5" step="0.1" value={form.rating}
              onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
              style={inputSty} />
          </FormField>

          {/* Reviews */}
          <FormField label="Review Count">
            <input type="number" min="0" value={form.reviews}
              onChange={e => setForm(f => ({ ...f, reviews: e.target.value }))}
              style={inputSty} />
          </FormField>

          {/* Image URL */}
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Image URL *" error={errors.image}>
              <div style={{ display: 'flex', gap: 10 }}>
                <input type="url" placeholder="https://images.unsplash.com/..." value={form.image}
                  onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setImgPreview(e.target.value); }}
                  style={{ ...inputSty, flex: 1, borderColor: errors.image ? '#ef4444' : 'rgba(255,255,255,0.1)' }} />
                <button onClick={() => setImgPreview(form.image)}
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10, padding: '0 14px', cursor: 'pointer', color: '#d4af37', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Preview
                </button>
              </div>
            </FormField>
            {/* Image Preview */}
            {imgPreview && (
              <div style={{ marginTop: 12, width: 120, height: 120, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)' }}>
                <img src={imgPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImgPreview('')} />
              </div>
            )}
            {!imgPreview && (
              <div style={{ marginTop: 12, width: 120, height: 120, borderRadius: 12, border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <ImageIcon size={24} color="rgba(255,255,255,0.2)" />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>No image</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Description *" error={errors.description}>
              <textarea rows={3} placeholder="Describe the product..." value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                style={{ ...inputSty, resize: 'vertical', borderColor: errors.description ? '#ef4444' : 'rgba(255,255,255,0.1)' }} />
            </FormField>
          </div>

          {/* Toggles */}
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { key: 'inStock', label: '✅ In Stock' },
              { key: 'isNew', label: '🆕 Mark as New' },
              { key: 'isBestSeller', label: '🏆 Best Seller' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <div
                  onClick={() => setForm(f => ({ ...f, [key]: !f[key] }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12, background: form[key] ? 'linear-gradient(135deg, #d4af37, #f5c518)' : 'rgba(255,255,255,0.1)',
                    position: 'relative', transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 3, left: form[key] ? 23 : 3, transition: 'left 0.2s',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'flex-end' }}>
          <button onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', fontWeight: 600 }}>
            Cancel
          </button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5c518)', color: '#000', border: 'none', borderRadius: 12, padding: '12px 28px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={16} />
            {isEdit ? 'Save Changes' : 'Add Product'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.78rem', color: error ? '#ef4444' : 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>{error}</span>}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  DASHBOARD TAB                                         */
/* ────────────────────────────────────────────────────── */
function DashboardTab({ products, categories, cartItems }) {
  const totalRevenue = cartItems.reduce((sum, i) => sum + (i.salePrice || i.price) * i.qty, 0);
  const inStock = products.filter(p => p.inStock).length;
  const newProducts = products.filter(p => p.isNew).length;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard icon={<Package size={22} color="#d4af37" />} label="TOTAL PRODUCTS" value={products.length} sub={`${inStock} In Stock`} color="#d4af37" />
        <StatCard icon={<FolderOpen size={22} color="#60a5fa" />} label="CATEGORIES" value={categories.length} sub="Active" color="#60a5fa" />
        <StatCard icon={<ShoppingCart size={22} color="#34d399" />} label="CART ITEMS" value={cartItems.length} sub={`Rs ${totalRevenue.toFixed(0)} pending`} color="#34d399" />
        <StatCard icon={<TrendingUp size={22} color="#a78bfa" />} label="NEW ARRIVALS" value={newProducts} sub="Featured" color="#a78bfa" />
      </div>

      {/* Recent Products Table */}
      <div style={cardSty}>
        <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: 18, fontSize: '1rem' }}>🛍️ Recent Products</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Image', 'Name', 'Category', 'Price', 'Status', 'Rating'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 8).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: 'rgba(255,255,255,0.05)' }} />
                  </td>
                  <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{p.name}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{p.category}</td>
                  <td style={{ padding: '10px 12px', color: '#d4af37', fontWeight: 700, fontSize: '0.875rem' }}>
                    Rs {p.salePrice || p.price}
                    {p.salePrice && <span style={{ marginLeft: 6, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', fontSize: '0.75rem' }}>Rs {p.price}</span>}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: p.inStock ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)', color: p.inStock ? '#34d399' : '#ef4444', border: `1px solid ${p.inStock ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#f5c518', fontSize: '0.875rem' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  PRODUCTS TAB                                          */
/* ────────────────────────────────────────────────────── */
function ProductsTab() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [modal, setModal] = useState(null); // null | 'add' | product
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleSave = (data) => {
    if (modal?.id) {
      updateProduct(modal.id, data);
    } else {
      addProduct(data);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputSty, paddingLeft: 38 }} />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ ...inputSty, width: 'auto', minWidth: 160 }}>
          <option value="all" style={{ background: '#0d1626' }}>All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id} style={{ background: '#0d1626' }}>{c.name}</option>)}
        </select>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setModal('add')}
          style={{ background: 'linear-gradient(135deg, #d4af37, #f5c518)', color: '#000', border: 'none', borderRadius: 12, padding: '0 20px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, height: 44, whiteSpace: 'nowrap' }}>
          <Plus size={16} /> Add Product
        </motion.button>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        <AnimatePresence>
          {filtered.map(p => (
            <motion.div
              key={p.id} layout
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ ...cardSty, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}
            >
              {/* Badges */}
              <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 6, zIndex: 1 }}>
                {p.isNew && <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>NEW</span>}
                {p.isBestSeller && <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }}>TOP</span>}
              </div>

              <div style={{ width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>{p.category} · {p.sku}</p>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 800, color: '#d4af37', fontSize: '1rem' }}>Rs {p.salePrice || p.price}</span>
                  {p.salePrice && <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Rs {p.price}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <button onClick={() => setModal(p)}
                  style={{ flex: 1, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37', borderRadius: 10, padding: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: '0.8rem' }}>
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(p)}
                  style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', borderRadius: 10, padding: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: '0.8rem' }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <ProductModal
            product={modal === 'add' ? null : modal}
            categories={categories}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🗑️</div>
              <h3 style={{ fontWeight: 800, color: '#fff', marginBottom: 8 }}>Delete Product?</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 24 }}>
                Are you sure you want to delete "<strong style={{ color: '#fff' }}>{deleteConfirm.name}</strong>"? This cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setDeleteConfirm(null)}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '12px', cursor: 'pointer', fontWeight: 600 }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm.id)}
                  style={{ flex: 1, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: 12, padding: '12px', cursor: 'pointer', fontWeight: 800 }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  CATEGORIES TAB                                        */
/* ────────────────────────────────────────────────────── */
function CategoriesTab() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useProducts();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', icon: '', description: '', color: '#d4af37', image: '' });

  const catProductCount = (catId) => products.filter(p => p.category === catId).length;

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal === 'add') {
      addCategory(form);
    } else {
      updateCategory(modal.id, form);
    }
    setModal(null);
    setForm({ name: '', icon: '', description: '', color: '#d4af37', image: '' });
  };

  const openEdit = (cat) => {
    setForm({ name: cat.name, icon: cat.icon, description: cat.description, color: cat.color || '#d4af37', image: cat.image || '' });
    setModal(cat);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setForm({ name: '', icon: '', description: '', color: '#d4af37', image: '' }); setModal('add'); }}
          style={{ background: 'linear-gradient(135deg, #d4af37, #f5c518)', color: '#000', border: 'none', borderRadius: 12, padding: '11px 20px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Category
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {categories.map(cat => (
          <motion.div key={cat.id} whileHover={{ y: -3 }}
            style={{ ...cardSty, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 0%, ${cat.color || '#d4af37'}10, transparent 60%)`, pointerEvents: 'none' }} />
            {cat.image && (
              <div style={{ width: '100%', height: 120, borderRadius: 10, overflow: 'hidden', marginBottom: 14, background: 'rgba(255,255,255,0.04)' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cat.color || '#d4af37'}20`, border: `1px solid ${cat.color || '#d4af37'}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                {cat.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{cat.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{catProductCount(cat.id)} products</p>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginBottom: 16, lineHeight: 1.5 }}>{cat.description}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(cat)}
                style={{ flex: 1, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37', borderRadius: 10, padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: '0.8rem' }}>
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => deleteCategory(cat.id)}
                style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', borderRadius: 10, padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: '0.8rem' }}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={e => e.target === e.currentTarget && setModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              style={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: '100%', maxWidth: 500, padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ color: '#fff', fontWeight: 800 }}>{modal === 'add' ? '➕ Add Category' : '✏️ Edit Category'}</h2>
                <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><X size={18} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <FormField label="Category Name *">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Electronics" style={inputSty} />
                </FormField>
                <FormField label="Icon (emoji)">
                  <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="e.g. 📱" style={inputSty} />
                </FormField>
                <FormField label="Description">
                  <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description..." style={inputSty} />
                </FormField>
                <FormField label="Theme Color">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                      style={{ width: 44, height: 44, borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer' }} />
                    <input value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="#d4af37" style={{ ...inputSty, flex: 1 }} />
                  </div>
                </FormField>
                <FormField label="Category Image URL">
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." style={inputSty} />
                </FormField>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
                <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '11px 20px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button onClick={handleSave} style={{ background: 'linear-gradient(135deg, #d4af37, #f5c518)', color: '#000', border: 'none', borderRadius: 12, padding: '11px 24px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={15} /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  SETTINGS TAB                                          */
/* ────────────────────────────────────────────────────── */
function SettingsTab() {
  const { resetToDefaults } = useProducts();
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ ...cardSty, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>🔑 Admin Credentials</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 16, lineHeight: 1.6 }}>
          Default login credentials for admin access. These are stored locally.
        </p>
        <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, padding: '14px 18px', fontFamily: 'monospace', fontSize: '0.875rem', color: '#d4af37' }}>
          Username: <strong>admin</strong><br />
          Password: <strong>admin123</strong>
        </div>
      </div>

      <div style={{ ...cardSty, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>🔄 Reset to Defaults</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 16, lineHeight: 1.6 }}>
          This will reset all products and categories back to the original store data. All custom changes will be lost.
        </p>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleReset}
          style={{ background: resetDone ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.1)', border: `1px solid ${resetDone ? 'rgba(52,211,153,0.4)' : 'rgba(239,68,68,0.3)'}`, color: resetDone ? '#34d399' : '#ef4444', borderRadius: 12, padding: '11px 20px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          {resetDone ? <><Check size={15} /> Reset Done!</> : <><RotateCcw size={15} /> Reset All Data</>}
        </motion.button>
      </div>

      <div style={cardSty}>
        <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>🚪 Sign Out</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 16 }}>
          Sign out of the admin panel and return to the store.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => { logout(); navigate('/'); }}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '11px 20px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Eye size={15} /> View Store
          </button>
          <button onClick={logout}
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 12, padding: '11px 20px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  MAIN ADMIN DASHBOARD                                  */
/* ────────────────────────────────────────────────────── */
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, categories } = useProducts();
  const { cartItems } = useCart();
  const { logout } = useAdmin();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#070d1a', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: 240, flexShrink: 0, background: 'rgba(255,255,255,0.025)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
      }}>
        {/* Sidebar Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #d4af37, #f5c518)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>⌚</div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
                e<span style={{ color: '#d4af37' }}>COM</span>RACE
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>ADMIN CONSOLE</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button key={tab.id} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 12, border: 'none',
                  background: isActive ? 'rgba(212,175,55,0.12)' : 'transparent',
                  color: isActive ? '#d4af37' : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer', fontWeight: isActive ? 700 : 500, fontSize: '0.875rem',
                  marginBottom: 4, transition: 'all 0.2s', fontFamily: 'inherit',
                  borderLeft: isActive ? '3px solid #d4af37' : '3px solid transparent',
                }}>
                <Icon size={17} />
                {tab.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => navigate('/')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontWeight: 500, fontSize: '0.8rem', marginBottom: 4, fontFamily: 'inherit' }}>
            <Eye size={15} /> View Store
          </button>
          <button onClick={logout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: 'none', background: 'transparent', color: 'rgba(239,68,68,0.6)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'inherit' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Top Bar */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#070d1a', zIndex: 10 }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
              {products.length} products · {categories.length} categories
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: '0.75rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
              Admin Active
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '28px 32px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'dashboard' && <DashboardTab products={products} categories={categories} cartItems={cartItems} />}
              {activeTab === 'products' && <ProductsTab />}
              {activeTab === 'categories' && <CategoriesTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  ENTRY POINT (auto-routes login vs dashboard)          */
/* ────────────────────────────────────────────────────── */
export default function Admin() {
  const { isAdmin } = useAdmin();
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}
