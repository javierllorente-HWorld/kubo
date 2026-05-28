export type StudyRating = "again" | "hard" | "good" | "easy";

const RATING_LABEL_TO_KEY: Record<string, StudyRating> = {
  "Otra vez": "again",
  Difícil: "hard",
  Bien: "good",
  Fácil: "easy",
};

const RATING_XP: Record<StudyRating, number> = {
  again: 2,
  hard: 5,
  good: 10,
  easy: 15,
};

export function parseStudyRating(label: string): StudyRating | null {
  return RATING_LABEL_TO_KEY[label] ?? null;
}

export function getRatingXp(rating: StudyRating): number {
  return RATING_XP[rating];
}

export function getRatingCardStatus(rating: StudyRating): "learning" | "review" {
  return rating === "good" || rating === "easy" ? "review" : "learning";
}

const NEXT_REVIEW_AT_SQL: Record<StudyRating, string> = {
  again: "NOW() + INTERVAL '5 minutes'",
  hard: "NOW() + INTERVAL '30 minutes'",
  good: "NOW() + INTERVAL '1 day'",
  easy: "NOW() + INTERVAL '3 days'",
};

export function getNextReviewAtSql(rating: StudyRating): string {
  const sql = NEXT_REVIEW_AT_SQL[rating];

  if (!sql) {
    throw new Error(`Rating inválido: ${String(rating)}`);
  }

  return sql;
}
