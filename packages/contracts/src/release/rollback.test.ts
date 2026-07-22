import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { SignedContentArtifactSchema } from "#contracts/content";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  canonicalizeRollbackPage,
  canonicalizeRollbackRecord,
  isRollbackUpsert,
  MAX_ROLLBACK_PAGE_RECORDS,
  RollbackDeleteSchema,
  RollbackPageRequestSchema,
  RollbackPageSchema,
  RollbackUpsertSchema,
} from "#contracts/release/rollback";

const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
  artifactHash: `sha256:${"a".repeat(64)}`,
  keyId: "test-old-key",
  payload: {
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:rollback",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "x",
    rawMdx: "x",
    rendererDomain: "material-mathematics",
    requiredComponents: [],
    sourceHash: `sha256:${"c".repeat(64)}`,
  },
  signature: `${"A".repeat(85)}A`,
});
const change = {
  artifactHash: artifact.artifactHash,
  contentKey: artifact.payload.contentKey,
  delivery: "public",
  locale: artifact.payload.locale,
  operation: "upsert",
  publicPath: "subjects/test/material/lesson",
  rendererDomain: artifact.payload.rendererDomain,
  sourcePath: "packages/corpus/test/rollback/en.mdx",
};
const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: artifact.payload.contentKey,
  kind: "subject-lesson",
  locale: artifact.payload.locale,
  materialKey: "test.material",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: change.publicPath,
  sectionKey: "test-lesson",
  sitemap: true,
});
const upsert = Schema.decodeUnknownSync(RollbackUpsertSchema)({
  artifact,
  change,
  index: 0,
  projection,
});
const deletion = Schema.decodeUnknownSync(RollbackDeleteSchema)({
  change: {
    contentKey: "test:rollback-z",
    locale: "en",
    operation: "delete",
  },
  index: 1,
});

/** Strictly decodes one page with excess properties rejected. */
function decodePage(input: unknown) {
  return Schema.decodeUnknownEither(RollbackPageSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("rollback contracts", () => {
  it("bounds indexed page requests to eight body-bearing records", () => {
    const decode = Schema.decodeUnknownEither(RollbackPageRequestSchema, {
      onExcessProperty: "error",
    });
    expect(
      Either.isRight(
        decode({ afterIndex: -1, limit: 1, rollbackOf: "release-active" })
      )
    ).toBe(true);
    expect(
      Either.isRight(
        decode({
          afterIndex: 0,
          limit: MAX_ROLLBACK_PAGE_RECORDS,
          rollbackOf: "release-active",
        })
      )
    ).toBe(true);
    for (const input of [
      { afterIndex: -2, limit: 1, rollbackOf: "release-active" },
      { afterIndex: -1, limit: 0, rollbackOf: "release-active" },
      { afterIndex: -1, limit: 9, rollbackOf: "release-active" },
      { afterIndex: -1, extra: true, limit: 1, rollbackOf: "release-active" },
    ]) {
      expect(Either.isLeft(decode(input))).toBe(true);
    }
  });

  it("decodes and canonically serializes bound upserts and body-free deletes", () => {
    const page = Schema.decodeUnknownSync(RollbackPageSchema)({
      done: true,
      nextIndex: 1,
      records: [upsert, deletion],
      rollbackOf: "release-active",
      total: 2,
    });
    expect(isRollbackUpsert(upsert)).toBe(true);
    expect(isRollbackUpsert(deletion)).toBe(false);
    expect(JSON.parse(canonicalizeRollbackRecord(upsert))).toEqual(upsert);
    expect(JSON.parse(canonicalizeRollbackRecord(deletion))).toEqual(deletion);
    expect(JSON.parse(canonicalizeRollbackPage(page))).toEqual(page);
  });

  it("accepts only one canonical empty final page", () => {
    expect(
      Either.isRight(
        decodePage({
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: "release-empty",
          total: 0,
        })
      )
    ).toBe(true);
    for (const input of [
      { done: false, nextIndex: -1, records: [], total: 0 },
      { done: true, nextIndex: 0, records: [], total: 0 },
      { done: true, nextIndex: -1, records: [], total: 1 },
    ]) {
      expect(
        Either.isLeft(decodePage({ ...input, rollbackOf: "release-empty" }))
      ).toBe(true);
    }
  });

  it("rejects incoherent page progress and more than eight records", () => {
    const indexed = Array.from({ length: 9 }, (_, index) => ({
      ...deletion,
      index,
    }));
    for (const input of [
      { done: true, nextIndex: 1, records: [upsert], total: 2 },
      { done: true, nextIndex: 0, records: [upsert], total: 2 },
      {
        done: true,
        nextIndex: 2,
        records: [upsert, { ...deletion, index: 2 }],
        total: 3,
      },
      { done: true, nextIndex: 8, records: indexed, total: 9 },
    ]) {
      expect(
        Either.isLeft(decodePage({ ...input, rollbackOf: "release-active" }))
      ).toBe(true);
    }
    const incoherent = decodePage({
      done: true,
      nextIndex: 1,
      records: [upsert],
      rollbackOf: "release-active",
      total: 2,
    });
    if (Either.isLeft(incoherent)) {
      expect(String(incoherent.left)).toContain(
        "Expected one contiguous rollback page"
      );
    }
  });

  it.each([
    ["artifact hash", { artifactHash: `sha256:${"d".repeat(64)}` }],
    [
      "payload content",
      { payload: { ...artifact.payload, contentKey: "test:other" } },
    ],
    ["payload locale", { payload: { ...artifact.payload, locale: "id" } }],
    [
      "payload domain",
      {
        payload: { ...artifact.payload, rendererDomain: "material-chemistry" },
      },
    ],
  ])("rejects an upsert with mismatched %s", (_label, artifactChange) => {
    const result = Schema.decodeUnknownEither(RollbackUpsertSchema)({
      ...upsert,
      artifact: { ...artifact, ...artifactChange },
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected rollback change, artifact, and projection identities to match"
      );
    }
  });

  it.each([
    ["content", { contentKey: "test:other" }],
    ["locale", { locale: "id" }],
    ["route", { publicPath: "subjects/test/other" }],
    ["parent route", { parentPath: "subjects/test/other" }],
  ])("rejects a projection with mismatched %s", (_label, values) => {
    const result = Schema.decodeUnknownEither(RollbackUpsertSchema)({
      ...upsert,
      projection: { ...projection, ...values },
    });
    expect(Either.isLeft(result)).toBe(true);
  });

  it("does not allow artifact or projection bodies on a delete", () => {
    const result = decodePage({
      done: true,
      nextIndex: 0,
      records: [{ ...deletion, artifact, projection }],
      rollbackOf: "release-active",
      total: 1,
    });
    expect(Either.isLeft(result)).toBe(true);
  });
});
