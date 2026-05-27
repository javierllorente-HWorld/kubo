"use server";

import { revalidatePath } from "next/cache";
import {
  createCard,
  deleteCard,
  updateCard,
} from "@/lib/db-queries";

export type CardActionResult = {
  ok: boolean;
  error?: string;
};

function revalidateDeckCardPaths(deckSlug: string, subjectId: string) {
  revalidatePath(`/materias/${deckSlug}/editar`);
  revalidatePath(`/materias/${deckSlug}/estudiar`);
  revalidatePath(`/materias/${subjectId}`);
  revalidatePath("/materias");
  revalidatePath("/dashboard");
}

export async function createCardAction(
  deckSlug: string,
  subjectId: string,
  deckId: string,
  question: string,
  answer: string,
): Promise<CardActionResult> {
  try {
    await createCard(deckId, question, answer);
    revalidateDeckCardPaths(deckSlug, subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] createCard failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo crear la card",
    };
  }
}

export async function updateCardAction(
  deckSlug: string,
  subjectId: string,
  cardId: string,
  question: string,
  answer: string,
): Promise<CardActionResult> {
  try {
    const updated = await updateCard(cardId, question, answer);
    if (!updated) {
      return { ok: false, error: "No se encontró la card" };
    }
    revalidateDeckCardPaths(deckSlug, subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] updateCard failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo actualizar la card",
    };
  }
}

export async function deleteCardAction(
  deckSlug: string,
  subjectId: string,
  cardId: string,
): Promise<CardActionResult> {
  try {
    const deleted = await deleteCard(cardId);
    if (!deleted) {
      return { ok: false, error: "No se encontró la card" };
    }
    revalidateDeckCardPaths(deckSlug, subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] deleteCard failed:", error);
    return {
      ok: false,
      error: "No se pudo borrar la card",
    };
  }
}
