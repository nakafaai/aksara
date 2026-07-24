import { resolve } from "node:path";
import { NodeContext } from "@effect/platform-node";
import {
  PublicPathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  type QuranSnapshotManifest,
  QuranSnapshotManifestSchema,
} from "@nakafa/aksara-contracts/quran/snapshot";
import {
  QURAN_CHUNK_COUNT,
  QURAN_LOCALES,
  QURAN_ROW_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
  QuranSearchRowSchema,
  type QuranSnapshotRow,
  QuranSnapshotRowSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import {
  ContentSnapshotSetSchema,
  inheritContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import {
  digestTryoutCatalog,
  digestTryoutPlacements,
  makeTryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/row-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot-hash";
import { TryoutCountrySchema } from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";
import { materialGraph } from "#test/graph";

const checkoutRoot = resolve(process.cwd(), "..", "..");

interface TryoutFixture {
  readonly manifest: Extract<
    ContentSnapshotManifest,
    { readonly family: "tryout" }
  >;
  readonly rowCount: number;
  /** Replays the representative technical row used by this unit test. */
  readonly rows: () => Stream.Stream<ContentSnapshotRow>;
}

interface QuranFixture {
  readonly manifest: QuranSnapshotManifest;
  readonly rowCount: number;
  /** Replays the representative technical Quran rows used by this unit test. */
  readonly rows: () => Stream.Stream<QuranSnapshotRow>;
}

const testHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const quranState = vi.hoisted((): { current: QuranFixture | undefined } => ({
  current: undefined,
}));
const tryoutState = vi.hoisted((): { current: TryoutFixture | undefined } => ({
  current: undefined,
}));

vi.mock("@nakafa/aksara-corpus/quran/snapshot", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    prepareQuranSnapshot: () =>
      quranState.current === undefined
        ? RuntimeEffect.dieMessage("Expected a configured Quran snapshot.")
        : RuntimeEffect.succeed(quranState.current),
  };
});

vi.mock("#publisher/tryout/snapshot", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    prepareTryoutSnapshot: () =>
      tryoutState.current === undefined
        ? RuntimeEffect.dieMessage("Expected a configured try-out snapshot.")
        : RuntimeEffect.succeed(tryoutState.current),
  };
});

/** Builds one valid technical Quran dependency fixture without corpus replay. */
function makeQuranFixture(): QuranFixture {
  const runtimeCount = QURAN_SURAH_COUNT + QURAN_CHUNK_COUNT;
  const manifest = QuranSnapshotManifestSchema.make({
    chunkCount: QURAN_CHUNK_COUNT,
    format: QURAN_SNAPSHOT_FORMAT,
    locales: QURAN_LOCALES,
    projectionCount: QURAN_ROW_COUNT,
    projectionDigest: testHash,
    provenanceDigest: testHash,
    provenanceStatus: "blocked",
    runtimeCount,
    runtimeDigest: testHash,
    searchCount: QURAN_SEARCH_COUNT,
    searchDigest: testHash,
    snapshotId: testHash,
    sourceBytes: 1,
    sourceDigest: testHash,
    surahCount: QURAN_SURAH_COUNT,
    tafsirLocales: QURAN_TAFSIR_LOCALES,
    verseCount: QURAN_VERSE_COUNT,
  });
  const row = QuranSnapshotRowSchema.make({
    payload: QuranSearchRowSchema.make({
      description: "Test-only release orchestration row",
      graph: materialGraph("en", "quran", "release"),
      kind: "quran-search",
      locale: "en",
      route: PublicPathSchema.make("quran/1"),
      surahNumber: 1,
      text: "Test-only Quran search text",
      title: "Test Quran Release",
    }),
    rowHash: testHash,
    snapshotId: manifest.snapshotId,
  });
  const rows = [row];
  return {
    manifest,
    rowCount: rows.length,
    rows: () => Stream.fromIterable(rows),
  };
}

