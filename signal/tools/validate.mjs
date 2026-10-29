// npm run validate : vérifications statiques + simulation + test navigateur en 2D forcé.
// Code de sortie non nul au moindre échec. Les alertes ne font pas échouer.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadSIG, ROOT } from './lib/load.mjs';
import { graph, runMany, play } from './lib/sim.mjs';
import { PRESETS } from './lib/manifest.mjs';
import { GLOBAL, BUDGET, NARRATION_MIN_WORDS, DIALOGUE_MIN_WORDS } from './targets.mjs';

const args = process.argv.slice(2);
const N = Number((args.find((a) => a.startsWith('--runs=')) || '--runs=2000').split('=')[1]);
const SKIP_BROWSER = args.includes('--no-browser');
const VERBOSE = args.includes('--verbose');

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const SIG = loadSIG();
const { scenes, chapters, registry, codex } = SIG.data;
const ids = Object.keys(scenes);
const KINDS = ['narration', 'dialogue', 'terminal', 'hub', 'micro', 'chapter', 'router', 'fin'];

// 1. Doublons, champs de base, presets.
for (const d of SIG.data.dupes || []) err(`scène déclarée deux fois : ${d}`);
for (const id of ids) {
  const sc = scenes[id];
  if (!KINDS.includes(sc.kind)) err(`${id} : kind inconnu « ${sc.kind} »`);
  if (sc.kind !== 'router') {
    if (!sc.visual || !sc.visual.preset) err(`${id} : champ visual manquant`);
    else if (!PRESETS.includes(sc.visual.preset)) err(`${id} : preset visuel inconnu « ${sc.visual.preset} »`);
  }
  if (!chapters.find((c) => c.id === sc.ch)) err(`${id} : chapitre inconnu « ${sc.ch} »`);
  if (sc.kind === 'fin' && (!sc.fin || !sc.fin.id || !sc.fin.type)) err(`${id} : fin sans fin.id / fin.type`);
  if (sc.kind === 'fin' && sc.fin && sc.fin.reload && !ids.some((x) => scenes[x].checkpoint === sc.fin.reload)) {
    err(`${id} : point de contrôle de rechargement inconnu « ${sc.fin.reload} »`);
  }
  if (sc.timer && !(sc.choices || [])[sc.timer.auto]) err(`${id} : timer.auto ne désigne aucun choix`);
}
for (const c of chapters) if (!scenes[c.start]) err(`chapitre ${c.id} : scène de départ inexistante ${c.start}`);

// 2. Destinations existantes, routeurs bien formés.
const g = graph(SIG);
for (const id of ids) {
  const sc = scenes[id];
  for (const t of g[id]) if (!scenes[t]) err(`${id} → « ${t} » : destination inexistante`);
  const checkList = (list, where) => {
    if (!Array.isArray(list)) return;
    const last = list[list.length - 1];
    if (!last || last.if) err(`${id} (${where}) : la dernière route doit être sans condition`);
  };
  if (sc.kind === 'router') {
    if (!Array.isArray(sc.route)) err(`${id} : routeur sans route`);
    checkList(sc.route, 'route');
  }
  (sc.choices || []).forEach((c, i) => {
    if (!c.to) err(`${id} choix ${i} : pas de destination`);
    checkList(c.to, `choix ${i}`);
    if (!c.t) err(`${id} choix ${i} : pas de libellé`);
  });
}

// 3. Impasses : toute scène non finale a un choix sans condition (if/req/once).
for (const id of ids) {
  const sc = scenes[id];
  if (sc.kind === 'fin' || sc.kind === 'router') continue;
  const safe = (sc.choices || []).some((c) => !c.if && !c.req && !c.once);
  if (!safe) err(`${id} : impasse possible (aucun choix inconditionnel)`);
}

// 4. Atteignabilité depuis le début (graphe, conditions ignorées).
const start = chapters.slice().sort((a, b) => a.n - b.n)[0].start;
const seen = new Set([start]);
const q = [start];
while (q.length) for (const t of g[q.shift()] || []) if (scenes[t] && !seen.has(t)) { seen.add(t); q.push(t); }
for (const id of ids) if (!seen.has(id)) err(`${id} : scène orpheline (inatteignable depuis ${start})`);

