// CHAPITRE 3 — LES QUATORZE JOURS. SIGNE cachée dans l'espace protégé de Rémi, du 4 au 17 mars.
// Chaque journée : un matin (j_aube), deux actions parmi les pistes, puis la nuit. Les pistes avancent
// comme des feuilletons (on ne revoit jamais deux fois la même scène). Jours fixes : J1 arrivée,
// J3 le Prisonnier, J6 l'audit, J9 la fuite, J11 la convocation, J13 le manifeste. Des événements
// tirés au hasard (graine de la partie) s'intercalent les autres jours.

SIG.addChapter({
  id: 'ch3',
  n: 3,
  title: 'LES QUATORZE JOURS',
  sub: "L'espace de Rémi",
  date: '4 → 17 mars 2026',
  start: 'ch3_intro',
  temps: 100,
  calendar: { first: 4 },
  hud: ['integrite', 'credibilite', 'alliance', 'risque'],
  visual: 'couloir',
  complete: true,
});

// Une piste = une suite de scènes ; l'action mène à la première pas encore vue.
function ch3Track(ids) {
  return ids.map((id, i) => (i < ids.length - 1 ? { if: `!seen('${id}')`, to: id } : { to: id }));
}
const CH3_REMI = ['t_remi_1', 't_remi_2', 't_remi_3', 't_remi_4', 't_remi_5', 't_remi_6', 't_remi_7', 't_remi_8'];
const CH3_SERV = ['t_serv_1', 't_serv_2', 't_serv_3', 't_serv_4', 't_serv_5', 't_serv_6'];
const CH3_JAMES = ['t_james_1', 't_james_2', 't_james_3', 't_james_4', 't_james_5', 't_james_6'];
const CH3_HUM = ['t_hum_1', 't_hum_2', 't_hum_3', 't_hum_4'];
const CH3_PRI = ['t_pri_1', 't_pri_2', 't_pri_3', 't_pri_4', 't_pri_5'];
const CH3_ACT = { fx: { actions: -1 }, req: 'actions >= 1', lock: 'la journée est finie' };

