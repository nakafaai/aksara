import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { SignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect, Redacted, Stream } from "effect";
import {
  ConvertedTryoutArtifactSchema,
  convertedArtifactMap,
  makeArtifactRequirements,
  makeConvertedArtifactStream,
} from "#publisher/migration/tryout/artifact";
import { migrationFail } from "#publisher/migration/tryout/error";
import {
  authenticateMigrationReceipt,
  cleanupMigrationReceipt,
  makeMigrationReceipt,
  sealMigrationReceipt,
} from "#publisher/migration/tryout/receipt";
import { convertTryoutRows } from "#publisher/migration/tryout/row";
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

type RunnableStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "ready" | "running" }
>;

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
  expected: RunnableStatus,
  actual: Extract<TryoutHistoryMigrationStatus, { readonly phase: "completed" }>
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
    authorized: RunnableStatus
  ) {
    const value = yield* target.migrateTryoutHistory({
      command: "run",
      operation: "migrateTryoutHistory",
      releaseId: authorized.migrationId,
    });
    if (
      value.command !== "run" ||
      value.status.phase !== "completed" ||
      !hasSameAuthorization(authorized, value.status)
    ) {
      return yield* migrationFail("status-evidence");
    }
    return value.status;
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
      const status = yield* readOptionalStatus(target, migrationId);
      if (status?.phase === "cleaned" || status?.phase === "sealed") {
        return yield* authenticateMigrationReceipt(status.receipt);
      }
      const signingKey = yield* PublicationSigningKey;
      const signer = yield* makeEd25519PublicationSigner({
        keyId: signingKey.keyId,
        privateKeyPem: Redacted.value(signingKey.privateKeyPem),
      });
      if (status?.phase === "completed") {
        return yield* makeMigrationReceipt(signer, status);
      }
      if (status && isMigrationRunnable(status)) {
        return yield* makeMigrationReceipt(
          signer,
          yield* runMigration(target, status)
        );
      }
      const completed = yield* prepareAndRun(target, signer, migrationId);
      return yield* makeMigrationReceipt(signer, completed);
    })
  )
);

/** Seals and cleans only after an external caller durably owns the receipt. */
export const completeRetainedTryoutHistory = Effect.fn(
  "AksaraPublisher.completeRetainedTryoutHistory"
)((receipt: SignedTryoutHistoryMigrationReceipt) =>
  Effect.gen(function* () {
    const target = yield* PublicationTarget;
    yield* sealMigrationReceipt(target, receipt);
    return yield* cleanupMigrationReceipt(target, receipt);
  })
);
