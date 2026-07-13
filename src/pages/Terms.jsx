import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
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
        <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>Last updated: July 2026</p>

        <div className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>1. Introduction</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            Welcome to eCOMRACE. By accessing our website, you agree to these Terms and Conditions. Please read them carefully.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>2. Use of the Site</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            You may use our site for lawful purposes only. You must not use our site in any way that breaches any applicable local, national, or international law or regulation.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>3. Intellectual Property</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            All content on this site, including text, graphics, logos, images, and software, is the property of eCOMRACE and is protected by international copyright laws.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>4. Product Information</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
            We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site are accurate, complete, reliable, current, or error-free.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginBottom: 16, color: 'var(--accent-gold)' }}>5. Limitation of Liability</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            eCOMRACE will not be liable for any damages of any kind arising from the use of this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
