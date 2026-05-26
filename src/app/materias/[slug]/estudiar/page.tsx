export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BackLink } from "@/components/BackLink";
import { StudySession } from "@/components/StudySession";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";
import { getDeckBySlug, getDeckSessionCards } from "@/lib/db-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EstudiarDeckPage({ params }: PageProps) {
  const { slug } = await params;
  const deck = await getDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  const sessionCards = await getDeckSessionCards(slug);

  return (
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="mx-auto max-w-3xl">
          {sessionCards.length > 0 ? (
            <StudySession
              cards={sessionCards}
              mode="deck"
              backHref="/materias"
              backLabel="Volver a materias"
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </AppShell>
  );
}
