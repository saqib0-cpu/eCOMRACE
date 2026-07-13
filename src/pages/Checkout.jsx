import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

const InputField = ({ label, type = 'text', placeholder, value, onChange, required }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}{required && ' *'}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        background: 'var(--surface-color-light)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: '11px 14px',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-main)',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
    />
  </div>
);

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
  });

  const shipping = shippingMethod === 'express' ? 14.99 : (cartTotal > 75 ? 0 : 9.99);
  const total = cartTotal + shipping;

  const updateForm = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate('/'), 4000);
  };

  if (placed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          style={{ textAlign: 'center', maxWidth: 480 }}
        >
          <motion.div
            style={{
              width: 90, height: 90,
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14, delay: 0.2 }}
          >
            <Check size={44} color="#000" strokeWidth={3} />
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Order Placed! 🎉</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            Thank you for your order! We've sent a confirmation email. Your items will be on their way soon.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40, alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: i < step ? 'pointer' : 'default' }}
                onClick={() => i < step && setStep(i)}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.3s',
                  background: i <= step ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))' : 'var(--surface-color)',
                  border: i <= step ? 'none' : '1px solid var(--border-color)',
                  color: i <= step ? '#000' : 'var(--text-muted)',
                }}>
                  {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: i === step ? 700 : 400, color: i === step ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 48, height: 1, background: i < step ? 'var(--accent-gold)' : 'var(--border-color)', margin: '0 12px', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 30, alignItems: 'start' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 32 }}
            >
              {/* Step 0: Shipping */}
              {step === 0 && (
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: 24 }}>Shipping Address</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <InputField label="First Name" placeholder="John" value={form.firstName} onChange={updateForm('firstName')} required />
                    <InputField label="Last Name" placeholder="Doe" value={form.lastName} onChange={updateForm('lastName')} required />
                    <InputField label="Email" type="email" placeholder="john@email.com" value={form.email} onChange={updateForm('email')} required />
                    <InputField label="Phone" type="tel" placeholder="+1 555 0000" value={form.phone} onChange={updateForm('phone')} />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <InputField label="Address" placeholder="123 Main Street" value={form.address} onChange={updateForm('address')} required />
                    </div>
                    <InputField label="City" placeholder="New York" value={form.city} onChange={updateForm('city')} required />
                    <InputField label="State / Province" placeholder="NY" value={form.state} onChange={updateForm('state')} />
                    <InputField label="ZIP / Postal Code" placeholder="10001" value={form.zip} onChange={updateForm('zip')} required />
                    <InputField label="Country" placeholder="United States" value={form.country} onChange={updateForm('country')} required />
                  </div>

                  <h3 style={{ fontWeight: 700, marginTop: 28, marginBottom: 16 }}>Shipping Method</h3>
                  {[
                    { id: 'standard', label: 'Standard Shipping', sub: '5–7 Business Days', price: cartTotal > 75 ? 'Free' : '$9.99' },
                    { id: 'express', label: 'Express Shipping', sub: '1–2 Business Days', price: '$14.99' },
                  ].map(s => (
                    <div
                      key={s.id}
                      onClick={() => setShippingMethod(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px', border: `1px solid ${shippingMethod === s.id ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                        background: shippingMethod === s.id ? 'rgba(212,175,55,0.06)' : 'transparent',
                        borderRadius: 12, cursor: 'pointer', marginBottom: 10, transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%',
                          border: `2px solid ${shippingMethod === s.id ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {shippingMethod === s.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)' }} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.sub}</div>
                        </div>
                      </div>
                      <span style={{ fontWeight: 700, color: s.price === 'Free' ? '#22c55e' : 'var(--text-main)' }}>{s.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: 24 }}>Payment Method</h3>
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map(p => (
                    <div
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 16px', border: `1px solid ${paymentMethod === p.id ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                        background: paymentMethod === p.id ? 'rgba(212,175,55,0.06)' : 'transparent',
                        borderRadius: 12, cursor: 'pointer', marginBottom: 12, transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        border: `2px solid ${paymentMethod === p.id ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {paymentMethod === p.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)' }} />}
                      </div>
                      <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                      <span style={{ fontWeight: 600 }}>{p.label}</span>
                    </div>
                  ))}

                  {paymentMethod === 'card' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 20, display: 'grid', gap: 16 }}>
                      <InputField label="Card Number" placeholder="•••• •••• •••• ••••" />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <InputField label="Expiry Date" placeholder="MM / YY" />
                        <InputField label="CVV" placeholder="•••" />
                      </div>
                      <InputField label="Name on Card" placeholder="John Doe" />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 2: Confirm */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Order Review</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cartItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</p>
                        </div>
                        <span style={{ fontWeight: 700 }}>${((item.salePrice || item.price) * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 20, paddingTop: 20 }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                      📍 {form.address || '123 Main St'}, {form.city || 'New York'}, {form.country || 'USA'}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      💳 Payment: {paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                {step > 0 && (
                  <button className="btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
                )}
                {step < STEPS.length - 1 ? (
                  <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setStep(s => s + 1)}>
                    Continue →
                  </button>
                ) : (
                  <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={handlePlaceOrder}>
                    Place Order 🎉
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Summary Sidebar */}
          <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 24, position: 'sticky', top: 90 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem' }}>Summary</h3>
            {[
              { label: 'Subtotal', val: `$${cartTotal.toFixed(2)}` },
              { label: 'Shipping', val: shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}` },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent-gold)' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
