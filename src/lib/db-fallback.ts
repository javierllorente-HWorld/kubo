import type {
  DashboardData,
  DeckOverview,
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
  getDeckSessionCards,
  getSessionCards,
  progressStats,
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

export function getMockDeckSessionCards(slug: string): StudySessionCard[] {
  return getDeckSessionCards(slug);
}
