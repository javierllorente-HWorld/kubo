/** TEMP: diagnostic mock labels for Preview — remove with src/components/dev */

export function isMockAuditEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_MOCK_AUDIT === "1" ||
    process.env.VERCEL_ENV === "preview"
  );
}
