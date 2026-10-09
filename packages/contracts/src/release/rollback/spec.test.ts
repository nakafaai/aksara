import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  canonicalizeRollbackPage,
  canonicalizeRollbackRecord,
  canonicalizeRollbackSnapshotEntry,
  isRollbackUpsert,
  MAX_ROLLBACK_PAGE_RECORDS,
  RollbackPageRequestSchema,
  RollbackPageSchema,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "#contracts/release/rollback/spec";
import {
  absentEntry,
  artifact,
  deletion,
  materialEntry,
  projection,
  questionEntry,
  record,
  reverseRecord,
  richRecord,
  upsert,
} from "#contracts/test/rollback";
import { JsonTextSchema } from "#contracts/text/json";

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
    const entries = [absentEntry, materialEntry, questionEntry];
    expect(
      entries
        .map(canonicalizeRollbackSnapshotEntry)
        .map((serialized) => Schema.decodeSync(JsonTextSchema)(serialized))
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
      expect(
        Schema.decodeSync(JsonTextSchema)(canonicalizeRollbackRecord(entry))
      ).toEqual(entry);
    }
    expect(
      Schema.decodeSync(JsonTextSchema)(canonicalizeRollbackPage(value))
    ).toEqual(value);
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

  it("pins the canonical bytes of an absent rollback snapshot entry", () => {
    expect(canonicalizeRollbackSnapshotEntry(absentEntry)).toBe(
      '{"index":0,"releaseId":"release-active","snapshot":{"artifactLocale":"en","contentKey":"test:rollback","family":"material","state":"absent"}}'
    );
  });

  it("pins the canonical bytes of a material rollback snapshot entry", () => {
    expect(canonicalizeRollbackSnapshotEntry(materialEntry)).toBe(
      '{"index":1,"releaseId":"release-active","snapshot":{"head":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","compilerConfigHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","contentKey":"test:rollback","delivery":"public","family":"material","projectionHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","publicPath":"subjects/test/material/lesson","rendererDomain":"mathematics","sourceHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","sourcePath":"packages/corpus/test/rollback/en.mdx"},"state":"material"}}'
    );
  });

  it("pins the canonical bytes of a route-free question rollback snapshot entry", () => {
    expect(canonicalizeRollbackSnapshotEntry(questionEntry)).toBe(
      '{"index":2,"releaseId":"release-active","snapshot":{"head":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","compilerConfigHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","contentKey":"test:rollback","delivery":"authenticated","family":"question","projectionHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","rendererDomain":"snbt-general","sourceHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","sourcePath":"packages/corpus/test/rollback/en.mdx"},"state":"question"}}'
    );
  });

  it("pins the canonical bytes of a complete upsert-to-delete rollback record", () => {
    expect(canonicalizeRollbackRecord(record)).toBe(
      '{"current":{"artifact":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","keyId":"test-old-key","payload":{"artifactLocale":"en","byteLength":1,"compiledCode":"x","compilerConfigHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","compilerVersion":"0.1.0","contentKey":"test:rollback","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"x","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":[],"sourceHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"},"signature":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"change":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","contentKey":"test:rollback","delivery":"public","family":"material","operation":"upsert","rendererDomain":"mathematics","sourcePath":"packages/corpus/test/rollback/en.mdx"},"projection":{"appLocale":"en","artifactLocale":"en","contentKey":"test:rollback","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[],"datePublished":"2026-01-01","title":"Test"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson","sectionKey":"test-lesson","sitemap":true,"topicTitle":"Test Material"}},"index":0,"prior":{"change":{"artifactLocale":"en","contentKey":"test:rollback","family":"material","operation":"delete"}}}'
    );
  });

  it("pins the canonical bytes of a rollback page with its owner identity", () => {
    const value = Schema.decodeUnknownSync(RollbackPageSchema)(
      page({ done: true, nextIndex: 0, records: [richRecord], total: 1 })
    );

    expect(canonicalizeRollbackPage(value)).toBe(
      '{"done":true,"nextIndex":0,"records":[{"current":{"artifact":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","keyId":"test-old-key","payload":{"artifactLocale":"en","byteLength":1,"compiledCode":"x","compilerConfigHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","compilerVersion":"0.1.0","contentKey":"test:rollback","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"x","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":[],"sourceHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"},"signature":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"change":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","contentKey":"test:rollback","delivery":"public","family":"material","operation":"upsert","rendererDomain":"mathematics","sourcePath":"packages/corpus/test/rollback/en.mdx"},"projection":{"appLocale":"en","artifactLocale":"en","contentKey":"test:rollback","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[],"dateModified":"2026-02-01","datePublished":"2026-01-01","description":"Deskripsi uji é","searchTitle":"Judul pencarian é","subject":"Matematika é","title":"Tes é"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson","sectionKey":"test-lesson","sitemap":true,"topicTitle":"Test Material"}},"index":0,"prior":{"change":{"artifactLocale":"en","contentKey":"test:rollback","family":"material","operation":"delete"}}}],"rollbackOfManifestHash":"sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","rollbackOf":"release-active","total":1}'
    );
  });

  it("pins the canonical bytes of a complete upsert-to-delete rollback record with projection metadata", () => {
    expect(canonicalizeRollbackRecord(richRecord)).toBe(
      '{"current":{"artifact":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","keyId":"test-old-key","payload":{"artifactLocale":"en","byteLength":1,"compiledCode":"x","compilerConfigHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","compilerVersion":"0.1.0","contentKey":"test:rollback","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"x","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":[],"sourceHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"},"signature":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"change":{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","contentKey":"test:rollback","delivery":"public","family":"material","operation":"upsert","rendererDomain":"mathematics","sourcePath":"packages/corpus/test/rollback/en.mdx"},"projection":{"appLocale":"en","artifactLocale":"en","contentKey":"test:rollback","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[],"dateModified":"2026-02-01","datePublished":"2026-01-01","description":"Deskripsi uji é","searchTitle":"Judul pencarian é","subject":"Matematika é","title":"Tes é"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson","sectionKey":"test-lesson","sitemap":true,"topicTitle":"Test Material"}},"index":0,"prior":{"change":{"artifactLocale":"en","contentKey":"test:rollback","family":"material","operation":"delete"}}}'
    );
  });
});
