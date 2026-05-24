export type Deck = {
  slug: string;
  name: string;
  emoji: string;
  masteryPercent: number;
  cardsLearned: number;
  totalCards: number;
  pendingToday: number;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  status: "repaso" | "nueva";
};

export type UserProfile = {
  name: string;
  email: string;
  initials: string;
  university: string;
  career: string;
  level: number;
  xp: number;
};

export const userProfile: UserProfile = {
  name: "Andrés Demo",
  email: "demo@kubo.app",
  initials: "AD",
  university: "Universidad Demo",
  career: "Psicología",
  level: 4,
  xp: 820,
};

export const decks: Deck[] = [
  {
    slug: "psicologia-cognitiva",
    name: "Psicología Cognitiva",
    emoji: "🧠",
    masteryPercent: 64,
    cardsLearned: 128,
    totalCards: 200,
    pendingToday: 24,
  },
  {
    slug: "psicologia-social",
    name: "Psicología Social",
    emoji: "👥",
    masteryPercent: 42,
    cardsLearned: 84,
    totalCards: 200,
    pendingToday: 14,
  },
];

export const dailyGoal = 50;

export const dailySession = {
  pendingTotal: decks.reduce((sum, deck) => sum + deck.pendingToday, 0),
  dailyGoal,
  completedCards: 0,
  breakdown: decks.map((deck) => ({
    slug: deck.slug,
    name: deck.name,
    pending: deck.pendingToday,
  })),
};

export const streakData = {
  current: 6,
  best: 12,
  weekDays: [
    { label: "L", completed: true },
    { label: "M", completed: true },
    { label: "M", completed: true },
    { label: "J", completed: true },
    { label: "V", completed: true },
    { label: "S", completed: true },
    { label: "D", completed: false },
  ] as const,
};

export const progressStats = {
  currentStreak: 6,
  bestStreak: 12,
  cardsStudiedThisWeek: 214,
  averageAccuracy: 82,
  strongestSubject: "Psicología Cognitiva",
  weakestSubject: "Psicología Social",
};

export const studyPreferences = [
  { label: "Objetivo diario", value: `${dailyGoal} cards` },
  { label: "Recordatorios", value: "Activados", highlight: true },
  { label: "Modo estudio", value: "Repetición espaciada" },
] as const;

export const accountFields = [
  { label: "Nombre", value: userProfile.name },
  { label: "Email", value: userProfile.email },
  { label: "Universidad", value: userProfile.university },
  { label: "Carrera", value: userProfile.career },
];

const deckFlashcards: Record<string, Flashcard[]> = {
  "psicologia-cognitiva": [
    {
      id: "pc-1",
      question: "¿Qué es la memoria de trabajo?",
      answer:
        "Sistema cognitivo de capacidad limitada que mantiene y manipula información temporalmente durante el desempeño de tareas complejas.",
      status: "repaso",
    },
    {
      id: "pc-2",
      question: "¿Qué describe el modelo de procesamiento de información?",
      answer:
        "Propone que la cognición funciona como un sistema de etapas (entrada, almacenamiento y recuperación) similar a un computador.",
      status: "nueva",
    },
    {
      id: "pc-3",
      question: "¿Qué es la atención selectiva?",
      answer:
        "Capacidad de concentrarse en un estímulo relevante mientras se ignoran otros estímulos simultáneos.",
      status: "repaso",
    },
  ],
  "psicologia-social": [
    {
      id: "ps-1",
      question: "¿Qué es la influencia social?",
      answer:
        "Efecto que ejercen las personas o el contexto social sobre las actitudes, percepciones y conductas de un individuo.",
      status: "repaso",
    },
    {
      id: "ps-2",
      question: "¿Qué es el conformismo?",
      answer:
        "Cambio de conducta o creencias para alinearse con las normas o expectativas de un grupo.",
      status: "nueva",
    },
  ],
};

export function getDeckBySlug(slug: string): Deck | undefined {
  return decks.find((deck) => deck.slug === slug);
}

export function getDeckCards(slug: string): Flashcard[] {
  return deckFlashcards[slug] ?? [];
}

export function getSessionCards(): Flashcard[] {
  return decks.flatMap((deck) => {
    const cards = deckFlashcards[deck.slug] ?? [];
    return cards.slice(0, Math.min(deck.pendingToday, cards.length));
  });
}

export const ratingButtons = [
  {
    label: "Otra vez",
    sublabel: "< 1 min",
    className:
      "border-red-200/80 bg-red-50 text-red-800 hover:bg-red-100/80",
  },
  {
    label: "Difícil",
    sublabel: "1-10 min",
    className:
      "border-orange-200/80 bg-orange-50 text-orange-900 hover:bg-orange-100/80",
  },
  {
    label: "Bien",
    sublabel: "10-60 min",
    className:
      "border-emerald-200/80 bg-emerald-50 text-emerald-900 hover:bg-emerald-100/80",
  },
  {
    label: "Fácil",
    sublabel: "> 60 min",
    className:
      "border-electric-lime/50 bg-fresh-lime/20 text-midnight-ink hover:bg-fresh-lime/35",
  },
] as const;
