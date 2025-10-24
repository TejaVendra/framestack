
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Copywright from "../Components/Copywright";
import "../styles/Pricing.css";
import axiosInstance from "../context/axiosInstance";

const Pricing = () => {
  const [popup, setPopup] = useState({ message: "", type: "", show: false });
  const [loadingPlan, setLoadingPlan] = useState(null);
  const navigate = useNavigate();

  const pricingData = [
    {
      plan: "Starter Full-Stack",
      price: "99",
      period: "/month",
      subtitle: "Full-Stack Projects for Aspiring Developers",
      description: "Functional full-stack website with essential features.",
      buttonLabel: "Get Started",
      included: [
        "Multi-page full-stack website",
        "Backend & database integration",
        "Basic interactivity",
        "Optional basic AI features",
        "Basic email support",
      ],
      highlight: false,
      isAI: false,
      badge: null,
    },
    {
      plan: "Advanced AI Website",
      price: "199",
      period: "/month",
      subtitle: "Complex Websites with AI Integration",
      description: "Highly interactive website with AI-powered features.",
      buttonLabel: "Go Advanced",
      included: [
        "Complex multi-page website",
        "AI Chatbot integration",
        "AI-powered content suggestions",
        "Priority support",
        "Full customization options",
      ],
      highlight: true,
      isAI: true,
      badge: "🤖 AI-Powered",
    },
    {
      plan: "Business AI & Managed",
      price: "299",
      period: "/month",
      subtitle: "Complete Business Websites with AI & Full Support",
      description: "Everything handled for you.",
      buttonLabel: "Contact Sales",
      included: [
        "Complete website management",
        "AI Chatbot & Content Assistant",
        "Fast delivery & updates",
        "Unlimited support 24/7",
        "SEO & performance optimization",
      ],
      highlight: true,
      isAI: true,
      badge: "🤖 AI-Powered",
    },
  ];

  const showPopup = (message, type = "success") => {
    setPopup({ message, type, show: true });
    setTimeout(() => setPopup({ message: "", type: "", show: false }), 4000);
  };

const handlePlanClick = async (plan) => {
  // ✅ No need to manually check for token, axiosInstance handles it
  setLoadingPlan(plan.plan);
  showPopup("Processing your payment...", "loading");

  const creditsMap = {
    "Starter Full-Stack": 10,
    "Advanced AI Website": 20,
    "Business AI & Managed": 50,
  };

  try {
    const { data } = await axiosInstance.post("/dummy-payment/", {
      plan: plan.plan,
      credits: creditsMap[plan.plan] || 0,
    });

    showPopup(
      `🎉 Payment successful! You’ve selected the ${data.plan} plan with ${data.credits} credits.`,
      "success"
    );
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      showPopup(error.response.data.error || "❌ Payment failed", "error");
    } else {
      showPopup("Something went wrong! Please try again.", "error");
    }
  } finally {
    setTimeout(() => setLoadingPlan(null), 1000);
  }
};

  return (
    <>
      {/* Animated Popup */}
      {popup.show && (
        <div className={`popup ${popup.type}-popup ${popup.type}`}>
          <div className="popup-content">
            {popup.type === "loading" && (
              <div className="loading-animation">
                <div className="spinner"></div>
                <span>{popup.message}</span>
              </div>
            )}
            {popup.type === "success" && (
              <div className="success-animation">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <span>{popup.message}</span>
              </div>
            )}
            {popup.type === "error" && (
              <div className="error-animation">
                <div className="error-icon">⚠️</div>
                <span>{popup.message}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pricing-wrapper">
        <div className="pricing-container">
          <div className="pricing-header">
            <h3 className="pricing-subtitle">
              Simple, transparent pricing. Cancel anytime.
            </h3>
            <h1 className="pricing-title">
              Choose a plan that grows with your business 🚀
            </h1>
          </div>

          <div className="pricing-grid">
            {pricingData.map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
              >
                {plan.badge && (
                  <div className="badge">
                    {plan.badge}
                  </div>
                )}

                <div className="plan-header">
                  <h2>{plan.plan}</h2>
                  <div className="price-container">
                    <span className="currency">₹</span>
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="subtitle">{plan.subtitle}</p>
                  <p className="description">{plan.description}</p>
                </div>

                <ul className="features">
                  {plan.included.map((item, i) => (
                    <li key={i} className="feature-item">
                      <span className="check-icon">✓</span>
                      <span className="feature-text">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`pricing-btn ${plan.highlight ? "highlight-btn" : ""}`}
                  aria-label={`Purchase ${plan.plan}`}
                  disabled={loadingPlan === plan.plan}
                >
                  {loadingPlan === plan.plan ? "Processing..." : plan.buttonLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Copywright />
    </>
  );
};

export default Pricing;