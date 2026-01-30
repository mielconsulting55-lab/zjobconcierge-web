// ZJobConcierge - Checkout Flow with API Integration
// FIXED: Reads plan from URL parameter
// FIXED: Connects to real backend API

import { useState, useEffect } from "react"
import { processCheckout, setUserSession, checkHealth } from "../api"

export default function JobConciergeCheckoutFlow() {
    // FIXED: Get plan from URL (e.g., /checkout?plan=basic)
    const urlParams = new URLSearchParams(window.location.search)
    const selectedPlan = urlParams.get('plan') || 'pro'

    const [currentStep, setCurrentStep] = useState("info")
    const [onboardingStep, setOnboardingStep] = useState(1)
    const [billingCycle, setBillingCycle] = useState("monthly")
    const [isProcessing, setIsProcessing] = useState(false)
    const [signupCount, setSignupCount] = useState(147)
    const [showConfetti, setShowConfetti] = useState(false)
    const [apiError, setApiError] = useState(null)

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
        dreamTitle: "",
        workStyle: "",
    })

    const [errors, setErrors] = useState({})

    // Colors
    const void_ = "#04040A"
    const charcoal = "#0E0E14"
    const slate = "#151519"
    const mint = "#3CFFD0"
    const lavender = "#A78BFA"
    const gold = "#FFD93D"
    const coral = "#FF6B6B"
    const text100 = "#FFFFFF"
    const text60 = "rgba(255, 255, 255, 0.6)"
    const text40 = "rgba(255, 255, 255, 0.4)"
    const text20 = "rgba(255, 255, 255, 0.12)"
    const text10 = "rgba(255, 255, 255, 0.06)"

    // Plans data
    const plans = {
        free: { name: "Free Trial", icon: "🎁", price: 0, annualPrice: 0, jobsPerDay: 5, jobsPerMonth: 35, color: mint, duration: "7 days" },
        basic: { name: "Basic", icon: "🌱", price: 19, annualPrice: 15, jobsPerDay: 5, jobsPerMonth: 150, color: lavender },
        pro: { name: "Pro", icon: "⚡", price: 39, annualPrice: 31, jobsPerDay: 10, jobsPerMonth: 300, color: mint, popular: true },
        vip: { name: "VIP", icon: "👑", price: 79, annualPrice: 63, jobsPerDay: 15, jobsPerMonth: 450, color: gold },
        enterprise: { name: "Enterprise", icon: "🏢", price: 299, annualPrice: 239, jobsPerDay: 50, jobsPerMonth: 1500, color: lavender },
    }

    const activePlan = plans[selectedPlan] || plans.pro
    const currentPrice = billingCycle === "annual" ? activePlan.annualPrice : activePlan.price

    // Navigation
    const goToHome = () => (window.location.href = "/")
    const goToGetStarted = () => (window.location.href = "/get-started")
    const goToDashboard = () => (window.location.href = "/dashboard")

    // Effects
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) setSignupCount((prev) => prev + 1)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showConfetti])

    // Form handlers
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
        if (apiError) setApiError(null)
    }

    // Card formatting
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const parts = []
        for (let i = 0; i < v.length && i < 16; i += 4) {
            parts.push(v.substring(i, i + 4))
        }
        return parts.join(" ")
    }

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4)
        return v
    }

    // Validation
    const validateInfo = () => {
        const newErrors = {}
        if (!formData.firstName.trim()) newErrors.firstName = "First name required"
        if (!formData.email.includes("@")) newErrors.email = "Valid email required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateCheckout = () => {
        const newErrors = {}
        if (formData.cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "16 digits required"
        if (formData.expiry.length !== 5) newErrors.expiry = "MM/YY required"
        if (formData.cvc.length < 3) newErrors.cvc = "3-4 digits"
        if (formData.zip.length !== 5) newErrors.zip = "5 digits"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // API Handlers
    const handleInfoSubmit = async () => {
        if (!validateInfo()) return

        if (selectedPlan === "free") {
            setIsProcessing(true)
            setApiError(null)
            try {
                const result = await processCheckout({ formData, profile, selectedPlan, billingCycle })
                setUserSession({ email: formData.email, userId: result.userId, plan: selectedPlan, name: formData.firstName })
                setIsProcessing(false)
                setCurrentStep("success")
                setShowConfetti(true)
            } catch (error) {
                setIsProcessing(false)
                setApiError(error.message || "Failed to create account")
            }
        } else {
            setCurrentStep("checkout")
        }
    }

    const handleCheckoutSubmit = async () => {
        if (!validateCheckout()) return

        setIsProcessing(true)
        setApiError(null)
        try {
            const result = await processCheckout({ formData, profile, selectedPlan, billingCycle })
            setUserSession({ email: formData.email, userId: result.userId, plan: selectedPlan, name: formData.firstName })
            setIsProcessing(false)
            setCurrentStep("success")
            setShowConfetti(true)
        } catch (error) {
            setIsProcessing(false)
            setApiError(error.message || "Failed to create account")
        }
    }

    const handleOnboardingNext = () => {
        if (onboardingStep < 6) setOnboardingStep(onboardingStep + 1)
        else goToDashboard()
    }

    // Components
    const Input = ({ label, value, onChange, type = "text", placeholder, error, maxLength }) => (
        <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, color: text60, marginBottom: 6, fontWeight: 500 }}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{
                    width: "100%",
                    padding: "14px",
                    background: charcoal,
                    border: `1px solid ${error ? coral : text10}`,
                    borderRadius: 10,
                    fontSize: 15,
                    color: text100,
                    outline: "none",
                    boxSizing: "border-box",
                }}
            />
            {error && <span style={{ fontSize: 12, color: coral, marginTop: 4 }}>{error}</span>}
        </div>
    )

    const ErrorBanner = ({ message }) => (
        <div style={{ padding: "12px 16px", background: "rgba(255, 107, 107, 0.1)", border: `1px solid ${coral}`, borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span>⚠️</span>
            <span style={{ fontSize: 14, color: coral }}>{message}</span>
        </div>
    )

    const PlanSummary = () => (
        <div style={{ padding: 20, background: `${activePlan.color}15`, border: `1px solid ${activePlan.color}40`, borderRadius: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 48, height: 48, background: `${activePlan.color}25`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{activePlan.icon}</div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: text100 }}>{activePlan.name}</div>
                        <div style={{ fontSize: 13, color: text40 }}>{activePlan.jobsPerDay} jobs/day • {activePlan.jobsPerMonth} packets/mo</div>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: activePlan.color }}>${currentPrice}<span style={{ fontSize: 14, color: text40 }}>{selectedPlan === "free" ? "" : "/mo"}</span></div>
                </div>
            </div>
        </div>
    )

    // Info Step
    const InfoStep = () => (
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: text100, marginBottom: 8 }}>Create your account</h1>
                <p style={{ fontSize: 15, color: text40 }}>Start your {activePlan.name} journey today</p>
            </div>
            <PlanSummary />
            {apiError && <ErrorBanner message={apiError} />}
            <Input label="First Name" value={formData.firstName} onChange={(v) => handleInputChange("firstName", v)} placeholder="What should we call you?" error={errors.firstName} />
            <Input label="Email" type="email" value={formData.email} onChange={(v) => handleInputChange("email", v)} placeholder="you@email.com" error={errors.email} />
            <button onClick={handleInfoSubmit} disabled={isProcessing} style={{ width: "100%", padding: "16px", background: isProcessing ? slate : `linear-gradient(135deg, ${activePlan.color}, ${activePlan.color}CC)`, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: isProcessing ? text40 : void_, cursor: isProcessing ? "wait" : "pointer", boxShadow: isProcessing ? "none" : `0 0 30px ${activePlan.color}50`, marginTop: 8 }}>
                {isProcessing ? "Creating account..." : selectedPlan === "free" ? "Start Free Trial →" : "Continue to Payment →"}
            </button>
            <p style={{ fontSize: 12, color: text40, textAlign: "center", marginTop: 20 }}>By continuing, you agree to our Terms of Service</p>
        </div>
    )

    // Checkout Step
    const CheckoutStep = () => (
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: text100, marginBottom: 8 }}>Complete your purchase</h1>
                <p style={{ fontSize: 15, color: text40 }}>Secure payment</p>
            </div>
            <PlanSummary />
            {apiError && <ErrorBanner message={apiError} />}
            <Input label="Card Number" value={formData.cardNumber} onChange={(v) => handleInputChange("cardNumber", formatCardNumber(v))} placeholder="1234 5678 9012 3456" error={errors.cardNumber} maxLength={19} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <Input label="Expiry" value={formData.expiry} onChange={(v) => handleInputChange("expiry", formatExpiry(v))} placeholder="MM/YY" error={errors.expiry} maxLength={5} />
                <Input label="CVC" value={formData.cvc} onChange={(v) => handleInputChange("cvc", v.replace(/\D/g, ""))} placeholder="123" error={errors.cvc} maxLength={4} />
                <Input label="ZIP" value={formData.zip} onChange={(v) => handleInputChange("zip", v.replace(/\D/g, ""))} placeholder="12345" error={errors.zip} maxLength={5} />
            </div>
            <button onClick={handleCheckoutSubmit} disabled={isProcessing} style={{ width: "100%", padding: "16px", background: isProcessing ? slate : `linear-gradient(135deg, ${activePlan.color}, ${activePlan.color}CC)`, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: isProcessing ? text40 : void_, cursor: isProcessing ? "wait" : "pointer", boxShadow: isProcessing ? "none" : `0 0 30px ${activePlan.color}50`, marginTop: 8 }}>
                {isProcessing ? "Processing..." : `Pay $${currentPrice}/month`}
            </button>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
                {["🔒 Secure", "💳 Encrypted", "↩️ Cancel anytime"].map((item, i) => (<span key={i} style={{ fontSize: 12, color: text40 }}>{item}</span>))}
            </div>
        </div>
    )

    // Success Step
    const SuccessStep = () => (
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            <div style={{ width: 80, height: 80, background: `${activePlan.color}20`, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 24px" }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: text100, marginBottom: 12 }}>Welcome to Job Concierge!</h1>
            <p style={{ fontSize: 16, color: text60, marginBottom: 32, lineHeight: 1.6 }}>Your {activePlan.name} account is ready. You'll receive {activePlan.jobsPerDay} tailored job packets daily.</p>
            <div style={{ padding: 24, background: `${activePlan.color}15`, border: `1px solid ${activePlan.color}30`, borderRadius: 16, marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
                    <div><div style={{ fontSize: 36, fontWeight: 700, color: activePlan.color }}>{activePlan.jobsPerDay}</div><div style={{ fontSize: 13, color: text40 }}>jobs/day</div></div>
                    <div><div style={{ fontSize: 36, fontWeight: 700, color: activePlan.color }}>{activePlan.jobsPerMonth}</div><div style={{ fontSize: 13, color: text40 }}>packets/mo</div></div>
                </div>
            </div>
            <button onClick={() => setCurrentStep("onboarding")} style={{ padding: "16px 48px", background: `linear-gradient(135deg, ${activePlan.color}, ${activePlan.color}CC)`, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: void_, cursor: "pointer", boxShadow: `0 0 30px ${activePlan.color}50` }}>Set Up My Profile →</button>
            <button onClick={goToDashboard} style={{ display: "block", margin: "16px auto 0", padding: "12px 24px", background: "transparent", border: `1px solid ${text20}`, borderRadius: 8, fontSize: 14, color: text40, cursor: "pointer" }}>Skip for now</button>
        </div>
    )

    // Onboarding Step
    const OnboardingStep = () => (
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: text100, marginBottom: 12 }}>Tell us about yourself</h2>
            <p style={{ fontSize: 14, color: text40, marginBottom: 32 }}>Step {onboardingStep} of 6</p>
            <button onClick={handleOnboardingNext} style={{ padding: "16px 48px", background: `linear-gradient(135deg, ${activePlan.color}, ${activePlan.color}CC)`, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: void_, cursor: "pointer" }}>{onboardingStep < 6 ? "Next →" : "Go to Dashboard →"}</button>
        </div>
    )

    // Confetti
    const Confetti = () => (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000, overflow: "hidden" }}>
            {[...Array(50)].map((_, i) => (<div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: -20, width: Math.random() * 10 + 5, height: Math.random() * 10 + 5, background: [mint, lavender, gold, coral][Math.floor(Math.random() * 4)], borderRadius: Math.random() > 0.5 ? "50%" : "2px", animation: `confetti ${2 + Math.random() * 2}s ease-out forwards`, animationDelay: `${Math.random() * 0.5}s` }} />))}
        </div>
    )

    return (
        <div style={{ width: "100%", minHeight: "100vh", background: void_, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: "rgba(255, 255, 255, 0.85)" }}>
            {/* Background */}
            <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse at 20% 20%, ${activePlan.color}08 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(167, 139, 250, 0.04) 0%, transparent 50%)`, pointerEvents: "none" }} />

            {/* Header */}
            <nav style={{ position: "relative", zIndex: 100, padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${text10}` }}>
                <div onClick={goToHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div style={{ width: 40, height: 40, background: mint, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: void_ }}>Z</div>
                    <span style={{ fontSize: 18, fontWeight: 600, color: text100 }}>JobConcierge</span>
                </div>
                <button onClick={goToGetStarted} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${text20}`, borderRadius: 8, fontSize: 13, color: text40, cursor: "pointer" }}>← Change Plan</button>
            </nav>

            {/* Main */}
            <main style={{ position: "relative", zIndex: 10, padding: "60px 24px 80px" }}>
                {currentStep === "info" && <InfoStep />}
                {currentStep === "checkout" && <CheckoutStep />}
                {currentStep === "success" && <SuccessStep />}
                {currentStep === "onboarding" && <OnboardingStep />}
            </main>

            {showConfetti && <Confetti />}
            <style>{`@keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`}</style>
        </div>
    )
}
