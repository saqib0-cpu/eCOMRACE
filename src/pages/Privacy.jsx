import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', padding: '110px 20px 80px', color: 'var(--text-main)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 32 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>
          We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you use our website.
        </p>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Information We Collect</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We collect information that you provide when placing an order, creating an account, or contacting support. This may include name, email address, shipping address, payment information, and order details.
          </p>
        </section>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>How We Use Your Data</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Your information helps us process orders, communicate with you, and improve our services. We may also use data for marketing and analytics with your consent.
          </p>
        </section>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Third-Party Services</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We may share information with trusted service providers such as payment processors, shipping partners, and email platforms. We do not sell your personal data to third parties.
          </p>
        </section>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Cookies</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We use cookies and similar tracking technologies to enhance site performance, remember preferences, and support analytics. You can manage cookie settings in your browser.
          </p>
        </section>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Contact Us</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            If you have questions or concerns about this policy, please <Link to="/contact" style={{ color: 'var(--accent-gold)' }}>contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
