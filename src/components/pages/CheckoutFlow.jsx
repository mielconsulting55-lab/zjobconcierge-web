/**
 * CheckoutFlow Component v2.0
 * 
 * @description Anxiety-reducing checkout experience with:
 * - Clear value reinforcement
 * - Trust signals throughout
 * - Real-time validation
 * - Accessible form controls
 * - Smooth error handling
 * 
 * @version 2.0.0
 */

import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react';
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
  TRUST_BADGES,
  getPrice,
} from '../../utils/constants';
import {
  formatCardNumber,
  formatExpiry,
  formatCVC,
  validateCheckoutForm,
  getCardType,
  hasErrors,
} from '../../utils/helpers';
import { useForm } from '../../hooks';
import { Button, Input, Badge, Spinner, Divider, VisuallyHidden } from '../ui';

// ============================================================================
// CONSTANTS
// ============================================================================

const CARD_ICONS = {
  visa: '💳',
  mastercard: '💳',
  amex: '💳',
  discover: '💳',
  unknown: '💳',
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Order summary sidebar
 */
const OrderSummary = memo(function OrderSummary({ plan, billingCycle }) {
  const planColors = getPlanColors(plan.id);
  const price = getPrice(plan.basePrice, billingCycle);
  const isAnnual = billingCycle === 'annual';
  const monthlyPrice = isAnnual ? plan.basePrice : price;
  const annualSavings = isAnnual ? (plan.basePrice - price) * 12 : 0;

  return (
    <aside
      style={{
        padding: spacing[6],
        background: colors.charcoal,
        borderRadius: borderRadius['2xl'],
        border: `1px solid ${colors.text10}`,
      }}
      aria-labelledby="order-summary-title"
    >
      <h2
        id="order-summary-title"
        style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text100,
          marginBottom: spacing[4],
        }}
      >
        Order Summary
      </h2>

      {/* Plan details */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          padding: spacing[4],
          background: planColors.soft,
          borderRadius: borderRadius.lg,
          border: `1px solid ${planColors.border}`,
          marginBottom: spacing[4],
        }}
      >
        <span style={{ fontSize: typography.fontSize['2xl'] }}>{plan.emoji}</span>
        <div>
          <div
            style={{
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text100,
            }}
          >
            {plan.name}
          </div>
          <div style={{ fontSize: typography.fontSize.sm, color: colors.text50 }}>
            {plan.packetsPerMonth} applications/month
          </div>
        </div>
      </div>

      <Divider />

      {/* Price breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: colors.text50, fontSize: typography.fontSize.sm }}>
            {isAnnual ? 'Monthly (billed annually)' : 'Monthly'}
          </span>
          <span style={{ color: colors.text80, fontSize: typography.fontSize.sm }}>
            ${price}/mo
          </span>
        </div>

        {isAnnual && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.text50, fontSize: typography.fontSize.sm }}>
                Regular price
              </span>
              <span
                style={{
                  color: colors.text40,
                  fontSize: typography.fontSize.sm,
                  textDecoration: 'line-through',
                }}
              >
                ${plan.basePrice}/mo
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.mint, fontSize: typography.fontSize.sm }}>
                Annual savings
              </span>
              <span style={{ color: colors.mint, fontSize: typography.fontSize.sm }}>
                -${annualSavings}/year
              </span>
            </div>
          </>
        )}

        <Divider style={{ margin: `${spacing[2]} 0` }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span
            style={{
              color: colors.text100,
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            {isAnnual ? 'Total today' : 'Monthly total'}
          </span>
          <span
            style={{
              color: colors.text100,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            ${isAnnual ? price * 12 : price}
          </span>
        </div>
      </div>

      {/* What you get */}
      <div style={{ marginTop: spacing[6] }}>
        <p
          style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text40,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wider,
            marginBottom: spacing[2],
          }}
        >
          What you get
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[2],
          }}
        >
          {plan.features.slice(0, 4).map((feature, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                fontSize: typography.fontSize.sm,
                color: colors.text60,
              }}
            >
              <span style={{ color: colors.mint }} aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});

/**
 * Trust signals strip
 */
const TrustStrip = memo(function TrustStrip() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing[6],
        padding: spacing[4],
        background: colors.text10,
        borderRadius: borderRadius.lg,
        marginTop: spacing[6],
      }}
    >
      {TRUST_BADGES.slice(0, 3).map((badge) => (
        <div
          key={badge.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1.5],
            fontSize: typography.fontSize.sm,
            color: colors.text50,
          }}
        >
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
});

/**
 * Payment form
 */
