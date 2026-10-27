import React, { useState } from "react";
import PortfolioNav from "../Portfolio/PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";
import "./ServicesPage.css";

interface ServicesPageProps {
  onNavigate: (route: string) => void;
}

interface ServiceItem {
  id: string;
  num: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
  bgImage: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "residential-architecture",
    num: "01",
    badge: "RESIDENTIAL",
    title: "Residential Architecture",
    desc: "Concept development, spatial organization, and architectural planning for standalone homes, climate-responsive courtyard villas, and family estates across Purnia and Eastern Bihar.",
    deliverables: [
      "Site analysis & solar orientation",
      "Floor plans, elevations & sections",
      "Structural & masonry coordination",
      "3D volumetric visualization"
    ],
    bgImage: "/frames/desktop/sequence 1/ezgif-frame-300.jpg"
  },
  {
    id: "interior-design",
    num: "02",
    badge: "INTERIORS",
    title: "Interior Design & Styling",
    desc: "Harmonious material palettes, custom millwork, ambient lighting choreography, and bespoke spatial layouts for calm, luxurious daily living.",
    deliverables: [
      "Spatial zoning & circulation layouts",
      "Material, texture & color palettes",
      "Custom millwork & storage detailing",
      "Architectural lighting design"
    ],
    bgImage: "/frames/desktop/sequence 2/ezgif-frame-150.jpg"
  },
  {
    id: "commercial-spaces",
    num: "03",
    badge: "COMMERCIAL",
    title: "Commercial & Workspaces",
    desc: "Productive corporate offices, executive suites, and collaborative environments optimized for circulation, focus, and refined brand presence in Bihar.",
    deliverables: [
      "Executive suites & conference layouts",
      "Acoustic & lighting balance",
      "Reception & client presentation zones",
      "Durable high-traffic finish selections"
    ],
    bgImage: "/frames/desktop/sequence 2/ezgif-frame-240.jpg"
  },
  {
    id: "retail-hospitality",
    num: "04",
    badge: "RETAIL",
    title: "Retail & Showrooms",
    desc: "Experiential commercial interiors that command street presence, enhance merchandise presentation, and maximize client consultation comfort.",
    deliverables: [
      "Customer circulation flow mapping",
      "Product showcase & display joinery",
      "Facade & entry threshold design",
      "Directional accent lighting"
    ],
    bgImage: "/frames/desktop/sequence 2/ezgif-frame-180.jpg"
  },
  {
    id: "renovation-transformation",
    num: "05",
    badge: "RENOVATION",
    title: "Renovation & Rework",
    desc: "Transforming existing layouts through structural openings, natural light wells, and modern architectural finishes while honoring existing structural integrity.",
    deliverables: [
      "Existing structure audit & assessment",
      "Wall modification & beam planning",
      "Natural daylight enhancement",
      "Phased renovation scheduling"
    ],
    bgImage: "/frames/desktop/sequence 1/ezgif-frame-240.jpg"
  }
];

