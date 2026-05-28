/** Diagnostic mock labels — enable with NEXT_PUBLIC_MOCK_AUDIT=1 only */

export function isMockAuditEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK_AUDIT === "1";
}
