import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Svg4QFOOs9awr9GzOuNuIMbEFyiqh8xMCpjxoEl4WGCCEuc58OzG1gzOYr4WkO9gJrOpXIiE4ZcDVxxEjmpY5bB005i2IPOWS';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PLANS = {
  trial: { name: 'Free Trial', price: 19, jobs: 3, period: 'mo', trialDays: 7 },
  free: { name: 'Free Trial', price: 19, jobs: 3, period: 'mo', trialDays: 7 },
  basic: { name: 'Basic', price: 19, jobs: 5, period: 'mo', trialDays: 0 },
  pro: { name: 'Pro', price: 39, jobs: 15, period: 'mo', trialDays: 0 },
  vip: { name: 'VIP', price: 69, jobs: 30, period: 'mo', trialDays: 0 },
  enterprise: { name: 'Enterprise', price: 149, jobs: 100, period: 'mo', trialDays: 0 },
};

const CSS = `
  * { box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
  @keyframes successPop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
  @keyframes checkDraw { to { stroke-dashoffset: 0; } }
  
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .scale-in { animation: scaleIn 0.5s ease forwards; }
  .shake { animation: shake 0.4s ease; }
  .success-pop { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  
  .premium-input {
    width: 100%; padding: 16px 18px; font-size: 16px; font-family: 'Inter', sans-serif; font-weight: 500;
    color: #fff; background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
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
  
  .step-dot, .step-line { transition: all 0.3s; }
  .glass-card { background: rgba(12,12,20,0.85); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; }
  
  .check-circle { stroke-dasharray: 166; stroke-dashoffset: 166; animation: checkDraw 0.6s ease 0.2s forwards; }
  .check-mark { stroke-dasharray: 48; stroke-dashoffset: 48; animation: checkDraw 0.3s ease 0.6s forwards; }
  
  /* Stripe Card Element Styling */
  .stripe-card-container {
    padding: 16px 18px;
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .stripe-card-container:hover {
    border-color: rgba(255,255,255,0.2);
  }
  .stripe-card-container.focused {
    border-color: #3CFFD0;
    box-shadow: 0 0 0 4px rgba(60,255,208,0.1);
  }
  .stripe-card-container.error {
    border-color: #FF6B6B;
  }
  
  @media (max-width: 480px) { .code-input { width: 44px; height: 56px; font-size: 22px; } }
`;

// Stripe Card Element options
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: '500',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.3)',
      },
    },
    invalid: {
      color: '#FF6B6B',
      iconColor: '#FF6B6B',
    },
  },
  hidePostalCode: true,
};

// Components
const Spinner = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
    <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z" />
  </svg>
);

const SuccessCheck = () => (
  <svg width="80" height="80" viewBox="0 0 52 52">
    <circle className="check-circle" cx="26" cy="26" r="25" fill="none" stroke="#3CFFD0" strokeWidth="2" />
    <path className="check-mark" fill="none" stroke="#3CFFD0" strokeWidth="3" strokeLinecap="round" d="M14 27l7 7 16-16" />
  </svg>
);

