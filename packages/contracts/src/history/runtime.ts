import { Effect, Array as ReadonlyArray, Schema } from "effect";

import { authenticateHistoricalArtifact } from "#contracts/history/artifact";
import {
  type StoredProtectedRuntimeFound,
  type StoredProtectedRuntimeItem,
  type StoredProtectedRuntimeRequest,
  StoredProtectedRuntimeRequestSchema,
  type StoredProtectedRuntimeResponse,
  StoredProtectedRuntimeResponseSchema,
  type StoredProtectedRuntimeSelector,
} from "#contracts/history/protected";
import { decodeStoredRelease } from "#contracts/history/read";
import {
  type HistoricalRendererManifest,
  validateHistoricalRendererManifestHash,
  verifyHistoricalRendererCompatibility,
} from "#contracts/history/renderer";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";

/** Unknown retained runtime input does not satisfy its exact read contract. */
export class StoredProtectedRuntimeDecodeError extends Schema.TaggedError<StoredProtectedRuntimeDecodeError>()(
  "StoredProtectedRuntimeDecodeError",
  { subject: Schema.Literal("request", "response") }
) {
  /** Identifies which retained runtime boundary rejected unknown bytes. */
  get message() {
    return `Stored protected runtime ${this.subject} is invalid.`;
  }
}

/** A retained response does not belong to its authenticated attempt request. */
export class StoredProtectedRuntimeMismatchError extends Schema.TaggedError<StoredProtectedRuntimeMismatchError>()(
  "StoredProtectedRuntimeMismatchError",
  {
    reason: Schema.Literal(
      "appLocale",
      "artifactHash",
      "artifactLocale",
      "attemptId",
      "contentKey",
      "delivery",
      "rendererManifest",
      "selectorCount",
      "snapshotId",
      "snapshotManifestHash",
      "snapshotReleaseId",
      "sourcePath"
    ),
  }
) {}

/** Strictly decodes one attempt-bound retained runtime request. */
function decodeRequest(input: unknown) {
  return Schema.decodeUnknown(StoredProtectedRuntimeRequestSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () => new StoredProtectedRuntimeDecodeError({ subject: "request" })
    )
  );
}

/** Strictly decodes one attempt-bound retained runtime response. */
function decodeResponse(input: unknown) {
  return Schema.decodeUnknown(StoredProtectedRuntimeResponseSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () => new StoredProtectedRuntimeDecodeError({ subject: "response" })
    )
  );
}

/** Checks one old body path matches its exact retained locale and identity. */
function hasHistoricalSourcePath(
  contentKey: string,
  artifactLocale: string,
  sourcePath: string
) {
  const separator = contentKey.lastIndexOf("/");
  const root = contentKey.slice(0, separator);
  const body = contentKey.slice(separator + 1);
  return sourcePath === `packages/corpus/${root}/${body}.${artifactLocale}.mdx`;
}

/** Verifies one historical item against its ordered attempt-owned selector. */
const verifyHistoricalItem = Effect.fn(
  "AksaraContracts.verifyStoredProtectedRuntimeItem"
)(function* (input: {
  readonly frozenRenderer: HistoricalRendererManifest;
  readonly item: StoredProtectedRuntimeItem;
  readonly liveRenderer: RendererManifestEnvelope;
  readonly selector: StoredProtectedRuntimeSelector;
}) {
  const { item, selector } = input;
  if (item.delivery !== selector.delivery) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "delivery",
    });
  }
  if (item.artifact.payload.locale !== selector.artifactLocale) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "artifactLocale",
    });
  }
  if (item.artifact.artifactHash !== selector.artifactHash) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "artifactHash",
    });
  }
  if (item.artifact.payload.contentKey !== selector.contentKey) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "contentKey",
    });
  }
  if (
    !hasHistoricalSourcePath(
      selector.contentKey,
      selector.artifactLocale,
      item.sourcePath
    )
  ) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "sourcePath",
    });
  }
  const artifact = yield* authenticateHistoricalArtifact(item.artifact);
  yield* verifyHistoricalRendererCompatibility({
    manifest: input.frozenRenderer,
    payload: artifact.payload,
  });
  if (input.liveRenderer.hash !== input.frozenRenderer.hash) {
    yield* verifyHistoricalRendererCompatibility({
      manifest: input.liveRenderer,
      payload: artifact.payload,
    });
  }
});

/** Binds retained snapshot facts to their exact authenticated old release. */
function verifyHistoricalRelease(
  request: StoredProtectedRuntimeRequest,
  response: StoredProtectedRuntimeFound,
  release: StoredProtectedRuntimeFound["release"],
  renderer: HistoricalRendererManifest
) {
  return Effect.gen(function* () {
    if (renderer.hash !== release.manifest.rendererManifestHash) {
      return yield* new StoredProtectedRuntimeMismatchError({
        reason: "rendererManifest",
      });
    }
    if (
      response.snapshotId !== request.snapshotId ||
      response.snapshotId !== release.manifest.snapshots.tryout.resultSnapshotId
    ) {
      return yield* new StoredProtectedRuntimeMismatchError({
        reason: "snapshotId",
      });
    }
    if (
      response.snapshotReleaseId !== request.snapshotReleaseId ||
      response.snapshotReleaseId !== release.manifest.releaseId
    ) {
      return yield* new StoredProtectedRuntimeMismatchError({
        reason: "snapshotReleaseId",
      });
    }
    if (response.snapshotManifestHash !== release.manifestHash) {
      return yield* new StoredProtectedRuntimeMismatchError({
        reason: "snapshotManifestHash",
      });
    }
  });
}

/** Authenticates one attempt-bound retained runtime exchange end to end. */
export const verifyStoredProtectedContentRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyStoredProtectedContentRuntimeExchange"
)(function* (input: {
  readonly rendererManifest: unknown;
  readonly request: unknown;
  readonly response: unknown;
}) {
  const request = yield* decodeRequest(input.request);
  const response: StoredProtectedRuntimeResponse = yield* decodeResponse(
    input.response
  );
  if (response.attemptId !== request.attemptId) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "attemptId",
    });
  }
  if (response.appLocale !== request.appLocale) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "appLocale",
    });
  }
  if (response.kind !== "found") {
    return response;
  }
  if (response.items.length !== request.selectors.length) {
    return yield* new StoredProtectedRuntimeMismatchError({
      reason: "selectorCount",
    });
  }
  const release = yield* decodeStoredRelease(response.release);
  const [frozenRenderer, liveRenderer] = yield* Effect.all([
    validateHistoricalRendererManifestHash(response.rendererManifest),
    validateRendererManifestHash(input.rendererManifest),
  ]);
  yield* verifyHistoricalRelease(request, response, release, frozenRenderer);
  yield* Effect.forEach(
    ReadonlyArray.zip(request.selectors, response.items),
    ([selector, item]) =>
      verifyHistoricalItem({
        frozenRenderer,
        item,
        liveRenderer,
        selector,
      }),
    { concurrency: 8, discard: true }
  );
  return response;
});
