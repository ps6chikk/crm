# GUIDE

## Jouer

Ouvrir `dist/signal.html` (double-clic, ou transférer le fichier sur le téléphone et l'ouvrir dans
le navigateur). Aucun serveur, aucune connexion nécessaire (seules les polices viennent de Google
Fonts ; sans réseau, le jeu utilise des polices de secours).

- ◉ en haut : réduire le texte pour contempler la scène (glisser pour la faire tourner).
- ♪ : son (coupé par défaut). ☰ : journal, codex, sauvegardes, fins, réglages.
- Réglages → « Afficher les i/s » pour voir la fluidité ; « Mode 2D » si ça rame.

## Modifier une scène

Les textes sont dans `src/data/` (un fichier par chapitre, `fins.js` pour les fins). Une scène :

```js
o1_02: {
  kind: 'dialogue',              // narration | dialogue | terminal | hub | micro | chapter | router | fin
  time: '03:02:41',
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

Tout nouveau flag se déclare dans `src/data/flags.js`. Après une modification :

```
npm run validate     # build + vérifications + simulation + test navigateur en 2D
npm run simulate     # 5000 parties, rapport de couverture
```

## Reconstruire

```
npm install          # une fois (installe three, seule dépendance)
npm run build        # produit dist/signal.html
```