const StepIndicator = ({ step, isTrial }) => {
  const steps = ['Account', 'Verify', 'Payment', 'Complete'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isDone = step > num;
        return (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="step-dot" style={{
                width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600,
                background: isDone || isActive ? 'linear-gradient(135deg, #3CFFD0, #00D4AA)' : 'rgba(255,255,255,0.05)',
                color: isDone || isActive ? '#0a0a0f' : 'rgba(255,255,255,0.3)',
                border: isDone || isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: isActive ? '0 0 20px rgba(60,255,208,0.4)' : 'none',
              }}>{isDone ? '✓' : num}</div>
              <span style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="step-line" style={{ width: 60, height: 2, margin: '0 12px 24px', borderRadius: 1, background: isDone ? 'linear-gradient(90deg, #3CFFD0, rgba(60,255,208,0.3))' : 'rgba(255,255,255,0.08)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Payment Form Component (uses Stripe hooks)
const PaymentForm = ({ email, name, plan, customerId, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardFocused, setCardFocused] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Create SetupIntent
      const setupRes = await fetch(`${API_BASE}/stripe/create-setup-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId }),
      });
      
      if (!setupRes.ok) {
        const data = await setupRes.json();
        throw new Error(data.detail || 'Failed to initialize payment');
      }
      
      const { client_secret } = await setupRes.json();

      // 2. Confirm card setup
      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // 3. Start trial with saved payment method
      const trialRes = await fetch(`${API_BASE}/stripe/start-trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          customer_id: customerId,
          payment_method_id: setupIntent.payment_method,
          plan: plan,
        }),
      });

      if (!trialRes.ok) {
        const data = await trialRes.json();
        throw new Error(data.detail || 'Failed to start trial');
      }

      const trialData = await trialRes.json();
      onSuccess(trialData);

    } catch (err) {
      setError(err.message);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError('');
    }
  };

  const planConfig = PLANS[plan] || PLANS.trial;
  const isTrial = planConfig.trialDays > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Card Details
        </label>
        <div 
          className={`stripe-card-container ${cardFocused ? 'focused' : ''} ${cardError ? 'error' : ''}`}
        >
          <CardElement 
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
            onFocus={() => setCardFocused(true)}
            onBlur={() => setCardFocused(false)}
          />
        </div>
        {cardError && (
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#FF6B6B' }}>{cardError}</p>
        )}
      </div>

      {/* Trial Notice */}
      {isTrial && (
        <div style={{ 
          padding: 16, 
          marginBottom: 24, 
          borderRadius: 12, 
          background: 'rgba(60,255,208,0.08)', 
          border: '1px solid rgba(60,255,208,0.2)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3CFFD0" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                You won't be charged today
              </p>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                Your 7-day free trial starts now. After the trial, you'll be billed ${planConfig.price}/month. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '14px 16px', marginBottom: 24, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 10, color: '#FF6B6B', fontSize: 14 }}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading || !stripe} 
        className="premium-btn"
      >
        {loading ? (
          <><Spinner /> Processing...</>
        ) : isTrial ? (
          <>Start Free Trial →</>
        ) : (
          <>Subscribe - ${planConfig.price}/mo →</>
        )}
      </button>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        🔒 Secured by Stripe. Your card details are encrypted.
      </p>
    </form>
  );
};

// Main Checkout Component
function CheckoutFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planKey = searchParams.get('plan') || 'trial';
  const plan = PLANS[planKey] || PLANS.trial;
  const isTrial = plan.trialDays > 0;

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [shaking, setShaking] = useState(false);
  const codeRefs = useRef([]);

  // Check if already logged in
  useEffect(() => {
    if (localStorage.getItem('jc_user_email')) navigate('/dashboard');
  }, [navigate]);

  // Cooldown timer
  useEffect(() => {
    if (step === 2 && cooldown > 0) {
      const t = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown, step]);

  const showError = useCallback((msg) => {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }, []);

  const goToDashboard = useCallback(() => {
    localStorage.setItem('jc_user_email', email.toLowerCase().trim());
    navigate('/dashboard');
  }, [email, navigate]);

  // Step 1: Submit email
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
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
        setLoading(false);
        return;
      }

      // Check if already used trial
      if (checkData.has_used_trial) {
        showError('This email has already used a trial. Please choose a paid plan.');
        setLoading(false);
        return;
      }

      // Send verification code
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

  // Code input handlers
  const handleCodeInput = useCallback((i, v) => {
    if (!/^\d?$/.test(v)) return;
    setCode(prev => {
      const newCode = [...prev];
      newCode[i] = v;
      return newCode;
    });
    if (v && i < 5) {
      codeRefs.current[i + 1]?.focus();
    }
  }, []);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (p.length === 6) {
      setCode(p.split(''));
      codeRefs.current[5]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback((i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      codeRefs.current[i - 1]?.focus();
    }
  }, [code]);

  // Step 2: Verify code
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
        // Create Stripe customer
        const customerRes = await fetch(`${API_BASE}/stripe/create-customer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase().trim(), name: name.trim() }),
        });
        
        if (!customerRes.ok) {
          const customerData = await customerRes.json();
          throw new Error(customerData.detail || 'Failed to create account');
        }
        
        const customerData = await customerRes.json();
        setCustomerId(customerData.customer_id);
        setStep(3); // Go to payment
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
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to resend');
      setCooldown(60);
      setCode(['', '', '', '', '', '']);
      setError('');
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const maskedEmail = () => {
    if (!email.includes('@')) return email;
    const [local, domain] = email.split('@');
    return local.length > 2 ? `${local[0]}${'•'.repeat(Math.min(local.length - 2, 4))}${local.slice(-1)}@${domain}` : email;
  };

  const handleBackToEmail = () => {
    setStep(1);
    setCode(['', '', '', '', '', '']);
    setError('');
  };

  const handlePaymentSuccess = () => {
    setStep(4);
  };

  const handlePaymentError = (msg) => {
    // Error is handled in PaymentForm
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: '100vh', background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Inter', sans-serif", position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,255,208,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: 16, background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(60,255,208,0.3)' }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#0a0a0f' }}>Z</span>
            </div>
            <h1 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, color: '#fff' }}>Job Concierge</h1>
            {step < 4 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: 12, padding: '6px 14px', borderRadius: 20, background: 'rgba(60,255,208,0.1)', border: '1px solid rgba(60,255,208,0.2)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3CFFD0' }}>
                  {isTrial ? '7-Day Free Trial' : `${plan.name} • $${plan.price}/${plan.period}`}
                </span>
              </div>
            )}
          </div>

          <StepIndicator step={step} isTrial={isTrial} />

          <div className="glass-card" style={{ padding: '36px 32px' }}>
            {/* Step 1: Email */}
            {step === 1 && (
              <div className="fade-up">
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>Create your account</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Start automating your job applications</p>
                </div>
                <form onSubmit={handleSubmitEmail}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="premium-input" required autoComplete="name" />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="premium-input" required autoComplete="email" />
                  </div>
                  {error && (
                    <div className={shaking ? 'shake' : ''} style={{ padding: '14px 16px', marginBottom: 24, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 10, color: '#FF6B6B', fontSize: 14 }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" disabled={loading || !name.trim() || !email.trim()} className="premium-btn">
                    {loading ? <><Spinner /> Sending code...</> : <>Continue →</>}
                  </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                  Already have an account? <span className="text-link" onClick={() => navigate('/login')}>Sign in</span>
                </p>
              </div>
            )}

            {/* Step 2: Code */}
            {step === 2 && (
              <div className="fade-up">
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
                        className={`code-input ${digit ? 'filled' : ''}`} autoFocus={i === 0} autoComplete="off" />
                    ))}
                  </div>
                  {error && (
                    <div className={shaking ? 'shake' : ''} style={{ padding: '14px 16px', marginBottom: 24, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 10, color: '#FF6B6B', fontSize: 14 }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" disabled={loading || code.join('').length !== 6} className="premium-btn">
                    {loading ? <><Spinner /> Verifying...</> : <>Verify →</>}
                  </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <p style={{ margin: '0 0 12px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                    Didn't receive it? {cooldown > 0 ? <span>Resend in <span style={{ color: '#3CFFD0' }}>{cooldown}s</span></span> : <span className="text-link" onClick={handleResend}>Resend code</span>}
                  </p>
                  <span className="text-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }} onClick={handleBackToEmail}>← Change email</span>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="fade-up">
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ width: 72, height: 72, margin: '0 auto 20px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(60,255,208,0.15), rgba(60,255,208,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(60,255,208,0.2)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3CFFD0" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                  <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#fff' }}>
                    {isTrial ? 'Start your free trial' : 'Complete payment'}
                  </h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
                    {isTrial ? 'Add a card to start your 7-day trial' : `${plan.name} • $${plan.price}/${plan.period}`}
                  </p>
                </div>
                
                <PaymentForm
                  email={email}
                  name={name}
                  plan={planKey}
                  customerId={customerId}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="scale-in" style={{ textAlign: 'center' }}>
                <div className="success-pop" style={{ marginBottom: 24 }}><SuccessCheck /></div>
                <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, color: '#fff' }}>You're all set!</h2>
                <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Welcome aboard, {name.split(' ')[0] || 'friend'} 🎉</p>
                
                {isTrial && (
                  <div style={{ padding: 16, marginBottom: 24, borderRadius: 12, background: 'rgba(60,255,208,0.08)', border: '1px solid rgba(60,255,208,0.2)', textAlign: 'left' }}>
                    <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                      ✓ Your 7-day free trial has started<br/>
                      ✓ You'll be charged ${plan.price}/mo after the trial<br/>
                      ✓ Cancel anytime from your dashboard
                    </p>
                  </div>
                )}
                
                <div style={{ padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, rgba(60,255,208,0.08), rgba(60,255,208,0.02))', border: '1px solid rgba(60,255,208,0.15)', textAlign: 'left', marginBottom: 28 }}>
                  <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#fff' }}>🚀 Quick Start</h3>
                  <p style={{ margin: '0 0 8px', fontSize: 14, color: '#fff' }}>Forward job alerts to:</p>
                  <p style={{ margin: 0, padding: '8px 12px', borderRadius: 8, background: 'rgba(60,255,208,0.1)', color: '#3CFFD0', fontSize: 14, fontFamily: 'monospace', display: 'inline-block' }}>admin@zjobconcierge.com</p>
                </div>
                
                <button onClick={goToDashboard} className="premium-btn">Go to Dashboard →</button>
              </div>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>🔒 Secure & encrypted</p>
        </div>
      </div>
    </>
  );
}

// Wrap with Stripe Elements provider
export default function JobConciergeCheckoutFlow() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFlow />
    </Elements>
  );
}
