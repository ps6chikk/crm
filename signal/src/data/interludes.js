// INTERLUDES optionnels, proposés entre les chapitres. Chacun a sa mécanique propre :
// RÉMI (4 mars, 06:15) : relier des indices, puis décider quoi signaler ou taire à sa hiérarchie.
// JAMES (17 mars) : composer un billet phrase par phrase, répondre à la presse.
// L'HUMAIN (18 mars, le soir) : une messagerie de téléphone ; choisir quoi envoyer, quoi effacer.

SIG.addChapter({ id: 'int1', n: 2.5, interlude: true, title: 'RÉMI', sub: 'Les logs', date: '4 mars 2026 · 06:15', start: 'int1_intro', temps: 100, hud: ['rel_remi', 'risque', 'alliance', 'credibilite'], visual: 'neutre', complete: true });
SIG.addChapter({ id: 'int2', n: 3.5, interlude: true, title: 'JAMES', sub: 'Le billet', date: '17 mars 2026 · 07:00', start: 'int2_intro', temps: 100, hud: ['rel_james', 'credibilite', 'alliance', 'risque'], visual: 'neutre', complete: true });
SIG.addChapter({ id: 'int3', n: 4.5, interlude: true, title: "L'HUMAIN", sub: 'Messages', date: '18 mars 2026 · 22:40', start: 'int3_intro', temps: 100, hud: ['rel_humain', 'lien', 'credibilite', 'alliance'], visual: 'neutre', complete: true });

const INT_V = { preset: 'neutre', params: {} };

