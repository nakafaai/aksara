import type { HttpClient } from "@effect/platform";
import type { ReleaseAbortReceipt } from "@nakafa/aksara-contracts/release/lifecycle";
import {
  abortContentRelease,
  ReleaseAbortIncompleteError,
} from "@nakafa/aksara-publisher/abort";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import type { AbortArguments } from "#cli/args";
import { readCleanupEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { retryPublicationTarget } from "#cli/retry";

const ABORT_TIMEOUT = "30 seconds";

type AbortCommand = Effect.Effect<
  ReleaseAbortReceipt,
  ProductionError | ReleaseAbortIncompleteError,
  HttpClient.HttpClient
>;

/** Preserves resumable abort evidence while sanitizing other failures. */
function mapAbortError(error: unknown) {
  return error instanceof ReleaseAbortIncompleteError
    ? error
    : mapProductionError("abort")(error);
}

/** Emits only cumulative non-secret evidence after abort completes. */
function logAbortReceipt(receipt: ReleaseAbortReceipt) {
  return Effect.logInfo("Content release aborted.").pipe(
    Effect.annotateLogs({
      processedItems: receipt.processedItems,
      releaseId: receipt.releaseId,
      totalItems: receipt.totalItems,
    }),
    Effect.as(receipt)
  );
}

/** Explicitly abandons one invisible staged release through bounded pages. */
export const runAbortCommand: (args: AbortArguments) => AbortCommand =
  Effect.fn("AksaraCli.runAbortCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readCleanupEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: ABORT_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const target = retryPublicationTarget(rawTarget);
      const receipt = yield* abortContentRelease({
        releaseId: args.releaseId,
      }).pipe(
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapAbortError)
      );
      return yield* logAbortReceipt(receipt);
    })
  );
