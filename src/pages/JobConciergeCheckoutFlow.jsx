// ZJobConcierge - Streamlined Checkout Flow with Onboarding
// Info → Checkout → Success → Onboarding (6 steps)
// Copy this entire code into a new Framer Code Component

import { useState, useEffect } from "react"

export default function JobConciergeCheckoutFlow({ selectedPlan = "pro" }) {
    const [currentStep, setCurrentStep] = useState("info") // info, checkout, success, onboarding
    const [onboardingStep, setOnboardingStep] = useState(1)
    const [billingCycle, setBillingCycle] = useState("monthly")
    const [isProcessing, setIsProcessing] = useState(false)
    const [signupCount, setSignupCount] = useState(147)
    const [showConfetti, setShowConfetti] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        zip: "",
    })

    // Profile state
    const [profile, setProfile] = useState({
        currentTitle: "",
        careerStage: "",
        superpower: "",
        energizers: [],
        drainers: "",
        workStyle: "",
        dreamTitle: "",
        dreamCompanies: [],
        salaryMin: 100000,
        urgency: "",
        hiddenStrength: "",
        resumeFile: null,
        linkedIn: "",
        indeed: "",
        glassdoor: "",
    })

    const [errors, setErrors] = useState({})

    // Colors
    const void_ = "#04040A"
    const night = "#08080E"
    const charcoal = "#0E0E14"
    const slate = "#151519"
    const mist = "#1C1C22"

    const mint = "#3CFFD0"
    const mintGlow = "rgba(60, 255, 208, 0.5)"
    const mintSoft = "rgba(60, 255, 208, 0.1)"
    const mintBorder = "rgba(60, 255, 208, 0.3)"
    const lavender = "#A78BFA"
    const lavenderSoft = "rgba(167, 139, 250, 0.1)"
    const lavenderBorder = "rgba(167, 139, 250, 0.3)"
    const gold = "#FFD93D"
    const goldSoft = "rgba(255, 217, 61, 0.1)"
    const coral = "#FF6B6B"

    const text100 = "#FFFFFF"
    const text80 = "rgba(255, 255, 255, 0.85)"
    const text60 = "rgba(255, 255, 255, 0.6)"
    const text40 = "rgba(255, 255, 255, 0.4)"
    const text20 = "rgba(255, 255, 255, 0.12)"
    const text10 = "rgba(255, 255, 255, 0.06)"

    // Plans data
    const plans = {
        free: {
            name: "Free Trial",
            icon: "🎁",
            price: 0,
            annualPrice: 0,
            jobsPerDay: 5,
            jobsPerMonth: 35,
            color: mint,
            duration: "7 days",
        },
        basic: {
            name: "Basic",
            icon: "🌱",
            price: 19,
            annualPrice: 15,
            jobsPerDay: 5,
            jobsPerMonth: 150,
            color: lavender,
        },
        pro: {
            name: "Pro",
            icon: "⚡",
            price: 39,
            annualPrice: 31,
            jobsPerDay: 10,
            jobsPerMonth: 300,
            color: mint,
            popular: true,
        },
        vip: {
            name: "VIP",
            icon: "👑",
            price: 79,
            annualPrice: 63,
            jobsPerDay: 15,
            jobsPerMonth: 450,
            color: gold,
        },
        enterprise: {
            name: "Enterprise",
            icon: "🏢",
            price: 299,
            annualPrice: 239,
            jobsPerDay: 50,
            jobsPerMonth: 1500,
            color: lavender,
        },
        agency: {
            name: "Agency",
            icon: "🚀",
            price: 999,
            annualPrice: 799,
            jobsPerDay: 200,
            jobsPerMonth: 6000,
            color: gold,
        },
    }

    const activePlan = plans[selectedPlan] || plans.pro
    const currentPrice =
        billingCycle === "annual" ? activePlan.annualPrice : activePlan.price

    // Navigation
    const goToHome = () => (window.location.href = "/")
    const goToPricing = () => (window.location.href = "/pricing")
    const goToDashboard = () => (window.location.href = "/dashboard")

    // Signup counter
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setSignupCount((prev) => prev + 1)
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Confetti effect
    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showConfetti])

    // Form handlers
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }))
        }
    }

    const handleProfileChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }))
    }

    // Card formatting
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ""
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        return parts.length ? parts.join(" ") : value
    }

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        if (v.length >= 2) {
            return v.substring(0, 2) + "/" + v.substring(2, 4)
        }
        return v
    }

    // Validation
    const validateInfo = () => {
        const newErrors = {}
        if (!formData.firstName.trim())
            newErrors.firstName = "First name required"
        if (!formData.email.includes("@")) newErrors.email = "Valid email required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateCheckout = () => {
        const newErrors = {}
        if (formData.cardNumber.replace(/\s/g, "").length !== 16)
            newErrors.cardNumber = "16 digits required"
        if (formData.expiry.length !== 5) newErrors.expiry = "MM/YY required"
        if (formData.cvc.length < 3) newErrors.cvc = "3-4 digits"
        if (formData.zip.length !== 5) newErrors.zip = "5 digits"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Step handlers
    const handleInfoSubmit = () => {
        if (validateInfo()) {
            if (selectedPlan === "free") {
                setCurrentStep("success")
                setShowConfetti(true)
            } else {
                setCurrentStep("checkout")
            }
        }
    }

    const handleCheckoutSubmit = () => {
        if (validateCheckout()) {
            setIsProcessing(true)
            setTimeout(() => {
                setIsProcessing(false)
                setCurrentStep("success")
                setShowConfetti(true)
            }, 2000)
        }
    }

    const handleOnboardingNext = () => {
        if (onboardingStep < 6) {
            setOnboardingStep(onboardingStep + 1)
        } else {
            goToDashboard()
        }
    }

    // Progress component
    const CheckoutProgress = () => {
        const steps =
            selectedPlan === "free"
                ? ["Info", "Success"]
                : ["Info", "Checkout", "Success"]
        const currentIdx =
            currentStep === "info"
                ? 0
                : currentStep === "checkout"
                  ? 1
                  : selectedPlan === "free"
                    ? 1
                    : 2

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 32,
                }}
            >
                {steps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background:
                                    i <= currentIdx
                                        ? mint
                                        : "rgba(255,255,255,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: 600,
                                color: i <= currentIdx ? void_ : text40,
                            }}
                        >
                            {i < currentIdx ? "✓" : i + 1}
                        </div>
                        <span
                            style={{
                                fontSize: 13,
                                color: i <= currentIdx ? text100 : text40,
                                fontWeight: i === currentIdx ? 600 : 400,
                            }}
                        >
                            {step}
                        </span>
                        {i < steps.length - 1 && (
                            <div
                                style={{
                                    width: 40,
                                    height: 2,
                                    background:
                                        i < currentIdx
                                            ? mint
                                            : "rgba(255,255,255,0.1)",
                                    borderRadius: 1,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        )
    }

    // Onboarding progress
    const OnboardingProgress = () => (
        <div style={{ marginBottom: 24 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <span style={{ fontSize: 13, color: text40 }}>
                    Step {onboardingStep} of 6
                </span>
                <span style={{ fontSize: 13, color: mint }}>
                    {Math.round((onboardingStep / 6) * 100)}%
                </span>
            </div>
            <div
                style={{
                    height: 4,
                    background: text10,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${(onboardingStep / 6) * 100}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${mint}, ${lavender})`,
                        borderRadius: 2,
                        transition: "width 0.3s ease",
                    }}
                />
            </div>
        </div>
    )

    // Confetti component
    const Confetti = () => (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 1000,
                overflow: "hidden",
            }}
        >
            {[...Array(50)].map((_, i) => {
                const colors = [mint, lavender, gold, coral, "#60A5FA"]
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${Math.random() * 100}%`,
                            top: -20,
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                            background:
                                colors[
                                    Math.floor(Math.random() * colors.length)
                                ],
                            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                            animation: `confetti ${2 + Math.random() * 2}s ease-out forwards`,
                            animationDelay: `${Math.random() * 0.5}s`,
                        }}
                    />
                )
            })}
            <style>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
        </div>
    )

    // ==================== INFO PAGE ====================
    const InfoPage = () => (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <CheckoutProgress />

            {/* Plan Summary */}
            <div
                style={{
                    padding: 24,
                    background: `linear-gradient(135deg, ${charcoal}, ${night})`,
                    border: `1px solid ${activePlan.color}30`,
                    borderRadius: 16,
                    marginBottom: 24,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 40, marginBottom: 12 }}>
                    {activePlan.icon}
                </div>
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: text100,
                        marginBottom: 4,
                    }}
                >
                    {activePlan.name}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: mint }}>
                    ${currentPrice}
                    <span style={{ fontSize: 14, color: text40 }}>/mo</span>
                </div>
                <div style={{ fontSize: 13, color: text40, marginTop: 8 }}>
                    {activePlan.jobsPerDay} jobs/day •{" "}
                    {activePlan.jobsPerMonth.toLocaleString()} packets/mo
                </div>
            </div>

            {/* Billing Toggle */}
            {selectedPlan !== "free" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 24,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            padding: 4,
                            background: charcoal,
                            borderRadius: 10,
                        }}
                    >
                        {["monthly", "annual"].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
                                style={{
                                    padding: "10px 20px",
                                    background:
                                        billingCycle === cycle
                                            ? slate
                                            : "transparent",
                                    border: "none",
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color:
                                        billingCycle === cycle
                                            ? text100
                                            : text40,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                {cycle === "monthly" ? "Monthly" : "Annual"}
                                {cycle === "annual" && (
                                    <span
                                        style={{
                                            padding: "2px 6px",
                                            background: mintSoft,
                                            borderRadius: 4,
                                            fontSize: 10,
                                            color: mint,
                                        }}
                                    >
                                        -20%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Form */}
            <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 500,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter your first name"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${errors.firstName ? coral : text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                    {errors.firstName && (
                        <span
                            style={{
                                fontSize: 12,
                                color: coral,
                                marginTop: 4,
                                display: "block",
                            }}
                        >
                            {errors.firstName}
                        </span>
                    )}
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 500,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${errors.email ? coral : text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                    {errors.email && (
                        <span
                            style={{
                                fontSize: 12,
                                color: coral,
                                marginTop: 4,
                                display: "block",
                            }}
                        >
                            {errors.email}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={handleInfoSubmit}
                style={{
                    width: "100%",
                    padding: "16px 24px",
                    background: mint,
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    color: void_,
                    cursor: "pointer",
                    boxShadow: `0 0 30px ${mintGlow}`,
                    marginBottom: 16,
                }}
            >
                {selectedPlan === "free"
                    ? "Start Free Trial →"
                    : "Continue to Payment →"}
            </button>

            <div
                onClick={goToPricing}
                style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: text40,
                    cursor: "pointer",
                }}
            >
                ← Change plan
            </div>
        </div>
    )

    // ==================== CHECKOUT PAGE ====================
    const CheckoutPage = () => (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <CheckoutProgress />

            {/* Order Summary */}
            <div
                style={{
                    padding: 20,
                    background: charcoal,
                    border: `1px solid ${text10}`,
                    borderRadius: 14,
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 24 }}>{activePlan.icon}</span>
                        <div>
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: text100,
                                }}
                            >
                                {activePlan.name}
                            </div>
                            <div style={{ fontSize: 12, color: text40 }}>
                                {billingCycle === "annual"
                                    ? "Annual"
                                    : "Monthly"}{" "}
                                billing
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: text100,
                            }}
                        >
                            ${currentPrice}
                        </div>
                        <div style={{ fontSize: 12, color: text40 }}>/month</div>
                    </div>
                </div>
                <div
                    style={{
                        padding: "12px 14px",
                        background: mintSoft,
                        borderRadius: 8,
                        fontSize: 13,
                        color: mint,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span>✨</span>
                    <span>
                        {activePlan.jobsPerDay} jobs/day •{" "}
                        {activePlan.jobsPerMonth} packets/mo
                    </span>
                </div>
            </div>

            {/* Payment Form */}
            <div
                style={{
                    padding: 24,
                    background: charcoal,
                    border: `1px solid ${text10}`,
                    borderRadius: 16,
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: text100,
                        marginBottom: 20,
                    }}
                >
                    Payment Details
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: 13,
                                color: text60,
                                marginBottom: 8,
                            }}
                        >
                            Card Number
                        </label>
                        <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) =>
                                handleInputChange(
                                    "cardNumber",
                                    formatCardNumber(e.target.value)
                                )
                            }
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                background: slate,
                                border: `1px solid ${errors.cardNumber ? coral : text20}`,
                                borderRadius: 10,
                                fontSize: 15,
                                color: text100,
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                        {errors.cardNumber && (
                            <span
                                style={{
                                    fontSize: 12,
                                    color: coral,
                                    marginTop: 4,
                                    display: "block",
                                }}
                            >
                                {errors.cardNumber}
                            </span>
                        )}
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: 12,
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 13,
                                    color: text60,
                                    marginBottom: 8,
                                }}
                            >
                                Expiry
                            </label>
                            <input
                                type="text"
                                value={formData.expiry}
                                onChange={(e) =>
                                    handleInputChange(
                                        "expiry",
                                        formatExpiry(e.target.value)
                                    )
                                }
                                placeholder="MM/YY"
                                maxLength={5}
                                style={{
                                    width: "100%",
                                    padding: "14px 12px",
                                    background: slate,
                                    border: `1px solid ${errors.expiry ? coral : text20}`,
                                    borderRadius: 10,
                                    fontSize: 15,
                                    color: text100,
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 13,
                                    color: text60,
                                    marginBottom: 8,
                                }}
                            >
                                CVC
                            </label>
                            <input
                                type="text"
                                value={formData.cvc}
                                onChange={(e) =>
                                    handleInputChange(
                                        "cvc",
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                placeholder="123"
                                maxLength={4}
                                style={{
                                    width: "100%",
                                    padding: "14px 12px",
                                    background: slate,
                                    border: `1px solid ${errors.cvc ? coral : text20}`,
                                    borderRadius: 10,
                                    fontSize: 15,
                                    color: text100,
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 13,
                                    color: text60,
                                    marginBottom: 8,
                                }}
                            >
                                ZIP
                            </label>
                            <input
                                type="text"
                                value={formData.zip}
                                onChange={(e) =>
                                    handleInputChange(
                                        "zip",
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                placeholder="12345"
                                maxLength={5}
                                style={{
                                    width: "100%",
                                    padding: "14px 12px",
                                    background: slate,
                                    border: `1px solid ${errors.zip ? coral : text20}`,
                                    borderRadius: 10,
                                    fontSize: 15,
                                    color: text100,
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Trust badges */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        marginTop: 20,
                        paddingTop: 16,
                        borderTop: `1px solid ${text10}`,
                    }}
                >
                    <span style={{ fontSize: 12, color: text40 }}>
                        🔒 Secure
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                        {["💳", "💳", "💳"].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: 32,
                                    height: 20,
                                    background: text10,
                                    borderRadius: 4,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleCheckoutSubmit}
                disabled={isProcessing}
                style={{
                    width: "100%",
                    padding: "16px 24px",
                    background: isProcessing
                        ? slate
                        : `linear-gradient(135deg, ${mint}, #2DD4BF)`,
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    color: isProcessing ? text40 : void_,
                    cursor: isProcessing ? "wait" : "pointer",
                    boxShadow: isProcessing ? "none" : `0 0 30px ${mintGlow}`,
                    marginBottom: 16,
                }}
            >
                {isProcessing ? (
                    <span>Processing...</span>
                ) : (
                    <span>
                        Pay ${currentPrice}
                        {billingCycle === "annual" ? "/mo" : ""} →
                    </span>
                )}
            </button>

            <div
                style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: text40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                }}
            >
                <div
                    style={{
                        width: 6,
                        height: 6,
                        background: mint,
                        borderRadius: "50%",
                        animation: "pulse 2s infinite",
                    }}
                />
                <span>
                    {signupCount} people signed up today
                </span>
            </div>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            `}</style>
        </div>
    )

    // ==================== SUCCESS PAGE ====================
    const SuccessPage = () => (
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            {/* Success Icon */}
            <div
                style={{
                    width: 100,
                    height: 100,
                    margin: "0 auto 24px",
                    background: `linear-gradient(135deg, ${mint}, ${lavender})`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    boxShadow: `0 0 60px ${mintGlow}`,
                    animation: "successPulse 2s ease-in-out infinite",
                }}
            >
                ✓
            </div>

            <h1
                style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 12,
                }}
            >
                Welcome to JobConcierge! 🎉
            </h1>
            <p
                style={{
                    fontSize: 16,
                    color: text60,
                    marginBottom: 32,
                    lineHeight: 1.6,
                }}
            >
                Your {activePlan.name} plan is now active.
                <br />
                Let's set up your career profile to maximize your results.
            </p>

            {/* Stats */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 12,
                    marginBottom: 32,
                }}
            >
                {[
                    { value: activePlan.jobsPerDay, label: "jobs/day" },
                    { value: activePlan.jobsPerMonth, label: "packets/mo" },
                    {
                        value: selectedPlan === "free" ? "7" : "∞",
                        label: "days free",
                    },
                    { value: "24/7", label: "support" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        style={{
                            padding: 16,
                            background: charcoal,
                            borderRadius: 12,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: mint,
                            }}
                        >
                            {stat.value}
                        </div>
                        <div style={{ fontSize: 11, color: text40 }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Next Steps */}
            <div
                style={{
                    padding: 24,
                    background: `linear-gradient(135deg, ${mintSoft}, ${lavenderSoft})`,
                    border: `1px solid ${mintBorder}`,
                    borderRadius: 16,
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: text100,
                        marginBottom: 16,
                    }}
                >
                    Next: 2-minute profile setup
                </div>
                <div
                    style={{
                        display: "grid",
                        gap: 12,
                        textAlign: "left",
                    }}
                >
                    {[
                        "Tell us about your career goals",
                        "Set your preferences",
                        "Connect your job sources",
                    ].map((step, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <div
                                style={{
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
                            <span style={{ fontSize: 14, color: text80 }}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setCurrentStep("onboarding")}
                style={{
                    width: "100%",
                    padding: "16px 24px",
                    background: mint,
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    color: void_,
                    cursor: "pointer",
                    boxShadow: `0 0 30px ${mintGlow}`,
                }}
            >
                Set Up Your Career Profile →
            </button>

            <style>{`
                @keyframes successPulse {
                    0%, 100% { box-shadow: 0 0 40px ${mintGlow}; }
                    50% { box-shadow: 0 0 80px ${mintGlow}; }
                }
            `}</style>
        </div>
    )

    // ==================== ONBOARDING STEPS ====================
    const OnboardingStep1 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>👋</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 8,
                }}
            >
                Let's build your career profile
            </h2>
            <p
                style={{
                    fontSize: 15,
                    color: text40,
                    marginBottom: 32,
                    lineHeight: 1.6,
                }}
            >
                This takes about 2 minutes and helps our AI create perfectly
                tailored application packets for you.
            </p>
            <div
                style={{
                    display: "grid",
                    gap: 12,
                    padding: 24,
                    background: charcoal,
                    borderRadius: 16,
                }}
            >
                {[
                    { icon: "🎯", text: "Career DNA" },
                    { icon: "⚡", text: "Work Style" },
                    { icon: "🚀", text: "Goals" },
                    { icon: "✨", text: "Secret Sauce" },
                    { icon: "🔗", text: "Connect Jobs" },
                ].map((item, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "12px 16px",
                            background: slate,
                            borderRadius: 10,
                        }}
                    >
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <span style={{ fontSize: 14, color: text80 }}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )

    const OnboardingStep2 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🎯</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 24,
                }}
            >
                Your Career DNA
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Current Title
                    </label>
                    <input
                        type="text"
                        value={profile.currentTitle}
                        onChange={(e) =>
                            handleProfileChange("currentTitle", e.target.value)
                        }
                        placeholder="e.g., Product Manager"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Career Stage
                    </label>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                        }}
                    >
                        {[
                            "Early Career (0-3 yrs)",
                            "Growing (3-7 yrs)",
                            "Senior (7-15 yrs)",
                            "Executive (15+ yrs)",
                        ].map((stage) => (
                            <button
                                key={stage}
                                onClick={() =>
                                    handleProfileChange("careerStage", stage)
                                }
                                style={{
                                    padding: "12px 16px",
                                    background:
                                        profile.careerStage === stage
                                            ? mintSoft
                                            : charcoal,
                                    border: `1px solid ${profile.careerStage === stage ? mintBorder : text20}`,
                                    borderRadius: 10,
                                    fontSize: 13,
                                    color:
                                        profile.careerStage === stage
                                            ? mint
                                            : text60,
                                    cursor: "pointer",
                                }}
                            >
                                {stage}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Your Superpower
                    </label>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 8,
                        }}
                    >
                        {[
                            "🎯 Strategy",
                            "📊 Analytics",
                            "🤝 Leadership",
                            "💡 Innovation",
                            "📈 Growth",
                            "🔧 Technical",
                            "🎨 Creative",
                            "🗣️ Communication",
                        ].map((power) => (
                            <button
                                key={power}
                                onClick={() =>
                                    handleProfileChange("superpower", power)
                                }
                                style={{
                                    padding: "10px 8px",
                                    background:
                                        profile.superpower === power
                                            ? mintSoft
                                            : charcoal,
                                    border: `1px solid ${profile.superpower === power ? mintBorder : text20}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color:
                                        profile.superpower === power
                                            ? mint
                                            : text60,
                                    cursor: "pointer",
                                }}
                            >
                                {power}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const OnboardingStep3 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 24,
                }}
            >
                Your Work Style
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        What energizes you? (pick up to 3)
                    </label>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 8,
                        }}
                    >
                        {[
                            "Building products",
                            "Leading teams",
                            "Solving problems",
                            "Creating strategy",
                            "Working with data",
                            "Customer impact",
                        ].map((item) => {
                            const selected = profile.energizers.includes(item)
                            return (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (selected) {
                                            handleProfileChange(
                                                "energizers",
                                                profile.energizers.filter(
                                                    (e) => e !== item
                                                )
                                            )
                                        } else if (
                                            profile.energizers.length < 3
                                        ) {
                                            handleProfileChange("energizers", [
                                                ...profile.energizers,
                                                item,
                                            ])
                                        }
                                    }}
                                    style={{
                                        padding: "10px 12px",
                                        background: selected
                                            ? mintSoft
                                            : charcoal,
                                        border: `1px solid ${selected ? mintBorder : text20}`,
                                        borderRadius: 8,
                                        fontSize: 12,
                                        color: selected ? mint : text60,
                                        cursor: "pointer",
                                    }}
                                >
                                    {item}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        What drains you? (optional)
                    </label>
                    <input
                        type="text"
                        value={profile.drainers}
                        onChange={(e) =>
                            handleProfileChange("drainers", e.target.value)
                        }
                        placeholder="e.g., excessive meetings, micromanagement"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Preferred Work Style
                    </label>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 8,
                        }}
                    >
                        {["Remote", "Hybrid", "Office", "Flexible"].map(
                            (style) => (
                                <button
                                    key={style}
                                    onClick={() =>
                                        handleProfileChange("workStyle", style)
                                    }
                                    style={{
                                        padding: "12px 16px",
                                        background:
                                            profile.workStyle === style
                                                ? mintSoft
                                                : charcoal,
                                        border: `1px solid ${profile.workStyle === style ? mintBorder : text20}`,
                                        borderRadius: 10,
                                        fontSize: 13,
                                        color:
                                            profile.workStyle === style
                                                ? mint
                                                : text60,
                                        cursor: "pointer",
                                    }}
                                >
                                    {style}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    const OnboardingStep4 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 24,
                }}
            >
                Your Goals
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Dream Title
                    </label>
                    <input
                        type="text"
                        value={profile.dreamTitle}
                        onChange={(e) =>
                            handleProfileChange("dreamTitle", e.target.value)
                        }
                        placeholder="e.g., Director of Product"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Dream Companies (select any)
                    </label>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        {[
                            "Google",
                            "Meta",
                            "Apple",
                            "Amazon",
                            "Microsoft",
                            "Stripe",
                            "Netflix",
                            "Airbnb",
                            "Startup",
                        ].map((company) => {
                            const selected =
                                profile.dreamCompanies.includes(company)
                            return (
                                <button
                                    key={company}
                                    onClick={() => {
                                        if (selected) {
                                            handleProfileChange(
                                                "dreamCompanies",
                                                profile.dreamCompanies.filter(
                                                    (c) => c !== company
                                                )
                                            )
                                        } else {
                                            handleProfileChange(
                                                "dreamCompanies",
                                                [
                                                    ...profile.dreamCompanies,
                                                    company,
                                                ]
                                            )
                                        }
                                    }}
                                    style={{
                                        padding: "8px 14px",
                                        background: selected
                                            ? mintSoft
                                            : charcoal,
                                        border: `1px solid ${selected ? mintBorder : text20}`,
                                        borderRadius: 20,
                                        fontSize: 13,
                                        color: selected ? mint : text60,
                                        cursor: "pointer",
                                    }}
                                >
                                    {company}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Target Salary: $
                        {profile.salaryMin.toLocaleString()}
                        {profile.salaryMin >= 500000 ? "+" : ""}
                    </label>
                    <input
                        type="range"
                        min={50000}
                        max={500000}
                        step={10000}
                        value={profile.salaryMin}
                        onChange={(e) =>
                            handleProfileChange(
                                "salaryMin",
                                parseInt(e.target.value)
                            )
                        }
                        style={{
                            width: "100%",
                            height: 6,
                            background: charcoal,
                            borderRadius: 3,
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Timeline
                    </label>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 8,
                        }}
                    >
                        {["ASAP", "1-3 months", "3-6 months", "Passive"].map(
                            (time) => (
                                <button
                                    key={time}
                                    onClick={() =>
                                        handleProfileChange("urgency", time)
                                    }
                                    style={{
                                        padding: "12px 8px",
                                        background:
                                            profile.urgency === time
                                                ? mintSoft
                                                : charcoal,
                                        border: `1px solid ${profile.urgency === time ? mintBorder : text20}`,
                                        borderRadius: 10,
                                        fontSize: 12,
                                        color:
                                            profile.urgency === time
                                                ? mint
                                                : text60,
                                        cursor: "pointer",
                                    }}
                                >
                                    {time}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    const OnboardingStep5 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>✨</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 24,
                }}
            >
                Your Secret Sauce
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        What's your hidden strength that doesn't show on your
                        resume?
                    </label>
                    <textarea
                        value={profile.hiddenStrength}
                        onChange={(e) =>
                            handleProfileChange(
                                "hiddenStrength",
                                e.target.value
                            )
                        }
                        placeholder="e.g., I'm great at simplifying complex problems and getting buy-in from skeptical stakeholders..."
                        rows={4}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            background: charcoal,
                            border: `1px solid ${text20}`,
                            borderRadius: 10,
                            fontSize: 15,
                            color: text100,
                            outline: "none",
                            resize: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            color: text60,
                            marginBottom: 8,
                        }}
                    >
                        Upload Resume (optional)
                    </label>
                    <div
                        style={{
                            padding: 24,
                            background: charcoal,
                            border: `2px dashed ${text20}`,
                            borderRadius: 12,
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            // Simulated file upload
                            handleProfileChange("resumeFile", "resume.pdf")
                        }}
                    >
                        {profile.resumeFile ? (
                            <div>
                                <span style={{ fontSize: 24 }}>📄</span>
                                <div
                                    style={{
                                        fontSize: 14,
                                        color: mint,
                                        marginTop: 8,
                                    }}
                                >
                                    {profile.resumeFile}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span style={{ fontSize: 24 }}>📤</span>
                                <div
                                    style={{
                                        fontSize: 14,
                                        color: text40,
                                        marginTop: 8,
                                    }}
                                >
                                    Drop your resume or click to upload
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: text40,
                                        marginTop: 4,
                                    }}
                                >
                                    PDF, DOC, DOCX (max 5MB)
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    const OnboardingStep6 = () => (
        <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔗</div>
            <h2
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: text100,
                    marginBottom: 8,
                }}
            >
                Connect Your Job Sources
            </h2>
            <p
                style={{
                    fontSize: 14,
                    color: text40,
                    marginBottom: 24,
                }}
            >
                Forward job alerts to{" "}
                <strong style={{ color: mint }}>jobs@zjobconcierge.com</strong>{" "}
                and we'll generate packets automatically.
            </p>
            <div style={{ display: "grid", gap: 16 }}>
                {[
                    { name: "LinkedIn", icon: "💼", required: true },
                    { name: "Indeed", icon: "🔍", required: true },
                    { name: "Glassdoor", icon: "🏢", required: false },
                ].map((source) => (
                    <div
                        key={source.name}
                        style={{
                            padding: 20,
                            background: charcoal,
                            border: `1px solid ${text20}`,
                            borderRadius: 14,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 12,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <span style={{ fontSize: 24 }}>
                                    {source.icon}
                                </span>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            color: text100,
                                        }}
                                    >
                                        {source.name}
                                    </div>
                                    <div
                                        style={{ fontSize: 12, color: text40 }}
                                    >
                                        {source.required
                                            ? "Required"
                                            : "Optional"}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    padding: "6px 12px",
                                    background: profile[
                                        source.name.toLowerCase()
                                    ]
                                        ? mintSoft
                                        : slate,
                                    borderRadius: 6,
                                    fontSize: 12,
                                    color: profile[source.name.toLowerCase()]
                                        ? mint
                                        : text40,
                                }}
                            >
                                {profile[source.name.toLowerCase()]
                                    ? "✓ Connected"
                                    : "Not connected"}
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                handleProfileChange(
                                    source.name.toLowerCase(),
                                    !profile[source.name.toLowerCase()]
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                background: profile[source.name.toLowerCase()]
                                    ? "transparent"
                                    : mintSoft,
                                border: `1px solid ${profile[source.name.toLowerCase()] ? text20 : mintBorder}`,
                                borderRadius: 10,
                                fontSize: 13,
                                fontWeight: 600,
                                color: profile[source.name.toLowerCase()]
                                    ? text40
                                    : mint,
                                cursor: "pointer",
                            }}
                        >
                            {profile[source.name.toLowerCase()]
                                ? "Disconnect"
                                : "Connect"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )

    const onboardingSteps = [
        OnboardingStep1,
        OnboardingStep2,
        OnboardingStep3,
        OnboardingStep4,
        OnboardingStep5,
        OnboardingStep6,
    ]

    const OnboardingPage = () => {
        const CurrentStepComponent = onboardingSteps[onboardingStep - 1]
        return (
            <div style={{ maxWidth: 520, margin: "0 auto" }}>
                <OnboardingProgress />
                <CurrentStepComponent />
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 32,
                    }}
                >
                    {onboardingStep > 1 && (
                        <button
                            onClick={() =>
                                setOnboardingStep(onboardingStep - 1)
                            }
                            style={{
                                flex: 1,
                                padding: "14px 20px",
                                background: "transparent",
                                border: `1px solid ${text20}`,
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: 600,
                                color: text60,
                                cursor: "pointer",
                            }}
                        >
                            ← Back
                        </button>
                    )}
                    <button
                        onClick={handleOnboardingNext}
                        style={{
                            flex: 2,
                            padding: "14px 20px",
                            background: mint,
                            border: "none",
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: 700,
                            color: void_,
                            cursor: "pointer",
                            boxShadow: `0 0 20px ${mintGlow}`,
                        }}
                    >
                        {onboardingStep === 6
                            ? "Launch Dashboard 🚀"
                            : "Continue →"}
                    </button>
                </div>
                {onboardingStep > 1 && (
                    <div
                        onClick={goToDashboard}
                        style={{
                            textAlign: "center",
                            marginTop: 16,
                            fontSize: 13,
                            color: text40,
                            cursor: "pointer",
                        }}
                    >
                        Skip for now
                    </div>
                )}
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
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                color: text80,
            }}
        >
            {showConfetti && <Confetti />}

            {/* Background */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(ellipse at 30% 20%, rgba(60, 255, 208, 0.06) 0%, transparent 50%),
                               radial-gradient(ellipse at 70% 80%, rgba(167, 139, 250, 0.04) 0%, transparent 50%)`,
                    pointerEvents: "none",
                }}
            />

            {/* Nav */}
            <nav
                style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "16px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                {currentStep !== "onboarding" && (
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
                )}
            </nav>

            {/* Main Content */}
            <main
                style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "40px 40px 80px",
                }}
            >
                {currentStep === "info" && <InfoPage />}
                {currentStep === "checkout" && <CheckoutPage />}
                {currentStep === "success" && <SuccessPage />}
                {currentStep === "onboarding" && <OnboardingPage />}
            </main>
        </div>
    )
}

