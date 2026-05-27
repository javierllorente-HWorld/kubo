export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import {
  getCardsForDeckByDeckId,
  getDeckEditContextBySlug,
} from "@/lib/db-queries";
import {
  getMockDeckCards,
  getMockDeckEditContext,
} from "@/lib/db-fallback";
import { EditDeckCardsContent } from "./EditDeckCardsContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditarDeckPage({ params }: PageProps) {
  const { slug } = await params;
  let context;
  let cards;
  let usingMockFallback = false;

  try {
    context = await getDeckEditContextBySlug(slug);
    if (!context) {
      notFound();
    }
    cards = await getCardsForDeckByDeckId(context.deck.id);
  } catch (error) {
    console.error(
      `[materias/${slug}/editar] DB unavailable, using mock data:`,
      error,
    );
    usingMockFallback = true;
    context = getMockDeckEditContext(slug);
    if (!context) {
      notFound();
    }
    cards = getMockDeckCards(slug);
  }

  return (
    <EditDeckCardsContent
      deck={context.deck}
      subjectId={context.subjectId}
      deckSlug={slug}
      cards={cards}
      usingMockFallback={usingMockFallback}
    />
  );
}