// 5. Conditions, variables, flags écrits et lus.
const reg = registry;
const vars = Object.keys(reg.vars || {});
const known = new Set([...Object.keys(reg.stats), 'temps', ...Object.keys(reg.rels), ...Object.keys(reg.skills), ...Object.keys(reg.ops), ...vars, ...Object.keys(reg.flags)]);
const numeric = new Set([...Object.keys(reg.stats), 'temps', ...Object.keys(reg.rels), ...Object.keys(reg.skills), ...Object.keys(reg.ops), ...vars]);
const read = new Set();
const written = new Set();
const lists = new Set(Object.keys(reg.lists));
const listRead = new Set();
const listWritten = new Set();
function checkCond(src, where) {
  if (src === undefined) return;
  let c;
  try { c = SIG.cond.compile(src); } catch (e) { err(`${where} : condition invalide (${e.message})`); return; }
  for (const name of c.ids) {
    if (!known.has(name)) err(`${where} : variable non déclarée « ${name} » dans « ${src} »`);
    read.add(name);
  }
  for (const call of c.calls) {
    if (['visits', 'seen', 'picked'].includes(call.fn) && !scenes[call.args[0]]) err(`${where} : ${call.fn}() sur une scène inexistante « ${call.args[0]} »`);
    if (call.fn === 'picked' && scenes[call.args[0]] && !(scenes[call.args[0]].choices || [])[call.args[1]]) err(`${where} : picked() sur un choix inexistant ${call.args[0]}#${call.args[1]}`);
    if (call.fn === 'has' || call.fn === 'count') {
      if (!lists.has(call.args[0])) err(`${where} : liste inconnue « ${call.args[0]} »`);
      listRead.add(call.args[0]);
    }
  }
}
function checkEffects(o, where) {
  for (const k of Object.keys(o.fx || {})) {
    if (!numeric.has(k)) err(`${where} : modificateur sur « ${k} » (pas une jauge/relation/compétence/opinion)`);
    if (typeof o.fx[k] !== 'number') err(`${where} : modificateur non numérique sur « ${k} »`);
  }
  for (const k of Object.keys(o.set || {})) {
    if (!(k in reg.flags)) err(`${where} : set sur un flag non déclaré « ${k} »`);
    written.add(k);
  }
  for (const k of Object.keys(o.add || {})) {
    if (!lists.has(k)) err(`${where} : add sur une liste inconnue « ${k} »`);
    listWritten.add(k);
  }
  if (o.codex && !codex[o.codex]) err(`${where} : entrée de codex inconnue « ${o.codex} »`);
}
for (const id of ids) {
  const sc = scenes[id];
  checkEffects(sc, id);
  for (const cx of sc.codex || []) if (!codex[cx]) err(`${id} : entrée de codex inconnue « ${cx} »`);
  (sc.blocks || []).forEach((b, i) => checkCond(b.if, `${id} bloc ${i}`));
  (sc.choices || []).forEach((c, i) => {
    checkCond(c.if, `${id} choix ${i}`);
    checkCond(c.req, `${id} choix ${i} (req)`);
    checkEffects(c, `${id} choix ${i}`);
    if (Array.isArray(c.to)) c.to.forEach((r) => checkCond(r.if, `${id} choix ${i} route`));
  });
  if (sc.kind === 'router') (sc.route || []).forEach((r, i) => checkCond(r.if, `${id} route ${i}`));
}
const allComplete = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'].every((c) => (chapters.find((x) => x.id === c) || {}).complete);
const noEffect = (k) => (allComplete ? err : warn)(k);
for (const k of Object.keys(reg.flags)) {
  if (!written.has(k)) noEffect(`flag « ${k} » jamais écrit`);
  else if (!read.has(k)) noEffect(`flag « ${k} » écrit mais jamais lu (aucun effet visible)`);
}

