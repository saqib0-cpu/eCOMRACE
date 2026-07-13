import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    background: 'var(--surface-color-light)',
    border: '1px solid var(--border-color)',
    borderRadius: 12,
    padding: '13px 16px',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-main)',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07), transparent)', top: -150, right: -150, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.05), transparent)', bottom: -100, left: -100, pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: 24,
          padding: '48px 44px',
          width: '100%',
          maxWidth: 440,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
              ⌚
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              e<span style={{ color: 'var(--accent-gold)' }}>COM</span>RACE
            </span>
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 24, marginBottom: 6 }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to your account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Email */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8, fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              style={inputStyle}
              value={form.email}
              onChange={update('email')}
              onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: 46 }}
                value={form.password}
                onChange={update('password')}
                onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem', marginTop: 8 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/account')}
          >
            Sign In
          </motion.button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🔵', label: 'Google' }, { icon: '⬛', label: 'Apple' }].map(s => (
              <button key={s.label} className="btn-outline" style={{ justifyContent: 'center', gap: 8, fontSize: '0.85rem', padding: '11px' }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
