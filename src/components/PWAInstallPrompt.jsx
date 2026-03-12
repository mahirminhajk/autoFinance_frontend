import { useState, useEffect } from "react";
import logoImage from "../assets/image/KABS 3D Logo.jpg";

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the browser's install prompt event
    const handler = (e) => {
      e.preventDefault(); // prevent the mini-infobar
      setDeferredPrompt(e);
      setShowPrompt(true); // show our custom popup
    };

    window.addEventListener("beforeinstallprompt", handler);

    // If already installed, never show
    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(90vw, 420px)",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        border: "1px solid rgba(139, 92, 246, 0.35)",
        borderRadius: "20px",
        padding: "20px 24px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(30px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Logo */}
      <img
        src={logoImage}
        alt="AutoFinance"
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          flexShrink: 0,
          objectFit: "cover",
          border: "2px solid rgba(139,92,246,0.4)",
        }}
      />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#ffffff", letterSpacing: "-0.01em" }}>
          Install AutoFinance
        </p>
        <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
          Add to your home screen for a faster, app-like experience.
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        <button
          onClick={handleInstall}
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            border: "none",
            borderRadius: 10,
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            padding: "8px 18px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            padding: "6px 18px",
            cursor: "pointer",
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}

export default PWAInstallPrompt;