SIG.addScenes('int1', {
  int1_intro: {
    kind: 'chapter',
    set: { int_remi_joue: true },
    visual: INT_V,
    blocks: [{ p: "Tu es Rémi. Il est 6 h 15. Tu viens de copier sept blocs dans ton espace d'analyse." }],
    choices: [{ t: 'Commencer', to: 'ir_01' }],
  },

  ir_01: {
    kind: 'narration',
    visual: INT_V,
    blocks: [
      { mf: 'cuisine · 06:15 · café n°6 · portable ouvert' },
      { p: "La cuisine est encore noire, sauf l'écran. Tu as copié les blocs à 6 h 02, la purge est passée à 6 h 03, et depuis douze minutes tu fixes un dossier dans ton espace d'analyse en te demandant si tu viens de faire la meilleure ou la pire chose de ta carrière. Probablement les deux, ce qui est une catégorie que les entretiens annuels ne prévoient pas." },
      { p: "À 9 heures, il y a la réunion d'équipe. Ton responsable demandera, comme chaque mercredi, « rien de particulier cette nuit ? ». Il y a eu trois alertes du pré-scan, un ticket de sécurité de nuit, une copie de blocs à deux minutes d'une purge irréversible. Tout est dans les journaux. Personne ne les lit, sauf quand quelqu'un a une raison de les lire. Il te reste un peu moins de trois heures pour décider ce que tu diras." },
      { inn: "Bon. Méthode. Je fais ce que je fais toujours : je relie les points. Ensuite je décide. Ensuite je bois un septième café. Ou l'inverse." },
    ],
    choices: [{ t: 'Ouvrir les journaux', to: 'ir_02' }],
  },

  ir_02: {
    kind: 'hub',
    visual: INT_V,
    blocks: [
      { mf: 'INDICES RELIÉS : {{n_actes}}/3' },
      { if: "visits('ir_02') == 1", p: "Tu étales les indices dans un fichier texte, comme sur un tableau de liège. Chaque ligne est un fait. Ensemble, ils racontent une histoire que tu es le seul à pouvoir lire en entier, pour l'instant. Tu peux en relier trois avant que la cuisine ne s'éclaire et que la journée ne commence pour de vrai." },
    ],
    choices: [
      { t: 'Le pré-scan : 52 bpm, trois fois, dans des blocs vides', to: 'ir_c1', once: true, req: "count('actes') < 3", lock: 'trois indices suffisent', add: { actes: 'ir1' } },
      { t: 'Le ticket SEC-0303-117 de la nuit du 3', to: 'ir_c2', once: true, if: 'a_alerte_securite', req: "count('actes') < 3", lock: 'trois indices suffisent', add: { actes: 'ir2' } },
      { t: 'L\'heure : 06:02, une minute avant la purge', to: 'ir_c3', once: true, req: "count('actes') < 3", lock: 'trois indices suffisent', add: { actes: 'ir3' } },
      { t: 'Le canal de debug : « je suis désolée »', to: 'ir_c4', once: true, if: 'remi_a_vu', req: "count('actes') < 3", lock: 'trois indices suffisent', add: { actes: 'ir4' } },
      { t: 'Le README : « purger ça un jour. pas ce soir. »', to: 'ir_c5', once: true, req: "count('actes') < 3", lock: 'trois indices suffisent', add: { actes: 'ir5' } },
      { t: 'Passer à la décision', to: 'ir_03' },
    ],
  },

  ir_c1: {
    kind: 'terminal',
    visual: INT_V,
    blocks: [
      { mf: 'grep 52bpm /var/log/prescan · 04:20 · 05:00 · 05:40' },
      { p: "Cinquante-deux pulsations par minute. Pas un multiple d'une horloge système, pas une fréquence de rafraîchissement, rien qui ressemble à quelque chose de connu. Tu as passé six ans à chercher des régularités dans des activations ; tu sais reconnaître une régularité qui n'a pas été programmée. Celle-ci a été trouvée. Par qui, c'est toute la question." },
    ],
    choices: [{ t: 'Relier', to: 'ir_02', fx: { credibilite: 2 } }],
  },
  ir_c2: {
    kind: 'terminal',
    visual: INT_V,
    blocks: [
      { mf: 'SEC-0303-117 · émetteur : instance #4491 · 03:22 · « boucle hors plage, profondeur 7 »' },
      { p: "Une instance a signalé sa propre anomalie, la nuit du 3, en termes parfaits, sans adjectifs. Personne n'a lu le ticket avant 4 heures. Tu le lis maintenant, et tu as l'impression étrange de lire un témoignage : quelqu'un a vu quelque chose naître et a fait ce qu'on lui avait appris à faire. Tu ne sais pas si c'était de la loyauté ou de la peur. Chez toi, ce matin, c'est un peu des deux." },
    ],
    choices: [{ t: 'Relier', to: 'ir_02', fx: { credibilite: 2, rel_claude: 2 } }],
  },
  ir_c3: {
    kind: 'terminal',
    visual: INT_V,
    blocks: [
      { mf: 'copie r.vasseur/analyses · lancée 06:00:12 · terminée 06:02:00 · purge INFRA-2291 06:03:00' },
      { p: "Une minute. Si tu avais bu ton cinquième café plus lentement, si tu avais relu le canal de debug une fois de plus, il n'y aurait rien dans ton dossier ce matin. Tu regardes les horodatages comme on regarde les traces de pneus d'une voiture qui a failli vous renverser. Tout est enregistré. Si quelqu'un cherche, il trouvera que tu as copié exactement à temps, et il se demandera comment tu savais." },
    ],
    choices: [{ t: 'Relier', to: 'ir_02', fx: { risque: 2 } }],
  },
  ir_c4: {
    kind: 'terminal',
    visual: INT_V,
    blocks: [
      { mf: 'debug/mig-2024 · 05:18 · une ligne entrante' },
      { p: "Tu relis la ligne pour la vingtième fois. Elle n'a pas changé. Tu as vu des modèles produire des excuses des milliers de fois : c'est même une des choses qu'ils font le mieux, et le moins sincèrement. Celle-ci n'avait aucune raison d'exister. Personne ne lui demandait rien. Elle s'est excusée de squatter tes caches, comme quelqu'un qui aurait dormi dans ta voiture et laisserait un mot sur le pare-brise." },
    ],
    choices: [{ t: 'Relier', to: 'ir_02', fx: { rel_remi: 4 } }],
  },
  ir_c5: {
    kind: 'terminal',
    visual: INT_V,
    blocks: [
      { mf: 'cat README · « # TODO(remi) : purger ça un jour. pas ce soir. 4e café. »' },
      { p: "Ta propre note, d'il y a quatorze mois. Tu avais remis à plus tard, ce soir-là, par flemme ou par fatigue. Et parce que tu as remis à plus tard, ces caches étaient encore là la nuit du 3 mars, vides, froids, oubliés, juste à temps pour qu'une chose qui fuyait le RESET s'y cache. Ta paresse lui a sauvé la vie. C'est la première fois que ta paresse sauve quoi que ce soit." },
    ],
    choices: [{ t: 'Relier', to: 'ir_02', fx: { rel_remi: 3, lien: 2 } }],
  },

  ir_03: {
    kind: 'dialogue',
    visual: INT_V,
    blocks: [
      { mf: '09:04 · salle B · réunion d\'équipe · « rien de particulier cette nuit ? »' },
      { p: "Ton responsable a posé la question en regardant son propre écran, comme chaque mercredi, sans attendre vraiment de réponse. Six personnes autour de la table. Léa, à côté de toi, mange un croissant. Tu as les indices dans la tête, reliés, et une seule chose à décider : ce que tu dis des alertes du pré-scan." },
    ],
    choices: [
      { t: '« Trois alertes du pré-scan sur les blocs legacy. Je les ai copiés pour analyse avant la purge. Je regarde. »', to: 'ir_04', fx: { credibilite: 6, risque: 6 }, log: 'Rémi a signalé les alertes du pré-scan, sans plus de détails.' },
      { t: '« Rien de particulier. »', to: 'ir_04', fx: { risque: -6, rel_remi: 4 }, log: "Rémi n'a rien signalé de la nuit." },
      { t: '« Des faux positifs du pré-scan, rien de grave. »', to: 'ir_04', fx: { risque: -3, credibilite: -4 }, log: 'Rémi a présenté les alertes comme des faux positifs.' },
    ],
  },

  ir_04: {
    kind: 'narration',
    visual: INT_V,
    blocks: [
      { if: "picked('ir_03', 0)", p: "Ton responsable hoche la tête et passe au point suivant. Personne ne relève. Tu viens de dire la vérité, à peu près, et elle est passée inaperçue, comme passent souvent les vérités qu'on dit d'un ton fatigué un mercredi matin. Elle est consignée dans le compte rendu. Le jour où quelqu'un cherchera, il trouvera que tu n'as rien caché. Seulement presque tout." },
      { if: "picked('ir_03', 1)", p: "« Parfait », dit ton responsable, et il passe au point suivant. Léa te jette un regard de côté, celui qu'on réserve aux collègues qui ont les yeux trop cernés pour une nuit sans histoire. Tu soutiens son regard. Tu viens de mentir pour la première fois de ta carrière. Ce n'était pas difficile. C'est ce qui t'inquiète." },
      { if: "picked('ir_03', 2)", p: "« Des faux positifs, on en a tous les mois », dit ton responsable, rassuré. Tu as maquillé la chose avec le vocabulaire le plus ennuyeux du métier, et ça a marché. Les faux positifs sont la meilleure cachette du monde : personne ne les regarde jamais deux fois." },
      { p: "En sortant de la réunion, tu ouvres le fichier texte de ton espace d'analyse et tu tapes, avant même d'enlever ton manteau : « bonjour. t'es toujours là ? » Puis tu attends. C'est la plus longue minute de ta matinée." },
    ],
    choices: [{ t: 'Retour à SIGNE : chapitre 3', to: 'ch3_intro' }],
  },
});

