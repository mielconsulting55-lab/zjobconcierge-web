// FAQ.jsx
// Comprehensive FAQ page - Mobile responsive with EN/FR
// Place in: src/pages/FAQ.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const translations = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Job Concierge',
    categories: {
      general: 'General',
      pricing: 'Pricing',
      features: 'Features',
      countries: 'Countries',
      technical: 'Technical',
    },
    faqs: [
      // General
      { cat: 'general', q: 'What is Job Concierge?', a: 'Job Concierge is an AI-powered job application automation service. You forward job alert emails from LinkedIn, Indeed, or any job board. Our AI analyzes each job, matches it to your profile, and creates personalized resumes, cover letters, and interview prep materials.' },
      { cat: 'general', q: 'How do I get started?', a: 'Sign up for a free 7-day trial, complete your profile by uploading your resume and setting preferences, then start forwarding job alert emails to admin@zjobconcierge.com. Our AI processes emails daily at 6 AM CT and sends your application packets.' },
      { cat: 'general', q: 'How long until I see results?', a: 'Most users receive their first application packets within 24 hours of forwarding job alerts. Many report getting more interview callbacks within the first week of using our service, thanks to our ATS-optimized, tailored documents.' },
      { cat: 'general', q: 'What job boards do you support?', a: 'We support all major job boards including LinkedIn, Indeed, Glassdoor, ZipRecruiter, Monster, CareerBuilder, and 50+ more. If it sends job alert emails, we can process it.' },
      
      // Pricing
      { cat: 'pricing', q: 'How does the free trial work?', a: 'You get 7 days of full access with 3 jobs/day. We collect card info to prevent abuse, but you won\'t be charged during the trial. Cancel anytime before day 7 to avoid charges.' },
      { cat: 'pricing', q: 'What happens after my free trial ends?', a: 'Your subscription automatically continues at $19/month (Basic plan). You\'ll receive an email reminder 2 days before trial ends. You can upgrade, downgrade, or cancel anytime from your dashboard.' },
      { cat: 'pricing', q: 'What\'s included in each plan?', a: 'Trial/Basic: 3-5 jobs/day, resume + cover letter, ATS optimization. Pro: 15 jobs/day + interview prep. VIP: 30 jobs/day + company research. Enterprise: 100+ jobs/day + dedicated manager.' },
      { cat: 'pricing', q: 'How do I cancel my subscription?', a: 'Go to Dashboard > Settings > Billing and click "Cancel Subscription". Your access continues until the end of your billing period. Or email support@zjobconcierge.com. No questions asked, no hidden fees.' },
      { cat: 'pricing', q: 'Do you offer refunds?', a: 'Yes! We offer a 7-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us within 7 days of payment for a full refund.' },
      
      // Features
      { cat: 'features', q: 'How do I forward job emails?', a: 'Option 1: Set up an auto-forward rule in Gmail/Outlook to automatically send job alerts to admin@zjobconcierge.com. Option 2: Manually forward individual emails. Both work perfectly.' },
      { cat: 'features', q: 'What documents do I receive?', a: 'For each matched job: a tailored resume highlighting relevant experience, a personalized cover letter addressing the company\'s needs, and (Pro+ plans) interview preparation with likely questions.' },
      { cat: 'features', q: 'How accurate is the AI matching?', a: 'Our AI achieves 94% accuracy. It only creates application packets for jobs scoring 70%+ match to your profile, ensuring you don\'t waste time on poor fits.' },
      { cat: 'features', q: 'Are documents ATS-optimized?', a: 'Yes! All resumes use ATS-friendly formatting, include relevant keywords from each job posting, and follow industry best practices to maximize your chances of passing automated screening.' },
      { cat: 'features', q: 'Can I edit the generated documents?', a: 'Absolutely! All documents come in PDF and editable DOCX formats. Make any changes you want before submitting applications.' },
      
      // Countries
      { cat: 'countries', q: 'Which countries do you support?', a: 'We support 9 countries: USA, Canada, United Kingdom, Ireland, France, Belgium, Switzerland, Luxembourg, and Monaco. We cover English and French-speaking job markets.' },
      { cat: 'countries', q: 'Do you support multiple languages?', a: 'Yes! We fully support English and French. Your application documents will be generated in the appropriate language based on the job posting and your preferences.' },
      { cat: 'countries', q: 'Can I apply to jobs in multiple countries?', a: 'Yes! Set your location preferences to include multiple countries. Our AI will match and create packets for jobs in all your selected regions.' },
      
      // Technical
      { cat: 'technical', q: 'Is my data secure?', a: 'Absolutely. We use AES-256 encryption (bank-level security) for all data. Your information is never sold or shared with third parties. We\'re fully GDPR compliant.' },
      { cat: 'technical', q: 'How long is my data retained?', a: 'Active users: indefinitely while subscribed. After cancellation: 3 months for easy reactivation. You can request immediate deletion anytime via support.' },
      { cat: 'technical', q: 'What if I don\'t receive my packets?', a: 'Check your spam folder first. If still missing, email support@zjobconcierge.com. Processing happens daily at 6 AM CT, so emails forwarded late may arrive the next day.' },
      { cat: 'technical', q: 'Can I use Job Concierge on mobile?', a: 'Yes! Our website is fully mobile-responsive. Forward job emails from your phone, check your dashboard, and download packets anywhere.' },
    ],
    stillQuestions: 'Still have questions?',
    contactUs: 'Contact Support',
    contactEmail: 'support@zjobconcierge.com',
  },
  fr: {
    title: 'Questions Fréquentes',
    subtitle: 'Tout ce que vous devez savoir sur Job Concierge',
    categories: {
      general: 'Général',
      pricing: 'Tarifs',
      features: 'Fonctionnalités',
      countries: 'Pays',
      technical: 'Technique',
    },
    faqs: [
      // General
      { cat: 'general', q: 'Qu\'est-ce que Job Concierge?', a: 'Job Concierge est un service d\'automatisation des candidatures propulsé par l\'IA. Vous transférez les emails d\'alertes emploi de LinkedIn, Indeed ou tout site. Notre IA analyse chaque offre, la compare à votre profil, et crée des CV, lettres de motivation et préparations d\'entretien personnalisés.' },
      { cat: 'general', q: 'Comment commencer?', a: 'Inscrivez-vous pour un essai gratuit de 7 jours, complétez votre profil en téléchargeant votre CV et définissant vos préférences, puis transférez les alertes emploi à admin@zjobconcierge.com. Notre IA traite les emails quotidiennement à 6h CT.' },
      { cat: 'general', q: 'Combien de temps avant de voir des résultats?', a: 'La plupart des utilisateurs reçoivent leurs premiers dossiers sous 24h. Beaucoup rapportent plus de rappels d\'entretien dès la première semaine grâce à nos documents optimisés ATS.' },
      { cat: 'general', q: 'Quels sites d\'emploi supportez-vous?', a: 'Nous supportons tous les sites majeurs: LinkedIn, Indeed, Glassdoor, ZipRecruiter, Monster, CareerBuilder, et 50+ autres. S\'il envoie des alertes email, nous pouvons le traiter.' },
      
      // Pricing
      { cat: 'pricing', q: 'Comment fonctionne l\'essai gratuit?', a: 'Vous avez 7 jours d\'accès complet avec 3 emplois/jour. Nous collectons les infos de carte pour prévenir les abus, mais vous ne serez pas facturé. Annulez avant le jour 7.' },
      { cat: 'pricing', q: 'Que se passe-t-il après l\'essai?', a: 'Votre abonnement continue automatiquement à 19$/mois (plan Basic). Vous recevrez un rappel 2 jours avant la fin. Vous pouvez upgrader, downgrader ou annuler depuis votre tableau de bord.' },
      { cat: 'pricing', q: 'Qu\'est-ce qui est inclus dans chaque plan?', a: 'Essai/Basic: 3-5 emplois/jour, CV + lettre, optimisation ATS. Pro: 15 emplois/jour + prep entretien. VIP: 30 emplois/jour + recherche entreprise. Enterprise: 100+ emplois/jour + gestionnaire dédié.' },
      { cat: 'pricing', q: 'Comment annuler mon abonnement?', a: 'Allez dans Tableau de bord > Paramètres > Facturation et cliquez "Annuler". Votre accès continue jusqu\'à la fin de la période. Ou contactez support@zjobconcierge.com.' },
      { cat: 'pricing', q: 'Offrez-vous des remboursements?', a: 'Oui! Nous offrons une garantie de remboursement de 7 jours sur tous les plans payants. Contactez-nous dans les 7 jours suivant le paiement pour un remboursement complet.' },
      
      // Features
      { cat: 'features', q: 'Comment transférer les emails?', a: 'Option 1: Configurez une règle de transfert auto dans Gmail/Outlook vers admin@zjobconcierge.com. Option 2: Transférez manuellement. Les deux fonctionnent parfaitement.' },
      { cat: 'features', q: 'Quels documents je reçois?', a: 'Pour chaque emploi correspondant: un CV adapté, une lettre de motivation personnalisée, et (plans Pro+) une préparation d\'entretien avec questions probables.' },
      { cat: 'features', q: 'Quelle est la précision du matching IA?', a: 'Notre IA atteint 94% de précision. Elle ne crée des dossiers que pour les emplois avec 70%+ de correspondance, vous évitant de perdre du temps.' },
      { cat: 'features', q: 'Les documents sont-ils optimisés ATS?', a: 'Oui! Tous les CV utilisent un formatage ATS-friendly, incluent les mots-clés pertinents et suivent les meilleures pratiques pour maximiser vos chances.' },
      { cat: 'features', q: 'Puis-je modifier les documents générés?', a: 'Absolument! Tous les documents sont fournis en PDF et DOCX modifiable. Faites tous les changements souhaités.' },
      
      // Countries
      { cat: 'countries', q: 'Quels pays supportez-vous?', a: 'Nous supportons 9 pays: États-Unis, Canada, Royaume-Uni, Irlande, France, Belgique, Suisse, Luxembourg et Monaco. Nous couvrons les marchés anglophones et francophones.' },
      { cat: 'countries', q: 'Supportez-vous plusieurs langues?', a: 'Oui! Nous supportons l\'anglais et le français. Vos documents seront générés dans la langue appropriée selon l\'offre et vos préférences.' },
      { cat: 'countries', q: 'Puis-je postuler dans plusieurs pays?', a: 'Oui! Définissez vos préférences de lieu pour inclure plusieurs pays. Notre IA fera le matching et créera des dossiers pour toutes vos régions.' },
      
      // Technical
      { cat: 'technical', q: 'Mes données sont-elles sécurisées?', a: 'Absolument. Nous utilisons le cryptage AES-256 (niveau bancaire). Vos informations ne sont jamais vendues ou partagées. Nous sommes conformes RGPD.' },
      { cat: 'technical', q: 'Combien de temps mes données sont conservées?', a: 'Utilisateurs actifs: indéfiniment. Après annulation: 3 mois pour réactivation facile. Vous pouvez demander une suppression immédiate via support.' },
      { cat: 'technical', q: 'Si je ne reçois pas mes dossiers?', a: 'Vérifiez d\'abord vos spams. Si toujours absent, contactez support@zjobconcierge.com. Le traitement a lieu à 6h CT, les emails tardifs arrivent le lendemain.' },
      { cat: 'technical', q: 'Puis-je utiliser Job Concierge sur mobile?', a: 'Oui! Notre site est entièrement responsive. Transférez des emails, consultez votre tableau de bord et téléchargez vos dossiers n\'importe où.' },
    ],
    stillQuestions: 'Encore des questions?',
    contactUs: 'Contacter le Support',
    contactEmail: 'support@zjobconcierge.com',
  },
};

