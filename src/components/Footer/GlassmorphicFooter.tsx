import React from "react";
import "./GlassmorphicFooter.css";

interface GlassmorphicFooterProps {
  showBackToTop?: boolean;
}

export const GlassmorphicFooter: React.FC<GlassmorphicFooterProps> = ({
  showBackToTop = true,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const instagramUrl =
    "https://www.instagram.com/vistara.labs?obrf=eHByZnRubjZ5bXZ1";

  return (
    <footer className="signature-glass-footer" id="signature-footer">
      <div className="glass-footer-surface">
        <div className="glass-footer-inner">
          {/* Studio Identity / Colophon */}
          <div className="footer-studio-info">
            <span className="footer-studio-name">DAS ARCHITECTS</span>
            <span className="footer-studio-sub">
              Purnia, Bihar · Est. MMXXVI
            </span>
            <span className="footer-copy">
              © 2026 Das Architects. All rights reserved.
            </span>
          </div>

          {/* Developer Architectural Signature Block */}
          <div className="footer-dev-signature">
            <span className="sig-label">DESIGNED &amp; DEVELOPED BY</span>
            <div className="sig-badge">
              {/* Vistara Labs Official Logo (Clickable -> Instagram) */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sig-logo-link"
                aria-label="Vistara Labs on Instagram"
              >
                <img
                  src="/vistara-labs-logo.jpg"
                  alt="Vistara Labs"
                  className="sig-logo-img"
                  width="26"
                  height="26"
                />
              </a>

              {/* Clickable Developer & Studio Names -> Instagram */}
              <div className="sig-credits">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sig-credit-name"
                >
                  Abhigyan Singh
                </a>
                <span className="sig-credit-sep">·</span>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sig-credit-studio"
                >
                  VISTARA LABS
                </a>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <div className="footer-back-wrap">
              <button
                onClick={scrollToTop}
                className="footer-back-to-top"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <svg viewBox="0 0 10 10" fill="none" width="10" height="10">
                  <path
                    d="M5 8V2M2 5L5 2L8 5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default GlassmorphicFooter;