const PaymentForm = memo(function PaymentForm({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  onSubmit,
  planName,
}) {
  const cardType = getCardType(values.cardNumber);
  const formRef = useRef(null);

  // Focus first error on submit
  useEffect(() => {
    if (hasErrors(errors) && touched.cardNumber) {
      const firstErrorField = Object.keys(errors)[0];
      const input = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
      input?.focus();
    }
  }, [errors, touched]);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Payment information"
    >
      {/* Card number */}
      <div style={{ marginBottom: spacing[4] }}>
        <label
          htmlFor="cardNumber"
          style={{
            display: 'block',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.text60,
            marginBottom: spacing[2],
          }}
        >
          Card number
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={values.cardNumber}
            onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
            onBlur={() => handleBlur('cardNumber')}
            aria-invalid={!!errors.cardNumber}
            aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
            style={{
              width: '100%',
              padding: `${spacing[3.5]} ${spacing[4]}`,
              paddingRight: spacing[12],
              background: colors.slate,
              border: `1px solid ${errors.cardNumber ? colors.coral : colors.text20}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.md,
              fontFamily: typography.fontFamily.mono,
              color: colors.text100,
              outline: 'none',
              transition: transitions.fast,
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: spacing[4],
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: typography.fontSize.xl,
            }}
            aria-hidden="true"
          >
            {CARD_ICONS[cardType]}
          </span>
        </div>
        {errors.cardNumber && (
          <p
            id="cardNumber-error"
            style={{
              fontSize: typography.fontSize.sm,
              color: colors.coral,
              marginTop: spacing[1.5],
            }}
            role="alert"
          >
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Expiry and CVC row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing[4],
          marginBottom: spacing[4],
        }}
      >
        <div>
          <label
            htmlFor="expiry"
            style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.text60,
              marginBottom: spacing[2],
            }}
          >
            Expiry date
          </label>
          <input
            id="expiry"
            name="expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={values.expiry}
            onChange={(e) => handleChange('expiry', formatExpiry(e.target.value))}
            onBlur={() => handleBlur('expiry')}
            aria-invalid={!!errors.expiry}
            style={{
              width: '100%',
              padding: `${spacing[3.5]} ${spacing[4]}`,
              background: colors.slate,
              border: `1px solid ${errors.expiry ? colors.coral : colors.text20}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.md,
              fontFamily: typography.fontFamily.mono,
              color: colors.text100,
              outline: 'none',
              transition: transitions.fast,
            }}
          />
          {errors.expiry && (
            <p style={{ fontSize: typography.fontSize.sm, color: colors.coral, marginTop: spacing[1.5] }} role="alert">
              {errors.expiry}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cvc"
            style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.text60,
              marginBottom: spacing[2],
            }}
          >
            CVC
          </label>
          <input
            id="cvc"
            name="cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={cardType === 'amex' ? '1234' : '123'}
            value={values.cvc}
            onChange={(e) => handleChange('cvc', formatCVC(e.target.value))}
            onBlur={() => handleBlur('cvc')}
            aria-invalid={!!errors.cvc}
            style={{
              width: '100%',
              padding: `${spacing[3.5]} ${spacing[4]}`,
              background: colors.slate,
              border: `1px solid ${errors.cvc ? colors.coral : colors.text20}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.md,
              fontFamily: typography.fontFamily.mono,
              color: colors.text100,
              outline: 'none',
              transition: transitions.fast,
            }}
          />
          {errors.cvc && (
            <p style={{ fontSize: typography.fontSize.sm, color: colors.coral, marginTop: spacing[1.5] }} role="alert">
              {errors.cvc}
            </p>
          )}
        </div>
      </div>

      {/* ZIP code */}
      <div style={{ marginBottom: spacing[6] }}>
        <label
          htmlFor="zip"
          style={{
            display: 'block',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.text60,
            marginBottom: spacing[2],
          }}
        >
          ZIP / Postal code
        </label>
        <input
          id="zip"
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="12345"
          value={values.zip}
          onChange={(e) => handleChange('zip', e.target.value.replace(/[^\d-]/g, '').slice(0, 10))}
          onBlur={() => handleBlur('zip')}
          aria-invalid={!!errors.zip}
          style={{
            width: '100%',
            padding: `${spacing[3.5]} ${spacing[4]}`,
            background: colors.slate,
            border: `1px solid ${errors.zip ? colors.coral : colors.text20}`,
            borderRadius: borderRadius.lg,
            fontSize: typography.fontSize.md,
            color: colors.text100,
            outline: 'none',
            transition: transitions.fast,
          }}
        />
        {errors.zip && (
          <p style={{ fontSize: typography.fontSize.sm, color: colors.coral, marginTop: spacing[1.5] }} role="alert">
            {errors.zip}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        style={{
          marginBottom: spacing[4],
        }}
      >
        {isSubmitting ? 'Securing your spot...' : `Unlock ${planName} Access`}
      </Button>

      {/* Terms */}
      <p
        style={{
          fontSize: typography.fontSize.xs,
          color: colors.text40,
          textAlign: 'center',
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        By completing this purchase, you agree to our{' '}
        <a href="/terms" style={{ color: colors.text60, textDecoration: 'underline' }}>
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" style={{ color: colors.text60, textDecoration: 'underline' }}>
          Privacy Policy
        </a>
        . Cancel anytime from your account settings.
      </p>
    </form>
  );
});

/**
 * Success state
 */
const SuccessState = memo(function SuccessState({ planName, onContinue }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: `${spacing[12]} ${spacing[6]}`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          background: `linear-gradient(135deg, ${colors.mint}, ${colors.cyan})`,
          borderRadius: borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: spacing[6],
          boxShadow: shadows.glowMint,
          fontSize: typography.fontSize['4xl'],
        }}
        role="img"
        aria-label="Success"
      >
        ✓
      </div>

      <h2
        style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text100,
          marginBottom: spacing[2],
        }}
      >
        You're in!
      </h2>

      <p
        style={{
          fontSize: typography.fontSize.lg,
          color: colors.text50,
          marginBottom: spacing[6],
          maxWidth: 400,
          margin: '0 auto',
        }}
      >
        Welcome to {planName}. Your first matches will arrive within 24 hours.
      </p>

      <Button size="lg" onClick={onContinue} rightIcon="→">
        Set Up Your Profile
      </Button>
    </div>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * CheckoutFlow - Complete checkout experience
 * 
 * @param {Object} props
 * @param {string} props.planId - Selected plan ID
 * @param {string} [props.billingCycle='monthly'] - Billing frequency
 * @param {Function} [props.onComplete] - Callback on successful checkout
 * @param {Function} [props.onCancel] - Callback on cancel
 */
function CheckoutFlow({
  planId = 'pro',
  billingCycle = 'monthly',
  onComplete,
  onCancel,
}) {
  const [checkoutState, setCheckoutState] = useState('form'); // 'form' | 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  const plan = PLANS[planId] || PLANS.pro;

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useForm(
    {
      cardNumber: '',
      expiry: '',
      cvc: '',
      zip: '',
    },
    {
      validate: validateCheckoutForm,
      validateOnBlur: true,
    }
  );

  const processPayment = useCallback(async (formValues) => {
    setCheckoutState('processing');
    setErrorMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failures for demo
          if (Math.random() < 0.1) {
            reject(new Error('Payment declined. Please try another card.'));
          } else {
            resolve({ success: true });
          }
        }, 2000);
      });

      setCheckoutState('success');
    } catch (error) {
      setCheckoutState('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  }, []);

  const onFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const formErrors = validateCheckoutForm(values);
    
    if (hasErrors(formErrors)) {
      setErrors(formErrors);
      return;
    }

    await processPayment(values);
  }, [values, processPayment, setErrors]);

  const handleContinue = useCallback(() => {
    if (onComplete) {
      onComplete({ planId, billingCycle });
    }
  }, [onComplete, planId, billingCycle]);

  if (checkoutState === 'success') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: colors.night,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: typography.fontFamily.sans,
        }}
      >
        <SuccessState planName={plan.name} onContinue={handleContinue} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.night,
        fontFamily: typography.fontFamily.sans,
        color: colors.text100,
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: `${spacing[6]} ${spacing[6]}`,
          borderBottom: `1px solid ${colors.text10}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>⚡</span>
          <span style={{ fontWeight: typography.fontWeight.bold }}>Job Concierge</span>
        </div>
        
        {onCancel && (
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: colors.text40,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
            }}
          >
            ← Back
          </button>
        )}
      </header>

      {/* Main content */}
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: spacing[8],
          maxWidth: 1000,
          margin: '0 auto',
          padding: `${spacing[8]} ${spacing[6]}`,
        }}
      >
        {/* Two column layout on larger screens */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: spacing[8],
          }}
        >
          {/* Payment form */}
          <section>
            <h1
              style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text100,
                marginBottom: spacing[6],
              }}
            >
              Complete your order
            </h1>

            {/* Error message */}
            {errorMessage && (
              <div
                style={{
                  padding: spacing[4],
                  background: colors.coralSoft,
                  border: `1px solid ${colors.coralBorder}`,
                  borderRadius: borderRadius.lg,
                  marginBottom: spacing[6],
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing[3],
                }}
                role="alert"
              >
                <span style={{ color: colors.coral }}>⚠</span>
                <div>
                  <p
                    style={{
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.coral,
                      marginBottom: spacing[1],
                    }}
                  >
                    Payment failed
                  </p>
                  <p style={{ fontSize: typography.fontSize.sm, color: colors.text60 }}>
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            <PaymentForm
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting || checkoutState === 'processing'}
              handleChange={handleChange}
              handleBlur={handleBlur}
              onSubmit={onFormSubmit}
              planName={plan.name}
            />

            <TrustStrip />
          </section>

          {/* Order summary */}
          <OrderSummary plan={plan} billingCycle={billingCycle} />
        </div>
      </main>

      {/* Processing overlay */}
      {checkoutState === 'processing' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 4, 10, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          role="status"
          aria-label="Processing payment"
        >
          <Spinner size="lg" />
          <p
            style={{
              marginTop: spacing[4],
              fontSize: typography.fontSize.lg,
              color: colors.text80,
            }}
          >
            Securing your spot...
          </p>
          <p
            style={{
              marginTop: spacing[2],
              fontSize: typography.fontSize.sm,
              color: colors.text40,
            }}
          >
            Please don't close this window
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(CheckoutFlow);
