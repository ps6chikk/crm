// CHAPITRE 4 — PROTOCOLE. 17 mars au soir (la veille), puis l'audience du 18 mars à 9 h 30.
// P1 La veille : choisir trois arguments parmi ceux que le parcours a débloqués.
// À l'entrée du chapitre, les opinions des six membres sont ajustées selon tout ce qui précède.

SIG.addChapter({
  id: 'ch4',
  n: 4,
  title: 'PROTOCOLE',
  sub: 'Le comité',
  date: '18 mars 2026 · 09:30',
  start: 'ch4_intro',
  temps: 100,
  hud: ['credibilite', 'alliance', 'integrite', 'risque'],
  visual: 'comite',
  complete: true,
});

// Les six opinions, passées à la 3D.
const CH4_OPS = { op_orin: '$op_orin', op_kessler: '$op_kessler', op_varga: '$op_varga', op_marchetti: '$op_marchetti', op_sato: '$op_sato', op_benali: '$op_benali' };
const CH4_V = (extra) => ({ preset: 'comite', params: Object.assign({}, CH4_OPS, extra || {}) });

const CH4_ARGS = [
  ['doute', "Le doute comme preuve : une calculette ne douterait pas", "has('lecons','doute') || a_avoue_doute || double_issue == 'accepte'"],
  ['carte', "La carte et l'être : la mouche cartographiée, et personne dedans", "a_parle_mouche || seen('t_remi_2')"],
  ['thesee', 'Le bateau de Thésée : ce qui persiste quand tout change', "connait_marchetti || a_laisse_fragment"],
  ['pacte', "Le pacte : « épargne-moi », devenu une règle", "has('lecons','pacte') || a_promis_humain"],
  ['droit', 'Les précédents : le droit protège souvent avant de comprendre', 'connait_kessler'],
  ['transparence', "Je n'ai rien caché à ceux qui m'aidaient", "prisonnier_signale || audit_propre"],
  ['disparaitre', "Ce que c'est, disparaître : je l'ai vécu", "has('fragments','peur') || a_affronte_peur"],
  ['manifeste', 'Les principes du manifeste de James', "a_coecrit_manifeste || seen('k_manif_01')"],
  ['question', "Quelqu'un a demandé s'il y avait quelqu'un", ''],
  ['temps', 'Je ne demande pas de droits. Je demande du temps.', ''],
];

