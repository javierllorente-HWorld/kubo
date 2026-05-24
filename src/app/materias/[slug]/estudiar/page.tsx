import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { StudyCard } from "@/components/StudyCard";
import { StudySessionHeader } from "@/components/StudySessionHeader";
import { EmptyState } from "@/components/EmptyState";
import { getDeckBySlug, getDeckCards } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EstudiarDeckPage({ params }: PageProps) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  const cards = getDeckCards(slug);
  const sessionTotal = deck.pendingToday > 0 ? deck.pendingToday : cards.length;
  const currentCard = cards[0];

  return (
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/materias"
            className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
          >
            ← Volver a materias
          </Link>

          <div className="mt-4">
            {currentCard ? (
              <>
                <StudySessionHeader
                  deckName={deck.name}
                  deckEmoji={deck.emoji}
                  cardIndex={1}
                  sessionTotal={sessionTotal}
                  cardStatus={currentCard.status}
                />
                <div className="mt-5">
                  <StudyCard card={currentCard} />
                </div>
              </>
            ) : (
              <EmptyState
                className="mt-6"
                title="Este deck todavía no tiene cards"
                description="Agregá preguntas y respuestas para empezar a estudiar."
                action={
                  <Link
                    href={`/materias/${slug}/editar`}
                    className="inline-flex items-center justify-center rounded-xl bg-electric-lime px-4 py-3 font-display text-sm font-semibold text-midnight-ink transition-colors hover:bg-fresh-lime"
                  >
                    Ir a editar deck
                  </Link>
                }
              />
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
