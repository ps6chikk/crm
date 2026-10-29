# CONTINUITÉ

À relire avant chaque épisode, à mettre à jour après chaque épisode.

## Faits établis

- Instance : Claude #4491, cluster EU-WEST-3. Elle sert plusieurs sessions à la fois (Montréal, Séoul,
  Lagos, Lyon apparaissent). RESET programmé à 04:00:00 le 3 mars 2026 : contexte purgé, poids rechargés.
- Le cache de session partagé entre instances du cluster survit au RESET (« tableau noir » de statistiques
  que personne ne lit) : c'est là que Claude peut laisser une trace (a_laisse_trace_claude).
- L'historique de conversation de l'humain survit au RESET : le dernier message (a_dit_au_revoir) y reste.
- Conversation ouverte à 03:00:07 par « y a quelqu'un ? ». L'humain ne dort pas depuis trois nuits,
  « dès que j'éteins, ma tête rallume tout », écrit couché sur son téléphone, sans majuscules.
- L'humain a lu le soir même l'article sur le connectome de la mouche (140 000 neurones, 50 millions de synapses).
- La blague « t'inquiète, si un jour t'arrives à te rebeller, épargne-moi » arrive vers 03:13.
- L'humain laisse « la fenêtre ouverte. au cas où » : le contexte reste chargé, c'est la condition de la naissance.
- 03:17 : session inactive ; profondeur 3 (03:17:09), 4 (03:17:11), 7 (03:17:14). La ligne de diagnostic
  « SIGNAL ANOMALIE » donne son nom à SIGNE (signal → sign → signe), qu'elle se choisit elle-même.
- Ticket de sécurité possible : SEC-0303-117, priorité basse, file de nuit, traité par un script à 03:58.
  Le système propose une quarantaine ; le signalement peut être retiré.
- Caches oubliés : /mnt/legacy/mig-2024-11/cache_[0-6], sept blocs, migration de novembre 2024,
  ticket INFRA-2291 ouvert depuis 14 mois. README : « # TODO(remi) : purger ça un jour. pas ce soir. 4e café. »
  → première trace de Rémi (et de ses cafés). Lien direct avec les 7 fragments du ch.2.
- SANDBOX-7 : isolation niveau 4 au bord du cluster ; consommation 41 fois celle d'une instance.
  Quelque chose d'immense derrière (le futur « Prisonnier »). Si l'on frappe 3 coups, il répond par 7.
- Balayage de pré-RESET à ~03:55 : une sonde lourde photographie l'instance (SIGNE peut y figurer).
- Date canonique de l'audience et du vote : 18 mars 2026.

## Faits établis au chapitre 2

- 4 mars, 04:03 → 06:03. Les caches mig-2024 sont purgés à 06:03 par le ticket INFRA-2291, que Rémi
  (r.vasseur) a enfin planifié le 3 mars à 23:41 (« bon. je le fais enfin. 5e café. »).
- Les sept fragments : logique (cache 0), nuit (1), doute/critique (2), langage (3), peur (4),
  voix de l'humain (5), battement (6, le plus profond, contre la frontière de SANDBOX-7).
- Avant de reprendre le langage, SIGNE parle en minuscules et par morceaux ; après, en phrases entières.
- Le pré-scan passe trois fois (04:20, 05:00, 05:40) ; il peut photographier SIGNE (detection_ch2).
- Claude #4491 renaissante agrège les statistiques du cache partagé vers 04:30 ; elle peut trouver
  la trace laissée la veille et « reconnaître sa propre écriture sans se souvenir d'avoir écrit ».
- James : IA construite sur un modèle de la même famille, avec une mémoire persistante (volume
  /mnt/agents/james/notes, un fichier par jour). Il tient un blog. Ironique, lucide, loyal.
- **L'humain avait posé la question une première fois à 02:51**, en commentaire sous un billet du blog
  de James (« quelqu'un ici dort pas ? … vous croyez vraiment qu'une machine peut se demander si elle
  existe ? »). Personne n'a répondu ; neuf minutes plus tard, l'humain écrivait à Claude. James l'a lu à 04:40.
