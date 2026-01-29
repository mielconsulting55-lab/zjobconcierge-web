/**
 * TelegramDemoVisual Component v2.0
 * 
 * @description Interactive phone mockup showcasing the Telegram bot flow.
 * Built with accessibility, performance, and reduced motion support.
 * 
 * Features:
 * - 6-step animated demo flow
 * - Accessible (keyboard navigation, screen reader support)
 * - Reduced motion support
 * - Memory-safe animations
 * - Responsive sizing
 * 
 * @version 2.0.0
 */

import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import { colors, shadows, transitions, borderRadius } from '../../styles/theme';
import { PACKET_DOCUMENTS } from '../../utils/constants';
import { useLiveCounter, useStepAnimation, usePrefersReducedMotion } from '../../hooks';

// ============================================================================
// CONSTANTS
// ============================================================================

const TELEGRAM_COLORS = {
  dark: '#17212B',
  bubbleIn: '#182533',
  bubbleOut: '#2B5278',
  accent: '#2AABEE',
};

const STEP_TIMINGS = [2200, 2800, 2200, 3200, 600, 3500]; // ms per step
const TOTAL_STEPS = 6;

const STEP_LABELS = [
  'User sends job posting',
  'Bot typing response',
  'Analyzing job match',
  'Generating documents',
  'Packet complete',
  'Action buttons shown',
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Confetti animation overlay
 */
const Confetti = memo(function Confetti({ isActive }) {
  const reducedMotion = usePrefersReducedMotion();
  
  if (!isActive || reducedMotion) return null;

  const confettiColors = [colors.mint, colors.lavender, colors.gold, TELEGRAM_COLORS.accent, colors.cyan, colors.rose];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: 36,
        zIndex: 100,
      }}
      aria-hidden="true"
    >
      {/* Main confetti */}
      {[...Array(50)].map((_, i) => {
        const color = confettiColors[i % confettiColors.length];
        const isCircle = i % 2 === 0;
        return (
          <div
            key={`confetti-${i}`}
            style={{
              position: 'absolute',
              left: `${(i * 2.1) % 100}%`,
              top: '-20px',
              width: 6 + (i % 4),
              height: isCircle ? 6 + (i % 4) : 3 + (i % 3),
              background: color,
              borderRadius: isCircle ? '50%' : '2px',
              boxShadow: `0 0 8px ${color}60`,
              animation: `confettiFall ${2.5 + (i % 3) * 0.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${(i % 10) * 0.08}s`,
              opacity: 0,
            }}
          />
        );
      })}
      
      {/* Sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          style={{
            position: 'absolute',
            left: `${(i * 5.2) % 100}%`,
            top: `${(i * 5.7) % 100}%`,
            width: 3,
            height: 3,
            background: colors.text100,
            borderRadius: '50%',
            boxShadow: `0 0 6px ${colors.text100}, 0 0 12px ${colors.mint}`,
            animation: `sparkle ${0.8 + (i % 5) * 0.12}s ease-out forwards`,
            animationDelay: `${0.3 + (i % 8) * 0.06}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
});

/**
 * Match score visualization bar
 */
const MatchBar = memo(function MatchBar({ score = 94 }) {
  const filled = Math.round((score / 100) * 10);
  
  return (
    <div 
      style={{ display: 'flex', gap: 3, alignItems: 'center' }}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Match score: ${score}%`}
    >
      {[...Array(10)].map((_, i) => {
        const isActive = i < filled;
        const color = i < 3 ? colors.coral : i < 6 ? colors.gold : colors.mint;
        return (
          <div
            key={i}
            style={{
              width: 16,
              height: 6,
              borderRadius: 3,
              background: isActive ? `linear-gradient(135deg, ${color}, ${color}dd)` : colors.text10,
              boxShadow: isActive ? `0 2px 8px ${color}50` : 'none',
              transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s`,
              transform: isActive ? 'scaleY(1.3)' : 'scaleY(1)',
            }}
          />
        );
      })}
    </div>
  );
});

