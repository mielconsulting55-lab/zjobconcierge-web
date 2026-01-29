/**
 * ZJobConcierge Custom Hooks v2.0
 * 
 * @description Production-grade React hooks with:
 * - Proper cleanup to prevent memory leaks
 * - SSR-safe implementations
 * - TypeScript-ready JSDoc comments
 * - Performance optimizations
 * 
 * @version 2.0.0
 */

import { 
  useState, 
  useEffect, 
  useCallback, 
  useRef, 
  useMemo,
  useLayoutEffect,
} from 'react';
import { randomInRange, prefersReducedMotion } from '../utils/helpers';

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

/**
 * Hook for animated live counters (users online, signups today, etc.)
 * Includes proper cleanup and reduced motion support.
 * 
 * @param {number} initialValue - Starting value
 * @param {Object} options - Configuration
 * @param {number} [options.min] - Minimum value
 * @param {number} [options.max] - Maximum value
 * @param {number} [options.interval=3000] - Update interval in ms
 * @param {number} [options.variance=3] - Max change per update
 * @param {'up'|'down'|'both'} [options.direction='both'] - Direction of change
 * @param {boolean} [options.enabled=true] - Whether animation is active
 * @returns {number} Current animated value
 * 
 * @example
 * const usersOnline = useLiveCounter(127, { min: 100, max: 160 });
 */
export function useLiveCounter(initialValue = 100, options = {}) {
  const {
    min = initialValue - 20,
    max = initialValue + 30,
    interval = 3000,
    variance = 3,
    direction = 'both',
    enabled = true,
  } = options;

  const [value, setValue] = useState(initialValue);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (!enabled || prefersReducedMotion()) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setValue((prev) => {
        let change;
        
        if (direction === 'up') {
          change = randomInRange(0, variance);
        } else if (direction === 'down') {
          change = -randomInRange(0, variance);
        } else {
          change = Math.random() > 0.5 
            ? randomInRange(1, variance) 
            : -randomInRange(0, variance - 1);
        }
        
        // Clamp to bounds
        const newValue = prev + change;
        return Math.max(min, Math.min(max, newValue));
      });
    }, interval);

    // Cleanup on unmount or dependency change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [min, max, interval, variance, direction, enabled]);

  return value;
}

/**
 * Hook for typewriter text effect
 * Includes proper cleanup and reset functionality.
 * 
 * @param {string} text - Full text to type
 * @param {Object} options
 * @param {number} [options.speed=50] - Milliseconds per character
 * @param {boolean} [options.loop=false] - Whether to loop
 * @param {number} [options.loopDelay=2000] - Delay before loop restarts
 * @param {boolean} [options.enabled=true] - Whether effect is active
 * @returns {Object} { displayText, isComplete, isTyping, reset }
 * 
 * @example
 * const { displayText, isComplete } = useTypingEffect('Hello World');
 */
export function useTypingEffect(text, options = {}) {
  const {
    speed = 50,
    loop = false,
    loopDelay = 2000,
    enabled = true,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    indexRef.current = 0;
    setDisplayText('');
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (!text || !enabled || prefersReducedMotion()) {
      setDisplayText(text || '');
      setIsComplete(true);
      return;
    }

    reset();
    setIsTyping(true);

    const typeNextChar = () => {
      if (!isMountedRef.current) return;

      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        setIsTyping(false);
        
        if (loop) {
          timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              reset();
              setIsTyping(true);
              timeoutRef.current = setTimeout(typeNextChar, speed);
            }
          }, loopDelay);
        }
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, speed);

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, loop, loopDelay, enabled, reset]);

  return { displayText, isComplete, isTyping, reset };
}

/**
 * Hook for blinking cursor effect
 * 
 * @param {number} [interval=500] - Blink interval in ms
 * @param {boolean} [enabled=true] - Whether blink is active
 * @returns {boolean} Whether cursor is visible
 */
export function useBlinkingCursor(interval = 500, enabled = true) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const timer = setInterval(() => {
      setVisible((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, enabled]);

  return visible;
}

/**
 * Hook for auto-advancing step animations
 * 
 * @param {number} totalSteps - Total number of steps
 * @param {Object} options
 * @param {number[]} [options.timings] - Duration for each step in ms
 * @param {boolean} [options.autoPlay=true] - Start automatically
 * @param {boolean} [options.loop=true] - Loop when complete
 * @returns {Object} { step, setStep, isPlaying, play, pause, reset, goTo }
 */
export function useStepAnimation(totalSteps, options = {}) {
  const {
    timings = [],
    autoPlay = true,
    loop = true,
  } = options;

  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Default timing: 2 seconds per step
  const stepTimings = useMemo(() => {
    if (timings.length === totalSteps) return timings;
    return Array(totalSteps).fill(2000);
  }, [timings, totalSteps]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStep(0);
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const goTo = useCallback((targetStep) => {
    const clamped = Math.max(0, Math.min(targetStep, totalSteps - 1));
    setStep(clamped);
  }, [totalSteps]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!isPlaying || prefersReducedMotion()) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      setStep((prev) => {
        const nextStep = prev + 1;
        
        if (nextStep >= totalSteps) {
          if (loop) {
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        }
        
        return nextStep;
      });
    }, stepTimings[step]);

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [step, isPlaying, totalSteps, stepTimings, loop]);

  return { step, setStep: goTo, isPlaying, play, pause, reset, goTo };
}

/**
 * Hook for confetti animation trigger
 * 
 * @param {number} [duration=2500] - How long confetti shows in ms
 * @returns {Object} { showConfetti, triggerConfetti }
 */
