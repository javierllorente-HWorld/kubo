"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ratingButtons } from "@/lib/mock-data";
import type { Flashcard } from "@/lib/mock-data";

type StudyCardProps = {
  card: Flashcard;
};

export function StudyCard({ card }: StudyCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="space-y-5">
      <Card className="flex min-h-[min(52vh,22rem)] w-full flex-col px-6 py-5 text-center shadow-card sm:min-h-[min(56vh,26rem)] sm:px-10 sm:py-6">
        <div className="flex min-h-0 flex-1 flex-col">
          <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
            Pregunta
          </p>
          <div className="flex flex-1 flex-col items-center justify-center px-2 py-4">
            <p className="max-w-2xl font-display text-xl font-semibold leading-snug text-midnight-ink sm:text-2xl">
              {card.question}
            </p>
          </div>

          {showAnswer ? (
            <div className="border-t border-cool-gray/15 pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
                Respuesta
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-midnight-ink/90 sm:text-lg">
                {card.answer}
              </p>
            </div>
          ) : (
            <div className="flex shrink-0 justify-center pb-1">
              <Button
                type="button"
                variant="secondary"
                className="rounded-xl border-cool-gray/20 px-5"
                onClick={() => setShowAnswer(true)}
              >
                Ver respuesta
              </Button>
            </div>
          )}
        </div>
      </Card>

      {showAnswer ? (
        <Card className="w-full p-4 shadow-card sm:p-5">
          <p className="mb-3 text-center text-sm font-medium text-midnight-ink">
            ¿Qué tan bien recordaste esta card?
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {ratingButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-3.5 text-center transition-colors sm:py-4 ${btn.className}`}
              >
                <span className="font-display text-sm font-semibold">
                  {btn.label}
                </span>
                <span className="mt-1 text-xs opacity-80">{btn.sublabel}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-cool-gray">
            Repetición espaciada según tu desempeño
          </p>
        </Card>
      ) : null}
    </div>
  );
}
