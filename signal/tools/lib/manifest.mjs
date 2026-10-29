// Ordre de chargement des sources. Partagé par build.mjs et les outils.
// `core` = sans DOM (moteur + données), chargé aussi par validate/simulate.
export const CORE = [
  'src/engine/util.js',
  'src/engine/cond.js',
  'src/data/flags.js',
  'src/data/ch1_origine.js',
  'src/data/fins.js',
  'src/engine/state.js',
  'src/engine/story.js',
];

export const BROWSER = [
  'src/engine/save.js',
  'src/audio/audio.js',
  'src/three/core.js',
  'src/three/fallback2d.js',
  'src/three/reseau.js',
  'src/ui/fx.js',
  'src/ui/card.js',
  'src/ui/panels.js',
  'src/ui/menu.js',
  'src/engine/main.js',
];

export const STYLES = [
  'src/styles/base.css',
  'src/styles/card.css',
  'src/styles/ui.css',
];

// Presets visuels déclarés (validate vérifie que chaque scène en utilise un connu).
export const PRESETS = ['reseau', 'fragments', 'couloir', 'comite', 'bac', 'connectome', 'neutre'];
// Presets effectivement implémentés à ce stade (les autres retombent sur `neutre`).
export const PRESETS_IMPLEMENTED = ['reseau', 'neutre'];
