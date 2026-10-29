// Audio génératif WebAudio, sans aucun fichier. Trois canaux réglables séparément :
//  - ambiance : notes longues et rares, tirées au hasard dans une gamme, avec des silences
//    (jamais la même boucle) ; peut être coupée seule ;
//  - texte : petits clics quand le texte apparaît ;
//  - battement : le cœur du motif, seulement pendant les micro-interactions et les révélations.
// Muet par défaut. Le contexte audio n'est créé qu'après un geste de l'utilisateur (règle mobile).
SIG.Audio = (function () {
  let ctx = null;
  let master = null;
  let ambBus = null;
  let ambFilter = null;
  let noiseBuf = null;
  let enabled = false;
  let lastClick = 0;
  let ambTimer = 0;
  let mood = { intensity: 0.5, mode: 'idle' };
  const ch = { ambiance: true, text: true, beat: true };

  // La mineur pentatonique, sur deux octaves graves : rien ne frotte, rien ne tourne en boucle.
  const SCALE = [110, 130.81, 146.83, 164.81, 196, 220, 261.63, 293.66, 329.63];

  function ensure() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
      buildAmbience();
      return true;
    } catch (e) { ctx = null; return false; }
  }

  // Bus d'ambiance : filtre doux + écho lent qui donne de l'espace.
  function buildAmbience() {
    ambBus = ctx.createGain();
    ambBus.gain.value = 0;
    ambFilter = ctx.createBiquadFilter();
    ambFilter.type = 'lowpass';
    ambFilter.frequency.value = 900;
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.9;
    const fb = ctx.createGain();
    fb.gain.value = 0.35;
    const wet = ctx.createGain();
    wet.gain.value = 0.4;
    ambBus.connect(ambFilter);
    ambFilter.connect(master);
    ambFilter.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(master);
  }

  // Une note : attaque lente, longue extinction. Parfois une quinte par-dessus.
  function playNote() {
    if (!ctx || !enabled || !ch.ambiance) return;
    const t = ctx.currentTime;
    const low = mood.mode === 'erase' ? 0 : Math.floor(mood.intensity * 3);
    const f = SCALE[Math.min(SCALE.length - 1, low + Math.floor(Math.random() * 5))];
    const voices = Math.random() < 0.3 ? [f, f * 1.5] : [f];
    const dur = 7 + Math.random() * 5;
    for (const fr of voices) {
      const o = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o2.type = 'triangle';
      o.frequency.value = fr;
      o2.frequency.value = fr * 2.001;
      const g2 = ctx.createGain();
      g2.gain.value = 0.18;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(voices.length > 1 ? 0.05 : 0.07, t + 2.5 + Math.random());
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      o2.connect(g2).connect(g);
      g.connect(ambBus);
      o.start(t); o2.start(t);
      o.stop(t + dur + 0.1); o2.stop(t + dur + 0.1);
    }
  }

  // Planifie la prochaine note après un intervalle irrégulier ; un silence de temps en temps.
  function scheduleAmbience() {
    clearTimeout(ambTimer);
    if (!enabled || !ch.ambiance) return;
    const gap = 5000 + Math.random() * 9000;
    ambTimer = setTimeout(() => {
      if (Math.random() > 0.25) playNote();
      scheduleAmbience();
    }, gap);
  }

  function setAmbienceLevel() {
    if (!ctx) return;
    ambBus.gain.setTargetAtTime(enabled && ch.ambiance ? 1 : 0, ctx.currentTime, 1.2);
  }

  function enable() {
    if (!ensure()) return false;
    const first = !enabled;
    enabled = true;
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.5);
    setAmbienceLevel();
    if (first && ch.ambiance) { playNote(); scheduleAmbience(); }
    return true;
  }

  function disable() {
    enabled = false;
    clearTimeout(ambTimer);
    if (ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  }

  // Canaux : { ambiance, text, beat } (booléens).
  function configure(c) {
    const wasAmb = ch.ambiance;
    Object.assign(ch, c);
    setAmbienceLevel();
    if (enabled && ch.ambiance && !wasAmb) { playNote(); scheduleAmbience(); }
    if (!ch.ambiance) clearTimeout(ambTimer);
  }

  // Humeur de la scène : la tension monte le registre et ouvre le filtre, sans changer le volume.
  function setMood(params) {
    const p = params || {};
    mood = { intensity: typeof p.intensity === 'number' ? p.intensity : 0.5, mode: p.mode || 'idle' };
    if (!ctx) return;
    ambFilter.frequency.setTargetAtTime(mood.mode === 'erase' ? 350 : 600 + mood.intensity * 900, ctx.currentTime, 2);
  }

  // Battement du motif : deux coups sourds, comme un cœur.
  function beat(strength) {
    if (!enabled || !ctx || !ch.beat) return;
    const t = ctx.currentTime;
    const s = typeof strength === 'number' ? strength : 1;
    [0, 0.16].forEach((dt, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(i ? 52 : 64, t + dt);
      o.frequency.exponentialRampToValueAtTime(34, t + dt + 0.18);
      g.gain.setValueAtTime(0.0001, t + dt);
      g.gain.exponentialRampToValueAtTime((i ? 0.16 : 0.24) * s, t + dt + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.25);
      o.connect(g).connect(master);
      o.start(t + dt);
      o.stop(t + dt + 0.3);
    });
  }

  // Clic de frappe, discret, hauteur légèrement variable, limité en fréquence.
  function click() {
    if (!enabled || !ctx || !ch.text) return;
    const now = performance.now();
    if (now - lastClick < 55) return;
    lastClick = now;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 2200 + Math.random() * 1400;
    f.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    src.connect(f).connect(g).connect(master);
    src.start();
  }

  // Révélation (message système, découverte) : une note cristalline, rangée avec le texte.
  function reveal() {
    if (!enabled || !ctx || !ch.text) return;
    const t = ctx.currentTime;
    [880, 1318.5].forEach((fr, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.0001, t + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.035, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 1.2);
      o.connect(g).connect(master);
      o.start(t + i * 0.08);
      o.stop(t + i * 0.08 + 1.3);
    });
  }

  function suspend(yes) {
    if (!ctx) return;
    try {
      if (yes) { clearTimeout(ambTimer); ctx.suspend(); } else if (enabled) { ctx.resume(); scheduleAmbience(); }
    } catch (e) { /* ignore */ }
  }

  return { enable, disable, configure, mood: setMood, beat, click, reveal, suspend, isOn: () => enabled };
})();
