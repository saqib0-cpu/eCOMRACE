import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);

  const inputRefs = useRef({});
  const setRef = key => el => { inputRefs.current[key] = el; };
  const fieldOrder = ['firstName', 'lastName', 'email', 'password', 'confirm'];

  const isFieldDisabled = (key) => {
     const idx = fieldOrder.indexOf(key);
     if (idx <= 0) return false;
     for(let i=0; i<idx; i++) {
        const prevKey = fieldOrder[i];
        if (!form[prevKey]) return true;
     }
     return false;
  };

  const handleKeyDown = (key) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!form[key]) return;
      const idx = fieldOrder.indexOf(key);
      if (idx >= 0 && idx < fieldOrder.length - 1) {
        const nextKey = fieldOrder[idx + 1];
        if (inputRefs.current[nextKey]) {
          inputRefs.current[nextKey].focus();
        }
      }
    }
  };

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

  const Field = ({ label, type = 'text', placeholder, k }) => (
    <div>
      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8, fontWeight: 500 }}>{label}</label>
      <input
        ref={setRef(k)}
        type={type}
        placeholder={placeholder}
        style={{ ...inputStyle, opacity: isFieldDisabled(k) ? 0.5 : 1 }}
        value={form[k]}
        onChange={update(k)}
        onKeyDown={handleKeyDown(k)}
        disabled={isFieldDisabled(k)}
        onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07), transparent)', top: -100, left: -150, pointerEvents: 'none' }} />

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
          maxWidth: 480,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
              ⌚
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              e<span style={{ color: 'var(--accent-gold)' }}>COM</span>RACE
            </span>
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 24, marginBottom: 6 }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Join thousands of happy customers</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="First Name" placeholder="John" k="firstName" />
            <Field label="Last Name" placeholder="Doe" k="lastName" />
          </div>
          <Field label="Email Address" type="email" placeholder="you@email.com" k="email" />

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                ref={setRef('password')}
                type={showPw ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                style={{ ...inputStyle, paddingRight: 46, opacity: isFieldDisabled('password') ? 0.5 : 1 }}
                value={form.password}
                onChange={update('password')}
                onKeyDown={handleKeyDown('password')}
                disabled={isFieldDisabled('password')}
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

          <Field label="Confirm Password" type="password" placeholder="Re-enter password" k="confirm" />

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            By creating an account, you agree to our{' '}
            <a href="#" style={{ color: 'var(--accent-gold)' }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: 'var(--accent-gold)' }}>Privacy Policy</a>.
          </p>

          <motion.button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/account')}
          >
            Create Account
          </motion.button>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
