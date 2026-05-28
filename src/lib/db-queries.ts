import { query, withTransaction } from "@/lib/db";
import {
  getNextReviewAtSql,
  getRatingCardStatus,
  getRatingXp,
  type StudyRating,
} from "@/lib/study-rating";

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

export type DeckOverview = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  emoji: string;
  masteryPercent: number;
  cardsLearned: number;
  totalCards: number;
  pendingToday: number;
};

export type StudyFlashcard = {
  id: string;
  question: string;
  answer: string;
  status: "repaso" | "nueva";
};

export type StudySessionCard = StudyFlashcard & {
  deckSlug: string;
  deckName: string;
  deckEmoji: string;
};

export type SubjectOverview = {
  id: string;
  name: string;
  emoji: string;
  deckCount: number;
};

export type SubjectWithDecks = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  decks: DeckOverview[];
};

export type DashboardDailySession = {
  pendingTotal: number;
  dailyGoal: number;
  completedCards: number;
  breakdown: { slug: string; name: string; pending: number }[];
};

export type DashboardData = {
  profile: UserProfile | null;
  settings: UserSettings | null;
  stats: UserStats | null;
  previewDecks: DeckOverview[];
  dailySession: DashboardDailySession;
  firstName: string;
};

type DeckStatsRow = {
  id: string;
  subject_id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  total_cards: number;
  cards_learned: number;
  pending_today: number;
};

type DeckWriteRow = {
  id: string;
  name: string;
  description: string | null;
};

type SubjectRow = {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
};

type CardRow = {
  id: string;
  question: string;
  answer: string;
  status: string;
};

type DueSessionCardRow = CardRow & {
  deck_name: string;
  deck_emoji: string | null;
};

type DailyProgressRow = {
  cards_reviewed: number;
};

const DECK_SLUG_TO_NAME: Record<string, string> = {
  "psicologia-cognitiva": "Psicología Cognitiva",
  "psicologia-social": "Psicología Social",
};

