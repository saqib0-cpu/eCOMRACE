import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express shipping (1–2 business days) is available at checkout.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy on all items in original condition. Simply contact our support team to initiate a return.' },
  { q: 'Are the products authentic?', a: 'Yes! Every product we sell is 100% authentic and sourced directly from authorized distributors or manufacturers.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship internationally to over 50 countries. International shipping times vary by destination (7–21 business days).' },
  { q: 'Can I track my order?', a: 'Absolutely! Once your order ships, you\'ll receive an email with a tracking number and link.' },
  { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards (Visa, MasterCard, Amex), bank transfers, and Cash on Delivery (COD) in select regions.' },
  { q: 'How do I apply a discount code?', a: 'On the Cart page, you\'ll find a "Promo Code" field. Enter your code there and click Apply. The discount will be applied instantly.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 24 hours of placement. Contact our support team as soon as possible for assistance.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--accent-gold)', display: 'block', marginBottom: 12 }}>
            FAQs
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: -0.5, marginBottom: 16 }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Can't find your answer? <a href="/contact" style={{ color: 'var(--accent-gold)' }}>Contact us</a>.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: 'var(--surface-color)',
                border: `1px solid ${open === i ? 'rgba(212,175,55,0.3)' : 'var(--border-color)'}`,
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  textAlign: 'left',
                  gap: 14,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: open === i ? 'var(--accent-gold)' : 'var(--text-main)' }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 22px 20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
