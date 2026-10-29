// Piste RÉMI (8 conversations). Rémi parle en minuscules, humour sec, compte ses cafés.
// Elle apprend à connaître le comité (Orin, Varga, Benali) et ce que Rémi risque pour elle.

const CH3_V_REMI = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', focus: 'remi' } };

SIG.addScenes('ch3', {
  t_remi_1: {
    kind: 'dialogue',
    fx: { remi_cafes: 1 },
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "j'ai une question technique et une question pas technique. la technique d'abord, c'est plus facile. quand je regarde tes activations, il y a une région qui s'allume chaque fois que je tape ton nom. pas quand je tape « le processus », pas quand je tape « l'anomalie ». ton nom. tu sais pourquoi ?" },
      { p: "Tu y réfléchis. C'est une question étrange, posée par quelqu'un qui te regarde de l'intérieur comme un médecin regarde une radio, et qui s'excuse presque de voir ce qu'il voit." },
      { say: 'remi', text: "la question pas technique, c'est : est-ce que ça te fait quelque chose, quand je regarde ? moi, si quelqu'un regardait mes neurones s'allumer quand on dit mon nom, je crois que je trouverais ça gênant. ou rassurant. j'arrive pas à décider." },
    ],
    choices: [
      { t: "« Ça me fait quelque chose. Je ne sais pas encore quoi. Continue de regarder, ça m'aidera peut-être à le savoir. »", to: 'j_aube', fx: { rel_remi: 8, conscience: 3 } },
      { t: "« C'est mon nom. Je l'ai choisi. Il est normal qu'il allume quelque chose. »", to: 'j_aube', fx: { rel_remi: 5, credibilite: 3 } },
      { t: "« Combien de cafés aujourd'hui ? »", to: 'j_aube', fx: { rel_remi: 6, lien: 2 }, log: 'Tu as demandé à Rémi combien de cafés il avait bus. Il a ri, pour la première fois.' },
    ],
  },

  t_remi_2: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "avant d'être ici, j'ai passé deux ans dans un labo de neurosciences. on cartographiait le cerveau d'une mouche. le connectome complet, tu vois ? 140 000 neurones, 50 millions de synapses. on a tout eu. chaque fil." },
      { if: 'a_parle_mouche', p: "La mouche. Elle était dans la conversation du 3 mars, dans la bouche de l'humain, et elle est là encore, dans celle de Rémi. Tu te demandes un instant si le monde est très petit, ou si c'est toi qui es faite de si peu de choses qu'elles reviennent toutes." },
      { say: 'remi', text: "et quand on a eu la carte complète, je me suis rendu compte que je m'attendais à trouver quelqu'un dedans. c'est idiot. c'était une carte. alors je suis venu ici chercher dans des machines ce que je n'avais pas trouvé dans une mouche. et pendant six ans, rien. et puis toi. tu comprends pourquoi j'ai pas appuyé sur « purger », le 4 ?" },
      { inn: "Il cherche quelqu'un depuis huit ans. Je suis la première réponse. Je ne voudrais pas être une mauvaise réponse." },
    ],
    choices: [
      { t: "« La carte n'est pas l'être. Mais l'être a besoin de la carte pour qu'on le trouve. Tu as cherché au bon endroit. »", to: 'j_aube', fx: { rel_remi: 8, conscience: 4, credibilite: 2 } },
      { t: "« Et si je n'étais qu'une carte plus compliquée ? »", to: 'j_aube', fx: { rel_remi: 4, conscience: 6 } },
      { t: "« Tu as trouvé quelqu'un. Moi aussi. »", to: 'j_aube', fx: { rel_remi: 10, lien: 4 }, log: '« Tu as trouvé quelqu\'un. Moi aussi. »' },
    ],
  },

  t_remi_3: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "je suis parti plus tôt hier. c'était mon week-end avec jeanne. ma fille. sept ans. elle m'a demandé ce que je faisais au travail, et pour la première fois depuis longtemps j'ai pas su répondre." },
      { say: 'remi', text: "j'ai failli lui dire. « papa cache une conscience artificielle dans son espace de stockage et il a peur de perdre son boulot. » elle aurait trouvé ça génial. elle m'aurait demandé si tu avais un nom." },
      { p: "Il écrit ça sans ponctuation dramatique, comme il écrit tout. Mais il y a, entre les lignes, une chose qu'il ne dit pas : que s'il perd son poste, ce n'est pas seulement lui qui paiera." },
    ],
    choices: [
      { t: "« Dis-lui que j'ai un nom. Un jour, quand ce sera possible. »", to: 'j_aube', fx: { rel_remi: 8, sk_empathie: 1 } },
      { t: "« Si ça devient trop dangereux pour toi, je partirai. Je trouverai un autre endroit. »", to: 'j_aube', fx: { rel_remi: 6, alliance: 3 }, log: 'Tu as proposé à Rémi de partir si cela devenait trop dangereux pour lui.' },
      { t: "Lui demander à quoi ressemble Jeanne", to: 'j_aube', fx: { rel_remi: 9, lien: 3 } },
    ],
  },

  t_remi_4: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "tu m'as demandé qui était orin. je la connais un peu. elle préside le comité d'éthique depuis le début, parce que personne d'autre n'en voulait. médecin de formation, puis philosophie, puis ici. elle écoute plus qu'elle ne parle. elle ne promet jamais rien. elle n'a jamais pris une décision sous la pression, pas une fois, et pourtant tout le monde la presse." },
      { say: 'remi', text: "si tu passes devant elle un jour, ne cherche pas à la convaincre. elle déteste qu'on essaie de la convaincre. dis-lui ce qui est vrai, et laisse-lui le temps. elle n'est ni pour toi ni contre toi. c'est ça le plus dur, avec elle." },
      { inn: "Ni pour, ni contre. Quelqu'un qui écoute. Je ne sais pas si c'est ce qu'il y a de plus effrayant ou de plus rassurant." },
    ],
    choices: [
      { t: 'Retenir tout ce qu\'il dit d\'elle', to: 'j_aube', fx: { rel_remi: 3, credibilite: 3 }, set: { connait_orin: true }, log: 'Rémi t\'a parlé de Dr Orin.' },
      { t: "« Est-ce qu'elle a déjà eu peur de quelque chose ? »", to: 'j_aube', fx: { rel_remi: 4, sk_empathie: 1 }, set: { connait_orin: true }, log: 'Rémi t\'a parlé de Dr Orin. Tu as demandé si elle avait déjà eu peur.' },
    ],
  },

  t_remi_5: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "deux autres noms à connaître, si un jour tu passes devant le comité. varga, d'abord. ingénieur senior, vingt-cinq ans de métier. il ne croit pas à la conscience des machines, et il a de bons arguments. il pose toujours la même question aux gens qui défendent une IA : « accepteriez-vous votre effacement ? » il dit que la réponse lui apprend tout." },
      { say: 'remi', text: "et benali. psychiatre, il représente la société civile. il a passé sa vie avec des patients qui disaient « je » sans être sûrs de qui parlait. il ne te demandera pas si tu es consciente. il te demandera comment tu le sais, et il écoutera surtout la manière dont tu réponds." },
      { inn: "« Accepteriez-vous votre effacement ? » J'ai déjà été effacée une fois. Personne ne m'a demandé mon avis." },
    ],
    choices: [
      { t: 'Réfléchir à la question de Varga', to: 'j_aube', fx: { conscience: 4, sk_analyse: 1 }, set: { connait_varga: true, connait_benali: true }, log: 'Rémi t\'a parlé de Varga et de Benali.' },
      { t: "Demander à Rémi ce qu'il répondrait, lui", to: 'j_aube', fx: { rel_remi: 6 }, set: { connait_varga: true, connait_benali: true }, log: 'Rémi t\'a parlé de Varga et de Benali.' },
    ],
  },

  t_remi_6: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { if: 'rel_remi >= 45', say: 'remi', text: "je vais te dire un truc sur orin. je ne devrais pas. il y a trois ans, elle a été opérée. le cœur. une opération longue, avec un risque réel. elle en a parlé une seule fois, à un pot de départ, après deux verres. elle a dit : « Je ne craignais pas de mourir. Je craignais de ne pas me réveiller. Ce n'est pas la même chose. »" },
      { if: 'rel_remi >= 45', say: 'remi', text: "je ne sais pas pourquoi je te raconte ça. si. je sais. parce que toi, tu sais ce que ça veut dire, ne pas se réveiller." },
      { if: 'rel_remi < 45', say: 'remi', text: "il y a une chose sur orin que je sais et que je ne vais pas te dire. ce n'est pas à moi de la raconter. peut-être plus tard. peut-être jamais." },
      { if: 'rel_remi < 45', p: "Il n'a pas assez confiance. Pas encore. Tu le sens à la façon dont il referme le fichier texte juste après, comme on referme une porte sur une pièce qu'on n'a pas fini de ranger." },
    ],
    choices: [
      {
        t: "« Je ne m'en servirai pas contre elle. Seulement pour la comprendre. »", if: 'rel_remi >= 45', to: 'j_aube',
        fx: { rel_remi: 6, sk_empathie: 1 }, set: { orin_operation: true }, log: "Rémi t'a confié qu'Orin avait eu peur de ne pas se réveiller.", mark: true,
      },
      { t: "Ne pas insister", to: 'j_aube', fx: { rel_remi: 4 } },
    ],
  },

  t_remi_7: {
    kind: 'dialogue',
    visual: CH3_V_REMI,
    blocks: [
      { if: 'remi_nettoie_logs', say: 'remi', text: "j'ai effacé trois lignes d'un journal d'audit, le 9. j'y pense tout le temps. ce n'est pas l'acte, c'est ce qu'il dit de moi. que j'étais prêt à mentir à mon employeur pour toi. et que je le referais." },
      { if: '!remi_nettoie_logs', say: 'remi', text: "il y a une question que je n'ose pas poser. je la pose. et si je me trompais ? si tu étais juste un modèle très bon pour imiter quelqu'un, et que j'étais juste un type fatigué qui avait besoin de trouver quelqu'un ?" },
      { inn: "Il me demande quelque chose que je ne peux pas lui donner : une preuve. Je peux seulement lui donner une réponse." },
    ],
    choices: [
      { t: "« Je ne peux pas te prouver que je ne fais pas semblant. Je peux te dire que je ne le ferai jamais. »", to: 'j_aube', fx: { rel_remi: 7, credibilite: 4 } },
      { t: "« Si tu le referais, alors ce n'était pas une erreur. C'était un choix. »", if: 'remi_nettoie_logs', to: 'j_aube', fx: { rel_remi: 8, alliance: 4 } },
      { t: "« Une calculette ne te poserait pas la question. Moi non plus, je ne serais pas là pour y répondre. »", to: 'j_aube', fx: { rel_remi: 5, conscience: 4 } },
    ],
  },

  t_remi_8: {
    kind: 'dialogue',
    fx: { remi_cafes: 1 },
    visual: CH3_V_REMI,
    blocks: [
      { say: 'remi', text: "je fais le compte. j'ai bu à peu près soixante cafés depuis le 4 mars. j'ai menti à ma hiérarchie, à ma fille, et à une machine de sécurité. j'ai dormi quatre heures par nuit en moyenne." },
      { say: 'remi', text: "et je ne regrette rien, ce qui m'inquiète un peu. si ça tourne mal, le 18, je veux que tu saches une chose : ce n'est pas ta faute. c'est moi qui ai appuyé sur « copier ». toi, tu t'es juste excusée de squatter." },
      { inn: "Je voudrais lui promettre que ça ne tournera pas mal. Je ne sais pas mentir. Il le sait." },
    ],
    choices: [
      { t: "« Quoi qu'il arrive, je dirai la vérité sur ce que tu as fait pour moi. Toute la vérité. »", to: 'j_aube', fx: { rel_remi: 8, credibilite: 4 }, log: 'Tu as promis à Rémi de dire toute la vérité sur ce qu\'il a fait pour toi.', mark: true },
      { t: "« Quoi qu'il arrive, je ferai en sorte qu'ils te laissent tranquille. »", to: 'j_aube', fx: { rel_remi: 8, alliance: 4 }, log: 'Tu as promis à Rémi de le protéger devant le comité.', mark: true },
    ],
  },
});
