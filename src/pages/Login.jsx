import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

const CSS = `
  * { box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
  
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .shake { animation: shake 0.4s ease; }
  
  .premium-input {
    width: 100%; padding: 16px 18px; font-size: 16px; font-family: 'Inter', sans-serif; font-weight: 500;
    color: #fff; background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px; outline: none; transition: all 0.2s;
  }
  .premium-input::placeholder { color: rgba(255,255,255,0.3); }
  .premium-input:focus { border-color: #3CFFD0; box-shadow: 0 0 0 4px rgba(60,255,208,0.1); }
  
  .code-input {
    width: 52px; height: 64px; font-size: 26px; font-family: 'Inter', monospace; font-weight: 700;
    text-align: center; color: #fff; background: rgba(255,255,255,0.03);
    border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; outline: none; transition: all 0.2s;
  }
  .code-input:focus { border-color: #3CFFD0; transform: scale(1.05); box-shadow: 0 0 0 4px rgba(60,255,208,0.1); }
  .code-input.filled { border-color: #3CFFD0; background: rgba(60,255,208,0.08); }
  
  .premium-btn {
    width: 100%; padding: 18px 32px; font-size: 16px; font-family: 'Inter', sans-serif; font-weight: 600;
    color: #0a0a0f; background: linear-gradient(135deg, #3CFFD0, #00D4AA); border: none;
    border-radius: 12px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .premium-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(60,255,208,0.35); }
  .premium-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  
  .text-link { color: #3CFFD0; font-weight: 600; cursor: pointer; }
  .text-link:hover { text-decoration: underline; }
  
  .glass-card { background: rgba(12,12,20,0.85); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; }
  
  @media (max-width: 480px) { .code-input { width: 44px; height: 56px; font-size: 22px; } }
`;

const Spinner = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
    <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [shaking, setShaking] = useState(false);
  const codeRefs = useRef([]);

  useEffect(() => {
    if (localStorage.getItem('jc_user_email')) navigate('/dashboard');
  }, [navigate]);

  useEffect(() => {
    if (step === 2 && cooldown > 0) {
      const t = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown, step]);

  const showError = useCallback((msg) => {
    setError(msg); setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }, []);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const checkRes = await fetch(`${API_BASE}/auth/check-email`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const checkData = await checkRes.json();
      if (!checkRes.ok) throw new Error(checkData.detail || 'Email not found. Please sign up first.');

      const sendRes = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), full_name: 'User' }),
      });
      const sendData = await sendRes.json();
      if (!sendRes.ok) throw new Error(sendData.detail || 'Failed to send code');

      if (sendData.is_whitelisted) {
        localStorage.setItem('jc_user_email', email.toLowerCase().trim());
        navigate('/dashboard');
        return;
      }
      setCooldown(60); setStep(2);
    } catch (err) { showError(err.message); }
    finally { setLoading(false); }
  };

  const handleCodeInput = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const newCode = [...code]; newCode[i] = v; setCode(newCode);
    if (v && i < 5) codeRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (p.length === 6) { setCode(p.split('')); codeRefs.current[5]?.focus(); }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) codeRefs.current[i - 1]?.focus();
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) { showError('Please enter all 6 digits'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), code: fullCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Invalid code');
      if (data.verified) {
        localStorage.setItem('jc_user_email', email.toLowerCase().trim());
        navigate('/dashboard');
      }
    } catch (err) {
      showError(err.message);
      setCode(['', '', '', '', '', '']);
      codeRefs.current[0]?.focus();
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/resend-code`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), full_name: 'User' }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to resend');
      setCooldown(60); setCode(['', '', '', '', '', '']); setError('');
    } catch (err) { showError(err.message); }
    finally { setLoading(false); }
  };

  const maskedEmail = () => {
    const [local, domain] = email.split('@');
    return local.length > 2 ? `${local[0]}${'•'.repeat(Math.min(local.length - 2, 4))}${local.slice(-1)}@${domain}` : email;
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: '100vh', background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Inter', sans-serif", position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,255,208,0.08) 0%, transparent 70%)' }} />
        
        <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: 16, background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(60,255,208,0.3)' }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#0a0a0f' }}>Z</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#fff' }}>Job Concierge</h1>
          </div>

          <div className="glass-card fade-up" style={{ padding: '36px 32px' }}>
            {step === 1 ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>Welcome back</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Enter your email to access your dashboard</p>
                </div>
                <form onSubmit={handleSubmitEmail}>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="premium-input" required autoFocus />
                  </div>
                  {error && <div className={shaking ? 'shake' : ''} style={{ padding: '14px 16px', marginBottom: 24, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 10, color: '#FF6B6B', fontSize: 14 }}>{error}</div>}
                  <button type="submit" disabled={loading || !email.trim()} className="premium-btn">
                    {loading ? <><Spinner /> Sending code...</> : <>Continue →</>}
                  </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                  Don't have an account? <span className="text-link" onClick={() => navigate('/get-started')}>Get Started</span>
                </p>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ width: 72, height: 72, margin: '0 auto 20px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(60,255,208,0.15), rgba(60,255,208,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(60,255,208,0.2)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3CFFD0" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>Check your email</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Enter the code sent to <span style={{ color: '#3CFFD0' }}>{maskedEmail()}</span></p>
                </div>
                <form onSubmit={handleVerifyCode}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }} onPaste={handlePaste}>
                    {code.map((digit, i) => (
                      <input key={i} ref={el => codeRefs.current[i] = el} type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={(e) => handleCodeInput(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`code-input ${digit ? 'filled' : ''}`} autoFocus={i === 0} />
                    ))}
                  </div>
                  {error && <div className={shaking ? 'shake' : ''} style={{ padding: '14px 16px', marginBottom: 24, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 10, color: '#FF6B6B', fontSize: 14 }}>{error}</div>}
                  <button type="submit" disabled={loading || code.join('').length !== 6} className="premium-btn">
                    {loading ? <><Spinner /> Verifying...</> : <>Login →</>}
                  </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <p style={{ margin: '0 0 12px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                    Didn't receive it? {cooldown > 0 ? <span>Resend in <span style={{ color: '#3CFFD0' }}>{cooldown}s</span></span> : <span className="text-link" onClick={handleResend}>Resend code</span>}
                  </p>
                  <span className="text-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }} onClick={() => { setStep(1); setCode(['','','','','','']); setError(''); }}>← Use different email</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
