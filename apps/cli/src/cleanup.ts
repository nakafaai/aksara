import type { HttpClient } from "@effect/platform";
import type { ReleaseCleanupReceipt } from "@nakafa/aksara-contracts/release/lifecycle";
import {
  cleanupContentRelease,
  ReleaseCleanupDeferredError,
  ReleaseCleanupIncompleteError,
} from "@nakafa/aksara-publisher/cleanup";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import type { CleanupArguments } from "#cli/args";
import { readCleanupEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { retryPublicationTarget } from "#cli/retry";

const CLEANUP_TIMEOUT = "30 seconds";

type CleanupCommand = Effect.Effect<
  ReleaseCleanupReceipt,
  ProductionError | ReleaseCleanupDeferredError | ReleaseCleanupIncompleteError,
  HttpClient.HttpClient
>;

/** Preserves actionable retention evidence while sanitizing other failures. */
function mapCleanupError(error: unknown) {
  if (
    error instanceof ReleaseCleanupDeferredError ||
    error instanceof ReleaseCleanupIncompleteError
  ) {
    return error;
  }
  return mapProductionError("cleanup")(error);
}

/** Emits only cumulative non-secret deletion evidence after cleanup completes. */
function logCleanupReceipt(receipt: ReleaseCleanupReceipt) {
  return Effect.logInfo("Content cleanup completed.").pipe(
    Effect.annotateLogs({
      deletedArtifacts: receipt.deletedArtifacts,
      deletedItems: receipt.deletedItems,
      releaseId: receipt.releaseId,
    }),
    Effect.as(receipt)
  );
}

/** Runs retention-aware cleanup with only the authenticated target capability. */
export const runCleanupCommand: (args: CleanupArguments) => CleanupCommand =
  Effect.fn("AksaraCli.runCleanupCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readCleanupEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: CLEANUP_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const target = retryPublicationTarget(rawTarget);
      const receipt = yield* cleanupContentRelease({
        releaseId: args.releaseId,
      }).pipe(
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapCleanupError)
      );
      return yield* logCleanupReceipt(receipt);
    })
  );
