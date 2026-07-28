import { Effect, Schema } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { hashContentProjection } from "#contracts/projection/hash";
import type { RoutedContentProjection } from "#contracts/projection/spec";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import {
  decodeContentRuntimeRequest,
  decodeContentRuntimeResponse,
} from "#contracts/runtime/spec";

/** A decoded runtime response does not belong to its initiating request. */
export class ContentRuntimeMismatchError extends Schema.TaggedError<ContentRuntimeMismatchError>()(
  "ContentRuntimeMismatchError",
  {
    reason: Schema.Literal(
      "activeManifestHash",
      "activeReleaseId",
      "delivery",
      "locale",
      "projectionHash",
      "publicPath",
      "rendererManifest",
      "sourcePath"
    ),
  }
) {}

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

/** Checks one target-owned path exactly matches its projected content family. */
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
  const request = yield* decodeContentRuntimeRequest(input.request);
  const response = yield* decodeContentRuntimeResponse(input.response);
  if (response.kind !== "found") {
    return response;
  }
  if (response.delivery !== request.delivery) {
    return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
  }
  if (response.projection.locale !== request.locale) {
    return yield* new ContentRuntimeMismatchError({ reason: "locale" });
  }
  if (response.projection.publicPath !== request.publicPath) {
    return yield* new ContentRuntimeMismatchError({ reason: "publicPath" });
  }
  if (!hasProjectionSourcePath(response.projection, response.sourcePath)) {
    return yield* new ContentRuntimeMismatchError({ reason: "sourcePath" });
  }
  const bundle = yield* verifyContentReleaseBundle({
    release: response.release,
    rendererManifest: response.rendererManifest,
  });
  const liveRenderer = yield* validateRendererManifestHash(
    input.rendererManifest
  );
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
  if (response.projectionHash !== hashContentProjection(response.projection)) {
    return yield* new ContentRuntimeMismatchError({ reason: "projectionHash" });
  }
  yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: liveRenderer,
  });
  return response;
});
