import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Deck } from "@/lib/mock-data";

type DeckCardProps = {
  deck: Deck;
};

export function DeckCard({ deck }: DeckCardProps) {
  const studyHref = `/materias/${deck.slug}/estudiar`;
  const editHref = `/materias/${deck.slug}/editar`;

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

      <div className="mt-5 flex gap-2">
        <Link href={studyHref} className="flex-1">
          <Button type="button" className="w-full">
            Estudiar
          </Button>
        </Link>
        <Link href={editHref} className="flex-1">
          <Button type="button" variant="secondary" className="w-full">
            Editar deck
          </Button>
        </Link>
      </div>
    </Card>
  );
}