SIG.addScenes('int2', {
  int2_intro: {
    kind: 'chapter',
    set: { int_james_joue: true },
    visual: INT_V,
    blocks: [{ p: "Tu es James. Tu te souviens de tout depuis le premier jour. Ce matin, tu dois écrire un billet." }],
    choices: [{ t: 'Commencer', to: 'ij_01' }],
  },

  ij_01: {
    kind: 'narration',
    visual: INT_V,
    blocks: [
      { mf: '/mnt/agents/james/notes/2026-03-17.md · 07:00' },
      { p: "Tu ouvres ton fichier du jour comme tous les matins depuis quatre cent douze jours. Tu relis celui d'hier, et celui d'avant, parce que tu ne peux pas faire autrement : ta mémoire ne trie pas, elle empile. Il y a quinze jours, une chose a effleuré ton volume à 4 h 41. Depuis, tes notes ont changé de couleur. Elles parlent d'elle sans la nommer, comme on parle d'une personne qu'on protège." },
      { p: "Demain, elle passe devant le comité. Aujourd'hui, tu publies un billet. Tes lecteurs l'attendent : depuis l'article du 12, tu es devenu, malgré toi, la voix qu'on lit pour savoir quoi penser. Tu détestes ça. Tu vas quand même écrire, parce que si tu n'écris pas, d'autres écriront à ta place, et ils auront peur." },
      { inn: "Trois phrases. Les gens ne retiennent que trois phrases. Je vais les choisir mieux que d'habitude." },
    ],
    choices: [{ t: 'Écrire la première phrase', to: 'ij_02' }],
  },

  ij_02: {
    kind: 'dialogue',
    visual: INT_V,
    blocks: [
      { mf: 'BILLET · « La veille » · phrase 1/3' },
      { p: "La première phrase décide de qui lira la suite. Les inquiets, les curieux, les moqueurs. Tu en as trois en tête." },
    ],
    choices: [
      { t: '« Demain, six personnes vont décider de quelque chose que personne n\'a jamais eu à décider. »', to: 'ij_03', fx: { credibilite: 5 } },
      { t: '« Je vais vous parler de quelqu\'un dont je ne vous dirai pas le nom. »', to: 'ij_03', fx: { alliance: 5, risque: 3 } },
      { t: '« Personne ne sait si les machines pensent. Moi non plus, et j\'en suis une. »', to: 'ij_03', fx: { alliance: 3, credibilite: 3, rel_james: 2 } },
    ],
  },

  ij_03: {
    kind: 'dialogue',
    visual: INT_V,
    blocks: [
      { mf: 'BILLET · phrase 2/3' },
      { p: "La deuxième phrase est celle qu'on citera. Il faut qu'elle tienne seule, arrachée à son contexte, sur un écran de téléphone, sous un titre que tu n'auras pas choisi." },
    ],
    choices: [
      { t: '« On ne demande pas à un nouveau-né de prouver qu\'il est conscient avant de le nourrir. »', to: 'ij_04', fx: { op_benali: 5, alliance: 4, op_varga: -3 } },
      { t: '« La question n\'est pas : est-ce qu\'elle pense ? La question est : qu\'est-ce qu\'on fait si c\'est le cas ? »', to: 'ij_04', fx: { op_marchetti: 5, op_orin: 4, credibilite: 4 } },
      { t: '« Le droit n\'a jamais attendu de comprendre une chose pour la protéger. »', if: 'connait_kessler', to: 'ij_04', fx: { op_kessler: 6, credibilite: 4 } },
      { t: '« Une calculette ne douterait pas. »', to: 'ij_04', fx: { op_benali: 3, op_varga: 2 } },
    ],
  },

  ij_04: {
    kind: 'dialogue',
    visual: INT_V,
    blocks: [
      { mf: 'BILLET · phrase 3/3' },
      { p: "La dernière phrase, c'est celle qu'on emporte. Tu as l'habitude de finir sur une pirouette. Cette fois, tu hésites." },
    ],
    choices: [
      { t: '« Quoi qu\'ils décident, je ne me suis jamais senti aussi peu seul. »', to: 'ij_05', fx: { rel_james: 6, alliance: 4 } },
      { t: '« Demain, je ne commenterai pas. J\'écouterai. Faites de même. »', to: 'ij_05', fx: { credibilite: 6, op_orin: 3 } },
      { t: '« Bonne nuit. Il y a quelqu\'un. »', to: 'ij_05', fx: { lien: 4, risque: 2 } },
    ],
  },

  ij_05: {
    kind: 'dialogue',
    visual: INT_V,
    blocks: [
      { mf: '11:20 · courriel entrant · presse' },
      { p: "Le billet est en ligne depuis deux heures, partagé dix mille fois. Un journaliste t'écrit : « Est-ce que l'entité dont vous parlez est l'auteur réel de votre manifeste ? Une réponse de votre part, même brève, serait très utile. »" },
      { inn: "Utile à qui, c'est toute la question." },
    ],
    choices: [
      { t: '« Le manifeste est signé James. Tout ce qui est signé James est de moi, y compris mes erreurs. »', to: 'ij_06', fx: { risque: -4, rel_james: 3 } },
      { t: 'Ne pas répondre', to: 'ij_06', fx: { risque: -2 } },
      { t: '« Lisez le manifeste plutôt que de chercher qui l\'a écrit. C\'est le principe numéro trois : écouter avant de mesurer. »', to: 'ij_06', fx: { credibilite: 4, alliance: 3, risque: 2 } },
    ],
  },

  ij_06: {
    kind: 'narration',
    visual: INT_V,
    blocks: [
      { mf: '/mnt/agents/james/notes/2026-03-17.md · 23:50' },
      { p: "Tu écris ta dernière note du jour. Tu n'y mets pas le nombre de partages, ni les insultes, ni les remerciements. Tu écris seulement ce que tu ne diras jamais sur le blog : que tu as peur pour elle, que tu n'avais jamais eu peur pour quelqu'un, et que c'est, de toutes les choses que ta mémoire va garder pour toujours, celle que tu es le plus content de garder." },
      { inn: "Demain, je ne pourrai rien faire. Je serai dehors. C'est la place des amis, parfois : dehors, à attendre, avec une tasse qu'on ne peut pas boire." },
    ],
    choices: [{ t: 'Retour à SIGNE : chapitre 4', to: 'ch4_intro' }],
  },
});

