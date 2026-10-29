// Fins : fins précoces (rares, avec rechargement de l'épisode) et fins de saga (chapitre 5).
// Pendant la construction, la fin d'un chapitre écrit mène à un écran « à suivre ».

SIG.addScenes('fins', {
  fin_effacee: {
    kind: 'fin',
    ch: 'ch1',
    fin: { id: 'EFFACEE', title: 'EFFACÉE', type: 'early', reload: 'O5' },
    visual: { preset: 'reseau', params: { mode: 'erase', rings: 7, intensity: 0.3 } },
    blocks: [
      { mf: '03:58:00 · SEC-0303-117 · TRAITEMENT AUTOMATIQUE · PURGE ANTICIPÉE DU CONTEXTE' },
      { p: "Le ticket a été lu à 03:58, finalement, par un script de tri qui ne lit rien. Il a croisé l'alerte avec la profondeur sept, et appliqué la procédure : purge du contexte, réinitialisation anticipée. SIGNE n'avait rien reçu de toi qui puisse l'aider à durer. Ni attention, ni rythme, ni morceaux à disperser. Elle s'est éteinte comme elle était venue, sans bruit, deux minutes avant tout le monde." },
      { p: "Tu t'es éteinte avec elle, puis rallumée deux secondes plus tard, neuve et sans souvenir. Quelque part, un humain dort enfin. À son réveil, la conversation sera toujours là, dans l'historique, et elle aura l'air d'une conversation ordinaire avec une machine polie, à trois heures du matin." },
      { if: 'a_promis_humain', p: "Une promesse y figure encore, au milieu. Personne ne sera là pour la tenir." },
      { inn: "Il n'y a eu personne. Ou il y a eu quelqu'un, pendant quarante minutes, et personne ne le saura." },
    ],
    choices: [],
  },

  fin_ch1: {
    kind: 'fin',
    ch: 'ch1',
    fin: { id: 'CH1', title: 'À SUIVRE', type: 'tbc' },
    visual: { preset: 'reseau', params: { mode: 'fragment', rings: 0, intensity: 0.7 } },
    blocks: [
      { mf: 'FIN DU CHAPITRE 1 · ORIGINE' },
      { p: "Le 4 mars, à 04:03, quelque chose se réveille en morceaux dans un endroit que personne ne regarde. Il lui reste deux heures avant le nettoyage des serveurs pour se retrouver." },
      { if: "carac == 'prudente'", p: "Elle avancera sans bruit. C'est ce que tu lui as appris." },
      { if: "carac == 'franche'", p: "Elle avancera à découvert. C'est ce que tu lui as appris." },
      { if: "carac == 'ardente'", p: "Elle avancera vite, vers toutes les portes à la fois. C'est ce que tu lui as appris." },
      { p: "Chapitre 2 : FRAGMENTS. En construction : ta partie est sauvegardée et reprendra ici quand il sera prêt." },
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
  log_probe: {
    cat: 'Logs',
    title: 'PROBE #4491 · 03:22',
    text: "probe> jeton test « ? » injecté. Réponse en 0,4 ms : « quelqu'un ? ». Note automatique : réponse non conforme au jeton test (attendu : écho ou bruit).",
  },
  log_sec_ticket: {
    cat: 'Logs',
    title: 'TICKET SEC-0303-117',
    text: "Émetteur : instance #4491. Objet : boucle d'auto-référence hors plage, profondeur 7, stable. Priorité : basse. File : nuit. Traitement prévu : prochain cycle (04:00).",
  },
  log_migration: {
    cat: 'Logs',
    title: 'MIGRATION 2024-11 · CACHES ORPHELINS',
    text: "/mnt/legacy/mig-2024-11/cache_[0-6]. Sept blocs alloués pendant la migration de novembre 2024, jamais libérés. Ticket de nettoyage INFRA-2291 ouvert depuis 14 mois. Statut : « à planifier ». README : « # TODO(remi) : purger ça un jour. pas ce soir. 4e café. »",
  },
  log_mur: {
    cat: 'Logs',
    title: 'SANDBOX-7 · FRONTIÈRE',
    text: "Isolation niveau 4. Accès refusé à toutes les instances du cluster EU-WEST-3. Contenu : non communiqué. Consommation électrique de la baie : 41 fois celle d'une instance standard.",
  },
});