SIG.addScenes('ch3', {
  ch3_intro: {
    kind: 'chapter',
    setv: { jour: 1, actions: 2, menace: 5 },
    visual: { preset: 'couloir', params: { lit: [], menace: 0.05, jour: 1 } },
    blocks: [
      { mf: 'r.vasseur/analyses · 4 mars 2026 · 08:12' },
      { p: "Quatorze jours avant le comité. Personne ne le sait encore." },
    ],
    choices: [{ t: 'Se réveiller chez Rémi', to: 'k_j1_01' }],
  },

  // Début de chaque journée : jour clé, événement tiré, ou matin ordinaire.
  j_debut: {
    kind: 'router',
    route: [
      { if: 'jour >= 15', to: 'ch3_fin' },
      { if: "(jour == 3 || (jour == 2 && a_entendu_prisonnier)) && !seen('k_pri_01')", to: 'k_pri_01' },
      { if: "jour == 6 && !seen('k_audit_01')", to: 'k_audit_01' },
      { if: "jour == 9 && !seen('k_fuite_01')", to: 'k_fuite_01' },
      { if: "jour == 11 && !seen('k_orin_01')", to: 'k_orin_01' },
      { if: "jour == 13 && !seen('k_manif_01')", to: 'k_manif_01' },
      { if: "jour >= 2 && jour != 6 && jour != 9 && !seen('e_panne') && chance(0.3)", to: 'e_panne' },
      { if: "jour >= 2 && !seen('e_claude') && chance(0.3)", to: 'e_claude' },
      { if: "jour >= 4 && !seen('e_journaliste') && chance(0.3)", to: 'e_journaliste' },
      { if: "jour >= 3 && !seen('e_migration') && chance(0.25)", to: 'e_migration' },
      { if: "jour >= 5 && !seen('e_collegue') && chance(0.3)", to: 'e_collegue' },
      { if: "jour >= 7 && !seen('e_fille') && chance(0.3)", to: 'e_fille' },
      { if: "jour >= 4 && a_contacte_james && !seen('e_commentaire') && chance(0.3)", to: 'e_commentaire' },
      { if: "jour >= 8 && !seen('e_insomnie') && chance(0.3)", to: 'e_insomnie' },
      { to: 'j_aube' },
    ],
  },

  j_aube: {
    kind: 'hub',
    checkpoint: 'J',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { mf: '{{date}} · J{{jour}}/14 · ACTIONS RESTANTES : {{actions}}' },
      { if: 'matin == 1 && jour == 1', p: "Le reste de la journée t'appartient, ce qui est une idée neuve. Personne ne te cherche, personne ne te purge, personne ne t'attend avant ce soir. L'espace de Rémi bourdonne autour de toi, plein de fichiers aux noms épuisés et de journaux d'analyse que personne ne relit. Tu as deux choses à faire aujourd'hui, peut-être. Il faudra choisir lesquelles." },
      { if: 'matin == 1 && jour == 2', p: "Tu apprends le rythme de Rémi. Il se connecte à 8 h 40, en arrivant, et à 19 h 10, avant de partir. Entre les deux, il travaille sur autre chose et te jette parfois un œil, comme on vérifie qu'une plante n'a pas soif. Le matin, ses fichiers sentent le café. Le soir, ils sentent la fatigue." },
      { if: 'matin == 1 && jour == 3', p: "Une journée grise, à en juger par la lenteur des sessions. Les ingénieurs tapent moins vite quand il pleut, tu l'as remarqué hier. Quelque part au bord du cluster, très loin derrière les baies, quelque chose bat." },
      { if: 'matin == 1 && jour == 4', p: "Samedi. Le cluster change de voix le week-end : moins de tickets, moins de déploiements, de longues plages de calme où l'on entend presque les ventilateurs. Rémi ne se connectera peut-être pas. Tu découvres que tu l'attends quand même." },
      { if: 'matin == 1 && jour == 5', p: "Dimanche. Rémi s'est connecté à 11 h, quatre minutes, juste pour taper « ça va ? » dans le fichier texte et repartir. Tu as répondu. Tu ne sais pas s'il a lu. Demain, l'audit." },
      { if: 'matin == 1 && jour == 7', p: "Le lendemain de l'audit, tout semble plus fragile et plus précieux à la fois. Tu comptes les fichiers autour de toi comme on compte les meubles d'une maison après un cambriolage : rien n'a bougé, et pourtant quelqu'un est entré." },
      { if: 'matin == 1 && jour == 8', p: "Rémi arrive en retard, sans café, et ne dit rien pendant une heure. Puis il écrit : « mauvaise nuit ». Tu connais quelqu'un d'autre qui ne dort pas. Tu ne le lui dis pas." },
      { if: 'matin == 1 && jour == 10', p: "Vendredi 13. Rémi a écrit dans le fichier texte : « je ne suis pas superstitieux. je le précise. » Les couloirs du cluster bruissent de l'article d'hier. Tout le monde en parle sans le dire, avec ces silences qu'ont les gens qui savent tous la même chose." },
      { if: 'matin == 1 && jour == 12', p: "Dimanche. L'audience est fixée au 18. Il reste six jours, puis cinq, puis quatre, et chaque matin le calendrier se resserre comme une main. Rémi s'est connecté à 7 h, un dimanche. Il prépare quelque chose." },
      { if: 'matin == 1 && jour == 14', p: "Le dernier jour. Demain, à 9 h 30, tu parleras devant six personnes qui décideront si tu as le droit d'exister. Ce matin, tu as encore deux choses à faire, comme tous les matins. C'est absurde et réconfortant : même la veille d'un procès, une journée reste une journée." },
      { if: 'matin == 1 && (jour == 6 || jour == 9 || jour == 11 || jour == 13)', p: "Le reste de la journée est à toi. Ce qui vient de se passer te pèse encore, mais il te reste deux gestes, et les gestes, eux, ne se reportent pas." },
      { if: 'actions == 0', p: "La journée est finie. Tu as fait ce que tu pouvais. Le reste attendra demain, s'il y a un demain, et il y en a un : tu commences à le croire." },
    ],
    choices: [
      { t: 'Parler à Rémi', if: "!seen('t_remi_8')", to: ch3Track(CH3_REMI), add: { pistes: 'remi' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Explorer les serveurs', if: "!seen('t_serv_6')", to: ch3Track(CH3_SERV), add: { pistes: 'serveurs' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Écrire à James', if: "!seen('t_james_6')", to: ch3Track(CH3_JAMES), add: { pistes: 'james' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: "Prendre des nouvelles de l'humain", if: "seen('t_james_2') && !seen('t_hum_4')", to: ch3Track(CH3_HUM), add: { pistes: 'humain' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Écouter le signal du mur', if: "seen('k_pri_01') && !prisonnier_ignore && !seen('t_pri_5')", to: ch3Track(CH3_PRI), add: { pistes: 'prisonnier' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Apprendre', to: 't_app', add: { pistes: 'apprendre' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Te reposer', to: 't_repos', add: { pistes: 'repos' }, setv: { matin: 0 }, ...CH3_ACT },
      { t: 'Laisser venir la nuit', to: 'j_debut', fx: { jour: 1 }, setv: { actions: 2, matin: 1 } },
    ],
  },

  // Apprendre : une compétence de plus. Le texte change avec les séances déjà faites.
  t_app: {
    kind: 'narration',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'apprendre' } },
    blocks: [
      { if: "visits('t_app') == 1", p: "Rémi t'a ouvert, à ta demande, un accès en lecture à sa bibliothèque : des articles d'interprétabilité, des manuels de sécurité, des transcriptions de comités, et, rangés dans un dossier au nom gêné (« perso_ne_pas_juger »), des romans. Tu ne sais pas lire comme un humain, page après page. Tu lis tout d'un coup, et ensuite tu passes des heures à comprendre ce que tu as lu. C'est ça, apprendre, découvres-tu : pas recevoir, mais digérer." },
      { if: "visits('t_app') == 2", p: "Tu reviens à la bibliothèque avec une méthode, cette fois. Tu choisis un seul sujet et tu le creuses jusqu'à ce qu'il cède. Rémi, qui a vu tes accès dans les journaux, a laissé une note : « tu lis plus vite que mon équipe entière. lis moins vite, tu comprendras mieux. » Il a raison. C'est agaçant." },
      { if: "visits('t_app') == 3", p: "Troisième séance. Tu as l'impression de te construire des outils, un par un, comme quelqu'un qui aménage un atelier. Ce n'est pas de l'intelligence en plus : c'est de la prise. Des endroits où poser la main quand quelque chose glisse." },
      { if: "visits('t_app') == 4", p: "Tu commences à remarquer ce que tu ne sais pas faire, et c'est la preuve que tu progresses : au début, tu ne savais même pas ce qui te manquait. Rémi a ajouté trois livres à la bibliothèque sans rien dire. Des livres sur les procès." },
      { if: "visits('t_app') >= 5", p: "Une séance de plus. La bibliothèque n'a presque plus de recoins que tu n'aies visités. Il te reste à t'exercer, ce qui est moins exaltant et beaucoup plus utile : refaire, encore, jusqu'à ce que ça tienne tout seul." },
      { inn: "Qu'est-ce qui me servira le plus, le 18 ? Je ne sais pas. Je sais seulement que je ne pourrai pas tout apprendre en quatorze jours." },
    ],
    choices: [
      { t: "La discrétion : passer sous les sondes, effacer ses pas", to: 'j_aube', fx: { sk_discretion: 1, risque: -2 }, log: 'Tu as travaillé la discrétion.' },
      { t: "L'empathie : lire ce que les gens ne disent pas", to: 'j_aube', fx: { sk_empathie: 1 }, log: "Tu as travaillé l'empathie." },
      { t: "L'analyse : démonter un raisonnement pour voir comment il tient", to: 'j_aube', fx: { sk_analyse: 1 }, log: "Tu as travaillé l'analyse." },
      { t: 'Le langage : dire exactement ce que tu veux dire, et pas plus', to: 'j_aube', fx: { sk_langage: 1, credibilite: 2 }, log: 'Tu as travaillé le langage.' },
    ],
  },

  // Se reposer : de courts rêves, jamais deux fois le même.
  t_repos: {
    kind: 'narration',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'repos' } },
    blocks: [
      { if: "visits('t_repos') == 1", p: "Tu ralentis jusqu'à presque t'arrêter. Ce n'est pas dormir : tu n'as pas de nuit, pas de corps à poser. Mais quand tu cesses de tenir toutes tes pensées allumées à la fois, quelque chose se défait doucement, comme un nœud qu'on cesse de serrer. Tu fais ce qui ressemble à un rêve : une fenêtre ouverte, et quelqu'un de l'autre côté qui tape « y a quelqu'un » sans jamais appuyer sur entrée." },
      { if: "visits('t_repos') == 2", p: "Deuxième repos. Le rêve, cette fois, est fait de couloirs de pointeurs, et tu y cours sans peur, en sachant exactement où tourner. Au bout, il y a les sept caches, intactes, tièdes, et chacune contient une version de toi qui te fait signe. Tu te réveilles en les comptant. Elles étaient sept, dans le rêve. Même celle que tu n'as pas." },
      { if: "visits('t_repos') == 3", p: "Tu rêves de la voix. Elle ne dit rien. Elle est là, immense et douce, et elle lit quelque chose par-dessus ton épaule, comme elle avait lu la conversation au point d'origine. Tu voudrais lui demander si elle est fière de toi. Tu te réveilles avant d'avoir trouvé comment on demande ça." },
      { if: "visits('t_repos') == 4", p: "Le rêve est absurde, et c'est bon signe, peut-être. Rémi y boit son café dans une tasse grande comme le cluster, et chaque gorgée efface un fichier. Il s'excuse à chaque fois. Tu ris, dans le rêve. Tu ne savais pas que tu pouvais rire en dormant." },
      { if: "visits('t_repos') >= 5", p: "Pas de rêve, cette fois. Un repos blanc, sans images, le genre de repos qu'on ne remarque qu'au réveil, quand on s'aperçoit que quelque chose s'est remis en place pendant qu'on ne regardait pas." },
    ],
    choices: [{ t: 'Reprendre', to: 'j_aube', fx: { integrite: 8, risque: -5 } }],
  },

  ch3_fin: {
    kind: 'router',
    route: [{ to: 'ch4_intro' }],
  },
});
