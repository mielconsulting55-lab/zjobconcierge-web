/**
 * ZJobConcierge - API Services
 * 
 * High-level API functions for user management, checkout, jobs, etc.
 */

import api, { ApiError } from './client';
import { ENDPOINTS } from './config';

// =============================================================================
// USER SERVICES
// =============================================================================

/**
 * Register a new user (signup)
 * This creates a user account and sends welcome email
 */
export async function registerUser(userData) {
  // Format data to match Fillout webhook structure
  const payload = {
    submission: {
      questions: [
        { name: 'email', value: userData.email },
        { name: 'full_name', value: userData.fullName || `${userData.firstName} ${userData.lastName || ''}`.trim() },
        { name: 'phone', value: userData.phone || '' },
        { name: 'country', value: userData.country || 'USA' },
        { name: 'target_titles', value: userData.targetTitles || [] },
        { name: 'target_industries', value: userData.industries || [] },
        { name: 'work_preference', value: userData.workPreference || 'no_preference' },
        { name: 'years_of_experience', value: userData.yearsExperience || '' },
        { name: 'plan', value: userData.plan || 'basic' },
      ]
    }
  };
  
  const response = await api.post(ENDPOINTS.users.signup, payload);
  
  // Store user email for subsequent requests
  if (userData.email) {
    localStorage.setItem('userEmail', userData.email);
  }
  
  return response;
}

/**
 * Get current user info
 */
export async function getCurrentUser() {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    throw new ApiError('Not logged in', 401);
  }
  
  return api.get(ENDPOINTS.users.me, {
    headers: { 'X-User-Email': email }
  });
}

/**
 * Identify user by email or telegram ID
 */
export async function identifyUser(identifier) {
  return api.get(`${ENDPOINTS.users.identify}?identifier=${encodeURIComponent(identifier)}`);
}

/**
 * Link Telegram account to user
 */
export async function linkTelegram(email, telegramId, telegramUsername) {
  return api.post(ENDPOINTS.users.linkTelegram, {
    email,
    telegram_id: telegramId,
    telegram_username: telegramUsername,
  });
}


// =============================================================================
// CHECKOUT / SUBSCRIPTION SERVICES
// =============================================================================

/**
 * Process checkout and create user with subscription
 * 
 * NOTE: In production, you'll want to integrate Stripe here.
 * For now, this creates a user with the selected plan.
 */
export async function processCheckout(checkoutData) {
  const { formData, profile, selectedPlan, billingCycle } = checkoutData;
  
  // Step 1: Create user account
  const userResult = await registerUser({
    email: formData.email,
    fullName: formData.firstName,
    firstName: formData.firstName,
    plan: selectedPlan,
    // Profile data
    targetTitles: profile.dreamTitle ? [profile.dreamTitle] : [],
    workPreference: profile.workStyle || 'no_preference',
    yearsExperience: profile.careerStage || '',
    industries: [],
  });
  
  // Step 2: In production, process payment with Stripe
  // For now, we just return success after user creation
  
  return {
    success: true,
    userId: userResult.user_id,
    message: 'Account created successfully',
    plan: selectedPlan,
    billingCycle,
  };
}

/**
 * Create a subscription (Stripe integration placeholder)
 * 
 * TODO: Integrate with Stripe Checkout
 */
export async function createSubscription(planId, paymentMethodId) {
  // Placeholder - integrate Stripe here
  console.warn('Stripe integration not yet implemented');
  return { success: true, subscriptionId: 'sub_placeholder' };
}


// =============================================================================
// JOB SERVICES
// =============================================================================

/**
 * Submit a job for processing
 */
export async function submitJob(jobText, source = 'manual') {
  return api.post(ENDPOINTS.jobs.submit, {
    job_text: jobText,
    source,
  });
}

/**
 * Get user's jobs
 */
export async function getUserJobs(limit = 50) {
  return api.get(`${ENDPOINTS.jobs.list}?limit=${limit}`);
}

/**
 * Analyze a job posting (without saving)
 */
export async function analyzeJob(jobText) {
  return api.post(ENDPOINTS.jobs.analyze, {
    job_text: jobText,
  });
}


// =============================================================================
// PACKET SERVICES
// =============================================================================

/**
 * Get user's packets
 */
export async function getUserPackets(limit = 50) {
  return api.get(`${ENDPOINTS.packets.list}?limit=${limit}`);
}

/**
 * Get download page URL
 */
export function getDownloadPageUrl(batchId) {
  return `${import.meta.env.VITE_API_URL || ''}${ENDPOINTS.packets.page(batchId)}`;
}

/**
 * Download packets as ZIP
 */
export async function downloadPackets(batchId) {
  return api.get(ENDPOINTS.packets.download(batchId));
}


// =============================================================================
// HEALTH CHECK
// =============================================================================

/**
 * Check API health
 */
export async function checkHealth() {
  try {
    const result = await api.get(ENDPOINTS.health);
    return { healthy: true, ...result };
  } catch (error) {
    return { healthy: false, error: error.message };
  }
}


// =============================================================================
// LOCAL STORAGE HELPERS
// =============================================================================

/**
 * Store user session data
 */
export function setUserSession(userData) {
  localStorage.setItem('userEmail', userData.email);
  localStorage.setItem('userId', userData.userId);
  localStorage.setItem('userPlan', userData.plan);
  localStorage.setItem('userName', userData.name);
}

/**
 * Get user session data
 */
export function getUserSession() {
  return {
    email: localStorage.getItem('userEmail'),
    userId: localStorage.getItem('userId'),
    plan: localStorage.getItem('userPlan'),
    name: localStorage.getItem('userName'),
  };
}

/**
 * Clear user session
 */
export function clearUserSession() {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  localStorage.removeItem('userPlan');
  localStorage.removeItem('userName');
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
  return !!localStorage.getItem('userEmail');
}


// Export all services
export default {
  // User
  registerUser,
  getCurrentUser,
  identifyUser,
  linkTelegram,
  
  // Checkout
  processCheckout,
  createSubscription,
  
  // Jobs
  submitJob,
  getUserJobs,
  analyzeJob,
  
  // Packets
  getUserPackets,
  getDownloadPageUrl,
  downloadPackets,
  
  // Health
  checkHealth,
  
  // Session
  setUserSession,
  getUserSession,
  clearUserSession,
  isLoggedIn,
};
