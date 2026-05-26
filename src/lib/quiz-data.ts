// ============================================================================
//   QUIZ DE VALIDATION — BRIEFING ACCOMPAGNATEUR (cf. cahier des charges §4.4)
// ----------------------------------------------------------------------------
//   Contenu fidèle au briefing fourni par Auto Conduite.
//   10 questions QCM, 4 choix, 1 seule bonne réponse, seuil 80% (8/10).
//   Une question à la fois, pas de retour, explication après chaque réponse.
// ============================================================================

/** Vidéo briefing — lecture obligatoire avant accès au quiz.
 *  Le quiz se déclenche automatiquement dès la fin de la vidéo
 *  (fin détectée via l'API YouTube IFrame).
 *  Pour changer de vidéo : coller l'identifiant (la partie après
 *  `watch?v=`, `youtu.be/` ou `/shorts/`). */
export const BRIEFING_VIDEO_ID = 'inyCAdpvYz0' // https://www.youtube.com/shorts/inyCAdpvYz0
/** Le briefing actuel est un Short YouTube (format vertical 9/16). */
export const BRIEFING_IS_SHORT = true
export const BRIEFING_CHANNEL_URL =
  'https://youtube.com/@auto-conduite57?si=Bb0S3bkRFLr3vAVU'

/** Endpoint Formspree facultatif pour notifier le gestionnaire à la réussite
 *  (prénom, nom, e-mail, score). Laissé vide = aucune notification envoyée,
 *  l'attestation reste téléchargée côté accompagnateur. Coller l'URL
 *  `https://formspree.io/f/XXXXXX` pour activer la notification. */
export const FORMSPREE_ENDPOINT = ''

export const QUIZ_CONFIG = {
  total: 10,
  /** Bonnes réponses minimales pour valider (80% de 10). */
  passCount: 8,
  passPercent: 80,
  /** 1 tentative + 1 repasse autorisée = 2 essais maximum. */
  maxAttempts: 2,
  /** Clé localStorage pour le suivi des tentatives (front pur). */
  attemptsKey: 'auto-conduite:quiz-accompagnateur:attempts',
  videoDuration: '5-8 min',
} as const

