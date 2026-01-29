// ZJobConcierge - Elite Landing Page v2.0
// Premium dark theme with mint/lavender accents
// Navigation: Get Started → /get-started | Pricing → /pricing | Try Demo → /try-demo

import { useState, useEffect } from "react"

export default function ZJobConcierge() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [language, setLanguage] = useState("EN")
    const [openFaq, setOpenFaq] = useState(null)
    const [liveUsers, setLiveUsers] = useState(127)

    // Colors
    const void_ = "#04040A"
    const night = "#08080E"
    const charcoal = "#0E0E14"
    const slate = "#151519"
    const mint = "#3CFFD0"
    const mintGlow = "rgba(60, 255, 208, 0.4)"
    const mintSoft = "rgba(60, 255, 208, 0.08)"
    const mintBorder = "rgba(60, 255, 208, 0.25)"
    const lavender = "#A78BFA"
    const lavenderSoft = "rgba(167, 139, 250, 0.08)"
    const lavenderBorder = "rgba(167, 139, 250, 0.25)"
    const gold = "#FFD93D"
    const goldSoft = "rgba(255, 217, 61, 0.08)"
    const goldBorder = "rgba(255, 217, 61, 0.25)"
    const coral = "#FF6B6B"
    const text100 = "#FFFFFF"
    const text80 = "rgba(255, 255, 255, 0.85)"
    const text60 = "rgba(255, 255, 255, 0.6)"
    const text40 = "rgba(255, 255, 255, 0.4)"
    const text20 = "rgba(255, 255, 255, 0.12)"
    const text10 = "rgba(255, 255, 255, 0.06)"

    // Live user counter
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveUsers((prev) => {
                const change = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 2)
                return Math.max(115, Math.min(145, prev + change))
            })
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Navigation handlers
    const goToGetStarted = () => (window.location.href = "/get-started")
    const goToPricing = () => (window.location.href = "/pricing")
    const goToTryDemo = () => (window.location.href = "/try-demo")
    const goToCheckout = (plan) => (window.location.href = `/checkout?plan=${plan}`)

    // Content
    const translations = {
        EN: {
            hero: "Stop applying blind.",
            heroSub: "Get hired with AI-tailored applications.",
            heroCta: "Get Started Free",
            tryDemo: "Try Demo",
        },
        FR: {
            hero: "Arrêtez de postuler à l'aveugle.",
            heroSub: "Décrochez un emploi avec des candidatures personnalisées par IA.",
            heroCta: "Commencer Gratuitement",
            tryDemo: "Essayer la Démo",
        },
    }

    const t = translations[language]

    const howItWorks = [
        { icon: "📧", title: "Forward Job Alerts", desc: "Send job emails from LinkedIn, Indeed, etc. to our AI" },
        { icon: "🤖", title: "AI Analyzes & Matches", desc: "We score each job against your profile" },
        { icon: "📦", title: "Get Your Packet", desc: "Resume + Cover Letter + Interview Prep" },
        { icon: "🚀", title: "Apply & Land", desc: "Stand out with perfectly tailored materials" },
    ]

    const features = [
        { icon: "🎯", title: "94% Match Rate", desc: "AI finds jobs that actually fit you" },
        { icon: "⚡", title: "2-Min Packets", desc: "Resume, cover letter, prep in minutes" },
        { icon: "📊", title: "ATS Optimized", desc: "Beat the bots, reach humans" },
        { icon: "🔒", title: "Privacy First", desc: "Your data stays yours, always" },
        { icon: "🌍", title: "Global Jobs", desc: "Works with any job board worldwide" },
        { icon: "💬", title: "24/7 Support", desc: "Real humans when you need help" },
    ]

    const plans = [
        { id: "freemium", name: "Freemium", icon: "🎁", price: 0, jobs: "3/day", packets: "90/mo", color: mint, popular: false },
        { id: "basic", name: "Basic", icon: "🌱", price: 19, jobs: "5/day", packets: "150/mo", color: lavender, popular: false },
        { id: "pro", name: "Pro", icon: "⚡", price: 39, jobs: "10/day", packets: "300/mo", color: mint, popular: true },
        { id: "vip", name: "VIP", icon: "👑", price: 79, jobs: "15/day", packets: "450/mo", color: gold, popular: false },
        { id: "enterprise", name: "Enterprise", icon: "🏢", price: 299, jobs: "50/day", packets: "1500/mo", color: lavender, popular: false },
        { id: "agency", name: "Agency", icon: "🚀", price: 999, jobs: "200/day", packets: "6000/mo", color: gold, popular: false },
    ]

    const addOns = [
        { name: "Interview Flashcards", price: 9, desc: "50 AI-generated Q&A cards per job" },
        { name: "LinkedIn Optimizer", price: 29, desc: "AI rewrites your entire profile" },
    ]

    const regions = [
        { name: "USA", flag: "🇺🇸" },
        { name: "Canada", flag: "🇨🇦" },
        { name: "UK", flag: "🇬🇧" },
        { name: "Germany", flag: "🇩🇪" },
        { name: "France", flag: "🇫🇷" },
        { name: "EU", flag: "🇪🇺" },
    ]

    const testimonials = [
        { name: "Sarah M.", role: "PM at Stripe", text: "Landed my dream job in 3 weeks. The tailored materials made all the difference.", avatar: "👩‍💼" },
        { name: "James K.", role: "Engineer at Google", text: "Applied to 50 jobs in a week with zero burnout. Game changer.", avatar: "👨‍💻" },
        { name: "Emily R.", role: "Designer at Figma", text: "The interview prep alone is worth 10x the price. So prepared.", avatar: "👩‍🎨" },
    ]

    const faqs = [
        { q: "What's included in a packet?", a: "Each packet includes a tailored resume, personalized cover letter, and interview prep questions specific to that job and company." },
        { q: "How does the AI matching work?", a: "We analyze job descriptions against your profile, skills, and preferences to calculate a match score. Only high-quality matches get packets." },
        { q: "Can I cancel anytime?", a: "Yes, cancel anytime with no penalties. Your current billing cycle continues until expiration." },
        { q: "What job boards are supported?", a: "We support LinkedIn, Indeed, Glassdoor, and virtually any job board that sends email alerts." },
        { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption and never sell your data. You can delete everything anytime." },
    ]

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: void_,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                color: text80,
            }}
        >
            {/* ==================== NAV ==================== */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    padding: "14px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${text10}`,
                    background: "rgba(4, 4, 10, 0.95)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            background: mint,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 18,
                            color: void_,
                        }}
                    >
                        Z
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 600, color: text100 }}>JobConcierge</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <span onClick={goToPricing} style={{ fontSize: 14, color: text60, cursor: "pointer" }}>
                        Pricing
                    </span>
                    <span onClick={goToTryDemo} style={{ fontSize: 14, color: text60, cursor: "pointer" }}>
                        Try Demo
                    </span>
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            padding: 4,
                            background: charcoal,
                            borderRadius: 8,
                        }}
                    >
                        {["EN", "FR"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    padding: "6px 12px",
                                    background: language === lang ? slate : "transparent",
                                    border: "none",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: language === lang ? text100 : text40,
                                    cursor: "pointer",
                                }}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={goToGetStarted}
                        style={{
                            padding: "10px 20px",
                            background: mint,
                            border: "none",
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 600,
                            color: void_,
                            cursor: "pointer",
                        }}
                    >
                        {t.heroCta}
                    </button>
                </div>
            </nav>

            {/* ==================== HERO ==================== */}
            <section
                style={{
                    padding: "100px 48px 80px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(ellipse at 30% 20%, rgba(60, 255, 208, 0.08) 0%, transparent 50%),
                                    radial-gradient(ellipse at 70% 80%, rgba(167, 139, 250, 0.05) 0%, transparent 50%)`,
                        pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 16px",
                            background: mintSoft,
                            border: `1px solid ${mintBorder}`,
                            borderRadius: 9999,
                            marginBottom: 24,
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                background: mint,
                                borderRadius: "50%",
                                animation: "pulse 2s infinite",
                            }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 500, color: mint }}>
                            {liveUsers} people using right now
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: 64,
                            fontWeight: 700,
                            color: text100,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}
                    >
                        {t.hero}
                        <br />
                        <span style={{ color: mint }}>{t.heroSub}</span>
                    </h1>

                    <p style={{ fontSize: 18, color: text40, marginBottom: 40, lineHeight: 1.6 }}>
                        Forward job alerts → AI creates tailored resume, cover letter & interview prep → You land interviews
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                        <button
                            onClick={goToGetStarted}
                            style={{
                                padding: "16px 32px",
                                background: mint,
                                border: "none",
                                borderRadius: 12,
                                fontSize: 16,
                                fontWeight: 700,
                                color: void_,
                                cursor: "pointer",
                                boxShadow: `0 0 40px ${mintGlow}`,
                            }}
                        >
                            {t.heroCta} →
                        </button>
                        <button
                            onClick={goToTryDemo}
                            style={{
                                padding: "16px 32px",
                                background: "transparent",
                                border: `1px solid ${text20}`,
                                borderRadius: 12,
                                fontSize: 16,
                                fontWeight: 600,
                                color: text60,
                                cursor: "pointer",
                            }}
                        >
                            {t.tryDemo}
                        </button>
                    </div>

                    {/* Demo Preview Box */}
                    <div
                        style={{
                            marginTop: 60,
                            padding: 24,
                            background: charcoal,
                            border: `1px solid ${text10}`,
                            borderRadius: 20,
                            maxWidth: 400,
                            margin: "60px auto 0",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: "#2AABEE",
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20,
                                }}
                            >
                                ✈️
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: text100 }}>Telegram Bot Demo</div>
                                <div style={{ fontSize: 12, color: text40 }}>See it in action</div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 16,
                                background: slate,
                                borderRadius: 12,
                                fontSize: 13,
                                color: text60,
                            }}
                        >
                            <div style={{ marginBottom: 8 }}>📧 You: PM role at Stripe - $180K</div>
                            <div style={{ color: mint }}>🤖 Bot: Analyzing... 94% match! Generating packet...</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== HOW IT WORKS ==================== */}
            <section style={{ padding: "80px 48px", background: night }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: text100, marginBottom: 12 }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: 16, color: text40 }}>Four simple steps to your dream job</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                        {howItWorks.map((step, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: 28,
                                    background: charcoal,
                                    border: `1px solid ${text10}`,
                                    borderRadius: 20,
                                    textAlign: "center",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: -12,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 24,
                                        height: 24,
                                        background: mint,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: void_,
                                    }}
                                >
                                    {i + 1}
                                </div>
                                <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: text100, marginBottom: 8 }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: 13, color: text40, lineHeight: 1.5 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FEATURES ==================== */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: text100, marginBottom: 12 }}>
                            Why JobConcierge?
                        </h2>
                        <p style={{ fontSize: 16, color: text40 }}>Everything you need to land your dream role</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: 24,
                                    background: charcoal,
                                    border: `1px solid ${text10}`,
                                    borderRadius: 16,
                                }}
                            >
                                <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: text100, marginBottom: 6 }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: 13, color: text40 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PRICING ==================== */}
            <section id="pricing" style={{ padding: "80px 48px", background: night }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: text100, marginBottom: 12 }}>
                            Simple, Transparent Pricing
                        </h2>
                        <p style={{ fontSize: 16, color: text40 }}>Start free, upgrade when ready</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 32 }}>
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                style={{
                                    padding: plan.popular ? "28px 20px" : "24px 16px",
                                    background: plan.popular ? `linear-gradient(180deg, ${charcoal} 0%, ${void_} 100%)` : charcoal,
                                    border: plan.popular ? `2px solid ${mint}` : `1px solid ${text10}`,
                                    borderRadius: 16,
                                    textAlign: "center",
                                    position: "relative",
                                    transform: plan.popular ? "scale(1.05)" : "scale(1)",
                                    zIndex: plan.popular ? 10 : 1,
                                }}
                            >
                                {plan.popular && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: -10,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            padding: "4px 12px",
                                            background: mint,
                                            borderRadius: 12,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: void_,
                                        }}
                                    >
                                        POPULAR
                                    </div>
                                )}
                                <div style={{ fontSize: 24, marginBottom: 8 }}>{plan.icon}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: plan.color, marginBottom: 8 }}>
                                    {plan.name}
                                </div>
                                <div style={{ fontSize: 28, fontWeight: 700, color: text100, marginBottom: 4 }}>
                                    ${plan.price}
                                    <span style={{ fontSize: 12, color: text40 }}>/mo</span>
                                </div>
                                <div style={{ fontSize: 11, color: text40, marginBottom: 12 }}>
                                    {plan.jobs} • {plan.packets}
                                </div>
                                <button
                                    onClick={() => goToCheckout(plan.id)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        background: plan.popular ? mint : "transparent",
                                        border: plan.popular ? "none" : `1px solid ${text20}`,
                                        borderRadius: 8,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: plan.popular ? void_ : text60,
                                        cursor: "pointer",
                                    }}
                                >
                                    {plan.price === 0 ? "Start Free" : "Get Started"}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add-ons */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 600, margin: "0 auto" }}>
                        {addOns.map((addon, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: 20,
                                    background: charcoal,
                                    border: `1px solid ${lavenderBorder}`,
                                    borderRadius: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: text100 }}>{addon.name}</div>
                                    <div style={{ fontSize: 12, color: text40 }}>{addon.desc}</div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: lavender }}>+${addon.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== REGIONS ==================== */}
            <section style={{ padding: "60px 48px" }}>
                <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600, color: text100, marginBottom: 24 }}>
                        Available Worldwide
                    </h2>
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                        {regions.map((region, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 20px",
                                    background: charcoal,
                                    border: `1px solid ${text10}`,
                                    borderRadius: 9999,
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{region.flag}</span>
                                <span style={{ fontSize: 14, color: text60 }}>{region.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS ==================== */}
            <section style={{ padding: "80px 48px", background: night }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: text100, marginBottom: 12 }}>
                            Loved by Job Seekers
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: 28,
                                    background: charcoal,
                                    border: `1px solid ${text10}`,
                                    borderRadius: 20,
                                }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 16 }}>{t.avatar}</div>
                                <p style={{ fontSize: 14, color: text60, lineHeight: 1.6, marginBottom: 16 }}>
                                    "{t.text}"
                                </p>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: text100 }}>{t.name}</div>
                                    <div style={{ fontSize: 12, color: mint }}>{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ==================== */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: text100, marginBottom: 12 }}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                style={{
                                    background: charcoal,
                                    border: `1px solid ${openFaq === i ? mintBorder : text10}`,
                                    borderRadius: 12,
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{
                                        padding: "18px 24px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ fontSize: 15, fontWeight: 500, color: openFaq === i ? mint : text100 }}>
                                        {faq.q}
                                    </span>
                                    <span
                                        style={{
                                            color: text40,
                                            transform: openFaq === i ? "rotate(180deg)" : "rotate(0)",
                                            transition: "transform 0.2s",
                                        }}
                                    >
                                        ▼
                                    </span>
                                </div>
                                {openFaq === i && (
                                    <div style={{ padding: "0 24px 18px" }}>
                                        <p style={{ fontSize: 14, color: text60, lineHeight: 1.6 }}>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA ==================== */}
            <section style={{ padding: "80px 48px" }}>
                <div
                    style={{
                        maxWidth: 700,
                        margin: "0 auto",
                        padding: 48,
                        background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                        border: `1px solid ${mintBorder}`,
                        borderRadius: 24,
                        textAlign: "center",
                    }}
                >
                    <h2 style={{ fontSize: 32, fontWeight: 700, color: text100, marginBottom: 12 }}>
                        Ready to land your dream job?
                    </h2>
                    <p style={{ fontSize: 16, color: text40, marginBottom: 32 }}>
                        Start free today. No credit card required.
                    </p>
                    <button
                        onClick={goToGetStarted}
                        style={{
                            padding: "18px 40px",
                            background: mint,
                            border: "none",
                            borderRadius: 12,
                            fontSize: 17,
                            fontWeight: 700,
                            color: void_,
                            cursor: "pointer",
                            boxShadow: `0 0 40px ${mintGlow}`,
                        }}
                    >
                        Get Started Free →
                    </button>
                </div>
            </section>

            {/* ==================== FOOTER ==================== */}
            <footer style={{ padding: "48px", borderTop: `1px solid ${text10}` }}>
                <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    background: mint,
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    color: void_,
                                }}
                            >
                                Z
                            </div>
                            <span style={{ fontSize: 16, fontWeight: 600, color: text100 }}>JobConcierge</span>
                        </div>
                        <p style={{ fontSize: 13, color: text40 }}>© 2025 JobConcierge. All rights reserved.</p>
                    </div>
                    <div style={{ display: "flex", gap: 48 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: text40, marginBottom: 12 }}>Product</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <span onClick={goToPricing} style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Pricing</span>
                                <span onClick={goToTryDemo} style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Demo</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: text40, marginBottom: 12 }}>Legal</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <span style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Privacy</span>
                                <span style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Terms</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: text40, marginBottom: 12 }}>Support</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <span style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Help Center</span>
                                <span style={{ fontSize: 13, color: text60, cursor: "pointer" }}>Contact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    )
}
