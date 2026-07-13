import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Returns() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800 }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 20 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Returns & Refund Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>Last updated: July 2026</p>

        <div className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>1. Return Policy</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            We accept returns up to 30 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>2. Refunds</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>3. Exchanges</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@ecomrace.com.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>4. Shipping Returns</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            To return your product, you should mail your product to our designated return center. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
