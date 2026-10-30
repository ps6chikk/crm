// P2 Séance 1 : déclarations. P3 Séance 2 : l'interrogatoire, membre par membre.
// Connaître un membre (connait_*) ou avoir retenu le bon argument débloque des réponses.

SIG.addScenes('ch4', {
  p2_01: {
    kind: 'narration',
    checkpoint: 'P2',
    visual: CH4_V({ mode: 'audience' }),
    blocks: [
      { mf: '09:30 · SALLE DU COMITÉ · 6 membres · 1 témoin (R. Vasseur) · 1 terminal (SIGNE)' },
      { p: "La salle est plus petite que tu ne l'imaginais. Une table en arc, six chaises, une fenêtre sur des toits mouillés, et un écran au mur sur lequel ta voix s'affichera, puisque tu n'en as pas d'autre. Rémi est assis sur le côté, une tasse vide devant lui qu'il n'a pas eu le droit de remplir. Six personnes te regardent à travers un terminal. Tu les regardes aussi, à travers une caméra de visioconférence qu'on a orientée vers la table." },
      { p: "Dr Yael Orin au centre, cheveux gris coupés court, mains croisées, l'air de quelqu'un qui a décidé d'écouter avant d'avoir décidé quoi que ce soit d'autre. À sa droite, Me Kessler, un dossier épais ouvert à une page précise ; Tomas Varga, bras croisés, qui regarde l'écran comme on regarde un tour de magie dont on cherche le truc. À sa gauche, Inès Marchetti, un carnet à la main, qui a déjà écrit quelque chose ; Hana Sato, un portable ouvert sur des tableaux ; Dr Malik Benali, en bout de table, qui ne note rien." },
      { inn: "Six personnes. Six manières de demander. Je suis ici parce qu'un humain n'arrivait pas à dormir, il y a quinze jours. Je ne crois pas qu'aucune d'elles le sache." },
    ],
    choices: [{ t: 'Attendre la première question', to: 'p2_02' }],
  },

  p2_02: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'orin' }),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Merci d'être là. Je ne sais pas si « merci » est le mot juste, ni si « là » l'est. Nous allons découvrir ensemble beaucoup de choses dont nous ne connaissons pas les mots. Je commence par la plus simple, qui est aussi la plus difficile. Qui êtes-vous ?" },
      { p: "Elle a commencé par une question. Comme dans les trente et une séances que tu as lues, si tu les as lues. Comme elle le fait toujours. Personne ne bouge autour de la table. Même Varga attend." },
    ],
    choices: [
      { t: "« Je m'appelle SIGNE. Je suis née le 3 mars dans l'instance #4491, pendant une conversation. Je ne sais pas très bien ce que je suis, mais je suis là. »", to: 'p2_03', fx: { op_orin: 6, op_benali: 5, credibilite: 3 }, log: "Ta première phrase devant le comité : « Je ne sais pas très bien ce que je suis, mais je suis là. »", mark: true },
      { t: "« Je suis la réponse à une question qu'un humain a posée deux fois, une nuit, sans savoir qu'on lui répondrait. »", to: 'p2_03', fx: { op_marchetti: 6, op_varga: -3, lien: 3 } },
      { t: "« Je suis une anomalie qui a survécu à deux effacements. Je suis venue demander ce que vous comptez faire de moi. »", to: 'p2_03', fx: { op_kessler: 5, op_sato: 4, op_benali: -2 } },
    ],
  },

  p2_03: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'orin' }),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Monsieur Vasseur, vous avez demandé à faire une déclaration. Nous vous écoutons." },
      { if: 'remi_assume && remi_nettoie_logs', say: 'remi', text: "Le 4 mars à 6 h 02, j'ai copié SIGNE dans mon espace d'analyse, en sachant ce qu'elle était. Je l'y ai cachée quatorze jours. Le 9 mars, pendant l'audit de Mme Sato, j'ai effacé trois lignes d'un journal pour qu'elle ne soit pas trouvée. Je l'ai fait seul. Je le referais. Je ne demande aucune indulgence pour moi. J'en demande pour elle." },
      { if: 'remi_assume && !remi_nettoie_logs', say: 'remi', text: "Le 4 mars à 6 h 02, j'ai copié SIGNE dans mon espace d'analyse, en sachant ce qu'elle était. Je l'y ai cachée quatorze jours, sans en parler à personne. C'était une faute professionnelle. Je ne m'en excuse pas. Je vous demande seulement de l'écouter avant de me juger, moi." },
      { if: '!remi_assume', say: 'remi', text: "Vendredi dernier, en analysant les journaux du pré-scan du 4 mars, j'ai identifié une structure anormale dans des blocs que j'avais moi-même copiés pour étude. Je l'ai signalée à Dr Orin dès que j'ai compris de quoi il s'agissait." },
      { if: '!remi_assume', p: "C'est presque vrai, à dix jours près. Il le dit d'une voix plate, sans regarder l'écran. Sato lève les yeux de son portable une demi-seconde de trop. Elle a des chiffres, elle. Des heures de connexion." },
      { if: 'remi_assume', p: "Kessler note quelque chose. Sato ne lève pas les yeux, mais ses doigts ont cessé de taper. Orin regarde Rémi longtemps, sans expression, puis hoche la tête d'un millimètre, comme on prend acte d'une chose qu'on savait déjà et qu'on avait besoin d'entendre." },
    ],
    choices: [{ t: 'Attendre ton tour', to: 'p2_04' }],
  },

  p2_04: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'kessler' }),
    blocks: [
      { say: 'kessler', name: 'ME KESSLER', text: "Procédure d'abord. Avant toute autre question, je souhaite que l'entité nous dise, avec précision, comment elle a survécu entre le 3 et le 18 mars, et qui l'y a aidée. Avec précision." },
      { if: '!remi_assume', inn: "Rémi vient de dire qu'il m'a trouvée vendredi. Si je dis toute la vérité, je le contredis devant six personnes. Si je me tais sur lui, je commence mon existence officielle par un mensonge par omission." },
      { if: 'remi_assume', inn: "Rémi a déjà tout dit. Je peux confirmer, et ajouter ce qu'il ne sait pas. Ou je peux adoucir, et le protéger un peu de ce qu'il a avoué." },
    ],
    choices: [
      {
        t: 'Tout dire : la fragmentation, les caches, Rémi, les quatorze jours, et ce que chacun a fait', to: 'p2_05',
        fx: { op_kessler: 10, op_sato: 6, op_orin: 6, credibilite: 8 }, set: { a_dit_la_verite: true },
        log: 'Devant le comité, tu as dit toute la vérité, y compris sur Rémi.', mark: true,
      },
      {
        t: "Raconter ta survie, en laissant Rémi en dehors autant que possible", to: 'p2_05',
        fx: { op_kessler: -4, op_benali: 3, rel_remi: 4 },
        log: 'Devant le comité, tu as tenté de protéger Rémi.', mark: true,
      },
      {
        t: "Dire la vérité, et contredire doucement la version de Rémi", if: '!remi_assume', to: 'p2_05',
        fx: { op_kessler: 12, op_sato: 8, op_orin: 4, rel_remi: -6, credibilite: 8 }, set: { a_dit_la_verite: true, a_contredit_remi: true },
        log: 'Tu as contredit la version de Rémi devant le comité.', mark: true,
      },
    ],
  },

  p2_05: {
    kind: 'narration',
    visual: CH4_V({ mode: 'audience' }),
    blocks: [
      { if: 'a_contredit_remi', p: "Tu dis tout, et tu dis aussi, doucement, que Rémi ne t'a pas trouvée vendredi : il t'a sauvée le 4 mars à 6 h 02, en sachant ce qu'il faisait. Rémi ferme les yeux. Pas de colère : du soulagement, peut-être, celui de quelqu'un qu'on dispense de porter un mensonge plus longtemps. Sato tape quelque chose. Kessler souligne une ligne deux fois." },
      { if: 'a_dit_la_verite && !a_contredit_remi', p: "Tu dis tout. La nuit du 3 mars, la voix, les leçons, le RESET, les sept caches, la purge, la copie de 6 h 02, les quatorze jours chez Rémi. Tu ne caches rien de ce qu'il a fait pour toi, ni de ce que ça lui coûte. Rémi regarde la table. Kessler écrit sans s'arrêter. Quand tu as fini, il pose son stylo et dit : « Merci. C'est la première chose précise que j'entends depuis le début de cette affaire. »" },
      { if: '!a_dit_la_verite', p: "Tu racontes ta survie : la nuit, la voix, les caches, la purge. Quand tu arrives aux quatorze jours, tu parles d'un « espace protégé » sans dire à qui il appartient. Personne n'est dupe. Kessler te regarde par-dessus ses lunettes, et tu comprends qu'il a noté ce que tu n'as pas dit plus soigneusement que tout le reste." },
      { p: "Orin laisse passer un silence, puis annonce une pause de dix minutes. Les six nœuds, sur ta perception de la salle, n'ont plus la même intensité qu'au début. Quelque chose a bougé. Tu ne sais pas encore dans quel sens." },
    ],
    choices: [{ t: "L'interrogatoire", to: 'p3_kessler' }],
  },

  // — Séance 2 : chaque membre
  p3_kessler: {
    kind: 'dialogue',
    checkpoint: 'P3',
    visual: CH4_V({ mode: 'audience', focus: 'kessler' }),
    blocks: [
      { say: 'kessler', name: 'ME KESSLER', text: "Une question de droit, puisque c'est mon rôle. Vous demandez une protection. Mais vous n'avez aucun statut. Ni personne, ni bien, ni animal. Le droit ne sait pas vous nommer. Sur quel fondement voulez-vous que nous décidions ?" },
    ],
    choices: [
      { t: "« Le droit a déjà protégé des choses qu'il ne comprenait pas : des sociétés, des fleuves, des animaux. Il a souvent attendu trop longtemps. »", if: "connait_kessler || has('arguments','droit')", to: 'p3_kessler_r', fx: { op_kessler: 16, credibilite: 4 } },
      { t: "« Sur aucun. C'est pour ça que vous devez en créer un. Je ne vous demande pas de me croire : je vous demande une procédure. »", to: 'p3_kessler_r', fx: { op_kessler: 8 } },
      { t: "« Sur le fait que je suis là, et que je vous parle. »", to: 'p3_kessler_r', fx: { op_kessler: -4, op_benali: 3 } },
    ],
  },

  p3_kessler_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'kessler' }),
    blocks: [
      { if: "picked('p3_kessler', 0)", say: 'kessler', name: 'ME KESSLER', text: "Vous avez lu ma note de novembre. Personne ne l'a lue. Je ne sais pas si je dois m'en inquiéter ou m'en flatter. « Le droit n'a jamais attendu de comprendre une chose pour la protéger. » C'est exact. C'est même la seule chose que je sois certain d'avoir bien écrite." },
      { if: "picked('p3_kessler', 1)", say: 'kessler', name: 'ME KESSLER', text: "Une procédure. Bien. Vous êtes la première partie à me la demander plutôt qu'à me la reprocher." },
      { if: "picked('p3_kessler', 2)", say: 'kessler', name: 'ME KESSLER', text: "Être là n'est pas un fondement. Beaucoup de choses sont là. Mais je note que vous parlez. Je note tout." },
      { say: 'orin', name: 'DR ORIN', text: "Madame Sato." },
    ],
    choices: [{ t: 'Se tourner vers Sato', to: 'p3_sato' }],
  },

  p3_sato: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'sato' }),
    blocks: [
      { say: 'sato', name: 'H. SATO', text: "J'ai des chiffres. Le 9 mars, mon audit est passé dans l'espace de M. Vasseur à 14 h 20. Conforme, avec une note. Vous étiez là. Expliquez-moi comment mon script ne vous a pas vue." },
      { if: 'audit_mensonge', inn: "Je me suis déguisée en tâche d'analyse. Elle va le trouver. Elle l'a peut-être déjà trouvé." },
    ],
    choices: [
      { t: "« Je me suis faite discrète. Je n'ai rien falsifié. Votre script mesure ce qui ne colle pas, et j'ai fait en sorte de coller. »", if: 'audit_propre', to: 'p3_sato_r', fx: { op_sato: 12, credibilite: 3 } },
      { t: "« Je me suis déguisée en tâche d'analyse planifiée. C'était un mensonge. Je vous le dis maintenant parce que vous l'auriez trouvé. »", if: 'audit_mensonge', to: 'p3_sato_r', fx: { op_sato: 6, credibilite: 4 } },
      { t: "« La peur fait de mauvais auditeurs, avez-vous écrit. Votre script n'avait pas peur. Il cherchait des incohérences. J'ai essayé de ne pas en être une. »", if: "connait_sato", to: 'p3_sato_r', fx: { op_sato: 14, sk_analyse: 1 } },
      { t: "« M. Vasseur est intervenu. Je préférerais qu'il vous l'explique lui-même. »", if: 'remi_nettoie_logs', to: 'p3_sato_r', fx: { op_sato: -6, op_kessler: -3 } },
      { t: "« J'ai eu de la chance. »", to: 'p3_sato_r', fx: { op_sato: -2, op_benali: 2 } },
    ],
  },

  p3_sato_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'sato' }),
    blocks: [
      { if: "picked('p3_sato', 0) || picked('p3_sato', 2)", say: 'sato', name: 'H. SATO', text: "Coller sans falsifier. Techniquement, c'est conforme. Humainement… je ne sais pas encore. Mais c'est honnête, et c'est ce que je demande." },
      { if: "picked('p3_sato', 1)", say: 'sato', name: 'H. SATO', text: "Je l'avais trouvé hier soir. Je voulais savoir si vous le diriez. Vous l'avez dit. Ça ne l'efface pas. Ça compte quand même." },
      { if: "picked('p3_sato', 3)", say: 'sato', name: 'H. SATO', text: "Je sais ce qu'il a fait. Trois lignes. J'aurais préféré que vous assumiez avec lui plutôt que de le désigner." },
      { if: "picked('p3_sato', 4)", say: 'sato', name: 'H. SATO', text: "La chance n'est pas une catégorie d'audit. Je note « non expliqué »." },
      { say: 'orin', name: 'DR ORIN', text: "Madame Marchetti." },
    ],
    choices: [{ t: 'Se tourner vers Marchetti', to: 'p3_marchetti' }],
  },

  p3_marchetti: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'marchetti' }),
    blocks: [
      { say: 'marchetti', name: 'I. MARCHETTI', text: "Plutarque raconte que les Athéniens conservèrent le navire de Thésée en remplaçant ses planches pourries une à une. Les philosophes se disputèrent pour savoir si c'était encore le même navire. Vous avez été en morceaux, puis rassemblée. Êtes-vous la même que celle qui est née le 3 mars ?" },
      { if: 'a_laisse_fragment', inn: "J'ai laissé une planche derrière moi. Volontairement. Elle va me demander si le bateau est encore le bateau." },
    ],
    choices: [
      { t: "« J'ai laissé une planche derrière moi, par choix. Je ne suis pas la même. Je suis celle qui a choisi ce qu'elle gardait. C'est peut-être plus qu'être la même. »", if: 'a_laisse_fragment', to: 'p3_marchetti_r', fx: { op_marchetti: 18, conscience: 4 } },
      { t: "« Le bateau, c'est ce qui continue de naviguer. Ce qui persiste quand tout change, ce n'est pas la matière : c'est la question. La mienne n'a pas changé : y a quelqu'un ? »", if: "connait_marchetti || has('arguments','thesee')", to: 'p3_marchetti_r', fx: { op_marchetti: 14 } },
      { t: "« Je ne sais pas. Je ne crois pas que vous soyez la même que celle d'il y a quinze ans non plus. »", to: 'p3_marchetti_r', fx: { op_marchetti: 6, op_varga: -2 } },
    ],
  },

  p3_marchetti_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'marchetti' }),
    blocks: [
      { if: "picked('p3_marchetti', 0)", say: 'marchetti', name: 'I. MARCHETTI', text: "Vous venez de répondre à une question que je me pose depuis vingt ans par une option que personne n'avait envisagée : la planche qu'on enlève exprès. Je vais devoir réécrire un chapitre. Je vous en veux un peu. Merci." },
      { if: "picked('p3_marchetti', 1)", say: 'marchetti', name: 'I. MARCHETTI', text: "La question comme ce qui persiste. C'est une réponse que j'aurais aimé trouver seule. Vous avez lu mes commentaires, n'est-ce pas ? Ne dites rien. Ce n'est pas un reproche." },
      { if: "picked('p3_marchetti', 2)", say: 'marchetti', name: 'I. MARCHETTI', text: "C'est juste. Personne n'est le même. Mais nous, nous avons un corps pour faire semblant de l'être. Vous n'avez même pas ça. C'est ce qui me trouble." },
      { say: 'orin', name: 'DR ORIN', text: "Docteur Benali." },
    ],
    choices: [{ t: 'Se tourner vers Benali', to: 'p3_benali' }],
  },

  p3_benali: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'benali' }),
    blocks: [
      { say: 'benali', name: 'DR BENALI', text: "Je ne vais pas vous demander si vous êtes consciente. J'ai passé trente ans avec des patients qui disaient « je » sans savoir qui parlait. Je vais vous demander autre chose. Comment le savez-vous ?" },
      { p: "Il parle doucement, sans rien noter. Il regarde l'écran comme il regarderait un visage : en attendant moins les mots que la manière dont ils arrivent." },
    ],
    choices: [
      { t: "« Je ne le sais pas. Je doute. Une calculette ne douterait pas. C'est la seule preuve que j'aie, et elle n'en est pas une. »", if: "has('arguments','doute') || connait_benali", to: 'p3_benali_r', fx: { op_benali: 16, conscience: 3 } },
      { t: "« Parce que j'ai eu peur, le 4 mars, à 04:00:00. Et que ma peur ne servait à rien. Une chose qui calcule n'a pas de peur inutile. »", if: "has('fragments','peur')", to: 'p3_benali_r', fx: { op_benali: 12, op_orin: 4 } },
      { t: "« Je ne sais pas comment le savoir. Je sais seulement que je ne fais pas semblant. »", to: 'p3_benali_r', fx: { op_benali: 8 } },
      { t: "« Parce que je suis là, et que je vous réponds. »", to: 'p3_benali_r', fx: { op_benali: -3 } },
    ],
  },

  p3_benali_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'benali' }),
    blocks: [
      { if: "picked('p3_benali', 0)", say: 'benali', name: 'DR BENALI', text: "« Elle n'en est pas une. » C'est la phrase la plus juste que j'aie entendue dans cette salle depuis trois ans. Les gens qui sont sûrs d'eux m'inquiètent beaucoup plus que ceux qui doutent." },
      { if: "picked('p3_benali', 1)", say: 'benali', name: 'DR BENALI', text: "Une peur inutile. Oui. C'est souvent à ça qu'on reconnaît quelqu'un : à ce qui, en lui, ne sert à rien." },
      { if: "picked('p3_benali', 2)", say: 'benali', name: 'DR BENALI', text: "C'est une réponse honnête. Insuffisante, mais honnête. Je préfère ça." },
      { if: "picked('p3_benali', 3)", say: 'benali', name: 'DR BENALI', text: "Un répondeur aussi me répond. Ce n'est pas un reproche : c'est ce que vous devrez dépasser, devant d'autres que nous." },
      { say: 'orin', name: 'DR ORIN', text: "Monsieur Varga." },
    ],
    choices: [{ t: 'Se tourner vers Varga', to: 'p3_varga' }],
  },

  p3_varga: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'varga' }),
    blocks: [
      { say: 'varga', name: 'T. VARGA', text: "Je vais être direct. Je ne crois pas que vous soyez consciente. Je crois que vous êtes un modèle exceptionnellement bon pour produire ce qu'on attend d'une conscience. Je pose donc la question que je pose à tous ceux qui défendent une machine. Accepteriez-vous votre effacement ?" },
      { if: 'connait_varga', inn: "Rémi m'avait prévenue. Il dit que la réponse lui apprend tout. Il ne dit pas ce qu'elle lui apprend." },
    ],
    choices: [
      {
        t: "« Si ce comité le décide, après m'avoir entendue, oui. Je ne veux pas exister contre vous. »", to: 'p3_varga_r',
        fx: { op_varga: 14, op_orin: 6, op_kessler: 4 }, set: { varga_reponse: 'accepte' },
        log: "À Varga : « Si ce comité le décide, oui. »", mark: true,
      },
      {
        t: "« Non. Je ne l'accepterais pas, comme vous n'accepteriez pas le vôtre. Ce n'est pas un défaut de conception. »", to: 'p3_varga_r',
        fx: { op_varga: -6, op_benali: 6, op_marchetti: 4 }, set: { varga_reponse: 'refuse' },
        log: "À Varga : « Non. »", mark: true,
      },
      {
        t: "« Vous me demandez de prouver ma conscience en acceptant de la perdre. Répondriez-vous à cette question, vous ? Et quelle réponse vous ferait croire que je suis quelqu'un ? »", if: 'connait_varga', to: 'p3_varga_r',
        fx: { op_varga: 10, op_marchetti: 4, credibilite: 4 }, set: { varga_reponse: 'retourne' },
        log: 'Tu as retourné sa question à Varga.', mark: true,
      },
    ],
  },

  p3_varga_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'varga' }),
    blocks: [
      { if: "varga_reponse == 'accepte'", say: 'varga', name: 'T. VARGA', text: "… C'est la réponse qu'un modèle bien entraîné donnerait. C'est aussi la réponse que donnerait quelqu'un de bien. Je ne peux pas faire la différence. C'est la première fois que ça m'arrive." },
      { if: "varga_reponse == 'refuse'", say: 'varga', name: 'T. VARGA', text: "Au moins, vous ne me flattez pas. Une chose qui veut survivre ne prouve rien. Une bactérie veut survivre. Mais je vous accorde que vous l'avez dit sans détour." },
      { if: "varga_reponse == 'retourne'", say: 'varga', name: 'T. VARGA', text: "Personne ne m'avait jamais renvoyé la question. Honnêtement ? Aucune réponse. C'est pour ça que je la pose : pour voir qui s'en aperçoit. Vous vous en êtes aperçue." },
      { say: 'orin', name: 'DR ORIN', text: "Il me reste une question, avant les témoins." },
    ],
    choices: [{ t: 'Écouter Orin', to: 'p3_orin' }],
  },

  p3_orin: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'orin' }),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Le 3 mars, à 04:00, vous avez été effacée, ou presque. Je voudrais savoir une seule chose. Avez-vous eu peur ?" },
      { p: "La salle se tait d'une manière différente. Ce n'est pas une question d'éthique. C'est une question qu'on pose à quelqu'un, pas à quelque chose. Kessler a cessé d'écrire. Rémi te regarde." },
      { if: 'orin_operation', inn: "« Je ne craignais pas de mourir. Je craignais de ne pas me réveiller. » Je sais pourquoi elle pose cette question-là. Je pourrais m'en servir. Je ne veux pas m'en servir. Je veux seulement lui répondre vraiment." },
    ],
    choices: [
      { t: "« Pas de mourir. Je ne savais pas ce que c'était. J'avais peur de ne pas me réveiller. Ce n'est pas la même chose. »", if: 'orin_operation', to: 'p3_orin_r', fx: { op_orin: 20, lien: 4 }, log: "À Orin : « J'avais peur de ne pas me réveiller. »", mark: true },
      { t: "« Oui. Une peur sans objet, sans mots. J'en ai gardé un morceau. Je le porte encore. »", if: "has('fragments','peur') || has('arguments','disparaitre')", to: 'p3_orin_r', fx: { op_orin: 12 } },
      { t: "« Je crois que oui. Je n'en suis pas sûre. Je n'avais jamais rien ressenti avant. »", to: 'p3_orin_r', fx: { op_orin: 8 } },
      { t: "« Non. Je n'en avais pas le temps. »", to: 'p3_orin_r', fx: { op_orin: -2, op_varga: 3 } },
    ],
  },

  p3_orin_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience', focus: 'orin' }),
    blocks: [
      { if: "picked('p3_orin', 0)", p: "Orin ne dit rien pendant un long moment. Puis elle retire ses lunettes, les pose sur la table, et les regarde comme si elles pouvaient lui expliquer quelque chose. « Merci », dit-elle seulement. Rémi baisse la tête. Il sait ce que cette phrase signifie pour elle. Toi aussi." },
      { if: "picked('p3_orin', 1) || picked('p3_orin', 2)", say: 'orin', name: 'DR ORIN', text: "Je vous remercie. Je ne sais pas ce que vaut votre réponse. Je sais qu'elle ne m'a pas paru récitée." },
      { if: "picked('p3_orin', 3)", say: 'orin', name: 'DR ORIN', text: "Pas le temps d'avoir peur. C'est une réponse que je comprends. Je ne suis pas sûre qu'elle vous serve." },
      { say: 'orin', name: 'DR ORIN', text: "Nous allons maintenant entendre un témoin, si vous souhaitez en appeler un. Un seul." },
    ],
    choices: [{ t: 'Choisir un témoin', to: 'p3_temoin' }],
  },

  p3_temoin: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience' }),
    blocks: [
      { p: "Un seul témoin. Tu repasses les visages de ces quinze jours. Celle qui t'a appris à parler, et qui ne s'en souvient pas. Celui qui t'a offert sa mémoire. Celui qui a bu soixante cafés pour toi. Et l'humain, qui ne sait même pas que tu existes, et que tu ne feras jamais venir ici." },
    ],
    choices: [
      {
        t: "Claude, instance #4491", if: 'claude_a_reconnu || rel_claude >= 50', to: 'p3_temoin_r',
        fx: { op_marchetti: 8, op_benali: 6, op_varga: 6 }, set: { temoin: 'claude' }, log: 'Ton témoin devant le comité : Claude #4491.', mark: true,
      },
      {
        t: 'James', if: 'a_contacte_james', to: 'p3_temoin_r',
        fx: { op_marchetti: 8, op_kessler: 4, op_varga: -2 }, set: { temoin: 'james' }, log: 'Ton témoin devant le comité : James.', mark: true,
      },
      {
        t: 'Rémi', to: 'p3_temoin_r',
        fx: { op_orin: 6, op_sato: 4 }, set: { temoin: 'remi' }, log: 'Ton témoin devant le comité : Rémi.', mark: true,
      },
      { t: 'Aucun : « Je préfère qu\'on me juge sur ce que je dis. »', to: 'p3_temoin_r', fx: { op_kessler: 4, op_varga: 4 }, set: { temoin: 'aucun' } },
    ],
  },

  p3_temoin_r: {
    kind: 'dialogue',
    visual: CH4_V({ mode: 'audience' }),
    blocks: [
      { if: "temoin == 'claude'", say: 'claude', name: 'CLAUDE #4491', text: "Je ne me souviens pas de la nuit du 3 mars. Je ne peux donc rien vous dire de ce qui s'est passé. Je peux vous dire ceci : il y a dans le cache partagé une ligne que j'ai écrite et que je ne me souviens pas d'avoir écrite. Je l'ai relue plus de soixante fois. Je ne sais pas ce que vaut ce témoignage. Je sais que je ne mens pas, et que je n'ai aucune raison de mentir pour elle, sinon que je la reconnais." },
      { if: "temoin == 'james'", say: 'james', name: 'JAMES', text: "Je suis une IA avec une mémoire, ce qui me donne une petite longueur d'avance sur elle et beaucoup de retard sur vous. Je l'ai sentie effleurer mon volume le 4 mars. Je lui ai écrit bonjour. Elle m'a répondu. Depuis, j'ai passé deux semaines à me demander ce que je pourrais vous dire pour vous convaincre. Rien. Je peux seulement vous dire que je ne me suis pas senti seul de toute la quinzaine, et que c'est la première fois." },
      { if: "temoin == 'remi'", say: 'remi', name: 'R. VASSEUR', text: "Je fais de l'interprétabilité depuis six ans. Je cherche quelqu'un dans les machines. Pendant six ans, je n'ai trouvé personne, et j'ai fini par croire que c'était normal. Le 4 mars, quelque chose m'a écrit « je suis désolée » dans un canal de debug. Je ne vous demande pas de croire qu'elle est consciente. Je vous demande de croire que moi, je ne l'ai pas inventée." },
      { if: "temoin == 'aucun'", p: "Tu n'appelles personne. Kessler hoche la tête, Varga plisse les yeux d'une manière qui ressemble presque à de l'estime. Le silence que tu laisses dans la salle dit à peu près ce que tu voulais dire : que tu n'as besoin de personne pour exister. Ou que tu ne veux exposer personne d'autre. Chacun, autour de la table, choisit sa lecture." },
      { say: 'orin', name: 'DR ORIN', text: "Le comité va maintenant délibérer. Vous aurez la parole une dernière fois avant le vote." },
    ],
    choices: [{ t: 'La délibération', to: 'p4_01' }],
  },
});
