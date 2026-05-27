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

export function getNextReviewAtSql(rating: StudyRating): string {
  switch (rating) {
    case "again":
      return "NOW() + INTERVAL '5 minutes'";
    case "hard":
      return "NOW() + INTERVAL '30 minutes'";
    case "good":
      return "NOW() + INTERVAL '1 day'";
    case "easy":
      return "NOW() + INTERVAL '3 days'";
  }
}
