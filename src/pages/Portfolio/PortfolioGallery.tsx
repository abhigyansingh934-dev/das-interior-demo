import React, { useRef, useState, useEffect } from "react";
import { Project } from "./projectsData";

interface PortfolioGalleryProps {
  projects: Project[];
  progressIndex: number;
  onSelectProject?: (index: number) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  progressIndex,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );

  // Subtle pointer parallax (restrained, only affects active card slightly)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="kage-portfolio-gallery" ref={containerRef}>
      <div className="kage-gallery-stage">
        {projects.map((project, i) => {
          const rel = i - progressIndex;
          const absRel = Math.abs(rel);

          // Cull cards that are far outside the viewport to maximize performance
          if (absRel > 2.8) return null;

          const isActive = absRel < 0.5;

          // Spatial hierarchy calculations
          const scale = Math.max(0.68, 1 - absRel * 0.16);
          const opacity = Math.max(0.12, 1 - Math.min(absRel, 2) * 0.46);
          const tz = -absRel * 160; // depth recession in pixels
          const rotY = -Math.sign(rel) * Math.min(absRel * 10, 15); // cylindrical curvature
          const brightness = Math.max(0.28, 1 - absRel * 0.42);

          // Subtle pointer tilt only on the active card
          const tiltX = isActive ? (mousePos.y - 0.5) * -4 : 0;
          const tiltY = isActive ? (mousePos.x - 0.5) * 6 : 0;

          // 5x2 grid video calculation for project media
          const tileIdx = project.media.tileIndex;
          const col = tileIdx % 5;
          const row = Math.floor(tileIdx / 5);

          return (
            <article
              key={project.id}
              className={`kage-project-card ${isActive ? "active" : ""}`}
              style={{
                transform: `translate3d(calc(${rel * 70}vw), 0, ${tz}px) rotateY(${rotY + tiltY}deg) rotateX(${tiltX}deg) scale(${scale})`,
                opacity,
                filter: `brightness(${brightness})`,
                zIndex: Math.round(100 - absRel * 20),
              }}
              onClick={() => {
                if (!isActive && onSelectProject) {
                  onSelectProject(i);
                }
              }}
            >
              {/* Outer Card Frame with Architectural Chamfer */}
              <div className="kage-card-frame">
                {/* Media Container */}
                <div className="kage-card-media-wrap">
                  {/* High-res Image / Poster */}
                  <img
                    src={project.media.fallbackImage || project.media.poster}
                    alt={project.title}
                    className="kage-card-img"
                    loading="lazy"
                  />

                  {/* Synchronized looping video background */}
                  {project.media.video && (
                    <div className="kage-card-video-tile">
                      <video
                        src={project.media.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className={`kage-card-video ${
                          videoLoaded[i] ? "loaded" : ""
                        }`}
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

                  {/* Cinematic Dark Gradient Layers & Vignette */}
                  <div className="kage-card-vignette" aria-hidden="true" />
                  <div className="kage-card-highlight" aria-hidden="true" />
                </div>

                {/* Card Architectural Header Info */}
                <div className="kage-card-header">
                  <div className="kage-card-tag">
                    <span className="dot" />
                    <span>{project.category}</span>
                  </div>
                  <span className="kage-card-index">{project.number} / 05</span>
                </div>

                {/* Card Center Viewport Cue */}
                {!isActive && (
                  <div className="kage-card-focus-cue">
                    <span>View Project</span>
                  </div>
                )}

                {/* Card Footer Architectural Specs */}
                <div className="kage-card-footer">
                  <div className="kage-card-specs">
                    <span className="spec-label">MATERIALS</span>
                    <p className="spec-val">{project.materials}</p>
                  </div>
                  <div className="kage-card-meta-pill">
                    <span>{project.area}</span>
                    <span className="sep">·</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioGallery;
