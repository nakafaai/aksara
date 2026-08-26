import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { TryoutHistoryMigrationRequestSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import { TryoutHistoryMigrationSuccessSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect, Schema } from "effect";

import { artifactMapping } from "#publisher/migration/tryout/artifact";
import { historicalArtifacts } from "#test/migration/artifact";
import { convertedArtifacts } from "#test/migration/converted";
import { historicalCatalogEntries } from "#test/migration/rows";
import { migrationSigner } from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus } from "#test/migration/status";
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
  const ready = migrationStatus({
    artifactMapCount: prepared.evidence.artifacts.count,
    catalogMapCount: prepared.evidence.catalog.count,
    phase: "ready",
    placementMapCount: prepared.evidence.placements.count,
    planHash: plan.planHash,
    targetBundleHash: prepared.evidence.bundleHash,
    targetSnapshotId: prepared.evidence.snapshot.snapshotId,
  });
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
        status: ready,
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
