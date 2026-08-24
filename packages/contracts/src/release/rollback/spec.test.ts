import { Exit, Schema } from "effect";
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
} from "#contracts/release/rollback/spec";
import { ContentUpsertSchema } from "#contracts/release/spec";
import { materialGraph } from "#contracts/test/graph";

const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
  artifactHash: `sha256:${"a".repeat(64)}`,
  keyId: "test-old-key",
  payload: {
    artifactLocale: "en",
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:rollback",
    format: "mdx-function-body",
    mdxCompilerVersion: "3.1.1",
    plainText: "x",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: `sha256:${"c".repeat(64)}`,
  },
  signature: `${"A".repeat(85)}A`,
});
const change = Schema.decodeSync(ContentUpsertSchema)({
  artifactHash: artifact.artifactHash,
  artifactLocale: artifact.payload.artifactLocale,
  contentKey: artifact.payload.contentKey,
  delivery: "public",
  family: "material",
  operation: "upsert",
  rendererDomain: artifact.payload.rendererDomain,
  sourcePath: "packages/corpus/test/rollback/en.mdx",
});
const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: artifact.payload.artifactLocale,
  contentKey: artifact.payload.contentKey,
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  materialKey: "lesson.test.material",
  metadata: { authors: [], datePublished: "2026-01-01", title: "Test" },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
  topicTitle: "Test Material",
});
const head = Schema.decodeSync(MaterialHeadSchema)({
  artifactHash: artifact.artifactHash,
  artifactLocale: change.artifactLocale,
  compilerConfigHash: artifact.payload.compilerConfigHash,
  contentKey: change.contentKey,
  delivery: change.delivery,
  family: "material",
  projectionHash: `sha256:${"d".repeat(64)}`,
  publicPath: projection.publicPath,
  rendererDomain: change.rendererDomain,
  sourceHash: artifact.payload.sourceHash,
  sourcePath: change.sourcePath,
});
const upsert = RollbackUpsertStateSchema.make({ artifact, change, projection });
const deletion = Schema.decodeSync(RollbackDeleteStateSchema)({
  change: {
    artifactLocale: change.artifactLocale,
    contentKey: change.contentKey,
    family: "material",
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
const decodePage = Schema.decodeUnknownExit(RollbackPageSchema, {
  onExcessProperty: "error",
});
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
    const decode = Schema.decodeUnknownExit(RollbackPageRequestSchema, {
      onExcessProperty: "error",
    });
    for (const limit of [1, MAX_ROLLBACK_PAGE_RECORDS]) {
      expect(Exit.isSuccess(decode(page({ afterIndex: -1, limit })))).toBe(
        true
      );
    }
    for (const input of [
      { afterIndex: -2, limit: 1 },
      { afterIndex: -1, limit: 0 },
      { afterIndex: -1, limit: MAX_ROLLBACK_PAGE_RECORDS + 1 },
      { afterIndex: -1, extra: true, limit: 1 },
    ]) {
      expect(Exit.isFailure(decode(page(input)))).toBe(true);
    }
    expect(
      Exit.isFailure(
        decode({ afterIndex: -1, limit: 1, rollbackOf: "release-active" })
      )
    ).toBe(true);
  });
  it("canonically serializes absent and implemented snapshot states", () => {
    const questionHead = Schema.decodeSync(QuestionHeadSchema)({
      ...head,
      delivery: "authenticated",
      family: "question",
      publicPath: undefined,
      rendererDomain: "snbt-general",
    });
    const entries = [
      Schema.decodeSync(RollbackSnapshotEntrySchema)({
        index: 0,
        releaseId: "release-active",
        snapshot: {
          artifactLocale: change.artifactLocale,
          contentKey: change.contentKey,
          family: "material",
          state: "absent",
        },
      }),
      Schema.decodeSync(RollbackSnapshotEntrySchema)({
        index: 1,
        releaseId: "release-active",
        snapshot: { head, state: "material" },
      }),
      Schema.decodeSync(RollbackSnapshotEntrySchema)({
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
      Exit.isSuccess(
        decodePage(page({ done: true, nextIndex: -1, records: [], total: 0 }))
      )
    ).toBe(true);
    for (const input of [
      { done: false, nextIndex: -1, records: [], total: 0 },
      { done: true, nextIndex: 0, records: [], total: 0 },
      { done: true, nextIndex: -1, records: [], total: 1 },
    ]) {
      expect(Exit.isFailure(decodePage(page(input)))).toBe(true);
    }
  });
  it("rejects incoherent page progress and oversized pages", () => {
    const indexed = Array.from(
      { length: MAX_ROLLBACK_PAGE_RECORDS + 1 },
      (_, index) => ({ ...record, index })
    );
    expect(
      Exit.isSuccess(
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
      expect(Exit.isFailure(decodePage(page(input)))).toBe(true);
    }
    const incoherent = decodePage(
      page({ done: true, nextIndex: 1, records: [record], total: 2 })
    );
    expect(
      Exit.isFailure(incoherent) ? String(incoherent.cause) : ""
    ).toContain("Expected one contiguous rollback page");
  });
  it.each([
    ["artifact hash", { artifactHash: `sha256:${"d".repeat(64)}` }],
    [
      "payload content",
      { payload: { ...artifact.payload, contentKey: "test:other" } },
    ],
    [
      "payload artifact locale",
      { payload: { ...artifact.payload, artifactLocale: "id" } },
    ],
    [
      "payload domain",
      { payload: { ...artifact.payload, rendererDomain: "chemistry" } },
    ],
  ])("rejects an upsert with mismatched %s", (_label, artifactChange) => {
    const result = Schema.decodeUnknownExit(RollbackUpsertStateSchema)({
      ...upsert,
      artifact: { ...artifact, ...artifactChange },
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected rollback change, artifact, and projection identities to match"
    );
  });
  it.each([
    ["content", { contentKey: "test:other" }],
    ["artifact locale", { artifactLocale: "id" }],
    ["route", { publicPath: "subjects/test/other" }],
  ])("rejects a projection with mismatched %s", (_label, values) => {
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(RollbackUpsertStateSchema)({
          ...upsert,
          projection: { ...projection, ...values },
        })
      )
    ).toBe(true);
  });
  it("requires current and prior states to share one head identity", () => {
    const errors = [
      { change: { ...deletion.change, contentKey: "test:other" } },
      { change: { ...deletion.change, artifactLocale: "id" } },
    ].flatMap((prior) => {
      const result = Schema.decodeUnknownExit(RollbackRecordSchema)({
        current: upsert,
        index: 0,
        prior,
      });
      return Exit.isFailure(result) ? [String(result.cause)] : [];
    });
    expect(errors).toHaveLength(2);
    expect(errors.join("\n")).toContain(
      "Expected rollback current and prior states to share one identity"
    );
  });
  it("does not allow artifact or projection bodies on a delete", () => {
    const result = decodePage(
      page({
        done: true,
        nextIndex: 0,
        records: [{ ...record, prior: { ...deletion, artifact, projection } }],
        total: 1,
      })
    );
    expect(Exit.isFailure(result)).toBe(true);
  });
});
