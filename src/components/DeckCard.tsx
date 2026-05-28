import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { DeckOverview } from "@/lib/db-queries";
import { deckEditHref, deckStudyHref } from "@/lib/deck-routes";

type DeckCardProps = {
  deck: DeckOverview;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function DeckCard({ deck, onEdit, onDelete }: DeckCardProps) {
  const studyHref = deckStudyHref(deck.id);
  const editCardsHref = deckEditHref(deck.id);

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft-cloud text-xl"
          aria-hidden
        >
          {deck.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-midnight-ink">
            {deck.name}
          </h3>
          <p className="mt-0.5 text-sm text-cool-gray">
            {deck.pendingToday} pendientes hoy
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-cool-gray">
            {deck.cardsLearned}/{deck.totalCards} cards
          </span>
          <span className="font-medium text-midnight-ink">
            {deck.masteryPercent}% dominado
          </span>
        </div>
        <ProgressBar value={deck.masteryPercent} />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <ButtonLink
          href={studyHref}
          variant="primary"
          className="min-h-11 w-full"
        >
          Estudiar
        </ButtonLink>
        <ButtonLink
          href={editCardsHref}
          variant="secondary"
          className="min-h-11 w-full"
        >
          Editar cards
        </ButtonLink>
        {onEdit || onDelete ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            {onEdit ? (
              <Button
                type="button"
                variant="secondary"
                className="min-h-11 w-full flex-1 sm:w-auto"
                onClick={onEdit}
              >
                Editar deck
              </Button>
            ) : null}
            {onDelete ? (
              <Button
                type="button"
                variant="ghost"
                className="min-h-11 w-full flex-1 text-red-700 hover:bg-red-50 sm:w-auto"
                onClick={onDelete}
              >
                Eliminar deck
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
