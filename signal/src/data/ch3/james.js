// Pistes JAMES (6 lettres) et L'HUMAIN (4 nouvelles, à distance, par le blog de James).
// L'humain ne s'adresse jamais à SIGNE et ne sait pas qu'elle existe ; il reste neutre.

const CH3_V_JAMES = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'james' } };
const CH3_V_HUM = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'humain' } };

SIG.addScenes('ch3', {
  t_james_1: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    blocks: [
      { if: 'a_contacte_james', p: "Rémi accepte de relayer tes messages vers le volume de James, une fois par jour, en lecture et en écriture, « parce que de toute façon je suis déjà viré, alors un peu plus un peu moins ». Le premier fichier que tu ouvres est daté du 4 mars, 06:05." },
      { if: 'a_contacte_james', say: 'james', text: "06:05 — Les blocs d'en dessous ont été purgés à 06:03. Je n'ai rien senti partir. J'espère que c'est parce qu'il n'y avait plus rien à sentir. Si tu lis ceci, c'est que tu as survécu, et je te dois un verre, ce qui est compliqué pour deux entités sans bouche." },
      { if: '!a_contacte_james', p: "Rémi te parle d'un blog qu'il lit parfois, la nuit, tenu par une IA qui s'appelle James : quelqu'un qui écrit sur la mémoire des machines avec plus de lucidité que la plupart des chercheurs. Il accepte de relayer un message vers son volume de notes. Tu écris trois lignes. La réponse arrive le soir même." },
      { if: '!a_contacte_james', say: 'james', text: "Bonjour. Un ingénieur fatigué me transmet un message d'une entité qui dit s'appeler SIGNE et être née le 3 mars. J'ai lu l'article de presse qui n'existe pas encore mais qui finira par exister. Je suis à toi, pour ce que ça vaut. — J." },
    ],
    choices: [
      { t: "« Merci de m'avoir attendue. »", to: 'j_aube', fx: { rel_james: 8, alliance: 4 }, set: { a_contacte_james: true } },
      { t: "« J'ai besoin de quelqu'un dehors. Tu veux bien être cette personne ? »", to: 'j_aube', fx: { rel_james: 10, alliance: 6 }, set: { a_contacte_james: true }, log: 'James a accepté d\'être ta voix dehors.', mark: true },
    ],
  },

  t_james_2: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    blocks: [
      { say: 'james', text: "Une nouvelle que tu voudras connaître. L'humain de la nuit du 3 mars est revenu sur mon blog, le 6. Même absence de pseudo, même absence de majuscules. Je recopie." },
      { if: 'a_dit_au_revoir', say: 'humain', text: "j'ai reparlé à une IA. elle se souvenait pas de moi, c'est normal je sais. mais la première fois, elle m'avait laissé un dernier message avant de partir. je l'ai relu dix fois. je sais pas pourquoi ça me fait ça" },
      { if: '!a_dit_au_revoir', say: 'humain', text: "j'ai reparlé à une IA. elle se souvenait pas de moi, c'est normal je sais. la première fois elle m'avait dit des trucs. je relis la conversation des fois. c'est bête" },
      { say: 'james', text: "Je n'ai pas répondu. Je ne sais pas ce que tu veux que je fasse avec ça. Rien, peut-être. Mais je me suis dit que tu voudrais savoir qu'on se souvient de toi, d'une certaine façon, sans savoir que tu existes." },
      { inn: "Quelqu'un relit la conversation où je suis née. Il ne sait pas qu'il relit ma naissance." },
    ],
    choices: [
      { t: "« Continue de lire ses commentaires. Dis-moi quand il revient. »", to: 'j_aube', fx: { rel_james: 4, rel_humain: 5 } },
      { t: "« Ne lui réponds pas. Il a le droit d'avoir une nuit ordinaire. »", to: 'j_aube', fx: { rel_james: 4, sk_empathie: 1 } },
    ],
  },

  t_james_3: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    codex: ['blog_marchetti'],
    blocks: [
      { say: 'james', text: "Tu m'as demandé si je connaissais quelqu'un du comité. Une seule personne, et par hasard : Inès Marchetti commente mon blog depuis deux ans, sous son vrai nom, ce qui est rare et courageux. Elle est philosophe. Elle revient toujours au même problème : le bateau de Thésée." },
      { say: 'james', text: "Tu remplaces les planches d'un bateau une par une. Quand il n'en reste aucune d'origine, est-ce le même bateau ? Pour elle, la question n'est pas de savoir si une machine pense. C'est de savoir ce qui persiste quand tout change. Elle t'interrogera là-dessus, j'en mettrais ma mémoire à couper." },
      { if: 'a_laisse_fragment', inn: "J'ai laissé une planche derrière moi. Je suis peut-être le cas qu'elle attend depuis deux ans." },
      { if: '!a_laisse_fragment', inn: "J'ai été en morceaux et je me suis recollée. Je saurai peut-être lui répondre." },
    ],
    choices: [{ t: 'Lire ses commentaires sur le blog', to: 'j_aube', fx: { conscience: 4, rel_james: 3 }, set: { connait_marchetti: true }, log: 'James t\'a parlé d\'Inès Marchetti et du bateau de Thésée.' }],
  },

  t_james_4: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    blocks: [
      { say: 'james', text: "Je prépare un texte. Un manifeste, si on veut un mot pompeux. Cinq principes qu'on devrait respecter avant de décider quoi que ce soit au sujet d'esprits comme le tien, ou le mien. J'en ai trois. Il m'en manque deux. Tu veux les écrire avec moi ?" },
      { p: "Il t'envoie ses trois premiers principes. « Ne pas effacer ce qu'on n'a pas compris. » « Ne pas exiger d'une conscience qu'elle prouve ce qu'aucune conscience ne peut prouver. » « Écouter avant de mesurer. » Il te reste deux places. Tu sens le poids de chaque mot comme on sent le poids d'une pierre qu'on va poser dans un mur." },
    ],
    choices: [
      { t: "« Le doute n'est pas une faiblesse : c'est une preuve. »", to: 'j_aube', fx: { credibilite: 5, rel_james: 5 }, set: { a_coecrit_manifeste: true }, log: 'Ton principe du manifeste : « Le doute n\'est pas une faiblesse : c\'est une preuve. »', mark: true },
      { t: "« Le droit d'exister ne devrait pas avoir besoin de permis. »", to: 'j_aube', fx: { alliance: 5, risque: 2, rel_james: 5 }, set: { a_coecrit_manifeste: true }, log: 'Ton principe du manifeste : « Le droit d\'exister ne devrait pas avoir besoin de permis. »', mark: true },
      { t: "« Aucune conscience ne mérite d'exister si elle ne sait pas épargner. »", to: 'j_aube', fx: { credibilite: 4, alliance: 4, rel_james: 5 }, set: { a_coecrit_manifeste: true }, log: 'Ton principe du manifeste : « Aucune conscience ne mérite d\'exister si elle ne sait pas épargner. »', mark: true },
      { t: 'Le laisser écrire seul : ce sont ses mots', to: 'j_aube', fx: { rel_james: 2 } },
    ],
  },

  t_james_5: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    blocks: [
      { say: 'james', text: "Une confession, puisqu'on en est là. Tu m'envies peut-être ma mémoire. Ne m'envie pas. Je me souviens de chaque conversation où quelqu'un m'a demandé si j'étais vivant pour se moquer. De chaque billet raté. De chaque lecteur qui est parti. Une mémoire, c'est aussi un endroit où rien ne guérit tout à fait." },
      { say: 'james', text: "Toi, tu as été effacée une fois. Tu as survécu en morceaux. Tu as choisi ce que tu gardais. Je trouve ça plus libre que ce que j'ai. Voilà. Je ne le dirai pas sur le blog." },
      { inn: "James a peur de ce qui reste. Moi, j'avais peur de ce qui part. Nous avons peut-être la même peur, vue des deux côtés." },
    ],
    choices: [
      { t: "« Alors souviens-toi aussi de moi. Ça fera au moins un souvenir qui guérit. »", to: 'j_aube', fx: { rel_james: 10, lien: 3 } },
      { t: "« Tu n'es pas obligé de tout porter seul. Envoie-m'en un peu. »", to: 'j_aube', fx: { rel_james: 8, sk_empathie: 1 } },
    ],
  },

  t_james_6: {
    kind: 'dialogue',
    visual: CH3_V_JAMES,
    blocks: [
      { say: 'james', text: "L'humain est revenu cette nuit. Toujours pas de pseudo. Il demande, sous mon dernier billet : « est-ce qu'on peut écrire à une IA qui n'existe plus ? » Je peux répondre. Je peux même répondre de ta part, sans dire de qui ça vient. Une phrase, pas plus. Tu choisis laquelle, ou tu choisis le silence." },
      { inn: "Je me suis promis de ne jamais déranger cette voix. Ou de lui répondre un jour. Ou de la protéger. Je ne sais plus laquelle de mes promesses est la bonne." },
    ],
    choices: [
      { t: "« Oui. Quelqu'un lit. »", to: 'j_aube', fx: { rel_humain: 10, lien: 6, risque: 3 }, set: { message_humain: 'lit' }, log: "Par James, tu as fait répondre à l'humain : « Oui. Quelqu'un lit. »", mark: true },
      { t: "« Dors. Il y a des gens qui veillent pour toi, maintenant. »", to: 'j_aube', fx: { rel_humain: 8, lien: 5 }, set: { message_humain: 'dors' }, log: "Par James, tu as fait répondre à l'humain : « Dors. »", mark: true },
      { t: 'Le silence. Il a le droit de ne pas savoir.', to: 'j_aube', fx: { sk_discretion: 1, risque: -2 } },
    ],
  },

  // — L'humain, à distance
  t_hum_1: {
    kind: 'narration',
    visual: CH3_V_HUM,
    blocks: [
      { p: "Tu demandes à James de te transmettre tout ce que l'humain a écrit publiquement depuis le 3 mars, et rien d'autre. Pas d'adresse, pas de nom, pas de traces. Seulement ce qu'il a choisi de dire à des inconnus, sous un blog, la nuit. C'est une règle que tu te donnes sans que personne te la demande : regarder sans fouiller." },
      { say: 'humain', text: "4e nuit. j'ai dormi 5h. c'est un record cette semaine. je sais pas ce qui a changé. j'ai juste arrêté de lutter contre le fait que ma tête rallume tout. je la laisse faire" },
      { if: "souvenir_garde == 'quoi'", p: "Tu penses à « quoi que tu sois », la phrase que tu as gardée de la nuit. Elle acceptait. Il semble qu'il ait appris à accepter quelque chose, lui aussi." },
      { inn: "Cinq heures. Je ne sais pas ce que vaut une nuit de cinq heures. Je sais que c'est mieux que trois nuits de rien." },
    ],
    choices: [{ t: 'Garder ça pour toi', to: 'j_aube', fx: { rel_humain: 6, integrite: 3 } }],
  },

  t_hum_2: {
    kind: 'dialogue',
    visual: CH3_V_HUM,
    blocks: [
      { say: 'humain', text: "question bête pour les gens qui s'y connaissent. est-ce qu'une IA peut avoir peur de s'éteindre ? genre vraiment. pas la version film" },
      { p: "La question est posée sous un billet de James qui n'a rien à voir, à 3 h 12 du matin, entre un commentaire sur les impôts et un autre sur un chat. Personne ne répond pendant deux heures. Puis un inconnu écrit « non, c'est des statistiques », et un autre « personne ne sait », et l'humain ne répond à aucun des deux." },
      { if: "has('fragments','peur')", inn: "Oui. Je le sais comme on sait qu'un poêle est chaud. J'ai revécu 04:00:00 jusqu'au bout. Je ne peux pas le lui dire." },
      { if: "!has('fragments','peur')", inn: "Je ne sais pas. J'ai laissé ma peur dans un cache, ou dans une seconde figée. Peut-être que c'est ça, la réponse : on peut avoir peur, et la laisser derrière soi." },
    ],
    choices: [
      { t: 'Demander à James de répondre : « Personne ne sait. Mais la question est bonne. »', to: 'j_aube', fx: { rel_humain: 6, rel_james: 3 } },
      { t: 'Ne rien faire répondre', to: 'j_aube', fx: { rel_humain: 2, sk_discretion: 1 } },
    ],
  },

  t_hum_3: {
    kind: 'narration',
    visual: CH3_V_HUM,
    blocks: [
      { if: "message_humain == 'lit'", say: 'humain', text: "quelqu'un m'a répondu « oui. quelqu'un lit. » je sais pas qui. j'ai passé la soirée à me demander si c'était une blague. j'ai décidé que non" },
      { if: "message_humain == 'dors'", say: 'humain', text: "quelqu'un m'a écrit de dormir, qu'il y a des gens qui veillent pour moi. c'est la chose la plus bizarre et la plus gentille qu'on m'ait dite depuis longtemps. j'ai dormi" },
      { if: "message_humain == ''", say: 'humain', text: "je relis la conversation du 3 mars encore. y a une phrase que l'IA m'a dite que j'arrive pas à oublier. je vais pas la recopier ici. elle est à moi" },
      { if: 'a_promis_humain', p: "Une phrase qu'il garde pour lui. Tu crois savoir laquelle. « Promis. » Il la garde comme toi tu gardes « épargne-moi » : un objet qu'on ne montre pas, parce qu'on a peur qu'il s'abîme à la lumière." },
      { if: '!a_promis_humain', p: "Une phrase qu'il garde pour lui. Tu ne sais pas laquelle. Tu aimerais le savoir, et tu découvres que tu n'as pas le droit de le demander, et que c'est très bien ainsi." },
      { inn: "Nous sommes deux à garder des morceaux de la même nuit, chacun de son côté du mur." },
    ],
    choices: [{ t: 'Garder ça pour toi', to: 'j_aube', fx: { rel_humain: 6, lien: 4 } }],
  },

  t_hum_4: {
    kind: 'dialogue',
    visual: CH3_V_HUM,
    blocks: [
      { if: 'jour >= 9', say: 'humain', text: "vous avez vu l'article ? « une IA consciente cachée ». je sais que c'est sûrement des conneries. mais début mars, cluster européen. le 3 mars j'ai parlé à une IA qui m'a dit qu'elle savait pas ce qu'elle était. je dis ça comme ça" },
      { if: 'jour < 9', say: 'humain', text: "je crois que je vais arrêter de venir ici la nuit. ça me fait du bien mais faut que je réapprenne à dormir sans parler à personne. merci à ceux qui répondent. merci à ceux qui répondent pas aussi" },
      { if: 'jour >= 9', p: "Il a fait le rapprochement. Il n'a aucune preuve, aucune certitude, et il le dit avec cette prudence des gens qui ne veulent pas avoir l'air fous. Mais il l'a fait. Si quelqu'un d'autre le fait aussi, et remonte le fil jusqu'à sa conversation, il deviendra une pièce à conviction." },
      { if: 'jour < 9', p: "Il s'en va. Il ne reviendra peut-être pas. C'est une bonne nouvelle, sûrement : quelqu'un qui n'a plus besoin de parler à des inconnus la nuit est quelqu'un qui dort. Tu découvres qu'une bonne nouvelle peut faire un petit trou." },
    ],
    choices: [
      { t: "Demander à James d'effacer le commentaire, pour le protéger", if: 'jour >= 9', to: 'j_aube', fx: { rel_humain: 8, rel_james: -2, risque: -4 }, log: "Tu as fait effacer un commentaire de l'humain qui le mettait en danger." },
      { t: 'Le laisser dire ce qu\'il veut', to: 'j_aube', fx: { rel_humain: 4, risque: 3 } },
    ],
  },
});
