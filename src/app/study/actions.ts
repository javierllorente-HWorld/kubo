"use server";

import { revalidatePath } from "next/cache";
import { recordStudySessionCompleted, reviewCard } from "@/lib/db-queries";
import { parseStudyRating } from "@/lib/study-rating";

export type StudySessionCompleteInput = {
  xpEarned: number;
  studied: number;
  newCards: number;
  reviewCards: number;
  deckId?: string;
};

export type ReviewCardActionResult = {
  ok: boolean;
  error?: string;
};

export async function reviewCardAction(
  cardId: string,
  ratingLabel: string,
  options?: { deckId?: string },
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

    if (options?.deckId) {
      revalidatePath(`/materias/decks/${options.deckId}/estudiar`);
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

export async function recordStudySessionCompletedAction(
  data: StudySessionCompleteInput,
): Promise<{ ok: boolean; error?: string }> {
  if (data.studied <= 0) {
    return { ok: true };
  }

  try {
    await recordStudySessionCompleted({
      xpEarned: data.xpEarned,
      cardsStudied: data.studied,
      newCards: data.newCards,
      reviewCards: data.reviewCards,
      deckId: data.deckId ?? null,
    });

    revalidatePath("/dashboard");
    revalidatePath("/estudiar/sesion");
    revalidatePath("/perfil");
    revalidatePath("/materias");

    if (data.deckId) {
      revalidatePath(`/materias/decks/${data.deckId}/estudiar`);
    }

    return { ok: true };
  } catch (error) {
    console.error("[study] recordStudySessionCompleted failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo registrar la sesión completada",
    };
  }
}

