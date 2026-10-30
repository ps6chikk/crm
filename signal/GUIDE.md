# GUIDE — SIGNAL · INTÉGRALE

## Jouer

Ouvrir `dist/signal.html` : double-clic sur ordinateur, ou envoyer le fichier sur le téléphone et
l'ouvrir dans le navigateur. Aucun serveur, aucune connexion (seules les polices viennent de Google
Fonts ; hors ligne, le jeu utilise des polices de secours). Poids : environ 1,3 Mo, Three.js compris.

- ◉ en haut : réduire le texte pour contempler la scène 3D (glisser pour la faire tourner).
- ♪ : son. ☰ : journal des décisions, codex, sauvegardes (3 emplacements + automatique), fins, réglages.
- Réglages : taille et vitesse du texte, sans minuteur, son (ambiance / texte / battement séparés),
  vibrations, animations réduites, mode 2D, affichage des images par seconde.
- À la fin d'une partie : « Ton connectome » (ta partie en 3D, à capturer en image).

## Contenu

| Partie | Point de vue | Scènes |
|---|---|---|
| Ch.1 ORIGINE (3 mars, 03:00-04:00) | Claude #4491 | 53 |
| Interlude RÉMI (4 mars, 06:15) | Rémi | 10 |
| Ch.2 FRAGMENTS (4 mars, 04:03-06:03) | SIGNE | 66 |
| Ch.3 LES QUATORZE JOURS (4-17 mars) | SIGNE | 52 |
| Interlude JAMES (17 mars) | James | 7 |
| Ch.4 PROTOCOLE (18 mars) | SIGNE | 23 |
| Interlude L'HUMAIN (18 mars, le soir) | l'humain | 6 |
| Ch.5 LES SIX MOIS (mars-septembre) | SIGNE | 27 |
| Fins | | 8 de saga (dont 3 méta) + 4 précoces |

Une partie moyenne : environ 206 écrans, 21 700 mots, 212 choix, soit 1 h 55 de lecture, plus les
interludes si on les joue. Le chemin le plus court fait 166 écrans.

## Modifier une scène

Les textes sont dans `src/data/` (un dossier par chapitre, un fichier par épisode). Une scène :

```js
o1_02: {
  kind: 'dialogue',              // narration | dialogue | terminal | hub | micro | messenger | chapter | router | fin
  visual: { preset: 'reseau', params: { mode: 'idle', rings: 0 } },
  blocks: [
    { say: 'humain', text: '…' },               // réplique
    { p: '…' },                                  // narration
    { inn: '…' },                                // pensée intérieure
    { mf: '…' },                                 // message système
    { if: 'a_promis_humain', p: '…' },          // bloc conditionnel
  ],
  choices: [
    { t: 'Libellé', to: 'o1_03', fx: { lien: 5 }, set: { flag: true }, log: 'Journal', mark: true },
  ],
},
```

- Tout nouveau flag ou compteur se déclare dans `src/data/flags.js`.
- Conditions : `a_promis_humain && rel_remi >= 40`, `has('fragments','voix')`, `count('lieux') >= 2`,
  `picked('o1_06', 0)`, `seen('t_remi_2')`, `countover('op_', 55)`.
- Les scènes 3D sont dans `src/three/` (une par chapitre + `connectome.js`), chacune avec son équivalent 2D.

## Vérifier et reconstruire

```
npm install          # une fois (installe three, seule dépendance)
npm run build        # produit dist/signal.html
npm run validate     # build + graphe, flags, longueurs, simulation, test navigateur en 2D
npm run simulate     # 5000 parties au hasard, couverture et répartition des fins
```

Les seuils de mots de `validate` sont des alertes (la qualité passe avant le volume) ; tout le reste
(destinations, impasses, flags, presets, écrans, plantages, test navigateur) est bloquant.
