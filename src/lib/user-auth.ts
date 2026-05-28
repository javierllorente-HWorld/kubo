import type { UserProfile } from "@/lib/db-queries";
import { query } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

export type CreateUserWithPasswordInput = {
  name: string;
  email: string;
  password: string;
  career: string;
  university: string;
};

export type UpsertUserWithPasswordInput = CreateUserWithPasswordInput & {
  total_xp?: number;
};

type UserAuthRow = UserProfile & {
  password_hash: string | null;
};

const USER_PUBLIC_COLUMNS =
  "id, name, email, career, university, total_xp";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function validateCreateUserInput(data: CreateUserWithPasswordInput): {
  name: string;
  email: string;
  password: string;
  career: string;
  university: string;
} {
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

function toPublicUser(row: UserAuthRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    career: row.career,
    university: row.university,
    total_xp: row.total_xp,
  };
}

export async function createUserWithPassword(
  data: CreateUserWithPasswordInput,
): Promise<UserProfile> {
  const input = validateCreateUserInput(data);
  const passwordHash = await hashPassword(input.password);

  try {
    const rows = await query<UserProfile>(
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

    const user = rows[0];
    if (!user) {
      throw new Error("No se pudo crear el usuario");
    }

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

export async function upsertUserWithPassword(
  data: UpsertUserWithPasswordInput,
): Promise<{ user: UserProfile; created: boolean }> {
  const input = validateCreateUserInput(data);
  const passwordHash = await hashPassword(input.password);
  const totalXp = data.total_xp ?? 0;

  const existing = await query<{ id: string }>(
    `SELECT id FROM users WHERE LOWER(email) = $1`,
    [input.email],
  );

  if (existing[0]) {
    const rows = await query<UserProfile>(
      `UPDATE users
       SET password_hash = $2,
           career = $3,
           university = $4,
           updated_at = NOW()
       WHERE LOWER(email) = $5
       RETURNING ${USER_PUBLIC_COLUMNS}`,
      [passwordHash, input.career, input.university, input.email],
    );

    const user = rows[0];
    if (!user) {
      throw new Error("No se pudo actualizar el usuario");
    }

    return { user, created: false };
  }

  const rows = await query<UserProfile>(
    `INSERT INTO users (name, email, password_hash, career, university, total_xp)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${USER_PUBLIC_COLUMNS}`,
    [
      input.name,
      input.email,
      passwordHash,
      input.career,
      input.university,
      totalXp,
    ],
  );

  const user = rows[0];
  if (!user) {
    throw new Error("No se pudo crear el usuario");
  }

  return { user, created: true };
}

export async function verifyUserPassword(
  email: string,
  password: string,
): Promise<UserProfile | null> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return null;
  }

  const rows = await query<UserAuthRow>(
    `SELECT ${USER_PUBLIC_COLUMNS}, password_hash
     FROM users
     WHERE LOWER(email) = $1`,
    [normalizedEmail],
  );

  const row = rows[0];
  if (!row?.password_hash) {
    return null;
  }

  const isValid = await verifyPassword(password, row.password_hash);
  if (!isValid) {
    return null;
  }

  return toPublicUser(row);
}
