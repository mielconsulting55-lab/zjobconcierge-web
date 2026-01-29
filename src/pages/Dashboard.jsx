// ZJobConcierge - Premium Dashboard (Enhanced)
// Same layout, elevated design - cinematic, premium, top-notch UX
// Copy this entire code into a new Framer Code Component

import { useState } from "react"

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [selectedPeriod, setSelectedPeriod] = useState("week")

    // Mock user data
    const user = {
        name: "Sarah",
        email: "sarah@example.com",
        plan: "Pro",
        memberSince: "Jan 2025",
    }

    // Premium Color Palette
    const void_ = "#06060A"
    const night = "#0A0A10"
    const charcoal = "#101014"
    const slate = "#18181E"
    const mist = "#222228"

    const mint = "#3CFFD0"
    const mintGlow = "rgba(60, 255, 208, 0.5)"
    const mintSoft = "rgba(60, 255, 208, 0.12)"
    const mintBorder = "rgba(60, 255, 208, 0.25)"
    const lavender = "#A78BFA"
    const lavenderSoft = "rgba(167, 139, 250, 0.12)"
    const coral = "#FF6B6B"
    const coralSoft = "rgba(255, 107, 107, 0.12)"
    const gold = "#FFD93D"
    const goldSoft = "rgba(255, 217, 61, 0.12)"
    const blue = "#60A5FA"

    const text100 = "#FFFFFF"
    const text80 = "rgba(255, 255, 255, 0.85)"
    const text60 = "rgba(255, 255, 255, 0.6)"
    const text40 = "rgba(255, 255, 255, 0.4)"
    const text20 = "rgba(255, 255, 255, 0.12)"
    const text10 = "rgba(255, 255, 255, 0.06)"

    // Stats
    const stats = {
        forwarded: 47,
        matched: 12,
        packets: 8,
        applications: 5,
    }

    // Matches Data
    const todaysMatches = [
        {
            id: 1,
            title: "Senior Product Manager",
            company: "Stripe",
            location: "San Francisco, CA (Remote)",
            salary: "$180k - $220k",
            matchScore: 94,
            matchReasons: [
                "5+ years PM experience matches your background",
                "Fintech experience from your Capital One role",
                "Remote-first aligns with your preferences",
            ],
            posted: "2 hours ago",
            logo: "💳",
            hot: true,
        },
        {
            id: 2,
            title: "Product Manager, Growth",
            company: "Notion",
            location: "New York, NY (Hybrid)",
            salary: "$160k - $200k",
            matchScore: 91,
            matchReasons: [
                "Growth PM experience from your startup role",
                "B2B SaaS background is a strong fit",
                "Location matches your preferences",
            ],
            posted: "4 hours ago",
            logo: "📝",
            hot: true,
        },
        {
            id: 3,
            title: "Senior PM, Platform",
            company: "Figma",
            location: "San Francisco, CA",
            salary: "$175k - $215k",
            matchScore: 88,
            matchReasons: [
                "Platform/API experience from your current role",
                "Design tool industry interest noted",
                "Technical PM skills match requirements",
            ],
            posted: "6 hours ago",
            logo: "🎨",
            hot: false,
        },
    ]

    const rejectedJobs = [
        {
            id: 1,
            title: "VP of Product",
            company: "TechCorp",
            reason: "Experience gap",
            detail: "Requires 10+ years, you have 6",
            canForce: true,
        },
        {
            id: 2,
            title: "Product Manager",
            company: "StartupXYZ",
            reason: "Salary mismatch",
            detail: "$80k-$100k below your minimum",
            canForce: true,
        },
        {
            id: 3,
            title: "Senior PM",
            company: "GlobalInc",
            reason: "Location constraint",
            detail: "Requires relocation to London",
            canForce: true,
        },
        {
            id: 4,
            title: "Product Lead",
            company: "FinanceHub",
            reason: "Visa sponsorship",
            detail: "Company doesn't sponsor",
            canForce: false,
        },
    ]

    const recentPackets = [
        {
            id: 1,
            jobTitle: "Senior Product Manager",
            company: "Stripe",
            generatedAt: "Today, 10:32 AM",
            files: 3,
        },
        {
            id: 2,
            jobTitle: "Product Manager, Growth",
            company: "Notion",
            generatedAt: "Today, 8:15 AM",
            files: 3,
        },
        {
            id: 3,
            jobTitle: "PM, Payments",
            company: "Square",
            generatedAt: "Yesterday, 4:22 PM",
            files: 2,
        },
    ]

    const weeklyData = [
        { day: "Mon", forwarded: 42 },
        { day: "Tue", forwarded: 38 },
        { day: "Wed", forwarded: 51 },
        { day: "Thu", forwarded: 45 },
        { day: "Fri", forwarded: 47 },
        { day: "Sat", forwarded: 23 },
        { day: "Sun", forwarded: 18 },
    ]

    const goToHome = () => (window.location.href = "/")

    // Sidebar Component
    const Sidebar = () => (
        <div
            style={{
                width: 280,
                minWidth: 280,
                background: night,
                borderRight: `1px solid ${text10}`,
                padding: "28px 0",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {/* Logo */}
            <div style={{ padding: "0 24px", marginBottom: 36 }}>
                <div
                    onClick={goToHome}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            background: mint,
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 20,
                            color: void_,
                            boxShadow: `0 0 30px ${mintGlow}`,
                        }}
                    >
                        Z
                    </div>
                    <span
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: text100,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        JobConcierge
                    </span>
                </div>
            </div>

            {/* User Card */}
            <div style={{ padding: "0 16px", marginBottom: 28 }}>
                <div
                    style={{
                        padding: 18,
                        background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                        border: `1px solid ${mintBorder}`,
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                    }}
                >
                    <div
                        style={{
                            width: 46,
                            height: 46,
                            background: `linear-gradient(135deg, ${mint}, ${lavender})`,
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            fontWeight: 600,
                            color: void_,
                        }}
                    >
                        {user.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: text100,
                                marginBottom: 2,
                            }}
                        >
                            {user.name}
                        </div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "3px 10px",
                                background: mint,
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                color: void_,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {user.plan}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div style={{ flex: 1, padding: "0 12px" }}>
                <div style={{ padding: "0 12px", marginBottom: 12 }}>
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: text40,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        Menu
                    </span>
                </div>
                {[
                    {
                        id: "dashboard",
                        icon: "◐",
                        label: "Dashboard",
                        count: null,
                    },
                    {
                        id: "matches",
                        icon: "◎",
                        label: "Job Matches",
                        count: 12,
                    },
                    { id: "packets", icon: "❐", label: "My Packets", count: 8 },
                    {
                        id: "analytics",
                        icon: "◧",
                        label: "Analytics",
                        count: null,
                    },
                    {
                        id: "sources",
                        icon: "⬡",
                        label: "Job Sources",
                        count: 5,
                    },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 16px",
                            background:
                                activeTab === item.id
                                    ? mintSoft
                                    : "transparent",
                            border:
                                activeTab === item.id
                                    ? `1px solid ${mintBorder}`
                                    : "1px solid transparent",
                            borderRadius: 12,
                            marginBottom: 4,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 18,
                                    opacity: activeTab === item.id ? 1 : 0.5,
                                    color:
                                        activeTab === item.id ? mint : text60,
                                }}
                            >
                                {item.icon}
                            </span>
                            <span
                                style={{
                                    fontSize: 14,
                                    fontWeight:
                                        activeTab === item.id ? 600 : 500,
                                    color:
                                        activeTab === item.id ? mint : text60,
                                }}
                            >
                                {item.label}
                            </span>
                        </div>
                        {item.count && (
                            <span
                                style={{
                                    padding: "2px 8px",
                                    background:
                                        activeTab === item.id ? mint : text20,
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color:
                                        activeTab === item.id ? void_ : text40,
                                }}
                            >
                                {item.count}
                            </span>
                        )}
                    </div>
                ))}

                <div
                    style={{
                        height: 1,
                        background: text10,
                        margin: "20px 12px",
                    }}
                />

                <div style={{ padding: "0 12px", marginBottom: 12 }}>
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: text40,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        Settings
                    </span>
                </div>
                {[
                    { id: "preferences", icon: "⚙", label: "Preferences" },
                    { id: "billing", icon: "◈", label: "Billing" },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "14px 16px",
                            borderRadius: 12,
                            cursor: "pointer",
                        }}
                    >
                        <span style={{ fontSize: 18, opacity: 0.5 }}>
                            {item.icon}
                        </span>
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: text60,
                            }}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Help Card */}
            <div style={{ padding: "0 16px" }}>
                <div
                    style={{
                        padding: 20,
                        background: charcoal,
                        border: `1px solid ${text10}`,
                        borderRadius: 16,
                        marginBottom: 12,
                    }}
                >
                    <div style={{ fontSize: 24, marginBottom: 12 }}>💬</div>
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: text100,
                            marginBottom: 4,
                        }}
                    >
                        Need help?
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            color: text40,
                            marginBottom: 14,
                            lineHeight: 1.5,
                        }}
                    >
                        Our support team is here 24/7
                    </p>
                    <button
                        style={{
                            width: "100%",
                            padding: "11px 16px",
                            background: slate,
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 500,
                            color: text80,
                            cursor: "pointer",
                        }}
                    >
                        Start Chat
                    </button>
                </div>

                <button
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "transparent",
                        border: `1px solid ${text10}`,
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 500,
                        color: text40,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    <span style={{ fontSize: 16 }}>↪</span> Log Out
                </button>
            </div>
        </div>
    )

    // Stat Card Component
    const StatCard = ({ icon, value, label, change, changeType, accent }) => (
        <div
            style={{
                padding: 24,
                background: charcoal,
                border: `1px solid ${text10}`,
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {accent && (
                <div
                    style={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        background: `radial-gradient(circle, ${mintSoft} 0%, transparent 70%)`,
                    }}
                />
            )}
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            background: accent ? mintSoft : text10,
                            border: accent ? `1px solid ${mintBorder}` : "none",
                            borderRadius: 14,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                        }}
                    >
                        {icon}
                    </div>
                    {change && (
                        <span
                            style={{
                                padding: "5px 10px",
                                background:
                                    changeType === "up" ? mintSoft : coralSoft,
                                border: `1px solid ${changeType === "up" ? mintBorder : "rgba(255,107,107,0.25)"}`,
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 600,
                                color: changeType === "up" ? mint : coral,
                            }}
                        >
                            {changeType === "up" ? "↑" : "↓"} {change}
                        </span>
                    )}
                </div>
                <div
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        color: accent ? mint : text100,
                        letterSpacing: "-0.02em",
                        marginBottom: 4,
                    }}
                >
                    {value}
                </div>
                <div style={{ fontSize: 14, color: text40 }}>{label}</div>
            </div>
        </div>
    )

    // Match Card Component
    const MatchCard = ({ job }) => {
        const [expanded, setExpanded] = useState(false)

        return (
            <div
                style={{
                    padding: 24,
                    background: expanded ? slate : charcoal,
                    border: `1px solid ${expanded ? mintBorder : text10}`,
                    borderRadius: 20,
                    marginBottom: 12,
                    transition: "all 0.2s ease",
                }}
            >
                <div style={{ display: "flex", gap: 18 }}>
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            background: slate,
                            borderRadius: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 30,
                            flexShrink: 0,
                        }}
                    >
                        {job.logo}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 10,
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 6,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 600,
                                            color: text100,
                                        }}
                                    >
                                        {job.title}
                                    </h3>
                                    {job.hot && (
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                background: coralSoft,
                                                borderRadius: 6,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: coral,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.03em",
                                            }}
                                        >
                                            HOT
                                        </span>
                                    )}
                                </div>
                                <p style={{ fontSize: 14, color: text40 }}>
                                    {job.company} • {job.location}
                                </p>
                            </div>
                            <div
                                style={{
                                    padding: "10px 16px",
                                    background:
                                        job.matchScore >= 90
                                            ? mintSoft
                                            : text10,
                                    border: `1px solid ${job.matchScore >= 90 ? mintBorder : "transparent"}`,
                                    borderRadius: 14,
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 700,
                                        color:
                                            job.matchScore >= 90
                                                ? mint
                                                : text100,
                                        lineHeight: 1,
                                    }}
                                >
                                    {job.matchScore}
                                </div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: text40,
                                        textTransform: "uppercase",
                                        marginTop: 2,
                                    }}
                                >
                                    Match
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: 20,
                                marginBottom: 14,
                            }}
                        >
                            <span style={{ fontSize: 14, color: text60 }}>
                                💰 {job.salary}
                            </span>
                            <span style={{ fontSize: 14, color: text40 }}>
                                🕐 {job.posted}
                            </span>
                        </div>

                        {/* Expandable Match Reasons */}
                        <div
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                cursor: "pointer",
                                marginBottom: expanded ? 16 : 0,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: mint,
                                }}
                            >
                                Why you match
                            </span>
                            <span style={{ color: mint, fontSize: 10 }}>
                                {expanded ? "▲" : "▼"}
                            </span>
                        </div>

                        {expanded && (
                            <div
                                style={{
                                    padding: 18,
                                    background: mist,
                                    borderRadius: 14,
                                    marginBottom: 16,
                                }}
                            >
                                {job.matchReasons.map((reason, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            padding: "8px 0",
                                            fontSize: 13,
                                            color: text60,
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: mint,
                                                fontSize: 14,
                                            }}
                                        >
                                            ✓
                                        </span>
                                        {reason}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ display: "flex", gap: 10 }}>
                            <button
                                style={{
                                    padding: "12px 24px",
                                    background: mint,
                                    border: "none",
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: void_,
                                    cursor: "pointer",
                                    boxShadow: `0 0 20px ${mintGlow}`,
                                }}
                            >
                                Generate Packet ⚡
                            </button>
                            <button
                                style={{
                                    padding: "12px 20px",
                                    background: "transparent",
                                    border: `1px solid ${text20}`,
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: text60,
                                    cursor: "pointer",
                                }}
                            >
                                Save
                            </button>
                            <button
                                style={{
                                    padding: "12px 20px",
                                    background: "transparent",
                                    border: `1px solid ${text20}`,
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: text60,
                                    cursor: "pointer",
                                }}
                            >
                                View Job ↗
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Rejected Job Row
    const RejectedRow = ({ job, isLast }) => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: isLast ? "none" : `1px solid ${text10}`,
            }}
        >
            <div style={{ flex: 1.2 }}>
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: text100,
                        marginBottom: 2,
                    }}
                >
                    {job.title}
                </div>
                <div style={{ fontSize: 13, color: text40 }}>{job.company}</div>
            </div>
            <div style={{ flex: 0.8 }}>
                <span
                    style={{
                        display: "inline-block",
                        padding: "5px 12px",
                        background: coralSoft,
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 500,
                        color: coral,
                    }}
                >
                    {job.reason}
                </span>
            </div>
            <div style={{ flex: 1.5, fontSize: 13, color: text40 }}>
                {job.detail}
            </div>
            <div style={{ flex: 0.8, textAlign: "right" }}>
                {job.canForce ? (
                    <button
                        style={{
                            padding: "8px 16px",
                            background: goldSoft,
                            border: `1px solid rgba(255, 217, 61, 0.3)`,
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            color: gold,
                            cursor: "pointer",
                        }}
                    >
                        Force ⚡
                    </button>
                ) : (
                    <span style={{ fontSize: 12, color: text40 }}>—</span>
                )}
            </div>
        </div>
    )

    // Bar Chart
    const BarChart = () => {
        const maxValue = Math.max(...weeklyData.map((d) => d.forwarded))
        const today = 4 // Friday is index 4

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 10,
                    height: 140,
                }}
            >
                {weeklyData.map((d, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: (d.forwarded / maxValue) * 120,
                                background:
                                    i === today
                                        ? `linear-gradient(180deg, ${mint}, rgba(60, 255, 208, 0.2))`
                                        : `linear-gradient(180deg, ${text20}, ${text10})`,
                                borderRadius: 6,
                                transition: "all 0.3s ease",
                            }}
                        />
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: i === today ? 600 : 400,
                                color: i === today ? mint : text40,
                            }}
                        >
                            {d.day}
                        </span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: void_,
                fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                color: text80,
                display: "flex",
            }}
        >
            <Sidebar />

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: "36px 44px",
                    overflowY: "auto",
                    background: `radial-gradient(ellipse at top right, rgba(60, 255, 208, 0.03) 0%, transparent 50%),
                             radial-gradient(ellipse at bottom left, rgba(167, 139, 250, 0.02) 0%, transparent 50%),
                             ${void_}`,
                    minWidth: 0,
                }}
            >
                {/* Welcome Banner */}
                <div
                    style={{
                        padding: 32,
                        background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                        border: `1px solid ${mintBorder}`,
                        borderRadius: 24,
                        marginBottom: 32,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -100,
                            right: -100,
                            width: 300,
                            height: 300,
                            background: `radial-gradient(circle, ${mintSoft} 0%, transparent 70%)`,
                            pointerEvents: "none",
                        }}
                    />
                    <div style={{ position: "relative" }}>
                        <h1
                            style={{
                                fontSize: 28,
                                fontWeight: 600,
                                color: text100,
                                letterSpacing: "-0.02em",
                                marginBottom: 10,
                            }}
                        >
                            Good morning, {user.name} 👋
                        </h1>
                        <p
                            style={{
                                fontSize: 16,
                                color: text60,
                                lineHeight: 1.6,
                            }}
                        >
                            Your AI found{" "}
                            <strong style={{ color: mint }}>
                                {stats.matched} high-quality matches
                            </strong>{" "}
                            today.
                            <br />
                            {stats.packets} application packets are ready to
                            download.
                        </p>
                    </div>
                    <div
                        style={{
                            padding: "14px 24px",
                            background: mint,
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            boxShadow: `0 0 30px ${mintGlow}`,
                        }}
                    >
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                background: void_,
                                borderRadius: "50%",
                            }}
                        />
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: void_,
                            }}
                        >
                            AI Active
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 16,
                        marginBottom: 32,
                    }}
                >
                    <StatCard
                        icon="📥"
                        value={stats.forwarded}
                        label="Jobs forwarded today"
                        change="12%"
                        changeType="up"
                        accent={true}
                    />
                    <StatCard
                        icon="🎯"
                        value={stats.matched}
                        label="Jobs matched"
                        change="8%"
                        changeType="up"
                    />
                    <StatCard
                        icon="📦"
                        value={stats.packets}
                        label="Packets generated"
                        change="15%"
                        changeType="up"
                    />
                    <StatCard
                        icon="📤"
                        value={stats.applications}
                        label="Applications sent"
                        change="5%"
                        changeType="up"
                    />
                </div>

                {/* Today's Matches */}
                <div style={{ marginBottom: 32 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: text100,
                                    marginBottom: 4,
                                }}
                            >
                                Today's Matches
                            </h2>
                            <p style={{ fontSize: 13, color: text40 }}>
                                AI-selected based on your profile and
                                preferences
                            </p>
                        </div>
                        <button
                            style={{
                                padding: "10px 18px",
                                background: text10,
                                border: "none",
                                borderRadius: 10,
                                fontSize: 13,
                                fontWeight: 500,
                                color: text60,
                                cursor: "pointer",
                            }}
                        >
                            View All →
                        </button>
                    </div>

                    {todaysMatches.map((job) => (
                        <MatchCard key={job.id} job={job} />
                    ))}
                </div>

                {/* Rejected Jobs */}
                <div
                    style={{
                        padding: 28,
                        background: charcoal,
                        border: `1px solid ${text10}`,
                        borderRadius: 20,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: text100,
                                    marginBottom: 4,
                                }}
                            >
                                Filtered Out
                            </h2>
                            <p style={{ fontSize: 13, color: text40 }}>
                                Jobs that didn't match your criteria
                            </p>
                        </div>
                        <span
                            style={{
                                padding: "6px 14px",
                                background: text10,
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 500,
                                color: text40,
                            }}
                        >
                            {rejectedJobs.length} jobs
                        </span>
                    </div>

                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            padding: "12px 0",
                            borderBottom: `1px solid ${text20}`,
                            fontSize: 11,
                            fontWeight: 600,
                            color: text40,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        <div style={{ flex: 1.2 }}>Job</div>
                        <div style={{ flex: 0.8 }}>Reason</div>
                        <div style={{ flex: 1.5 }}>Details</div>
                        <div style={{ flex: 0.8, textAlign: "right" }}>
                            Action
                        </div>
                    </div>

                    {rejectedJobs.map((job, i) => (
                        <RejectedRow
                            key={job.id}
                            job={job}
                            isLast={i === rejectedJobs.length - 1}
                        />
                    ))}

                    <div
                        style={{
                            marginTop: 16,
                            padding: "12px 16px",
                            background: goldSoft,
                            border: `1px solid rgba(255, 217, 61, 0.2)`,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span style={{ fontSize: 16 }}>💡</span>
                        <p style={{ fontSize: 13, color: text60 }}>
                            <strong style={{ color: gold }}>
                                Force Packet
                            </strong>{" "}
                            lets you generate a packet anyway — great for
                            stretch roles (Pro feature)
                        </p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 24,
                        marginBottom: 32,
                    }}
                >
                    {/* Recent Packets */}
                    <div
                        style={{
                            padding: 28,
                            background: charcoal,
                            border: `1px solid ${text10}`,
                            borderRadius: 20,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 20,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: text100,
                                }}
                            >
                                Recent Packets
                            </h2>
                            <span
                                style={{
                                    padding: "4px 12px",
                                    background: lavenderSoft,
                                    borderRadius: 8,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: lavender,
                                }}
                            >
                                {recentPackets.length} ready
                            </span>
                        </div>

                        {recentPackets.map((packet, i) => (
                            <div
                                key={packet.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "16px 0",
                                    borderBottom:
                                        i < recentPackets.length - 1
                                            ? `1px solid ${text10}`
                                            : "none",
                                }}
                            >
                                <div
                                    style={{
                                        width: 46,
                                        height: 46,
                                        background: `linear-gradient(135deg, ${lavenderSoft}, ${mintSoft})`,
                                        borderRadius: 12,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        marginRight: 14,
                                    }}
                                >
                                    📦
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: text100,
                                            marginBottom: 2,
                                        }}
                                    >
                                        {packet.jobTitle}
                                    </div>
                                    <div
                                        style={{ fontSize: 13, color: text40 }}
                                    >
                                        {packet.company} • {packet.generatedAt}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button
                                        style={{
                                            padding: "8px 14px",
                                            background: slate,
                                            border: "none",
                                            borderRadius: 8,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: text80,
                                            cursor: "pointer",
                                        }}
                                    >
                                        PDF
                                    </button>
                                    <button
                                        style={{
                                            padding: "8px 14px",
                                            background: slate,
                                            border: "none",
                                            borderRadius: 8,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: text80,
                                            cursor: "pointer",
                                        }}
                                    >
                                        DOCX
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "transparent",
                                border: `1px solid ${text20}`,
                                borderRadius: 12,
                                fontSize: 13,
                                fontWeight: 500,
                                color: text60,
                                cursor: "pointer",
                                marginTop: 16,
                            }}
                        >
                            View All Packets →
                        </button>
                    </div>

                    {/* Weekly Chart */}
                    <div
                        style={{
                            padding: 28,
                            background: charcoal,
                            border: `1px solid ${text10}`,
                            borderRadius: 20,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 24,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: text100,
                                }}
                            >
                                Weekly Activity
                            </h2>
                            <div style={{ display: "flex", gap: 6 }}>
                                {["Week", "Month"].map((period) => (
                                    <button
                                        key={period}
                                        onClick={() =>
                                            setSelectedPeriod(
                                                period.toLowerCase()
                                            )
                                        }
                                        style={{
                                            padding: "7px 14px",
                                            background:
                                                selectedPeriod ===
                                                period.toLowerCase()
                                                    ? mint
                                                    : "transparent",
                                            border:
                                                selectedPeriod ===
                                                period.toLowerCase()
                                                    ? "none"
                                                    : `1px solid ${text20}`,
                                            borderRadius: 8,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color:
                                                selectedPeriod ===
                                                period.toLowerCase()
                                                    ? void_
                                                    : text40,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <BarChart />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 16,
                                marginTop: 28,
                                paddingTop: 24,
                                borderTop: `1px solid ${text10}`,
                            }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: mint,
                                        marginBottom: 4,
                                    }}
                                >
                                    264
                                </div>
                                <div style={{ fontSize: 12, color: text40 }}>
                                    Total Forwarded
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: lavender,
                                        marginBottom: 4,
                                    }}
                                >
                                    25.4%
                                </div>
                                <div style={{ fontSize: 12, color: text40 }}>
                                    Match Rate
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: gold,
                                        marginBottom: 4,
                                    }}
                                >
                                    43
                                </div>
                                <div style={{ fontSize: 12, color: text40 }}>
                                    Packets Generated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div
                    style={{
                        padding: 28,
                        background: charcoal,
                        border: `1px solid ${text10}`,
                        borderRadius: 20,
                        marginBottom: 24,
                    }}
                >
                    <h2
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: text100,
                            marginBottom: 20,
                        }}
                    >
                        Quick Actions
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 14,
                        }}
                    >
                        {[
                            {
                                icon: "📄",
                                label: "Upload Resume",
                                desc: "Update your resume",
                                color: mintSoft,
                            },
                            {
                                icon: "🔗",
                                label: "Add Job Board",
                                desc: "Connect another source",
                                color: lavenderSoft,
                            },
                            {
                                icon: "⚡",
                                label: "Preferences",
                                desc: "Salary, location, etc.",
                                color: goldSoft,
                            },
                            {
                                icon: "✏️",
                                label: "Edit Profile",
                                desc: "Modify your info",
                                color: "rgba(96, 165, 250, 0.12)",
                            },
                        ].map((action, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: 22,
                                    background: slate,
                                    border: `1px solid ${text10}`,
                                    borderRadius: 16,
                                    cursor: "pointer",
                                    textAlign: "center",
                                    transition: "all 0.2s",
                                }}
                            >
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        margin: "0 auto 14px",
                                        background: action.color,
                                        borderRadius: 14,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 24,
                                    }}
                                >
                                    {action.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: text100,
                                        marginBottom: 4,
                                    }}
                                >
                                    {action.label}
                                </div>
                                <div style={{ fontSize: 12, color: text40 }}>
                                    {action.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Retention Notice */}
                <div
                    style={{
                        padding: 18,
                        background: lavenderSoft,
                        border: `1px solid rgba(167, 139, 250, 0.2)`,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                    }}
                >
                    <span style={{ fontSize: 20 }}>💾</span>
                    <p style={{ fontSize: 13, color: text60, lineHeight: 1.5 }}>
                        Your data is stored securely and encrypted. History is
                        retained for{" "}
                        <strong style={{ color: lavender }}>3 months</strong>{" "}
                        after your subscription ends.
                    </p>
                </div>
            </main>
        </div>
    )
}
