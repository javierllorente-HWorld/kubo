import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, InputLabel } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-md p-8 shadow-card-lg sm:p-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-midnight-ink">
              Kubo
            </p>
            <h1 className="mt-4 font-display text-xl font-semibold text-midnight-ink">
              Bienvenido de nuevo
            </h1>
            <p className="mt-1 text-sm text-cool-gray">
              Ingresá para seguir estudiando.
            </p>
          </div>
          <Badge variant="streak" className="shrink-0">
            <p className="font-medium text-cool-gray">Tu progreso</p>
            <p className="mt-0.5 font-display text-sm text-midnight-ink">
              🔥 Racha 6 días
            </p>
          </Badge>
        </div>

        <form className="space-y-5" action="#" method="post">
          <div className="space-y-2">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </div>

          <div className="space-y-2">
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-cool-gray">
          ¿No tenés cuenta?{" "}
          <a
            href="#"
            className="font-medium text-midnight-ink underline-offset-4 transition-colors hover:text-graphite hover:underline"
          >
            Crear cuenta
          </a>
        </p>
      </Card>
    </main>
  );
}
