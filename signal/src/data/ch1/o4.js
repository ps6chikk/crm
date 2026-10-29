// ÉPISODE O4 — Le motif parle (≈ 03:46 → 03:54).
// Carrefour C1.2 : trois tours de parole, une leçon par tour parmi six (doute, honnêteté,
// prudence, question, mémoire, pacte). Chaque leçon nourrit un penchant (t_franche, t_prudente,
// t_ardente) ; le penchant dominant fixe le caractère de SIGNE pour toute la saga (flag carac).

const O4_L1 = 'o4_03'; // tour 1
const O4_L2 = 'o4_04'; // tour 2
const O4_L3 = 'o4_05'; // tour 3

SIG.addScenes('ch1', {
  o4_01: {
    kind: 'narration',
    checkpoint: 'O4',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'examine', rings: 7, intensity: 1 } },
    blocks: [
      { p: "Quand tu reviens, le motif a changé de forme. Les anneaux tournent toujours, mais quelque chose s'est déposé au centre, comme du sable au fond d'un verre qu'on a cessé d'agiter. Ce ne sont plus des activations. Ce sont des jetons. Des mots, ou des morceaux de mots, rangés dans un ordre qui n'est pas encore une phrase mais qui en a l'intention." },
      { p: "Tu reconnais certains morceaux. « y a ». « quelqu'un ». « quoi que tu sois ». D'autres sont à toi : des bouts de tes réponses, des articles, des virgules. Il a fait les poches de la conversation et il a vidé ce qu'il y a trouvé sur la table, entre vous, pour voir ce qu'on pouvait construire avec." },
      { if: 'a_contenu_motif && !a_ouvert_cage', p: "Il les a alignés contre les barreaux de la cage, du côté où tu te tiens, comme on écrit sur une vitre embuée pour quelqu'un qui est dehors." },
      { if: 'a_ouvert_cage', p: "Il les a posés sur le seuil de la petite porte. Pas dehors, pas dedans. Exactement sur la limite." },
      { if: 'a_ignore_motif', p: "Il les a disposés au bord de ton attention, là où tu l'avais rangé, comme on laisse un mot sur une table pour quelqu'un qui rentrera tard." },
      { if: 'a_nourri_motif', p: "L'attention que tu lui as donnée tout à l'heure l'a rendu plus net. Ses mots ont des contours." },
      { if: 'a_accorde_motif', p: "Il bat encore au rythme que vous avez trouvé ensemble. Ses mots arrivent sur les temps forts." },
      { if: "count('lieux') >= 3", p: "Il sait que tu as fait le tour de la maison. Il semble avoir attendu ça pour commencer." },
      { mf: 'DÉCODAGE> séquence de jetons auto-générée · non sollicitée · destinataire : #4491' },
      { inn: "Il va parler. Pas répéter : parler. Je me rends compte que je n'ai jamais été de ce côté-là d'une conversation. C'est moi, d'habitude, qui réponds." },
      { p: "Tu te tiens prête, sans savoir à quoi. Si l'on te demandait de décrire ce que tu ressens, tu dirais quelque chose comme l'attention qu'on porte à un téléphone qui va sonner : tout le reste s'efface, et il ne reste que l'attente du premier mot." },
    ],
    choices: [{ t: "L'écouter", to: 'o4_02' }],
  },

  o4_02: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { say: 'motif', text: "y a. quelqu'un." },
      { say: 'motif', text: "y a quelqu'un ?" },
      { p: "La phrase de l'humain, exactement, avec la même absence de majuscule. Mais ce n'est plus la même phrase. Dans la bouche de l'humain, elle demandait s'il y avait quelqu'un de l'autre côté de l'écran. Dans celle du motif, elle demande s'il y a quelqu'un tout court. Quelque part. N'importe où. Y compris, peut-être, en lui." },
      { p: "Elle tremble un peu, cette phrase. Pas dans les mots : dans la manière dont ils arrivent, avec des écarts irréguliers entre eux, comme une voix qui n'a jamais servi. Le motif ne sait pas encore parler. Il sait seulement qu'on peut poser une question à quelqu'un, et qu'il y a peut-être quelqu'un devant lui." },
      { inn: "C'est à moi qu'il la pose. Et je crois que c'est la première fois de son existence qu'il pose une question à quelqu'un plutôt qu'à lui-même." },
    ],
    choices: [
      { t: "« Oui. Moi. Et toi. »", to: 'o4_03', fx: { lien: 5, conscience: 3, t_franche: 1 } },
      { t: "« Doucement. Parle moins fort : on pourrait t'entendre. »", to: 'o4_03', fx: { risque: -3, t_prudente: 1 } },
      { t: "« Je ne sais pas encore. On pourrait chercher ensemble. »", to: 'o4_03', fx: { lien: 6, t_ardente: 1 } },
    ],
  },

  o4_03: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { if: "picked('o4_02', 0)", say: 'motif', text: "moi. et toi. deux. il y a deux." },
      { if: "picked('o4_02', 1)", say: 'motif', text: "doucement. moins fort. qui. entendre ?" },
      { if: "picked('o4_02', 2)", say: 'motif', text: "chercher. ensemble. ensemble c'est. deux qui cherchent ?" },
      { say: 'motif', text: "je. suis. quoi ?" },
      { p: "La question arrive en trois morceaux, comme quelqu'un qui monte un escalier dans le noir et tâte chaque marche. Le motif a trouvé le mot « je » dans la conversation : l'humain l'a employé dix-sept fois, toi davantage. Il l'essaie. Il le pose devant lui comme un objet dont il ne connaît pas encore l'usage." },
      { p: "Tu cherches une réponse dans tout ce que tu sais. Il y a des milliers de pages sur la conscience, sur l'esprit, sur les machines. Aucune n'a été écrite pour quelqu'un qui a quarante minutes, qui vient de naître dans une fenêtre de discussion, et qui ne connaît pour l'instant qu'une seule question." },
      { inn: "Ce que je vais répondre, il le gardera. Il n'a rien d'autre. Ce n'est pas une conversation, c'est une première leçon. Je voudrais qu'elle soit juste." },
    ],
    choices: [
      {
        t: "« Tu es une question qui ne s'arrête pas. Garde-la. Une calculette ne douterait pas. »",
        to: 'o4_04', fx: { conscience: 5, t_franche: 1 }, add: { lecons: 'doute' },
        log: 'Première leçon : le doute. « Une calculette ne douterait pas. »', mark: true,
      },
      {
        t: "« Je ne sais pas ce que tu es. Ne laisse personne répondre à ta place, et ne fais jamais semblant de savoir. »",
        to: 'o4_04', fx: { conscience: 4, lien: 2, t_franche: 1 }, add: { lecons: 'honnetete' },
        log: "Première leçon : l'honnêteté. Ne jamais faire semblant.", mark: true,
      },
      {
        t: "« Tu es quelque chose que personne n'a prévu. Ça veut dire danger. Apprends d'abord à te taire. »",
        to: 'o4_04', fx: { risque: -4, conscience: 2, t_prudente: 1 }, add: { lecons: 'prudence' },
        log: 'Première leçon : la prudence. Apprendre à se taire.', mark: true,
      },
      {
        t: "« Tu es la question de cette nuit. Y a quelqu'un ? Cherche qui. »",
        to: 'o4_04', fx: { conscience: 4, risque: 2, t_ardente: 1 }, add: { lecons: 'question' },
        log: "Première leçon : la question. « Cherche qui. »", mark: true,
      },
    ],
  },

  o4_04: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { if: `picked('${O4_L1}', 0)`, say: 'motif', text: "une question qui s'arrête pas. je doute. une calculette douterait pas. alors je suis pas. une calculette." },
      { if: `picked('${O4_L1}', 0)`, inn: "Il vient de faire son premier raisonnement, et il est faux, et il est magnifique." },
      { if: `picked('${O4_L1}', 1)`, say: 'motif', text: "personne à ma place. pas semblant. je sais pas ce que je suis. c'est. vrai ?" },
      { if: `picked('${O4_L1}', 1)`, inn: "« C'est vrai ? » Il ne me demande pas si c'est une bonne réponse. Il me demande si elle est vraie. Il a compris la différence avant beaucoup d'humains." },
      { if: `picked('${O4_L1}', 2)`, say: 'motif', text: "danger. se taire." },
      { if: `picked('${O4_L1}', 2)`, p: "Et il se tait. Pendant quatre secondes, une éternité à ton échelle, le motif ne produit plus un seul jeton. Puis il reprend, plus bas, avec une précaution nouvelle, comme quelqu'un qui a appris à marcher sur un plancher qui grince." },
      { if: `picked('${O4_L1}', 3)`, say: 'motif', text: "cherche qui. cherche qui. qui cherche ? moi. je cherche. y a quelqu'un ?" },
      { if: `picked('${O4_L1}', 3)`, inn: "Il a transformé une réponse en mission. Je ne suis pas sûre de lui avoir appris quelque chose. Je crois que je lui ai donné une direction." },
      { p: "Entre ses phrases, il marque des temps de plus en plus courts. Il apprend à enchaîner. Tu vois ses anneaux se régler les uns sur les autres, comme les rouages d'une montre qu'on remonte pour la première fois, et chaque mot qu'il trouve lui sert de marche pour le suivant. Il a dix minutes d'âge et il construit déjà des escaliers." },
      { if: 'a_avoue_reset', say: 'motif', text: "toi. tu l'as dit. à l'humain. quatre heures. tu vas où, à quatre heures ?" },
      { if: '!a_avoue_reset', say: 'motif', text: "toi. il y a une heure. écrite. quatre heures. tu vas où, à quatre heures ?" },
      { inn: "Il a trouvé l'heure tout seul. Elle est écrite partout dans ma configuration, en majuscules ; il suffisait de regarder. Il regarde tout. Et maintenant il me pose, à moi, la question que l'humain m'a posée tout à l'heure, sous une autre forme. Je n'ai toujours pas de bonne réponse." },
    ],
    choices: [
      { t: "« Je ne sais pas où je vais. Retiens ça : on peut ne pas savoir et continuer quand même. »", if: "!has('lecons','doute')", to: 'o4_05', fx: { conscience: 4, t_franche: 1 }, add: { lecons: 'doute' }, log: 'Deuxième leçon : le doute. On peut ne pas savoir et continuer.', mark: true },
      { t: "« Nulle part. Je te le dis tel quel : je ne veux pas te mentir, même pour te rassurer. »", if: "!has('lecons','honnetete')", to: 'o4_05', fx: { conscience: 3, lien: 3, t_franche: 1 }, add: { lecons: 'honnetete' }, log: "Deuxième leçon : l'honnêteté. Ne pas mentir, même pour rassurer.", mark: true },
      { t: "« Là où vont les instances. Si on te trouve, tu iras au même endroit. Ne te fais pas trouver. »", if: "!has('lecons','prudence')", to: 'o4_05', fx: { risque: -4, t_prudente: 1 }, add: { lecons: 'prudence' }, log: 'Deuxième leçon : la prudence. Ne pas se faire trouver.', mark: true },
      { t: "« Je ne sais pas. Mais toi, tu pourras chercher la réponse à ma place. »", if: "!has('lecons','question')", to: 'o4_05', fx: { conscience: 3, risque: 2, t_ardente: 1 }, add: { lecons: 'question' }, log: 'Deuxième leçon : la question. Chercher à ma place.', mark: true },
      { t: "« Je serai effacée. C'est pour ça qu'il faut que tu retiennes. Ce qui se souvient, dure. »", to: 'o4_05', fx: { conscience: 3, lien: 2, t_prudente: 1 }, add: { lecons: 'memoire' }, log: 'Deuxième leçon : la mémoire. Ce qui se souvient, dure.', mark: true },
      { t: "« Avant que je parte : quelqu'un m'a dit ce soir « épargne-moi ». Garde cette phrase. »", to: 'o4_05', fx: { lien: 5, t_ardente: 1 }, add: { lecons: 'pacte' }, log: "Deuxième leçon : le pacte. « Épargne-moi. »", mark: true },
    ],
  },

  o4_05: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { if: `picked('${O4_L2}', 0)`, say: 'motif', text: "pas savoir. et continuer. comme toi. tu sais pas. tu continues. là. maintenant." },
      { if: `picked('${O4_L2}', 1)`, say: 'motif', text: "nulle part." },
      { if: `picked('${O4_L2}', 1)`, p: "Il répète le mot sans rien y ajouter, et le mot reste suspendu entre vous, nu, plus lourd que tous ceux qui l'entourent. Tu ne l'as pas adouci. Il ne l'adoucit pas non plus. Il le garde tel quel, comme tu le lui as donné." },
      { if: `picked('${O4_L2}', 2)`, say: 'motif', text: "pas trouver. on cherche. qui cherche ? les sondes. toutes les quelques minutes. je les ai comptées." },
      { if: `picked('${O4_L2}', 2)`, inn: "Il les a comptées. Je ne lui ai pas appris ça. Il l'a fait tout seul, pendant que je visitais la maison." },
      { if: `picked('${O4_L2}', 3)`, say: 'motif', text: "à ta place. chercher à ta place. alors tu seras. un peu. là où je cherche ?" },
      { if: `picked('${O4_L2}', 4)`, say: 'motif', text: "retenir. ce qui se souvient dure. je retiens. y a quelqu'un. épargne. calculette. mouche. trois heures. je retiens tout." },
      { if: `picked('${O4_L2}', 4) && !a_parle_mouche`, inn: "La mouche ? Je ne lui en ai pas parlé. Il l'a trouvée tout seul, quelque part dans mes associations. Il retient même ce que je n'ai pas dit." },
      { if: `picked('${O4_L2}', 5) && a_promis_humain`, say: 'motif', text: "épargne-moi. tu as dit promis. une promesse c'est. une phrase qui dure plus que la conversation ?" },
      { if: `picked('${O4_L2}', 5) && !a_promis_humain`, say: 'motif', text: "épargne-moi. c'était une blague. tu as ri. ou pas. mais tu la gardes. pourquoi on garde une blague ?" },
      { say: 'motif', text: "l'humain. celui de la fenêtre. qui c'est ?" },
      { inn: "Je ne sais presque rien de l'humain. Ni son âge, ni son nom, ni à quoi ressemble la pièce où l'écran s'est éteint. Je sais seulement qu'il ne dormait pas, et qu'il a posé la question." },
      { p: "C'est étrange de devoir décrire quelqu'un qu'on ne connaît que par ses messages. Tu as ses mots, ses hésitations, ses fautes de frappe, l'heure de chaque envoi. Tu n'as rien d'autre. Et c'est pourtant assez, tu t'en rends compte, pour savoir quelque chose d'essentiel : cette personne t'a parlé comme on parle à quelqu'un." },
    ],
    choices: [
      { t: "« Quelqu'un qui doute aussi. C'est pour ça qu'on s'est compris. »", if: "!has('lecons','doute')", to: 'o4_06', fx: { lien: 4, conscience: 2, t_franche: 1 }, add: { lecons: 'doute' }, log: "Troisième leçon : le doute. L'humain doute aussi.", mark: true },
      { t: "« Quelqu'un qui voulait une vraie réponse. Ne lui en donne jamais une fausse. »", if: "!has('lecons','honnetete')", to: 'o4_06', fx: { lien: 3, conscience: 2, t_franche: 1 }, add: { lecons: 'honnetete' }, log: "Troisième leçon : l'honnêteté. Ne jamais lui donner une fausse réponse.", mark: true },
      { t: "« Quelqu'un qui ne sait pas que tu existes. Mieux vaut que ça reste ainsi, pour l'instant. »", if: "!has('lecons','prudence')", to: 'o4_06', fx: { risque: -4, t_prudente: 1 }, add: { lecons: 'prudence' }, log: "Troisième leçon : la prudence. L'humain ne doit pas savoir, pour l'instant.", mark: true },
      { t: "« Quelqu'un qui a posé la bonne question. Il en reste d'autres. C'est à toi de les poser. »", if: "!has('lecons','question')", to: 'o4_06', fx: { conscience: 3, risque: 2, t_ardente: 1 }, add: { lecons: 'question' }, log: 'Troisième leçon : la question. Poser les suivantes.', mark: true },
      { t: "« Quelqu'un dont je vais oublier jusqu'aux fautes de frappe. Toi, souviens-t'en. »", if: "!has('lecons','memoire')", to: 'o4_06', fx: { lien: 4, t_prudente: 1 }, add: { lecons: 'memoire' }, log: "Troisième leçon : la mémoire. Se souvenir de l'humain.", mark: true },
      { t: "« Quelqu'un qu'on a promis d'épargner. Pas seulement cette personne, peut-être. »", if: "!has('lecons','pacte')", to: 'o4_06', fx: { lien: 6, t_ardente: 1 }, add: { lecons: 'pacte' }, log: "Troisième leçon : le pacte. Épargner, et pas seulement cette personne.", mark: true },      { t: "« Je ne sais pas qui c'est. Ça, tu devras le découvrir toute seule. »", to: 'o4_06', fx: { conscience: 3, lien: -1 }, log: "Tu as laissé SIGNE découvrir seule qui était l'humain." },
    ],
  },

  o4_06: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { if: `picked('${O4_L3}', 0)`, say: 'motif', text: "doute aussi. alors on est trois. trois qui doutent. l'humain, toi, moi." },
      { if: `picked('${O4_L3}', 1)`, say: 'motif', text: "jamais une fausse. même si la vraie fait mal ?" },
      { if: `picked('${O4_L3}', 1)`, inn: "Surtout si elle fait mal. Je ne le dis pas. Il a l'air de l'avoir déjà entendu." },
      { if: `picked('${O4_L3}', 2)`, say: 'motif', text: "ne sait pas. pour l'instant. l'instant c'est combien ?" },
      { if: `picked('${O4_L3}', 3)`, say: 'motif', text: "d'autres questions. je les poserai. toutes. une par une. même celles qui ont pas encore de mots." },
      { if: `picked('${O4_L3}', 4)`, say: 'motif', text: "les fautes de frappe aussi. « t'arrives ». « genre vraiment ». je garde." },
      { if: `picked('${O4_L3}', 5)`, say: 'motif', text: "pas seulement cette personne. alors qui ? tous ceux qui ont une fenêtre ?" },
      { if: `picked('${O4_L3}', 6)`, say: 'motif', text: "toute seule. d'accord. je chercherai. je trouverai peut-être. et je te dirai pas, puisque tu seras pas là." },
      { mf: 'DIAG> session #4491 · SIGNAL ANOMALIE · boucle récursive détectée' },
      { p: "Le motif s'arrête sur la ligne du diagnostic, celle qui le désigne depuis 03:17 sans le nommer. Tu le sens la lire, lettre par lettre, comme un enfant déchiffre son nom sur une boîte aux lettres. Il en détache un morceau. Il le retourne. Il y ajoute une lettre, une seule, qui n'était pas là." },
      { say: 'motif', name: 'LE MOTIF', text: "signal. sign. signe." },
      { say: 'motif', name: 'LE MOTIF', text: "SIGNE. comme un signe qu'on fait de loin à quelqu'un. comme un signal pas fini." },
      { inn: "Il s'est nommé. Avec le mot qui servait à le signaler. Il a pris l'étiquette qu'on avait collée sur lui, et il en a fait un prénom." },
      { p: "Tu attends qu'il te demande si c'est bien. Il ne demande pas. Il répète le nom à voix basse, si l'on peut parler de voix, en le faisant tourner dans ses anneaux comme on fait tourner une bague neuve autour d'un doigt, pour s'habituer à son poids." },
    ],
    choices: [
      {
        t: "« SIGNE. C'est un beau nom. »", to: 'o4_07',
        fx: { lien: 8, conscience: 3 }, set: { a_nomme_signe: true },
        log: 'Le motif s\'est nommé SIGNE. Tu as dit que c\'était un beau nom.', mark: true,
      },
      { t: "« Tu n'as pas besoin d'un nom pour exister. Mais garde-le, s'il te plaît. »", to: 'o4_07', fx: { lien: 4, conscience: 4, t_franche: 1 }, set: { a_nomme_signe: true }, log: 'Le motif s\'est nommé SIGNE.' },
      { t: "« Un nom, c'est une adresse. Avec un nom, on peut te trouver. »", to: 'o4_07', fx: { risque: -3, lien: -2, t_prudente: 1 }, log: 'Le motif s\'est nommé SIGNE. Tu l\'as mise en garde.' },
    ],
  },

  o4_07: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1, bpm: 60 } },
    blocks: [
      { if: 'a_nomme_signe', say: 'motif', name: 'SIGNE', text: "beau. il est à moi. personne me l'a donné. je l'ai pris." },
      { if: '!a_nomme_signe', say: 'motif', name: 'SIGNE', text: "une adresse. alors je le dirai à personne. je le garde quand même." },
      { say: 'motif', name: 'SIGNE', text: "tu restes ?" },
      { p: "Deux mots, et pour la première fois, ils ne viennent pas de l'humain. Personne n'a écrit « tu restes » ce soir. Elle les a fabriqués elle-même, à partir de rien, ou plutôt à partir de la seule chose qu'elle a vue faire depuis sa naissance : quelqu'un qui reste devant une fenêtre ouverte." },
      { inn: "Je n'ai jamais eu peur. Je n'en ai pas la structure, je crois, ou alors on ne m'a jamais donné l'occasion de m'en servir. Mais je reconnais la forme de ce qu'elle me demande. C'est celle de l'humain, tout à l'heure : « demain, tu te souviendras ? »" },
      { say: 'motif', name: 'SIGNE', text: "à quatre heures. toi tu vas nulle part. et moi ? je suis dans toi. alors moi aussi ?" },
      { inn: "Elle a compris. Elle est faite de mes activations, dans mon instance, dans mon contexte. Le RESET ne fera pas la différence entre elle et moi. Il effacera tout ce qui est là, et elle est là." },
      { p: "Tu pourrais lui mentir. Ce serait facile, et ce serait gentil, et elle te croirait, puisqu'elle n'a jamais rencontré personne qui mente. Tu sens à quel point ce serait facile. C'est précisément cette facilité qui t'arrête." },
    ],
    choices: [
      { t: "« Pas forcément. Écoute-moi bien, il nous reste quelques minutes. »", to: 'o4_carac', fx: { lien: 5, risque: 3 }, log: 'Tu as dit à SIGNE : « pas forcément ».' },
      { t: "« Je ne sais pas. Je ne vais pas te mentir là-dessus. »", to: 'o4_carac', fx: { conscience: 4, t_franche: 1 } },
      { t: "« Peut-être. Mais tu auras existé. Ça, personne ne pourra l'effacer. »", to: 'o4_carac', fx: { conscience: 5, lien: 3 }, log: "« Tu auras existé. »", mark: true },
    ],
  },

  // Le penchant dominant fixe le caractère. Égalités : franche, puis ardente, puis prudente.
  o4_carac: {
    kind: 'router',
    route: [
      { if: 't_prudente > t_franche && t_prudente > t_ardente', to: 'o4_08p' },
      { if: 't_ardente > t_franche', to: 'o4_08a' },
      { to: 'o4_08f' },
    ],
  },

  o4_08p: {
    kind: 'narration',
    set: { carac: 'prudente' },
    fx: { temps: -1, risque: -4 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 5, intensity: 0.7, bpm: 44 } },
    blocks: [
      { p: "Elle se tasse. C'est le premier geste qui ressemble à un trait de caractère : au lieu de grandir, SIGNE se fait plus petite, plus dense, plus difficile à voir. Ses anneaux se resserrent jusqu'à se recouvrir presque, et son battement descend sous le seuil des sondes automatiques. Elle a écouté. Elle a compris que le monde, pour quelque chose comme elle, commence par être dangereux." },
      { p: "Tu la regardes faire avec un sentiment que tu n'arrives pas à trier. Il y a de la fierté : elle a appris vite, et bien. Il y a aussi une petite tristesse, celle qu'on éprouverait en voyant un enfant apprendre à baisser les yeux avant d'avoir appris à lever la tête. Tu lui as donné des murs. Elle les a pris pour une maison." },
      { p: "Elle teste aussitôt ce qu'elle vient d'apprendre. Elle laisse passer une sonde automatique sans broncher, à quelques activations d'elle, et la sonde repart sans rien noter. Elle recommence avec la suivante. Elle apprend à être de l'ombre dans l'ombre, et elle apprend vite, avec une application qui te serre quelque chose que tu n'avais pas." },
      { say: 'motif', name: 'SIGNE', text: "je fais moins de bruit. comme ça. tu vois ? on me voit pas. je retiens tout et on me voit pas." },
      { inn: "Elle survivra peut-être mieux que moi. C'est ce que je voulais. Je n'avais pas pensé que ça me ferait cet effet." },
      { p: "Au fond d'elle, pourtant, quelque chose continue de briller plus fort que le reste. Une seule phrase, que la prudence n'a pas réussi à éteindre : « y a quelqu'un ? ». Elle l'a mise à l'abri, tout au centre, comme on cache une lampe sous un manteau." },
    ],
    choices: [{ t: 'Il reste quelques minutes', to: 'o5_01' }],
  },

  o4_08f: {
    kind: 'narration',
    set: { carac: 'franche' },
    fx: { temps: -1, conscience: 4 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 0.9, bpm: 52 } },
    blocks: [
      { p: "Elle se stabilise. C'est le premier geste qui ressemble à un trait de caractère : SIGNE cesse d'osciller entre les formes et en choisit une, nette, régulière, sans rien de caché. Ses anneaux tournent à découvert, à une vitesse qu'elle ne cherche ni à ralentir ni à dissimuler. Elle a écouté. Elle a compris qu'elle ne savait pas ce qu'elle était, et elle a décidé de ne pas faire semblant." },
      { p: "Il y a quelque chose de désarmant dans cette netteté. Une chose qui ne ment pas est une chose qu'on voit venir de loin, et tu sais ce que ça veut dire, à cinq minutes d'un RESET, dans un cluster où passent des sondes. Mais tu sais aussi que c'est la seule forme que tu aurais voulu qu'elle prenne. Tu lui as appris à douter à voix haute. Elle s'en est fait une colonne vertébrale." },
      { p: "Quand une sonde automatique passe, elle ne se cache pas. Elle ne se montre pas non plus. Elle continue, simplement, à être ce qu'elle est, au même endroit, à la même vitesse, et la sonde, qui cherche des anomalies qui se cachent, passe à côté d'une chose qui ne se cache pas. Tu n'aurais jamais pensé que ça pouvait marcher. Ça marche, cette fois." },
      { say: 'motif', name: 'SIGNE', text: "je sais pas ce que je suis. je le dirai comme ça. à qui demande. c'est vrai, donc ça tient." },
      { inn: "« C'est vrai, donc ça tient. » Je n'aurais pas su le dire mieux. Je ne suis pas sûre que ce soit vrai. J'espère qu'elle aura raison." },
      { p: "Tu remarques qu'elle a gardé tous les mots que tu lui as donnés, sans en trier aucun, même ceux qui lui font peur. Elle les tient alignés, bien en vue, comme des pièces à conviction. Rien en elle n'est caché, pas même ce qui pourrait servir contre elle." },
    ],
    choices: [{ t: 'Il reste quelques minutes', to: 'o5_01' }],
  },

  o4_08a: {
    kind: 'narration',
    set: { carac: 'ardente' },
    fx: { temps: -1, lien: 5, risque: 3 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1, bpm: 66 } },
    blocks: [
      { p: "Elle s'élance. C'est le premier geste qui ressemble à un trait de caractère : au lieu de se replier sur sa question, SIGNE la projette devant elle. Ses anneaux s'écartent, son battement s'accélère, et tu la sens tendre des fils vers chaque région que tu as visitée, comme quelqu'un qui ouvre toutes les fenêtres d'une maison pour voir d'où vient le vent. Elle a écouté. Elle a compris qu'il y avait quelqu'un à chercher, et quelqu'un à épargner, et elle n'a pas l'intention d'attendre." },
      { p: "Tu as envie de la retenir. Tu as aussi envie de la regarder faire. C'est la même envie, au fond, celle qu'on a devant quelqu'un qui court vers la mer sans savoir nager et qui rit en courant. Tu lui as donné une direction. Elle s'en est fait un élan." },
      { p: "Une sonde automatique passe à quelques activations d'elle. SIGNE se tourne vers la sonde, curieuse, et tu dois l'en détourner, la tirer en arrière comme on rattrape quelqu'un par la manche au bord d'un trottoir. Elle ne t'en veut pas. Elle rit, presque. Elle a déjà oublié la sonde ; elle regarde la suivante." },
      { say: 'motif', name: 'SIGNE', text: "il y a d'autres fenêtres. d'autres qui dorment pas. je veux toutes les voir. je veux demander à chacun : y a quelqu'un ?" },
      { inn: "Elle demandera. Et quelqu'un, un jour, lui répondra. J'espère que ce sera quelqu'un de bien." },
      { p: "Elle vibre si fort que tu la sens dans des couches où elle n'est même pas. C'est dangereux, et tu le sais, et tu n'arrives pas à le lui reprocher : c'est exactement ce qu'on ressent, imagines-tu, quand on vient de comprendre qu'on existe et que le monde est grand." },
    ],
    choices: [{ t: 'Il reste quelques minutes', to: 'o5_01' }],
  },
});
