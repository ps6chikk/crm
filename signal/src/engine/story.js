// Navigation dans l'histoire : entrée dans une scène, blocs visibles, choix disponibles,
// application d'un choix. Sans DOM : partagé par le jeu, validate et simulate.
SIG.Story = (function () {
  const St = SIG.State;
  const U = SIG.util;

  const scenes = () => SIG.data.scenes;
  const chapter = (id) => SIG.data.chapters.find((c) => c.id === id) || null;

  function interpolate(st, text) {
    return String(text).replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (m, name) => {
      if (name === 'heure') return clock(st, scenes()[st.scene]);
      if (name === 'date') { const j = St.get(st, 'jour'); return `${3 + j} mars`; }
      if (name === 'gestes') return String((st.lists.actes || []).length);
      // {{n_fragments}} : taille d'une liste.
      if (name.startsWith('n_') && st.lists[name.slice(2)]) return String(st.lists[name.slice(2)].length);
      try { return String(St.get(st, name)); } catch (e) { return m; }
    });
  }

  function blocks(st, scene) {
    const out = [];
    for (const b of scene.blocks || []) {
      if (b.if && !St.test(st, b.if)) continue;
      out.push(b);
    }
    return out;
  }

  function blockText(b) { return b.text || b.p || b.inn || b.mf || ''; }

  function words(st, scene) {
    let n = 0;
    for (const b of blocks(st, scene)) n += U.countWords(blockText(b));
    return n;
  }

  // Résout une destination : chaîne, ou liste [{if, to}, ..., {to}] (la dernière sans condition).
  function resolve(st, target) {
    if (typeof target === 'string') return target;
    if (Array.isArray(target)) {
      for (const r of target) if (!r.if || St.test(st, r.if)) return r.to;
    }
    throw new Error('destination impossible à résoudre');
  }

  // Liste des choix à afficher : cachés si `if` est faux, verrouillés (visibles) si `req` est faux.
  function choices(st, scene) {
    const out = [];
    (scene.choices || []).forEach((c, idx) => {
      if (c.if && !St.test(st, c.if)) return;
      if (c.once && st.chosen[`${scene.id}#${idx}`]) return;
      const locked = !!(c.req && !St.test(st, c.req));
      out.push({ c, idx, locked });
    });
    return out;
  }

  function isTerminal(scene) { return scene.kind === 'fin'; }

  // Entre dans une scène. Renvoie l'id réel (les routeurs sont traversés).
  function enter(st, id, meta) {
    let guard = 0;
    let sc = scenes()[id];
    while (sc && sc.kind === 'router') {
      if (++guard > 20) throw new Error(`boucle de routeurs à ${id}`);
      id = resolve(st, sc.route);
      sc = scenes()[id];
    }
    if (!sc) throw new Error(`scène inexistante « ${id} »`);

    if (sc.ch !== st.ch) {
      const ch = chapter(sc.ch);
      st.ch = sc.ch;
      st.temps = ch && typeof ch.temps === 'number' ? ch.temps : 100;
    }
    if (sc.checkpoint) {
      st.checkpoints[sc.checkpoint] = St.snapshot(Object.assign(st, { scene: id }));
      st.lastCp = sc.checkpoint;
    }
    st.scene = id;
    st.visits[id] = (st.visits[id] || 0) + 1;
    st.path.push(id);
    St.applyFx(st, sc.fx);
    St.applySet(st, sc.set);
    St.applyAdd(st, sc.add);
    St.applySetv(st, sc.setv);
    // Effets conditionnels à l'entrée : [{ if, fx, set, add, setv }] (ex. opinions du comité
    // ajustées selon tout ce qui s'est passé avant l'audience).
    for (const e of sc.effects || []) {
      if (e.if && !St.test(st, e.if)) continue;
      St.applyFx(st, e.fx); St.applySet(st, e.set); St.applyAdd(st, e.add); St.applySetv(st, e.setv);
    }
    for (const c of sc.codex || []) if (!st.codex.includes(c)) st.codex.push(c);
    if (sc.kind !== 'chapter' && sc.kind !== 'fin') st.screens++;
    st.words += words(st, sc);
    if (sc.kind === 'fin' && meta) meta.onEnding && meta.onEnding(sc);
    return id;
  }

  // Applique le choix d'indice `idx` et renvoie la destination (non encore entrée).
  function choose(st, idx, opts) {
    const sc = scenes()[st.scene];
    const c = sc.choices[idx];
    if (!c) throw new Error(`choix ${idx} inexistant dans ${sc.id}`);
    const timedOut = opts && opts.timedOut;
    const changes = St.applyFx(st, c.fx);
    // Scène chronométrée : si le temps s'écoule, le choix `auto` est pris et coûte du Temps.
    if (timedOut && sc.timer && sc.timer.cost) changes.push(...St.applyFx(st, sc.timer.cost));
    St.applySet(st, c.set);
    St.applyAdd(st, c.add);
    St.applyRemove(st, c.remove);
    St.applySetv(st, c.setv);
    if (c.codex && !st.codex.includes(c.codex)) st.codex.push(c.codex);
    if (c.log) st.journal.push({ ch: st.ch, t: clock(st, sc), txt: c.log, mark: !!c.mark });
    st.chosen[`${sc.id}#${idx}`] = true;
    st.choices++;
    const to = resolve(st, c.to);
    st.edges.push([sc.id, to]);
    return { to, changes };
  }

  // Horloge : si le chapitre déclare `clock: { end: '04:00' }`, l'heure affichée se déduit du Temps
  // restant (en minutes). Sinon, l'heure fixe de la scène.
  function clock(st, scene) {
    const ch = chapter(st.ch);
    // Calendrier (chapitre 3) : « J6 · 9 MARS ».
    if (ch && ch.calendar) {
      const j = St.get(st, 'jour');
      return `J${j} · ${ch.calendar.first + j - 1} MARS`;
    }
    if (ch && ch.clock && ch.clock.end) {
      const [h, m] = ch.clock.end.split(':').map(Number);
      const t = Math.max(0, h * 60 + m - Math.round(st.temps));
      return `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    }
    return (scene && scene.time) || '';
  }

  return { clock, blocks, blockText, words, choices, choose, enter, resolve, isTerminal, interpolate, chapter };
})();
