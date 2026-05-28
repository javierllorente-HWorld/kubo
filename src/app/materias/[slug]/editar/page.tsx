import { notFound, redirect } from "next/navigation";
import { getDeckById, getDeckBySlug } from "@/lib/db-queries";
import { getMockDeckById, getMockDeckBySlug } from "@/lib/db-fallback";
import { deckEditHref, isPostgresUuid } from "@/lib/deck-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyEditarDeckPage({ params }: PageProps) {
  const { slug } = await params;

  if (isPostgresUuid(slug)) {
    try {
      const deck = await getDeckById(slug);
      if (deck) {
        redirect(deckEditHref(deck.id));
      }
    } catch {
      const mockDeck = getMockDeckById(slug);
      if (mockDeck) {
        redirect(deckEditHref(mockDeck.id));
      }
    }
  }

  try {
    const deck = await getDeckBySlug(slug);
    if (deck) {
      redirect(deckEditHref(deck.id));
    }
  } catch {
    const mockDeck = getMockDeckBySlug(slug);
    if (mockDeck) {
      redirect(deckEditHref(mockDeck.id));
    }
  }

  notFound();
}
