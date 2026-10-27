import React, { useEffect } from "react";
import PortfolioNav from "./PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";
import { Project, PROJECTS, getProjectById } from "./projectsData";
import "./ProjectDetail.css";

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate?: (route: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
}) => {
  const project = getProjectById(projectId) || PROJECTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({ route }, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
  };

  // Find next project in sequence
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div className="monograph-view-root">
      <PortfolioNav onNavigate={handleNav} activeRoute="/portfolio" />

      {/* Hero Header Area */}
      <section className="monograph-hero">
        <div className="monograph-hero-backdrop">
          <img
            src={project.heroImage}
            alt={project.title}
            className="monograph-hero-img"
          />
          <div className="monograph-hero-scrim"></div>
        </div>

        <div className="monograph-hero-container">
          <div className="monograph-top-bar">
            <button
              onClick={() => handleNav("/portfolio")}
              className="monograph-back-btn"
              aria-label="Return to portfolio list"
            >
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path
                  d="M10 13L5 8L10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back to Selected Works</span>
            </button>
            <div className="monograph-index-tag">
              <span className="monograph-index-num">{project.number}</span>
              <span className="monograph-index-sep">/</span>
              <span className="monograph-index-total">0{PROJECTS.length}</span>
            </div>
          </div>

          <div className="monograph-hero-title-wrap">
            <div className="monograph-meta-pill">
              <span className="meta-category">{project.category}</span>
              <span className="meta-dot">·</span>
              <span className="meta-loc">{project.location}</span>
              <span className="meta-dot">·</span>
              <span className="meta-yr">{project.year}</span>
            </div>
            <h1 className="monograph-title">{project.title}</h1>
            <p className="monograph-subtitle">{project.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Architectural Overview & Specifications */}
      <section className="monograph-body">
        <div className="monograph-content-grid">
          {/* Left Column: Narrative */}
          <div className="monograph-narrative-col">
            <div className="monograph-section-tag">
              <span>ATELIER BRIEF</span>
            </div>
            <p className="monograph-lead">{project.description}</p>

            <div className="monograph-concept-block">
              <h2 className="monograph-h2">Concept &amp; Climate Strategy</h2>
              <p className="monograph-text">{project.conceptNarrative}</p>
            </div>

            <div className="monograph-spatial-block">
              <h2 className="monograph-h2">Spatial Organization &amp; Flow</h2>
              <p className="monograph-text">{project.spatialApproach}</p>
            </div>

            {project.quote && (
              <blockquote className="monograph-quote">
                <div className="quote-line"></div>
                <p>"{project.quote}"</p>
                <cite>— Das Architects &amp; Interiors Design Philosophy</cite>
              </blockquote>
            )}

            {/* Materiality Palette */}
            <div className="monograph-materiality-block">
              <h3 className="monograph-h3">Material Palette &amp; Tectonics</h3>
              <ul className="monograph-material-list">
                {project.materials.map((mat, i) => (
                  <li key={i} className="monograph-material-item">
                    <span className="mat-dot"></span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Architectural Specifications Colophon */}
          <aside className="monograph-colophon-col">
            <div className="colophon-glass-card">
              <h3 className="colophon-heading">ARCHITECTURAL SPECIFICATIONS</h3>
              <div className="colophon-table">
                <div className="colophon-row">
                  <span className="col-label">Project No.</span>
                  <span className="col-value">DAS-MMXXVI-{project.number}</span>
                </div>
                <div className="colophon-row">
                  <span className="col-label">Typology</span>
                  <span className="col-value">{project.category}</span>
                </div>
                <div className="colophon-row">
                  <span className="col-label">Location</span>
                  <span className="col-value">{project.location}</span>
                </div>
                <div className="colophon-row">
                  <span className="col-label">Floor Area</span>
                  <span className="col-value">{project.area}</span>
                </div>
                <div className="colophon-row">
                  <span className="col-label">Client Group</span>
                  <span className="col-value">{project.client}</span>
                </div>
                <div className="colophon-row">
                  <span className="col-label">Project Status</span>
                  <span className="col-value status-badge">{project.status}</span>
                </div>
                {project.specifications.map((spec, i) => (
                  <div key={i} className="colophon-row">
                    <span className="col-label">{spec.label}</span>
                    <span className="col-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="colophon-inquire-box">
                <h4>Commission Similar Architecture</h4>
                <p>
                  Schedule a private architectural consultation with our Bihar
                  studio.
                </p>
                <button
                  onClick={() => handleNav("/contact")}
                  className="colophon-cta-btn"
                >
                  <span>Initiate Studio Brief</span>
                  <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                    <path
                      d="M3 11L11 3M5 3H11V9"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Architectural Plates / Gallery Spreads */}
      <section className="monograph-gallery-section">
        <div className="monograph-gallery-header">
          <span className="gallery-tag">VISUAL ARCHIVE</span>
          <h2 className="gallery-title">Spatial Documentation &amp; Details</h2>
        </div>

        <div className="monograph-plates-grid">
          {project.galleryImages.map((img, idx) => (
            <figure
              key={idx}
              className={`monograph-plate plate-${img.aspectRatio || "landscape"} ${
                idx % 2 === 1 ? "plate-offset" : ""
              }`}
            >
              <div className="plate-img-frame">
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="plate-img"
                />
              </div>
              <figcaption className="plate-caption">
                <span className="plate-num">Plate {idx + 1}.0</span>
                <span className="plate-caption-text">{img.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Monograph Sequence Footer Navigation */}
      <section className="monograph-nav-footer">
        <div className="monograph-nav-container">
          <button
            onClick={() => handleNav(`/portfolio/${prevProject.id}`)}
            className="monograph-seq-link seq-prev"
          >
            <span className="seq-dir">← Previous Work</span>
            <span className="seq-title">{prevProject.title}</span>
            <span className="seq-cat">{prevProject.category} · {prevProject.year}</span>
          </button>

          <button
            onClick={() => handleNav("/portfolio")}
            className="monograph-all-btn"
          >
            <span className="all-icon">
              <i></i><i></i><i></i><i></i>
            </span>
            <span>All Works</span>
          </button>

          <button
            onClick={() => handleNav(`/portfolio/${nextProject.id}`)}
            className="monograph-seq-link seq-next"
          >
            <span className="seq-dir">Next Work →</span>
            <span className="seq-title">{nextProject.title}</span>
            <span className="seq-cat">{nextProject.category} · {nextProject.year}</span>
          </button>
        </div>
      </section>

      {/* Standard Global Studio Glassmorphic Footer */}
      <GlassmorphicFooter />
    </div>
  );
};

export default ProjectDetailPage;
