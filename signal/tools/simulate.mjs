// npm run simulate : joue des milliers de parties aléatoires (5 profils de joueur) et affiche
// un rapport : plantages, fins atteintes, couverture des scènes et des choix, longueurs.
import { loadSIG } from './lib/load.mjs';
import { runMany } from './lib/sim.mjs';

const N = Number((process.argv.find((a) => a.startsWith('--runs=')) || '--runs=5000').split('=')[1]);
const SIG = loadSIG();
const { scenes } = SIG.data;
const runs = runMany(SIG, N, 7);

const sceneHits = new Map();
const choiceHits = new Set();
let totalChoices = 0;
for (const sc of Object.values(scenes)) totalChoices += (sc.choices || []).length;
for (const r of runs) {
  for (const id of r.path) sceneHits.set(id, (sceneHits.get(id) || 0) + 1);
  for (const [k] of Object.entries(r.state.chosen)) choiceHits.add(k);
}
const byStrat = {};
for (const r of runs) {
  const b = (byStrat[r.strategy] = byStrat[r.strategy] || { n: 0, screens: 0, words: 0, early: 0 });
  b.n++; b.screens += r.screens; b.words += r.words; if (r.endingType === 'early') b.early++;
}
const endings = {};
for (const r of runs) endings[r.ending || 'PLANTAGE'] = (endings[r.ending || 'PLANTAGE'] || 0) + 1;
const crashes = runs.filter((r) => r.error);
const pct = (a, b) => `${((a / Math.max(1, b)) * 100).toFixed(1)} %`;
const screensSorted = runs.map((r) => r.screens).sort((a, b) => a - b);

console.log(`Simulation de ${N} parties`);
console.log(`Plantages : ${crashes.length}`);
for (const c of crashes.slice(0, 5)) console.log(`  ✗ #${c.seed} ${c.strategy} : ${c.error}`);
const nonRouter = Object.keys(scenes).filter((id) => scenes[id].kind !== 'router').length;
console.log(`Scènes : ${nonRouter} (+ routeurs) · visitées au moins une fois : ${sceneHits.size} (${pct(sceneHits.size, nonRouter)})`);
console.log(`Choix : ${totalChoices} · pris au moins une fois : ${choiceHits.size} (${pct(choiceHits.size, totalChoices)})`);
const never = Object.keys(scenes).filter((id) => !sceneHits.has(id) && scenes[id].kind !== 'router');
if (never.length) console.log(`Scènes jamais visitées : ${never.join(', ')}`);
console.log(`Écrans par partie : min ${screensSorted[0]} · médiane ${screensSorted[Math.floor(N / 2)]} · max ${screensSorted[N - 1]}`);
console.log('Par profil :');
for (const [k, b] of Object.entries(byStrat)) console.log(`  ${k.padEnd(10)} ${String(b.n).padStart(5)} parties · ${(b.screens / b.n).toFixed(1)} écrans · ${(b.words / b.n).toFixed(0)} mots · fins précoces ${pct(b.early, b.n)}`);
console.log('Fins :');
for (const [k, v] of Object.entries(endings).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(14)} ${String(v).padStart(5)}  ${pct(v, N)}`);
if (crashes.length) process.exit(1);
