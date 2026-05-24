"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DeckCard } from "@/components/DeckCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input, InputLabel } from "@/components/ui/Input";
import { decks } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const iconOptions = ["🧠", "👥", "📚", "🧪", "📝", "🎓"] as const;

export default function MateriasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<(typeof iconOptions)[number]>(
    iconOptions[0],
  );
  const [subjectName, setSubjectName] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setSubjectName("");
    setSelectedIcon(iconOptions[0]);
  };

  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-4">
            <h1 className="font-display text-xl font-bold text-midnight-ink sm:text-2xl">
              Materias
            </h1>
            <p className="mt-1 text-sm text-cool-gray">
              Gestioná tus decks y empezá a estudiar cuando quieras.
            </p>
          </header>

          <section>
            {decks.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {decks.map((deck) => (
                  <DeckCard key={deck.slug} deck={deck} />
                ))}

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex min-h-[14rem] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-electric-lime/40 bg-white p-5 shadow-card transition-colors hover:border-electric-lime/60 hover:bg-electric-lime/5"
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
                description="Creá tu primera materia para empezar a estudiar con repetición espaciada."
                action={
                  <Button type="button" onClick={() => setIsModalOpen(true)}>
                    Agregar materia
                  </Button>
                }
              />
            )}
          </section>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight-ink/50"
            aria-label="Cerrar modal"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-subject-title"
            className="relative w-full max-w-md rounded-2xl border border-cool-gray/15 bg-white p-6 shadow-[0_12px_40px_rgb(17,24,39,0.12)]"
          >
            <h2
              id="new-subject-title"
              className="font-display text-lg font-semibold text-midnight-ink"
            >
              Nueva materia
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              Creá una materia para organizar tus cards.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <InputLabel htmlFor="subject-name">
                  Nombre de la materia
                </InputLabel>
                <Input
                  id="subject-name"
                  type="text"
                  placeholder="Ej: Psicología del desarrollo"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <InputLabel>Ícono</InputLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border text-xl transition-colors",
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
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button type="button" className="flex-1" onClick={closeModal}>
                Crear materia
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
