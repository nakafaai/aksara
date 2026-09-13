import type {
  ContentReleaseBundle as AdoptionContentReleaseBundle,
  RendererManifestEnvelope as AdoptionRendererManifestEnvelope,
} from "@nakafa/aksara-contracts/adoption/schema";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RendererPreflight } from "@nakafa/aksara-contracts/release/policy";
import {
  RendererManifestComponentUnsupportedError,
  RendererManifestDomainUnpublishedError,
  verifyRendererManifestCompatibility,
} from "@nakafa/aksara-contracts/renderer/compatibility";
import {
  RendererManifestHashMismatchError,
  selectRendererDomainCapability,
} from "@nakafa/aksara-contracts/renderer/contract";
import {
  PublicationActivation,
  PublicationActivationError,
} from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type Redacted } from "effect";
import { HttpClient } from "effect/unstable/http";
import { makeProductionCacheInvalidation } from "#cli/cache/activation";
import { fetchProductionRenderer } from "#cli/production/renderer";

type ActivationBundle = ContentReleaseBundle | AdoptionContentReleaseBundle;

// Delete after the renderer adoption window closes and every readable
// old-format record is retired; the terminal cleanup release removes it.
/** Proves a live current renderer still executes every retained frozen name. */
const verifyRetainedPreflight = Effect.fn("AksaraCli.verifyRetainedPreflight")(
  function* (input: {
    readonly frozen: Exclude<
      AdoptionRendererManifestEnvelope,
      { readonly format: "nakafa-mdx-renderer" }
    >;
    readonly live: ContentReleaseBundle["rendererManifest"];
  }) {
    const { frozen, live } = input;
    // Retained base names must be executable from the live base registry alone.
    const baseSupported = new Set(live.base);
    for (const { name, version } of frozen.base.supportedComponents) {
      if (version !== 1 || !baseSupported.has(name)) {
        return yield* new RendererManifestComponentUnsupportedError({
          componentName: name,
          rendererScope: "base",
        });
      }
    }
    for (const retainedDomain of frozen.domains) {
      if (!frozen.publishedDomains.includes(retainedDomain.name)) {
        continue;
      }
      // A retained published domain must still be published by the live renderer.
      if (!live.publishedDomains.includes(retainedDomain.name)) {
        return yield* new RendererManifestDomainUnpublishedError({
          rendererDomain: retainedDomain.name,
        });
      }
      const liveDomain = yield* selectRendererDomainCapability(
        live,
        retainedDomain.name
      );
      const domainSupported = new Set(liveDomain.components);
      for (const { name, version } of retainedDomain.supportedComponents) {
        if (version !== 1 || !domainSupported.has(name)) {
          return yield* new RendererManifestComponentUnsupportedError({
            componentName: name,
            rendererScope: retainedDomain.name,
          });
        }
      }
    }
  }
);

/** Applies the exact or directional renderer proof selected during preparation. */
const verifyRendererPreflight = Effect.fn("AksaraCli.verifyRendererPreflight")(
  function* (
    bundle: ActivationBundle,
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
    const frozen = bundle.rendererManifest;
    if (frozen.format === "nakafa-mdx-renderer") {
      return yield* verifyRendererManifestCompatibility({ frozen, live });
    }
    yield* verifyRetainedPreflight({ frozen, live });
  }
);

/** Captures HTTP for the pre-commit renderer and post-commit cache gates. */
export const makeProductionActivation = Effect.fn(
  "AksaraCli.makeProductionActivation"
)(function* (settings: {
  readonly endpoint: URL;
  readonly token: Redacted.Redacted<string>;
}) {
  const client = yield* HttpClient.HttpClient;
  const invalidate = makeProductionCacheInvalidation({
    client,
    endpoint: settings.endpoint,
    token: settings.token,
  });
  /** Re-fetches and verifies the deployed renderer immediately before commit. */
  const verify = (bundle: ActivationBundle, preflight: RendererPreflight) =>
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
