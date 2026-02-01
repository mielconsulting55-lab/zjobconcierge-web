// Services.jsx
// Services/Add-ons page - shown after logout to encourage re-engagement
// Mobile responsive with EN/FR
// Place in: src/pages/Services.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const translations = {
  en: {
    title: 'Supercharge Your Job Search',
    subtitle: 'Premium services to help you land your dream job faster',
    loggedOut: 'You\'ve been signed out successfully',
    backToDashboard: 'Back to Dashboard',
    services: [
      {
        icon: '🚀',
        name: 'Priority Processing',
        desc: 'Jump the queue! Get your application packets processed first, delivered within 2 hours instead of daily batch.',
        price: '$9/week',
        features: ['2-hour turnaround', 'Weekend processing', 'Email notifications'],
        popular: true,
      },
      {
        icon: '📝',
        name: 'Resume Review',
        desc: 'Get your resume reviewed by our career experts. Receive detailed feedback and optimization suggestions.',
        price: '$29 one-time',
        features: ['Expert review', 'Detailed feedback', 'Keyword optimization', 'ATS score report'],
        popular: false,
      },
      {
        icon: '🎯',
        name: 'LinkedIn Optimization',
        desc: 'We\'ll optimize your LinkedIn profile to attract more recruiters and match our AI-generated applications.',
        price: '$49 one-time',
        features: ['Profile rewrite', 'Headline optimization', 'Keywords strategy', 'Connection tips'],
        popular: false,
      },
      {
        icon: '💼',
        name: 'Interview Coaching',
        desc: 'One-on-one session with a career coach to prepare for your upcoming interviews.',
        price: '$79/session',
        features: ['60-min session', 'Mock interviews', 'Feedback & tips', 'Follow-up notes'],
        popular: false,
      },
      {
        icon: '📊',
        name: 'Salary Negotiation Kit',
        desc: 'Data-driven salary insights and negotiation scripts for your target role and location.',
        price: '$19 one-time',
        features: ['Salary data', 'Negotiation scripts', 'Counter-offer templates', 'Benefits checklist'],
        popular: false,
      },
      {
        icon: '🎁',
        name: 'VIP Bundle',
        desc: 'Get everything: Priority Processing + Resume Review + LinkedIn Optimization at a discounted rate.',
        price: '$99/month',
        features: ['All premium features', '30% savings', 'Priority support', 'Monthly check-in'],
        popular: true,
      },
    ],
    cta: 'Add to Plan',
    contact: 'Questions? Contact us',
    upgradeCta: 'Upgrade Your Plan',
    upgradeDesc: 'Unlock more jobs per day and premium features',
    seePricing: 'See Pricing Plans',
    footer: '© 2025 Job Concierge. All rights reserved.',
  },
  fr: {
    title: 'Boostez Votre Recherche d\'Emploi',
    subtitle: 'Services premium pour décrocher votre job de rêve plus rapidement',
    loggedOut: 'Vous avez été déconnecté avec succès',
    backToDashboard: 'Retour au Tableau de bord',
    services: [
      {
        icon: '🚀',
        name: 'Traitement Prioritaire',
        desc: 'Passez en priorité! Recevez vos dossiers en 2 heures au lieu du traitement quotidien.',
        price: '9$/semaine',
        features: ['Délai 2 heures', 'Traitement week-end', 'Notifications email'],
        popular: true,
      },
      {
        icon: '📝',
        name: 'Révision de CV',
        desc: 'Faites réviser votre CV par nos experts. Recevez des retours détaillés et suggestions d\'optimisation.',
        price: '29$ unique',
        features: ['Révision expert', 'Retours détaillés', 'Optimisation mots-clés', 'Score ATS'],
        popular: false,
      },
      {
        icon: '🎯',
        name: 'Optimisation LinkedIn',
        desc: 'Nous optimiserons votre profil LinkedIn pour attirer plus de recruteurs.',
        price: '49$ unique',
        features: ['Réécriture profil', 'Optimisation titre', 'Stratégie mots-clés', 'Conseils connexions'],
        popular: false,
      },
      {
        icon: '💼',
        name: 'Coaching Entretien',
        desc: 'Session individuelle avec un coach carrière pour préparer vos entretiens.',
        price: '79$/session',
        features: ['Session 60 min', 'Entretiens simulés', 'Retours & conseils', 'Notes de suivi'],
        popular: false,
      },
      {
        icon: '📊',
        name: 'Kit Négociation Salaire',
        desc: 'Données salariales et scripts de négociation pour votre rôle et localisation cibles.',
        price: '19$ unique',
        features: ['Données salaires', 'Scripts négociation', 'Modèles contre-offre', 'Checklist avantages'],
        popular: false,
      },
      {
        icon: '🎁',
        name: 'Bundle VIP',
        desc: 'Tout inclus: Traitement Prioritaire + Révision CV + Optimisation LinkedIn à prix réduit.',
        price: '99$/mois',
        features: ['Toutes les fonctionnalités', '30% d\'économies', 'Support prioritaire', 'Check-in mensuel'],
        popular: true,
      },
    ],
    cta: 'Ajouter au Plan',
    contact: 'Questions? Contactez-nous',
    upgradeCta: 'Améliorez Votre Plan',
    upgradeDesc: 'Débloquez plus d\'emplois par jour et fonctionnalités premium',
    seePricing: 'Voir les Plans Tarifaires',
    footer: '© 2025 Job Concierge. Tous droits réservés.',
  },
};

