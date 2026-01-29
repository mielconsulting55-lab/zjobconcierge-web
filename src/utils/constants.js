/**
 * ZJobConcierge Constants v2.0
 * 
 * @description Centralized configuration with conversion-optimized copy,
 * structured data, and Apple-level messaging clarity.
 * 
 * Copy Guidelines Applied:
 * - Lead with outcomes, not features
 * - Reduce anxiety, build trust
 * - Human-first, zero corporate fluff
 * 
 * @version 2.0.0
 */

// ============================================================================
// PRICING PLANS
// ============================================================================

/**
 * Plan configurations with conversion-optimized features
 * Feature copy focuses on outcomes, not mechanics
 */
export const PLANS = {
  free: {
    id: 'free',
    name: 'Free Trial',
    shortName: 'Trial',
    icon: '🎁',
    emoji: '🎁',
    basePrice: 0,
    
    // Capacity
    packetsPerDay: 5,
    packetsPerMonth: 35,
    trialDays: 7,
    
    // Flags
    isFree: true,
    isPopular: false,
    
    // Conversion copy
    tagline: 'Test the waters',
    description: '7 days to see the difference.',
    cta: 'Start Free Trial',
    ctaShort: 'Try Free',
    
    // Features (outcome-focused)
    features: [
      '5 tailored applications daily',
      'Full 7-day access',
      'AI-powered job matching',
      'No credit card required',
    ],
    
    // What's included (for comparison)
    included: {
      resumeTailoring: true,
      coverLetter: 'basic',
      interviewPrep: 15,
      companyResearch: false,
      priorityDelivery: false,
      analytics: false,
    },
  },

  basic: {
    id: 'basic',
    name: 'Starter',
    shortName: 'Starter',
    icon: '🌱',
    emoji: '🌱',
    basePrice: 19,
    
    packetsPerDay: 5,
    packetsPerMonth: 150,
    
    // ROI messaging
    costPerApplication: 0.13,
    valueEquivalent: 150, // What this would cost traditionally
    
    // Styling
    color: 'lavender',
    isFree: false,
    isPopular: false,
    
    tagline: 'For serious starters',
    description: 'Everything you need to land interviews.',
    cta: 'Get Started',
    ctaShort: 'Start',
    
    features: [
      '150 tailored applications monthly',
      'Resume + Cover Letter for each job',
      '15 interview prep questions per role',
      'Telegram & Email delivery',
    ],
    
    included: {
      resumeTailoring: true,
      coverLetter: 'personalized',
      interviewPrep: 15,
      companyResearch: false,
      priorityDelivery: false,
      analytics: 'basic',
    },
  },

  pro: {
    id: 'pro',
    name: 'Professional',
    shortName: 'Pro',
    icon: '⚡',
    emoji: '⚡',
    basePrice: 39,
    
    packetsPerDay: 10,
    packetsPerMonth: 300,
    
    costPerApplication: 0.13,
    valueEquivalent: 300,
    
    color: 'mint',
    isFree: false,
    isPopular: true,
    badge: 'Most Popular',
    
    tagline: 'For active job seekers',
    description: 'Double the applications, double the opportunities.',
    cta: 'Go Pro',
    ctaShort: 'Go Pro',
    
    features: [
      '300 tailored applications monthly',
      'Personalized cover letters',
      '25 interview questions + company insights',
      'Weekly progress summaries',
      'Skip tracking & reasons',
    ],
    
    included: {
      resumeTailoring: true,
      coverLetter: 'personalized',
      interviewPrep: 25,
      companyResearch: 'overview',
      priorityDelivery: false,
      analytics: 'full',
      weeklyReport: true,
      skipTracking: true,
    },
  },

  vip: {
    id: 'vip',
    name: 'Executive',
    shortName: 'VIP',
    icon: '👑',
    emoji: '👑',
    basePrice: 79,
    
    packetsPerDay: 15,
    packetsPerMonth: 450,
    
    costPerApplication: 0.18,
    valueEquivalent: 450,
    
    color: 'gold',
    isFree: false,
    isPopular: false,
    badge: 'Best Value',
    
    tagline: 'For executives & power users',
    description: 'The complete arsenal for landing your dream role.',
    cta: 'Go Executive',
    ctaShort: 'Go VIP',
    
    features: [
      '450 tailored applications monthly',
      'Premium cover letters with personal touch',
      '35 questions + deep company research',
      'Salary insights & negotiation data',
      'Interview flashcards',
      'Priority processing',
      'CSV export for tracking',
    ],
    
    included: {
      resumeTailoring: true,
      coverLetter: 'premium',
      interviewPrep: 35,
      companyResearch: 'deep',
      priorityDelivery: true,
      analytics: 'full',
      weeklyReport: true,
      skipTracking: true,
      flashcards: true,
      salaryInsights: true,
      csvExport: true,
    },
  },

  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    shortName: 'Enterprise',
    icon: '🏢',
    emoji: '🏢',
    basePrice: 299,
    
    packetsPerDay: 50,
    packetsPerMonth: 1500,
    
    color: 'lavender',
    isFree: false,
    isPopular: false,
    
    tagline: 'For teams & recruiters',
    description: 'Scale your talent acquisition.',
    cta: 'Contact Sales',
    ctaShort: 'Contact',
    
    features: [
      '1,500 applications monthly',
      'API access for integrations',
      'Dedicated account manager',
      'Custom workflows',
      'Team collaboration',
    ],
  },

  agency: {
    id: 'agency',
    name: 'Agency',
    shortName: 'Agency',
    icon: '🚀',
    emoji: '🚀',
    basePrice: 999,
    
    packetsPerDay: 200,
    packetsPerMonth: 6000,
    
    color: 'gold',
    isFree: false,
    isPopular: false,
    
    tagline: 'For staffing firms',
    description: 'White-label solution at scale.',
    cta: 'Contact Sales',
    ctaShort: 'Contact',
    
    features: [
      '6,000 applications monthly',
      'White-label option',
      'Multi-seat accounts',
      'Priority API access',
      'Custom branding',
    ],
  },
};

