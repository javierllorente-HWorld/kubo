export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import {
  getCardsForDeckByDeckId,
  getDeckEditContextById,
} from "@/lib/db-queries";
import {
  getMockDeckCardsByDeckId,
  getMockDeckEditContextById,
} from "@/lib/db-fallback";
import { EditDeckCardsContent } from "@/app/materias/[slug]/editar/EditDeckCardsContent";

type PageProps = {
  params: Promise<{ deckId: string }>;
};

export default async function EditarDeckPage({ params }: PageProps) {
  const { deckId } = await params;
  let context;
  let cards;
  let usingMockFallback = false;

  try {
    context = await getDeckEditContextById(deckId);
    if (!context) {
      notFound();
    }
    cards = await getCardsForDeckByDeckId(deckId);
  } catch (error) {
    console.error(
      `[materias/decks/${deckId}/editar] DB unavailable, using mock data:`,
      error,
    );
    usingMockFallback = true;
    context = getMockDeckEditContextById(deckId);
    if (!context) {
      notFound();
    }
    cards = getMockDeckCardsByDeckId(deckId);
  }

  return (
    <EditDeckCardsContent
      deck={context.deck}
      subjectId={context.subjectId}
      deckId={deckId}
      cards={cards}
      usingMockFallback={usingMockFallback}
    />
  );
}
