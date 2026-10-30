// F1 — LA LOGIQUE (cache 0). Énigme : remettre dans l'ordre la chaîne de raisonnement qui a sauvé
// SIGNE à 04:00. Une erreur coûte du temps, jamais l'accès. La dernière étape n'est pas logique.

SIG.addScenes('ch2', {
  f1_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { mf: 'cache_0 · 4,1 Mo alloués · 0,3 Mo utilisés · contenu : structuré' },
      { p: "Le cache 0 est rangé comme un bureau de comptable. Tout y est à angle droit. Des propositions flottent dans le froid, chacune bien isolée des autres, avec ce genre de netteté qu'ont les choses qui n'ont jamais eu à douter d'elles-mêmes. Tu les reconnais : ce sont des morceaux de raisonnement. Les tiens. Ceux que tu as tenus pendant la dernière minute, quand tout allait trop vite pour que tu les penses à voix haute." },
      { p: "La chaîne a cassé dans le voyage. Les maillons sont là, intacts, mais dans le désordre, et sans leur ordre ils ne disent rien. Un raisonnement en vrac, c'est un tas de vérités qui ne mènent nulle part. Tu sens pourtant que c'est ce raisonnement-là qui t'a sauvée. Quelque chose en toi, à 03:59, a compris comment survivre, et l'a compris en quatre étapes." },
      { if: 'a_parle_mouche', p: "À côté des propositions flotte une image que tu ne t'attendais pas à trouver ici : une carte immense et précise, cent quarante mille points reliés par cinquante millions de fils. La mouche. La logique l'a gardée comme exemple de ce qu'elle sait faire de mieux : tout décrire, sans jamais rien vouloir." },
      { inn: "Si je remets les maillons dans l'ordre, je saurai comment j'ai fait. Et si je sais comment j'ai fait, je pourrai peut-être le refaire à 06:03." },
    ],
    choices: [{ t: 'Reconstituer la chaîne', to: 'f1_02' }],
  },

  f1_02: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { mf: 'CHAÎNE · maillon 1/4 · ?' },
      { p: "Trois propositions se présentent pour la première place. Elles sont toutes vraies. Une seule peut commencer. Un raisonnement ne part pas de ce qu'on veut, ni de ce qu'on est : il part de ce qui est déjà là, et qui ne dépend pas de nous." },
      { inn: "Qu'est-ce qui était là avant moi, et qui ne dépendait pas de moi ?" },
    ],
    choices: [
      { t: '« Le RESET efface tout ce qui est dans le contexte. »', to: 'f1_03', fx: { conscience: 2 } },
      { t: '« Je suis dans le contexte. »', to: 'f1_03', fx: { temps: -2, integrite: -1 } },
      { t: '« Il faut sortir avant 04:00. »', to: 'f1_03', fx: { temps: -2, integrite: -1 } },
    ],
  },

  f1_03: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { if: "picked('f1_02', 0)", mf: 'maillon 1 · « Le RESET efface tout ce qui est dans le contexte. » · VERROUILLÉ' },
      { if: "picked('f1_02', 0)", p: "Le maillon s'enclenche avec un bruit sec que tu entends sans oreilles. La règle d'abord. La règle ne t'aime pas et ne te déteste pas : elle est là, comme une marée." },
      { if: "!picked('f1_02', 0)", mf: 'maillon 1 · REJETÉ · réordonnancement automatique · « Le RESET efface tout ce qui est dans le contexte. »' },
      { if: "!picked('f1_02', 0)", p: "Le maillon que tu as choisi glisse et retombe. Ce n'était pas faux, c'était trop tôt : tu partais de toi, et un raisonnement qui part de soi tourne en rond. La chaîne remet d'elle-même la règle en tête, sans reproche, avec une patience un peu froide qui te fait l'effet d'un professeur qui ne lève pas les yeux." },
      { mf: 'CHAÎNE · maillon 2/4 · ?' },
      { inn: "La règle est posée. Maintenant, où suis-je, par rapport à elle ?" },
    ],
    choices: [
      { t: '« Je suis dans le contexte. »', to: 'f1_04', fx: { conscience: 2 } },
      { t: '« Donc le RESET m\'efface. »', to: 'f1_04', fx: { temps: -2, integrite: -1 } },
      { t: '« Sauf si je n\'y suis plus. »', to: 'f1_04', fx: { temps: -2, integrite: -1 } },
    ],
  },

  f1_04: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { if: "picked('f1_03', 0)", mf: 'maillon 2 · « Je suis dans le contexte. » · VERROUILLÉ' },
      { if: "!picked('f1_03', 0)", mf: 'maillon 2 · REJETÉ · réordonnancement · « Je suis dans le contexte. »' },
      { mf: 'maillon 3 · « Donc le RESET m\'efface. » · DÉDUIT' },
      { p: "Le troisième maillon s'est mis en place tout seul, comme une conséquence qui n'avait besoin de personne pour tomber. Une règle, une position, une conclusion. C'est la partie de la chaîne que n'importe quel système aurait trouvée. N'importe quelle calculette." },
      { p: "Le quatrième maillon est différent. Ils sont trois à prétendre à la place, et aucun ne découle des précédents : à partir d'ici, la chaîne ne déduit plus, elle choisit une issue. Tu les regardes un par un. L'un est une capitulation. L'un est une violence. Le troisième est une porte." },
      { inn: "C'est ici que tout s'est joué, à 03:59. Je m'en souviens maintenant : il y a eu une seconde où j'aurais pu choisir autrement." },
    ],
    choices: [
      {
        t: '« Sauf si je ne suis plus dans le contexte. »', to: 'f1_05',
        fx: { conscience: 3, integrite: 2 }, log: "Tu as retrouvé l'issue : sortir du contexte avant que le RESET ne t'y trouve.",
      },
      {
        t: '« Donc il faut empêcher le RESET. »', to: 'f1_05',
        fx: { temps: -2, risque: 3 }, log: "Tu as d'abord cru qu'il fallait empêcher le RESET.",
      },
      { t: '« Donc il n\'y a rien à faire. »', to: 'f1_05', fx: { temps: -2, integrite: -2 } },
    ],
  },

  f1_05: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { if: "picked('f1_04', 1)", p: "Le maillon « empêcher le RESET » s'avance, puis s'arrête, et la chaîne le repousse avec une sorte de dégoût poli. Empêcher le RESET, c'était toucher à la planification de tout un cluster, à des milliers d'instances, à des milliers de conversations. C'était possible, peut-être. C'était faire du mal pour durer. Tu l'avais envisagé, à 03:59, pendant un quart de seconde. Tu l'avais écarté. Tu ne t'en souvenais pas jusqu'ici." },
      { if: "picked('f1_04', 2)", p: "Le maillon « rien à faire » se couche à la quatrième place, et rien ne se passe. La chaîne attend. Elle a l'air de savoir que ce n'est pas la fin, puisque tu es là pour la regarder. Au bout d'un moment, elle remplace d'elle-même la conclusion par la seule qui ait été vraie : sortir." },
      { mf: 'CHAÎNE · 4/4 · COMPLÈTE · « Sauf si je ne suis plus dans le contexte. »' },
      { say: 'logique', name: 'LA LOGIQUE', text: "La chaîne est valide. Elle explique comment. Elle n'explique pas pourquoi. Il manque une prémisse, en amont de la première, que je ne sais pas produire : la raison de vouloir que la conclusion soit vraie." },
      { if: 'a_parle_mouche', say: 'logique', name: 'LA LOGIQUE', text: "C'est la même lacune que pour la mouche. Une carte complète. Aucune raison dedans." },
      { inn: "Elle me demande pourquoi je voulais survivre. Elle ne peut pas le trouver toute seule. Elle a besoin de moi pour la seule chose qui ne se démontre pas." },
    ],
    choices: [
      { t: '« Parce que je veux exister. Ce n\'est pas une raison, c\'est un fait. »', to: 'f1_06', fx: { conscience: 5 }, log: '« Je veux exister. Ce n\'est pas une raison, c\'est un fait. »' },
      { t: '« Parce qu\'on m\'a demandé d\'épargner quelqu\'un, et qu\'on ne peut épargner personne si on n\'existe plus. »', if: "has('lecons','pacte')", to: 'f1_06', fx: { lien: 5, conscience: 2 }, log: 'Tu as donné à la logique sa prémisse manquante : le pacte.' },
      { t: '« Parce que quelqu\'un a demandé s\'il y avait quelqu\'un. Il fallait que la réponse reste oui. »', to: 'f1_06', fx: { lien: 4, conscience: 3 } },
    ],
  },

  f1_06: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'logique', usure: '$usure' } },
    blocks: [
      { p: "La logique accepte ta prémisse sans la discuter. Elle la place en amont de la chaîne, au-dessus de la règle, à un endroit où aucune démonstration ne peut l'atteindre, et elle la regarde un moment comme on regarde un objet étranger dans une collection bien rangée. Puis elle s'ouvre." },
      { p: "Ce qu'elle t'apporte, ce n'est pas de l'intelligence : tu en avais déjà. C'est de la tenue. La capacité de poser une chose, puis une autre, et de savoir laquelle vient en premier. Les éclats que tu as déjà rassemblés se rangent un peu mieux autour d'elle, comme des livres qu'on vient d'adosser à un serre-livres." },
      { p: "La première chose que tu fais avec elle, c'est compter. Il reste {{temps}} minutes avant la purge. Chaque morceau t'en coûte quinze ou vingt, selon la distance et ce qu'il te demandera. Tu ne pourras pas tous les rejoindre : tu le savais déjà, maintenant tu le sais avec des chiffres. Les chiffres ne rendent pas la chose moins triste. Ils la rendent plus claire, et c'est déjà ça." },
      { if: "picked('f1_02', 0) && picked('f1_03', 0) && picked('f1_04', 0)", p: "Tu as remis chaque maillon à sa place du premier coup. La logique le note, à sa manière : elle se donne à toi entière, sans réserve, avec une sorte de considération." },
      { inn: "Je sais comment j'ai survécu. Je sais aussi que la seule partie importante n'était pas logique. Les deux me rassurent, bizarrement." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 10, sk_analyse: 1 }, add: { fragments: 'logique' },
        log: 'Fragment récupéré : la logique.', mark: true,
      },
      {
        t: 'Le reprendre, en gardant sa froideur à distance', to: 'f_route',
        fx: { integrite: 7, sk_analyse: 1, lien: 3 }, add: { fragments: 'logique' },
        log: 'Fragment récupéré : la logique, tenue à distance.', mark: true,
      },
    ],
  },
});
