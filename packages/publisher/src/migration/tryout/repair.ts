import type { ReleaseId } from "@nakafa/aksara-contracts/ids";

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