/** Builds one internally consistent technical try-out dependency fixture. */
async function makeTryoutFixture(): Promise<TryoutFixture> {
  const record = makeTryoutCatalogRecord(
    TryoutCountrySchema.make({
      countryCode: "ID",
      countryKey: "indonesia",
      graph: materialGraph("en", "tryout", "release"),
      kind: "country",
      locale: "en",
      publicPath: PublicPathSchema.make("try-out/indonesia"),
      sourceRevision: "test-release-v1",
      title: "Test Indonesia",
    })
  );
  const [catalog, placement] = await Effect.runPromise(
    Effect.all([
      digestTryoutCatalog(Stream.make(record)),
      digestTryoutPlacements(Stream.empty),
    ])
  );
  const counts = { country: 0, exam: 0, section: 0, set: 0, track: 0 };
  counts[record.row.kind] = 1;
  const routeCount =
    "publicPath" in record.row && record.row.publicPath !== undefined ? 1 : 0;
  const manifest = {
    family: "tryout",
    manifest: makeTryoutSnapshot({
      catalogDigest: catalog.digest,
      counts,
      format: "tryout-v1",
      locales: ["en", "id"],
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
  const rows = [row];
  return {
    manifest,
    rowCount: rows.length,
    rows: () => Stream.fromIterable(rows),
  };
}

/** Runs snapshot preparation and collects both replayable outputs. */
function prepare(
  previousSnapshots: Parameters<
    typeof prepareReleaseSnapshots
  >[0]["previousSnapshots"]
) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareReleaseSnapshots({
          checkoutRoot,
          previousSnapshots,
          questionHeads: () => Stream.empty,
          rendererManifest: {},
        });
        const [manifests, rows] = yield* Effect.all([
          prepared.manifests().pipe(Stream.runCollect),
          prepared.rows().pipe(Stream.runCollect),
        ]);
        return { manifests: [...manifests], rows: [...rows] };
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Requires the complete canonical family sequence used by these assertions. */
function requireCompleteManifests(
  manifests: readonly ContentSnapshotManifest[]
) {
  const [program, quran, tryout] = manifests;
  if (
    !(
      program?.family === "program" &&
      quran?.family === "quran" &&
      tryout?.family === "tryout"
    )
  ) {
    throw new Error("Expected every structured snapshot manifest.");
  }
  return { program, quran, tryout };
}

const quranFixture = makeQuranFixture();
const tryoutFixture = await makeTryoutFixture();
quranState.current = quranFixture;
tryoutState.current = tryoutFixture;

describe("release snapshot preparation", () => {
  it("stages every changed snapshot and row in canonical family order", async () => {
    const prepared = await prepare(null);
    const { program, quran } = requireCompleteManifests(prepared.manifests);
    const programRowCount = program.manifest.rowCount;
    const quranRowCount = quranFixture.rowCount;

    expect(prepared.manifests.map(({ family }) => family)).toEqual([
      "program",
      "quran",
      "tryout",
    ]);
    const programRows = prepared.rows.slice(0, programRowCount);
    const quranRows = prepared.rows.slice(
      programRowCount,
      programRowCount + quranRowCount
    );
    const tryoutRows = prepared.rows.slice(programRowCount + quranRowCount);
    expect(programRows).toHaveLength(program.manifest.rowCount);
    expect(programRows.every(({ family }) => family === "program")).toBe(true);
    expect(quranRows).toHaveLength(quranRowCount);
    expect(quranRows.every(({ family }) => family === "quran")).toBe(true);
    expect(tryoutRows).toHaveLength(tryoutFixture.rowCount);
    expect(tryoutRows.every(({ family }) => family === "tryout")).toBe(true);
    expect(quran).toMatchObject({
      family: "quran",
      manifest: { provenanceStatus: "blocked" },
    });
  });

  it("inherits exact active snapshot identities without restaging rows", async () => {
    const initial = await prepare(null);
    const { program, quran, tryout } = requireCompleteManifests(
      initial.manifests
    );
    const previous = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(program.manifest.snapshotId),
      quran: inheritContentSnapshot(quran.manifest.snapshotId),
      tryout: inheritContentSnapshot(tryout.manifest.snapshotId),
    });
    const prepared = await prepare(previous);

    expect(prepared).toEqual({ manifests: [], rows: [] });
  });

  it("streams rows only for a family whose active identity changed", async () => {
    const initial = await prepare(null);
    const { program, quran, tryout } = requireCompleteManifests(
      initial.manifests
    );
    const previous = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(program.manifest.snapshotId),
      quran: inheritContentSnapshot(null),
      tryout: inheritContentSnapshot(tryout.manifest.snapshotId),
    });
    const prepared = await prepare(previous);

    expect(prepared.manifests).toEqual([quran]);
    expect(prepared.rows).toHaveLength(quranFixture.rowCount);
    expect(prepared.rows.every(({ family }) => family === "quran")).toBe(true);
  });
});
