import type { ReleaseId } from "@nakafa/aksara-contracts/ids";

/**
 * Temporary retained-history repair policy.
 *
 * Delete this module immediately after production proves the migration root is
 * absent, its permanent receipt is cleaned, and the provisional scale graph is
 * absent.
 */
const RETAINED_REPAIR = {
  migrationId: "retained-tryout-history",
} as const;

/** Allows one repair-only response for the exact production migration. */
export function allowsCleanupRepairPage(
  migrationId: ReleaseId,
  repairPageSeen: boolean
) {
  return migrationId === RETAINED_REPAIR.migrationId && !repairPageSeen;
}
