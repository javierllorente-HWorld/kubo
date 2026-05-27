"use server";

import { revalidatePath } from "next/cache";
import {
  createDeck,
  deleteDeck,
  updateDeck,
} from "@/lib/db-queries";

export type DeckActionResult = {
  ok: boolean;
  error?: string;
};

function revalidateSubjectPaths(subjectId: string) {
  revalidatePath(`/materias/${subjectId}`);
  revalidatePath("/materias");
  revalidatePath("/dashboard");
}

export async function createDeckAction(
  subjectId: string,
  name: string,
  description: string,
): Promise<DeckActionResult> {
  try {
    await createDeck(subjectId, name, description);
    revalidateSubjectPaths(subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] createDeck failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo crear el deck",
    };
  }
}

export async function updateDeckAction(
  subjectId: string,
  deckId: string,
  name: string,
  description: string,
): Promise<DeckActionResult> {
  try {
    const updated = await updateDeck(deckId, name, description);
    if (!updated) {
      return { ok: false, error: "No se encontró el deck" };
    }
    revalidateSubjectPaths(subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] updateDeck failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo actualizar el deck",
    };
  }
}

export async function deleteDeckAction(
  subjectId: string,
  deckId: string,
): Promise<DeckActionResult> {
  try {
    const deleted = await deleteDeck(deckId);
    if (!deleted) {
      return { ok: false, error: "No se encontró el deck" };
    }
    revalidateSubjectPaths(subjectId);
    return { ok: true };
  } catch (error) {
    console.error("[materias] deleteDeck failed:", error);
    return {
      ok: false,
      error: "No se pudo quitar el deck",
    };
  }
}
