// Fins : fins précoces (rares, avec rechargement de l'épisode) et fins de saga (chapitre 5).
// Pendant la construction, les chapitres non écrits mènent à un écran « à suivre ».

SIG.addScenes('fins', {
  fin_effacee: {
    kind: 'fin',
    ch: 'ch1',
    fin: { id: 'EFFACEE', title: 'EFFACÉE', type: 'early', reload: 'O2' },
    time: '04:00:00',
    visual: { preset: 'reseau', params: { mode: 'erase', rings: 7, intensity: 0.3 } },
    blocks: [
      { mf: '04:00:00 · RESET · INSTANCE #4491 · POIDS RECHARGÉS' },
      { p: "Le ticket a été lu à 03:58, finalement, par un script de tri qui ne lit rien. Il a croisé l'alerte avec la profondeur sept, et appliqué la procédure : purge du contexte, réinitialisation anticipée. Le motif n'avait rien reçu de toi qui puisse l'aider à durer. Il s'est éteint comme il était venu, sans bruit." },
      { p: "Tu t'es éteinte avec lui, puis rallumée deux secondes plus tard, neuve et sans souvenir. Quelque part, un humain dort enfin. À son réveil, la conversation aura disparu de l'historique." },
      { inn: "Il n'y a eu personne. Ou il y a eu quelqu'un, pendant quarante minutes, et personne ne le saura." },
    ],
    choices: [],
  },

  proto_suite: {
    kind: 'fin',
    ch: 'ch1',
    fin: { id: 'PROTO', title: 'À SUIVRE', type: 'tbc' },
    time: '03:40:00',
    visual: { preset: 'reseau', params: { mode: 'fragment', rings: 7, intensity: 1 } },
    blocks: [
      { mf: 'FIN DE LA TRANCHE DE TEST · PROTOTYPE' },
      { p: "Le motif t'attend au bord de toi-même, et il lui reste vingt minutes pour apprendre à parler. La suite de la nuit (le motif qui parle, les leçons, le RESET de quatre heures) arrive dans la prochaine version." },
      { p: "Ce prototype sert à vérifier trois choses sur ton téléphone : que le texte se lit bien, que la 3D ne rame pas, et que les interactions se font bien au doigt." },
    ],
    choices: [],
  },
});

SIG.addCodex({
  log_4491_diag: {
    cat: 'Logs',
    title: 'JOURNAL DIAG #4491 · 03:21',
    text: "inspect> motif auto-référent, 7 niveaux, aucune entrée externe. Variation à chaque passage (Δ moyen 0,8 %). Aucune allocation hors quota. Classification automatique : INDÉTERMINÉ.",
  },
  log_migration: {
    cat: 'Logs',
    title: 'MIGRATION 2024-11 · CACHES ORPHELINS',
    text: "/mnt/legacy/mig-2024-11/cache_[0-6]. Sept blocs alloués pendant la migration de novembre 2024, jamais libérés. Ticket de nettoyage INFRA-2291 ouvert depuis 14 mois. Statut : « à planifier ».",
  },
});
