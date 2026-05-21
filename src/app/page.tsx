"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, InputLabel } from "@/components/ui/Input";

const DEMO_EMAIL = "demo@kubo.app";
const DEMO_PASSWORD = "kubo123";

const inputClassName =
  "min-h-[48px] rounded-2xl border-cool-gray/20 bg-white py-2.5 text-sm shadow-sm transition-[border-color,box-shadow] focus:border-electric-lime focus:ring-[3px] focus:ring-electric-lime/30";

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main
      className="relative isolate flex min-h-full flex-1 items-center justify-center overflow-hidden bg-soft-cloud bg-[url('/login-background.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="relative z-20 mx-auto w-full max-w-[22.5rem] sm:max-w-[24.375rem]">
        <Card className="w-full overflow-hidden rounded-3xl border border-white/90 bg-white p-0 shadow-card-lg">
          {/* Header oscuro integrado */}
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
                Bienvenido de nuevo
              </h1>
              <p className="mt-1 text-sm leading-snug text-cool-gray">
                Ingresá para seguir estudiando.
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
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
                    defaultValue={DEMO_EMAIL}
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
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cool-gray/60"
                  >
                    <EyeIcon />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue={DEMO_PASSWORD}
                    placeholder="••••••••"
                    className={`${inputClassName} pl-10 pr-10`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold shadow-card transition-[transform,box-shadow,background-color] hover:-translate-y-px hover:bg-fresh-lime hover:shadow-card-cta active:translate-y-0"
              >
                Ingresar
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </Button>
            </form>

            <hr className="my-3 border-0 border-t border-cool-gray/15" />

            <p className="text-center text-sm leading-snug text-cool-gray">
              ¿No tenés cuenta?{" "}
              <a
                href="#"
                className="font-semibold text-midnight-ink underline-offset-4 transition-colors hover:text-graphite hover:underline"
              >
                Crear cuenta
              </a>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
