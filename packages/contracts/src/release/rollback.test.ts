import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { SignedContentArtifactSchema } from "#contracts/content";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "#contracts/release/head";
import {
  canonicalizeRollbackPage,
  canonicalizeRollbackRecord,
  canonicalizeRollbackSnapshotEntry,
  isRollbackUpsert,
  MAX_ROLLBACK_PAGE_RECORDS,
  RollbackDeleteStateSchema,
  RollbackPageRequestSchema,
  RollbackPageSchema,
  RollbackRecordSchema,
  RollbackSnapshotEntrySchema,
  RollbackUpsertStateSchema,
} from "#contracts/release/rollback";
import { ContentUpsertSchema } from "#contracts/release/spec";
import { materialGraph } from "#contracts/test/graph";

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
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: `sha256:${"c".repeat(64)}`,
  },
  signature: `${"A".repeat(85)}A`,
});
const change = Schema.decodeUnknownSync(ContentUpsertSchema)({
  artifactHash: artifact.artifactHash,
  contentKey: artifact.payload.contentKey,
  delivery: "public",
  family: "material",
  locale: artifact.payload.locale,
  operation: "upsert",
  rendererDomain: artifact.payload.rendererDomain,
  sourcePath: "packages/corpus/test/rollback/en.mdx",
});
const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: artifact.payload.contentKey,
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  locale: artifact.payload.locale,
  materialKey: "lesson.test.material",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
});
const head = Schema.decodeUnknownSync(MaterialHeadSchema)({
  artifactHash: artifact.artifactHash,
  compilerConfigHash: artifact.payload.compilerConfigHash,
  contentKey: change.contentKey,
  delivery: change.delivery,
  family: "material",
  locale: change.locale,
  projectionHash: `sha256:${"d".repeat(64)}`,
  publicPath: projection.publicPath,
  rendererDomain: change.rendererDomain,
  sourceHash: artifact.payload.sourceHash,
  sourcePath: change.sourcePath,
});
const upsert = RollbackUpsertStateSchema.make({ artifact, change, projection });
const deletion = Schema.decodeUnknownSync(RollbackDeleteStateSchema)({
  change: {
    contentKey: change.contentKey,
    family: "material",
    locale: change.locale,
    operation: "delete",
  },
});
const record = RollbackRecordSchema.make({
  current: upsert,
  index: 0,
  prior: deletion,
});
const reverseRecord = RollbackRecordSchema.make({
  current: deletion,
  index: 1,
  prior: upsert,
});
/** Strictly decodes one page with excess properties rejected. */
function decodePage(input: unknown) {
  return Schema.decodeUnknownEither(RollbackPageSchema)(input, {
    onExcessProperty: "error",
  });
}
/** Adds the immutable source identity shared by rollback-page fixtures. */
function page(input: object) {
  return {
    ...input,
    rollbackOf: "release-active",
    rollbackOfManifestHash: `sha256:${"f".repeat(64)}`,
  };
}
describe("rollback contracts", () => {
  it("binds bounded page requests to an exact active manifest", () => {
    const decode = Schema.decodeUnknownEither(RollbackPageRequestSchema, {
      onExcessProperty: "error",
    });
    for (const limit of [1, MAX_ROLLBACK_PAGE_RECORDS]) {
      expect(Either.isRight(decode(page({ afterIndex: -1, limit })))).toBe(
        true
      );
    }
    for (const input of [
      { afterIndex: -2, limit: 1 },
      { afterIndex: -1, limit: 0 },
      { afterIndex: -1, limit: MAX_ROLLBACK_PAGE_RECORDS + 1 },
      { afterIndex: -1, extra: true, limit: 1 },
    ]) {
      expect(Either.isLeft(decode(page(input)))).toBe(true);
    }
    expect(
      Either.isLeft(
        decode({ afterIndex: -1, limit: 1, rollbackOf: "release-active" })
      )
    ).toBe(true);
  });
  it("canonically serializes absent and implemented snapshot states", () => {
    const questionHead = Schema.decodeUnknownSync(QuestionHeadSchema)({
      ...head,
      delivery: "authenticated",
      family: "question",
      publicPath: undefined,
      rendererDomain: "snbt-general",
    });
    const entries = [
      Schema.decodeUnknownSync(RollbackSnapshotEntrySchema)({
        index: 0,
        releaseId: "release-active",
        snapshot: {
          contentKey: change.contentKey,
          family: "material",
          locale: change.locale,
          state: "absent",
        },
      }),
      Schema.decodeUnknownSync(RollbackSnapshotEntrySchema)({
        index: 1,
        releaseId: "release-active",
        snapshot: { head, state: "material" },
      }),
      Schema.decodeUnknownSync(RollbackSnapshotEntrySchema)({
        index: 2,
        releaseId: "release-active",
        snapshot: { head: questionHead, state: "question" },
      }),
    ];
    expect(
      entries
        .map(canonicalizeRollbackSnapshotEntry)
        .map((serialized) => JSON.parse(serialized))
    ).toEqual(entries);
  });
  it("decodes and serializes complete current-to-prior transitions", () => {
    const value = Schema.decodeUnknownSync(RollbackPageSchema)(
      page({
        done: true,
        nextIndex: 1,
        records: [record, reverseRecord],
        total: 2,
      })
    );
    expect(isRollbackUpsert(upsert)).toBe(true);
    expect(isRollbackUpsert(deletion)).toBe(false);
    for (const entry of [record, reverseRecord]) {
      expect(JSON.parse(canonicalizeRollbackRecord(entry))).toEqual(entry);
    }
    expect(JSON.parse(canonicalizeRollbackPage(value))).toEqual(value);
  });
  it("accepts only one canonical empty final page", () => {
    expect(
      Either.isRight(
        decodePage(page({ done: true, nextIndex: -1, records: [], total: 0 }))
      )
    ).toBe(true);
    for (const input of [
      { done: false, nextIndex: -1, records: [], total: 0 },
      { done: true, nextIndex: 0, records: [], total: 0 },
      { done: true, nextIndex: -1, records: [], total: 1 },
    ]) {
      expect(Either.isLeft(decodePage(page(input)))).toBe(true);
    }
  });
  it("rejects incoherent page progress and oversized pages", () => {
    const indexed = Array.from(
      { length: MAX_ROLLBACK_PAGE_RECORDS + 1 },
      (_, index) => ({ ...record, index })
    );
    expect(
      Either.isRight(
        decodePage(
          page({ done: false, nextIndex: 0, records: [record], total: 2 })
        )
      )
    ).toBe(true);
    for (const input of [
      { done: true, nextIndex: 0, records: [record], total: 2 },
      {
        done: true,
        nextIndex: 2,
        records: [record, { ...reverseRecord, index: 2 }],
        total: 3,
      },
      { done: true, nextIndex: 0, records: [record], total: 0 },
      { done: true, nextIndex: 8, records: indexed, total: 9 },
    ]) {
      expect(Either.isLeft(decodePage(page(input)))).toBe(true);
    }
    const incoherent = decodePage(
      page({ done: true, nextIndex: 1, records: [record], total: 2 })
    );
    expect(Either.isLeft(incoherent) ? String(incoherent.left) : "").toContain(
      "Expected one contiguous rollback page"
    );
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
      { payload: { ...artifact.payload, rendererDomain: "chemistry" } },
    ],
  ])("rejects an upsert with mismatched %s", (_label, artifactChange) => {
    const result = Schema.decodeUnknownEither(RollbackUpsertStateSchema)({
      ...upsert,
      artifact: { ...artifact, ...artifactChange },
    });
    expect(Either.isLeft(result) ? String(result.left) : "").toContain(
      "Expected rollback change, artifact, and projection identities to match"
    );
  });
  it.each([
    ["content", { contentKey: "test:other" }],
    ["locale", { locale: "id" }],
    ["route", { publicPath: "subjects/test/other" }],
  ])("rejects a projection with mismatched %s", (_label, values) => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(RollbackUpsertStateSchema)({
          ...upsert,
          projection: { ...projection, ...values },
        })
      )
    ).toBe(true);
  });
  it("requires current and prior states to share one head identity", () => {
    const errors: string[] = [];
    for (const prior of [
      { change: { ...deletion.change, contentKey: "test:other" } },
      { change: { ...deletion.change, locale: "id" } },
    ]) {
      const result = Schema.decodeUnknownEither(RollbackRecordSchema)({
        current: upsert,
        index: 0,
        prior,
      });
      if (Either.isLeft(result)) {
        errors.push(String(result.left));
      }
    }
    expect(errors).toHaveLength(2);
    expect(errors.join("\n")).toContain(
      "Expected rollback current and prior states to share one identity"
    );
  });
  it("does not allow artifact or projection bodies on a delete", () => {
    const invalidPrior = { ...deletion, artifact, projection };
    const result = decodePage(
      page({
        done: true,
        nextIndex: 0,
        records: [{ ...record, prior: invalidPrior }],
        total: 1,
      })
    );
    expect(Either.isLeft(result)).toBe(true);
  });
});
