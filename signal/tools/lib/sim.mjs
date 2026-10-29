// Simulateur de parties : joue le vrai moteur (State + Story) sans DOM.
// Stratégies : random (hasard pur), prudent, temeraire, presse (prend toujours le plus court).

export function graph(SIG) {
  const scenes = SIG.data.scenes;
  const out = {};
  for (const id of Object.keys(scenes)) out[id] = targetsOf(scenes[id]);
  return out;
}

export function targetsOf(sc) {
  const t = [];
  const add = (to) => {
    if (typeof to === 'string') t.push(to);
    else if (Array.isArray(to)) for (const r of to) if (r && typeof r.to === 'string') t.push(r.to);
  };
  if (sc.kind === 'router') add(sc.route);
  for (const c of sc.choices || []) add(c.to);
  return t;
}

// Distance (en écrans) jusqu'à la fin la plus proche, en ignorant les conditions.
export function distanceToEnd(SIG) {
  const scenes = SIG.data.scenes;
  const g = graph(SIG);
  const rev = {};
  for (const [a, ts] of Object.entries(g)) for (const b of ts) (rev[b] = rev[b] || []).push(a);
  const dist = {};
  const q = [];
  for (const [id, sc] of Object.entries(scenes)) if (sc.kind === 'fin') { dist[id] = 0; q.push(id); }
  while (q.length) {
    const b = q.shift();
    for (const a of rev[b] || []) {
      const w = scenes[a].kind === 'router' ? 0 : 1;
      if (dist[a] === undefined || dist[b] + w < dist[a]) { dist[a] = dist[b] + w; q.push(a); }
    }
  }
  return dist;
}

function score(strategy, c, dist, rnd, st) {
  const fx = c.fx || {};
  switch (strategy) {
    case 'prudent': return -(fx.risque || 0) * 2 + (fx.integrite || 0) + rnd() * 3;
    case 'temeraire': return (fx.conscience || 0) + (fx.risque || 0) + (fx.lien || 0) + rnd() * 3;
    case 'presse': {
      // La destination réelle (routes conditionnelles résolues avec l'état courant).
      const tos = [st ? st.resolveTo(c.to) : (typeof c.to === 'string' ? c.to : c.to[c.to.length - 1].to)];
      // Plus court chemin, en évitant de revisiter (sinon le profil boucle dans les zones libres).
      const cost = (t) => (dist[t] === undefined ? 1e6 : dist[t]) + ((st && st.visits[t]) || 0) * 3;
      return -Math.min(...tos.map(cost)) + rnd() * 0.01;
    }
    default: return rnd();
  }
}

export function play(SIG, seed, strategy = 'random', opts = {}) {
  const { State, Story, util } = SIG;
  const rnd = util.rng(seed * 2654435761);
  const dist = opts.dist || distanceToEnd(SIG);
  const first = SIG.data.chapters[0];
  const st = State.create(seed);
  Object.defineProperty(st, 'resolveTo', { value: (to) => Story.resolve(st, to), enumerable: false });
  const res = { seed, strategy, ending: null, endingType: null, error: null, maxCh: 0, rangeErrors: [] };
  const endings = [];
  const meta = { onEnding: (sc) => endings.push(sc) };
  const chNum = (id) => { const c = Story.chapter(id); return c ? c.n : 0; };
  try {
    let id = Story.enter(st, first.start, meta);
    for (let step = 0; step < 5000; step++) {
      const sc = SIG.data.scenes[id];
      res.maxCh = Math.max(res.maxCh, chNum(sc.ch));
      checkRanges(st, res, id);
      if (sc.kind === 'fin') {
        res.ending = sc.fin.id;
        res.endingType = sc.fin.type;
        break;
      }
      const avail = Story.choices(st, sc).filter((x) => !x.locked);
      if (!avail.length) throw new Error(`impasse : aucun choix disponible dans ${id}`);
      let pick;
      let timedOut = false;
      if (sc.timer && rnd() < (opts.timeoutRate ?? 0.1)) {
        pick = (sc.choices || [])[sc.timer.auto] ? { idx: sc.timer.auto } : avail[0];
        timedOut = true;
      } else {
        // Les profils (prudent, téméraire) suivent leur penchant 70 % du temps : un vrai joueur
        // n'est jamais parfaitement systématique. Le profil « pressé » l'est, lui, toujours.
        const biased = strategy === 'presse' || (strategy !== 'random' && rnd() < 0.7);
        if (biased) pick = avail.reduce((best, x) => (score(strategy, x.c, dist, rnd, st) > score(strategy, best.c, dist, rnd, st) ? x : best), avail[0]);
        else pick = avail[Math.floor(rnd() * avail.length)];
      }
      const { to } = Story.choose(st, pick.idx, { timedOut });
      id = Story.enter(st, to, meta);
      if (step === 4999) throw new Error('boucle infinie probable (5000 étapes)');
    }
  } catch (e) {
    res.error = `${e.message} (scène ${st.scene})`;
  }
  res.screens = st.screens;
  res.words = st.words;
  res.choices = st.choices;
  res.path = st.path;
  res.state = st;
  return res;
}

function checkRanges(st, res, id) {
  const bad = (name, v, lo, hi) => {
    if (typeof v !== 'number' || Number.isNaN(v) || v < lo || v > hi) res.rangeErrors.push(`${name}=${v} à ${id}`);
  };
  for (const [k, v] of Object.entries(st.s)) bad(k, v, 0, 100);
  for (const [k, v] of Object.entries(st.rel)) bad(k, v, 0, 100);
  for (const [k, v] of Object.entries(st.op)) bad(k, v, 0, 100);
  for (const [k, v] of Object.entries(st.sk)) bad(k, v, 0, 5);
  for (const [k, v] of Object.entries(st.vars || {})) bad(k, v, 0, 100);
  bad('temps', st.temps, 0, 100);
}

export function runMany(SIG, n, seed0 = 1) {
  const dist = distanceToEnd(SIG);
  const strategies = ['random', 'random', 'prudent', 'temeraire', 'presse'];
  const runs = [];
  for (let i = 0; i < n; i++) runs.push(play(SIG, seed0 + i, strategies[i % strategies.length], { dist }));
  return runs;
}
