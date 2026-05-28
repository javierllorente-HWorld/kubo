export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { StudySessionGate } from "@/components/StudySessionGate";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";
import { loadRecentActivityForHeader } from "@/app/actions/activity";
import {
  getDeckEditContextById,
  getDeckSessionCardsByDeckId,
} from "@/lib/db-queries";
import {
  getMockDeckEditContextById,
  getMockDeckSessionCardsByDeckId,
} from "@/lib/db-fallback";
import { deckEditHref } from "@/lib/deck-routes";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";

type PageProps = {
  params: Promise<{ deckId: string }>;
};

export default async function EstudiarDeckPage({ params }: PageProps) {
  const { deckId } = await params;
  let context;
  let sessionCards;
  let usingMockFallback = false;
  const { items: recentActivity, usingMockFallback: usingMockActivity } =
    await loadRecentActivityForHeader();

  try {
    context = await getDeckEditContextById(deckId);
    if (!context) {
      notFound();
    }
    sessionCards = await getDeckSessionCardsByDeckId(deckId);
  } catch (error) {
    console.error(
      `[materias/decks/${deckId}/estudiar] DB unavailable, using mock data:`,
      error,
    );
    usingMockFallback = true;
    context = getMockDeckEditContextById(deckId);
    if (!context) {
      notFound();
    }
    sessionCards = getMockDeckSessionCardsByDeckId(deckId);
  }

  const { deck, subjectId } = context;
  const editHref = deckEditHref(deckId);

  return (
    <AppShell
      compactHeader
      recentActivity={recentActivity}
      usingMockActivity={usingMockActivity}
    >
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          <MockAuditSection enabled={usingMockFallback}>
            <StudySessionGate
              initialCards={sessionCards}
              mode="deck"
              backHref={`/materias/${subjectId}`}
              backLabel="Volver a decks"
              usingMockFallback={usingMockFallback}
              deckId={deckId}
              emptyState={
                <>
                  <BackLink href={`/materias/${subjectId}`}>
                    Volver a decks
                  </BackLink>
                  <EmptyState
                    className="mt-6"
                    title={
                      deck.totalCards === 0
                        ? "Este deck todavía no tiene cards para estudiar"
                        : "No hay cards pendientes en este deck"
                    }
                    description={
                      deck.totalCards === 0
                        ? "Creá tu primera card para empezar a estudiar con repetición espaciada."
                        : "Volvé más tarde o seguí con tu sesión diaria desde el inicio."
                    }
                    action={
                      deck.totalCards === 0 ? (
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                          <ButtonLink href={editHref}>Crear card</ButtonLink>
                          <ButtonLink href={editHref} variant="secondary">
                            Editar cards
                          </ButtonLink>
                        </div>
                      ) : (
                        <ButtonLink href="/dashboard">Ir al inicio</ButtonLink>
                      )
                    }
                  />
                </>
              }
            />
          </MockAuditSection>
        </div>
      </main>
    </AppShell>
  );
}
