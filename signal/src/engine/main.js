// Contrôleur du jeu : relie l'état, la carte de texte, la 3D, l'audio et les sauvegardes.
SIG.Game = (function () {
  const St = SIG.State;
  const Story = SIG.Story;
  const Save = SIG.Save;
  const { toast, vibrate } = SIG.UI.fx;
  const LABELS = {
    conscience: 'CONSC.', lien: 'LIEN', risque: 'RISQUE', integrite: 'INTÉGR.', credibilite: 'CRÉDIB.',
    alliance: 'ALLIANCE', temps: 'TEMPS',
  };

  const G = {
    state: null,
    settings: Save.settings(),
    test: /[?&]test\b/.test(location.search),
    scene: null,
  };

  const url = new URLSearchParams(location.search);
  if (url.has('2d')) G.settings.force2d = true;
  // Mode test automatisé : texte instantané, pas de minuteur (évite les courses avec le robot).
  if (G.test) Object.assign(G.settings, { textSpeed: 'instant', noTimer: !url.has('timers') });
  const reducedPref = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applySettings() {
    const s = G.settings;
    const root = document.documentElement;
    root.style.setProperty('--fs', String([0.92, 1, 1.12, 1.26][s.textSize] || 1));
    root.classList.toggle('rm', !!(s.reducedMotion || reducedPref));
    SIG.Gfx.setReduced(!!(s.reducedMotion || reducedPref));
    SIG.Audio.configure({ ambiance: s.ambiance !== 'off', text: !!s.sfxText, beat: !!s.sfxBeat });
    if (s.sound) SIG.Audio.enable(); else SIG.Audio.disable();
    document.getElementById('btn-sound').classList.toggle('on', !!s.sound);
  }

  function saveSettings() { Save.saveSettings(G.settings); applySettings(); }

  const meta = {
    onEnding(sc) { Save.addMeta('endings', sc.fin.id); },
  };

  function newGame() {
    SIG.UI.card.stopAll();
    G.state = St.create((Math.random() * 2 ** 31) >>> 0);
    Save.clearSlot('auto');
    const first = SIG.data.chapters.slice().sort((a, b) => a.n - b.n)[0];
    SIG.UI.menu.hideTitle();
    SIG.UI.menu.hideEnding();
    SIG.UI.panels.close();
    goto(first.start);
  }

  function loadState(st) {
    SIG.UI.card.stopAll();
    G.state = St.migrate(st);
    // Scène disparue depuis la sauvegarde (version précédente du jeu) : on reprend au dernier
    // point de contrôle encore valide, sinon au début du chapitre.
    if (!SIG.data.scenes[st.scene]) {
      const cp = st.lastCp && st.checkpoints[st.lastCp];
      const ch = Story.chapter(st.ch) || SIG.data.chapters[0];
      if (cp && SIG.data.scenes[cp.scene]) { G.state = St.migrate(St.restore(st, st.lastCp)); }
      else { G.state = St.migrate(St.create(st.seed)); SIG.UI.menu.hideTitle(); goto(ch.start); toast('Sauvegarde d\'une ancienne version : reprise au début du chapitre.'); return; }
    }
    SIG.UI.menu.hideTitle();
    SIG.UI.menu.hideEnding();
    SIG.UI.panels.close();
    // On rejoue l'affichage de la scène courante sans réappliquer ses effets.
    show(SIG.data.scenes[st.scene]);
  }

  function goto(id) {
    const st = G.state;
    const real = Story.enter(st, id, meta);
    show(SIG.data.scenes[real]);
    for (const cx of st.codex) Save.addMeta('codex', cx);
    if (SIG.data.scenes[real].kind !== 'fin') Save.saveSlot('auto', st);
  }

  function show(sc) {
    G.scene = sc;
    const st = G.state;
    if (sc.visual) { SIG.Gfx.setVisual(sc.visual.preset, sc.visual.params); SIG.Audio.mood(sc.visual.params); }
    hud();
    glitch();
    if (sc.kind !== 'fin') SIG.UI.menu.hideEnding();
    // Intro et fin s'affichent par-dessus : on vide la carte pour qu'aucun ancien choix ne reste cliquable.
    if (sc.kind === 'chapter' || sc.kind === 'fin') SIG.UI.card.clear();
    if (sc.kind === 'chapter') SIG.UI.menu.chapterIntro(sc, st, () => renderCard(sc));
    else if (sc.kind === 'fin') SIG.UI.menu.ending(sc, st);
    else renderCard(sc);
  }

  function renderCard(sc) {
    SIG.UI.card.render(sc, G.state, G.settings, (idx, opts) => choose(idx, opts));
  }

  function choose(idx, opts) {
    let res;
    try {
      res = Story.choose(G.state, idx, opts);
    } catch (e) {
      // Filet de sécurité : jamais de clic sans effet. On signale, on journalise, on réaffiche.
      console.error(e);
      toast('Un problème est survenu sur ce choix : ' + e.message);
      renderCard(G.scene);
      return;
    }
    if (res.changes.length) flashGauges(res.changes);
    if (opts && opts.timedOut) toast('Le temps a décidé pour toi.');
    const card = document.getElementById('card');
    card.classList.add('leaving');
    setTimeout(() => {
      card.classList.remove('leaving');
      try { goto(res.to); } catch (e) { console.error(e); toast('Un problème est survenu : ' + e.message); renderCard(G.scene); }
    }, G.settings.reducedMotion || G.test ? 0 : 220);
  }

  function hud() {
    const st = G.state;
    const ch = Story.chapter(st.ch);
    const sc = G.scene;
    document.getElementById('hud-ch').textContent = ch ? `${ch.n}·${ch.title}` : '';
    document.getElementById('hud-clock').textContent = Story.clock(st, sc) || (ch && ch.date) || '';
    const box = document.getElementById('hud-gauges');
    const keys = (ch && ch.hud) || ['conscience', 'lien', 'risque', 'temps'];
    if (box.dataset.keys !== keys.join()) {
      box.innerHTML = keys.map((k) => `<div class="g" data-k="${k}"><span>${LABELS[k] || k}</span><i><b></b></i></div>`).join('');
      box.dataset.keys = keys.join();
    }
    for (const k of keys) {
      const v = k === 'temps' ? (st.temps / ((ch && ch.temps) || 100)) * 100 : St.get(st, k);
      const g = box.querySelector(`[data-k="${k}"]`);
      g.querySelector('b').style.width = `${Math.max(0, Math.min(100, v))}%`;
      g.classList.toggle('crit', (k === 'risque' && v >= 75) || (k === 'temps' && v <= 20));
    }
  }

  function flashGauges(changes) {
    for (const ch of changes) {
      const g = document.querySelector(`#hud-gauges [data-k="${ch.name}"]`);
      if (!g) continue;
      g.classList.remove('up', 'down');
      void g.offsetWidth; // relance l'animation
      g.classList.add(ch.d > 0 ? 'up' : 'down');
    }
  }

  function glitch() {
    const st = G.state;
    const ch = Story.chapter(st.ch);
    const tRatio = st.temps / ((ch && ch.temps) || 100);
    document.body.classList.toggle('glitch', st.s.risque >= 80 || tRatio <= 0.15);
  }

  function reloadCheckpoint(key) {
    const st = St.restore(G.state, key);
    if (!st) { toast('Point de contrôle introuvable.'); return; }
    G.state = st;
    SIG.UI.menu.hideEnding();
    goto(st.scene);
    toast('Épisode rechargé.');
  }

  function toTitle() {
    SIG.UI.card.stopAll();
    SIG.UI.panels.close();
    SIG.UI.menu.hideEnding();
    SIG.UI.menu.showTitle();
  }

  function toggleView() {
    const on = !document.body.classList.contains('viewing');
    document.body.classList.toggle('viewing', on);
    SIG.Gfx.setViewing(on);
  }

  // Compteur d'images/s (réglage « Afficher les i/s », ou ?fps dans l'adresse).
  let fpsRaf = 0;
  function showFps(on) {
    const f = document.getElementById('fps');
    cancelAnimationFrame(fpsRaf);
    f.style.display = on ? 'block' : 'none';
    if (!on) return;
    let n = 0;
    let t0 = performance.now();
    const tick = (now) => {
      n++;
      if (now - t0 > 1000) {
        f.textContent = `${SIG.Gfx.mode()} · ${SIG.Gfx.quality()} · ${Math.round((n * 1000) / (now - t0))} i/s · mesure ${Math.round(SIG.Gfx.fps())}`;
        n = 0;
        t0 = now;
      }
      fpsRaf = requestAnimationFrame(tick);
    };
    fpsRaf = requestAnimationFrame(tick);
  }

  function boot() {
    applySettings();
    SIG.Gfx.init({
      force2d: G.settings.force2d,
      reducedMotion: G.settings.reducedMotion || reducedPref,
      onModeChange: (mode) => { if (mode === '2d') toast('Appareil un peu lent : passage automatique en mode 2D.'); },
    });
    SIG.Gfx.setVisual('reseau', { mode: 'idle', rings: 0, intensity: 0.35 });
    // Le battement ne s'entend et ne se sent que pendant les micro-interactions (sinon il devient lassant).
    SIG.Gfx.onBeat(() => {
      const sc = G.scene;
      if (!sc || sc.kind !== 'micro') return;
      SIG.Audio.beat(0.6);
      vibrate(10);
    });

    document.getElementById('btn-view').onclick = toggleView;
    document.getElementById('btn-back').onclick = toggleView;
    document.getElementById('btn-menu').onclick = () => SIG.UI.panels.open('journal');
    document.getElementById('btn-sound').onclick = () => {
      G.settings.sound = !G.settings.sound;
      saveSettings();
      toast(G.settings.sound ? 'Son activé.' : 'Son coupé.');
    };
    document.getElementById('card-scroll').addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      SIG.UI.card.finishTyping();
    });
    document.addEventListener('visibilitychange', () => SIG.Audio.suspend(document.hidden));

    if (url.has('fps') || G.settings.showFps) showFps(true);

    SIG.UI.menu.showTitle();

    // Point d'accès pour le test automatisé (tools/test2d.mjs).
    window.__SIGNAL = {
      game: G,
      scene: () => G.scene && G.scene.id,
      ended: () => !!(G.scene && G.scene.kind === 'fin'),
      mode: () => SIG.Gfx.mode(),
    };
  }

  Object.assign(G, { showFps, boot, newGame, loadState, goto, choose, reloadCheckpoint, toTitle, saveSettings, applySettings, hud });
  return G;
})();

window.addEventListener('DOMContentLoaded', () => {
  try { SIG.Game.boot(); } catch (e) {
    const t = document.getElementById('text');
    if (t) t.textContent = 'Erreur au démarrage : ' + e.message;
    throw e;
  }
});
