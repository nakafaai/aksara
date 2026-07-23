import { HttpClient } from "@effect/platform";
import {
  type ContentCacheChange,
  type ContentCacheRequest,
  MAX_CONTENT_CACHE_ARTIFACTS,
  makeContentCacheRequest,
} from "@nakafa/aksara-contracts/cache/content";
import { ContentFamilySchema } from "@nakafa/aksara-contracts/content";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { validateReleaseRendererManifest } from "@nakafa/aksara-publisher/release-validation";
import { Chunk, Effect, type Redacted, Schedule, Stream } from "effect";
import { ContentCacheError } from "#cli/cache/error";
import { invalidateContentCache } from "#cli/cache/exchange";
import {
  fetchProductionRenderer,
  isRendererEndpoint,
} from "#cli/production-renderer";

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
  readonly cacheChanges: () => Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}) {
  return Stream.fromIterable(ContentFamilySchema.literals).pipe(
    Stream.flatMap((family) =>
      input.cacheChanges().pipe(
        Stream.filter((change) => change.family === family),
        Stream.grouped(MAX_CONTENT_CACHE_ARTIFACTS),
        Stream.map((changes) =>
          makeContentCacheRequest({
            artifactHashes: uniqueArtifactHashes(
              Chunk.toReadonlyArray(changes)
            ),
            family,
            releaseId: input.release.manifest.releaseId,
          })
        )
      )
    )
  );
}

/** Captures HTTP for the pre-commit renderer and post-commit cache gates. */
export const makeProductionActivation = Effect.fn(
  "AksaraCli.makeProductionActivation"
)(function* (settings: {
  readonly endpoint: URL;
  readonly token: Redacted.Redacted<string>;
}) {
  const client = yield* HttpClient.HttpClient;
  /** Re-fetches and verifies the deployed renderer immediately before commit. */
  const verify = (release: SignedContentRelease) =>
    fetchProductionRenderer(settings.endpoint, settings.token).pipe(
      Effect.flatMap((renderer) =>
        validateReleaseRendererManifest(release.manifest, renderer)
      ),
      Effect.provideService(HttpClient.HttpClient, client),
      Effect.mapError(
        () =>
          new PublicationActivationError({
            phase: "preflight",
            releaseId: release.manifest.releaseId,
          })
      )
    );
  /** Invalidates exact changed artifacts plus global and family cache tags. */
  const invalidate = <E, R>(input: {
    /** Replays the exact family-aware changes authenticated by the release. */
    readonly cacheChanges: () => Stream.Stream<ContentCacheChange, E, R>;
    readonly release: SignedContentRelease;
  }) => {
    const cacheEndpoint = makeCacheEndpoint(settings.endpoint);
    if (cacheEndpoint === null) {
      return Effect.fail(
        new PublicationActivationError({
          phase: "cache",
          releaseId: input.release.manifest.releaseId,
        })
      );
    }
    /** Sends one bounded, exact invalidation request with its retry policy. */
    const invalidateRequest = (request: ContentCacheRequest) =>
      invalidateContentCache(
        client,
        cacheEndpoint,
        settings.token,
        request
      ).pipe(
        Effect.retry({
          schedule: Schedule.exponential(RETRY_DELAY),
          times: RETRY_COUNT,
          while: (error) => error.retryable,
        }),
        Effect.timeoutFail({
          duration: REQUEST_TIMEOUT,
          onTimeout: () => new ContentCacheError({ retryable: false }),
        }),
        Effect.mapError(
          () =>
            new PublicationActivationError({
              phase: "cache",
              releaseId: input.release.manifest.releaseId,
            })
        )
      );
    return makeCacheRequests(input).pipe(Stream.runForEach(invalidateRequest));
  };
  return PublicationActivation.of({ invalidate, verify });
});
