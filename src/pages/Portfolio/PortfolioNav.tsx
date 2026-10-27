import React, { useState, useEffect } from "react";
import "./PortfolioNav.css";

interface PortfolioNavProps {
  onNavigate: (route: string) => void;
  activeRoute?: string;
}

export const PortfolioNav: React.FC<PortfolioNavProps> = ({
  onNavigate,
  activeRoute = "/portfolio",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className={`kage-nav ${menuOpen ? "menu-open" : ""}`} id="portfolio-nav">
      {/* Brand logo & mark */}
      <a
        className="kage-brand"
        href="/"
        onClick={(e) => handleLinkClick(e, "/")}
        aria-label="Das Architects Home"
      >
        <img
          src="/das-architects-logo.jpg"
          alt="Das Architects"
          className="kage-brand-logo-img"
        />
        <span className="kage-brand-tx">
          <b>DAS ARCHITECTS</b>
          <i>&amp; INTERIORS</i>
        </span>
      </a>

      {/* Primary navigation */}
      <nav className="kage-nav-links" id="kage-navlinks">
        <a
          className={`kage-nav-link ${activeRoute === "/" ? "on" : ""}`}
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
        >
          <span>Home</span>
          <span className="alt">Index</span>
        </a>
        <a
          className={`kage-nav-link ${activeRoute === "/portfolio" ? "on" : ""}`}
          href="/portfolio"
          onClick={(e) => handleLinkClick(e, "/portfolio")}
        >
          <span>Portfolio</span>
          <span className="alt">Works</span>
        </a>
        <a
          className={`kage-nav-link ${activeRoute === "/about" ? "on" : ""}`}
          href="/about"
          onClick={(e) => handleLinkClick(e, "/about")}
        >
          <span>About</span>
          <span className="alt">Studio</span>
        </a>
        <a
          className={`kage-nav-link ${activeRoute === "/services" ? "on" : ""}`}
          href="/services"
          onClick={(e) => handleLinkClick(e, "/services")}
        >
          <span>Services</span>
          <span className="alt">Practice</span>
        </a>
        <a
          className={`kage-nav-link ${activeRoute === "/contact" ? "on" : ""}`}
          href="/contact"
          onClick={(e) => handleLinkClick(e, "/contact")}
        >
          <span>Contact</span>
          <span className="alt">Inquire</span>
        </a>
      </nav>

      {/* Mobile burger toggle */}
      <button
        className={`kage-nav-burger ${menuOpen ? "active" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i />
        <i />
      </button>

      {/* Mobile Drawer Sheet */}
      {menuOpen && (
        <div className="kage-mobile-drawer">
          <div className="kage-mobile-drawer-inner">
            <span className="kage-drawer-tagline">DAS ARCHITECTS & INTERIORS</span>
            <nav className="kage-drawer-links">
              <a
                href="/"
                className={activeRoute === "/" ? "active" : ""}
                onClick={(e) => handleLinkClick(e, "/")}
              >
                <b>HOME</b>
                <i>Index</i>
              </a>
              <a
                href="/portfolio"
                className={activeRoute === "/portfolio" ? "active" : ""}
                onClick={(e) => handleLinkClick(e, "/portfolio")}
              >
                <b>PORTFOLIO</b>
                <i>Curated Works</i>
              </a>
              <a
                href="/about"
                className={activeRoute === "/about" ? "active" : ""}
                onClick={(e) => handleLinkClick(e, "/about")}
              >
                <b>ABOUT</b>
                <i>Philosophy</i>
              </a>
              <a
                href="/services"
                className={activeRoute === "/services" ? "active" : ""}
                onClick={(e) => handleLinkClick(e, "/services")}
              >
                <b>SERVICES</b>
                <i>Practices</i>
              </a>
              <a
                href="/contact"
                className={activeRoute === "/contact" ? "active" : ""}
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                <b>CONTACT</b>
                <i>Inquiries</i>
              </a>
            </nav>
            <div className="kage-drawer-foot">
              <span>© 2026 Das Architects Atelier — All Rights Reserved</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PortfolioNav;
