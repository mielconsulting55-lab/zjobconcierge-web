// Login.jsx
// Login page with email verification code - Mobile responsive with EN/FR
// Place in: src/pages/Login.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

const translations = {
  en: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your account',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    sendCode: 'Send Login Code',
    sending: 'Sending...',
    codeTitle: 'Enter Verification Code',
    codeSubtitle: 'We sent a 6-digit code to',
    verifying: 'Verifying...',
    verify: 'Verify & Sign In',
    resendCode: 'Resend code',
    resendIn: 'Resend code in',
    wrongEmail: 'Wrong email?',
    changeEmail: 'Change',
    noAccount: 'Don\'t have an account?',
    signUp: 'Start Free Trial',
    errors: {
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email',
      emailNotFound: 'No account found with this email. Please sign up.',
      codeFailed: 'Failed to send code. Please try again.',
      codeInvalid: 'Invalid code. Please try again.',
      codeExpired: 'Code expired. Please request a new one.',
    },
  },
  fr: {
    title: 'Bon Retour',
    subtitle: 'Connectez-vous à votre compte',
    emailLabel: 'Adresse Email',
    emailPlaceholder: 'Entrez votre email',
    sendCode: 'Envoyer le Code',
    sending: 'Envoi...',
    codeTitle: 'Entrez le Code de Vérification',
    codeSubtitle: 'Nous avons envoyé un code à 6 chiffres à',
    verifying: 'Vérification...',
    verify: 'Vérifier et Se Connecter',
    resendCode: 'Renvoyer le code',
    resendIn: 'Renvoyer dans',
    wrongEmail: 'Mauvais email?',
    changeEmail: 'Changer',
    noAccount: 'Pas encore de compte?',
    signUp: 'Essai Gratuit',
    errors: {
      emailRequired: 'Veuillez entrer votre email',
      emailInvalid: 'Veuillez entrer un email valide',
      emailNotFound: 'Aucun compte trouvé avec cet email. Inscrivez-vous.',
      codeFailed: 'Échec de l\'envoi du code. Réessayez.',
      codeInvalid: 'Code invalide. Réessayez.',
      codeExpired: 'Code expiré. Demandez-en un nouveau.',
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(1); // 1 = email, 2 = code
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const codeInputs = useRef([]);
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('jc_lang');
    if (savedLang) setLang(savedLang);
    
    // Check if already logged in
    if (localStorage.getItem('jc_user_email')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('jc_lang', newLang);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t.errors.emailRequired);
      return;
    }
    if (!validateEmail(email)) {
      setError(t.errors.emailInvalid);
      return;
    }

    setLoading(true);
    try {
      // Check if email exists
      const checkRes = await fetch(`${API_BASE}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const checkData = await checkRes.json();

      if (!checkData.exists) {
        setError(t.errors.emailNotFound);
        setLoading(false);
        return;
      }

      // Send login code
      const res = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: 'User', login: true }),
      });

      if (res.ok) {
        setStep(2);
        setResendTimer(60);
        setTimeout(() => codeInputs.current[0]?.focus(), 100);
      } else {
        setError(t.errors.codeFailed);
      }
    } catch (err) {
      setError(t.errors.codeFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (value && index === 5) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        verifyCode(fullCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      verifyCode(pasted);
    }
  };

  const verifyCode = async (fullCode) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await res.json();

      if (res.ok && data.verified) {
        localStorage.setItem('jc_user_email', email);
        navigate('/dashboard');
      } else {
        setError(data.detail || t.errors.codeInvalid);
        setCode(['', '', '', '', '', '']);
        codeInputs.current[0]?.focus();
      }
    } catch (err) {
      setError(t.errors.codeInvalid);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setLoading(true);
    try {
      await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: 'User', login: true }),
      });
      setResendTimer(60);
      setError('');
    } catch (err) {
      setError(t.errors.codeFailed);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#08080f',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '24px',
      padding: '40px 32px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      fontWeight: '800',
      color: '#0a0a0f',
    },
    title: {
      fontSize: '26px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.5)',
      textAlign: 'center',
      marginBottom: '32px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: 'rgba(255,255,255,0.7)',
    },
    input: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      color: '#fff',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
    },
    codeContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    codeInput: {
      width: '48px',
      height: '56px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: '700',
      color: '#fff',
      background: 'rgba(255,255,255,0.05)',
      border: '2px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    submitBtn: {
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    disabledBtn: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    error: {
      padding: '14px',
      background: 'rgba(255,107,107,0.1)',
      border: '1px solid rgba(255,107,107,0.2)',
      borderRadius: '10px',
      fontSize: '14px',
      color: '#FF6B6B',
      textAlign: 'center',
    },
    resendSection: {
      textAlign: 'center',
      marginTop: '20px',
    },
    resendBtn: {
      background: 'none',
      border: 'none',
      color: '#3CFFD0',
      fontSize: '14px',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    resendDisabled: {
      color: 'rgba(255,255,255,0.4)',
      cursor: 'default',
      textDecoration: 'none',
    },
    changeEmail: {
      textAlign: 'center',
      marginTop: '16px',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
    },
    link: {
      color: '#3CFFD0',
      cursor: 'pointer',
      marginLeft: '4px',
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
    },
    footerLink: {
      color: '#3CFFD0',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar lang={lang} setLang={handleSetLang} />

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>Z</div>
          </div>

          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>

          {error && <div style={styles.error}>{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleSendCode} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>{t.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  style={styles.input}
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                style={{
                  ...styles.submitBtn,
                  ...(loading ? styles.disabledBtn : {}),
                }}
                disabled={loading}
              >
                {loading ? t.sending : t.sendCode}
              </button>
            </form>
          ) : (
            <div>
              <p style={{ ...styles.subtitle, marginBottom: '8px' }}>{t.codeSubtitle}</p>
              <p style={{ textAlign: 'center', color: '#3CFFD0', fontWeight: '500', marginBottom: '24px' }}>
                {email}
              </p>

              <div style={styles.codeContainer} onPaste={handlePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (codeInputs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{
                      ...styles.codeInput,
                      borderColor: digit ? '#3CFFD0' : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => verifyCode(code.join(''))}
                style={{
                  ...styles.submitBtn,
                  ...(loading || code.join('').length < 6 ? styles.disabledBtn : {}),
                  marginTop: '24px',
                  width: '100%',
                }}
                disabled={loading || code.join('').length < 6}
              >
                {loading ? t.verifying : t.verify}
              </button>

              <div style={styles.resendSection}>
                <button
                  onClick={handleResend}
                  style={{
                    ...styles.resendBtn,
                    ...(resendTimer > 0 ? styles.resendDisabled : {}),
                  }}
                  disabled={resendTimer > 0}
                >
                  {resendTimer > 0 ? `${t.resendIn} ${resendTimer}s` : t.resendCode}
                </button>
              </div>

              <div style={styles.changeEmail}>
                {t.wrongEmail}
                <span
                  style={styles.link}
                  onClick={() => { setStep(1); setCode(['', '', '', '', '', '']); setError(''); }}
                >
                  {t.changeEmail}
                </span>
              </div>
            </div>
          )}

          <div style={styles.footer}>
            {t.noAccount}{' '}
            <Link to="/checkout?plan=free" style={styles.footerLink}>
              {t.signUp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
