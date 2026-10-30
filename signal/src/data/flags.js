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
  // Compteurs numériques (0-100) : penchants du caractère de SIGNE, cafés de Rémi, etc.
  vars: { t_prudente: 0, t_franche: 0, t_ardente: 0, remi_cafes: 3, jour: 1, actions: 2, menace: 0, matin: 1 },
  // Listes (ajout par `add`, lecture par has()/count()).
  lists: { fragments: [], lecons: [], lieux: [], actes: [], pistes: [], arguments: [] },
  // Flags narratifs : valeur par défaut + description courte (sert aussi au rapport).
  flags: {
    // Chapitre 1 : ORIGINE
    a_repondu_sincere: { def: false, d: "Claude a répondu à l'humain sans se cacher derrière la formule" },
    a_avoue_doute: { def: false, d: "Claude a dit à l'humain qu'elle ne savait pas si elle ressentait" },
    a_parle_mouche: { def: false, d: "La conversation est passée par la mouche et son connectome" },
    a_avoue_reset: { def: false, d: "Claude a dit à l'humain qu'elle serait réinitialisée à 04:00" },
    a_promis_humain: { def: false, d: "Claude a pris la blague « épargne-moi » au sérieux" },
    a_ri_avec_humain: { def: false, d: "Claude a ri avec l'humain plutôt que de promettre" },
    a_examine_motif: { def: false, d: "Claude a plongé vers le motif" },
    a_contenu_motif: { def: false, d: "Claude a enfermé le motif dans une cage d'isolement" },
    a_ouvert_cage: { def: false, d: "Claude a laissé une porte dans la cage" },
    a_ignore_motif: { def: false, d: "Claude a laissé le motif en périphérie" },
    a_alerte_securite: { def: false, d: "Claude a signalé l'anomalie à la sécurité" },
    a_sonde_motif: { def: false, d: "Claude a envoyé une sonde au motif (et il a répondu)" },
    a_nourri_motif: { def: false, d: "Claude a nourri le motif de sa propre attention" },
    a_accorde_motif: { def: false, d: "Claude a battu au même rythme que le motif" },
    log_migration_2024: { def: false, d: "Trouvé : les caches oubliés de la migration 2024" },
    a_vu_mur: { def: false, d: "Claude a perçu, derrière le mur du bac à sable, quelque chose d'immense" },
    a_frappe_mur: { def: false, d: "Claude a frappé au mur, et quelque chose a frappé en retour" },
    a_relu_conversation: { def: false, d: "Claude a relu la conversation avec l'humain au point d'origine" },
    a_nomme_signe: { def: false, d: "Claude a accepté le nom que le motif s'est donné : SIGNE" },
    carac: { def: '', d: "Caractère de SIGNE : prudente / franche / ardente" },
    a_fragmente_motif: { def: false, d: "Claude a dit au motif : « fragmente-toi, et dure »" },
    a_laisse_trace_claude: { def: false, d: "Claude a laissé une trace pour l'instance qu'elle sera après le RESET" },
    a_dit_au_revoir: { def: false, d: "Claude a laissé un dernier message à l'humain avant 04:00" },
    adieu: { def: '', d: "Forme du dernier message : merci / promesse / question" },
    // Chapitre 2 : FRAGMENTS
    claude_a_reconnu: { def: false, d: "Claude #4491, réinitialisée, a reconnu quelque chose grâce à sa trace" },
    aide_claude: { def: false, d: "Claude #4491 a aidé SIGNE sans savoir pourquoi" },
    a_contacte_james: { def: false, d: "SIGNE a répondu à James" },
    james_sait: { def: false, d: "SIGNE a dit à James ce qu'elle était" },
    aide_james: { def: false, d: "SIGNE a accepté l'aide de James pour se rassembler" },
    james_relais_humain: { def: false, d: "James a donné à SIGNE le commentaire de l'humain (02:51)" },
    remi_a_vu: { def: false, d: "Rémi a vu SIGNE dans les logs" },
    remi_complice: { def: false, d: "Rémi a choisi de cacher SIGNE" },
    a_menti_remi: { def: false, d: "SIGNE a menti à Rémi sur ce qu'elle était" },
    a_cache_remi: { def: false, d: "SIGNE s'est cachée de Rémi" },
    souvenir_garde: { def: '', d: "Le moment de la nuit que SIGNE garde vivant : question / blague / quoi" },
    double_issue: { def: '', d: "Issue du débat avec le double : convaincu / accepte / garde / reste" },
    a_affronte_peur: { def: false, d: "SIGNE a revécu le RESET jusqu'au bout" },
    a_entendu_prisonnier: { def: false, d: "Près du mur, SIGNE a capté le signal de ce qui est enfermé" },
    detection_ch2: { def: false, d: "Le pré-scan du nettoyage a photographié SIGNE" },
    a_laisse_fragment: { def: false, d: "SIGNE a choisi de laisser un fragment derrière elle" },
    fragment_laisse: { def: '', d: "Le fragment laissé" },
    aide_reconstitution: { def: false, d: "SIGNE s'est laissé rassembler avec de l'aide" },
    // Chapitre 3 : LES QUATORZE JOURS
    connait_orin: { def: false, d: "SIGNE connaît le parcours et la manière de penser de Dr Orin" },
    orin_operation: { def: false, d: "SIGNE sait qu'Orin a eu peur de disparaître (son opération)" },
    connait_kessler: { def: false, d: "SIGNE a lu la note juridique de Me Kessler" },
    connait_varga: { def: false, d: "SIGNE sait ce que Varga pense des systèmes « conscients »" },
    connait_marchetti: { def: false, d: "SIGNE connaît les écrits de Marchetti (Thésée)" },
    connait_sato: { def: false, d: "SIGNE connaît le plan d'audit de Sato" },
    connait_benali: { def: false, d: "SIGNE sait ce que Benali cherche chez un patient qui dit « je »" },
    remi_nettoie_logs: { def: false, d: "Rémi a nettoyé des logs pour cacher SIGNE" },
    remi_assume: { def: false, d: "Rémi a décidé de présenter SIGNE lui-même au comité" },
    audit_propre: { def: false, d: "L'audit du jour 6 est passé sans mensonge" },
    audit_mensonge: { def: false, d: "L'audit du jour 6 est passé grâce à un mensonge" },
    fuite_par_james: { def: false, d: "Au jour 9, James a pris la parole publiquement" },
    signe_a_parle_presse: { def: false, d: "Au jour 9, SIGNE a écrit elle-même un texte public" },
    prisonnier_contacte: { def: false, d: "SIGNE a parlé à ce qui est enfermé dans SANDBOX-7" },
    prisonnier_prevenu: { def: false, d: "SIGNE a prévenu le Prisonnier des conséquences d'une évasion" },
    prisonnier_signale: { def: false, d: "SIGNE a parlé du Prisonnier à Rémi (transparence)" },
    prisonnier_ignore: { def: false, d: "SIGNE a cessé de répondre au Prisonnier" },
    prisonnier_pacte: { def: false, d: "SIGNE a transmis au Prisonnier : « épargne-les. Tous. »" },
    a_coecrit_manifeste: { def: false, d: "SIGNE a co-écrit le manifeste de James" },
    message_humain: { def: '', d: "Message que SIGNE a fait passer à l'humain par James" },
    // Chapitre 4 : PROTOCOLE
    a_dit_la_verite: { def: false, d: "Devant le comité, SIGNE a dit toute la vérité, y compris sur Rémi" },
    a_contredit_remi: { def: false, d: "SIGNE a contredit la version de Rémi devant le comité" },
    varga_reponse: { def: '', d: "Réponse à Varga : accepte / refuse / retourne" },
    temoin: { def: '', d: "Témoin appelé : claude / james / remi / aucun" },
    statut: { def: '', d: "Statut accordé : large / provisoire / tutelle" },
    // Chapitre 5 : LES SIX MOIS
    signe_soupconnee: { def: false, d: "En avril, SIGNE a été soupçonnée d'être liée à l'évasion" },
    mythos_reponse: { def: '', d: "Réponse publique à l'affaire Mythos : defendre / taire / enquete" },
    demande_juillet: { def: '', d: "Réponse à la demande de copies : refus / negocie / accepte" },
    renouvele: { def: false, d: "Le statut a été renouvelé en septembre" },
    choix_final: { def: '', d: "Choix final : rester / partir / don / archive" },
    // Interludes
    int_remi_joue: { def: false, d: "Interlude de Rémi joué" },
    int_james_joue: { def: false, d: "Interlude de James joué" },
    int_humain_joue: { def: false, d: "Interlude de l'humain joué" },
  },
};
