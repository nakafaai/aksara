import { Effect, Array as ReadonlyArray, Schema } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import type { ContentReleaseBundle } from "#contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import { validateLiveRendererManifestHash } from "#contracts/renderer/manifest";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
  type ProtectedContentRuntimeFound,
  type ProtectedContentRuntimeItem,
  type ProtectedContentRuntimeRequest,
  type ProtectedContentRuntimeSelector,
} from "#contracts/runtime/predecessor/spec";

/** A predecessor response does not belong to its initiating request. */
class PredecessorRuntimeMismatchError extends Schema.TaggedError<PredecessorRuntimeMismatchError>()(
  "PredecessorRuntimeMismatchError",
  {
    reason: Schema.Literals([
      "artifactHash",
      "contentKey",
      "delivery",
      "selectorCount",
      "snapshotId",
      "snapshotManifestHash",
      "snapshotReleaseId",
      "sourcePath",
    ]),
  }
) {}

/** Checks one protected path matches its exact content and artifact locale. */
function hasProtectedSourcePath(
  contentKey: string,
  artifactLocale: string,
  sourcePath: string
) {
  const separator = contentKey.lastIndexOf("/");
  const sourceRoot = contentKey.slice(0, separator);
  const bodyKind = contentKey.slice(separator + 1);
  return (
    sourcePath ===
    `packages/corpus/${sourceRoot}/${bodyKind}.${artifactLocale}.mdx`
  );
}

/** Verifies one returned item belongs to its ordered selector. */
const verifyProtectedItem = Effect.fn(
  "AksaraContracts.verifyPredecessorProtectedRuntimeItem"
)(function* (
  selector: ProtectedContentRuntimeSelector,
  item: ProtectedContentRuntimeItem,
  bundle: ContentReleaseBundle,
  liveRenderer: RendererManifestEnvelope
) {
  if (item.delivery !== selector.delivery) {
    return yield* new PredecessorRuntimeMismatchError({ reason: "delivery" });
  }
  if (item.artifact.artifactHash !== selector.artifactHash) {
    return yield* new PredecessorRuntimeMismatchError({
      reason: "artifactHash",
    });
  }
  if (item.artifact.payload.contentKey !== selector.contentKey) {
    return yield* new PredecessorRuntimeMismatchError({ reason: "contentKey" });
  }
  if (
    !hasProtectedSourcePath(
      selector.contentKey,
      item.artifact.payload.artifactLocale,
      item.sourcePath
    )
  ) {
    return yield* new PredecessorRuntimeMismatchError({ reason: "sourcePath" });
  }
  const artifact = yield* verifySignedContentArtifact({
    artifact: item.artifact,
    rendererContractVersion: bundle.release.manifest.rendererContractVersion,
    rendererManifest: bundle.rendererManifest,
  });
  if (liveRenderer.hash !== bundle.rendererManifest.hash) {
    yield* verifyContentRendererCompatibility({
      payload: artifact.payload,
      rendererContractVersion: bundle.release.manifest.rendererContractVersion,
      rendererManifest: liveRenderer,
    });
  }
});

/** Binds one predecessor batch to its exact retained release. */
const verifyProtectedRelease = Effect.fn(
  "AksaraContracts.verifyPredecessorProtectedRuntimeRelease"
)(function* (
  request: ProtectedContentRuntimeRequest,
  response: ProtectedContentRuntimeFound,
  bundle: ContentReleaseBundle
) {
  if (response.snapshotId !== request.snapshotId) {
    return yield* new PredecessorRuntimeMismatchError({ reason: "snapshotId" });
  }
  if (
    response.snapshotId !==
    bundle.release.manifest.snapshots.tryout.resultSnapshotId
  ) {
    return yield* new PredecessorRuntimeMismatchError({ reason: "snapshotId" });
  }
  if (response.snapshotReleaseId !== request.snapshotReleaseId) {
    return yield* new PredecessorRuntimeMismatchError({
      reason: "snapshotReleaseId",
    });
  }
  if (response.snapshotReleaseId !== bundle.release.manifest.releaseId) {
    return yield* new PredecessorRuntimeMismatchError({
      reason: "snapshotReleaseId",
    });
  }
  if (response.snapshotManifestHash !== bundle.release.manifestHash) {
    return yield* new PredecessorRuntimeMismatchError({
      reason: "snapshotManifestHash",
    });
  }
});

/** Verifies one predecessor batch and every ordered signed artifact. */
export const verifyProtectedContentRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyPredecessorProtectedContentRuntimeExchange"
)(function* (input: {
  readonly rendererManifest: unknown;
  readonly request: unknown;
  readonly response: unknown;
}) {
  const request = yield* decodeProtectedContentRuntimeRequest(input.request);
  const response = yield* decodeProtectedContentRuntimeResponse(input.response);
  if (response.kind !== "found") {
    return response;
  }
  if (response.items.length !== request.selectors.length) {
    return yield* new PredecessorRuntimeMismatchError({
      reason: "selectorCount",
    });
  }
  const bundle = yield* verifyContentReleaseBundle({
    release: response.release,
    rendererManifest: response.rendererManifest,
  });
  const liveRenderer = yield* validateLiveRendererManifestHash(
    input.rendererManifest
  );
  yield* verifyProtectedRelease(request, response, bundle);
  yield* Effect.forEach(
    ReadonlyArray.zip(request.selectors, response.items),
    ([selector, item]) =>
      verifyProtectedItem(selector, item, bundle, liveRenderer),
    { concurrency: "unbounded", discard: true }
  );
  return response;
});
