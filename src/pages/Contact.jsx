import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    background: 'var(--surface-color-light)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    padding: '12px 16px',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-main)',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  const INFO = [
    { icon: Mail, label: 'Email', val: 'support@ecomrace.com' },
    { icon: Phone, label: 'Phone', val: '+1 (555) 000-0000' },
    { icon: MapPin, label: 'Address', val: '123 Commerce Ave, New York, NY 10001' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--accent-gold)', display: 'block', marginBottom: 12 }}>
            Get in Touch
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: -0.5, marginBottom: 16 }}>
            We're Here to Help
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
            Have a question, feedback, or want to partner with us? Drop us a message below.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            {INFO.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 14,
                }}>
                  <div style={{
                    width: 44, height: 44,
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-gold)', flexShrink: 0,
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.val}</p>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp */}
            <div style={{
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: 16,
              padding: '20px 24px',
              marginTop: 8,
            }}>
              <p style={{ fontWeight: 700, marginBottom: 6, color: '#25d366' }}>💬 WhatsApp Support</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Chat with us directly on WhatsApp for fast support. Available 9 AM – 9 PM daily.
              </p>
              <a href="https://wa.me/15550000000" target="_blank" rel="noreferrer" style={{
                display: 'inline-block', marginTop: 12,
                background: '#25d366', color: '#fff',
                padding: '8px 18px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700,
              }}>
                Chat Now
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 20,
              padding: 36,
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Full Name</label>
                    <input style={inputStyle} placeholder="John Doe" value={form.name} onChange={update('name')}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Email</label>
                    <input type="email" style={inputStyle} placeholder="you@email.com" value={form.email} onChange={update('email')}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Subject</label>
                  <input style={inputStyle} placeholder="How can we help?" value={form.subject} onChange={update('subject')}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea
                    style={{ ...inputStyle, height: 140, resize: 'vertical' }}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={update('message')}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <motion.button
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', gap: 8 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSent(true)}
                >
                  <Send size={15} /> Send Message
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
