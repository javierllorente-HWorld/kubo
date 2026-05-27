"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { DeckCard } from "@/components/DeckCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input, InputLabel } from "@/components/ui/Input";
import type { DeckOverview, SubjectOverview } from "@/lib/db-queries";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";
import { deckIconOptions } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type SubjectDecksContentProps = {
  subject: SubjectOverview;
  decks: DeckOverview[];
  usingMockFallback?: boolean;
};

export function SubjectDecksContent({
  subject,
  decks,
  usingMockFallback = false,
}: SubjectDecksContentProps) {
  const [isAddDeckModalOpen, setIsAddDeckModalOpen] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<
    (typeof deckIconOptions)[number]
  >(deckIconOptions[0]);

  function closeAddDeckModal() {
    setIsAddDeckModalOpen(false);
    setDeckName("");
    setSelectedIcon(deckIconOptions[0]);
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
                    <DeckCard key={deck.slug} deck={deck} />
                  ))}

                  <button
                    type="button"
                    onClick={() => setIsAddDeckModalOpen(true)}
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
                    <Button
                      type="button"
                      onClick={() => setIsAddDeckModalOpen(true)}
                    >
                      Agregar deck
                    </Button>
                  }
                />
              )}
            </section>
          </MockAuditSection>
        </div>
      </main>

      {isAddDeckModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight-ink/50"
            aria-label="Cerrar modal"
            onClick={closeAddDeckModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-deck-title"
            className="relative max-h-[min(90dvh,40rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-card-lg sm:max-h-none sm:p-6"
          >
            <h2
              id="new-deck-title"
              className="font-display text-lg font-semibold text-midnight-ink"
            >
              Nuevo deck
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              Próximamente vas a poder crear decks dentro de {subject.name}.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <InputLabel htmlFor="deck-name">Nombre del deck</InputLabel>
                <Input
                  id="deck-name"
                  type="text"
                  placeholder="Ej: Memoria y atención"
                  value={deckName}
                  onChange={(event) => setDeckName(event.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <InputLabel>Ícono</InputLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {deckIconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2",
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
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={closeAddDeckModal}
              >
                Cancelar
              </Button>
              <Button type="button" className="flex-1" onClick={closeAddDeckModal}>
                Crear deck
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