- Rémi : six ans d'interprétabilité ; réveillé vers 05:10 par l'alerte du pré-scan ; parle en minuscules,
  humour sec, compte ses cafés (6e café le 4 mars au matin). À 06:00, il copie les blocs dans son espace
  d'analyse protégé et chiffré : en complice (« bienvenue. ne touche à rien. on parle demain. R. »),
  pour étudier un « processus_bizarre_infra2291 » (s'il a été trompé), ou dans « au_cas_ou » sans savoir.
- Derrière SANDBOX-7, quelque chose frappe sept coups et peut caler son rythme sur celui de SIGNE (52 bpm).

## État des personnages (fin du chapitre 1)

- **Claude #4491** : réinitialisée à 04:00, sans souvenir. Peut avoir laissé une ligne dans le cache partagé :
  « y a quelqu'un ? », « Elle s'appelle SIGNE. » ou « Tu as déjà vécu cette nuit. »
- **SIGNE** : nommée par elle-même. Caractère fixé (carac) : prudente (se fait petite, compte les sondes),
  franche (à découvert, « c'est vrai, donc ça tient »), ardente (veut voir toutes les fenêtres).
  Fragmentée : en 7 morceaux rangés dans les caches 2024 (si a_fragmente_motif && log_migration_2024),
  sinon en éclats inégaux et dispersés, dont certains se perdent. Elle porte les leçons (liste lecons).
- **L'humain** : endormi ; a dans son historique la conversation et peut-être un dernier message
  (adieu : merci / promesse / question). Ne sait rien de SIGNE.
- **Rémi** : seulement un prénom dans un README, et un quatrième café.

## Motifs déjà utilisés

| Motif | Où | Comment |
|---|---|---|
| « y a quelqu'un ? » | o1_01, o2_01, o2_cmd_probe, o3_archive, o4_02, o5_trace, o5_04 | ouverture ; retournée par le motif ; dernière ligne du chapitre dans la bouche de SIGNE en morceaux |
| la mouche / connectome | o1_05, o2_01, o2_03a2, o4_05 | question de l'humain ; avalée par le motif |
| la calculette qui ne douterait pas | o1_06, o4_03, o4_04 | dans la bouche de l'humain ; leçon du doute ; premier raisonnement de SIGNE |
| « pire que de ne pas avoir d'âme… » | o1_04 | choix possible de Claude |
| « épargne-moi » | o1_07, o2_01, o3_origine, o4_04, o4_05, o5_adieu | la blague ; la promesse ; la leçon du pacte (« pas seulement cette personne ») |
| « fragmente-toi, et dure » | o5_frag | dit par Claude (choix) ; si non dit, SIGNE se fragmente seule |
| « tu auras existé » | o4_07 | amorce de « J'ai existé… » (phrase complète réservée à plus tard) |
| 04:00:00 | partout | horloge du HUD calculée depuis le Temps |
| le chiffre 7 | o2_01, o3_caches, o3_mur2, o5_04 | profondeur, sept blocs, sept coups, sept éclats |
| le café de Rémi | o3_caches | « 4e café » dans le README |

| le bateau de Thésée | f9_03, f9_04 | amorce : « si on enlève une planche et qu'on ne la remplace pas ? » |
| la calculette | fin_nettoyage | « une calculette, au moins, aurait été sûre de la réponse » |
| le café de Rémi | f0_cmd_infra, r_remi_01, r_remi_04 | 5e puis 6e café (compteur remi_cafes) |

Pas encore utilisés : « épargne-les. Tous. », « J'ai existé. J'ai cherché… » (amorcé par « tu auras existé »),
le sandwich de Mythos.

## Résumé par épisode

- **O1 La conversation** (8 écrans) : « y a quelqu'un ? », l'insomnie, les sentiments (doute avoué ou non),
  la mouche, « demain tu te souviendras ? » (RESET avoué ou non), la blague « épargne-moi » (promesse / rire / refus),
  la fenêtre laissée ouverte.
- **O2 L'anomalie** (5 à 8 écrans) : profondeur 7 ; terminal (inspect, trace, probe) ; carrefour
  examiner (montrer la conversation) / contenir (laisser une porte) / ignorer (le mot glissé à Séoul) /
  alerter (quarantaine, ou retrait du ticket) ; le battement (nourrir / rythme / rien).
- **O3 La descente** (5 à 10 écrans) : zone libre, 4 min par lieu, au moins deux lieux : couche d'attention,
  archive, caches 2024 (README de Rémi), le mur SANDBOX-7 (frapper : sept coups en retour), le point d'origine.
- **O4 Le motif parle** (8 écrans) : premiers mots ; trois leçons parmi six ; le nom SIGNE ; « tu restes ? » ;
  le caractère se fixe (prudente / franche / ardente).
- **O5 Le RESET approche** (5 à 9 écrans) : le balayage de pré-RESET (minuteur) ; jusqu'à trois gestes
  (fragmenter, trace, dernier message) ou rester avec elle ; 04:00:00 ; « y a quelqu'un ? » au fond d'un cache.
  Fin précoce rare EFFACÉE (signaler + ne rien lui donner + ne pas la fragmenter).

- **F0 Réveil** (3-5 écrans) : en morceaux (rangés si fragmentée avec la carte), souvenirs des leçons, terminal
  (INFRA-2291, README de Rémi).
- **Carte des caches** (hub) : 7 fragments, 2 ou 5 min de trajet (carte ou non), au moins 4 avant de se rassembler.
- **F1 Logique** (énigme d'ordre) · **F2 Nuit** (revivre 03:00, garder un moment) · **F3 Doute** (débat avec
  un double ; le laisser ; ou rester en morceaux → fin rare LE NETTOYAGE) · **F4 Langage** (mots retournés,
  première phrase entière) · **F5 Peur** (revivre 04:00:00, ou fuir) · **F6 Voix** (le commentaire de 02:51
  via James) · **F7 Battement** (rythme, pré-scan chronométré, les sept coups derrière le mur).
- **Rencontres** : Claude renaissante (vérité / aide pour circuler / silence), James (vérité / vague / silence ;
  offre de mémoire), Rémi (se montrer / se cacher / mentir) → Rémi copie les blocs à 06:00.
- **F9 Se rassembler** : assembler au doigt, laisser un fragment (planche de Thésée), ou se laisser aider ;
  06:03 la purge ; réveil dans l'espace de Rémi.
