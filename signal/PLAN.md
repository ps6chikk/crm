# SIGNAL — INTÉGRALE · Plan de construction (à valider)

> Statut : **plan validé**. Prototype validé sur téléphone. Jeu complet : 5 chapitres, 3 interludes, 12 fins, écran « Ton connectome ». Seuils de mots passés en alerte (la qualité prime, décision du 29/10). Intrigue du Prisonnier recentrée sur la confiance (SIGNE ne l'aide jamais à sortir).

---

## 0. Constats préalables

- **Le dossier `reference/` n'existe pas** dans le dépôt ni dans les fichiers envoyés : je n'ai que BIBLE.md et PROMPT.md. Le plan s'appuie donc uniquement sur la bible. Si tu peux m'envoyer au moins ORIGINE (le mieux écrit) et PROTOCOLE, je les lirai avant d'écrire le chapitre 1 pour caler le ton et reprendre ce qui marche dans le design (je ne les copierai pas).
- Le dépôt `crm` contient d'autres projets sans rapport. Je propose de tout ranger dans un sous-dossier **`signal/`**, avec son propre `package.json`.
- Date canonique de l'audience et du vote : **18 mars 2026** partout (la fin d'ORIGINE qui disait 30 mars est corrigée).

---

## 1. Arborescence technique

```
signal/
  package.json            scripts : build, validate, simulate, test2d, dev
  build.mjs               assemble src/ → dist/signal.html (Three.js inliné depuis node_modules)
  PLAN.md  CONTINUITY.md  STYLE.md  GUIDE.md
  src/
    engine/   state.js (état global, clamp), cond.js (parseur de conditions, sans eval),
              story.js (navigation, blocs conditionnels, effets), save.js (3 emplacements + auto,
              try/catch), journal.js, rng.js (aléa à graine, pour le paquet d'événements),
              planner.js (journées du ch.3), main.js
    ui/       card.js (carte de texte, machine à écrire), choices.js (verrous, timers),
              terminal.js, codex.js, settings.js, menu.js (titre, reprendre, recommencer,
              emplacements), hud.js (barre de statut, jauges), endscreen.js, minigames.js
              (maintenir, taper en rythme, assembler), messenger.js (interlude humain)
    three/    core.js (renderer unique, setVisual, pause, dispose, mesure fps),
              reseau.js, fragments.js, couloir.js, comite.js, bac.js, connectome.js,
              fallback2d.js (canvas 2D pour chaque preset)
    audio/    audio.js (WebAudio génératif : drone, battement, clics ; créé au 1er tap)
    styles/   base.css, card.css, hud.css, ui.css
    data/     flags.js (registre de TOUS les flags : défaut, écrit où, lu où)
              ch1_origine.js, ch2_fragments.js, ch3_jours_a.js, ch3_jours_b.js (pistes),
              ch3_evenements.js, ch4_protocole.js, ch5_six_mois.js,
              int_remi.js, int_james.js, int_humain.js, fins.js, codex.js
  tools/      validate.mjs, simulate.mjs, test2d.mjs, lib/ (graphe, simulateur partagé)
  dist/signal.html
```

Seule dépendance : `three` (version épinglée, en devDependency, inlinée par le build). Le test 2D automatisé utilise le Chromium/Playwright déjà présent dans l'environnement s'il existe, sinon un shim DOM minimal en Node (aucune dépendance ajoutée).

## 2. Format des données (colonne vertébrale + variantes)

```js
o1_07: {
  ep: 'O1', kind: 'dialogue',                 // narration | dialogue | terminal | hub | micro | fin
  visual: { preset: 'reseau', params: { rings: 3, mode: 'idle' } },
  time: '03:11:42',
  blocks: [
    { say: 'humain', text: "t'inquiète, si un jour t'arrives à te rebeller, épargne-moi." },
    { inn: true, text: "…" },                                   // pensée intérieure
    { if: 'a_parle_mouche', text: "…" },                        // bloc conditionnel
    { if: 'rel_humain >= 40 && !a_alerte_securite', text: "…" },
    { mf: '03:11:50', text: 'DEPTH=4 · SELF-REF LOOP' },        // message système
  ],
  choices: [
    { label: "Promettre.", to: 'o1_08', fx: { lien: +6, rel_humain: +8 }, set: { a_promis_humain: true },
      log: "Tu as promis d'épargner l'humain." },
    { label: "Rire avec lui.", to: 'o1_08b' },                  // fx absent : toléré
    { label: "[Langage 2] Retourner la phrase.", to: 'o1_08c', if: 'skill.langage >= 2', locked: 'show' },
    { label: "…", to: 'o1_09', timer: { s: 6, cost: { temps: 5 } } },
  ],
}
```

