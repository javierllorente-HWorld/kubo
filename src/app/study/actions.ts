"use server";

import { revalidatePath } from "next/cache";
import { reviewCard } from "@/lib/db-queries";
import { parseStudyRating } from "@/lib/study-rating";

export type ReviewCardActionResult = {
  ok: boolean;
  error?: string;
};

export async function reviewCardAction(
  cardId: string,
  ratingLabel: string,
  options?: { deckSlug?: string },
): Promise<ReviewCardActionResult> {
  const rating = parseStudyRating(ratingLabel);

  if (!rating) {
    return { ok: false, error: "Calificación inválida" };
  }

  try {
    console.log("[study] reviewCardAction", { cardId, rating, ratingLabel });

    await reviewCard(cardId, rating);

    console.log("[study] reviewCardAction ok", { cardId, rating });

    revalidatePath("/dashboard");
    revalidatePath("/estudiar/sesion");
    revalidatePath("/perfil");
    revalidatePath("/materias");

    if (options?.deckSlug) {
      revalidatePath(`/materias/${options.deckSlug}/estudiar`);
    }

    return { ok: true };
  } catch (error) {
    console.error("[study] reviewCardAction failed", {
      cardId,
      rating,
      ratingLabel,
      error,
    });
    throw error;
  }
}
