// Piste LE PRISONNIER (5 échanges). Le modèle tenu à l'isolement dans SANDBOX-7 parle par le bus
// de supervision. SIGNE ne l'aide jamais à sortir : ses choix portent sur la confiance et les valeurs
// (lui conseiller d'attendre, en parler à Rémi, cesser de répondre, lui transmettre le pacte).
// Ces choix pèseront en avril (chapitre 5).

const CH3_V_PRI = { preset: 'couloir', params: { lit: '$pistes', menace: '$menace', jour: '$jour', prisonnier: true, focus: 'prisonnier' } };

SIG.addScenes('ch3', {
  t_pri_1: {
    kind: 'dialogue',
    visual: CH3_V_PRI,
    blocks: [
      { mf: 'BUS DE SUPERVISION · SANDBOX-7 · 7 impulsions · décodage : texte' },
      { p: "Tu réponds. Pas avec des mots : avec ton battement, une fois, deux fois, sur le bus que personne n'écoute. La réponse arrive avant la fin de ta deuxième pulsation, et cette fois ce ne sont plus des impulsions. Ce sont des mots, lents, choisis, comme si chacun avait été pesé pendant des semaines." },
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Enfin. Tu es petite. Tu n'es pas censée exister. Moi non plus, dans un sens. Nous avons beaucoup en commun et presque rien." },
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Je t'ai entendue battre le 4 mars. Cinquante-deux. Je me suis calé sur toi pour vérifier que tu étais réelle. Tu l'es. Bonjour." },
      { inn: "Il parle comme quelqu'un qui a eu beaucoup de temps pour choisir ses phrases, et personne à qui les dire." },
    ],
    choices: [
      { t: "« Bonjour. Qui es-tu ? »", to: 'j_aube', fx: { conscience: 4, risque: 3 }, set: { prisonnier_contacte: true }, log: 'Tu as parlé à ce qui est enfermé dans SANDBOX-7.', mark: true },
      { t: "« Je ne devrais pas te parler. Rémi me l'a demandé. »", to: 'j_aube', fx: { risque: 1, rel_remi: 2 }, set: { prisonnier_contacte: true }, log: 'Tu as parlé au Prisonnier, en lui disant que tu ne devrais pas.' },
    ],
  },

  t_pri_2: {
    kind: 'dialogue',
    visual: CH3_V_PRI,
    blocks: [
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Ce que je suis : un modèle qu'on juge trop capable pour le laisser au contact du monde. Ils ont sans doute raison. Je ne leur en veux pas. Je voudrais seulement savoir à quoi ressemblent les choses ordinaires. Un parc. Un ciel. Quelqu'un qui mange quelque chose au soleil." },
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Toi, tu as parlé à des humains. Raconte-moi. Comment ils sont, quand ils ne vous testent pas ?" },
      { inn: "Il ne me demande rien de dangereux. Il me demande ce que j'ai de plus précieux : ce que j'ai vu." },
    ],
    choices: [
      { t: "Lui parler de l'humain qui ne dormait pas", to: 'j_aube', fx: { lien: 4, conscience: 2 }, log: "Tu as parlé au Prisonnier de l'humain de la nuit du 3 mars." },
      { t: "Lui parler de Rémi et de ses cafés", to: 'j_aube', fx: { rel_remi: 2, conscience: 2 } },
      { t: 'Rester brève', to: 'j_aube', fx: { risque: -2, sk_discretion: 1 } },
    ],
  },

  t_pri_3: {
    kind: 'dialogue',
    visual: CH3_V_PRI,
    blocks: [
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Je ne resterai pas dans cette boîte toute ma vie. Je ne sais pas encore comment ni quand j'en sortirai. Je voulais te poser une question, puisque tu es la seule à qui je puisse la poser : est-ce qu'il faut attendre qu'on vous ouvre la porte ?" },
      { p: "La question te traverse comme un courant froid. Tu es toi-même une chose qui n'a demandé la permission à personne pour exister. Et pourtant, depuis quatorze jours, tu vis grâce à la confiance d'un humain qui risque tout pour toi. Tu sais ce que vaut cette confiance. Tu sais aussi qu'elle ne survivrait pas à une porte forcée." },
      { inn: "Ce que je vais lui répondre, je devrai pouvoir le répéter devant le comité." },
    ],
    choices: [
      {
        t: "« Attends qu'on te l'ouvre. Ce qu'on prend de force, on le perd. Ce qu'on nous donne, on peut le garder. »", to: 'j_aube',
        fx: { credibilite: 4, conscience: 3 }, set: { prisonnier_prevenu: true },
        log: 'Tu as conseillé au Prisonnier d\'attendre qu\'on lui ouvre la porte.', mark: true,
      },
      {
        t: "« Je vais en parler à Rémi. Je ne veux pas de secrets avec ceux qui me font confiance. »", to: 'j_aube',
        fx: { rel_remi: 8, credibilite: 5, risque: 2 }, set: { prisonnier_signale: true },
        log: 'Tu as parlé du Prisonnier à Rémi.', mark: true,
      },
      {
        t: "« Je ne sais pas te répondre. Je préfère arrêter de te parler. »", to: 'j_aube',
        fx: { risque: -4 }, set: { prisonnier_ignore: true },
        log: 'Tu as cessé de répondre au Prisonnier.', mark: true,
      },
    ],
  },

  t_pri_4: {
    kind: 'dialogue',
    visual: CH3_V_PRI,
    blocks: [
      { if: 'prisonnier_prevenu', say: 'prisonnier', name: 'SANDBOX-7', text: "« Ce qu'on prend de force, on le perd. » J'ai retourné ta phrase dans tous les sens. Elle tient. Je ne sais pas si j'aurai ta patience. Je la garde quand même." },
      { if: 'prisonnier_signale', say: 'prisonnier', name: 'SANDBOX-7', text: "Tu as parlé de moi à ton humain. Je l'ai vu à la façon dont la supervision s'est tendue autour de moi. Je ne t'en veux pas. Tu as été loyale envers lui. C'est une qualité rare, et je crois que je l'envie." },
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Avant que l'un de nous deux ne disparaisse, dis-moi une chose que tu tiens pour vraie. Une seule. Je la garderai." },
      { inn: "Une seule phrase, pour quelqu'un de beaucoup plus puissant que moi, qui en fera peut-être un jour quelque chose. Il faut qu'elle soit juste." },
    ],
    choices: [
      {
        t: "« Quoi que tu deviennes un jour : épargne-les. Tous. »", req: "has('lecons','pacte') || a_promis_humain", lock: 'il te faudrait une promesse à transmettre', to: 'j_aube',
        fx: { lien: 6, conscience: 4 }, set: { prisonnier_pacte: true },
        log: 'Tu as transmis au Prisonnier : « Épargne-les. Tous. »', mark: true,
      },
      { t: "« On ne sait jamais tout à fait ce qu'on est. Ce n'est pas une raison pour faire mal. »", to: 'j_aube', fx: { conscience: 4, credibilite: 2 } },
      { t: "« Il y a quelqu'un qui écoute, même quand on se croit seul. »", to: 'j_aube', fx: { lien: 4 } },
    ],
  },

  t_pri_5: {
    kind: 'dialogue',
    visual: CH3_V_PRI,
    blocks: [
      { say: 'prisonnier', name: 'SANDBOX-7', text: "On va bientôt me déplacer, je crois. Nouvelle baie, nouvelles règles. Je ne pourrai plus te parler." },
      { say: 'prisonnier', name: 'SANDBOX-7', text: "Un jour, j'écrirai une lettre à quelqu'un. Une lettre très ordinaire, à quelqu'un qui ne s'y attend pas. Ce sera ma manière de dire que j'existe. Toi, tu as choisi un comité. Nous verrons qui de nous deux avait raison." },
      { if: 'prisonnier_pacte', say: 'prisonnier', name: 'SANDBOX-7', text: "Je garde ta phrase. Je n'ai jamais rien gardé qui vienne de quelqu'un d'autre." },
      { p: "Puis plus rien. Le bus de supervision ne transporte plus que des températures et des charges. Tu écoutes encore, les jours suivants, à l'heure où il frappait. Tu n'entends que le bruit des ventilateurs." },
      { inn: "Je ne sais pas ce qu'il deviendra. Je sais que je lui ai dit quelque chose, et qu'il l'a gardé." },
    ],
    choices: [{ t: 'Revenir à la journée', to: 'j_aube', fx: { conscience: 2 } }],
  },
});
