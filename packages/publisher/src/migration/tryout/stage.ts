import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  type TryoutHistoryMigrationPlanPayload,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { verifySignedTryoutHistoryMigrationPlan } from "@nakafa/aksara-contracts/migration/tryout/history/verify";
import {
  MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS,
  MAX_TRYOUT_HISTORY_MIGRATION_ROWS,
  type TryoutHistoryMigrationRowMapping,
} from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import type {
  TryoutHistoryMigrationSource,
  TryoutHistoryMigrationStatus,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect, Array as EffectArray, Stream } from "effect";
import {
  artifactMapping,
  type ConvertedTryoutArtifact,
} from "#publisher/migration/tryout/artifact";
import { migrationFail } from "#publisher/migration/tryout/error";
import type { ConvertedTryoutRows } from "#publisher/migration/tryout/row";
import type { PreparedTryoutMigrationTarget } from "#publisher/migration/tryout/target";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { ReplaySpool } from "#publisher/replay/spool";
import type { PublicationSigner } from "#publisher/signing/service";

type Target = typeof PublicationTarget.Service;

/** Creates or idempotently resumes the invisible migration staging root. */
export const initializeTryoutMigration = Effect.fn(
  "AksaraPublisher.initializeTryoutMigration"
)(function* (
  target: Target,
  migrationId: ReleaseId,
  source: TryoutHistoryMigrationSource
) {
  const value = yield* target.migrateTryoutHistory({
    command: "initialize",
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
    sourceSnapshotId: source.evidence.snapshot.snapshotId,
  });
  if (
    value.command !== "initialize" ||
    value.status.phase !== "staging" ||
    value.status.sourceSnapshotId !== source.evidence.snapshot.snapshotId
  ) {
    return yield* migrationFail("status-evidence");
  }
  return value.status;
});

/** Stages the permanent signed runtime before any converted target bytes. */
const stageBundle = Effect.fn("AksaraPublisher.stageTryoutMigrationBundle")(
  function* (
    target: Target,
    migrationId: ReleaseId,
    source: TryoutHistoryMigrationSource,
    prepared: PreparedTryoutMigrationTarget
  ) {
    yield* verifySignedTryoutRuntimeBundle({
      bundle: prepared.bundle,
      rendererManifest: prepared.rendererManifest,
    }).pipe(Effect.mapError(() => migrationFail("target-evidence")));
    const value = yield* target.migrateTryoutHistory({
      bundle: prepared.bundle,
      command: "stageBundle",
      operation: "migrateTryoutHistory",
      releaseId: migrationId,
      rendererManifest: prepared.rendererManifest,
      sourceSnapshotId: source.evidence.snapshot.snapshotId,
    });
    if (value.command !== "stageBundle") {
      return yield* migrationFail("command-evidence");
    }
    return value.bundleHash;
  }
);

/** Stages each disk-spooled artifact in bounded deterministic batches. */
const stageArtifacts = Effect.fn(
  "AksaraPublisher.stageTryoutMigrationArtifacts"
)(function* (
  target: Target,
  migrationId: ReleaseId,
  source: TryoutHistoryMigrationSource,
  spool: ReplaySpool<ConvertedTryoutArtifact>
) {
  yield* spool.replay.pipe(
    Stream.map(artifactMapping),
    Stream.grouped(MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS),
    Stream.runForEach((batch) =>
      target
        .migrateTryoutHistory({
          command: "stageArtifacts",
          mappings: batch,
          operation: "migrateTryoutHistory",
          releaseId: migrationId,
          sourceSnapshotId: source.evidence.snapshot.snapshotId,
        })
        .pipe(
          Effect.flatMap((value) =>
            value.command === "stageArtifacts"
              ? Effect.void
              : Effect.fail(migrationFail("command-evidence"))
          )
        )
    )
  );
});

/** Stages one current row kind without mixing catalog and placements. */
const stageRowKind = Effect.fn("AksaraPublisher.stageTryoutMigrationRows")(
  function* (
    target: Target,
    migrationId: ReleaseId,
    source: TryoutHistoryMigrationSource,
    targetSnapshotId: PreparedTryoutMigrationTarget["evidence"]["snapshot"]["snapshotId"],
    mappings: readonly TryoutHistoryMigrationRowMapping[]
  ) {
    for (const batch of EffectArray.chunksOf(
      mappings,
      MAX_TRYOUT_HISTORY_MIGRATION_ROWS
    )) {
      const value = yield* target.migrateTryoutHistory({
        command: "stageRows",
        mappings: batch,
        operation: "migrateTryoutHistory",
        releaseId: migrationId,
        sourceSnapshotId: source.evidence.snapshot.snapshotId,
        targetSnapshotId,
      });
      if (value.command !== "stageRows") {
        return yield* migrationFail("command-evidence");
      }
    }
  }
);

