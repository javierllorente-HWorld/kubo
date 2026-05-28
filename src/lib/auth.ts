import type { UserProfile } from "@/lib/db-queries";
import { query, withTransaction } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import {
  clearSession,
  getCurrentUserId,
  getSessionUserId,
  setSessionUserId,
} from "@/lib/auth-session";
import { DEMO_USER_ID } from "@/lib/demo-user";
import { verifyUserPassword } from "@/lib/user-auth";

export { getCurrentUserId, getSessionUserId };

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  career: string;
  university: string;
};

const USER_PUBLIC_COLUMNS =
  "id, name, email, career, university, total_xp";

const DEFAULT_DAILY_GOAL_CARDS = 50;
const DEFAULT_STUDY_MODE = "Repetición espaciada";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const DEMO_LOGIN_EMAIL = "demo@kubo.app";
const DEMO_LOGIN_PASSWORD = "kubo123";

type DemoAuthRow = {
  id: string;
  email: string;
  password_hash: string | null;
};

/**
 * Asegura que el usuario demo existente (DEMO_USER_ID) pueda loguearse con
 * demo@kubo.app. No crea usuarios nuevos ni toca datos de estudio.
 */
async function ensureDemoUserLoginReady(passwordAttempt: string): Promise<void> {
  const rows = await query<DemoAuthRow>(
    `SELECT id, email, password_hash
     FROM users
     WHERE id = $1`,
    [DEMO_USER_ID],
  );

  const demo = rows[0];
  if (!demo) {
    // Si el demo no existe en la DB, no hacemos nada especial (login fallará normalmente).
    return;
  }

  // Evita choque de email con otro usuario (si demo@kubo.app ya está tomado).
  const emailConflict = await query<{ id: string }>(
    `SELECT id FROM users WHERE LOWER(email) = $1 AND id <> $2`,
    [DEMO_LOGIN_EMAIL, DEMO_USER_ID],
  );

  if (emailConflict[0]) {
    return;
  }

  if (demo.email.toLowerCase() !== DEMO_LOGIN_EMAIL) {
    await query(
      `UPDATE users
       SET email = $2,
           updated_at = NOW()
       WHERE id = $1`,
      [DEMO_USER_ID, DEMO_LOGIN_EMAIL],
    );
  }

  if (!demo.password_hash && passwordAttempt === DEMO_LOGIN_PASSWORD) {
    const passwordHash = await hashPassword(DEMO_LOGIN_PASSWORD);
    await query(
      `UPDATE users
       SET password_hash = $2,
           updated_at = NOW()
       WHERE id = $1`,
      [DEMO_USER_ID, passwordHash],
    );
  }
}

function validateRegisterInput(data: RegisterUserInput): RegisterUserInput {
  const name = data.name.trim();
  const email = normalizeEmail(data.email);
  const password = data.password;
  const career = data.career.trim();
  const university = data.university.trim();

  if (!name) {
    throw new Error("El nombre es obligatorio");
  }

  if (!email) {
    throw new Error("El email es obligatorio");
  }

  if (!password) {
    throw new Error("La contraseña es obligatoria");
  }

  if (!career) {
    throw new Error("La carrera es obligatoria");
  }

  if (!university) {
    throw new Error("La universidad es obligatoria");
  }

  return { name, email, password, career, university };
}

export async function registerUser(
  data: RegisterUserInput,
): Promise<UserProfile> {
  const input = validateRegisterInput(data);
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await withTransaction(async (queryInTx) => {
      const userRows = await queryInTx<UserProfile>(
        `INSERT INTO users (name, email, password_hash, career, university)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING ${USER_PUBLIC_COLUMNS}`,
        [
          input.name,
          input.email,
          passwordHash,
          input.career,
          input.university,
        ],
      );

      const createdUser = userRows[0];
      if (!createdUser) {
        throw new Error("No se pudo crear el usuario");
      }

      await queryInTx(
        `INSERT INTO user_settings (user_id, daily_goal_cards, study_mode)
         VALUES ($1, $2, $3)`,
        [createdUser.id, DEFAULT_DAILY_GOAL_CARDS, DEFAULT_STUDY_MODE],
      );

      await queryInTx(
        `INSERT INTO user_stats (
           user_id,
           current_streak_days,
           best_streak_days,
           weekly_cards_studied,
           average_accuracy
         )
         VALUES ($1, 0, 0, 0, 0)`,
        [createdUser.id],
      );

      return createdUser;
    });

    await setSessionUserId(user.id);
    return user;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw new Error("Ya existe un usuario con ese email");
    }

    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<UserProfile> {
  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail === DEMO_LOGIN_EMAIL) {
    await ensureDemoUserLoginReady(password);
  }

  const user = await verifyUserPassword(email, password);

  if (!user) {
    throw new Error("Email o contraseña incorrectos");
  }

  await setSessionUserId(user.id);
  return user;
}

export async function logoutUser(): Promise<void> {
  await clearSession();
}
