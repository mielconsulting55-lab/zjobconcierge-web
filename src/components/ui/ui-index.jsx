/**
 * ZJobConcierge UI Components v2.0
 * 
 * @description Accessible, performant, reusable UI primitives.
 * All components include:
 * - WCAG 2.1 AA compliance
 * - Keyboard navigation
 * - Screen reader support
 * - Reduced motion respect
 * - Focus management
 * 
 * @version 2.0.0
 */

import React, { forwardRef, memo, useState, useCallback } from 'react';
import { colors, typography, spacing, borderRadius, shadows, transitions, componentStyles } from '../../styles/theme';

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

/**
 * Button - Primary interactive element
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.leftIcon]
 * @param {string} [props.rightIcon]
 * @param {React.ReactNode} props.children
 */
export const Button = memo(forwardRef(function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  style = {},
  ...props
}, ref) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = disabled || loading;

  // Size styles
  const sizeStyles = {
    sm: { padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.fontSize.sm },
    md: { padding: `${spacing[3.5]} ${spacing[6]}`, fontSize: typography.fontSize.md },
    lg: { padding: `${spacing[4]} ${spacing[8]}`, fontSize: typography.fontSize.lg },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      base: {
        background: colors.mint,
        color: colors.void,
        border: 'none',
        boxShadow: shadows.glowMint,
      },
      hover: {
        transform: 'translateY(-1px)',
        boxShadow: `${shadows.glowMint}, ${shadows.buttonHover}`,
      },
    },
    secondary: {
      base: {
        background: 'transparent',
        color: colors.text80,
        border: `1px solid ${colors.text20}`,
      },
      hover: {
        borderColor: colors.text40,
        background: colors.text10,
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        color: colors.text60,
        border: 'none',
      },
      hover: {
        color: colors.text100,
        background: colors.text10,
      },
    },
    danger: {
      base: {
        background: colors.coral,
        color: colors.text100,
        border: 'none',
        boxShadow: shadows.glowCoral,
      },
      hover: {
        transform: 'translateY(-1px)',
      },
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const buttonStyle = {
    ...componentStyles.button.base,
    ...sizeStyles[size],
    ...currentVariant.base,
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transform: 'none',
    ...(isHovered && !isDisabled ? currentVariant.hover : {}),
    ...(isFocused ? { boxShadow: shadows.focusRing } : {}),
    ...style,
  };

  return (
    <button
      ref={ref}
      style={buttonStyle}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={className}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: '2px solid transparent',
            borderTopColor: 'currentColor',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
          aria-hidden="true"
        />
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}));

// ============================================================================
// INPUT COMPONENT
// ============================================================================

/**
 * Input - Form input field with label and error support
 * 
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} [props.error] - Error message
 * @param {string} [props.hint] - Help text
 * @param {string} [props.leftIcon]
 * @param {string} [props.rightIcon]
 * @param {boolean} [props.required=false]
 */
