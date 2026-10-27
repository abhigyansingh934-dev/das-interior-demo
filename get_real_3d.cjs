const fs = require('fs');
const fa = fs.readFileSync('restored_step1967.txt', 'utf8');

const svgIdx = fa.indexOf('<svg style="display: none;"');
const moduleIdx = fa.indexOf('<script type="module">');

console.log('svgIdx:', svgIdx, 'moduleIdx:', moduleIdx);
const bodyHtml = fa.slice(svgIdx, moduleIdx);
console.log('Real bodyHtml length:', bodyHtml.length);
console.log('Includes feather-atlas:', bodyHtml.includes('id="feather-atlas"'));

fs.writeFileSync('real_3d_body.html', bodyHtml, 'utf8');
