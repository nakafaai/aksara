import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotRowSchema,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot";
import { LearningProgramSchema } from "#contracts/program/spec";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotManifest,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot-data";
import { materialGraph } from "#contracts/test/graph";
import {
  TryoutCatalogRecordSchema,
  TryoutSnapshotSchema,
} from "#contracts/tryout/spec";

const first = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const second = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const third = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);

const program = ProgramSnapshotSchema.make({
  format: PROGRAM_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  rowCount: 6,
  rowDigest: first,
  slugCount: 12,
  snapshotId: second,
});

const quran = QuranSnapshotManifestSchema.make({
  chunkCount: 1085,
  format: QURAN_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  projectionCount: 1427,
  projectionDigest: second,
  provenanceDigest: first,
  provenanceStatus: "blocked",
  runtimeCount: 1199,
  runtimeDigest: first,
  searchCount: 228,
  searchDigest: first,
  snapshotId: third,
  sourceBytes: 19_376_634,
  sourceDigest: first,
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

const programRow = ProgramSnapshotRowSchema.make({
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

  it("canonically serializes and strictly decodes one family envelope", () => {
    const value = { family: "program", manifest: program } as const;
    const canonical = canonicalizeContentSnapshotManifest(value);
    const decode = Schema.decodeUnknownEither(ContentSnapshotManifestSchema, {
      onExcessProperty: "error",
    });

    expect(JSON.parse(canonical)).toEqual(value);
    expect(Either.isRight(decode(value))).toBe(true);
    expect(Either.isLeft(decode({ ...value, extra: true }))).toBe(true);
  });

  it("serializes program and try-out rows without ambiguous nesting", () => {
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
  });
});
