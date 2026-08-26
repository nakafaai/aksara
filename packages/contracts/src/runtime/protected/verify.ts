import { Effect, Array as ReadonlyArray } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import { validateLiveRendererManifestHash } from "#contracts/renderer/manifest";
import { ContentRuntimeMismatchError } from "#contracts/runtime/error";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
  type ProtectedContentRuntimeItem,
  type ProtectedContentRuntimeRequest,
  type ProtectedContentRuntimeSelector,
} from "#contracts/runtime/protected/spec";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime-bundle/spec";
import { verifySignedTryoutRuntimeBundle } from "#contracts/tryout/runtime-bundle/verify";

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
  bundle: SignedTryoutRuntimeBundle,
  bundleRenderer: RendererManifestEnvelope,
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
    rendererContractVersion: bundleRenderer.rendererContractVersion,
    rendererManifest: bundleRenderer,
  });
  if (liveRenderer.hash !== bundle.payload.rendererManifestHash) {
    yield* verifyContentRendererCompatibility({
      payload: artifact.payload,
      rendererContractVersion: bundleRenderer.rendererContractVersion,
      rendererManifest: liveRenderer,
    });
  }
});

/** Binds one protected batch to its exact permanent runtime bundle. */
const verifyProtectedBundle = Effect.fn(
  "AksaraContracts.verifyProtectedRuntimeBundle"
)(function* (
  request: ProtectedContentRuntimeRequest,
  bundle: SignedTryoutRuntimeBundle
) {
  if (bundle.bundleHash !== request.bundleHash) {
    return yield* new ContentRuntimeMismatchError({ reason: "bundleHash" });
  }
  if (bundle.payload.snapshot.snapshotId !== request.snapshotId) {
    return yield* new ContentRuntimeMismatchError({ reason: "snapshotId" });
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
  const bundle = yield* verifySignedTryoutRuntimeBundle({
    bundle: response.bundle,
    rendererManifest: response.rendererManifest,
  });
  const liveRenderer = yield* validateLiveRendererManifestHash(
    input.rendererManifest
  );
  yield* verifyProtectedBundle(request, bundle);
  yield* Effect.forEach(
    ReadonlyArray.zip(request.selectors, response.items),
    ([selector, item]) =>
      verifyProtectedItem(
        selector,
        item,
        bundle,
        response.rendererManifest,
        liveRenderer
      ),
    { concurrency: "unbounded", discard: true }
  );
  return response;
});
