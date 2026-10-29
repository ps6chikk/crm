// Sauvegardes : 3 emplacements manuels + 1 automatique, réglages, méta (fins, codex).
// localStorage peut être indisponible (navigation privée, file://, quota) : tout est
// entouré de try/catch et le jeu continue en mémoire.
SIG.Save = (function () {
  const P = 'signal.integrale.v1.';
  const mem = {};
  let ok = true;

  function read(key) {
    try {
      const raw = window.localStorage.getItem(P + key);
      return raw ? JSON.parse(raw) : (mem[key] || null);
    } catch (e) { ok = false; return mem[key] || null; }
  }
  function write(key, val) {
    mem[key] = val;
    try { window.localStorage.setItem(P + key, JSON.stringify(val)); return true; } catch (e) { ok = false; return false; }
  }
  function remove(key) {
    delete mem[key];
    try { window.localStorage.removeItem(P + key); } catch (e) { ok = false; }
  }

  const SLOTS = ['auto', '1', '2', '3'];

  function saveSlot(slot, st) {
    const sc = SIG.data.scenes[st.scene];
    const ch = SIG.Story.chapter(st.ch);
    return write('slot.' + slot, {
      at: Date.now(),
      label: (ch ? ch.title : '') + (sc && sc.time ? ' · ' + sc.time : ''),
      state: st,
    });
  }
  function loadSlot(slot) { const v = read('slot.' + slot); return v && v.state ? v : null; }
  function clearSlot(slot) { remove('slot.' + slot); }

  function meta() { return read('meta') || { endings: [], codex: [] }; }
  function addMeta(kind, id) {
    const m = meta();
    if (!m[kind].includes(id)) { m[kind].push(id); write('meta', m); }
  }
  function clearEndings() { const m = meta(); m.endings = []; write('meta', m); }

  const DEFAULT_SETTINGS = {
    textSize: 1, textSpeed: 'normal', noTimer: false, sound: false, vibration: true,
    reducedMotion: false, force2d: false, showFps: false,
  };
  function settings() { return Object.assign({}, DEFAULT_SETTINGS, read('settings') || {}); }
  function saveSettings(s) { write('settings', s); }

  return {
    SLOTS, saveSlot, loadSlot, clearSlot, meta, addMeta, clearEndings, settings, saveSettings,
    available: () => ok,
  };
})();
