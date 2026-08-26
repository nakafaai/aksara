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
import { Effect, Schema, Stream } from "effect";
import {
  canonicalizeSnapshotBatch,
  makeSnapshotBatches,
} from "#publisher/snapshot/batch";
import { materialGraph } from "#test/graph";

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

    expect(JSON.parse(canonical)).toEqual(request);
    expect(JSON.parse(encoded)).toEqual(request);
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

      expect(batches.map(({ batchIndex }) => batchIndex)).toEqual([0, 1]);
      expect(batches.map(({ rows: values }) => values.length)).toEqual([
        MAX_SNAPSHOT_BATCH_COUNT,
        1,
      ]);
      expect(
        batches.every(
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

      expect(batches.map(({ rows }) => rows.length)).toEqual([1, 1, 1]);
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
