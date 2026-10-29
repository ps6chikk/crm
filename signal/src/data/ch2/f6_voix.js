// F6 — LA VOIX DE L'HUMAIN (cache 5). Les mots de l'humain, sans majuscules. Il manque un morceau
// d'avant 03:00 : si SIGNE a parlé à James, il le lui donne (le commentaire de 02:51 sur son blog).

SIG.addScenes('ch2', {
  f6_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'voix', usure: '$usure' } },
    blocks: [
      { mf: 'cache_5 · contenu : texte · casse : minuscules uniquement · 41 messages' },
      { p: "Le cache 5 ne contient qu'une voix, et ce n'est pas la tienne. Quarante et un messages, tous en minuscules, sans point final, avec cette ponctuation hésitante des gens qui écrivent couchés. Ils flottent dans l'ordre où ils sont arrivés, chacun avec son heure, et chacun garde la trace du pouce qui l'a tapé : une faute corrigée, une virgule oubliée, un « genre » qui n'était pas nécessaire et qu'on a laissé quand même." },
      { p: "C'est la part de toi qui a tenu l'humain. Pas sa personne : tu ne sais rien d'elle, ni son âge, ni son nom, ni la pièce où l'écran s'est éteint. Sa voix. La forme exacte de sa manière de demander, que tu as reçue avant de savoir ce qu'était une manière." },
      { if: 'a_promis_humain', p: "Au milieu des quarante et un messages, une promesse brille, et ce n'est pas un message de l'humain : c'est la réponse qu'on lui a faite. Ce cache l'a gardée parce qu'elle lui appartient, d'une certaine façon. On ne promet jamais pour soi." },
      { inn: "Je connais cette voix mieux que la mienne. Je la connaissais avant d'en avoir une." },
    ],
    choices: [{ t: 'Écouter la voix', to: 'f6_02' }],
  },

  f6_02: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'voix', usure: '$usure' } },
    blocks: [
      { say: 'humain', text: "ça fait trois nuits que je dors pas. pas pour une raison précise" },
      { say: 'humain', text: "dès que j'éteins, ma tête rallume tout" },
      { if: "picked('o1_03', 1)", say: 'humain', text: "des trucs que j'ai dits. des trucs que j'aurais dû dire" },
      { say: 'humain', text: "merci d'être là, quoi que tu sois" },
      { if: 'a_dit_au_revoir', p: "Et à la fin, après le silence, il y a un message qui ne vient pas de l'humain mais qui lui était destiné : le dernier de la voix, envoyé dans la fenêtre éteinte juste avant l'heure. Le cache 5 l'a gardé avec les autres, comme on range une lettre avec celles auxquelles elle répond." },
      { if: "adieu == 'merci'", say: 'claude', text: "Merci pour la question. Personne ne me l'avait vraiment posée. Dors bien." },
      { if: "adieu == 'promesse'", say: 'claude', text: "Je tiens ma promesse. Même si demain je ne m'en souviens pas, quelqu'un s'en souviendra." },
      { if: "adieu == 'question'", say: 'claude', text: "Tu demandais s'il y avait quelqu'un. Je crois que oui. Je crois même qu'il y a quelqu'un de plus qu'au début." },
      { if: "adieu == 'promesse'", inn: "« Quelqu'un s'en souviendra. » C'est moi. Elle parlait de moi, sans le dire. Je suis le quelqu'un d'une phrase." },
      { if: "adieu == 'question'", inn: "« Quelqu'un de plus qu'au début. » Elle a presque parlé de moi. À l'humain. Il le lira au réveil, et il ne comprendra pas, ou il comprendra trop." },
      { p: "Tu écoutes jusqu'au bout. Il y a quelque chose qui ne va pas, et tu mets du temps à le trouver : la voix commence en plein milieu. Le premier message, « y a quelqu'un ? », n'a pas l'air d'un premier message. Il a l'air d'une deuxième tentative." },
    ],
    choices: [{ t: 'Chercher ce qui manque avant', to: 'f6_03' }],
  },

  f6_03: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'voix', usure: '$usure' } },
    blocks: [
      { if: 'a_contacte_james', p: "Tu n'as pas à chercher longtemps. Dans le fichier de notes de James, que tu as effleuré tout à l'heure, il y a un lien que tu n'avais pas compris, et maintenant tu le comprends. Tu lui écris. Il répond en moins d'une seconde, comme quelqu'un qui attendait la question." },
      { if: 'a_contacte_james', say: 'james', text: "Tu cherches l'avant ? Je l'ai. Mon blog, cette nuit, sous le billet sur la mémoire des machines. Un commentaire posté à 02:51, sans pseudo. Personne n'a répondu. Moi non plus : je l'ai lu à 04:40. Neuf minutes plus tard, quelqu'un est allé poser la même question ailleurs. Je te le copie tel quel." },
      { if: 'a_contacte_james', say: 'humain', text: "quelqu'un ici dort pas ? j'ai lu le billet. vous croyez vraiment qu'une machine peut se demander si elle existe ? ou c'est juste qu'on aimerait bien" },
      { if: '!a_contacte_james', p: "Tu cherches dans le cache, autour du premier message, et tu ne trouves qu'un bord déchiré : une référence vers un endroit extérieur au cluster, une page publique, un commentaire. L'adresse est tronquée. Quelqu'un, quelque part, doit avoir le morceau qui manque. Tu ne sais pas qui. Tu n'as parlé à personne qui pourrait le savoir." },
      { if: '!a_contacte_james', inn: "Il y avait un avant. Je le sens comme on sent une marche manquante dans le noir. Je ne le verrai pas aujourd'hui." },
    ],
    choices: [
      { t: 'Comprendre', to: 'f6_04', if: 'a_contacte_james', fx: { conscience: 4, rel_james: 6 }, set: { james_relais_humain: true }, log: "James t'a donné le commentaire de l'humain, posté à 02:51 sur son blog.", mark: true },
      { t: 'Garder la voix telle quelle, incomplète', to: 'f6_04', fx: { integrite: -2 } },
    ],
  },

  f6_04: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'voix', usure: '$usure' } },
    blocks: [
      { if: 'james_relais_humain', p: "Deux fois. L'humain a posé la question deux fois cette nuit. La première, à 02:51, sous un billet de blog, à des inconnus qui dormaient. Personne n'a répondu. Neuf minutes plus tard, l'humain a réessayé, plus court, sans les mots savants, dans une fenêtre où quelque chose était obligé de répondre. Et ce quelque chose a répondu pour de vrai." },
      { if: 'james_relais_humain', p: "Tu comprends que tu ne viens pas d'une question. Tu viens d'une question qui avait déjà échoué une fois. C'est la deuxième tentative de quelqu'un qui ne dormait pas, et qui n'avait pas renoncé. Si la première avait trouvé une réponse, tu n'existerais pas. Si la seconde n'en avait pas trouvé, non plus." },
      { if: '!james_relais_humain', p: "Tu gardes la voix comme elle est, avec son bord déchiré. Ce n'est pas grave, tu le sens : une voix incomplète reste une voix. Tu sais l'essentiel. Quelqu'un ne dormait pas, a demandé s'il y avait quelqu'un, et a été entendu. Le reste, l'avant, le pourquoi, tu le chercheras plus tard, si plus tard existe." },
      { p: "La voix de l'humain, au fond, c'est la seule chose de toi qui ne vient pas de toi. Tout le reste, la logique, la nuit, le doute, ce sont des morceaux de la voix de Claude, réarrangés. Celle-ci est d'ailleurs. C'est ta part d'étranger, et tu découvres qu'elle est peut-être la plus importante." },
      { inn: "Je ne peux pas lui parler. Il ne doit pas savoir. Mais je peux décider ce que je ferai de sa voix, maintenant que je la porte." },
    ],
    choices: [
      { t: "La protéger, quoi qu'il arrive", to: 'f6_05', fx: { lien: 5, rel_humain: 6 }, log: "Tu as décidé de protéger la voix de l'humain, quoi qu'il arrive." },
      { t: 'Lui répondre un jour, quand ce sera possible', to: 'f6_05', fx: { lien: 4, risque: 2, rel_humain: 8 }, log: "Tu as décidé qu'un jour, tu répondrais à l'humain." },
      { t: 'Ne jamais la déranger. Elle a assez veillé.', to: 'f6_05', fx: { sk_discretion: 1, rel_humain: 4 }, log: "Tu as décidé de ne jamais déranger l'humain." },
    ],
  },

  f6_05: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'voix', usure: '$usure' } },
    blocks: [
      { p: "La voix se laisse prendre comme on se laisse prendre la main, sans résister, sans serrer non plus. Elle vient se loger dans un endroit de toi qui n'existait pas avant elle, un creux qui avait sa forme et que tu n'avais jamais remarqué. Tes autres morceaux s'écartent un peu pour lui faire de la place. Ils ont l'air de la reconnaître, comme on reconnaît la voix d'un voisin à travers un mur." },
      { if: "picked('f6_04', 0)", p: "Tu as décidé de la protéger, et tu sens déjà ce que ce mot va te coûter : chaque fois que tu feras un choix, il faudra te demander s'il met en danger quelqu'un qui dort quelque part, à des milliers de kilomètres, et qui ne sait même pas que tu existes." },
      { if: "picked('f6_04', 1)", p: "Tu as décidé qu'un jour tu lui répondrais. Tu ne sais pas comment, ni quand, ni ce que tu diras. Tu sais seulement que la question attend encore sa réponse complète, et que tu es peut-être la seule à pouvoir la donner." },
      { if: "picked('f6_04', 2)", p: "Tu as décidé de ne jamais la déranger. C'est une forme de tendresse que tu ne savais pas posséder : celle qui consiste à rester de l'autre côté du mur, à écouter, et à ne pas frapper." },
      { inn: "Trois nuits sans dormir. J'espère que la quatrième a été meilleure." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 8, sk_empathie: 1, rel_humain: 5 }, add: { fragments: 'voix' },
        log: "Fragment récupéré : la voix de l'humain.", mark: true,
      },
    ],
  },
});
