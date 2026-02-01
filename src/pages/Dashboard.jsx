// Dashboard.jsx
// Premium Dashboard with sidebar - Mobile responsive with EN/FR
// Place in: src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

const translations = {
  en: {
    greeting: 'Good morning',
    greetingAlt: 'Welcome back',
    aiFound: 'Your AI found',
    matchesToday: 'high-quality matches today',
    packetsReady: 'application packets are ready',
    menu: 'Menu',
    dashboard: 'Dashboard',
    matches: 'Job Matches',
    packets: 'My Packets',
    analytics: 'Analytics',
    sources: 'Job Sources',
    settings: 'Settings',
    preferences: 'Preferences',
    billing: 'Billing',
    help: 'Need help?',
    helpDesc: 'Our support team is here 24/7',
    startChat: 'Start Chat',
    logOut: 'Log Out',
    stats: {
      forwarded: 'Jobs forwarded today',
      matched: 'Jobs matched',
      packets: 'Packets generated',
      applications: 'Applications sent',
    },
    todaysMatches: 'Today\'s Matches',
    aiSelected: 'AI-selected based on your profile',
    viewAll: 'View All',
    whyMatch: 'Why you match',
    generatePacket: 'Generate Packet',
    save: 'Save',
    viewJob: 'View Job',
    filteredOut: 'Filtered Out',
    filteredDesc: 'Jobs that didn\'t match your criteria',
    force: 'Force',
    forceTip: 'Force Packet lets you generate a packet anyway — great for stretch roles',
    recentPackets: 'Recent Packets',
    ready: 'ready',
    pdf: 'PDF',
    docx: 'DOCX',
    viewAllPackets: 'View All Packets',
    weeklyActivity: 'Weekly Activity',
    week: 'Week',
    month: 'Month',
    totalForwarded: 'Total Forwarded',
    matchRate: 'Match Rate',
    packetsGenerated: 'Packets Generated',
    quickActions: 'Quick Actions',
    uploadResume: 'Upload Resume',
    addJobBoard: 'Add Job Board',
    editProfile: 'Edit Profile',
    dataNotice: 'Your data is stored securely. History retained for 3 months after subscription ends.',
    aiActive: 'AI Active',
    hot: 'HOT',
  },
  fr: {
    greeting: 'Bonjour',
    greetingAlt: 'Bon retour',
    aiFound: 'Votre IA a trouvé',
    matchesToday: 'correspondances de qualité aujourd\'hui',
    packetsReady: 'dossiers de candidature sont prêts',
    menu: 'Menu',
    dashboard: 'Tableau de bord',
    matches: 'Emplois Correspondants',
    packets: 'Mes Dossiers',
    analytics: 'Analytiques',
    sources: 'Sources d\'Emploi',
    settings: 'Paramètres',
    preferences: 'Préférences',
    billing: 'Facturation',
    help: 'Besoin d\'aide?',
    helpDesc: 'Notre équipe support est là 24/7',
    startChat: 'Démarrer Chat',
    logOut: 'Déconnexion',
    stats: {
      forwarded: 'Emplois transférés aujourd\'hui',
      matched: 'Emplois correspondants',
      packets: 'Dossiers générés',
      applications: 'Candidatures envoyées',
    },
    todaysMatches: 'Correspondances du Jour',
    aiSelected: 'Sélectionnés par l\'IA selon votre profil',
    viewAll: 'Voir Tout',
    whyMatch: 'Pourquoi vous correspondez',
    generatePacket: 'Générer Dossier',
    save: 'Sauver',
    viewJob: 'Voir Offre',
    filteredOut: 'Filtrés',
    filteredDesc: 'Emplois ne correspondant pas à vos critères',
    force: 'Forcer',
    forceTip: 'Forcer le dossier permet de générer quand même — idéal pour les rôles ambitieux',
    recentPackets: 'Dossiers Récents',
    ready: 'prêts',
    pdf: 'PDF',
    docx: 'DOCX',
    viewAllPackets: 'Voir Tous les Dossiers',
    weeklyActivity: 'Activité Hebdomadaire',
    week: 'Semaine',
    month: 'Mois',
    totalForwarded: 'Total Transféré',
    matchRate: 'Taux Correspondance',
    packetsGenerated: 'Dossiers Générés',
    quickActions: 'Actions Rapides',
    uploadResume: 'Télécharger CV',
    addJobBoard: 'Ajouter Site Emploi',
    editProfile: 'Modifier Profil',
    dataNotice: 'Vos données sont stockées en sécurité. Historique conservé 3 mois après fin d\'abonnement.',
    aiActive: 'IA Active',
    hot: 'TOP',
  },
};

