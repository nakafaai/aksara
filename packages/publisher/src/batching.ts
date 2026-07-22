import {
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseItem,
  canonicalizeContentReleaseItem,
} from "@nakafa/aksara-contracts/release";
import type { Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** Maximum ordered release items held for one partition decision. */
export const MAX_RELEASE_ITEMS_PER_BATCH = 100;

/** Maximum complete release-item envelope bytes sent per target call. */
export const MAX_RELEASE_ITEM_BATCH_BYTES = 512 * 1024;

/** Maximum signed artifacts held and sent in one target call. */
export const MAX_ARTIFACTS_PER_BATCH = 8;

/** Maximum complete signed artifact envelope bytes sent per target call. */
export const MAX_ARTIFACT_BATCH_BYTES = 4 * 1024 * 1024;

/** Ordered item batch accepted by the publication infrastructure seam. */
export interface ReleaseItemBatch {
  readonly batchIndex: number;
  readonly items: readonly ContentReleaseItem[];
  readonly releaseId: ReleaseId;
}

/** Content-addressed artifact batch accepted by the infrastructure seam. */
export interface ArtifactBatch {
  readonly artifacts: readonly SignedContentArtifact[];
  readonly batchIndex: number;
  readonly releaseId: ReleaseId;
}

/** Serializes one complete release-item batch in deterministic wire order. */
export function canonicalizeReleaseItemBatch(batch: ReleaseItemBatch) {
  return `{"batchIndex":${batch.batchIndex},"items":[${batch.items
    .map(canonicalizeContentReleaseItem)
    .join(",")}],"releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Serializes one complete artifact batch in deterministic wire order. */
export function canonicalizeArtifactBatch(batch: ArtifactBatch) {
  return `{"artifacts":[${batch.artifacts
    .map(canonicalizeSignedContentArtifact)
    .join(
      ","
    )}],"batchIndex":${batch.batchIndex},"releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Streams bounded release-item envelopes with contiguous batch identities. */
export function makeReleaseItemBatches<E, R>(
  releaseId: ReleaseId,
  items: Stream.Stream<ContentReleaseItem, E, R>
) {
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      batchIndex,
      items: values,
      releaseId: batchReleaseId,
    }),
    count: (batch) => batch.items.length,
    kind: "release-item",
    maxBytes: MAX_RELEASE_ITEM_BATCH_BYTES,
    maxCount: MAX_RELEASE_ITEMS_PER_BATCH,
    releaseId,
    serialize: canonicalizeReleaseItemBatch,
    values: items,
  });
}

/** Streams bounded artifact envelopes with contiguous batch identities. */
export function makeArtifactBatches<E, R>(
  releaseId: ReleaseId,
  artifacts: Stream.Stream<SignedContentArtifact, E, R>
) {
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      artifacts: values,
      batchIndex,
      releaseId: batchReleaseId,
    }),
    count: (batch) => batch.artifacts.length,
    kind: "artifact",
    maxBytes: MAX_ARTIFACT_BATCH_BYTES,
    maxCount: MAX_ARTIFACTS_PER_BATCH,
    releaseId,
    serialize: canonicalizeArtifactBatch,
    values: artifacts,
  });
}
