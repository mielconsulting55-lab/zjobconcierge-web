/**
 * ZJobConcierge Utilities v2.0
 * 
 * @description Production-grade utility functions with:
 * - Comprehensive input validation
 * - Type-safe operations with JSDoc
 * - Error boundary patterns
 * - Performance optimizations
 * 
 * @version 2.0.0
 */

// ============================================================================
// TYPE DEFINITIONS (JSDoc for TypeScript-like safety)
// ============================================================================

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string|null} error - Error message if invalid
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} [fieldName] - Error message for each field
 */

// ============================================================================
// STRING FORMATTERS
// ============================================================================

/**
 * Format credit card number with spaces every 4 digits
 * @param {string} value - Raw input value
 * @returns {string} Formatted card number (e.g., "4242 4242 4242 4242")
 */
export const formatCardNumber = (value) => {
  if (!value || typeof value !== 'string') return '';
  
  // Strip all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 16 digits and format with spaces
  const limited = digits.slice(0, 16);
  const parts = limited.match(/.{1,4}/g) || [];
  
  return parts.join(' ');
};

/**
 * Format expiry date as MM/YY
 * @param {string} value - Raw input value
 * @returns {string} Formatted expiry (e.g., "12/25")
 */
export const formatExpiry = (value) => {
  if (!value || typeof value !== 'string') return '';
  
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length === 1) return digits;
  
  // Auto-correct invalid months (e.g., "2" becomes "02")
  let month = digits.slice(0, 2);
  if (parseInt(month, 10) > 12) {
    month = '12';
  }
  
  const year = digits.slice(2, 4);
  
  if (year.length === 0) return month.length === 2 ? month + '/' : month;
  
  return `${month}/${year}`;
};

/**
 * Format CVC (strip non-digits, limit length)
 * @param {string} value - Raw input value
 * @returns {string} Formatted CVC
 */
export const formatCVC = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(/\D/g, '').slice(0, 4);
};

/**
 * Format phone number as (XXX) XXX-XXXX
 * @param {string} value - Raw input value
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (value) => {
  if (!value || typeof value !== 'string') return '';
  
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Format currency with locale support
 * @param {number} amount - Amount in base currency unit
 * @param {Object} options - Formatting options
 * @param {string} [options.currency='USD'] - ISO currency code
 * @param {string} [options.locale='en-US'] - Locale for formatting
 * @param {boolean} [options.showCents=false] - Whether to show cents
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const { currency = 'USD', locale = 'en-US', showCents = false } = options;
  
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
};

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @param {string} [locale='en-US'] - Locale for formatting
 * @returns {string} Formatted number (e.g., "1,234,567")
 */
export const formatNumber = (num, locale = 'en-US') => {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format percentage
 * @param {number} value - Value (0-1 for decimal, or 0-100 for whole)
 * @param {Object} options - Formatting options
 * @param {boolean} [options.isDecimal=true] - Whether input is decimal
 * @param {number} [options.decimals=0] - Decimal places to show
 * @returns {string} Formatted percentage (e.g., "85%")
 */
export const formatPercent = (value, options = {}) => {
  const { isDecimal = true, decimals = 0 } = options;
  
  if (typeof value !== 'number' || isNaN(value)) return '0%';
  
  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format file size in human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size (e.g., "42 KB", "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number' || bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);
  
  // Show decimals only for MB and above
  const decimals = i >= 2 ? 1 : 0;
  
  return `${size.toFixed(decimals)} ${units[i]}`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} [maxLength=50] - Maximum length
 * @param {string} [suffix='...'] - Suffix to append
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  
  // Try to break at word boundary
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace) + suffix;
  }
  
  return truncated.trim() + suffix;
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  
  if (isNaN(then.getTime())) return 'Invalid date';
  
  const seconds = Math.floor((now - then) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// ============================================================================
// VALIDATORS
// ============================================================================

/**
 * Validate email address (RFC 5322 compliant)
 * @param {string} email - Email to validate
 * @returns {ValidationResult}
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim().toLowerCase();
  
  // More comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email' };
  }
  
  // Check for common typos in domains
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const domain = trimmed.split('@')[1];
  
  const typoSuggestions = {
    'gmial.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmal.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
  };
  
  if (typoSuggestions[domain]) {
    return { 
      isValid: false, 
      error: `Did you mean ${trimmed.replace(domain, typoSuggestions[domain])}?` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Simple email validation (boolean return for quick checks)
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => validateEmail(email).isValid;

/**
 * Validate credit card number using Luhn algorithm
 * @param {string} cardNumber - Card number (with or without spaces)
 * @returns {ValidationResult}
 */
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return { isValid: false, error: 'Card number is required' };
  }
  
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return { isValid: false, error: 'Enter a valid card number' };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Simple card number validation (boolean)
 * @param {string} cardNumber 
 * @returns {boolean}
 */
