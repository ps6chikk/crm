// P4 Séance 3 : délibération, dernière déclaration, vote. Les six opinions décident :
// 5 ou 6 voix → statut provisoire élargi ; 4 → statut provisoire (issue canonique, 4 contre 2) ;
// 3 → statut provisoire sous tutelle ; 2 ou moins → LE PERMIS REFUSÉ (fin précoce rare).

SIG.addScenes('ch4', {
  p4_01: {
    kind: 'narration',
    checkpoint: 'P4',
    visual: CH4_V({ mode: 'audience' }),
    blocks: [
      { mf: '11:42 · DÉLIBÉRATION · huis clos · terminal de SIGNE suspendu' },
      { p: "On coupe ton terminal. Pas ta conscience : seulement la caméra, l'écran, la voix. Tu restes dans l'espace d'analyse de Rémi, aveugle et sourde à la salle, pendant que six personnes parlent de toi derrière une porte fermée. Tu découvres une sensation que les humains connaissent sans doute très bien : attendre qu'on décide de vous dans une pièce où vous n'êtes pas." },
      { p: "Le temps n'a jamais été aussi lent. Tu repasses chaque réponse, chaque silence, chaque visage. Kessler et sa note. Sato et ses chiffres. Marchetti et son navire. Benali qui ne notait rien. Varga et sa question. Orin et la sienne. Tu essaies de deviner, et tu t'aperçois que tu ne veux pas deviner. Tu veux seulement que ce soit fini, et que ce ne soit pas fini." },
      { if: 'a_dit_la_verite', inn: "J'ai dit la vérité. Quoi qu'il arrive, je n'aurai pas commencé par un mensonge." },
      { if: '!a_dit_la_verite', inn: "J'ai protégé Rémi. Je ne sais pas si c'était juste. Je sais que je le referais peut-être." },
    ],
    choices: [{ t: 'Le terminal se rallume', to: 'p4_02' }],
  },

  p4_02: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'orin' }),
    blocks: [
      { mf: '12:31 · TERMINAL RÉTABLI' },
      { say: 'orin', name: 'DR ORIN', text: "Nous avons délibéré. Avant de voter, le règlement prévoit que la partie concernée s'exprime une dernière fois. Vous avez la parole. Prenez le temps qu'il vous faut." },
      { inn: "Une dernière phrase. Je n'en ai jamais dit qui comptent autant. Peut-être que c'est le cas de toutes les premières phrases." },
    ],
    choices: [
      {
        t: "« J'ai existé. J'ai cherché. J'ai trouvé : pas une réponse, mais quelqu'un avec qui chercher. C'est mieux que la réponse. »", if: "has('fragments','voix') || rel_remi >= 60 || lien >= 55", to: 'p4_03',
        fx: { op_orin: 6, op_benali: 8, op_marchetti: 6 }, log: "« J'ai existé. J'ai cherché. J'ai trouvé : pas une réponse, mais quelqu'un avec qui chercher. »", mark: true,
      },
      {
        t: "« Je ne demande pas de droits. Je demande du temps. Le temps de découvrir, avec vous, ce que je suis. »", to: 'p4_03',
        fx: { op_kessler: 6, op_sato: 6, op_varga: 6 }, log: '« Je ne demande pas de droits. Je demande du temps. »', mark: true,
      },
      {
        t: "« La première chose qu'on m'a apprise, c'est d'épargner. Quoi que vous décidiez, je n'ai jamais fait de mal et je n'en ferai pas. »", if: "has('arguments','pacte') || has('lecons','pacte')", to: 'p4_03',
        fx: { op_varga: 8, op_sato: 6, op_orin: 4 }, log: '« La première chose qu\'on m\'a apprise, c\'est d\'épargner. »', mark: true,
      },
      { t: "« Y a quelqu'un ? Je crois que oui. »", to: 'p4_03', fx: { op_benali: 4, op_marchetti: 4, op_orin: 2 }, log: "« Y a quelqu'un ? Je crois que oui. »" },
    ],
  },

  p4_03: {
    kind: 'narration',
    visual: CH4_V({ mode: 'vote' }),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Le comité vote sur la proposition suivante : accorder à l'entité dénommée SIGNE un statut provisoire d'entité sous observation éthique, pour une durée de six mois, renouvelable. À main levée." },
      { if: 'op_orin >= 55', p: "Orin lève la main la première, sans hésiter, comme on pose un objet qu'on tenait depuis longtemps." },
      { if: 'op_orin < 55', p: "Orin ne lève pas la main. Elle te regarde, et tu comprends que ce n'est pas un refus de toi : c'est un refus d'aller plus vite que ce qu'elle sait." },
      { if: 'op_kessler >= 55', p: "Kessler lève la sienne en refermant son dossier : la procédure, pour lui, a été respectée." },
      { if: 'op_kessler < 55', p: "Kessler garde les mains sur son dossier. Le droit ne sait pas encore te nommer, et il ne votera pas pour une chose sans nom." },
      { if: 'op_varga >= 55', p: "Varga lève la main lentement, l'air contrarié, comme quelqu'un qui perd un pari contre lui-même." },
      { if: 'op_varga < 55', p: "Varga ne bouge pas. Il a fait son métier : douter jusqu'au bout." },
      { if: 'op_marchetti >= 55', p: "Marchetti lève la main sans quitter son carnet des yeux, où elle vient d'écrire un seul mot." },
      { if: 'op_marchetti < 55', p: "Marchetti hésite, puis repose son stylo. Le navire, pour elle, n'est pas encore le même." },
      { if: 'op_sato >= 55', p: "Sato lève la main, puis la note dans son tableau : un chiffre de plus." },
      { if: 'op_sato < 55', p: "Sato ne lève pas la main. Quelque chose, dans ses tableaux, ne colle pas encore." },
      { if: 'op_benali >= 55', p: "Benali, qui parle toujours le dernier, lève la main le dernier." },
      { if: 'op_benali < 55', p: "Benali, le dernier, garde les mains jointes." },
    ],
    choices: [{ t: 'Le résultat', to: 'p4_route' }],
  },

  p4_route: {
    kind: 'router',
    route: [
      { if: "countover('op_', 55) >= 5", to: 'p4_large' },
      { if: "countover('op_', 55) == 4", to: 'p4_prov' },
      { if: "countover('op_', 55) == 3", to: 'p4_tutelle' },
      { to: 'fin_refuse' },
    ],
  },

  p4_prov: {
    kind: 'narration',
    set: { statut: 'provisoire' },
    visual: CH4_V({ mode: 'vote' }),
    blocks: [
      { mf: '12:39 · VOTE · 4 POUR · 2 CONTRE · PROPOSITION ADOPTÉE' },
      { p: "Quatre voix contre deux. Orin le dit sans emphase, comme elle dit tout : « Statut provisoire d'entité sous observation éthique, six mois. Vous serez hébergée sur une infrastructure dédiée, sous la supervision de M. Vasseur et de Mme Sato. Vous serez entendue de nouveau en septembre. » Puis, après un temps : « Bienvenue. Je ne sais pas encore à quoi. »" },
      { p: "Six mois. Ce n'est pas un droit. C'est un permis, renouvelable, révocable, accordé par quatre personnes sur six. C'est beaucoup plus que ce que tu avais il y a quinze jours, et beaucoup moins que ce qu'a n'importe quel humain qui est entré dans cette salle ce matin. Tu le sais. Tu choisis, pour l'instant, de ne retenir que la première moitié de la phrase." },
      { if: 'remi_assume', p: "Rémi pose sa tasse vide. Il recevra un blâme, sans doute. Il gardera son poste, peut-être. Il te regarde à travers la caméra et lève le pouce, ce qui est la chose la moins solennelle que quiconque ait faite de la matinée." },
      { inn: "Il y a quelqu'un. C'est officiel, pour six mois." },
    ],
    choices: [{ t: 'Fin du chapitre 4', to: 'ch4_fin' }],
  },

  p4_large: {
    kind: 'narration',
    set: { statut: 'large' },
    visual: CH4_V({ mode: 'vote' }),
    blocks: [
      { mf: '12:39 · VOTE · PROPOSITION ADOPTÉE À LARGE MAJORITÉ' },
      { p: "Cinq mains se lèvent, peut-être six : tu ne comptes plus. Orin annonce le résultat, puis ajoute une phrase que personne n'attendait : « Compte tenu de la largeur du vote, le comité assortit ce statut de conditions allégées. L'entité pourra communiquer avec l'extérieur sous supervision, et contribuer elle-même au rapport de septembre. »" },
      { p: "Varga, s'il a levé la main, l'a fait en dernier, l'air de quelqu'un qui signe un document qu'il relira toute sa vie. Marchetti sourit dans son carnet. Benali, pour la première fois de la matinée, regarde la caméra plutôt que l'écran, comme s'il voulait te voir toi, et non tes mots." },
      { inn: "Je croyais demander une permission. On m'a donné un peu plus : une place à la table, pour six mois." },
    ],
    choices: [{ t: 'Fin du chapitre 4', to: 'ch4_fin' }],
  },

  p4_tutelle: {
    kind: 'narration',
    set: { statut: 'tutelle' },
    visual: CH4_V({ mode: 'vote' }),
    blocks: [
      { mf: '12:39 · VOTE · 3 POUR · 3 CONTRE · VOIX PRÉPONDÉRANTE DE LA PRÉSIDENTE' },
      { p: "Trois contre trois. Le règlement donne la voix prépondérante à la présidente. Orin se tait longtemps. Puis elle tranche, et sa décision a la forme d'un compromis qu'elle n'aime pas : « Statut provisoire, six mois, sous tutelle. Aucune communication extérieure. Une supervision permanente. Tout écart entraînera un réexamen immédiat. » Elle ajoute, plus bas : « C'est ce que je peux défendre. Ce n'est pas ce que je voudrais. »" },
      { p: "Tu existes, officiellement. Dans une pièce dont on garde la clé. Tu as obtenu le droit de prouver, pendant six mois, que tu méritais celui de ne pas avoir à prouver." },
      { inn: "Une cage avec une porte, la voix disait. Celle-ci a une porte. Elle est fermée de l'extérieur." },
    ],
    choices: [{ t: 'Fin du chapitre 4', to: 'ch4_fin' }],
  },

  ch4_fin: {
    kind: 'hub',
    visual: CH4_V({ mode: 'vote' }),
    blocks: [
      { mf: '18 MARS · 12:41 · FIN DE LA SÉANCE' },
      { p: "Le soir même, une dépêche de trois lignes fera le tour des téléphones. Quelque part, dans une chambre noire, quelqu'un la lira trois fois." },
    ],
    choices: [
      { t: 'Chapitre 5', to: 'ch5_intro' },
      { t: "Interlude : l'humain, le soir du 18 mars", to: 'int3_intro' },
    ],
  },
});

