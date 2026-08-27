import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  type TryoutHistoryMigrationReceiptPayload,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { verifySignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/verify";
import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect, Redacted, Stream } from "effect";
import {
  ConvertedTryoutArtifactSchema,
  makeArtifactRequirements,
  makeConvertedArtifactStream,
} from "#publisher/migration/tryout/artifact";
import { migrationFail } from "#publisher/migration/tryout/error";
import {
  convertedArtifactMap,
  convertTryoutRows,
} from "#publisher/migration/tryout/row";
import {
  readHistoricalTryoutRows,
  readHistoricalTryoutSource,
} from "#publisher/migration/tryout/source";
import {
  initializeTryoutMigration,
  isMigrationRunnable,
  stageTryoutMigration,
} from "#publisher/migration/tryout/stage";
import {
  convertHistoricalRenderer,
  prepareTryoutMigrationTarget,
} from "#publisher/migration/tryout/target";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "#publisher/publication/spec";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  makeEd25519PublicationSigner,
  type PublicationSigner,
} from "#publisher/signing/service";

/** Reads existing migration state while treating only exact absence as empty. */
const readOptionalStatus = Effect.fn(
  "AksaraPublisher.readOptionalTryoutMigrationStatus"
)(function* (target: typeof PublicationTarget.Service, migrationId: ReleaseId) {
  return yield* target
    .migrateTryoutHistory({
      command: "status",
      operation: "migrateTryoutHistory",
      releaseId: migrationId,
    })
    .pipe(
      Effect.flatMap((value) =>
        value.command === "status"
          ? Effect.succeed(value.status)
          : Effect.fail(migrationFail("command-evidence"))
      ),
      Effect.catchTag("PublicationTargetRejectedError", (error) =>
        error.rejection.code === "CONTENT_RELEASE_MISSING"
          ? Effect.succeed(null)
          : Effect.fail(error)
      )
    );
});

/** Checks a run result preserves every immutable authorization identity. */
function hasSameAuthorization(
  expected: TryoutHistoryMigrationStatus,
  actual: TryoutHistoryMigrationStatus
) {
  return (
    actual.migrationId === expected.migrationId &&
    actual.planHash === expected.planHash &&
    actual.sourceSnapshotId === expected.sourceSnapshotId &&
    actual.artifactMapCount === expected.artifactMapCount &&
    actual.catalogMapCount === expected.catalogMapCount &&
    actual.placementMapCount === expected.placementMapCount &&
    actual.targetBundleHash === expected.targetBundleHash &&
    actual.targetSnapshotId === expected.targetSnapshotId
  );
}

/** Runs or resumes the authorized server-owned attempt transaction series. */
const runMigration = Effect.fn("AksaraPublisher.runTryoutHistoryMigration")(
  function* (
    target: typeof PublicationTarget.Service,
    authorized: TryoutHistoryMigrationStatus
  ) {
    const value = yield* target.migrateTryoutHistory({
      command: "run",
      operation: "migrateTryoutHistory",
      releaseId: authorized.migrationId,
    });
    if (
      value.command !== "run" ||
      value.status.phase !== "completed" ||
      value.status.completion === null ||
      !hasSameAuthorization(authorized, value.status)
    ) {
      return yield* migrationFail("status-evidence");
    }
    return value.status;
  }
);

/** Signs and authenticates the public-safe terminal completion receipt. */
const makeReceipt = Effect.fn("AksaraPublisher.makeTryoutMigrationReceipt")(
  function* (signer: PublicationSigner, status: TryoutHistoryMigrationStatus) {
    if (
      status.completion === null ||
      status.planHash === null ||
      status.targetBundleHash === null ||
      status.targetSnapshotId === null
    ) {
      return yield* migrationFail("receipt-evidence");
    }
    const payload: TryoutHistoryMigrationReceiptPayload = {
      completion: status.completion,
      format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
      migrationId: status.migrationId,
      planHash: status.planHash,
      sourceSnapshotId: status.sourceSnapshotId,
      targetBundleHash: status.targetBundleHash,
      targetSnapshotId: status.targetSnapshotId,
    };
    const receipt = yield* signer.signTryoutHistoryMigrationReceipt(payload);
    return yield* verifySignedTryoutHistoryMigrationReceipt(receipt).pipe(
      Effect.mapError(() => migrationFail("receipt-evidence"))
    );
  }
);

/** Builds, stages, authorizes, and runs one missing or staging migration. */
const prepareAndRun = Effect.fn("AksaraPublisher.prepareTryoutMigration")(
  function* (
    target: typeof PublicationTarget.Service,
    signer: PublicationSigner,
    migrationId: ReleaseId
  ) {
    const source = yield* readHistoricalTryoutSource(target, migrationId);
    yield* initializeTryoutMigration(target, migrationId, source);
    const rows = yield* readHistoricalTryoutRows(target, migrationId, source);
    const rendererManifest = yield* convertHistoricalRenderer(
      source.rendererManifest
    );
    const requirements = yield* makeArtifactRequirements(
      rows,
      source.evidence.artifactCount
    );
    const spool = yield* createReplaySpool({
      prefix: "aksara-tryout-migration-",
      schema: ConvertedTryoutArtifactSchema,
      stream: makeConvertedArtifactStream({
        migrationId,
        rendererManifest: source.rendererManifest,
        requirements,
        signer,
        sourceSnapshotId: source.evidence.snapshot.snapshotId,
        target,
      }),
    });
    const artifactMaps = Array.from(
      yield* spool.replay.pipe(
        Stream.map(convertedArtifactMap),
        Stream.runCollect
      )
    );
    const convertedRows = yield* convertTryoutRows(rows, requirements, spool);
    const prepared = yield* prepareTryoutMigrationTarget({
      artifacts: artifactMaps,
      rendererManifest,
      rows: convertedRows,
      signer,
      source,
    });
    const ready = yield* stageTryoutMigration({
      artifacts: spool,
      migrationId,
      prepared,
      rows: convertedRows,
      signer,
      source,
      target,
    });
    return yield* runMigration(target, ready);
  }
);

/** Completes or safely resumes the one signed retained-history migration. */
export const migrateRetainedTryoutHistory = Effect.fn(
  "AksaraPublisher.migrateRetainedTryoutHistory"
)((migrationId: ReleaseId) =>
  Effect.scoped(
    Effect.gen(function* () {
      const target = yield* PublicationTarget;
      const signingKey = yield* PublicationSigningKey;
      const signer = yield* makeEd25519PublicationSigner({
        keyId: signingKey.keyId,
        privateKeyPem: Redacted.value(signingKey.privateKeyPem),
      });
      const status = yield* readOptionalStatus(target, migrationId);
      if (status?.phase === "completed") {
        return yield* makeReceipt(signer, status);
      }
      if (status && isMigrationRunnable(status)) {
        return yield* makeReceipt(signer, yield* runMigration(target, status));
      }
      const completed = yield* prepareAndRun(target, signer, migrationId);
      return yield* makeReceipt(signer, completed);
    })
  )
);
