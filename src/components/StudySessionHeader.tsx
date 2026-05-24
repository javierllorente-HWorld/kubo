import { Badge } from "@/components/ui/Badge";
import type { Flashcard } from "@/lib/mock-data";

type StudySessionHeaderProps = {
  deckName: string;
  deckEmoji?: string;
  cardIndex: number;
  sessionTotal: number;
  cardStatus: Flashcard["status"];
};

export function StudySessionHeader({
  deckName,
  deckEmoji,
  cardIndex,
  sessionTotal,
  cardStatus,
}: StudySessionHeaderProps) {
  const statusLabel = cardStatus === "nueva" ? "Nueva" : "Repaso";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
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
      </div>
      <Badge
        variant={cardStatus === "nueva" ? "xp" : "neutral"}
        className="self-start sm:self-center"
      >
        {statusLabel}
      </Badge>
    </div>
  );
}
