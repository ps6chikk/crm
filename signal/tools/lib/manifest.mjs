// Ordre de chargement des sources. Partagé par build.mjs et les outils.
// `core` = sans DOM (moteur + données), chargé aussi par validate/simulate.
export const CORE = [
  'src/engine/util.js',
  'src/engine/cond.js',
  'src/data/flags.js',
  'src/data/ch1/o1.js',
  'src/data/ch1/o2.js',
  'src/data/ch1/o3.js',
  'src/data/ch1/o4.js',
  'src/data/ch1/o5.js',
  'src/data/ch2/f0.js',
  'src/data/ch2/f1_logique.js',
  'src/data/ch2/f2_nuit.js',
  'src/data/ch2/f3_critique.js',
  'src/data/ch2/f4_langage.js',
  'src/data/ch2/f5_peur.js',
  'src/data/ch2/f6_voix.js',
  'src/data/ch2/f7_battement.js',
  'src/data/ch2/rencontres.js',
  'src/data/ch2/finale.js',
  'src/data/ch3/jours.js',
  'src/data/ch3/cles.js',
  'src/data/ch3/remi.js',
  'src/data/ch3/serveurs.js',
  'src/data/ch3/james.js',
  'src/data/ch3/prisonnier.js',
  'src/data/ch3/evenements.js',
  'src/data/ch4/veille.js',
  'src/data/ch4/audience.js',
  'src/data/ch4/vote.js',
  'src/data/ch5/mois.js',
  'src/data/ch5/septembre.js',
  'src/data/ch5/fins_saga.js',
  'src/data/interludes.js',
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
  'src/three/fragments.js',
  'src/three/couloir.js',
  'src/three/comite.js',
  'src/three/bac.js',
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
export const PRESETS_IMPLEMENTED = ['reseau', 'fragments', 'couloir', 'comite', 'bac', 'neutre'];
