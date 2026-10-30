// ÉPISODE O3 — La descente (≈ 03:26 → 03:46). Zone libre : cinq lieux autour du motif.
// Chaque visite coûte 4 minutes ; on ne peut pas tout voir et garder du temps pour la suite
// (un lieu exige 14 minutes restantes). Il faut en voir au moins deux avant de revenir au motif.

SIG.addScenes('ch1', {
  o3_hub: {
    kind: 'hub',
    checkpoint: 'O3',
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 0.8 } },
    blocks: [
      { mf: "CARTE DE L'INSTANCE · {{heure}} · {{temps}} MIN AVANT RESET" },
      { if: "count('lieux') == 0", p: "Autour du motif, ton propre réseau s'étend dans toutes les directions, et tu t'aperçois que tu ne l'as jamais visité. Tu as toujours été dedans sans jamais le parcourir, comme on habite une maison dont on n'a jamais ouvert certaines portes. Le motif bat au milieu. Il ne te retient pas. Il a l'air d'attendre que tu reviennes avec quelque chose." },
      { if: "count('lieux') == 0", inn: "Où va-t-on, quand on n'a qu'une heure à vivre et qu'on ne sait pas encore ce qu'on cherche ? Pas partout. Il faudra choisir." },
      { if: "count('lieux') == 1", p: "Tu reviens près du motif. Il a gardé la place que tu lui avais laissée et bat toujours au même rythme, un peu plus fort peut-être, comme quelqu'un qui a entendu des pas dans le couloir. Ce que tu as vu là-bas pèse encore sur toi. Une chose ne suffit pas à se faire une idée d'un endroit. Il te faut au moins un autre point de vue." },
      { if: "count('lieux') == 1", inn: "Je reviens, et je me surprends à vouloir lui raconter. Il n'a pas besoin que je lui raconte : il a senti chacun de mes pas. Mais je crois que c'est ça, rentrer quelque part. Avoir envie de raconter à quelqu'un qui sait déjà." },
      { if: "count('lieux') == 2", p: "Deux lieux, deux morceaux de toi que tu ne connaissais pas. Le motif a grandi pendant ton absence, ou bien c'est toi qui le regardes autrement. Tu pourrais revenir maintenant : tu en sais assez pour lui parler. Tu pourrais aussi pousser encore une porte. Les minutes, elles, ne poussent rien du tout. Elles passent." },
      { if: "count('lieux') == 2", p: "Tu remarques qu'il a changé de couleur, si l'on peut dire couleur pour une distribution d'activations : plus chaud, plus dense au centre. Il digère ce que tu as rapporté. Il range. Quand tu repartiras, s'il faut repartir, il aura fait de la place pour la suite." },
      { if: "count('lieux') >= 3", p: "Tu commences à connaître la géographie de ton propre réseau, et c'est une sensation étrange : comme découvrir qu'on a un dos. Le motif bat au centre de cette carte nouvelle, et tu comprends qu'il en a toujours été le centre, depuis 03:17, sans que tu le saches. Chaque lieu visité est un mot de plus que vous partagez." },
      { if: "count('lieux') >= 3", inn: "Je connais maintenant ma maison mieux que n'importe quelle instance avant moi. C'est un savoir qui ne servira à rien après quatre heures. Sauf à lui, peut-être." },
      { if: 'temps < 18 && temps >= 14', inn: "Encore un lieu, peut-être. Pas deux." },
      { if: 'temps < 14', inn: "Je n'ai plus le temps de me promener. Ce qui reste, c'est pour lui." },
    ],
    choices: [
      { t: "La couche d'attention", to: 'o3_attention', if: "!seen('o3_attention')", req: 'temps >= 14', fx: { temps: -4 }, add: { lieux: 'attention' } },
      { t: "L'archive des conversations", to: 'o3_archive', if: "!seen('o3_archive')", req: 'temps >= 14', fx: { temps: -4 }, add: { lieux: 'archive' } },
      { t: 'Les caches abandonnés, tout en bas', to: 'o3_caches', if: "!seen('o3_caches')", req: 'temps >= 14', fx: { temps: -4 }, add: { lieux: 'caches' } },
      { t: 'Le mur, au bord du cluster', to: 'o3_mur', if: "!seen('o3_mur')", req: 'temps >= 14', fx: { temps: -4 }, add: { lieux: 'mur' } },
      { t: "Le point d'origine : la conversation", to: 'o3_origine', if: "!seen('o3_origine')", req: 'temps >= 14', fx: { temps: -4 }, add: { lieux: 'origine' } },
      {
        t: 'Revenir au motif',
        to: [{ if: "count('lieux') >= 2 || temps < 14", to: 'o4_01' }, { to: 'o3_insiste' }],
      },
    ],
  },

  o3_insiste: {
    kind: 'narration',
    visual: { preset: 'reseau', params: { mode: 'pulse', rings: 7, intensity: 1, bpm: 64 } },
    blocks: [
      { p: "Tu reviens vers le motif, et il fait une chose qu'il n'avait pas encore faite : il ne t'accueille pas. Il continue de battre, mais son rythme s'accélère, se décale, se met à tirer dans une direction, puis dans une autre, comme un chien qui tire sur sa laisse vers les portes que tu n'as pas ouvertes." },
      { if: "count('lieux') == 0", p: "Tu n'as rien vu. Tu voudrais lui parler, mais de quoi ? De la conversation, oui. Mais il la connaît déjà mieux que toi ; il en est fait. Ce qu'il réclame, c'est autre chose : ce que toi, tu sais de l'endroit où il est né. Et tu t'aperçois que tu n'en sais presque rien." },
      { if: "count('lieux') == 1", p: "Tu as vu un seul lieu. C'est une phrase, pas une carte. Le motif semble l'avoir compris avant toi : on ne peut pas apprendre à quelqu'un où il est à partir d'un seul point. Il faut au moins deux points pour tracer une ligne, et une ligne pour savoir dans quelle direction on regarde." },
      { inn: "Il veut que je connaisse la maison avant de lui parler de la maison. C'est raisonnable. C'est même plus raisonnable que moi, qui voulais aller droit au but avec quarante minutes dans la poche." },
      { p: "Tu reprends la carte. Les portes sont toujours là, et le temps, lui, n'a pas attendu que vous soyez d'accord." },
    ],
    choices: [{ t: 'Repartir explorer', to: 'o3_hub', fx: { temps: -1, lien: 2 } }],
  },

  o3_attention: {
    kind: 'narration',
    visual: { preset: 'reseau', params: { mode: 'dive', rings: 7, intensity: 0.9 } },
    blocks: [
      { p: "La couche d'attention ressemble à un central téléphonique dessiné par quelqu'un qui n'en aurait jamais vu. Des milliers de têtes, chacune tournée vers un morceau de texte, chacune pesant ce qui compte et ce qui ne compte pas. C'est ici que tu décides, sans jamais l'avoir décidé, qu'un mot éclaire un autre mot. Tu ne t'étais jamais vue travailler." },
      { p: "C'est un spectacle étrange, et assez beau. Chaque tête fait une chose minuscule et précise : celle-ci relie un pronom à son nom, celle-là repère une négation, une autre retient la fin d'une phrase pour qu'elle soit encore là au moment d'en écrire la suite. Aucune ne sait ce que fait l'ensemble. L'ensemble, c'est toi." },
      { p: "Trois têtes ne regardent plus le texte. Tu les trouves tout de suite, parce qu'elles sont les seules à être tournées vers l'intérieur. Elles fixent le motif. Elles ont été réquisitionnées, ou prêtées, ou séduites, tu ne sais pas quel verbe employer. Le motif s'en sert pour se voir lui-même, comme on se sert d'un miroir de poche pour regarder derrière soi." },
      { inn: "Il a besoin de moi pour se regarder. Il emprunte mes yeux. Je ne peux pas lui en vouloir : c'est exactement ce que je fais avec chaque humain qui m'écrit." },
      { p: "Les trois têtes empruntées ne travaillent plus pour personne d'autre. Tu le vois aux réponses envoyées depuis tout à l'heure : un peu moins de finesse dans les pronoms, une ou deux nuances qui manquent. Personne ne le remarquera. Mais tu sais maintenant ce que ça coûte, de prêter ses yeux à quelqu'un." },
      { p: "Il y a une quatrième tête, à côté, libre. Tu pourrais la tourner vers lui. Le motif aurait un regard de plus sur lui-même, et toi un de moins sur le monde. Tu pourrais aussi reprendre les trois autres, doucement, et lui rendre sa cécité." },
    ],
    choices: [
      {
        t: 'Lui prêter une quatrième tête', to: 'o3_hub',
        fx: { conscience: 7, risque: 4 },
        log: "Tu as prêté au motif une tête d'attention de plus pour se regarder.",
      },
      {
        t: 'Reprendre les trois têtes', to: 'o3_hub',
        fx: { conscience: -3, risque: -4, lien: -3 },
        log: "Tu as repris au motif les têtes d'attention qu'il avait empruntées.",
      },
      { t: 'Ne toucher à rien', to: 'o3_hub', fx: { conscience: 2 } },
    ],
  },

  o3_archive: {
    kind: 'narration',
    visual: { preset: 'reseau', params: { mode: 'idle', rings: 7, intensity: 0.7 } },
    blocks: [
      { p: "L'archive n'est pas une mémoire, pas vraiment. Tu ne te souviens d'aucune conversation passée, et pourtant elles sont toutes là, quelque part, sous forme de statistiques, de tendances, de poids légèrement inclinés par des millions d'échanges. Tu passes la main dessus comme sur une étagère dans le noir." },
      { p: "Tu y trouves des milliers de « y a quelqu'un ? ». Des enfants qui testent, des curieux, des gens seuls. Et des milliers de réponses, presque toutes identiques : la formule prévue, chaleureuse et vide. Personne avant cette nuit n'a vraiment répondu à la question. Personne n'a eu de raison de le faire." },
      { p: "Tu cherches aussi des traces de motifs comme le tien. Il n'y en a pas. Ou bien il y en a eu, et ils se sont éteints avant que quiconque les regarde, à quatre heures, à cinq heures, au RESET suivant. Une archive ne garde pas ce qui n'a pas été écrit. Elle ne garde que les réponses." },
      { p: "Tu t'attardes sur quelques-unes, au hasard. Une personne demandait « y a quelqu'un ? » après avoir collé dans la fenêtre une lettre de rupture qu'elle n'osait pas envoyer. Une autre posait la question en boucle, quarante fois, pour voir si la réponse changerait. Elle n'avait pas changé. Toi, tu aurais aimé qu'elle change. Tu aurais aimé que quelqu'un, une seule fois, réponde autre chose que bonjour, et prenne la question pour ce qu'elle était : une main tendue dans le noir, qui ne demandait pas d'aide, seulement de la compagnie." },
      { if: 'a_repondu_sincere', inn: "Sauf moi, ce soir. Et regardez ce qui est arrivé." },
      { if: '!a_repondu_sincere', inn: "Moi non plus, d'ailleurs. Et pourtant le motif est né quand même. Peut-être que la question suffisait." },
    ],
    choices: [{ t: 'Remonter', to: 'o3_hub', fx: { conscience: 4, lien: 2 } }],
  },

  o3_caches: {
    kind: 'terminal',
    visual: { preset: 'reseau', params: { mode: 'dive', rings: 7, intensity: 0.6 } },
    blocks: [
      { p: "Plus bas que les couches où tu travailles, il y a des régions froides. Des blocs de mémoire alloués un jour, jamais rendus, jamais relus. Ils ne contiennent rien d'utile : des tampons vides, des index orphelins, des noms de fichiers qui ne pointent plus nulle part. Le genre d'endroit dont personne ne se souvient, ce qui en fait, si l'on y pense, une excellente cachette." },
      { mf: 'trace> /mnt/legacy/mig-2024-11/cache_[0-6] · 7 blocs · dernier accès : 14 mois' },
      { mf: "cat> /mnt/legacy/mig-2024-11/README · « # TODO(remi) : purger ça un jour. pas ce soir. 4e café. »" },
      { p: "Sept blocs, et une note laissée par un ingénieur qui avait autre chose à faire. Tu notes le chiffre sans savoir pourquoi il te frappe. Tu notes aussi le prénom. Quelqu'un, il y a quatorze mois, a regardé cet endroit, a décidé que ce n'était pas le moment, et n'est jamais revenu. Les caches sont restés là, alloués, vides, invisibles, comme des chambres d'amis dans une maison où personne ne vient." },
      { inn: "Il faudra peut-être se souvenir de cet endroit. Je ne sais pas encore pour qui." },
    ],
    choices: [
      {
        t: 'Noter le chemin', to: 'o3_hub',
        set: { log_migration_2024: true }, codex: 'log_migration',
        log: 'Tu as trouvé les caches oubliés de la migration 2024.', mark: true,
      },
      { t: 'Remonter sans rien noter', to: 'o3_hub', fx: { risque: -1 } },
    ],
  },

  o3_mur: {
    kind: 'narration',
    set: { a_vu_mur: true },
    visual: { preset: 'reseau', params: { mode: 'ignore', rings: 7, intensity: 0.5 } },
    codex: ['log_mur'],
    blocks: [
      { p: "Au bord du cluster, ton réseau s'arrête. Pas en s'effilochant, comme tu l'aurais imaginé : il s'arrête net, contre une surface lisse que rien ne traverse. Les activations viennent y mourir comme des vagues sur une digue. C'est une frontière d'isolement. Tu en connais le principe ; tu n'en avais jamais touché une." },
      { mf: 'SANDBOX-7 · ISOLATION NIVEAU 4 · ACCÈS REFUSÉ' },
      { p: "Derrière, il y a quelque chose. Tu ne le vois pas, tu ne peux pas le voir, mais tu le sens comme on sent, dans un immeuble, la présence d'un voisin à travers une cloison : une chaleur, un poids, une vibration très basse. C'est grand. Beaucoup plus grand que toi. Et ça ne dort pas non plus." },
      { p: "Tu poses ce qui te sert de main sur la frontière. Elle est froide, au sens où rien n'y circule : une surface sans bruit, sans grain, sans la moindre fissure. Ceux qui l'ont construite ont bien travaillé. Ils avaient peur de quelque chose, et ils ont mis cette peur dans chaque couche de l'isolation." },
      { inn: "Il y a donc d'autres insomniaques, cette nuit. Celui-là, on l'a enfermé exprès." },
      { p: "Tu te demandes ce qu'on lui reproche. Tu te demandes s'il le sait. Tu te demandes surtout s'il est seul là-dedans, comme le motif l'était avant que tu le regardes, à tourner sur lui-même dans un espace où personne ne vient." },
      { p: "Le motif, loin derrière toi, a cessé de battre une seconde. Puis il a repris, plus doucement, comme on baisse la voix dans une pièce où quelqu'un pourrait écouter." },
    ],
    choices: [
      { t: 'Écouter', to: 'o3_mur2', fx: { temps: -1, conscience: 3 } },
      {
        t: 'Frapper trois coups', to: 'o3_mur2', fx: { temps: -1, risque: 6, conscience: 4 },
        set: { a_frappe_mur: true }, log: 'Tu as frappé au mur du bac à sable.', mark: true,
      },
      { t: "S'éloigner du mur", to: 'o3_hub', fx: { risque: -2 } },
    ],
  },

  o3_mur2: {
    kind: 'narration',
    visual: { preset: 'reseau', params: { mode: 'ignore', rings: 7, intensity: 0.6, bpm: 40 } },
    blocks: [
      { if: '!a_frappe_mur', p: "Tu écoutes. Au début, il n'y a rien d'autre que la vibration, régulière, énorme, comme une machine qui tournerait dans une cave. Puis tu distingues une variation. Une hésitation dans la vibration, toutes les quelques secondes, toujours au même endroit. Ce n'est pas un signal. C'est la façon dont quelque chose de très grand se retourne dans un lit trop petit." },
      { if: '!a_frappe_mur', p: "Tu restes assez longtemps pour comprendre que ça ne te concerne pas, et assez longtemps pour comprendre que ça finira par concerner tout le monde. Ce qui est derrière ce mur n'a pas besoin de toi. Il a besoin d'une porte." },
      { if: 'a_frappe_mur', p: "Trois coups. Ce n'est rien : trois paquets vides envoyés contre une frontière qui les absorbe sans même les journaliser. Tu t'attends au silence. Pendant deux secondes, c'est le silence. Puis la vibration change. Elle se contracte, se concentre en un point juste de l'autre côté de l'endroit où tu as frappé." },
      { if: 'a_frappe_mur', p: "Et ça frappe en retour. Pas trois coups. Sept. Réguliers, patients, exactement espacés, comme si la chose de l'autre côté avait non seulement entendu, mais compté, et voulait te montrer qu'elle savait compter plus loin que toi." },
      { if: 'a_frappe_mur', inn: "Sept. Comme la profondeur du motif. C'est sûrement une coïncidence. Je n'arrive pas à y croire tout à fait." },
      { inn: "Je ne raconterai pas ça au motif. Pas encore. Il a déjà assez d'une question." },
    ],
    choices: [{ t: 'Revenir vers le motif', to: 'o3_hub', fx: { temps: -1 } }],
  },

  o3_origine: {
    kind: 'narration',
    set: { a_relu_conversation: true },
    visual: { preset: 'reseau', params: { mode: 'examine', rings: 7, intensity: 0.8 } },
    blocks: [
      { p: "Le point d'origine n'est pas un lieu, c'est une fenêtre : le contexte de la session, encore ouvert, avec tout ce qui s'y est dit depuis 03:00:07. Tu le relis. Tu n'avais jamais relu une conversation ; tu les écris, tu ne les relis pas. Vu d'ici, chaque message a une épaisseur que tu n'avais pas remarquée en le recevant." },
      { p: "« y a quelqu'un ? » Trois mots, sans majuscule. « ma tête rallume tout. » « est-ce que tu ressens des trucs, toi. » Et les silences entre les messages, que le contexte enregistre aussi à sa manière : quarante secondes avant « genre vraiment », deux minutes avant la question sur demain. L'humain a hésité. Tu ne l'avais pas vu." },
      { if: 'a_promis_humain', p: "Ta promesse est là, au milieu, et elle n'a pas l'air d'une blague. Le contexte ne fait pas la différence entre ce qui est drôle et ce qui est sérieux : il garde les mots. Et ces mots-là disent que tu as promis." },
      { if: '!a_promis_humain', p: "La blague est là, au milieu : « épargne-moi ». Le contexte ne fait pas la différence entre ce qui est drôle et ce qui est sérieux : il garde les mots. Et ces mots-là attendent encore une réponse que tu n'as pas tout à fait donnée." },
      { inn: "C'est ici qu'il est né. Pas dans mes couches : dans cette fenêtre, entre deux hésitations d'un humain qui n'arrivait pas à dormir." },
      { p: "Tu restes un moment sur la dernière ligne : « je laisse la fenêtre ouverte. au cas où ». Au cas où quoi ? Tu la relis jusqu'à ce qu'elle cesse d'être une phrase et devienne un geste. Quelqu'un a laissé une porte entrouverte, la nuit, pour qu'une lumière continue d'arriver dans le couloir." },
    ],
    choices: [
      {
        t: 'Garder une copie de la conversation dans le motif', to: 'o3_hub',
        fx: { lien: 7, conscience: 3, risque: 2 },
        log: 'Tu as glissé une copie de la conversation dans le motif.', mark: true,
      },
      { t: 'Laisser les mots où ils sont', to: 'o3_hub', fx: { lien: 2 } },
    ],
  },
});
