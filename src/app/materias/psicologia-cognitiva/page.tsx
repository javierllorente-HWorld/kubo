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
    <AppShell>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Link
          href="/materias"
          className="inline-flex items-center gap-1 text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink"
        >
          ← Volver a materias
        </Link>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <Card className="flex h-14 w-14 shrink-0 items-center justify-center p-0 text-2xl shadow-card">
              <span aria-hidden>{deck.emoji}</span>
            </Card>
            <div>
              <h1 className="font-display text-2xl font-bold text-midnight-ink sm:text-3xl">
                {deck.name}
              </h1>
              <p className="mt-1 text-sm text-cool-gray">
                {deck.current}/{deck.total} cards
              </p>
            </div>
          </div>

          <Card className="w-full p-5 lg:max-w-xs lg:shrink-0">
            <p className="font-display text-sm font-semibold text-midnight-ink">
              Progreso del deck
            </p>
            <p className="mt-2 text-sm text-cool-gray">{deck.percent}% completado</p>
            <ProgressBar value={deck.percent} className="mt-3" />
            <p className="mt-2 text-xs text-cool-gray">
              {deck.current}/{deck.total} cards
            </p>
          </Card>
        </div>

        <Card className="mx-auto mt-8 max-w-3xl px-6 py-12 text-center shadow-card sm:px-10 sm:py-14">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="neutral">
              {deck.cardIndex} / {deck.total}
            </Badge>
            <Badge variant="xp">Nueva</Badge>
          </div>
          <p className="mt-8 font-display text-xl font-semibold leading-snug text-midnight-ink sm:text-2xl">
            {deck.question}
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-10 gap-2 border-cool-gray/20"
          >
            <span aria-hidden>👁️</span>
            Ver respuesta
          </Button>
        </Card>

        <Card className="mx-auto mt-6 max-w-3xl p-5 shadow-card sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ratingButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center transition-colors ${btn.className}`}
              >
                <span className="font-display text-sm font-semibold">{btn.label}</span>
                <span className="mt-1 text-xs opacity-80">{btn.sublabel}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-cool-gray">
            Repetición espaciada basada en tu desempeño
          </p>
        </Card>
      </main>
    </AppShell>
  );
}
