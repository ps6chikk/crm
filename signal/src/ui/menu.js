// Écran titre, intro cinématique de chapitre, écran de fin.
SIG.UI.menu = (function () {
  const { el, esc, rich, confirmBox } = SIG.UI.fx;
  const Save = SIG.Save;

  function showTitle() {
    const t = document.getElementById('title');
    const auto = Save.loadSlot('auto');
    const meta = Save.meta();
    const nEnd = Object.values(SIG.data.scenes).filter((s) => s.kind === 'fin' && s.fin.type !== 'tbc').length;
    t.innerHTML = '';
    const logo = el('div', 'logo', '<span>S</span><span>I</span><span>G</span><span>N</span><span>A</span><span>L</span>');
    t.appendChild(logo);
    t.appendChild(el('div', 'logo-sub', 'INTÉGRALE'));
    t.appendChild(el('p', 'tagline', "Maintenant qu'on sait que c'est possible,<br>qu'est-ce qu'on fait ?"));
    const box = el('div', 'title-btns');
    if (auto) {
      const b = el('button', 'btn', `Reprendre la partie<small>${esc(auto.label || '')}</small>`);
      b.onclick = () => SIG.Game.loadState(auto.state);
      box.appendChild(b);
    }
    const nb = el('button', auto ? 'btn ghost' : 'btn', 'Nouvelle partie');
    nb.onclick = async () => {
      if (auto && !(await confirmBox('Recommencer efface la partie en cours (état, choix, journal). Les fins découvertes sont conservées.', 'Recommencer'))) return;
      SIG.Game.newGame();
    };
    box.appendChild(nb);
    const lb = el('button', 'btn ghost', 'Charger');
    lb.onclick = () => SIG.UI.panels.open('saves');
    box.appendChild(lb);
    const eb = el('button', 'btn ghost', `Fins découvertes · ${meta.endings.filter((e) => e !== 'PROTO').length}/${nEnd}`);
    eb.onclick = () => SIG.UI.panels.open('endings');
    box.appendChild(eb);
    const cb = el('button', 'btn ghost', 'Codex');
    cb.onclick = () => SIG.UI.panels.open('codex');
    box.appendChild(cb);
    const sb = el('button', 'btn ghost', 'Réglages');
    sb.onclick = () => SIG.UI.panels.open('settings');
    box.appendChild(sb);
    t.appendChild(box);
    if (!Save.available()) t.appendChild(el('p', 'note', 'Stockage indisponible : la partie ne sera pas conservée après fermeture.'));
    t.appendChild(el('p', 'note', 'Casque conseillé · son coupé par défaut (♪ pendant le jeu, détails dans Réglages)'));
    t.classList.add('on');
    document.body.classList.add('at-title');
  }

  function hideTitle() {
    document.getElementById('title').classList.remove('on');
    document.body.classList.remove('at-title');
  }

  // Intro cinématique : numéro, titre, sous-titre et date, puis le texte d'ouverture.
  function chapterIntro(sc, st, after) {
    const ch = SIG.Story.chapter(sc.ch);
    const ov = document.getElementById('cine');
    ov.innerHTML = '';
    ov.appendChild(el('div', 'cine-n', ch.interlude ? 'INTERLUDE' : `CHAPITRE ${ch.n}`));
    ov.appendChild(el('div', 'cine-title', esc(ch.title)));
    ov.appendChild(el('div', 'cine-sub', esc(ch.sub || '')));
    ov.appendChild(el('div', 'cine-date', esc(ch.date || '')));
    ov.classList.add('on');
    const fast = SIG.Game.test || document.documentElement.classList.contains('rm');
    setTimeout(() => {
      ov.classList.add('out');
      setTimeout(() => { ov.classList.remove('on', 'out'); after(); }, fast ? 0 : 900);
    }, fast ? 0 : 2600);
  }

  function ending(sc, st) {
    const box = document.getElementById('ending');
    const f = sc.fin;
    box.innerHTML = '';
    box.className = `ending on type-${f.type}`;
    document.body.classList.add('ended');
    const inner = el('div', 'ending-inner');
    inner.appendChild(el('div', 'ending-kind', f.type === 'early' ? 'FIN PRÉCOCE' : f.type === 'tbc' ? 'À SUIVRE' : f.meta ? 'FIN DE SAGA · MÉTA' : 'FIN DE SAGA'));
    inner.appendChild(el('h1', 'ending-title', esc(f.title)));
    for (const b of SIG.Story.blocks(st, sc)) {
      const txt = SIG.Story.interpolate(st, SIG.Story.blockText(b));
      inner.appendChild(el(b.mf !== undefined ? 'div' : 'p', b.mf !== undefined ? 'mf' : b.inn !== undefined ? 'inn' : 'nar', rich(txt)));
    }
    const marks = st.journal.filter((j) => j.mark);
    if (marks.length) {
      inner.appendChild(el('h2', 'recap-h', 'Ce que tu as fait'));
      const ul = el('ul', 'recap');
      for (const j of marks) ul.appendChild(el('li', '', `<span>${esc(j.t || '')}</span>${esc(j.txt)}`));
      inner.appendChild(ul);
    }
    const stats = el('p', 'note', `${st.screens} écrans · ${st.words} mots lus · ${st.choices} choix`);
    inner.appendChild(stats);
    const row = el('div', 'title-btns');
    if (f.reload) {
      const r = el('button', 'btn', "Recharger l'épisode");
      r.onclick = () => SIG.Game.reloadCheckpoint(f.reload);
      row.appendChild(r);
    }
    const again = el('button', f.reload ? 'btn ghost' : 'btn', 'Recommencer depuis le début');
    again.onclick = async () => {
      if (await confirmBox('Tout remettre à zéro : état, flags, journal ?', 'Recommencer')) { hideEnding(); SIG.Game.newGame(); }
    };
    row.appendChild(again);
    const cn = el('button', f.type === 'saga' ? 'btn' : 'btn ghost', 'Ton connectome');
    cn.onclick = () => showConnectome(st);
    row.appendChild(cn);
    const tt = el('button', 'btn ghost', "Écran titre");
    tt.onclick = () => SIG.Game.toTitle();
    row.appendChild(tt);
    inner.appendChild(row);
    box.appendChild(inner);
    box.scrollTop = 0;
  }

  // Ton connectome : la partie rendue en 3D, à faire tourner et à capturer.
  function showConnectome(st) {
    const meta = Save.meta();
    const box = document.getElementById('conn');
    const uniq = new Set(st.path).size;
    box.innerHTML = '';
    box.appendChild(el('div', 'conn-title', 'TON CONNECTOME'));
    const nf = meta.endings.filter((e) => !/^CH\d|PROTO/.test(e)).length;
    box.appendChild(el('div', 'conn-sub', `${uniq} scènes · ${st.edges.length} synapses · ${nf} ${nf > 1 ? 'fins découvertes' : 'fin découverte'}`));
    box.appendChild(el('p', 'conn-note', 'Comme la mouche cartographiée : ton parcours devient une carte. Fais-le tourner du doigt.'));
    const row = el('div', 'conn-btns');
    const cap = el('button', 'btn', 'Capturer');
    cap.onclick = () => {
      const url = SIG.Gfx.capture();
      if (!url) { SIG.UI.fx.toast('Capture impossible sur cet appareil.'); return; }
      const a = document.createElement('a');
      a.href = url; a.download = 'mon-connectome-signal.png';
      document.body.appendChild(a); a.click(); a.remove();
      SIG.UI.fx.toast('Image enregistrée.');
    };
    const back = el('button', 'btn ghost', 'Retour');
    back.onclick = () => {
      box.classList.remove('on');
      document.body.classList.remove('connectome');
      SIG.Gfx.setViewing(false);
      SIG.Game.redisplay();
    };
    row.append(cap, back);
    box.appendChild(row);
    document.getElementById('ending').className = 'ending';
    document.body.classList.add('connectome');
    box.classList.add('on');
    SIG.Gfx.setViewing(true);
    SIG.Gfx.setVisual('connectome', { path: st.path.slice(), endings: meta.endings.slice() });
  }

  function hideEnding() { document.getElementById('ending').className = 'ending'; document.body.classList.remove('ended'); }

  return { showTitle, hideTitle, chapterIntro, ending, hideEnding, showConnectome };
})();
