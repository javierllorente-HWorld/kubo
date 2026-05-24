"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RatingButtons } from "@/components/RatingButtons";
import type { Flashcard } from "@/lib/mock-data";

type StudyCardProps = {
  card: Flashcard;
  onRate?: () => void;
};

export function StudyCard({ card, onRate }: StudyCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="space-y-5">
      <Card className="flex min-h-[min(42vh,18rem)] w-full flex-col px-4 py-5 text-center shadow-card sm:min-h-[min(56vh,26rem)] sm:px-10 sm:py-6">
        <div className="flex min-h-0 flex-1 flex-col">
          <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
            Pregunta
          </p>
          <div className="flex flex-1 flex-col items-center justify-center px-2 py-4">
            <p className="max-w-2xl font-display text-lg font-semibold leading-snug text-midnight-ink sm:text-2xl">
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
                className="min-h-11 w-full max-w-xs rounded-xl border-cool-gray/20 px-5 sm:w-auto"
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
          <RatingButtons onRate={() => onRate?.()} />
        </Card>
      ) : null}
    </div>
  );
}