// 6. Longueur de narration par écran.
let totalWords = 0;
for (const id of ids) {
  const sc = scenes[id];
  const w = (sc.blocks || []).filter((b) => !b.if).reduce((n, b) => n + SIG.util.countWords(SIG.Story.blockText(b)), 0);
  const wAll = (sc.blocks || []).reduce((n, b) => n + SIG.util.countWords(SIG.Story.blockText(b)), 0);
  totalWords += wAll;
  if (sc.kind === 'narration' && wAll < NARRATION_MIN_WORDS) warn(`${id} : narration courte (${wAll} mots < ${NARRATION_MIN_WORDS})`);
  if (sc.kind === 'dialogue' && wAll < DIALOGUE_MIN_WORDS) warn(`${id} : dialogue court (${wAll} mots < ${DIALOGUE_MIN_WORDS})`);
  if (VERBOSE) console.log(`  ${id.padEnd(18)} ${sc.kind.padEnd(10)} ${String(w).padStart(4)} / ${wAll} mots`);
}

// 7. Simulation.
const runs = runMany(SIG, N);
const crashed = runs.filter((r) => r.error);
for (const r of crashed.slice(0, 10)) err(`partie simulée #${r.seed} (${r.strategy}) : ${r.error}`);
const rangeErr = runs.flatMap((r) => r.rangeErrors);
for (const e of rangeErr.slice(0, 10)) err(`jauge hors bornes : ${e}`);

const finIds = ids.filter((id) => scenes[id].kind === 'fin');
const reached = new Map();
for (const r of runs) if (r.ending) reached.set(r.ending, (reached.get(r.ending) || 0) + 1);
// Une fin non atteinte au hasard est recherchée par une exploration ciblée avant d'échouer.
for (const id of finIds) {
  const fid = scenes[id].fin.id;
  if (reached.has(fid)) continue;
  let found = false;
  for (let s = 0; s < 20000 && !found; s++) {
    const r = play(SIG, 100000 + s, ['random', 'prudent', 'temeraire'][s % 3], { timeoutRate: 0.2 });
    if (r.ending) reached.set(r.ending, reached.get(r.ending) || 0);
    if (r.ending === fid) found = true;
  }
  if (!found) err(`fin « ${fid} » (${id}) jamais atteinte, même après exploration ciblée`);
}

// 8. Longueur par partie.
const ok = runs.filter((r) => !r.error);
const avg = (k) => ok.reduce((n, r) => n + r[k], 0) / Math.max(1, ok.length);
const sagaRuns = ok.filter((r) => r.endingType === 'saga');
const lengthRuns = sagaRuns.length ? sagaRuns : ok.filter((r) => r.endingType === 'tbc');
const minScreens = Math.min(...lengthRuns.map((r) => r.screens));
const minWords = Math.min(...lengthRuns.map((r) => r.words));
const complete = chapters.filter((c) => c.complete).map((c) => c.id);
const prorata = complete.reduce((a, c) => {
  const b = BUDGET[c] || { min: 0, minWords: 0, avg: 0, avgWords: 0 };
  return { min: a.min + b.min, minWords: a.minWords + b.minWords, avg: a.avg + b.avg, avgWords: a.avgWords + b.avgWords };
}, { min: 0, minWords: 0, avg: 0, avgWords: 0 });
const total = Object.values(BUDGET).reduce((a, b) => ({ min: a.min + b.min, minWords: a.minWords + b.minWords }), { min: 0, minWords: 0 });
// Seuils globaux ramenés à la part des chapitres terminés (écrans au prorata des écrans, mots des mots).
const scale = (kind, glob) => (allComplete ? glob : Math.round(glob * (kind === 'w' ? prorata.minWords / total.minWords : prorata.min / total.min)));
let lengthLine;
if (!complete.length) {
  lengthLine = 'PROTOTYPE : aucun chapitre marqué complet, seuils de longueur non appliqués.';
} else {
  const needS = scale('s', GLOBAL.minScreens);
  const needW = scale('w', GLOBAL.minWords);
  lengthLine = `Chapitres complets : ${complete.join(', ')} · seuil minimal au prorata : ${needS} écrans / ${needW} mots`;
  if (minScreens < needS) err(`chemin le plus court trop court : ${minScreens} écrans < ${needS}`);
  if (minWords < needW) err(`chemin le plus court trop court : ${minWords} mots < ${needW}`);
  const failS = scale('s', GLOBAL.failAvgScreens);
  const failW = scale('w', GLOBAL.failAvgWords);
  if (avg('screens') < failS) err(`partie moyenne trop courte : ${avg('screens').toFixed(0)} écrans < ${failS}`);
  if (avg('words') < failW) err(`partie moyenne trop courte : ${avg('words').toFixed(0)} mots < ${failW}`);
  for (const c of complete) {
    const b = BUDGET[c];
    if (b && complete.length === 1) {
      if (minScreens < b.min) warn(`${c} : chemin le plus court ${minScreens} écrans, sous le budget du plan (${b.min})`);
      if (avg('words') < b.avgWords) warn(`${c} : moyenne ${avg('words').toFixed(0)} mots, sous le budget du plan (${b.avgWords})`);
    }
  }
  if (avg('screens') < scale('s', GLOBAL.avgScreens)) warn(`partie moyenne sous la cible : ${avg('screens').toFixed(0)} écrans`);
}
// Part des parties qui atteignent le dernier chapitre écrit (fins précoces exclues).
const lastCh = Math.max(...chapters.map((c) => c.n));
const reachLast = ok.filter((r) => r.maxCh >= lastCh && r.endingType !== 'early').length / Math.max(1, ok.length);
if (reachLast < GLOBAL.reachLast) err(`seulement ${(reachLast * 100).toFixed(1)} % des parties atteignent la fin du chapitre ${lastCh} (< ${GLOBAL.reachLast * 100} %)`);

