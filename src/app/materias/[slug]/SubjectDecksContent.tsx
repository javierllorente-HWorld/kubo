"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { DeckCard } from "@/components/DeckCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input, InputLabel } from "@/components/ui/Input";
import type { DeckOverview, SubjectOverview } from "@/lib/db-queries";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";
import { cn } from "@/lib/cn";
import {
  createDeckAction,
  deleteDeckAction,
  updateDeckAction,
} from "./deck-actions";

type SubjectDecksContentProps = {
  subject: SubjectOverview;
  decks: DeckOverview[];
  usingMockFallback?: boolean;
};

type ModalMode = "create" | "edit" | null;

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function SubjectDecksContent({
  subject,
  decks: initialDecks,
  usingMockFallback = false,
}: SubjectDecksContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [decks, setDecks] = useState(initialDecks);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingDeck, setEditingDeck] = useState<DeckOverview | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<DeckOverview | null>(null);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const formTitleId = useId();
  const deleteTitleId = useId();

  useEffect(() => {
    setDecks(initialDecks);
  }, [initialDecks]);

  const isFormOpen = modalMode !== null;
  const isDeleteOpen = deletingDeck !== null;

  function openCreateModal() {
    setModalMode("create");
    setEditingDeck(null);
    setDeckName("");
    setDeckDescription("");
    setFormError(null);
  }

  function openEditModal(deck: DeckOverview) {
    setModalMode("edit");
    setEditingDeck(deck);
    setDeckName(deck.name);
    setDeckDescription(deck.description ?? "");
    setFormError(null);
  }

  function closeFormModal() {
    setModalMode(null);
    setEditingDeck(null);
    setDeckName("");
    setDeckDescription("");
    setFormError(null);
  }

  function closeDeleteModal() {
    setDeletingDeck(null);
    setFormError(null);
  }

  function handleMockSave() {
    const trimmedName = deckName.trim();
    if (!trimmedName) {
      setFormError("El nombre es obligatorio");
      return;
    }

    const trimmedDescription = deckDescription.trim() || null;

    if (modalMode === "edit" && editingDeck) {
      setDecks((current) =>
        current.map((deck) =>
          deck.id === editingDeck.id
            ? {
                ...deck,
                name: trimmedName,
                slug: nameToSlug(trimmedName),
                description: trimmedDescription,
              }
            : deck,
        ),
      );
    } else {
      setDecks((current) => [
        ...current,
        {
          id: `mock-deck-${Date.now()}`,
          slug: nameToSlug(trimmedName),
          name: trimmedName,
          description: trimmedDescription,
          emoji: subject.emoji,
          masteryPercent: 0,
          cardsLearned: 0,
          totalCards: 0,
          pendingToday: 0,
        },
      ]);
    }

    closeFormModal();
  }

  function handleMockDelete() {
    if (!deletingDeck) {
      return;
    }

    setDecks((current) =>
      current.filter((deck) => deck.id !== deletingDeck.id),
    );
    closeDeleteModal();
  }

  function handleSave() {
    const trimmedName = deckName.trim();
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
        modalMode === "edit" && editingDeck
          ? await updateDeckAction(
              subject.id,
              editingDeck.id,
              trimmedName,
              deckDescription,
            )
          : await createDeckAction(
              subject.id,
              trimmedName,
              deckDescription,
            );

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo guardar el deck");
        return;
      }

      closeFormModal();
      router.refresh();
    });
  }

  function handleDelete() {
    if (!deletingDeck) {
      return;
    }

    if (usingMockFallback) {
      handleMockDelete();
      return;
    }

    startTransition(async () => {
      const result = await deleteDeckAction(subject.id, deletingDeck.id);

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo quitar el deck");
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
          <BackLink href="/materias">Volver a materias</BackLink>

          <PageHeader
            className="mt-4"
            title={subject.name}
            description="Administrá tus decks y empezá a estudiar."
          />

          <MockAuditSection enabled={usingMockFallback}>
            <section>
              {decks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {decks.map((deck) => (
                    <DeckCard
                      key={deck.id}
                      deck={deck}
                      onEdit={() => openEditModal(deck)}
                      onDelete={() => {
                        setFormError(null);
                        setDeletingDeck(deck);
                      }}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex min-h-[14rem] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-electric-lime/40 bg-white p-5 shadow-card transition-colors hover:border-electric-lime/60 hover:bg-electric-lime/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2"
                    aria-label="Agregar deck"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-lime/20 font-display text-2xl font-semibold text-midnight-ink"
                      aria-hidden
                    >
                      +
                    </span>
                    <span className="mt-3 font-display text-sm font-semibold text-midnight-ink">
                      Agregar deck
                    </span>
                  </button>
                </div>
              ) : (
                <EmptyState
                  title="Todavía no tenés decks en esta materia"
                  description="Creá tu primer deck para empezar a estudiar con repetición espaciada."
                  action={
                    <Button type="button" onClick={openCreateModal}>
                      Agregar deck
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
              {modalMode === "edit" ? "Editar deck" : "Nuevo deck"}
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              {modalMode === "edit"
                ? "Actualizá el nombre o la descripción de tu deck."
                : `Creá un deck dentro de ${subject.name}.`}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <InputLabel htmlFor="deck-name">Nombre</InputLabel>
                <Input
                  id="deck-name"
                  type="text"
                  placeholder="Ej: Memoria y atención"
                  value={deckName}
                  onChange={(event) => setDeckName(event.target.value)}
                  className="mt-2"
                  disabled={isPending}
                />
              </div>

              <div>
                <InputLabel htmlFor="deck-description">
                  Descripción (opcional)
                </InputLabel>
                <textarea
                  id="deck-description"
                  placeholder="Ej: Repaso de modelos de memoria"
                  value={deckDescription}
                  onChange={(event) => setDeckDescription(event.target.value)}
                  disabled={isPending}
                  rows={3}
                  className={cn(
                    "mt-2 w-full resize-none rounded-xl border border-cool-gray/30 bg-white px-4 py-3 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-cool-gray/70 focus:border-electric-lime focus:ring-2 focus:ring-electric-lime/25 disabled:opacity-50",
                  )}
                />
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
                    : "Crear deck"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && deletingDeck ? (
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
              ¿Quitar deck?
            </h2>
            <p className="mt-2 text-sm text-cool-gray">
              El deck{" "}
              <span className="font-medium text-midnight-ink">
                {deletingDeck.name}
              </span>{" "}
              dejará de mostrarse en esta materia. Tu historial de estudio se
              conserva.
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
                {isPending ? "Quitando..." : "Quitar deck"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