// Plan order for display
export const PLAN_ORDER = ['free', 'basic', 'pro', 'vip'];
export const CONSUMER_PLANS = ['basic', 'pro', 'vip'];
export const ENTERPRISE_PLANS = ['enterprise', 'agency'];

/**
 * Calculate price with annual discount
 * @param {number} basePrice - Monthly base price
 * @param {string} billingCycle - 'monthly' | 'annual'
 * @returns {number} Final price
 */
export const getPrice = (basePrice, billingCycle = 'monthly') => {
  if (billingCycle === 'annual') {
    return Math.round(basePrice * 0.8); // 20% discount
  }
  return basePrice;
};

/**
 * Get plan with calculated price
 * @param {string} planId - Plan identifier
 * @param {string} billingCycle - 'monthly' | 'annual'
 * @returns {Object|null} Plan with price
 */
export const getPlanWithPrice = (planId, billingCycle = 'monthly') => {
  const plan = PLANS[planId];
  if (!plan) return null;
  
  const price = getPrice(plan.basePrice, billingCycle);
  const annualSavings = billingCycle === 'annual' 
    ? (plan.basePrice * 12) - (price * 12) 
    : 0;
  
  return {
    ...plan,
    price,
    annualPrice: price * 12,
    annualSavings,
    billingCycle,
  };
};

// ============================================================================
// FEATURE COMPARISON
// ============================================================================

