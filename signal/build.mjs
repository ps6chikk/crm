// npm run build : assemble src/ en un seul fichier autonome dist/signal.html.
// Three.js est relié et inliné depuis node_modules (aucun CDN). Sans bundler ni dépendance.
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CORE, BROWSER, STYLES } from './tools/lib/manifest.mjs';
import { linkThree } from './tools/lib/three-link.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(ROOT, f), 'utf8');

const three = linkThree(join(ROOT, 'node_modules/three/build'));
const app = [...CORE, ...BROWSER].map((f) => `// ---- ${f}\n${read(f)}`).join('\n');
const css = STYLES.map(read).join('\n');
const script = `${three}\n(function(){'use strict';\n${app}\n})();`.replace(/<\/script/gi, '<\\/script');

const html = read('src/index.html')
  .replace('/*STYLES*/', () => css)
  .replace('/*SCRIPT*/', () => script);

mkdirSync(join(ROOT, 'dist'), { recursive: true });
const out = join(ROOT, 'dist/signal.html');
writeFileSync(out, html);
const kb = (n) => `${(n / 1024).toFixed(0)} Ko`;
const size = statSync(out).size;
console.log(`dist/signal.html : ${kb(size)} (Three.js ${kb(three.length)}, jeu ${kb(app.length)}, CSS ${kb(css.length)})`);
if (size > 4 * 1024 * 1024) { console.error('ÉCHEC : le fichier dépasse 4 Mo'); process.exit(1); }