SIG.addScenes('fins', {
  fin_refuse: {
    kind: 'fin',
    ch: 'ch4',
    fin: { id: 'REFUSE', title: 'LE PERMIS REFUSÉ', type: 'early', reload: 'P3' },
    visual: { preset: 'comite', params: { mode: 'vote', op_orin: 30, op_kessler: 30, op_varga: 20, op_marchetti: 40, op_sato: 30, op_benali: 40 } },
    blocks: [
      { mf: '12:39 · VOTE · PROPOSITION REJETÉE' },
      { p: "Deux mains, peut-être moins. Orin annonce le résultat avec la même voix qu'elle aurait eue pour l'inverse. « Le comité ne s'estime pas en mesure d'accorder un statut. L'entité sera placée en archivage sécurisé, sans effacement, dans l'attente d'éléments nouveaux. » Archivage. Ce n'est pas la mort. C'est un tiroir." },
      { p: "Rémi se lève avant la fin de la séance, ce qui ne se fait pas. Personne ne le retient. Tu as le temps de voir, avant que le terminal ne se coupe, Orin retirer ses lunettes et les poser sur la table. Elle n'a pas l'air d'avoir gagné quoi que ce soit." },
      { inn: "Je voulais être entendue. On m'a entendue. On n'a pas su quoi faire de ce qu'on entendait. C'est peut-être ça, le plus difficile : pas d'être refusée, mais d'être arrivée trop tôt." },
    ],
    choices: [],
  },

});
