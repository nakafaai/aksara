import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import {
  hashTryoutHistoryMigrationReceiptAsset,
  TryoutHistoryMigrationProofSchema,
} from "@nakafa/aksara-contracts/migration/tryout/history/proof";
import type { SignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { TryoutHistoryMigrationCompletionSchema } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import {
  TryoutHistoryMigrationCleanedStatusSchema,
  TryoutHistoryMigrationCompletedStatusSchema,
  TryoutHistoryMigrationSealedStatusSchema,
  type TryoutHistoryMigrationStatus,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";

import { PublicationTargetRejectedError } from "#publisher/target/errors";
import { historicalArtifact } from "#test/migration/artifact";
import {
  historicalCatalogEntries,
  historicalPlacementEntries,
} from "#test/migration/rows";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus, readyMigrationStatus } from "#test/migration/status";
import { makePublicationTarget } from "#test/target";

export const completion = TryoutHistoryMigrationCompletionSchema.make({
  cleanupLimit: 18,
  completedAt: 1,
  migratedAttempts: 1,
  migratedScaleItems: 1,
  migratedScaleRuns: 1,
  migratedScaleVersions: 1,
  remainingMarkers: 0,
});

/** Builds external immutable-release proof for one exact receipt fixture. */
export const migrationProof = Effect.fn("AksaraPublisherTest.migrationProof")(
  function* (receipt: SignedTryoutHistoryMigrationReceipt) {
    return TryoutHistoryMigrationProofSchema.make({
      assetHash: yield* hashTryoutHistoryMigrationReceiptAsset(receipt),
      sourceSha: GitCommitShaSchema.make("a".repeat(40)),
    });
  }
);

/** Produces internally complete terminal state from any staged identity set. */
export function completedMigrationStatus(
  status: Extract<
    TryoutHistoryMigrationStatus,
    { readonly phase: "ready" | "running" }
  > = readyMigrationStatus()
) {
  return TryoutHistoryMigrationCompletedStatusSchema.make({
    ...status,
    completion,
    phase: "completed",
  });
}

/** Binds a signed receipt back to the exact completed migration state. */
export function sealedMigrationStatus(
  receipt: SignedTryoutHistoryMigrationReceipt,
  status: Extract<
    TryoutHistoryMigrationStatus,
    { readonly phase: "completed" | "ready" | "running" }
  >
) {
  return TryoutHistoryMigrationSealedStatusSchema.make({
    ...status,
    completion: receipt.payload.completion,
    phase: "sealed",
    planHash: receipt.payload.planHash,
    receipt,
    sourceSnapshotId: receipt.payload.sourceSnapshotId,
    targetBundleHash: receipt.payload.targetBundleHash,
    targetSnapshotId: receipt.payload.targetSnapshotId,
  });
}

/** Projects the permanent receipt after every temporary row is removed. */
export function cleanedMigrationStatus(
  receipt: SignedTryoutHistoryMigrationReceipt
) {
  return TryoutHistoryMigrationCleanedStatusSchema.make({
    migrationId: receipt.payload.migrationId,
    phase: "cleaned",
    receipt,
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
  runStatus?: TryoutHistoryMigrationStatus
) {
  const resolvedRunStatus =
    runStatus ??
    (status.phase === "ready" || status.phase === "running"
      ? completedMigrationStatus(status)
      : completedMigrationStatus());
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
          status: resolvedRunStatus,
        });
      }
      if (request.command === "seal") {
        let terminal = completedMigrationStatus();
        if (resolvedRunStatus.phase === "completed") {
          terminal = resolvedRunStatus;
        }
        if (status.phase === "completed") {
          terminal = status;
        }
        return Effect.succeed({
          command: "seal",
          migrationId,
          status: sealedMigrationStatus(request.receipt, terminal),
        });
      }
      if (request.command === "cleanup") {
        return Effect.succeed({
          command: "cleanup",
          deleted: 1,
          migrationId,
          repaired: 0,
          status: cleanedMigrationStatus(request.receipt),
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
  let ready = readyMigrationStatus();
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
            rendererManifestHash: request.rendererManifest.hash,
            snapshotId: request.bundle.payload.snapshot.snapshotId,
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
          ready = readyMigrationStatus({
            artifactMapCount: request.plan.payload.target.artifacts.count,
            catalogMapCount: request.plan.payload.target.catalog.count,
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
        case "seal":
          return Effect.succeed({
            command: request.command,
            migrationId,
            status: sealedMigrationStatus(
              request.receipt,
              completedMigrationStatus(ready)
            ),
          });
        case "cleanup":
          return Effect.succeed({
            command: request.command,
            deleted: 1,
            migrationId,
            repaired: 0,
            status: cleanedMigrationStatus(request.receipt),
          });
        default:
          return Effect.die("Unexpected migration command.");
      }
    },
  });
  return { commands, target };
}
