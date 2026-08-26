import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  QuranSearchRowSchema,
  type QuranSnapshotRow,
  QuranSnapshotRowSchema,
} from "@nakafa/aksara-contracts/quran/snapshot/row";
import {
  type QuranSnapshot,
  QuranSnapshotSchema,
} from "@nakafa/aksara-contracts/quran/snapshot/spec";
import { quranSourceFileCount } from "@nakafa/aksara-contracts/quran/source";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import {
  type ContentSnapshotSet,
  inheritContentSnapshots,
  replaceContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { TryoutCountrySchema } from "@nakafa/aksara-contracts/tryout/catalog";
import {
  digestTryoutCatalog,
  makeTryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { digestTryoutPlacements } from "@nakafa/aksara-contracts/tryout/placement-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { prepareProgramSnapshot } from "@nakafa/aksara-corpus/program/snapshot";
import { Effect, Stream } from "effect";
import { materialGraph } from "#test/graph";

export interface TryoutFixture {
  readonly manifest: Extract<
    ContentSnapshotManifest,
    { readonly family: "tryout" }
  >;
  readonly rowCount: number;
  /** Replays the representative technical row used by this unit test. */
  readonly rows: Stream.Stream<ContentSnapshotRow>;
}

export interface QuranFixture {
  readonly manifest: QuranSnapshot;
  readonly rowCount: number;
  /** Replays the representative technical Quran rows used by this unit test. */
  readonly rows: Stream.Stream<QuranSnapshotRow>;
}

type ProgramPreparation = Effect.Success<
  ReturnType<typeof prepareProgramSnapshot>
>;
type ProgramFixtureError = Effect.Error<
  ReturnType<typeof prepareProgramSnapshot>
>;
type ProgramRows = ProgramPreparation["rows"];

export interface ProgramFixture {
  readonly snapshot: Extract<
    ContentSnapshotManifest,
    { readonly family: "program" }
  >;
  readonly snapshotManifests: Stream.Stream<ContentSnapshotManifest>;
  readonly snapshotRows: Stream.Stream<
    ContentSnapshotRow,
    Stream.Error<ProgramRows>,
    Stream.Services<ProgramRows>
  >;
  readonly snapshots: ContentSnapshotSet;
}

const SNAPSHOT_TEST_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Replayable empty structured sources for body-only publisher fixtures. */
export const emptySnapshotSources = {
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntimeSnapshot: null,
} as const;

/** Builds one valid technical Quran dependency fixture without corpus replay. */
export function makeQuranSnapshotFixture(): QuranFixture {
  const chunkCount = 1;
  const runtimeCount = 1 + QURAN_SURAH_COUNT + chunkCount;
  const searchCount = QURAN_SURAH_COUNT * ACTIVE_APP_LOCALES.length;
  const manifest = QuranSnapshotSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    attributionCount: 1,
    chunkCount,
    format: "localized-quran-snapshot",
    projectionCount: runtimeCount + searchCount,
    projectionDigest: SNAPSHOT_TEST_HASH,
    provenanceDigest: SNAPSHOT_TEST_HASH,
    provenanceStatus: "blocked",
    runtimeCount,
    runtimeDigest: SNAPSHOT_TEST_HASH,
    searchCount,
    searchDigest: SNAPSHOT_TEST_HASH,
    snapshotId: SNAPSHOT_TEST_HASH,
    sourceBytes: 1,
    sourceDigest: SNAPSHOT_TEST_HASH,
    sourceFileCount: quranSourceFileCount(ACTIVE_APP_LOCALES),
    surahCount: QURAN_SURAH_COUNT,
    tafsirLocales: ["id"],
    verseCount: QURAN_VERSE_COUNT,
  });
  const row = QuranSnapshotRowSchema.make({
    payload: QuranSearchRowSchema.make({
      appLocale: AppLocaleSchema.make("en"),
      graph: materialGraph(AppLocaleSchema.make("en"), "quran", "release"),
      kind: "quran-search",
      route: PublicPathSchema.make("quran/1"),
      surahNumber: 1,
      text: "Test-only Quran search text",
      title: "Test Quran Release",
    }),
    rowHash: SNAPSHOT_TEST_HASH,
    snapshotId: manifest.snapshotId,
  });
  return {
    manifest,
    rowCount: 1,
    rows: Stream.make(row),
  };
}

/** Builds one internally consistent technical try-out dependency fixture. */
export const tryoutSnapshotFixture = Effect.gen(function* () {
  const record = makeTryoutCatalogRecord(
    TryoutCountrySchema.make({
      appLocale: AppLocaleSchema.make("en"),
      countryCode: "ID",
      countryKey: "indonesia",
      graph: materialGraph(AppLocaleSchema.make("en"), "tryout", "release"),
      kind: "country",
      order: 1,
      publicPath: PublicPathSchema.make("try-out/indonesia"),
      sourceRevision: "test-release",
      title: "Test Indonesia",
    })
  );
  const [catalog, placement] = yield* Effect.all([
    digestTryoutCatalog(Stream.make(record)),
    digestTryoutPlacements(Stream.empty),
  ]);
  const counts = { country: 0, exam: 0, section: 0, set: 0, track: 0 };
  counts[record.row.kind] = 1;
  const routeCount =
    "publicPath" in record.row && record.row.publicPath !== undefined ? 1 : 0;
  const manifest = {
    family: "tryout",
    manifest: makeTryoutSnapshot({
      activeAppLocales: ACTIVE_APP_LOCALES,
      catalogDigest: catalog.digest,
      counts,
      placementCount: placement.count,
      placementDigest: placement.digest,
      routeCount,
    }),
  } satisfies TryoutFixture["manifest"];
  const row = {
    family: "tryout",
    record,
    rowKind: "catalog",
  } satisfies ContentSnapshotRow;
  return {
    manifest,
    rowCount: 1,
    rows: Stream.make(row),
  };
});

/** Builds one exact active policy for an incremental test release. */
export function snapshotPolicyBase(releaseId = "test-snapshot-policy-base") {
  return {
    baseActiveAppLocales: ACTIVE_APP_LOCALES,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    baseReleaseId: ReleaseIdSchema.make(releaseId),
    previousSnapshots: inheritContentSnapshots(null),
  } as const;
}

/** Builds one replacement from the exact source-owned program catalog. */
export const makeProgramSnapshotFixture: (
  previous?: ContentSnapshotSet
) => Effect.Effect<ProgramFixture, ProgramFixtureError> = Effect.fn(
  "AksaraPublisherTest.makeProgramSnapshotFixture"
)(function* (previous: ContentSnapshotSet = inheritContentSnapshots(null)) {
  const prepared = yield* prepareProgramSnapshot();
  const snapshot: ProgramFixture["snapshot"] = {
    family: "program",
    manifest: prepared.manifest,
  };
  const snapshots = {
    ...previous,
    program: replaceContentSnapshot({
      baseSnapshotId: previous.program.resultSnapshotId,
      resultSnapshotId: prepared.manifest.snapshotId,
      rowCount: prepared.manifest.rowCount,
      rowDigest: prepared.manifest.rowDigest,
    }),
  };
  /** Replays the exact program manifest selected by this fixture. */
  const snapshotManifests = Stream.make(snapshot);
  /** Replays exact source-owned program rows in canonical display order. */
  const snapshotRows = prepared.rows.pipe(
    Stream.map((record): ContentSnapshotRow => ({ family: "program", record }))
  );
  return { snapshot, snapshotManifests, snapshotRows, snapshots };
});
