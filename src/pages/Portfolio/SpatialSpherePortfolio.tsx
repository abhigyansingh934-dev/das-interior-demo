import React, { useEffect, useRef, useState, useCallback } from "react";
import { SPATIAL_RECORDS, SpatialRecord } from "./spatialSphereData";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";
import "./SpatialSpherePortfolio.css";

interface SpatialSpherePortfolioProps {
  onNavigate?: (route: string) => void;
}

interface SphereCardCoord {
  record: SpatialRecord;
  x: number;
  y: number;
  z: number;
  lat: number;
  lon: number;
}

export const SpatialSpherePortfolio: React.FC<SpatialSpherePortfolioProps> = ({
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State management
  const [coords, setCoords] = useState<SphereCardCoord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<SpatialRecord | null>(null);
  const [isGridActive, setIsGridActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDeep, setIsDeep] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Physics & Camera state
  const cameraRef = useRef({
    yaw: 0,
    pitch: 0,
    targetYaw: 0,
    targetPitch: 0,
    vx: 0,
    vy: 0,
    zoomZ: 0,
    targetZoomZ: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  // Calculate Fibonacci Sphere coordinates
  useEffect(() => {
    const N = SPATIAL_RECORDS.length;
    const GA = Math.PI * (3 - Math.sqrt(5));
    const calculated: SphereCardCoord[] = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GA;
      const x = Math.cos(theta) * rad;
      const z = Math.sin(theta) * rad;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);

      calculated.push({
        record: SPATIAL_RECORDS[i],
        x,
        y,
        z,
        lat,
        lon,
      });
    }

    setCoords(calculated);
  }, []);

  // Update layout & radius
  const updateLayout = useCallback(() => {
    if (!stageRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const hr = w <= 380 ? 0.38 : w <= 640 ? 0.42 : 0.46;
    const wr = w <= 380 ? 0.48 : w <= 640 ? 0.52 : 0.58;
    const floor = w <= 380 ? 108 : w <= 640 ? 120 : 155;
    const R = Math.max(floor, Math.min(480, h * hr, w * wr));
    const scale = w <= 380 ? 0.44 : w <= 640 ? 0.46 : 0.47;
    const cw = Math.round(Math.max(72, R * scale));
    const persp = w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150;

    const root = containerRef.current;
    if (root) {
      root.style.setProperty("--cw", `${cw}px`);
      root.style.setProperty("--persp", `${persp}px`);
    }

    // Apply 3D transforms to cards
    coords.forEach((coord, i) => {
      const el = cardElementsRef.current[i];
      if (el) {
        el.style.transform = `translate3d(${coord.x * R}px, ${-coord.y * R}px, ${coord.z * R}px) rotateY(${coord.lon}deg) rotateX(${coord.lat}deg)`;
      }
    });
  }, [coords]);

  useEffect(() => {
    updateLayout();
    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateLayout, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearTimeout(timeout);
    };
  }, [updateLayout]);

  // Reveal sequence
  const handleReveal = useCallback(() => {
    setShowSplash(false);
    setShowIntro(false);
    setIsRevealed(true);
    updateLayout();
  }, [updateLayout]);

  // Asset preloader
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = SPATIAL_RECORDS.length;

    const checkDone = () => {
      loadedCount++;
      const p = Math.min(1, loadedCount / totalAssets);
      setLoadProgress(p);
      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setShowSplash(false);
          setTimeout(() => {
            handleReveal();
          }, 800);
        }, 400);
      }
    };

    SPATIAL_RECORDS.forEach((rec) => {
      const img = new Image();
      img.onload = checkDone;
      img.onerror = () => {
        // Fallback to local image
        const fallback = new Image();
        fallback.onload = checkDone;
        fallback.onerror = checkDone;
        fallback.src = rec.fallbackThumb;
      };
      img.src = rec.thumbUrl;
    });

    const backstop = setTimeout(() => {
      setLoadProgress(1);
      setShowSplash(false);
      setTimeout(() => {
        handleReveal();
      }, 600);
    }, 1500);

    return () => clearTimeout(backstop);
  }, [handleReveal]);

  // Main 60fps RAF Camera & Depth Loop
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const cam = cameraRef.current;

      if (!cam.isDragging) {
        cam.yaw += cam.vx;
        cam.pitch += cam.vy;
        cam.vx *= 0.93;
        cam.vy *= 0.93;

        // Subtle continuous auto-rotation if idle
        if (Math.abs(cam.vx) < 0.005 && Math.abs(cam.vy) < 0.005) {
          cam.yaw += 0.04;
        }
      }

      // Clamp pitch to avoid gimbal flip
      cam.pitch = Math.max(-85, Math.min(85, cam.pitch));

      // Lerp zoom
      cam.zoomZ += (cam.targetZoomZ - cam.zoomZ) * 0.12;

      // Update 3D world transform
      if (worldRef.current) {
        worldRef.current.style.transform = `translateZ(${cam.zoomZ}px) rotateX(${cam.pitch}deg) rotateY(${cam.yaw}deg)`;
      }

      // Billboard counter-rotation on headline so it always faces forward
      const headlineEl = document.getElementById("headline");
      if (headlineEl) {
        headlineEl.style.transform = `rotateY(${-cam.yaw}deg) rotateX(${-cam.pitch}deg)`;
      }

      // Calculate flat black depth wash on cards
      const yawRad = (cam.yaw * Math.PI) / 180;
      const pitchRad = (cam.pitch * Math.PI) / 180;
      const cosYaw = Math.cos(yawRad);
      const sinYaw = Math.sin(yawRad);
      const cosPitch = Math.cos(pitchRad);
      const sinPitch = Math.sin(pitchRad);

      for (let i = 0; i < coords.length; i++) {
        const c = coords[i];
        const el = cardElementsRef.current[i];
        if (el) {
          const rx = c.x * cosYaw + c.z * sinYaw;
          const rz = -c.x * sinYaw + c.z * cosYaw;
          const finalZ = rz * cosPitch - c.y * sinPitch;

          // Normalized depth wash
          const wash = Math.max(0, Math.min(0.78, (1 - finalZ) * 0.42));
          el.style.setProperty("--d", wash.toFixed(3));

          // Mark card in
          if (isRevealed && !el.classList.contains("in")) {
            el.classList.add("in");
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [coords, isRevealed]);

  // Pointer drag events on stage
  const onPointerDown = (e: React.PointerEvent) => {
    if (isGridActive || selectedRecord) return;
    const cam = cameraRef.current;
    cam.isDragging = true;
    cam.startX = e.clientX;
    cam.startY = e.clientY;
    cam.lastX = e.clientX;
    cam.lastY = e.clientY;
    cam.lastTime = performance.now();
    cam.vx = 0;
    cam.vy = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    // Custom cursor position
    const dot = document.getElementById("dot");
    if (dot) {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    }

    const cam = cameraRef.current;
    if (!cam.isDragging) return;

    const dx = e.clientX - cam.lastX;
    const dy = e.clientY - cam.lastY;
    const now = performance.now();
    const dt = Math.max(1, now - cam.lastTime);

    cam.yaw += dx * 0.35;
    cam.pitch = Math.max(-85, Math.min(85, cam.pitch - dy * 0.35));

    cam.vx = (dx / dt) * 3.8;
    cam.vy = (-dy / dt) * 3.8;

    cam.lastX = e.clientX;
    cam.lastY = e.clientY;
    cam.lastTime = now;
  };

  const onPointerUp = () => {
    cameraRef.current.isDragging = false;
  };

  // Scroll Track & 16vh Zoom
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 0.16;
      const scrollY = window.scrollY;

      if (scrollY > maxScroll) {
        window.scrollTo(0, maxScroll);
      }

      const fraction = Math.min(1, Math.max(0, scrollY / maxScroll));
      cameraRef.current.targetZoomZ = fraction * 320;
      setIsDeep(fraction >= 0.88);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedRecord) {
          setSelectedRecord(null);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        } else if (isGridActive) {
          setIsGridActive(false);
        }
      } else if (e.key === "ArrowRight" && selectedRecord) {
        const nextIdx = (selectedRecord.idx + 1) % SPATIAL_RECORDS.length;
        setSelectedRecord(SPATIAL_RECORDS[nextIdx]);
      } else if (e.key === "ArrowLeft" && selectedRecord) {
        const prevIdx =
          (selectedRecord.idx - 1 + SPATIAL_RECORDS.length) %
          SPATIAL_RECORDS.length;
        setSelectedRecord(SPATIAL_RECORDS[prevIdx]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRecord, isMenuOpen, isGridActive]);

  const toggleGrid = () => {
    setIsGridActive(!isGridActive);
    if (!isGridActive) {
      window.scrollTo(0, 0);
    }
  };

  const handleNav = (route: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  const rootClassNames = [
    "spatial-portfolio-root",
    showIntro ? "locked" : "",
    isRevealed ? "revealed" : "",
    isDeep ? "deep" : "",
    isGridActive ? "gridview" : "",
    selectedRecord ? "lit-active" : "",
    isMenuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={rootClassNames}>
      {/* Custom Cursor */}
      <div id="dot" />

      {/* 9. SPLASH PRELOADER (#splash) */}
      {showSplash && (
        <div id="splash" className={loadProgress >= 1 ? "out" : ""}>
          <div className="splash-mark">
            DAS<em>ARCHITECTS</em>
          </div>
          <div className="splash-bar">
            <span
              className="splash-bar-inner"
              style={{ transform: `scaleX(${loadProgress})` }}
            />
          </div>
          <div className="splash-tag">
            SPATIAL ARCHITECTURE ARCHIVE · BIHAR 2026
          </div>
        </div>
      )}

      {/* 8. INTRO FILM (#intro) */}
      {showIntro && (
        <div id="intro" className={!showSplash ? "closing" : ""}>
          <div className="film-fallback" />
          <button
            type="button"
            className="skip-btn"
            id="skip"
            onClick={handleReveal}
          >
            ENTER ARCHIVE →
          </button>
          <div className="veil" />
        </div>
      )}

      {/* 1. SCROLL TRACK (Layer 1) */}
      <div id="scrolltrack" />

      {/* 2. STAGE & 3D FIBONACCI WORLD (Layer 2) */}
      <div
        id="stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div id="world" ref={worldRef}>
          {/* Fibonacci Sphere Cards */}
          <div id="orb" ref={orbRef}>
            {coords.map((coord, i) => (
              <div
                key={coord.record.id}
                ref={(el) => (cardElementsRef.current[i] = el)}
                className={`card ${coord.record.isTall ? "tall" : ""}`}
                data-idx={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRecord(coord.record);
                }}
              >
                <figure>
                  <img
                    src={coord.record.thumbUrl}
                    alt={coord.record.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        coord.record.fallbackThumb;
                    }}
                  />
                </figure>
              </div>
            ))}
          </div>

          {/* Headline sharing exact 0x0 center origin */}
          <h1 id="headline">
            <span className="inner">
              <span className="h-word" style={{ "--i": 0 } as React.CSSProperties}>
                DAS
              </span>
              <span className="h-word" style={{ "--i": 1 } as React.CSSProperties}>
                ARCHITECTS
              </span>
              <span className="h-word" style={{ "--i": 2 } as React.CSSProperties}>
                SPATIAL
              </span>
              <span className="h-word" style={{ "--i": 3 } as React.CSSProperties}>
                PROJECT
              </span>
              <span className="h-word" style={{ "--i": 4 } as React.CSSProperties}>
                ARCHIVE
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* 3. VIGNETTE (Layer 3) */}
      <div className="vig" />

      {/* 5. CHROME (Layer 5) */}
      {/* Fixed Header */}
      <header className="chrome">
        <a
          href="/"
          className="wordmark"
          onClick={(e) => {
            e.preventDefault();
            handleNav("/");
          }}
          aria-label="DAS Architects & Interiors"
        >
          DAS<em>ARCHITECTS</em>
          <span className="sub">BIHAR</span>
        </a>
        <button
          type="button"
          id="menuBtn"
          className="menu-btn"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="menu-label">Menu</span>
          <span className="bars">
            <i />
            <i />
          </span>
        </button>
      </header>

      {/* Photographer / Studio Bio Card */}
      <div className="bio chrome">
        <div className="who">
          <img
            id="avatar"
            src="/hero-frames/sequence 02/ezgif-frame-001.jpg"
            alt="DAS Architects & Interiors"
          />
          <div className="who-text">
            <b>DAS ARCHITECTS</b>
            <span>Eastern Bihar Atelier</span>
          </div>
        </div>
        <p>
          DAS Architects & Interiors crafts living spatial permanence across Bihar.
          Every project in this archive balances climate responsiveness, local
          craftsmanship, and timeless tectonic proportion.
        </p>
      </div>

      {/* Colophon */}
      <div className="colophon chrome">DAS Architects · Bihar 2026</div>

      {/* Grid Toggle Button */}
      <button
        type="button"
        id="gridBtn"
        className="gridbtn"
        aria-label="Toggle grid view"
        onClick={toggleGrid}
      >
        <b />
        <b />
        <b />
        <b />
      </button>

      {/* Scroll Cue */}
      <div className="cue chrome">
        <s />
        <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
      </div>

      {/* 4. GRID OVERLAY (Layer 4) */}
      <div id="grid">
        <div className="grid-header">
          <h2>Spatial Project Archive</h2>
          <span>21 Selected Works · 2024–2026</span>
        </div>
        <div className="grid-inner">
          {SPATIAL_RECORDS.map((item) => (
            <div
              key={item.id}
              className={`grid-item ${item.isTall ? "tall" : ""}`}
              onClick={() => setSelectedRecord(item)}
            >
              <div className="grid-item-thumb">
                <img
                  src={item.thumbUrl}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = item.fallbackThumb;
                  }}
                />
              </div>
              <div className="grid-item-info">
                <div className="grid-meta">
                  <span className="grid-cat">{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="grid-title">{item.title}</h3>
                <p className="grid-place">{item.place}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Footer inside grid view */}
        <div className="spatial-footer-wrapper" style={{ marginTop: "60px" }}>
          <GlassmorphicFooter />
        </div>
      </div>

      {/* 6. NAVIGATION MENU (#menu, Layer 6) */}
      <div id="menu">
        <ul className="menu-links">
          <li>
            <a
              className="menu-link"
              onClick={() => handleNav("/")}
            >
              Index
            </a>
          </li>
          <li>
            <a
              className="menu-link active"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => handleNav("/services")}
            >
              Services
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => handleNav("/about")}
            >
              About
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => handleNav("/contact")}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="menu-footer-info">
          DAS ARCHITECTS & INTERIORS · PURNIA, BIHAR
        </div>
      </div>

      {/* 7. LIGHTBOX (#lit, Layer 7) */}
      {selectedRecord && (
        <div id="lit" onClick={() => setSelectedRecord(null)}>
          <div
            className="lit-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lit-close-btn"
              onClick={() => setSelectedRecord(null)}
              aria-label="Close inspection"
            >
              ✕
            </button>
            <div
              className={`lit-media ${selectedRecord.isTall ? "tall" : ""}`}
            >
              <img
                src={selectedRecord.fullUrl}
                alt={selectedRecord.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    selectedRecord.fallbackFull;
                }}
              />
            </div>
            <div className="lit-details">
              <div className="lit-header-tag">
                <span className="lit-num">{selectedRecord.number}</span>
                <span>/</span>
                <span className="lit-cat">{selectedRecord.category}</span>
                <span>·</span>
                <span>{selectedRecord.year}</span>
              </div>
              <h2 className="lit-title">{selectedRecord.title}</h2>
              <div className="lit-place">{selectedRecord.place}</div>
              <p className="lit-note">{selectedRecord.note}</p>
              <div className="lit-actions">
                <button
                  type="button"
                  className="lit-nav-btn"
                  onClick={() => {
                    const prevIdx =
                      (selectedRecord.idx - 1 + SPATIAL_RECORDS.length) %
                      SPATIAL_RECORDS.length;
                    setSelectedRecord(SPATIAL_RECORDS[prevIdx]);
                  }}
                >
                  ← PREVIOUS
                </button>
                <button
                  type="button"
                  className="lit-nav-btn"
                  onClick={() => {
                    const nextIdx =
                      (selectedRecord.idx + 1) % SPATIAL_RECORDS.length;
                    setSelectedRecord(SPATIAL_RECORDS[nextIdx]);
                  }}
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpatialSpherePortfolio;
