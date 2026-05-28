import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ButtonLink";
import type { SubjectOverview } from "@/lib/db-queries";

type SubjectCardProps = {
  subject: SubjectOverview;
  onEdit: () => void;
  onDelete: () => void;
};

export function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  const deckLabel =
    subject.deckCount === 1
      ? "1 deck"
      : `${subject.deckCount} decks`;

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft-cloud text-xl"
          aria-hidden
        >
          {subject.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-midnight-ink">
            {subject.name}
          </h3>
          <p className="mt-0.5 text-sm text-cool-gray">{deckLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <ButtonLink
          href={`/materias/${subject.id}`}
          variant="primary"
          className="min-h-11 w-full"
        >
          Ver decks
        </ButtonLink>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <Button
            type="button"
            variant="secondary"
            className="min-h-11 w-full flex-1 sm:w-auto"
            onClick={onEdit}
          >
            Editar materia
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-h-11 w-full flex-1 text-red-700 hover:bg-red-50 sm:w-auto"
            onClick={onDelete}
          >
            Eliminar materia
          </Button>
        </div>
      </div>
    </Card>
  );
}
