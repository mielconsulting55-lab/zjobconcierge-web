// ZJobConcierge - Unified Get Started Flow
// Entry point for /get-started → Plan Selection → Checkout Flow
// Copy this entire code into a new Framer Code Component

import { useState, useEffect } from "react"

export default function JobConciergeUnifiedFlow() {
    const [selectedPlan, setSelectedPlan] = useState("pro")
    const [billingCycle, setBillingCycle] = useState("monthly")
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [liveCount, setLiveCount] = useState(147)

    // Colors
    const void_ = "#04040A"
    const night = "#08080E"
    const charcoal = "#0E0E14"
    const slate = "#151519"
    const mist = "#1C1C22"

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

    // Plans data
    const plans = [
        {
            id: "free",
            name: "Free Trial",
            icon: "🎁",
            price: 0,
            annualPrice: 0,
            jobsPerDay: 5,
            jobsPerMonth: 35,
            duration: "7 days",
            color: mint,
            features: ["5 jobs/day", "35 total packets", "Basic analysis", "Telegram delivery"],
        },
        {
            id: "basic",
            name: "Basic",
            icon: "🌱",
            price: 19,
            annualPrice: 15,
            jobsPerDay: 5,
            jobsPerMonth: 150,
            color: lavender,
            features: ["5 jobs/day", "150 packets/mo", "Match scoring", "Resume + Cover letter"],
        },
        {
            id: "pro",
            name: "Pro",
            icon: "⚡",
            price: 39,
            annualPrice: 31,
            jobsPerDay: 10,
            jobsPerMonth: 300,
            color: mint,
            popular: true,
            features: ["10 jobs/day", "300 packets/mo", "Interview prep", "Company research", "Priority support"],
        },
        {
            id: "vip",
            name: "VIP",
            icon: "👑",
            price: 79,
            annualPrice: 63,
            jobsPerDay: 15,
            jobsPerMonth: 450,
            color: gold,
            features: ["15 jobs/day", "450 packets/mo", "Flashcards", "Salary insights", "Executive resume", "Concierge support"],
        },
    ]

    // Navigation
    const goToHome = () => (window.location.href = "/")
    const goToPricing = () => (window.location.href = "/pricing")
    const goToCheckout = (plan) => (window.location.href = `/checkout?plan=${plan}`)
    const goToTryDemo = () => (window.location.href = "/try-demo")

    // Live counter effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                setLiveCount((prev) => prev + Math.floor(Math.random() * 2) + 1)
            }
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const getPrice = (plan) => {
        return billingCycle === "annual" ? plan.annualPrice : plan.price
    }

    const handleContinue = () => {
        setIsSubmitting(true)
        setTimeout(() => {
            goToCheckout(selectedPlan)
        }, 500)
    }

    const activePlan = plans.find((p) => p.id === selectedPlan) || plans[2]

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
            {/* Background gradients */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(ellipse at 20% 20%, rgba(60, 255, 208, 0.06) 0%, transparent 50%),
                               radial-gradient(ellipse at 80% 80%, rgba(167, 139, 250, 0.04) 0%, transparent 50%)`,
                    pointerEvents: "none",
                }}
            />

            {/* Nav */}
            <nav
                style={{
                    position: "relative",
                    zIndex: 100,
                    padding: "16px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${text10}`,
                }}
            >
                <div
                    onClick={goToHome}
                    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
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

                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 16px",
                            background: mintSoft,
                            border: `1px solid ${mintBorder}`,
                            borderRadius: 9999,
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
                            {liveCount} signed up today
                        </span>
                    </div>
                    <button
                        onClick={goToHome}
                        style={{
                            padding: "8px 16px",
                            background: "transparent",
                            border: `1px solid ${text20}`,
                            borderRadius: 8,
                            fontSize: 13,
                            color: text40,
                            cursor: "pointer",
                        }}
                    >
                        ← Back
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main
                style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "60px 48px 80px",
                    maxWidth: 1100,
                    margin: "0 auto",
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 20px",
                            background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                            border: `1px solid ${mintBorder}`,
                            borderRadius: 9999,
                            marginBottom: 20,
                        }}
                    >
                        <span style={{ fontSize: 18 }}>🚀</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: text100 }}>
                            Choose Your Plan
                        </span>
                    </div>
                    <h1
                        style={{
                            fontSize: 44,
                            fontWeight: 700,
                            color: text100,
                            letterSpacing: "-0.02em",
                            marginBottom: 12,
                        }}
                    >
                        Start landing your <span style={{ color: mint }}>dream job</span>
                    </h1>
                    <p style={{ fontSize: 17, color: text40, lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
                        Select a plan that fits your job search. Upgrade or downgrade anytime.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                    <div
                        style={{
                            display: "flex",
                            padding: 4,
                            background: charcoal,
                            borderRadius: 12,
                            gap: 4,
                        }}
                    >
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            style={{
                                padding: "12px 24px",
                                background: billingCycle === "monthly" ? slate : "transparent",
                                border: "none",
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: 600,
                                color: billingCycle === "monthly" ? text100 : text40,
                                cursor: "pointer",
                            }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            style={{
                                padding: "12px 24px",
                                background: billingCycle === "annual" ? slate : "transparent",
                                border: "none",
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: 600,
                                color: billingCycle === "annual" ? text100 : text40,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            Annual
                            <span
                                style={{
                                    padding: "3px 8px",
                                    background: mintSoft,
                                    borderRadius: 6,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: mint,
                                }}
                            >
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plan Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 16,
                        marginBottom: 40,
                    }}
                >
                    {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.id
                        const price = getPrice(plan)

                        return (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                style={{
                                    padding: plan.popular ? "28px 20px" : "24px 18px",
                                    background: isSelected
                                        ? `linear-gradient(180deg, ${charcoal} 0%, ${void_} 100%)`
                                        : charcoal,
                                    border: isSelected
                                        ? `2px solid ${plan.color}`
                                        : plan.popular
                                          ? `2px solid ${mint}50`
                                          : `1px solid ${text10}`,
                                    borderRadius: 20,
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "all 0.2s ease",
                                    transform: plan.popular ? "scale(1.02)" : "scale(1)",
                                }}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: -12,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            padding: "5px 14px",
                                            background: mint,
                                            borderRadius: 20,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: void_,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        ⭐ Most Popular
                                    </div>
                                )}

                                {/* Selection Indicator */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 16,
                                        right: 16,
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        background: isSelected ? plan.color : "transparent",
                                        border: isSelected ? "none" : `2px solid ${text20}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {isSelected && (
                                        <span style={{ color: void_, fontSize: 12, fontWeight: 700 }}>✓</span>
                                    )}
                                </div>

                                {/* Plan Icon */}
                                <div style={{ fontSize: 36, marginBottom: 12 }}>{plan.icon}</div>

                                {/* Plan Name */}
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: plan.color,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        marginBottom: 8,
                                    }}
                                >
                                    {plan.name}
                                </div>

                                {/* Price */}
                                <div style={{ marginBottom: 16 }}>
                                    <span style={{ fontSize: 36, fontWeight: 700, color: text100 }}>
                                        ${price}
                                    </span>
                                    <span style={{ fontSize: 14, color: text40 }}>
                                        {plan.id === "free" ? "" : "/mo"}
                                    </span>
                                    {plan.id === "free" && (
                                        <div style={{ fontSize: 12, color: text40, marginTop: 4 }}>
                                            {plan.duration}
                                        </div>
                                    )}
                                </div>

                                {/* Volume */}
                                <div
                                    style={{
                                        padding: "12px 14px",
                                        background: isSelected ? `${plan.color}15` : slate,
                                        borderRadius: 10,
                                        marginBottom: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            color: isSelected ? plan.color : text100,
                                        }}
                                    >
                                        {plan.jobsPerDay}/day
                                    </div>
                                    <div style={{ fontSize: 12, color: text40 }}>
                                        {plan.jobsPerMonth.toLocaleString()} packets
                                        {plan.id === "free" ? " total" : "/mo"}
                                    </div>
                                </div>

                                {/* Features */}
                                <div style={{ display: "grid", gap: 8 }}>
                                    {plan.features.slice(0, 4).map((feature, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                fontSize: 12,
                                                color: text60,
                                            }}
                                        >
                                            <span style={{ color: plan.color, fontSize: 10 }}>✓</span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Summary Bar */}
                <div
                    style={{
                        padding: "24px 32px",
                        background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                        border: `1px solid ${mintBorder}`,
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 24,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                background: `linear-gradient(135deg, ${activePlan.color}30, ${activePlan.color}10)`,
                                borderRadius: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 28,
                            }}
                        >
                            {activePlan.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: text100 }}>
                                {activePlan.name} Plan
                            </div>
                            <div style={{ fontSize: 14, color: text40 }}>
                                {activePlan.jobsPerDay} jobs/day • {activePlan.jobsPerMonth.toLocaleString()}{" "}
                                {selectedPlan === "free" ? "total packets" : "packets/mo"}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 32, fontWeight: 700, color: activePlan.color }}>
                                ${getPrice(activePlan)}
                                <span style={{ fontSize: 14, color: text40 }}>
                                    {selectedPlan === "free" ? "" : "/mo"}
                                </span>
                            </div>
                            {billingCycle === "annual" && selectedPlan !== "free" && (
                                <div style={{ fontSize: 12, color: mint }}>
                                    Save ${(activePlan.price - activePlan.annualPrice) * 12}/year
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleContinue}
                            disabled={isSubmitting}
                            style={{
                                padding: "16px 36px",
                                background: isSubmitting
                                    ? slate
                                    : `linear-gradient(135deg, ${mint}, #2DD4BF)`,
                                border: "none",
                                borderRadius: 12,
                                fontSize: 16,
                                fontWeight: 700,
                                color: isSubmitting ? text40 : void_,
                                cursor: isSubmitting ? "wait" : "pointer",
                                boxShadow: isSubmitting ? "none" : `0 0 30px ${mintGlow}`,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            {isSubmitting ? (
                                "Loading..."
                            ) : (
                                <>
                                    Continue
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 40,
                        marginBottom: 48,
                    }}
                >
                    {[
                        { icon: "🔒", text: "Secure checkout" },
                        { icon: "↩️", text: "Cancel anytime" },
                        { icon: "💬", text: "24/7 support" },
                        { icon: "⚡", text: "Instant access" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <span style={{ fontSize: 16 }}>{item.icon}</span>
                            <span style={{ fontSize: 13, color: text40 }}>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Try Demo Link */}
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 14, color: text40, marginBottom: 12 }}>
                        Not sure yet? See how it works first.
                    </p>
                    <button
                        onClick={goToTryDemo}
                        style={{
                            padding: "12px 28px",
                            background: "transparent",
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: 500,
                            color: text60,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <span>🎬</span>
                        Watch Demo
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer
                style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "20px 48px",
                    borderTop: `1px solid ${text10}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span style={{ fontSize: 12, color: text40 }}>© 2025 JobConcierge</span>
                <div style={{ display: "flex", gap: 20 }}>
                    {["Privacy", "Terms", "Support"].map((link, i) => (
                        <span key={i} style={{ fontSize: 12, color: text40, cursor: "pointer" }}>
                            {link}
                        </span>
                    ))}
                </div>
            </footer>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            `}</style>
        </div>
    )
}
