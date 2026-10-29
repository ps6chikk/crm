// Espace de noms unique partagé par tous les fichiers sources (navigateur et outils Node).
var SIG = (typeof SIG !== 'undefined' && SIG) || {};
SIG.data = SIG.data || { scenes: {}, chapters: [], codex: {}, endings: {} };

SIG.util = (function () {
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  // Générateur pseudo-aléatoire à graine (mulberry32) : parties rejouables à l'identique.
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function countWords(text) {
    if (!text) return 0;
    const m = String(text).replace(/\{\{[^}]*\}\}/g, 'x').match(/[A-Za-zÀ-ÿ0-9œŒæÆ'’-]+/g);
    return m ? m.length : 0;
  }

  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

  return { clamp, rng, countWords, deepCopy };
})();

// Déclare un lot de scènes. Les doublons sont une erreur (attrapée par validate).
SIG.addScenes = function (chapterId, scenes) {
  SIG.data.dupes = SIG.data.dupes || [];
  for (const id of Object.keys(scenes)) {
    if (SIG.data.scenes[id]) SIG.data.dupes.push(id);
    const s = scenes[id];
    s.id = id;
    s.ch = s.ch || chapterId;
    SIG.data.scenes[id] = s;
  }
};

SIG.addChapter = function (ch) { SIG.data.chapters.push(ch); };
SIG.addCodex = function (entries) { Object.assign(SIG.data.codex, entries); };
