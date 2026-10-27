const fs = require('fs');

let html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

// 1. Add Blush, Wine, Sand CSS variables to :root
const rootVarsTarget = ':root{';
const rootVarsAddition = `:root{
  --blush:#E8A7AD;
  --blush-light:#F3C8C7;
  --wine:#641B2E;
  --wine-deep:#3B0D1A;
  --sand:#E8D8C3;
  --sand-light:#F3E9DA;
  --ink:#160D10;`;

if (!html.includes('--blush:#E8A7AD;')) {
  html = html.replace(rootVarsTarget, rootVarsAddition);
}

// 2. Add Styles for Circular Portfolio & About Manifesto
const customStyles = `
/* ==========================================================================
   UNIFIED HOME: BLUSH × WINE × SAND CIRCULAR PORTFOLIO & ABOUT SECTIONS
   ========================================================================== */

/* Portfolio Section: Sticky 3D Cylindrical Circular Gallery */
.home-portfolio-sec {
  position: relative;
  width: 100%;
  height: 380vh;
  background: var(--ink);
  color: var(--sand-light);
  overflow: visible;
}

.home-portfolio-sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--ink);
}

.home-wine-base {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, #3B0D1A 0%, #160D10 80%);
  pointer-events: none;
  z-index: 1;
}

.home-blush-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232, 167, 173, 0.08) 0%, transparent 65%);
  pointer-events: none;
  z-index: 2;
}

.home-wine-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 35%, rgba(22, 13, 16, 0.9) 100%);
  pointer-events: none;
  z-index: 3;
}

.home-portfolio-eyebrow {
  position: absolute;
  top: 96px;
  left: clamp(20px, 3.4vw, 56px);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--blush);
  z-index: 30;
}

.home-portfolio-eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blush);
  box-shadow: 0 0 10px rgba(232, 167, 173, 0.8);
}

/* 3D Infinite Circular Stage */
.home-portfolio-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  transform-style: preserve-3d;
  z-index: 20;
  pointer-events: none;
}

.home-portfolio-card {
  position: absolute;
  width: clamp(580px, 62vw, 1080px);
  height: clamp(440px, 72vh, 800px);
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
  transition: filter 0.3s ease, border-color 0.3s ease;
  pointer-events: auto;
  cursor: pointer;
}

.home-portfolio-card .card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--wine-deep);
  border: 1px solid rgba(232, 167, 173, 0.22);
  box-shadow: 0 35px 100px rgba(22, 13, 16, 0.9), 0 0 40px rgba(100, 27, 46, 0.25);
}

.home-portfolio-card.active .card-inner {
  border-color: rgba(232, 167, 173, 0.45);
  box-shadow: 0 45px 130px rgba(22, 13, 16, 0.98), 0 0 50px rgba(100, 27, 46, 0.4);
}

.home-card-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s var(--kage-ease-out);
}

.home-card-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(22, 13, 16, 0.78) 0%,
    rgba(59, 13, 26, 0.12) 35%,
    rgba(22, 13, 16, 0.2) 60%,
    rgba(22, 13, 16, 0.92) 100%
  );
  pointer-events: none;
}

.home-card-header {
  position: absolute;
  top: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
}

.home-card-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(22, 13, 16, 0.72);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(232, 167, 173, 0.2);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sand-light);
}

.home-card-tag .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--blush);
  box-shadow: 0 0 6px var(--blush);
}

.home-card-num {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  color: var(--sand);
  background: rgba(22, 13, 16, 0.72);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(232, 167, 173, 0.2);
}

.home-card-footer {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  z-index: 5;
}

.home-card-specs .spec-k {
  display: block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: var(--blush);
  margin-bottom: 4px;
}

.home-card-specs .spec-v {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--sand);
  margin: 0;
}

.home-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(22, 13, 16, 0.72);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(232, 167, 173, 0.2);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--sand-light);
}

/* Portfolio HUD */
.home-portfolio-hud {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 clamp(20px, 3.4vw, 56px) 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  z-index: 40;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(22, 13, 16, 0.96) 0%, rgba(22, 13, 16, 0) 100%);
}

.home-hud-left {
  max-width: 480px;
  pointer-events: auto;
}

.home-hud-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.home-hud-kicker .num {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.24em;
  color: var(--blush);
}

.home-hud-kicker .rule {
  width: 28px;
  height: 1px;
  background: rgba(232, 167, 173, 0.3);
}

.home-hud-kicker .cat {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
}

.home-hud-title {
  font-family: 'Onest', sans-serif;
  font-size: clamp(28px, 3.6vw, 48px);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.015em;
  color: var(--sand-light);
  margin: 0 0 8px 0;
}

.home-hud-sub {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--blush);
  margin: 0 0 10px 0;
}

.home-hud-desc {
  font-size: 13.5px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--sand);
  margin: 0;
  max-width: 420px;
}

/* Center Orbit Dots */
.home-hud-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  pointer-events: auto;
}

.home-orbit-dots {
  display: flex;
  align-items: center;
  gap: 14px;
}

.home-orbit-dot {
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.home-orbit-dot span {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sand);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.home-orbit-dot.active span {
  background: var(--blush);
  transform: scale(1.35);
  box-shadow: 0 0 14px var(--blush), 0 0 24px rgba(100, 27, 46, 0.8);
}

.home-hud-scroll-cue {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.28em;
  color: var(--blush);
}

.home-hud-scroll-cue .track {
  width: 36px;
  height: 2px;
  background: rgba(232, 167, 173, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.home-hud-scroll-cue .track i {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 14px;
  background: var(--blush);
  border-radius: 1px;
}

.home-hud-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  text-align: right;
  pointer-events: auto;
}

.home-spec-block .label {
  display: block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: var(--blush);
  margin-bottom: 6px;
}

.home-spec-block ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home-spec-block ul li {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--sand);
  line-height: 1.5;
}

/* ==========================================================================
   ABOUT / ARCHITECTURAL MANIFESTO SECTION
   ========================================================================== */
.home-about-sec {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--wine-deep);
  color: var(--sand-light);
  overflow: hidden;
  box-sizing: border-box;
  padding: 120px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home-about-content {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4.5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.home-about-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--blush);
  margin-bottom: 36px;
}

.home-about-eyebrow .beacon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blush);
  box-shadow: 0 0 12px rgba(232, 167, 173, 0.8);
}

.home-about-emblem {
  width: 52px;
  height: 52px;
  margin-bottom: 32px;
  display: block;
}

.home-about-hero-statement {
  font-family: 'Onest', sans-serif;
  font-size: clamp(32px, 4.2vw, 62px);
  font-weight: 400;
  line-height: 1.14;
  letter-spacing: -0.015em;
  color: var(--sand-light);
  max-width: 980px;
  margin: 0 0 54px 0;
  text-wrap: balance;
}

.home-about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3.5vw, 54px);
  text-align: left;
  margin-bottom: 64px;
}

.home-manifesto-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-top: 1px solid rgba(232, 167, 173, 0.18);
  padding-top: 20px;
}

.home-manifesto-col .col-num {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: var(--blush);
}

.home-manifesto-col p {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--sand);
  margin: 0;
}

.home-about-signature {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid rgba(232, 167, 173, 0.15);
  border-bottom: 1px solid rgba(232, 167, 173, 0.15);
  padding: 24px 0;
  margin-bottom: 60px;
}

.home-signature-mark {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.home-sig-txt {
  font-family: 'Caveat', cursive, sans-serif;
  font-size: 38px;
  font-weight: 600;
  color: var(--sand-light);
}

.home-sig-sub {
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.26em;
  color: var(--blush);
}

.home-sig-seal {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--blush);
  background: rgba(100, 27, 46, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--sand-light);
}

/* Bottom Video Stage with Wine Gradient Blend */
.home-about-video-stage {
  position: relative;
  width: 100%;
  height: clamp(340px, 48vh, 600px);
  overflow: hidden;
  z-index: 10;
}

.home-about-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.home-video-mask-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(180deg, #3B0D1A 0%, rgba(59, 13, 26, 0.85) 30%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

.home-video-mask-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(0deg, #160D10 0%, rgba(22, 13, 16, 0.7) 40%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

@media (max-width: 820px) {
  .home-portfolio-card {
    width: 84vw;
    height: 56vh;
  }
  .home-portfolio-hud {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px 24px;
    gap: 16px;
  }
  .home-hud-desc,
  .home-hud-right,
  .home-card-specs {
    display: none;
  }
  .home-hud-center {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .home-about-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .home-about-hero-statement {
    font-size: 28px;
  }
  .home-about-signature {
    flex-direction: column;
    gap: 16px;
  }
}
`;

// Insert custom styles before </style>
const styleEnd = html.indexOf('</style>');
if (styleEnd !== -1 && !html.includes('.home-portfolio-sec')) {
  html = html.substring(0, styleEnd) + customStyles + html.substring(styleEnd);
}

fs.writeFileSync('public/landing-pages/kage.html', html, 'utf8');
console.log('Updated kage.html styles successfully.');
