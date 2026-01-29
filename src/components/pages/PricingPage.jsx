/**
 * PricingPage Component v2.0
 * 
 * @description Conversion-optimized pricing page with:
 * - Clear value proposition hierarchy
 * - Trust signals and social proof
 * - Accessible plan comparison
 * - Smooth interactions
 * 
 * @version 2.0.0
 */

import React, { useState, useCallback, useMemo, memo } from 'react';
import { 
  colors, 
  typography, 
  spacing, 
  borderRadius, 
  shadows, 
  transitions,
  getPlanColors,
} from '../../styles/theme';
import { 
  PLANS, 
  CONSUMER_PLANS, 
  PRICING_FAQS, 
  TRUST_BADGES,
  SOCIAL_PROOF,
  getPrice,
} from '../../utils/constants';
import { formatNumber } from '../../utils/helpers';
import { Button, Badge, Card, Divider } from '../ui';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Billing toggle switch
 */
const BillingToggle = memo(function BillingToggle({ billingCycle, onToggle }) {
  const isAnnual = billingCycle === 'annual';
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[4],
        padding: spacing[2],
      }}
      role="radiogroup"
      aria-label="Billing frequency"
    >
      <button
        role="radio"
        aria-checked={!isAnnual}
        onClick={() => onToggle('monthly')}
        style={{
          padding: `${spacing[2]} ${spacing[4]}`,
          background: !isAnnual ? colors.text10 : 'transparent',
          border: 'none',
          borderRadius: borderRadius.lg,
          color: !isAnnual ? colors.text100 : colors.text40,
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.medium,
          cursor: 'pointer',
          transition: transitions.fast,
        }}
      >
        Monthly
      </button>
      
      <button
        role="radio"
        aria-checked={isAnnual}
        onClick={() => onToggle('annual')}
        style={{
          padding: `${spacing[2]} ${spacing[4]}`,
          background: isAnnual ? colors.mintSoft : 'transparent',
          border: isAnnual ? `1px solid ${colors.mintBorder}` : '1px solid transparent',
          borderRadius: borderRadius.lg,
          color: isAnnual ? colors.mint : colors.text40,
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.medium,
          cursor: 'pointer',
          transition: transitions.fast,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
        }}
      >
        Annual
        <span
          style={{
            padding: `${spacing[0.5]} ${spacing[2]}`,
            background: colors.mint,
            color: colors.void,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.bold,
          }}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
});

/**
 * Individual pricing card
 */
const PricingCard = memo(function PricingCard({ 
  plan, 
  billingCycle, 
  isPopular = false,
  onSelect,
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const planColors = getPlanColors(plan.id);
  const price = getPrice(plan.basePrice, billingCycle);
  const monthlyEquivalent = billingCycle === 'annual' ? price : null;
  
  return (
    <article
      style={{
        position: 'relative',
        padding: spacing[6],
        background: isHovered 
          ? `linear-gradient(180deg, ${colors.charcoal} 0%, ${colors.night} 100%)`
          : colors.charcoal,
        border: isPopular 
          ? `2px solid ${planColors.primary}` 
          : `1px solid ${colors.text10}`,
        borderRadius: borderRadius['2xl'],
        transition: transitions.smooth,
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isPopular ? `0 0 40px ${planColors.glow}` : shadows.card,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`plan-${plan.id}-title`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: `${spacing[1]} ${spacing[4]}`,
            background: `linear-gradient(135deg, ${planColors.primary}, ${colors.cyan})`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.bold,
            color: colors.void,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wider,
            boxShadow: shadows.glowMint,
          }}
        >
          Most Popular
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: spacing[4] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[1] }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>{plan.emoji}</span>
          <h3
            id={`plan-${plan.id}-title`}
            style={{
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.text100,
              margin: 0,
            }}
          >
            {plan.name}
          </h3>
        </div>
        <p
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.text50,
            margin: 0,
          }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: spacing[6] }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing[1] }}>
          <span
            style={{
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text100,
              lineHeight: 1,
            }}
          >
            ${price}
          </span>
          <span style={{ fontSize: typography.fontSize.md, color: colors.text40 }}>
            /month
          </span>
        </div>
        
        {billingCycle === 'annual' && plan.basePrice > 0 && (
          <div style={{ marginTop: spacing[1] }}>
            <span
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.text40,
                textDecoration: 'line-through',
              }}
            >
              ${plan.basePrice}/mo
            </span>
            <span
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.mint,
                marginLeft: spacing[2],
              }}
            >
              Billed ${price * 12}/year
            </span>
          </div>
        )}
        
        {/* Value message */}
        {plan.packetsPerMonth && (
          <p
            style={{
              fontSize: typography.fontSize.sm,
              color: planColors.primary,
              marginTop: spacing[2],
              fontWeight: typography.fontWeight.medium,
            }}
          >
            {formatNumber(plan.packetsPerMonth)} tailored applications/month
          </p>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant={isPopular ? 'primary' : 'secondary'}
        fullWidth
        onClick={() => onSelect(plan.id)}
        style={{
          marginBottom: spacing[6],
          ...(isPopular ? {} : { 
            borderColor: planColors.border,
            color: planColors.primary,
          }),
        }}
      >
        {plan.cta}
      </Button>

      {/* Features */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text40,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wider,
            marginBottom: spacing[3],
          }}
        >
          What's included
        </p>
        
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[2.5],
          }}
        >
          {plan.features.map((feature, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[2],
                fontSize: typography.fontSize.sm,
                color: colors.text60,
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              <span
                style={{
                  color: planColors.primary,
                  flexShrink: 0,
                  marginTop: 2,
                }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
});

/**
 * Trust badges row
 */
const TrustBadges = memo(function TrustBadges() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing[6],
        padding: `${spacing[6]} 0`,
      }}
      aria-label="Trust indicators"
    >
      {TRUST_BADGES.map((badge) => (
        <div
          key={badge.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            color: colors.text50,
            fontSize: typography.fontSize.sm,
          }}
        >
          <span style={{ fontSize: typography.fontSize.xl }}>{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
});

/**
 * Social proof stats
 */
const SocialProof = memo(function SocialProof() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing[10],
        padding: `${spacing[8]} 0`,
        borderTop: `1px solid ${colors.text10}`,
        borderBottom: `1px solid ${colors.text10}`,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.mint,
            lineHeight: 1,
          }}
        >
          {SOCIAL_PROOF.usersTotal}
        </div>
        <div style={{ fontSize: typography.fontSize.sm, color: colors.text50, marginTop: spacing[1] }}>
          Active users
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.lavender,
            lineHeight: 1,
          }}
        >
          {SOCIAL_PROOF.packetsGenerated}
        </div>
        <div style={{ fontSize: typography.fontSize.sm, color: colors.text50, marginTop: spacing[1] }}>
          Applications sent
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.gold,
            lineHeight: 1,
          }}
        >
          {SOCIAL_PROOF.interviewRate}
        </div>
        <div style={{ fontSize: typography.fontSize.sm, color: colors.text50, marginTop: spacing[1] }}>
          Interview rate
        </div>
      </div>
    </div>
  );
});

