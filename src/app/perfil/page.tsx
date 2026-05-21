import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const accountFields = [
  { label: "Nombre", value: "Andrés Demo" },
  { label: "Email", value: "demo@kubo.app" },
  { label: "Universidad", value: "Universidad Demo" },
  { label: "Carrera", value: "Psicología" },
];

const studyPreferences: {
  label: string;
  value: string;
  highlight?: boolean;
}[] = [
  { label: "Objetivo diario", value: "50 cards" },
  { label: "Recordatorios", value: "Activados", highlight: true },
  { label: "Modo estudio", value: "Repetición espaciada" },
];

export default function PerfilPage() {
  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <header className="mb-4">
          <h1 className="font-display text-xl font-bold text-midnight-ink sm:text-2xl">
            Perfil
          </h1>
          <p className="mt-1 text-sm text-cool-gray">
            Gestión de tu información y progreso general.
          </p>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <Card className="p-4 sm:p-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-base font-semibold text-midnight-ink shadow-sm"
                    aria-hidden
                  >
                    AD
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-lg font-bold text-midnight-ink">
                      Andrés Demo
                    </h2>
                    <p className="mt-0.5 truncate text-sm text-cool-gray">
                      demo@kubo.app
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="neutral">Nivel 4</Badge>
                      <Badge variant="xp">820 XP</Badge>
                      <Badge variant="neutral">🔥 Racha 6 días</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Preferencias de estudio
                </h2>
                <p className="mt-0.5 text-xs text-cool-gray">
                  Configuración visual de tu rutina
                </p>
                <ul className="mt-3 divide-y divide-cool-gray/15 rounded-xl border border-cool-gray/15 bg-soft-cloud/40">
                  {studyPreferences.map((pref) => (
                    <li
                      key={pref.label}
                      className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                    >
                      <span className="text-sm text-cool-gray">{pref.label}</span>
                      {pref.highlight ? (
                        <Badge variant="xp" className="shrink-0">
                          {pref.value}
                        </Badge>
                      ) : (
                        <span className="shrink-0 text-sm font-medium text-midnight-ink">
                          {pref.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-4 sm:p-5 lg:sticky lg:top-4">
              <div>
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Cuenta
                </h2>
                <p className="mt-0.5 text-xs text-cool-gray">
                  Información personal y académica
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {accountFields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-xl border border-cool-gray/15 bg-soft-cloud/60 px-3 py-2.5"
                  >
                    <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-cool-gray">
                      {field.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-midnight-ink">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full border-midnight-ink/15 font-display shadow-sm hover:border-midnight-ink/25 hover:bg-white sm:w-auto sm:min-w-[10rem]"
                >
                  Editar perfil
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
