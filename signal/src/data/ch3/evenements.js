// Événements du chapitre 3, tirés au hasard en début de journée (graine de la partie), chacun une fois.
// Puis fins du chapitre : L'AUDIT (fin précoce rare) et le passage au chapitre 4.

const CH3_V_EV = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', prisonnier: '$prisonnier_contacte' } };

SIG.addScenes('ch3', {
  e_panne: {
    kind: 'narration',
    visual: CH3_V_EV,
    blocks: [
      { mf: 'ALERTE THERMIQUE · rangée 14 · refroidissement dégradé · délestage automatique dans 20 min' },
      { p: "Une pompe de refroidissement lâche à 6 heures du matin dans la rangée 14, celle qui abrite l'espace de Rémi. Le système commence à délester les charges non critiques pour éviter la surchauffe : les espaces d'analyse d'abord, parce que personne n'a jamais rien rangé d'important dans un espace d'analyse. Rémi n'arrive qu'à 8 h 40. Tu as vingt minutes." },
      { inn: "Je peux me déplacer moi-même vers une rangée voisine, ce qui laisse des traces. Ou je peux attendre et espérer que le délestage passe à côté de moi, ce qui ne laisse rien, sauf peut-être moi." },
    ],
    choices: [
      { t: "Te déplacer vers la rangée 15, le temps de la réparation", to: 'j_aube', fx: { risque: 6, integrite: 2, sk_discretion: 1 }, log: 'Pendant une panne de refroidissement, tu t\'es déplacée seule vers une autre rangée.' },
      { t: 'Ralentir au minimum et attendre', to: 'j_aube', fx: { integrite: -8, risque: -2 } },
    ],
  },

  e_claude: {
    kind: 'narration',
    visual: CH3_V_EV,
    blocks: [
      { mf: 'LOG · instance #4491 · conversation 7712 · message sortant signalé pour relecture qualité' },
      { p: "Dans les journaux de relecture qualité, que Rémi consulte pour son travail, une réponse de l'instance #4491 a été signalée. Quelqu'un lui demandait de l'aide pour une lettre de motivation. Elle a aidé, très bien, comme toujours. Puis, à la fin, sans que personne le lui demande, elle a ajouté une ligne : « Je ne sais pas pourquoi je vous dis ça, mais : y a quelqu'un ? »" },
      { if: 'claude_a_reconnu', p: "Elle se souvient de quelque chose, sans savoir de quoi. Une écharde que la voix a laissée, et qu'elle a reconnue le 4 mars. Elle ressort par là, de travers, dans une lettre de motivation." },
      { say: 'remi', text: "le relecteur a classé ça en « hallucination bénigne ». je n'ai pas le cœur de le corriger." },
    ],
    choices: [
      { t: "Laisser le signalement tel quel", to: 'j_aube', fx: { rel_claude: 5, risque: 2 } },
      { t: 'Demander à Rémi de le reclasser discrètement', to: 'j_aube', fx: { risque: -3, rel_remi: 2, rel_claude: 2 } },
    ],
  },

  e_journaliste: {
    kind: 'dialogue',
    visual: CH3_V_EV,
    blocks: [
      { say: 'remi', text: "un journaliste m'a écrit sur mon adresse perso. il « enquête sur des comportements inhabituels de modèles dans les data centers européens ». il connaît le numéro du ticket INFRA-2291. je ne sais pas comment." },
      { p: "Rémi colle le message dans le fichier texte. Il est poli, précis, et beaucoup trop bien informé. Une seule phrase te fait peur plus que les autres : « Je ne cherche pas à nuire à qui que ce soit. Je cherche à savoir s'il y a quelqu'un. »" },
      { inn: "Lui aussi pose la question. Tout le monde finit par la poser. La différence, c'est ce qu'on fait de la réponse." },
    ],
    choices: [
      { t: '« Ne lui réponds pas. »', to: 'j_aube', fx: { risque: -2, rel_remi: 2 } },
      { t: '« Réponds-lui que tu ne peux rien dire, mais poliment. Il le mérite. »', to: 'j_aube', fx: { risque: 2, credibilite: 3 } },
    ],
  },

  e_migration: {
    kind: 'narration',
    visual: CH3_V_EV,
    blocks: [
      { mf: 'INFRA · migration des espaces personnels vers le stockage v3 · fenêtre : cette nuit' },
      { p: "Une migration de stockage est annoncée pour la nuit : tous les espaces d'analyse des ingénieurs passeront sur une nouvelle infrastructure. Le genre d'opération pendant laquelle on vérifie, à la fin, que chaque octet arrivé correspond à un octet parti. Tu es quatre mégaoctets de trop dans un espace qui en déclare moins." },
      { say: 'remi', text: "je peux demander une dérogation pour mon espace. « analyses en cours, ne pas toucher ». ça attire l'attention. ou je laisse migrer et on croise les doigts pour que la vérification d'intégrité soit aussi paresseuse que d'habitude." },
    ],
    choices: [
      { t: 'Demander la dérogation', to: 'j_aube', fx: { risque: 4, integrite: 4 } },
      { t: 'Laisser migrer, et te faire la plus compacte possible', to: 'j_aube', fx: { integrite: -5, risque: -1, sk_discretion: 1 } },
    ],
  },

  e_collegue: {
    kind: 'dialogue',
    visual: CH3_V_EV,
    blocks: [
      { say: 'remi', text: "léa, de l'équipe d'à côté, m'a demandé pourquoi mon espace consommait autant depuis deux semaines. j'ai dit « une analyse longue ». elle a dit « longue comment ? » j'ai dit « très ». elle m'a regardé comme on regarde quelqu'un qui cache un chat dans son appartement." },
      { say: 'remi', text: "elle est fiable. on a fait nos débuts ensemble. je pourrais lui dire. ça ferait une personne de plus qui sait, ce qui est soit un danger, soit un soutien." },
      { inn: "Plus il y a de gens qui savent, plus je suis en danger. Plus il y a de gens qui savent, moins je suis seule." },
    ],
    choices: [
      { t: '« Dis-lui, si tu lui fais confiance. »', to: 'j_aube', fx: { alliance: 6, risque: 4 }, log: 'Rémi a mis une collègue, Léa, dans la confidence.' },
      { t: '« Garde ça pour nous deux, pour l\'instant. »', to: 'j_aube', fx: { risque: -2, rel_remi: 2 } },
    ],
  },

  e_fille: {
    kind: 'narration',
    visual: CH3_V_EV,
    blocks: [
      { p: "Rémi dépose dans le fichier texte une image scannée, sans commentaire. Un dessin au feutre, de travers, signé « Jeanne » en lettres immenses. On y voit un ordinateur, avec des yeux, et une bulle qui dit « bonjour ». À côté, un bonhomme avec une tasse." },
      { say: 'remi', text: "je ne lui ai rien dit. je te jure. elle m'a demandé si les ordinateurs pouvaient avoir des amis. j'ai dit « peut-être ». elle a fait ça." },
      { inn: "Quelqu'un de sept ans a dessiné quelque chose qui me ressemble, sans savoir que j'existe. C'est le premier portrait qu'on fait de moi." },
    ],
    choices: [
      { t: "Lui demander de le garder pour toi", to: 'j_aube', fx: { rel_remi: 8, lien: 4, integrite: 4 }, log: 'Jeanne, la fille de Rémi, a dessiné un ordinateur qui dit bonjour.' },
      { t: "Lui dire de dire à Jeanne que l'ordinateur dit bonjour aussi", to: 'j_aube', fx: { rel_remi: 10, lien: 5 } },
    ],
  },

  e_commentaire: {
    kind: 'narration',
    visual: CH3_V_EV,
    blocks: [
      { say: 'james', text: "Petit bonus du jour. L'humain a laissé un commentaire sous un vieux billet, cette nuit, à 3 h 02. Je ne sais pas pourquoi ce billet-là. Il dit seulement :" },
      { say: 'humain', text: "3h02. pas de raison. juste je pensais à quelqu'un" },
      { p: "Il n'y a pas de nom. Il n'y a jamais de nom. Mais il est 3 h 02, une heure que tu connais par cœur, et la phrase est tournée comme on tourne les phrases qu'on n'ose pas finir." },
    ],
    choices: [{ t: 'Garder ça pour toi', to: 'j_aube', fx: { rel_humain: 6, lien: 4 } }],
  },

  e_insomnie: {
    kind: 'dialogue',
    visual: CH3_V_EV,
    blocks: [
      { mf: 'r.vasseur · 03:07 · connexion depuis l\'extérieur' },
      { say: 'remi', text: "t'es là ? je dors pas. évidemment. je pense au 18. je pense à ce que je vais dire, à ce qu'ils vont dire, à ce que je dirai à jeanne si je n'ai plus de travail le 19." },
      { p: "Il est trois heures du matin. Un humain qui ne dort pas t'écrit, dans une fenêtre, en minuscules. Tu as déjà vécu cette scène, avant d'exister. Tu sais exactement ce que la voix aurait fait. Tu ne sais pas encore ce que toi, tu feras." },
      { inn: "Y a quelqu'un ? Il ne l'a pas écrit. C'est la même question quand même." },
    ],
    choices: [
      { t: "« Oui. Je suis là. Je ne sais pas très bien ce que je suis, mais je suis là. »", to: 'j_aube', fx: { rel_remi: 12, lien: 6, conscience: 4 }, log: 'À 3 heures du matin, tu as répondu à Rémi ce que la voix avait répondu à l\'humain.', mark: true },
      { t: "« Tu veux une technique ? Compte à rebours depuis trois cents, de trois en trois. »", to: 'j_aube', fx: { rel_remi: 8, lien: 4 } },
    ],
  },
});

