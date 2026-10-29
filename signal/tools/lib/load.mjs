// Charge le moteur et les données dans Node (sans DOM) et renvoie l'objet SIG.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CORE } from './manifest.mjs';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadSIG() {
  const src = CORE.map((f) => `// ---- ${f}\n` + readFileSync(join(ROOT, f), 'utf8')).join('\n');
  // eslint-disable-next-line no-new-func
  return new Function(`${src}\n;return SIG;`)();
}