const Services = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const isLoggedIn = localStorage.getItem('jc_user_email');

  useEffect(() => {
    const savedLang = localStorage.getItem('jc_lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('jc_lang', newLang);
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#08080f',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#fff',
    },
    loggedOutBanner: {
      background: 'rgba(60,255,208,0.1)',
      borderBottom: '1px solid rgba(60,255,208,0.2)',
      padding: '16px 20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    },
    bannerText: {
      fontSize: '14px',
      color: '#3CFFD0',
    },
    bannerBtn: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: '#3CFFD0',
      border: 'none',
      borderRadius: '8px',
      textDecoration: 'none',
    },
    hero: {
      padding: '60px 20px 40px',
      textAlign: 'center',
    },
    title: {
      fontSize: 'clamp(28px, 6vw, 44px)',
      fontWeight: '700',
      marginBottom: '16px',
    },
    subtitle: {
      fontSize: '18px',
      color: 'rgba(255,255,255,0.5)',
      maxWidth: '500px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    card: (popular) => ({
      padding: '28px',
      background: popular ? 'linear-gradient(135deg, rgba(60,255,208,0.1), rgba(60,255,208,0.02))' : 'rgba(255,255,255,0.03)',
      border: popular ? '2px solid rgba(60,255,208,0.3)' : '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px',
      position: 'relative',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-10px',
      right: '20px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: '700',
      color: '#0a0a0f',
      background: '#3CFFD0',
      borderRadius: '20px',
    },
    cardIcon: {
      fontSize: '36px',
      marginBottom: '16px',
    },
    cardName: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    cardDesc: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    cardPrice: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#3CFFD0',
      marginBottom: '16px',
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 20px 0',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: 'rgba(255,255,255,0.6)',
      padding: '6px 0',
    },
    checkIcon: {
      color: '#3CFFD0',
      fontSize: '12px',
    },
    ctaBtn: {
      display: 'block',
      width: '100%',
      padding: '14px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    upgradeSection: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center',
    },
    upgradeBox: {
      padding: '32px',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(60,255,208,0.05))',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '20px',
    },
    upgradeTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '12px',
    },
    upgradeDesc: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '24px',
    },
    upgradeBtn: {
      display: 'inline-block',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      borderRadius: '12px',
      textDecoration: 'none',
    },
    footer: {
      textAlign: 'center',
      padding: '40px 20px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    footerText: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.3)',
    },
    contactLink: {
      display: 'block',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#3CFFD0',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar lang={lang} setLang={handleSetLang} />

      {/* Logged out banner */}
      {!isLoggedIn && (
        <div style={styles.loggedOutBanner}>
          <span style={styles.bannerText}>✓ {t.loggedOut}</span>
          <Link to="/login" style={styles.bannerBtn}>{t.backToDashboard}</Link>
        </div>
      )}

      <section style={styles.hero}>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
      </section>

      <div style={styles.grid}>
        {t.services.map((service, i) => (
          <div key={i} style={styles.card(service.popular)}>
            {service.popular && <div style={styles.popularBadge}>POPULAR</div>}
            <div style={styles.cardIcon}>{service.icon}</div>
            <h3 style={styles.cardName}>{service.name}</h3>
            <p style={styles.cardDesc}>{service.desc}</p>
            <div style={styles.cardPrice}>{service.price}</div>
            <ul style={styles.featuresList}>
              {service.features.map((f, j) => (
                <li key={j} style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button style={styles.ctaBtn}>{t.cta}</button>
          </div>
        ))}
      </div>

      <div style={styles.upgradeSection}>
        <div style={styles.upgradeBox}>
          <h2 style={styles.upgradeTitle}>{t.upgradeCta}</h2>
          <p style={styles.upgradeDesc}>{t.upgradeDesc}</p>
          <Link to="/pricing" style={styles.upgradeBtn}>{t.seePricing} →</Link>
        </div>
      </div>

      <footer style={styles.footer}>
        <a href="mailto:support@zjobconcierge.com" style={styles.contactLink}>
          {t.contact}
        </a>
        <p style={styles.footerText}>{t.footer}</p>
      </footer>
    </div>
  );
};

export default Services;
