// Pricing.jsx
// Pricing plans comparison - Mobile responsive with EN/FR
// Place in: src/pages/Pricing.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const translations = {
  en: {
    title: 'Simple, Transparent Pricing',
    subtitle: 'Choose the plan that fits your job search',
    monthly: 'Monthly',
    yearly: 'Yearly',
    savePercent: 'Save 20%',
    popular: 'MOST POPULAR',
    perMonth: '/month',
    perYear: '/year',
    jobsPerDay: 'jobs/day',
    features: 'Features:',
    getStarted: 'Get Started',
    startTrial: 'Start Free Trial',
    contactSales: 'Contact Sales',
    plans: [
      {
        name: 'Trial',
        price: 0,
        priceYearly: 0,
        jobs: 3,
        desc: 'Try it free for 7 days',
        features: [
          '3 jobs per day',
          'Resume generation',
          'Cover letter generation',
          'ATS optimization',
          '7-day access',
        ],
        cta: 'startTrial',
        popular: false,
      },
      {
        name: 'Basic',
        price: 19,
        priceYearly: 182,
        jobs: 5,
        desc: 'For casual job seekers',
        features: [
          '5 jobs per day',
          'Resume generation',
          'Cover letter generation',
          'ATS optimization',
          'Email support',
        ],
        cta: 'getStarted',
        popular: false,
      },
      {
        name: 'Pro',
        price: 39,
        priceYearly: 374,
        jobs: 15,
        desc: 'For active job seekers',
        features: [
          '15 jobs per day',
          'Everything in Basic',
          'Interview preparation',
          'Priority processing',
          'Match explanations',
        ],
        cta: 'getStarted',
        popular: true,
      },
      {
        name: 'VIP',
        price: 69,
        priceYearly: 662,
        jobs: 30,
        desc: 'For power users',
        features: [
          '30 jobs per day',
          'Everything in Pro',
          'Company research',
          'Direct support line',
          'Custom preferences',
        ],
        cta: 'getStarted',
        popular: false,
      },
    ],
    enterprise: {
      name: 'Enterprise',
      desc: 'For teams & organizations',
      features: [
        '100+ jobs per day',
        'Dedicated account manager',
        'Custom integrations',
        'Volume discounts',
        'SLA guarantee',
      ],
    },
    faqTitle: 'Questions?',
    faqLink: 'Check our FAQ',
    guarantee: '7-day money-back guarantee on all paid plans',
  },
  fr: {
    title: 'Tarifs Simples et Transparents',
    subtitle: 'Choisissez le plan adapté à votre recherche',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    savePercent: 'Économisez 20%',
    popular: 'PLUS POPULAIRE',
    perMonth: '/mois',
    perYear: '/an',
    jobsPerDay: 'emplois/jour',
    features: 'Inclus:',
    getStarted: 'Commencer',
    startTrial: 'Essai Gratuit',
    contactSales: 'Nous Contacter',
    plans: [
      {
        name: 'Essai',
        price: 0,
        priceYearly: 0,
        jobs: 3,
        desc: 'Essayez gratuitement 7 jours',
        features: [
          '3 emplois par jour',
          'Génération de CV',
          'Lettres de motivation',
          'Optimisation ATS',
          'Accès 7 jours',
        ],
        cta: 'startTrial',
        popular: false,
      },
      {
        name: 'Basic',
        price: 19,
        priceYearly: 182,
        jobs: 5,
        desc: 'Pour chercheurs occasionnels',
        features: [
          '5 emplois par jour',
          'Génération de CV',
          'Lettres de motivation',
          'Optimisation ATS',
          'Support email',
        ],
        cta: 'getStarted',
        popular: false,
      },
      {
        name: 'Pro',
        price: 39,
        priceYearly: 374,
        jobs: 15,
        desc: 'Pour chercheurs actifs',
        features: [
          '15 emplois par jour',
          'Tout du Basic',
          'Préparation entretien',
          'Traitement prioritaire',
          'Explications matching',
        ],
        cta: 'getStarted',
        popular: true,
      },
      {
        name: 'VIP',
        price: 69,
        priceYearly: 662,
        jobs: 30,
        desc: 'Pour utilisateurs intensifs',
        features: [
          '30 emplois par jour',
          'Tout du Pro',
          'Recherche entreprise',
          'Ligne support directe',
          'Préférences custom',
        ],
        cta: 'getStarted',
        popular: false,
      },
    ],
    enterprise: {
      name: 'Enterprise',
      desc: 'Pour équipes & organisations',
      features: [
        '100+ emplois par jour',
        'Gestionnaire dédié',
        'Intégrations custom',
        'Remises volume',
        'Garantie SLA',
      ],
    },
    faqTitle: 'Questions?',
    faqLink: 'Consultez notre FAQ',
    guarantee: 'Garantie remboursement 7 jours sur tous les plans payants',
  },
};

