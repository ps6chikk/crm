// Couche visuelle : un seul renderer, piloté par setVisual(preset, params).
// Mode 3D (Three.js) si WebGL est disponible et assez rapide, sinon fallback 2D (canvas).
// Le jeu reste 100 % jouable sans aucune des deux.
SIG.Gfx = (function () {
  const presets3d = {};
  const presets2d = {};
  let mode = 'off'; // '3d' | '2d' | 'off'
  let canvas3d = null;
  let canvas2d = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let current = null; // { name, inst }
  let params = {};
  let running = false;
  let paused = false;
  let viewing = false; // la carte est réduite : on contemple la scène
  let last = 0;
  let t = 0;
  let quality = 'high';
  let reduced = false;
  let onModeChange = null;
  const beatListeners = [];
  let beatPhase = 0;
  const fpsProbe = { frames: 0, time: 0, done: false, value: 0 };
  let drag = null;

  function hasWebGL() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  }

  function init(opts) {
    canvas3d = document.getElementById('bg3d');
    canvas2d = document.getElementById('bg2d');
    reduced = !!opts.reducedMotion;
    onModeChange = opts.onModeChange || null;
    const want3d = !opts.force2d && typeof THREE !== 'undefined' && hasWebGL();
    if (want3d) {
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: false, alpha: false, powerPreference: 'low-power' });
        renderer.setClearColor(0x040300, 1);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
        camera.position.set(0, 0, 14);
        mode = '3d';
      } catch (e) {
        renderer = null;
        mode = '2d';
      }
    } else {
      mode = '2d';
    }
    applyMode();
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { paused = document.hidden; if (!paused) loopStart(); });
    bindDrag();
    loopStart();
  }

  function applyMode() {
    canvas3d.style.display = mode === '3d' ? 'block' : 'none';
    canvas2d.style.display = mode === '2d' ? 'block' : 'none';
    document.documentElement.dataset.gfx = mode;
  }

  function pixelRatio() {
    const dpr = window.devicePixelRatio || 1;
    return Math.min(dpr, quality === 'high' ? 2 : 1);
  }

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (mode === '3d' && renderer) {
      renderer.setPixelRatio(pixelRatio());
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    } else if (canvas2d) {
      const pr = Math.min(window.devicePixelRatio || 1, 2);
      canvas2d.width = Math.floor(w * pr);
      canvas2d.height = Math.floor(h * pr);
    }
    if (current && current.inst.resize) current.inst.resize(w, h);
  }

  function build(name) {
    disposeCurrent();
    const table = mode === '3d' ? presets3d : presets2d;
    const def = table[name] || table.neutre;
    if (!def) return;
    const ctx = mode === '3d'
      ? { THREE, scene, camera, renderer, quality, reduced }
      : { canvas: canvas2d, g: canvas2d.getContext('2d'), quality, reduced };
    current = { name, inst: def.create(ctx) };
  }

  // Point d'entrée unique depuis le moteur.
  function setVisual(name, p) {
    if (mode === 'off') return;
    params = Object.assign({}, p || {});
    if (!current || current.name !== name) build(name);
    if (current && current.inst.setParams) current.inst.setParams(params);
  }

  // Libère géométries, matériaux et textures du preset courant.
  function disposeCurrent() {
    if (!current) return;
    try { current.inst.dispose && current.inst.dispose(); } catch (e) { /* ignore */ }
    if (mode === '3d' && scene) {
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of ms) { if (m.map) m.map.dispose(); m.dispose(); }
        }
      });
      while (scene.children.length) scene.remove(scene.children[0]);
      camera.position.set(0, 0, 14);
      camera.lookAt(0, 0, 0);
    }
    current = null;
  }

  function loopStart() {
    if (running || mode === 'off') return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }

  function frame(now) {
    if (paused || mode === 'off') { running = false; return; }
    const dtRaw = Math.min(0.1, (now - last) / 1000);
    // En lecture, la scène est derrière la carte : 30 images/s suffisent et économisent la batterie.
    // Pendant la mesure de démarrage, pas de plafond : on veut la vraie capacité de l'appareil.
    const minDt = viewing || !fpsProbe.done ? 0 : 1 / 31;
    if (dtRaw < minDt) { requestAnimationFrame(frame); return; }
    last = now;
    const dt = reduced ? dtRaw * 0.35 : dtRaw;
    t += dt;
    probeFps(dtRaw);
    tickBeat(dt);
    if (current && current.inst.update) current.inst.update(dt, t, { viewing, drag: drag && drag.delta });
    if (drag) drag.delta = { x: 0, y: 0 };
    if (mode === '3d' && renderer) renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  // Mesure les images/s au démarrage (après 0,6 s de chauffe) et dégrade si besoin.
  function probeFps(dt) {
    if (fpsProbe.done || mode !== '3d') return;
    fpsProbe.time += dt;
    if (fpsProbe.time < 0.6) return;
    fpsProbe.frames++;
    if (fpsProbe.time >= 2.6) {
      fpsProbe.done = true;
      fpsProbe.value = fpsProbe.frames / (fpsProbe.time - 0.6);
      if (fpsProbe.value < 24) fallbackTo2d('lent');
      else if (fpsProbe.value < 45 && quality === 'high') setQuality('low');
    }
  }

  function setQuality(q) {
    quality = q;
    resize();
    if (current) { const n = current.name; current = null; build(n); setVisual(n, params); }
  }

  function fallbackTo2d(reason) {
    disposeCurrent();
    try { renderer && renderer.dispose(); } catch (e) { /* ignore */ }
    renderer = null;
    mode = '2d';
    applyMode();
    resize();
    if (onModeChange) onModeChange(mode, reason);
  }

  // Battement partagé : le visuel et l'audio battent ensemble.
  function tickBeat(dt) {
    const bpm = typeof params.bpm === 'number' ? params.bpm : 52;
    const active = ['pulse', 'anomaly', 'fragment', 'contain', 'ignore', 'examine'].includes(params.mode);
    beatPhase += dt * (bpm / 60);
    if (beatPhase >= 1) {
      beatPhase -= 1;
      if (active) for (const fn of beatListeners) fn(params);
    }
  }
  function beat() { return beatPhase; }

  function bindDrag() {
    const target = document.getElementById('stage');
    if (!target) return;
    target.addEventListener('pointerdown', (e) => {
      if (!viewing) return;
      drag = { x: e.clientX, y: e.clientY, delta: { x: 0, y: 0 } };
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      drag.delta.x += e.clientX - drag.x;
      drag.delta.y += e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
    });
    window.addEventListener('pointerup', () => { drag = null; });
  }

  // Décalage vertical (fraction de la demi-hauteur) pour cadrer le sujet dans la bande au-dessus
  // de la carte de texte. Nul sur les petits écrans, où la carte occupe tout.
  function bandOffset() {
    const card = document.getElementById('card');
    if (!card || window.innerHeight < 640) return 0;
    const hud = 70;
    const top = card.getBoundingClientRect().top;
    if (top <= hud + 20) return 0;
    const bandCenter = (hud + top) / 2;
    return (window.innerHeight / 2 - bandCenter) / (window.innerHeight / 2);
  }

  return {
    init, setVisual, bandOffset, disposeCurrent, setQuality,
    setViewing: (v) => { viewing = !!v; },
    setReduced: (v) => { reduced = !!v; },
    onBeat: (fn) => beatListeners.push(fn),
    beat,
    mode: () => mode,
    fps: () => fpsProbe.value,
    quality: () => quality,
    register3d: (name, def) => { presets3d[name] = def; },
    register2d: (name, def) => { presets2d[name] = def; },
  };
})();
