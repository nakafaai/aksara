import { HttpClient } from "@effect/platform";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { validateReleaseRendererManifest } from "@nakafa/aksara-publisher/release-validation";
import { Effect, type Redacted } from "effect";
import { fetchProductionRenderer } from "#cli/production-renderer";

/** Captures HTTP while deferring a fresh renderer read until activation time. */
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
            releaseId: release.manifest.releaseId,
          })
      )
    );
  return PublicationActivation.of({ verify });
});
