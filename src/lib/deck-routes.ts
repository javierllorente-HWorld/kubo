export function deckStudyHref(deckId: string): string {
  return `/materias/decks/${deckId}/estudiar`;
}

export function deckEditHref(deckId: string): string {
  return `/materias/decks/${deckId}/editar`;
}

const POSTGRES_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPostgresUuid(value: string): boolean {
  return POSTGRES_UUID_RE.test(value);
}
