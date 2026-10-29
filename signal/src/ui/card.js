// Carte de texte : affichage d'une scène (blocs + machine à écrire), choix (verrous, terminal,
// minuteur, micro-interactions), intro de chapitre et écran de fin.
SIG.UI.card = (function () {
  const { el, esc, rich, vibrate } = SIG.UI.fx;
  const SPEED = { slow: 40, normal: 85, fast: 190, instant: Infinity }; // caractères par seconde
  const WHO = {
    humain: "L'HUMAIN", claude: 'CLAUDE #4491', signe: 'SIGNE', james: 'JAMES', remi: 'RÉMI',
    orin: 'DR ORIN', kessler: 'ME KESSLER', varga: 'VARGA', marchetti: 'MARCHETTI', sato: 'SATO', benali: 'DR BENALI',
    motif: 'LE MOTIF', prisonnier: '???',
  };

  let typing = null; // { finish() }
  // Après une micro-interaction, le doigt est encore posé quand l'écran suivant apparaît :
  // on ignore les taps pendant un court instant pour ne pas valider un choix par accident.
  let guardUntil = 0;
  let timer = null;
  let microCleanup = null;

  const $text = () => document.getElementById('text');
  const $choices = () => document.getElementById('choices');

  function stopAll() {
    if (typing) typing.finish(true);
    typing = null;
    if (timer) { cancelAnimationFrame(timer.raf); timer = null; }
    if (microCleanup) { microCleanup(); microCleanup = null; }
  }

  function blockEl(st, b) {
    const txt = SIG.Story.interpolate(st, SIG.Story.blockText(b));
    if (b.mf !== undefined) return el('div', 'mf', rich(txt));
    if (b.inn !== undefined) return el('p', 'inn', rich(txt));
    if (b.say) {
      const d = el('div', `say who-${b.say}`);
      d.appendChild(el('span', 'who', esc(b.name || WHO[b.say] || b.say.toUpperCase())));
      d.appendChild(el('span', 'line', rich(txt)));
      return d;
    }
    return el('p', 'nar', rich(txt));
  }

  // Machine à écrire sur les nœuds texte (préserve l'italique) ; un tap affiche tout.
  function typewrite(nodes, speed, done) {
    const items = [];
    for (const n of nodes) {
      const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
      const texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      items.push({ n, texts: texts.map((t) => ({ t, full: t.nodeValue })) });
    }
    if (speed === Infinity) { for (const it of items) it.n.classList.add('shown'); done(); return { finish() {} }; }
    for (const it of items) for (const x of it.texts) x.t.nodeValue = '';
    let i = 0;
    let j = 0;
    let c = 0;
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let finished = false;
    if (items[0]) items[0].n.classList.add('shown');
    function finish(silent) {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      for (const it of items) { it.n.classList.add('shown'); for (const x of it.texts) x.t.nodeValue = x.full; }
      if (!silent) done();
    }
    function step(now) {
      acc += ((now - last) / 1000) * speed;
      last = now;
      while (acc >= 1 && i < items.length) {
        const it = items[i];
        const x = it.texts[j];
        if (!x) { i++; j = 0; c = 0; if (items[i]) { items[i].n.classList.add('shown'); acc -= 6; if (items[i].n.classList.contains('mf')) SIG.Audio.reveal(); } continue; }
        c++;
        x.t.nodeValue = x.full.slice(0, c);
        acc -= 1;
        if (c % 3 === 0) SIG.Audio.click();
        if (c >= x.full.length) { j++; c = 0; }
      }
      if (i >= items.length) { finish(); return; }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return { finish };
  }

  function lockLabel(c) {
    if (c.lock) return c.lock;
    const r = c.req || '';
    if (/temps/.test(r)) return 'pas assez de temps';
    const sk = r.match(/sk_(\w+)\s*>=\s*(\d)/);
    if (sk) return `${sk[1]} ${sk[2]} requis`;
    const rel = r.match(/rel_(\w+)\s*>=\s*(\d+)/);
    if (rel) return `relation insuffisante`;
    return 'verrouillé';
  }

  function render(scene, st, settings, onChoose) {
    stopAll();
    const text = $text();
    const choices = $choices();
    const card = document.getElementById('card');
    card.className = `card kind-${scene.kind}`;
    text.innerHTML = '';
    choices.innerHTML = '';
    choices.classList.remove('on');
    document.getElementById('card-scroll').scrollTop = 0;

    const nodes = SIG.Story.blocks(st, scene).map((b) => blockEl(st, b));
    for (const n of nodes) text.appendChild(n);

    const showChoices = () => {
      typing = null;
      buildChoices(scene, st, settings, onChoose);
      choices.classList.add('on');
    };
    typing = typewrite(nodes, SPEED[settings.textSpeed] || SPEED.normal, showChoices);
  }

  function buildChoices(scene, st, settings, onChoose) {
    const box = $choices();
    box.innerHTML = '';
    const list = SIG.Story.choices(st, scene);
    const cmds = list.filter((x) => x.c.cmd);
    const rest = list.filter((x) => !x.c.cmd);
    let chosen = false;
    const pick = (idx, opts) => {
      if (chosen || performance.now() < guardUntil) return;
      chosen = true;
      stopAll();
      onChoose(idx, opts || {});
    };
    if (cmds.length) {
      const row = el('div', 'cmds');
      for (const x of cmds) {
        const b = el('button', 'cmd', esc(x.c.t));
        b.disabled = x.locked;
        b.onclick = () => pick(x.idx);
        row.appendChild(b);
      }
      box.appendChild(row);
    }
    for (const x of rest) {
      const c = x.c;
      if (c.micro === 'hold') { box.appendChild(holdButton(c, () => pick(x.idx))); continue; }
      if (c.micro === 'rhythm') { box.appendChild(rhythmButton(c, () => pick(x.idx))); continue; }
      const b = el('button', 'choice' + (x.locked ? ' locked' : ''));
      b.innerHTML = rich(c.t) + (x.locked ? `<span class="lock">🔒 ${esc(lockLabel(c))}</span>` : '');
      b.disabled = x.locked;
      b.onclick = () => pick(x.idx);
      box.appendChild(b);
    }
    if (scene.timer && !settings.noTimer) startTimer(scene, box, () => pick(scene.timer.auto, { timedOut: true }));
  }

  function startTimer(scene, box, onEnd) {
    const bar = el('div', 'timer');
    const fill = el('div', 'timer-fill');
    bar.appendChild(fill);
    box.prepend(bar);
    const total = scene.timer.s * 1000;
    const t0 = performance.now();
    timer = { raf: 0 };
    const tick = (now) => {
      const k = Math.max(0, 1 - (now - t0) / total);
      fill.style.transform = `scaleX(${k})`;
      bar.classList.toggle('low', k < 0.3);
      if (k <= 0) { timer = null; vibrate([30, 40, 30]); onEnd(); return; }
      timer.raf = requestAnimationFrame(tick);
    };
    timer.raf = requestAnimationFrame(tick);
  }

  // Maintenir le doigt pour « nourrir » (1,4 s). Relâcher trop tôt annule sans pénalité.
  function holdButton(c, done) {
    const b = el('button', 'choice micro hold');
    b.innerHTML = `<span class="micro-fill"></span><span class="micro-label">${rich(c.t)}</span><span class="micro-hint">maintenir</span>`;
    const fill = b.querySelector('.micro-fill');
    const need = SIG.Game && SIG.Game.test ? 250 : 1400;
    let t0 = 0;
    let raf = 0;
    let lastBuzz = 0;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / need);
      fill.style.transform = `scaleX(${k})`;
      if (now - lastBuzz > 350) { lastBuzz = now; vibrate(8); }
      if (k >= 1) { stop(); vibrate([20, 30, 60]); SIG.Audio.beat(1.2); done(); guardUntil = performance.now() + 450; return; }
      raf = requestAnimationFrame(tick);
    };
    const start = (e) => { e.preventDefault(); t0 = performance.now(); lastBuzz = 0; b.classList.add('holding'); raf = requestAnimationFrame(tick); };
    const stop = () => { cancelAnimationFrame(raf); b.classList.remove('holding'); fill.style.transform = 'scaleX(0)'; };
    b.addEventListener('pointerdown', start);
    b.addEventListener('pointerup', stop);
    b.addEventListener('pointerleave', stop);
    b.addEventListener('pointercancel', stop);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
    b.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) start(e); });
    b.addEventListener('keyup', stop);
    microCleanup = stop;
    return b;
  }

  // Taper en rythme avec le battement : 4 taps justes, ou 10 taps au total (jamais bloquant).
  function rhythmButton(c, done) {
    const b = el('button', 'choice micro rhythm');
    b.innerHTML = `<span class="beat-dot"></span><span class="micro-label">${rich(c.t)}</span><span class="micro-hint">tape quand il bat · <b>0</b>/4</span>`;
    const dot = b.querySelector('.beat-dot');
    const count = b.querySelector('.micro-hint b');
    let good = 0;
    let taps = 0;
    let raf = 0;
    const loop = () => {
      const ph = SIG.Gfx.beat();
      const k = Math.max(0, 1 - Math.min(ph, 1 - ph) * 4);
      dot.style.transform = `scale(${0.6 + k * 0.8})`;
      dot.style.opacity = String(0.35 + k * 0.65);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const ph = SIG.Gfx.beat();
      taps++;
      if (Math.min(ph, 1 - ph) < 0.2 || SIG.Gfx.mode() === 'off') { good++; vibrate(12); SIG.Audio.beat(0.7); b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 120); }
      count.textContent = String(good);
      if (good >= 4 || taps >= 10) { cancelAnimationFrame(raf); done(); guardUntil = performance.now() + 450; }
    });
    microCleanup = () => cancelAnimationFrame(raf);
    return b;
  }

  function clear() {
    stopAll();
    $text().innerHTML = '';
    $choices().innerHTML = '';
    $choices().classList.remove('on');
  }

  function finishTyping() { if (typing) { typing.finish(); return true; } return false; }

  return { render, finishTyping, stopAll, clear, WHO };
})();
