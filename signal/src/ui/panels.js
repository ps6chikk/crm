// Panneau latéral : journal des décisions, codex, sauvegardes, fins découvertes, réglages.
SIG.UI.panels = (function () {
  const { el, esc, rich, toast, confirmBox } = SIG.UI.fx;
  const Save = SIG.Save;
  const TABS = [
    ['journal', 'Journal'], ['codex', 'Codex'], ['saves', 'Sauvegardes'], ['endings', 'Fins'], ['settings', 'Réglages'],
  ];
  let current = 'journal';

  function open(tab) {
    current = tab || current;
    const ov = document.getElementById('panel');
    ov.innerHTML = '';
    const head = el('div', 'panel-head');
    const tabs = el('div', 'tabs');
    for (const [id, label] of TABS) {
      const b = el('button', 'tab' + (id === current ? ' on' : ''), label);
      b.onclick = () => open(id);
      tabs.appendChild(b);
    }
    const close = el('button', 'icon close', '✕');
    close.setAttribute('aria-label', 'Fermer');
    close.onclick = closePanel;
    head.append(tabs, close);
    ov.appendChild(head);
    const body = el('div', 'panel-body');
    ({ journal, codex, saves, endings, settings })[current](body);
    ov.appendChild(body);
    ov.classList.add('on');
  }

  function closePanel() { document.getElementById('panel').classList.remove('on'); }

  function journal(body) {
    const st = SIG.Game.state;
    if (!st || !st.journal.length) { body.appendChild(el('p', 'empty', 'Aucune décision pour le moment.')); return; }
    let lastCh = null;
    for (const j of st.journal) {
      if (j.ch !== lastCh) {
        const ch = SIG.Story.chapter(j.ch);
        body.appendChild(el('h3', '', esc(ch ? `${ch.n} · ${ch.title}` : j.ch)));
        lastCh = j.ch;
      }
      body.appendChild(el('div', 'jrow' + (j.mark ? ' mark' : ''), `<span>${esc(j.t || '')}</span>${esc(j.txt)}`));
    }
    const ch = SIG.Story.chapter(st.ch);
    const gauges = el('div', 'gauges-all');
    const names = { conscience: 'Conscience', lien: 'Lien', risque: 'Risque', integrite: 'Intégrité', credibilite: 'Crédibilité', alliance: 'Alliance' };
    for (const [k, label] of Object.entries(names)) gauges.appendChild(el('div', 'gline', `${label}<i><b style="width:${st.s[k]}%"></b></i>`));
    body.appendChild(el('h3', '', 'État'));
    body.appendChild(gauges);
    if (ch) body.appendChild(el('p', 'note', `${st.screens} écrans · ${st.words} mots · ${st.choices} choix`));
  }

  function codex(body) {
    const meta = Save.meta();
    const st = SIG.Game.state;
    const have = new Set([...(meta.codex || []), ...((st && st.codex) || [])]);
    const all = Object.entries(SIG.data.codex);
    body.appendChild(el('p', 'note', `${[...have].filter((k) => SIG.data.codex[k]).length} / ${all.length} entrées découvertes`));
    const cats = {};
    for (const [id, e] of all) (cats[e.cat] = cats[e.cat] || []).push([id, e]);
    for (const [cat, list] of Object.entries(cats)) {
      body.appendChild(el('h3', '', esc(cat)));
      for (const [id, e] of list) {
        if (have.has(id)) {
          const d = el('details', 'codex-entry');
          d.appendChild(el('summary', '', esc(e.title)));
          d.appendChild(el('p', 'mono', rich(e.text)));
          body.appendChild(d);
        } else {
          body.appendChild(el('div', 'codex-entry locked', '▒▒▒▒ entrée non découverte'));
        }
      }
    }
  }

  function saves(body) {
    const st = SIG.Game.state;
    for (const slot of Save.SLOTS) {
      const v = Save.loadSlot(slot);
      const row = el('div', 'slot');
      const name = slot === 'auto' ? 'Automatique' : `Emplacement ${slot}`;
      const when = v ? new Date(v.at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : 'vide';
      row.appendChild(el('div', 'slot-info', `<b>${name}</b><span>${v ? esc(v.label) + ' · ' : ''}${when}</span>`));
      const btns = el('div', 'slot-btns');
      if (slot !== 'auto' && st && !document.body.classList.contains('at-title')) {
        const s = el('button', 'btn small', 'Sauver');
        s.onclick = async () => {
          if (v && !(await confirmBox('Écraser cette sauvegarde ?', 'Écraser'))) return;
          Save.saveSlot(slot, st);
          toast('Partie sauvegardée.');
          open('saves');
        };
        btns.appendChild(s);
      }
      if (v) {
        const l = el('button', 'btn small ghost', 'Charger');
        l.onclick = () => { closePanel(); SIG.Game.loadState(v.state); };
        btns.appendChild(l);
      }
      row.appendChild(btns);
      body.appendChild(row);
    }
    if (!Save.available()) body.appendChild(el('p', 'note', 'Stockage indisponible sur cet appareil : les sauvegardes ne durent que le temps de la session.'));
    if (!document.body.classList.contains('at-title')) {
      const q = el('button', 'btn ghost', "Quitter vers l'écran titre");
      q.onclick = () => SIG.Game.toTitle();
      body.appendChild(q);
    }
  }

  function endings(body) {
    const meta = Save.meta();
    const fins = Object.values(SIG.data.scenes).filter((s) => s.kind === 'fin' && s.fin.type !== 'tbc');
    for (const type of ['saga', 'early']) {
      const list = fins.filter((s) => s.fin.type === type);
      if (!list.length) continue;
      body.appendChild(el('h3', '', type === 'saga' ? 'Fins de saga' : 'Fins précoces'));
      for (const s of list) {
        const got = meta.endings.includes(s.fin.id);
        body.appendChild(el('div', 'end-row' + (got ? ' got' : ''), got ? esc(s.fin.title) : '▒▒▒▒▒▒▒'));
      }
    }
    if (meta.endings.length) {
      const b = el('button', 'btn small ghost', 'Effacer les fins découvertes');
      b.onclick = async () => { if (await confirmBox('Effacer la liste des fins découvertes ?', 'Effacer')) { Save.clearEndings(); open('endings'); } };
      body.appendChild(b);
    }
  }

  function settings(body) {
    const s = SIG.Game.settings;
    const row = (label, ctrl) => { const r = el('label', 'set-row'); r.appendChild(el('span', '', label)); r.appendChild(ctrl); body.appendChild(r); };
    const select = (key, opts) => {
      const sel = el('select');
      for (const [v, l] of opts) { const o = el('option', '', l); o.value = v; if (String(s[key]) === String(v)) o.selected = true; sel.appendChild(o); }
      sel.onchange = () => { s[key] = typeof s[key] === 'number' ? Number(sel.value) : sel.value; SIG.Game.saveSettings(); };
      return sel;
    };
    const toggle = (key, after) => {
      const c = el('input');
      c.type = 'checkbox';
      c.checked = !!s[key];
      c.onchange = () => { s[key] = c.checked; SIG.Game.saveSettings(); if (after) after(); };
      return c;
    };
    row('Taille du texte', select('textSize', [[0, 'Petite'], [1, 'Normale'], [2, 'Grande'], [3, 'Très grande']]));
    row('Vitesse du texte', select('textSpeed', [['slow', 'Lente'], ['normal', 'Normale'], ['fast', 'Rapide'], ['instant', 'Instantanée']]));
    row('Mode sans minuteur', toggle('noTimer'));
    row('Son (général)', toggle('sound'));
    row('Ambiance musicale', select('ambiance', [['douce', 'Douce'], ['off', 'Aucune']]));
    row('Bruit du texte', toggle('sfxText'));
    row('Battement du motif', toggle('sfxBeat'));
    row('Vibrations', toggle('vibration'));
    row('Réduire les animations', toggle('reducedMotion'));
    row('Mode 2D (sans 3D)', toggle('force2d', () => toast('Pris en compte au prochain lancement du jeu.')));
    row('Afficher les i/s (test)', toggle('showFps', () => SIG.Game.showFps(s.showFps)));
    body.appendChild(el('p', 'note', `Rendu actuel : ${SIG.Gfx.mode() === '3d' ? '3D' : '2D'} · qualité ${SIG.Gfx.quality()}${SIG.Gfx.fps() ? ' · ' + Math.round(SIG.Gfx.fps()) + ' i/s mesurées' : ''}`));
  }

  return { open, close: closePanel };
})();
