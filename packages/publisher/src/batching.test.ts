// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  CompiledContentPayloadSchema,
  SignedContentArtifactSchema,
} from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  ContentChangeSchema,
  ContentReleaseItemSchema,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeArtifactBatch,
  canonicalizeReleaseItemBatch,
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ARTIFACTS_PER_BATCH,
  MAX_RELEASE_ITEM_BATCH_BYTES,
  MAX_RELEASE_ITEMS_PER_BATCH,
  makeArtifactBatches,
  makeReleaseItemBatch,
  makeReleaseItemBatches,
} from "#publisher/batching";

const releaseId = ReleaseIdSchema.make("test-release-batching");
const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))(
  Array.from({ length: MAX_RELEASE_ITEMS_PER_BATCH + 1 }, (_, index) => ({
    contentKey: `test:${index.toString().padStart(4, "0")}`,
    locale: "en",
    operation: "delete",
  }))
);
const items = changes.map((change, index) =>
  ContentReleaseItemSchema.make({ change, index, releaseId })
);

/** Builds one schema-valid signed artifact with configurable compiled bytes. */
function artifact(index: number, compiledBytes = 10) {
  const compiledCode = "x".repeat(compiledBytes);
  const payload = CompiledContentPayloadSchema.make({
    byteLength: compiledCode.length,
    compiledCode,
    compilerConfigHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
    compilerVersion: "0.1.0",
    contentKey: ContentKeySchema.make(`test:artifact-${index}`),
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "",
    rawMdx: "",
    rendererDomain: "material-mathematics",
    requiredComponents: [],
    sourceHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  });
  return SignedContentArtifactSchema.make({
    artifactHash: Sha256HashSchema.make(`sha256:${"c".repeat(64)}`),
    keyId: SigningKeyIdSchema.make("test-key"),
    payload,
    signature: Ed25519SignatureSchema.make("A".repeat(86)),
  });
}

/** Materializes a bounded batch stream only at the Vitest boundary. */
function collect<A, E>(stream: Stream.Stream<A, E>) {
  return Effect.runPromise(
    stream.pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
  );
}

describe("publication batching", () => {
  it("emits no batch for an empty release stream", async () => {
    await expect(
      collect(makeReleaseItemBatches(releaseId, Stream.empty))
    ).resolves.toEqual([]);
  });

  it("streams item batches at the exact Convex count ceiling", async () => {
    const batches = await collect(
      makeReleaseItemBatches(releaseId, Stream.fromIterable(items))
    );
    expect(batches.map(({ batchIndex }) => batchIndex)).toEqual([0, 1]);
    expect(batches[0]?.items).toHaveLength(MAX_RELEASE_ITEMS_PER_BATCH);
    expect(batches[1]?.items).toHaveLength(1);
    expect(
      batches.every(
        (batch) =>
          Buffer.byteLength(canonicalizeReleaseItemBatch(batch), "utf8") <=
          MAX_RELEASE_ITEM_BATCH_BYTES
      )
    ).toBe(true);
  });

  it("rejects a caller-formed item batch above the target ceiling", async () => {
    const error = await Effect.runPromise(
      makeReleaseItemBatch({ batchIndex: 0, items, releaseId }).pipe(
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "PublicationBatchLimitError",
      actualCount: MAX_RELEASE_ITEMS_PER_BATCH + 1,
      maxCount: MAX_RELEASE_ITEMS_PER_BATCH,
    });
  });

  it("streams artifact batches at 8 items and a complete 4 MiB envelope", async () => {
    const values = Array.from(
      { length: MAX_ARTIFACTS_PER_BATCH + 1 },
      (_, index) => artifact(index)
    );
    const batches = await collect(
      makeArtifactBatches(releaseId, Stream.fromIterable(values))
    );
    expect(batches.map(({ artifacts }) => artifacts.length)).toEqual([8, 1]);
    expect(MAX_ARTIFACT_BATCH_BYTES).toBe(4 * 1024 * 1024);
    expect(
      batches.every(
        (batch) =>
          Buffer.byteLength(canonicalizeArtifactBatch(batch), "utf8") <=
          MAX_ARTIFACT_BATCH_BYTES
      )
    ).toBe(true);
  });

  it("rejects one artifact that cannot fit with its wire envelope", async () => {
    const error = await Effect.runPromise(
      makeArtifactBatches(
        releaseId,
        Stream.make(artifact(0, MAX_ARTIFACT_BATCH_BYTES))
      ).pipe(Stream.runDrain, Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationBatchLimitError",
      actualCount: 1,
    });
    expect(error.actualBytes).toBeGreaterThan(MAX_ARTIFACT_BATCH_BYTES);
  });
});