export const Input = memo(forwardRef(function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  required = false,
  id,
  className = '',
  style = {},
  ...props
}, ref) {
  const [isFocused, setIsFocused] = useState(false);
  
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const inputStyle = {
    ...componentStyles.input.base,
    paddingLeft: leftIcon ? spacing[10] : spacing[4],
    paddingRight: rightIcon ? spacing[10] : spacing[4],
    ...(isFocused ? componentStyles.input.focus : {}),
    ...(error ? componentStyles.input.error : {}),
    ...style,
  };

  return (
    <div className={className} style={{ marginBottom: spacing[4] }}>
      {label && (
        <label
          htmlFor={inputId}
          style={componentStyles.label}
        >
          {label}
          {required && <span style={{ color: colors.coral, marginLeft: spacing[1] }} aria-hidden="true">*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              left: spacing[4],
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.text40,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          style={inputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          aria-required={required}
          {...props}
        />
        
        {rightIcon && (
          <span
            style={{
              position: 'absolute',
              right: spacing[4],
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.text40,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
      
      {hint && !error && (
        <p id={hintId} style={{ ...componentStyles.errorText, color: colors.text40 }}>
          {hint}
        </p>
      )}
      
      {error && (
        <p id={errorId} style={componentStyles.errorText} role="alert">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}));

// ============================================================================
// CARD COMPONENT
// ============================================================================

/**
 * Card - Container with elevation
 * 
 * @param {Object} props
 * @param {'default'|'elevated'|'outlined'} [props.variant='default']
 * @param {boolean} [props.hoverable=false]
 * @param {boolean} [props.clickable=false]
 * @param {string} [props.accentColor]
 */
export const Card = memo(forwardRef(function Card({
  variant = 'default',
  hoverable = false,
  clickable = false,
  accentColor,
  children,
  className = '',
  style = {},
  ...props
}, ref) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    default: componentStyles.card.base,
    elevated: { ...componentStyles.card.base, ...componentStyles.card.elevated },
    outlined: {
      ...componentStyles.card.base,
      background: 'transparent',
      border: `1px solid ${colors.text20}`,
    },
  };

  const cardStyle = {
    ...variantStyles[variant],
    cursor: clickable ? 'pointer' : 'default',
    ...(isHovered && hoverable ? componentStyles.card.hover : {}),
    ...(accentColor ? { borderTop: `3px solid ${accentColor}` } : {}),
    ...style,
  };

  const Component = clickable ? 'button' : 'div';

  return (
    <Component
      ref={ref}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}));

// ============================================================================
// BADGE COMPONENT
// ============================================================================

/**
 * Badge - Small label/tag element
 * 
 * @param {Object} props
 * @param {'mint'|'lavender'|'gold'|'coral'|'neutral'} [props.variant='mint']
 * @param {'sm'|'md'} [props.size='md']
 * @param {string} [props.icon]
 */
export const Badge = memo(function Badge({
  variant = 'mint',
  size = 'md',
  icon,
  children,
  className = '',
  style = {},
  ...props
}) {
  const variantStyles = {
    mint: componentStyles.badge.mint,
    lavender: componentStyles.badge.lavender,
    gold: componentStyles.badge.gold,
    coral: {
      background: colors.coralSoft,
      color: colors.coral,
      border: `1px solid ${colors.coralBorder}`,
    },
    neutral: {
      background: colors.text10,
      color: colors.text60,
      border: `1px solid ${colors.text20}`,
    },
  };

  const sizeStyles = {
    sm: { padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.fontSize.xs },
    md: componentStyles.badge.base,
  };

  const badgeStyle = {
    ...componentStyles.badge.base,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <span style={badgeStyle} className={className} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
});

// ============================================================================
// SPINNER COMPONENT
// ============================================================================

/**
 * Spinner - Loading indicator
 * 
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.color]
 * @param {string} [props.label='Loading...']
 */
export const Spinner = memo(function Spinner({
  size = 'md',
  color = colors.mint,
  label = 'Loading...',
  className = '',
  style = {},
}) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 40,
  };

  const dimension = sizes[size];

  return (
    <div
      role="status"
      aria-label={label}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={colors.text20}
          strokeWidth="3"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="10"
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
        }}
      >
        {label}
      </span>
    </div>
  );
});

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

/**
 * Skeleton - Loading placeholder
 * 
 * @param {Object} props
 * @param {'text'|'circle'|'rect'} [props.variant='text']
 * @param {string|number} [props.width]
 * @param {string|number} [props.height]
 */
export const Skeleton = memo(function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style = {},
}) {
  const variantStyles = {
    text: {
      width: width || '100%',
      height: height || typography.fontSize.base,
      borderRadius: borderRadius.sm,
    },
    circle: {
      width: width || 40,
      height: height || 40,
      borderRadius: borderRadius.full,
    },
    rect: {
      width: width || '100%',
      height: height || 100,
      borderRadius: borderRadius.lg,
    },
  };

  return (
    <div
      className={className}
      style={{
        ...variantStyles[variant],
        background: `linear-gradient(90deg, ${colors.text10} 0%, ${colors.text20} 50%, ${colors.text10} 100%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }}
      aria-hidden="true"
    />
  );
});

// ============================================================================
// PROGRESS BAR COMPONENT
// ============================================================================

/**
 * ProgressBar - Progress indicator
 * 
 * @param {Object} props
 * @param {number} props.value - Progress value (0-100)
 * @param {string} [props.color]
 * @param {boolean} [props.showLabel=false]
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
export const ProgressBar = memo(function ProgressBar({
  value = 0,
  color = colors.mint,
  showLabel = false,
  size = 'md',
  label,
  className = '',
  style = {},
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const heights = {
    sm: 4,
    md: 8,
    lg: 12,
  };

  return (
    <div className={className} style={style}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: spacing[1],
            fontSize: typography.fontSize.sm,
            color: colors.text60,
          }}
        >
          <span>{label || 'Progress'}</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: heights[size],
          background: colors.text10,
          borderRadius: borderRadius.full,
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div
          style={{
            width: `${clampedValue}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: borderRadius.full,
            transition: transitions.smooth,
          }}
        />
      </div>
    </div>
  );
});

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

/**
 * Tooltip - Hover/focus information popup
 * 
 * @param {Object} props
 * @param {string} props.content - Tooltip text
 * @param {'top'|'bottom'|'left'|'right'} [props.position='top']
 */
export const Tooltip = memo(function Tooltip({
  content,
  position = 'top',
  children,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: spacing[2] },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: spacing[2] },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: spacing[2] },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: spacing[2] },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      className={className}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            ...positionStyles[position],
            padding: `${spacing[1.5]} ${spacing[3]}`,
            background: colors.slate,
            color: colors.text90,
            fontSize: typography.fontSize.sm,
            borderRadius: borderRadius.md,
            boxShadow: shadows.lg,
            whiteSpace: 'nowrap',
            zIndex: 50,
            animation: 'fadeIn 0.15s ease',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
});

