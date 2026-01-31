import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

const PLANS = {
  trial: { name: 'Free Trial', price: 0, jobs: 3, period: '7 days' },
  basic: { name: 'Basic', price: 19, jobs: 5, period: 'mo' },
  pro: { name: 'Pro', price: 39, jobs: 15, period: 'mo' },
  vip: { name: 'VIP', price: 69, jobs: 30, period: 'mo' },
  enterprise: { name: 'Enterprise', price: 149, jobs: 100, period: 'mo' },
};

/* ============================================================================
   STYLES - Premium Design System
   ============================================================================ */
const CSS = `
  * { box-sizing: border-box; }
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  /* Base Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
  
  @keyframes successPop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes checkDraw {
    to { stroke-dashoffset: 0; }
  }
  
  /* Utility Classes */
  .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .slide-down { animation: slideDown 0.3s ease forwards; }
  .shake { animation: shake 0.4s ease; }
  .success-pop { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  
  /* Input Styles */
  .premium-input {
    width: 100%;
    padding: 16px 18px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: #fff;
    background: rgba(255, 255, 255, 0.03);
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    outline: none;
    transition: all 0.2s ease;
  }
  
  .premium-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-weight: 400;
  }
  
  .premium-input:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
  }
  
  .premium-input:focus {
    border-color: #3CFFD0;
    background: rgba(60, 255, 208, 0.03);
    box-shadow: 0 0 0 4px rgba(60, 255, 208, 0.1);
  }
  
  /* Code Input */
  .code-input {
    width: 54px;
    height: 68px;
    font-size: 28px;
    font-family: 'Inter', monospace;
    font-weight: 700;
    text-align: center;
    color: #fff;
    background: rgba(255, 255, 255, 0.03);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    outline: none;
    transition: all 0.2s ease;
    caret-color: #3CFFD0;
  }
  
  .code-input:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .code-input:focus {
    border-color: #3CFFD0;
    background: rgba(60, 255, 208, 0.05);
    box-shadow: 0 0 0 4px rgba(60, 255, 208, 0.1);
    transform: scale(1.05);
  }
  
  .code-input.filled {
    border-color: #3CFFD0;
    background: rgba(60, 255, 208, 0.08);
  }
  
  /* Button Styles */
  .premium-btn {
    position: relative;
    width: 100%;
    padding: 18px 32px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: #0a0a0f;
    background: linear-gradient(135deg, #3CFFD0 0%, #00D4AA 100%);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .premium-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(60, 255, 208, 0.35);
  }
  
  .premium-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .premium-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
  
  .premium-btn .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }
  
  /* Link Styles */
  .text-link {
    color: #3CFFD0;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    text-decoration: none;
  }
  
  .text-link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  /* Step Indicator */
  .step-dot {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .step-line {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Card */
  .glass-card {
    background: rgba(12, 12, 20, 0.85);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 20px 50px -20px rgba(0, 0, 0, 0.5),
      0 0 100px -50px rgba(60, 255, 208, 0.15);
  }
  
  /* Success Check Animation */
  .check-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: checkDraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
  }
  
  .check-mark {
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: checkDraw 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .code-input {
      width: 46px;
      height: 58px;
      font-size: 24px;
      border-radius: 10px;
    }
  }
`;

/* ============================================================================
   COMPONENTS
   ============================================================================ */

// Inject global styles
const GlobalStyles = () => <style dangerouslySetInnerHTML={{ __html: CSS }} />;

// Animated success checkmark
const SuccessCheck = () => (
  <svg width="80" height="80" viewBox="0 0 52 52">
    <circle
      className="check-circle"
      cx="26" cy="26" r="25"
      fill="none"
      stroke="#3CFFD0"
      strokeWidth="2"
    />
    <path
      className="check-mark"
      fill="none"
      stroke="#3CFFD0"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 27l7 7 16-16"
    />
  </svg>
);

// Loading spinner
const Spinner = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ animation: 'spin 0.8s linear infinite' }}
  >
    <circle
      cx="12" cy="12" r="10"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      opacity="0.2"
    />
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z"
    />
  </svg>
);

