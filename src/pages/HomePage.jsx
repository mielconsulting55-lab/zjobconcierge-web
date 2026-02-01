// HomePage.jsx - Premium Landing Page with Telegram Demo
// Converted from Framer - Mobile Responsive with EN/FR
// Place in: src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      features: 'Features',
      pricing: 'Pricing',
      faq: 'FAQ',
      tryLive: 'Try It Live',
      getStarted: 'Get Started',
    },
    hero: {
      badge: 'job seekers landed roles this month',
      title1: 'Stop applying.',
      title2: 'Start landing.',
      subtitle: 'Your AI concierge analyzes your profile, matches perfect opportunities, and delivers complete application packets — tailored resume, cover letter, and interview prep — every single day.',
      cta: 'Start Free Today',
      stat1: '< 3 min',
      stat1Label: 'Packet generation',
      stat2: '85%',
      stat2Label: 'Interview rate',
      stat3: '10K+',
      stat3Label: 'Jobs matched daily',
    },
    telegram: {
      title: 'Try It Live',
      subtitle: 'Instant Demo',
      free: 'Free',
      match: 'match! Your packet is ready:',
      generatedIn: 'Generated in',
      tryingNow: 'trying now',
      ctaButton: 'Try It Live — Instant Demo',
      ctaNote: 'No signup • No credit card • Results in 12 seconds',
    },
    howItWorks: {
      badge: 'How It Works',
      title: 'From signup to dream job in 4 steps',
      subtitle: 'Our AI handles the heavy lifting while you focus on what matters - preparing for interviews.',
      steps: [
        { icon: '👤', title: 'Build Your Profile', desc: 'Answer smart questions about your experience and goals. Upload your resume - our AI does the rest.' },
        { icon: '🔗', title: 'Connect Job Boards', desc: 'Set up auto-forwarding from LinkedIn, Indeed, Glassdoor. We guide you step-by-step.' },
        { icon: '🤖', title: 'AI Matches Daily', desc: 'Every day, our AI reviews jobs, scores matches, and selects the best opportunities for you.' },
        { icon: '📦', title: 'Receive Packets', desc: 'Get complete packets: tailored resume, cover letter, company research, and interview prep.' },
      ],
    },
    features: {
      badge: 'Features',
      title: 'Everything you need to land your dream job',
      subtitle: 'Advanced AI capabilities that give you an unfair advantage in today\'s market.',
      items: [
        { icon: '🎯', title: 'Smart Profile Analysis', desc: 'Deep analysis of your experience, skills, and goals to understand exactly what you\'re looking for.' },
        { icon: '✓', title: 'Intelligent Matching', desc: 'Advanced algorithms score each job against your profile, showing only the best opportunities.' },
        { icon: '📄', title: 'Tailored Resumes', desc: 'Every resume is customized to highlight skills most relevant to each specific job posting.' },
        { icon: '✉️', title: 'Custom Cover Letters', desc: 'Personalized letters that speak directly to the company\'s needs and your unique value.' },
        { icon: '🎤', title: 'Interview Preparation', desc: 'Company-specific questions, talking points, and research briefs to walk in fully prepared.' },
        { icon: '📊', title: 'Career Insights', desc: 'Recommendations on skills to develop, industries to explore, and salary benchmarks.' },
      ],
    },
    tryDemo: {
      icon: '⚡',
      title: 'See it in action',
      subtitle: 'Get instant Telegram bot access. Paste any job posting, receive a complete packet - free.',
      cta: 'Try It Live — Get Access Code',
      benefits: ['Instant Telegram access', 'Full packet generation', 'AI-tailored resume', 'No credit card required'],
    },
    pricing: {
      badge: 'Pricing',
      title: 'Choose your path to success',
      subtitle: 'Flexible plans for every stage of your job search journey.',
      mo: '/mo',
      viewFull: 'View Full Pricing & Compare Plans',
      mostPopular: 'Most Popular',
      plans: [
        { name: 'Freemium', planId: 'free', price: '$0', desc: 'Perfect to get started', features: ['5 packets per day', 'Basic job matching', 'Standard templates', 'Email support'], buttonText: 'Start Free' },
        { name: 'Basic', planId: 'basic', price: '$19', desc: 'For active job seekers', features: ['15 packets per day', 'Advanced matching', 'Premium templates', 'Priority support'], buttonText: 'Get Basic' },
        { name: 'Pro', planId: 'pro', price: '$39', desc: 'Maximum job search power', features: ['50 packets per day', 'AI career coaching', 'Interview prep included', '24/7 chat support'], buttonText: 'Get Pro', popular: true },
        { name: 'VIP', planId: 'vip', price: '$79', desc: 'White-glove service', features: ['Unlimited packets', '1-on-1 AI strategist', 'Company research', 'LinkedIn optimization'], buttonText: 'Get VIP' },
      ],
    },
    testimonials: {
      badge: 'Success Stories',
      title: 'Trusted by job seekers worldwide',
      items: [
        { text: 'I was spending 4 hours daily on applications. Now I spend 30 minutes reviewing perfectly tailored packets. Landed my dream job at Microsoft in 3 weeks!', name: 'Sarah K.', role: 'Product Manager, Microsoft' },
        { text: 'The interview prep alone is worth 10x the price. Every packet comes with company-specific questions. I walked into interviews feeling like I already worked there.', name: 'Marcus R.', role: 'Software Engineer, Stripe' },
        { text: 'As a career changer, I didn\'t know how to position myself. ZJobConcierge analyzed my transferable skills and helped me pivot into tech successfully.', name: 'Jennifer L.', role: 'Data Analyst, Shopify' },
      ],
    },
    faq: {
      badge: 'FAQ',
      title: 'Questions? We\'ve got answers.',
      items: [
        { q: 'How does the auto-forwarding work?', a: 'We provide step-by-step guides for setting up email auto-forwarding from LinkedIn, Indeed, and Glassdoor. Once configured, job alerts automatically flow to our AI for analysis.' },
        { q: 'What\'s included in an application packet?', a: 'Each packet includes: a tailored resume, personalized cover letter, company research brief, likely interview questions with answers, and talking points.' },
        { q: 'Can I use this if I\'m changing careers?', a: 'Absolutely! Our AI identifies transferable skills and helps position your experience for your target industry.' },
        { q: 'How does the "Try Me" demo work?', a: 'Enter your email to receive an access code. Use it in our Telegram bot, paste any job URL, and receive a complete packet in minutes.' },
        { q: 'Is my data secure?', a: 'Yes. We use enterprise-grade encryption. Your data is never shared with third parties.' },
      ],
    },
    finalCta: {
      title: 'Your dream job is waiting',
      subtitle: 'Join thousands of successful job seekers. Start your journey today.',
      button: 'Start Free - No Credit Card',
    },
    footer: {
      desc: 'AI-powered job application automation. Land your dream job faster with intelligent matching and personalized application packets.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      copyright: '© 2025 ZJobConcierge. All rights reserved.',
    },
  },
  fr: {
    nav: {
      howItWorks: 'Comment ça marche',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      faq: 'FAQ',
      tryLive: 'Essayer',
      getStarted: 'Commencer',
    },
    hero: {
      badge: 'candidats ont décroché un emploi ce mois-ci',
      title1: 'Arrêtez de postuler.',
      title2: 'Commencez à décrocher.',
      subtitle: 'Votre concierge IA analyse votre profil, trouve les meilleures opportunités et livre des dossiers complets — CV personnalisé, lettre de motivation et préparation d\'entretien — chaque jour.',
      cta: 'Commencer Gratuitement',
      stat1: '< 3 min',
      stat1Label: 'Génération de dossier',
      stat2: '85%',
      stat2Label: 'Taux d\'entretien',
      stat3: '10K+',
      stat3Label: 'Emplois analysés/jour',
    },
    telegram: {
      title: 'Essayez en Direct',
      subtitle: 'Démo Instantanée',
      free: 'Gratuit',
      match: 'de correspondance! Votre dossier est prêt:',
      generatedIn: 'Généré en',
      tryingNow: 'en ligne',
      ctaButton: 'Essayer — Démo Instantanée',
      ctaNote: 'Sans inscription • Sans carte • Résultat en 12 secondes',
    },
    howItWorks: {
      badge: 'Comment ça Marche',
      title: 'De l\'inscription à l\'emploi en 4 étapes',
      subtitle: 'Notre IA fait le travail pendant que vous vous concentrez sur l\'essentiel.',
      steps: [
        { icon: '👤', title: 'Créez Votre Profil', desc: 'Répondez aux questions sur votre expérience. Téléchargez votre CV - notre IA fait le reste.' },
        { icon: '🔗', title: 'Connectez les Sites', desc: 'Configurez le transfert auto depuis LinkedIn, Indeed, Glassdoor.' },
        { icon: '🤖', title: 'L\'IA Analyse', desc: 'Chaque jour, notre IA examine les offres et sélectionne les meilleures opportunités.' },
        { icon: '📦', title: 'Recevez vos Dossiers', desc: 'Obtenez des dossiers complets: CV adapté, lettre de motivation et préparation entretien.' },
      ],
    },
    features: {
      badge: 'Fonctionnalités',
      title: 'Tout pour décrocher l\'emploi de vos rêves',
      subtitle: 'Des capacités IA avancées qui vous donnent un avantage sur le marché.',
      items: [
        { icon: '🎯', title: 'Analyse de Profil', desc: 'Analyse approfondie de votre expérience et compétences.' },
        { icon: '✓', title: 'Matching Intelligent', desc: 'Algorithmes avancés pour les meilleures opportunités.' },
        { icon: '📄', title: 'CV Personnalisés', desc: 'Chaque CV est adapté pour chaque offre.' },
        { icon: '✉️', title: 'Lettres de Motivation', desc: 'Lettres personnalisées pour chaque entreprise.' },
        { icon: '🎤', title: 'Préparation Entretien', desc: 'Questions et briefings spécifiques à l\'entreprise.' },
        { icon: '📊', title: 'Conseils Carrière', desc: 'Recommandations et benchmarks salariaux.' },
      ],
    },
    tryDemo: {
      icon: '⚡',
      title: 'Voyez-le en action',
      subtitle: 'Accès instantané au bot Telegram. Collez une offre, recevez un dossier complet - gratuit.',
      cta: 'Essayer — Obtenir le Code',
      benefits: ['Accès Telegram instantané', 'Génération complète', 'CV adapté par IA', 'Sans carte bancaire'],
    },
    pricing: {
      badge: 'Tarifs',
      title: 'Choisissez votre chemin vers le succès',
      subtitle: 'Des plans flexibles pour chaque étape de votre recherche.',
      mo: '/mois',
      viewFull: 'Voir Tous les Tarifs',
      mostPopular: 'Plus Populaire',
      plans: [
        { name: 'Freemium', planId: 'free', price: '0$', desc: 'Pour commencer', features: ['5 dossiers/jour', 'Matching basique', 'Templates standard', 'Support email'], buttonText: 'Commencer Gratuit' },
        { name: 'Basic', planId: 'basic', price: '19$', desc: 'Chercheurs actifs', features: ['15 dossiers/jour', 'Matching avancé', 'Templates premium', 'Support prioritaire'], buttonText: 'Choisir Basic' },
        { name: 'Pro', planId: 'pro', price: '39$', desc: 'Puissance maximale', features: ['50 dossiers/jour', 'Coaching IA', 'Prep entretien', 'Support 24/7'], buttonText: 'Choisir Pro', popular: true },
        { name: 'VIP', planId: 'vip', price: '79$', desc: 'Service premium', features: ['Dossiers illimités', 'Stratégiste 1-on-1', 'Recherche entreprise', 'LinkedIn'], buttonText: 'Choisir VIP' },
      ],
    },
    testimonials: {
      badge: 'Témoignages',
      title: 'La confiance des candidats du monde entier',
      items: [
        { text: 'Je passais 4h par jour sur mes candidatures. Maintenant 30 minutes. J\'ai décroché mon job chez Microsoft en 3 semaines!', name: 'Sarah K.', role: 'Product Manager, Microsoft' },
        { text: 'La préparation d\'entretien vaut 10x le prix. J\'entrais en entretien comme si j\'y travaillais déjà.', name: 'Marcus R.', role: 'Software Engineer, Stripe' },
        { text: 'En reconversion, ZJobConcierge a analysé mes compétences et m\'a aidé à pivoter vers la tech avec succès.', name: 'Jennifer L.', role: 'Data Analyst, Shopify' },
      ],
    },
    faq: {
      badge: 'FAQ',
      title: 'Des questions? On a les réponses.',
      items: [
        { q: 'Comment fonctionne le transfert auto?', a: 'Guides étape par étape pour LinkedIn, Indeed et Glassdoor. Les alertes arrivent automatiquement à notre IA.' },
        { q: 'Qu\'inclut un dossier?', a: 'CV adapté, lettre de motivation, briefing entreprise, questions d\'entretien avec réponses.' },
        { q: 'Pour les changements de carrière?', a: 'Absolument! Notre IA identifie les compétences transférables.' },
        { q: 'Comment fonctionne la démo?', a: 'Email → code d\'accès → bot Telegram → collez une URL → dossier complet.' },
        { q: 'Sécurité des données?', a: 'Cryptage entreprise. Jamais partagé avec des tiers.' },
      ],
    },
    finalCta: {
      title: 'Votre emploi de rêve vous attend',
      subtitle: 'Rejoignez des milliers de candidats qui ont réussi.',
      button: 'Commencer Gratuit',
    },
    footer: {
      desc: 'Automatisation des candidatures propulsée par IA. Décrochez votre emploi plus rapidement.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      copyright: '© 2025 ZJobConcierge. Tous droits réservés.',
    },
  },
};

