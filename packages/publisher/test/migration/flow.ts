import { TryoutHistoryMigrationCompletionSchema } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";

import { PublicationTargetRejectedError } from "#publisher/target/errors";
import { historicalArtifact } from "#test/migration/artifact";
import { otherHash } from "#test/migration/protocol";
import {
  historicalCatalogEntries,
  historicalPlacementEntries,
} from "#test/migration/rows";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus } from "#test/migration/status";
import { makePublicationTarget } from "#test/target";

export const completion = TryoutHistoryMigrationCompletionSchema.make({
  completedAt: 1,
  migratedAttempts: 1,
  migratedScaleItems: 1,
  migratedScaleRuns: 1,
  migratedScaleVersions: 1,
  remainingMarkers: 0,
});

/** Produces internally complete terminal state from any staged identity set. */
export function completedMigrationStatus(
  status: TryoutHistoryMigrationStatus = migrationStatus()
) {
  return migrationStatus({
    ...status,
    completion,
    phase: "completed",
    planHash: status.planHash ?? otherHash,
    targetBundleHash: status.targetBundleHash ?? otherHash,
    targetSnapshotId: status.targetSnapshotId ?? otherHash,
  });
}

/** Builds one stable authenticated target rejection for status-path tests. */
export function migrationRejection(
  code: "CONTENT_RELEASE_MISSING" | "CONTENT_RELEASE_STATE"
) {
  return new PublicationTargetRejectedError({
    rejection: {
      code,
      kind: "rejected",
      operation: "migrateTryoutHistory",
      releaseId: migrationId,
    },
  });
}

/** Serves one status and optional run result while recording commands. */
export function migrationStatusTarget(
  status: TryoutHistoryMigrationStatus,
  runStatus: TryoutHistoryMigrationStatus = completedMigrationStatus(status)
) {
  const commands: string[] = [];
  const target = makePublicationTarget({
    migrateTryoutHistory: (request) => {
      commands.push(request.command);
      if (request.command === "status") {
        return Effect.succeed({ command: "status", migrationId, status });
      }
      if (request.command === "run") {
        return Effect.succeed({
          command: "run",
          migrationId,
          status: runStatus,
        });
      }
      return Effect.die(`Unexpected ${request.command} command.`);
    },
  });
  return { commands, target };
}

/** Serves the complete deterministic migration protocol through one fake target. */
export function fullMigrationTarget() {
  const commands: string[] = [];
  let ready = migrationStatus();
  const target = makePublicationTarget({
    migrateTryoutHistory: (request) => {
      commands.push(request.command);
      switch (request.command) {
        case "status":
          return Effect.fail(migrationRejection("CONTENT_RELEASE_MISSING"));
        case "source":
          return Effect.succeed({
            command: request.command,
            migrationId,
            source: historicalSource,
          });
        case "initialize":
          return Effect.succeed({
            command: request.command,
            migrationId,
            status: migrationStatus(),
          });
        case "rowPage":
          return Effect.succeed({
            command: request.command,
            isDone: true,
            migrationId,
            nextIndex: null,
            rowKind: request.rowKind,
            rows:
              request.rowKind === "catalog"
                ? historicalCatalogEntries
                : historicalPlacementEntries,
          });
        case "artifactBatch":
          return Effect.succeed({
            artifacts: request.artifactHashes.flatMap((hash) => {
              const artifact = historicalArtifact(hash);
              return artifact === undefined ? [] : [artifact];
            }),
            command: request.command,
            migrationId,
          });
        case "stageBundle":
          return Effect.succeed({
            bundleHash: request.bundle.bundleHash,
            command: request.command,
            created: 1,
            migrationId,
            unchanged: 0,
          });
        case "stageArtifacts":
        case "stageRows":
          return Effect.succeed({
            command: request.command,
            created: request.mappings.length,
            migrationId,
            unchanged: 0,
          });
        case "stageSnapshot":
          return Effect.succeed({
            command: request.command,
            created: 1,
            migrationId,
            snapshotId: request.snapshot.snapshotId,
            unchanged: 0,
          });
        case "stagePlan":
          ready = migrationStatus({
            artifactMapCount: request.plan.payload.target.artifacts.count,
            catalogMapCount: request.plan.payload.target.catalog.count,
            phase: "ready",
            placementMapCount: request.plan.payload.target.placements.count,
            planHash: request.plan.planHash,
            targetBundleHash: request.plan.payload.target.bundleHash,
            targetSnapshotId: request.plan.payload.target.snapshot.snapshotId,
          });
          return Effect.succeed({
            command: request.command,
            migrationId,
            status: ready,
          });
        case "run":
          return Effect.succeed({
            command: request.command,
            migrationId,
            status: completedMigrationStatus(ready),
          });
        default:
          return Effect.die("Unexpected migration command.");
      }
    },
  });
  return { commands, target };
}
