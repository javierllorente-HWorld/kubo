import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const deck = {
  name: "Psicología Cognitiva",
  emoji: "🧠",
  percent: 64,
  current: 128,
  total: 200,
  cardIndex: 1,
  question: "¿Qué es la memoria de trabajo?",
};

const ratingButtons = [
  {
    label: "Otra vez",
    sublabel: "< 1 min",
    className:
      "border-red-200/80 bg-red-50 text-red-800 hover:bg-red-100/80",
  },
  {
    label: "Difícil",
    sublabel: "1-10 min",
    className:
      "border-orange-200/80 bg-orange-50 text-orange-900 hover:bg-orange-100/80",
  },
  {
    label: "Bien",
    sublabel: "10-60 min",
    className:
      "border-emerald-200/80 bg-emerald-50 text-emerald-900 hover:bg-emerald-100/80",
  },
  {
    label: "Fácil",
    sublabel: "> 60 min",
    className:
      "border-electric-lime/50 bg-fresh-lime/20 text-midnight-ink hover:bg-fresh-lime/35",
  },
] as const;

export default function PsicologiaCognitivaStudyPage() {
  return (
    <AppShell compactHeader>
      <main className="flex-1 px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-3.5">
        <div className="flex w-full flex-col">
        <Link
          href="/materias"
          className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
        >
          ← Volver a materias
        </Link>

        <div className="mt-1.5 flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <div className="flex items-center gap-3">
            <Card className="flex h-12 w-12 shrink-0 items-center justify-center p-0 text-xl shadow-card">
              <span aria-hidden>{deck.emoji}</span>
            </Card>
            <h1 className="font-display text-sm font-bold leading-tight text-midnight-ink sm:text-lg">
              {deck.name}
            </h1>
          </div>

          <Card className="flex w-full flex-col justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 lg:max-w-[22rem] lg:shrink-0">
            <div className="flex items-center justify-between gap-4">
              <p className="whitespace-nowrap font-display text-sm font-semibold leading-none text-midnight-ink">
                Progreso del deck
              </p>
              <p className="shrink-0 whitespace-nowrap text-sm leading-none text-cool-gray">
                {deck.percent}% completado
              </p>
            </div>
            <ProgressBar value={deck.percent} className="h-1.5" />
            <p className="text-xs leading-none text-cool-gray">
              {deck.current}/{deck.total} cards
            </p>
          </Card>
        </div>

        <Card className="mt-5 flex w-full min-h-[min(52vh,22rem)] flex-col px-6 pt-3 pb-3 text-center shadow-card sm:min-h-[min(56vh,26rem)] sm:px-10 sm:pt-4 sm:pb-4 lg:mt-6 lg:pt-5 lg:pb-5">
          <div className="flex shrink-0 justify-center">
            <Badge variant="neutral">
              {deck.cardIndex} / {deck.total}
            </Badge>
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-2">
            <p className="max-w-2xl font-display text-xl font-semibold leading-snug text-midnight-ink sm:text-2xl">
              {deck.question}
            </p>
          </div>

          <div className="flex shrink-0 justify-center">
            <Button
              type="button"
              variant="secondary"
              className="gap-1.5 rounded-lg border-cool-gray/20 px-3 py-2 text-sm"
            >
              <span aria-hidden>👁️</span>
              Ver respuesta
            </Button>
          </div>
        </Card>

        <Card className="mt-5 w-full p-4 shadow-card sm:p-5">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {ratingButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-3.5 text-center transition-colors sm:py-4 ${btn.className}`}
              >
                <span className="font-display text-sm font-semibold">{btn.label}</span>
                <span className="mt-1 text-xs opacity-80">{btn.sublabel}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-cool-gray">
            Repetición espaciada basada en tu desempeño
          </p>
        </Card>
        </div>
      </main>
    </AppShell>
  );
}