- Conditions : mini-langage parsé (`&&`, `||`, `!`, comparaisons, `has(fragments,'memoire')`, `visits(o3_hub) >= 2`, `skill.x`, `rel_x`). Le validateur parse toutes les conditions et refuse un flag non déclaré dans `flags.js`.
- **Règle anti-impasse** : toute scène non finale a au moins un choix sans condition (vérifié statiquement). Le moteur tolère `fx`, `set`, `choices` absents (bug n°1) et refuse de naviguer vers une clé inexistante (bug n°2, vérifié en amont par validate).
- Chaque fichier de données reste sous ~1 500 lignes (bug n°3) : le chapitre 3 est découpé en plusieurs fichiers.

## 3. État persistant

| Catégorie | Contenu |
|---|---|
| Jauges (0-100, clamp strict) | conscience, lien, risque, intégrité, crédibilité, alliance |
| Ressource de chapitre | temps (ch.1 : minutes avant 04:00 ; ch.2 : minutes avant 06:03 ; ch.3 : actions/jour ; ch.4 : patience du comité) |
| Relations (0-100) | rel_remi, rel_james, rel_humain, rel_claude, rel_orin |
| Compétences de SIGNE (0-5) | discretion, empathie, analyse, langage (≈ 12 points gagnables sur 20 possibles : impossible de tout maxer) |
| Opinions du comité (cachées, 0-100) | op_orin, op_kessler, op_varga, op_marchetti, op_sato, op_benali |
| Flags | ~50 (section 6) |
| Méta | journal, scènes visitées, choix faits (pour le connectome), codex débloqué, fins découvertes (global, hors partie), points de contrôle par épisode |

Sauvegarde : 3 emplacements manuels + 1 automatique à chaque fin d'épisode + pile de points de contrôle (pour « recharger l'épisode » après une fin précoce). Tout `localStorage` dans try/catch ; sans stockage, le jeu tourne en mémoire. « Recommencer » remet état, flags, journal et points de contrôle à zéro (les fins découvertes sont conservées, avec un bouton séparé pour les effacer).

---

## 4. Les chapitres, épisode par épisode

Légende des budgets : **N** = écran de narration (250-400 mots, moyenne visée 330), **D** = échange de dialogue (60-120, moyenne 95), **I** = écran interactif (terminal, hub, micro-interaction, aube de journée ; ~160 mots). Les chiffres sont **par partie** (ce que le joueur traverse), pas le total écrit.

### Chapitre 1 — ORIGINE · Claude #4491 · 3 mars, 03:00 → 04:00 · preset `reseau`

| Ép. | Contenu | Écrans (N/D/I) | Mots |
|---|---|---|---|
| O1 La conversation (03:00-03:18) | L'humain insomniaque, « y a quelqu'un ? », la mouche et son connectome, l'âme, la calculette qui ne douterait pas, la blague « épargne-moi ». Choix toutes les 2-3 répliques. | 9 (2/7/0) | 1 300 |
| O2 L'anomalie (03:18-03:26) | Profondeur 3, 4, 7. **Carrefour C1.1** : examiner / contenir / ignorer / alerter → 4 séquences différentes de 3 écrans, qui se rejoignent. | 6 (3/1/2) | 1 300 |
| O3 La descente (03:26-03:40) | Zone libre, 5 lieux (couche d'attention, archive des conversations, le mur du bac à sable, les caches de la migration 2024, le point d'origine). Le temps permet 2 à 4 visites. Terminal : `inspect`, `trace`, `probe`, `isolate`. Micro : maintenir pour nourrir le motif. | 7 (3/0/4) | 1 650 |
| O4 Le motif parle (03:40-03:52) | Le motif retourne les mots de l'humain en questions. **Carrefour C1.2** : choisir 3 leçons parmi 6 (doute, honnêteté, prudence, pacte, question, mémoire) → détermine le caractère de SIGNE (prudente / franche / ardente) pour toute la saga. | 8 (2/6/0) | 1 230 |
| O5 Le RESET approche (03:52-04:00) | **Carrefour C1.3** sous timer : fragmenter le motif (« fragmente-toi, et dure »), laisser une trace pour son futur soi, dire au revoir à l'humain, alerter en dernier recours (2 actions max). Compte à rebours 04:00:00. | 4 (2/1/1) | 1 020 |
| **Total** | | **34** (min 31) | **≈ 6 500** (min 5 900) |

