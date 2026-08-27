import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { migrateRetainedTryoutHistory } from "@nakafa/aksara-publisher/migration/tryout/program";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect, type FileSystem, type Path } from "effect";
import type { HttpClient } from "effect/unstable/http";

import {
  readProductionEnvironment,
  readPublicationEnvironment,
} from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { verifySigningKey } from "#cli/keys";
import { writeMigrationReceipt } from "#cli/migration/receipt";
import type { MigrateTryoutHistoryArguments } from "#cli/production/arguments";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

type MigrationCommand = Effect.Effect<
  void,
  ProductionError,
  FileSystem.FileSystem | HttpClient.HttpClient | Path.Path
>;

/** Seals the temporary migration and exports its public-safe signed receipt. */
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
      const receipt = yield* migrateRetainedTryoutHistory(args.releaseId).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(
          PublicationSigningKey,
          PublicationSigningKey.of({
            keyId: environment.keyId,
            privateKeyPem: environment.privateKeyPem,
          })
        ),
        Effect.provideService(
          PublicationTarget,
          retryPublicationTarget(rawTarget)
        ),
        Effect.mapError(mapProductionError("migration"))
      );
      yield* writeMigrationReceipt(args.receiptPath, receipt).pipe(
        Effect.mapError(mapProductionError("migration"))
      );
      yield* Effect.logInfo("Try-out history migration sealed.").pipe(
        Effect.annotateLogs({
          cleanupLimit: receipt.payload.completion.cleanupLimit,
          migratedAttempts: receipt.payload.completion.migratedAttempts,
          migrationId: receipt.payload.migrationId,
          planHash: receipt.payload.planHash,
          receiptHash: receipt.receiptHash,
          remainingMarkers: receipt.payload.completion.remainingMarkers,
          targetBundleHash: receipt.payload.targetBundleHash,
          targetSnapshotId: receipt.payload.targetSnapshotId,
        })
      );
    })
);