export const isValidCardNumber = (cardNumber) => validateCardNumber(cardNumber).isValid;

/**
 * Detect card type from number
 * @param {string} cardNumber - Card number
 * @returns {string} Card type ('visa', 'mastercard', 'amex', 'discover', 'unknown')
 */
export const getCardType = (cardNumber) => {
  if (!cardNumber) return 'unknown';
  
  const digits = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(?:011|5)/.test(digits)) return 'discover';
  
  return 'unknown';
};

/**
 * Validate expiry date
 * @param {string} expiry - Expiry in MM/YY format
 * @returns {ValidationResult}
 */
export const validateExpiry = (expiry) => {
  if (!expiry || typeof expiry !== 'string') {
    return { isValid: false, error: 'Expiry date is required' };
  }
  
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  
  if (!match) {
    return { isValid: false, error: 'Use MM/YY format' };
  }
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);
  
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Invalid month' };
  }
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  // Card expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }
  
  // Too far in the future (10+ years)
  if (year > currentYear + 10) {
    return { isValid: false, error: 'Invalid expiry date' };
  }
  
  return { isValid: true, error: null };
};

export const isValidExpiry = (expiry) => validateExpiry(expiry).isValid;

/**
 * Validate CVC
 * @param {string} cvc - CVC/CVV code
 * @param {string} [cardType] - Card type for length validation
 * @returns {ValidationResult}
 */
export const validateCVC = (cvc, cardType) => {
  if (!cvc || typeof cvc !== 'string') {
    return { isValid: false, error: 'CVC is required' };
  }
  
  const digits = cvc.replace(/\D/g, '');
  const expectedLength = cardType === 'amex' ? 4 : 3;
  
  if (digits.length !== expectedLength && digits.length !== 3 && digits.length !== 4) {
    return { isValid: false, error: `Enter ${expectedLength} digits` };
  }
  
  return { isValid: true, error: null };
};

export const isValidCVC = (cvc) => validateCVC(cvc).isValid;

/**
 * Validate ZIP code (US)
 * @param {string} zip - ZIP code
 * @returns {ValidationResult}
 */
export const validateZip = (zip) => {
  if (!zip || typeof zip !== 'string') {
    return { isValid: false, error: 'ZIP code is required' };
  }
  
  const cleaned = zip.replace(/\s/g, '');
  
  // US ZIP: 5 digits or 5+4
  if (!/^\d{5}(-\d{4})?$/.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid ZIP code' };
  }
  
  return { isValid: true, error: null };
};

export const isValidZip = (zip) => validateZip(zip).isValid;

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {ValidationResult}
 */
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch {
    return { isValid: false, error: 'Enter a valid URL' };
  }
};

export const isValidUrl = (url) => validateUrl(url).isValid;

/**
 * Validate name (basic)
 * @param {string} name - Name to validate
 * @param {Object} options
 * @param {number} [options.minLength=2]
 * @param {number} [options.maxLength=50]
 * @returns {ValidationResult}
 */