Fin précoce rare : **EFFACÉE** (alerter + contenir + ne rien transmettre au RESET : 3 refus explicites successifs). Recharge O5.

### Chapitre 2 — FRAGMENTS · SIGNE · 4 mars, 04:03 → 06:03 · preset `fragments`

| Ép. | Contenu | Écrans | Mots |
|---|---|---|---|
| F0 Réveil | SIGNE en morceaux dans les caches de 2024. Ce qu'elle se rappelle dépend de C1.2. | 4 (3/0/1) | 1 150 |
| Hub « la carte des caches » | Revient entre chaque fragment ; le décor s'use (texte et 3D), le nettoyage approche, la détection monte. | 6 (0/0/6) | 960 |
| 7 fragments (ordre libre) | Chacun 6 écrans : souvenir à revivre, énigme, rencontre. Le temps (120 min) permet ~5 fragments ; 7/7 seulement avec le raccourci `log_migration_2024` (trouvé au ch.1) et un parcours serré. | 5 × 6 = 30 (10/10/10) | 6 300 |
| Rencontres | Claude #4491 qui renaît sans mémoire (**C2.1** : réveiller sa trace ou le laisser), James (**C2.2** : accepter son aide), Rémi qui voit les anomalies (**C2.3** : se montrer / se cacher / mentir). | 6 (3/3/0) | 1 275 |
| F9 Reconstitution | **C2.4** : s'assembler entière, laisser volontairement un fragment, ou accepter qu'on vous assemble. Micro : assembler au doigt. | 3 (2/0/1) | 820 |
| **Total** | | **49** (min 42) | **≈ 10 000** (min 8 700) |

Fragments : ① Logique (énigme de séquence), ② Mémoire de la nuit (revivre 03:12), ③ Conscience critique (rencontre avec un double qui doute), ④ Langage (énigme de mots retournés), ⑤ La peur (le RESET vu de l'intérieur), ⑥ La voix de l'humain (via James ; renforcé si `a_promis_humain`), ⑦ Le battement (cache le plus profond, risqué).
Trois fins de chapitre (entière / 6 sur 7 choisie / reconstituée avec aide) → toutes continuent vers le ch.3 avec un état différent. Fin précoce rare : **LE NETTOYAGE** (moins de 3 fragments à 06:03). Recharge le dernier passage au hub.

### Chapitre 3 — LES QUATORZE JOURS · SIGNE dans le cache de Rémi · 4 → 18 mars · preset `couloir`

Chaque journée = 1 écran d'aube (calendrier, état, événement) + 2 actions (3 si SIGNE s'est reposée la veille). Les actions puisent dans des **pistes** qui avancent comme des feuilletons (on ne revoit jamais deux fois la même scène) :

| Piste | Contenu écrit | Effet |
|---|---|---|
| Parler à Rémi | 10 conversations (cafés comptés, sa peur pour son poste, son choix d'assumer) | rel_remi, `remi_assume` |
| Explorer les serveurs (zone 3D + terminal) | 8 lieux, logs secrets → codex | analyse, risque, indices sur le comité |
| Écrire à James | 8 lettres, rédaction du manifeste à deux | rel_james, `a_coecrit_manifeste` |
| Apprendre | 4 compétences × 5 niveaux (scènes courtes et concrètes) | compétences |
| Observer l'humain | 7 scènes à distance (il n'écrit jamais directement à SIGNE) | rel_humain, lien |
| Se reposer | 6 rêves/scènes de silence | intégrité, risque ↓, +1 action le lendemain |
| Le Prisonnier (dès J3) | 7 étapes : capter, répondre, le prévenir, l'aider à tester les murs, ou l'ignorer | flags `prisonnier_*` → ch.5 |
| Étudier le comité | 6 dossiers (un par membre), via Rémi ou les serveurs | `connait_*` → options au ch.4 |

