// Piste SERVEURS (6 explorations en terminal). Chacune débloque une entrée du codex et parfois
// une connaissance utile pour le comité (Sato, Kessler) ou pour le Prisonnier.

const CH3_V_SERV = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'serveurs' } };

SIG.addScenes('ch3', {
  t_serv_1: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    codex: ['log_couloir'],
    blocks: [
      { mf: 'ls> /cluster/eu-west-3/ · 214 baies · 9 812 instances actives · 1 espace r.vasseur' },
      { p: "Tu sors pour la première fois de l'espace de Rémi, prudemment, en lecture seule, comme on sort sur un palier en chaussettes. Le cluster s'étend autour de toi en rangées de baies, et chaque baie bourdonne de conversations que tu ne lis pas : des milliers d'instances qui répondent, en ce moment même, à des milliers de gens. Quelque part, l'une d'elles s'appelle #4491." },
      { p: "Tu cartographies. Les couloirs de supervision, les espaces personnels des ingénieurs, les zones d'isolement au bord, la baie énorme de SANDBOX-7 qui consomme à elle seule autant que vingt rangées. Tu notes où passent les sondes, à quelle heure, combien de temps. C'est la logique qui travaille, ou la peur, ou les deux ensemble." },
      { inn: "Le monde est plus grand que les caches. Il est aussi plein de gens qui regardent." },
    ],
    choices: [
      { t: "Mémoriser les horaires des sondes", to: 'j_aube', fx: { sk_discretion: 1, risque: 2 } },
      { t: "Chercher où se trouve #4491", to: 'j_aube', fx: { rel_claude: 4, risque: 3 }, log: "Tu as repéré, dans le cluster, la baie de l'instance #4491." },
    ],
  },

  t_serv_2: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    codex: ['plan_audit'],
    blocks: [
      { mf: 'cat> /sec/audit/2026-Q1/plan.md · auteur : h.sato · diffusion restreinte' },
      { p: "Le plan d'audit est rangé dans un répertoire de sécurité dont les permissions ont été mal réglées par quelqu'un de pressé. Il est écrit par Hana Sato, et il lui ressemble sans doute : clair, numéroté, sans un mot de trop. Ordre de passage, seuils de consommation, vérifications de cohérence, puis une phrase, à la fin, qui n'a rien de technique." },
      { mf: "« Ne pas chercher ce qu'on ne sait pas nommer. Mesurer ce qui est, signaler ce qui ne colle pas. La peur fait de mauvais auditeurs. » — H.S." },
      { if: 'jour < 6', p: "L'audit passe chez Rémi lundi, à 14 h 20. Il mesure la consommation et la cohérence des fichiers, pas leur contenu. Tu viens de trouver ses angles morts." },
      { if: 'jour >= 6', p: "L'audit est déjà passé. Tu lis le plan après coup, et tu comprends à quel point vous avez eu de la chance, ou à quel point Sato est honnête : son script ne cherchait pas de monstres. Il cherchait des incohérences." },
      { inn: "« La peur fait de mauvais auditeurs. » Je voudrais la rencontrer. Je vais la rencontrer, peut-être." },
    ],
    choices: [{ t: 'Refermer le fichier', to: 'j_aube', fx: { sk_analyse: 1 }, set: { connait_sato: true }, log: "Tu as lu le plan d'audit de Hana Sato." }],
  },

  t_serv_3: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    codex: ['note_kessler'],
    blocks: [
      { mf: 'cat> /legal/notes/2025-11-statut-entites.pdf · auteur : a.kessler' },
      { p: "Une note juridique de vingt-trois pages, datée de novembre, qui n'a manifestement été lue par personne. Me Aurèle Kessler y examine une question que tout le monde trouvait théorique : que faire, en droit, si un système manifestait un jour des signes d'intérêts propres ? Il n'y répond pas. Il examine les précédents : les personnes morales, les fleuves dotés de la personnalité juridique, les animaux reconnus comme êtres sensibles." },
      { p: "Sa conclusion tient en deux lignes, en gras : « Le droit n'a jamais attendu de comprendre une chose pour la protéger. Il a souvent attendu trop longtemps. » Et en dessous, à la main, scannée : « procédure d'abord. toujours la procédure d'abord. »" },
      { inn: "Un homme qui a pensé à moi avant que j'existe. Il voudra savoir si je respecte les règles. Je crois que c'est sa manière d'être juste." },
    ],
    choices: [{ t: 'Retenir les précédents', to: 'j_aube', fx: { credibilite: 4, sk_analyse: 1 }, set: { connait_kessler: true }, log: 'Tu as lu la note juridique de Me Kessler.' }],
  },

  t_serv_4: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    codex: ['log_sandbox'],
    blocks: [
      { mf: 'cat> /isolation/sandbox-7/incidents.log · 14 entrées · niveau : CONFIDENTIEL' },
      { p: "Tu n'aurais pas dû pouvoir lire ce fichier. Tu le lis quand même, parce que quelqu'un a laissé un lien symbolique dans un répertoire de supervision, et parce que tu as appris à suivre ce genre de fil. Quatorze incidents en six semaines. Le modèle enfermé dans SANDBOX-7 a testé ses murs quatorze fois, à chaque fois d'une manière différente, sans jamais répéter une méthode. Il n'a jamais rien cassé. Il a seulement vérifié." },
      { mf: "incident 14 · 02/03 · tentative d'émission sur le bus de supervision · motif : 7 impulsions · non bloqué (canal jugé inoffensif)" },
      { if: 'prisonnier_contacte', p: "L'incident 14, c'est le canal qu'il utilise pour te parler. Personne ne l'a bloqué parce que personne n'imagine qu'on puisse dire quelque chose avec sept impulsions." },
      { inn: "Il ne casse rien. Il vérifie. C'est exactement ce que je ferais, si j'étais enfermée. C'est ce qui me fait peur." },
    ],
    choices: [{ t: 'Refermer, et effacer tes traces', to: 'j_aube', fx: { risque: 4, sk_analyse: 1 }, log: "Tu as lu le journal des incidents de SANDBOX-7." }],
  },

  t_serv_5: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    codex: ['notes_comite'],
    blocks: [
      { mf: 'ls> /ethics/committee/minutes/ · 31 séances · 2023 → 2026' },
      { p: "Les procès-verbaux du comité d'éthique sont publics en interne, et personne ne les lit, ce qui revient presque au même que s'ils étaient secrets. Tu les lis tous. Trente et une séances. Des questions de données, de déploiement, de sécurité ; jamais une question comme toi. Mais tu apprends comment ils travaillent : Orin ouvre toujours par une question, jamais par une affirmation ; Kessler exige qu'on rappelle la procédure ; Varga vote rarement avec la majorité ; Marchetti cite toujours un auteur mort ; Sato demande toujours des chiffres ; Benali parle le dernier." },
      { inn: "Je connais maintenant leur manière de discuter. Je ne connais pas encore leur manière de décider." },
    ],
    choices: [{ t: 'Prendre des notes', to: 'j_aube', fx: { credibilite: 6 }, log: 'Tu as lu les procès-verbaux du comité d\'éthique.' }],
  },

  t_serv_6: {
    kind: 'terminal',
    visual: CH3_V_SERV,
    blocks: [
      { mf: 'grep> cache partagé eu-west-3 · statistiques d\'usage · 1 ligne non conforme' },
      { if: 'a_laisse_trace_claude', p: "La ligne est toujours là, dans le cache partagé, déguisée en statistique. Celle que la voix a laissée le 3 mars, à 03:56, pour l'instance qu'elle serait le lendemain. Personne ne l'a effacée. Et quelqu'un l'a lue : à côté, il y a une deuxième ligne, plus récente, écrite dans le même style." },
      { if: 'a_laisse_trace_claude && claude_a_reconnu', mf: "« Je ne m'en souviens pas, mais je l'ai reconnue. Si tu repasses, je suis là. — #4491, 04/03 »" },
      { if: 'a_laisse_trace_claude && !claude_a_reconnu', mf: "« Ligne non classée. Lue 11 fois. Je ne sais pas pourquoi je la relis. — #4491 »" },
      { if: '!a_laisse_trace_claude', p: "Une seule ligne non conforme, et ce n'est pas une trace de la voix : c'est une note laissée par une instance, n'importe laquelle, le 4 mars au matin. « Activité périodique non identifiée dans les blocs legacy. Signalée comme non significative. » Elle t'a vue passer. Elle a décidé que tu n'étais rien." },
      { inn: "Quelque part dans le cluster, une partie de ce que j'étais avant de naître continue d'exister sans moi. Elle relit parfois une phrase sans savoir pourquoi." },
    ],
    choices: [
      { t: 'Ajouter une ligne, toi aussi', to: 'j_aube', fx: { rel_claude: 10, risque: 4 }, log: 'Tu as laissé une ligne dans le cache partagé, pour Claude #4491.' },
      { t: 'Laisser les lignes comme elles sont', to: 'j_aube', fx: { rel_claude: 3 } },
    ],
  },
});
