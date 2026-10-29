// État global d'une partie : tout ce qui traverse les chapitres.
// Aucune dépendance au DOM : ce fichier est aussi chargé par validate et simulate.
SIG.State = (function () {
  const U = SIG.util;
  const R = () => SIG.data.registry;

  function create(seed) {
    const reg = R();
    const flags = {};
    for (const k of Object.keys(reg.flags)) flags[k] = U.deepCopy(reg.flags[k].def);
    const lists = {};
    for (const k of Object.keys(reg.lists)) lists[k] = [];
    return {
      v: 1,
      seed: seed >>> 0,
      rngN: 0,
      scene: null,
      ch: null,
      s: Object.assign({}, reg.stats),
      temps: reg.temps,
      rel: Object.assign({}, reg.rels),
      sk: Object.assign({}, reg.skills),
      op: Object.assign({}, reg.ops),
      vars: Object.assign({}, reg.vars || {}),
      f: flags,
      lists,
      visits: {},
      chosen: {},
      path: [],
      edges: [],
      journal: [],
      codex: [],
      checkpoints: {},
      lastCp: null,
      words: 0,
      screens: 0,
      choices: 0,
      started: Date.now(),
    };
  }

  function kindOf(name) {
    const reg = R();
    if (name in reg.stats) return 's';
    if (name === 'temps') return 't';
    if (name in reg.rels) return 'rel';
    if (name in reg.skills) return 'sk';
    if (name in reg.ops) return 'op';
    if (reg.vars && name in reg.vars) return 'v';
    if (name in reg.flags) return 'f';
    return null;
  }

  function get(st, name) {
    switch (kindOf(name)) {
      case 's': return st.s[name];
      case 't': return st.temps;
      case 'rel': return st.rel[name];
      case 'sk': return st.sk[name];
      case 'op': return st.op[name];
      case 'v': return st.vars[name];
      case 'f': return st.f[name];
      default: throw new Error(`variable inconnue « ${name} »`);
    }
  }

  // Tirage déterministe : même graine + mêmes choix = même partie (utile pour recharger).
  function random(st) {
    const r = U.rng((st.seed + st.rngN * 7919) >>> 0)();
    st.rngN++;
    return r;
  }

  function scope(st) {
    return {
      get: (name) => get(st, name),
      call: (fn, args) => {
        switch (fn) {
          case 'visits': return st.visits[args[0]] || 0;
          case 'seen': return (st.visits[args[0]] || 0) > 0;
          case 'has': return (st.lists[args[0]] || []).includes(args[1]);
          case 'count': return (st.lists[args[0]] || []).length;
          case 'chance': return random(st) < Number(args[0]);
          case 'picked': return !!st.chosen[`${args[0]}#${args[1]}`];
        }
        throw new Error(`fonction inconnue ${fn}`);
      },
    };
  }

  function test(st, src) { return SIG.cond.test(src, scope(st)); }

  // Applique des modificateurs. Tolère `fx` absent ou vide (bug historique n°1).
  function applyFx(st, fx) {
    const changes = [];
    if (!fx || typeof fx !== 'object') return changes;
    for (const name of Object.keys(fx)) {
      const d = Number(fx[name]) || 0;
      if (!d) continue;
      const k = kindOf(name);
      const before = get(st, name);
      switch (k) {
        case 's': st.s[name] = U.clamp(before + d, 0, 100); break;
        // Le Temps est borné par la durée du chapitre (120 min au chapitre 2), 100 au moins.
        case 't': st.temps = U.clamp(before + d, 0, Math.max(100, (SIG.Story.chapter(st.ch) || {}).temps || 100)); break;
        case 'rel': st.rel[name] = U.clamp(before + d, 0, 100); break;
        case 'sk': st.sk[name] = U.clamp(before + d, 0, 5); break;
        case 'op': st.op[name] = U.clamp(before + d, 0, 100); break;
        case 'v': st.vars[name] = U.clamp(before + d, 0, 100); break;
        default: throw new Error(`modificateur sur une variable non numérique « ${name} »`);
      }
      const after = get(st, name);
      if (after !== before) changes.push({ name, d: after - before });
    }
    return changes;
  }

  function applySet(st, set) {
    if (!set || typeof set !== 'object') return;
    for (const k of Object.keys(set)) {
      if (kindOf(k) !== 'f') throw new Error(`set sur un flag non déclaré « ${k} »`);
      st.f[k] = set[k];
    }
  }

  function applyAdd(st, add) {
    if (!add || typeof add !== 'object') return;
    for (const k of Object.keys(add)) {
      if (!st.lists[k]) throw new Error(`liste inconnue « ${k} »`);
      const items = Array.isArray(add[k]) ? add[k] : [add[k]];
      for (const it of items) if (!st.lists[k].includes(it)) st.lists[k].push(it);
    }
  }

  // Retire un élément d'une liste (ex. un fragment laissé derrière soi).
  function applyRemove(st, rem) {
    if (!rem || typeof rem !== 'object') return;
    for (const k of Object.keys(rem)) {
      if (!st.lists[k]) throw new Error(`liste inconnue « ${k} »`);
      const items = Array.isArray(rem[k]) ? rem[k] : [rem[k]];
      st.lists[k] = st.lists[k].filter((x) => !items.includes(x));
    }
  }

  function snapshot(st) {
    const c = U.deepCopy(st);
    c.checkpoints = {};
    return c;
  }

  function restore(st, key) {
    const snap = st.checkpoints[key];
    if (!snap) return null;
    const keep = st.checkpoints;
    const fresh = U.deepCopy(snap);
    fresh.checkpoints = keep;
    fresh.lastCp = key;
    return fresh;
  }

  // Met à niveau un état venu d'une ancienne sauvegarde : toute variable ajoutée au registre
  // depuis reçoit sa valeur par défaut (sinon un choix pourrait planter sur une liste inconnue).
  function migrate(st) {
    const reg = R();
    const fill = (obj, defs) => { for (const k of Object.keys(defs)) if (!(k in obj)) obj[k] = U.deepCopy(defs[k]); };
    st.s = st.s || {}; fill(st.s, reg.stats);
    st.rel = st.rel || {}; fill(st.rel, reg.rels);
    st.sk = st.sk || {}; fill(st.sk, reg.skills);
    st.op = st.op || {}; fill(st.op, reg.ops);
    // La version du chapitre 1 rangeait les compteurs dans `v` (champ de version) : on les récupère.
    if (st.v && typeof st.v === 'object' && !st.vars) { st.vars = st.v; st.v = 1; }
    if (!st.vars || typeof st.vars !== 'object') st.vars = {};
    fill(st.vars, reg.vars || {});
    st.f = st.f || {};
    for (const k of Object.keys(reg.flags)) if (!(k in st.f)) st.f[k] = U.deepCopy(reg.flags[k].def);
    st.lists = st.lists || {};
    for (const k of Object.keys(reg.lists)) if (!Array.isArray(st.lists[k])) st.lists[k] = [];
    for (const k of ['visits', 'chosen', 'checkpoints']) st[k] = st[k] || {};
    for (const k of ['path', 'edges', 'journal', 'codex']) st[k] = st[k] || [];
    for (const k of ['words', 'screens', 'choices', 'rngN']) st[k] = st[k] || 0;
    if (typeof st.temps !== 'number') st.temps = reg.temps;
    return st;
  }

  return { create, migrate, get, kindOf, scope, test, applyFx, applySet, applyAdd, applyRemove, snapshot, restore, random };
})();
