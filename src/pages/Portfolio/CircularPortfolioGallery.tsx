import React, { useRef, useState, useEffect, useCallback } from "react";
import { Project, PROJECTS } from "./projectsData";
import PortfolioNav from "./PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";

interface CircularPortfolioGalleryProps {
  projects?: Project[];
  variant?: "home" | "page";
  onNavigate?: (route: string) => void;
}

export const CircularPortfolioGallery: React.FC<CircularPortfolioGalleryProps> = ({
  projects = PROJECTS,
  variant = "page",
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualProgress, setVirtualProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );

  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartProgRef = useRef(0);

  const N = projects.length;

  // Handle navigation
  const handleNav = useCallback(
    (route: string) => {
      if (onNavigate) {
        onNavigate(route);
      } else {
        window.history.pushState({ route }, "", route);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    },
    [onNavigate]
  );

  // Subtle pointer parallax (restrained, gentle perspective shift on active project)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Vertical scroll drives infinite circular rotation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDist = container.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      // When pinned, compute how far we've scrolled inside the container
      const currentScroll = Math.max(0, -rect.top);
      const rawProgress = currentScroll / (window.innerHeight * 1.1);

      // In infinite mode, progress increases continuously
      targetProgressRef.current = rawProgress;
      setVirtualProgress(rawProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // High-precision smooth lerping loop (matching Kage's cinematic camera smoothing)
    const loop = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        smoothProgressRef.current += diff * 0.082;
        setSmoothProgress(smoothProgressRef.current);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Wheel interaction for standalone page: allows rotating indefinitely
  const handleWheel = (e: React.WheelEvent) => {
    if (variant === "page") {
      const delta = e.deltaY * 0.0022;
      targetProgressRef.current += delta;
      setVirtualProgress(targetProgressRef.current);
    }
  };

  // Keyboard navigation (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetProgressRef.current = Math.round(targetProgressRef.current) + 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetProgressRef.current = Math.round(targetProgressRef.current) - 1;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Programmatically jump to project index (shortest angular direction on circle)
  const jumpToProject = (targetIndex: number) => {
    const current = smoothProgressRef.current;
    const currentNorm = ((current % N) + N) % N;
    let delta = targetIndex - currentNorm;
    if (delta > N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    targetProgressRef.current = current + delta;
  };

  // Current normalized active index for metadata HUD
  const activeNormalizedIndex =
    ((Math.round(smoothProgress) % N) + N) % N;
  const activeProject = projects[activeNormalizedIndex];

  return (
    <>
      <section
        ref={containerRef}
      className={`kage-circular-portfolio-section ${variant === "home" ? "variant-home" : "variant-page"}`}
      onWheel={handleWheel}
      style={{
        // Standalone page gives generous scroll track; Home provides pinned multi-viewport sequence
        height: variant === "home" ? `calc(100vh + ${N * 120}vh)` : `calc(100vh + ${N * 200}vh)`,
      }}
    >
      {/* Sticky Cinematic Viewport */}
      <div className="kage-circular-viewport">
        {/* Layered Wine & Blush Atmospheric Dusk Lighting */}
        <div className="kage-wine-base" aria-hidden="true" />
        <div className="kage-blush-ambient-glow" aria-hidden="true" />
        <div className="kage-wine-vignette" aria-hidden="true" />
        <div className="kage-wine-noise" aria-hidden="true" />

        {/* Global Navigation Bar (rendered on standalone page) */}
        {variant === "page" && <PortfolioNav onNavigate={handleNav} />}

        {/* Editorial Eyebrow Header */}
        <div className="kage-circular-eyebrow">
          <span className="blush-dot" />
          <span>Infinite Project Archive · Curated Monographs</span>
        </div>

        {/* 3D Infinite Circular Spatial Stage */}
        <div className="kage-circular-stage">
          {projects.map((project, i) => {
            // Shortest signed angular distance on infinite circle of length N
            let diff = ((i - smoothProgress) % N + N) % N;
            if (diff > N / 2) diff -= N;

            // Angular position on circle in radians
            const phi = diff * ((2 * Math.PI) / N);
            const cosVal = Math.cos(phi);
            const sinVal = Math.sin(phi);

            // Cull projects on the far back side of the cylinder (cosVal < -0.3)
            if (cosVal < -0.35) return null;

            const isActive = Math.abs(diff) < 0.45;

            // Spatial cylindrical coordinates
            const Rx = 48; // horizontal spread in vw
            const Rz = 340; // depth recession in px
            const x = Rx * sinVal; // horizontal offset in vw
            const z = Rz * (cosVal - 1); // depth offset in px
            const rotY = -phi * (180 / Math.PI) * 0.44; // degrees inward tilt

            // Scale, Opacity, and Brightness curves
            const normCos = (cosVal + 1) / 2; // [0, 1]
            const scale = Math.max(0.62, 0.62 + 0.38 * Math.pow(normCos, 1.4));
            const opacity = Math.max(0.15, Math.pow(normCos, 1.3));
            const brightness = 0.35 + 0.65 * normCos;
            const zIndex = Math.round(100 + cosVal * 60);

            // Subtle pointer tilt only on active project
            const tiltX = isActive ? (mousePos.y - 0.5) * -4 : 0;
            const tiltY = isActive ? (mousePos.x - 0.5) * 5 : 0;

            // 5x2 video grid tile calculation
            const tileIdx = project.media.tileIndex;
            const col = tileIdx % 5;
            const row = Math.floor(tileIdx / 5);

            return (
              <article
                key={project.id}
                className={`kage-circular-card ${isActive ? "active" : ""}`}
                style={{
                  transform: `translate3d(calc(${x.toFixed(2)}vw), 0, ${z.toFixed(1)}px) rotateY(${(rotY + tiltY).toFixed(1)}deg) rotateX(${tiltX.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
                  opacity,
                  filter: `brightness(${brightness.toFixed(2)})`,
                  zIndex,
                }}
                onClick={() => {
                  if (!isActive) jumpToProject(i);
                }}
              >
                <div className="kage-card-inner">
                  {/* Media Layers */}
                  <div className="kage-media-container">
                    <img
                      src={project.media.fallbackImage || project.media.poster}
                      alt={project.title}
                      className="kage-media-image"
                      loading="lazy"
                    />

                    {project.media.video && (
                      <div className="kage-video-tile-wrap">
                        <video
                          src={project.media.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={`kage-media-video ${videoLoaded[i] ? "ready" : ""}`}
                          onLoadedData={() => {
                            setVideoLoaded((prev) => {
                              const next = [...prev];
                              next[i] = true;
                              return next;
                            });
                          }}
                          style={{
                            transform: `translate(-${col * 20}%, -${row * 50}%)`,
                          }}
                        />
                      </div>
                    )}

                    {/* Wine & Dusk Vignette Overlay */}
                    <div className="kage-wine-card-vignette" aria-hidden="true" />
                    <div className="kage-sand-highlight" aria-hidden="true" />
                  </div>

                  {/* Card Header Tag */}
                  <div className="kage-circular-card-header">
                    <div className="kage-cat-pill">
                      <span className="blush-dot-sm" />
                      <span>{project.category}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="kage-num-pill">{project.number} / 0{N}</span>
                      <button
                        className="kage-card-redirect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNav(`/portfolio/${project.id}`);
                        }}
                        aria-label={`View ${project.title} monograph`}
                        title="View Full Case Study"
                      >
                        <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                          <path
                            d="M3 11L11 3M5 3H11V9"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Non-active Card Focus Cue */}
                  {!isActive && (
                    <div className="kage-rotate-focus-cue">
                      <span>Rotate to Focus</span>
                    </div>
                  )}

                  {/* Card Footer Architectural Specs */}
                  <div className="kage-circular-card-footer">
                    <div className="kage-spec-col">
                      <span className="spec-eyebrow">PALETTE</span>
                      <p className="spec-content">{project.materials}</p>
                    </div>
                    <div className="kage-meta-pill">
                      <span>{project.area}</span>
                      <span className="divider">·</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Metadata HUD (Sand & Blush Typography) */}
        <footer className="kage-circular-hud">
          {/* Left Column: Number, Title, Subtitle, Description */}
          <div className="kage-hud-col-left">
            <div className="kage-hud-kicker-row">
              <span className="kicker-num">0{activeNormalizedIndex + 1}</span>
              <span className="kicker-line" />
              <span className="kicker-cat">{activeProject.category}</span>
            </div>
            <h2 className="kage-hud-project-title">{activeProject.title}</h2>
            <p className="kage-hud-project-location">
              {activeProject.location} — {activeProject.year}
            </p>
            <p className="kage-hud-project-desc">{activeProject.description}</p>
            <button
              className="kage-hud-explore-btn"
              onClick={() => handleNav(`/portfolio/${activeProject.id}`)}
              aria-label={`Explore full monograph for ${activeProject.title}`}
            >
              <span>Explore Monograph</span>
              <svg viewBox="0 0 14 14" fill="none" width="11" height="11">
                <path
                  d="M3 11L11 3M5 3H11V9"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Center Column: Infinite Circular Progress Orbit & Scroll Indicator */}
          <div className="kage-hud-col-center">
            <div className="kage-circular-orbit-dots" role="tablist" aria-label="Circular project selector">
              {projects.map((p, idx) => {
                const isActive = idx === activeNormalizedIndex;
                let diff = ((idx - smoothProgress) % N + N) % N;
                if (diff > N / 2) diff -= N;
                const dist = Math.abs(diff);

                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Rotate to ${p.title}`}
                    className={`kage-orbit-dot ${isActive ? "active" : ""}`}
                    onClick={() => jumpToProject(idx)}
                    style={{
                      transform: `scale(${Math.max(0.8, 1.4 - dist * 0.35)})`,
                      opacity: Math.max(0.35, 1 - dist * 0.3),
                    }}
                  >
                    <span className="orbit-dot-inner" />
                  </button>
                );
              })}
            </div>
            <div className="kage-scroll-instruction">
              <span className="scroll-txt">SCROLL VERTICALLY TO ROTATE</span>
              <div className="scroll-indicator-bar">
                <i
                  style={{
                    transform: `translateX(${((smoothProgress % N + N) % N / N) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Disciplines & Specifications */}
          <div className="kage-hud-col-right">
            <div className="kage-spec-unit">
              <span className="unit-label">DISCIPLINE MATRIX</span>
              <ul className="unit-list">
                {activeProject.disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="kage-spec-unit">
              <span className="unit-label">FOOTPRINT</span>
              <span className="unit-mono">{activeProject.area} Constructed</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
    {variant === "page" && <GlassmorphicFooter />}
  </>
);
};

export default CircularPortfolioGallery;
