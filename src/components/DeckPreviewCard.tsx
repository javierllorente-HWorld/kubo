import Link from "next/link";
import { MockAuditLabel } from "@/components/dev/MockAuditLabel";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Deck } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type DeckPreviewCardProps = {
  deck: Deck;
  href?: string;
  className?: string;
  showMockLabel?: boolean;
};

export function DeckPreviewCard({
  deck,
  href,
  className,
  showMockLabel = false,
}: DeckPreviewCardProps) {
  const card = (
    <Card className={cn("relative p-4 transition-shadow", href && "hover:shadow-card-lg", className)}>
      {showMockLabel ? (
        <MockAuditLabel className="absolute right-3 top-3" />
      ) : null}
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft-cloud text-2xl"
          aria-hidden
        >
          {deck.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-midnight-ink">
            {deck.name}
          </p>
          <p className="text-xs text-cool-gray">
            {deck.pendingToday} pendientes hoy
          </p>
        </div>
      </div>
      <ProgressBar value={deck.masteryPercent} className="mt-3" />
      <p className="mt-2 text-xs text-cool-gray">
        {deck.cardsLearned}/{deck.totalCards} cards · {deck.masteryPercent}% dominado
      </p>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2">
        {card}
      </Link>
    );
  }

  return card;
}
