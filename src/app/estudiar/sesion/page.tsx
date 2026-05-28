export const dynamic = "force-dynamic";

import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { StudySessionGate } from "@/components/StudySessionGate";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";
import { loadRecentActivityForHeader } from "@/app/actions/activity";
import { getDueCardsForDailySession } from "@/lib/db-queries";
import { getMockDueCardsForDailySession } from "@/lib/db-fallback";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";

export default async function SesionDiariaPage() {
  let sessionCards;
  let usingMockFallback = false;
  const { items: recentActivity, usingMockFallback: usingMockActivity } =
    await loadRecentActivityForHeader();

  try {
    sessionCards = await getDueCardsForDailySession();
  } catch (error) {
    console.error(
      "[estudiar/sesion] DB unavailable, using mock data:",
      error,
    );
    usingMockFallback = true;
    sessionCards = getMockDueCardsForDailySession();
  }
  const pendingTotal = sessionCards.length;

  if (pendingTotal === 0 || sessionCards.length === 0) {
    return (
      <AppShell
        compactHeader
        recentActivity={recentActivity}
        usingMockActivity={usingMockActivity}
      >
        <main className="flex-1 p-4 sm:p-5 lg:p-6">
          <div className="mx-auto max-w-3xl">
            <BackLink href="/dashboard">Volver al inicio</BackLink>
            <EmptyState
              className="mt-6"
              title="Todo listo por hoy"
              description="No tenés cards pendientes. Volvé mañana o agregá nuevas cards a tus decks."
              action={
                <ButtonLink href="/materias">Ir a materias</ButtonLink>
              }
            />
          </div>
        </main>
      </AppShell>
    );
  }

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
              mode="daily"
              backHref="/dashboard"
              backLabel="Volver al inicio"
              usingMockFallback={usingMockFallback}
              emptyState={
                <EmptyState
                  className="mt-6"
                  title="Todo listo por hoy"
                  description="No tenés cards pendientes. Volvé mañana o agregá nuevas cards a tus decks."
                  action={
                    <ButtonLink href="/materias">Ir a materias</ButtonLink>
                  }
                />
              }
            />
          </MockAuditSection>
        </div>
      </main>
    </AppShell>
  );
}
