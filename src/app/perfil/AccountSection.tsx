"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, InputLabel } from "@/components/ui/Input";
import { StatCard } from "@/components/StatCard";
import { FeedbackToast, useFeedback } from "@/components/ui/FeedbackToast";
import { updateUserProfileAction } from "./actions";

export type AccountData = {
  name: string;
  email: string;
  university: string;
  career: string;
};

type AccountSectionProps = {
  initialAccount: AccountData;
  userId?: string;
  usingMockFallback?: boolean;
};

export function AccountSection({
  initialAccount,
  userId,
  usingMockFallback = false,
}: AccountSectionProps) {
  const router = useRouter();
  const { message: feedbackMessage, showFeedback, dismissFeedback } =
    useFeedback();
  const [isPending, startTransition] = useTransition();
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const [account, setAccount] = useState(initialAccount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialAccount);
  const [formError, setFormError] = useState<string | null>(null);
  const titleId = useId();

  useEffect(() => {
    setAccount(initialAccount);
  }, [initialAccount]);

  const accountFields = [
    { label: "Nombre", value: account.name },
    { label: "Email", value: account.email },
    { label: "Universidad", value: account.university },
    { label: "Carrera", value: account.career },
  ];

  function openModal() {
    setForm(account);
    setFormError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError(null);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      university: form.university.trim(),
      career: form.career.trim(),
    };

    if (!trimmed.name) {
      setFormError("El nombre es obligatorio");
      return;
    }

    if (!trimmed.email) {
      setFormError("El email es obligatorio");
      return;
    }

    if (usingMockFallback) {
      setAccount(trimmed);
      closeModal();
      showFeedback("Perfil actualizado");
      return;
    }

    if (!userId) {
      setFormError("No se pudo identificar el usuario");
      return;
    }

    startTransition(async () => {
      const result = await updateUserProfileAction(userId, trimmed);

      if (!result.ok) {
        console.error("[AccountSection] updateUserProfileAction:", result.error);
        setFormError(result.error ?? "No se pudo guardar el perfil");
        return;
      }

      setAccount(trimmed);
      closeModal();
      showFeedback("Perfil actualizado");
      router.refresh();
    });
  }

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
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
            <StatCard
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:items-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full border-midnight-ink/15 font-display shadow-sm hover:border-midnight-ink/25 hover:bg-white sm:w-auto sm:min-w-[10rem]"
            onClick={openModal}
          >
            Editar perfil
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={isLoggingOut}
            className="w-full text-cool-gray hover:text-midnight-ink sm:w-auto sm:min-w-[10rem]"
            onClick={() => {
              startLogoutTransition(async () => {
                await logoutAction();
              });
            }}
          >
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </Button>
        </div>
      </Card>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight-ink/50"
            aria-label="Cerrar modal"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[min(90dvh,40rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-card-lg sm:max-h-none sm:p-6"
          >
            <h2
              id={titleId}
              className="font-display text-lg font-semibold text-midnight-ink"
            >
              Editar perfil
            </h2>
            <p className="mt-1 text-sm text-cool-gray">
              Actualizá tu información personal y académica.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSave}>
              {formError ? (
                <p className="text-sm text-red-700" role="alert">
                  {formError}
                </p>
              ) : null}
              <div>
                <InputLabel htmlFor="profile-name">Nombre</InputLabel>
                <Input
                  id="profile-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <InputLabel htmlFor="profile-email">Email</InputLabel>
                <Input
                  id="profile-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <InputLabel htmlFor="profile-university">Universidad</InputLabel>
                <Input
                  id="profile-university"
                  name="university"
                  type="text"
                  autoComplete="organization"
                  value={form.university}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      university: event.target.value,
                    }))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <InputLabel htmlFor="profile-career">Carrera</InputLabel>
                <Input
                  id="profile-career"
                  name="career"
                  type="text"
                  value={form.career}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, career: event.target.value }))
                  }
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={closeModal}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={isPending}>
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FeedbackToast message={feedbackMessage} onDismiss={dismissFeedback} />
    </>
  );
}
