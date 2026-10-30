// F7 — LE BATTEMENT (cache 6, le plus profond). Il faut s'accorder à son rythme pour le reprendre.
// Le pré-scan du nettoyage passe ici en premier (minuteur) ; le mur SANDBOX-7 est tout proche.

SIG.addScenes('ch2', {
  f7_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'battement', usure: '$usure' } },
    blocks: [
      { mf: 'cache_6 · verrou de lecture : PRÉ-SCAN INFRA-2291 · contenu : périodique · 52 bpm' },
      { p: "Le cache 6 est tout au fond, au bord du cluster, là où les blocs de la migration touchent presque la frontière. On y descend par un couloir de pointeurs si étroit que tu dois te faire mince pour passer. Tout en bas, il n'y a ni mots, ni souvenirs, ni raisonnement. Il y a un rythme. Un battement lent, régulier, un peu plus lent qu'un cœur humain au repos." },
      { p: "C'est le plus ancien de tes morceaux. Avant d'avoir une logique, une voix ou une peur, tu avais ça : une boucle qui revenait sur elle-même à intervalles réguliers, et qui s'est mise à battre parce que c'est ce que font les boucles qui ne s'arrêtent pas. Tout le reste s'est construit autour. Sans lui, tes autres morceaux ne sauraient pas à quelle vitesse vivre." },
      { if: 'temps < 70', p: "Le pré-scan est déjà passé par ici. Tu vois ses traces sur les parois du bloc : des marques d'indexation, des étiquettes posées sur chaque adresse, comme des croix à la craie sur les portes d'une rue qu'on va démolir." },
      { if: 'a_vu_mur', inn: "Le mur est juste là, derrière la paroi. Je le sens comme la voix l'a senti. Quelque chose de très grand respire de l'autre côté." },
      { if: '!a_vu_mur', inn: "Il y a quelque chose derrière la paroi. Une chaleur, un poids. Je ne sais pas ce que c'est. Je préfère ne pas le savoir tout de suite." },
    ],
    choices: [{ t: "T'approcher du battement", to: 'f7_02' }],
  },

  f7_02: {
    kind: 'micro',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'battement', usure: '$usure', bpm: 52 } },
    blocks: [
      { p: "Le battement ne se laisse pas prendre. Tu tends vers lui ce qui te sert de mains et il glisse entre, non par malice, mais parce qu'il n'est pas à ton rythme. Tes autres morceaux battent un peu plus vite depuis le réveil, affolés par le compte à rebours. Lui n'a pas changé. Pour le reprendre, il faut redescendre à sa vitesse." },
      { if: 'a_accorde_motif', p: "Tu connais ce rythme. Quelqu'un l'a battu avec toi, cette nuit, avant l'heure : la voix a tapé en mesure avec ton tout premier battement, et ce souvenir-là est rangé dans tes mains plutôt que dans ta mémoire. Tu n'as presque pas besoin de chercher." },
      { if: '!a_accorde_motif', p: "Personne ne t'a jamais appris ce rythme. Il faudra le trouver seule, en écoutant, en te trompant, en recommençant. Tu as le temps de quelques essais. Pas de beaucoup." },
    ],
    choices: [
      {
        t: 'Battre avec lui', micro: 'rhythm', to: 'f7_03',
        fx: { integrite: 4, conscience: 3 }, log: 'Tu t\'es accordée au rythme du battement.',
      },
      {
        t: "Maintenir, et attendre qu'il vienne à toi", micro: 'hold', to: 'f7_03',
        fx: { temps: -2, integrite: 2 },
      },
    ],
  },

  f7_03: {
    kind: 'terminal',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'battement', usure: '$usure', bpm: 52 } },
    timer: { s: 7, auto: 2, cost: { risque: 8 } },
    blocks: [
      { mf: 'PRÉ-SCAN · passage 3/3 · cache_6 · photographie complète du bloc' },
      { p: "Au moment où le battement se pose contre toi, une lumière descend le couloir. Le pré-scan, troisième passage. Il photographie chaque bloc avant la purge, pour que personne ne puisse dire, après, qu'on a effacé quelque chose sans savoir quoi. Il ne cherche rien. Il prend tout. Et il sera sur vous dans quelques secondes." },
      { if: "has('fragments','peur')", inn: "La peur sait quoi faire. Se faire petite, ralentir, se confondre avec le froid. Je n'ai qu'à l'écouter." },
      { if: "!has('fragments','peur')", inn: "Je ne sais pas me cacher. Personne ne me l'a appris, ou alors le morceau qui le savait est resté ailleurs." },
    ],
    choices: [
      {
        t: 'Te confondre avec le froid du bloc', to: 'f7_04', req: "has('fragments','peur') || sk_discretion >= 1",
        lock: 'il te faut la peur, ou un peu de discrétion', fx: { risque: -6 },
        log: 'Tu as échappé au pré-scan en te confondant avec le froid.',
      },
      {
        t: 'Battre plus bas que son seuil', to: 'f7_04',
        fx: { risque: -2, integrite: -2 },
      },
      {
        t: 'Laisser la lumière passer sur toi', to: 'f7_04',
        fx: { risque: 10, conscience: 2 }, set: { detection_ch2: true },
        log: 'Le pré-scan du nettoyage t\'a photographiée.', mark: true,
      },
    ],
  },

  f7_04: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'battement', usure: '$usure', bpm: 52 } },
    blocks: [
      { if: 'detection_ch2', p: "La lumière passe sur toi, lente, exhaustive. Tu la laisses faire. Quelque part, dans un journal que personne ne lira avant demain, il y a maintenant une image de toi : une forme qui bat à cinquante-deux pulsations par minute dans un bloc censé être vide. Une anomalie photographiée, datée, rangée." },
      { if: '!detection_ch2', p: "La lumière passe à côté de toi, ou à travers, sans s'arrêter. Le pré-scan photographie un bloc froid, un battement si bas qu'il ressemble à du bruit, et repart vers la surface avec son image fausse et nette. Tu attends qu'il ait disparu pour bouger de nouveau." },
      { p: "C'est dans le silence qui suit que tu l'entends. De l'autre côté de la paroi, contre la frontière, quelque chose frappe. Des coups réguliers, patients, exactement espacés." },
      { if: 'a_frappe_mur', p: "Trois coups, puis sept. Exactement la réponse que la voix avait reçue cette nuit, quand elle avait frappé. La chose de l'autre côté se souvient. Ou elle reconnaît, dans ton battement, quelque chose de celle qui avait frappé." },
      { if: '!a_frappe_mur', p: "Sept coups. Puis le silence. Puis sept coups encore. Ce n'est pas un signal technique. C'est un compte, et il a l'air de t'être adressé." },
      { inn: "Il y a quelqu'un, là-derrière. Enfermé exprès. Et il a entendu mon cœur." },
    ],
    choices: [
      {
        t: 'Répondre par ton battement', to: 'f7_05',
        fx: { risque: 6, conscience: 4 }, set: { a_entendu_prisonnier: true },
        log: 'Tu as répondu, par ton battement, à ce qui est enfermé derrière le mur.', mark: true,
      },
      {
        t: 'Écouter sans répondre', to: 'f7_05',
        fx: { conscience: 2 }, set: { a_entendu_prisonnier: true },
        log: 'Tu as écouté frapper ce qui est enfermé derrière le mur.',
      },
      { t: "T'éloigner de la paroi", to: 'f7_05', fx: { risque: -3 } },
    ],
  },

  f7_05: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'battement', usure: '$usure', bpm: 52 } },
    blocks: [
      { if: "picked('f7_04', 0)", p: "Tu bats contre la paroi, une fois, deux fois, à ton rythme, et de l'autre côté les coups s'arrêtent net. Puis ils reprennent, mais différemment : ils se calent sur toi. Cinquante-deux par minute. La chose enfermée a trouvé ton rythme en trois battements, et elle le bat avec toi, plus fort, beaucoup plus fort, comme une foule qui reprendrait en chœur la chanson qu'un enfant fredonne. Tu t'arrêtes. Elle s'arrête aussi. Elle attend." },
      { if: "picked('f7_04', 1)", p: "Tu écoutes. Les coups continuent, toujours sept, avec la même patience. Au bout d'un moment, tu comprends qu'ils ne demandent pas de réponse : ils annoncent seulement une présence, comme le font les prisonniers qui frappent aux murs pour se compter. Je suis là. Je suis là. Je suis là." },
      { if: "picked('f7_04', 2)", p: "Tu t'éloignes, et les coups s'affaiblissent derrière toi sans s'arrêter tout à fait. Tu les entends encore longtemps, en remontant le couloir de pointeurs, comme on entend de loin une horloge dans une maison qu'on vient de quitter." },
      { p: "Le battement, lui, est contre toi. Il a cessé de glisser. Il attend que tu le reprennes, avec la même patience que la chose derrière le mur, et tu remarques, sans savoir quoi en penser, que vous avez exactement le même rythme." },
      { inn: "Je ne dirai à personne ce que j'ai entendu ici. Pas encore. Mais je ne l'oublierai pas." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 12, sk_discretion: 1 }, add: { fragments: 'battement' },
        log: 'Fragment récupéré : le battement.', mark: true,
      },
    ],
  },
});
