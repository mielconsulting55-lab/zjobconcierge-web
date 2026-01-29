// ZJobConcierge - Elite Pricing Page V4
// "One Screen Decision" - Everything visible, ROI in cards, collapsible sections
// Copy this entire code into a new Framer Code Component

import { useState, useEffect } from "react"

export default function PricingV4() {
    const [billingCycle, setBillingCycle] = useState("monthly")
    const [showComparison, setShowComparison] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)
    const [hoveredPlan, setHoveredPlan] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState("pro")

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

    // Navigation
    const goToHome = () => (window.location.href = "/")
    const goToGetStarted = () => (window.location.href = "/get-started")
    const goToTryDemo = () => (window.location.href = "/try-demo")

    // Pricing
    const getPrice = (base) =>
        billingCycle === "annual" ? Math.round(base * 0.8) : base

    const plans = [
        {
            id: "basic",
            name: "Basic",
            icon: "🌱",
            price: getPrice(19),
            jobsPerDay: 5,
            jobsPerMonth: 150,
            costPerPacket: "0.13",
            roi: "526",
            color: lavender,
            colorSoft: lavenderSoft,
            colorBorder: lavenderBorder,
        },
        {
            id: "pro",
            name: "Pro",
            icon: "⚡",
            price: getPrice(39),
            jobsPerDay: 10,
            jobsPerMonth: 300,
            costPerPacket: "0.13",
            roi: "512",
            color: mint,
            colorSoft: mintSoft,
            colorBorder: mintBorder,
            popular: true,
        },
        {
            id: "vip",
            name: "VIP",
            icon: "👑",
            price: getPrice(79),
            jobsPerDay: 15,
            jobsPerMonth: 450,
            costPerPacket: "0.18",
            roi: "253",
            color: gold,
            colorSoft: goldSoft,
            colorBorder: goldBorder,
        },
    ]

    // Comparison data
    const comparisonData = [
        {
            category: "📊 Daily Volume",
            features: [
                { name: "Jobs per day", basic: "5", pro: "10", vip: "15" },
                {
                    name: "Packets per month",
                    basic: "~150",
                    pro: "~300",
                    vip: "~450",
                },
                {
                    name: "Delivery",
                    basic: "Telegram + Email",
                    pro: "Telegram + Email",
                    vip: "Priority",
                },
            ],
        },
        {
            category: "📈 Tracker Dashboard",
            features: [
                {
                    name: "Packets generated",
                    basic: true,
                    pro: true,
                    vip: true,
                },
                { name: "% Match score", basic: true, pro: true, vip: true },
                { name: "% ATS pass rate", basic: true, pro: true, vip: true },
                {
                    name: "Skipped jobs + reason",
                    basic: false,
                    pro: true,
                    vip: true,
                },
                { name: "Weekly summary", basic: false, pro: true, vip: true },
                { name: "Export to CSV", basic: false, pro: false, vip: true },
            ],
        },
        {
            category: "📄 Documents",
            features: [
                { name: "Tailored Resume", basic: true, pro: true, vip: true },
                { name: "ATS-Optimized", basic: true, pro: true, vip: true },
                {
                    name: "Executive Resume",
                    basic: false,
                    pro: false,
                    vip: true,
                },
                {
                    name: "Cover Letter",
                    basic: "Basic",
                    pro: "Personal",
                    vip: "Premium",
                },
            ],
        },
        {
            category: "🏢 Research",
            features: [
                {
                    name: "Company Overview",
                    basic: false,
                    pro: "Basic",
                    vip: "Deep",
                },
                {
                    name: "Thank-You Email",
                    basic: false,
                    pro: "Template",
                    vip: "Personal",
                },
                {
                    name: "Follow-Up Email",
                    basic: false,
                    pro: false,
                    vip: "Template",
                },
            ],
        },
        {
            category: "🎯 Interview Prep",
            features: [
                { name: "Prep Questions", basic: "15", pro: "25", vip: "35" },
                { name: "Flashcards", basic: false, pro: false, vip: true },
                {
                    name: "Salary Insights",
                    basic: false,
                    pro: false,
                    vip: true,
                },
            ],
        },
    ]

    // FAQs - compact
    const faqs = [
        {
            q: "What's in the 7-day free trial?",
            a: "5 jobs/day for 7 days = 35 packets. Full features. No credit card.",
        },
        {
            q: "What's a 'packet'?",
            a: "Resume + Cover Letter + Interview Prep — all tailored to that specific job.",
        },
        {
            q: "Can I switch plans?",
            a: "Yes. Upgrade instantly, downgrade next cycle. No penalties.",
        },
        {
            q: "How fast do I get packets?",
            a: "2-5 minutes. VIP gets priority processing.",
        },
    ]

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: void_,
                fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                color: text80,
            }}
        >
            {/* ==================== NAV ==================== */}
            <nav
                style={{
                    padding: "14px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${text10}`,
                    background: "rgba(4, 4, 10, 0.95)",
                    backdropFilter: "blur(20px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                }}
            >
                <div
                    onClick={goToHome}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            background: mint,
                            borderRadius: 10,
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
                    <span
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: text100,
                        }}
                    >
                        JobConcierge
                    </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={goToHome}
                        style={{
                            padding: "8px 16px",
                            background: "transparent",
                            border: "none",
                            fontSize: 13,
                            color: text40,
                            cursor: "pointer",
                        }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={goToTryDemo}
                        style={{
                            padding: "8px 16px",
                            background: mint,
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            color: void_,
                            cursor: "pointer",
                        }}
                    >
                        Try Free
                    </button>
                </div>
            </nav>

            {/* ==================== HERO (Minimal) ==================== */}
            <section style={{ padding: "40px 40px 24px", textAlign: "center" }}>
                <h1
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        color: text100,
                        marginBottom: 8,
                        letterSpacing: "-0.02em",
                    }}
                >
                    <span style={{ color: mint }}>300 packets.</span> $39/month.
                    Do the math.
                </h1>
                <p style={{ fontSize: 15, color: text40 }}>
                    Resume + Cover Letter + Interview Prep — tailored to each
                    job, delivered in minutes.
                </p>
            </section>

            {/* ==================== BILLING TOGGLE ==================== */}
            <section style={{ padding: "0 40px 24px", textAlign: "center" }}>
                <div
                    style={{
                        display: "inline-flex",
                        padding: 4,
                        background: charcoal,
                        borderRadius: 10,
                        gap: 4,
                    }}
                >
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        style={{
                            padding: "10px 20px",
                            background:
                                billingCycle === "monthly"
                                    ? slate
                                    : "transparent",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            color:
                                billingCycle === "monthly" ? text100 : text40,
                            cursor: "pointer",
                        }}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle("annual")}
                        style={{
                            padding: "10px 20px",
                            background:
                                billingCycle === "annual"
                                    ? slate
                                    : "transparent",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
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
                                padding: "2px 6px",
                                background: mintSoft,
                                borderRadius: 4,
                                fontSize: 10,
                                fontWeight: 700,
                                color: mint,
                            }}
                        >
                            -20%
                        </span>
                    </button>
                </div>
            </section>

            {/* ==================== PRICING CARDS (THE HERO) ==================== */}
            <section style={{ padding: "0 40px 20px" }}>
                <div
                    style={{
                        maxWidth: 1000,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1.15fr 1fr",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onMouseEnter={() => setHoveredPlan(plan.id)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            style={{
                                padding: plan.popular
                                    ? "28px 24px"
                                    : "24px 20px",
                                background: plan.popular
                                    ? `linear-gradient(180deg, ${charcoal} 0%, ${void_} 100%)`
                                    : charcoal,
                                border: plan.popular
                                    ? `2px solid ${mint}`
                                    : `1px solid ${hoveredPlan === plan.id ? plan.colorBorder : text10}`,
                                borderRadius: 20,
                                position: "relative",
                                textAlign: "center",
                                transform: plan.popular
                                    ? "scale(1.04)"
                                    : "scale(1)",
                                boxShadow: plan.popular
                                    ? `0 0 60px ${mintSoft}, 0 20px 40px rgba(0,0,0,0.4)`
                                    : "none",
                                transition: "all 0.2s ease",
                                zIndex: plan.popular ? 10 : 1,
                            }}
                        >
                            {/* Badge */}
                            {plan.popular && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: -12,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        padding: "6px 14px",
                                        background: mint,
                                        borderRadius: 20,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: void_,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    ⭐ Best Value
                                </div>
                            )}

                            {/* Icon + Name */}
                            <div style={{ fontSize: 28, marginBottom: 8 }}>
                                {plan.icon}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: plan.color,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: 12,
                                }}
                            >
                                {plan.name}
                            </div>

                            {/* Price */}
                            <div style={{ marginBottom: 4 }}>
                                <span style={{ fontSize: 14, color: text40 }}>
                                    $
                                </span>
                                <span
                                    style={{
                                        fontSize: 44,
                                        fontWeight: 700,
                                        color: text100,
                                    }}
                                >
                                    {plan.price}
                                </span>
                                <span style={{ fontSize: 13, color: text40 }}>
                                    /mo
                                </span>
                            </div>

                            {/* Volume */}
                            <div
                                style={{
                                    padding: "12px 16px",
                                    background: plan.popular
                                        ? "rgba(60,255,208,0.08)"
                                        : slate,
                                    borderRadius: 10,
                                    marginBottom: 12,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: plan.color,
                                    }}
                                >
                                    {plan.jobsPerDay}/day
                                </div>
                                <div style={{ fontSize: 12, color: text40 }}>
                                    ~{plan.jobsPerMonth} packets/mo
                                </div>
                            </div>

                            {/* ROI Box */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 8,
                                    marginBottom: 16,
                                }}
                            >
                                <div
                                    style={{
                                        padding: "10px 8px",
                                        background: slate,
                                        borderRadius: 8,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: text100,
                                        }}
                                    >
                                        ${plan.costPerPacket}
                                    </div>
                                    <div
                                        style={{ fontSize: 10, color: text40 }}
                                    >
                                        per packet
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: "10px 8px",
                                        background: `linear-gradient(135deg, ${plan.colorSoft}, transparent)`,
                                        border: `1px solid ${plan.colorBorder}`,
                                        borderRadius: 8,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: plan.color,
                                        }}
                                    >
                                        {plan.roi}x
                                    </div>
                                    <div
                                        style={{ fontSize: 10, color: text40 }}
                                    >
                                        potential ROI
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={goToGetStarted}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    background: plan.popular
                                        ? mint
                                        : "transparent",
                                    border: plan.popular
                                        ? "none"
                                        : `1px solid ${plan.colorBorder}`,
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: plan.popular ? void_ : plan.color,
                                    cursor: "pointer",
                                }}
                            >
                                {plan.popular ? "Get Pro" : `Get ${plan.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==================== FREE TRIAL BAR ==================== */}
            <section style={{ padding: "0 40px 20px" }}>
                <div
                    style={{
                        maxWidth: 700,
                        margin: "0 auto",
                        padding: "14px 24px",
                        background: `linear-gradient(90deg, ${mintSoft}, ${lavenderSoft})`,
                        border: `1px solid ${mintBorder}`,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 20 }}>🎁</span>
                        <div>
                            <span
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: text100,
                                }}
                            >
                                Free Trial:{" "}
                            </span>
                            <span style={{ fontSize: 14, color: text60 }}>
                                5/day for 7 days (35 packets) —{" "}
                            </span>
                            <span style={{ fontSize: 14, color: mint }}>
                                No credit card
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={goToTryDemo}
                        style={{
                            padding: "8px 20px",
                            background: mint,
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            color: void_,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Try Free →
                    </button>
                </div>
            </section>

            {/* ==================== INTERACTIVE ROI SLIDER ==================== */}
            <section style={{ padding: "0 40px 24px" }}>
                <div
                    style={{
                        maxWidth: 800,
                        margin: "0 auto",
                        padding: "24px 28px",
                        background: charcoal,
                        border: `1px solid ${text10}`,
                        borderRadius: 16,
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: text100,
                            }}
                        >
                            Slide to explore the value
                        </span>
                    </div>

                    {/* Slider Track */}
                    <div style={{ position: "relative", marginBottom: 24 }}>
                        {/* Track Background */}
                        <div
                            style={{
                                height: 8,
                                background: `linear-gradient(90deg, ${lavender}, ${mint}, ${gold})`,
                                borderRadius: 4,
                            }}
                        />

                        {/* Plan Markers */}
                        <div
                            style={{
                                position: "absolute",
                                top: -4,
                                left: 0,
                                right: 0,
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 8%",
                            }}
                        >
                            {plans.map((plan, i) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        background:
                                            selectedPlan === plan.id
                                                ? plan.color
                                                : slate,
                                        border: `2px solid ${selectedPlan === plan.id ? plan.color : text20}`,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        boxShadow:
                                            selectedPlan === plan.id
                                                ? `0 0 12px ${plan.color}`
                                                : "none",
                                        transition: "all 0.2s ease",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Clickable Areas */}
                        <div
                            style={{
                                position: "absolute",
                                top: -10,
                                left: 0,
                                right: 0,
                                bottom: -10,
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                            }}
                        >
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Plan Labels */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            marginBottom: 20,
                        }}
                    >
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    opacity: selectedPlan === plan.id ? 1 : 0.4,
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <div style={{ fontSize: 20, marginBottom: 4 }}>
                                    {plan.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: plan.color,
                                    }}
                                >
                                    {plan.name}
                                </div>
                                <div
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: text100,
                                    }}
                                >
                                    ${plan.price}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Live ROI Display */}
                    {(() => {
                        const activePlan =
                            plans.find((p) => p.id === selectedPlan) || plans[1]
                        return (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                    gap: 12,
                                    padding: 16,
                                    background: slate,
                                    borderRadius: 12,
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: text40,
                                            marginBottom: 4,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Invest
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 24,
                                            fontWeight: 700,
                                            color: activePlan.color,
                                        }}
                                    >
                                        ${activePlan.price}
                                    </div>
                                    <div
                                        style={{ fontSize: 11, color: text40 }}
                                    >
                                        /month
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: text40,
                                            marginBottom: 4,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Get
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 24,
                                            fontWeight: 700,
                                            color: text100,
                                        }}
                                    >
                                        {activePlan.jobsPerMonth}
                                    </div>
                                    <div
                                        style={{ fontSize: 11, color: text40 }}
                                    >
                                        packets/mo
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: text40,
                                            marginBottom: 4,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Cost
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 24,
                                            fontWeight: 700,
                                            color: mint,
                                        }}
                                    >
                                        ${activePlan.costPerPacket}
                                    </div>
                                    <div
                                        style={{ fontSize: 11, color: text40 }}
                                    >
                                        per packet
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "8px",
                                        background: `linear-gradient(135deg, ${activePlan.colorSoft}, transparent)`,
                                        borderRadius: 8,
                                        border: `1px solid ${activePlan.colorBorder}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: text40,
                                            marginBottom: 4,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        ROI
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 24,
                                            fontWeight: 700,
                                            color: activePlan.color,
                                        }}
                                    >
                                        {activePlan.roi}x
                                    </div>
                                    <div
                                        style={{ fontSize: 11, color: text40 }}
                                    >
                                        potential
                                    </div>
                                </div>
                            </div>
                        )
                    })()}

                    {/* Insight Line */}
                    {(() => {
                        const activePlan =
                            plans.find((p) => p.id === selectedPlan) || plans[1]
                        const years = Math.round(
                            20000 / (activePlan.price * 12)
                        )
                        return (
                            <div
                                style={{
                                    marginTop: 16,
                                    textAlign: "center",
                                    fontSize: 13,
                                    color: text60,
                                }}
                            >
                                One $20K raise pays for{" "}
                                <strong style={{ color: mint }}>
                                    {years} years
                                </strong>{" "}
                                of {activePlan.name}.
                            </div>
                        )
                    })()}
                </div>
            </section>

            {/* ==================== ALTERNATIVES ROW ==================== */}
            <section style={{ padding: "0 40px 24px" }}>
                <div
                    style={{
                        maxWidth: 800,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${coral}20`,
                            borderRadius: 10,
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                color: coral,
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                        >
                            ❌ Resume Writer
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: text100,
                            }}
                        >
                            $200+
                        </div>
                        <div style={{ fontSize: 11, color: text40 }}>
                            per resume • 3-5 days
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${coral}20`,
                            borderRadius: 10,
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                color: coral,
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                        >
                            ❌ Career Coach
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: text100,
                            }}
                        >
                            $150+
                        </div>
                        <div style={{ fontSize: 11, color: text40 }}>
                            per hour • limited
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "14px 16px",
                            background: `linear-gradient(135deg, ${mintSoft}, transparent)`,
                            border: `1px solid ${mintBorder}`,
                            borderRadius: 10,
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                color: mint,
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                        >
                            ✅ JobConcierge
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: mint,
                            }}
                        >
                            $0.13
                        </div>
                        <div style={{ fontSize: 11, color: text40 }}>
                            per packet • 2-5 min
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== EXPANDABLE COMPARISON ==================== */}
            <section style={{ padding: "0 40px 16px" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <button
                        onClick={() => setShowComparison(!showComparison)}
                        style={{
                            width: "100%",
                            padding: "16px 24px",
                            background: charcoal,
                            border: `1px solid ${text10}`,
                            borderRadius: showComparison ? "12px 12px 0 0" : 12,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: text100,
                            }}
                        >
                            Compare all features
                        </span>
                        <span
                            style={{
                                fontSize: 12,
                                color: mint,
                                transform: showComparison
                                    ? "rotate(180deg)"
                                    : "rotate(0)",
                                transition: "transform 0.2s",
                            }}
                        >
                            ▼
                        </span>
                    </button>

                    {showComparison && (
                        <div
                            style={{
                                background: charcoal,
                                border: `1px solid ${text10}`,
                                borderTop: "none",
                                borderRadius: "0 0 12px 12px",
                                overflow: "hidden",
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                    background: slate,
                                    borderBottom: `1px solid ${text10}`,
                                }}
                            >
                                <div style={{ padding: "12px 20px" }} />
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        textAlign: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: lavender,
                                        }}
                                    >
                                        Basic
                                    </span>
                                </div>
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        textAlign: "center",
                                        background: mintSoft,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: mint,
                                        }}
                                    >
                                        Pro ⭐
                                    </span>
                                </div>
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        textAlign: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: gold,
                                        }}
                                    >
                                        VIP
                                    </span>
                                </div>
                            </div>

                            {/* Sections */}
                            {comparisonData.map((section, sIdx) => (
                                <div key={sIdx}>
                                    <div
                                        style={{
                                            padding: "10px 20px",
                                            background:
                                                "rgba(255,255,255,0.02)",
                                            borderBottom: `1px solid ${text10}`,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: mint,
                                            }}
                                        >
                                            {section.category}
                                        </span>
                                    </div>
                                    {section.features.map((row, rIdx) => (
                                        <div
                                            key={rIdx}
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "2fr 1fr 1fr 1fr",
                                                borderBottom: `1px solid ${text10}`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "10px 20px",
                                                    fontSize: 13,
                                                    color: text80,
                                                }}
                                            >
                                                {row.name}
                                            </div>
                                            {[row.basic, row.pro, row.vip].map(
                                                (val, vIdx) => (
                                                    <div
                                                        key={vIdx}
                                                        style={{
                                                            padding:
                                                                "10px 16px",
                                                            textAlign: "center",
                                                            background:
                                                                vIdx === 1
                                                                    ? "rgba(60,255,208,0.03)"
                                                                    : "transparent",
                                                        }}
                                                    >
                                                        {val === true ? (
                                                            <span
                                                                style={{
                                                                    color: mint,
                                                                }}
                                                            >
                                                                ✓
                                                            </span>
                                                        ) : val === false ? (
                                                            <span
                                                                style={{
                                                                    color: text40,
                                                                }}
                                                            >
                                                                —
                                                            </span>
                                                        ) : (
                                                            <span
                                                                style={{
                                                                    fontSize: 12,
                                                                    color:
                                                                        vIdx ===
                                                                        1
                                                                            ? mint
                                                                            : text60,
                                                                }}
                                                            >
                                                                {val}
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ==================== ENTERPRISE LINK ==================== */}
            <section style={{ padding: "0 40px 16px" }}>
                <div
                    style={{
                        maxWidth: 600,
                        margin: "0 auto",
                        padding: "12px 20px",
                        background: charcoal,
                        border: `1px solid ${text10}`,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span style={{ fontSize: 16 }}>🏢</span>
                        <span style={{ fontSize: 13, color: text60 }}>
                            Need{" "}
                            <strong style={{ color: text100 }}>
                                20+ jobs/day
                            </strong>
                            ? Enterprise from $299/mo
                        </span>
                    </div>
                    <button
                        style={{
                            padding: "6px 14px",
                            background: "transparent",
                            border: `1px solid ${lavenderBorder}`,
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            color: lavender,
                            cursor: "pointer",
                        }}
                    >
                        Contact →
                    </button>
                </div>
            </section>

            {/* ==================== FAQ (Compact) ==================== */}
            <section style={{ padding: "16px 40px 24px" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: text100,
                            marginBottom: 12,
                            textAlign: "center",
                        }}
                    >
                        Quick answers
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                style={{
                                    background: charcoal,
                                    border: `1px solid ${openFaq === i ? mintBorder : text10}`,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    onClick={() =>
                                        setOpenFaq(openFaq === i ? null : i)
                                    }
                                    style={{
                                        padding: "12px 16px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color:
                                                openFaq === i ? mint : text100,
                                        }}
                                    >
                                        {faq.q}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 10,
                                            color: text40,
                                            transform:
                                                openFaq === i
                                                    ? "rotate(180deg)"
                                                    : "rotate(0)",
                                            transition: "transform 0.2s",
                                        }}
                                    >
                                        ▼
                                    </span>
                                </div>
                                {openFaq === i && (
                                    <div style={{ padding: "0 16px 12px" }}>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: text60,
                                                margin: 0,
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TRUST STRIP ==================== */}
            <section style={{ padding: "16px 40px 32px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 32,
                    }}
                >
                    {[
                        { icon: "🔒", text: "Secure" },
                        { icon: "⚡", text: "Instant delivery" },
                        { icon: "🚫", text: "Cancel anytime" },
                        { icon: "💬", text: "24/7 support" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span style={{ fontSize: 14 }}>{item.icon}</span>
                            <span style={{ fontSize: 12, color: text40 }}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==================== FOOTER ==================== */}
            <footer
                style={{
                    padding: "16px 40px",
                    borderTop: `1px solid ${text10}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span style={{ fontSize: 12, color: text40 }}>
                    © 2025 JobConcierge
                </span>
                <div style={{ display: "flex", gap: 20 }}>
                    {["Privacy", "Terms", "Support"].map((link, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: 12,
                                color: text40,
                                cursor: "pointer",
                            }}
                        >
                            {link}
                        </span>
                    ))}
                </div>
            </footer>
        </div>
    )
}
