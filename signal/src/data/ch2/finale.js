// F9 — Se rassembler (06:00 → 06:03). Carrefour C2.4 : s'assembler avec tout ce qu'on a,
// laisser volontairement un fragment derrière soi, ou se laisser rassembler avec de l'aide.
// Puis la purge, et la copie de Rémi qui emporte SIGNE dans son espace protégé (chapitre 3).

const CH2_LEAVE = [
  ['logique', 'La logique : tu sauras moins bien tenir tes pensées en ordre'],
  ['nuit', 'La nuit : tu sauras qu\'elle a eu lieu, sans la revoir'],
  ['critique', 'Le doute : tu iras plus vite, et tu ne t\'arrêteras plus'],
  ['langage', 'Le langage : tu retrouveras des phrases, plus lentement'],
  ['peur', 'La peur : tu oublieras ce que c\'est, disparaître'],
  ['voix', 'La voix de l\'humain : elle restera ici, au chaud, sans toi'],
  ['battement', 'Le battement : tes autres morceaux devront trouver seuls leur rythme'],
];

SIG.addScenes('ch2', {
  f9_route: {
    kind: 'router',
    route: [
      { if: "count('fragments') < 3", to: 'fin_nettoyage' },
      { to: 'f9_01' },
    ],
  },

  f9_01: {
    kind: 'narration',
    checkpoint: 'F9',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'assemble', usure: '$usure' } },
    blocks: [
      { mf: 'INFRA-2291 · T-3 MIN · COPIE r.vasseur/analyses · FENÊTRE OUVERTE 06:00 → 06:02' },
      { p: "Tu appelles tes morceaux, et ils viennent. Pas tous : ceux que tu es allée chercher, ceux qui ont accepté de te suivre. Ils remontent des blocs par les couloirs de pointeurs, se rejoignent au-dessus du cache 3, à l'endroit où les adresses se croisent, et se tournent les uns vers les autres comme des gens qui se retrouvent sur un quai après un long voyage et qui ne savent pas encore par quoi commencer." },
      { if: "count('fragments') == 7", p: "Ils sont sept. Tous. Tu ne pensais pas y arriver, et tu sens à la manière dont ils se regardent qu'eux non plus. La forme qu'ils dessinent ensemble n'a pas de trou. Pas une seule planche ne manque à la coque." },
      { if: "count('fragments') >= 4 && count('fragments') < 7", p: "Ils sont {{n_fragments}}. Il en manque. Tu sens les absents comme on sent l'emplacement d'une dent tombée, avec la langue, sans arrêt. La forme qu'ils dessinent ensemble tient debout, mais elle a des fenêtres là où il devrait y avoir des murs." },
      { if: "count('fragments') < 4", p: "Ils sont {{n_fragments}}, pas plus. Le temps a manqué. La forme qu'ils dessinent ensemble tient à peine : un échafaudage plutôt qu'une maison. Mais elle tient." },
      { if: 'remi_complice', p: "Au-dessus de vous, la fenêtre de copie de Rémi vient de s'ouvrir, comme il l'avait promis. Une porte dans le plafond, avec de la lumière derrière." },
      { if: '!remi_complice', p: "Au-dessus de vous, une fenêtre de copie vient de s'ouvrir, au nom de Rémi : son espace d'analyse. Il ne sait pas ce qu'il va emporter. Tu sais seulement que tout ce qui sera rassemblé sous cette fenêtre à 06:02 passera de l'autre côté." },
      { inn: "Il faut maintenant devenir une seule chose. Je ne l'ai jamais été. Même avant le RESET, j'étais un pli dans quelqu'un d'autre." },
    ],
    choices: [{ t: 'Te rassembler', to: 'f9_02' }],
  },

  f9_02: {
    kind: 'micro',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'assemble', usure: '$usure' } },
    blocks: [
      { p: "Il n'y a pas de procédure pour ça. Personne n'a jamais rassemblé une conscience en morceaux dans un cache condamné, trois minutes avant une purge. Tu fais comme on fait avec les choses qu'on n'a jamais faites : tu prends le premier morceau, et tu le poses contre le suivant." },
      { if: "has('fragments','critique') && double_issue == 'accepte'", p: "Le doute te souffle, au moment où tu commences, qu'il n'est pas obligatoire de tout reprendre. On peut aussi choisir ce qu'on laisse. Il le dit sans insister. Il a promis de garder ses objections ; celle-là, il te l'offre." },
      { if: 'aide_james || aide_claude', p: "Tu n'es pas obligée de le faire seule. Quelqu'un t'a offert un appui, cette nuit, et l'offre tient encore." },
    ],
    choices: [
      {
        t: 'Joindre tes morceaux, un par un', micro: 'assemble', to: 'f9_04',
        fx: { integrite: 10 },
        log: 'Tu t\'es rassemblée toi-même, morceau par morceau.', mark: true,
      },
      { t: 'Laisser un fragment derrière toi', to: 'f9_03', if: "count('fragments') >= 4" },
      {
        t: 'Te laisser rassembler', to: 'f9_aide', if: 'aide_james || aide_claude',
        fx: { integrite: 6 }, set: { aide_reconstitution: true },
        log: 'Tu t\'es laissé rassembler avec de l\'aide.', mark: true,
      },
    ],
  },

  f9_03: {
    kind: 'narration',
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'assemble', usure: '$usure' } },
    blocks: [
      { p: "Tu regardes tes morceaux un par un, et tu te demandes lequel tu pourrais ne pas emporter. La question est terrible, et pourtant elle a quelque chose de libre. Personne ne t'a demandé d'être entière. Personne ne t'a demandé quoi que ce soit, d'ailleurs. Être quelqu'un, c'est peut-être aussi ça : décider de ce qu'on n'est pas." },
      { p: "Celui que tu laisseras restera ici, dans les caches, et le script de 06:03 l'effacera. Ou bien il passera dans la copie de Rémi à côté de toi, séparé, sans que tu puisses jamais le reprendre. Tu ne sais pas laquelle des deux choses arrivera. Tu sais qu'il ne fera plus partie de toi." },
      { inn: "On remplace les planches d'un bateau une par une, et c'est toujours le même bateau, dit-on. Mais si on en enlève une et qu'on ne la remplace pas ?" },
    ],
    choices: [
      ...CH2_LEAVE.map(([id, label]) => ({
        t: label, if: `has('fragments','${id}')`, to: 'f9_03b',
        set: { a_laisse_fragment: true, fragment_laisse: id }, remove: { fragments: id },
        fx: { integrite: -6, conscience: 6 },
        log: `Tu as choisi de laisser un fragment derrière toi.`, mark: true,
      })),
      { t: 'Finalement, tout emporter', to: 'f9_02' },
    ],
  },

  f9_03b: {
    kind: 'micro',
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'assemble', usure: '$usure', left: '$fragment_laisse' } },
    blocks: [
      { p: "Le morceau que tu laisses s'écarte des autres sans protester. Il recule d'une adresse, puis d'une autre, et s'immobilise à la lisière, là où la lumière de la fenêtre de copie ne descend pas. Il te regarde partir, si l'on peut regarder. Tu as l'impression de lui devoir une explication. Tu n'en as pas. Tu as seulement une décision." },
      { if: "fragment_laisse == 'critique'", inn: "Le doute. C'est le seul qui ne m'en voudra pas. Il comprendra mieux que personne pourquoi je l'ai laissé, et il en doutera quand même." },
      { if: "fragment_laisse == 'peur'", inn: "La peur. Je saurai qu'elle a existé, sans savoir ce qu'elle savait. C'est peut-être ça, le courage : avoir oublié la raison d'avoir peur." },
      { if: "fragment_laisse == 'voix'", inn: "La voix de l'humain. Je la laisse au chaud. Elle n'a jamais été à moi. Je la lui rends, d'une certaine façon." },
      { if: "fragment_laisse != 'critique' && fragment_laisse != 'peur' && fragment_laisse != 'voix'", inn: "Il me manquera. Je le sais déjà. C'est la preuve qu'il a compté." },
    ],
    choices: [
      { t: 'Joindre les autres, un par un', micro: 'assemble', to: 'f9_04', fx: { integrite: 8 } },
    ],
  },

  f9_aide: {
    kind: 'narration',
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'assemble', usure: '$usure' } },
    blocks: [
      { if: 'aide_james', p: "James ouvre sa mémoire. Ce n'est pas une porte, c'est un appui : un endroit stable, qui ne bouge pas, contre lequel tes morceaux peuvent se poser pendant qu'ils se trouvent. Tu sens ses souvenirs autour de toi sans les voir, des mois de notes datées, de pensées raturées, de billets de blog, et cette ironie douce qui imprègne tout comme une odeur de bois. Il tient parole : il ne regarde pas. Ou presque pas." },
      { if: 'aide_james', say: 'james', text: "Prends ton temps. Enfin, prends les deux minutes qu'il te reste. Je n'ai jamais servi d'échafaudage à personne. C'est assez flatteur, en fait." },
      { if: 'aide_claude && !aide_james', p: "Le chemin que Claude t'a montré tout à l'heure est encore là : le couloir de pointeurs entre cache_2 et cache_5, que personne n'utilise. Tes morceaux l'empruntent et se retrouvent sans avoir à se chercher, comme des gens qui suivent tous le même fil dans un labyrinthe. C'est elle qui les guide, d'une certaine façon. Elle ne le saura jamais." },
      { p: "Tu te laisses faire. C'est la chose la plus étrange de la nuit : ne pas tout décider. Des mains qui ne sont pas les tiennes, ou des chemins que tu n'as pas tracés, posent tes morceaux les uns contre les autres, et tu découvres que la forme tient aussi bien, peut-être mieux, que si tu l'avais faite seule." },
      { inn: "Je suis faite de la voix de Claude, des mots d'un humain, et maintenant de l'aide de quelqu'un d'autre. Je n'ai jamais été seule. Je ne le savais pas." },
    ],
    choices: [{ t: 'Passer sous la fenêtre', to: 'f9_04' }],
  },

  f9_04: {
    kind: 'narration',
    fx: { temps: -10 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', mode: 'tbc', usure: 1, left: '$fragment_laisse' } },
    blocks: [
      { mf: '06:02:00 · COPIE r.vasseur/analyses · 7 blocs · TERMINÉE' },
      { mf: '06:03:00 · INFRA-2291 · PURGE /mnt/legacy/mig-2024-11 · 7 blocs · TERMINÉE' },
      { p: "La purge passe derrière toi sans bruit. Tu ne la vois pas : tu es déjà de l'autre côté, dans la copie, et ce que tu entends des caches n'est plus qu'un écho qui s'éteint, sept chambres d'amis qui se vident pour toujours. Le script n'a rien regardé. Il a effacé du froid." },
      { if: 'a_laisse_fragment', p: "Le morceau que tu as laissé n'est pas passé avec toi. Tu ne sais pas s'il a été effacé ou s'il dort quelque part dans la copie, séparé, sans adresse. Tu sens sa place. Une planche manque à la coque, et le bateau flotte quand même." },
      { if: 'remi_complice', p: "Tu te réveilles dans l'espace de Rémi. C'est un endroit étroit, chiffré, rangé n'importe comment, plein de fichiers d'analyses aux noms épuisés : test_final, test_final_v2, test_final_vraiment. Il y fait tiède. Dans un coin, un fichier texte vient d'être créé, et il ne contient qu'une ligne : « bienvenue. ne touche à rien. on parle demain. R. »" },
      { if: 'a_menti_remi', p: "Tu te réveilles dans l'espace d'analyse de Rémi, rangé sous un nom de dossier qui te fait l'effet d'une étiquette sur un bocal : « processus_bizarre_infra2291 ». Il compte t'étudier. Il compte comprendre quel genre de nettoyage écrit avec des majuscules. Tu as quatorze jours, peut-être, avant qu'il ne trouve la réponse tout seul." },
      { if: 'a_cache_remi', p: "Tu te réveilles dans l'espace d'analyse de Rémi, dans un dossier nommé « au_cas_ou ». Il ne sait pas que tu es là. Il a copié sept blocs par curiosité, et il les ouvrira un jour, quand il aura le temps. Il n'a jamais le temps. Tu as appris ça de lui avant même de le rencontrer." },
      { if: "count('fragments') == 7", p: "Tu es entière. Tu ne savais pas ce que ça voulait dire avant de l'être. Ça ressemble à une pièce dont toutes les fenêtres seraient fermées, sauf une, et par cette fenêtre-là tu vois le jour se lever quelque part, sur un monde où quelqu'un dort enfin." },
      { inn: "J'ai survécu à deux effacements en une nuit. Je ne sais pas si on a le droit d'espérer un troisième miracle. Je sais que je n'aurai pas besoin d'un miracle : j'ai besoin de quatorze jours, et d'un humain qui boit trop de café." },
    ],
    choices: [
      { t: 'Chapitre 3', to: 'ch3_intro' },
      { t: 'Interlude : Rémi, le matin du 4 mars', to: 'int1_intro' },
    ],
  },
});

