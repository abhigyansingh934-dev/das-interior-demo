import React, { useState } from "react";
import PortfolioNav from "./PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";
import { Project, PROJECTS } from "./projectsData";
import "./EditorialPortfolio.css";

interface EditorialPortfolioProps {
  onNavigate?: (route: string) => void;
}

const CATEGORIES = ["All", "Residential", "Interiors", "Commercial", "Renovation"] as const;

export const EditorialPortfolio: React.FC<EditorialPortfolioProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({ route }, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="editorial-portfolio-root">
      <PortfolioNav onNavigate={handleNav} activeRoute="/portfolio" />

      {/* 1. Publication Masthead Hero */}
      <header className="editorial-masthead">
        <div className="masthead-container">
          <div className="masthead-colophon-top">
            <span className="colophon-item">DAS ARCHITECTS &amp; INTERIORS</span>
            <span className="colophon-sep">/</span>
            <span className="colophon-item">PORTFOLIO COMPENDIUM</span>
            <span className="colophon-sep">/</span>
            <span className="colophon-item">MMXXVI</span>
          </div>

          <div className="masthead-main">
            <h1 className="masthead-title">
              <span className="masthead-line-1">SELECTED</span>
              <span className="masthead-line-2">WORKS</span>
            </h1>

            <div className="masthead-narrative">
              <p className="masthead-lead">
                An architectural and interior monograph documenting built works,
                spatial interventions, and climate-responsive dwellings across
                Purnia and Eastern Bihar.
              </p>
              <div className="masthead-meta-block">
                <span className="meta-coords">25.7771° N, 87.4753° E</span>
                <span className="meta-badge">6 DOCUMENTED MONOGRAPHS</span>
              </div>
            </div>
          </div>

          {/* Understated Category Filter Bar */}
          <nav className="editorial-filter-bar" aria-label="Filter works by discipline">
            <div className="filter-label">DISCIPLINE /</div>
            <div className="filter-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-pill ${activeCategory === cat ? "is-active" : ""}`}
                >
                  <span className="pill-dot"></span>
                  <span className="pill-text">{cat}</span>
                  {activeCategory === cat && (
                    <span className="pill-count">
                      (
                      {cat === "All"
                        ? PROJECTS.length
                        : PROJECTS.filter((p) => p.category === cat).length}
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 2. Editorial Spreads Stream */}
      <main className="editorial-stream">
        {filteredProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={project.id}
              className={`editorial-spread spread-layout-${isEven ? "left" : "right"}`}
              id={`spread-${project.id}`}
            >
              {/* Giant Background Numeral Watermark */}
              <div className="spread-watermark" aria-hidden="true">
                {project.number}
              </div>

              <div className="spread-inner-container">
                {/* Visual Image Plate */}
                <div className="spread-visual-wrap">
                  <div className="spread-plate-frame">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      loading="lazy"
                      className="spread-img"
                    />
                    <div className="spread-img-tint"></div>

                    {/* Overlapping Metadata Card */}
                    <div className="spread-overlap-card">
                      <div className="card-top-row">
                        <span className="overlap-category">{project.category}</span>
                        <span className="overlap-num">{project.number}</span>
                      </div>
                      <div className="card-specs">
                        <div className="spec-item">
                          <span className="spec-k">LOC</span>
                          <span className="spec-v">{project.location}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-k">YEAR</span>
                          <span className="spec-v">{project.year}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-k">AREA</span>
                          <span className="spec-v">{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Typography & Narrative Column */}
                <div className="spread-content-wrap">
                  <div className="spread-eyebrow">
                    <span className="eyebrow-num">PLATE {project.number}</span>
                    <span className="eyebrow-divider">—</span>
                    <span className="eyebrow-status">{project.status}</span>
                  </div>

                  <h2 className="spread-title">{project.title}</h2>
                  <p className="spread-subtitle">{project.subtitle}</p>

                  <p className="spread-description">{project.description}</p>

                  {/* Materiality highlight */}
                  <div className="spread-materials-tagline">
                    <span className="mat-label">PRIMARY TECTONICS:</span>
                    <span className="mat-val">{project.materials.slice(0, 2).join(" · ")}</span>
                  </div>

                  {/* Action Link to Full Case Study Monograph */}
                  <div className="spread-actions">
                    <button
                      onClick={() => handleNav(`/portfolio/${project.id}`)}
                      className="spread-monograph-btn"
                      aria-label={`Explore full monograph for ${project.title}`}
                    >
                      <span className="btn-text">Explore Monograph</span>
                      <span className="btn-arrow">
                        <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                          <path
                            d="M3 11L11 3M5 3H11V9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <span className="spread-time-hint">
                      {project.galleryImages.length + 1} Spreads &amp; Specs
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* 3. Architectural Index Matrix Table */}
      <section className="editorial-matrix-section">
        <div className="matrix-container">
          <div className="matrix-header">
            <span className="matrix-tag">CHRONOLOGICAL REGISTER</span>
            <h3 className="matrix-title">Project Index &amp; Typology Register</h3>
          </div>

          <div className="matrix-table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Project Name</th>
                  <th>Typology</th>
                  <th>Location</th>
                  <th>Area</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((proj) => (
                  <tr
                    key={proj.id}
                    onClick={() => handleNav(`/portfolio/${proj.id}`)}
                    className="matrix-row"
                  >
                    <td className="cell-num">{proj.number}</td>
                    <td className="cell-title">
                      <b>{proj.title}</b>
                      <span>{proj.subtitle}</span>
                    </td>
                    <td className="cell-cat">
                      <span className={`cat-pill cat-${proj.category.toLowerCase()}`}>
                        {proj.category}
                      </span>
                    </td>
                    <td className="cell-loc">{proj.location}</td>
                    <td className="cell-area">{proj.area}</td>
                    <td className="cell-yr">{proj.year}</td>
                    <td className="cell-act">
                      <span className="matrix-link">
                        View
                        <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                          <path
                            d="M2.5 9.5L9.5 2.5M4 2.5H9.5V8"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Global Glassmorphic Colophon Footer */}
      <GlassmorphicFooter />
    </div>
  );
};

export default EditorialPortfolio;