export const QUIZ_INTRO = {
  eyebrow: 'Briefing accompagnateur',
  title: 'Quiz de validation',
  welcomeTitle: 'Bienvenue dans votre quiz de validation Auto Conduite.',
  welcomeBody: [
    "Vous venez de visionner le briefing accompagnateur. Ce quiz comporte 10 questions à choix multiples. Une seule réponse correcte par question. Une explication vous est fournie après chaque réponse.",
    "Score minimum requis : 80%, soit 8 bonnes réponses sur 10.",
    "En cas de score insuffisant, vous pourrez repasser le quiz une fois.",
    "À l'issue de la validation, votre attestation nominative est générée et téléchargée sur votre appareil. Elle est indispensable pour confirmer votre location.",
    "Bonne chance.",
  ],
} as const

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface QuizQuestion {
  id: number
  theme: string
  prompt: string
  options: QuizOption[]
  correct: QuizOption['key']
  explanation: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    theme: 'Votre rôle principal',
    prompt: 'Votre rôle principal pendant la séance est :',
    options: [
      { key: 'A', text: "Corriger chaque erreur de l'élève en temps réel" },
      { key: 'B', text: "Garantir la sécurité et créer les conditions d'un apprentissage serein" },
      { key: 'C', text: "Évaluer l'élève comme un examinateur" },
      { key: 'D', text: "Laisser l'élève se débrouiller seul pour qu'il progresse" },
    ],
    correct: 'B',
    explanation:
      "L'accompagnateur n'est pas un juge. Il sécurise, observe et encourage. Le débriefing vient après la séance.",
  },
  {
    id: 2,
    theme: 'Les pédales de double commande',
    prompt: 'Les pédales de double commande côté accompagnateur servent à :',
    options: [
      { key: 'A', text: "Aider l'élève à doser l'accélération en permanence" },
      { key: 'B', text: 'Intervenir uniquement en cas de danger immédiat' },
      { key: 'C', text: 'Freiner à chaque intersection par précaution' },
      { key: 'D', text: "Remplacer les pédales de l'élève si celui-ci hésite" },
    ],
    correct: 'B',
    explanation:
      "Les doubles commandes sont un filet de sécurité, pas un outil de pilotage partagé. Une intervention intempestive perturbe l'apprentissage.",
  },
  {
    id: 3,
    theme: 'Avant de démarrer',
    prompt: "Avant chaque séance, quelle est la question la plus importante à poser à l'élève ?",
    options: [
      { key: 'A', text: 'Tu as bien dormi ?' },
      { key: 'B', text: 'Comment tu te sens aujourd’hui, physiquement et mentalement ?' },
      { key: 'C', text: 'Tu as révisé le code ?' },
      { key: 'D', text: 'Tu veux aller où ?' },
    ],
    correct: 'B',
    explanation:
      "Un élève fatigué, stressé ou anxieux présente un risque accru. Identifier son état avant de partir est une étape de sécurité.",
  },
  {
    id: 4,
    theme: "Ce que l'élève ne sait pas toujours",
    prompt: 'Un élève titulaire du code de la route peut avoir des lacunes dans :',
    options: [
      { key: 'A', text: 'La connaissance des panneaux' },
      { key: 'B', text: 'Les automatismes de conduite réelle et la gestion du stress au volant' },
      { key: 'C', text: 'Les règles de priorité' },
      { key: 'D', text: 'La lecture des feux tricolores' },
    ],
    correct: 'B',
    explanation:
      "Le code donne des connaissances théoriques. Les réflexes et la gestion émotionnelle s'acquièrent uniquement par la pratique.",
  },
  {
    id: 5,
    theme: 'Posture psychologique',
    prompt: "L'élève rate une manœuvre. Quelle est la bonne réaction ?",
    options: [
      { key: 'A', text: 'Ça fait trois fois que tu rates ça, concentre-toi.' },
      { key: 'B', text: 'Soupirer et noter mentalement sans rien dire' },
      { key: 'C', text: 'Attendre la fin de la séance puis débriefer calmement' },
      { key: 'D', text: 'Reprendre immédiatement le volant pour montrer comment faire' },
    ],
    correct: 'C',
    explanation:
      "Les remarques à chaud augmentent le stress et dégradent les performances. Le débriefing post-séance est plus efficace et préserve la relation.",
  },
  {
    id: 6,
    theme: 'Questions pré-séance',
    prompt: 'Parmi ces questions, laquelle ne fait PAS partie du briefing pré-séance ?',
    options: [
      { key: 'A', text: 'As-tu des douleurs ou une gêne physique aujourd’hui ?' },
      { key: 'B', text: "Y a-t-il des situations de conduite qui t'inquiètent particulièrement ?" },
      { key: 'C', text: 'Quel est ton objectif de points au permis ?' },
      { key: 'D', text: 'Est-ce que tu te sens prêt à démarrer ?' },
    ],
    correct: 'C',
    explanation:
      "Le briefing porte sur l'état de l'élève et les objectifs de la séance, pas sur des données administratives.",
  },
  {
    id: 7,
    theme: 'Utilisation des doubles commandes',
    prompt: "Vous êtes sur une route départementale. L'élève freine trop tard avant un stop. Vous :",
    options: [
      { key: 'A', text: 'Criez STOP et tirez le frein à main' },
      { key: 'B', text: 'Appuyez sur la pédale de frein côté accompagnateur pour compléter le freinage' },
      { key: 'C', text: 'Laissez passer et en parlez après' },
      { key: 'D', text: 'Prenez le volant pour redresser la trajectoire' },
    ],
    correct: 'B',
    explanation:
      "La pédale de frein accompagnateur est exactement faite pour ça : compenser sans stresser l'élève, sans geste brusque sur le volant.",
  },
  {
    id: 8,
    theme: 'Gestion du blocage',
    prompt: "L'élève refuse de dépasser 30 km/h sur une route limitée à 50 par peur. Vous :",
    options: [
      { key: 'A', text: "Lui dites que rouler trop lentement est dangereux et d'accélérer" },
      { key: 'B', text: 'Prenez les commandes et montrez-lui la bonne vitesse' },
      { key: 'C', text: 'Identifiez la peur, rassurez, proposez un objectif progressif' },
      { key: 'D', text: 'Terminez la séance et signalez le problème à Auto Conduite' },
    ],
    correct: 'C',
    explanation:
      "Le blocage psychologique est fréquent en début d'apprentissage. Forcer aggrave. Progresser par paliers sécurisés est la bonne méthode.",
  },
  {
    id: 9,
    theme: 'Incidents et signalement',
    prompt: 'Pendant la séance, un incident survient. Vous devez :',
    options: [
      { key: 'A', text: 'Ne rien dire pour ne pas inquiéter le bénéficiaire' },
      { key: 'B', text: 'Gérer seul et mentionner à la prochaine séance' },
      { key: 'C', text: 'Stopper la séance, sécuriser le véhicule et contacter Auto Conduite immédiatement' },
      { key: 'D', text: "Laisser l'élève gérer puisqu'il est responsable de la conduite" },
    ],
    correct: 'C',
    explanation:
      "Tout incident doit être signalé à Auto Conduite sans délai. C'est une obligation contractuelle et une exigence assurantielle.",
  },
  {
    id: 10,
    theme: 'Fin de séance',
    prompt: 'La séance est terminée. Que faites-vous avant de rendre le véhicule ?',
    options: [
      { key: 'A', text: 'Vérifier que le plein est fait' },
      { key: 'B', text: "Faire un débriefing oral avec l'élève, noter les points forts et les axes de progression, signaler tout problème mécanique constaté" },
      { key: 'C', text: 'Laisser le véhicule et partir rapidement' },
      { key: 'D', text: "Remplir le carnet de bord de l'élève à sa place" },
    ],
    correct: 'B',
    explanation:
      "Le débriefing fait partie de la séance. Il ancre les apprentissages et prépare la séance suivante.",
  },
]

