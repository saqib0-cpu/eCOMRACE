import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    { icon: '⭐', title: 'Quality First', desc: 'Every product goes through rigorous quality checks before reaching you.' },
    { icon: '🤝', title: 'Customer Trust', desc: 'We\'re here 24/7 to ensure your shopping experience is smooth and joyful.' },
    { icon: '🌿', title: 'Sustainability', desc: 'We\'re committed to eco-friendly packaging and responsible sourcing.' },
    { icon: '💎', title: 'Premium Selection', desc: 'Only the best products, curated by style experts for the modern man.' },
  ];

  const team = [
    { name: 'Ahmad K.', role: 'Founder & CEO', initial: 'A' },
    { name: 'Sara M.', role: 'Head of Design', initial: 'S' },
    { name: 'James T.', role: 'Lead Developer', initial: 'J' },
    { name: 'Layla R.', role: 'Customer Success', initial: 'L' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '110px 0 80px' }}>
      {/* Hero */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--accent-gold)', display: 'block', marginBottom: 16 }}>
            Our Story
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.15, marginBottom: 20 }}>
            Redefining Premium{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Shopping
            </span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            eCOMRACE was founded with a simple mission: make it easy for every man to find premium quality products at fair prices.
          </p>
        </motion.div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 80 }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 18,
                padding: 28,
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 14 }}>{v.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--accent-gold)', display: 'block', marginBottom: 12 }}>
            The Team
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: -0.5 }}>Meet the People Behind eCOMRACE</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 80 }}>
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 18,
                padding: 28,
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 70, height: 70, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: '1.5rem', fontWeight: 800, color: '#000',
              }}>
                {member.initial}
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{member.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 24,
            padding: '60px 40px',
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>Ready to Explore?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Browse over 120 premium products across 4 categories.</p>
          <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Shop Now <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