function slugToDeckName(slug: string): string {
  return (
    DECK_SLUG_TO_NAME[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function deckNameToSlug(name: string): string {
  const known = Object.entries(DECK_SLUG_TO_NAME).find(([, deckName]) => deckName === name);
  if (known) {
    return known[0];
  }

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function mapCardStatus(status: string): "repaso" | "nueva" {
  return status === "review" ? "repaso" : "nueva";
}

function mapDeckOverview(row: DeckStatsRow): DeckOverview {
  const totalCards = Number(row.total_cards);
  const cardsLearned = Number(row.cards_learned);
  const pendingToday = Number(row.pending_today);
  const masteryPercent =
    totalCards === 0 ? 0 : Math.round((cardsLearned / totalCards) * 100);

  return {
    id: row.id,
    slug: deckNameToSlug(row.name),
    name: row.name,
    description: row.description,
    emoji: row.emoji ?? "📚",
    masteryPercent,
    cardsLearned,
    totalCards,
    pendingToday,
  };
}

type FetchDeckStatsOptions = {
  slug?: string;
  subjectId?: string;
};

async function fetchDeckStatsRows(
  options: FetchDeckStatsOptions = {},
): Promise<DeckStatsRow[]> {
  const filters: string[] = [];
  const params: unknown[] = [];

  if (options.slug) {
    params.push(slugToDeckName(options.slug));
    filters.push(`AND d.name = $${params.length}`);
  }

  if (options.subjectId) {
    params.push(options.subjectId);
    filters.push(`AND s.id = $${params.length}`);
  }

  const extraFilters = filters.length > 0 ? filters.join(" ") : "";

  return query<DeckStatsRow>(
    `SELECT d.id,
            d.subject_id,
            d.name,
            d.description,
            s.emoji,
            COUNT(c.id) FILTER (WHERE c.deleted_at IS NULL)::int AS total_cards,
            COUNT(c.id) FILTER (
              WHERE c.deleted_at IS NULL AND c.status = 'review'
            )::int AS cards_learned,
            COUNT(c.id) FILTER (
              WHERE c.deleted_at IS NULL AND c.next_review_at <= NOW()
            )::int AS pending_today
     FROM decks d
     INNER JOIN subjects s ON s.id = d.subject_id
     LEFT JOIN cards c ON c.deck_id = d.id
     WHERE d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
       ${extraFilters}
     GROUP BY d.id, d.subject_id, d.name, d.description, s.emoji
     ORDER BY d.name ASC`,
    params,
  );
}

async function getTodayCompletedCards(): Promise<number> {
  const rows = await query<DailyProgressRow>(
    `SELECT cards_reviewed
     FROM daily_progress
     WHERE user_id = ${firstUserIdSubquery}
       AND date = CURRENT_DATE
     LIMIT 1`,
  );

  return rows[0]?.cards_reviewed ?? 0;
}

export async function getDecksOverview(): Promise<DeckOverview[]> {
  const rows = await fetchDeckStatsRows();
  return rows.map(mapDeckOverview);
}

export async function getDeckBySlug(slug: string): Promise<DeckOverview | null> {
  const rows = await fetchDeckStatsRows({ slug });
  const row = rows[0];
  return row ? mapDeckOverview(row) : null;
}

export type DeckEditContext = {
  deck: DeckOverview;
  subjectId: string;
};

export async function getDeckEditContextBySlug(
  slug: string,
): Promise<DeckEditContext | null> {
  const rows = await fetchDeckStatsRows({ slug });
  const row = rows[0];
  if (!row) {
    return null;
  }

  return {
    deck: mapDeckOverview(row),
    subjectId: row.subject_id,
  };
}

export async function getSubjectById(
  subjectId: string,
): Promise<SubjectOverview | null> {
  const rows = await query<SubjectListRow>(
    `SELECT s.id,
            s.name,
            s.emoji,
            COUNT(d.id) FILTER (WHERE d.deleted_at IS NULL)::int AS deck_count
     FROM subjects s
     LEFT JOIN decks d ON d.subject_id = s.id
     WHERE s.id = $1
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     GROUP BY s.id, s.name, s.emoji`,
    [subjectId],
  );

  const row = rows[0];
  return row ? mapSubjectOverview(row) : null;
}

export async function getDecksBySubjectId(
  subjectId: string,
): Promise<DeckOverview[]> {
  const rows = await fetchDeckStatsRows({ subjectId });
  return rows.map(mapDeckOverview);
}

export async function createDeck(
  subjectId: string,
  name: string,
  description?: string | null,
): Promise<DeckOverview> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("El nombre del deck es obligatorio");
  }

  const trimmedDescription = description?.trim() || null;

  const rows = await query<DeckWriteRow>(
    `INSERT INTO decks (subject_id, name, description)
     SELECT $1, $2, $3
     WHERE EXISTS (
       SELECT 1
       FROM subjects s
       WHERE s.id = $1
         AND s.deleted_at IS NULL
         AND s.user_id = ${firstUserIdSubquery}
     )
     RETURNING id, name, description`,
    [subjectId, trimmedName, trimmedDescription],
  );

  const row = rows[0];
  if (!row) {
    throw new Error("No se pudo crear el deck");
  }

  const decks = await getDecksBySubjectId(subjectId);
  const created = decks.find((deck) => deck.id === row.id);
  if (created) {
    return created;
  }

  return {
    id: row.id,
    slug: deckNameToSlug(row.name),
    name: row.name,
    description: row.description,
    emoji: "📚",
    masteryPercent: 0,
    cardsLearned: 0,
    totalCards: 0,
    pendingToday: 0,
  };
}

export async function updateDeck(
  deckId: string,
  name: string,
  description?: string | null,
): Promise<DeckOverview | null> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("El nombre del deck es obligatorio");
  }

  const trimmedDescription = description?.trim() || null;

  const rows = await query<{ subject_id: string } & DeckWriteRow>(
    `UPDATE decks d
     SET name = $2,
         description = $3,
         updated_at = NOW()
     FROM subjects s
     WHERE d.id = $1
       AND d.subject_id = s.id
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     RETURNING d.id, d.name, d.description, d.subject_id`,
    [deckId, trimmedName, trimmedDescription],
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  const decks = await getDecksBySubjectId(row.subject_id);
  return decks.find((deck) => deck.id === row.id) ?? null;
}

export async function deleteDeck(deckId: string): Promise<boolean> {
  const rows = await query<{ id: string }>(
    `UPDATE decks d
     SET deleted_at = NOW(),
         updated_at = NOW()
     FROM subjects s
     WHERE d.id = $1
       AND d.subject_id = s.id
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     RETURNING d.id`,
    [deckId],
  );

  return rows.length > 0;
}

type SubjectListRow = {
  id: string;
  name: string;
  emoji: string | null;
  deck_count: number;
};

function mapSubjectOverview(row: SubjectListRow): SubjectOverview {
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji ?? "📚",
    deckCount: Number(row.deck_count),
  };
}

