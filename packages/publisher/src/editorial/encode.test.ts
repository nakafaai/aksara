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

import { assembleEditorialReviewManifest } from "#publisher/editorial/catalog";
import {
  EditorialReviewEncodingError,
  encodeEditorialReviewCatalog,
  encodeEditorialReviewCatalogRoot,
} from "#publisher/editorial/encode";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds one unique schema-valid record for partition behavior. */
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

/** Builds one valid record that cannot fit inside one bounded catalog part. */
function oversizedRecord() {
  const padding = "a".repeat(1800);
  const sources = Array.from({ length: 300 }, (_, index) => {
    const sequence = String(index).padStart(4, "0");
    return {
      sourceHash: hash,
      sourcePath: `packages/corpus/material/editorial/source-${sequence}-${padding}.mdx`,
    };
  });
  return Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
    appLocale: "en",
    deliveryLanguage: "en",
    reviewMode: "authored-humanizer-review",
    sources,
    targetHash: hash,
    targetPath: "packages/corpus/material/editorial/zzzz/en.mdx",
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  });
}

describe("editorial review catalog encoding", () => {
  it("encodes canonical records and reassembles their authenticated manifest", async () => {
    const encoded = await Effect.runPromise(
      encodeEditorialReviewCatalog([record(2), record(1)])
    );
    const partMap = new Map(
      encoded.parts.map(({ bytes, sourcePath }) => [sourcePath, bytes] as const)
    );

    await expect(
      Effect.runPromise(
        assembleEditorialReviewManifest(encoded.catalog, partMap)
      )
    ).resolves.toMatchObject({
      digest: encoded.catalog.digest,
      records: [
        { targetPath: record(1).targetPath },
        { targetPath: record(2).targetPath },
      ],
    });
    expect(new TextDecoder().decode(encoded.catalogBytes).endsWith("\n")).toBe(
      true
    );
  });

  it("partitions a large record set through the contract-owned row ceiling", async () => {
    const records = Array.from({ length: 257 }, (_, index) => record(index));
    const encoded = await Effect.runPromise(
      encodeEditorialReviewCatalog(records)
    );

    expect(encoded.parts.map(({ recordCount }) => recordCount)).toEqual([
      256, 1,
    ]);
  });

  it("rejects an invalid record list before writing evidence", async () => {
    const error = await Effect.runPromise(
      encodeEditorialReviewCatalog([]).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(EditorialReviewEncodingError);
    expect(error).toMatchObject({ scope: "records" });
  });

  it("rejects one record that exceeds the bounded part ceiling", async () => {
    const oversized = oversizedRecord();
    const firstRecord = await Effect.runPromise(
      encodeEditorialReviewCatalog([oversized]).pipe(Effect.flip)
    );
    const laterRecord = await Effect.runPromise(
      encodeEditorialReviewCatalog([record(0), oversized]).pipe(Effect.flip)
    );

    expect(firstRecord).toMatchObject({
      _tag: "EditorialReviewEncodingError",
      scope: "part",
    });
    expect(laterRecord).toMatchObject({
      _tag: "EditorialReviewEncodingError",
      scope: "part",
    });
  });

  it("rejects an invalid or oversized authenticated catalog root", async () => {
    const invalid = await Effect.runPromise(
      encodeEditorialReviewCatalogRoot({}).pipe(Effect.flip)
    );
    const parts = Array.from({ length: 800 }, (_, index) => ({
      recordCount: 1,
      sourceHash: hash,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/editorial/review/part-${String(index + 1).padStart(4, "0")}.json`
      ),
    }));
    const oversized = await Effect.runPromise(
      encodeEditorialReviewCatalogRoot({
        digest: hash,
        format: EDITORIAL_REVIEW_FORMAT,
        parts,
      }).pipe(Effect.flip)
    );

    expect(invalid).toMatchObject({ scope: "catalog" });
    expect(oversized).toMatchObject({ scope: "catalog" });
  });
});
