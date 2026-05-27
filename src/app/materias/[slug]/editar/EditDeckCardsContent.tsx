"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/EmptyState";
import { Input, InputLabel } from "@/components/ui/Input";
import type { DeckOverview, StudyFlashcard } from "@/lib/db-queries";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";
import { cn } from "@/lib/cn";
import {
  createCardAction,
  deleteCardAction,
  updateCardAction,
} from "./card-actions";

type EditDeckCardsContentProps = {
  deck: DeckOverview;
  subjectId: string;
  deckSlug: string;
  cards: StudyFlashcard[];
  usingMockFallback?: boolean;
};

type ModalMode = "create" | "edit" | null;

export function EditDeckCardsContent({
  deck: initialDeck,
  subjectId,
  deckSlug,
  cards: initialCards,
  usingMockFallback = false,
}: EditDeckCardsContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deck, setDeck] = useState(initialDeck);
  const [cards, setCards] = useState(initialCards);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingCard, setEditingCard] = useState<StudyFlashcard | null>(null);
  const [deletingCard, setDeletingCard] = useState<StudyFlashcard | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const formTitleId = useId();
  const deleteTitleId = useId();

  useEffect(() => {
    setDeck(initialDeck);
    setCards(initialCards);
  }, [initialDeck, initialCards]);

  const isFormOpen = modalMode !== null;
  const isDeleteOpen = deletingCard !== null;

  function openCreateModal() {
    setModalMode("create");
    setEditingCard(null);
    setQuestion("");
    setAnswer("");
    setFormError(null);
  }

  function openEditModal(card: StudyFlashcard) {
    setModalMode("edit");
    setEditingCard(card);
    setQuestion(card.question);
    setAnswer(card.answer);
    setFormError(null);
  }

  function closeFormModal() {
    setModalMode(null);
    setEditingCard(null);
    setQuestion("");
    setAnswer("");
    setFormError(null);
  }

  function closeDeleteModal() {
    setDeletingCard(null);
    setFormError(null);
  }

  function handleMockSave() {
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      setFormError("La pregunta y la respuesta son obligatorias");
      return;
    }

    if (modalMode === "edit" && editingCard) {
      setCards((current) =>
        current.map((card) =>
          card.id === editingCard.id
            ? {
                ...card,
                question: trimmedQuestion,
                answer: trimmedAnswer,
              }
            : card,
        ),
      );
    } else {
      setCards((current) => [
        ...current,
        {
          id: `mock-card-${Date.now()}`,
          question: trimmedQuestion,
          answer: trimmedAnswer,
          status: "nueva",
        },
      ]);
      setDeck((current) => ({
        ...current,
        totalCards: current.totalCards + 1,
      }));
    }

    closeFormModal();
  }

  function handleMockDelete() {
    if (!deletingCard) {
      return;
    }

    setCards((current) =>
      current.filter((card) => card.id !== deletingCard.id),
    );
    setDeck((current) => ({
      ...current,
      totalCards: Math.max(0, current.totalCards - 1),
    }));
    closeDeleteModal();
  }

  function handleSave() {
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      setFormError("La pregunta y la respuesta son obligatorias");
      return;
    }

    if (usingMockFallback) {
      handleMockSave();
      return;
    }

    startTransition(async () => {
      const result =
        modalMode === "edit" && editingCard
          ? await updateCardAction(
              deckSlug,
              subjectId,
              editingCard.id,
              trimmedQuestion,
              trimmedAnswer,
            )
          : await createCardAction(
              deckSlug,
              subjectId,
              deck.id,
              trimmedQuestion,
              trimmedAnswer,
            );

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo guardar la card");
        return;
      }

      closeFormModal();
      router.refresh();
    });
  }

  function handleDelete() {
    if (!deletingCard) {
      return;
    }

    if (usingMockFallback) {
      handleMockDelete();
      return;
    }

    startTransition(async () => {
      const result = await deleteCardAction(
        deckSlug,
        subjectId,
        deletingCard.id,
      );

      if (!result.ok) {
        setFormError(result.error ?? "No se pudo borrar la card");
        return;
      }

      closeDeleteModal();
      router.refresh();
    });
  }

  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <BackLink href={`/materias/${subjectId}`}>
            Volver a decks
          </BackLink>

          <MockAuditSection enabled={usingMockFallback}>
            <PageHeader
              className="mt-4"
              eyebrow="Editar cards"
              title={deck.name}
              description={`${deck.cardsLearned}/${deck.totalCards} cards · ${deck.masteryPercent}% dominado`}
              action={
                <Button
                  type="button"
                  className="shrink-0 sm:min-w-[9.5rem]"
                  onClick={openCreateModal}
                >
                  Crear card
                </Button>
              }
            />

            <section className="mt-2">
              {cards.length > 0 ? (
                <ul className="space-y-3">
                  {cards.map((card, index) => (
                    <li key={card.id}>
                      <Card className="p-4 sm:p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-cool-gray">
                              Card {index + 1}
                            </p>
                            <p className="mt-1 font-display text-sm font-semibold text-midnight-ink">
                              {card.question}
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm text-cool-gray">
                              {card.answer}
                            </p>
                          </div>
                          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                            <Button
                              type="button"
                              variant="secondary"
                              className="min-h-11 w-full px-3 py-2 text-xs sm:w-auto"
                              onClick={() => openEditModal(card)}
                            >
                              Editar card
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="min-h-11 w-full px-3 py-2 text-xs text-red-700 hover:bg-red-50 sm:w-auto"
                              onClick={() => {
                                setFormError(null);
                                setDeletingCard(card);
                              }}
                              aria-label={`Borrar card: ${card.question}`}
                            >
                              Borrar card
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title="Este deck todavía no tiene cards"
                  description="Agregá preguntas y respuestas para empezar a estudiar."
                  action={
                    <Button type="button" onClick={openCreateModal}>
                      Crear card
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
              {modalMode === "edit" ? "Editar card" : "Nueva card"}
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              {modalMode === "edit"
                ? "Actualizá la pregunta y la respuesta."
                : `Agregá una card al deck ${deck.name}.`}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <InputLabel htmlFor="card-question">Pregunta</InputLabel>
                <Input
                  id="card-question"
                  type="text"
                  placeholder="Ej: ¿Qué es la memoria de trabajo?"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  className="mt-2"
                  disabled={isPending}
                />
              </div>

              <div>
                <InputLabel htmlFor="card-answer">Respuesta</InputLabel>
                <textarea
                  id="card-answer"
                  placeholder="Escribí la respuesta de la card"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  disabled={isPending}
                  rows={4}
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
                    : "Crear card"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && deletingCard ? (
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
              ¿Borrar card?
            </h2>
            <p className="mt-2 text-sm text-cool-gray">
              Esta card dejará de mostrarse en el deck. Tu historial de estudio se
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
                {isPending ? "Borrando..." : "Borrar card"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
