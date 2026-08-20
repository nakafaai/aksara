import { Effect } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { hashContentProjection } from "#contracts/projection/hash";
import type { RoutedContentProjection } from "#contracts/projection/spec";
import type { ContentReleaseBundle } from "#contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";
import { validateLiveRendererManifestHash } from "#contracts/renderer/manifest";
import { ContentRuntimeMismatchError } from "#contracts/runtime/error";
import {
  decodePublicContentRuntimeRequest,
  decodePublicContentRuntimeResponse,
  type PublicContentRuntimeFound,
  type PublicContentRuntimeRequest,
} from "#contracts/runtime/spec";

type PublicRuntimeVerificationPolicy =
  | { readonly kind: "evidence" }
  | { readonly kind: "execution"; readonly rendererManifest: unknown };

/** Checks one article path preserves its pair-grouped physical source identity. */
function hasArticleSourcePath(
  projection: Extract<RoutedContentProjection, { readonly kind: "article" }>,
  sourcePath: string
) {
  const prefix = `packages/corpus/articles/${projection.category}/`;
  const suffix = `/${projection.artifactLocale}.mdx`;
  if (!(sourcePath.startsWith(prefix) && sourcePath.endsWith(suffix))) {
    return false;
  }
  const sourceRoot = sourcePath.slice(prefix.length, -suffix.length);
  const segments = sourceRoot.split("/");
  return segments.length === 2 && segments.join("-") === projection.articleSlug;
}

/** Checks one page path matches its signed source-owned provenance. */
function hasPageSourcePath(
  projection: Extract<
    RoutedContentProjection,
    { readonly kind: "public-page" }
  >,
  sourcePath: string
) {
  return sourcePath === projection.sourcePath;
}

/** Checks one public path exactly matches its projected content family. */
function hasProjectionSourcePath(
  projection: RoutedContentProjection,
  sourcePath: string
) {
  if (projection.kind === "article") {
    return hasArticleSourcePath(projection, sourcePath);
  }
  if (projection.kind === "public-page") {
    return hasPageSourcePath(projection, sourcePath);
  }

  return (
    sourcePath ===
    `packages/corpus/${projection.contentKey}/${projection.artifactLocale}.mdx`
  );
}

/** Verifies one active public artifact belongs to its exact route request. */
const verifyPublicIdentity = Effect.fn("AksaraContracts.verifyPublicIdentity")(
  function* (
    request: PublicContentRuntimeRequest,
    response: PublicContentRuntimeFound
  ) {
    if (response.projection.appLocale !== request.appLocale) {
      return yield* new ContentRuntimeMismatchError({ reason: "locale" });
    }
    if (response.projection.publicPath !== request.publicPath) {
      return yield* new ContentRuntimeMismatchError({ reason: "publicPath" });
    }
    if (!hasProjectionSourcePath(response.projection, response.sourcePath)) {
      return yield* new ContentRuntimeMismatchError({ reason: "sourcePath" });
    }
    if (
      response.projectionHash !== hashContentProjection(response.projection)
    ) {
      return yield* new ContentRuntimeMismatchError({
        reason: "projectionHash",
      });
    }
  }
);

/** Binds public content to the exact authenticated active release. */
const verifyPublicRelease = Effect.fn("AksaraContracts.verifyPublicRelease")(
  function* (
    response: PublicContentRuntimeFound,
    bundle: ContentReleaseBundle
  ) {
    if (response.activeReleaseId !== bundle.release.manifest.releaseId) {
      return yield* new ContentRuntimeMismatchError({
        reason: "activeReleaseId",
      });
    }
    if (response.activeManifestHash !== bundle.release.manifestHash) {
      return yield* new ContentRuntimeMismatchError({
        reason: "activeManifestHash",
      });
    }
  }
);

/** Authenticates one public response and applies its explicit use policy. */
const verifyPublicRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyPublicRuntimeExchange"
)(function* (input: {
  readonly policy: PublicRuntimeVerificationPolicy;
  readonly request: unknown;
  readonly response: unknown;
}) {
  const request = yield* decodePublicContentRuntimeRequest(input.request);
  const response = yield* decodePublicContentRuntimeResponse(input.response);
  if (response.kind !== "found") {
    return response;
  }
  yield* verifyPublicIdentity(request, response);
  const bundle = yield* verifyContentReleaseBundle({
    release: response.release,
    rendererManifest: response.rendererManifest,
  });
  yield* verifyPublicRelease(response, bundle);
  const artifact = yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: bundle.rendererManifest,
  });
  if (input.policy.kind === "evidence") {
    return response;
  }
  const liveRenderer = yield* validateLiveRendererManifestHash(
    input.policy.rendererManifest
  );
  if (liveRenderer.hash !== bundle.rendererManifest.hash) {
    yield* verifyContentRendererCompatibility({
      payload: artifact.payload,
      rendererContractVersion: bundle.release.manifest.rendererContractVersion,
      rendererManifest: liveRenderer,
    });
  }
  return response;
});

/**
 * Authenticates independently signed runtime evidence for one exact request.
 *
 * This capability does not claim that a non-rendering consumer can execute the
 * artifact with a live renderer.
 */
export const verifyContentRuntimeEvidenceExchange = Effect.fn(
  "AksaraContracts.verifyContentRuntimeEvidenceExchange"
)(function* (input: { readonly request: unknown; readonly response: unknown }) {
  return yield* verifyPublicRuntimeExchange({
    ...input,
    policy: { kind: "evidence" },
  });
});

/**
 * Verifies independently signed runtime values selected for one exact request.
 *
 * Active catalog membership is trusted authenticated target state as recorded
 * in ADR 0002, not an artifact property inferred from the release digest.
 */
export const verifyContentRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyContentRuntimeExchange"
)(function* (input: {
  readonly rendererManifest: unknown;
  readonly request: unknown;
  readonly response: unknown;
}) {
  return yield* verifyPublicRuntimeExchange({
    policy: {
      kind: "execution",
      rendererManifest: input.rendererManifest,
    },
    request: input.request,
    response: input.response,
  });
});
