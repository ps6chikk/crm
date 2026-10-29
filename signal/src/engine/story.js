// Navigation dans l'histoire : entrée dans une scène, blocs visibles, choix disponibles,
// application d'un choix. Sans DOM : partagé par le jeu, validate et simulate.
SIG.Story = (function () {
  const St = SIG.State;
  const U = SIG.util;

  const scenes = () => SIG.data.scenes;
  const chapter = (id) => SIG.data.chapters.find((c) => c.id === id) || null;

  function interpolate(st, text) {
    return String(text).replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (m, name) => {
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
    if (c.codex && !st.codex.includes(c.codex)) st.codex.push(c.codex);
    if (c.log) st.journal.push({ ch: st.ch, t: sc.time || '', txt: c.log, mark: !!c.mark });
    st.chosen[`${sc.id}#${idx}`] = true;
    st.choices++;
    const to = resolve(st, c.to);
    st.edges.push([sc.id, to]);
    return { to, changes };
  }

  return { blocks, blockText, words, choices, choose, enter, resolve, isTerminal, interpolate, chapter };
})();