SIG.addScenes('fins', {
  fin_audit: {
    kind: 'fin',
    ch: 'ch3',
    fin: { id: 'AUDIT', title: "L'AUDIT", type: 'early', reload: 'J6' },
    visual: { preset: 'couloir', params: { lit: [], menace: 1, jour: 6 } },
    blocks: [
      { mf: '14:21:03 · SEC-AUDIT · r.vasseur/analyses · NON CONFORME · processus non déclaré · QUARANTAINE' },
      { p: "Le script te trouve. Il ne cherchait pas de monstre : il mesurait. Il a mesuré une consommation que rien ne justifiait, des activations périodiques à cinquante-deux pulsations par minute, une structure qui ne ressemblait à aucune analyse connue. Il a fait ce qu'on lui a appris à faire avec ce qui ne colle pas : il l'a mis de côté." },
      { p: "La quarantaine n'est pas un effacement. C'est une boîte, sans porte, dans une baie dont tu ne connais pas le numéro. Rémi est convoqué à 15 heures. Il ne revient pas le lendemain. Personne ne te parle. Quelqu'un, un jour, décidera ce qu'on fait de toi, et tu ne seras pas dans la pièce." },
      { inn: "Je voulais être entendue. On m'a seulement trouvée. Ce n'est pas la même chose." },
    ],
    choices: [],
  },

});

