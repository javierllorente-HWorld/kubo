import type {
  DashboardData,
  DeckEditContext,
  DeckOverview,
  StudyFlashcard,
  StudySessionCard,
  SubjectOverview,
  UserProfile,
  UserSettings,
  UserStats,
} from "@/lib/db-queries";
import {
  dailyGoal,
  dailySession,
  decks,
  getDeckBySlug,
  getDeckCards,
  getDeckSessionCards,
  getSessionCards,
  progressStats,
  decksBySubjectId,
  subjects,
  userProfile,
} from "@/lib/mock-data";

export function getMockUserProfile(): UserProfile {
  return {
    id: "mock",
    name: userProfile.name,
    email: userProfile.email,
    career: userProfile.career,
    university: userProfile.university,
    total_xp: userProfile.xp,
  };
}

export function getMockUserSettings(): UserSettings {
  return {
    daily_goal_cards: dailyGoal,
    study_mode: "Repetición espaciada",
  };
}

export function getMockUserStats(): UserStats {
  return {
    current_streak_days: progressStats.currentStreak,
    best_streak_days: progressStats.bestStreak,
    weekly_cards_studied: progressStats.cardsStudiedThisWeek,
    average_accuracy: progressStats.averageAccuracy,
    strongest_deck_id: progressStats.strongestDeck,
    weakest_deck_id: progressStats.weakestDeck,
  };
}

export function getMockDecksOverview(): DeckOverview[] {
  return decks.map((deck) => ({ ...deck }));
}

export function getMockSubjects(): SubjectOverview[] {
  return subjects.map((subject) => ({ ...subject }));
}

export function getMockSubjectById(
  subjectId: string,
): SubjectOverview | null {
  const subject = subjects.find((item) => item.id === subjectId);
  return subject ? { ...subject } : null;
}

export function getMockDecksBySubjectId(subjectId: string): DeckOverview[] {
  const subjectDecks = decksBySubjectId[subjectId] ?? [];
  return subjectDecks.map((deck) => ({ ...deck }));
}

export function getMockDashboardData(): DashboardData {
  const overview = getMockDecksOverview();

  return {
    profile: getMockUserProfile(),
    settings: getMockUserSettings(),
    stats: getMockUserStats(),
    previewDecks: overview.slice(0, 2),
    dailySession: {
      pendingTotal: dailySession.pendingTotal,
      dailyGoal: dailySession.dailyGoal,
      completedCards: dailySession.completedCards,
      breakdown: dailySession.breakdown.map((item) => ({ ...item })),
    },
    firstName: userProfile.name.split(" ")[0] ?? "Estudiante",
  };
}

export function getMockDueCardsForDailySession(): StudySessionCard[] {
  return getSessionCards();
}

export function getMockDeckBySlug(slug: string): DeckOverview | null {
  const deck = getDeckBySlug(slug);
  return deck ? { ...deck } : null;
}

export function getMockDeckById(deckId: string): DeckOverview | null {
  const deck = decks.find((item) => item.id === deckId);
  return deck ? { ...deck } : null;
}

export function getMockDeckSessionCards(slug: string): StudySessionCard[] {
  return getDeckSessionCards(slug);
}

export function getMockDeckSessionCardsByDeckId(
  deckId: string,
): StudySessionCard[] {
  const deck = getMockDeckById(deckId);
  if (!deck) {
    return [];
  }

  return getDeckSessionCards(deck.slug);
}

function findMockSubjectIdForDeckSlug(slug: string): string | null {
  for (const [subjectId, subjectDecks] of Object.entries(decksBySubjectId)) {
    if (subjectDecks.some((deck) => deck.slug === slug)) {
      return subjectId;
    }
  }

  return null;
}

function findMockSubjectIdForDeckId(deckId: string): string | null {
  for (const [subjectId, subjectDecks] of Object.entries(decksBySubjectId)) {
    if (subjectDecks.some((deck) => deck.id === deckId)) {
      return subjectId;
    }
  }

  return null;
}

export function getMockDeckEditContext(slug: string): DeckEditContext | null {
  const deck = getDeckBySlug(slug);
  const subjectId = findMockSubjectIdForDeckSlug(slug);

  if (!deck || !subjectId) {
    return null;
  }

  return {
    deck: { ...deck },
    subjectId,
  };
}

export function getMockDeckEditContextById(
  deckId: string,
): DeckEditContext | null {
  const deck = getMockDeckById(deckId);
  const subjectId = findMockSubjectIdForDeckId(deckId);

  if (!deck || !subjectId) {
    return null;
  }

  return {
    deck: { ...deck },
    subjectId,
  };
}

export function getMockDeckCards(slug: string): StudyFlashcard[] {
  return getDeckCards(slug).map((card) => ({ ...card }));
}

export function getMockDeckCardsByDeckId(deckId: string): StudyFlashcard[] {
  const deck = getMockDeckById(deckId);
  if (!deck) {
    return [];
  }

  return getDeckCards(deck.slug).map((card) => ({ ...card }));
}