/**
 * FAQ accordion item
 */
const FAQItem = memo(function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${colors.text10}`,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: `${spacing[5]} 0`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.medium,
            color: colors.text90,
          }}
        >
          {question}
        </span>
        <span
          style={{
            fontSize: typography.fontSize.xl,
            color: colors.text40,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: transitions.fast,
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      
      {isOpen && (
        <div
          style={{
            paddingBottom: spacing[5],
            fontSize: typography.fontSize.sm,
            color: colors.text50,
            lineHeight: typography.lineHeight.relaxed,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
});

/**
 * FAQ section
 */
const FAQSection = memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: `${spacing[16]} ${spacing[6]}`,
      }}
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text100,
          textAlign: 'center',
          marginBottom: spacing[8],
        }}
      >
        Frequently Asked Questions
      </h2>

      <div>
        {PRICING_FAQS.map((faq, i) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * PricingPage - Complete pricing page with plans, FAQ, and trust signals
 * 
 * @param {Object} props
 * @param {Function} [props.onSelectPlan] - Callback when plan is selected
 * @param {string} [props.defaultBilling='monthly'] - Default billing cycle
 */
function PricingPage({
  onSelectPlan,
  defaultBilling = 'monthly',
}) {
  const [billingCycle, setBillingCycle] = useState(defaultBilling);

  const handleSelectPlan = useCallback((planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    }
  }, [onSelectPlan, billingCycle]);

  const consumerPlans = useMemo(() => {
    return CONSUMER_PLANS.map(id => PLANS[id]);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.night,
        color: colors.text100,
        fontFamily: typography.fontFamily.sans,
      }}
    >
      {/* Hero Section */}
      <header
        style={{
          textAlign: 'center',
          padding: `${spacing[16]} ${spacing[6]} ${spacing[8]}`,
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        <Badge variant="mint" icon="✨" style={{ marginBottom: spacing[4] }}>
          Simple, transparent pricing
        </Badge>
        
        <h1
          style={{
            fontSize: typography.fontSize['6xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text100,
            lineHeight: typography.lineHeight.tight,
            marginBottom: spacing[4],
            letterSpacing: typography.letterSpacing.tight,
          }}
        >
          Apply smarter,<br />
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.mint}, ${colors.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            not harder
          </span>
        </h1>
        
        <p
          style={{
            fontSize: typography.fontSize.xl,
            color: colors.text50,
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          300 tailored applications. $39/month. 
          You focus on interviews, we handle the rest.
        </p>
      </header>

      {/* Billing Toggle */}
      <div style={{ marginBottom: spacing[8] }}>
        <BillingToggle 
          billingCycle={billingCycle} 
          onToggle={setBillingCycle} 
        />
      </div>

      {/* Pricing Cards */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: spacing[6],
          maxWidth: 1000,
          margin: '0 auto',
          padding: `0 ${spacing[6]}`,
        }}
        aria-label="Pricing plans"
      >
        {consumerPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            isPopular={plan.isPopular}
            onSelect={handleSelectPlan}
          />
        ))}
      </section>

      {/* Trust Badges */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: `0 ${spacing[6]}` }}>
        <TrustBadges />
      </div>

      {/* Social Proof */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: `0 ${spacing[6]}` }}>
        <SocialProof />
      </div>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section
        style={{
          textAlign: 'center',
          padding: `${spacing[16]} ${spacing[6]}`,
          background: `linear-gradient(180deg, transparent 0%, ${colors.charcoal} 100%)`,
        }}
      >
        <h2
          style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text100,
            marginBottom: spacing[4],
          }}
        >
          Ready to land your dream job?
        </h2>
        
        <p
          style={{
            fontSize: typography.fontSize.md,
            color: colors.text50,
            marginBottom: spacing[6],
          }}
        >
          Start your free trial today. No credit card required.
        </p>
        
        <Button
          size="lg"
          onClick={() => handleSelectPlan('free')}
          rightIcon="→"
        >
          Start Free Trial
        </Button>
        
        <p
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.text40,
            marginTop: spacing[4],
          }}
        >
          5 applications/day for 7 days, completely free
        </p>
      </section>
    </div>
  );
}

export default memo(PricingPage);
