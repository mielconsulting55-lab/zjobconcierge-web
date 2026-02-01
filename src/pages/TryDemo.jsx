// TryDemo.jsx - Elite Try Demo Page with Premium Telegram Demo
// Converted from Framer - World-class conversion page
// Place in: src/pages/TryDemo.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Colors
const c = {
  void: '#04040A',
  night: '#08080E',
  charcoal: '#0E0E14',
  slate: '#16161E',
  mint: '#3CFFD0',
  mintGlow: 'rgba(60, 255, 208, 0.6)',
  mintSoft: 'rgba(60, 255, 208, 0.1)',
  mintBorder: 'rgba(60, 255, 208, 0.3)',
  lavender: '#A78BFA',
  lavenderSoft: 'rgba(167, 139, 250, 0.1)',
  coral: '#FF6B6B',
  cyan: '#22D3EE',
  telegramBlue: '#2AABEE',
  text100: '#FFFFFF',
  text80: 'rgba(255, 255, 255, 0.85)',
  text60: 'rgba(255, 255, 255, 0.6)',
  text40: 'rgba(255, 255, 255, 0.4)',
  text20: 'rgba(255, 255, 255, 0.12)',
  text10: 'rgba(255, 255, 255, 0.06)',
};

// ==================== TELEGRAM DEMO VISUAL ====================
const TelegramDemoVisual = ({ compact = false, showControls = true }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [liveUsers, setLiveUsers] = useState(127);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;
    const timings = [2200, 2800, 2200, 3200, 600, 3500];
    const timer = setTimeout(() => {
      const nextStep = (step + 1) % 6;
      setStep(nextStep);
      if (nextStep === 4) setShowConfetti(true);
    }, timings[step]);
    return () => clearTimeout(timer);
  }, [step, isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => Math.max(118, Math.min(156, prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 2)))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const packets = [
    { icon: '📄', name: 'Resume_Stripe_PM.docx', size: '42 KB', color: '#4A9FFF' },
    { icon: '✉️', name: 'CoverLetter.docx', size: '14 KB', color: '#8B5CF6' },
    { icon: '🎯', name: 'InterviewPrep.pdf', size: '186 KB', color: c.mint },
    { icon: '🙏', name: 'ThankYouEmail.docx', size: '8 KB', color: c.lavender },
    { icon: '🎴', name: 'Flashcards.pdf', size: '94 KB', color: '#FFD93D' },
    { icon: '🏢', name: 'CompanyOverview.pdf', size: '128 KB', color: c.coral },
  ];

  const phoneWidth = compact ? 300 : 340;
  const chatHeight = compact ? 360 : 420;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <style>{`
        @keyframes floatV4 { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-6px) rotate(0.5deg); } 75% { transform: translateY(-3px) rotate(-0.5deg); } }
        @keyframes pulseV4 { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.15); } }
        @keyframes shimmerV4 { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeUpV4 { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes docSlideV4 { from { opacity: 0; transform: translateX(-16px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes typingDotV4 { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }
        @keyframes confettiFallV4 { 0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; } 10% { opacity: 1; transform: translateY(20px) rotate(45deg) scale(1); } 100% { transform: translateY(500px) rotate(720deg) scale(0.5); opacity: 0; } }
      `}</style>

      {/* Floating badges */}
      <div style={{ position: 'absolute', top: -10, left: -45, padding: '10px 16px', background: 'linear-gradient(135deg, rgba(10,10,15,0.9), rgba(20,20,25,0.85))', backdropFilter: 'blur(20px)', borderRadius: 16, border: `1px solid ${c.mintBorder}`, animation: 'floatV4 4s ease-in-out infinite', zIndex: 20, boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${c.mintSoft}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>⚡</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: c.mint }}>12s generation</span>
      </div>

      <div style={{ position: 'absolute', top: 50, right: -50, padding: '10px 16px', background: 'linear-gradient(135deg, rgba(10,10,15,0.9), rgba(20,20,25,0.85))', backdropFilter: 'blur(20px)', borderRadius: 16, border: `1px solid ${c.lavenderSoft}`, animation: 'floatV4 5s ease-in-out infinite 0.5s', zIndex: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80', animation: 'pulseV4 2s ease-in-out infinite' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: c.text80 }}><strong style={{ color: c.lavender }}>{liveUsers}</strong> online</span>
      </div>

      <div style={{ position: 'absolute', bottom: showControls ? 100 : 30, right: -35, padding: '12px 18px', background: `linear-gradient(135deg, ${c.mintSoft}, ${c.lavenderSoft})`, backdropFilter: 'blur(20px)', borderRadius: 18, border: `1px solid ${c.mintBorder}`, animation: 'floatV4 4.5s ease-in-out infinite 1s', zIndex: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, background: `linear-gradient(135deg, ${c.mint}, ${c.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>94%</div>
        <div style={{ fontSize: 10, color: c.text40, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>match rate</div>
      </div>

      {/* Phone mockup */}
      <div style={{ width: phoneWidth, background: `linear-gradient(145deg, #2a2a32 0%, #1a1a1f 50%, #151518 100%)`, borderRadius: 48, padding: 10, boxShadow: '0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)', position: 'relative' }}>
        {/* Side buttons */}
        <div style={{ position: 'absolute', left: -2, top: 100, width: 3, height: 30, background: 'linear-gradient(180deg, #3a3a42, #252528)', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -2, top: 150, width: 3, height: 50, background: 'linear-gradient(180deg, #3a3a42, #252528)', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', right: -2, top: 120, width: 3, height: 60, background: 'linear-gradient(180deg, #3a3a42, #252528)', borderRadius: '0 2px 2px 0' }} />

        <div style={{ background: '#0d0d0f', borderRadius: 40, overflow: 'hidden', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)', position: 'relative' }}>
          {/* Confetti */}
          {showConfetti && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 36, zIndex: 100 }}>
              {[...Array(30)].map((_, i) => {
                const colors = [c.mint, c.lavender, '#FFD93D', c.telegramBlue, c.cyan];
                return (
                  <div key={i} style={{
                    position: 'absolute', left: `${Math.random() * 100}%`, top: '-20px',
                    width: Math.random() * 8 + 4, height: Math.random() * 8 + 4,
                    background: colors[Math.floor(Math.random() * colors.length)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animation: `confettiFallV4 ${2.5 + Math.random() * 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                    animationDelay: `${Math.random() * 0.8}s`, opacity: 0,
                  }} />
                );
              })}
            </div>
          )}

          {/* Status bar */}
          <div style={{ padding: '10px 24px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e2c3a' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: c.text80 }}>9:41</span>
            <div style={{ width: 90, height: 28, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, background: 'radial-gradient(circle, #1a1a2e 0%, #0a0a12 100%)', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill={c.text80}><rect x="0" y="9" width="3" height="5" rx="1" /><rect x="5" y="6" width="3" height="8" rx="1" /><rect x="10" y="3" width="3" height="11" rx="1" /><rect x="15" y="0" width="3" height="14" rx="1" /></svg>
              <div style={{ width: 24, height: 12, border: `1.5px solid ${c.text60}`, borderRadius: 4, padding: 2 }}><div style={{ width: '80%', height: '100%', background: c.mint, borderRadius: 2 }} /></div>
            </div>
          </div>

          {/* Telegram header */}
          <div style={{ padding: '12px 14px', background: 'linear-gradient(180deg, #1e2c3a 0%, #17212b 100%)', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke={c.telegramBlue} strokeWidth="2.5" strokeLinecap="round"><path d="M10 2L2 10L10 18" /></svg>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${c.telegramBlue}, #1e88e5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${c.telegramBlue}50`, position: 'relative' }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: c.mint, borderRadius: '50%', border: '2px solid #17212b' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: c.text100 }}>Job Concierge</div>
              <div style={{ fontSize: 12, color: c.mint, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, background: c.mint, borderRadius: '50%', animation: 'pulseV4 2s ease-in-out infinite' }} />online
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div style={{ height: chatHeight, padding: 12, overflowY: 'auto', background: 'linear-gradient(180deg, #0e1621 0%, #0a1219 100%)' }}>
            {/* User Message */}
            {step >= 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, animation: step === 0 ? 'fadeUpV4 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none' }}>
                <div style={{ maxWidth: '82%', padding: '12px 14px', background: 'linear-gradient(135deg, #2b5278 0%, #234060 100%)', borderRadius: '18px 18px 4px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: 14, color: c.text100, fontWeight: 500 }}>Product Manager at Stripe</div>
                  <div style={{ fontSize: 11, color: c.text60, marginTop: 4 }}>San Francisco • $180-220K</div>
                  <div style={{ fontSize: 10, color: c.text40, textAlign: 'right', marginTop: 6 }}>2:34 PM ✓✓</div>
                </div>
              </div>
            )}

            {/* Typing */}
            {step === 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10, animation: 'fadeUpV4 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg, #182533 0%, #1a2836 100%)', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, background: c.text40, borderRadius: '50%', animation: `typingDotV4 1.4s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}

            {/* Analyzing */}
            {step >= 2 && step < 4 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10, animation: step === 2 ? 'fadeUpV4 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none' }}>
                <div style={{ padding: 14, background: 'linear-gradient(135deg, #182533 0%, #1a2836 100%)', borderRadius: '18px 18px 18px 4px', minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${c.telegramBlue}30, ${c.telegramBlue}10)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔍</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text100 }}>Analyzing role...</span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: c.text60, textTransform: 'uppercase' }}>Match Score</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: c.mint }}>94%</span>
                    </div>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {[...Array(10)].map((_, i) => <div key={i} style={{ width: 16, height: 6, borderRadius: 3, background: i < 9 ? (i < 3 ? c.coral : i < 6 ? '#FFD93D' : c.mint) : c.text10 }} />)}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: c.text60, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, lineHeight: 1.6 }}>
                    <div><span style={{ color: c.mint }}>✓</span> Skills: PM, B2B, Payments</div>
                    <div><span style={{ color: c.mint }}>✓</span> Experience: Senior (5+ yrs)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Generating */}
            {step === 3 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10, animation: 'fadeUpV4 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div style={{ padding: 14, background: 'linear-gradient(135deg, #182533 0%, #1a2836 100%)', borderRadius: '18px 18px 18px 4px', minWidth: 220 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${c.mint}30, ${c.mint}10)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, animation: 'pulseV4 1.5s ease-in-out infinite' }}>📦</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text100 }}>Generating packet...</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ height: '100%', background: `linear-gradient(90deg, ${c.mint}, ${c.lavender}, ${c.telegramBlue}, ${c.mint})`, backgroundSize: '300% 100%', animation: 'shimmerV4 2s linear infinite', borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 11, color: c.text60 }}>Creating 6 documents...<br /><span style={{ color: c.text40, fontStyle: 'italic' }}>~30 seconds remaining</span></div>
                </div>
              </div>
            )}

            {/* Packet Ready */}
            {step >= 4 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10, animation: step === 4 ? 'fadeUpV4 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none' }}>
                <div style={{ padding: 12, background: 'linear-gradient(135deg, #182533 0%, #1a2836 100%)', borderRadius: '18px 18px 18px 4px', width: '94%', boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 30px ${c.mint}08` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '10px 12px', background: `linear-gradient(135deg, ${c.mint}18, ${c.mint}08)`, borderRadius: 12, border: `1px solid ${c.mint}25` }}>
                    <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${c.mint}, ${c.cyan})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: c.void, boxShadow: `0 4px 20px ${c.mint}60` }}>✓</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: c.mint }}>Packet Ready!</div>
                      <div style={{ fontSize: 11, color: c.text60 }}>Product Manager @ Stripe</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: c.text40, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>📎 6 Documents</div>
                  {packets.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: `linear-gradient(135deg, ${p.color}12 0%, ${p.color}06 100%)`, border: `1px solid ${p.color}25`, borderRadius: 10, marginBottom: 6, animation: `docSlideV4 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s both` }}>
                      <div style={{ width: 32, height: 32, background: `linear-gradient(145deg, ${p.color}, ${p.color}cc)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{p.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: c.text100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                        <div style={{ fontSize: 9, color: c.text40 }}>{p.size}</div>
                      </div>
                      <div style={{ width: 24, height: 24, background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: `linear-gradient(135deg, ${c.lavender}12, ${c.lavender}06)`, borderRadius: 10, marginTop: 10, border: `1px solid ${c.lavender}20` }}>
                    <span style={{ fontSize: 12, color: c.text80 }}>🎯 ATS Optimized</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: c.lavender }}>87%</span>
                  </div>
                  <div style={{ fontSize: 10, color: c.text40, marginTop: 10 }}>2:35 PM</div>
                </div>
              </div>
            )}

            {/* Download buttons */}
            {step >= 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, animation: 'fadeUpV4 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div style={{ padding: 14, background: `linear-gradient(135deg, ${c.telegramBlue}, #1a8cd8)`, borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#fff', textAlign: 'center', boxShadow: `0 4px 20px ${c.telegramBlue}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>📥 Download All (6 files)</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ flex: 1, padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, color: c.text80, textAlign: 'center', fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)' }}>📋 Another Job</div>
                  <div style={{ flex: 1, padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, color: c.text80, textAlign: 'center', fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)' }}>🏠 Menu</div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div style={{ padding: '10px 12px', background: 'linear-gradient(180deg, #17212b 0%, #141c24 100%)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 20, color: c.text40 }}>📎</div>
            <div style={{ flex: 1, padding: '12px 16px', background: '#242f3d', borderRadius: 22, fontSize: 13, color: c.text40 }}>Paste description or screenshot...</div>
            <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${c.telegramBlue}, #1a8cd8)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${c.telegramBlue}50` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', borderRadius: 30, border: '1px solid rgba(255,255,255,0.08)' }}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} onClick={() => { setStep(i); setIsAnimating(false); }} style={{ width: step === i ? 28 : 10, height: 10, borderRadius: 5, background: step === i ? `linear-gradient(135deg, ${c.mint}, ${c.cyan})` : 'rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: step === i ? `0 0 16px ${c.mint}60` : 'none' }} />
            ))}
          </div>
          <button onClick={() => setIsAnimating(!isAnimating)} style={{ padding: '12px 32px', background: isAnimating ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${c.mint}, ${c.cyan})`, backdropFilter: 'blur(20px)', border: `1px solid ${isAnimating ? 'rgba(255,255,255,0.1)' : c.mint}`, borderRadius: 30, fontSize: 13, fontWeight: 600, color: isAnimating ? c.text80 : c.void, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>{isAnimating ? '⏸' : '▶'}</span>
            {isAnimating ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const TryDemo = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [packetsToday, setPacketsToday] = useState(4847);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = 'Paste any job. Get hired faster.';

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const counter = setInterval(() => {
      setPacketsToday(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(counter);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Enter a valid email');
      return;
    }
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Store email
      localStorage.setItem('jc_demo_email', email);
    }, 1500);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: c.void, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", color: c.text80, overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at 20% 20%, ${c.mintSoft} 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${c.lavenderSoft} 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(42, 171, 238, 0.03) 0%, transparent 60%)`, pointerEvents: 'none' }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 100, padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 44, height: 44, background: c.mint, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, color: c.void, boxShadow: `0 0 30px ${c.mintGlow}` }}>Z</div>
          <span style={{ fontSize: 20, fontWeight: 600, color: c.text100, letterSpacing: '-0.02em' }}>JobConcierge</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999 }}>
            <div style={{ width: 8, height: 8, background: c.mint, borderRadius: '50%', boxShadow: `0 0 10px ${c.mint}`, animation: 'pulseNav 2s infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: c.mint }}>{packetsToday.toLocaleString()} packets today</span>
          </div>
          <Link to="/checkout?plan=free" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '12px 24px', background: 'transparent', border: `1px solid ${c.text20}`, borderRadius: 10, fontSize: 14, fontWeight: 500, color: c.text60 }}>Full Access →</div>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 60, alignItems: 'center', maxWidth: 1300, margin: '0 auto' }}>
        <div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', background: `linear-gradient(135deg, ${c.mintSoft}, ${c.lavenderSoft})`, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, marginBottom: 28 }}>
            <span style={{ fontSize: 16 }}>⚡</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: c.text100 }}>3-Day Free Trial</span>
            <span style={{ width: 1, height: 16, background: c.text20 }} />
            <span style={{ fontSize: 14, color: c.text40 }}>No credit card</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 56, fontWeight: 700, color: c.text100, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
            <span style={{ color: c.mint }}>{typedText}</span>
            <span style={{ opacity: showCursor ? 1 : 0, color: c.mint, marginLeft: 2 }}>|</span>
          </h1>

          <p style={{ fontSize: 18, color: c.text40, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Enter your email. Open Telegram. Paste any job URL. Get a tailored resume, cover letter, and interview prep in seconds.
          </p>

          {/* Form */}
          {!isSuccess ? (
            <div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, background: c.charcoal, border: `2px solid ${email ? c.mintBorder : c.text20}`, borderRadius: 16, padding: 6, transition: 'all 0.3s ease', boxShadow: email ? `0 0 30px ${c.mintSoft}` : 'none' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ flex: 1, padding: '18px 22px', background: 'transparent', border: 'none', fontSize: 16, color: c.text100, outline: 'none' }}
                />
                <button type="submit" disabled={isSubmitting} style={{ padding: '18px 36px', background: `linear-gradient(135deg, ${c.mint}, #2DD4BF)`, border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, color: c.void, cursor: isSubmitting ? 'wait' : 'pointer', boxShadow: `0 0 30px ${c.mintGlow}`, opacity: isSubmitting ? 0.8 : 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {isSubmitting ? 'Sending...' : <>Launch Trial <span style={{ fontSize: 18 }}>🚀</span></>}
                </button>
              </form>
              {error && <p style={{ color: c.coral, fontSize: 13, marginTop: 10, marginLeft: 4 }}>{error}</p>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 24 }}>
                {[{ icon: '🔒', text: 'Encrypted' }, { icon: '⚡', text: 'Instant access' }, { icon: '🚫', text: 'No spam ever' }].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{ fontSize: 13, color: c.text40 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: 32, background: `linear-gradient(135deg, ${c.mintSoft}, rgba(42, 171, 238, 0.1))`, border: `2px solid ${c.mintBorder}`, borderRadius: 20 }}>
              <div style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${c.mint}, ${c.telegramBlue})`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20, boxShadow: `0 0 40px ${c.mintGlow}` }}>✓</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: c.text100, marginBottom: 10 }}>Check your inbox! 📬</h3>
              <p style={{ fontSize: 15, color: c.text60, lineHeight: 1.6, marginBottom: 20 }}>We sent your Telegram activation link to<br /><strong style={{ color: c.mint }}>{email}</strong></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, background: c.telegramBlue, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✈️</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text100 }}>Next step:</div>
                  <div style={{ fontSize: 12, color: c.text40 }}>Click the link → Open Telegram → Start pasting jobs!</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, background: `radial-gradient(circle, ${c.mintSoft} 0%, transparent 60%)`, pointerEvents: 'none' }} />
          <TelegramDemoVisual compact={false} showControls={true} />
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 48px', background: c.night }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: c.text100, marginBottom: 12 }}>Everything you need. <span style={{ color: c.mint }}>Zero friction.</span></h2>
            <p style={{ fontSize: 16, color: c.text40 }}>Your 3-day trial includes full access to the AI job matching system</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {[
              { icon: '⚡', label: '5 packets/day', highlight: true },
              { icon: '📅', label: '3 days free', highlight: false },
              { icon: '🤖', label: 'AI analysis', highlight: false },
              { icon: '📄', label: 'Resume optional', highlight: false },
              { icon: '💳', label: 'No card needed', highlight: false },
              { icon: '🔐', label: 'One-click start', highlight: true },
            ].map((item, i) => (
              <div key={i} style={{ padding: 24, background: item.highlight ? `linear-gradient(135deg, ${c.mintSoft}, transparent)` : c.charcoal, border: `1px solid ${item.highlight ? c.mintBorder : c.text10}`, borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.highlight ? c.mint : c.text80 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: c.text100 }}>3 steps. 30 seconds.</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
            {[
              { num: '1', icon: '✉️', title: 'Enter email', desc: "That's literally it" },
              { num: '2', icon: '📱', title: 'Open Telegram', desc: 'Click link in your inbox' },
              { num: '3', icon: '🚀', title: 'Paste & generate', desc: 'Any job → full packet' },
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, position: 'relative', textAlign: 'center' }}>
                {i < 2 && <div style={{ position: 'absolute', top: 40, left: '60%', width: '80%', height: 2, background: `linear-gradient(90deg, ${c.mintBorder}, transparent)` }} />}
                <div style={{ width: 80, height: 80, margin: '0 auto 20px', background: `linear-gradient(135deg, ${c.mintSoft}, ${c.lavenderSoft})`, border: `2px solid ${c.mintBorder}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, position: 'relative', zIndex: 2 }}>{step.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Step {step.num}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: c.text100, marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: c.text40 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 48px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 56, background: `linear-gradient(135deg, ${c.mintSoft}, ${c.lavenderSoft})`, border: `2px solid ${c.mintBorder}`, borderRadius: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: `radial-gradient(circle, ${c.mintSoft} 0%, transparent 70%)` }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 40, fontWeight: 700, color: c.text100, marginBottom: 16, letterSpacing: '-0.02em' }}>Your next job is waiting.</h2>
            <p style={{ fontSize: 18, color: c.text40, marginBottom: 36 }}>Start your free trial now — no credit card, no commitment.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ padding: '18px 40px', background: `linear-gradient(135deg, ${c.mint}, #2DD4BF)`, border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 700, color: c.void, cursor: 'pointer', boxShadow: `0 0 40px ${c.mintGlow}`, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Start Free Trial <span style={{ fontSize: 20 }}>🚀</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, padding: '24px 48px', borderTop: `1px solid ${c.text10}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: c.text40 }}>© 2025 JobConcierge</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ fontSize: 13, color: c.text40, cursor: 'pointer' }}>Privacy</span>
          <span style={{ fontSize: 13, color: c.text40, cursor: 'pointer' }}>Terms</span>
        </div>
      </footer>

      <style>{`@keyframes pulseNav { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
};

export default TryDemo;