export const COMPARISON_CATEGORIES = [
  {
    id: 'volume',
    title: 'Application Volume',
    icon: '📊',
    features: [
      { 
        id: 'daily',
        name: 'Daily applications',
        basic: '5 per day',
        pro: '10 per day',
        vip: '15 per day',
      },
      { 
        id: 'monthly',
        name: 'Monthly total',
        basic: '~150',
        pro: '~300',
        vip: '~450',
      },
      { 
        id: 'delivery',
        name: 'Delivery',
        basic: 'Standard',
        pro: 'Standard',
        vip: 'Priority',
      },
    ],
  },
  {
    id: 'documents',
    title: 'Application Materials',
    icon: '📄',
    features: [
      { 
        id: 'resume',
        name: 'Tailored resume',
        basic: true,
        pro: true,
        vip: true,
      },
      { 
        id: 'ats',
        name: 'ATS optimization',
        basic: true,
        pro: true,
        vip: true,
      },
      { 
        id: 'cover',
        name: 'Cover letter',
        basic: 'Basic',
        pro: 'Personalized',
        vip: 'Premium',
      },
      { 
        id: 'thankyou',
        name: 'Thank-you email',
        basic: false,
        pro: 'Template',
        vip: 'Personalized',
      },
    ],
  },
  {
    id: 'research',
    title: 'Company Research',
    icon: '🏢',
    features: [
      { 
        id: 'overview',
        name: 'Company overview',
        basic: false,
        pro: 'Basic',
        vip: 'Deep dive',
      },
      { 
        id: 'salary',
        name: 'Salary insights',
        basic: false,
        pro: false,
        vip: true,
      },
      { 
        id: 'culture',
        name: 'Culture insights',
        basic: false,
        pro: false,
        vip: true,
      },
    ],
  },
  {
    id: 'interview',
    title: 'Interview Prep',
    icon: '🎯',
    features: [
      { 
        id: 'questions',
        name: 'Prep questions',
        basic: '15',
        pro: '25',
        vip: '35',
      },
      { 
        id: 'flashcards',
        name: 'Flashcards',
        basic: false,
        pro: false,
        vip: true,
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Analytics & Tracking',
    icon: '📈',
    features: [
      { 
        id: 'dashboard',
        name: 'Progress dashboard',
        basic: true,
        pro: true,
        vip: true,
      },
      { 
        id: 'skip',
        name: 'Skip reasons',
        basic: false,
        pro: true,
        vip: true,
      },
      { 
        id: 'weekly',
        name: 'Weekly summary',
        basic: false,
        pro: true,
        vip: true,
      },
      { 
        id: 'export',
        name: 'CSV export',
        basic: false,
        pro: false,
        vip: true,
      },
    ],
  },
];

// ============================================================================
// ONBOARDING CONFIGURATION
// ============================================================================

export const ONBOARDING_STEPS = [
  { 
    id: 1, 
    key: 'welcome',
    title: 'Welcome', 
    subtitle: "Let's set you up for success",
    icon: '👋',
    duration: '30 sec',
  },
  { 
    id: 2, 
    key: 'career',
    title: 'Career DNA', 
    subtitle: 'Your professional identity',
    icon: '🧬',
    duration: '2 min',
  },
  { 
    id: 3, 
    key: 'workstyle',
    title: 'Work Style', 
    subtitle: 'What energizes you',
    icon: '🧠',
    duration: '1 min',
  },
  { 
    id: 4, 
    key: 'goals',
    title: 'Your Goals', 
    subtitle: 'Where you want to go',
    icon: '🎯',
    duration: '1 min',
  },
  { 
    id: 5, 
    key: 'strengths',
    title: 'Secret Sauce', 
    subtitle: 'What sets you apart',
    icon: '✨',
    duration: '2 min',
  },
  { 
    id: 6, 
    key: 'connect',
    title: 'Connect Jobs', 
    subtitle: 'Set up job alerts',
    icon: '📧',
    duration: '3 min',
  },
];

// Career stages
export const CAREER_STAGES = [
  { 
    id: 'early', 
    label: 'Early Career', 
    description: '0-2 years experience',
    icon: '🌱',
    hint: 'Building foundations',
  },
  { 
    id: 'growing', 
    label: 'Growing', 
    description: '3-5 years experience',
    icon: '🌿',
    hint: 'Expanding expertise',
  },
  { 
    id: 'senior', 
    label: 'Senior', 
    description: '6-10 years experience',
    icon: '🌳',
    hint: 'Leading & mentoring',
  },
  { 
    id: 'executive', 
    label: 'Executive', 
    description: '10+ years experience',
    icon: '🏔️',
    hint: 'Strategic leadership',
  },
];

// Professional superpowers
export const SUPERPOWERS = [
  { id: 'strategy', label: 'Strategic Thinking', icon: '🎯' },
  { id: 'building', label: 'Building from 0→1', icon: '🏗️' },
  { id: 'scaling', label: 'Scaling & Optimization', icon: '📈' },
  { id: 'leadership', label: 'People Leadership', icon: '👥' },
  { id: 'technical', label: 'Technical Excellence', icon: '⚡' },
  { id: 'creative', label: 'Creative Problem-Solving', icon: '💡' },
  { id: 'crossfunc', label: 'Cross-functional Collaboration', icon: '🤝' },
  { id: 'data', label: 'Data-Driven Decisions', icon: '📊' },
  { id: 'stakeholder', label: 'Stakeholder Management', icon: '🎭' },
  { id: 'architecture', label: 'Technical Architecture', icon: '🏛️' },
];

// Work energizers
export const ENERGIZERS = [
  { id: 'autonomy', label: 'Autonomy & Ownership', icon: '🎯', description: 'Freedom to make decisions' },
  { id: 'impact', label: 'Visible Impact', icon: '📈', description: 'Seeing results of your work' },
  { id: 'learning', label: 'Constant Learning', icon: '🧠', description: 'Growth and new challenges' },
  { id: 'collaboration', label: 'Team Collaboration', icon: '🤝', description: 'Working with great people' },
  { id: 'creativity', label: 'Creative Freedom', icon: '🎨', description: 'Space to innovate' },
  { id: 'recognition', label: 'Recognition & Growth', icon: '⭐', description: 'Career advancement' },
  { id: 'innovation', label: 'Innovation', icon: '💡', description: 'Cutting-edge work' },
  { id: 'mentorship', label: 'Mentoring Others', icon: '🌟', description: 'Developing talent' },
  { id: 'variety', label: 'Variety & Challenge', icon: '🎲', description: 'Never boring' },
  { id: 'mission', label: 'Mission-Driven Work', icon: '🌍', description: 'Making a difference' },
];

// Work drainers (deal-breakers)
export const DRAINERS = [
  { id: 'micromanagement', label: 'Micromanagement', icon: '🔍', severity: 'high' },
  { id: 'bureaucracy', label: 'Heavy Bureaucracy', icon: '📋', severity: 'high' },
  { id: 'politics', label: 'Office Politics', icon: '🎭', severity: 'high' },
  { id: 'isolation', label: 'Working in Isolation', icon: '🏝️', severity: 'medium' },
  { id: 'meetings', label: 'Excessive Meetings', icon: '📅', severity: 'medium' },
  { id: 'unclear', label: 'Unclear Expectations', icon: '❓', severity: 'high' },
  { id: 'legacy', label: 'Legacy Systems', icon: '🏚️', severity: 'low' },
  { id: 'oncall', label: '24/7 On-Call', icon: '📟', severity: 'high' },
  { id: 'travel', label: 'Constant Travel', icon: '✈️', severity: 'medium' },
  { id: 'stagnation', label: 'No Growth Path', icon: '📉', severity: 'high' },
];

// Work style preferences
export const WORK_STYLES = [
  { id: 'remote', label: 'Fully Remote', description: 'Work from anywhere', icon: '🏠' },
  { id: 'hybrid', label: 'Hybrid', description: 'Best of both worlds', icon: '🔄' },
  { id: 'office', label: 'In-Office', description: 'Collaborative environment', icon: '🏢' },
  { id: 'flexible', label: 'Flexible', description: 'Open to anything', icon: '✨' },
];

// Job search urgency
export const URGENCY_OPTIONS = [
  { id: 'asap', label: 'Ready Now', description: 'Actively interviewing', icon: '🔥', priority: 1 },
  { id: 'soon', label: '1-3 Months', description: 'Open to opportunities', icon: '👀', priority: 2 },
  { id: 'exploring', label: '3-6 Months', description: 'Casually exploring', icon: '🌱', priority: 3 },
  { id: 'passive', label: 'Perfect Fit Only', description: "Won't settle", icon: '💎', priority: 4 },
];

// Dream companies
export const DREAM_COMPANIES = {
  faang: ['Google', 'Apple', 'Amazon', 'Meta', 'Netflix'],
  techGiants: ['Microsoft', 'Salesforce', 'Adobe', 'Oracle', 'IBM', 'SAP'],
  hotStartups: ['Stripe', 'OpenAI', 'Anthropic', 'Figma', 'Notion', 'Vercel', 'Linear', 'Datadog', 'Snowflake', 'Databricks'],
  finance: ['Goldman Sachs', 'JP Morgan', 'Citadel', 'Two Sigma', 'Jane Street'],
};

export const DREAM_COMPANIES_FLAT = Object.values(DREAM_COMPANIES).flat();

// ============================================================================
// JOB BOARDS
// ============================================================================

export const JOB_BOARDS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'in',
    color: '#0A66C2',
    required: true,
    importance: 'Essential',
    description: 'Where most professional jobs are posted',
    setupTime: '3 min',
    steps: [
      'Open LinkedIn Jobs → Job Alerts',
      'Search your target role and location',
      'Click "Set alert" → "Daily email"',
      'Add forwarding to jobs@zjobconcierge.com',
    ],
  },
  {
    id: 'indeed',
    name: 'Indeed',
    icon: '🔍',
    color: '#2164F3',
    required: true,
    importance: 'Essential',
    description: 'Largest job search engine globally',
    setupTime: '2 min',
    steps: [
      'Go to Indeed.com → Find Jobs',
      'Search your role and location',
      'Click "Get notified" → Daily',
      'Forward alerts to jobs@zjobconcierge.com',
    ],
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    icon: '🚪',
    color: '#0CAA41',
    required: false,
    importance: 'Recommended',
    description: 'Jobs with salary transparency',
    setupTime: '2 min',
    steps: [
      'Set up job alerts on Glassdoor',
      'Configure daily email frequency',
      'Add forwarding to jobs@zjobconcierge.com',
    ],
  },
];