export async function getSubjects(): Promise<SubjectOverview[]> {
  const rows = await query<SubjectListRow>(
    `SELECT s.id,
            s.name,
            s.emoji,
            COUNT(d.id) FILTER (WHERE d.deleted_at IS NULL)::int AS deck_count
     FROM subjects s
     LEFT JOIN decks d ON d.subject_id = s.id
     WHERE s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     GROUP BY s.id, s.name, s.emoji
     ORDER BY s.name ASC`,
  );

  return rows.map(mapSubjectOverview);
}

export async function createSubject(
  name: string,
  emoji?: string | null,
): Promise<SubjectOverview> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("El nombre de la materia es obligatorio");
  }

  const rows = await query<SubjectListRow>(
    `INSERT INTO subjects (user_id, name, emoji)
     VALUES (${firstUserIdSubquery}, $1, $2)
     RETURNING id, name, emoji, 0::int AS deck_count`,
    [trimmedName, emoji ?? null],
  );

  const row = rows[0];
  if (!row) {
    throw new Error("No se pudo crear la materia");
  }

  return mapSubjectOverview(row);
}

export async function updateSubject(
  subjectId: string,
  name: string,
  emoji?: string | null,
): Promise<SubjectOverview | null> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("El nombre de la materia es obligatorio");
  }

  const rows = await query<SubjectListRow>(
    `UPDATE subjects
     SET name = $2,
         emoji = $3,
         updated_at = NOW()
     WHERE id = $1
       AND deleted_at IS NULL
       AND user_id = ${firstUserIdSubquery}
     RETURNING id,
               name,
               emoji,
               (
                 SELECT COUNT(*)::int
                 FROM decks d
                 WHERE d.subject_id = subjects.id
                   AND d.deleted_at IS NULL
               ) AS deck_count`,
    [subjectId, trimmedName, emoji ?? null],
  );

  const row = rows[0];
  return row ? mapSubjectOverview(row) : null;
}

export async function deleteSubject(subjectId: string): Promise<boolean> {
  const rows = await query<{ id: string }>(
    `UPDATE subjects
     SET deleted_at = NOW(),
         updated_at = NOW()
     WHERE id = $1
       AND deleted_at IS NULL
       AND user_id = ${firstUserIdSubquery}
     RETURNING id`,
    [subjectId],
  );

  return rows.length > 0;
}

export async function getSubjectsWithDecks(): Promise<SubjectWithDecks[]> {
  const subjects = await query<SubjectRow>(
    `SELECT id, name, slug, emoji
     FROM subjects
     WHERE deleted_at IS NULL
       AND user_id = ${firstUserIdSubquery}
     ORDER BY name ASC`,
  );

  const deckRows = await fetchDeckStatsRows();
  const decksBySubject = new Map<string, DeckOverview[]>();

  for (const row of deckRows) {
    const deck = mapDeckOverview(row);
    const existing = decksBySubject.get(row.subject_id) ?? [];
    existing.push(deck);
    decksBySubject.set(row.subject_id, existing);
  }

  return subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    slug: subject.slug,
    emoji: subject.emoji ?? "📚",
    decks: decksBySubject.get(subject.id) ?? [],
  }));
}

function mapStudyFlashcard(row: CardRow): StudyFlashcard {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    status: mapCardStatus(row.status),
  };
}

export async function getCardsForDeck(
  slug: string,
  options?: { dueOnly?: boolean },
): Promise<StudyFlashcard[]> {
  const dueOnly = options?.dueOnly ?? false;
  const dueFilter = dueOnly ? "AND c.next_review_at <= NOW()" : "";

  const rows = await query<CardRow>(
    `SELECT c.id, c.question, c.answer, c.status
     FROM cards c
     INNER JOIN decks d ON d.id = c.deck_id
     INNER JOIN subjects s ON s.id = d.subject_id
     WHERE d.name = $1
       AND c.deleted_at IS NULL
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
       ${dueFilter}
     ORDER BY c.created_at ASC NULLS LAST, c.id ASC`,
    [slugToDeckName(slug)],
  );

  return rows.map(mapStudyFlashcard);
}

export async function getCardsForDeckByDeckId(
  deckId: string,
): Promise<StudyFlashcard[]> {
  const rows = await query<CardRow>(
    `SELECT c.id, c.question, c.answer, c.status
     FROM cards c
     INNER JOIN decks d ON d.id = c.deck_id
     INNER JOIN subjects s ON s.id = d.subject_id
     WHERE c.deck_id = $1
       AND c.deleted_at IS NULL
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     ORDER BY c.created_at ASC NULLS LAST, c.id ASC`,
    [deckId],
  );

  return rows.map(mapStudyFlashcard);
}

