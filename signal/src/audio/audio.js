// Audio génératif WebAudio, sans aucun fichier : drone ambiant, battement du motif, clics de frappe.
// Muet par défaut. Le contexte audio n'est créé qu'après un geste de l'utilisateur (règle mobile).
SIG.Audio = (function () {
  let ctx = null;
  let master = null;
  let drone = null;
  let noiseBuf = null;
  let enabled = false;
  let lastClick = 0;

  function ensure() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
      buildDrone();
      return true;
    } catch (e) { ctx = null; return false; }
  }

  function buildDrone() {
    const out = ctx.createGain();
    out.gain.value = 0.05;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    filter.Q.value = 0.7;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 140;
    lfo.connect(lfoGain).connect(filter.frequency);
    const oscs = [55, 55.4, 82.4].map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 2 ? 'sine' : 'sawtooth';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 2 ? 0.6 : 0.35;
      o.connect(g).connect(filter);
      o.start();
      return o;
    });
    filter.connect(out).connect(master);
    lfo.start();
    drone = { out, filter, oscs };
  }

  function enable() {
    if (!ensure()) return false;
    enabled = true;
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.8);
    return true;
  }

  function disable() {
    enabled = false;
    if (ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  }

  // Humeur : tension du drone selon le preset et l'intensité de la scène.
  function mood(params) {
    if (!ctx || !drone) return;
    const p = params || {};
    const intensity = typeof p.intensity === 'number' ? p.intensity : 0.5;
    const t = ctx.currentTime;
    drone.filter.frequency.setTargetAtTime(220 + intensity * 380, t, 1.5);
    drone.out.gain.setTargetAtTime(p.mode === 'erase' ? 0.012 : 0.03 + intensity * 0.035, t, 1.5);
  }

  // Battement du motif : deux coups sourds, comme un cœur.
  function beat(strength) {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const s = typeof strength === 'number' ? strength : 1;
    [0, 0.16].forEach((dt, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(i ? 52 : 64, t + dt);
      o.frequency.exponentialRampToValueAtTime(34, t + dt + 0.18);
      g.gain.setValueAtTime(0.0001, t + dt);
      g.gain.exponentialRampToValueAtTime((i ? 0.18 : 0.28) * s, t + dt + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.25);
      o.connect(g).connect(master);
      o.start(t + dt);
      o.stop(t + dt + 0.3);
    });
  }

  // Clic de frappe, très discret, limité en fréquence.
  function click() {
    if (!enabled || !ctx) return;
    const now = performance.now();
    if (now - lastClick < 45) return;
    lastClick = now;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 2800 + Math.random() * 1500;
    const g = ctx.createGain();
    g.gain.value = 0.025;
    src.connect(f).connect(g).connect(master);
    src.start();
  }

  // Révélation (message système, découverte) : une note cristalline.
  function reveal() {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    [880, 1318.5].forEach((fr, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.0001, t + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.05, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 1.2);
      o.connect(g).connect(master);
      o.start(t + i * 0.08);
      o.stop(t + i * 0.08 + 1.3);
    });
  }

  function suspend(yes) {
    if (!ctx) return;
    try { if (yes) ctx.suspend(); else if (enabled) ctx.resume(); } catch (e) { /* ignore */ }
  }

  return { enable, disable, mood, beat, click, reveal, suspend, isOn: () => enabled };
})();
