import { HttpClient } from "@effect/platform";
import {
  MATERIAL_CACHE_TAGS,
  type MaterialCacheRequest,
} from "@nakafa/aksara-contracts/cache/material";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { validateReleaseRendererManifest } from "@nakafa/aksara-publisher/release-validation";
import { Effect, type Redacted, Schedule } from "effect";
import {
  invalidateMaterialCache,
  MaterialCacheError,
} from "#cli/cache/exchange";
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
    const request = {
      releaseId: release.manifest.releaseId,
      tags: MATERIAL_CACHE_TAGS,
    } satisfies MaterialCacheRequest;
    return invalidateMaterialCache(
      client,
      cacheEndpoint,
      input.token,
      request
    ).pipe(
      Effect.retry({
        schedule: Schedule.exponential(RETRY_DELAY),
        times: RETRY_COUNT,
        while: (error) => error.retryable,
      }),
      Effect.timeoutFail({
        duration: REQUEST_TIMEOUT,
        onTimeout: () => new MaterialCacheError({ retryable: false }),
      }),
      Effect.mapError(
        () =>
          new PublicationActivationError({
            phase: "cache",
            releaseId: release.manifest.releaseId,
          })
      )
    );
  };
  return PublicationActivation.of({ invalidate, verify });
});
