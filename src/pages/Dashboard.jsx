import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://job-concierge-production-dcb5.up.railway.app';

const CSS = `
  * { box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.5s ease 0.1s forwards; opacity: 0; }
  .fade-up-2 { animation: fadeUp 0.5s ease 0.2s forwards; opacity: 0; }
  .fade-up-3 { animation: fadeUp 0.5s ease 0.3s forwards; opacity: 0; }
  
  .glass-card {
    background: rgba(12,12,20,0.85); backdrop-filter: blur(40px);
    border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px;
  }
  
  .stat-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; padding: 24px; transition: all 0.3s;
  }
  .stat-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(60,255,208,0.2); }
  
  .premium-btn {
    padding: 14px 24px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600;
    color: #0a0a0f; background: linear-gradient(135deg, #3CFFD0, #00D4AA);
    border: none; border-radius: 10px; cursor: pointer; transition: all 0.3s;
  }
  .premium-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(60,255,208,0.35); }
  
  .outline-btn {
    padding: 10px 20px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600;
    color: #fff; background: transparent; border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px; cursor: pointer; transition: all 0.3s;
  }
  .outline-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }
  
  .progress-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #3CFFD0, #00D4AA); border-radius: 4px; transition: width 0.5s; }
`;

const PLAN_QUOTAS = { trial: 3, free: 3, basic: 5, pro: 15, vip: 30, enterprise: 100 };
const PLAN_COLORS = { trial: '#3CFFD0', free: '#9CA3AF', basic: '#60A5FA', pro: '#A78BFA', vip: '#F472B6', enterprise: '#FBBF24' };

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('jc_user_email');
    if (!email) { navigate('/login'); return; }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/users?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const users = await res.json();
          const userData = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
          if (userData) {
            setUser({ ...userData, quota_total: PLAN_QUOTAS[userData.plan] || 3 });
          } else {
            // User not in DB yet, show basic info
            setUser({ email, full_name: email.split('@')[0], plan: 'trial', quota_remaining: 3, quota_total: 3 });
          }
        } else {
          setUser({ email, full_name: email.split('@')[0], plan: 'trial', quota_remaining: 3, quota_total: 3 });
        }
      } catch (err) {
        console.error(err);
        setUser({ email, full_name: email.split('@')[0], plan: 'trial', quota_remaining: 3, quota_total: 3 });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jc_user_email');
    navigate('/login');
  };

  if (loading) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{ minHeight: '100vh', background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
          <div style={{ textAlign: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="#3CFFD0" strokeWidth="3" fill="none" opacity="0.2" />
              <path fill="#3CFFD0" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z" />
            </svg>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  const planColor = PLAN_COLORS[user?.plan] || '#3CFFD0';
  const quotaPercent = ((user?.quota_remaining ?? 0) / (user?.quota_total || 3)) * 100;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: '100vh', background: '#08080f', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
        {/* Background */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,255,208,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

        {/* Header */}
        <header style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3CFFD0, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0a0a0f' }}>Z</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Job Concierge</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{user?.email}</span>
            <button onClick={handleLogout} className="outline-btn">Sign Out</button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
          {/* Welcome */}
          <div className="fade-up" style={{ marginBottom: 40 }}>
            <h1 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 700, color: '#fff' }}>
              Welcome back, {user?.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
              Here's your job application automation overview
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
            {/* Plan Card */}
            <div className="stat-card fade-up-1">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current Plan</span>
                <div style={{ padding: '4px 12px', borderRadius: 20, background: `${planColor}20`, border: `1px solid ${planColor}40` }}>
                  <span style={{ color: planColor, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{user?.plan || 'Trial'}</span>
                </div>
              </div>
              <p style={{ margin: '0 0 16px', fontSize: 28, fontWeight: 700, color: '#fff' }}>{user?.quota_total || 3} jobs/day</p>
              <button className="premium-btn" style={{ width: '100%' }} onClick={() => navigate('/get-started')}>Upgrade Plan</button>
            </div>

            {/* Quota Card */}
            <div className="stat-card fade-up-2">
              <div style={{ marginBottom: 16 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Daily Quota</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, color: '#fff' }}>
                {user?.quota_remaining ?? 0} <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>/ {user?.quota_total || 3}</span>
              </p>
              <div className="progress-bar" style={{ marginBottom: 12 }}>
                <div className="progress-fill" style={{ width: `${quotaPercent}%` }} />
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Jobs remaining • Resets daily</p>
            </div>

            {/* Status Card */}
            <div className="stat-card fade-up-3">
              <div style={{ marginBottom: 16 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Account Status</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, color: '#3CFFD0' }}>Active ✓</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Your account is in good standing</p>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="glass-card fade-up-3">
            <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700, color: '#fff' }}>🚀 Quick Start Guide</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {[
                { num: 1, title: 'Forward Job Alerts', desc: 'Forward job alert emails from LinkedIn, Indeed, or any job board to:', highlight: 'admin@zjobconcierge.com' },
                { num: 2, title: 'We Process Daily', desc: 'Our AI analyzes jobs at 6 AM CT and creates personalized application packets.' },
                { num: 3, title: 'Check Your Email', desc: 'Receive tailored resumes, cover letters, and interview prep for each matched job.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'rgba(60,255,208,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3CFFD0', fontSize: 14, fontWeight: 700 }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#fff' }}>{step.title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{step.desc}</p>
                    {step.highlight && (
                      <p style={{ margin: '8px 0 0', display: 'inline-block', padding: '8px 12px', borderRadius: 8, background: 'rgba(60,255,208,0.1)', color: '#3CFFD0', fontSize: 14, fontFamily: 'monospace' }}>
                        {step.highlight}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              Need help? Contact us at <a href="mailto:admin@zjobconcierge.com" style={{ color: '#3CFFD0', textDecoration: 'none' }}>admin@zjobconcierge.com</a>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
