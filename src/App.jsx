// App.jsx - Main Application Router
// Place in: src/App.jsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// ==================== PAGE IMPORTS ====================
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import JobConciergeCheckoutFlow from './pages/JobConciergeCheckoutFlow';
import TryDemo from './pages/TryDemo';

// ==================== SCROLL TO TOP ====================
// Automatically scrolls to top when navigating between pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// ==================== PROTECTED ROUTE ====================
// Redirects to login if user is not authenticated
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('jc_user_email');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// ==================== AUTH REDIRECT ====================
// Redirects logged-in users away from login page to dashboard
const AuthRedirect = ({ children }) => {
  const isLoggedIn = localStorage.getItem('jc_user_email');
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// ==================== MAIN APP ====================
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        
        {/* Landing & Marketing Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/services" element={<Services />} />
        
        {/* Try Demo - Telegram Bot Access */}
        <Route path="/try-demo" element={<TryDemo />} />
        
        {/* Checkout Flow - Stripe Integration */}
        <Route path="/checkout" element={<JobConciergeCheckoutFlow />} />
        
        {/* ========== AUTH ROUTES ========== */}
        
        {/* Login - Redirects to dashboard if already logged in */}
        <Route 
          path="/login" 
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          } 
        />
        
        {/* ========== PROTECTED ROUTES ========== */}
        
        {/* Dashboard - Requires authentication */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* ========== REDIRECTS ========== */}
        
        {/* Legacy/alternate URLs */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/demo" element={<Navigate to="/try-demo" replace />} />
        <Route path="/try" element={<Navigate to="/try-demo" replace />} />
        <Route path="/plans" element={<Navigate to="/pricing" replace />} />
        <Route path="/subscribe" element={<Navigate to="/checkout" replace />} />
        <Route path="/signup" element={<Navigate to="/checkout?plan=free" replace />} />
        <Route path="/register" element={<Navigate to="/checkout?plan=free" replace />} />
        <Route path="/get-started" element={<Navigate to="/checkout?plan=free" replace />} />
        
        {/* 404 - Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
