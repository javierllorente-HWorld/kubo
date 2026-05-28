"use server";

import { redirect } from "next/navigation";
import { loginUser, logoutUser, registerUser } from "@/lib/auth";

export type AuthActionResult = {
  ok: boolean;
  error?: string;
};

export async function loginAction(
  email: string,
  password: string,
): Promise<AuthActionResult> {
  try {
    await loginUser(email, password);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesión",
    };
  }
}

export async function registerAction(input: {
  name: string;
  email: string;
  password: string;
  career: string;
  university: string;
}): Promise<AuthActionResult> {
  try {
    await registerUser(input);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo crear la cuenta",
    };
  }
}

export async function logoutAction(): Promise<void> {
  await logoutUser();
  redirect("/");
}
