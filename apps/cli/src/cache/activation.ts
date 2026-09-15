import {
  type ContentCacheChange,
  type ContentCacheRequest,
  ContentCacheRequestSchema,
  type ContentCacheScope,
  ContentCacheScopeSchema,
} from "@nakafa/aksara-contracts/cache/content";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import { PublicationActivationError } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type Redacted, Schedule, Schema, Stream } from "effect";
import type { HttpClient } from "effect/unstable/http";
import { ContentCacheError } from "#cli/cache/error";
import { invalidateContentCache } from "#cli/cache/exchange";
import { isRendererEndpoint } from "#cli/production/renderer";

const CACHE_PATH = "/api/internal/content/cache";
const RETRY_COUNT = 3;
const RETRY_DELAY = "100 millis";
const REQUEST_TIMEOUT = "30 seconds";

/**
 * Selects whether one publication target has a deployed app cache surface.
 *
 * Only a target whose content is served by a deployed application can
 * revalidate that application's caches. A development or acceptance target is
 * served by no deployed app, so it must not invalidate another deployment.
 */
export const CacheSurfaceSchema = Schema.Literals(["deployed", "none"]);
export type CacheSurface = typeof CacheSurfaceSchema.Type;

/** One post-commit cache convergence request for the activated release. */
export interface CacheInvalidationInput<E, R> {
  /** Replays exact source-owned transitions for the activated release. */
  readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}

/** Derives the only cache endpoint from the exact renderer endpoint contract. */
function makeCacheEndpoint(rendererEndpoint: URL) {
  if (!isRendererEndpoint(rendererEndpoint)) {
    return null;
  }
  return new URL(CACHE_PATH, rendererEndpoint);
}

/** Emits at most one request per source-owned mutable publication scope. */
function makeCacheRequests<E, R>(input: {
  /** Replays the exact family-aware changes authenticated by the release. */
  readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}) {
  return input.cacheChanges.pipe(
    Stream.runFold(
      () => new Set<ContentCacheScope>(),
      (scopes, change) => new Set([...scopes, change.scope])
    ),
    Effect.map((scopes) =>
      Stream.fromIterable(ContentCacheScopeSchema.literals).pipe(
        Stream.filter((scope) => scopes.has(scope)),
        Stream.map((scope) =>
          ContentCacheRequestSchema.make({
            releaseId: input.release.manifest.releaseId,
            scope,
          })
        )
      )
    ),
    Stream.unwrap
  );
}

/**
 * Drains the release cache transitions for a target with no cache surface.
 *
 * The publisher still supplies the exact family-aware stream, so this keeps one
 * activation contract while declining to invalidate a deployment that does not
 * serve this release.
 */
export function makeAbsentCacheInvalidation() {
  return Effect.fn("AksaraCli.invalidateAbsentCache")(function* <E, R>(
    input: CacheInvalidationInput<E, R>
  ) {
    yield* Stream.runDrain(input.cacheChanges);
  });
}

/** Creates the bounded post-commit cache convergence operation. */
export function makeProductionCacheInvalidation(settings: {
  readonly client: HttpClient.HttpClient;
  readonly endpoint: URL;
  readonly token: Redacted.Redacted<string>;
}) {
  return Effect.fn("AksaraCli.invalidateProductionCache")(function* <E, R>(
    input: CacheInvalidationInput<E, R>
  ) {
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
