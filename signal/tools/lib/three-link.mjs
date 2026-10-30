// Relie three.core.min.js et three.module.min.js (ESM) en un script classique
// qui définit `const THREE = {...}`. Aucun bundler : on réécrit les import/export.
import { readFileSync } from 'node:fs';

function exportListToObject(list) {
  // "a as B,c as D,E" -> "B:a,D:c,E:E"
  return list.split(',').map((s) => {
    const m = s.trim().match(/^(\S+)\s+as\s+(\S+)$/);
    return m ? `${m[2]}:${m[1]}` : `${s.trim()}:${s.trim()}`;
  }).join(',');
}

function importListToDestructure(list) {
  // "Matrix3 as e,Vector2 as t" -> "Matrix3:e,Vector2:t"
  return list.split(',').map((s) => {
    const m = s.trim().match(/^(\S+)\s+as\s+(\S+)$/);
    return m ? `${m[1]}:${m[2]}` : s.trim();
  }).join(',');
}

export function linkThree(dir) {
  let core = readFileSync(`${dir}/three.core.min.js`, 'utf8');
  let mod = readFileSync(`${dir}/three.module.min.js`, 'utf8');

  const coreExport = core.match(/export\{([^}]*)\};?\s*$/);
  if (!coreExport) throw new Error('three-link: export final de three.core introuvable');
  core = core.slice(0, coreExport.index) + `return{${exportListToObject(coreExport[1])}};`;

  const imp = mod.match(/import\{([^}]*)\}from"\.\/three\.core\.min\.js";/);
  if (!imp) throw new Error('three-link: import de three.core introuvable');
  mod = mod.replace(imp[0], `const{${importListToDestructure(imp[1])}}=__core;`);
  mod = mod.replace(/export\{[^}]*\}from"\.\/three\.core\.min\.js";/, '');
  const modExport = mod.match(/export\{([^}]*)\};?\s*$/);
  if (!modExport) throw new Error('three-link: export final de three.module introuvable');
  mod = mod.slice(0, modExport.index) + `return{${exportListToObject(modExport[1])}};`;
  if (/\bimport\s*[{(]|\bexport\s*\{|import\.meta/.test(mod + core)) {
    throw new Error('three-link: il reste des import/export non résolus');
  }
  return `const THREE=(function(){const __core=(function(){${core}})();` +
    `const __mod=(function(__core){${mod}})(__core);return Object.freeze(Object.assign({},__core,__mod));})();`;
}
