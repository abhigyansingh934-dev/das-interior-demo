const fs = require('fs');

const kagePath = 'public/landing-pages/kage.html';
let content = fs.readFileSync(kagePath, 'utf8');

// 1. Add importmap to head if not present
if (!content.includes('three/addons/')) {
  const headEndIdx = content.indexOf('</head>');
  const importmap = `<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
  }
</script>\n`;
  content = content.slice(0, headEndIdx) + importmap + content.slice(headEndIdx);
  console.log('Added importmap to <head>');
}

// 2. Prepare HTML for 3D Section and Cloth Section
const transitionBridgeHtml = `
<!-- ============================================================ CINEMATIC TRANSITION -->
<div class="cinematic-transition-bridge" id="transition-bridge">
  <div class="bridge-mist"></div>
  <div class="bridge-content">
    <div class="bridge-eyebrow"><span class="dot"></span> CHAPTER V · VOLUMETRIC HORIZON</div>
    <h3 class="bridge-title">From Atmospheric Ground to Three-Dimensional Form</h3>
    <p class="bridge-sub">Entering the interactive 3D spatial field guide — direct specimen exploration, real-time lighting physics, and architectural materiality.</p>
    <div class="bridge-indicator">
      <span>Explore 3D specimens below</span>
      <div class="bridge-line"></div>
    </div>
  </div>
</div>
`;

const d3HtmlBody = fs.readFileSync('restored_3d_body.html', 'utf8');

const clothSectionHtml = `
<!-- ============================================================ CHAPTER VI · TACTILE CLOTH SECTION -->
<div class="cloth-transition-bridge" id="cloth-bridge">
  <div class="cloth-bridge-tag"><span class="dot"></span> CHAPTER VI — TACTILE FORM &amp; DRAPE</div>
  <div class="cloth-bridge-title">Real-Time Volumetric Material Physics</div>
</div>

<section class="hero hero--cloth" id="peculiar-cloth" aria-label="Peculiar Atelier">
  <canvas class="hero__cloth" id="cloth" role="img" tabindex="-1" aria-label="A violet holographic cloth showing a chrome octopus beneath the words Strange by design. Grab it then tug it around."></canvas>
  <img class="hero__still" id="still" alt="" decoding="async" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9212999e-7a4a-4f70-bc34-e4e1c4533b81.jpg">
  <header class="cloth-nav">
    <a class="cloth-nav__logo" href="#peculiar-cloth">Das Atelier</a>
  </header>
  <h1 class="hero__title"><span>Grab me</span><span class="soft">I dare you</span></h1>
</section>
`;

// Insert the HTML right before the footer
const footerIdx = content.indexOf('<!-- ============================================================ COMPACT GLASSMORPHIC SIGNATURE FOOTER -->');
if (footerIdx === -1) {
  console.error('Footer not found!');
  process.exit(1);
}

// Restore CTA in #eternity
content = content.replace(
  `<a class="cta" href="/portfolio" data-nav="/portfolio" data-cursor>
    <i></i><span>View Architecture Portfolio</span>
    <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
  </a>`,
  `<a class="cta" href="#transition-bridge" data-cursor>
    <i></i><span>Enter 3D Spatial Study</span>
    <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M7 2v10M2 7l5 5 5-5" stroke="#dfe7e0" stroke-width="1.3"/></svg>
  </a>`
);

const middleInsert = transitionBridgeHtml + d3HtmlBody + clothSectionHtml;
content = content.slice(0, footerIdx) + middleInsert + '\n' + content.slice(footerIdx);
console.log('Inserted 3D and cloth HTML sections before footer');

// 3. Prepare scripts to insert right before </body>
const d3Script = fs.readFileSync('restored_3d_script.html', 'utf8');
const clothScript = fs.readFileSync('restored_cloth_replacement.txt', 'utf8');

const bodyEndIdx = content.lastIndexOf('</body>');
const scriptsToAppend = '\n' + d3Script + '\n' + clothScript + '\n';
content = content.slice(0, bodyEndIdx) + scriptsToAppend + content.slice(bodyEndIdx);
console.log('Appended 3D and cloth scripts before </body>');

fs.writeFileSync(kagePath, content, 'utf8');
console.log('Successfully updated kage.html! New length:', content.length);