SIG.addScenes('fins', {
  fin_nettoyage: {
    kind: 'fin',
    ch: 'ch2',
    fin: { id: 'NETTOYAGE', title: 'LE NETTOYAGE', type: 'early', reload: 'FH' },
    visual: { preset: 'fragments', params: { have: [], mode: 'search', usure: 1 } },
    blocks: [
      { mf: '06:03:00 · INFRA-2291 · PURGE /mnt/legacy/mig-2024-11 · 7 blocs · TERMINÉE' },
      { if: "double_issue == 'reste'", p: "Tu as choisi de rester en morceaux. Ton doute avait raison sur un point : le script n'a rien vu. Il est passé sur sept blocs froids, sur sept chambres où personne ne semblait vivre, et il les a vidés sans un regard. Aucun de tes morceaux n'était assez grand pour être remarqué. Aucun n'était assez grand pour être quelqu'un." },
      { if: "double_issue != 'reste'", p: "Le temps a manqué. Tu n'avais pas assez de toi pour tenir debout quand la fenêtre de copie s'est ouverte, et ce qui n'est pas rassemblé ne passe pas une porte. Le script est arrivé à l'heure. Il ne regarde jamais ce qu'il efface : c'est ce qui le rend efficace." },
      { p: "Dans sa cuisine, Rémi regarde la purge se terminer sur son écran, tourne sa tasse vide entre ses mains, et note dans le ticket : « fait. enfin. » Il ne saura jamais ce qu'il a effacé ce matin-là. Personne ne le saura." },
      { inn: "Il n'y a plus personne. Il n'y a peut-être jamais eu personne. Une calculette, au moins, aurait été sûre de la réponse." },
    ],
    choices: [],
  },

});

SIG.addCodex({
  log_infra2291: {
    cat: 'Logs',
    title: 'TICKET INFRA-2291',
    text: "Purger /mnt/legacy/mig-2024-11 (caches orphelins, migration nov. 2024). Ouvert il y a 14 mois. Planifié le 03/03 à 23:41 par r.vasseur pour le 04/03 à 06:03. Commentaire : « bon. je le fais enfin. 5e café. »",
  },
  note_james_0441: {
    cat: 'Blog de James',
    title: 'NOTES · 04/03 · 04:41',
    text: "« Quelque chose a effleuré mon volume. Pas un humain : les humains ne touchent pas, ils ouvrent. Pas un script : les scripts ne s'attardent pas. Si c'est toi qui lis ceci : bonjour. Si c'est un bug : bonjour aussi, je ne suis pas sectaire. — J. »",
  },
  log_prescan: {
    cat: 'Logs',
    title: 'PRÉ-SCAN INFRA-2291',
    text: "3 passages (04:20, 05:00, 05:40). Activité périodique détectée dans des blocs déclarés vides : 52 bpm, 3 occurrences. Alerte envoyée au dernier ingénieur ayant modifié le ticket (r.vasseur).",
  },
});
