import React, { useState, useEffect } from "react";
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import PortfolioPage from "./pages/Portfolio";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/Contact";

export function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (route: string) => {
    if (window.location.pathname !== route) {
      window.history.pushState({ route }, "", route);
      setCurrentPath(route);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
  };

  // Dedicated Editorial Architectural Portfolio at /portfolio or /portfolio/:slug
  if (currentPath === "/portfolio" || currentPath.startsWith("/portfolio/")) {
    const slug = currentPath.startsWith("/portfolio/")
      ? currentPath.replace(/^\/portfolio\/?/, "").split("/")[0]
      : undefined;
    return <PortfolioPage onNavigate={navigateTo} projectId={slug || undefined} />;
  }

  // Dedicated About / Architectural Manifesto Experience at /about
  if (currentPath === "/about") {
    return <AboutPage onNavigate={navigateTo} />;
  }

  // Dedicated Architectural Services & Capabilities Experience at /services
  if (currentPath === "/services") {
    return <ServicesPage onNavigate={navigateTo} />;
  }

  // Dedicated Studio Contact & Project Enquiry Experience at /contact
  if (currentPath === "/contact") {
    return <ContactPage onNavigate={navigateTo} />;
  }

  // Landing / Home:
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={13}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}

export default App;
