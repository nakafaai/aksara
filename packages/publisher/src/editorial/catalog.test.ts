import {
  EDITORIAL_REVIEW_FORMAT,
  EditorialReviewRecordSchema,
  HUMANIZER_WORKFLOW_VERSION,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  assembleEditorialReviewManifest,
  decodeEditorialJson,
  EditorialReviewCatalogError,
  EditorialReviewCatalogSchema,
  EditorialReviewPartError,
  hashEditorialReviewPart,
} from "#publisher/editorial/catalog";
import { encodeEditorialReviewCatalog } from "#publisher/editorial/encode";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const catalogPath = CorpusSourcePathSchema.make(
  "packages/corpus/editorial/review/catalog.json"
);

/** Builds one unique schema-valid record for catalog assembly. */
function record(index: number) {
  const sequence = String(index).padStart(4, "0");
  const targetPath = `packages/corpus/material/editorial/${sequence}/en.mdx`;
  return Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
    appLocale: "en",
    deliveryLanguage: "en",
    reviewMode: "authored-humanizer-review",
    sources: [{ sourceHash: hash, sourcePath: targetPath }],
    targetHash: hash,
    targetPath,
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  });
}

/** Encodes exact test JSON bytes without depending on the writer Adapter. */
function bytes(value: unknown) {
  return new TextEncoder().encode(JSON.stringify(value));
}

describe("editorial review catalog", () => {
  it("rejects noncanonical part paths and order", () => {
    const invalidPath = Schema.decodeUnknownEither(
      EditorialReviewCatalogSchema
    )({
      digest: hash,
      format: EDITORIAL_REVIEW_FORMAT,
      parts: [
        {
          recordCount: 1,
          sourceHash: hash,
          sourcePath: "packages/corpus/editorial/review/records.json",
        },
      ],
    });
    const duplicatePath = "packages/corpus/editorial/review/part-0001.json";
    const invalidOrder = Schema.decodeUnknownEither(
      EditorialReviewCatalogSchema
    )({
      digest: hash,
      format: EDITORIAL_REVIEW_FORMAT,
      parts: [1, 2].map(() => ({
        recordCount: 1,
        sourceHash: hash,
        sourcePath: duplicatePath,
      })),
    });

    expect(invalidPath._tag).toBe("Left");
    expect(invalidOrder._tag).toBe("Left");
    if (invalidPath._tag === "Left" && invalidOrder._tag === "Left") {
      expect(String(invalidPath.left)).toContain(
        "Expected a canonical editorial review part path."
      );
      expect(String(invalidOrder.left)).toContain(
        "Editorial review parts must be unique and canonical."
      );
    }
  });

  it("wraps invalid UTF-8 and schema-invalid JSON", async () => {
    const invalidUtf8 = await Effect.runPromise(
      decodeEditorialJson(
        EditorialReviewCatalogSchema,
        Uint8Array.of(0xff),
        catalogPath
      ).pipe(Effect.flip)
    );
    const invalidSchema = await Effect.runPromise(
      decodeEditorialJson(
        EditorialReviewCatalogSchema,
        bytes({}),
        catalogPath
      ).pipe(Effect.flip)
    );

    expect(invalidUtf8).toBeInstanceOf(EditorialReviewCatalogError);
    expect(invalidSchema).toBeInstanceOf(EditorialReviewCatalogError);
  });

  it("authenticates complete parts and rejects missing or stale bytes", async () => {
    const encoded = await Effect.runPromise(
      encodeEditorialReviewCatalog([record(1)])
    );
    const staleEncoded = await Effect.runPromise(
      encodeEditorialReviewCatalog([record(2)])
    );
    const [part] = encoded.parts;
    const [stalePart] = staleEncoded.parts;
    if (part === undefined || stalePart === undefined) {
      throw new Error("Expected encoded editorial review parts.");
    }
    const complete = new Map([[part.sourcePath, part.bytes]]);
    const missing = await Effect.runPromise(
      assembleEditorialReviewManifest(encoded.catalog, new Map()).pipe(
        Effect.flip
      )
    );
    const stale = await Effect.runPromise(
      assembleEditorialReviewManifest(
        encoded.catalog,
        new Map([[part.sourcePath, stalePart.bytes]])
      ).pipe(Effect.flip)
    );

    await expect(
      Effect.runPromise(
        assembleEditorialReviewManifest(encoded.catalog, complete)
      )
    ).resolves.toMatchObject({
      records: [{ targetPath: record(1).targetPath }],
    });
    expect(missing).toBeInstanceOf(EditorialReviewCatalogError);
    expect(stale).toBeInstanceOf(EditorialReviewPartError);
  });

  it("rejects records that are canonical only inside each individual part", async () => {
    const firstPath = CorpusSourcePathSchema.make(
      "packages/corpus/editorial/review/part-0001.json"
    );
    const secondPath = CorpusSourcePathSchema.make(
      "packages/corpus/editorial/review/part-0002.json"
    );
    const firstBytes = bytes([record(2)]);
    const secondBytes = bytes([record(1)]);
    const catalog = Schema.decodeUnknownSync(EditorialReviewCatalogSchema)({
      digest: hash,
      format: EDITORIAL_REVIEW_FORMAT,
      parts: [
        {
          recordCount: 1,
          sourceHash: hashEditorialReviewPart(firstBytes),
          sourcePath: firstPath,
        },
        {
          recordCount: 1,
          sourceHash: hashEditorialReviewPart(secondBytes),
          sourcePath: secondPath,
        },
      ],
    });
    const error = await Effect.runPromise(
      assembleEditorialReviewManifest(
        catalog,
        new Map([
          [firstPath, firstBytes],
          [secondPath, secondBytes],
        ])
      ).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(EditorialReviewCatalogError);
  });
});
