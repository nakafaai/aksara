import { NodeServices } from "@effect/platform-node";
import { beforeEach, describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { ProgramSnapshotSchema } from "@nakafa/aksara-contracts/program/snapshot/spec";
import { QuranSnapshotSchema } from "@nakafa/aksara-contracts/quran/snapshot/spec";
import { quranSourceFileCount } from "@nakafa/aksara-contracts/quran/source";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect, Stream } from "effect";
import { vi } from "vitest";
import { validateCatalogSnapshots } from "#publisher/catalog/snapshots";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const quranChunkCount = 1;
const quranRuntimeCount =
  QURAN_ATTRIBUTION_COUNT + QURAN_SURAH_COUNT + quranChunkCount;
const quranSearchCount = QURAN_SURAH_COUNT * ACTIVE_APP_LOCALES.length;
const quranProjectionCount = quranRuntimeCount + quranSearchCount;
const programManifest = ProgramSnapshotSchema.make({
  activeAppLocales: ACTIVE_APP_LOCALES,
  curriculumRowCount: 585,
  format: "localized-program-snapshot",
  programRowCount: 6,
  rowCount: 591,
  rowDigest: hash,
  sitemapCount: 78,
  slugCount: 18,
  snapshotId: hash,
});
const quranManifest = QuranSnapshotSchema.make({
  activeAppLocales: ACTIVE_APP_LOCALES,
  attributionCount: QURAN_ATTRIBUTION_COUNT,
  chunkCount: quranChunkCount,
  format: "localized-quran-snapshot",
  projectionCount: quranProjectionCount,
  projectionDigest: hash,
  provenanceDigest: hash,
  provenanceStatus: "blocked",
  runtimeCount: quranRuntimeCount,
  runtimeDigest: hash,
  searchCount: quranSearchCount,
  searchDigest: hash,
  snapshotId: hash,
  sourceBytes: 1,
  sourceDigest: hash,
  sourceFileCount: quranSourceFileCount(ACTIVE_APP_LOCALES),
  surahCount: QURAN_SURAH_COUNT,
  tafsirLocales: ["id"],
  verseCount: QURAN_VERSE_COUNT,
});
const tryoutManifest = makeTryoutSnapshot({
  activeAppLocales: ACTIVE_APP_LOCALES,
  catalogDigest: hash,
  counts: { country: 2, exam: 2, section: 4, set: 2, track: 2 },
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
            manifests: control.decodeFailure
              ? TestStream.fail("decode")
              : TestStream.fromIterable(control.manifests),
            rows: TestStream.empty,
          }),
  };
});

vi.mock(
  "@nakafa/aksara-contracts/release/snapshot/verify",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/release/snapshot/verify")
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
        questionHeads: Stream.empty,
        rendererManifest: {},
      })
    ).pipe(Effect.provide(NodeServices.layer))
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
        searchCount: quranSearchCount,
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
              questionHeads: Stream.empty,
              rendererManifest: {},
            })
          ).pipe(Effect.flip, Effect.provide(NodeServices.layer))
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
              questionHeads: Stream.empty,
              rendererManifest: {},
            })
          ).pipe(Effect.flip, Effect.provide(NodeServices.layer))
        )
      ).resolves.toMatchObject({
        _tag: "ContentCatalogSnapshotError",
        cause: stage,
        stage,
      });
    }
  );
});