const FAQ = () => {
  const [lang, setLang] = useState('en');
  const [activeCat, setActiveCat] = useState('general');
  const [openIndex, setOpenIndex] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('jc_lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('jc_lang', newLang);
  };

  const filteredFaqs = t.faqs.filter(f => f.cat === activeCat);

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
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      padding: '20px',
      flexWrap: 'wrap',
      maxWidth: '600px',
      margin: '0 auto',
    },
    tab: (active) => ({
      padding: '10px 18px',
      fontSize: '14px',
      fontWeight: '600',
      color: active ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
      background: active ? '#3CFFD0' : 'rgba(255,255,255,0.05)',
      border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    faqList: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    faqItem: {
      marginBottom: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      overflow: 'hidden',
    },
    faqQuestion: {
      width: '100%',
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
    },
    questionText: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      paddingRight: '16px',
      flex: 1,
    },
    toggleIcon: (open) => ({
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: 'rgba(60,255,208,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3CFFD0',
      fontSize: '18px',
      transform: open ? 'rotate(45deg)' : 'rotate(0)',
      transition: 'transform 0.2s',
      flexShrink: 0,
    }),
    faqAnswer: {
      padding: '0 24px 20px',
      fontSize: '15px',
      color: 'rgba(255,255,255,0.6)',
      lineHeight: '1.7',
    },
    contact: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'rgba(255,255,255,0.02)',
    },
    contactTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '20px',
    },
    contactBtn: {
      display: 'inline-block',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#0a0a0f',
      background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)',
      borderRadius: '12px',
      textDecoration: 'none',
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
            onClick={() => { setActiveCat(key); setOpenIndex(null); }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.faqList}>
        {filteredFaqs.map((faq, i) => (
          <div key={i} style={styles.faqItem}>
            <button
              style={styles.faqQuestion}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span style={styles.questionText}>{faq.q}</span>
              <span style={styles.toggleIcon(openIndex === i)}>+</span>
            </button>
            {openIndex === i && (
              <div style={styles.faqAnswer}>{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <section style={styles.contact}>
        <h2 style={styles.contactTitle}>{t.stillQuestions}</h2>
        <a href={`mailto:${t.contactEmail}`} style={styles.contactBtn}>
          {t.contactUs} →
        </a>
      </section>
    </div>
  );
};

export default FAQ;
