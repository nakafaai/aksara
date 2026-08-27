import { abortRetainedTryoutHistory } from "@nakafa/aksara-publisher/migration/tryout/abort";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import type { HttpClient } from "effect/unstable/http";

import { readPublicationEnvironment } from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import type { AbortTryoutHistoryArguments } from "#cli/production/arguments";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

type AbortCommand = Effect.Effect<void, ProductionError, HttpClient.HttpClient>;

/** Abandons only invisible retained-history staging through the protected target. */
export const runTryoutAbortCommand: (
  args: AbortTryoutHistoryArguments
) => AbortCommand = Effect.fn("AksaraCli.runTryoutAbortCommand")((args) =>
  Effect.gen(function* () {
    const environment = yield* readPublicationEnvironment().pipe(
      Effect.mapError(mapProductionError("environment"))
    );
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint: environment.publicationEndpoint,
      timeout: PUBLICATION_TARGET_TIMEOUT,
      token: environment.publicationToken,
    }).pipe(Effect.mapError(mapProductionError("target")));
    const result = yield* abortRetainedTryoutHistory(args.releaseId).pipe(
      Effect.provideService(
        PublicationTarget,
        retryPublicationTarget(rawTarget)
      ),
      Effect.mapError(mapProductionError("migration"))
    );
    yield* Effect.logInfo("Try-out history staging aborted.").pipe(
      Effect.annotateLogs({
        deleted: result.deleted,
        migrationId: result.migrationId,
      })
    );
  })
);
