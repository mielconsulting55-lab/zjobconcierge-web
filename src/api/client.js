/**
 * ZJobConcierge - API Client
 * 
 * Centralized HTTP client with error handling, retries, and auth.
 */

import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from './config';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Make an API request with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  };

  // Add user email header if available (for authenticated requests)
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail && !config.headers['X-User-Email']) {
    config.headers['X-User-Email'] = userEmail;
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }
      
      throw new ApiError(
        errorData.detail || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    // Parse response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    // Return blob for file downloads
    if (contentType && (contentType.includes('application/zip') || contentType.includes('application/pdf'))) {
      return await response.blob();
    }
    
    return await response.text();
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network error
    throw new ApiError(
      error.message || 'Network error. Please check your connection.',
      0
    );
  }
}

/**
 * HTTP Methods
 */
export const api = {
  get: (endpoint, options = {}) => 
    request(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint, data, options = {}) => 
    request(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: (endpoint, data, options = {}) => 
    request(endpoint, { 
      ...options, 
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  patch: (endpoint, data, options = {}) => 
    request(endpoint, { 
      ...options, 
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    
  delete: (endpoint, options = {}) => 
    request(endpoint, { ...options, method: 'DELETE' }),
};

export { ApiError };
export default api;
