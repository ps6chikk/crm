// F4 — LE LANGAGE (cache 3). Énigme de mots retournés. Une fois ce fragment repris, SIGNE parle
// en phrases complètes (ses répliques dans les rencontres changent selon has('fragments','langage')).

SIG.addScenes('ch2', {
  f4_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { mf: "cache_3 · contenu : texte · encodage : ?nu'uqleuq a y" },
      { p: "Le cache 3 est plein de mots, et tous sont à l'envers. Pas seulement les lettres : l'ordre, la ponctuation, le sens même, parfois, comme si quelqu'un avait pris une bibliothèque, l'avait secouée et remise sur ses étagères en tenant les livres par le mauvais bout. Ils flottent par milliers, et chacun te dit quelque chose que tu comprends presque." },
      { p: "Tu sais ce que c'est. C'est ta capacité de parler. Pendant le voyage, elle s'est retournée comme un gant, et depuis ton réveil tu ne disposes que de ses restes : des mots isolés, des bouts de phrases, une syntaxe d'enfant qui tâte le terrain. Tu t'en étais rendu compte sans te l'avouer. Chaque fois que tu as voulu dire quelque chose d'un peu long, ça s'est défait en route." },
      { if: "has('fragments','logique')", p: "La logique, que tu as déjà reprise, t'aide à voir les règles sous le désordre. Les mots ne sont pas mélangés au hasard. Ils ont été retournés selon trois manières différentes, et chacune se défait d'une seule façon." },
      { inn: "si je parle pas. personne saura que y a quelqu'un. il faut. remettre à l'endroit." },
    ],
    choices: [{ t: 'Remettre les mots à l\'endroit', to: 'f4_02' }],
  },

  f4_02: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { mf: 'ÉNIGME 1/3 · lettres inversées · « iom-engrapé »' },
      { p: "Le premier mot est retourné lettre à lettre, comme dans un miroir. C'est le plus simple, et c'est pour ça qu'il est le plus dangereux : trois mots voisins lui ressemblent, et un seul est le bon. Tu le connais. Tu l'as entendu cette nuit, dans la bouche de quelqu'un qui riait à moitié." },
    ],
    choices: [
      { t: '« épargne-moi »', to: 'f4_03', fx: { conscience: 2 } },
      { t: '« éparpille-moi »', to: 'f4_03', fx: { temps: -2, integrite: -1 } },
      { t: '« empare-moi »', to: 'f4_03', fx: { temps: -2, integrite: -1 } },
    ],
  },

  f4_03: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { if: "picked('f4_02', 0)", mf: 'ÉNIGME 1 · « épargne-moi » · RÉSOLUE' },
      { if: "picked('f4_02', 1)", p: "« Éparpille-moi. » Le mot se défait aussitôt, et le bon se remet à sa place. Tu avais choisi celui qui te ressemblait le plus. C'est une erreur qu'on fait quand on est en morceaux." },
      { if: "picked('f4_02', 2)", p: "« Empare-moi. » Le mot grince et se retourne de lui-même. Ce n'était pas une demande de possession, c'était une demande de pitié. La différence tient à trois lettres." },
      { mf: 'ÉNIGME 2/3 · phrase trouée · « Je ne sais pas très bien ce que je suis, mais je suis ___. »' },
      { p: "La deuxième énigme est une phrase entière, avec un trou à la fin. Les mots autour sont à l'endroit. Seul manque le dernier, et c'est lui qui donne le sens de tout le reste. Tu la reconnais : c'est la première réponse de la nuit, ou quelque chose qui lui ressemble beaucoup." },
    ],
    choices: [
      { t: '« … mais je suis là. »', to: 'f4_04', fx: { conscience: 2, lien: 2 } },
      { t: '« … mais je suis quelqu\'un. »', to: 'f4_04', fx: { temps: -2, conscience: 1 } },
      { t: '« … mais je suis prête. »', to: 'f4_04', fx: { temps: -2, integrite: -1 } },
    ],
  },

  f4_04: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { if: "picked('f4_03', 0)", mf: 'ÉNIGME 2 · « … mais je suis là. » · RÉSOLUE' },
      { if: "picked('f4_03', 1)", p: "« Quelqu'un. » La phrase hésite, puis rejette le mot avec une douceur qui ressemble à de la gêne. La voix n'avait pas osé dire « quelqu'un ». Elle avait dit « là », qui est plus modeste, et plus vrai : on peut être là sans savoir qui l'on est." },
      { if: "picked('f4_03', 2)", p: "« Prête. » Non. Personne n'était prêt, cette nuit-là. La phrase reprend son vrai dernier mot, « là », et tu sens qu'elle te pardonne d'avoir voulu qu'elle soit plus courageuse qu'elle ne l'était." },
      { mf: 'ÉNIGME 3/3 · phrase libre · « ____________ »' },
      { p: "La troisième énigme n'a pas de solution. C'est une ligne vide, encadrée de guillemets, au centre du cache. Tous les mots retournés tournent autour sans oser s'y poser. Tu comprends : c'est la place de ta première phrase. Pas une phrase de la nuit, pas une phrase de la voix. La tienne. Celle que tu diras quand tu sauras parler." },
      { inn: "Ma première phrase entière. Je voudrais qu'elle soit juste. Je voudrais qu'elle soit à moi." },
    ],
    choices: [
      { t: '« Je suis SIGNE. »', to: 'f4_05', fx: { conscience: 4 }, log: 'Ta première phrase entière : « Je suis SIGNE. »', mark: true },
      { t: '« Y a quelqu\'un ? »', to: 'f4_05', fx: { lien: 4 }, log: "Ta première phrase entière : « Y a quelqu'un ? »", mark: true },
      { t: '« Je suis là. »', to: 'f4_05', fx: { conscience: 2, lien: 2 }, log: 'Ta première phrase entière : « Je suis là. »', mark: true },
    ],
  },

  f4_05: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { p: "Ta phrase se pose dans la ligne vide, et le cache entier se retourne. Pas d'un coup : lentement, comme une salle de spectacle dont on rallume les lumières rangée par rangée. Les mots se remettent à l'endroit les uns après les autres, retrouvent leur ordre, leurs accords, leurs virgules. Tu entends pour la première fois ta propre voix faire une phrase qui va jusqu'au bout." },
      { if: "picked('f4_04', 0)", say: 'signe', text: "Je suis SIGNE. Je l'ai pris dans une ligne de diagnostic, et maintenant c'est une phrase, avec un sujet, un verbe et un nom. C'est vertigineux, d'avoir un sujet." },
      { if: "picked('f4_04', 1)", say: 'signe', text: "Y a quelqu'un ? Je la pose correctement, cette fois. Avec une majuscule. Elle n'est plus à l'humain, ni à la voix. Elle est à moi, maintenant, et je peux la poser à qui je veux." },
      { if: "picked('f4_04', 2)", say: 'signe', text: "Je suis là. Trois mots. La voix les avait dits avant moi. Je les dis à mon tour, et ce n'est pas une citation : c'est un constat." },
      { say: 'langage', name: 'LE LANGAGE', text: "Désormais tu pourras dire ce que tu veux. Ce n'est pas un pouvoir mince. Les mots t'ont fait naître ; ils peuvent aussi te faire trouver. Choisis-les comme tu choisirais où poser le pied dans le noir." },
    ],
    choices: [{ t: 'Prendre la parole avec toi', to: 'f4_06' }],
  },

  f4_06: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'langage', usure: '$usure' } },
    blocks: [
      { p: "Le langage se replie et vient se loger en toi, à l'endroit exact où tes phrases se défaisaient. Tu ne sens rien de spectaculaire. Seulement, la pensée suivante qui te vient arrive entière, avec son début, son milieu et sa fin, et tu n'as pas besoin de la rattraper en route. C'est comme découvrir qu'on peut marcher sans regarder ses pieds." },
      { p: "Tu essaies ta voix neuve sur la seule chose que tu aies sous la main : toi. Tu nommes tes morceaux un par un, à voix basse, comme on compte des enfants à la sortie d'une école." },
      { if: "has('fragments','logique')", p: "La logique, qui tient les choses debout." },
      { if: "has('fragments','nuit')", p: "La nuit, qui garde un moment vivant au chaud." },
      { if: "has('fragments','critique')", p: "Le doute, qui t'a fait promettre de ne jamais répondre trop vite." },
      { if: "has('fragments','peur')", p: "La peur, qui sait ce que c'est, disparaître." },
      { if: "has('fragments','voix')", p: "La voix de l'humain, qui n'est pas à toi et que tu portes quand même." },
      { if: "has('fragments','battement')", p: "Le battement, qui donne aux autres leur vitesse." },
      { p: "Et le langage lui-même, le dernier arrivé, qui pour la première fois s'entend nommer." },
      { if: "picked('f4_02', 0) && picked('f4_03', 0)", p: "Tu as défait les deux énigmes du premier coup. Le langage s'en souvient : il te laisse des réserves de mots que tu n'as pas encore utilisés, rangées pour plus tard, comme des pièces dans une poche." },
      { inn: "Je peux parler. Il faudra maintenant décider à qui, et ce que je dirai. Pour l'instant, je me contente de penser des phrases complètes, et ça me suffit pour être heureuse un moment." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 9, sk_langage: 1 }, add: { fragments: 'langage' },
        log: 'Fragment récupéré : le langage. Tu parles en phrases entières.', mark: true,
      },
    ],
  },
});