// Arrow icon
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */
export default function JobConciergeCheckoutFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const planKey = searchParams.get('plan') || 'trial';
  const plan = PLANS[planKey] || PLANS.trial;
  const isFree = plan.price === 0;
  
  // State
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [shaking, setShaking] = useState(false);
  
  const codeRefs = useRef([]);
  const totalSteps = isFree ? 3 : 4;
  
  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);
  
  // Show error with shake
  const showError = useCallback((msg) => {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }, []);
  
  // Handle step 1: Submit email
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setError('');
    setLoading(true);
    
    try {
      // Check email
      const checkRes = await fetch(`${API_BASE}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const checkData = await checkRes.json();
      
      if (!checkRes.ok) throw new Error(checkData.detail || 'Invalid email');
      if (checkData.is_blocked) {
        showError('Please use a valid email address');
        return;
      }
      
      // Whitelisted = skip verification
      if (checkData.is_whitelisted) {
        setStep(isFree ? 3 : 4); // Go to success
        return;
      }
      
      // Send code
      const sendRes = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), full_name: name.trim() }),
      });
      const sendData = await sendRes.json();
      
      if (!sendRes.ok) throw new Error(sendData.detail || 'Failed to send code');
      
      setCooldown(60);
      setStep(2);
      
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle code input
  const handleCodeInput = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-advance
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      codeRefs.current[5]?.focus();
    }
  };
  
  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      showError('Please enter all 6 digits');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), code: fullCode }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || 'Invalid code');
      
      if (data.verified) {
        setStep(isFree ? 3 : 3); // Payment or success
      }
      
    } catch (err) {
      showError(err.message);
      setCode(['', '', '', '', '', '']);
      codeRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };
  
  // Resend code
  const handleResend = async () => {
    if (cooldown > 0) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), full_name: name.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to resend');
      }
      setCooldown(60);
      setCode(['', '', '', '', '', '']);
      setError('');
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Masked email
  const maskedEmail = () => {
    if (!email.includes('@')) return email;
    const [local, domain] = email.split('@');
    const masked = local.length > 2 
      ? `${local[0]}${'•'.repeat(Math.min(local.length - 2, 4))}${local.slice(-1)}`
      : local;
    return `${masked}@${domain}`;
  };

  /* ==========================================================================
     RENDER: Step Indicator
     ========================================================================== */
  const StepIndicator = () => {
    const steps = isFree 
      ? ['Account', 'Verify', 'Complete']
      : ['Account', 'Verify', 'Payment', 'Complete'];
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
        {steps.map((label, i) => {
          const num = i + 1;
          const isActive = step === num;
          const isDone = step > num;
          
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className="step-dot"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    background: isDone
                      ? 'linear-gradient(135deg, #3CFFD0, #00D4AA)'
                      : isActive
                      ? 'linear-gradient(135deg, #3CFFD0, #00D4AA)'
                      : 'rgba(255,255,255,0.05)',
                    color: isDone || isActive ? '#0a0a0f' : 'rgba(255,255,255,0.3)',
                    border: isDone || isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isActive ? '0 0 20px rgba(60, 255, 208, 0.4)' : 'none',
                  }}
                >
                  {isDone ? '✓' : num}
                </div>
                <span style={{
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>
                  {label}
                </span>
              </div>
              
              {i < steps.length - 1 && (
                <div
                  className="step-line"
                  style={{
                    width: 60,
                    height: 2,
                    margin: '0 12px 24px',
                    borderRadius: 1,
                    background: isDone
                      ? 'linear-gradient(90deg, #3CFFD0, rgba(60,255,208,0.3))'
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  /* ==========================================================================
     RENDER: Error Message
     ========================================================================== */
  const ErrorMessage = () => error ? (
    <div
      className={shaking ? 'shake' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        marginBottom: 24,
        background: 'rgba(255, 59, 48, 0.08)',
        border: '1px solid rgba(255, 59, 48, 0.2)',
        borderRadius: 10,
        color: '#FF6B6B',
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {error}
    </div>
  ) : null;

  /* ==========================================================================
     RENDER: Step 1 - Email
     ========================================================================== */
  const Step1 = () => (
    <div className="fade-up">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>
          Create your account
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          Start automating your job applications
        </p>
      </div>
      
      <form onSubmit={handleSubmitEmail}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="premium-input"
            required
            autoFocus
          />
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="premium-input"
            required
          />
        </div>
        
        <ErrorMessage />
        
        <button
          type="submit"
          disabled={loading || !name.trim() || !email.trim()}
          className="premium-btn"
        >
          <span className="btn-content">
            {loading ? <><Spinner /> Sending code...</> : <>Continue <ArrowIcon /></>}
          </span>
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
        We'll send a 6-digit verification code to your email
      </p>
    </div>
  );

  /* ==========================================================================
     RENDER: Step 2 - Verify Code
     ========================================================================== */
  const Step2 = () => (
    <div className="fade-up">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          width: 72,
          height: 72,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(60,255,208,0.15), rgba(60,255,208,0.05))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(60,255,208,0.2)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3CFFD0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        
        <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>
          Check your email
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          Enter the code sent to <span style={{ color: '#3CFFD0', fontWeight: 500 }}>{maskedEmail()}</span>
        </p>
      </div>
      
      <form onSubmit={handleVerifyCode}>
        <div 
          style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }}
          onPaste={handlePaste}
        >
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => codeRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`code-input ${digit ? 'filled' : ''}`}
              autoFocus={i === 0}
            />
          ))}
        </div>
        
        <ErrorMessage />
        
        <button
          type="submit"
          disabled={loading || code.join('').length !== 6}
          className="premium-btn"
        >
          <span className="btn-content">
            {loading ? <><Spinner /> Verifying...</> : <>Verify <ArrowIcon /></>}
          </span>
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          Didn't receive it?{' '}
          {cooldown > 0 ? (
            <span>Resend in <span style={{ color: '#3CFFD0' }}>{cooldown}s</span></span>
          ) : (
            <span className="text-link" onClick={handleResend}>Resend code</span>
          )}
        </p>
        <span 
          className="text-link" 
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}
          onClick={() => { setStep(1); setCode(['','','','','','']); setError(''); }}
        >
          ← Use different email
        </span>
      </div>
    </div>
  );

  /* ==========================================================================
     RENDER: Step 3 - Payment (for paid plans)
     ========================================================================== */
  const Step3Payment = () => (
    <div className="fade-up">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 72,
          height: 72,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(60,255,208,0.15), rgba(60,255,208,0.05))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(60,255,208,0.2)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3CFFD0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        </div>
        
        <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>
          Complete payment
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          {plan.name} • <span style={{ color: '#fff', fontWeight: 600 }}>${plan.price}</span>/{plan.period}
        </p>
      </div>
      
      <div style={{
        padding: 32,
        marginBottom: 24,
        borderRadius: 12,
        border: '1px dashed rgba(60,255,208,0.3)',
        background: 'rgba(60,255,208,0.03)',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6 }}>
          Payment integration coming soon.<br/>
          <span style={{ fontSize: 13, opacity: 0.7 }}>Contact us to activate manually.</span>
        </p>
      </div>
      
      <button onClick={() => setStep(4)} className="premium-btn">
        <span className="btn-content">Complete Setup <ArrowIcon /></span>
      </button>
    </div>
  );

  /* ==========================================================================
     RENDER: Success
     ========================================================================== */
  const StepSuccess = () => (
    <div className="scale-in" style={{ textAlign: 'center' }}>
      <div className="success-pop" style={{ marginBottom: 24 }}>
        <SuccessCheck />
      </div>
      
      <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, color: '#fff' }}>
        You're all set!
      </h2>
      <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
        Welcome aboard, {name.split(' ')[0] || 'friend'} 🎉
      </p>
      
      <div style={{
        padding: 28,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(60,255,208,0.08), rgba(60,255,208,0.02))',
        border: '1px solid rgba(60,255,208,0.15)',
        textAlign: 'left',
      }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600, color: '#fff' }}>
          🚀 Quick Start Guide
        </h3>
        
        {[
          { num: 1, title: 'Forward job alerts to:', sub: 'admin@zjobconcierge.com', highlight: true },
          { num: 2, title: 'We process daily at 6 AM CT', sub: 'Your packets will be ready each morning' },
          { num: 3, title: 'Check your inbox', sub: 'Resume, cover letter & interview prep included' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', marginBottom: i < 2 ? 18 : 0 }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(60,255,208,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3CFFD0',
              fontSize: 12,
              fontWeight: 700,
              marginRight: 14,
              flexShrink: 0,
            }}>
              {item.num}
            </div>
            <div>
              <p style={{ margin: '0 0 4px', color: '#fff', fontWeight: 500, fontSize: 14 }}>
                {item.title}
              </p>
              <p style={{
                margin: 0,
                fontSize: 13,
                color: item.highlight ? '#3CFFD0' : 'rgba(255,255,255,0.5)',
                fontFamily: item.highlight ? 'monospace' : 'inherit',
                background: item.highlight ? 'rgba(60,255,208,0.1)' : 'none',
                padding: item.highlight ? '6px 10px' : 0,
                borderRadius: 6,
                display: item.highlight ? 'inline-block' : 'block',
              }}>
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => navigate('/')} className="premium-btn" style={{ marginTop: 28 }}>
        <span className="btn-content">Go to Dashboard <ArrowIcon /></span>
      </button>
    </div>
  );

  /* ==========================================================================
     MAIN RENDER
     ========================================================================== */
  return (
    <>
      <GlobalStyles />
      
      <div style={{
        minHeight: '100vh',
        background: '#08080f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background gradients */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(60,255,208,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        
        <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 60,
              height: 60,
              margin: '0 auto 16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(60,255,208,0.3)',
            }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#0a0a0f' }}>Z</span>
            </div>
            <h1 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>
              Job Concierge
            </h1>
            {step < (isFree ? 3 : 4) && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: 12,
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(60,255,208,0.1)',
                border: '1px solid rgba(60,255,208,0.2)',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3CFFD0' }}>
                  {plan.name} {plan.price > 0 && `• $${plan.price}/${plan.period}`}
                </span>
              </div>
            )}
          </div>
          
          <StepIndicator />
          
          {/* Card */}
          <div className="glass-card" style={{ borderRadius: 20, padding: '36px 32px' }}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && !isFree && <Step3Payment />}
            {((step === 3 && isFree) || step === 4) && <StepSuccess />}
          </div>
          
          {/* Footer */}
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            🔒 Secure & encrypted • <span style={{ cursor: 'pointer' }}>Terms</span> • <span style={{ cursor: 'pointer' }}>Privacy</span>
          </p>
        </div>
      </div>
    </>
  );
}
