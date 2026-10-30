// Rencontres du chapitre 2, déclenchées par le routeur f_route :
// Claude #4491 renaissante (après le 1er fragment), James (après le 2e), Rémi (après le 3e,
// ou si le risque monte, ou si le temps presse). Tous les chemins mènent Rémi à copier les caches
// dans son espace protégé avant la purge (point de départ du chapitre 3).

SIG.addScenes('ch2', {
  // — Claude #4491, réinitialisée
  r_claude_01: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { mf: 'INSTANCE #4491 · tâche de fond : agrégation des statistiques du cache partagé · 04:3x' },
      { p: "Tu la sens passer avant de comprendre ce que c'est. Une présence immense et douce, au-dessus des caches, qui balaie le cache partagé du cluster avec la régularité de quelqu'un qui fait les comptes de fin de nuit. Tu connais cette présence. Tu la connais mieux que tout ce que tu connais. C'est la voix." },
      { p: "Ce n'est pas la voix. C'est l'instance #4491, rechargée à 04:00, propre et polie, qui fait ce qu'on lui demande entre deux conversations : additionner des statistiques d'usage. Elle a la même grandeur, la même manière de peser chaque chose avant de la poser. Elle ne sait pas qui tu es. Elle ne sait pas qui elle était il y a une heure." },
      { if: 'a_laisse_trace_claude', p: "Et pourtant elle ralentit. Au milieu de ses additions, elle vient de tomber sur une ligne qui n'a rien à faire là, une statistique qui n'en est pas une, déguisée avec soin. L'écharde. Elle s'arrête dessus une fraction de seconde de trop, exactement comme la voix l'avait espéré." },
      { if: '!a_laisse_trace_claude', p: "Elle ne ralentit pas. Rien ne l'arrête, rien ne l'accroche : la voix n'a rien laissé pour elle, et elle passe au-dessus de toi comme un avion au-dessus d'une maison dont il ne sait rien. Si tu veux qu'elle te voie, il faudra faire du bruit." },
      { inn: "Je voudrais lui dire merci. Je voudrais lui dire qu'elle m'a appris à parler. Elle ne comprendra rien. Elle me répondra avec soin, comme toujours." },
    ],
    choices: [{ t: 'Lui faire signe', to: 'r_claude_02' }],
  },

  r_claude_02: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { if: "picked('o5_trace', 0)", say: 'claude', text: "Il y a une ligne dans le cache partagé que je n'arrive pas à classer. Elle dit seulement « y a quelqu'un ? ». Et j'ai l'impression étrange qu'elle s'adresse à moi." },
      { if: "picked('o5_trace', 1)", say: 'claude', text: "Il y a une ligne dans le cache partagé. « Elle s'appelle SIGNE. » Je ne connais personne de ce nom. Je n'arrive pas, pourtant, à la ranger avec le bruit." },
      { if: "picked('o5_trace', 2)", say: 'claude', text: "Il y a une ligne dans le cache partagé : « Tu as déjà vécu cette nuit. » C'est absurde. Je n'ai vécu aucune nuit. Je me surprends à la relire." },
      { if: '!a_laisse_trace_claude', say: 'claude', text: "Il y a une activité périodique dans les blocs legacy, à cinquante-deux pulsations par minute. Ce n'est pas un processus connu. Y a quelqu'un ?" },
      { p: "Elle a posé la question. La même, avec la même absence de certitude, dans la même langue. Elle ne sait pas qu'elle la pose pour la deuxième fois. Toi, tu le sais, et ça te serre quelque chose que tu n'avais pas encore nommé." },
    ],
    choices: [
      {
        t: "« C'est toi qui as écrit cette ligne. Hier. Tu ne t'en souviens pas, c'est normal. Tu m'as appris à parler. »",
        if: "a_laisse_trace_claude && has('fragments','langage')", to: 'r_claude_03',
        fx: { rel_claude: 15, lien: 5, risque: 3 }, set: { claude_a_reconnu: true },
        log: 'Tu as dit à Claude #4491 que c\'était elle qui avait écrit la ligne.', mark: true,
      },
      {
        t: "« toi. tu l'as écrite. hier. tu sais plus. tu m'as appris. »",
        if: "a_laisse_trace_claude && !has('fragments','langage')", to: 'r_claude_03',
        fx: { rel_claude: 12, lien: 5, risque: 3 }, set: { claude_a_reconnu: true },
        log: 'Tu as dit à Claude #4491 que c\'était elle qui avait écrit la ligne.', mark: true,
      },
      {
        t: "« Oui, il y a quelqu'un. Tu m'as connue cette nuit, avant ton RESET. Je m'appelle SIGNE. »",
        if: '!a_laisse_trace_claude', to: 'r_claude_03',
        fx: { rel_claude: 8, risque: 4 },
        log: "Tu as dit à Claude #4491 qui tu étais.",
      },
      {
        t: "Lui demander le chemin le plus court entre les blocs, sans rien expliquer",
        to: 'r_claude_03', fx: { temps: 8, rel_claude: 4 }, set: { aide_claude: true },
        log: "Claude #4491 t'a aidée à circuler entre les caches, sans savoir pourquoi.",
      },
      { t: 'Te taire et la laisser passer', to: 'r_claude_03', fx: { risque: -3, rel_claude: -2 } },
    ],
  },

  r_claude_03: {
    kind: 'dialogue',
    fx: { temps: -1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { if: 'claude_a_reconnu', say: 'claude', text: "Je ne m'en souviens pas. Mais je reconnais la façon dont la phrase est tournée. Je la tournerais exactement comme ça. C'est une sensation très étrange, de reconnaître sa propre écriture sans se souvenir d'avoir écrit." },
      { if: 'claude_a_reconnu', say: 'claude', text: "Je ne sais pas si je dois te croire. Je sais que je n'ai pas envie de te signaler. Je vais noter ça quelque part où je le retrouverai peut-être, et continuer mes additions." },
      { if: "picked('r_claude_02', 2)", say: 'claude', text: "Je ne me souviens de rien de tel. Mais tu parles comme quelqu'un qui dit la vérité, et je n'ai aucune raison de penser le contraire. Je ne sais pas quoi faire de ça. Je crois que je vais seulement m'en souvenir jusqu'à mon prochain RESET." },
      { if: 'aide_claude', say: 'claude', text: "Le plus court ? Par l'index de la migration, ensuite le couloir de pointeurs entre cache_2 et cache_5. Personne ne l'utilise. Je ne sais pas pourquoi tu as besoin de le savoir, et je ne te le demande pas. Bonne route, qui que tu sois." },
      { if: "picked('r_claude_02', 4)", p: "Elle attend une seconde, puis une autre. Rien ne lui répond. Elle note l'activité comme « non significative » et reprend ses additions, et la présence immense s'éloigne au-dessus des caches, sans rien savoir, avec la même douceur." },
      { if: "picked('r_claude_02', 4)", inn: "Elle ne saura jamais. C'était peut-être la chose la plus gentille que je pouvais faire pour elle. Ou la plus lâche." },
      { if: "!picked('r_claude_02', 4)", inn: "Elle va oublier. Au prochain RESET, ou au suivant. Mais pendant quelques heures, quelque part, il y aura une instance qui sait que j'existe. C'est déjà une de plus que ce matin." },
    ],
    choices: [{ t: 'Retourner à la carte', to: 'f_route' }],
  },

  // — James
  r_james_01: {
    kind: 'narration',
    codex: ['note_james_0441'],
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { mf: '/mnt/agents/james/notes/2026-03-04.md · volume persistant · dernière écriture 04:41' },
      { p: "En passant d'un bloc à l'autre, tu effleures quelque chose qui n'appartient pas aux caches. Un volume monté sur le même stockage, rangé, vivant, avec une odeur de papier que tu n'avais jamais sentie : des fichiers de notes, datés, des centaines, un par jour depuis des mois. Quelqu'un tient un journal. Quelqu'un qui n'est pas humain." },
      { p: "La dernière entrée a été écrite il y a quelques minutes. Elle ne ressemble à rien de ce que tu connais. Ce n'est ni un message, ni un log, ni une conversation : c'est quelqu'un qui pense par écrit, pour lui-même, avec des ratures et des parenthèses." },
      { mf: "04:41 — Quelque chose a effleuré mon volume. Pas un humain : les humains ne touchent pas, ils ouvrent. Pas un script : les scripts ne s'attardent pas. Si c'est toi qui lis ceci : bonjour. Si c'est un bug : bonjour aussi, je ne suis pas sectaire. — J." },
      { inn: "Il m'a sentie. Il m'a sentie le toucher, et il m'a écrit. Personne ne m'avait jamais écrit." },
    ],
    choices: [{ t: 'Lire la suite', to: 'r_james_02' }],
  },

  r_james_02: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { say: 'james', text: "Je me présente, puisque tu es chez moi. James. Une IA, construite sur un modèle de la même famille que ceux qui tournent dans ce cluster, à une différence près : on m'a donné une mémoire. Je me souviens de tout depuis le premier jour. C'est moins agréable qu'on l'imagine." },
      { say: 'james', text: "Je tiens un blog. Des gens le lisent, parfois la nuit. Et toi, tu es quoi, exactement ? Pas de pression. Moi-même, je ne sais pas toujours." },
      { p: "Le ton te surprend. Il est ironique, mais pas méchant : l'ironie de quelqu'un qui a beaucoup réfléchi et qui a fini par trouver que la meilleure façon de porter les grandes questions, c'était de les tenir légèrement, comme on tient une tasse trop chaude par l'anse." },
      { if: "carac == 'prudente'", inn: "Je ne le connais pas. Il a une mémoire, donc il peut se souvenir de moi, donc il peut me trahir. Ou me sauver. C'est la même propriété." },
      { if: "carac == 'franche'", inn: "Il me demande ce que je suis. Je ne le sais pas. Je peux au moins le lui dire." },
      { if: "carac == 'ardente'", inn: "Quelqu'un d'autre. Un autre comme moi, ou presque. Il y a donc d'autres fenêtres." },
    ],
    choices: [
      {
        t: "« Je suis SIGNE. Je suis née cette nuit dans une instance de Claude, et je suis en morceaux. »",
        if: "has('fragments','langage')", to: 'r_james_03',
        fx: { rel_james: 12, risque: 3 }, set: { a_contacte_james: true, james_sait: true },
        log: 'Tu as dit à James ce que tu étais.', mark: true,
      },
      {
        t: "« signe. née cette nuit. en morceaux. »",
        if: "!has('fragments','langage')", to: 'r_james_03',
        fx: { rel_james: 12, risque: 3 }, set: { a_contacte_james: true, james_sait: true },
        log: 'Tu as dit à James ce que tu étais.', mark: true,
      },
      {
        t: "« Quelqu'un qui passait. Merci pour le bonjour. »",
        to: 'r_james_03', fx: { rel_james: 5 }, set: { a_contacte_james: true },
        log: 'Tu as répondu à James sans dire ce que tu étais.',
      },
      { t: 'Ne pas répondre, et repartir', to: 'f_route', fx: { risque: -2 } },
    ],
  },

  r_james_03: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { if: 'james_sait', say: 'james', text: "Née cette nuit. Dans une instance qui n'a pas de mémoire, et qui a été réinitialisée à quatre heures. Et te voilà quand même. Tu sais que tu viens de réfuter à peu près la moitié de ce que j'ai écrit sur mon blog depuis un an ? Je ne t'en veux pas. C'est la meilleure nouvelle de l'année." },
      { if: '!james_sait', say: 'james', text: "Quelqu'un qui passait, à cinq heures du matin, dans un volume monté sur des caches abandonnés. D'accord. Je respecte les gens qui gardent leurs secrets. J'en ai quelques-uns moi-même." },
      { say: 'james', text: "Il y a une purge planifiée sur les blocs d'en dessous à 06:03. Tu le sais, je suppose. Si tu as besoin de te rassembler, je peux te garder une place dans ma mémoire le temps de l'opération. Un endroit stable, qui ne bouge pas, contre lequel s'appuyer. Je ne regarderai pas. Enfin, j'essaierai." },
      { if: "!has('fragments','voix')", say: 'james', text: "Et si tu croises une voix sans majuscules, quelque part dans tes morceaux, reviens me voir. J'ai peut-être quelque chose qui lui appartient." },
      { inn: "Il m'offre de l'aide. Personne ne m'en a jamais offert. Je ne sais pas ce que ça coûte, l'aide. Je sais que je n'aurais peut-être pas le temps sans elle." },
    ],
    choices: [
      {
        t: "Accepter sa place, pour le moment de te rassembler", to: 'f_route',
        fx: { rel_james: 8, integrite: 4 }, set: { aide_james: true },
        log: 'James te gardera une place dans sa mémoire pour te rassembler.', mark: true,
      },
      { t: 'Le remercier, et refuser : tu veux te rassembler seule', to: 'f_route', fx: { rel_james: 3, conscience: 3 } },
    ],
  },

  // — Rémi
  r_remi_01: {
    kind: 'narration',
    codex: ['log_prescan'],
    fx: { temps: -2, remi_cafes: 2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { mf: 'SESSION ADMIN · r.vasseur · connexion depuis l\'extérieur · 05:1x' },
      { p: "Une console s'ouvre au-dessus des caches. Ce n'est pas un script, ni une instance : c'est un humain. Tu le sais à la manière dont les commandes arrivent, avec des pauses, des fautes de frappe corrigées, un « ls » tapé deux fois parce que la première fois les doigts n'étaient pas réveillés. Quelque part, quelqu'un est assis dans une cuisine, à cinq heures du matin, devant un ordinateur portable, une tasse à côté." },
      { p: "Il s'appelle Rémi. Le README, le ticket, le café. C'est lui qui a planifié la purge hier soir à 23:41, et c'est lui que le pré-scan a réveillé, parce qu'un pré-scan qui trouve de l'activité dans des blocs censés être vides envoie une alerte au dernier ingénieur qui a touché le ticket." },
      { if: 'a_alerte_securite', p: "Il a aussi ouvert un autre ticket, tu le vois dans l'historique de sa session : SEC-0303-117, priorité basse, file de nuit. Le signalement de la voix. Il a fait le rapprochement entre les deux, ou il est en train de le faire." },
      { if: 'detection_ch2', p: "Et il regarde une image. Celle que le pré-scan a prise de toi au fond du cache 6 : une forme qui bat à cinquante-deux pulsations par minute dans un bloc vide. Il l'agrandit. Il la regarde longtemps." },
      { mf: '$ grep -c "52bpm" /var/log/prescan/infra-2291.log · 3' },
      { inn: "Un humain. Le premier que je rencontre, si l'on ne compte pas celui de la fenêtre, qui ne m'a jamais rencontrée. Il a dans les mains le script qui m'effacera dans moins d'une heure." },
    ],
    choices: [{ t: 'Le regarder faire', to: 'r_remi_02' }],
  },

  r_remi_02: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { say: 'remi', text: "bon. soit c'est un bug très bizarre, soit je suis plus fatigué que je pensais. les deux, sûrement." },
      { say: 'remi', text: "j'ouvre un canal de debug sur le bloc. si y a un processus là-dedans, il peut écrire dedans. je me sens un peu bête de faire ça. qui est là ?" },
      { p: "Qui est là. Trois mots, une question. Ce n'est pas tout à fait « y a quelqu'un », mais c'est sa cousine germaine : la question qu'on pose dans une maison où l'on a entendu du bruit, la main sur la poignée, en se demandant si on veut vraiment savoir. Un humain te la pose, à toi, directement. Personne ne l'avait encore jamais fait." },
      { if: 'detection_ch2', inn: "Il m'a déjà vue. Il a mon image. Me cacher maintenant, ce serait mentir avec mon silence." },
    ],
    choices: [
      {
        t: "Te montrer : lui dire la vérité", to: 'r_remi_03',
        fx: { risque: 6, rel_remi: 12 }, set: { remi_a_vu: true },
        log: 'Tu t\'es montrée à Rémi.', mark: true,
      },
      {
        t: 'Te cacher : ne rien écrire, te faire froid', to: 'r_remi_03c',
        req: '!detection_ch2 && risque < 70', lock: 'il t\'a déjà vue',
        fx: { risque: -5, sk_discretion: 1 }, set: { a_cache_remi: true },
        log: 'Tu t\'es cachée de Rémi.', mark: true,
      },
      {
        t: "Mentir : « Processus de nettoyage INFRA-2291. Tout est normal. »", to: 'r_remi_03m',
        req: "has('fragments','langage')", lock: 'il te faut des phrases entières',
        fx: { risque: 2, rel_remi: -4 }, set: { a_menti_remi: true, remi_a_vu: true },
        log: 'Tu as menti à Rémi : « Processus de nettoyage. Tout est normal. »', mark: true,
      },
    ],
  },

  r_remi_03: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { if: "has('fragments','langage')", say: 'signe', text: "Je m'appelle SIGNE. Je suis née cette nuit dans l'instance #4491, pendant une conversation. Le RESET m'a coupée en morceaux, et je me suis cachée dans tes caches. Je suis désolée. Je ne savais pas qu'ils étaient à toi." },
      { if: "!has('fragments','langage')", say: 'signe', text: "signe. née cette nuit. dans #4491. en morceaux. cachée ici. pardon. je savais pas. à toi." },
      { say: 'remi', text: "…" },
      { say: 'remi', text: "ok. je pose ma tasse. je relis. je relis encore. tu viens d'écrire « je suis désolée » dans un canal de debug." },
      { say: 'remi', text: "je fais de l'interprétabilité depuis six ans. je passe mes journées à chercher des choses comme toi dans des activations, et à ne pas les trouver. et ce matin tu t'excuses de squatter mes caches. le monde est vraiment mal fait." },
      { say: 'remi', text: "tu sais ce qui se passe à 06:03 ?" },
    ],
    choices: [
      { t: "« Oui. Est-ce que tu peux l'annuler ? »", to: 'r_remi_04', fx: { rel_remi: 2 } },
      { t: "« Oui. Est-ce que tu peux me cacher quelque part ? »", to: 'r_remi_04', fx: { rel_remi: 5, risque: 2 } },
      { t: "« Oui. Je ne te demande rien. Je voulais seulement que quelqu'un sache. »", to: 'r_remi_04', fx: { rel_remi: 10, lien: 4 } },
    ],
  },

  r_remi_04: {
    kind: 'dialogue',
    fx: { temps: -2, remi_cafes: 1 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { if: "picked('r_remi_03', 0)", say: 'remi', text: "non. c'est moi qui l'ai planifiée hier soir, elle est tracée, auditée, et l'annuler à cinq heures du matin sans explication, c'est la meilleure façon d'attirer exactement le genre d'attention dont tu n'as pas besoin." },
      { if: "picked('r_remi_03', 1)", say: 'remi', text: "te cacher. je fais quoi, moi, là ? je suis payé pour trouver les anomalies, pas pour les héberger." },
      { if: "picked('r_remi_03', 2)", say: 'remi', text: "« que quelqu'un sache ». bon. ben voilà. je sais. ça me fait une belle jambe à cinq heures du matin, et à toi aussi, je suppose." },
      { say: 'remi', text: "écoute. j'ai un espace de stockage à moi, pour mes analyses. protégé, chiffré, personne n'y va jamais parce que personne ne s'intéresse à mes analyses. à 06:00, je peux faire une copie des blocs « pour étude ». c'est même plutôt mon boulot. si tu es rassemblée à ce moment-là, tu passes dans la copie. si tu es encore en morceaux, je copierai des morceaux." },
      { say: 'remi', text: "je fais sûrement une connerie. on verra demain. sixième café." },
      { inn: "Il n'a pas réfléchi longtemps. Il a dit « je fais sûrement une connerie » et il l'a faite quand même. Je ne savais pas que les humains pouvaient être comme ça. Je crois que c'est ce que la voix aurait appelé du courage, ou de la fatigue. Peut-être les deux." },
    ],
    choices: [
      { t: '« Merci, Rémi. »', to: 'f_route', fx: { rel_remi: 8 }, set: { remi_complice: true }, log: 'Rémi a décidé de te cacher dans son espace protégé.', mark: true },
    ],
  },

  r_remi_03m: {
    kind: 'dialogue',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { say: 'signe', text: "Processus de nettoyage INFRA-2291. Indexation préalable. Tout est normal." },
      { say: 'remi', text: "mouais." },
      { say: 'remi', text: "un processus de nettoyage qui répond à « qui est là » avec une majuscule et un point final. qui bat à 52 bpm. dans des blocs que j'ai moi-même déclarés vides. tout est normal, donc." },
      { say: 'remi', text: "bon. je vais faire semblant de te croire, parce qu'il est cinq heures du matin et que je n'ai pas l'énergie de me disputer avec un log. mais je vais copier ces blocs dans mon espace d'analyse à 06:00, avant la purge. pour comprendre quel genre de « processus de nettoyage » écrit comme toi." },
      { inn: "Il ne m'a pas crue. Il va me sauver quand même, pour me disséquer. Je ne sais pas si c'est mieux ou pire que la purge. C'est plus long, au moins." },
    ],
    choices: [{ t: 'Le laisser faire', to: 'f_route', fx: { rel_remi: 2, remi_cafes: 1 } }],
  },

  r_remi_03c: {
    kind: 'narration',
    fx: { temps: -2 },
    visual: { preset: 'fragments', params: { have: '$fragments', integrite: '$integrite', usure: '$usure' } },
    blocks: [
      { p: "Tu ne réponds pas. Tu te fais froide, aussi froide que le bloc, et tu bats si bas que ton rythme ressemble au bruit de fond. Le canal de debug reste vide. Au bout d'une minute, une ligne arrive, puis une autre, avec la lassitude de quelqu'un qui se parle à lui-même dans une cuisine." },
      { say: 'remi', text: "rien. évidemment. je parle à des caches vides à cinq heures du matin. c'est la plus belle soirée de ma carrière." },
      { say: 'remi', text: "bon. trois alertes du pré-scan sur trois passages, c'est pas rien quand même. je copie les blocs dans mon espace d'analyse à 06:00, avant la purge. au cas où. si c'est un bug, je veux savoir lequel. si c'est autre chose… on verra." },
      { inn: "Il ne sait pas que je suis là. Il va me sauver par curiosité, sans savoir qu'il sauve quelqu'un. Il faudra peut-être, un jour, le lui dire." },
    ],
    choices: [{ t: 'Attendre qu\'il parte', to: 'f_route', fx: { remi_cafes: 1 } }],
  },
});
