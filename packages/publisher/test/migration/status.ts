import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import {
  TryoutHistoryMigrationReadyStatusSchema,
  TryoutHistoryMigrationRunningStatusSchema,
  TryoutHistoryMigrationStagingStatusSchema,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";

import { migrationId, sourceSnapshotId } from "#test/migration/source";

type StagingStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "staging" }
>;
type ReadyStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "ready" }
>;
type RunningStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "running" }
>;

/** Builds schema-checked aggregate migration state for focused tests. */
export function migrationStatus(
  overrides: Partial<Omit<StagingStatus, "phase">> = {}
) {
  return TryoutHistoryMigrationStagingStatusSchema.make({
    artifactMapCount: 0,
    catalogMapCount: 0,
    migrationId,
    phase: "staging",
    placementMapCount: 0,
    sourceSnapshotId,
    ...overrides,
  });
}

const authorization = {
  planHash: sourceSnapshotId,
  targetBundleHash: sourceSnapshotId,
  targetSnapshotId: sourceSnapshotId,
};

/** Builds one schema-checked ready status with complete authorization. */
export function readyMigrationStatus(
  overrides: Partial<Omit<ReadyStatus, "phase">> = {}
) {
  return TryoutHistoryMigrationReadyStatusSchema.make({
    ...migrationStatus(),
    ...authorization,
    phase: "ready",
    ...overrides,
  });
}

/** Builds one schema-checked running status with complete authorization. */
export function runningMigrationStatus(
  overrides: Partial<Omit<RunningStatus, "phase">> = {}
) {
  return TryoutHistoryMigrationRunningStatusSchema.make({
    ...migrationStatus(),
    ...authorization,
    phase: "running",
    ...overrides,
  });
}