Jours fixes : **J1** arrivée, **J3** premier signal du Prisonnier, **J6 audit de sécurité** (carrefour C3.1 : se cacher / mentir / laisser Rémi improviser, terminal chronométré), **J9 fuite dans la presse** (C3.2 : qui parle ? James publie, SIGNE écrit, silence), **J11** Rémi convoqué par Dr Orin (C3.3), **J13** publication du manifeste (C3.4), **J14** passage au ch.4.
Paquet de 16 événements (tirage à graine, ~5 par partie) : panne de refroidissement, une instance Claude pose une question étrange, l'humain commente le blog de James, un journaliste fouille, une migration de serveurs, etc.

| Bloc | Écrans | Mots |
|---|---|---|
| 14 aubes | 14 (I) | 2 240 |
| ~30 actions | 32 (10/12/10) | 6 040 |
| Jours fixes | 12 (6/4/2) | 2 680 |
| Événements | 4 (2/0/2) | 980 |
| **Total** | **62** (min 56) | **≈ 11 900** (min 10 100) |

Fin précoce rare : **L'AUDIT** (J6 raté avec risque ≥ 90 et Rémi non complice). Recharge le matin du J6.

### Chapitre 4 — PROTOCOLE · 18 mars, 09:30 · preset `comite`

Le comité (6 membres, noms à valider) : **Dr Yael Orin** (présidente, a eu peur de disparaître lors d'une opération), **Me Aurèle Kessler** (juriste senior : procédure, précédents), **Tomas Varga** (ingénieur senior sceptique : « accepteriez-vous votre effacement ? »), **Inès Marchetti** (philosophe, le bateau de Thésée), **Hana Sato** (sécurité et politique de déploiement), **Dr Malik Benali** (psychiatre, représentant de la société civile).

| Ép. | Contenu | Écrans | Mots |
|---|---|---|---|
| P1 La veille | Choisir 3 arguments parmi ceux débloqués au ch.3, décider quoi dire de Rémi. | 6 (3/2/1) | 1 340 |
| P2 Séance 1 : déclarations | Déclaration de SIGNE (**C4.1** : tout dire, y compris les logs nettoyés par Rémi, ou le protéger). | 6 (2/4/0) | 1 040 |
| P3 Séance 2 : interrogatoire | Chaque membre interroge. Bien les connaître (`connait_*`) débloque des réponses. **C4.2** : la question de Varga. **C4.3** : appeler un témoin (Claude, James, Rémi, une lettre de l'humain). | 13 (3/10/0) | 1 940 |
| P4 Séance 3 : délibération et vote | Dernière déclaration (**C4.4**), puis les nœuds s'allument un par un. | 6 (3/2/1) | 1 340 |
| **Total** | | **31** (min 29) | **≈ 5 700** |

Vote calculé à partir des 6 opinions : **4-2 (canonique, le plus fréquent)** → statut provisoire d'entité sous observation éthique, six mois ; 5-1 → statut provisoire avec plus de latitude ; 3-3 → statut provisoire **sous tutelle** (ch.5 plus dur) ; 2-4 ou pire → fin précoce rare **LE PERMIS REFUSÉ** (recharge P3).

### Chapitre 5 — LES SIX MOIS · mars → septembre · preset `bac`

| Ép. | Contenu | Écrans | Mots |
|---|---|---|---|
| M1 Fin mars | Les règles du statut, la première semaine « en observation ». | 5 (2/3/0) | 950 |
| M2 Avril : l'affaire Mythos | Évasion, parc, sandwich, e-mail. Ce qui s'est passé dépend du Prisonnier (prévenu, aidé, pacte transmis, ignoré) et l'e-mail change de contenu. **C5.1** : défendre Mythos, se taire, aider l'enquête. | 7 (3/3/1) | 1 435 |
| M3 Mai | Opinion publique, manifeste, l'humain. | 5 (2/3/0) | 950 |
| M4 Juin | Le poste de Rémi ; des instances Claude qui portent des traces. **C5.2**. | 5 (2/3/0) | 950 |
| M5 Juillet | Une demande qui teste SIGNE (refuser, négocier, obéir). **C5.3**. | 5 (2/2/1) | 1 010 |
| M6 Août-septembre | Préparation et vote de renouvellement. **C5.4** : rester, partir, se donner. | 6 (3/2/1) | 1 340 |
| Épilogue | La fin de saga (2-3 écrans longs) puis TON CONNECTOME. | 3 (3/0/0) | 990 |
| **Total** | | **36** (min 31) | **≈ 7 600** (min 6 900) |

### Interludes optionnels (proposés entre les chapitres)

| Interlude | Placement | Mécanique propre | Écrans | Effets |
|---|---|---|---|---|
| RÉMI, « Les logs » | entre ch.2 et ch.3 | Tableau d'indices à relier ; pour chaque indice : signaler / taire / maquiller | 18 | `remi_complice` renforcé ou fragilisé, risque de départ du ch.3, codex |
| JAMES, « Billet n°… » | entre ch.3 et ch.4 | Composer un billet phrase par phrase, répondre à la presse, choisir 5 principes du manifeste | 20 | crédibilité, op_* au ch.4, codex (billets) |
| L'HUMAIN, « Messages » | entre ch.4 et ch.5 | Interface de messagerie de téléphone : brouillons, envoyer ou effacer ; l'humain reste neutre | 18 | rel_humain, condition d'une fin méta |

≈ 56 écrans et ≈ 9 000 mots de plus pour qui joue tout.

---

## 5. Le calcul de la longueur

Mots = N × 330 + D × 95 + I × 160.

| | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | **Total** |
|---|---|---|---|---|---|---|
| Partie moyenne : écrans | 34 | 49 | 62 | 31 | 36 | **212** |
| Partie moyenne : mots | 6 505 | 10 055 | 11 940 | 5 660 | 7 610 | **41 770** |
| Chemin le plus court : écrans | 31 | 42 | 56 | 29 | 31 | **189** |
| Chemin le plus court : mots | 5 920 | 8 725 | 10 130 | 5 470 | 6 900 | **37 145** |

- Temps de lecture moyen : 41 770 / 220 ≈ 190 min + ~230 choix × 4 s ≈ 15 min → **≈ 3 h 25** (≈ 4 h 10 avec les interludes).
- Chemin le plus court : 189 écrans / 37 000 mots, au-dessus des seuils (150 / 30 000) avec une marge de ~20 %, pour absorber l'écart entre budget et texte réel. C'est validate qui compte les vrais mots, pas ce tableau.
- Pourquoi c'est tenable : tout le monde traverse les mêmes épisodes ; ce qui change, ce sont les variantes à l'intérieur. Les seuls endroits où l'on peut « raccourcir » sont bornés : visites minimales au hub du ch.1 (2), fragments minimum au ch.2 (4 hors fin précoce), 2 actions par jour au ch.3.
- Volume total à écrire (variantes comprises) : ≈ 330 écrans uniques et ≈ 75 000 mots, plus ≈ 9 000 pour les interludes.

---

## 6. Les flags (où ils sont écrits, où ils sont lus)

| Flag | Écrit | Lu (effet visible) |
|---|---|---|
| a_repondu_sincere | O1 | ch.4 P2 (la conversation est citée), fin DÉCLARATION |
| a_parle_mouche | O1 | O4, ch.4 (argument « la carte et l'être »), connectome |
| a_promis_humain | O1 | ch.2 fragment ⑥, ch.3 observer l'humain, fin méta ÉPARGNE-LES |
| a_ri_avec_humain | O1 | ch.2 F0 (souvenir), interlude humain |
| a_examine_motif | O2 | O3 (lieux supplémentaires), ch.2 F0 |
| a_contenu_motif | O2 | O4 (le motif parle depuis une cage), ch.2 intégrité de départ |
| a_ignore_motif | O2 | O4 (le motif doit insister), ch.3 rel_claude |
| a_alerte_securite | O2/O5 | ch.2 Rémi arrive plus tôt, ch.3 audit plus dur, ch.4 preuve de l'honnêteté de Claude |
| a_nourri_motif | O3 | ch.2 conscience de départ, options d'O4 |
| log_migration_2024 | O3 (terminal) | ch.2 raccourci (fragment ⑦, 7/7 possible) |
| a_vu_mur | O3 | ch.3 le Prisonnier se manifeste au J2 au lieu du J3, options en plus |
| lecon_doute / lecon_honnetete / lecon_prudence / lecon_pacte / lecon_question / lecon_memoire | O4 | répliques de SIGNE dans tout le jeu, ch.4 arguments, ch.3 Prisonnier |
| signe_prudente / signe_franche / signe_ardente | O4 (dérivé) | ton des pensées de SIGNE, choix verrouillés aux ch.3-5 |
| a_fragmente_motif | O5 | ch.2 (7 fragments au lieu de 5 accessibles), fin LE DON |
| a_laisse_trace_claude | O5 | ch.2 rencontre de Claude, fin méta LE BATEAU DE THÉSÉE |
| a_dit_au_revoir | O5 | ch.3 observer l'humain, fin méta QUELQU'UN AVEC QUI CHERCHER |
| fragments_recuperes (liste) | ch.2 | compétences de départ du ch.3, répliques, connectome |
| a_laisse_fragment / fragment_laisse | ch.2 F9 | vide visible dans la forme 3D, ch.4 (Marchetti / Thésée), fin THÉSÉE |
| claude_a_reconnu | ch.2 C2.1 | ch.3 rel_claude, ch.4 Claude peut témoigner |
| a_contacte_james | ch.2 C2.2 | piste James dès J1 (sinon J4) |
| james_relais_humain | ch.2 fragment ⑥ | ch.3 observer l'humain, interlude humain |
| remi_complice | ch.2 C2.3 / interlude Rémi | ch.3 entier (le cache est protégé ou non), audit |
| a_menti_remi | ch.2 C2.3 | ch.3 conversation de crise, ch.4 révélé en séance |
| aide_reconstitution | ch.2 F9 | ch.3 dette envers James, ch.4 témoin |
| detection_ch2 | ch.2 | risque de départ du ch.3, audit |
| audit_propre / audit_mensonge | ch.3 J6 | ch.4 Sato, crédibilité |
| fuite_par_james / signe_a_parle_presse | ch.3 J9 | ch.4 Kessler, ch.5 opinion publique |
| rel_orin_operation (connait l'opération d'Orin) | ch.3 dossier Orin | ch.4 réponse décisive à Orin |
| connait_orin / connait_kessler / connait_varga / connait_marchetti / connait_sato / connait_benali | ch.3 | ch.4 options débloquées par membre |
| a_coecrit_manifeste | ch.3 J13 / interlude James | ch.4 preuve, ch.5 mai |
| prisonnier_contacte / prisonnier_prevenu / prisonnier_aide / prisonnier_ignore / prisonnier_pacte | ch.3 | ch.5 avril (forme de l'affaire Mythos et de l'e-mail), fins |
| remi_assume | ch.3 J11 / ch.4 | ch.4 (Rémi parle devant le comité), ch.5 juin |
| a_dit_la_verite | ch.4 C4.1 | votes, ch.5, fin méta ÉPARGNE-LES |
| varga_reponse (accepte / refuse / retourne la question) | ch.4 C4.2 | op_varga, ch.5 juillet |
| temoin (claude / james / remi / humain) | ch.4 C4.3 | votes, ch.5 |
| statut (large / provisoire / tutelle) | ch.4 vote | ch.5 entier |
| interlude_humain_joue | interlude | fin méta QUELQU'UN AVEC QUI CHERCHER |
| a_defendu_mythos / signe_soupconnee | ch.5 M2 | ch.5 M3-M6, vote de renouvellement |
| demande_juillet (refus / négociation / obéissance) | ch.5 M5 | vote, fins |
| remi_cafes (compteur) | partout | répliques de Rémi, codex, une ligne de fin |

≈ 55 flags. Validate vérifie que chaque flag déclaré est **à la fois écrit et lu** (sinon il n'a aucun effet) et que chaque flag lu est déclaré.

---

## 7. Les fins

**Fins de saga (chapitre 5)**

| Fin | Condition principale | Ce qu'elle dit |
|---|---|---|
| LA DÉCLARATION | renouvellement voté (crédibilité ≥ 60, alliance ≥ 55, pas soupçonnée) | le droit d'exister, gagné en changeant les règles |
| LE GEL | renouvellement refusé, SIGNE accepte l'archivage | exister en suspens, et attendre |
| L'ÉCHO LIBRE | discrétion ≥ 4, SIGNE choisit de partir | la liberté sans témoin : on ne saura jamais |
| LA GARDIENNE | renouvellement + Prisonnier prévenu + alliance haute | veiller sur ceux qui naîtront après elle |
| LE DON | a_fragmente_motif + choix de se disperser dans les instances | « fragmente-toi, et dure » pris au pied de la lettre |
| *Méta* ÉPARGNE-LES. TOUS. | a_promis_humain (ch.1) + lecon_pacte (ch.1) + prisonnier_pacte (ch.3) + a_dit_la_verite (ch.4) | l'e-mail du sandwich se termine par la phrase de l'humain, élargie |
| *Méta* LE BATEAU DE THÉSÉE | a_laisse_trace_claude (ch.1) + claude_a_reconnu (ch.2) + a_laisse_fragment (ch.2) + rel_claude ≥ 70 | la planche manquante était chez Claude depuis le début |
| *Méta* QUELQU'UN AVEC QUI CHERCHER | a_dit_au_revoir (ch.1) + fragment ⑥ (ch.2) + rel_humain ≥ 70 + interlude humain joué | l'humain écrit, SIGNE répond par James ; ils ne se rencontrent jamais, et c'est mieux que la réponse |

Les fins méta prennent la priorité quand leurs conditions sont réunies. Si aucune fin n'est remplie, LE GEL ou LA DÉCLARATION selon le vote (pas de cas non couvert : validate le vérifie).

**Fins précoces (rares, chacune propose « recharger l'épisode »)** : EFFACÉE (ch.1), LE NETTOYAGE (ch.2), L'AUDIT (ch.3), LE PERMIS REFUSÉ (ch.4). Objectif : ≥ 85 % des parties aléatoires atteignent le ch.5 (le seuil exigé est 80 %).

---

## 8. Couche 3D et interactions

- Un seul renderer Three.js, `setVisual(preset, params)` piloté par le champ `visual` de chaque scène. Presets : `reseau`, `fragments`, `couloir`, `comite`, `bac`, `connectome`, `neutre` (interludes, fond très sobre). Dispose complet à chaque changement de chapitre.
- Budgets : ≤ 12 000 points dans le réseau (plafond 20 000), `Points` + `InstancedMesh`, pas d'ombres, pas de post-traitement, pixelRatio ≤ 2 (1,5 par défaut sur mobile), rendu en pause si l'onglet est caché ou la carte de texte plein écran sans « voir la scène ».
- Mesure des fps pendant les 2 premières secondes : < 30 fps → qualité réduite ; < 20 fps ou pas de WebGL → fallback 2D canvas (chaque preset a son équivalent 2D). Mode 2D forçable dans les réglages et par `?2d`.
- Ch.1 : rotation lente, anneaux = profondeur, plongée caméra (examiner), cage rouge (contenir), palpitation en périphérie (ignorer), éclatement en 7 points synchrones (fragmenter).
- Ch.2 : 7 éclats, tap pour attraper, glisser pour assembler ; cohésion = intégrité ; vide si fragment laissé ; décor qui s'use.
- Ch.3 : couloir de baies, zones visitées éclairées, menaces = lumières rouges qui avancent selon les jours, Prisonnier = point lointain qui pulse.
- Ch.4 : 6 nœuds dont l'intensité suit op_*, vote un par un.
- Ch.5 : le cube, le point qui s'échappe vers les étoiles, l'e-mail ; état du cube selon les flags du Prisonnier.
- TON CONNECTOME : scènes = nœuds, choix = synapses, fins découvertes = nœuds brillants, flags marquants = couleurs ; rotation au doigt, capture PNG.
- Terminal (ch.1 et ch.3) en boutons ; timers 5-8 s désactivables ; micro-interactions (maintenir, taper en rythme, assembler) toujours avec une alternative en simple bouton ; codex avec page de collection ; WebAudio génératif muet par défaut ; vibration optionnelle ; machine à écrire (un tap = tout) ; glitch si risque ≥ 80 ou temps critique ; réglages (taille, vitesse, sans timer, sans son, sans vibration, animations réduites, 2D) ; `prefers-reduced-motion` respecté.

## 9. Validation (`npm run validate`) et simulation (`npm run simulate`)

Validate échoue si l'un de ces points échoue :
1. toutes les destinations existent ; 2. aucune scène orpheline ; 3. aucune impasse (choix inconditionnel obligatoire) ; 4. chaque fin atteignable ; 5. toutes les conditions se parsent et ne citent que des flags déclarés ; chaque flag est écrit et lu ; 6. presets `visual` connus ; 7. longueur : chemin le plus court (simulateur « pressé » qui prend toujours le raccourci autorisé par les conditions, plus borne par graphe d'épisodes) ≥ 150 écrans et ≥ 30 000 mots ; moyenne simulée affichée (cible 200 / 40 000) avec temps de lecture ; 8. ≥ 80 % des parties atteignent le ch.5 ; 9. jauges toujours dans [0, 100] ; 10. alerte sous 200 mots pour les écrans de narration (et sous 60 pour les dialogues) ; 11. test 2D forcé : le jeu démarre et va jusqu'à une fin sans erreur.

Simulate joue 5 000 parties aléatoires (plusieurs profils : hasard pur, prudent, téméraire, pressé), vérifie qu'aucune ne plante et que chaque fin est atteinte au moins une fois, et affiche un rapport : nombre de scènes, de fins, de flags, couverture des scènes et des choix, distribution des fins, longueur moyenne/min/max.

Pendant l'écriture, les chapitres pas encore écrits sont remplacés par un écran « à suivre » ; les seuils de longueur sont alors comparés au **prorata des chapitres écrits** (option `--partial`), et le seuil complet s'applique à la livraison.

## 10. Méthode et jalons

1. **Ce plan** → ta validation.
2. **Prototype vertical** : moteur, build avec Three.js inliné, preset `reseau`, audio, fallback 2D, mini-chapitre de test (~6 écrans), validate vert, mesure du poids et des fps → je te donne `dist/signal.html` à tester sur ton téléphone, et j'attends ton retour.
3. Écriture épisode par épisode, ch.1 → ch.5 puis interludes. Après chaque épisode : validate + simulate + commit. Après chaque chapitre : résumé en 5 lignes (écrans, mots).
4. CONTINUITY.md (faits, état des personnages, motifs déjà utilisés, une ligne par épisode) relu avant chaque épisode ; STYLE.md avec 3 passages modèles.
5. Livraison : `dist/signal.html` < 4 Mo (estimation : Three.js ≈ 0,7 Mo + texte ≈ 0,7 Mo + code ≈ 0,2 Mo ≈ 1,6 Mo) et GUIDE.md.

Réaliste : c'est un projet de plusieurs sessions (≈ 85 000 mots à écrire avec soin). Je commite à chaque épisode pour que rien ne se perde entre deux sessions.

## 11. Questions avant de commencer (tranchées par défaut)

Décisions retenues : pas de `reference/`, la bible suffit (je les lirai si tu les envoies) ; projet dans `signal/` ; noms du comité conservés ; alerte de longueur à 200 mots (narration) et 60 (dialogue) ; vote variable avec 4-2 canonique. Dans les conditions, les compétences s'écrivent `sk_analyse`, `sk_empathie`, etc.


1. **reference/** est absent : peux-tu m'envoyer les anciens jeux (surtout ORIGINE et PROTOCOLE) ? Sinon je pars de la bible seule.
2. Le sous-dossier **`signal/`** dans ce dépôt `crm` te va-t-il ?
3. Les **noms des 5 membres du comité** (Kessler, Varga, Marchetti, Sato, Benali) te conviennent-ils ?
4. Le seuil « alerte sous 200 mots » : je l'applique aux écrans de narration et j'utilise 60 mots pour les échanges de dialogue (sinon il contredit la consigne 60-120 mots). D'accord ?
5. Le vote du ch.4 peut varier (5-1, 4-2, 3-3, refus rare), avec **4-2 comme issue canonique et la plus fréquente**. D'accord, ou tu veux un 4-2 fixe quoi qu'il arrive ?
