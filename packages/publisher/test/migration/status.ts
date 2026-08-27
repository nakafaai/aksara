import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { TryoutHistoryMigrationStatusSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";

import { migrationId, sourceSnapshotId } from "#test/migration/source";

/** Builds schema-checked aggregate migration state for focused tests. */
export function migrationStatus(
  overrides: Partial<TryoutHistoryMigrationStatus> = {}
) {
  return TryoutHistoryMigrationStatusSchema.make({
    artifactMapCount: 0,
    catalogMapCount: 0,
    completion: null,
    migrationId,
    phase: "staging",
    placementMapCount: 0,
    planHash: null,
    sourceSnapshotId,
    targetBundleHash: null,
    targetSnapshotId: null,
    ...overrides,
  });
}
