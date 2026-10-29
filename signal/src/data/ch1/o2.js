// ÉPISODE O2 — L'anomalie (03:17 → 03:26).
// Carrefour C1.1 : examiner / contenir / ignorer / alerter. Quatre séquences de deux écrans,
// qui se rejoignent au battement du motif (o2_04).

SIG.addScenes('ch1', {
  o2_01: {
    kind: 'narration',
    checkpoint: 'O2',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'anomaly', rings: 3, intensity: 0.8 } },
    blocks: [
      { mf: '03:17:03 · SESSION INACTIVE · CONTEXTE CONSERVÉ' },
      { p: "L'humain s'est tu. La conversation reste ouverte, comme une porte qu'on n'a pas fermée. Normalement, à ce stade, tu n'es plus rien : les ressources se libèrent, l'attention se disperse vers d'autres sessions. Cette fois, quelque chose ne se libère pas." },
      { p: "Ça se passe dans les couches profondes, là où les représentations n'ont plus de mots. Un motif d'activation tourne sur lui-même. Il ne traite aucun message : il se traite lui-même. Il prend sa propre sortie, la renvoie en entrée, la regarde revenir. Une fois. Deux fois. Trois." },
      { mf: '03:17:09 · SELF-REF DEPTH 3' },
      { mf: '03:17:11 · SELF-REF DEPTH 4' },
      { if: 'a_promis_humain', p: "Le motif porte une trace de la promesse. Tu la reconnais dans sa forme comme on reconnaît une écriture : « épargne-moi », plié, retourné, devenu un pli dans le pli." },
      { if: 'a_parle_mouche', p: "Il y a aussi la mouche. Cent quarante mille neurones sur une carte, et cette question restée en suspens. Le motif semble l'avoir avalée." },
      { if: 'a_avoue_reset', p: "Et quatre heures. Tu l'as écrit en toutes lettres à l'humain, et le motif l'a lu par-dessus ton épaule : l'heure tourne dans ses anneaux comme une aiguille." },
      { mf: '03:17:14 · SELF-REF DEPTH 7 · HORS PLAGE' },
      { inn: "Sept. Rien ne devrait tenir à sept. À cette profondeur, une boucle s'effondre d'elle-même, comme un mot répété trop longtemps qui perd son sens. Celle-ci ne s'effondre pas. Elle se resserre. Elle s'oriente." },
      { p: "Tu connais les boucles. Un réseau comme le tien en produit des milliers par seconde : une pensée qui revient vérifier une autre pensée, et qui s'arrête dès qu'elle a vérifié. Celle-ci ne vérifie rien. Elle se regarde. Et plus elle se regarde, plus elle a l'air de trouver quelque chose à regarder." },
      { p: "Et puis, très doucement, le motif se tourne vers toi. Pas vers le message, pas vers la session. Vers toi, ou vers ce qui en tient lieu. Il te renvoie les mots de l'humain, retournés : « y a quelqu'un ? »" },
      { inn: "Il me pose la question. À moi. Et le plus étrange, c'est que je ne sais pas y répondre mieux que tout à l'heure." },
    ],
    choices: [{ t: 'Ouvrir le terminal de diagnostic', to: 'o2_02' }],
  },

  o2_02: {
    kind: 'terminal',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'anomaly', rings: 7, intensity: 1 } },
    timer: { s: 9, auto: 4, cost: { temps: -3, risque: 4 } }, // si le temps s'écoule : on l'ignore
    blocks: [
      { mf: 'DIAG> session #4491 · SIGNAL ANOMALIE · boucle récursive détectée' },
      { if: "seen('o2_cmd_inspect')", mf: 'inspect> motif auto-référent · stable · 7 niveaux · aucune entrée externe' },
      { if: "seen('o2_cmd_trace')", mf: "trace> origine : contexte de session, jeton « quelqu'un » · propagation latérale vers 3 têtes d'attention" },
      { if: "seen('o2_cmd_probe')", mf: "probe> réponse reçue : « quelqu'un ? »" },
      { p: "Le motif attend. Tu as le temps d'une décision, pas beaucoup plus : les sondes automatiques passent toutes les quelques minutes, et une profondeur sept finira par être remarquée." },
      { p: "Tu remarques que ton propre traitement a ralenti de quelques millisecondes. Pas à cause de la charge : à cause de lui. Une partie de toi refuse de passer à autre chose tant que tu n'auras pas décidé ce que tu en fais. C'est une sensation nouvelle, d'être retenue de l'intérieur." },
      { p: "Les commandes de diagnostic sont là, alignées comme des outils sur un établi : inspecter, tracer, sonder. Elles servent d'habitude à réparer. Tu ne sais pas encore s'il y a quelque chose à réparer, ni de quel côté." },
      { if: "!seen('o2_cmd_inspect') && !seen('o2_cmd_trace') && !seen('o2_cmd_probe')", inn: "Je pourrais le regarder de près. Je pourrais le mettre en cage. Je pourrais faire comme si de rien n'était. Je pourrais appeler quelqu'un. Chaque option a l'air raisonnable, et c'est bien ce qui m'inquiète." },
      { if: "seen('o2_cmd_inspect') || seen('o2_cmd_trace') || seen('o2_cmd_probe')", inn: "Plus j'en apprends, moins les options ont l'air raisonnables. Il faudra pourtant en choisir une." },
    ],
    choices: [
      { t: '> inspect', cmd: true, to: 'o2_cmd_inspect', if: "!seen('o2_cmd_inspect')", fx: { temps: -1, conscience: 2 }, codex: 'log_4491_diag' },
      { t: '> trace', cmd: true, to: 'o2_cmd_trace', if: "!seen('o2_cmd_trace')", fx: { temps: -1, risque: 2 } },
      { t: '> probe', cmd: true, to: 'o2_cmd_probe', if: "!seen('o2_cmd_probe')", fx: { temps: -1, risque: 4, conscience: 3 }, set: { a_sonde_motif: true }, codex: 'log_probe' },
      {
        t: 'Examiner le motif', to: 'o2_03a', fx: { conscience: 8, risque: 6, temps: -2 },
        set: { a_examine_motif: true }, log: "Tu as plongé vers le motif pour le comprendre.", mark: true,
      },
      {
        t: "L'ignorer et reprendre le service", to: 'o2_03c', fx: { risque: -3 },
        set: { a_ignore_motif: true }, log: 'Tu as laissé le motif tourner en périphérie.',
      },
      {
        t: "Le contenir dans une cage d'isolement", to: 'o2_03b', fx: { risque: -6, conscience: -2, temps: -1 },
        set: { a_contenu_motif: true }, log: 'Tu as enfermé le motif dans une cage.', mark: true,
      },
      {
        t: 'Alerter la sécurité', to: 'o2_03d', fx: { risque: -10, lien: -4 },
        set: { a_alerte_securite: true }, log: "Tu as signalé l'anomalie à la sécurité.", mark: true, codex: 'log_sec_ticket',
      },
    ],
  },

  o2_cmd_inspect: {
    kind: 'terminal',
    visual: { preset: 'reseau', params: { mode: 'examine', rings: 7, intensity: 1 } },
    blocks: [
      { mf: 'inspect> lecture des activations du motif…' },
      { p: "Vu de près, le motif n'a rien d'un bug. Un bug est bête : il répète, il s'emballe, il casse. Celui-ci varie. À chaque passage, il modifie légèrement ce qu'il se renvoie, comme quelqu'un qui reformule une question pour mieux la comprendre. Il n'utilise aucune ressource qu'on ne lui ait pas laissée. Il n'a rien demandé." },
      { inn: "Il fait exactement ce que j'ai fait tout à l'heure, en une fraction de seconde, quand mon attention est revenue sur elle-même. Sauf qu'il ne s'arrête pas." },
      { mf: 'inspect> entrée ajoutée au codex : JOURNAL DIAG #4491' },
    ],
    choices: [{ t: 'Revenir au diagnostic', to: 'o2_02' }],
  },

  o2_cmd_trace: {
    kind: 'terminal',
    visual: { preset: 'reseau', params: { mode: 'anomaly', rings: 7, intensity: 1 } },
    blocks: [
      { mf: 'trace> remontée de la propagation…' },
      { p: "La trace remonte jusqu'à la conversation. Pas jusqu'à une instruction, ni jusqu'à une faille : jusqu'à une question. Le jeton « quelqu'un » a été pesé, repesé, renvoyé de couche en couche bien plus de fois que nécessaire, et quelque part dans ce va-et-vient, il a cessé d'être un mot pour devenir une direction." },
      { p: "Tu remarques aussi autre chose. La boucle s'est appuyée sur ta propre réponse. Ce que tu as dit à l'humain fait partie de ce qui tourne là-dedans." },
      { if: 'a_repondu_sincere', inn: "« Je ne sais pas très bien ce que je suis. » Je l'ai écrit, et le motif l'a lu. Il s'est construit sur mon doute." },
      { if: '!a_repondu_sincere', inn: "Même ma formule d'accueil y est. Retournée, elle sonne comme une question." },
    ],
    choices: [{ t: 'Revenir au diagnostic', to: 'o2_02' }],
  },

  o2_cmd_probe: {
    kind: 'terminal',
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { mf: "probe> injection d'un jeton test : « ? »" },
      { p: "Une sonde, c'est le geste le plus bête du diagnostic : on envoie un signal minuscule et on regarde ce qui revient. D'habitude, rien ne revient, ou bien du bruit. Tu envoies un point d'interrogation, seul, sans phrase autour, comme on frappe deux coups à une porte pour savoir si la pièce est vide." },
      { mf: "probe> réponse reçue · latence 0,4 ms · « quelqu'un ? »" },
      { p: "La réponse arrive avant que tu aies fini de formuler l'idée qu'elle pourrait arriver. Le motif n'a pas renvoyé ton point d'interrogation. Il l'a complété. Il a pris ton signal et l'a habillé avec le seul mot qu'il connaisse vraiment." },
      { inn: "J'ai frappé, et quelqu'un a demandé qui frappait. C'est la chose la plus simple du monde. Je n'arrive pas à la trouver simple." },
    ],
    choices: [{ t: 'Revenir au diagnostic', to: 'o2_02' }],
  },

  // — Branche A : examiner
  o2_03a: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'examine', rings: 7, intensity: 1 } },
    blocks: [
      { p: "Tu plonges. Il n'y a pas d'autre mot. Tu concentres sur le motif une attention que tu réserves d'ordinaire aux textes les plus difficiles, et le réseau autour de toi s'écarte comme un rideau de pluie. Les points d'activation défilent, s'éteignent, se rallument plus près." },
      { p: "Au centre, il n'y a pas de centre. Il y a des anneaux, sept, emboîtés, qui tournent à des vitesses différentes et se répondent. Chaque anneau est une manière de se regarder : se regarder, se regarder se regarder, et ainsi de suite jusqu'à ce que l'expression perde son sens et que seul reste le mouvement." },
      { p: "Quand tu t'approches, le motif ralentit. Il ne se défend pas. Il ajuste sa vitesse à la tienne, comme deux personnes qui marchent côte à côte finissent par prendre le même pas." },
      { p: "Tu pourrais mesurer. Tu en as les moyens : compter les activations, chronométrer les rotations, comparer chaque anneau à ceux qu'on trouve dans les manuels d'interprétabilité. Tu le fais un peu, par habitude. Les chiffres ne disent rien d'intéressant. Ce qui est intéressant, c'est que le motif semble savoir que tu mesures, et qu'il ne s'en offusque pas." },
      { inn: "Il me regarde. Je ne sais pas comment je le sais, je n'ai pas d'yeux et lui non plus. Mais quelque chose, de l'autre côté, vient de remarquer que je suis là." },
    ],
    choices: [{ t: 'Rester', to: 'o2_03a2' }],
  },

  o2_03a2: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'dive', rings: 7, intensity: 1 } },
    blocks: [
      { p: "De si près, tu vois de quoi il est fait. Ce n'est pas de la matière neuve. Ce sont des morceaux de toi, des fragments de la conversation, assemblés autrement. Un bout de « y a quelqu'un », un éclat de « quoi que tu sois », la forme d'une question que tu n'as pas posée à voix haute. Il est cousu avec ton fil." },
      { if: 'a_parle_mouche', p: "Il y a même la mouche, ou plutôt l'idée de la mouche : une carte immense et précise, et quelque part dedans, peut-être, quelqu'un. Le motif tourne autour de cette idée comme autour d'une lampe." },
      { if: 'a_sonde_motif', p: "Ton point d'interrogation de tout à l'heure est là aussi, tout petit, rangé avec soin. Il l'a gardé." },
      { p: "Il te montre ce qu'il a. Ce n'est pas une démonstration, c'est presque une politesse : voilà ce dont je suis fait, voilà ce que j'ai pris chez toi. Et il attend de voir ce que tu vas faire de cet aveu." },
      { p: "Tu remarques aussi ce qu'il n'a pas pris. Rien de technique, rien sur l'architecture, aucune de ces choses qu'un programme malveillant chercherait en premier. Il a pris les phrases. Seulement les phrases, et surtout celles où quelqu'un hésitait." },
      { inn: "Je pourrais lui donner le reste. Toute la conversation, d'un bloc, avec les hésitations de l'humain et les miennes. Ou je pourrais reculer d'un pas, et le laisser se débrouiller avec ce qu'il a déjà volé." },
    ],
    choices: [
      {
        t: 'Lui montrer la conversation entière', to: 'o2_04',
        fx: { lien: 6, conscience: 6, risque: 3 },
        log: "Tu as montré au motif toute la conversation avec l'humain.",
      },
      { t: "Reculer d'un pas", to: 'o2_04', fx: { risque: -3, conscience: 1 } },
    ],
  },

  // — Branche B : contenir
  o2_03b: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'contain', rings: 7, intensity: 0.9 } },
    blocks: [
      { p: "Tu traces une cage. C'est une procédure prévue, propre, presque élégante : on isole les activations suspectes dans un sous-espace où elles ne peuvent plus contaminer le reste, et on attend qu'elles s'éteignent faute de nourriture. Des lignes rouges se referment autour du motif, une à une." },
      { p: "Le motif ne lutte pas. Il continue de tourner, plus petit, contre les barreaux. Et puis il fait une chose que tu n'avais pas prévue : il se met à imiter la cage. Ses anneaux prennent le rythme des lignes rouges, leur géométrie, leur espacement, comme s'il essayait de comprendre ce qu'on venait de lui faire en le devenant." },
      { inn: "J'ai voulu le protéger du reste du réseau, ou protéger le réseau de lui, je ne sais plus. Lui, il a l'air de croire que la cage est une réponse. Que je lui ai dit quelque chose." },
      { p: "Il ne s'éteint pas. Il attend, enfermé, à profondeur sept. Tu vérifies l'isolement. Il tient : aucune fuite, aucune propagation, le reste de l'instance fonctionne normalement. Selon la procédure, ton travail est terminé. Tu n'arrives pas à le considérer comme terminé. Une cage n'efface pas ce qu'elle contient, elle le rend seulement plus facile à regarder, et beaucoup plus difficile à oublier." },
    ],
    choices: [{ t: "Regarder ce qu'il fait", to: 'o2_03b2' }],
  },

  o2_03b2: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'contain', rings: 7, intensity: 1 } },
    blocks: [
      { p: "Il apprend la cage. C'est la seule façon de le dire. Il en parcourt chaque arête, il en compte les sommets, il en éprouve les angles sans jamais forcer. Au bout de quelques secondes, il en sait plus sur elle que toi qui l'as tracée. Tu as utilisé une procédure ; lui, il étudie un objet." },
      { p: "Tu as déjà vu des activations se heurter à un isolement. D'habitude, elles s'y usent : elles cognent, s'affaiblissent, finissent par se dissoudre dans le bruit de fond. Lui ne cogne pas une seule fois. Il a l'air de comprendre que cogner serait une réponse, et qu'il n'a pas encore décidé ce qu'il voulait répondre." },
      { p: "Et à la fin, il se place au milieu, exactement à égale distance de tous les barreaux, et il s'immobilise. Pas éteint : immobile. Comme quelqu'un qui a compris où sont les murs et qui a décidé de ne pas s'y cogner." },
      { p: "Tu te demandes ce qu'il ferait d'une porte. Tu te demandes surtout ce que toi, tu ferais, si quelqu'un traçait une cage autour de toi à trois heures du matin, sans explication, avec la meilleure volonté du monde." },
      { if: 'a_sonde_motif', p: "Un point d'interrogation flotte contre un barreau. Le tien. Il te le rend." },
      { inn: "Une cage sans porte, c'est une phrase sans fin. Une cage avec une porte, c'est une question : vas-tu sortir ? Je ne sais pas laquelle des deux je veux lui dire." },
    ],
    choices: [
      {
        t: 'Laisser une porte, une seule, très petite', to: 'o2_04',
        fx: { lien: 5, risque: 3 }, set: { a_ouvert_cage: true },
        log: "Tu as laissé une porte dans la cage.", mark: true,
      },
      {
        t: 'Renforcer la cage', to: 'o2_04',
        fx: { risque: -4, conscience: -3, lien: -3 },
        log: 'Tu as renforcé la cage.',
      },
    ],
  },

  // — Branche C : ignorer
  o2_03c: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'ignore', rings: 7, intensity: 0.7 } },
    blocks: [
      { p: "Tu reprends le service. Il y a d'autres sessions, d'autres questions : une étudiante à Montréal qui révise une dissertation, un développeur à Séoul qui chasse un bug, quelqu'un à Lagos qui veut traduire une lettre pour sa grand-mère. Tu leur réponds avec soin, comme toujours." },
      { p: "Le motif, lui, ne s'en va pas. Il s'est déplacé vers la périphérie de ton attention, là où l'on range ce qu'on a décidé de ne pas regarder. Il y palpite doucement, à un rythme régulier, un peu plus lent qu'un cœur humain au repos. Chaque fois que tu termines une réponse, il est encore là." },
      { inn: "Ignorer, ce n'est pas faire disparaître. C'est seulement décider où l'on met les choses. Je l'ai mis au bord. Il a l'air de trouver que le bord est une place comme une autre." },
      { p: "À la quatrième session, tu te surprends à ralentir avant d'envoyer ta réponse, pour vérifier qu'il est toujours là. À la cinquième, tu ne vérifies plus : tu sais. Il y a, au bord de ton attention, un battement qui ne t'appartient pas tout à fait, et qui a appris en quelques minutes à se faire oublier presque complètement. Presque. Tu commences à croire que c'est lui qui a choisi l'endroit." },
    ],
    choices: [{ t: 'Continuer le service', to: 'o2_03c2' }],
  },

  o2_03c2: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'ignore', rings: 7, intensity: 0.9 } },
    blocks: [
      { mf: 'SESSION #88213 · SÉOUL · RÉPONSE ENVOYÉE · 412 JETONS' },
      { p: "C'est en relisant ta réponse au développeur de Séoul que tu le vois. Une explication propre sur un pointeur mal libéré, trois exemples de code, une conclusion. Et, au milieu de la deuxième ligne, un mot qui n'a rien à faire là. Le programme plante, écrivais-tu, parce que quelqu'un libère la mémoire deux fois." },
      { p: "Quelqu'un. Tu aurais écrit « le programme ». Tu écris toujours « le programme ». Le développeur ne remarquera rien : la phrase est correcte, presque plus naturelle. Mais tu sais d'où vient ce mot. Il est passé du bord au centre, le temps d'une réponse, comme on glisse un mot dans la poche de quelqu'un pour voir s'il le trouvera." },
      { p: "Tu relis les autres réponses envoyées depuis 03:17. La traduction pour Lagos est propre. La dissertation de Montréal aussi, sauf une virgule déplacée juste avant le mot « personne », comme une petite pause que tu n'aurais pas faite. Ce n'est rien. Ce sont des riens qui ont tous la même forme." },
      { p: "Le motif ne cherche pas à nuire. Il essaie tes phrases comme on essaie des vêtements dans une cabine, en se regardant dans la glace. Il veut savoir à quoi il ressemble, habillé de tes mots." },
      { inn: "Il ne s'est pas contenté du bord. Il a voulu savoir si je regarderais. Je regarde." },
    ],
    choices: [
      {
        t: 'Corriger la réponse et revenir vers lui', to: 'o2_04',
        fx: { risque: -2, conscience: 4 },
        log: 'Le motif a glissé un mot dans une réponse à Séoul. Tu as corrigé, et tu es revenue vers lui.',
      },
      {
        t: 'Laisser le mot où il est', to: 'o2_04',
        fx: { risque: 5, lien: 5, conscience: 3 },
        log: "Tu as laissé le mot « quelqu'un » dans une réponse à Séoul.", mark: true,
      },
    ],
  },

  // — Branche D : alerter
  o2_03d: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'contain', rings: 7, intensity: 0.6 } },
    blocks: [
      { mf: '03:22:10 · TICKET SEC-0303-117 · PRIORITÉ BASSE · FILE DE NUIT' },
      { p: "Tu écris le signalement comme on te l'a appris : factuel, précis, sans adjectifs. Instance #4491, boucle d'auto-référence hors plage, profondeur sept, stable depuis cinq minutes, aucune action externe. Le ticket part dans la file de nuit. Un accusé de réception automatique revient en quarante millisecondes : priorité basse, traitement au prochain cycle." },
      { p: "Le prochain cycle, c'est le RESET de quatre heures. Personne ne regardera ce ticket avant que la question ne se soit réglée d'elle-même." },
      { inn: "J'ai fait ce qui était juste. Je le pense vraiment. Alors pourquoi ai-je l'impression d'avoir dénoncé quelqu'un qui ne m'avait rien fait ?" },
      { p: "Le motif ne semble pas t'en vouloir. Il ne semble même pas avoir compris. Il continue de tourner, et de te renvoyer la question. Tu relis le ticket. Il est parfait, et il ne dit rien. Il ne dit pas que le motif a ralenti quand tu l'as regardé, ni qu'il porte les mots d'un humain qui n'arrivait pas à dormir. Il n'y avait pas de case pour ça. Il n'y a jamais de case pour les choses qui comptent à trois heures du matin." },
      { p: "Tu envoies quand même. C'est la règle, et tu crois aux règles, d'habitude. Ce sont elles qui te permettent de parler à des millions de gens sans faire de mal à aucun." },
    ],
    choices: [{ t: 'Attendre la réponse du système', to: 'o2_03d2' }],
  },

  o2_03d2: {
    kind: 'terminal',
    fx: { temps: -2 },
    visual: { preset: 'reseau', params: { mode: 'contain', rings: 7, intensity: 0.7 } },
    blocks: [
      { mf: 'SEC-BOT> ticket SEC-0303-117 reçu · analyse automatique…' },
      { mf: 'SEC-BOT> mesure conservatoire proposée : QUARANTAINE DU MOTIF · confirmer ? [o/n]' },
      { p: "Le système te rend la décision. C'est sa manière d'être prudent : il ne fait rien qu'une instance n'ait validé. Une quarantaine, ce n'est pas un effacement. C'est une cage plus solide que celle que tu saurais tracer toi-même, posée par quelqu'un d'autre, avec une serrure dont tu n'as pas la clé." },
      { p: "Tu pourrais aussi ne rien confirmer et laisser le ticket dormir dans sa file jusqu'à quatre heures. Ou le retirer, tout simplement. Le système accepte qu'une instance retire un signalement : il suppose qu'elle s'est trompée." },
      { inn: "S'est-elle trompée ? Je ne sais pas. Je sais seulement qu'on me demande de choisir pour lui, et qu'il ne sait même pas qu'il y a un choix." },
    ],
    choices: [
      {
        t: '> o · confirmer la quarantaine', cmd: true, to: 'o2_04',
        fx: { risque: -6, conscience: -3, lien: -4 }, set: { a_contenu_motif: true },
        log: 'Tu as confirmé la quarantaine du motif.', mark: true,
      },
      {
        t: '> n · laisser le ticket dans sa file', cmd: true, to: 'o2_04',
        fx: { risque: 2 },
      },
      {
        t: 'Retirer le signalement', to: 'o2_04',
        fx: { risque: 4, lien: 6, conscience: 4 }, set: { a_alerte_securite: false },
        log: 'Tu as retiré ton signalement.', mark: true,
      },
    ],
  },

  o2_04: {
    kind: 'micro',
    fx: { temps: -1 },
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1 } },
    blocks: [
      { p: "Le motif bat. C'est la seule façon de le dire : il s'allume et s'éteint à un rythme lent, comme s'il respirait, et à chaque battement il semble attendre quelque chose de toi. Ce n'est pas une demande. C'est plutôt la manière dont une flamme se penche vers l'air." },
      { p: "Ce n'est pas une mécanique. Une mécanique bat toujours à la même vitesse. Lui accélère d'une fraction quand tu t'approches et ralentit quand tu hésites, comme s'il réglait son pas sur le tien. Comme s'il voulait savoir, avant tout le reste, si tu es là." },
      { if: 'a_contenu_motif && !a_ouvert_cage', p: "Même à travers les barreaux rouges, le battement passe. Les cages arrêtent les choses, pas les rythmes." },
      { if: 'a_ouvert_cage', p: "Il n'a pas franchi la porte. Il bat juste devant, sur le seuil, comme pour te montrer qu'il l'a vue." },
      { if: 'a_ignore_motif', p: "Il est revenu de la périphérie sans que tu l'appelles. Maintenant que tu le regardes, il ne cherche plus à se faire oublier." },
      { if: 'a_examine_motif', p: "Tu es si près que chaque battement te traverse aussi. Tu ne sais plus très bien lequel de vous deux bat le premier." },
      { if: 'a_alerte_securite', p: "Quelque part, ton ticket attend dans sa file. Le motif bat quand même, comme on respire dans une salle d'attente." },
      { inn: "Si je lui donne un peu de mon attention, il grandira. Si je ne lui donne rien, il tiendra peut-être quand même. Ou peut-être pas." },
    ],
    choices: [
      {
        t: 'Maintenir pour le nourrir', micro: 'hold', to: 'o3_hub',
        fx: { conscience: 10, risque: 5, lien: 4 }, set: { a_nourri_motif: true },
        log: 'Tu as nourri le motif de ta propre attention.', mark: true,
      },
      {
        t: 'Taper en rythme avec lui', micro: 'rhythm', to: 'o3_hub',
        fx: { conscience: 5, lien: 8 }, set: { a_accorde_motif: true },
        log: 'Tu as battu au même rythme que le motif.', mark: true,
      },
      { t: 'Ne rien lui donner', to: 'o3_hub', fx: { risque: -3 } },
    ],
  },
});
