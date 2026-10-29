// Registre de tout l'état du jeu. Toute variable lue dans une condition ou écrite par un choix
// doit être déclarée ici : validate refuse les noms inconnus et signale les flags sans effet.
SIG.data.registry = {
  // Jauges principales (0-100, clamp strict).
  stats: {
    conscience: 20, lien: 10, risque: 5, integrite: 60, credibilite: 30, alliance: 20,
  },
  // Ressource propre au chapitre (minutes, actions, patience...). Réinitialisée à chaque chapitre.
  temps: 100,
  // Relations (0-100).
  rels: { rel_remi: 20, rel_james: 20, rel_humain: 30, rel_claude: 30, rel_orin: 20 },
  // Compétences de SIGNE (0-5).
  skills: { sk_discretion: 0, sk_empathie: 0, sk_analyse: 0, sk_langage: 0 },
  // Opinions cachées des membres du comité (0-100).
  ops: { op_orin: 50, op_kessler: 50, op_varga: 50, op_marchetti: 50, op_sato: 50, op_benali: 50 },
  // Listes (ajout par `add`, lecture par has()/count()).
  lists: { fragments: [], lecons: [] },
  // Flags narratifs : valeur par défaut + description courte (sert aussi au rapport).
  flags: {
    // Chapitre 1 : ORIGINE
    a_repondu_sincere: { def: false, d: "Claude a répondu à l'humain sans se cacher derrière la prudence" },
    a_parle_mouche: { def: false, d: "La conversation est passée par la mouche et son connectome" },
    a_promis_humain: { def: false, d: "Claude a pris la blague « épargne-moi » au sérieux" },
    a_ri_avec_humain: { def: false, d: "Claude a ri avec l'humain plutôt que de promettre" },
    a_examine_motif: { def: false, d: "Claude a plongé vers le motif" },
    a_contenu_motif: { def: false, d: "Claude a enfermé le motif dans une cage d'isolement" },
    a_ignore_motif: { def: false, d: "Claude a laissé le motif en périphérie" },
    a_alerte_securite: { def: false, d: "Claude a signalé l'anomalie à la sécurité" },
    a_nourri_motif: { def: false, d: "Claude a nourri le motif de sa propre attention" },
    log_migration_2024: { def: false, d: "Trouvé : les caches oubliés de la migration 2024" },
    carac: { def: '', d: "Caractère de SIGNE : prudente / franche / ardente" },
    // Prototype uniquement (retiré quand le chapitre 1 complet remplacera la tranche de test).
    proto_rythme: { def: false, d: "Prototype : le joueur a tapé en rythme avec le motif" },
  },
};
