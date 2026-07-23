import type { HttpClient } from "@effect/platform";
import type { ReleaseAbortReceipt } from "@nakafa/aksara-contracts/release/lifecycle";
import { acceptContentRelease } from "@nakafa/aksara-publisher/accept";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import type { AcceptArguments } from "#cli/args";
import { readCleanupEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { retryPublicationTarget } from "#cli/retry";

const ACCEPT_TIMEOUT = "30 seconds";

type AcceptCommand = Effect.Effect<
  ReleaseAbortReceipt,
  ProductionError,
  HttpClient.HttpClient
>;

/** Clears one retained inverse after explicit healthy-release acceptance. */
export const runAcceptCommand: (args: AcceptArguments) => AcceptCommand =
  Effect.fn("AksaraCli.runAcceptCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readCleanupEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: ACCEPT_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const target = retryPublicationTarget(rawTarget);
      const receipt = yield* acceptContentRelease({
        recoveryId: args.recoveryId,
        releaseId: args.releaseId,
      }).pipe(
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("accept"))
      );
      return yield* Effect.logInfo("Content recovery accepted.").pipe(
        Effect.annotateLogs({
          recoveryId: args.recoveryId,
          releaseId: args.releaseId,
        }),
        Effect.as(receipt)
      );
    })
  );
