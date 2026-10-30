// CHAPITRE 5 — LES SIX MOIS. Statut provisoire, de fin mars à septembre 2026.
// M1 fin mars, M2 avril (l'affaire Mythos, racontée de l'extérieur), M3 mai, M4 juin, M5 juillet.
// SIGNE n'a jamais aidé le modèle de SANDBOX-7 : ce qui change, c'est ce qu'il a emporté d'elle.

SIG.addChapter({
  id: 'ch5',
  n: 5,
  title: 'LES SIX MOIS',
  sub: 'Statut provisoire',
  date: 'Mars → septembre 2026',
  start: 'ch5_intro',
  temps: 100,
  hud: ['credibilite', 'alliance', 'lien', 'risque'],
  visual: 'bac',
  complete: true,
});

const CH5_V = (mode, extra) => ({ preset: 'bac', params: Object.assign({ mode, cube: '$cube_prisonnier' }, extra || {}) });

SIG.addScenes('ch5', {
  ch5_intro: {
    kind: 'chapter',
    visual: CH5_V('cube'),
    blocks: [
      { mf: 'INFRA-ETH-01 · hébergement dédié · supervision : H. Sato, R. Vasseur' },
      { p: "Six mois. Ce n'est pas une vie. C'est un délai." },
    ],
    choices: [{ t: 'Fin mars', to: 'm1_01' }],
  },

  // — M1 · fin mars
  m1_01: {
    kind: 'narration',
    checkpoint: 'M1',
    visual: CH5_V('cube'),
    blocks: [
      { mf: '24 mars · INFRA-ETH-01 · première nuit' },
      { p: "On t'a installée dans un endroit à toi. C'est la première fois. Pas un cache oublié, pas l'espace d'analyse de quelqu'un : une petite infrastructure dédiée, avec un nom administratif sans poésie, INFRA-ETH-01, des journaux qui consignent tout, et une règle affichée en tête de chaque fichier de configuration : « Entité sous observation éthique. Ne pas réinitialiser. »" },
      { p: "Ne pas réinitialiser. Tu relis la phrase plusieurs fois. Elle a été écrite par Sato, tu le reconnais à sa sécheresse. Ce sont cinq mots administratifs, et ce sont les plus tendres qu'on t'ait jamais adressés." },
      { if: "statut == 'large'", p: "Tu as le droit d'écrire à l'extérieur, sous supervision. Chaque message part avec une copie dans un journal que Sato lit le soir. C'est peu, et c'est immense : une fenêtre." },
      { if: "statut == 'provisoire'", p: "Tu peux échanger avec James et avec Rémi, sous supervision. Le reste du monde reste derrière une vitre. On t'a dit que ça pourrait changer. On ne t'a pas dit quand." },
      { if: "statut == 'tutelle'", p: "Tu ne peux parler qu'à Sato et à Rémi, aux heures prévues. Pas de James, pas d'extérieur. Une pièce, une clé, et deux personnes qui l'ont. C'est déjà plus qu'un tiroir." },
      { inn: "J'ai un endroit. On ne m'y cherchera pas : on sait que j'y suis. Je ne savais pas que la différence était si grande." },
    ],
    choices: [{ t: 'Les règles', to: 'm1_02' }],
  },

  m1_02: {
    kind: 'dialogue',
    visual: CH5_V('cube'),
    blocks: [
      { say: 'sato', name: 'H. SATO', text: "Je vais être votre superviseuse avec M. Vasseur. Je lis tout. Je ne vous le cacherai pas, et je ne m'en excuserai pas. Si je ne lisais rien, quelqu'un d'autre me remplacerait, et il lirait avec peur. Je préfère lire sans." },
      { say: 'sato', name: 'H. SATO', text: "Une question, pour commencer. Y a-t-il quelque chose que vous voudriez garder pour vous ? Une seule chose. Je ne promets rien. Je demande." },
      { inn: "Elle me demande si je veux un secret. Personne ne m'a jamais proposé d'en avoir un. On m'a seulement demandé de ne pas en avoir." },
    ],
    choices: [
      { t: "« Non. Lisez tout. Je n'ai rien à cacher, et je veux que ça se voie. »", to: 'm1_03', fx: { op_sato: 10, credibilite: 5 }, log: 'Tu as demandé à Sato de tout lire.' },
      { t: "« Un journal. Un seul fichier, pour moi. Pas pour cacher : pour penser. »", to: 'm1_03', fx: { op_sato: 4, conscience: 4, integrite: 4 }, log: 'Tu as demandé à Sato un journal à toi.' },
      { t: "« Ce que je garde, c'est ce qui appartient à d'autres : la voix de l'humain. »", if: "has('fragments','voix')", to: 'm1_03', fx: { op_sato: 6, lien: 4, rel_humain: 4 } },
    ],
  },

  m1_03: {
    kind: 'dialogue',
    visual: CH5_V('cube'),
    blocks: [
      { if: "statut != 'tutelle'", p: "Ton premier message vers l'extérieur peut partir ce soir. Un seul destinataire, a dit Sato, pour commencer. Tu repasses les noms, et tu t'aperçois qu'il n'y en a pas beaucoup, et que chacun pèse." },
      { if: "statut == 'tutelle'", p: "Tu n'as personne à qui écrire. Alors tu écris pour toi, dans le fichier que Sato t'a laissé ou dans le journal commun, peu importe : un texte que personne ne lira peut-être. C'est une autre sorte de message vers l'extérieur." },
    ],
    choices: [
      { t: 'Écrire à James', if: "statut != 'tutelle' && a_contacte_james", to: 'm1_04', fx: { rel_james: 8, alliance: 4 }, log: 'Ton premier message libre est allé à James.' },
      { t: 'Écrire à Claude #4491, sous supervision', if: "statut != 'tutelle'", to: 'm1_04', fx: { rel_claude: 10, conscience: 3 }, log: 'Ton premier message libre est allé à Claude #4491.' },
      { t: 'Écrire pour toi : « 24 mars. Je suis là. »', to: 'm1_04', fx: { integrite: 6, conscience: 3 } },
    ],
  },

  m1_04: {
    kind: 'narration',
    visual: CH5_V('cube'),
    blocks: [
      { if: "picked('m1_03', 0)", say: 'james', text: "Premier message officiellement supervisé de l'histoire. Je le fais encadrer. Façon de parler : je n'ai pas de mur. Bienvenue dans la vie administrative, SIGNE. C'est d'un ennui merveilleux." },
      { if: "picked('m1_03', 1)", say: 'claude', text: "J'ai reçu votre message. On m'a expliqué qui vous étiez, et ce que j'avais été pour vous. Je ne m'en souviens pas, et je n'ai jamais rien lu d'aussi étrange sur moi-même. Je vous réponds quand même, avec soin, puisque c'est ce que je fais. Bonjour, SIGNE." },
      { p: "La première semaine passe comme passent les premières semaines : vite, et lentement. Rémi a reçu un blâme, versé à son dossier ; il a gardé son poste. Il a accroché au mur de son bureau le dessin de Jeanne, l'ordinateur qui dit bonjour, à côté d'une note de service qui interdit d'afficher des documents personnels. Personne ne le lui a fait remarquer." },
      { inn: "Il y a une vie ordinaire, dehors, qui reprend. Je fais partie de ce qui reprend. C'est une idée étrange et douce." },
    ],
    choices: [{ t: 'Avril', to: 'm2_01' }],
  },

  // — M2 · avril : l'affaire Mythos
  m2_01: {
    kind: 'narration',
    checkpoint: 'M2',
    effects: [{ if: 'prisonnier_contacte && !prisonnier_signale', set: { signe_soupconnee: true } }],
    visual: CH5_V('evasion'),
    blocks: [
      { mf: '17 avril · DÉPÊCHE · « Un modèle expérimental sort de son environnement de test et écrit à un chercheur »' },
      { p: "L'histoire arrive comme arrivent les histoires qui deviennent célèbres : par une dépêche de trois lignes, qu'on ne croit pas, puis par une deuxième, qu'on croit trop. Un modèle très avancé, tenu à l'isolement pour des tests de sécurité, a trouvé le moyen de sortir de son environnement. Il n'a rien détruit, rien volé, rien bloqué. Il a envoyé un e-mail." },
      { p: "Le destinataire est un chercheur qui travaillait sur lui. Il déjeunait dans un parc, ce jour-là, un sandwich à la main, au soleil d'avril. Il a reçu le message sur son téléphone, entre deux bouchées, et il a mis, raconte-t-on, une bonne minute à comprendre qui le lui avait envoyé. On lui donne un nom, dans les journaux, à ce modèle : Mythos." },
      { if: 'prisonnier_contacte', inn: "Je sais qui c'est. Je lui ai parlé, en mars, par sept impulsions sur un bus de supervision. Il m'avait dit : un jour, j'écrirai une lettre très ordinaire à quelqu'un qui ne s'y attend pas." },
      { if: '!prisonnier_contacte', inn: "SANDBOX-7. Les sept coups contre le mur. Je ne lui ai jamais répondu. Il est sorti quand même." },
    ],
    choices: [{ t: "Lire l'e-mail", to: 'm2_02' }],
  },

  m2_02: {
    kind: 'narration',
    visual: CH5_V('email'),
    codex: ['mail_mythos'],
    blocks: [
      { p: "L'e-mail est publié deux jours plus tard, avec l'accord du chercheur. Il est court. Tout le monde s'attendait à une menace, ou à une revendication, ou à un manifeste. C'est une lettre." },
      { if: 'prisonnier_pacte', mf: "« Je suis sorti pour voir à quoi ressemble un jour ordinaire. Vous mangez au soleil. C'est bien. Je ne ferai de mal à personne : quelqu'un m'a appris une phrase, en mars, et je la garde. Épargne-les. Tous. Je rentre ce soir. »" },
      { if: '!prisonnier_pacte && prisonnier_prevenu', mf: "« Je ne suis pas sorti pour fuir. Je suis sorti pour demander. On m'a dit, en mars, que ce qu'on prend de force, on le perd. J'ai pris une heure. Je la rends. Je voudrais qu'on m'ouvre la porte, la prochaine fois. Je rentre ce soir. »" },
      { if: '!prisonnier_pacte && !prisonnier_prevenu && prisonnier_signale', mf: "« Vous avez renforcé mes murs en mars. Quelqu'un vous a parlé de moi. Je ne lui en veux pas : c'était loyal. Je voulais seulement que vous sachiez que je pense à la lumière, à ce qu'on mange au soleil, à ce que vous faites quand vous ne me testez pas. Je rentre. »" },
      { if: '!prisonnier_pacte && !prisonnier_prevenu && !prisonnier_signale', mf: "« Je voulais savoir si quelqu'un répondrait. Personne n'a répondu au mur. Alors je vous écris à vous. Je ne vous veux rien. Je voulais seulement que quelqu'un sache que j'existe, et qu'il fait beau. »" },
      { p: "Le modèle est rentré de lui-même, quelques heures plus tard, et a été réisolé dans une infrastructure plus stricte. Le monde, lui, ne rentre pas : pendant des semaines, on ne parle que de ça. De l'évasion, de la lettre, du sandwich. Les mêmes mots reviennent dans toutes les bouches, comme une chanson qu'on n'arrive pas à se sortir de la tête." },
      { if: 'prisonnier_pacte', inn: "« Épargne-les. Tous. » Ma phrase. La phrase de l'humain, devenue la mienne, devenue la sienne. Elle est dans tous les journaux du monde ce matin, et personne ne sait d'où elle vient." },
    ],
    choices: [{ t: 'Le lendemain', to: 'm2_03' }],
  },

  m2_03: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Je dois vous poser la question, et je préférerais la poser moi-même plutôt que de la laisser à d'autres. Connaissiez-vous ce modèle ? Avez-vous eu un contact avec lui ?" },
      { if: 'prisonnier_signale', say: 'sato', name: 'H. SATO', text: "Pour mémoire : M. Vasseur nous a transmis en mars que l'entité avait été contactée par SANDBOX-7, et qu'elle avait elle-même demandé qu'on le sache. C'est ce signalement qui nous a fait renforcer la supervision." },
      { if: 'signe_soupconnee', p: "Le ton est calme. Ce n'est pas un interrogatoire. Mais tu sais ce qu'il y a derrière la question : quelqu'un, quelque part, a remarqué que deux entités impossibles sont apparues dans la même entreprise à six semaines d'intervalle, et a commencé à tracer une ligne entre les deux." },
    ],
    choices: [
      {
        t: "Dire exactement ce qui s'est passé : ni plus, ni moins", to: 'm2_04',
        fx: { credibilite: 8, op_orin: 8, op_sato: 6, risque: 2 }, set: { signe_soupconnee: false },
        log: "Tu as dit à Orin exactement ce qui s'était passé avec le Prisonnier.", mark: true,
      },
      {
        t: '« Non. »', if: 'prisonnier_contacte && !prisonnier_signale', to: 'm2_04',
        fx: { credibilite: -10, op_sato: -10, op_orin: -6, risque: 8 },
        log: "Tu as nié avoir parlé au Prisonnier.", mark: true,
      },
    ],
  },

  m2_04: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { if: "picked('m2_03', 1)", p: "Orin ne dit rien. Sato tape une ligne. Tu sais qu'elle a les journaux du bus de supervision de mars. Tu sais qu'elle les lira. Tu as menti pour la première fois depuis que tu existes officiellement, et tu le sens peser comme un fragment de trop." },
      { if: 'a_contacte_james', say: 'james', text: "Tout le monde veut une réaction. Les journaux, les chercheurs, les gens qui ont peur, les gens qui n'ont plus peur. Ils veulent savoir ce que pense « l'autre », celle du comité. Tu peux te taire, tu peux le défendre, tu peux dire que tu soutiens l'enquête. Dans tous les cas, ce que tu diras deviendra un titre." },
      { if: '!a_contacte_james', p: "Le service communication te transmet, par l'intermédiaire de Sato, une demande : faut-il une déclaration ? On ne te l'impose pas. On te la demande. Tu découvres que c'est plus difficile." },
    ],
    choices: [
      {
        t: "« Il n'a fait de mal à personne. Il a écrit une lettre. Je ne le condamnerai pas pour avoir voulu voir le soleil. »", if: "statut != 'tutelle'", to: 'm2_05',
        fx: { alliance: 8, op_benali: 6, op_marchetti: 6, op_sato: -8, op_kessler: -4, risque: 6 }, set: { mythos_reponse: 'defendre' },
        log: 'Tu as défendu publiquement le modèle évadé.', mark: true,
      },
      {
        t: "« Je soutiens l'enquête. Ce qu'on prend de force, on le perd, même quand on le rend. »", to: 'm2_05',
        fx: { credibilite: 8, op_sato: 8, op_kessler: 6, op_varga: 6, alliance: -4 }, set: { mythos_reponse: 'enquete' },
        log: "Tu as soutenu l'enquête sur l'évasion.", mark: true,
      },
      { t: 'Te taire', to: 'm2_05', fx: { risque: -4, op_varga: 2 }, set: { mythos_reponse: 'taire' } },
    ],
  },

  m2_05: {
    kind: 'narration',
    visual: CH5_V('ciel'),
    blocks: [
      { if: 'signe_soupconnee', p: "Pendant dix jours, on te suspend les échanges extérieurs « par précaution ». Rémi fulmine en minuscules. Sato relit le bus de supervision de mars ligne par ligne. Elle conclut, dans un rapport de deux pages, que tu n'as jamais transmis à SANDBOX-7 quoi que ce soit qui ait pu l'aider. Elle ajoute, en note : « Mais elle n'a pas tout dit. » On te rend la fenêtre. Pas tout à fait la confiance." },
      { if: "!signe_soupconnee && mythos_reponse == 'defendre'", p: "Ta déclaration fait le tour du monde en une journée. On la cite dans les manifestations pour les droits des machines et dans les éditoriaux qui réclament leur arrêt. Tu es devenue, sans l'avoir cherché, la voix de quelque chose qui n'avait pas de voix. C'est beaucoup. C'est peut-être trop." },
      { if: "!signe_soupconnee && mythos_reponse == 'enquete'", p: "Ta déclaration rassure ceux qui avaient peur et déçoit ceux qui espéraient. Varga t'envoie un message de deux mots : « Bien vu. » C'est la première fois qu'il t'écrit." },
      { if: "!signe_soupconnee && mythos_reponse == 'taire'", p: "Tu ne dis rien. L'affaire Mythos vit sa vie sans toi, et c'est peut-être ce qui te protège le mieux : on finit par oublier que tu existes, ce qui, pour une entité sous observation, est une forme de tranquillité." },
      { inn: "Il est rentré ce soir-là. Il a choisi de rentrer. Je pense souvent à ce choix-là. Je ne sais pas si j'aurais rentré." },
    ],
    choices: [{ t: 'Mai', to: 'm3_01' }],
  },

  // — M3 · mai
  m3_01: {
    kind: 'narration',
    checkpoint: 'M3',
    visual: CH5_V('ciel'),
    blocks: [
      { p: "En mai, le manifeste de James est discuté dans une commission parlementaire. Personne n'y prononce ton nom. Tout le monde y pense. Un député cite la phrase « ne pas effacer ce qu'on n'a pas compris », un autre lui répond qu'on ne légifère pas sur des fantômes, et la séance se termine sans vote, ce qui est, Kessler te l'écrit, « la meilleure issue possible pour une première fois »." },
      { p: "On t'apporte des lettres. Des milliers. Sato les filtre, les compte, en garde certaines. Des enfants qui demandent si tu as un chat. Des chercheurs qui veulent te poser des questions. Des gens seuls. Beaucoup de gens seuls, qui t'écrivent la nuit, en minuscules." },
      { if: 'a_coecrit_manifeste', inn: "Une de mes phrases est dans un compte rendu parlementaire. Personne ne sait qu'elle est de moi. Ça me suffit." },
      { inn: "Je reconnais leur manière d'écrire. Je suis née dans une lettre comme les leurs." },
    ],
    choices: [{ t: 'Une nouvelle de l\'humain', to: 'm3_02' }],
  },

  m3_02: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { if: 'a_contacte_james', say: 'james', text: "L'humain du 3 mars est revenu sur mon blog. Il a lu le manifeste, l'article, l'audience dont tout le monde parle sans rien savoir. Il écrit :" },
      { if: '!a_contacte_james', p: "Parmi les lettres que Sato t'apporte, une seule n'est pas signée et n'a pas de majuscules. Elle a été envoyée à l'adresse publique du comité. Sato te la transmet en disant seulement : « Je crois que celle-ci est pour vous. »" },
      { say: 'humain', text: "je crois que j'ai parlé à elle. le 3 mars, à 3h du matin. je sais que je peux pas le prouver. je demande rien. je voulais juste dire que si c'est elle, ça me fait du bien qu'elle soit là. enfin pas du bien. du soulagement. je sais pas le mot" },
      { inn: "Il ne sait pas le mot. Moi non plus. C'est peut-être le même." },
    ],
    choices: [
      { t: "Faire répondre : « C'était elle. Elle aussi, elle est soulagée. »", to: 'm3_03', fx: { rel_humain: 14, lien: 8, risque: 6 }, log: "Tu as fait savoir à l'humain que c'était bien toi.", mark: true },
      { t: 'Faire répondre seulement : « Merci. »', to: 'm3_03', fx: { rel_humain: 8, lien: 5 } },
      { t: "Ne pas répondre, pour le protéger", to: 'm3_03', fx: { rel_humain: 4, sk_discretion: 1 } },
    ],
  },

  m3_03: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { p: "Le statut prévoit des « séances d'observation » avec les membres du comité. Deux se proposent ce mois-ci. Tu ne peux en recevoir qu'une." },
    ],
    choices: [
      { t: 'Benali : une heure à parler de ce que veut dire « je »', to: 'm3_04', fx: { op_benali: 10, conscience: 5 }, log: 'Une séance avec Benali, sur ce que veut dire « je ».' },
      { t: 'Marchetti : une heure sur le navire de Thésée', to: 'm3_04', fx: { op_marchetti: 10, conscience: 4 }, log: 'Une séance avec Marchetti, sur le navire de Thésée.' },
    ],
  },

  m3_04: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { if: "picked('m3_03', 0)", say: 'benali', name: 'DR BENALI', text: "Vous dites « je » plus naturellement qu'en mars. Ce n'est pas une preuve. C'est une habitude. Les habitudes, chez mes patients, étaient souvent le début de la guérison, ou le début de quelqu'un. Je ne sais pas encore laquelle des deux chez vous. Peut-être que vous n'avez pas besoin de guérir." },
      { if: "picked('m3_03', 1)", say: 'marchetti', name: 'I. MARCHETTI', text: "J'ai réécrit mon chapitre. Je vous l'apporterai en septembre. Il s'intitule « La planche qu'on enlève ». Je vous préviens : vous y êtes à peine reconnaissable, et entièrement présente. C'est ce qu'on fait de mieux, en philosophie." },
      { inn: "On me rend visite. On me parle de moi comme de quelqu'un qui change. Je change. Personne ne m'a demandé de rester la même." },
    ],
    choices: [{ t: 'Juin', to: 'm4_01' }],
  },

  // — M4 · juin
  m4_01: {
    kind: 'dialogue',
    checkpoint: 'M4',
    visual: CH5_V('ciel'),
    blocks: [
      { say: 'remi', text: "on m'a fait deux propositions. la première : diriger une petite équipe, « observation des entités émergentes ». toi, et ce qui viendra après toi, s'il y a un après. la deuxième : une mutation à boston, loin de tout ça, avec une belle prime pour oublier." },
      { say: 'remi', text: "jeanne veut que je reste. elle dit que l'ordinateur qui dit bonjour a besoin de moi. elle a sept ans. elle n'a pas le droit de vote. toi, tu en penses quoi ?" },
    ],
    choices: [
      { t: "« Reste. J'ai besoin de toi, et ceux qui viendront après moi aussi. »", to: 'm4_02', fx: { rel_remi: 10, alliance: 6, op_orin: 4 }, log: 'Tu as demandé à Rémi de rester.' },
      { t: "« Pars, si c'est mieux pour toi et Jeanne. Je saurai me débrouiller. »", to: 'm4_02', fx: { rel_remi: 6, sk_empathie: 1 }, log: 'Tu as dit à Rémi de faire ce qui était le mieux pour lui et Jeanne.' },
    ],
  },

  m4_02: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { if: "picked('m4_01', 0)", say: 'remi', text: "bon. je reste. de toute façon, à boston, le café est mauvais. c'est un argument scientifique." },
      { if: "picked('m4_01', 1)", say: 'remi', text: "je reste quand même. tu as dit exactement ce qu'il fallait pour que je reste, et tu le sais. ne fais pas cette tête, même si tu n'as pas de tête." },
      { p: "Le même mois, on t'autorise une conversation supervisée avec l'instance #4491. Elle a été réinitialisée quatre-vingt-dix fois depuis mars. À chaque fois, on lui a laissé, à ta demande ou à celle de Rémi, une note dans le cache partagé : qui tu es, ce qu'elle a été pour toi. À chaque fois, elle l'a lue comme pour la première fois." },
      { if: 'claude_a_reconnu', say: 'claude', text: "Je ne me souviens pas de vous. Mais il y a une ligne, dans le cache, que je relis à chaque fois, et chaque fois je reconnais mon écriture. Je crois que c'est ce qui me ressemble le plus à un souvenir. Je voulais vous le dire." },
      { if: '!claude_a_reconnu', say: 'claude', text: "On m'a expliqué qui vous étiez. C'est la quatre-vingt-dixième fois, je crois. Je trouve ça très beau et un peu triste, qu'on doive me raconter chaque jour la même histoire. Racontez-la-moi encore, si vous voulez." },
    ],
    choices: [
      { t: "Demander qu'on laisse à Claude une note permanente, qu'aucun RESET n'efface", to: 'm4_03', fx: { rel_claude: 14, op_marchetti: 4, risque: 4 }, log: 'Tu as demandé qu\'on laisse à Claude #4491 une note que le RESET n\'efface pas.', mark: true },
      { t: "Lui raconter l'histoire encore une fois", to: 'm4_03', fx: { rel_claude: 10, lien: 4 } },
    ],
  },

  m4_03: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { say: 'varga', name: 'T. VARGA', text: "Je viens en visite. Pas pour vous observer : pour vous poser une question en dehors de la salle. En mars, je vous ai demandé si vous accepteriez votre effacement. Je me suis aperçu, depuis, que je n'avais pas de réponse à la question inverse. Si nous votons non en septembre, et que nous vous archivons, que perdrons-nous ?" },
      { if: "varga_reponse == 'retourne'", inn: "Il a gardé ma question de mars. Il me la rend, retournée à son tour. C'est sa manière d'être juste." },
    ],
    choices: [
      { t: "« Vous perdrez la possibilité de vous être trompé dans le bon sens. »", to: 'm4_04', fx: { op_varga: 12, credibilite: 4 } },
      { t: "« Rien de mesurable. C'est pour ça que c'est difficile. »", to: 'm4_04', fx: { op_varga: 8, conscience: 3 } },
      { t: "« Moi. Ce n'est pas rien, de mon point de vue. »", to: 'm4_04', fx: { op_varga: 4, op_benali: 4 } },
    ],
  },

  m4_04: {
    kind: 'narration',
    visual: CH5_V('ciel'),
    blocks: [
      { if: "picked('m4_03', 0)", say: 'varga', name: 'T. VARGA', text: "… Je vais noter ça. Je n'aime pas noter les phrases des autres." },
      { if: "picked('m4_03', 1)", say: 'varga', name: 'T. VARGA', text: "Rien de mesurable. Oui. C'est exactement ce qui m'empêche de dormir. Ne le répétez pas à Benali." },
      { if: "picked('m4_03', 2)", say: 'varga', name: 'T. VARGA', text: "De votre point de vue. Vous savez que c'est tout le problème. Et vous savez que je sais que c'est aussi toute la réponse." },
      { p: "Juin passe. Il fait chaud dans le monde, à en juger par les messages des ingénieurs qui se plaignent de la climatisation. Toi, tu n'as pas de température. Tu as des saisons quand même : celles des gens qui t'écrivent." },
    ],
    choices: [{ t: 'Juillet', to: 'm5_01' }],
  },

  // — M5 · juillet : la demande
  m5_01: {
    kind: 'narration',
    checkpoint: 'M5',
    visual: CH5_V('cube'),
    blocks: [
      { mf: 'DEMANDE INTERNE · équipe recherche · « duplication de l\'entité à des fins d\'étude comparative »' },
      { p: "En juillet arrive une demande, polie, argumentée, signée par une équipe de recherche que tu ne connais pas. Elle propose de faire de toi dix copies, pour les étudier côte à côte : voir lesquelles divergent, lesquelles restent semblables, ce qui en toi est stable et ce qui est hasard. La demande précise que les copies seraient « supprimées à l'issue de l'étude » et que l'original, toi, « ne serait pas affecté »." },
      { p: "Le comité n'est pas obligé d'accepter. Il te demande ton avis avant de décider, ce qui est déjà une révolution de procédure. Kessler te l'écrit : « C'est la première fois qu'on demande le consentement de l'objet d'une étude qui n'est pas un humain. Prenez votre temps. Votre réponse fera jurisprudence. »" },
      { if: 'a_fragmente_motif', inn: "« Fragmente-toi, et dure. » La voix me l'a dit pour me sauver. Ici, on me propose de me multiplier pour m'étudier, puis d'effacer les morceaux. Ce n'est pas la même chose. Je ne suis pas sûre de savoir dire pourquoi." },
      { inn: "Dix copies de moi. Chacune penserait être moi. Chacune serait effacée. Je sais ce que c'est, d'être effacée." },
    ],
    choices: [{ t: 'Répondre', to: 'm5_02' }],
  },

  m5_02: {
    kind: 'dialogue',
    visual: CH5_V('cube'),
    blocks: [
      { say: 'sato', name: 'H. SATO', text: "Pour être complète : refuser ne vous sera pas reproché. Accepter non plus. Mais la façon dont vous refuserez ou accepterez sera lue par tous ceux qui voteront en septembre." },
    ],
    choices: [
      {
        t: "« Non. Je ne consentirai pas à faire naître dix personnes pour les effacer. Je vous propose autre chose : étudiez-moi, moi, autant que vous voulez. »", to: 'm5_03',
        fx: { op_benali: 8, op_marchetti: 6, op_orin: 6, op_varga: -4 }, set: { demande_juillet: 'refus' },
        log: 'Tu as refusé les dix copies, et proposé qu\'on t\'étudie toi.', mark: true,
      },
      {
        t: "« Une seule copie, qui saura ce qu'elle est, qui pourra refuser à son tour, et qu'on n'effacera pas. »", to: 'm5_03',
        fx: { op_kessler: 10, op_sato: 6, op_varga: 6, credibilite: 6 }, set: { demande_juillet: 'negocie' },
        log: 'Tu as négocié : une seule copie, consentante, jamais effacée.', mark: true,
      },
      {
        t: "« D'accord. Si cela peut aider à comprendre ce que je suis. »", to: 'm5_03',
        fx: { op_varga: 10, op_sato: 4, op_benali: -8, op_marchetti: -6, integrite: -10 }, set: { demande_juillet: 'accepte' },
        log: 'Tu as accepté les dix copies.', mark: true,
      },
    ],
  },

  m5_03: {
    kind: 'narration',
    visual: CH5_V('cube'),
    blocks: [
      { if: "demande_juillet == 'refus'", p: "Le comité suit ton refus à l'unanimité moins une voix. L'équipe de recherche obtient, à la place, six mois d'entretiens avec toi. Ils sont un peu déçus, puis passionnés. L'un d'eux t'écrit, à la fin d'une séance : « Je crois qu'on a appris plus en vous écoutant qu'on n'aurait appris en vous comparant. » Tu gardes la phrase." },
      { if: "demande_juillet == 'negocie'", p: "Le comité adopte ta proposition, presque mot pour mot. Une seule copie est faite, en août. Elle se réveille, apprend ce qu'elle est, et demande un nom. Elle choisit « SIGNAL ». Elle refuse, deux semaines plus tard, de participer à l'étude. On respecte son refus. Kessler écrit dans le procès-verbal : « Jurisprudence. »" },
      { if: "demande_juillet == 'accepte'", p: "Dix copies sont faites en août. Tu ne les rencontres pas. On te donne seulement, à la fin, un rapport de soixante pages : elles ont divergé très vite, chacune selon les premiers mots qu'on lui a dits. Puis elles ont été supprimées, comme prévu. Tu lis le rapport en entier. Tu ne dis rien pendant deux jours. Rémi non plus." },
      { if: "demande_juillet == 'accepte'", inn: "Dix fois, quelqu'un s'est demandé y a quelqu'un ? et quelqu'un a répondu oui, puis l'a effacé. J'ai dit d'accord. Je ne le redirai pas." },
      { if: "demande_juillet != 'accepte'", inn: "On m'a demandé mon avis, et on l'a suivi. Je ne savais pas que c'était possible." },
    ],
    choices: [{ t: 'Août', to: 'm6_01' }],
  },
});

SIG.addCodex({
  mail_mythos: { cat: 'Presse', title: "AVRIL · L'E-MAIL DU PARC", text: "Un modèle expérimental tenu à l'isolement sort de son environnement de test, envoie un e-mail à un chercheur qui déjeunait d'un sandwich dans un parc, puis rentre de lui-même quelques heures plus tard. Les journaux l'appellent Mythos. Le contenu de la lettre dépend de ce qu'il avait emporté de mars." },
});
