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
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="font-display text-2xl font-bold text-midnight-ink sm:text-3xl">
            Perfil
          </h1>
          <p className="mt-1 text-sm text-cool-gray">
            Gestión de tu información y progreso general.
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-lg font-semibold text-midnight-ink shadow-sm"
                aria-hidden
              >
                AD
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-bold text-midnight-ink sm:text-xl">
                  Andrés Demo
                </h2>
                <p className="mt-0.5 truncate text-sm text-cool-gray">
                  demo@kubo.app
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <Badge variant="neutral">Nivel 4</Badge>
                  <Badge variant="xp">820 XP</Badge>
                  <Badge variant="neutral">🔥 Racha 6 días</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-midnight-ink">
                Cuenta
              </h2>
              <p className="mt-0.5 text-xs text-cool-gray">
                Información personal y académica
              </p>
            </div>
            <div className="mt-4 space-y-2">
              {accountFields.map((field) => (
                <div
                  key={field.label}
                  className="rounded-xl border border-cool-gray/15 bg-soft-cloud/60 px-4 py-3"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
                    {field.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-midnight-ink">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-5 w-full border-midnight-ink/15 font-display shadow-sm hover:border-midnight-ink/25 hover:bg-white"
            >
              Editar perfil
            </Button>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-midnight-ink">
              Preferencias de estudio
            </h2>
            <p className="mt-0.5 text-xs text-cool-gray">
              Configuración visual de tu rutina
            </p>
            <ul className="mt-4 divide-y divide-cool-gray/15 rounded-xl border border-cool-gray/15 bg-soft-cloud/40">
              {studyPreferences.map((pref) => (
                <li
                  key={pref.label}
                  className="flex items-center justify-between gap-4 px-4 py-3.5"
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
      </main>
    </AppShell>
  );
}