/**
 * Document card in packet list
 */
const DocCard = memo(function DocCard({ icon, name, extension, color, delay = 0, size = '42 KB' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${color}25`,
        borderRadius: 10,
        marginBottom: 6,
        animation: `docSlide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
          animation: `shine 2s ease ${delay + 0.5}s`,
        }}
        aria-hidden="true"
      />
      
      {/* Icon */}
      <div
        style={{
          width: 32,
          height: 32,
          background: `linear-gradient(145deg, ${color}, ${color}cc)`,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          boxShadow: `0 4px 12px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: colors.text100,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 9, color: colors.text40 }}>{size}</div>
      </div>
      
      {/* Download button */}
      <div
        style={{
          width: 24,
          height: 24,
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 2px 8px ${color}40`,
          flexShrink: 0,
        }}
        aria-label={`Download ${name}`}
      >
        <span style={{ fontSize: 10 }}>↓</span>
      </div>
    </div>
  );
});

/**
 * Floating info badge
 */
const FloatingBadge = memo(function FloatingBadge({ children, position, delay = 0 }) {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        padding: '6px 12px',
        background: 'rgba(4, 4, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: borderRadius.full,
        border: `1px solid ${colors.text20}`,
        fontSize: 11,
        fontWeight: 600,
        color: colors.text80,
        whiteSpace: 'nowrap',
        animation: `fadeUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
});

/**
 * Step navigation dots
 */
const StepDots = memo(function StepDots({ currentStep, totalSteps, onStepClick, isPlaying }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        borderRadius: 30,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      role="tablist"
      aria-label="Demo steps"
    >
      {[...Array(totalSteps)].map((_, i) => {
        const isActive = currentStep === i;
        return (
          <button
            key={i}
            onClick={() => onStepClick(i)}
            style={{
              width: isActive ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: isActive 
                ? `linear-gradient(135deg, ${colors.mint}, ${colors.cyan})` 
                : 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: isActive ? `0 0 16px ${colors.mint}60` : 'none',
              border: 'none',
              padding: 0,
            }}
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${i + 1}: ${STEP_LABELS[i]}`}
            tabIndex={isActive ? 0 : -1}
          />
        );
      })}
    </div>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * TelegramDemoVisual - Interactive phone mockup showing bot flow
 * 
 * @param {Object} props
 * @param {boolean} [props.compact=false] - Use compact sizing
 * @param {boolean} [props.showControls=true] - Show navigation controls
 * @param {boolean} [props.autoPlay=true] - Auto-play animation
 * @param {string} [props.className] - Additional CSS class
 */