export const validateName = (name, options = {}) => {
  const { minLength = 2, maxLength = 50 } = options;
  
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < minLength) {
    return { isValid: false, error: `Name must be at least ${minLength} characters` };
  }
  
  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Name must be less than ${maxLength} characters` };
  }
  
  return { isValid: true, error: null };
};

// ============================================================================
// FORM VALIDATION
// ============================================================================

/**
 * Validate intro/signup form
 * @param {Object} formData - Form data
 * @param {string} formData.firstName - First name
 * @param {string} formData.email - Email
 * @returns {FormErrors} Errors object (empty if valid)
 */
export const validateIntroForm = (formData) => {
  const errors = {};
  
  const nameResult = validateName(formData?.firstName);
  if (!nameResult.isValid) {
    errors.firstName = nameResult.error;
  }
  
  const emailResult = validateEmail(formData?.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  return errors;
};

/**
 * Validate checkout/payment form
 * @param {Object} formData - Form data
 * @returns {FormErrors} Errors object (empty if valid)
 */
export const validateCheckoutForm = (formData) => {
  const errors = {};
  
  const cardResult = validateCardNumber(formData?.cardNumber);
  if (!cardResult.isValid) {
    errors.cardNumber = cardResult.error;
  }
  
  const expiryResult = validateExpiry(formData?.expiry);
  if (!expiryResult.isValid) {
    errors.expiry = expiryResult.error;
  }
  
  const cardType = getCardType(formData?.cardNumber);
  const cvcResult = validateCVC(formData?.cvc, cardType);
  if (!cvcResult.isValid) {
    errors.cvc = cvcResult.error;
  }
  
  const zipResult = validateZip(formData?.zip);
  if (!zipResult.isValid) {
    errors.zip = zipResult.error;
  }
  
  return errors;
};

/**
 * Check if errors object has any errors
 * @param {FormErrors} errors - Errors object
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
  return errors && Object.keys(errors).length > 0;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate random number in range (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate unique ID
 * @param {string} [prefix=''] - Optional prefix
 * @returns {string}
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
};

/**
 * Promise-based delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @param {Object} [options]
 * @param {boolean} [options.leading=false] - Trigger on leading edge
 * @param {boolean} [options.trailing=true] - Trigger on trailing edge
 * @returns {Function}
 */
export const debounce = (func, wait, options = {}) => {
  const { leading = false, trailing = true } = options;
  let timeout = null;
  let lastArgs = null;
  
  const debounced = (...args) => {
    lastArgs = args;
    
    const shouldCallNow = leading && !timeout;
    
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      timeout = null;
      if (trailing && lastArgs) {
        func(...lastArgs);
      }
    }, wait);
    
    if (shouldCallNow) {
      func(...args);
    }
  };
  
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
  };
  
  return debounced;
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function}
 */
export const throttle = (func, limit) => {
  let inThrottle = false;
  
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Clamp number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Progress (0-1)
 * @returns {number}
 */
export const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

// ============================================================================
// URL & NAVIGATION
// ============================================================================

/**
 * Get URL query parameters (safe)
 * @returns {URLSearchParams}
 */
export const getQueryParams = () => {
  if (typeof window === 'undefined') return new URLSearchParams();
  
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
};

/**
 * Get specific query parameter
 * @param {string} key - Parameter key
 * @param {string} [defaultValue] - Default if not found
 * @returns {string|null}
 */
export const getQueryParam = (key, defaultValue = null) => {
  const params = getQueryParams();
  return params.get(key) ?? defaultValue;
};

/**
 * Build URL with query parameters
 * @param {string} base - Base URL
 * @param {Object} params - Query parameters
 * @returns {string}
 */
export const buildUrl = (base, params = {}) => {
  try {
    const url = new URL(base, window.location.origin);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
    
    return url.toString();
  } catch {
    return base;
  }
};

/**
 * Copy text to clipboard (with fallback)
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;
  
  // Modern API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy method
    }
  }
  
  // Legacy fallback
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
};

/**
 * Smooth scroll to element
 * @param {string} elementId - Element ID (without #)
 * @param {Object} [options]
 * @param {number} [options.offset=0] - Offset from top
 * @param {string} [options.behavior='smooth'] - Scroll behavior
 */
export const scrollToElement = (elementId, options = {}) => {
  const { offset = 0, behavior = 'smooth' } = options;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  
  window.scrollTo({ top, behavior });
};

/**
 * Scroll to top of page
 * @param {string} [behavior='smooth'] - Scroll behavior
 */
export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({ top: 0, behavior });
};

// ============================================================================
// STORAGE (with error handling)
// ============================================================================

/**
 * Safe localStorage get
 * @param {string} key - Storage key
 * @param {any} [defaultValue=null] - Default value
 * @returns {any}
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safe localStorage set
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Safe localStorage remove
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 * @returns {boolean}
 */
export const prefersDarkMode = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} [priority='polite'] - 'polite' | 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0';
  
  document.body.appendChild(announcement);
  
  // Slight delay for screen readers to pick up
  setTimeout(() => {
    announcement.textContent = message;
  }, 100);
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// ============================================================================
// ARRAY/OBJECT HELPERS
// ============================================================================

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string|Function} key - Key or getter function
 * @returns {Object}
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Pick specific keys from object
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {Object}
 */
export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key];
    return result;
  }, {});
};

/**
 * Omit specific keys from object
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to omit
 * @returns {Object}
 */
export const omit = (obj, keys) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key)) result[key] = obj[key];
    return result;
  }, {});
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  // Formatters
  formatCardNumber,
  formatExpiry,
  formatCVC,
  formatPhoneNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatFileSize,
  truncateText,
  formatRelativeTime,
  
  // Validators
  validateEmail,
  isValidEmail,
  validateCardNumber,
  isValidCardNumber,
  getCardType,
  validateExpiry,
  isValidExpiry,
  validateCVC,
  isValidCVC,
  validateZip,
  isValidZip,
  validateUrl,
  isValidUrl,
  validateName,
  
  // Form validation
  validateIntroForm,
  validateCheckoutForm,
  hasErrors,
  
  // Utilities
  randomInRange,
  generateId,
  delay,
  debounce,
  throttle,
  clamp,
  lerp,
  
  // URL & Navigation
  getQueryParams,
  getQueryParam,
  buildUrl,
  copyToClipboard,
  scrollToElement,
  scrollToTop,
  
  // Storage
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  
  // Accessibility
  prefersReducedMotion,
  prefersDarkMode,
  announceToScreenReader,
  
  // Array/Object
  groupBy,
  pick,
  omit,
};
