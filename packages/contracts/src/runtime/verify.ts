import { Effect, Schema } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { hashMaterialProjection } from "#contracts/projection/hash";
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
      "rendererManifest"
    ),
  }
) {}

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
  if (response.projectionHash !== hashMaterialProjection(response.projection)) {
    return yield* new ContentRuntimeMismatchError({ reason: "projectionHash" });
  }
  yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: liveRenderer,
  });
  return response;
});
