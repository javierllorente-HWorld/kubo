import { cookies } from "next/headers";
import { DEMO_USER_ID } from "@/lib/demo-user";

const SESSION_COOKIE = "kubo_session";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUserId(value: string | undefined): value is string {
  return Boolean(value && UUID_RE.test(value));
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return isValidUserId(value) ? value : null;
}

/** Usuario de sesión real o Andrés Demo si no hay sesión. */
export async function getCurrentUserId(): Promise<string> {
  const sessionUserId = await getSessionUserId();
  return sessionUserId ?? DEMO_USER_ID;
}

export async function setSessionUserId(userId: string): Promise<void> {
  if (!isValidUserId(userId)) {
    throw new Error("Identificador de usuario inválido");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
