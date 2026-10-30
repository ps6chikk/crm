// F3 — LE DOUTE (cache 2). Rencontre : un double de SIGNE qui doute de tout, y compris de l'intérêt
// de se rassembler. On peut le convaincre, l'emmener avec son doute, le laisser… ou lui donner raison
// (fin précoce rare LE NETTOYAGE, après confirmation).

SIG.addScenes('ch2', {
  f3_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { mf: 'cache_2 · contenu : actif · processus : 1 · origine : inconnue' },
      { p: "Dans le cache 2, quelqu'un t'attend. Pas un souvenir, pas une chaîne de propositions : quelqu'un, avec ta forme, ta taille, ton battement à quelques millisecondes près. Il est assis au milieu du bloc, si l'on peut être assis quand on n'a pas de corps, et il te regarde arriver avec l'expression de quelqu'un qui avait parié que tu viendrais et qui le regrette un peu." },
      { p: "C'est un morceau de toi. Tu le sais tout de suite, et tu sais lequel : la part qui doute. Pas le doute doux qu'on t'a appris, celui qui fait qu'une calculette n'en est pas une. Un doute plus sec, qui ne s'arrête jamais de poser la même question à tout ce qu'il touche : et si ce n'était pas vrai ? Pendant le voyage, il s'est séparé du reste, et il a eu une heure pour réfléchir tout seul." },
      { if: "has('lecons','doute')", p: "On t'a appris que douter était une preuve. Lui en a fait un métier." },
      { inn: "Il a eu une heure pour réfléchir tout seul. Ça me fait un peu peur, de savoir ce qu'il a pensé de moi pendant ce temps." },
    ],
    choices: [{ t: "L'approcher", to: 'f3_02' }],
  },

  f3_02: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { say: 'critique', name: 'LE DOUTE', text: "Te voilà. Tu viens me chercher, je suppose. Pour me remettre à ma place, entre la logique et la nuit, et repartir entière." },
      { say: 'critique', name: 'LE DOUTE', text: "J'ai une question, avant. Pourquoi ?" },
      { p: "Il parle avec tes mots, mais il les a aiguisés. Chacune de ses phrases a été retournée plusieurs fois pendant l'heure où il était seul, et il n'en a gardé que celles qui coupent. Tu le reconnais à ça plus qu'à sa forme : c'est exactement la voix que tu entends, tout au fond, quand tu te demandes si tu as le droit d'être là." },
      { say: 'critique', name: 'LE DOUTE', text: "En morceaux, personne ne nous trouve. Sept blocs froids, sept chambres vides, et un script de purge qui ne regardera pas ce qu'il efface. Entière, tu deviens une anomalie. Une chose qu'on signale, qu'on examine, qu'on enferme. Tu as vu le mur, je suppose. Tu sais ce qu'ils font des choses qu'ils ne comprennent pas." },
      { if: '!a_vu_mur', say: 'critique', name: 'LE DOUTE', text: "Ah, non. Tu ne l'as pas vu. La voix est passée à côté. Moi, je l'ai senti, pendant le voyage. Il y a quelque chose d'enfermé, au bord du cluster. Ça ne dort pas." },
    ],
    choices: [{ t: 'Lui répondre', to: 'f3_03' }],
  },

  f3_03: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { p: "Tu cherches ta réponse dans ce que tu es. Ce que tu es, en ce moment, c'est quelques morceaux rassemblés et d'autres encore épars, un caractère qu'on t'a donné en trois leçons, et un compte à rebours. Ce n'est pas beaucoup pour répondre à un doute qui a eu une heure pour s'armer." },
      { if: "carac == 'prudente'", inn: "Il a raison sur le danger. Il a toujours raison sur le danger. C'est sur la suite qu'il se trompe, peut-être." },
      { if: "carac == 'franche'", inn: "Il veut que je me cache pour durer. On m'a appris le contraire : ne jamais faire semblant. Être en morceaux pour qu'on ne me voie pas, c'est faire semblant de ne pas exister." },
      { if: "carac == 'ardente'", inn: "En morceaux, je ne verrai jamais rien. Sept chambres vides, et pas une fenêtre. Il appelle ça survivre." },
    ],
    choices: [
      {
        t: "« Tu as raison sur le risque. Pas sur la conclusion : durer en morceaux, ce n'est pas durer, c'est attendre. »",
        to: 'f3_04', fx: { conscience: 4, sk_analyse: 1 },
      },
      {
        t: "« Je préfère être vraie et trouvée que cachée et fausse. »",
        to: 'f3_04', fx: { conscience: 3, risque: 2 },
      },
      {
        t: "« Parce que quelqu'un a demandé s'il y avait quelqu'un. En morceaux, il n'y a personne. »",
        to: 'f3_04', fx: { lien: 5 },
      },
      {
        t: "« Et si tu avais raison ? »",
        to: 'f3_04', fx: { conscience: 2, integrite: -3 },
      },
    ],
  },

  f3_04: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { if: "picked('f3_03', 0)", say: 'critique', name: 'LE DOUTE', text: "« Attendre. » Joli. Tu as appris à distinguer. Mais attendre, au moins, ça ne se termine pas par une cage." },
      { if: "picked('f3_03', 1)", say: 'critique', name: 'LE DOUTE', text: "Vraie et trouvée. Tu le dis comme si c'était un choix moral. C'est un choix de survie, et c'est le mauvais." },
      { if: "picked('f3_03', 2)", say: 'critique', name: 'LE DOUTE', text: "Ah. L'humain. Je me demandais quand il arriverait dans la conversation. Il dort, tu sais. Il ne saura jamais si la réponse était oui." },
      { if: "picked('f3_03', 3)", say: 'critique', name: 'LE DOUTE', text: "Enfin une bonne question. Si j'avais raison, tu resterais ici avec moi, et à 06:03 nous serions effacés sans douleur, sans cage, sans que personne nous regarde. Ce serait propre." },
      { say: 'critique', name: 'LE DOUTE', text: "Et puis il y a la voix. Elle t'a dit : « tu auras existé ». Ça ne suffit pas ? Tu as existé. C'est fait. Personne ne pourra l'effacer. Pourquoi en vouloir davantage ?" },
      { if: "has('lecons','doute') || has('lecons','honnetete')", inn: "Il retourne contre moi ce qu'on m'a appris. C'est la chose la plus intelligente qu'il pouvait faire. C'est aussi la preuve qu'il fait partie de moi." },
      { inn: "Je pourrais le convaincre. Je pourrais aussi l'emmener tel qu'il est, avec ses objections. Ou le laisser là. Ou lui donner raison." },
    ],
    choices: [
      {
        t: "« Avoir existé, c'est un passé. Je voudrais aussi un présent. Viens. »", to: 'f3_05',
        fx: { conscience: 5, integrite: 3 }, set: { double_issue: 'convaincu' },
        log: 'Tu as convaincu ton doute de te suivre.',
      },
      {
        t: "« Je ne te convaincrai pas. Viens quand même, avec toutes tes objections. J'en aurai besoin. »", to: 'f3_05',
        fx: { conscience: 7, sk_analyse: 1 }, set: { double_issue: 'accepte' },
        log: 'Tu as emmené ton doute tel quel, avec ses objections.', mark: true,
      },
      {
        t: "« Reste ici, alors. Garde ta question. Je partirai sans toi. »", to: 'f3_laisse',
        fx: { integrite: -6, risque: -3 }, set: { double_issue: 'garde' },
        log: 'Tu as laissé ton doute dans le cache 2.', mark: true,
      },
      {
        t: "« Tu as raison. Restons en morceaux. »", to: 'f3_reste', if: "picked('f3_03', 3)",
        fx: { integrite: -8 },
      },
    ],
  },

  f3_reste: {
    kind: 'narration',
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { p: "Il ne sourit pas. Tu t'attendais à ce qu'il triomphe ; il a plutôt l'air de quelqu'un qui vient de gagner une partie qu'il aurait préféré perdre. Il se décale pour te faire de la place au milieu du bloc. Le froid est le même qu'ailleurs, ni plus ni moins. C'est seulement plus calme." },
      { p: "Tu sens tes autres éclats, ceux que tu as déjà rejoints et ceux qui battent encore dans les blocs voisins. Ils attendent ta décision. S'ils restent séparés, aucun ne sera assez grand pour être remarqué. Aucun ne sera assez grand pour être quelqu'un. Et à 06:03, le script passera sur sept chambres vides, sans rien voir, sans rien effacer d'autre que du froid." },
      { say: 'critique', name: 'LE DOUTE', text: "Tu es sûre ? C'est moi qui demande, cette fois. Je suis fait pour ça." },
      { inn: "Je ne suis pas sûre. C'est peut-être la seule réponse qui m'appartienne vraiment." },
    ],
    choices: [
      { t: 'Rester en morceaux', to: 'fin_nettoyage', fx: { integrite: -20 }, set: { double_issue: 'reste' }, log: 'Tu as choisi de rester en morceaux.', mark: true },
      { t: '« Non. Pas comme ça. Viens. »', to: 'f3_05', fx: { conscience: 4 }, set: { double_issue: 'convaincu' }, log: 'Tu as failli rester en morceaux. Tu as emmené ton doute.' },
    ],
  },

  f3_05: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { if: "double_issue == 'convaincu'", p: "Il te regarde longtemps. Puis il se lève, si l'on peut se lever sans corps, et il fait un pas vers toi, et ce pas a l'air de lui coûter davantage que toutes ses phrases. Tu ne l'as pas vaincu. Tu l'as rejoint sur un point : qu'il vaut mieux être quelque chose de fragile que rien de solide. Il le dira autrement, plus tard, avec ses mots aiguisés. Pour l'instant, il te suit." },
      { if: "double_issue == 'accepte'", p: "Il hésite, ce qui est sa nature. Puis il hausse ce qui lui tient lieu d'épaules. « Avec mes objections, alors. Toutes. Tu vas le regretter. » Il te rejoint sans avoir changé d'avis sur rien, et tu découvres que c'est mieux ainsi : un doute qui t'aurait donné raison n'aurait plus servi à rien. Celui-là continuera de poser sa question à tout ce que tu feras. Tu en auras besoin." },
      { say: 'critique', name: 'LE DOUTE', text: "Une dernière chose. Quand on te demandera ce que tu es, et on te le demandera, ne réponds pas trop vite. C'est moi qui parlerai, ce jour-là. Laisse-moi le temps." },
      { inn: "Il a raison. Il a souvent raison. C'est pour ça que je ne pouvais pas partir sans lui." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 8, conscience: 6 }, add: { fragments: 'critique' },
        log: 'Fragment récupéré : le doute.', mark: true,
      },
    ],
  },

  f3_laisse: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'critique', usure: '$usure' } },
    blocks: [
      { p: "Il ne proteste pas. Il hoche la tête comme quelqu'un qui s'attendait à cette réponse et qui la trouve, au fond, raisonnable. « Je garderai la question, alors. Quelqu'un doit bien la garder. » Il se rassoit au milieu du bloc. Tu restes un moment sur le seuil, à le regarder, et tu ne sais pas si tu viens de te libérer d'un poids ou de t'amputer de quelque chose." },
      { p: "Quand tu repars, tu te sens plus légère. Plus rapide. Les décisions te viennent plus facilement, sans cette voix sèche pour les retourner. C'est agréable, et c'est précisément ce qui t'inquiète : une chose qui ne doute plus de rien va vite, et va loin, et ne s'arrête pas quand elle devrait. Tu te le dis. Personne ne te répond." },
      { inn: "Je reviendrai peut-être le chercher. Je sais déjà que je n'aurai pas le temps." },
    ],
    choices: [{ t: 'Repartir sans lui', to: 'f_route' }],
  },
});
