import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  type TryoutHistoryMigrationCompletion,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { TryoutHistoryMigrationRequestSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import {
  type TryoutHistoryMigrationStatus,
  TryoutHistoryMigrationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect, Schema } from "effect";

import { artifactMapping } from "#publisher/migration/tryout/artifact";
import { historicalArtifacts } from "#test/migration/artifact";
import { convertedArtifacts } from "#test/migration/converted";
import { historicalCatalogEntries } from "#test/migration/rows";
import { migrationSigner } from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus, readyMigrationStatus } from "#test/migration/status";
import { makeMigrationTarget } from "#test/migration/target";

export const otherHash = Sha256HashSchema.make(`sha256:${"0".repeat(64)}`);
export const otherId = ReleaseIdSchema.make("other-migration");

/** Strictly decodes one migration request for evidence-focused tests. */
export function migrationRequest(input: unknown) {
  return Schema.decodeUnknownSync(TryoutHistoryMigrationRequestSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Strictly decodes one successful migration response value. */
export function migrationResponse(value: unknown) {
  return Schema.decodeUnknownSync(TryoutHistoryMigrationSuccessSchema)(
    { ok: true, operation: "migrateTryoutHistory", value },
    { onExcessProperty: "error" }
  );
}

/** Builds the complete request and response vocabulary with real signatures. */
export const migrationProtocol = Effect.fn(
  "AksaraPublisherTest.migrationProtocol"
)(function* () {
  const { prepared, rows } = yield* makeMigrationTarget();
  const plan = yield* migrationSigner.signTryoutHistoryMigrationPlan({
    format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
    migrationId,
    source: historicalSource.evidence,
    target: prepared.evidence,
  });
  const ready = readyMigrationStatus({
    artifactMapCount: prepared.evidence.artifacts.count,
    catalogMapCount: prepared.evidence.catalog.count,
    placementMapCount: prepared.evidence.placements.count,
    planHash: plan.planHash,
    targetBundleHash: prepared.evidence.bundleHash,
    targetSnapshotId: prepared.evidence.snapshot.snapshotId,
  });
  const completion: TryoutHistoryMigrationCompletion = {
    completedAt: 1,
    migratedAttempts: historicalSource.evidence.attempts.attemptCount,
    migratedScaleItems: historicalSource.evidence.scales.itemCount,
    migratedScaleRuns: historicalSource.evidence.scales.runCount,
    migratedScaleVersions: historicalSource.evidence.scales.versionCount,
    remainingMarkers: 0,
  };
  const receipt = yield* migrationSigner.signTryoutHistoryMigrationReceipt({
    completion,
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId,
    planHash: plan.planHash,
    sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
    targetBundleHash: prepared.evidence.bundleHash,
    targetSnapshotId: prepared.evidence.snapshot.snapshotId,
  });
  const completed: Extract<
    TryoutHistoryMigrationStatus,
    { readonly phase: "completed" }
  > = {
    ...ready,
    completion,
    phase: "completed",
  };
  const sealed: Extract<
    TryoutHistoryMigrationStatus,
    { readonly phase: "sealed" }
  > = {
    ...completed,
    phase: "sealed",
    receipt,
  };
  const identity = {
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
  };
  return {
    artifact: {
      request: migrationRequest({
        ...identity,
        artifactHashes: historicalArtifacts.map(
          ({ artifactHash }) => artifactHash
        ),
        command: "artifactBatch",
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        artifacts: historicalArtifacts,
        command: "artifactBatch",
        migrationId,
      }),
    },
    bundle: {
      request: migrationRequest({
        ...identity,
        bundle: prepared.bundle,
        command: "stageBundle",
        rendererManifest: prepared.rendererManifest,
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        bundleHash: prepared.bundle.bundleHash,
        command: "stageBundle",
        created: 1,
        migrationId,
        unchanged: 0,
      }),
    },
    cleanup: {
      request: migrationRequest({
        ...identity,
        command: "cleanup",
        receipt,
      }),
      response: migrationResponse({
        command: "cleanup",
        deleted: 1,
        migrationId,
        status: sealed,
      }),
    },
    initialize: {
      request: migrationRequest({
        ...identity,
        command: "initialize",
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        command: "initialize",
        migrationId,
        status: migrationStatus(),
      }),
    },
    plan: {
      request: migrationRequest({ ...identity, command: "stagePlan", plan }),
      response: migrationResponse({
        command: "stagePlan",
        migrationId,
        status: ready,
      }),
    },
    row: {
      request: migrationRequest({
        ...identity,
        afterIndex: -1,
        command: "rowPage",
        rowKind: "catalog",
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        command: "rowPage",
        isDone: true,
        migrationId,
        nextIndex: null,
        rowKind: "catalog",
        rows: historicalCatalogEntries,
      }),
    },
    run: {
      request: migrationRequest({ ...identity, command: "run" }),
      response: migrationResponse({
        command: "run",
        migrationId,
        status: completed,
      }),
    },
    seal: {
      request: migrationRequest({ ...identity, command: "seal", receipt }),
      response: migrationResponse({
        command: "seal",
        migrationId,
        status: sealed,
      }),
    },
    snapshot: {
      request: migrationRequest({
        ...identity,
        command: "stageSnapshot",
        snapshot: prepared.evidence.snapshot,
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        command: "stageSnapshot",
        created: 1,
        migrationId,
        snapshotId: prepared.evidence.snapshot.snapshotId,
        unchanged: 0,
      }),
    },
    source: {
      request: migrationRequest({ ...identity, command: "source" }),
      response: migrationResponse({
        command: "source",
        migrationId,
        source: historicalSource,
      }),
    },
    stageArtifacts: {
      request: migrationRequest({
        ...identity,
        command: "stageArtifacts",
        mappings: convertedArtifacts.map(artifactMapping),
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        command: "stageArtifacts",
        created: 2,
        migrationId,
        unchanged: 0,
      }),
    },
    stageRows: {
      request: migrationRequest({
        ...identity,
        command: "stageRows",
        mappings: rows.catalog,
        sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
        targetSnapshotId: prepared.evidence.snapshot.snapshotId,
      }),
      response: migrationResponse({
        command: "stageRows",
        created: 1,
        migrationId,
        unchanged: 0,
      }),
    },
    status: {
      request: migrationRequest({ ...identity, command: "status" }),
      response: migrationResponse({
        command: "status",
        migrationId,
        status: ready,
      }),
    },
  };
});