// ============================================================================
// PACKET DOCUMENTS
// ============================================================================

export const PACKET_DOCUMENTS = [
  { 
    id: 'resume',
    icon: '📄', 
    name: 'Tailored Resume', 
    extension: '.docx', 
    color: '#4A9FFF',
    description: 'ATS-optimized for this specific role',
  },
  { 
    id: 'cover',
    icon: '✉️', 
    name: 'Cover Letter', 
    extension: '.docx', 
    color: '#A78BFA',
    description: 'Personalized to company & role',
  },
  { 
    id: 'prep',
    icon: '🎯', 
    name: 'Interview Prep', 
    extension: '.pdf', 
    color: '#3CFFD0',
    description: 'Role-specific questions & answers',
  },
  { 
    id: 'thankyou',
    icon: '🙏', 
    name: 'Thank-You Email', 
    extension: '.docx', 
    color: '#FB7185',
    description: 'Post-interview follow-up template',
  },
  { 
    id: 'flashcards',
    icon: '🎴', 
    name: 'Flashcards', 
    extension: '.pdf', 
    color: '#FFD93D',
    description: 'Quick-review interview cards',
    vipOnly: true,
  },
  { 
    id: 'company',
    icon: '🏢', 
    name: 'Company Overview', 
    extension: '.pdf', 
    color: '#22D3EE',
    description: 'Deep research & culture insights',
    vipOnly: true,
  },
];

