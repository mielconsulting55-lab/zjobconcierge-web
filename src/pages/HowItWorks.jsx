// HowItWorks.jsx
// Detailed how it works page - Mobile responsive with EN/FR
// Place in: src/pages/HowItWorks.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const translations = {
  en: {
    title: 'How Job Concierge Works',
    subtitle: 'Automate your job applications in 3 simple steps',
    step1: {
      num: 'Step 1',
      title: 'Forward Your Job Alerts',
      desc: 'Simply forward your job alert emails to our system. We support all major job boards.',
      details: [
        'Forward emails from LinkedIn, Indeed, Glassdoor, ZipRecruiter, and more',
        'Set up automatic forwarding rules in your email client',
        'Or manually forward individual job alerts as you receive them',
        'We process emails within minutes of receiving them',
      ],
      tip: 'Pro tip: Set up an auto-forward rule to save time!',
    },
    step2: {
      num: 'Step 2',
      title: 'AI Analyzes & Matches',
      desc: 'Our advanced AI reads each job posting and compares it to your profile.',
      details: [
        'Extracts job requirements, skills, and qualifications',
        'Compares against your resume and preferences',
        'Calculates a match score (we only create packets for 70%+ matches)',
        'Identifies key keywords for ATS optimization',
      ],
      tip: 'Our AI achieves 94% accuracy in job matching!',
    },
    step3: {
      num: 'Step 3',
      title: 'Receive Your Packets',
      desc: 'Get professionally crafted application materials delivered to your inbox.',
      details: [
        'Tailored resume highlighting relevant experience',
        'Personalized cover letter for each job',
        'Interview preparation with likely questions',
        'Company research and insights (Pro+ plans)',
      ],
      tip: 'Most users see more callbacks within the first week!',
    },
    email: 'Forward your job alerts to:',
    emailAddress: 'admin@zjobconcierge.com',
    ctaTitle: 'Ready to Get Started?',
    ctaBtn: 'Start Free Trial',
    ctaNote: '7 days free • No credit card spam',
  },
  fr: {
    title: 'Comment Fonctionne Job Concierge',
    subtitle: 'Automatisez vos candidatures en 3 étapes simples',
    step1: {
      num: 'Étape 1',
      title: 'Transférez vos Alertes Emploi',
      desc: 'Transférez simplement vos emails d\'alertes à notre système. Nous supportons tous les sites d\'emploi.',
      details: [
        'Transférez les emails de LinkedIn, Indeed, Glassdoor, ZipRecruiter, etc.',
        'Configurez des règles de transfert automatique dans votre client email',
        'Ou transférez manuellement les alertes individuelles',
        'Nous traitons les emails en quelques minutes',
      ],
      tip: 'Astuce: Configurez un transfert automatique pour gagner du temps!',
    },
    step2: {
      num: 'Étape 2',
      title: 'L\'IA Analyse et Sélectionne',
      desc: 'Notre IA avancée lit chaque offre et la compare à votre profil.',
      details: [
        'Extrait les exigences, compétences et qualifications',
        'Compare avec votre CV et préférences',
        'Calcule un score de correspondance (nous créons des dossiers pour 70%+ seulement)',
        'Identifie les mots-clés pour l\'optimisation ATS',
      ],
      tip: 'Notre IA atteint 94% de précision dans le matching!',
    },
    step3: {
      num: 'Étape 3',
      title: 'Recevez vos Documents',
      desc: 'Recevez des documents professionnels livrés dans votre boîte mail.',
      details: [
        'CV adapté mettant en valeur l\'expérience pertinente',
        'Lettre de motivation personnalisée pour chaque emploi',
        'Préparation d\'entretien avec questions probables',
        'Recherche et insights sur l\'entreprise (plans Pro+)',
      ],
      tip: 'La plupart des utilisateurs voient plus de rappels dès la première semaine!',
    },
    email: 'Transférez vos alertes à:',
    emailAddress: 'admin@zjobconcierge.com',
    ctaTitle: 'Prêt à Commencer?',
    ctaBtn: 'Essai Gratuit',
    ctaNote: '7 jours gratuits • Pas de spam',
  },
};

const HowItWorks = () => {
  const [lang, setLang] = useState('en');
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
      padding: '60px 20px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, rgba(60,255,208,0.05) 0%, transparent 100%)',
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
    stepsContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    stepCard: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '24px',
      padding: '32px 24px',
      marginBottom: '24px',
    },
    stepHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
      marginBottom: '24px',
    },
    stepNum: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, rgba(60,255,208,0.2), rgba(60,255,208,0.05))',
      border: '1px solid rgba(60,255,208,0.3)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '700',
      color: '#3CFFD0',
      flexShrink: 0,
    },
    stepInfo: {
      flex: 1,
    },
    stepLabel: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#3CFFD0',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '8px',
    },
    stepTitle: {
      fontSize: 'clamp(20px, 4vw, 24px)',
      fontWeight: '600',
      marginBottom: '8px',
    },
    stepDesc: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)',
      lineHeight: '1.6',
    },
    detailsList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 20px 0',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      fontSize: '15px',
      color: 'rgba(255,255,255,0.7)',
      lineHeight: '1.5',
    },
    checkIcon: {
      color: '#3CFFD0',
      fontSize: '16px',
      marginTop: '2px',
      flexShrink: 0,
    },
    tipBox: {
      background: 'rgba(60,255,208,0.1)',
      border: '1px solid rgba(60,255,208,0.2)',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.8)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    emailSection: {
      textAlign: 'center',
      padding: '40px 20px',
      background: 'rgba(255,255,255,0.02)',
      margin: '40px 0',
      borderRadius: '20px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    emailLabel: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '12px',
    },
    emailBox: {
      display: 'inline-block',
      padding: '16px 32px',
      background: 'rgba(60,255,208,0.1)',
      border: '1px solid rgba(60,255,208,0.3)',
      borderRadius: '12px',
      fontSize: 'clamp(16px, 4vw, 20px)',
      fontWeight: '600',
      color: '#3CFFD0',
      fontFamily: 'monospace',
    },
    ctaSection: {
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
      border: 'none',
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

  const steps = [t.step1, t.step2, t.step3];
  const icons = ['📧', '🤖', '📦'];

  return (
    <div style={styles.page}>
      <Navbar lang={lang} setLang={handleSetLang} />

      <section style={styles.hero}>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
      </section>

      <div style={styles.stepsContainer}>
        {steps.map((step, i) => (
          <div key={i} style={styles.stepCard}>
            <div style={styles.stepHeader}>
              <div style={styles.stepNum}>{icons[i]}</div>
              <div style={styles.stepInfo}>
                <div style={styles.stepLabel}>{step.num}</div>
                <h2 style={styles.stepTitle}>{step.title}</h2>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>

            <ul style={styles.detailsList}>
              {step.details.map((detail, j) => (
                <li key={j} style={styles.detailItem}>
                  <span style={styles.checkIcon}>✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div style={styles.tipBox}>
              <span>💡</span>
              <span>{step.tip}</span>
            </div>
          </div>
        ))}

        <div style={styles.emailSection}>
          <p style={styles.emailLabel}>{t.email}</p>
          <div style={styles.emailBox}>{t.emailAddress}</div>
        </div>
      </div>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>{t.ctaTitle}</h2>
        <Link to="/checkout?plan=free" style={styles.ctaBtn}>
          {t.ctaBtn} →
        </Link>
        <p style={styles.ctaNote}>{t.ctaNote}</p>
      </section>
    </div>
  );
};

export default HowItWorks;