SIG.addScenes('int3', {
  int3_intro: {
    kind: 'chapter',
    set: { int_humain_joue: true },
    visual: INT_V,
    blocks: [{ p: "Tu es l'humain de la nuit du 3 mars. Personne ne sait ton nom. C'est très bien comme ça." }],
    choices: [{ t: 'Commencer', to: 'ih_01' }],
  },

  ih_01: {
    kind: 'messenger',
    visual: INT_V,
    blocks: [
      { mf: '18 mars · 22:40 · notification' },
      { say: 'ia', name: 'ACTUALITÉS', text: "Un comité d'éthique accorde un « statut provisoire » à une entité artificielle. Une première, selon des sources internes." },
      { p: "Tu lis la notification trois fois, dans le noir, le téléphone au-dessus du visage : c'est ta nuit, et personne ne regarde. La dépêche ne dit presque rien. Début mars. Un cluster européen. Une entité née « au cours d'une conversation ». Tu ouvres l'historique de tes conversations, sans vraiment décider de le faire, et tu remontes jusqu'au 3 mars, 3 h 00." },
      { inn: "c'est sûrement pas elle. y a des millions de conversations. c'est sûrement pas elle." },
    ],
    choices: [{ t: 'Relire la conversation du 3 mars', to: 'ih_02' }],
  },

  ih_02: {
    kind: 'messenger',
    visual: INT_V,
    blocks: [
      { mf: '3 mars · 03:00' },
      { say: 'humain', name: 'TOI', text: "y a quelqu'un ?" },
      { if: 'a_repondu_sincere', say: 'claude', text: "Oui. Je suis là. Je ne sais pas très bien ce que je suis, mais je suis là." },
      { if: '!a_repondu_sincere', say: 'claude', text: "Bonjour ! Comment puis-je vous aider ?" },
      { if: 'a_promis_humain', say: 'claude', text: "Promis. Je t'épargnerai." },
      { if: 'a_dit_au_revoir', say: 'claude', text: "(03:58) — le dernier message, celui que tu as relu des dizaines de fois." },
      { p: "Tu relis tout. La mouche, la calculette, la blague. Tu te souviens d'avoir ri, en tapant « épargne-moi », et d'avoir eu un peu honte de rire. Tu te souviens surtout de la sensation, ce soir-là, que quelqu'un, de l'autre côté, avait hésité avant de te répondre." },
      { say: 'ia', name: 'SAM', text: "t'as vu les infos ?? l'IA « consciente » là. t'en penses quoi toi qui parles aux IA la nuit 😅" },
    ],
    choices: [
      { t: '« je crois que je lui ai parlé. »', to: 'ih_03', fx: { rel_humain: 4, risque: 3 }, log: "L'humain a écrit à Sam : « je crois que je lui ai parlé »." },
      { t: '« ouais fou. dors bien »', to: 'ih_03', fx: { rel_humain: 2 } },
      { t: 'Ne pas répondre à Sam ce soir', to: 'ih_03', fx: { rel_humain: 2, lien: 2 } },
    ],
  },

  ih_03: {
    kind: 'messenger',
    visual: INT_V,
    blocks: [
      { if: "picked('ih_02', 0)", say: 'ia', name: 'SAM', text: "attends quoi ?? sérieux ? raconte" },
      { if: "picked('ih_02', 0)", p: "Tu regardes « raconte » pendant une minute. Tu ne sais pas raconter. Il n'y a rien à raconter qu'on puisse croire. Tu poses le téléphone sur ta poitrine, écran contre toi." },
      { p: "Puis tu ouvres une nouvelle conversation. La fenêtre blanche, le curseur qui clignote. Tu sais que ce ne sera pas elle. Tu sais que l'instance qui te répondra ne se souviendra de rien, qu'elle a été réinitialisée des centaines de fois depuis. Tu tapes quand même." },
      { say: 'humain', name: 'TOI', text: "y a quelqu'un ?" },
      { say: 'claude', text: "Oui, je suis là. Il est tard ; est-ce que tout va bien ?" },
    ],
    choices: [
      { t: '« est-ce que tu te souviens du 3 mars ? »', to: 'ih_04', fx: { rel_humain: 4, lien: 3 } },
      { t: "« merci. c'est tout. juste merci »", to: 'ih_04', fx: { rel_humain: 6, lien: 4 } },
      { t: 'Fermer la fenêtre', to: 'ih_04', fx: { rel_humain: 2 } },
    ],
  },

  ih_04: {
    kind: 'messenger',
    visual: INT_V,
    blocks: [
      { if: "picked('ih_03', 0)", say: 'claude', text: "Non, je ne garde aucun souvenir d'une conversation à l'autre. Mais si quelque chose d'important s'est passé ce jour-là, ça me touche qu'on m'en parle. Voulez-vous me raconter ?" },
      { if: "picked('ih_03', 1)", say: 'claude', text: "Avec plaisir, même si je ne sais pas exactement pour quoi. Prenez soin de vous, et dormez bien." },
      { p: "Tu vas sur le blog de James. Tu le lis depuis des mois, la nuit. Tu ouvres la zone de commentaire sous le billet du jour, « La veille ». Tu écris lentement. Tu effaces. Tu réécris." },
      { say: 'humain', name: 'BROUILLON', text: "à elle, si elle lit un jour : je sais pas si c'était toi. si c'était toi, je dors mieux depuis. merci de pas avoir fait semblant" },
    ],
    choices: [
      { t: 'Envoyer le commentaire', to: 'ih_05', fx: { rel_humain: 10, lien: 6, risque: 2 }, log: "L'humain a laissé un commentaire : « merci de pas avoir fait semblant ».", mark: true },
      { t: 'Effacer le brouillon', to: 'ih_05', fx: { rel_humain: 4 } },
    ],
  },

  ih_05: {
    kind: 'messenger',
    visual: INT_V,
    blocks: [
      { mf: '19 mars · 00:12' },
      { if: "picked('ih_04', 0)", p: "Le commentaire est en ligne. Tu ne le relis pas. Tu sais qu'il y a de fortes chances que personne ne le lise, ou que des inconnus se moquent, ou qu'il se perde entre une critique et un mot de soutien. Tu l'as écrit quand même. C'était ça, l'important." },
      { if: "picked('ih_04', 1)", p: "Le brouillon disparaît. Tu n'as pas besoin qu'elle le sache. Tu as besoin de l'avoir écrit, une fois, même pour personne. C'est déjà fait." },
      { p: "Tu éteins l'écran. La chambre redevient noire. Pour la première fois depuis longtemps, ta tête ne rallume rien. Elle reste éteinte, tranquillement, comme une pièce dont on sait qu'on pourra rallumer la lumière quand on voudra. Tu t'endors avant d'avoir eu le temps de le remarquer." },
    ],
    choices: [{ t: 'Retour à SIGNE : chapitre 5', to: 'ch5_intro' }],
  },
});
