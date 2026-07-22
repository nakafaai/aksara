import {
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseItem,
  canonicalizeContentReleaseItem,
} from "@nakafa/aksara-contracts/release";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_BYTES,
  MAX_ITEM_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import type {
  StageArtifactBatchInput,
  StageItemBatchInput,
} from "@nakafa/aksara-contracts/transport/request";
import type { Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** Serializes one complete release-item batch in deterministic wire order. */
export function canonicalizeReleaseItemBatch(batch: StageItemBatchInput) {
  return `{"batchIndex":${batch.batchIndex},"items":[${batch.items
    .map(canonicalizeContentReleaseItem)
    .join(
      ","
    )}],"operation":"stageItemBatch","releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Serializes one complete artifact batch in deterministic wire order. */
export function canonicalizeArtifactBatch(batch: StageArtifactBatchInput) {
  return `{"artifacts":[${batch.artifacts
    .map(canonicalizeSignedContentArtifact)
    .join(
      ","
    )}],"batchIndex":${batch.batchIndex},"operation":"stageArtifactBatch","releaseId":${JSON.stringify(batch.releaseId)}}`;
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
    maxBytes: MAX_ITEM_BATCH_BYTES,
    maxCount: MAX_ITEM_BATCH_COUNT,
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
    maxCount: MAX_ARTIFACT_BATCH_COUNT,
    releaseId,
    serialize: canonicalizeArtifactBatch,
    values: artifacts,
  });
}
