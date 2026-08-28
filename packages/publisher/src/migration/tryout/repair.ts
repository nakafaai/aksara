const RETAINED_REPAIR = {
  deletedRows: 158,
  migrationId: "retained-tryout-history",
} as const;

/** Returns the code-bound repair ceiling for the exact production migration. */
export function getCleanupRepairLimit(migrationId: string) {
  return migrationId === RETAINED_REPAIR.migrationId
    ? RETAINED_REPAIR.deletedRows
    : 0;
}
