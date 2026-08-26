// @vitest-environment node

import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import {
  CompiledContentPayloadSchema,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  ContentChangeSchema,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_BYTES,
  MAX_ITEM_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema, Stream } from "effect";
import {
  canonicalizeArtifactBatch,
  canonicalizeReleaseItemBatch,
  makeArtifactBatches,
  makeReleaseItemBatches,
} from "#publisher/batching";

const releaseId = ReleaseIdSchema.make("test-release-batching");
const makeItems = Effect.fn("PublicationBatchingTest.makeItems")(() =>
  Schema.decodeUnknownEffect(Schema.Array(ContentChangeSchema))(
    Array.from({ length: MAX_ITEM_BATCH_COUNT + 1 }, (_, index) => ({
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: `test:${index.toString().padStart(4, "0")}`,
      family: "material" as const,
      operation: "delete",
    }))
  ).pipe(
    Effect.map((changes) =>
      changes.map((change, index) =>
        ContentReleaseItemSchema.make({ change, index, releaseId })
      )
    )
  )
);

/** Builds one schema-valid signed artifact with configurable compiled bytes. */
function artifact(index: number, compiledBytes = 10) {
  const compiledCode = "x".repeat(compiledBytes);
  const payload = CompiledContentPayloadSchema.make({
    artifactLocale: ArtifactLocaleSchema.make("en"),
    byteLength: compiledCode.length,
    compiledCode,
    compilerConfigHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
    compilerVersion: "0.1.0",
    contentKey: ContentKeySchema.make(`test:artifact-${index}`),
    format: "mdx-function-body",
    mdxCompilerVersion: "3.1.1",
    plainText: "",
    rawMdx: "",
    rendererDomain: "mathematics",
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
const collect = Effect.fn("PublicationBatchingTest.collect")(
  <A, E>(stream: Stream.Stream<A, E>) =>
    stream.pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
);

describe("publication batching", () => {
  it.effect("emits no batch for an empty release stream", () =>
    Effect.gen(function* () {
      expect(
        yield* collect(makeReleaseItemBatches(releaseId, Stream.empty))
      ).toEqual([]);
    })
  );

  it.effect("streams item batches at the exact Convex count ceiling", () =>
    Effect.gen(function* () {
      const items = yield* makeItems();
      const batches = yield* collect(
        makeReleaseItemBatches(releaseId, Stream.fromIterable(items))
      );
      expect(batches.map(({ batchIndex }) => batchIndex)).toEqual([0, 1]);
      expect(batches[0]?.items).toHaveLength(MAX_ITEM_BATCH_COUNT);
      expect(batches[1]?.items).toHaveLength(1);
      expect(
        batches.every(
          (batch) =>
            Buffer.byteLength(canonicalizeReleaseItemBatch(batch), "utf8") <=
            MAX_ITEM_BATCH_BYTES
        )
      ).toBe(true);
    })
  );

  it.effect("streams transaction-safe artifact batches within 4 MiB", () =>
    Effect.gen(function* () {
      const values = Array.from(
        { length: MAX_ARTIFACT_BATCH_COUNT + 1 },
        (_, index) => artifact(index)
      );
      const batches = yield* collect(
        makeArtifactBatches(releaseId, Stream.fromIterable(values))
      );
      expect(batches.map(({ artifacts }) => artifacts.length)).toEqual([
        MAX_ARTIFACT_BATCH_COUNT,
        1,
      ]);
      expect(MAX_ARTIFACT_BATCH_BYTES).toBe(4 * 1024 * 1024);
      expect(
        batches.every(
          (batch) =>
            Buffer.byteLength(canonicalizeArtifactBatch(batch), "utf8") <=
            MAX_ARTIFACT_BATCH_BYTES
        )
      ).toBe(true);
    })
  );

  it.effect("rejects one artifact that cannot fit with its wire envelope", () =>
    Effect.gen(function* () {
      const error = yield* makeArtifactBatches(
        releaseId,
        Stream.make(artifact(0, MAX_ARTIFACT_BATCH_BYTES))
      ).pipe(Stream.runDrain, Effect.flip);
      expect(error).toMatchObject({
        _tag: "PublicationBatchLimitError",
        actualCount: 1,
      });
      expect(error.actualBytes).toBeGreaterThan(MAX_ARTIFACT_BATCH_BYTES);
    })
  );
});
