import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
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
          <BackLink href="/materias">Volver a materias</BackLink>

          <PageHeader
            className="mt-4"
            eyebrow="Editar deck"
            title={deck.name}
            description={`${deck.cardsLearned}/${deck.totalCards} cards · ${deck.masteryPercent}% dominado`}
            action={
              <Button type="button" className="shrink-0 sm:min-w-[9.5rem]">
                Crear card
              </Button>
            }
          />

          <section className="mt-2">
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
                        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                          <Button
                            type="button"
                            variant="secondary"
                            className="min-h-11 w-full px-3 py-2 text-xs sm:w-auto"
                          >
                            Editar card
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="min-h-11 w-full px-3 py-2 text-xs text-red-700 hover:bg-red-50 sm:w-auto"
                            aria-label={`Borrar card: ${card.question}`}
                          >
                            Borrar card
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
                action={<Button type="button">Crear card</Button>}
              />
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}
