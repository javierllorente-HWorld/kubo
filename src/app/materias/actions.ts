"use server";

import { revalidatePath } from "next/cache";
import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/lib/db-queries";

export type SubjectActionResult = {
  ok: boolean;
  error?: string;
};

export async function createSubjectAction(
  name: string,
  emoji: string,
): Promise<SubjectActionResult> {
  try {
    await createSubject(name, emoji);
    revalidatePath("/materias");
    return { ok: true };
  } catch (error) {
    console.error("[materias] createSubject failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear la materia",
    };
  }
}

export async function updateSubjectAction(
  subjectId: string,
  name: string,
  emoji: string,
): Promise<SubjectActionResult> {
  try {
    const updated = await updateSubject(subjectId, name, emoji);
    if (!updated) {
      return { ok: false, error: "No se encontró la materia" };
    }
    revalidatePath("/materias");
    return { ok: true };
  } catch (error) {
    console.error("[materias] updateSubject failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la materia",
    };
  }
}

export async function deleteSubjectAction(
  subjectId: string,
): Promise<SubjectActionResult> {
  try {
    const deleted = await deleteSubject(subjectId);
    if (!deleted) {
      return { ok: false, error: "No se encontró la materia" };
    }
    revalidatePath("/materias");
    return { ok: true };
  } catch (error) {
    console.error("[materias] deleteSubject failed:", error);
    return {
      ok: false,
      error: "No se pudo quitar la materia",
    };
  }
}
