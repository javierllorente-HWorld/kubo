/** Usuario demo fijo (Andrés Demo) hasta que exista autenticación real. */
export const DEMO_USER_ID = "3064aec6-e416-4c52-92ff-aefc2f7ffcf4";

/** Fragmento SQL seguro para incrustar el id del usuario demo en queries literales. */
export const demoUserIdSql = `'${DEMO_USER_ID}'::uuid`;

export function getDemoUserId(): string {
  return DEMO_USER_ID;
}