const APPROACH_STEPS = [
  {
    num: "01",
    name: "Understand",
    desc: "In-depth conversation regarding your lifestyle, family needs or business operations, budget parameters, and site conditions in Purnia or nearby regions."
  },
  {
    num: "02",
    name: "Plan",
    desc: "Spatial zoning, circulation logic, and functional layout schemes explored on architectural drawings before aesthetic finishes are decided."
  },
  {
    num: "03",
    name: "Design",
    desc: "Developing 3D elevations, spatial volumes, material swatches, and lighting plans that translate functional requirements into refined form."
  },
  {
    num: "04",
    name: "Develop",
    desc: "Translating approved designs into precise working drawings, technical dimensions, joinery details, and material specifications."
  },
  {
    num: "05",
    name: "Execute",
    desc: "Periodic design coordination, site reviews, and material verification to ensure the built reality reflects the architectural intent."
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({ route }, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <div className="services-page">
      <PortfolioNav onNavigate={handleNav} activeRoute="/services" />
      <div className="services-ambient-glow" aria-hidden="true" />

      <div className="services-container">
        {/* --- Hero Statement --- */}
        <section className="services-hero">
          <div className="services-eyebrow">
            <span className="dot" />
            <span>Das Architects — Studio Capabilities</span>
          </div>
          <h1 className="services-title">
            Architectural clarity and interior craft, <span className="accent">grounded in context.</span>
          </h1>
          <p className="services-intro-lead">
            We deliver thoughtful architectural planning, bespoke residential interiors, and functional commercial spaces for clients across Purnia, Seemanchal, and nearby districts of Bihar. Every project is designed around human comfort, material honesty, and regional weather resilience.
          </p>
          <div className="services-location-badge">
            <span>Studio Based in Purnia, Bihar</span>
            <span>•</span>
            <span>Residential & Commercial Practice</span>
          </div>
        </section>

        {/* --- Services Grid --- */}
        <section className="services-section">
          <div className="services-section-head">
            <div>
              <h2>Architectural & Interior Disciplines</h2>
            </div>
            <p>
              From initial plot orientation to the final joinery handle, our capabilities address every stage of the built environment.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((service) => (
              <article
                key={service.id}
                className={`service-card ${activeCard === service.id ? "active" : ""}`}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => handleNav("/contact")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNav("/contact");
                  }
                }}
              >
                <div
                  className="service-card-bg"
                  style={{ backgroundImage: `url('${service.bgImage}')` }}
                  aria-hidden="true"
                />
                <div className="service-card-overlay" aria-hidden="true" />

                <div className="service-card-content">
                  <div>
                    <div className="service-card-top">
                      <span className="service-number">{service.num}</span>
                      <span className="service-badge">{service.badge}</span>
                    </div>

                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.desc}</p>
                  </div>

                  <div>
                    <ul className="service-deliverables">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>

                    <div className="service-card-action">
                      <span>Discuss Project</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- Approach: Understand -> Plan -> Design -> Develop -> Execute --- */}
        <section className="services-approach">
          <div className="approach-header">
            <div className="services-eyebrow">
              <span className="dot" />
              <span>Disciplined Methodology</span>
            </div>
            <h2 className="services-title" style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}>
              How we approach your project
            </h2>
          </div>

          <div className="approach-steps">
            {APPROACH_STEPS.map((step) => (
              <div key={step.num} className="approach-step">
                <span className="step-num">{step.num}</span>
                <h3 className="step-name">{step.name}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- What Clients Can Expect --- */}
        <section className="services-expectations">
          <div className="services-eyebrow">
            <span className="dot" />
            <span>Professional Standard</span>
          </div>
          <h2 className="services-title" style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}>
            What you can expect when working with us
          </h2>

          <div className="expectations-grid">
            <div className="expectation-item">
              <h3>Direct Principal Involvement</h3>
              <p>
                Every project is guided directly by our principal design team. We do not pass clients between multiple anonymous sales layers.
              </p>
            </div>
            <div className="expectation-item">
              <h3>Climate & Regional Sensitivity</h3>
              <p>
                We understand Eastern Bihar’s humidity, heavy monsoon rains, and seasonal temperature swings, selecting materials that age with dignity.
              </p>
            </div>
            <div className="expectation-item">
              <h3>Precise Execution Drawings</h3>
              <p>
                Our architectural packages contain unambiguous measurements, joinery sections, and electrical/plumbing coordination to prevent costly site guesswork.
              </p>
            </div>
            <div className="expectation-item">
              <h3>Transparent Material Guidance</h3>
              <p>
                We recommend materials based on lifecycle value, local availability, and tactile quality rather than commercial distributor markups.
              </p>
            </div>
            <div className="expectation-item">
              <h3>Disciplined Spatial Planning</h3>
              <p>
                Prioritizing clean circulation, concealed storage, and unencumbered natural light over decorative clutter.
              </p>
            </div>
            <div className="expectation-item">
              <h3>Responsive Local Presence</h3>
              <p>
                Being based in Purnia allows us to be physically accessible for site assessments and critical milestone reviews across the district.
              </p>
            </div>
          </div>
        </section>

        {/* --- Local CTA --- */}
        <section className="services-cta-banner">
          <div className="services-cta-copy">
            <h3>Have a space in mind in Purnia or nearby?</h3>
            <p>
              Whether you are planning a new residence, renovating an existing property, or designing a commercial interior, let’s sit down and discuss how to realize your project with architectural clarity.
            </p>
          </div>
          <a
            href="/contact"
            className="services-cta-button"
            onClick={(e) => {
              e.preventDefault();
              handleNav("/contact");
            }}
          >
            <span>Let's Discuss Your Space</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </section>

        {/* --- Global Glassmorphic Signature Footer --- */}
        <GlassmorphicFooter />
      </div>
    </div>
  );
};

export default ServicesPage;
