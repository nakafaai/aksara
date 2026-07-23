import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { validateReleaseRendererManifest } from "@nakafa/aksara-publisher/release-validation";
import { Effect, type Redacted, Schedule, Schema } from "effect";
import {
  fetchProductionRenderer,
  isRendererEndpoint,
} from "#cli/production-renderer";

const CACHE_PATH = "/api/internal/content/cache";
const RETRY_COUNT = 3;
const RETRY_DELAY = "100 millis";
const REQUEST_TIMEOUT = "30 seconds";

/** One sanitized post-commit cache request failure. */
class ContentCacheError extends Schema.TaggedError<ContentCacheError>()(
  "ContentCacheError",
  { retryable: Schema.Boolean }
) {}

/** Requires an exact no-store directive without relying on header casing. */
function hasNoStoreDirective(value: string | undefined) {
  return (
    value
      ?.split(",")
      .some((directive) => directive.trim().toLowerCase() === "no-store") ??
    false
  );
}

/** Derives the only cache endpoint from the exact renderer endpoint contract. */
function makeCacheEndpoint(rendererEndpoint: URL) {
  if (!isRendererEndpoint(rendererEndpoint)) {
    return null;
  }
  return new URL(CACHE_PATH, rendererEndpoint);
}

/** Sends one idempotent authenticated cache invalidation to Nakafa. */
const invalidateContentCache = Effect.fn("AksaraCli.invalidateContentCache")(
  function* (
    client: HttpClient.HttpClient,
    endpoint: URL,
    token: Redacted.Redacted<string>
  ) {
    const request = HttpClientRequest.post(endpoint).pipe(
      HttpClientRequest.acceptJson,
      HttpClientRequest.bearerToken(token),
      HttpClientRequest.setHeader("cache-control", "no-store")
    );
    const response = yield* client
      .pipe(HttpClient.withScope)
      .execute(request)
      .pipe(
        Effect.provideService(FetchHttpClient.RequestInit, {
          redirect: "manual",
        }),
        Effect.mapError(() => new ContentCacheError({ retryable: true }))
      );
    if (
      response.request.url !== endpoint.toString() ||
      (response.status >= 300 && response.status < 400)
    ) {
      return yield* new ContentCacheError({ retryable: false });
    }
    if (response.status !== 200) {
      return yield* new ContentCacheError({
        retryable:
          response.status === 404 ||
          response.status === 408 ||
          response.status === 429 ||
          response.status >= 500,
      });
    }
    if (!hasNoStoreDirective(response.headers["cache-control"])) {
      return yield* new ContentCacheError({ retryable: false });
    }
  }
);

/** Captures HTTP for the pre-commit renderer and post-commit cache gates. */
export const makeProductionActivation = Effect.fn(
  "AksaraCli.makeProductionActivation"
)(function* (input: {
  readonly endpoint: URL;
  readonly token: Redacted.Redacted<string>;
}) {
  const client = yield* HttpClient.HttpClient;
  /** Re-fetches and verifies the deployed renderer immediately before commit. */
  const verify = (release: SignedContentRelease) =>
    fetchProductionRenderer(input.endpoint, input.token).pipe(
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
  /** Invalidates the active content cache and remains safe to retry. */
  const invalidate = (release: SignedContentRelease) => {
    const cacheEndpoint = makeCacheEndpoint(input.endpoint);
    if (cacheEndpoint === null) {
      return Effect.fail(
        new PublicationActivationError({
          phase: "cache",
          releaseId: release.manifest.releaseId,
        })
      );
    }
    return invalidateContentCache(client, cacheEndpoint, input.token).pipe(
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
            releaseId: release.manifest.releaseId,
          })
      ),
      Effect.scoped
    );
  };
  return PublicationActivation.of({ invalidate, verify });
});
