export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { StudySession } from "@/components/StudySession";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";
import {
  getDeckBySlug,
  getDeckSessionCards,
} from "@/lib/db-queries";
import {
  getMockDeckBySlug,
  getMockDeckSessionCards,
} from "@/lib/db-fallback";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EstudiarDeckPage({ params }: PageProps) {
  const { slug } = await params;
  let deck;
  let sessionCards;
  let usingMockFallback = false;

  try {
    deck = await getDeckBySlug(slug);
    if (!deck) {
      notFound();
    }
    sessionCards = await getDeckSessionCards(slug);
  } catch (error) {
    console.error(
      `[materias/${slug}/estudiar] DB unavailable, using mock data:`,
      error,
    );
    usingMockFallback = true;
    deck = getMockDeckBySlug(slug);
    if (!deck) {
      notFound();
    }
    sessionCards = getMockDeckSessionCards(slug);
  }

  return (
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          {sessionCards.length > 0 ? (
            <MockAuditSection enabled={usingMockFallback}>
              <StudySession
                cards={sessionCards}
                mode="deck"
                backHref="/materias"
                backLabel="Volver a materias"
              />
            </MockAuditSection>
          ) : (
            <MockAuditSection enabled={usingMockFallback}>
              <BackLink href="/materias">Volver a materias</BackLink>
              <EmptyState
                className="mt-6"
                title={
                  deck.totalCards === 0
                    ? "Este deck todavía no tiene cards"
                    : "No hay cards pendientes en este deck"
                }
                description={
                  deck.totalCards === 0
                    ? "Agregá preguntas y respuestas para empezar a estudiar."
                    : "Volvé más tarde o seguí con tu sesión diaria desde el inicio."
                }
                action={
                  deck.totalCards === 0 ? (
                    <ButtonLink href={`/materias/${slug}/editar`}>
                      Ir a editar deck
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="/dashboard">Ir al inicio</ButtonLink>
                  )
                }
              />
            </MockAuditSection>
          )}
        </div>
      </main>
    </AppShell>
  );
}
