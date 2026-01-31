import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

// Plan configurations
const PLANS = {
  trial: { name: 'Free Trial', price: 0, jobs: 3, duration: '7 days' },
  basic: { name: 'Basic', price: 19, jobs: 5, duration: 'month' },
  pro: { name: 'Pro', price: 39, jobs: 15, duration: 'month' },
  vip: { name: 'VIP', price: 69, jobs: 30, duration: 'month' },
  enterprise: { name: 'Enterprise', price: 149, jobs: 100, duration: 'month' },
};

export default function JobConciergeCheckoutFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get plan from URL
  const planFromUrl = searchParams.get('plan') || 'trial';
  const plan = PLANS[planFromUrl] || PLANS.trial;
  
  // Steps: 1=email, 2=verify code, 3=payment, 4=success
  const [step, setStep] = useState(1);
  
  // Form data
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  // Refs for code inputs
  const codeInputRefs = useRef([]);
  
  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // First check if email is valid/whitelisted
      const checkResponse = await fetch(`${API_BASE}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      
      const checkData = await checkResponse.json();
      
      if (!checkResponse.ok) {
        throw new Error(checkData.detail || 'Failed to check email');
      }
      
      if (checkData.is_blocked) {
        setError(checkData.message || 'Please use a valid email address');
        setLoading(false);
        return;
      }
      
      // If whitelisted, skip verification entirely
      if (checkData.is_whitelisted) {
        setIsWhitelisted(true);
        setLoading(false);
        // Skip to payment (step 3) or success (step 4) for free trial
        if (planFromUrl === 'trial' || plan.price === 0) {
          setStep(4); // Success
        } else {
          setStep(3); // Payment
        }
        return;
      }
      
      // Send verification code
      const sendResponse = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          full_name: fullName.trim() || 'Friend'
        }),
      });
      
      const sendData = await sendResponse.json();
      
      if (!sendResponse.ok) {
        throw new Error(sendData.detail || 'Failed to send verification code');
      }
      
      setCodeSent(true);
      setResendCooldown(60); // 60 second cooldown
      setStep(2); // Go to code verification step
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle code input change
  const handleCodeChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle code paste
  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setVerificationCode(pastedData.split(''));
      codeInputRefs.current[5]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle code verification
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          code: code
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Invalid verification code');
      }
      
      if (data.verified) {
        // Success! Move to next step
        if (planFromUrl === 'trial' || plan.price === 0) {
          setStep(4); // Success for free trial
        } else {
          setStep(3); // Payment for paid plans
        }
      }
      
    } catch (err) {
      setError(err.message || 'Failed to verify code');
      // Clear the code inputs
      setVerificationCode(['', '', '', '', '', '']);
      codeInputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          full_name: fullName.trim() || 'Friend'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to resend code');
      }
      
      setResendCooldown(60);
      setVerificationCode(['', '', '', '', '', '']);
      
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = planFromUrl === 'trial' || plan.price === 0
      ? ['Email', 'Verify', 'Done']
      : ['Email', 'Verify', 'Payment', 'Done'];
    
    return (
      <div className="flex justify-center mb-8">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          
          return (
            <div key={label} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${isCompleted ? 'bg-[#3CFFD0] text-[#04040A]' : ''}
                ${isActive ? 'bg-[#3CFFD0] text-[#04040A]' : ''}
                ${!isActive && !isCompleted ? 'bg-[#1a1a2e] text-gray-400 border border-gray-600' : ''}
              `}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={`ml-2 text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-3 ${isCompleted ? 'bg-[#3CFFD0]' : 'bg-gray-600'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Step 1: Email Input
  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-[#0E0E14] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#3CFFD0] focus:outline-none transition-colors"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-[#0E0E14] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#3CFFD0] focus:outline-none transition-colors"
          required
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading || !email || !fullName}
        className="w-full py-4 bg-gradient-to-r from-[#3CFFD0] to-[#2DD4BF] text-[#04040A] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Continue →'
        )}
      </button>
    </form>
  );

  // Step 2: Code Verification
  const renderVerifyStep = () => (
    <form onSubmit={handleVerifyCode} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#3CFFD0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#3CFFD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Check your email</h3>
        <p className="text-gray-400 text-sm">
          We sent a 6-digit code to<br />
          <span className="text-[#3CFFD0] font-medium">{email}</span>
        </p>
      </div>
      
      {/* 6-digit code input */}
      <div className="flex justify-center gap-3" onPaste={handleCodePaste}>
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (codeInputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-bold bg-[#0E0E14] border-2 border-gray-700 rounded-xl text-white focus:border-[#3CFFD0] focus:outline-none transition-colors"
            autoFocus={index === 0}
          />
        ))}
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading || verificationCode.join('').length !== 6}
        className="w-full py-4 bg-gradient-to-r from-[#3CFFD0] to-[#2DD4BF] text-[#04040A] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </span>
        ) : (
          'Verify Code →'
        )}
      </button>
      
      {/* Resend code */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Didn't receive the code?{' '}
          {resendCooldown > 0 ? (
            <span className="text-gray-500">Resend in {resendCooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="text-[#3CFFD0] hover:underline font-medium"
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
      
      {/* Change email */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setVerificationCode(['', '', '', '', '', '']);
            setError('');
          }}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Use different email
        </button>
      </div>
    </form>
  );

  // Step 3: Payment (for paid plans)
  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#3CFFD0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#3CFFD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Complete Payment</h3>
        <p className="text-gray-400 text-sm">
          {plan.name} Plan - ${plan.price}/{plan.duration}
        </p>
      </div>
      
      {/* Payment form placeholder - integrate with Stripe */}
      <div className="p-6 bg-[#0E0E14] border border-gray-700 rounded-xl">
        <p className="text-gray-400 text-center text-sm">
          Payment integration coming soon.<br />
          For now, contact us to activate your plan.
        </p>
      </div>
      
      <button
        onClick={() => setStep(4)}
        className="w-full py-4 bg-gradient-to-r from-[#3CFFD0] to-[#2DD4BF] text-[#04040A] font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Complete Setup →
      </button>
    </div>
  );

  // Step 4: Success
  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-[#3CFFD0]/10 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-[#3CFFD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">You're all set! 🎉</h3>
        <p className="text-gray-400">
          Welcome to Job Concierge, {fullName.split(' ')[0] || 'friend'}!
        </p>
      </div>
      
      <div className="p-6 bg-[#0E0E14] border border-[#3CFFD0]/30 rounded-xl text-left space-y-4">
        <h4 className="font-semibold text-white">Next Steps:</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="w-6 h-6 bg-[#3CFFD0]/20 rounded-full flex items-center justify-center text-[#3CFFD0] text-sm font-bold mr-3 mt-0.5">1</span>
            <div>
              <p className="text-white font-medium">Forward job alerts to:</p>
              <p className="text-[#3CFFD0] font-mono">mielconsulting55@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="w-6 h-6 bg-[#3CFFD0]/20 rounded-full flex items-center justify-center text-[#3CFFD0] text-sm font-bold mr-3 mt-0.5">2</span>
            <div>
              <p className="text-white font-medium">We process jobs daily at 6 AM CT</p>
              <p className="text-gray-400 text-sm">Your tailored packets will be ready each morning</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="w-6 h-6 bg-[#3CFFD0]/20 rounded-full flex items-center justify-center text-[#3CFFD0] text-sm font-bold mr-3 mt-0.5">3</span>
            <div>
              <p className="text-white font-medium">Check your email for packets</p>
              <p className="text-gray-400 text-sm">Resume, cover letter & interview prep included</p>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="w-full py-4 bg-gradient-to-r from-[#3CFFD0] to-[#2DD4BF] text-[#04040A] font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Go to Dashboard →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#04040A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#3CFFD0] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-[#04040A]">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Job Concierge</h1>
          {step < 4 && (
            <p className="text-gray-400 mt-1">
              {plan.name} Plan {plan.price > 0 && `- $${plan.price}/${plan.duration}`}
            </p>
          )}
        </div>
        
        {/* Step indicator */}
        {renderStepIndicator()}
        
        {/* Card */}
        <div className="bg-[#0a0a12] border border-gray-800 rounded-2xl p-8">
          {step === 1 && renderEmailStep()}
          {step === 2 && renderVerifyStep()}
          {step === 3 && renderPaymentStep()}
          {step === 4 && renderSuccessStep()}
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
