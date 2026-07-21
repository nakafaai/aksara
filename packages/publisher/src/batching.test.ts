// @vitest-environment node

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
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_RELEASE_ITEMS_PER_BATCH,
  makeReleaseItemBatch,
  partitionArtifactBatches,
  partitionReleaseItemBatches,
} from "#publisher/batching.js";

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

describe("publication batching", () => {
  it("returns no batches when a release has no changed heads", async () => {
    const batches = await Effect.runPromise(partitionReleaseItemBatches([]));

    expect(batches).toEqual([]);
  });

  it("partitions ordered release items below the hard count ceiling", async () => {
    const batches = await Effect.runPromise(partitionReleaseItemBatches(items));

    expect(batches).toHaveLength(2);
    expect(batches[0]).toHaveLength(MAX_RELEASE_ITEMS_PER_BATCH);
    expect(batches[1]).toHaveLength(1);
  });

  it("rejects a target batch that violates the hard count ceiling", async () => {
    const error = await Effect.runPromise(
      makeReleaseItemBatch({ batchIndex: 0, items, releaseId }).pipe(
        Effect.flip
      )
    );

    expect(error._tag).toBe("PublicationBatchLimitError");
    expect(error.actualCount).toBe(MAX_RELEASE_ITEMS_PER_BATCH + 1);
    expect(error.maxCount).toBe(MAX_RELEASE_ITEMS_PER_BATCH);
  });

  it("rejects one artifact that cannot fit inside the transport ceiling", async () => {
    const compiledCode = "x".repeat(MAX_ARTIFACT_BATCH_BYTES);
    const payload = CompiledContentPayloadSchema.make({
      byteLength: compiledCode.length,
      compiledCode,
      compilerConfigHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
      compilerVersion: "0.1.0",
      contentKey: ContentKeySchema.make("test:oversized-artifact"),
      format: "mdx-function-body-v1",
      locale: "en",
      mdxCompilerVersion: "3.1.1",
      plainText: "",
      rawMdx: "",
      requiredComponents: [],
      sourceHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    });
    const artifact = SignedContentArtifactSchema.make({
      artifactHash: Sha256HashSchema.make(`sha256:${"c".repeat(64)}`),
      keyId: SigningKeyIdSchema.make("test-key"),
      payload,
      signature: Ed25519SignatureSchema.make("A".repeat(86)),
    });
    const error = await Effect.runPromise(
      partitionArtifactBatches([artifact]).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PublicationBatchLimitError");
    expect(error.actualCount).toBe(1);
    expect(error.actualBytes).toBeGreaterThan(MAX_ARTIFACT_BATCH_BYTES);
  });
});
