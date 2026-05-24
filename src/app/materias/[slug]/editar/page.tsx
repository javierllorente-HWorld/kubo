import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/EmptyState";
import { getDeckBySlug, getDeckCards } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditarDeckPage({ params }: PageProps) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  const cards = getDeckCards(slug);

  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/materias"
            className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
          >
            ← Volver a materias
          </Link>

          <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
                Editar deck
              </p>
              <h1 className="mt-1 font-display text-xl font-bold text-midnight-ink sm:text-2xl">
                {deck.name}
              </h1>
              <p className="mt-1 text-sm text-cool-gray">
                {deck.cardsLearned}/{deck.totalCards} cards · {deck.masteryPercent}%
                dominado
              </p>
            </div>
            <Button type="button" className="shrink-0 sm:min-w-[9.5rem]">
              Crear card
            </Button>
          </header>

          <section className="mt-6">
            {cards.length > 0 ? (
              <ul className="space-y-3">
                {cards.map((card, index) => (
                  <li key={card.id}>
                    <Card className="p-4 sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-cool-gray">
                            Card {index + 1}
                          </p>
                          <p className="mt-1 font-display text-sm font-semibold text-midnight-ink">
                            {card.question}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-cool-gray">
                            {card.answer}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            className="px-3 py-2 text-xs"
                          >
                            Editar
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="px-3 py-2 text-xs text-red-700 hover:bg-red-50"
                          >
                            Borrar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Este deck todavía no tiene cards"
                description="Agregá preguntas y respuestas para empezar a estudiar."
                action={
                  <Button type="button">Crear card</Button>
                }
              />
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}