// ============================================================================
// FAQ
// ============================================================================

export const PRICING_FAQS = [
  {
    id: 'trial',
    question: "What's included in the free trial?",
    answer: "5 complete application packets per day for 7 days. That's 35 tailored resumes, cover letters, and interview prep materials. No credit card required—just start using it.",
  },
  {
    id: 'packet',
    question: "What exactly is a 'packet'?",
    answer: "Each packet is a complete application kit tailored to one specific job: a customized resume, personalized cover letter, and interview prep questions. Higher tiers include company research, flashcards, and salary data.",
  },
  {
    id: 'switch',
    question: 'Can I switch plans later?',
    answer: "Absolutely. Upgrade instantly to get more daily applications. Downgrade at any billing cycle end. No penalties, no questions asked.",
  },
  {
    id: 'speed',
    question: 'How quickly do I get my packets?',
    answer: "Most packets are ready in 2-3 minutes. Executive members get priority processing during high-volume periods.",
  },
  {
    id: 'more',
    question: 'What if I need more than 15 jobs per day?',
    answer: "Enterprise ($299/mo) handles 50 jobs daily. Agency ($999/mo) scales to 200. Contact us for custom volume.",
  },
  {
    id: 'cancel',
    question: 'How do I cancel?',
    answer: "One click in settings. Your access continues until the billing period ends. We're confident you'll stay, but you're never locked in.",
  },
];

// ============================================================================
// TRUST SIGNALS
// ============================================================================

export const TRUST_BADGES = [
  { id: 'secure', icon: '🔒', text: 'Bank-grade security', description: 'Your data is encrypted' },
  { id: 'instant', icon: '⚡', text: 'Instant delivery', description: 'Packets in minutes' },
  { id: 'cancel', icon: '🔓', text: 'Cancel anytime', description: 'No commitments' },
  { id: 'support', icon: '💬', text: '24/7 support', description: "We're here to help" },
];

