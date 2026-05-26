import { query } from "@/lib/db";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  career: string;
  university: string;
  total_xp: number;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  career: string;
  university: string;
  total_xp: number;
};

export type UserSettings = {
  daily_goal_cards: number;
  study_mode: string;
};

export type UserStats = {
  current_streak_days: number;
  best_streak_days: number;
  weekly_cards_studied: number;
  average_accuracy: number;
  strongest_deck_id: string | null;
  weakest_deck_id: string | null;
};

const firstUserIdSubquery = "(SELECT id FROM users ORDER BY id LIMIT 1)";

export async function getDemoUser(): Promise<DemoUser | null> {
  const rows = await query<DemoUser>(
    "SELECT id, name, email, career, university, total_xp FROM users LIMIT 1",
  );

  return rows[0] ?? null;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const rows = await query<UserProfile>(
    "SELECT id, name, email, career, university, total_xp FROM users ORDER BY id LIMIT 1",
  );

  return rows[0] ?? null;
}

export async function getUserSettings(): Promise<UserSettings | null> {
  const rows = await query<UserSettings>(
    `SELECT daily_goal_cards, study_mode
     FROM user_settings
     WHERE user_id = ${firstUserIdSubquery}
     LIMIT 1`,
  );

  return rows[0] ?? null;
}

export async function getUserStats(): Promise<UserStats | null> {
  const rows = await query<UserStats>(
    `SELECT current_streak_days,
            best_streak_days,
            weekly_cards_studied,
            average_accuracy,
            strongest_deck_id,
            weakest_deck_id
     FROM user_stats
     WHERE user_id = ${firstUserIdSubquery}
     LIMIT 1`,
  );

  return rows[0] ?? null;
}
