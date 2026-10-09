// @vitest-environment node

import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ProgramSnapshotRowSchema } from "@nakafa/aksara-contracts/program/snapshot/row";
import {
  QuranSearchRowSchema,
  QuranSnapshotRowSchema,
} from "@nakafa/aksara-contracts/quran/snapshot/row";
import type { ContentSnapshotRow } from "@nakafa/aksara-contracts/release/snapshot/data";
import {
  MAX_SNAPSHOT_BATCH_BYTES,
  MAX_SNAPSHOT_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { PublicationRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { Array as Arr, Effect, Schema, Stream } from "effect";
import {
  canonicalizeSnapshotBatch,
  makeSnapshotBatches,
} from "#publisher/snapshot/batch";
import { JsonTextSchema } from "#publisher/text/json";
import { materialGraph } from "#test/graph";
import { tryoutCatalogRecord, tryoutPlacementRecord } from "#test/tryout/rows";

const releaseId = ReleaseIdSchema.make("test-snapshot-batching");
const snapshotId = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const otherSnapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
type ProgramRow = Extract<ContentSnapshotRow, { readonly family: "program" }>;
type QuranRow = Extract<ContentSnapshotRow, { readonly family: "quran" }>;

/** Builds a test-owned program row with configurable canonical bytes. */
function programRow(index: number, title = "Test Program"): ProgramRow {
  return {
    family: "program",
    record: Schema.decodeSync(ProgramSnapshotRowSchema)({
      kind: "program",
      row: {
        defaultCoverageStatus: "planned",
        displayOrder: index + 1,
        iconKey: "school",
        key: `test-batch-program-${index}`,
        kind: "school-curriculum",
        navigation: {
          levels: ["stage", "subject"],
          model: "curriculum-tree",
        },
        provider: { kind: "nakafa", name: "Nakafa test suite" },
        sources: [
          {
            label: "Test-only publisher batch source",
            retrievedAt: "2026-01-01",
            type: "nakafa-editorial",
            url: "https://example.test/publisher-batch",
          },
        ],
        translations: [
          {
            appLocale: "en",
            publicSlug: `test-program-${index}`,
            title,
          },
          {
            appLocale: "id",
            publicSlug: `program-uji-${index}`,
            title,
          },
        ],
        version: { label: "Test-only version" },
      },
      rowHash: snapshotId,
    }),
  };
}

/** Builds one valid technical Quran row bound to an explicit snapshot. */
function quranRow(boundSnapshotId: typeof snapshotId): QuranRow {
  return {
    family: "quran",
    record: QuranSnapshotRowSchema.make({
      payload: QuranSearchRowSchema.make({
        appLocale: AppLocaleSchema.make("en"),
        graph: materialGraph(AppLocaleSchema.make("en"), "quran", "test-batch"),
        kind: "quran-search",
        route: PublicPathSchema.make("quran/1"),
        surahNumber: 1,
        text: "Test-only Quran protocol text",
        title: "Test Quran Batch",
      }),
      rowHash: snapshotId,
      snapshotId: boundSnapshotId,
    }),
  };
}

/** Materializes snapshot batches only at the Vitest execution boundary. */
const collect = Effect.fn("SnapshotBatchTest.collect")(
  <T extends ContentSnapshotRow>(rows: Stream.Stream<T>) =>
    makeSnapshotBatches(releaseId, "program", snapshotId, rows).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
);

describe("snapshot batching", () => {
  it("serializes the exact complete request in canonical field order", () => {
    const row = programRow(0);
    const batch = {
      batchIndex: 0,
      family: "program",
      releaseId,
      rows: [row],
      snapshotId,
    } as const;
    const request = {
      ...batch,
      operation: "stageSnapshotBatch",
    } as const;
    const encoded = Schema.encodeSync(
      Schema.fromJsonString(PublicationRequestSchema),
      { onExcessProperty: "error" }
    )(request);
    const canonical = canonicalizeSnapshotBatch(batch);

    expect(Schema.decodeSync(JsonTextSchema)(canonical)).toEqual(request);
    expect(Schema.decodeSync(JsonTextSchema)(encoded)).toEqual(request);
    expect(Buffer.byteLength(canonical, "utf8")).toBe(
      Buffer.byteLength(encoded, "utf8")
    );
  });

  it.effect("preserves an empty row stream without inventing an envelope", () =>
    Effect.gen(function* () {
      expect(yield* collect(Stream.empty)).toEqual([]);
    })
  );

  it.effect("partitions rows at the exact target count ceiling", () =>
    Effect.gen(function* () {
      const rows = Array.from(
        { length: MAX_SNAPSHOT_BATCH_COUNT + 1 },
        (_, index) => programRow(index)
      );
      const batches = yield* collect(Stream.fromIterable(rows));

      expect(Arr.map(batches, ({ batchIndex }) => batchIndex)).toEqual([0, 1]);
      expect(Arr.map(batches, ({ rows: values }) => values.length)).toEqual([
        MAX_SNAPSHOT_BATCH_COUNT,
        1,
      ]);
      expect(
        Arr.every(
          batches,
          (batch) =>
            Buffer.byteLength(canonicalizeSnapshotBatch(batch), "utf8") <=
            MAX_SNAPSHOT_BATCH_BYTES
        )
      ).toBe(true);
    })
  );

  it.effect("splits rows that only fit separate complete envelopes", () =>
    Effect.gen(function* () {
      const title = "x".repeat(Math.floor(MAX_SNAPSHOT_BATCH_BYTES / 3));
      const batches = yield* collect(
        Stream.make(
          programRow(0, title),
          programRow(1, title),
          programRow(2, title)
        )
      );

      expect(Arr.map(batches, ({ rows }) => rows.length)).toEqual([1, 1, 1]);
    })
  );

  it.effect(
    "rejects a standalone row exceeding the complete request ceiling",
    () =>
      Effect.gen(function* () {
        const error = yield* makeSnapshotBatches(
          releaseId,
          "program",
          snapshotId,
          Stream.make(programRow(0, "x".repeat(MAX_SNAPSHOT_BATCH_BYTES)))
        ).pipe(Stream.runDrain, Effect.flip);

        expect(error).toMatchObject({
          _tag: "PublicationBatchLimitError",
          actualCount: 1,
          kind: "snapshot",
        });
        expect("actualBytes" in error ? error.actualBytes : 0).toBeGreaterThan(
          MAX_SNAPSHOT_BATCH_BYTES
        );
      })
  );

  it.effect("rejects a row owned by another family at its global offset", () =>
    Effect.gen(function* () {
      const error = yield* makeSnapshotBatches(
        releaseId,
        "program",
        snapshotId,
        Stream.make(programRow(0), quranRow(snapshotId))
      ).pipe(Stream.runDrain, Effect.flip);

      expect(error).toMatchObject({
        _tag: "SnapshotBatchBindingError",
        actual: "quran",
        expected: "program",
        field: "family",
        itemOffset: 1,
      });
    })
  );

  it.effect("rejects a Quran row bound to another immutable snapshot", () =>
    Effect.gen(function* () {
      const error = yield* makeSnapshotBatches(
        releaseId,
        "quran",
        snapshotId,
        Stream.make(quranRow(otherSnapshotId))
      ).pipe(Stream.runDrain, Effect.flip);

      expect(error).toMatchObject({
        _tag: "SnapshotBatchBindingError",
        actual: otherSnapshotId,
        expected: snapshotId,
        family: "quran",
        field: "snapshotId",
        itemOffset: 0,
      });
    })
  );

  it.effect("accepts a Quran row bound to the envelope snapshot", () =>
    Effect.gen(function* () {
      const batches = yield* makeSnapshotBatches(
        releaseId,
        "quran",
        snapshotId,
        Stream.make(quranRow(snapshotId))
      ).pipe(
        Stream.runCollect,
        Effect.map((chunk) => [...chunk])
      );

      expect(batches).toHaveLength(1);
      expect(batches[0]?.rows).toHaveLength(1);
    })
  );
});

describe("snapshot batch canonical wire bytes", () => {
  it("pins a try-out snapshot batch with catalog and placement rows", () => {
    const rows: readonly [ContentSnapshotRow, ...ContentSnapshotRow[]] = [
      { family: "tryout", record: tryoutCatalogRecord, rowKind: "catalog" },
      {
        family: "tryout",
        record: tryoutPlacementRecord,
        rowKind: "placement",
      },
    ];
    expect(
      canonicalizeSnapshotBatch({
        batchIndex: 0,
        family: "tryout",
        releaseId,
        rows,
        snapshotId,
      })
    ).toMatchInlineSnapshot(
      `"{"batchIndex":0,"family":"tryout","operation":"stageSnapshotBatch","releaseId":"test-snapshot-batching","rows":[{"family":"tryout","record":{"row":{"appLocale":"en","countryCode":"ZZ","countryKey":"test-country","graph":{"alignmentId":"alignment:test-country","assetId":"asset:test-country","conceptId":"concept:test-country","learningObjectId":"lo:test-country","lensId":"lens:test-country"},"kind":"country","order":1,"publicPath":"try-out/test-country","sourceRevision":"2026-01-01","title":"Test Country"},"rowHash":"sha256:4b55966355fbb5395389147acf42465e939231cc716fb9e9cee862b043253984"},"rowKind":"catalog"},{"family":"tryout","record":{"row":{"answerArtifactHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","answerArtifactLocale":"en","answerContentKey":"question-bank/tryout/test-country/test-exam/test-section/test-set/question-1/answer","appLocale":"en","contentHash":"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","countryKey":"test-country","deliveryLanguage":"en","examKey":"test-exam","languagePolicy":{"kind":"app-locale"},"questionArtifactHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","questionArtifactLocale":"en","questionContentKey":"question-bank/tryout/test-country/test-exam/test-section/test-set/question-1/question","questionOrder":1,"questionSourcePath":"packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set/question-1","rendererDomain":"mathematics","response":{"kind":"single-choice","options":[{"isCorrect":false,"label":"Test option one.","optionKey":"option-1","order":1},{"isCorrect":true,"label":"Test option café ✓.","optionKey":"option-2","order":2},{"isCorrect":false,"label":"Test option three.","optionKey":"option-3","order":3}]},"scope":"server","sectionKey":"test-section","setKey":"test-set","sourceRevision":"2026-01-01","trackKey":"test-track"},"rowHash":"sha256:8ac34761f6efe4e11c6cb6c5e6f90321651b97dab3e582616c8f1635aef80f64"},"rowKind":"placement"}],"snapshotId":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}"`
    );
  });

  it("pins a program snapshot batch with non-ASCII titles", () => {
    expect(
      canonicalizeSnapshotBatch({
        batchIndex: 2,
        family: "program",
        releaseId,
        rows: [programRow(0, "Pelajaran é ✓ 数学"), programRow(1)],
        snapshotId,
      })
    ).toMatchInlineSnapshot(
      `"{"batchIndex":2,"family":"program","operation":"stageSnapshotBatch","releaseId":"test-snapshot-batching","rows":[{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"planned","displayOrder":1,"iconKey":"school","key":"test-batch-program-0","kind":"school-curriculum","navigation":{"levels":["stage","subject"],"model":"curriculum-tree"},"provider":{"kind":"nakafa","name":"Nakafa test suite"},"sources":[{"label":"Test-only publisher batch source","retrievedAt":"2026-01-01","type":"nakafa-editorial","url":"https://example.test/publisher-batch"}],"translations":[{"appLocale":"en","publicSlug":"test-program-0","title":"Pelajaran é ✓ 数学"},{"appLocale":"id","publicSlug":"program-uji-0","title":"Pelajaran é ✓ 数学"}],"version":{"label":"Test-only version"}},"rowHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}},{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"planned","displayOrder":2,"iconKey":"school","key":"test-batch-program-1","kind":"school-curriculum","navigation":{"levels":["stage","subject"],"model":"curriculum-tree"},"provider":{"kind":"nakafa","name":"Nakafa test suite"},"sources":[{"label":"Test-only publisher batch source","retrievedAt":"2026-01-01","type":"nakafa-editorial","url":"https://example.test/publisher-batch"}],"translations":[{"appLocale":"en","publicSlug":"test-program-1","title":"Test Program"},{"appLocale":"id","publicSlug":"program-uji-1","title":"Test Program"}],"version":{"label":"Test-only version"}},"rowHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}],"snapshotId":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}"`
    );
  });
});
