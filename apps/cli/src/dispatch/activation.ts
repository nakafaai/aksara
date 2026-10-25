import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import { PublicationActivationError } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type Redacted, Schedule, Schema, Stream } from "effect";
import type { HttpClient } from "effect/http";
import { ReleaseDispatchError } from "#cli/dispatch/error";
import { dispatchReleaseEvent } from "#cli/dispatch/exchange";

const RETRY_COUNT = 3;
const RETRY_DELAY = "100 millis";
const REQUEST_TIMEOUT = "30 seconds";

/**
 * Selects whether one publication target deploys Nakafa. Only a production target
 * dispatches its release, because Nakafa's deploy workflow ships the production
 * site. A development or acceptance target dispatches nothing.
 */
export const ReleaseSurfaceSchema = Schema.Literals(["deployed", "none"]);
export type ReleaseSurface = typeof ReleaseSurfaceSchema.Type;

/** The dispatch that one target runs: nothing, or a production dispatch with its token. */
export const ReleaseDispatchSchema = Schema.Union([
  Schema.Struct({ surface: Schema.Literal("none") }),
  Schema.Struct({
    surface: Schema.Literal("deployed"),
    token: Schema.Redacted(Schema.String),
  }),
]);
export type ReleaseDispatch = typeof ReleaseDispatchSchema.Type;

/** One post-commit convergence request for the activated release. */
interface ReleaseDispatchInput<E, R> {
  /** Replays the exact source-owned transitions for the activated release. */
  readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}

/** Drains the release transitions of a target that deploys no site, and dispatches nothing. */
export function makeAbsentReleaseDispatch() {
  return Effect.fn("AksaraCli.dispatchAbsentRelease")(function* <E, R>(
    input: ReleaseDispatchInput<E, R>
  ) {
    yield* Stream.runDrain(input.cacheChanges);
  });
}

/**
 * Creates the bounded post-commit dispatch of one activated release. A release
 * that changes no content dispatches nothing, and any other release dispatches
 * once, with the retry policy and the timeout of this operation.
 */
export function makeProductionReleaseDispatch(settings: {
  readonly client: HttpClient.HttpClient;
  readonly token: Redacted.Redacted<string>;
}) {
  return Effect.fn("AksaraCli.dispatchProductionRelease")(function* <E, R>(
    input: ReleaseDispatchInput<E, R>
  ) {
    const changes = yield* Stream.runCount(input.cacheChanges);
    if (changes === 0) {
      return;
    }
    const {
      manifest: { releaseId },
    } = input.release;
    yield* dispatchReleaseEvent(
      settings.client,
      settings.token,
      releaseId
    ).pipe(
      Effect.retry({
        schedule: Schedule.exponential(RETRY_DELAY),
        times: RETRY_COUNT,
        while: (error) => error.retryable,
      }),
      Effect.timeoutOrElse({
        duration: REQUEST_TIMEOUT,
        orElse: () =>
          Effect.fail(new ReleaseDispatchError({ retryable: false })),
      }),
      Effect.mapError(
        () => new PublicationActivationError({ phase: "cache", releaseId })
      )
    );
  });
}
