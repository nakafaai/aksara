import { NodeContext } from "@effect/platform-node";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ProgramSnapshotSchema } from "@nakafa/aksara-contracts/program/snapshot";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "@nakafa/aksara-contracts/quran/snapshot";
import { QURAN_SOURCE_FILE_COUNT } from "@nakafa/aksara-contracts/quran/source";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_LOCALES,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot-data";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot-hash";
import { Effect, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateCatalogSnapshots } from "#publisher/catalog/snapshots";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const quranChunkCount = 1;
const quranRuntimeCount =
  QURAN_ATTRIBUTION_COUNT + QURAN_SURAH_COUNT + quranChunkCount;
const quranProjectionCount = quranRuntimeCount + QURAN_SEARCH_COUNT;
const programManifest = ProgramSnapshotSchema.make({
  curriculumRowCount: 390,
  format: "program-v3",
  locales: ["en", "id"],
  programRowCount: 6,
  rowCount: 396,
  rowDigest: hash,
  sitemapCount: 52,
  slugCount: 12,
  snapshotId: hash,
});
const quranManifest = QuranSnapshotManifestSchema.make({
  attributionCount: QURAN_ATTRIBUTION_COUNT,
  chunkCount: quranChunkCount,
  format: QURAN_SNAPSHOT_FORMAT,
  locales: QURAN_LOCALES,
  projectionCount: quranProjectionCount,
  projectionDigest: hash,
  provenanceDigest: hash,
  provenanceStatus: "blocked",
  runtimeCount: quranRuntimeCount,
  runtimeDigest: hash,
  searchCount: QURAN_SEARCH_COUNT,
  searchDigest: hash,
  snapshotId: hash,
  sourceBytes: 1,
  sourceDigest: hash,
  sourceFileCount: QURAN_SOURCE_FILE_COUNT,
  surahCount: QURAN_SURAH_COUNT,
  tafsirLocales: QURAN_TAFSIR_LOCALES,
  verseCount: QURAN_VERSE_COUNT,
});
const tryoutManifest = makeTryoutSnapshot({
  catalogDigest: hash,
  counts: { country: 2, exam: 2, section: 4, set: 2, track: 2 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 8,
  placementDigest: hash,
  routeCount: 10,
});
const completeManifests: readonly ContentSnapshotManifest[] = [
  { family: "program", manifest: programManifest },
  { family: "quran", manifest: quranManifest },
  { family: "tryout", manifest: tryoutManifest },
];

const control = vi.hoisted(
  (): {
    decodeFailure: boolean;
    manifests: readonly ContentSnapshotManifest[];
    prepareFailure: boolean;
    verifyFailure: boolean;
  } => ({
    decodeFailure: false,
    manifests: [],
    prepareFailure: false,
    verifyFailure: false,
  })
);

vi.mock("#publisher/snapshot/release", async () => {
  const { Effect: TestEffect, Stream: TestStream } = await import("effect");
  return {
    /** Supplies controlled replayable structured-source output. */
    prepareReleaseSnapshots: () =>
      control.prepareFailure
        ? TestEffect.fail("prepare")
        : TestEffect.succeed({
            manifests: () =>
              control.decodeFailure
                ? TestStream.fail("decode")
                : TestStream.fromIterable(control.manifests),
            rows: () => TestStream.empty,
          }),
  };
});

vi.mock(
  "@nakafa/aksara-contracts/release/snapshot-verify",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/release/snapshot-verify")
      >();
    const { Effect: TestEffect } = await import("effect");
    return {
      ...original,
      /** Supplies verification evidence without duplicating row fixtures. */
      verifyContentSnapshots: () =>
        control.verifyFailure
          ? TestEffect.fail("verify")
          : TestEffect.succeed({ stagedRows: 1415 }),
    };
  }
);

beforeEach(() => {
  control.decodeFailure = false;
  control.manifests = completeManifests;
  control.prepareFailure = false;
  control.verifyFailure = false;
});

/** Runs structured validation through its scoped platform boundary. */
function validate() {
  return Effect.runPromise(
    Effect.scoped(
      validateCatalogSnapshots({
        checkoutRoot: "/code/aksara",
        questionHeads: () => Stream.empty,
        rendererManifest: {},
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

describe("catalog snapshots", () => {
  it("reports current Program, Quran, and Try-out source evidence", async () => {
    await expect(validate()).resolves.toEqual({
      program: {
        rowCount: programManifest.rowCount,
        rowDigest: hash,
        sitemapCount: programManifest.sitemapCount,
        snapshotId: hash,
      },
      quran: {
        projectionCount: quranManifest.projectionCount,
        projectionDigest: hash,
        provenanceDigest: hash,
        provenanceStatus: "blocked",
        runtimeCount: quranManifest.runtimeCount,
        searchCount: QURAN_SEARCH_COUNT,
        snapshotId: hash,
        sourceDigest: hash,
      },
      stagedRows: 1415,
      tryout: {
        catalogCount: 12,
        catalogDigest: hash,
        placementCount: 8,
        placementDigest: hash,
        routeCount: 10,
        snapshotId: tryoutManifest.snapshotId,
      },
    });
  });

  it.each([
    { manifests: [] },
    { manifests: completeManifests.slice(1, 2) },
    { manifests: completeManifests.slice(0, 1) },
    { manifests: completeManifests.slice(0, 2) },
  ])(
    "rejects an incomplete structured family set %#",
    async ({ manifests }) => {
      control.manifests = manifests;

      await expect(
        Effect.runPromise(
          Effect.scoped(
            validateCatalogSnapshots({
              checkoutRoot: "/code/aksara",
              questionHeads: () => Stream.empty,
              rendererManifest: {},
            })
          ).pipe(Effect.flip, Effect.provide(NodeContext.layer))
        )
      ).resolves.toMatchObject({
        _tag: "CatalogSnapshotSetError",
        actualFamilies: manifests.map(({ family }) => family),
      });
    }
  );

  it.each([
    { field: "decodeFailure", stage: "decode" },
    { field: "prepareFailure", stage: "prepare" },
    { field: "verifyFailure", stage: "verify" },
  ] as const)(
    "preserves a %s without relabeling it",
    async ({ field, stage }) => {
      control[field] = true;

      await expect(
        Effect.runPromise(
          Effect.scoped(
            validateCatalogSnapshots({
              checkoutRoot: "/code/aksara",
              questionHeads: () => Stream.empty,
              rendererManifest: {},
            })
          ).pipe(Effect.flip, Effect.provide(NodeContext.layer))
        )
      ).resolves.toMatchObject({
        _tag: "ContentCatalogSnapshotError",
        cause: stage,
        stage,
      });
    }
  );
});
