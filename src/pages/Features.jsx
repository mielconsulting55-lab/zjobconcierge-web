// Features.jsx
// Features showcase page - Mobile responsive with EN/FR
// Place in: src/pages/Features.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const translations = {
  en: {
    title: 'Powerful Features',
    subtitle: 'Everything you need to automate your job search',
    categories: {
      automation: 'Automation',
      documents: 'Documents',
      matching: 'Smart Matching',
      support: 'Support',
    },
    features: [
      {
        cat: 'automation',
        icon: '📧',
        title: 'Email Forwarding',
        desc: 'Simply forward job alerts from any job board. We support LinkedIn, Indeed, Glassdoor, ZipRecruiter, and 50+ more platforms.',
      },
      {
        cat: 'automation',
        icon: '⚡',
        title: 'Daily Processing',
        desc: 'Our AI processes your job emails every day at 6 AM CT, ensuring fresh application packets are ready when you wake up.',
      },
      {
        cat: 'automation',
        icon: '🔄',
        title: 'Auto-Forward Rules',
        desc: 'Set up automatic forwarding in your email client once, and never think about it again. Your jobs flow in automatically.',
      },
      {
        cat: 'documents',
        icon: '📄',
        title: 'Tailored Resumes',
        desc: 'Each resume is customized to highlight the skills and experience most relevant to each specific job posting.',
      },
      {
        cat: 'documents',
        icon: '✉️',
        title: 'Personalized Cover Letters',
        desc: 'Compelling cover letters that address the company\'s needs and showcase why you\'re the perfect fit.',
      },
      {
        cat: 'documents',
        icon: '✓',
        title: 'ATS Optimization',
        desc: 'Every document is optimized for Applicant Tracking Systems, increasing your chances of getting past automated screening.',
      },
      {
        cat: 'documents',
        icon: '📑',
        title: 'Multiple Formats',
        desc: 'Receive your documents in both PDF and editable DOCX formats. Make any adjustments you need.',
      },
      {
        cat: 'matching',
        icon: '🎯',
        title: '94% Match Accuracy',
        desc: 'Our AI only creates packets for jobs that truly match your profile, saving you time on irrelevant applications.',
      },
      {
        cat: 'matching',
        icon: '🧠',
        title: 'Smart Filtering',
        desc: 'Set your preferences for job titles, industries, locations, and salary ranges. We filter out the rest.',
      },
      {
        cat: 'matching',
        icon: '📊',
        title: 'Match Scoring',
        desc: 'See exactly why each job was selected with detailed match scores and explanations.',
      },
      {
        cat: 'support',
        icon: '💼',
        title: 'Interview Prep',
        desc: 'Get likely interview questions and suggested answers based on the job requirements (Pro+ plans).',
      },
      {
        cat: 'support',
        icon: '🏢',
        title: 'Company Research',
        desc: 'Receive insights about the company, recent news, and culture to help you prepare (VIP+ plans).',
      },
      {
        cat: 'support',
        icon: '🌍',
        title: 'Multi-Language',
        desc: 'Full support for English and French applications across 9 countries in North America and Europe.',
      },
      {
        cat: 'support',
        icon: '🔒',
        title: 'Secure & Private',
        desc: 'Bank-level encryption, GDPR compliant. Your data is never shared with third parties.',
      },
    ],
    ctaTitle: 'Start Automating Today',
    ctaBtn: 'Get Started Free',
    ctaNote: '7-day free trial • Cancel anytime',
  },
  fr: {
    title: 'Fonctionnalités Puissantes',
    subtitle: 'Tout ce dont vous avez besoin pour automatiser votre recherche',
    categories: {
      automation: 'Automatisation',
      documents: 'Documents',
      matching: 'Matching Intelligent',
      support: 'Support',
    },
    features: [
      {
        cat: 'automation',
        icon: '📧',
        title: 'Transfert d\'Emails',
        desc: 'Transférez simplement les alertes de n\'importe quel site d\'emploi. LinkedIn, Indeed, Glassdoor, ZipRecruiter, et 50+ plateformes.',
      },
      {
        cat: 'automation',
        icon: '⚡',
        title: 'Traitement Quotidien',
        desc: 'Notre IA traite vos emails chaque jour à 6h CT, assurant des dossiers frais prêts à votre réveil.',
      },
      {
        cat: 'automation',
        icon: '🔄',
        title: 'Transfert Automatique',
        desc: 'Configurez le transfert automatique une fois dans votre client email, et n\'y pensez plus jamais.',
      },
      {
        cat: 'documents',
        icon: '📄',
        title: 'CV Personnalisés',
        desc: 'Chaque CV est adapté pour mettre en valeur les compétences pertinentes pour chaque offre spécifique.',
      },
      {
        cat: 'documents',
        icon: '✉️',
        title: 'Lettres de Motivation',
        desc: 'Des lettres convaincantes qui répondent aux besoins de l\'entreprise et montrent pourquoi vous êtes le candidat idéal.',
      },
      {
        cat: 'documents',
        icon: '✓',
        title: 'Optimisation ATS',
        desc: 'Chaque document est optimisé pour les systèmes de suivi des candidatures, augmentant vos chances.',
      },
      {
        cat: 'documents',
        icon: '📑',
        title: 'Formats Multiples',
        desc: 'Recevez vos documents en PDF et DOCX modifiable. Faites les ajustements nécessaires.',
      },
      {
        cat: 'matching',
        icon: '🎯',
        title: '94% de Précision',
        desc: 'Notre IA ne crée des dossiers que pour les emplois qui correspondent vraiment, vous faisant gagner du temps.',
      },
      {
        cat: 'matching',
        icon: '🧠',
        title: 'Filtrage Intelligent',
        desc: 'Définissez vos préférences de titres, industries, lieux et salaires. Nous filtrons le reste.',
      },
      {
        cat: 'matching',
        icon: '📊',
        title: 'Scores de Correspondance',
        desc: 'Voyez exactement pourquoi chaque emploi a été sélectionné avec des scores détaillés.',
      },
      {
        cat: 'support',
        icon: '💼',
        title: 'Préparation Entretien',
        desc: 'Questions d\'entretien probables et réponses suggérées basées sur les exigences (plans Pro+).',
      },
      {
        cat: 'support',
        icon: '🏢',
        title: 'Recherche Entreprise',
        desc: 'Recevez des insights sur l\'entreprise, actualités récentes et culture (plans VIP+).',
      },
      {
        cat: 'support',
        icon: '🌍',
        title: 'Multi-Langue',
        desc: 'Support complet anglais et français pour 9 pays en Amérique du Nord et Europe.',
      },
      {
        cat: 'support',
        icon: '🔒',
        title: 'Sécurisé et Privé',
        desc: 'Cryptage bancaire, conforme RGPD. Vos données ne sont jamais partagées.',
      },
    ],
    ctaTitle: 'Commencez à Automatiser',
    ctaBtn: 'Commencer Gratuitement',
    ctaNote: 'Essai gratuit de 7 jours • Annulez quand vous voulez',
  },
};

