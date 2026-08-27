import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import { cleanupRetainedTryoutHistory } from "@nakafa/aksara-publisher/migration/tryout/program";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect, type FileSystem } from "effect";
import type { HttpClient } from "effect/unstable/http";

import { readPublicationEnvironment } from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { readMigrationReceipt } from "#cli/migration/receipt";
import type { CleanupTryoutHistoryArguments } from "#cli/production/arguments";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

type CleanupCommand = Effect.Effect<
  void,
  ProductionError,
  FileSystem.FileSystem | HttpClient.HttpClient
>;

/** Cleans retained source rows only from one externally durable signed receipt. */
export const runTryoutCleanupCommand: (
  args: CleanupTryoutHistoryArguments
) => CleanupCommand = Effect.fn("AksaraCli.runTryoutCleanupCommand")((args) =>
  Effect.gen(function* () {
    const keyResolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
    const receipt = yield* readMigrationReceipt(
      args.receiptPath,
      args.releaseId
    ).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.mapError(mapProductionError("migration"))
    );
    const environment = yield* readPublicationEnvironment().pipe(
      Effect.mapError(mapProductionError("environment"))
    );
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint: environment.publicationEndpoint,
      timeout: PUBLICATION_TARGET_TIMEOUT,
      token: environment.publicationToken,
    }).pipe(Effect.mapError(mapProductionError("target")));
    yield* cleanupRetainedTryoutHistory(receipt, args.proof).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.provideService(
        PublicationTarget,
        retryPublicationTarget(rawTarget)
      ),
      Effect.mapError(mapProductionError("migration"))
    );
    yield* Effect.logInfo("Try-out history migration cleaned.").pipe(
      Effect.annotateLogs({
        cleanupLimit: receipt.payload.completion.cleanupLimit,
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
