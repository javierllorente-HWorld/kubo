"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  loginAction,
  registerAction,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, InputLabel } from "@/components/ui/Input";

const inputClassName =
  "min-h-[48px] rounded-2xl border-cool-gray/20 bg-white py-2.5 text-sm shadow-sm transition-[border-color,box-shadow] focus:border-electric-lime focus:ring-[3px] focus:ring-electric-lime/30";

type AuthMode = "login" | "register";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M6 11h12v9H6v-9z"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
      />
      <circle cx={12} cy={12} r={2.5} strokeWidth={1.75} />
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      if (mode === "login") {
        const result = await loginAction(email, password);
        if (!result.ok) {
          setError(result.error ?? "No se pudo iniciar sesión");
          return;
        }
        router.push("/dashboard");
        router.refresh();
        return;
      }

      const result = await registerAction({
        name: String(formData.get("name") ?? ""),
        email,
        password,
        career: String(formData.get("career") ?? ""),
        university: String(formData.get("university") ?? ""),
      });

      if (!result.ok) {
        setError(result.error ?? "No se pudo crear la cuenta");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  }

  function toggleMode() {
    setMode((current) => (current === "login" ? "register" : "login"));
    setError(null);
  }

  return (
    <main
      className="relative isolate flex min-h-[100dvh] flex-1 items-center justify-center overflow-x-hidden bg-soft-cloud bg-[url('/login-background.png')] bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 sm:py-14"
    >
      <div className="relative z-20 mx-auto w-full min-w-0 max-w-[22.5rem] sm:max-w-[24.375rem]">
        <Card className="w-full overflow-hidden rounded-3xl border border-white/90 bg-white p-0 shadow-card-lg">
          <div className="flex h-[86px] items-center justify-between rounded-t-3xl bg-graphite px-5 sm:h-[90px]">
            <Image
              src="/logo-kubo.png"
              alt="Kubo"
              width={112}
              height={38}
              className="h-auto w-[105px] object-contain sm:w-[112px]"
              priority
            />
            <span
              aria-hidden
              className="font-display text-lg text-electric-lime/70"
            >
              ✦
            </span>
          </div>

          <div className="px-6 py-5">
            <div className="mb-3">
              <h1 className="font-display text-2xl font-bold tracking-tight text-midnight-ink">
                {mode === "login" ? "Bienvenido de nuevo" : "Crear cuenta"}
              </h1>
              <p className="mt-1 text-sm leading-snug text-cool-gray">
                {mode === "login"
                  ? "Ingresá para seguir estudiando."
                  : "Registrate para empezar a estudiar con Kubo."}
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {error ? (
                <p className="text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              {mode === "register" ? (
                <>
                  <div className="space-y-2">
                    <InputLabel
                      htmlFor="name"
                      className="text-[0.8125rem] font-semibold tracking-wide text-graphite"
                    >
                      Nombre
                    </InputLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Tu nombre"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <InputLabel
                      htmlFor="career"
                      className="text-[0.8125rem] font-semibold tracking-wide text-graphite"
                    >
                      Carrera
                    </InputLabel>
                    <Input
                      id="career"
                      name="career"
                      type="text"
                      required
                      placeholder="Psicología"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <InputLabel
                      htmlFor="university"
                      className="text-[0.8125rem] font-semibold tracking-wide text-graphite"
                    >
                      Universidad
                    </InputLabel>
                    <Input
                      id="university"
                      name="university"
                      type="text"
                      autoComplete="organization"
                      required
                      placeholder="Tu universidad"
                      className={inputClassName}
                    />
                  </div>
                </>
              ) : null}

              <div className="space-y-2">
                <InputLabel
                  htmlFor="email"
                  className="text-[0.8125rem] font-semibold tracking-wide text-graphite"
                >
                  Email
                </InputLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cool-gray">
                    <MailIcon />
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="tu@email.com"
                    className={`${inputClassName} pl-10`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <InputLabel
                  htmlFor="password"
                  className="text-[0.8125rem] font-semibold tracking-wide text-graphite"
                >
                  Contraseña
                </InputLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cool-gray">
                    <LockIcon />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3.5 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-cool-gray/60 transition-colors hover:text-cool-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    <EyeIcon />
                  </button>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    required
                    placeholder="••••••••"
                    className={`${inputClassName} pl-10 pr-10`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold shadow-card transition-[transform,box-shadow,background-color] hover:-translate-y-px hover:bg-fresh-lime hover:shadow-card-cta active:translate-y-0"
              >
                {isPending
                  ? "Procesando..."
                  : mode === "login"
                    ? "Ingresar"
                    : "Crear cuenta"}
                {!isPending ? (
                  <span aria-hidden className="text-lg leading-none">
                    →
                  </span>
                ) : null}
              </Button>
            </form>

            <hr className="my-3 border-0 border-t border-cool-gray/15" />

            <p className="text-center text-sm leading-snug text-cool-gray">
              {mode === "login" ? (
                <>
                  ¿No tenés cuenta?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-semibold text-midnight-ink underline-offset-4 transition-colors hover:text-graphite hover:underline"
                  >
                    Crear cuenta
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tenés cuenta?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-semibold text-midnight-ink underline-offset-4 transition-colors hover:text-graphite hover:underline"
                  >
                    Iniciar sesión
                  </button>
                </>
              )}
            </p>

            <p className="mt-2 text-center text-xs text-cool-gray">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="underline-offset-4 transition-colors hover:text-midnight-ink hover:underline"
              >
                Explorar demo sin cuenta
              </button>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