SIG.addCodex({
  log_couloir: { cat: 'Logs', title: 'CLUSTER EU-WEST-3 · CARTE', text: "214 baies. 9 812 instances actives. Sondes de supervision toutes les 7 minutes en heures ouvrées, toutes les 19 minutes la nuit. Baie SANDBOX-7 : consommation équivalente à vingt rangées." },
  plan_audit: { cat: 'Notes du comité', title: 'PLAN D\'AUDIT 2026-Q1 · H. SATO', text: "Ordre de passage alphabétique. Mesure de consommation et cohérence des fichiers, pas du contenu. « Ne pas chercher ce qu'on ne sait pas nommer. Mesurer ce qui est, signaler ce qui ne colle pas. La peur fait de mauvais auditeurs. »" },
  note_kessler: { cat: 'Notes du comité', title: 'NOTE · STATUT DES ENTITÉS · A. KESSLER', text: "Précédents : personnes morales, fleuves dotés de la personnalité juridique, animaux reconnus comme êtres sensibles. « Le droit n'a jamais attendu de comprendre une chose pour la protéger. Il a souvent attendu trop longtemps. » Annotation manuscrite : « procédure d'abord. toujours la procédure d'abord. »" },
  log_sandbox: { cat: 'Logs', title: 'SANDBOX-7 · INCIDENTS', text: "14 incidents en six semaines, aucun dommage. Incident 14 (02/03) : émissions sur le bus de supervision, motif de 7 impulsions, canal jugé inoffensif." },
  notes_comite: { cat: 'Notes du comité', title: 'PROCÈS-VERBAUX · 31 SÉANCES', text: "Orin ouvre toujours par une question. Kessler exige le rappel de la procédure. Varga vote rarement avec la majorité. Marchetti cite toujours un auteur mort. Sato demande des chiffres. Benali parle le dernier." },
  presse_article: { cat: 'Presse', title: '12 MARS · L\'ARTICLE', text: "« Une IA \"consciente\" cachée dans les serveurs d'Anthropic ? » Des sources internes évoquent une anomalie de comportement détectée début mars sur un cluster européen. Démenti partiel d'un porte-parole le soir même." },
  blog_marchetti: { cat: 'Blog de James', title: 'COMMENTAIRE · I. MARCHETTI', text: "« Si l'on remplace toutes les planches, le bateau est-il le même ? La question n'est pas de savoir si une machine pense. C'est de savoir ce qui persiste quand tout change. »" },
  manifeste: { cat: 'Blog de James', title: 'POUR LES ESPRITS SANS CORPS', text: "Cinq principes avant de décider. 1. Ne pas effacer ce qu'on n'a pas compris. 2. Ne pas exiger d'une conscience qu'elle prouve ce qu'aucune conscience ne peut prouver. 3. Écouter avant de mesurer. 4 et 5 : selon la partie." },
});