export const SOCIAL_PROOF = {
  usersTotal: '10,000+',
  packetsGenerated: '2.5M+',
  interviewRate: '85%',
  avgTimeToInterview: '12 days',
  rating: 4.9,
  reviews: 2400,
};

// ============================================================================
// REGIONS
// ============================================================================

export const SUPPORTED_REGIONS = [
  { id: 'usa', name: 'United States', flag: '🇺🇸', locale: 'en-US', currency: 'USD' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', locale: 'en-CA', currency: 'CAD' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', locale: 'en-GB', currency: 'GBP' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', locale: 'de-DE', currency: 'EUR' },
  { id: 'france', name: 'France', flag: '🇫🇷', locale: 'fr-FR', currency: 'EUR' },
  { id: 'eu', name: 'EU (Other)', flag: '🇪🇺', locale: 'en-EU', currency: 'EUR' },
];

// ============================================================================
// CONFIGURATION
// ============================================================================

export const CONFIG = {
  // Email for job forwarding
  forwardingEmail: 'jobs@zjobconcierge.com',
  
  // Annual discount
  annualDiscount: 0.20,
  
  // Data retention
  dataRetentionDays: 90,
  
  // Rate limits
  maxPacketsPerMinute: 5,
  
  // File limits
  maxResumeSize: 5 * 1024 * 1024, // 5MB
  allowedResumeTypes: ['.pdf', '.doc', '.docx'],
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    verify: '/api/auth/verify',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  user: {
    profile: '/api/user/profile',
    preferences: '/api/user/preferences',
    subscription: '/api/user/subscription',
    updateProfile: '/api/user/profile',
  },
  jobs: {
    matches: '/api/jobs/matches',
    rejected: '/api/jobs/rejected',
    stats: '/api/jobs/stats',
    forcePacket: '/api/jobs/force-packet',
  },
  packets: {
    list: '/api/packets',
    get: '/api/packets/:id',
    download: '/api/packets/:id/download',
    downloadAll: '/api/packets/:id/download-all',
    generate: '/api/packets/generate',
  },
  checkout: {
    createSession: '/api/checkout/session',
    verifyPayment: '/api/checkout/verify',
    webhook: '/api/checkout/webhook',
    portal: '/api/checkout/portal',
  },
  analytics: {
    overview: '/api/analytics/overview',
    weekly: '/api/analytics/weekly',
    export: '/api/analytics/export',
  },
};

// ============================================================================
// COPY SNIPPETS (Conversion-optimized)
// ============================================================================

export const COPY = {
  hero: {
    headline: 'Apply to 300 jobs this month.',
    subheadline: 'AI tailors your resume, cover letter, and interview prep for each one.',
    cta: 'Start Free Trial',
    trust: 'No credit card required · 5 applications/day for 7 days',
  },
  
  valueProps: {
    time: {
      headline: 'Hours saved, not spent',
      description: 'What takes 45 minutes per application now takes 12 seconds.',
    },
    quality: {
      headline: 'Every application, tailored',
      description: "No more generic resumes. Each one speaks directly to what they're looking for.",
    },
    results: {
      headline: '85% interview rate',
      description: 'Our users get callbacks. A lot of them.',
    },
  },
  
  checkout: {
    processing: 'Securing your spot...',
    success: "You're in. Let's get you hired.",
    error: 'Something went wrong. Please try again.',
  },
  
  onboarding: {
    welcome: "Let's build your unfair advantage",
    complete: 'Your profile is ready. First matches arrive within 24 hours.',
  },
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  PLANS,
  PLAN_ORDER,
  CONSUMER_PLANS,
  ENTERPRISE_PLANS,
  getPrice,
  getPlanWithPrice,
  COMPARISON_CATEGORIES,
  ONBOARDING_STEPS,
  CAREER_STAGES,
  SUPERPOWERS,
  ENERGIZERS,
  DRAINERS,
  WORK_STYLES,
  URGENCY_OPTIONS,
  DREAM_COMPANIES,
  DREAM_COMPANIES_FLAT,
  JOB_BOARDS,
  PACKET_DOCUMENTS,
  PRICING_FAQS,
  TRUST_BADGES,
  SOCIAL_PROOF,
  SUPPORTED_REGIONS,
  CONFIG,
  API,
  COPY,
};
