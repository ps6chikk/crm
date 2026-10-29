// Seuils de longueur. Les budgets par chapitre viennent de PLAN.md (section 5).
// Pendant la construction, seuls les chapitres marqués `complete: true` comptent, au prorata.
// Les seuils de mots sont des alertes depuis le 29/10 (la qualité passe avant le volume) ;
// les seuils d'écrans restent bloquants.
export const GLOBAL = {
  minScreens: 150, minWords: 30000, // chemin le plus court jusqu'à une fin de saga
  avgScreens: 200, avgWords: 40000, // cible de la partie moyenne (alerte si non atteinte)
  failAvgScreens: 180, failAvgWords: 36000, // en dessous : échec
  reachLast: 0.8, // part des parties qui atteignent le dernier chapitre écrit
};

export const BUDGET = {
  ch1: { min: 31, minWords: 5900, avg: 34, avgWords: 6500 },
  ch2: { min: 42, minWords: 8700, avg: 49, avgWords: 10000 },
  ch3: { min: 56, minWords: 10100, avg: 62, avgWords: 11900 },
  ch4: { min: 29, minWords: 5400, avg: 31, avgWords: 5700 },
  ch5: { min: 31, minWords: 6900, avg: 36, avgWords: 7600 },
};

export const NARRATION_MIN_WORDS = 200;
export const DIALOGUE_MIN_WORDS = 60;
