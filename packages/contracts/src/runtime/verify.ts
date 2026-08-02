import { Effect, Schema } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { hashContentProjection } from "#contracts/projection/hash";
import type { RoutedContentProjection } from "#contracts/projection/spec";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import {
  decodeContentRuntimeRequest,
  decodeContentRuntimeResponse,
  type ProtectedContentRuntimeFound,
  type ProtectedContentRuntimeRequest,
  type PublicContentRuntimeFound,
  type PublicContentRuntimeRequest,
} from "#contracts/runtime/spec";

/** A decoded runtime response does not belong to its initiating request. */
export class ContentRuntimeMismatchError extends Schema.TaggedError<ContentRuntimeMismatchError>()(
  "ContentRuntimeMismatchError",
  {
    reason: Schema.Literal(
      "activeManifestHash",
      "activeReleaseId",
      "artifactHash",
      "contentKey",
      "delivery",
      "locale",
      "projectionHash",
      "publicPath",
      "rendererManifest",
      "snapshotId",
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

/** Checks one protected body path matches its exact content key and locale. */
function hasProtectedSourcePath(
  contentKey: string,
  locale: string,
  sourcePath: string
) {
  const separator = contentKey.lastIndexOf("/");
  const sourceRoot = contentKey.slice(0, separator);
  const bodyKind = contentKey.slice(separator + 1);
  return (
    sourcePath === `packages/corpus/${sourceRoot}/${bodyKind}.${locale}.mdx`
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

/** Verifies one protected artifact belongs to its frozen snapshot selector. */
const verifyProtectedIdentity = Effect.fn(
  "AksaraContracts.verifyProtectedIdentity"
)(function* (
  request: ProtectedContentRuntimeRequest,
  response: ProtectedContentRuntimeFound
) {
  if (response.artifact.payload.locale !== request.locale) {
    return yield* new ContentRuntimeMismatchError({ reason: "locale" });
  }
  if (response.artifact.artifactHash !== request.artifactHash) {
    return yield* new ContentRuntimeMismatchError({ reason: "artifactHash" });
  }
  if (response.artifact.payload.contentKey !== request.contentKey) {
    return yield* new ContentRuntimeMismatchError({ reason: "contentKey" });
  }
  if (response.snapshotId !== request.snapshotId) {
    return yield* new ContentRuntimeMismatchError({ reason: "snapshotId" });
  }
  if (
    !hasProtectedSourcePath(
      request.contentKey,
      request.locale,
      response.sourcePath
    )
  ) {
    return yield* new ContentRuntimeMismatchError({ reason: "sourcePath" });
  }
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
  const request = yield* decodeContentRuntimeRequest(input.request);
  const response = yield* decodeContentRuntimeResponse(input.response);
  if (response.kind !== "found") {
    return response;
  }
  if (response.delivery === "public") {
    if (request.delivery !== "public") {
      return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
    }
    yield* verifyPublicIdentity(request, response);
  } else {
    if (request.delivery === "public") {
      return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
    }
    if (response.delivery !== request.delivery) {
      return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
    }
    yield* verifyProtectedIdentity(request, response);
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
  yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: liveRenderer,
  });
  return response;
});
