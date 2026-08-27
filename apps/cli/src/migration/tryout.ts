import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import type { SignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import {
  completeRetainedTryoutHistory,
  migrateRetainedTryoutHistory,
} from "@nakafa/aksara-publisher/migration/tryout/program";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect, FileSystem, Path, Schema } from "effect";
import type { HttpClient } from "effect/unstable/http";

import {
  readProductionEnvironment,
  readPublicationEnvironment,
} from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { verifySigningKey } from "#cli/keys";
import type { MigrateTryoutHistoryArguments } from "#cli/production/arguments";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

/** The public receipt could not be written to its exclusive destination. */
export class MigrationReceiptWriteError extends Schema.TaggedError<MigrationReceiptWriteError>()(
  "MigrationReceiptWriteError",
  {}
) {}

type MigrationCommand = Effect.Effect<
  void,
  ProductionError,
  FileSystem.FileSystem | HttpClient.HttpClient | Path.Path
>;

/** Durably writes and rereads one immutable receipt without overwriting it. */
const writeReceipt = Effect.fn("AksaraCli.writeTryoutMigrationReceipt")(
  function* (
    receiptPath: string,
    receipt: SignedTryoutHistoryMigrationReceipt
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const bytes = `${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`;
    const encoded = new TextEncoder().encode(bytes);
    const directory = path.dirname(receiptPath);
    yield* Effect.scoped(
      Effect.gen(function* () {
        const temporaryPath = yield* fileSystem.makeTempFileScoped({
          directory,
          prefix: ".aksara-receipt-",
        });
        yield* fileSystem.chmod(temporaryPath, 0o600);
        const file = yield* fileSystem.open(temporaryPath, { flag: "w" });
        yield* file.writeAll(encoded);
        yield* file.sync;
        yield* fileSystem
          .link(temporaryPath, receiptPath)
          .pipe(
            Effect.catchTag("PlatformError", (error) =>
              error.reason._tag === "AlreadyExists"
                ? Effect.void
                : Effect.fail(new MigrationReceiptWriteError())
            )
          );
        const parent = yield* fileSystem.open(directory, { flag: "r" });
        yield* parent.sync;
      }).pipe(Effect.mapError(() => new MigrationReceiptWriteError()))
    );
    const persisted = yield* fileSystem
      .readFileString(receiptPath, "utf8")
      .pipe(Effect.mapError(() => new MigrationReceiptWriteError()));
    if (persisted !== bytes) {
      return yield* new MigrationReceiptWriteError();
    }
    return receipt;
  }
);

/** Runs the temporary signed migration and emits only public-safe evidence. */
export const runTryoutMigrationCommand: (
  args: MigrateTryoutHistoryArguments
) => MigrationCommand = Effect.fn("AksaraCli.runTryoutMigrationCommand")(
  (args) =>
    Effect.gen(function* () {
      const publication = yield* readPublicationEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const environment = yield* readProductionEnvironment(publication).pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const keyResolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
      yield* verifySigningKey({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem: environment.derivedPublicKeyPem,
        keyId: environment.keyId,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.mapError(mapProductionError("keys"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: PUBLICATION_TARGET_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const target = retryPublicationTarget(rawTarget);
      const receipt = yield* migrateRetainedTryoutHistory(args.releaseId).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(
          PublicationSigningKey,
          PublicationSigningKey.of({
            keyId: environment.keyId,
            privateKeyPem: environment.privateKeyPem,
          })
        ),
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("migration"))
      );
      const persisted = yield* writeReceipt(args.receiptPath, receipt).pipe(
        Effect.mapError(mapProductionError("migration"))
      );
      yield* completeRetainedTryoutHistory(persisted).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("migration"))
      );
      yield* Effect.logInfo("Try-out history migration completed.").pipe(
        Effect.annotateLogs({
          migratedAttempts: receipt.payload.completion.migratedAttempts,
          migrationId: receipt.payload.migrationId,
          planHash: receipt.payload.planHash,
          receiptHash: receipt.receiptHash,
          remainingMarkers: receipt.payload.completion.remainingMarkers,
          removalGate: TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE,
          targetBundleHash: receipt.payload.targetBundleHash,
          targetSnapshotId: receipt.payload.targetSnapshotId,
        })
      );
    })
);