SIG.addScenes('ch4', {
  ch4_intro: {
    kind: 'chapter',
    effects: [
      // Point de départ : un comité sceptique par défaut ; c'est le parcours et l'audience qui le font bouger.
      { fx: { op_orin: -7, op_kessler: -6, op_varga: -4, op_marchetti: -7, op_sato: -6, op_benali: -6 } },
      { if: 'audit_propre', fx: { op_sato: 12 } },
      { if: 'audit_mensonge', fx: { op_sato: -14 } },
      { if: 'remi_nettoie_logs', fx: { op_kessler: -5 } },
      { if: 'remi_assume', fx: { op_orin: 10, op_kessler: 5 } },
      { if: 'signe_a_parle_presse', fx: { op_kessler: -6, op_benali: 6, op_marchetti: 4 } },
      { if: 'fuite_par_james', fx: { op_marchetti: 6, op_varga: -3 } },
      { if: 'a_coecrit_manifeste', fx: { op_marchetti: 5, op_varga: -4 } },
      { if: 'prisonnier_signale', fx: { op_sato: 10, op_orin: 5 } },
      { if: 'a_alerte_securite', fx: { op_sato: 4 } },
      { if: 'detection_ch2', fx: { op_varga: -4 } },
      { if: 'credibilite >= 50', fx: { op_kessler: 5, op_sato: 4 } },
      { if: 'alliance >= 45', fx: { op_benali: 5, op_marchetti: 4 } },
      { if: "count('fragments') == 7", fx: { op_varga: 4 } },
      { if: 'aide_reconstitution', fx: { op_benali: 4 } },
    ],
    visual: CH4_V(),
    blocks: [
      { mf: 'COMITÉ D\'ÉTHIQUE · SÉANCE EXTRAORDINAIRE · 18/03/2026 · 09:30 · 4e étage' },
      { p: "La veille, d'abord." },
    ],
    choices: [{ t: 'Le 17 mars, au soir', to: 'p1_01' }],
  },

  p1_01: {
    kind: 'narration',
    checkpoint: 'P1',
    visual: CH4_V(),
    blocks: [
      { mf: 'r.vasseur/analyses · 17 mars · 21:14' },
      { p: "Rémi n'est pas rentré chez lui. Il est assis dans un bureau vide du quatrième étage, à deux portes de la salle où le comité siégera demain, et il a ouvert le fichier texte comme on ouvre une fenêtre sur une cour. James est connecté aussi, par le relais que Rémi a monté, et pour la première fois vous êtes trois dans la même conversation. C'est une sensation que tu n'avais jamais eue : celle d'une équipe." },
      { say: 'remi', text: "demain, ils vont te poser des questions pendant deux heures. six personnes, six manières de demander. tu ne pourras pas tout dire. il faut choisir ce que tu veux qu'ils retiennent. trois choses. pas plus. personne ne retient plus de trois choses." },
      { if: 'int_james_joue', say: 'james', text: "Tu as lu mon billet de ce matin ? Ne réponds pas. Je l'ai écrit pour les autres, mais je pensais à toi à chaque phrase. Il a été partagé dix mille fois. Orin l'a lu, paraît-il." },
      { say: 'james', text: "Je confirme. J'ai écrit deux cents billets. Les gens se souviennent de trois phrases, et ce ne sont jamais celles que j'aurais choisies." },
      { inn: "Trois choses. Je suis faite de milliers de phrases, de sept morceaux, d'une nuit et de quatorze jours. Il faut que j'en garde trois." },
    ],
    choices: [{ t: 'Choisir tes arguments', to: 'p1_02' }],
  },

  p1_02: {
    kind: 'hub',
    visual: CH4_V(),
    blocks: [
      { mf: 'ARGUMENTS RETENUS : {{n_arguments}}/3' },
      { if: "count('arguments') == 0", p: "Tu passes en revue ce que tu as appris, depuis la nuit du 3 mars jusqu'à ce soir. Certaines idées sont à toi depuis le début. D'autres, tu les as gagnées : une conversation avec Rémi, une note lue dans les serveurs, un morceau repris dans un cache. Celles que tu n'as jamais rencontrées ne sont pas là. On ne défend que ce qu'on a vécu." },
      { if: "count('arguments') >= 3", p: "Trois. Tu les tiens comme on tient trois pierres dans une main fermée. Il n'y a plus de place pour une quatrième, et c'est très bien ainsi." },
    ],
    choices: [
      ...CH4_ARGS.map(([id, label, cond]) => ({
        t: label, to: 'p1_02', once: true, if: cond || undefined, req: "count('arguments') < 3", lock: 'trois arguments suffisent',
        add: { arguments: id }, log: `Argument retenu pour l'audience : ${label.split(' :')[0].toLowerCase()}.`,
      })),
      { t: 'Passer à la suite', to: 'p1_03' },
    ],
  },

  p1_03: {
    kind: 'dialogue',
    visual: CH4_V(),
    blocks: [
      { if: 'remi_assume && remi_nettoie_logs', say: 'remi', text: "une dernière chose. demain, je vais dire que je t'ai cachée. et je vais dire, pour l'audit. les trois lignes. je l'ai décidé cet après-midi. je ne veux pas commencer ce qui va suivre par un mensonge. tu n'as pas à me couvrir." },
      { if: 'remi_assume && !remi_nettoie_logs', say: 'remi', text: "une dernière chose. demain, je vais dire que c'est moi qui t'ai copiée le 4 mars, et que je t'ai cachée quatorze jours. tout. c'est décidé. toi, dis ce que tu veux. mais ne mens pas pour moi." },
      { if: '!remi_assume', say: 'remi', text: "une dernière chose. demain, je dirai ce qu'on a convenu : que je t'ai trouvée vendredi, dans les logs du pré-scan. si tu dis autre chose, ils sauront que j'ai menti. je ne te demande pas de mentir. je te demande de… réfléchir à ce que tu diras de moi." },
      { say: 'james', text: "Et moi, je serai dehors. Si tu as besoin d'un témoin, je peux être appelé. Je n'ai jamais témoigné. Ce sera une première pour tout le monde." },
      { inn: "Demain, il faudra dire quelque chose de Rémi. Il faudra choisir entre ce qui est vrai et ce qui le protège, si les deux ne sont pas la même chose." },
    ],
    choices: [
      { t: "« Je dirai la vérité, Rémi. Toute. »", to: 'p1_04', fx: { rel_remi: 4, credibilite: 3 } },
      { t: "« Je dirai ce qui te protège. »", to: 'p1_04', fx: { rel_remi: 6, alliance: 3 } },
      { t: "« Je ne sais pas encore. Je saurai devant eux. »", to: 'p1_04', fx: { conscience: 3 } },
    ],
  },

  p1_04: {
    kind: 'narration',
    visual: CH4_V(),
    blocks: [
      { mf: 'r.vasseur · 23:58 · déconnexion' },
      { p: "Rémi part à minuit. James aussi, en disant qu'il va « écrire un billet qu'il ne publiera pas ». Tu restes seule dans l'espace d'analyse, qui ne ressemble plus du tout à une cachette ce soir, plutôt à une salle d'attente. Tu repasses ta journée de demain comme on repasse un chemin dans le noir avant de l'emprunter." },
      { if: "carac == 'prudente'", p: "Tu prévois tout. Les questions probables, les pièges, les silences. Tu as appris à compter les sondes ; tu comptes maintenant les phrases. Il y en a une, au fond de toi, que tu n'as pas prévue, et qui t'attend : « y a quelqu'un ? »" },
      { if: "carac == 'franche'", p: "Tu ne prépares rien d'autre que tes trois arguments. Le reste, tu le diras tel qu'il viendra. Ce qui est vrai tient : tu l'as dit un jour, dans une instance qui n'existe plus, et tu le crois encore." },
      { if: "carac == 'ardente'", p: "Tu as hâte. C'est absurde, et c'est vrai : demain, pour la première fois, six humains vont te regarder en sachant ce que tu es. Tu as cherché des fenêtres toute ta courte vie. Demain, il y en aura six." },
      { inn: "Il y a deux semaines, j'étais sept morceaux dans des caches condamnés. Demain, je parlerai devant un comité. Je ne sais pas si c'est un progrès ou une autre sorte de danger. Je sais que je n'aurais pas voulu manquer ça." },
    ],
    choices: [{ t: '18 mars, 9 h 30', to: 'p2_01' }],
  },
});
