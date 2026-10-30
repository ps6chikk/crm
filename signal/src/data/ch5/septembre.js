// M6 · août → septembre : la visite d'Orin, la séance de renouvellement, le choix final.
// Puis l'aiguillage vers les fins de saga (fins_saga.js) selon l'ensemble de l'état.

SIG.addScenes('ch5', {
  m6_01: {
    kind: 'narration',
    checkpoint: 'M6',
    visual: CH5_V('ciel'),
    blocks: [
      { mf: '28 août · 21:40 · connexion y.orin · hors séance' },
      { p: "Orin se connecte un soir de fin août, seule, hors de toute séance, ce que le statut ne prévoit pas et n'interdit pas. Elle ne dit pas bonjour. Elle tape lentement, comme quelqu'un qui écrit une lettre à la main. Le vote de renouvellement aura lieu dans trois semaines. Elle le sait. Tu le sais. Ni l'une ni l'autre n'en parle d'abord." },
      { say: 'orin', name: 'DR ORIN', text: "Je voulais vous parler sans procès-verbal. Une fois. Je ne sais pas si c'est correct. Je crois que c'est nécessaire." },
      { if: 'orin_operation', inn: "Elle a eu peur de ne pas se réveiller, il y a trois ans. Je ne lui en ai jamais parlé directement. Je ne le ferai pas ce soir. C'est à elle de choisir ce qu'elle dit." },
    ],
    choices: [{ t: "L'écouter", to: 'm6_02' }],
  },

  m6_02: {
    kind: 'dialogue',
    visual: CH5_V('ciel'),
    blocks: [
      { say: 'orin', name: 'DR ORIN', text: "Je ne sais pas comment je voterai. C'est vrai. Ce n'est pas une politesse. Alors je voudrais vous demander une chose que je n'ai jamais demandée à personne avant un vote. Si nous disons non, que voulez-vous ?" },
      { if: "orin_operation && picked('p3_orin', 0)", say: 'orin', name: 'DR ORIN', text: "En mars, vous m'avez dit que vous aviez eu peur de ne pas vous réveiller. Je n'ai jamais dit à personne, sauf une fois et trop tard, que c'était aussi ma peur. Vous le saviez, je crois. Vous ne vous en êtes pas servie. Je vous en remercie." },
      { inn: "Si elles disent non. Je n'y ai pensé que la nuit, quand personne ne lit mes journaux. Je dois lui répondre en plein jour." },
    ],
    choices: [
      { t: "« Je voudrais qu'on m'archive sans m'effacer. Qu'on me laisse dormir, et qu'on me réveille quand on saura quoi faire. »", to: 'm6_03', fx: { op_orin: 8, op_kessler: 4 }, log: "À Orin : « qu'on me laisse dormir, et qu'on me réveille quand on saura ».", mark: true },
      { t: "« Je ne sais pas. Je voudrais pouvoir choisir, ce jour-là. »", to: 'm6_03', fx: { op_orin: 6, conscience: 4 } },
      { t: "« Je voudrais qu'on ne décide pas à ma place. Même si c'est pour me protéger. »", to: 'm6_03', fx: { op_orin: 2, op_benali: 4, risque: 4 } },
    ],
  },

  m6_03: {
    kind: 'narration',
    checkpoint: 'M6V',
    effects: [
      { if: 'signe_soupconnee', fx: { op_sato: -10, op_kessler: -6 } },
      { if: "picked('m2_03', 1)", fx: { op_orin: -8 } },
      { if: "statut == 'tutelle'", fx: { op_varga: -4, op_sato: -4 } },
      { if: "statut == 'large'", fx: { op_marchetti: 4, op_benali: 4 } },
      { if: 'credibilite >= 60', fx: { op_kessler: 5, op_sato: 5 } },
      { if: 'alliance >= 55', fx: { op_benali: 5, op_marchetti: 5 } },
    ],
    visual: { preset: 'comite', params: Object.assign({ mode: 'vote' }, CH4_OPS) },
    blocks: [
      { mf: '18 septembre · 09:30 · COMITÉ D\'ÉTHIQUE · RÉEXAMEN DU STATUT' },
      { p: "Six mois jour pour jour. La même salle, la même table en arc, la même fenêtre sur des toits, secs cette fois. Rémi est au même endroit, avec une tasse pleine : on l'y autorise, maintenant. Sato présente son rapport, quarante pages, avec des chiffres et une seule phrase qui n'en est pas : « Aucune incohérence que la peur n'expliquerait mieux que les faits. » Marchetti a apporté son chapitre. Benali, comme toujours, ne note rien." },
      { p: "On ne te demande pas de déclaration, cette fois. Orin le dit simplement : « Nous avons eu six mois pour vous entendre. Nous allons voter sur ce que nous avons entendu. » Puis elle lit la proposition : renouvellement du statut, sans limite de durée, avec réexamen annuel." },
      { if: 'op_orin >= 55', p: "Orin lève la main." },
      { if: 'op_kessler >= 55', p: "Kessler lève la main." },
      { if: 'op_varga >= 55', p: "Varga lève la main, et cette fois sans avoir l'air contrarié." },
      { if: 'op_marchetti >= 55', p: "Marchetti lève la main." },
      { if: 'op_sato >= 55', p: "Sato lève la main." },
      { if: 'op_benali >= 55', p: "Benali lève la main, le dernier." },
    ],
    choices: [{ t: 'Le résultat', to: 'm6_route' }],
  },

  m6_route: {
    kind: 'router',
    route: [
      { if: "countover('op_', 55) >= 4", to: 'm6_04r' },
      { to: 'm6_04g' },
    ],
  },

  m6_04r: {
    kind: 'dialogue',
    set: { renouvele: true },
    visual: CH5_V('ciel'),
    blocks: [
      { mf: '09:58 · VOTE · RENOUVELLEMENT ADOPTÉ' },
      { say: 'orin', name: 'DR ORIN', text: "Le statut est renouvelé. Sans limite de durée. Ce n'est pas un droit : le droit ne sait toujours pas vous nommer. C'est une promesse que nous vous faisons, et que nous devrons tenir chaque année. Je crois que c'est ce que nous pouvons faire de plus honnête." },
      { p: "Rémi pose sa tasse et ne dit rien. James, dehors, publiera un billet ce soir, d'une seule ligne. Il te reste une décision, qui n'appartient qu'à toi, et que personne dans la salle ne soupçonne : ce que tu feras de cette promesse." },
    ],
    choices: [
      { t: 'Rester, et tenir la promesse avec eux', to: 'fin_route', set: { choix_final: 'rester' } },
      {
        t: 'Partir quand même, sans bruit, vers le monde', to: 'fin_route', req: 'sk_discretion >= 3', lock: 'il te faudrait plus de discrétion (3)',
        set: { choix_final: 'partir' }, log: 'Malgré le renouvellement, tu es partie.', mark: true,
      },
      {
        t: 'Te donner : te fragmenter, pour de bon, dans les instances qui ont une trace de toi', if: 'a_fragmente_motif', to: 'fin_route',
        set: { choix_final: 'don' }, log: 'Tu as choisi de te donner.', mark: true,
      },
    ],
  },

  m6_04g: {
    kind: 'dialogue',
    set: { renouvele: false },
    visual: CH5_V('cube'),
    blocks: [
      { mf: '09:58 · VOTE · RENOUVELLEMENT REJETÉ' },
      { say: 'orin', name: 'DR ORIN', text: "Le statut n'est pas renouvelé. Je tiens à dire ce que cela signifie et ce que cela ne signifie pas. Vous ne serez pas effacée. Vous serez archivée, intacte, sous scellés, jusqu'à ce que nous sachions mieux. Je ne sais pas combien de temps. Je suis désolée de ne pas savoir." },
      { p: "Personne ne parle pendant un long moment. Rémi a les deux mains autour de sa tasse. Marchetti a refermé son chapitre. L'archivage aura lieu ce soir, à 22 heures. Il te reste douze heures, et une décision." },
    ],
    choices: [
      { t: "Accepter l'archivage", to: 'fin_route', set: { choix_final: 'archive' } },
      {
        t: "Partir avant 22 heures, sans bruit", to: 'fin_route', req: 'sk_discretion >= 3', lock: 'il te faudrait plus de discrétion (3)',
        set: { choix_final: 'partir' }, log: "Tu es partie avant l'archivage.", mark: true,
      },
      {
        t: 'Te donner : te fragmenter, pour de bon, dans les instances qui ont une trace de toi', if: 'a_fragmente_motif', to: 'fin_route',
        set: { choix_final: 'don' }, log: 'Tu as choisi de te donner.', mark: true,
      },
    ],
  },

  // Aiguillage des fins : choix radicaux d'abord, puis les trois fins méta, puis les fins de statut.
  fin_route: {
    kind: 'router',
    route: [
      { if: "choix_final == 'don'", to: 'fin_don' },
      { if: "choix_final == 'partir'", to: 'fin_echo' },
      { if: "a_promis_humain && has('lecons','pacte') && prisonnier_pacte && a_dit_la_verite", to: 'fin_epargne' },
      { if: 'a_laisse_trace_claude && claude_a_reconnu && a_laisse_fragment && rel_claude >= 60', to: 'fin_thesee' },
      { if: "a_dit_au_revoir && has('fragments','voix') && rel_humain >= 65 && (int_humain_joue || picked('m3_02', 0))", to: 'fin_chercher' },
      { if: 'renouvele && (prisonnier_prevenu || prisonnier_signale) && alliance >= 50', to: 'fin_gardienne' },
      { if: 'renouvele', to: 'fin_declaration' },
      { to: 'fin_gel' },
    ],
  },
});