const Features = () => {
  const [lang, setLang] = useState('en');
  const [activeCat, setActiveCat] = useState('automation');
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('jc_lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('jc_lang', newLang);
  };

  const filteredFeatures = t.features.filter(f => f.cat === activeCat);

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#08080f',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#fff',
    },
    hero: {
      padding: '60px 20px',
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
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      padding: '0 20px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    tab: (active) => ({
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: active ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
      background: active ? '#3CFFD0' : 'rgba(255,255,255,0.05)',
      border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 20px 60px',
    },
    card: {
      padding: '28px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px',
      transition: 'all 0.2s',
    },
    cardIcon: {
      width: '56px',
      height: '56px',
      background: 'rgba(60,255,208,0.1)',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '26px',
      marginBottom: '20px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
    },
    cardDesc: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.5)',
      lineHeight: '1.6',
    },
    cta: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(135deg, rgba(60,255,208,0.08) 0%, rgba(99,102,241,0.05) 100%)',
    },
    ctaTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '24px',
    },
    ctaBtn: {
      display: 'inline-block',
      padding: '18px 40px',
      fontSize: '17px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      borderRadius: '14px',
      textDecoration: 'none',
      boxShadow: '0 10px 40px rgba(60,255,208,0.3)',
    },
    ctaNote: {
      marginTop: '16px',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.4)',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar lang={lang} setLang={handleSetLang} />

      <section style={styles.hero}>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
      </section>

      <div style={styles.tabs}>
        {Object.entries(t.categories).map(([key, label]) => (
          <button
            key={key}
            style={styles.tab(activeCat === key)}
            onClick={() => setActiveCat(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredFeatures.map((feature, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardIcon}>{feature.icon}</div>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>

      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>{t.ctaTitle}</h2>
        <Link to="/checkout?plan=free" style={styles.ctaBtn}>
          {t.ctaBtn} →
        </Link>
        <p style={styles.ctaNote}>{t.ctaNote}</p>
      </section>
    </div>
  );
};

export default Features;