// ==================== COLORS ====================
const c = {
  void: '#09090B',
  night: '#0C0C0F',
  charcoal: '#141417',
  slate: '#1C1C21',
  mint: '#3CFFD0',
  mintSoft: 'rgba(60, 255, 208, 0.15)',
  mintBorder: 'rgba(60, 255, 208, 0.25)',
  mintGlow: 'rgba(60, 255, 208, 0.4)',
  lavender: '#A78BFA',
  lavenderSoft: 'rgba(167, 139, 250, 0.15)',
  coral: '#FF6B6B',
  gold: '#FFD93D',
  telegramBlue: '#2AABEE',
  text100: '#FAFAFA',
  text80: 'rgba(250, 250, 250, 0.8)',
  text60: 'rgba(250, 250, 250, 0.6)',
  text40: 'rgba(250, 250, 250, 0.4)',
  text20: 'rgba(250, 250, 250, 0.2)',
};

// ==================== TELEGRAM DEMO COMPONENT ====================
const TelegramDemo = ({ t }) => {
  const [liveUsers, setLiveUsers] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => Math.max(115, Math.min(145, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 350, height: 350, background: 'radial-gradient(circle, rgba(42, 171, 238, 0.15) 0%, transparent 60%)', pointerEvents: 'none',
      }} />

      {/* Demo Card */}
      <div style={{
        position: 'relative', background: 'linear-gradient(145deg, #1a1a24, #0e0e14)',
        border: '1px solid rgba(42, 171, 238, 0.3)', borderRadius: 28, overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)', maxWidth: 380,
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', background: 'linear-gradient(135deg, rgba(42, 171, 238, 0.15), rgba(42, 171, 238, 0.05))',
          borderBottom: '1px solid rgba(42, 171, 238, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, background: c.telegramBlue, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✈️</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{t.telegram.title}</div>
              <div style={{ fontSize: 12, color: c.telegramBlue, fontWeight: 600 }}>{t.telegram.subtitle}</div>
            </div>
          </div>
          <div style={{ padding: '6px 12px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: c.mint, textTransform: 'uppercase' }}>{t.telegram.free}</div>
        </div>

        {/* Chat */}
        <div style={{ padding: '20px 24px', minHeight: 220 }}>
          {/* User Message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <div style={{ padding: '12px 16px', background: '#2B5278', borderRadius: '16px 16px 4px 16px', maxWidth: '85%' }}>
              <div style={{ fontSize: 13, color: '#fff', wordBreak: 'break-all' }}>https://stripe.com/jobs/pm-role</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: 4 }}>2:34 PM</div>
            </div>
          </div>

          {/* Bot Response */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
            <div style={{ padding: '12px 16px', background: '#182533', borderRadius: '16px 16px 16px 4px', maxWidth: '85%' }}>
              <div style={{ fontSize: 13, color: '#fff', marginBottom: 12 }}>✅ <strong>94% {t.telegram.match}</strong></div>
              {[
                { icon: '📄', name: 'Resume_Stripe_PM.pdf' },
                { icon: '✉️', name: 'CoverLetter.pdf' },
                { icon: '🎯', name: 'InterviewPrep.pdf' },
              ].map((file, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: c.mintSoft, borderRadius: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>{file.icon}</span>
                  <span style={{ fontSize: 12, color: c.mint }}>{file.name}</span>
                </div>
              ))}
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>2:34 PM</div>
            </div>
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ padding: '10px 16px', background: '#242F3D', borderRadius: 20, flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Paste any job URL...</div>
            <div style={{ width: 36, height: 36, background: c.telegramBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>➤</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ padding: '20px 24px', background: 'rgba(42, 171, 238, 0.08)', borderTop: '1px solid rgba(42, 171, 238, 0.15)' }}>
          <Link to="/try-demo" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '14px 24px', background: c.telegramBlue, borderRadius: 12, fontSize: 15, fontWeight: 700, color: '#fff',
              textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 0 30px rgba(42, 171, 238, 0.4)',
            }}>
              <span style={{ fontSize: 18 }}>✈️</span> {t.telegram.ctaButton}
            </div>
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 12 }}>{t.telegram.ctaNote}</p>
        </div>
      </div>

      {/* Floating Badge - Time */}
      <div className="floating-badge" style={{
        position: 'absolute', top: 20, right: -20, padding: '12px 18px', background: c.charcoal,
        border: `1px solid ${c.mintBorder}`, borderRadius: 14, boxShadow: '0 10px 40px rgba(0,0,0,0.4)', zIndex: 10,
      }}>
        <div style={{ fontSize: 11, color: c.text40, marginBottom: 4 }}>{t.telegram.generatedIn}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: c.mint }}>12 sec</div>
      </div>

      {/* Floating Badge - Live Users */}
      <div className="floating-badge" style={{
        position: 'absolute', bottom: 100, left: -40, padding: '12px 16px', background: c.charcoal,
        border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 10,
      }}>
        <div style={{ width: 10, height: 10, background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: 14, color: c.text80 }}><strong style={{ color: c.lavender }}>{liveUsers}</strong> {t.telegram.tryingNow}</span>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }`}</style>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const HomePage = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('jc_lang');
    if (saved) setLang(saved);
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('jc_lang', newLang);
  };

  const isLoggedIn = !!localStorage.getItem('jc_user_email');
  const goToCheckout = (planId) => navigate(`/checkout?plan=${planId}`);

  return (
    <div style={{ width: '100%', background: c.void, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", color: c.text80, overflowX: 'hidden' }}>
      
      {/* ==================== NAVIGATION ==================== */}
      <nav style={{ padding: '16px 24px', background: 'rgba(9, 9, 11, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(250,250,250,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', background: 'rgba(9, 9, 11, 0.8)', border: '1px solid rgba(250,250,250,0.06)', borderRadius: 9999 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: c.mint, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: c.void }}>Z</div>
            <span style={{ fontSize: 18, fontWeight: 600, color: c.text100 }}>JobConcierge</span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 8 }}>
            {[
              { label: t.nav.howItWorks, href: '/how-it-works' },
              { label: t.nav.features, href: '/features' },
              { label: t.nav.pricing, href: '/pricing' },
              { label: t.nav.faq, href: '/faq' },
            ].map((item) => (
              <Link key={item.href} to={item.href} style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: c.text60, textDecoration: 'none', borderRadius: 9999 }}>{item.label}</Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Lang Toggle */}
            <div style={{ display: 'flex', padding: 3, background: 'rgba(250,250,250,0.05)', borderRadius: 9999 }}>
              <button onClick={() => handleSetLang('en')} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: lang === 'en' ? c.void : c.text40, background: lang === 'en' ? c.text100 : 'transparent', border: 'none', borderRadius: 9999, cursor: 'pointer' }}>EN</button>
              <button onClick={() => handleSetLang('fr')} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: lang === 'fr' ? c.void : c.text40, background: lang === 'fr' ? c.text100 : 'transparent', border: 'none', borderRadius: 9999, cursor: 'pointer' }}>FR</button>
            </div>
            {/* Try Live */}
            <Link to="/try-demo" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '10px 18px', background: 'rgba(42, 171, 238, 0.15)', border: '1px solid rgba(42, 171, 238, 0.4)', borderRadius: 9999, fontSize: 14, fontWeight: 600, color: c.telegramBlue, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✈️</span> {t.nav.tryLive}
              </div>
            </Link>
            {/* Get Started */}
            <Link to={isLoggedIn ? "/dashboard" : "/checkout?plan=free"} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '12px 24px', background: c.mint, borderRadius: 9999, fontSize: 14, fontWeight: 600, color: c.void }}>{isLoggedIn ? 'Dashboard' : t.nav.getStarted}</div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(9, 9, 11, 0.98)', padding: 20, borderBottom: '1px solid rgba(250,250,250,0.06)', zIndex: 99 }}>
            {[{ label: t.nav.howItWorks, href: '/how-it-works' }, { label: t.nav.features, href: '/features' }, { label: t.nav.pricing, href: '/pricing' }, { label: t.nav.faq, href: '/faq' }].map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', padding: '14px 0', fontSize: 16, color: c.text80, textDecoration: 'none', borderBottom: '1px solid rgba(250,250,250,0.06)' }}>{item.label}</Link>
            ))}
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/try-demo" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{ padding: 14, background: 'rgba(42, 171, 238, 0.15)', border: '1px solid rgba(42, 171, 238, 0.4)', borderRadius: 12, fontSize: 15, fontWeight: 600, color: c.telegramBlue, textAlign: 'center' }}>✈️ {t.nav.tryLive}</div>
              </Link>
              <Link to="/checkout?plan=free" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{ padding: 14, background: c.mint, borderRadius: 12, fontSize: 15, fontWeight: 600, color: c.void, textAlign: 'center' }}>{t.nav.getStarted}</div>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ==================== HERO ==================== */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div className="hero-content" style={{ textAlign: 'center' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px 8px 8px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, marginBottom: 36 }}>
              <div style={{ display: 'flex', marginLeft: 4 }}>
                {['JK', 'MR', 'SL', '+'].map((init, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${c.mint}, ${c.lavender})`, border: `2px solid ${c.void}`, marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: c.void }}>{init}</div>
                ))}
              </div>
              <span style={{ fontSize: 14, color: c.text80 }}><strong style={{ color: c.mint }}>2,847</strong> {t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 600, color: c.text100, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
              {t.hero.title1}<br />
              <span style={{ fontFamily: "'Georgia', serif", fontWeight: 400, fontStyle: 'italic', background: `linear-gradient(135deg, ${c.mint}, ${c.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.hero.title2}</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: c.text60, lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>{t.hero.subtitle}</p>

            {/* CTA */}
            <Link to="/checkout?plan=free" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: c.mint, borderRadius: 12, fontSize: 16, fontWeight: 600, color: c.void, boxShadow: `0 0 50px ${c.mintGlow}`, marginBottom: 48 }}>
                {t.hero.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Link>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[{ icon: '⏱', value: t.hero.stat1, label: t.hero.stat1Label }, { icon: '🎯', value: t.hero.stat2, label: t.hero.stat2Label }, { icon: '📊', value: t.hero.stat3, label: t.hero.stat3Label }].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, background: c.slate, border: '1px solid rgba(250,250,250,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: c.text100, lineHeight: 1.2 }}>{item.value}</div>
                    <div style={{ fontSize: 13, color: c.text40 }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Demo */}
          <div className="hero-demo"><TelegramDemo t={t} /></div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, fontSize: 12, fontWeight: 600, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{t.howItWorks.badge}</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: c.text100, marginBottom: 16 }}>{t.howItWorks.title}</h2>
          <p style={{ fontSize: 18, color: c.text60, maxWidth: 600, margin: '0 auto' }}>{t.howItWorks.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} style={{ padding: 24, background: c.charcoal, border: '1px solid rgba(250,250,250,0.06)', borderRadius: 20, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, margin: '0 auto 20px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: c.mint }}>{i + 1}</div>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: c.text100, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: c.text60, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, fontSize: 12, fontWeight: 600, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{t.features.badge}</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: c.text100, marginBottom: 16 }}>{t.features.title}</h2>
          <p style={{ fontSize: 18, color: c.text60, maxWidth: 600, margin: '0 auto' }}>{t.features.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {t.features.items.map((f, i) => (
            <div key={i} style={{ padding: 32, background: c.charcoal, border: '1px solid rgba(250,250,250,0.06)', borderRadius: 20 }}>
              <div style={{ width: 48, height: 48, marginBottom: 20, background: c.mintSoft, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: c.text100, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: c.text60, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TRY DEMO CTA ==================== */}
      <section style={{ padding: '100px 24px', background: `linear-gradient(180deg, transparent 0%, rgba(60, 255, 208, 0.02) 50%, transparent 100%)` }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 32px', background: c.charcoal, border: `1px solid ${c.mintBorder}`, borderRadius: 32, textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, margin: '0 auto 24px', background: c.mint, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: `0 0 60px ${c.mintGlow}` }}>{t.tryDemo.icon}</div>
          <h3 style={{ fontSize: 28, fontWeight: 600, color: c.text100, marginBottom: 12 }}>{t.tryDemo.title}</h3>
          <p style={{ fontSize: 16, color: c.text60, marginBottom: 32 }}>{t.tryDemo.subtitle}</p>

          <Link to="/try-demo" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '18px 32px', background: c.telegramBlue, borderRadius: 14, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 32, boxShadow: '0 0 30px rgba(42, 171, 238, 0.4)' }}>
              <span style={{ fontSize: 20 }}>✈️</span> {t.tryDemo.cta}
            </div>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
            {t.tryDemo.benefits.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: c.text60 }}><span style={{ color: c.mint }}>✓</span> {p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, fontSize: 12, fontWeight: 600, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{t.pricing.badge}</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: c.text100, marginBottom: 16 }}>{t.pricing.title}</h2>
          <p style={{ fontSize: 18, color: c.text60 }}>{t.pricing.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 40 }}>
          {t.pricing.plans.map((plan, i) => (
            <div key={i} style={{ padding: 32, background: plan.popular ? `linear-gradient(135deg, rgba(60, 255, 208, 0.08), rgba(167, 139, 250, 0.05))` : c.charcoal, border: plan.popular ? `1px solid ${c.mintBorder}` : '1px solid rgba(250,250,250,0.06)', borderRadius: 20, position: 'relative' }}>
              {plan.popular && <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', padding: '4px 12px', background: c.mint, color: c.void, fontSize: 12, fontWeight: 700, borderRadius: 9999, textTransform: 'uppercase' }}>{t.pricing.mostPopular}</span>}
              <div style={{ fontSize: 14, fontWeight: 600, color: c.text60, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: plan.popular ? c.mint : c.text100, marginBottom: 4, lineHeight: 1 }}>{plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: c.text40 }}>{t.pricing.mo}</span></div>
              <div style={{ fontSize: 14, color: c.text40, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(250,250,250,0.06)' }}>{plan.desc}</div>
              <div style={{ marginBottom: 24 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 14, color: c.text60 }}><span style={{ color: c.mint }}>✓</span> {f}</div>
                ))}
              </div>
              <button onClick={() => goToCheckout(plan.planId)} style={{ width: '100%', padding: '12px 24px', background: plan.popular ? c.mint : 'transparent', border: plan.popular ? 'none' : '1px solid rgba(250,250,250,0.1)', borderRadius: 9999, fontSize: 14, fontWeight: 600, color: plan.popular ? c.void : c.text80, cursor: 'pointer' }}>{plan.buttonText}</button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/pricing" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: 'transparent', border: `1px solid ${c.mint}`, borderRadius: 12, fontSize: 15, fontWeight: 600, color: c.mint }}>{t.pricing.viewFull} <span>→</span></div>
          </Link>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, fontSize: 12, fontWeight: 600, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{t.testimonials.badge}</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: c.text100 }}>{t.testimonials.title}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {t.testimonials.items.map((item, i) => (
            <div key={i} style={{ padding: 32, background: c.charcoal, border: '1px solid rgba(250,250,250,0.06)', borderRadius: 20 }}>
              <div style={{ color: c.gold, fontSize: 16, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
              <p style={{ fontSize: 16, color: c.text80, lineHeight: 1.7, marginBottom: 24 }}>"{item.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${c.mint}, ${c.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: c.void }}>{item.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text100 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: c.text40 }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section style={{ padding: '100px 24px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: c.mintSoft, border: `1px solid ${c.mintBorder}`, borderRadius: 9999, fontSize: 12, fontWeight: 600, color: c.mint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{t.faq.badge}</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: c.text100 }}>{t.faq.title}</h2>
        </div>

        <div>
          {t.faq.items.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: c.text100, paddingRight: 16 }}>{faq.q}</span>
                <span style={{ width: 32, height: 32, background: c.slate, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.mint, fontSize: 20, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <div style={{ paddingBottom: 24, color: c.text60, lineHeight: 1.7 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 600, color: c.text100, marginBottom: 16 }}>{t.finalCta.title}</h2>
        <p style={{ fontSize: 20, color: c.text60, marginBottom: 40 }}>{t.finalCta.subtitle}</p>
        <Link to="/checkout?plan=free" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: c.mint, borderRadius: 9999, fontSize: 16, fontWeight: 600, color: c.void, boxShadow: `0 0 60px ${c.mintGlow}` }}>
            {t.finalCta.button}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </Link>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{ padding: '80px 24px 40px', background: c.night, borderTop: '1px solid rgba(250,250,250,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: c.mint, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: c.void }}>Z</div>
                <span style={{ fontSize: 18, fontWeight: 600, color: c.text100 }}>JobConcierge</span>
              </div>
              <p style={{ fontSize: 14, color: c.text40, lineHeight: 1.7, maxWidth: 280 }}>{t.footer.desc}</p>
            </div>
            {[
              { title: t.footer.product, links: [t.nav.howItWorks, t.nav.features, t.nav.pricing, t.nav.tryLive] },
              { title: t.footer.company, links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: t.footer.legal, links: ['Privacy', 'Terms', 'Cookies', 'GDPR'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: c.text60, marginBottom: 16 }}>{col.title}</h4>
                {col.links.map((link, j) => <div key={j} style={{ padding: '8px 0', fontSize: 14, color: c.text40, cursor: 'pointer' }}>{link}</div>)}
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 32, borderTop: '1px solid rgba(250,250,250,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: 14, color: c.text40 }}>{t.footer.copyright}</p>
            <div style={{ display: 'flex', padding: 3, background: 'rgba(250,250,250,0.05)', borderRadius: 9999 }}>
              <button onClick={() => handleSetLang('en')} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: lang === 'en' ? c.void : c.text40, background: lang === 'en' ? c.text100 : 'transparent', border: 'none', borderRadius: 9999, cursor: 'pointer' }}>English</button>
              <button onClick={() => handleSetLang('fr')} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: lang === 'fr' ? c.void : c.text40, background: lang === 'fr' ? c.text100 : 'transparent', border: 'none', borderRadius: 9999, cursor: 'pointer' }}>Français</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 420px !important; }
          .hero-content { text-align: left !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-demo { display: none !important; }
          .floating-badge { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
