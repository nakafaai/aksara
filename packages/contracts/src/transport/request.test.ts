import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { SignedContentArtifactSchema } from "#contracts/content";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  ContentReleaseItemSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  decodePublicationRequest,
  PublicationRequestSchema,
  StageArtifactBatchInputSchema,
  StageArtifactBatchRequestSchema,
  StageItemBatchInputSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchInputSchema,
  StageProjectionBatchRequestSchema,
} from "#contracts/transport/request";

const releaseId = "test-transport";
const hash = `sha256:${"a".repeat(64)}`;
const manifestHash = `sha256:${"b".repeat(64)}`;
const signature = `${"A".repeat(85)}A`;

const release = Schema.decodeUnknownSync(SignedContentReleaseSchema)({
  keyId: "test-transport-key",
  manifest: {
    baseReleaseId: null,
    itemCount: 2,
    itemsDigest: hash,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 1,
    projectionDigest: hash,
    releaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: hash,
  },
  manifestHash,
  signature,
});

const items = Schema.decodeUnknownSync(
  Schema.NonEmptyArray(ContentReleaseItemSchema)
)([
  {
    change: {
      artifactHash: hash,
      contentKey: "test:transport",
      delivery: "public",
      locale: "en",
      operation: "upsert",
      publicPath: "subjects/test/transport",
      rendererDomain: "mathematics",
      sourcePath: "packages/corpus/test/transport/en.mdx",
    },
    index: 0,
    releaseId,
  },
  {
    change: {
      contentKey: "test:transport",
      locale: "id",
      operation: "delete",
    },
    index: 1,
    releaseId,
  },
]);

const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
  artifactHash: hash,
  keyId: "test-transport-key",
  payload: {
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: hash,
    compilerVersion: "0.1.0",
    contentKey: "test:transport",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: hash,
  },
  signature,
});

const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:transport",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.transport",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/transport",
  sectionKey: "test-transport",
  sitemap: true,
});

const requests = [
  { operation: "stageRelease", release },
  { batchIndex: 0, items, operation: "stageItemBatch", releaseId },
  {
    batchIndex: 0,
    operation: "stageProjectionBatch",
    projections: [projection],
    releaseId,
  },
  {
    artifacts: [artifact],
    batchIndex: 0,
    operation: "stageArtifactBatch",
    releaseId,
  },
  { manifestHash, operation: "status", releaseId },
  { operation: "verify", release },
  { operation: "activate", release },
  { afterIndex: -1, operation: "finalize", release },
  {
    afterIndex: -1,
    limit: 8,
    operation: "rollbackPage",
    rollbackOf: releaseId,
  },
  { cursor: null, limit: 100, operation: "cleanup", releaseId },
];

/** Strictly tests one request schema without allowing extra properties. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("publication requests", () => {
  it("decodes every exact operation through one discriminated ingress", async () => {
    for (const request of requests) {
      expect(accepts(PublicationRequestSchema, request)).toBe(true);
    }
    const decoded = await Effect.runPromise(
      decodePublicationRequest(requests[0])
    );
    expect(decoded.operation).toBe("stageRelease");
  });

  it("rejects unknown operations and excess fields with a typed error", async () => {
    expect(
      accepts(PublicationRequestSchema, {
        operation: "unknown",
        releaseId,
      })
    ).toBe(false);
    const error = await Effect.runPromise(
      decodePublicationRequest({ ...requests[4], unexpected: true }).pipe(
        Effect.flip
      )
    );
    expect(error._tag).toBe("ContractDecodeError");
  });

  it("requires contiguous items owned by the exact release", () => {
    const mismatched = [{ ...items[0], releaseId: "test-other" }, items[1]];
    const skipped = [items[0], { ...items[1], index: 2 }];
    for (const batchItems of [mismatched, skipped]) {
      expect(
        accepts(StageItemBatchRequestSchema, {
          batchIndex: 0,
          items: batchItems,
          operation: "stageItemBatch",
          releaseId,
        })
      ).toBe(false);
      expect(
        accepts(StageItemBatchInputSchema, {
          batchIndex: 0,
          items: batchItems,
          releaseId,
        })
      ).toBe(false);
    }
    const error = Schema.decodeUnknownEither(StageItemBatchRequestSchema)({
      batchIndex: 0,
      items: skipped,
      operation: "stageItemBatch",
      releaseId,
    });
    if (Either.isLeft(error)) {
      expect(String(error.left)).toContain(
        "Expected contiguous release items bound to the batch release identity."
      );
    }
    const inputError = Schema.decodeUnknownEither(StageItemBatchInputSchema)({
      batchIndex: 0,
      items: skipped,
      releaseId,
    });
    if (Either.isLeft(inputError)) {
      expect(String(inputError.left)).toContain(
        "Expected contiguous release items bound to the batch release identity."
      );
    }
  });

  it("shares exact operation-free batch inputs with wire requests", () => {
    for (const { input, schema } of [
      {
        input: { batchIndex: 0, items, releaseId },
        schema: StageItemBatchInputSchema,
      },
      {
        input: { batchIndex: 0, projections: [projection], releaseId },
        schema: StageProjectionBatchInputSchema,
      },
      {
        input: { artifacts: [artifact], batchIndex: 0, releaseId },
        schema: StageArtifactBatchInputSchema,
      },
    ]) {
      expect(accepts(schema, input)).toBe(true);
      expect(accepts(schema, { ...input, operation: "stageItemBatch" })).toBe(
        false
      );
    }
  });

  it("requires non-empty batches and enforces canonical count ceilings", () => {
    const emptyBatches = [
      {
        input: {
          batchIndex: 0,
          items: [],
          operation: "stageItemBatch",
          releaseId,
        },
        schema: StageItemBatchRequestSchema,
      },
      {
        input: {
          batchIndex: 0,
          operation: "stageProjectionBatch",
          projections: [],
          releaseId,
        },
        schema: StageProjectionBatchRequestSchema,
      },
      {
        input: {
          artifacts: [],
          batchIndex: 0,
          operation: "stageArtifactBatch",
          releaseId,
        },
        schema: StageArtifactBatchRequestSchema,
      },
    ];
    for (const { input, schema } of emptyBatches) {
      expect(accepts(schema, input)).toBe(false);
    }

    expect(
      accepts(StageArtifactBatchRequestSchema, {
        artifacts: Array.from({ length: 9 }, () => artifact),
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      })
    ).toBe(false);
    expect(
      accepts(StageProjectionBatchRequestSchema, {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: Array.from({ length: 101 }, () => projection),
        releaseId,
      })
    ).toBe(false);
    expect(
      accepts(StageItemBatchRequestSchema, {
        batchIndex: 0,
        items: Array.from({ length: 101 }, (_, index) => ({
          ...items[0],
          index,
        })),
        operation: "stageItemBatch",
        releaseId,
      })
    ).toBe(false);
  });
});
