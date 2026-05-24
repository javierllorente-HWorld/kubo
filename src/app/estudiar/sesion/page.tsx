import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { StudySession } from "@/components/StudySession";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";
import { dailySession, getSessionCards } from "@/lib/mock-data";

export default function SesionDiariaPage() {
  const sessionCards = getSessionCards();

  if (dailySession.pendingTotal === 0 || sessionCards.length === 0) {
    return (
      <AppShell compactHeader>
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
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          <StudySession
            cards={sessionCards}
            mode="daily"
            backHref="/dashboard"
            backLabel="Volver al inicio"
          />
        </div>
      </main>
    </AppShell>
  );
}