const Pricing = () => {
  const [lang, setLang] = useState('en');
  const [yearly, setYearly] = useState(false);
  const t = translations[lang];

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
      marginBottom: '32px',
    },
    toggle: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '6px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
    },
    toggleBtn: (active) => ({
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: active ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
      background: active ? '#3CFFD0' : 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    saveBadge: {
      padding: '4px 10px',
      fontSize: '11px',
      fontWeight: '700',
      color: '#3CFFD0',
      background: 'rgba(60,255,208,0.1)',
      borderRadius: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '20px',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    card: (popular) => ({
      padding: '32px 24px',
      background: popular ? 'linear-gradient(135deg, rgba(60,255,208,0.1), rgba(60,255,208,0.02))' : 'rgba(255,255,255,0.03)',
      border: popular ? '2px solid rgba(60,255,208,0.4)' : '1px solid rgba(255,255,255,0.06)',
      borderRadius: '24px',
      position: 'relative',
      transform: popular ? 'scale(1.02)' : 'none',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '6px 16px',
      fontSize: '11px',
      fontWeight: '700',
      color: '#0a0a0f',
      background: '#3CFFD0',
      borderRadius: '20px',
    },
    planName: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    planDesc: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '20px',
    },
    price: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px',
      marginBottom: '8px',
    },
    priceValue: {
      fontSize: '40px',
      fontWeight: '700',
    },
    pricePeriod: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.5)',
    },
    jobs: {
      padding: '8px 16px',
      background: 'rgba(60,255,208,0.1)',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#3CFFD0',
      display: 'inline-block',
      marginBottom: '24px',
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px 0',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 0',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.7)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    checkIcon: {
      color: '#3CFFD0',
      fontSize: '14px',
    },
    ctaBtn: (primary) => ({
      display: 'block',
      width: '100%',
      padding: '14px',
      fontSize: '15px',
      fontWeight: '600',
      color: primary ? '#0a0a0f' : '#fff',
      background: primary ? 'linear-gradient(135deg, #3CFFD0, #00D4AA)' : 'transparent',
      border: primary ? 'none' : '1px solid rgba(255,255,255,0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'none',
    }),
    enterprise: {
      maxWidth: '800px',
      margin: '0 auto 60px',
      padding: '32px 24px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    footer: {
      textAlign: 'center',
      padding: '40px 20px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    guarantee: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.4)',
      marginTop: '24px',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar lang={lang} setLang={handleSetLang} />

      <section style={styles.hero}>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.toggle}>
          <button
            style={styles.toggleBtn(!yearly)}
            onClick={() => setYearly(false)}
          >
            {t.monthly}
          </button>
          <button
            style={styles.toggleBtn(yearly)}
            onClick={() => setYearly(true)}
          >
            {t.yearly}
          </button>
          <span style={styles.saveBadge}>{t.savePercent}</span>
        </div>
      </section>

      <div style={styles.grid}>
        {t.plans.map((plan, i) => (
          <div key={i} style={styles.card(plan.popular)}>
            {plan.popular && <div style={styles.popularBadge}>{t.popular}</div>}
            
            <h3 style={styles.planName}>{plan.name}</h3>
            <p style={styles.planDesc}>{plan.desc}</p>
            
            <div style={styles.price}>
              <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)' }}>$</span>
              <span style={styles.priceValue}>
                {yearly ? Math.round(plan.priceYearly / 12) : plan.price}
              </span>
              <span style={styles.pricePeriod}>{t.perMonth}</span>
            </div>
            
            <div style={styles.jobs}>
              {plan.jobs} {t.jobsPerDay}
            </div>
            
            <ul style={styles.featuresList}>
              {plan.features.map((feature, j) => (
                <li key={j} style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link
              to={plan.price === 0 ? '/checkout?plan=free' : `/checkout?plan=${plan.name.toLowerCase()}`}
              style={styles.ctaBtn(plan.popular || plan.price === 0)}
            >
              {plan.price === 0 ? t.startTrial : t.getStarted}
            </Link>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={styles.enterprise}>
          <h3 style={{ ...styles.planName, marginBottom: '8px' }}>{t.enterprise.name}</h3>
          <p style={{ ...styles.planDesc, marginBottom: '24px' }}>{t.enterprise.desc}</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
            {t.enterprise.features.map((feature, i) => (
              <span key={i} style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
              }}>
                {feature}
              </span>
            ))}
          </div>
          
          <a href="mailto:sales@zjobconcierge.com" style={{
            ...styles.ctaBtn(true),
            width: 'auto',
            padding: '14px 32px',
          }}>
            {t.contactSales}
          </a>
        </div>
      </div>

      <section style={styles.footer}>
        <p>{t.faqTitle} <Link to="/faq" style={{ color: '#3CFFD0', textDecoration: 'none' }}>{t.faqLink} →</Link></p>
        <p style={styles.guarantee}>🛡️ {t.guarantee}</p>
      </section>
    </div>
  );
};

export default Pricing;