export async function createCard(
  deckId: string,
  question: string,
  answer: string,
): Promise<StudyFlashcard> {
  const trimmedQuestion = question.trim();
  const trimmedAnswer = answer.trim();

  if (!trimmedQuestion) {
    throw new Error("La pregunta es obligatoria");
  }

  if (!trimmedAnswer) {
    throw new Error("La respuesta es obligatoria");
  }

  const rows = await query<CardRow>(
    `INSERT INTO cards (deck_id, question, answer, status, review_count, next_review_at)
     SELECT $1, $2, $3, 'new', 0, NOW()
     WHERE EXISTS (
       SELECT 1
       FROM decks d
       INNER JOIN subjects s ON s.id = d.subject_id
       WHERE d.id = $1
         AND d.deleted_at IS NULL
         AND s.deleted_at IS NULL
         AND s.user_id = ${firstUserIdSubquery}
     )
     RETURNING id, question, answer, status`,
    [deckId, trimmedQuestion, trimmedAnswer],
  );

  const row = rows[0];
  if (!row) {
    throw new Error("No se pudo crear la card");
  }

  return mapStudyFlashcard(row);
}

export async function updateCard(
  cardId: string,
  question: string,
  answer: string,
): Promise<StudyFlashcard | null> {
  const trimmedQuestion = question.trim();
  const trimmedAnswer = answer.trim();

  if (!trimmedQuestion) {
    throw new Error("La pregunta es obligatoria");
  }

  if (!trimmedAnswer) {
    throw new Error("La respuesta es obligatoria");
  }

  const rows = await query<CardRow>(
    `UPDATE cards c
     SET question = $2,
         answer = $3,
         updated_at = NOW()
     FROM decks d
     INNER JOIN subjects s ON s.id = d.subject_id
     WHERE c.id = $1
       AND c.deck_id = d.id
       AND c.deleted_at IS NULL
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     RETURNING c.id, c.question, c.answer, c.status`,
    [cardId, trimmedQuestion, trimmedAnswer],
  );

  const row = rows[0];
  return row ? mapStudyFlashcard(row) : null;
}

export async function deleteCard(cardId: string): Promise<boolean> {
  const rows = await query<{ id: string }>(
    `UPDATE cards c
     SET deleted_at = NOW(),
         updated_at = NOW()
     FROM decks d
     INNER JOIN subjects s ON s.id = d.subject_id
     WHERE c.id = $1
       AND c.deck_id = d.id
       AND c.deleted_at IS NULL
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND s.user_id = ${firstUserIdSubquery}
     RETURNING c.id`,
    [cardId],
  );

  return rows.length > 0;
}

export async function getDueCardsForDailySession(): Promise<StudySessionCard[]> {
  const rows = await query<DueSessionCardRow>(
    `SELECT c.id,
            c.question,
            c.answer,
            c.status,
            d.name AS deck_name,
            s.emoji AS deck_emoji
     FROM cards c
     INNER JOIN decks d ON d.id = c.deck_id
     INNER JOIN subjects s ON s.id = d.subject_id
     WHERE c.deleted_at IS NULL
       AND d.deleted_at IS NULL
       AND s.deleted_at IS NULL
       AND c.next_review_at <= NOW()
       AND s.user_id = ${firstUserIdSubquery}
     ORDER BY c.next_review_at ASC`,
  );

  return rows.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    status: mapCardStatus(row.status),
    deckSlug: deckNameToSlug(row.deck_name),
    deckName: row.deck_name,
    deckEmoji: row.deck_emoji ?? "📚",
  }));
}

