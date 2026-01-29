/**
 * ZJobConcierge - API Configuration
 * 
 * This file configures the API endpoints and base URL.
 * For production, the API_BASE_URL should point to your Railway backend.
 */

// API Base URL - Update this for production!
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend.up.railway.app';

// API Endpoints
export const ENDPOINTS = {
  // Health
  health: '/health',
  
  // User Management
  users: {
    signup: '/webhooks/fillout',  // Using existing Fillout webhook endpoint
    me: '/me',
    identify: '/users/identify',
    linkTelegram: '/users/telegram/link',
  },
  
  // Jobs
  jobs: {
    submit: '/jobs/submit',
    list: '/jobs',
    analyze: '/jobs/analyze',
  },
  
  // Packets
  packets: {
    list: '/packets',
    download: (batchId) => `/download/${batchId}`,
    page: (batchId) => `/download/page/${batchId}`,
  },
  
  // Admin (if needed)
  admin: {
    users: '/users',
    stats: '/admin/stats',
  },
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
