import { notFound, redirect } from "next/navigation";
import { getDeckById, getDeckBySlug } from "@/lib/db-queries";
import { getMockDeckById, getMockDeckBySlug } from "@/lib/db-fallback";
import { deckStudyHref, isPostgresUuid } from "@/lib/deck-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyEstudiarDeckPage({ params }: PageProps) {
  const { slug } = await params;

  if (isPostgresUuid(slug)) {
    try {
      const deck = await getDeckById(slug);
      if (deck) {
        redirect(deckStudyHref(deck.id));
      }
    } catch {
      const mockDeck = getMockDeckById(slug);
      if (mockDeck) {
        redirect(deckStudyHref(mockDeck.id));
      }
    }
  }

  try {
    const deck = await getDeckBySlug(slug);
    if (deck) {
      redirect(deckStudyHref(deck.id));
    }
  } catch {
    const mockDeck = getMockDeckBySlug(slug);
    if (mockDeck) {
      redirect(deckStudyHref(mockDeck.id));
    }
  }

  notFound();
}