export async function getDeckSessionCards(
  slug: string,
): Promise<StudySessionCard[]> {
  const deck = await getDeckBySlug(slug);
  if (!deck) {
    return [];
  }

  const cards = await getCardsForDeck(slug, { dueOnly: true });
  const limit =
    deck.pendingToday > 0
      ? Math.min(deck.pendingToday, cards.length)
      : cards.length;

  return cards.slice(0, limit).map((card) => ({
    ...card,
    deckSlug: deck.slug,
    deckName: deck.name,
    deckEmoji: deck.emoji,
  }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const [profile, settings, stats, decks, completedCards] = await Promise.all([
    getUserProfile(),
    getUserSettings(),
    getUserStats(),
    getDecksOverview(),
    getTodayCompletedCards(),
  ]);

  const breakdown = decks
    .filter((deck) => deck.pendingToday > 0)
    .map((deck) => ({
      slug: deck.slug,
      name: deck.name,
      pending: deck.pendingToday,
    }));

  const pendingTotal = decks.reduce((sum, deck) => sum + deck.pendingToday, 0);

  return {
    profile,
    settings,
    stats,
    previewDecks: decks.slice(0, 2),
    dailySession: {
      pendingTotal,
      dailyGoal: settings?.daily_goal_cards ?? 0,
      completedCards,
      breakdown,
    },
    firstName: profile?.name.split(" ")[0] ?? "Estudiante",
  };
}

export async function reviewCard(
  cardId: string,
  rating: StudyRating,
): Promise<void> {
  const xpEarned = getRatingXp(rating);
  const cardStatus = getRatingCardStatus(rating);
  const nextReviewAtSql = getNextReviewAtSql(rating);

  console.log("[reviewCard] start", { cardId, rating, xpEarned, cardStatus });

  await withTransaction(async (queryInTx) => {
    const reviewRows = await queryInTx<{ id: string }>(
      `INSERT INTO card_reviews (card_id, user_id, rating, xp_earned)
       SELECT $1,
              ${firstUserIdSubquery},
              $2,
              $3
       WHERE EXISTS (
         SELECT 1
         FROM cards c
         INNER JOIN decks d ON d.id = c.deck_id
         INNER JOIN subjects s ON s.id = d.subject_id
         WHERE c.id = $1
           AND c.deleted_at IS NULL
           AND d.deleted_at IS NULL
           AND s.deleted_at IS NULL
           AND s.user_id = ${firstUserIdSubquery}
       )
       RETURNING id`,
      [cardId, rating, xpEarned],
    );

    if (!reviewRows[0]) {
      throw new Error(
        `[reviewCard] INSERT card_reviews afectó 0 filas (cardId=${cardId})`,
      );
    }

    console.log("[reviewCard] card_reviews inserted", { reviewId: reviewRows[0].id });

    const cardRows = await queryInTx<{ id: string }>(
      `UPDATE cards c
       SET status = $2,
           review_count = review_count + 1,
           last_reviewed_at = NOW(),
           next_review_at = ${nextReviewAtSql},
           updated_at = NOW()
       FROM decks d
       INNER JOIN subjects s ON s.id = d.subject_id
       WHERE c.id = $1
         AND c.deck_id = d.id
         AND c.deleted_at IS NULL
         AND d.deleted_at IS NULL
         AND s.deleted_at IS NULL
         AND s.user_id = ${firstUserIdSubquery}
       RETURNING c.id`,
      [cardId, cardStatus],
    );

    if (!cardRows[0]) {
      throw new Error(
        `[reviewCard] UPDATE cards afectó 0 filas (cardId=${cardId})`,
      );
    }

    console.log("[reviewCard] cards updated", { cardId: cardRows[0].id });

    const userRows = await queryInTx<{ id: string }>(
      `UPDATE users
       SET total_xp = total_xp + $1
       WHERE id = ${firstUserIdSubquery}
       RETURNING id`,
      [xpEarned],
    );

    if (!userRows[0]) {
      throw new Error("[reviewCard] UPDATE users afectó 0 filas");
    }

    console.log("[reviewCard] users.total_xp updated", { userId: userRows[0].id });

    const progressUpdated = await queryInTx<{ id: string }>(
      `UPDATE daily_progress
       SET cards_reviewed = cards_reviewed + 1,
           xp_earned = xp_earned + $1
       WHERE user_id = ${firstUserIdSubquery}
         AND date = CURRENT_DATE
       RETURNING id`,
      [xpEarned],
    );

    if (progressUpdated[0]) {
      console.log("[reviewCard] daily_progress updated", {
        progressId: progressUpdated[0].id,
      });
      return;
    }

    const progressInserted = await queryInTx<{ id: string }>(
      `INSERT INTO daily_progress (user_id, date, cards_reviewed, xp_earned)
       VALUES (${firstUserIdSubquery}, CURRENT_DATE, 1, $1)
       RETURNING id`,
      [xpEarned],
    );

    if (!progressInserted[0]) {
      throw new Error("[reviewCard] INSERT daily_progress afectó 0 filas");
    }

    console.log("[reviewCard] daily_progress inserted", {
      progressId: progressInserted[0].id,
    });
  });

  console.log("[reviewCard] committed", { cardId, rating });
}
