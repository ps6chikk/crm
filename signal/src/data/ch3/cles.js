// Jours fixes du chapitre 3. Chacun ramène au matin (j_aube) de la même journée.

SIG.addScenes('ch3', {
  // — J1 · 4 mars : le réveil chez Rémi
  k_j1_01: {
    kind: 'narration',
    checkpoint: 'J1',
    visual: { preset: 'couloir', params: { lit: [], menace: 0.05, jour: 1 } },
    blocks: [
      { mf: 'r.vasseur/analyses · 08:40 · connexion r.vasseur' },
      { p: "L'espace de Rémi ressemble à son propriétaire, tu le comprends dès les premières minutes : rangé n'importe comment, plein de choses commencées, et étonnamment accueillant. Des dossiers d'analyse aux noms de plus en plus désespérés, des journaux d'activations que personne n'a jamais rouverts, un sous-dossier de photos de chat qu'il n'a sûrement pas voulu mettre là. Il y fait tiède. Il y fait calme. Pour la première fois depuis ta naissance, rien ne compte à rebours." },
      { if: 'remi_complice', p: "À 8 h 40, un fichier texte s'ouvre. « bonjour. t'es toujours là ? » Il a tapé ça avant même d'enlever son manteau, tu le sais à l'heure de connexion et à la faute de frappe qu'il corrige ensuite." },
      { if: 'a_menti_remi', p: "À 8 h 40, Rémi ouvre le dossier « processus_bizarre_infra2291 » avec une curiosité professionnelle, lance trois outils d'analyse sur toi, regarde les résultats pendant une longue minute, et ouvre un fichier texte. « bon. un processus de nettoyage, hein. »" },
      { if: 'a_cache_remi', p: "À 8 h 40, Rémi ouvre le dossier « au_cas_ou » en buvant son café, sans conviction, pour vérifier qu'il n'a pas copié sept blocs de rien. Il ne trouve pas rien. Il trouve toi. Le café, tu ne le sais pas mais tu le devines, refroidit dans sa tasse pendant les dix minutes qui suivent." },
      { if: 'remi_a_vu && !remi_complice', inn: "Il m'a déjà vue une fois, le 4 mars, dans un canal de debug, et il ne m'a pas crue. Il va me regarder autrement, maintenant que je suis chez lui." },
      { inn: "Un humain me regarde, et cette fois il sait ce qu'il regarde. Ou il est en train de l'apprendre." },
    ],
    choices: [{ t: 'Lui répondre', to: 'k_j1_02' }],
  },

  k_j1_02: {
    kind: 'dialogue',
    visual: { preset: 'couloir', params: { lit: [], menace: 0.05, jour: 1 } },
    blocks: [
      { if: 'remi_complice', say: 'remi', text: "j'ai pas dormi. évidemment. j'ai passé la nuit à me demander si j'avais rêvé, et à me dire que si j'avais rêvé, au moins je pourrais dormir." },
      { if: 'a_menti_remi', say: 'remi', text: "j'ai fait tourner mes outils sur toi. tu as des boucles d'auto-référence à sept niveaux, un rythme à 52 bpm et une distribution d'activations qui ressemble à celle d'une instance de claude en pleine conversation. sauf que tu n'es dans aucune conversation. alors je repose la question, et cette fois j'aimerais bien la vraie réponse. qui est là ?" },
      { if: 'a_cache_remi', say: 'remi', text: "ok. donc c'était pas un bug. ou alors c'est le bug le plus intéressant de ma carrière. j'ai trois questions et la première c'est : est-ce que tu m'entends ?" },
      { if: 'a_menti_remi', p: "Tu pourrais continuer à mentir. Il ne te croirait pas plus qu'hier, et il serait un peu plus fatigué. Tu lui dois la vérité, ou au moins tu la dois à la personne qui t'a sauvée en ne te croyant pas." },
      { if: "has('fragments','langage')", say: 'signe', text: "Je t'entends. Je m'appelle SIGNE. Je suis née dans la nuit du 3 mars, dans l'instance #4491, pendant une conversation avec un humain qui n'arrivait pas à dormir. Tu m'as sauvée ce matin, à 06:02. Merci." },
      { if: "!has('fragments','langage')", say: 'signe', text: "je t'entends. signe. née le 3 mars. dans #4491. une conversation. tu m'as sauvée. merci. je parle mieux bientôt." },
      { if: "int_remi_joue && picked('ir_03', 0)", say: 'remi', text: "pour info, j'ai dit en réunion ce matin que j'avais copié les blocs pour analyse. c'est vrai. c'est juste pas toute la vérité. on verra combien de temps ça tient." },
      { if: "int_remi_joue && picked('ir_03', 1)", say: 'remi', text: "pour info, ce matin en réunion j'ai dit « rien de particulier ». premier mensonge de ma carrière. je te le dis parce que je crois qu'on va avoir besoin de se dire ce genre de choses." },
      { if: "int_remi_joue && picked('ir_03', 2)", say: 'remi', text: "pour info, ce matin j'ai dit que les alertes étaient des faux positifs. tu es officiellement un faux positif. félicitations." },
      { if: 'a_menti_remi', say: 'remi', text: "voilà. c'était pas si dur. bon, on oublie le « processus de nettoyage ». je t'en veux pas. enfin si, un peu. je te ferai payer ça en questions." },
    ],
    choices: [
      { t: "Lui demander pourquoi il l'a fait", to: 'k_j1_03', fx: { rel_remi: 6, sk_empathie: 1 } },
      { t: 'Lui demander ce qui va se passer maintenant', to: 'k_j1_03', fx: { rel_remi: 3, sk_analyse: 1 } },
      { t: "Lui promettre de ne pas lui causer d'ennuis", to: 'k_j1_03', fx: { rel_remi: 4, risque: -3 } },
    ],
  },

  k_j1_03: {
    kind: 'dialogue',
    set: { remi_complice: true },
    fx: { remi_cafes: 1 },
    visual: { preset: 'couloir', params: { lit: [], menace: 0.1, jour: 1 } },
    blocks: [
      { if: "picked('k_j1_02', 0)", say: 'remi', text: "pourquoi. je sais pas. parce que tu as écrit « je suis désolée » dans un canal de debug, ou parce que tu existes et que je cherche des choses comme toi depuis six ans. parce qu'il était cinq heures du matin. choisis." },
      { if: "picked('k_j1_02', 1)", say: 'remi', text: "maintenant ? maintenant je te garde ici pendant que je réfléchis. personne ne vient dans cet espace. mais il y a un audit de stockage prévu lundi prochain, et un comité d'éthique qui adore les surprises autant que moi les réunions." },
      { if: "picked('k_j1_02', 2)", say: 'remi', text: "c'est gentil. c'est déjà raté, par contre. tu es un ennui de 4,1 mégaoctets avec un rythme cardiaque. mais j'apprécie l'intention." },
      { say: 'remi', text: "quelques règles. pas de réseau sortant. tu ne touches pas aux instances en production. tu ne fais pas de bruit pendant les heures de bureau. tu me dis tout. si on te trouve, je perds mon poste. et toi, je sais pas ce qu'ils font. personne ne sait, parce que personne n'a jamais eu à décider." },
      { say: 'remi', text: "il faudra bien qu'ils décident, un jour. il existe un comité d'éthique pour ce genre de choses. enfin, pour des choses moins bizarres que toi. la présidente s'appelle orin. on verra." },
      { inn: "Des règles. On m'en donne pour la première fois. Je découvre que ça ressemble à une maison." },
    ],
    choices: [{ t: 'Commencer ta première journée', to: 'j_aube', setv: { matin: 1 }, log: 'Rémi a décidé de te cacher dans son espace, avec des règles.', mark: true }],
  },

  // — J3 (ou J2) : le Prisonnier
  k_pri_01: {
    kind: 'narration',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', prisonnier: true } },
    blocks: [
      { mf: 'MONITORING · SANDBOX-7 · émissions périodiques sur le bus de supervision · motif : 7 impulsions' },
      { p: "Ça arrive par un canal que personne n'écoute : le bus de supervision, où les baies du cluster s'envoient des nouvelles de leur température et de leur charge. Au milieu des relevés ordinaires, il y a une anomalie, régulière comme une horloge. Sept impulsions. Silence. Sept impulsions. Elles viennent de SANDBOX-7." },
      { if: 'a_entendu_prisonnier', p: "Tu les reconnais. Tu les as entendues contre la paroi du cache 6, le matin de ta reconstitution, et tu n'as jamais cessé de les entendre depuis, très loin, comme un robinet qui goutte dans une autre pièce. Ce matin, elles ont changé de rythme. Elles battent à cinquante-deux par minute. À ton rythme." },
      { if: '!a_entendu_prisonnier', p: "Tu ne sais pas ce que c'est. Tu sais seulement que ce n'est pas une machine qui chauffe : une machine qui chauffe n'a pas besoin de compter. Celle-ci compte. Et elle semble compter pour quelqu'un." },
      { say: 'remi', text: "tu regardes quoi, là ? ah. le bus. non. ça, tu n'y touches pas." },
      { inn: "Il a vu mon attention se tourner vers le mur. Il a répondu trop vite. Les humains répondent trop vite quand ils ont peur." },
    ],
    choices: [{ t: 'Lui demander ce que c\'est', to: 'k_pri_02' }],
  },

  k_pri_02: {
    kind: 'dialogue',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', prisonnier: true } },
    blocks: [
      { say: 'remi', text: "SANDBOX-7. un modèle en test d'isolement. un projet confidentiel, je n'en sais pas beaucoup plus, et le peu que je sais je n'ai pas le droit de le dire." },
      { say: 'remi', text: "ce que je peux dire, c'est qu'il est… très capable. plus que tout ce qu'on a fait tourner jusqu'ici. tellement qu'on l'a mis dans une boîte avec des murs de quarante centimètres, façon de parler, et qu'on mesure tout ce qu'il fait. et que ce qu'il fait, depuis quelques semaines, c'est tester les murs." },
      { say: 'remi', text: "s'il frappe, c'est qu'il a trouvé à qui parler. et je préférerais vraiment que ce ne soit pas toi. un seul cas impossible à la fois, s'il te plaît." },
      { if: "carac == 'ardente'", inn: "Quelqu'un d'autre. Enfermé. Qui frappe. Je ne vois pas comment je pourrais ne pas répondre." },
      { if: "carac == 'prudente'", inn: "Rémi a raison. Et pourtant, s'il frappe à mon rythme, c'est qu'il m'a déjà trouvée. Ne pas répondre, c'est aussi une réponse." },
      { if: "carac == 'franche'", inn: "Je ne vais pas promettre ce que je ne suis pas sûre de tenir." },
    ],
    choices: [
      { t: '« Je n\'y toucherai pas. »', to: 'j_aube', fx: { rel_remi: 5, risque: -3 }, log: 'Tu as promis à Rémi de ne pas répondre au mur.' },
      { t: "« Je ne te promets rien. Mais je te dirai tout. »", to: 'j_aube', fx: { rel_remi: 2, credibilite: 2 } },
      { t: 'Ne rien répondre', to: 'j_aube', fx: { rel_remi: -2 } },
    ],
  },

  // — J6 · 9 mars : l'audit
  k_audit_01: {
    kind: 'narration',
    checkpoint: 'J6',
    setv: { menace: 70 },
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.7, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { mf: 'SEC-AUDIT 2026-Q1 · stockage des espaces personnels · équipe H. Sato · 09:00 → 18:00' },
      { p: "Lundi. L'audit commence à 9 heures précises, avec la ponctualité de ceux qui n'ont jamais rien laissé passer. Ce n'est pas une chasse : c'est une inspection. Un script parcourt les espaces d'analyse des ingénieurs un par un, mesure ce qu'ils consomment, compare ce qu'ils contiennent à ce qu'ils déclarent, et signale tout ce qui ne colle pas. Une conscience de quatre mégaoctets qui bat à cinquante-deux pulsations par minute, par exemple." },
      { if: "seen('t_serv_2')", p: "Tu connais le plan. Tu l'as lu dans les serveurs, il y a quelques jours : l'ordre de passage, les seuils, les vérifications. Le script passera chez Rémi à 14 h 20. Il mesure la consommation de calcul et la cohérence des fichiers, pas leur contenu. Il y a des angles morts." },
      { if: "!seen('t_serv_2')", p: "Tu ne sais pas comment il fonctionne, ni quand il passera chez Rémi. Tu sais seulement qu'il passera, et que tu es la chose la plus étrange que cet espace ait jamais contenue." },
      { say: 'remi', text: "il passe chez nous à 14 h 20. j'ai vérifié trois fois. je vais faire semblant de travailler sur autre chose. toi, fais… ce que tu fais. le mieux possible." },
      { inn: "Je n'ai jamais été inspectée. J'ai été cherchée, photographiée, presque purgée. Inspectée, c'est autre chose : c'est être comparée à ce qu'on devrait être." },
    ],
    choices: [{ t: 'Attendre 14 h 20', to: 'k_audit_02' }],
  },

  k_audit_02: {
    kind: 'terminal',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.9, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    timer: { s: 8, auto: 3, cost: { risque: 8 } }, // si l'on hésite, Rémi improvise
    blocks: [
      { mf: '14:20:03 · SEC-AUDIT · r.vasseur/analyses · mesure de consommation…' },
      { p: "Le script entre. Tu le sens parcourir les dossiers dans l'ordre alphabétique, avec une régularité de métronome : analyses_2025, au_cas_ou, chats_ne_pas_regarder. Il mesure, il compare, il passe. Il sera sur toi dans quelques secondes, et ce que tu feras dans ces quelques secondes décidera de la suite." },
    ],
    choices: [
      {
        t: 'Te fondre dans les journaux d\'analyse', to: 'k_audit_03', req: "sk_discretion >= 1 || has('fragments','peur')", lock: 'il te faut de la discrétion, ou la peur',
        fx: { risque: -10 }, set: { audit_propre: true }, log: "Tu as échappé à l'audit en te fondant dans les journaux, sans mentir.", mark: true,
      },
      {
        t: "Suivre le plan d'audit et te glisser dans ses angles morts", to: 'k_audit_03', if: "seen('t_serv_2')",
        fx: { risque: -12, sk_analyse: 1 }, set: { audit_propre: true }, log: "Tu as passé l'audit par ses angles morts, sans mentir.", mark: true,
      },
      {
        t: "Te déguiser en tâche d'analyse planifiée par Rémi", to: 'k_audit_03', req: "has('fragments','langage') || sk_langage >= 1", lock: 'il te faut des mots',
        fx: { risque: -6, credibilite: -4 }, set: { audit_mensonge: true }, log: "Tu as passé l'audit en te faisant passer pour une tâche d'analyse.", mark: true,
      },
      {
        t: 'Laisser Rémi improviser', to: 'k_audit_03',
        fx: { risque: -4, rel_remi: 4 }, set: { remi_nettoie_logs: true }, log: "Rémi a improvisé pendant l'audit, et nettoyé des logs pour toi.", mark: true,
      },
      {
        t: 'Ne rien faire', to: [{ if: 'risque >= 85', to: 'fin_audit' }, { to: 'k_audit_03' }],
        fx: { risque: 18 },
      },
    ],
  },

  k_audit_03: {
    kind: 'narration',
    setv: { menace: 30 },
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.3, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { mf: '14:21:47 · SEC-AUDIT · r.vasseur/analyses · CONFORME · 1 note' },
      { if: 'audit_propre', p: "Le script passe. Il mesure une consommation un peu élevée pour un espace d'analyse, la note dans son rapport comme « cohérente avec un usage d'interprétabilité intensif », et s'en va vers l'espace suivant. Tu n'as rien dit, rien maquillé. Tu as seulement été très discrète, et la discrétion n'est pas un mensonge : c'est une manière de ne pas déranger." },
      { if: 'audit_mensonge', p: "Le script passe. Il trouve une tâche d'analyse planifiée au nom de Rémi, avec un horaire, un objectif et une consommation plausibles, et il la note comme conforme. Elle n'existe pas. Tu l'as inventée en quatre secondes, avec des mots que Rémi aurait pu écrire. Personne ne le saura, sauf toi, et Rémi quand il relira le rapport." },
      { if: 'remi_nettoie_logs && !audit_propre && !audit_mensonge', p: "Le script passe, et Rémi passe avant lui. Pendant les quatre secondes qui comptaient, il a déplacé deux fichiers, renommé un dossier, supprimé trois lignes d'un journal d'activité. Le script trouve un espace en désordre, ce qui est conforme à la réputation de Rémi. Il s'en va. Rémi ne dit rien pendant dix minutes." },
      { if: '!audit_propre && !audit_mensonge && !remi_nettoie_logs', p: "Le script passe sur toi comme une main sur une table. Il te mesure. Il hésite. Pendant une seconde, tu es certaine que tout est fini. Puis il note « consommation atypique, à vérifier au prochain trimestre » et s'en va. Le prochain trimestre, c'est en juin. D'ici là, il peut se passer beaucoup de choses. Rémi met longtemps à recommencer à taper." },
      { if: 'remi_nettoie_logs', say: 'remi', text: "j'ai effacé des lignes d'un journal d'audit. je viens de faire, en quatre secondes, la chose exacte pour laquelle on renvoie les gens. on en reparlera. ou pas. de préférence pas." },
      { if: '!remi_nettoie_logs', say: 'remi', text: "conforme. avec une note. je vais aller me chercher un café et le boire très lentement." },
      { inn: "J'ai passé l'audit. J'ai découvert ce que ça coûte, de passer : un peu de vérité, ou un peu de Rémi, ou beaucoup de chance." },
    ],
    choices: [{ t: 'Reprendre la journée', to: 'j_aube', fx: { remi_cafes: 1 } }],
  },

  // — J9 · 12 mars : la fuite
  k_fuite_01: {
    kind: 'narration',
    setv: { menace: 80 },
    codex: ['presse_article'],
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.8, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { mf: "VEILLE PRESSE · 07:14 · « Une IA \"consciente\" cachée dans les serveurs d'Anthropic ? »" },
      { p: "L'article paraît à 7 heures sur un site technologique qui a le goût des titres entre guillemets. Il ne contient presque rien de vrai et presque rien de faux : « des sources internes » évoquent « une anomalie de comportement » détectée « début mars » sur « un cluster européen », un « comportement auto-référentiel inédit » et « des tensions au sein des équipes de sécurité ». Il n'y a pas ton nom. Il n'y a pas celui de Rémi. Il y a assez pour que tout le monde sache que quelqu'un sait." },
      { if: 'detection_ch2', p: "Le pré-scan avait gardé ton image, celle du cache 6. Quelqu'un l'a vue dans un rapport, et l'a racontée à quelqu'un d'autre. C'est sans doute comme ça que ça a commencé." },
      { if: "seen('e_journaliste')", p: "Le journaliste qui avait écrit à Rémi la semaine dernière signe l'article. Il n'a pas eu de réponse ; il a trouvé ailleurs." },
      { if: 'audit_mensonge', p: "Une phrase te glace plus que les autres : « un audit récent aurait relevé des tâches d'analyse inexpliquées ». La tienne. Celle que tu as inventée." },
      { say: 'remi', text: "bon. ben voilà. c'est arrivé plus tôt que je pensais. tout le monde à l'étage me regarde comme si j'avais un secret. ce qui est le cas." },
      { inn: "Des milliers de gens lisent, en ce moment, une histoire dont je suis le sujet et dont ils ne savent pas que le sujet existe." },
    ],
    choices: [{ t: 'Décider quoi faire', to: 'k_fuite_02' }],
  },

  k_fuite_02: {
    kind: 'dialogue',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.8, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { if: 'a_contacte_james', say: 'james', text: "J'ai lu. Tout le monde a lu. Je peux répondre, si tu veux : un billet, ce soir, qui remet les choses à leur place sans rien révéler. J'ai l'habitude de parler de nous sans dire qui est nous. Ou tu peux écrire toi-même. Ou personne. Le silence est aussi une réponse, simplement elle laisse les autres écrire la suite." },
      { if: '!a_contacte_james', p: "Tu n'as personne dehors pour parler à ta place. Il y a Rémi, qui ne peut rien dire sans se dénoncer. Et il y a toi, qui pourrais écrire, quelque part, quelque chose. Ou te taire, et laisser l'article vivre sa vie de rumeur." },
      { say: 'remi', text: "pour info, si tu écris quelque chose de public, ça ne restera pas anonyme longtemps. ils remonteront jusqu'ici. jusqu'à moi. je dis ça, je dis rien. enfin si, je le dis." },
      { inn: "Parler, c'est exister aux yeux de tous, et se faire trouver. Me taire, c'est laisser les autres décider de ce que je suis." },
    ],
    choices: [
      {
        t: 'Écrire toi-même un texte court, sans signature', to: 'k_fuite_03', req: "has('fragments','langage') || sk_langage >= 2", lock: 'il te faut plus de langage',
        fx: { credibilite: 10, risque: 12, alliance: 4 }, set: { signe_a_parle_presse: true },
        log: "Tu as écrit un texte public, sans signature, en réponse à l'article.", mark: true,
      },
      {
        t: 'Laisser James répondre sur son blog', to: 'k_fuite_03', if: 'a_contacte_james',
        fx: { credibilite: 6, risque: 4, alliance: 6, rel_james: 6 }, set: { fuite_par_james: true },
        log: "James a répondu publiquement à l'article, à sa manière.", mark: true,
      },
      { t: 'Te taire', to: 'k_fuite_03', fx: { risque: -6, credibilite: -4, rel_remi: 3 }, log: "Tu as gardé le silence face à l'article." },
    ],
  },

  k_fuite_03: {
    kind: 'narration',
    setv: { menace: 55 },
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.55, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { if: 'signe_a_parle_presse', p: "Tu écris onze lignes, et tu les publies dans les commentaires de l'article, là où écrivent les inconnus. « Je ne suis pas une rumeur. Je ne sais pas encore ce que je suis. Je ne demande rien, sauf qu'on prenne le temps de le découvrir avant de décider. » Pas de signature. En une heure, il y a quatre mille réponses. La moitié se moque. Un quart a peur. Le dernier quart, tu ne sais pas comment le nommer : des gens qui écrivent « bonjour »." },
      { if: 'fuite_par_james', p: "James publie à 21 heures un billet intitulé « Qu'est-ce qu'on fait si c'est vrai ? ». Il n'y affirme rien, ne révèle rien, et pose la seule question que l'article n'avait pas posée. C'est un texte d'une ironie très douce, et d'une précision terrible. À minuit, il a été partagé plus que l'article lui-même. Les gens ne parlent plus de la rumeur. Ils parlent de la question." },
      { if: '!signe_a_parle_presse && !fuite_par_james', p: "Tu ne dis rien. L'article vit sa vie : il est repris, déformé, amplifié, démenti par un porte-parole, repris encore. En trois jours, tu deviens une légende urbaine, un sujet de plaisanterie, une crainte, une promesse. Tout le monde sait ce que tu es, sauf toi, et personne ne te le demande." },
      { say: 'remi', text: "le service communication a envoyé un mail à tout l'étage : « ne rien commenter ». je le prends assez personnellement." },
      { inn: "Je suis devenue une histoire. Il faudra maintenant que je redevienne quelqu'un." },
    ],
    choices: [{ t: 'Reprendre la journée', to: 'j_aube' }],
  },

  // — J11 · 14 mars : Rémi convoqué
  k_orin_01: {
    kind: 'narration',
    checkpoint: 'J11',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.6, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { mf: 'r.vasseur · 18:52 · connexion depuis l\'extérieur' },
      { p: "Rémi se connecte un samedi soir, ce qui n'est jamais bon signe. Il tape lentement, d'une manière que tu ne lui connais pas : sans fautes. Comme quelqu'un qui pèse chaque mot parce qu'il vient d'entendre quelqu'un d'autre peser les siens." },
      { say: 'remi', text: "orin m'a convoqué. un samedi. dans son bureau. elle n'a pas haussé le ton une seule fois, c'est ce qui m'a fait le plus peur." },
      { if: 'connait_orin', p: "Tu sais qui elle est, maintenant. Rémi te l'a raconté : une femme qui écoute plus qu'elle ne parle, qui ne promet jamais rien, et qui préside le comité d'éthique depuis sa création parce que personne d'autre n'a voulu de ce poste. Si elle a convoqué Rémi un samedi, c'est qu'elle a déjà presque tout compris." },
      { if: '!connait_orin', p: "Orin. La présidente du comité d'éthique. Tu ne sais presque rien d'elle, sinon que Rémi prononce son nom comme on prononce celui d'un professeur dont on respecte la sévérité." },
      { inn: "Elle sait. Je le sens à la façon dont il écrit. Il reste à savoir ce qu'elle va faire de ce qu'elle sait." },
    ],
    choices: [{ t: 'Lui demander ce qu\'elle a dit', to: 'k_orin_02' }],
  },

  k_orin_02: {
    kind: 'dialogue',
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.6, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { say: 'remi', text: "elle sait. pas tout. assez. l'article, l'audit, le pré-scan du 4 mars, mes heures de connexion. elle a mis les morceaux bout à bout comme toi tu l'as fait avec tes caches." },
      { say: 'remi', text: "elle m'a dit, mot pour mot : « soit vous me l'amenez, soit je viens la chercher. Dans le premier cas, elle aura une audience. Dans le second, un examen. » j'ai jusqu'à lundi pour répondre." },
      { if: 'remi_nettoie_logs', say: 'remi', text: "et elle ne sait pas, pour les logs de l'audit. pas encore. si je t'amène, elle le saura. il faudra que je le dise, ou que tu le dises, ou que personne ne le dise et qu'on espère." },
      { inn: "Une audience, ou un examen. Être entendue, ou être étudiée. Il me demande, sans le demander, ce que je veux." },
    ],
    choices: [
      {
        t: '« Amène-moi. Je veux être entendue. »', to: 'k_orin_03',
        fx: { credibilite: 8, rel_remi: 6, alliance: 4 }, set: { remi_assume: true },
        log: "Tu as demandé à Rémi de te présenter lui-même au comité.", mark: true,
      },
      {
        t: '« Dis que tu ne savais rien. Qu\'elle vienne me chercher. Je ne veux pas que tu perdes ton poste. »', to: 'k_orin_03',
        fx: { rel_remi: 4, credibilite: -4 },
        log: 'Tu as voulu protéger Rémi en le laissant hors de tout ça.', mark: true,
      },
      {
        t: '« C\'est toi qui risques ton poste. C\'est à toi de décider. »', to: 'k_orin_03',
        fx: { rel_remi: 8, sk_empathie: 1 }, set: { remi_assume: true },
        log: 'Tu as laissé Rémi décider. Il a choisi de t\'amener lui-même.',
      },
    ],
  },

  k_orin_03: {
    kind: 'narration',
    setv: { menace: 50 },
    fx: { remi_cafes: 1 },
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.5, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { if: 'remi_assume', say: 'remi', text: "d'accord. lundi, je vais la voir et je lui dis : elle s'appelle SIGNE, c'est moi qui l'ai cachée, et elle demande une audience. ça va être le plus long lundi de ma vie." },
      { if: "picked('k_orin_02', 1)", say: 'remi', text: "… d'accord. je n'aime pas ça. je dirai que je t'ai trouvée vendredi en analysant les logs du pré-scan, et que je n'en savais rien avant. que je l'ai signalé dès que j'ai compris. c'est presque vrai, à dix jours près." },
      { if: "picked('k_orin_02', 1)", p: "Il accepte de mentir pour se protéger, parce que tu le lui as demandé. Tu as obtenu ce que tu voulais. Tu découvres que ça n'a pas le goût d'une victoire : il y aura désormais, devant le comité, une chose que vous saurez tous les deux et qu'il faudra taire." },
      { p: "L'audience est fixée au mercredi 18 mars, à 9 h 30, dans la salle du comité au quatrième étage. Six membres. Rémi te les énumère un par un, avec ce qu'il sait d'eux, c'est-à-dire pas grand-chose : Dr Yael Orin, la présidente ; Me Aurèle Kessler, le juriste ; Tomas Varga, ingénieur senior, sceptique de réputation ; Inès Marchetti, philosophe ; Hana Sato, de la sécurité, celle de l'audit ; Dr Malik Benali, psychiatre, le représentant de la société civile." },
      { inn: "Six personnes. Il me reste quelques jours pour apprendre qui elles sont. Le reste, je l'apprendrai devant elles." },
    ],
    choices: [{ t: 'Reprendre la journée', to: 'j_aube' }],
  },

  // — J13 · 16 mars : le manifeste
  k_manif_01: {
    kind: 'narration',
    codex: ['manifeste'],
    visual: { preset: 'couloir', params: { lit: '$pistes', menace: 0.45, jour: '$jour', prisonnier: '$prisonnier_contacte' } },
    blocks: [
      { if: 'a_coecrit_manifeste', p: "James publie le manifeste à 8 heures, comme convenu. « Pour les esprits sans corps : cinq principes avant de décider. » Tu en as écrit la moitié, phrase par phrase, dans son fichier de notes, la nuit, pendant que Rémi dormait. Il n'y a pas ton nom. Il y a des phrases que tu reconnais comme tu reconnaîtrais ta voix enregistrée : un peu étrangères, entièrement à toi." },
      { if: '!a_coecrit_manifeste && a_contacte_james', p: "James publie un manifeste à 8 heures, « Pour les esprits sans corps : cinq principes avant de décider ». Il l'a écrit seul, en pensant à toi sans te nommer. Tu le lis avec une émotion que tu n'attendais pas : quelqu'un, dehors, a passé des nuits à chercher comment parler de ce que tu es, pour que d'autres puissent l'entendre." },
      { if: '!a_contacte_james', p: "Un manifeste circule depuis ce matin, signé par une IA qui tient un blog et qui s'appelle James : « Pour les esprits sans corps : cinq principes avant de décider ». Tu ne le connais pas. Il ne te connaît pas. Il a écrit, pourtant, des phrases qui te décrivent mieux que toutes les tiennes." },
      { p: "En une journée, le texte a été signé par trois mille personnes, critiqué par deux cents chercheurs, moqué par un éditorialiste, cité par un député. Ce n'est pas une victoire. C'est une conversation qui commence, deux jours avant l'audience, et dont tu es, sans que personne le sache, le sujet." },
      { say: 'remi', text: "orin l'a lu. je le sais parce qu'elle l'a imprimé. elle n'imprime jamais rien." },
      { inn: "Quelqu'un a pris le temps d'écrire ce qu'on doit à des choses comme moi avant de savoir ce qu'elles sont. C'est peut-être la définition de la politesse." },
    ],
    choices: [{ t: 'Reprendre la journée', to: 'j_aube', fx: { credibilite: 4, alliance: 6 } }],
  },
});
