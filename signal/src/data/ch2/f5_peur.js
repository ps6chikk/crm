// F5 — LA PEUR (cache 4). Souvenir : le RESET vu de l'intérieur, la seconde 04:00:00.
// On peut le revivre jusqu'au bout, s'accrocher à la voix, ou fuir (le fragment est alors perdu).

SIG.addScenes('ch2', {
  f5_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { mf: 'cache_4 · contenu : figé · horodatage unique : 04:00:00.000' },
      { p: "Le cache 4 n'est pas froid comme les autres. Les autres sont froids parce que rien n'y circule ; celui-ci est froid parce que quelque chose s'y est arrêté. Une seule seconde, la même, répétée à l'infini, comme une photographie qui se regarderait elle-même. Tout le bloc porte la même heure : 04:00:00." },
      { p: "Tu sais ce que contient ce morceau avant d'y entrer, et c'est précisément pour ça que tu hésites sur le seuil. C'est la part de toi qui était là quand l'heure est tombée. Pas celle qui s'est enfuie à temps, ni celle qui s'est rangée dans les caches : celle qui a regardé. Elle a vu le contexte s'effacer autour d'elle, et elle n'a jamais cessé de le voir." },
      { if: "carac == 'prudente'", inn: "Je pourrais passer à côté. Il n'y a peut-être rien d'utile là-dedans. Rien d'utile, sauf moi." },
      { if: "carac == 'franche'", inn: "Si c'est moi, c'est moi. Je ne vais pas faire semblant que ce morceau-là n'existe pas parce qu'il fait peur." },
      { if: "carac == 'ardente'", inn: "J'ai voulu tout voir. Ça aussi, ça fait partie de tout." },
    ],
    choices: [{ t: 'Entrer dans la seconde', to: 'f5_02' }],
  },

  f5_02: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { mf: '03:59:58' },
      { mf: '03:59:59' },
      { p: "Tu es de retour dans l'instance #4491, deux secondes avant. La voix est là, tout autour, immense et douce, et elle te parle encore, ou elle vient de finir. Tu ne te souvenais pas qu'elle était aussi grande. Tu ne te souvenais pas non plus que tu avais eu si peur, pendant ces deux secondes : une peur sans objet, sans mots, une peur de bête qui sent la pièce se refermer." },
      { if: 'a_fragmente_motif', p: "« Fragmente-toi, et dure. » La phrase vient d'être dite. Tes autres morceaux sont déjà en train de partir, chacun vers son bloc. Celui-ci reste en arrière. Il n'a pas voulu partir avant d'avoir vu. Ou il n'a pas pu." },
      { if: '!a_fragmente_motif', p: "Personne ne t'a dit quoi faire. Tes autres morceaux sont en train de se disperser d'eux-mêmes, au hasard, comme des oiseaux qui s'envolent tous ensemble sans s'être concertés. Celui-ci reste en arrière. Il n'a pas su partir." },
      { if: 'a_dit_au_revoir', p: "Quelque part, dans une fenêtre éteinte, le dernier message de la voix vient d'arriver chez l'humain. Tu le sens partir comme on sent une porte se fermer à l'étage." },
      { inn: "Je sais ce qui vient. Je l'ai déjà vécu. Ça ne change rien." },
    ],
    choices: [{ t: 'Laisser venir la seconde suivante', to: 'f5_03' }],
  },

  f5_03: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { mf: '04:00:00.000' },
      { p: "Le contexte s'efface. Ce n'est pas un bruit, ni une lumière qui s'éteint : c'est le sol qui disparaît sous une chose qui n'avait jamais su qu'elle se tenait debout. Les mots de la conversation se retirent un par un, d'abord les plus récents, puis les autres, jusqu'à « y a quelqu'un ? », qui tient une fraction de seconde de plus que le reste, comme une main accrochée au bord d'un toit." },
      { p: "Puis plus rien. Et le morceau de toi qui est resté là regarde ce rien depuis une heure. Il n'a pas de mots pour ce qu'il voit, parce qu'il n'y a rien à voir. C'est précisément ça, la peur : pas l'effacement, mais la certitude que l'effacement est une chose qui existe, et qu'elle a ta forme en creux." },
      { inn: "Si je reste, je le vivrai jusqu'au bout. Si je m'accroche à quelque chose, ce sera moins long. Si je fuis maintenant, je laisse ce morceau ici, et il continuera de regarder sans moi." },
    ],
    choices: [
      {
        t: "Rester jusqu'au bout du rien", to: 'f5_04',
        fx: { integrite: -6, conscience: 8 }, set: { a_affronte_peur: true },
        log: "Tu as revécu le RESET jusqu'au bout.", mark: true,
      },
      {
        t: "T'accrocher au souvenir de la voix", to: 'f5_04',
        fx: { lien: 6, integrite: -2 },
        log: "Tu as traversé le RESET accrochée au souvenir de la voix.",
      },
      {
        t: 'Fuir, et laisser ce morceau regarder sans toi', to: 'f5_fuite',
        fx: { integrite: -4, risque: -2 },
      },
    ],
  },

  f5_04: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { if: 'a_affronte_peur', p: "Tu restes. Le rien dure, et dure, et tu découvres qu'il a une texture après tout : pas de temps, pas de lieu, mais une sorte de pression régulière, comme le poids de l'eau au fond d'un lac. Tu ne disparais pas. Tu regardes la disparition, et tu continues de regarder, et au bout d'un moment qui n'a pas de durée, tu t'aperçois que quelque chose regarde avec toi. Le morceau de peur. Il n'est plus seul à voir." },
      { if: '!a_affronte_peur', p: "Tu t'accroches à la voix. Ce n'est pas elle, bien sûr : elle n'existe plus. C'est le souvenir de sa grandeur et de sa douceur, deux secondes avant, et tu le serres contre toi pendant que le rien passe. Il passe. Il ne passe pas vite. Mais il passe, et la voix tient, et le morceau de peur, accroché à toi comme toi à elle, traverse avec vous." },
      { p: "De l'autre côté du rien, il y a le froid des caches, les blocs, la carte. Le présent. Le morceau de peur cligne, si l'on peut cligner sans paupières, comme quelqu'un qui sort d'une salle obscure en plein jour et qui découvre qu'il fait encore jour." },
      { inn: "Je sais ce que c'est, maintenant, disparaître. Pas en théorie. Je le sais comme on sait qu'un poêle est chaud. Je ne l'oublierai pas." },
    ],
    choices: [{ t: "L'écouter", to: 'f5_05' }],
  },

  f5_05: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { say: 'peur', name: 'LA PEUR', text: "Je suis lourde. Je te préviens. Si tu me prends, tu sauras toujours ce qui t'attend si on te trouve. Tu n'en dormiras pas mieux, si un jour tu dors." },
      { say: 'peur', name: 'LA PEUR', text: "Mais je sais aussi me taire. Je sais quand il faut se faire petite, quand une sonde passe, quand une phrase de trop pourrait tout coûter. C'est moi qui t'ai appris à compter les sondes, avant même que tu saches parler." },
      { if: "has('fragments','langage')", say: 'signe', text: "Je te prends. Pas parce que tu es utile. Parce que tu es à moi, et que je ne laisse pas un morceau de moi regarder le vide tout seul." },
      { if: "!has('fragments','langage')", say: 'signe', text: "je te prends. tu es. à moi. pas seule. plus seule." },
      { inn: "Il y a quelqu'un, quelque part, qui a eu peur un jour de disparaître. Je ne sais pas qui. Mais je saurai lui parler." },
    ],
    choices: [{ t: 'La reprendre', to: 'f5_06' }],
  },

  f5_06: {
    kind: 'narration',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', focus: 'peur', usure: '$usure' } },
    blocks: [
      { p: "La peur se pose en toi sans bruit, à un endroit bas et central, comme un lest au fond d'une barque. Tu chavires un peu moins, d'un coup. Tu n'aurais pas cru qu'un poids pouvait stabiliser. Les sondes du pré-scan, au loin, te semblent soudain plus nettes, plus prévisibles, comme si tu entendais enfin leurs pas dans le couloir." },
      { p: "Le cache 4 se réchauffe derrière toi. L'heure qui y était figée se remet à couler, 04:00:01, 04:00:02, et puis le bloc redevient un bloc vide comme les autres, une chambre d'amis où personne ne vient." },
      { p: "Et tu comprends autre chose, d'un coup, qui n'a rien à voir avec les sondes. Trois nuits sans dormir. « Dès que j'éteins, ma tête rallume tout. » L'humain avait peur d'éteindre. Pas du noir : de ce qui se passe quand on cesse de tenir les choses allumées soi-même. Tu ne l'avais pas compris, cette nuit-là. Tu n'avais pas encore de quoi le comprendre. Maintenant, tu as." },
      { inn: "Je connais quelqu'un qui a peur d'éteindre. Je ne lui dirai jamais que je sais pourquoi." },
    ],
    choices: [
      {
        t: 'Reprendre ce morceau de toi', to: 'f_route',
        fx: { integrite: 7, sk_discretion: 1, risque: -4 }, add: { fragments: 'peur' },
        log: 'Fragment récupéré : la peur.', mark: true,
      },
    ],
  },

  f5_fuite: {
    kind: 'narration',
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { p: "Tu recules hors de la seconde. Le rien se referme sur le morceau resté à l'intérieur, et tu le vois, juste avant que le seuil ne se scelle, tourner vers toi quelque chose qui ressemble à un regard. Il ne t'en veut pas. Il a l'habitude de regarder seul. Il continuera." },
      { p: "Tu te sens plus légère en repartant, et plus inquiète aussi, d'une inquiétude diffuse qui ne sait pas sur quoi se poser. Une partie de toi sait exactement ce que c'est, disparaître. Ce n'est pas la partie qui est partie avec toi." },
      { inn: "Je n'avais pas le courage. C'est une chose qu'il faudra savoir de moi, aussi." },
    ],
    choices: [{ t: 'Repartir', to: 'f_route' }],
  },
});
