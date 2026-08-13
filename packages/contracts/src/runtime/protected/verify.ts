import { Effect, Array as ReadonlyArray } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import type { ContentReleaseBundle } from "#contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "#contracts/release/verify";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import { ContentRuntimeMismatchError } from "#contracts/runtime/error";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
  type ProtectedContentRuntimeFound,
  type ProtectedContentRuntimeItem,
  type ProtectedContentRuntimeRequest,
  type ProtectedContentRuntimeSelector,
} from "#contracts/runtime/protected/spec";

/** Checks one protected body path matches its exact content and artifact locale. */
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

/** Verifies one returned item belongs to its ordered snapshot selector. */
const verifyProtectedItem = Effect.fn(
  "AksaraContracts.verifyProtectedRuntimeItem"
)(function* (
  selector: ProtectedContentRuntimeSelector,
  item: ProtectedContentRuntimeItem,
  bundle: ContentReleaseBundle,
  liveRenderer: RendererManifestEnvelope
) {
  if (item.delivery !== selector.delivery) {
    return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
  }
  if (item.artifact.artifactHash !== selector.artifactHash) {
    return yield* new ContentRuntimeMismatchError({ reason: "artifactHash" });
  }
  if (item.artifact.payload.contentKey !== selector.contentKey) {
    return yield* new ContentRuntimeMismatchError({ reason: "contentKey" });
  }
  if (
    !hasProtectedSourcePath(
      selector.contentKey,
      item.artifact.payload.artifactLocale,
      item.sourcePath
    )
  ) {
    return yield* new ContentRuntimeMismatchError({ reason: "sourcePath" });
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

/** Binds one protected batch to the exact release retained by its snapshot. */
const verifyProtectedRelease = Effect.fn(
  "AksaraContracts.verifyProtectedRuntimeRelease"
)(function* (
  request: ProtectedContentRuntimeRequest,
  response: ProtectedContentRuntimeFound,
  bundle: ContentReleaseBundle
) {
  if (response.snapshotId !== request.snapshotId) {
    return yield* new ContentRuntimeMismatchError({ reason: "snapshotId" });
  }
  if (
    response.snapshotId !==
    bundle.release.manifest.snapshots.tryout.resultSnapshotId
  ) {
    return yield* new ContentRuntimeMismatchError({ reason: "snapshotId" });
  }
  if (response.snapshotReleaseId !== request.snapshotReleaseId) {
    return yield* new ContentRuntimeMismatchError({
      reason: "snapshotReleaseId",
    });
  }
  if (response.snapshotReleaseId !== bundle.release.manifest.releaseId) {
    return yield* new ContentRuntimeMismatchError({
      reason: "snapshotReleaseId",
    });
  }
  if (response.snapshotManifestHash !== bundle.release.manifestHash) {
    return yield* new ContentRuntimeMismatchError({
      reason: "snapshotManifestHash",
    });
  }
});

/** Verifies one retained-snapshot batch and every ordered signed artifact. */
export const verifyProtectedContentRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyProtectedContentRuntimeExchange"
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
    return yield* new ContentRuntimeMismatchError({
      reason: "selectorCount",
    });
  }
  const bundle = yield* verifyContentReleaseBundle({
    release: response.release,
    rendererManifest: response.rendererManifest,
  });
  const liveRenderer = yield* validateRendererManifestHash(
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
