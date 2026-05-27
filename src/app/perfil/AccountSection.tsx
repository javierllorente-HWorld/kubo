"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button, buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, InputLabel } from "@/components/ui/Input";
import { StatCard } from "@/components/StatCard";

export type AccountData = {
  name: string;
  email: string;
  university: string;
  career: string;
};

type AccountSectionProps = {
  initialAccount: AccountData;
};

export function AccountSection({ initialAccount }: AccountSectionProps) {
  const [account, setAccount] = useState(initialAccount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialAccount);
  const titleId = useId();

  const accountFields = [
    { label: "Nombre", value: account.name },
    { label: "Email", value: account.email },
    { label: "Universidad", value: account.university },
    { label: "Carrera", value: account.career },
  ];

  function openModal() {
    setForm(account);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: persist profile update to PostgreSQL when auth/write path is ready
    setAccount(form);
    closeModal();
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
          <Link
            href="/"
            className={buttonClassName(
              "ghost",
              "w-full text-cool-gray hover:text-midnight-ink sm:w-auto sm:min-w-[10rem]",
            )}
          >
            Cerrar sesión
          </Link>
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
                <Button type="submit" className="flex-1">
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
