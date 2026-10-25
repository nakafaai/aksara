import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RendererPreflight } from "@nakafa/aksara-contracts/release/policy";
import { verifyRendererManifestCompatibility } from "@nakafa/aksara-contracts/renderer/compatibility";
import { RendererManifestHashMismatchError } from "@nakafa/aksara-contracts/renderer/contract";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type Redacted } from "effect";
import { HttpClient } from "effect/http";
import {
  makeAbsentReleaseDispatch,
  makeProductionReleaseDispatch,
  type ReleaseDispatch,
} from "#cli/dispatch/activation";
import { fetchProductionRenderer } from "#cli/production/renderer";

/** Applies the exact or directional renderer proof selected during preparation. */
const verifyRendererPreflight = Effect.fn("AksaraCli.verifyRendererPreflight")(
  function* (
    bundle: ContentReleaseBundle,
    live: ContentReleaseBundle["rendererManifest"],
    preflight: RendererPreflight
  ) {
    if (preflight === "exact") {
      if (live.hash !== bundle.rendererManifest.hash) {
        return yield* new RendererManifestHashMismatchError({
          actualHash: live.hash,
          expectedHash: bundle.rendererManifest.hash,
        });
      }
      return;
    }
    yield* verifyRendererManifestCompatibility({
      frozen: bundle.rendererManifest,
      live,
    });
  }
);

/** Captures HTTP for the pre-commit renderer gate and the post-commit release dispatch. */
export const makeProductionActivation = Effect.fn(
  "AksaraCli.makeProductionActivation"
)(function* (settings: {
  readonly endpoint: URL;
  readonly releaseDispatch: ReleaseDispatch;
  readonly token: Redacted.Redacted<string>;
}) {
  const client = yield* HttpClient.HttpClient;
  const invalidate =
    settings.releaseDispatch.surface === "none"
      ? makeAbsentReleaseDispatch()
      : makeProductionReleaseDispatch({
          client,
          token: settings.releaseDispatch.token,
        });
  /** Re-fetches and verifies the deployed renderer immediately before commit. */
  const verify = (bundle: ContentReleaseBundle, preflight: RendererPreflight) =>
    fetchProductionRenderer(settings.endpoint, settings.token).pipe(
      Effect.flatMap((renderer) =>
        verifyRendererPreflight(bundle, renderer, preflight)
      ),
      Effect.asVoid,
      Effect.provideService(HttpClient.HttpClient, client),
      Effect.mapError(
        () =>
          new PublicationActivationError({
            phase: "preflight",
            releaseId: bundle.release.manifest.releaseId,
          })
      )
    );
  return PublicationActivation.of({ invalidate, verify });
});