export function useConfetti(duration = 2500) {
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const triggerConfetti = useCallback(() => {
    if (prefersReducedMotion()) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowConfetti(true);
    
    timeoutRef.current = setTimeout(() => {
      setShowConfetti(false);
    }, duration);
  }, [duration]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { showConfetti, triggerConfetti };
}

// ============================================================================
// FORM HOOKS
// ============================================================================

/**
 * Hook for form state management with validation
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Object} options
 * @param {Function} [options.validate] - Validation function
 * @param {Function} [options.onSubmit] - Submit handler
 * @param {boolean} [options.validateOnChange=false] - Validate on each change
 * @param {boolean} [options.validateOnBlur=true] - Validate on blur
 * @returns {Object} Form state and handlers
 * 
 * @example
 * const form = useForm(
 *   { email: '', password: '' },
 *   { validate: validateLoginForm }
 * );
 */
export function useForm(initialValues, options = {}) {
  const {
    validate = () => ({}),
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when field changes
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Optionally validate on change
    if (validateOnChange) {
      const newValues = { ...values, [field]: value };
      const newErrors = validate(newValues);
      if (newErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    }
  }, [errors, values, validate, validateOnChange]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate on blur
    if (validateOnBlur) {
      const fieldErrors = validate(values);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    }
  }, [values, validate, validateOnBlur]);

  const runValidation = useCallback(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    setSubmitCount((c) => c + 1);
    setIsSubmitting(true);
    
    const isValid = runValidation();
    
    if (isValid && onSubmit) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    }
    
    setIsSubmitting(false);
    return isValid;
  }, [values, runValidation, onSubmit]);

  const reset = useCallback((newValues) => {
    setValues(newValues || initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  const setFieldValue = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;
  
  // Check if form has been touched
  const isDirty = Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    validate: runValidation,
    reset,
    setValues,
    setFieldValue,
    setFieldError,
    clearFieldError,
    setErrors,
  };
}

// ============================================================================
// STORAGE HOOKS
// ============================================================================

/**
 * Hook for persisting state in localStorage
 * SSR-safe with proper error handling.
 * 
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if none stored
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from storage or use default
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Memoize setValue to prevent unnecessary re-renders
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for sessionStorage (same API as useLocalStorage)
 */
export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// ============================================================================
// BROWSER HOOKS
// ============================================================================

/**
 * Hook for responsive media queries
 * SSR-safe implementation.
 * 
 * @param {string} query - CSS media query
 * @returns {boolean} Whether query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    const handler = (event) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Preset media query hooks
 */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Hook for setInterval with auto-cleanup
 * Null delay pauses the interval.
 * 
 * @param {Function} callback - Function to call
 * @param {number|null} delay - Interval delay in ms (null to pause)
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Hook for setTimeout with auto-cleanup
 * 
 * @param {Function} callback - Function to call
 * @param {number|null} delay - Timeout delay in ms (null to cancel)
 */
export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * Hook for tracking hover state
 * 
 * @returns {[boolean, Object]} [isHovering, hoverProps]
 */
export function useHover() {
  const [isHovering, setIsHovering] = useState(false);

  const hoverProps = useMemo(() => ({
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    onFocus: () => setIsHovering(true),
    onBlur: () => setIsHovering(false),
  }), []);

  return [isHovering, hoverProps];
}

/**
 * Hook for tracking scroll position
 * Throttled for performance.
 * 
 * @param {Object} options
 * @param {number} [options.throttle=100] - Throttle interval in ms
 * @returns {Object} { x, y, scrollDirection }
 */
export function useScrollPosition(options = {}) {
  const { throttle = 100 } = options;
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          
          setPosition({
            x: window.scrollX,
            y: currentY,
          });
          
          // Determine scroll direction
          if (currentY > lastScrollY.current) {
            setScrollDirection('down');
          } else if (currentY < lastScrollY.current) {
            setScrollDirection('up');
          }
          
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttle]);

  return { ...position, scrollDirection };
}

/**
 * Hook for window size
 * Debounced for performance.
 * 
 * @returns {Object} { width, height }
 */
export function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
}

/**
 * Hook for previous value
 * 
 * @param {any} value - Value to track
 * @returns {any} Previous value
 */
export function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

/**
 * Hook for click outside detection
 * 
 * @param {Function} handler - Callback when clicked outside
 * @returns {Object} ref - Ref to attach to element
 */
export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler]);

  return ref;
}

/**
 * Hook for keyboard shortcuts
 * 
 * @param {Object} keyMap - Map of key combos to handlers
 * @param {Object} options
 * @param {boolean} [options.enabled=true] - Whether shortcuts are active
 * 
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+s': handleSave,
 *   'escape': handleClose,
 * });
 */
export function useKeyboardShortcuts(keyMap, options = {}) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Build key combo string
      let combo = '';
      if (ctrl) combo += 'ctrl+';
      if (shift) combo += 'shift+';
      if (alt) combo += 'alt+';
      combo += key;

      const handler = keyMap[combo] || keyMap[key];
      
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyMap, enabled]);
}

/**
 * Hook for debounced value
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in ms
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for async operations with loading/error states
 * 
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} [immediate=true] - Execute immediately
 * @returns {Object} { execute, loading, error, value }
 */
export function useAsync(asyncFunction, immediate = true) {
  const [loading, setLoading] = useState(immediate);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await asyncFunction(...args);
      setValue(response);
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, loading, error, value };
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  // Animation
  useLiveCounter,
  useTypingEffect,
  useBlinkingCursor,
  useStepAnimation,
  useConfetti,
  
  // Form
  useForm,
  
  // Storage
  useLocalStorage,
  useSessionStorage,
  
  // Browser
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersReducedMotion,
  usePrefersDarkMode,
  useInterval,
  useTimeout,
  useHover,
  useScrollPosition,
  useWindowSize,
  usePrevious,
  useClickOutside,
  useKeyboardShortcuts,
  useDebounce,
  useAsync,
};