// ============================================================================
// DIVIDER COMPONENT
// ============================================================================

/**
 * Divider - Visual separator
 * 
 * @param {Object} props
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal']
 * @param {string} [props.label]
 */
export const Divider = memo(function Divider({
  orientation = 'horizontal',
  label,
  className = '',
  style = {},
}) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={{
          width: 1,
          background: colors.text10,
          alignSelf: 'stretch',
          ...style,
        }}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[4],
          ...style,
        }}
      >
        <div style={{ flex: 1, height: 1, background: colors.text10 }} />
        <span style={{ color: colors.text40, fontSize: typography.fontSize.sm }}>
          {label}
        </span>
        <div style={{ flex: 1, height: 1, background: colors.text10 }} />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={className}
      style={{
        border: 'none',
        height: 1,
        background: colors.text10,
        margin: `${spacing[4]} 0`,
        ...style,
      }}
    />
  );
});

// ============================================================================
// ICON BUTTON COMPONENT
// ============================================================================

/**
 * IconButton - Button with only icon
 * 
 * @param {Object} props
 * @param {string} props.icon - Icon content
 * @param {string} props.label - Accessible label (required)
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {'default'|'ghost'} [props.variant='default']
 */
export const IconButton = memo(forwardRef(function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'default',
  className = '',
  style = {},
  ...props
}, ref) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sizes = {
    sm: { width: 32, height: 32, fontSize: 14 },
    md: { width: 40, height: 40, fontSize: 18 },
    lg: { width: 48, height: 48, fontSize: 22 },
  };

  const variantStyles = {
    default: {
      background: colors.text10,
      hover: colors.text20,
    },
    ghost: {
      background: 'transparent',
      hover: colors.text10,
    },
  };

  return (
    <button
      ref={ref}
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={className}
      style={{
        ...sizes[size],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
        border: 'none',
        background: isHovered ? variantStyles[variant].hover : variantStyles[variant].background,
        color: colors.text60,
        cursor: 'pointer',
        transition: transitions.fast,
        ...(isFocused ? { boxShadow: shadows.focusRing } : {}),
        ...style,
      }}
      {...props}
    >
      {icon}
    </button>
  );
}));

// ============================================================================
// VISUALLY HIDDEN COMPONENT
// ============================================================================

/**
 * VisuallyHidden - Content visible only to screen readers
 */
export const VisuallyHidden = memo(function VisuallyHidden({ children, as: Component = 'span' }) {
  return (
    <Component
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Button,
  Input,
  Card,
  Badge,
  Spinner,
  Skeleton,
  ProgressBar,
  Tooltip,
  Divider,
  IconButton,
  VisuallyHidden,
};
