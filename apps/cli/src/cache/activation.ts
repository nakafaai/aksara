import {
  type ContentCacheChange,
  type ContentCacheRequest,
  MAX_CONTENT_CACHE_ARTIFACTS,
  makeContentCacheRequest,
} from "@nakafa/aksara-contracts/cache/content";
import { ContentFamilySchema } from "@nakafa/aksara-contracts/content";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import { PublicationActivationError } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type Redacted, Schedule, Stream } from "effect";
import type { HttpClient } from "effect/unstable/http";
import { ContentCacheError } from "#cli/cache/error";
import { invalidateContentCache } from "#cli/cache/exchange";
import { isRendererEndpoint } from "#cli/production/renderer";

const CACHE_PATH = "/api/internal/content/cache";
const RETRY_COUNT = 3;
const RETRY_DELAY = "100 millis";
const REQUEST_TIMEOUT = "30 seconds";

/** Derives the only cache endpoint from the exact renderer endpoint contract. */
function makeCacheEndpoint(rendererEndpoint: URL) {
  if (!isRendererEndpoint(rendererEndpoint)) {
    return null;
  }
  return new URL(CACHE_PATH, rendererEndpoint);
}

/** Selects unique body hashes from one already-bounded family change batch. */
function uniqueArtifactHashes(changes: readonly ContentCacheChange[]) {
  return [
    ...new Set(
      changes.flatMap(({ artifactHash }) =>
        artifactHash === undefined ? [] : [artifactHash]
      )
    ),
  ];
}

/** Streams bounded invalidation requests for each family touched by a release. */
function makeCacheRequests<E, R>(input: {
  /** Replays the exact family-aware changes authenticated by the release. */
  readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}) {
  return Stream.fromIterable(ContentFamilySchema.literals).pipe(
    Stream.flatMap((family) =>
      input.cacheChanges.pipe(
        Stream.filter((change) => change.family === family),
        Stream.grouped(MAX_CONTENT_CACHE_ARTIFACTS),
        Stream.map((changes) =>
          makeContentCacheRequest({
            artifactHashes: uniqueArtifactHashes(changes),
            family,
            releaseId: input.release.manifest.releaseId,
          })
        )
      )
    )
  );
}

/** Creates the bounded post-commit cache convergence operation. */
export function makeProductionCacheInvalidation(settings: {
  readonly client: HttpClient.HttpClient;
  readonly endpoint: URL;
  readonly token: Redacted.Redacted<string>;
}) {
  return Effect.fn("AksaraCli.invalidateProductionCache")(function* <
    E,
    R,
  >(input: {
    /** Replays exact family-aware transitions for the activated release. */
    readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
    readonly release: SignedContentRelease;
  }) {
    const cacheEndpoint = makeCacheEndpoint(settings.endpoint);
    if (cacheEndpoint === null) {
      return yield* new PublicationActivationError({
        phase: "cache",
        releaseId: input.release.manifest.releaseId,
      });
    }
    /** Sends one bounded, exact invalidation request with its retry policy. */
    const invalidateRequest = (request: ContentCacheRequest) =>
      invalidateContentCache(
        settings.client,
        cacheEndpoint,
        settings.token,
        request
      ).pipe(
        Effect.retry({
          schedule: Schedule.exponential(RETRY_DELAY),
          times: RETRY_COUNT,
          while: (error) => error.retryable,
        }),
        Effect.timeoutOrElse({
          duration: REQUEST_TIMEOUT,
          orElse: () =>
            Effect.fail(new ContentCacheError({ retryable: false })),
        }),
        Effect.mapError(
          () =>
            new PublicationActivationError({
              phase: "cache",
              releaseId: input.release.manifest.releaseId,
            })
        )
      );
    yield* makeCacheRequests(input).pipe(Stream.runForEach(invalidateRequest));
  });
}