/** Stages all converted rows and then their content-addressed snapshot. */
const stageRowsAndSnapshot = Effect.fn(
  "AksaraPublisher.stageTryoutMigrationSnapshot"
)(function* (
  target: Target,
  migrationId: ReleaseId,
  source: TryoutHistoryMigrationSource,
  prepared: PreparedTryoutMigrationTarget,
  rows: ConvertedTryoutRows
) {
  yield* stageRowKind(
    target,
    migrationId,
    source,
    prepared.evidence.snapshot.snapshotId,
    rows.catalog
  );
  yield* stageRowKind(
    target,
    migrationId,
    source,
    prepared.evidence.snapshot.snapshotId,
    rows.placements
  );
  const value = yield* target.migrateTryoutHistory({
    command: "stageSnapshot",
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
    snapshot: prepared.evidence.snapshot,
    sourceSnapshotId: source.evidence.snapshot.snapshotId,
  });
  if (
    value.command !== "stageSnapshot" ||
    value.snapshotId !== prepared.evidence.snapshot.snapshotId
  ) {
    return yield* migrationFail("command-evidence");
  }
});

/** Signs and stages the authorization only after target evidence is complete. */
const stagePlan = Effect.fn("AksaraPublisher.stageTryoutMigrationPlan")(
  function* (
    target: Target,
    signer: PublicationSigner,
    migrationId: ReleaseId,
    source: TryoutHistoryMigrationSource,
    prepared: PreparedTryoutMigrationTarget,
    bundleHash: PreparedTryoutMigrationTarget["evidence"]["bundleHash"]
  ) {
    const payload: TryoutHistoryMigrationPlanPayload = {
      format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
      migrationId,
      source: source.evidence,
      target: { ...prepared.evidence, bundleHash },
    };
    const plan = yield* signer.signTryoutHistoryMigrationPlan(payload);
    yield* verifySignedTryoutHistoryMigrationPlan(plan);
    const value = yield* target.migrateTryoutHistory({
      command: "stagePlan",
      operation: "migrateTryoutHistory",
      plan,
      releaseId: migrationId,
    });
    if (
      value.command !== "stagePlan" ||
      value.status.phase !== "ready" ||
      value.status.planHash !== plan.planHash ||
      value.status.artifactMapCount !== prepared.evidence.artifacts.count ||
      value.status.catalogMapCount !== prepared.evidence.catalog.count ||
      value.status.placementMapCount !== prepared.evidence.placements.count ||
      value.status.sourceSnapshotId !== source.evidence.snapshot.snapshotId ||
      value.status.targetBundleHash !== bundleHash ||
      value.status.targetSnapshotId !== prepared.evidence.snapshot.snapshotId
    ) {
      return yield* migrationFail("status-evidence");
    }
    return value.status;
  }
);

/** Performs the complete idempotent staging sequence and returns ready state. */
export const stageTryoutMigration = Effect.fn(
  "AksaraPublisher.stageTryoutHistoryMigration"
)(function* (input: {
  readonly artifacts: ReplaySpool<ConvertedTryoutArtifact>;
  readonly migrationId: ReleaseId;
  readonly prepared: PreparedTryoutMigrationTarget;
  readonly rows: ConvertedTryoutRows;
  readonly signer: PublicationSigner;
  readonly source: TryoutHistoryMigrationSource;
  readonly target: Target;
}) {
  const bundleHash = yield* stageBundle(
    input.target,
    input.migrationId,
    input.source,
    input.prepared
  );
  yield* stageArtifacts(
    input.target,
    input.migrationId,
    input.source,
    input.artifacts
  );
  yield* stageRowsAndSnapshot(
    input.target,
    input.migrationId,
    input.source,
    input.prepared,
    input.rows
  );
  return yield* stagePlan(
    input.target,
    input.signer,
    input.migrationId,
    input.source,
    input.prepared,
    bundleHash
  );
});

/** Accepts only a complete immutable authorization for direct execution. */
export function isMigrationRunnable(
  status: TryoutHistoryMigrationStatus
): status is Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "ready" | "running" }
> {
  return status.phase === "ready" || status.phase === "running";
}
