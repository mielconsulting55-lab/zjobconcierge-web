// Navbar.jsx
// Shared navigation with mobile hamburger menu and EN/FR toggle
// Mobile-first responsive design

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Translations
const translations = {
  en: {
    howItWorks: 'How It Works',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    login: 'Login',
    getStarted: 'Get Started',
  },
  fr: {
    howItWorks: 'Comment ça marche',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'FAQ',
    login: 'Connexion',
    getStarted: 'Commencer',
  },
};

const Navbar = ({ lang = 'en', setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang];

  const navLinks = [
    { path: '/how-it-works', label: t.howItWorks },
    { path: '/features', label: t.features },
    { path: '/pricing', label: t.pricing },
    { path: '/faq', label: t.faq },
  ];

  const isActive = (path) => location.pathname === path;

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(8, 8, 15, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: '800',
      color: '#0a0a0f',
    },
    logoText: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#fff',
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    navLink: (active) => ({
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500',
      color: active ? '#3CFFD0' : 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'all 0.2s',
      background: active ? 'rgba(60,255,208,0.1)' : 'transparent',
    }),
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    langToggle: {
      display: 'flex',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    langBtn: (active) => ({
      padding: '8px 12px',
      fontSize: '12px',
      fontWeight: '600',
      color: active ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
      background: active ? '#3CFFD0' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    loginBtn: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#fff',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s',
    },
    ctaBtn: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
    },
    hamburgerLine: {
      width: '24px',
      height: '2px',
      background: '#fff',
      borderRadius: '2px',
      transition: 'all 0.3s',
    },
    mobileMenu: {
      position: 'fixed',
      top: '70px',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(8, 8, 15, 0.98)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
    },
    mobileNavLink: (active) => ({
      padding: '16px 20px',
      fontSize: '16px',
      fontWeight: '500',
      color: active ? '#3CFFD0' : '#fff',
      textDecoration: 'none',
      borderRadius: '12px',
      background: active ? 'rgba(60,255,208,0.1)' : 'rgba(255,255,255,0.05)',
      display: 'block',
    }),
    mobileBtns: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      paddingBottom: '40px',
    },
  };

  // Media query styles applied via className or inline check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-btns { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
      
      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>Z</div>
            <span style={styles.logoText}>JobConcierge</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={styles.navLink(isActive(link.path))}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div style={styles.rightSection}>
            {/* Language Toggle */}
            <div style={styles.langToggle}>
              <button
                style={styles.langBtn(lang === 'en')}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                style={styles.langBtn(lang === 'fr')}
                onClick={() => setLang('fr')}
              >
                FR
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="desktop-btns" style={{ display: 'flex', gap: '12px' }}>
              <Link to="/login" style={styles.loginBtn}>
                {t.login}
              </Link>
              <Link to="/checkout?plan=free" style={styles.ctaBtn}>
                {t.getStarted}
              </Link>
            </div>

            {/* Hamburger Menu */}
            <button
              style={{ ...styles.hamburger, display: 'none' }}
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span style={{
                ...styles.hamburgerLine,
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                ...styles.hamburgerLine,
                opacity: mobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                ...styles.hamburgerLine,
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu} className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={styles.mobileNavLink(isActive(link.path))}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div style={styles.mobileBtns}>
            <Link
              to="/login"
              style={{
                ...styles.loginBtn,
                display: 'block',
                textAlign: 'center',
                padding: '16px',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.login}
            </Link>
            <Link
              to="/checkout?plan=free"
              style={{
                ...styles.ctaBtn,
                display: 'block',
                textAlign: 'center',
                padding: '16px',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.getStarted}
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: '70px' }} />
    </>
  );
};

export default Navbar;