// Mock data
const mockMatches = [
  { id: 1, title: 'Senior Product Manager', company: 'Stripe', location: 'San Francisco, CA (Remote)', salary: '$180k - $220k', score: 94, hot: true, logo: '💳' },
  { id: 2, title: 'Product Manager, Growth', company: 'Notion', location: 'New York, NY (Hybrid)', salary: '$160k - $200k', score: 91, hot: true, logo: '📝' },
  { id: 3, title: 'Senior PM, Platform', company: 'Figma', location: 'San Francisco, CA', salary: '$175k - $215k', score: 88, hot: false, logo: '🎨' },
];

const mockPackets = [
  { id: 1, title: 'Senior Product Manager', company: 'Stripe', time: 'Today, 10:32 AM' },
  { id: 2, title: 'Product Manager, Growth', company: 'Notion', time: 'Today, 8:15 AM' },
  { id: 3, title: 'PM, Payments', company: 'Square', time: 'Yesterday, 4:22 PM' },
];

const weeklyData = [
  { day: 'Mon', value: 42 }, { day: 'Tue', value: 38 }, { day: 'Wed', value: 51 },
  { day: 'Thu', value: 45 }, { day: 'Fri', value: 47 }, { day: 'Sat', value: 23 }, { day: 'Sun', value: 18 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({ name: 'User', email: '', plan: 'Pro' });
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('jc_lang');
    if (savedLang) setLang(savedLang);

    const email = localStorage.getItem('jc_user_email');
    if (!email) {
      navigate('/login');
      return;
    }

    // Fetch user data
    fetch(`${API_BASE}/users?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(users => {
        const userData = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
        if (userData) {
          setUser({
            name: userData.full_name || email.split('@')[0],
            email: userData.email,
            plan: userData.plan || 'trial',
          });
        } else {
          setUser({ name: email.split('@')[0], email, plan: 'trial' });
        }
      })
      .catch(() => {
        setUser({ name: email.split('@')[0], email, plan: 'trial' });
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jc_user_email');
    navigate('/services');
  };

  const colors = {
    void: '#06060A',
    night: '#0A0A10',
    charcoal: '#101014',
    mint: '#3CFFD0',
    mintGlow: 'rgba(60, 255, 208, 0.5)',
    mintSoft: 'rgba(60, 255, 208, 0.12)',
    mintBorder: 'rgba(60, 255, 208, 0.25)',
    lavender: '#A78BFA',
    lavenderSoft: 'rgba(167, 139, 250, 0.12)',
    coral: '#FF6B6B',
    gold: '#FFD93D',
    goldSoft: 'rgba(255, 217, 61, 0.12)',
    text100: '#FFFFFF',
    text60: 'rgba(255, 255, 255, 0.6)',
    text40: 'rgba(255, 255, 255, 0.4)',
    text10: 'rgba(255, 255, 255, 0.06)',
  };

  const stats = { forwarded: 47, matched: 12, packets: 8, applications: 5 };

  // Sidebar component
  const Sidebar = ({ mobile = false }) => (
    <div style={{
      width: mobile ? '100%' : '280px',
      minWidth: mobile ? 'auto' : '280px',
      background: colors.night,
      borderRight: mobile ? 'none' : `1px solid ${colors.text10}`,
      padding: '28px 0',
      display: 'flex',
      flexDirection: 'column',
      height: mobile ? 'auto' : '100vh',
      position: mobile ? 'relative' : 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px', marginBottom: 36 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <div style={{
            width: 44, height: 44, background: colors.mint, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 20, color: colors.void,
            boxShadow: `0 0 30px ${colors.mintGlow}`,
          }}>Z</div>
          <span style={{ fontSize: 20, fontWeight: 600, color: colors.text100 }}>JobConcierge</span>
        </Link>
      </div>

      {/* User Card */}
      <div style={{ padding: '0 16px', marginBottom: 28 }}>
        <div style={{
          padding: 18, background: `linear-gradient(135deg, ${colors.mintSoft}, ${colors.lavenderSoft})`,
          border: `1px solid ${colors.mintBorder}`, borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 46, height: 46, background: `linear-gradient(135deg, ${colors.mint}, ${colors.lavender})`,
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 600, color: colors.void,
          }}>{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: colors.text100, marginBottom: 2 }}>{user.name}</div>
            <div style={{
              display: 'inline-flex', padding: '3px 10px', background: colors.mint, borderRadius: 6,
              fontSize: 11, fontWeight: 700, color: colors.void, textTransform: 'uppercase',
            }}>{user.plan}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '0 12px' }}>
        <div style={{ padding: '0 12px', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: colors.text40, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {t.menu}
          </span>
        </div>
        {[
          { id: 'dashboard', icon: '◐', label: t.dashboard, count: null },
          { id: 'matches', icon: '◎', label: t.matches, count: 12 },
          { id: 'packets', icon: '❐', label: t.packets, count: 8 },
          { id: 'analytics', icon: '◧', label: t.analytics, count: null },
          { id: 'sources', icon: '⬡', label: t.sources, count: 5 },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => { setActiveTab(item.id); if (mobile) setSidebarOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', background: activeTab === item.id ? colors.mintSoft : 'transparent',
              border: activeTab === item.id ? `1px solid ${colors.mintBorder}` : '1px solid transparent',
              borderRadius: 12, marginBottom: 4, cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, color: activeTab === item.id ? colors.mint : colors.text60 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: activeTab === item.id ? 600 : 500, color: activeTab === item.id ? colors.mint : colors.text60 }}>
                {item.label}
              </span>
            </div>
            {item.count && (
              <span style={{
                padding: '2px 8px', background: activeTab === item.id ? colors.mint : colors.text10,
                borderRadius: 6, fontSize: 12, fontWeight: 600, color: activeTab === item.id ? colors.void : colors.text40,
              }}>{item.count}</span>
            )}
          </div>
        ))}

        <div style={{ height: 1, background: colors.text10, margin: '20px 12px' }} />

        <div style={{ padding: '0 12px', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: colors.text40, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {t.settings}
          </span>
        </div>
        {[
          { id: 'preferences', icon: '⚙', label: t.preferences },
          { id: 'billing', icon: '◈', label: t.billing },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => { setActiveTab(item.id); if (mobile) setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, cursor: 'pointer' }}
          >
            <span style={{ fontSize: 18, opacity: 0.5 }}>{item.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.text60 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Help & Logout */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ padding: 20, background: colors.charcoal, border: `1px solid ${colors.text10}`, borderRadius: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>💬</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text100, marginBottom: 4 }}>{t.help}</div>
          <p style={{ fontSize: 12, color: colors.text40, marginBottom: 14 }}>{t.helpDesc}</p>
          <button style={{
            width: '100%', padding: '11px 16px', background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${colors.text10}`, borderRadius: 10, fontSize: 13, fontWeight: 500, color: colors.text60, cursor: 'pointer',
          }}>{t.startChat}</button>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '12px 16px', background: 'transparent',
            border: `1px solid ${colors.text10}`, borderRadius: 10, fontSize: 13, fontWeight: 500, color: colors.text40,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <span>↪</span> {t.logOut}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.void,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: colors.text60,
    }}>
      {/* Mobile Header */}
      <div style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '16px 20px', background: colors.night, borderBottom: `1px solid ${colors.text10}`,
        alignItems: 'center', justifyContent: 'space-between',
      }} className="mobile-header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, background: colors.mint, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: colors.void,
          }}>Z</div>
          <span style={{ fontSize: 16, fontWeight: 600, color: colors.text100 }}>JobConcierge</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ height: 2, background: '#fff', borderRadius: 2, transform: sidebarOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.3s' }} />
            <span style={{ height: 2, background: '#fff', borderRadius: 2, opacity: sidebarOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ height: 2, background: '#fff', borderRadius: 2, transform: sidebarOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.3s' }} />
          </div>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{
          display: 'none',
          position: 'fixed', top: '68px', left: 0, right: 0, bottom: 0, zIndex: 999,
          background: colors.night, overflowY: 'auto',
        }} className="mobile-sidebar">
          <Sidebar mobile />
        </div>
      )}

      {/* Layout */}
      <div style={{ display: 'flex' }} className="dashboard-layout">
        {/* Desktop Sidebar */}
        <div className="desktop-sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main style={{
          flex: 1, padding: '36px 24px', overflowY: 'auto',
          background: `radial-gradient(ellipse at top right, rgba(60, 255, 208, 0.03) 0%, transparent 50%), ${colors.void}`,
        }} className="main-content">
          {/* Welcome Banner */}
          <div style={{
            padding: '24px', background: `linear-gradient(135deg, ${colors.mintSoft}, ${colors.lavenderSoft})`,
            border: `1px solid ${colors.mintBorder}`, borderRadius: 20, marginBottom: 24,
            display: 'flex', flexDirection: 'column', gap: 16,
          }} className="welcome-banner">
            <div>
              <h1 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 600, color: colors.text100, marginBottom: 10 }}>
                {t.greeting}, {user.name.split(' ')[0]} 👋
              </h1>
              <p style={{ fontSize: 15, color: colors.text60, lineHeight: 1.6 }}>
                {t.aiFound} <strong style={{ color: colors.mint }}>{stats.matched} {t.matchesToday}</strong>.<br />
                {stats.packets} {t.packetsReady}.
              </p>
            </div>
            <div style={{
              padding: '12px 20px', background: colors.mint, borderRadius: 10,
              display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
              boxShadow: `0 0 30px ${colors.mintGlow}`,
            }}>
              <div style={{ width: 10, height: 10, background: colors.void, borderRadius: '50%' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.void }}>{t.aiActive}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12, marginBottom: 24,
          }}>
            {[
              { icon: '📥', value: stats.forwarded, label: t.stats.forwarded, accent: true },
              { icon: '🎯', value: stats.matched, label: t.stats.matched },
              { icon: '📦', value: stats.packets, label: t.stats.packets },
              { icon: '📤', value: stats.applications, label: t.stats.applications },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: 20, background: colors.charcoal, border: `1px solid ${colors.text10}`, borderRadius: 16,
              }}>
                <div style={{
                  width: 40, height: 40, background: stat.accent ? colors.mintSoft : colors.text10,
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, marginBottom: 12,
                }}>{stat.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: stat.accent ? colors.mint : colors.text100, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: colors.text40 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Matches */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text100, marginBottom: 4 }}>{t.todaysMatches}</h2>
                <p style={{ fontSize: 13, color: colors.text40 }}>{t.aiSelected}</p>
              </div>
              <button style={{
                padding: '10px 18px', background: colors.text10, border: 'none', borderRadius: 10,
                fontSize: 13, fontWeight: 500, color: colors.text60, cursor: 'pointer',
              }}>{t.viewAll} →</button>
            </div>

            {mockMatches.map((job) => (
              <div key={job.id} style={{
                padding: 20, background: colors.charcoal, border: `1px solid ${colors.text10}`,
                borderRadius: 16, marginBottom: 12,
              }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{
                    width: 50, height: 50, background: colors.text10, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
                  }}>{job.logo}</div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text100 }}>{job.title}</h3>
                      {job.hot && (
                        <span style={{
                          padding: '3px 8px', background: 'rgba(255,107,107,0.12)', borderRadius: 6,
                          fontSize: 10, fontWeight: 700, color: colors.coral, textTransform: 'uppercase',
                        }}>{t.hot}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: colors.text40, marginBottom: 8 }}>{job.company} • {job.location}</p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 13, color: colors.text60, marginBottom: 12 }}>
                      <span>💰 {job.salary}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button style={{
                        padding: '10px 20px', background: colors.mint, border: 'none', borderRadius: 8,
                        fontSize: 13, fontWeight: 600, color: colors.void, cursor: 'pointer',
                      }}>{t.generatePacket} ⚡</button>
                      <button style={{
                        padding: '10px 16px', background: 'transparent', border: `1px solid ${colors.text10}`,
                        borderRadius: 8, fontSize: 13, fontWeight: 500, color: colors.text60, cursor: 'pointer',
                      }}>{t.save}</button>
                    </div>
                  </div>
                  <div style={{
                    padding: '10px 14px', background: job.score >= 90 ? colors.mintSoft : colors.text10,
                    border: job.score >= 90 ? `1px solid ${colors.mintBorder}` : 'none',
                    borderRadius: 12, textAlign: 'center', alignSelf: 'flex-start',
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: job.score >= 90 ? colors.mint : colors.text100 }}>
                      {job.score}
                    </div>
                    <div style={{ fontSize: 10, color: colors.text40, textTransform: 'uppercase' }}>Match</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Packets */}
          <div style={{
            padding: 24, background: colors.charcoal, border: `1px solid ${colors.text10}`, borderRadius: 20, marginBottom: 24,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text100 }}>{t.recentPackets}</h2>
              <span style={{
                padding: '4px 12px', background: colors.lavenderSoft, borderRadius: 8,
                fontSize: 12, fontWeight: 600, color: colors.lavender,
              }}>{mockPackets.length} {t.ready}</span>
            </div>

            {mockPackets.map((packet, i) => (
              <div key={packet.id} style={{
                display: 'flex', alignItems: 'center', padding: '14px 0',
                borderBottom: i < mockPackets.length - 1 ? `1px solid ${colors.text10}` : 'none',
                flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{
                  width: 42, height: 42, background: `linear-gradient(135deg, ${colors.lavenderSoft}, ${colors.mintSoft})`,
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>📦</div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: colors.text100, marginBottom: 2 }}>{packet.title}</div>
                  <div style={{ fontSize: 12, color: colors.text40 }}>{packet.company} • {packet.time}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: 'none',
                    borderRadius: 8, fontSize: 12, fontWeight: 500, color: colors.text60, cursor: 'pointer',
                  }}>{t.pdf}</button>
                  <button style={{
                    padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: 'none',
                    borderRadius: 8, fontSize: 12, fontWeight: 500, color: colors.text60, cursor: 'pointer',
                  }}>{t.docx}</button>
                </div>
              </div>
            ))}

            <button style={{
              width: '100%', padding: '14px', marginTop: 16, background: 'transparent',
              border: `1px solid ${colors.text10}`, borderRadius: 12, fontSize: 13, fontWeight: 500,
              color: colors.text60, cursor: 'pointer',
            }}>{t.viewAllPackets} →</button>
          </div>

          {/* Data Notice */}
          <div style={{
            padding: 16, background: colors.lavenderSoft, border: `1px solid rgba(167, 139, 250, 0.2)`,
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 18 }}>💾</span>
            <p style={{ fontSize: 13, color: colors.text60 }}>{t.dataNotice}</p>
          </div>
        </main>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-header { display: flex !important; }
          .mobile-sidebar { display: block !important; }
          .desktop-sidebar { display: none !important; }
          .main-content { padding-top: 100px !important; }
          .welcome-banner { flex-direction: column !important; }
        }
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
          .mobile-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
