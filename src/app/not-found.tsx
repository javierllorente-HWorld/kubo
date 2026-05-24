import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-soft-cloud px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <EmptyState
          title="Página no encontrada"
          description="La ruta que buscás no existe o fue movida."
          action={
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <ButtonLink
                href="/dashboard"
                variant="primary"
                className="w-full sm:w-auto sm:min-w-[10rem]"
              >
                Volver a Inicio
              </ButtonLink>
              <ButtonLink
                href="/materias"
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[10rem]"
              >
                Ver materias
              </ButtonLink>
            </div>
          }
        />
      </div>
    </main>
  );
}
