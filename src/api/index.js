/**
 * ZJobConcierge - API Module
 * 
 * Central export for all API functionality.
 * 
 * Usage:
 *   import { registerUser, processCheckout } from './api';
 *   import api from './api';
 */

// Export everything from services (main API functions)
export * from './services';

// Export API client for direct use
export { default as api, ApiError } from './client';

// Export config
export * from './config';