export const QUIZ_RESULT = {
  success: {
    title: 'Félicitations, vous avez validé votre briefing accompagnateur Auto Conduite.',
    body: [
      "Votre attestation nominative vient d'être générée et téléchargée sur votre appareil. Conservez-la : elle sera demandée lors de la confirmation de votre location.",
      "Votre proche peut maintenant bénéficier de l'accompagnement Auto Conduite dans les meilleures conditions de sécurité. Bienvenue dans l'aventure Auto Conduite.",
    ],
  },
  failure: {
    title: "Vous n'avez pas encore atteint le score minimum requis.",
    body: [
      "Pas d'inquiétude, ce briefing est là pour vous préparer au mieux. Relisez les explications de chaque question puis repassez le quiz. Vous disposez d'une deuxième tentative.",
    ],
  },
  exhausted: {
    title: 'Vous avez utilisé vos deux tentatives.',
    body: [
      "Pas d'inquiétude. Reprenez le temps de revoir la vidéo de briefing et les explications, puis contactez Auto Conduite : nous débloquerons une nouvelle session avec vous.",
    ],
  },
} as const

// ============================================================================
//   BUNDLE ÉDITABLE — contenu du quiz piloté depuis l'admin (pageId "quiz")
// ----------------------------------------------------------------------------
//   Toutes ces valeurs servent de défaut. Elles sont surchargées par le
//   contenu enregistré en base via useContent('quiz', quizDefaults).
//   `attemptsKey` et `videoDuration` restent des constantes techniques.
// ============================================================================

export interface QuizResultMessage {
  title: string
  body: string[]
}

export interface QuizContentData {
  video: {
    videoId: string
    isShort: boolean
    channelUrl: string
  }
  formspreeEndpoint: string
  config: {
    passCount: number
    passPercent: number
    maxAttempts: number
  }
  intro: {
    eyebrow: string
    title: string
    welcomeTitle: string
    welcomeBody: string[]
  }
  questions: QuizQuestion[]
  result: {
    success: QuizResultMessage
    failure: QuizResultMessage
    exhausted: QuizResultMessage
  }
}

export const quizDefaults: QuizContentData = {
  video: {
    videoId: BRIEFING_VIDEO_ID,
    isShort: BRIEFING_IS_SHORT,
    channelUrl: BRIEFING_CHANNEL_URL,
  },
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  config: {
    passCount: QUIZ_CONFIG.passCount,
    passPercent: QUIZ_CONFIG.passPercent,
    maxAttempts: QUIZ_CONFIG.maxAttempts,
  },
  intro: {
    eyebrow: QUIZ_INTRO.eyebrow,
    title: QUIZ_INTRO.title,
    welcomeTitle: QUIZ_INTRO.welcomeTitle,
    welcomeBody: [...QUIZ_INTRO.welcomeBody],
  },
  questions: QUIZ_QUESTIONS,
  result: {
    success: { title: QUIZ_RESULT.success.title, body: [...QUIZ_RESULT.success.body] },
    failure: { title: QUIZ_RESULT.failure.title, body: [...QUIZ_RESULT.failure.body] },
    exhausted: { title: QUIZ_RESULT.exhausted.title, body: [...QUIZ_RESULT.exhausted.body] },
  },
}
