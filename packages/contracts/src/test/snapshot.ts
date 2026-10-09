import { Array as Arr, Effect, Number as Num, Order, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { digestProgramRows } from "#contracts/program/snapshot/digest";
import { makeProgramSnapshot } from "#contracts/program/snapshot/hash";
import { digestQuranRows } from "#contracts/quran/snapshot/digest";
import { makeQuranSnapshot } from "#contracts/quran/snapshot/hash";
import { bindQuranRow } from "#contracts/quran/snapshot/row/hash";
import { quranSourceFileCount } from "#contracts/quran/source";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import { makeProgramTestRecords } from "#contracts/test/program";
import { quranTestPayloads } from "#contracts/test/quran";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import {
  compareTryoutCatalog,
  digestTryoutCatalog,
} from "#contracts/tryout/hash/catalog";
import { digestTryoutPlacements } from "#contracts/tryout/hash/placement";
import { compareTryoutPlacements } from "#contracts/tryout/identity";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

const sourceDigest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const provisionalQuranId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Counts hierarchy rows without hardcoding a corpus inventory. */
function tryoutCounts(rows: ReturnType<typeof makeTryoutTestRows>["catalog"]) {
  return {
    country: Arr.filter(rows, ({ row }) => row.kind === "country").length,
    exam: Arr.filter(rows, ({ row }) => row.kind === "exam").length,
    section: Arr.filter(rows, ({ row }) => row.kind === "section").length,
    set: Arr.filter(rows, ({ row }) => row.kind === "set").length,
    track: Arr.filter(rows, ({ row }) => row.kind === "track").length,
  };
}

/** Prepares complete current structured snapshot fixtures for all families. */
export const makeSnapshotTestData = Effect.fn(
  "AksaraContracts.makeSnapshotTestData"
)(function* () {
  const programRecords = yield* makeProgramTestRecords();
  const programSummary = yield* digestProgramRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    rows: Stream.fromIterable(programRecords),
  });
  const programManifest = yield* makeProgramSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    ...programSummary,
  });

  const quranPayloads = quranTestPayloads();
  const provisionalQuranRecords = yield* Effect.forEach(
    quranPayloads,
    (payload) => bindQuranRow(provisionalQuranId, payload)
  );
  const quranSummary = yield* digestQuranRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    rows: Stream.fromIterable(provisionalQuranRecords),
  });
  const quranManifest = yield* makeQuranSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    provenanceDigest: sourceDigest,
    provenanceStatus: "blocked",
    sourceBytes: 13_030_246,
    sourceDigest,
    sourceFileCount: quranSourceFileCount(ACTIVE_APP_LOCALES),
    surahCount: 114,
    tafsirLocales: ["id"],
    verseCount: 6236,
    ...quranSummary,
  });
  const quranRecords = yield* Effect.forEach(quranPayloads, (payload) =>
    bindQuranRow(quranManifest.snapshotId, payload)
  );

  const tryout = makeTryoutTestRows();
  const catalog = Arr.sort(
    tryout.catalog,
    Order.make<(typeof tryout.catalog)[number]>((left, right) =>
      Num.sign(compareTryoutCatalog(left.row, right.row))
    )
  );
  const placements = Arr.sort(
    tryout.placements,
    Order.make<(typeof tryout.placements)[number]>((left, right) =>
      Num.sign(compareTryoutPlacements(left.row, right.row))
    )
  );
  const [catalogSummary, placementSummary] = yield* Effect.all([
    digestTryoutCatalog(Stream.fromIterable(catalog)),
    digestTryoutPlacements(Stream.fromIterable(placements)),
  ]);
  const tryoutManifest = makeTryoutSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    catalogDigest: catalogSummary.digest,
    counts: tryoutCounts(tryout.catalog),
    placementCount: placementSummary.count,
    placementDigest: placementSummary.digest,
    routeCount: Arr.filter(
      tryout.catalog,
      ({ row }) => "publicPath" in row && row.publicPath !== undefined
    ).length,
  });

  const manifests: readonly ContentSnapshotManifest[] = [
    { family: "program", manifest: programManifest },
    { family: "quran", manifest: quranManifest },
    { family: "tryout", manifest: tryoutManifest },
  ];
  const rows: readonly ContentSnapshotRow[] = [
    ...Arr.map(
      programRecords,
      (record) => ({ family: "program", record }) as const
    ),
    ...Arr.map(
      quranRecords,
      (record) => ({ family: "quran", record }) as const
    ),
    ...Arr.map(
      catalog,
      (record) => ({ family: "tryout", record, rowKind: "catalog" }) as const
    ),
    ...Arr.map(
      placements,
      (record) => ({ family: "tryout", record, rowKind: "placement" }) as const
    ),
  ];
  return { manifests, rows };
});
