import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { StudyCard } from "@/components/StudyCard";
import { StudySessionHeader } from "@/components/StudySessionHeader";
import { EmptyState } from "@/components/EmptyState";
import {
  dailySession,
  decks,
  getSessionCards,
} from "@/lib/mock-data";

export default function SesionDiariaPage() {
  const sessionCards = getSessionCards();
  const currentCard = sessionCards[0];
  const primaryDeck = decks[0];

  if (dailySession.pendingTotal === 0 || !currentCard) {
    return (
      <AppShell compactHeader>
        <main className="flex-1 p-4 sm:p-5 lg:p-6">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
            >
              ← Volver al inicio
            </Link>
            <EmptyState
              className="mt-6"
              title="Todo listo por hoy"
              description="No tenés cards pendientes. Volvé mañana o agregá nuevas cards."
              action={
                <Link
                  href="/materias"
                  className="inline-flex items-center justify-center rounded-xl bg-electric-lime px-4 py-3 font-display text-sm font-semibold text-midnight-ink transition-colors hover:bg-fresh-lime"
                >
                  Ir a materias
                </Link>
              }
            />
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
          >
            ← Volver al inicio
          </Link>

          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-cool-gray">
            Sesión diaria
          </p>

          <div className="mt-2">
            <StudySessionHeader
              deckName={primaryDeck.name}
              deckEmoji={primaryDeck.emoji}
              cardIndex={1}
              sessionTotal={dailySession.pendingTotal}
              cardStatus={currentCard.status}
            />
          </div>

          <div className="mt-5">
            <StudyCard card={currentCard} />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
