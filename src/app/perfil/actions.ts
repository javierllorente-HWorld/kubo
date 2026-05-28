"use server";

import { revalidatePath } from "next/cache";
import { updateUserProfile, type UserProfileUpdate } from "@/lib/db-queries";

export type ProfileActionResult = {
  ok: boolean;
  error?: string;
};

export async function updateUserProfileAction(
  userId: string,
  data: UserProfileUpdate,
): Promise<ProfileActionResult> {
  try {
    await updateUserProfile(userId, data);
    revalidatePath("/perfil");
    return { ok: true };
  } catch (error) {
    console.error("[perfil] updateUserProfile failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo guardar el perfil",
    };
  }
}
