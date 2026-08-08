import { Effect } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { hashContentProjection } from "#contracts/projection/hash";
import type { RoutedContentProjection } from "#contracts/projection/spec";
import type { ContentReleaseBundle } from "#contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import { ContentRuntimeMismatchError } from "#contracts/runtime/error";
import {
  decodePublicContentRuntimeRequest,
  decodePublicContentRuntimeResponse,
  type PublicContentRuntimeFound,
  type PublicContentRuntimeRequest,
} from "#contracts/runtime/spec";

/** Checks one article path preserves its pair-grouped physical source identity. */
function hasArticleSourcePath(
  projection: Extract<RoutedContentProjection, { readonly kind: "article" }>,
  sourcePath: string
) {
  const prefix = `packages/corpus/articles/${projection.category}/`;
  const suffix = `/${projection.locale}.mdx`;
  if (!(sourcePath.startsWith(prefix) && sourcePath.endsWith(suffix))) {
    return false;
  }
  const sourceRoot = sourcePath.slice(prefix.length, -suffix.length);
  const segments = sourceRoot.split("/");
  return segments.length === 2 && segments.join("-") === projection.articleSlug;
}

/** Checks one public path exactly matches its projected content family. */
function hasProjectionSourcePath(
  projection: RoutedContentProjection,
  sourcePath: string
) {
  if (projection.kind === "article") {
    return hasArticleSourcePath(projection, sourcePath);
  }

  return (
    sourcePath ===
    `packages/corpus/${projection.contentKey}/${projection.locale}.mdx`
  );
}

/** Verifies one active public artifact belongs to its exact route request. */
const verifyPublicIdentity = Effect.fn("AksaraContracts.verifyPublicIdentity")(
  function* (
    request: PublicContentRuntimeRequest,
    response: PublicContentRuntimeFound
  ) {
    if (response.projection.locale !== request.locale) {
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

/** Binds public content to the exact active release and deployed renderer. */
const verifyPublicRelease = Effect.fn("AksaraContracts.verifyPublicRelease")(
  function* (
    response: PublicContentRuntimeFound,
    bundle: ContentReleaseBundle,
    liveRenderer: RendererManifestEnvelope
  ) {
    if (liveRenderer.hash !== bundle.rendererManifest.hash) {
      return yield* new ContentRuntimeMismatchError({
        reason: "rendererManifest",
      });
    }
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
  const liveRenderer = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  yield* verifyPublicRelease(response, bundle, liveRenderer);
  yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: bundle.rendererManifest,
  });
  return response;
});
