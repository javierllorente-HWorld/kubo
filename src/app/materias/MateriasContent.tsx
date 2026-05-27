"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { SubjectCard } from "@/components/SubjectCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input, InputLabel } from "@/components/ui/Input";
import type { SubjectOverview } from "@/lib/db-queries";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";
import { deckIconOptions } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import {
  createSubjectAction,
  deleteSubjectAction,
  updateSubjectAction,
} from "./actions";

type MateriasContentProps = {
  subjects: SubjectOverview[];
  usingMockFallback?: boolean;
};

type ModalMode = "create" | "edit" | null;

export function MateriasContent({
  subjects: initialSubjects,
  usingMockFallback = false,
}: MateriasContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [subjects, setSubjects] = useState(initialSubjects);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingSubject, setEditingSubject] = useState<SubjectOverview | null>(
    null,
  );
  const [deletingSubject, setDeletingSubject] = useState<SubjectOverview | null>(
    null,
  );
  const [selectedIcon, setSelectedIcon] = useState<
    (typeof deckIconOptions)[number]
  >(deckIconOptions[0]);
  const [subjectName, setSubjectName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const formTitleId = useId();
  const deleteTitleId = useId();

  useEffect(() => {
    setSubjects(initialSubjects);
  }, [initialSubjects]);

  const isFormOpen = modalMode !== null;
  const isDeleteOpen = deletingSubject !== null;

  function openCreateModal() {
    setModalMode("create");
    setEditingSubject(null);
    setSubjectName("");
    setSelectedIcon(deckIconOptions[0]);
    setFormError(null);
  }

  function openEditModal(subject: SubjectOverview) {
    setModalMode("edit");
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setSelectedIcon(
      (deckIconOptions.includes(subject.emoji as (typeof deckIconOptions)[number])
        ? subject.emoji
        : deckIconOptions[0]) as (typeof deckIconOptions)[number],
    );
    setFormError(null);
  }

  function closeFormModal() {
    setModalMode(null);
    setEditingSubject(null);
    setSubjectName("");
    setSelectedIcon(deckIconOptions[0]);
    setFormError(null);
  }

  function closeDeleteModal() {
    setDeletingSubject(null);
    setFormError(null);
  }

  function handleMockSave() {
    const trimmedName = subjectName.trim();
    if (!trimmedName) {
      setFormError("El nombre es obligatorio");
      return;
    }

    if (modalMode === "edit" && editingSubject) {
      setSubjects((current) =>
        current.map((subject) =>
          subject.id === editingSubject.id
            ? {
                ...subject,
                name: trimmedName,
                emoji: selectedIcon,
              }
            : subject,
        ),
      );
    } else {
      setSubjects((current) => [
        ...current,
        {
          id: `mock-subject-${Date.now()}`,
          name: trimmedName,
          emoji: selectedIcon,
          deckCount: 0,
        },
      ]);
    }

    closeFormModal();
  }

  function handleMockDelete() {
    if (!deletingSubject) {
      return;
    }

    setSubjects((current) =>
      current.filter((subject) => subject.id !== deletingSubject.id),
    );
    closeDeleteModal();
  }

  function handleSave() {
    const trimmedName = subjectName.trim();
    if (!trimmedName) {
      setFormError("El nombre es obligatorio");
      return;
    }

    if (usingMockFallback) {
      handleMockSave();
      return;
    }

    startTransition(async () => {
      const result =
        modalMode === "edit" && editingSubject
          ? await updateSubjectAction(
              editingSubject.id,
              trimmedName,
              selectedIcon,
            )
          : await createSubjectAction(trimmedName, selectedIcon);

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo guardar la materia");
        return;
      }

      closeFormModal();
      router.refresh();
    });
  }

  function handleDelete() {
    if (!deletingSubject) {
      return;
    }

    if (usingMockFallback) {
      handleMockDelete();
      return;
    }

    startTransition(async () => {
      const result = await deleteSubjectAction(deletingSubject.id);

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo quitar la materia");
        return;
      }

      closeDeleteModal();
      router.refresh();
    });
  }

  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            title="Materias"
            description="Administrá tus materias y empezá a estudiar cuando quieras."
          />

          <MockAuditSection enabled={usingMockFallback}>
            <section>
              {subjects.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onEdit={() => openEditModal(subject)}
                      onDelete={() => {
                        setFormError(null);
                        setDeletingSubject(subject);
                      }}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex min-h-[14rem] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-electric-lime/40 bg-white p-5 shadow-card transition-colors hover:border-electric-lime/60 hover:bg-electric-lime/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2"
                    aria-label="Agregar materia"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-lime/20 font-display text-2xl font-semibold text-midnight-ink"
                      aria-hidden
                    >
                      +
                    </span>
                    <span className="mt-3 font-display text-sm font-semibold text-midnight-ink">
                      Agregar materia
                    </span>
                  </button>
                </div>
              ) : (
                <EmptyState
                  title="Todavía no tenés materias"
                  description="Creá tu primera materia para organizar tus decks de estudio."
                  action={
                    <Button type="button" onClick={openCreateModal}>
                      Agregar materia
                    </Button>
                  }
                />
              )}
            </section>
          </MockAuditSection>
        </div>
      </main>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight-ink/50"
            aria-label="Cerrar modal"
            onClick={closeFormModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={formTitleId}
            className="relative max-h-[min(90dvh,40rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-card-lg sm:max-h-none sm:p-6"
          >
            <h2
              id={formTitleId}
              className="font-display text-lg font-semibold text-midnight-ink"
            >
              {modalMode === "edit" ? "Editar materia" : "Nueva materia"}
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              {modalMode === "edit"
                ? "Actualizá el nombre o el ícono de tu materia."
                : "Creá una materia para agrupar tus decks de estudio."}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <InputLabel htmlFor="subject-name">Nombre</InputLabel>
                <Input
                  id="subject-name"
                  type="text"
                  placeholder="Ej: Psicología del desarrollo"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                  className="mt-2"
                  disabled={isPending}
                />
              </div>

              <div>
                <InputLabel>Ícono</InputLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {deckIconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      disabled={isPending}
                      onClick={() => setSelectedIcon(icon)}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2 disabled:opacity-50",
                        selectedIcon === icon
                          ? "border-electric-lime bg-fresh-lime/30"
                          : "border-cool-gray/20 bg-soft-cloud hover:border-cool-gray/40",
                      )}
                      aria-label={`Seleccionar ícono ${icon}`}
                      aria-pressed={selectedIcon === icon}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {formError ? (
                <p className="text-sm text-red-700" role="alert">
                  {formError}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={closeFormModal}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleSave}
                disabled={isPending}
              >
                {isPending
                  ? "Guardando..."
                  : modalMode === "edit"
                    ? "Guardar cambios"
                    : "Crear materia"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && deletingSubject ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight-ink/50"
            aria-label="Cerrar confirmación"
            onClick={closeDeleteModal}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={deleteTitleId}
            className="relative w-full max-w-md rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-card-lg sm:p-6"
          >
            <h2
              id={deleteTitleId}
              className="font-display text-lg font-semibold text-midnight-ink"
            >
              ¿Quitar materia?
            </h2>
            <p className="mt-2 text-sm text-cool-gray">
              La materia{" "}
              <span className="font-medium text-midnight-ink">
                {deletingSubject.name}
              </span>{" "}
              dejará de mostrarse en tu lista. Podés volver a organizar tus decks
              más adelante.
            </p>
            {formError ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={closeDeleteModal}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Quitando..." : "Quitar materia"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
