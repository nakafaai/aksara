import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  LearningProgramRecordSchema,
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot/spec";
import { LearningProgramSchema } from "#contracts/program/spec";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot/spec";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot/data";
import { materialGraph } from "#contracts/test/graph";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { makeSnapshotV2TestData } from "#contracts/test/snapshot-v2";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";
import { TryoutCatalogRecordSchema } from "#contracts/tryout/spec";

const first = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const second = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const third = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);

const program = ProgramSnapshotSchema.make({
  curriculumRowCount: 390,
  format: PROGRAM_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  programRowCount: 6,
  rowCount: 396,
  rowDigest: first,
  sitemapCount: 52,
  slugCount: 12,
  snapshotId: second,
});

const quran = QuranSnapshotManifestSchema.make({
  attributionCount: 1,
  chunkCount: 1085,
  format: QURAN_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  projectionCount: 1428,
  projectionDigest: second,
  provenanceDigest: first,
  provenanceStatus: "blocked",
  runtimeCount: 1200,
  runtimeDigest: first,
  searchCount: 228,
  searchDigest: first,
  snapshotId: third,
  sourceBytes: 11_506_941,
  sourceDigest: first,
  sourceFileCount: 118,
  surahCount: 114,
  tafsirLocales: ["id"],
  verseCount: 6236,
});

const tryout = TryoutSnapshotSchema.make({
  catalogDigest: first,
  counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 840,
  placementDigest: second,
  routeCount: 48,
  snapshotId: third,
});

const programRow = LearningProgramRecordSchema.make({
  kind: "program",
  row: Schema.decodeUnknownSync(LearningProgramSchema)({
    defaultCoverageStatus: "partial",
    displayOrder: 1,
    iconKey: "school",
    key: "test-program",
    kind: "school-curriculum",
    navigation: {
      levels: ["stage"],
      model: "curriculum-tree",
    },
    provider: { kind: "nakafa", name: "Nakafa" },
    sources: [
      {
        label: "Test-only source",
        retrievedAt: "2026-07-23",
        type: "nakafa-editorial",
        url: "https://example.test/program",
      },
    ],
    translations: {
      en: { publicSlug: "test-program", title: "Test Program" },
      id: { publicSlug: "program-uji", title: "Program Uji" },
    },
    version: { label: "Test" },
  }),
  rowHash: first,
});

const tryoutRow = Schema.decodeUnknownSync(TryoutCatalogRecordSchema)({
  row: {
    countryCode: "ID",
    countryKey: "indonesia",
    graph: materialGraph("en", "test", "tryout", "country"),
    kind: "country",
    locale: "en",
    order: 1,
    publicPath: "try-out/indonesia",
    sourceRevision: "2026-07-23",
    title: "Indonesia",
  },
  rowHash: second,
});

describe("structured snapshot data", () => {
  it("returns every domain manifest identity", () => {
    const values = [
      { family: "program", manifest: program },
      { family: "quran", manifest: quran },
      { family: "tryout", manifest: tryout },
    ] as const;

    expect(values.map(contentSnapshotId)).toEqual([second, third, third]);
  });

  it("strictly decodes one family envelope", () => {
    const value = { family: "program", manifest: program } as const;
    const decode = Schema.decodeUnknownEither(ContentSnapshotManifestSchema, {
      onExcessProperty: "error",
    });

    expect(Either.isRight(decode(value))).toBe(true);
    expect(Either.isLeft(decode({ ...value, extra: true }))).toBe(true);
  });

  it("serializes program and try-out rows without ambiguous nesting", async () => {
    const programValue = { family: "program", record: programRow } as const;
    const tryoutValue = {
      family: "tryout",
      record: tryoutRow,
      rowKind: "catalog",
    } as const;
    const decode = Schema.decodeUnknownEither(ContentSnapshotRowSchema, {
      onExcessProperty: "error",
    });

    expect(JSON.parse(canonicalizeContentSnapshotRow(programValue))).toEqual(
      programValue
    );
    expect(JSON.parse(canonicalizeContentSnapshotRow(tryoutValue))).toEqual(
      tryoutValue
    );
    expect(Either.isRight(decode(programValue))).toBe(true);
    expect(Either.isRight(decode(tryoutValue))).toBe(true);
    const historical = await Effect.runPromise(makeSnapshotTestData());
    const quranValue = historical.rows.find(
      (row) => row.family === "quran" && !("rowKind" in row)
    );
    if (quranValue?.family !== "quran" || "rowKind" in quranValue) {
      throw new Error("Expected one historical Quran row.");
    }
    expect(JSON.parse(canonicalizeContentSnapshotRow(quranValue))).toEqual(
      quranValue
    );
  });

  it("strictly decodes current manifests and explicit v2 placements", async () => {
    const current = await Effect.runPromise(makeSnapshotV2TestData());
    const decodeManifest = Schema.decodeUnknownEither(
      ContentSnapshotManifestSchema,
      { onExcessProperty: "error" }
    );
    const decodeRow = Schema.decodeUnknownEither(ContentSnapshotRowSchema, {
      onExcessProperty: "error",
    });
    const placements = current.rows.filter(
      (row) => row.family === "tryout" && row.rowKind === "placement-v2"
    );

    expect(
      current.manifests.every((value) => Either.isRight(decodeManifest(value)))
    ).toBe(true);
    expect(placements).toHaveLength(2);
    expect(placements.every((value) => Either.isRight(decodeRow(value)))).toBe(
      true
    );
  });
});