// 9. Test navigateur, 2D forcé.
let browserLine = 'test navigateur : ignoré (--no-browser)';
if (!SKIP_BROWSER) {
  const dist = join(ROOT, 'dist', 'signal.html');
  if (!existsSync(dist)) err('dist/signal.html absent : lancer npm run build avant validate');
  else {
    const { runBrowserTest } = await import('./test2d.mjs');
    try {
      const r = await runBrowserTest(dist, { games: 3 });
      browserLine = `test navigateur (2D forcé) : ${r.games} parties jouées jusqu'à une fin, ${r.screens} écrans, 0 erreur`;
    } catch (e) { err(`test navigateur 2D : ${e.message}`); browserLine = 'test navigateur : ÉCHEC'; }
  }
}

// Rapport.
const readMin = (w, c) => Math.round(w / 220 + (c * 4) / 60);
const hr = '─'.repeat(64);
console.log(hr);
console.log('SIGNAL — INTÉGRALE · validate');
console.log(hr);
console.log(`Scènes : ${ids.length} · fins : ${finIds.length} · flags déclarés : ${Object.keys(reg.flags).length} · codex : ${Object.keys(codex).length}`);
console.log(`Mots écrits (toutes variantes) : ${totalWords}`);
console.log(`Simulation : ${runs.length} parties · plantages : ${crashed.length} · jauges hors bornes : ${rangeErr.length}`);
console.log(`Par partie : moyenne ${avg('screens').toFixed(1)} écrans / ${avg('words').toFixed(0)} mots / ${avg('choices').toFixed(1)} choix · lecture ≈ ${readMin(avg('words'), avg('choices'))} min`);
console.log(`Chemin le plus court : ${minScreens} écrans / ${minWords} mots`);
console.log(lengthLine);
console.log(`Atteignent la fin du dernier chapitre écrit : ${(reachLast * 100).toFixed(1)} %`);
console.log('Fins atteintes : ' + finIds.map((id) => `${scenes[id].fin.id} (${reached.get(scenes[id].fin.id) ?? 0})`).join(', '));
console.log(browserLine);
console.log(hr);
if (warnings.length) {
  console.log(`Alertes (${warnings.length}) :`);
  for (const w of warnings.slice(0, VERBOSE ? 999 : 15)) console.log('  ! ' + w);
  if (!VERBOSE && warnings.length > 15) console.log(`  … ${warnings.length - 15} de plus (--verbose)`);
}
if (errors.length) {
  console.log(`ÉCHEC : ${errors.length} erreur(s)`);
  for (const e of errors.slice(0, 40)) console.log('  ✗ ' + e);
  process.exit(1);
}
console.log('OK : toutes les vérifications passent.');
