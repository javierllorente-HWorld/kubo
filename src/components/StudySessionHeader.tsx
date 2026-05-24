import { Badge } from "@/components/ui/Badge";
import type { Flashcard } from "@/lib/mock-data";

type StudySessionHeaderProps = {
  mode: "daily" | "deck";
  cardIndex: number;
  sessionTotal: number;
  cardStatus: Flashcard["status"];
  deckName?: string;
  deckEmoji?: string;
  currentDeckName?: string;
  currentDeckEmoji?: string;
};

export function StudySessionHeader({
  mode,
  cardIndex,
  sessionTotal,
  cardStatus,
  deckName,
  deckEmoji,
  currentDeckName,
  currentDeckEmoji,
}: StudySessionHeaderProps) {
  const statusLabel = cardStatus === "nueva" ? "Nueva" : "Repaso";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {mode === "daily" ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
              Sesión diaria
            </p>
            <h1 className="mt-0.5 font-display text-base font-bold leading-snug text-midnight-ink sm:text-xl">
              Cards programadas para hoy
            </h1>
            <p className="mt-1 text-sm text-cool-gray">
              Card {cardIndex} de {sessionTotal}
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
              {deckEmoji ? (
                <span className="mr-1.5" aria-hidden>
                  {deckEmoji}
                </span>
              ) : null}
              {deckName}
            </p>
            <h1 className="mt-0.5 font-display text-lg font-bold text-midnight-ink sm:text-xl">
              Card {cardIndex} de {sessionTotal}
            </h1>
          </>
        )}
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        {mode === "daily" && currentDeckName ? (
          <p className="text-sm font-medium text-midnight-ink/80">
            {currentDeckEmoji ? (
              <span className="mr-1" aria-hidden>
                {currentDeckEmoji}
              </span>
            ) : null}
            {currentDeckName}
          </p>
        ) : null}
        <Badge
          variant={cardStatus === "nueva" ? "xp" : "neutral"}
          className="self-start sm:self-end"
        >
          {statusLabel}
        </Badge>
      </div>
    </div>
  );
}