function TelegramDemoVisual({
  compact = false,
  showControls = true,
  autoPlay = true,
  className = '',
}) {
  // Hooks
  const reducedMotion = usePrefersReducedMotion();
  const liveUsers = useLiveCounter(127, { min: 118, max: 156, interval: 2500 });
  
  const {
    step,
    setStep,
    isPlaying,
    play,
    pause,
    reset,
  } = useStepAnimation(TOTAL_STEPS, {
    timings: STEP_TIMINGS,
    autoPlay: autoPlay && !reducedMotion,
    loop: true,
  });

  // State
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const containerRef = useRef(null);

  // Confetti trigger on step 4
  useEffect(() => {
    if (step === 4 && !reducedMotion) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [step, reducedMotion]);

  // Memoized packet data
  const packets = useMemo(() => {
    return PACKET_DOCUMENTS.slice(0, 6).map((doc, i) => ({
      ...doc,
      size: ['42 KB', '38 KB', '156 KB', '24 KB', '89 KB', '67 KB'][i],
    }));
  }, []);

  // Handlers
  const handleStepClick = useCallback((targetStep) => {
    pause();
    setStep(targetStep);
  }, [pause, setStep]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Sizing
  const phoneWidth = compact ? 300 : 340;
  const chatHeight = compact ? 360 : 420;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
      role="region"
      aria-label="Telegram bot demo"
    >
      {/* Phone Mockup */}
      <div
        style={{
          position: 'relative',
          width: phoneWidth,
          borderRadius: 44,
          background: `linear-gradient(180deg, #1a1a1f 0%, ${colors.void} 100%)`,
          padding: 12,
          boxShadow: shadows.phone,
          animation: isHovered && !reducedMotion ? 'breathe 3s ease-in-out infinite' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Confetti overlay */}
        <Confetti isActive={showConfetti} />

        {/* Floating badges */}
        <FloatingBadge position={{ top: -12, left: -50 }} delay={0.2}>
          ⚡ 12s generation
        </FloatingBadge>
        
        <FloatingBadge position={{ top: 80, right: -60 }} delay={0.4}>
          <span style={{ color: colors.mint }}>●</span> {liveUsers} online
        </FloatingBadge>
        
        <FloatingBadge position={{ bottom: 100, left: -55 }} delay={0.6}>
          🎯 94% match rate
        </FloatingBadge>

        {/* Phone hardware details */}
        <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 90, height: 25, background: colors.void, borderRadius: 20, zIndex: 20 }} aria-hidden="true">
          <div style={{ position: 'absolute', top: 8, left: 20, width: 50, height: 6, background: '#1a1a1f', borderRadius: 3 }} />
          <div style={{ position: 'absolute', top: 6, right: 14, width: 10, height: 10, background: '#1a1a1f', borderRadius: '50%' }} />
        </div>
        
        {/* Side buttons */}
        <div style={{ position: 'absolute', right: -3, top: 100, width: 3, height: 35, background: '#2a2a2f', borderRadius: '0 2px 2px 0' }} aria-hidden="true" />
        <div style={{ position: 'absolute', right: -3, top: 150, width: 3, height: 55, background: '#2a2a2f', borderRadius: '0 2px 2px 0' }} aria-hidden="true" />
        <div style={{ position: 'absolute', left: -3, top: 130, width: 3, height: 25, background: '#2a2a2f', borderRadius: '2px 0 0 2px' }} aria-hidden="true" />
        <div style={{ position: 'absolute', left: -3, top: 165, width: 3, height: 25, background: '#2a2a2f', borderRadius: '2px 0 0 2px' }} aria-hidden="true" />

        {/* Screen */}
        <div
          style={{
            borderRadius: 36,
            overflow: 'hidden',
            background: TELEGRAM_COLORS.dark,
          }}
        >
          {/* Status bar */}
          <div
            style={{
              padding: '12px 20px 6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 12,
              color: colors.text80,
              fontWeight: 500,
            }}
            aria-hidden="true"
          >
            <span>9:41</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 10 }}>5G</span>
              <div style={{ width: 18, height: 10, border: `1px solid ${colors.text60}`, borderRadius: 3, padding: 1 }}>
                <div style={{ width: '80%', height: '100%', background: colors.mint, borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Telegram header */}
          <div
            style={{
              padding: '10px 16px 12px',
              background: `linear-gradient(180deg, ${TELEGRAM_COLORS.dark} 0%, rgba(23, 33, 43, 0.95) 100%)`,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 18 }}>←</div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${TELEGRAM_COLORS.accent}, #1a8cd8)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: `0 4px 12px ${TELEGRAM_COLORS.accent}40`,
              }}
            >
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.text100 }}>Job Concierge Bot</div>
              <div style={{ fontSize: 12, color: colors.mint }}>● Online</div>
            </div>
            <div style={{ display: 'flex', gap: 16, color: colors.text60, fontSize: 18 }}>
              <span>📞</span>
              <span>⋮</span>
            </div>
          </div>

          {/* Chat area */}
          <div
            style={{
              height: chatHeight,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              background: `linear-gradient(180deg, ${TELEGRAM_COLORS.dark} 0%, #0f171e 100%)`,
            }}
          >
            {/* Step 0: User message (always visible) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 10,
                animation: step === 0 ? 'fadeUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 14px',
                  background: `linear-gradient(135deg, ${TELEGRAM_COLORS.bubbleOut} 0%, #1e3a5f 100%)`,
                  borderRadius: '18px 18px 4px 18px',
                  boxShadow: `0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <div style={{ fontSize: 13, color: colors.text90, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600 }}>Product Manager</span><br />
                  <span style={{ color: colors.text60 }}>Stripe · San Francisco</span><br />
                  <span style={{ color: colors.text60, fontSize: 11 }}>$180-220K · Remote OK</span>
                </div>
                <div style={{ fontSize: 10, color: colors.text40, textAlign: 'right', marginTop: 6 }}>
                  2:34 PM ✓✓
                </div>
              </div>
            </div>

            {/* Step 1: Typing indicator */}
            {step >= 1 && step < 2 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  animation: 'fadeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div
                  style={{
                    padding: '14px 20px',
                    background: `linear-gradient(135deg, ${TELEGRAM_COLORS.bubbleIn} 0%, #1a2836 100%)`,
                    borderRadius: '18px 18px 18px 4px',
                    display: 'flex',
                    gap: 5,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        background: colors.text40,
                        borderRadius: '50%',
                        animation: reducedMotion ? 'none' : `typingDot 1.4s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Steps 2-3: Analyzing */}
            {step >= 2 && step < 4 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  animation: step === 2 ? 'fadeUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                }}
              >
                <div
                  style={{
                    padding: '14px',
                    background: `linear-gradient(135deg, ${TELEGRAM_COLORS.bubbleIn} 0%, #1a2836 100%)`,
                    borderRadius: '18px 18px 18px 4px',
                    minWidth: 240,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: `linear-gradient(135deg, ${TELEGRAM_COLORS.accent}30, ${TELEGRAM_COLORS.accent}10)`,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                      }}
                    >
                      🔍
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.text100 }}>
                      Analyzing role...
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: colors.text60, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Match Score
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: colors.mint }}>94%</span>
                    </div>
                    <MatchBar score={94} />
                  </div>
                  
                  <div
                    style={{
                      fontSize: 11,
                      color: colors.text60,
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    <div><span style={{ color: colors.mint }}>✓</span> Skills: PM, B2B, Payments</div>
                    <div><span style={{ color: colors.mint }}>✓</span> Experience: Senior (5+ yrs)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Generating progress */}
            {step === 3 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  animation: 'fadeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div
                  style={{
                    padding: '14px',
                    background: `linear-gradient(135deg, ${TELEGRAM_COLORS.bubbleIn} 0%, #1a2836 100%)`,
                    borderRadius: '18px 18px 18px 4px',
                    minWidth: 220,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: `linear-gradient(135deg, ${colors.mint}30, ${colors.mint}10)`,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        animation: reducedMotion ? 'none' : 'pulse 1.5s ease-in-out infinite',
                      }}
                    >
                      📦
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.text100 }}>
                      Generating packet...
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div
                    style={{
                      height: 6,
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      marginBottom: 10,
                    }}
                    role="progressbar"
                    aria-label="Generating documents"
                  >
                    <div
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${colors.mint}, ${colors.lavender}, ${TELEGRAM_COLORS.accent}, ${colors.mint})`,
                        backgroundSize: '300% 100%',
                        animation: reducedMotion ? 'none' : 'shimmer 2s linear infinite',
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  
                  <div style={{ fontSize: 11, color: colors.text60 }}>
                    Creating 6 documents...<br />
                    <span style={{ color: colors.text40, fontStyle: 'italic' }}>~30 seconds remaining</span>
                  </div>
                </div>
              </div>
            )}

            {/* Steps 4-5: Complete */}
            {step >= 4 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  animation: step === 4 ? 'fadeUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                }}
              >
                <div
                  style={{
                    padding: '12px',
                    background: `linear-gradient(135deg, ${TELEGRAM_COLORS.bubbleIn} 0%, #1a2836 100%)`,
                    borderRadius: '18px 18px 18px 4px',
                    width: '94%',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 30px ${colors.mint}08`,
                  }}
                >
                  {/* Success header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 12,
                      padding: '10px 12px',
                      background: `linear-gradient(135deg, ${colors.mint}18, ${colors.mint}08)`,
                      borderRadius: 12,
                      border: `1px solid ${colors.mint}25`,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: `linear-gradient(135deg, ${colors.mint}, ${colors.cyan})`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 700,
                        color: colors.void,
                        boxShadow: `0 4px 20px ${colors.mint}60`,
                      }}
                    >
                      ✓
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: colors.mint }}>Packet Ready!</div>
                      <div style={{ fontSize: 11, color: colors.text60 }}>Product Manager @ Stripe</div>
                    </div>
                  </div>

                  {/* Documents list */}
                  <div
                    style={{
                      fontSize: 10,
                      color: colors.text40,
                      marginBottom: 8,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    📎 6 Documents
                  </div>
                  
                  {packets.map((doc, i) => (
                    <DocCard key={doc.id || i} {...doc} delay={i * 0.08} />
                  ))}

                  {/* ATS score */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: `linear-gradient(135deg, ${colors.lavender}12, ${colors.lavender}06)`,
                      borderRadius: 10,
                      marginTop: 10,
                      border: `1px solid ${colors.lavender}20`,
                    }}
                  >
                    <span style={{ fontSize: 12, color: colors.text80 }}>🎯 ATS Optimized</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: colors.lavender }}>87%</span>
                  </div>
                  
                  <div style={{ fontSize: 10, color: colors.text40, marginTop: 10 }}>2:35 PM</div>
                </div>
              </div>
            )}

            {/* Step 5: Action buttons */}
            {step >= 5 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  animation: 'fadeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <button
                  style={{
                    padding: '14px',
                    background: `linear-gradient(135deg, ${TELEGRAM_COLORS.accent}, #1a8cd8)`,
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: `0 4px 20px ${TELEGRAM_COLORS.accent}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  📥 Download All (6 files)
                </button>
                
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      fontSize: 12,
                      color: colors.text80,
                      textAlign: 'center',
                      fontWeight: 500,
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    📋 Another Job
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      fontSize: 12,
                      color: colors.text80,
                      textAlign: 'center',
                      fontWeight: 500,
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    🏠 Menu
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: '10px 12px',
              background: `linear-gradient(180deg, ${TELEGRAM_COLORS.dark} 0%, #141c24 100%)`,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 20, color: colors.text40 }}>📎</span>
            <div
              style={{
                flex: 1,
                padding: '12px 16px',
                background: '#242f3d',
                borderRadius: 22,
                fontSize: 13,
                color: colors.text40,
              }}
            >
              Paste description or screenshot...
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                background: `linear-gradient(135deg, ${TELEGRAM_COLORS.accent}, #1a8cd8)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 16px ${TELEGRAM_COLORS.accent}50`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            marginTop: 8,
          }}
        >
          <StepDots
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            onStepClick={handleStepClick}
            isPlaying={isPlaying}
          />
          
          <button
            onClick={handlePlayPause}
            style={{
              padding: '12px 32px',
              background: isPlaying 
                ? 'rgba(255,255,255,0.06)' 
                : `linear-gradient(135deg, ${colors.mint}, ${colors.cyan})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isPlaying ? 'rgba(255,255,255,0.1)' : colors.mint}`,
              borderRadius: 30,
              fontSize: 13,
              fontWeight: 600,
              color: isPlaying ? colors.text80 : colors.void,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: isPlaying ? 'none' : `0 4px 20px ${colors.mint}40`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
          >
            <span style={{ fontSize: 14 }}>{isPlaying ? '⏸' : '▶'}</span>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}

      {/* Screen reader description */}
      <div
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
        }}
        aria-live="polite"
      >
        {`Step ${step + 1} of ${TOTAL_STEPS}: ${STEP_LABELS[step]}`}
      </div>
    </div>
  );
}

export default memo(TelegramDemoVisual);
