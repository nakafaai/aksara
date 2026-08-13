import { Effect, Option, Stream } from "effect";

import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowFactory,
} from "#contracts/release/snapshot/evidence-requirement";
import type { TryoutCatalogRecord } from "#contracts/tryout/catalog";
import { digestTryoutCatalog } from "#contracts/tryout/catalog-hash";
import { verifyTryoutLocaleClosure } from "#contracts/tryout/locale-closure";
import { digestTryoutPlacements } from "#contracts/tryout/placement-hash";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";
import type { TryoutCatalogCounts } from "#contracts/tryout/snapshot/spec";

interface TryoutCatalogEvidence {
  readonly counts: TryoutCatalogCounts;
  readonly routeCount: number;
}

/** Selects current hierarchy rows while preserving source failures. */
function currentTryoutCatalog<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "catalog"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Selects current placements while preserving source failures. */
function currentPlacements<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "placement"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Derives signed per-kind and public-route counts from catalog rows. */
function summarizeTryoutCatalog<E, R>(
  records: Stream.Stream<TryoutCatalogRecord, E, R>
) {
  const initial: TryoutCatalogEvidence = {
    counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
    routeCount: 0,
  };
  return records.pipe(
    Stream.runFold(initial, (state, { row }) => ({
      counts: {
        ...state.counts,
        [row.kind]: state.counts[row.kind] + 1,
      },
      routeCount: state.routeCount + (row.publicPath === undefined ? 0 : 1),
    }))
  );
}

/** Verifies all try-out hashes, digests, counts, routes, and identity. */
export const verifyTryoutSnapshotRows = Effect.fn(
  "AksaraContracts.verifyTryoutSnapshotRows"
)(function* <E, R>(
  snapshot: Extract<ContentSnapshotManifest, { family: "tryout" }>,
  rows: SnapshotRowFactory<E, R>
) {
  const [placementDigest, catalogDigest, catalogEvidence] = yield* Effect.all([
    digestTryoutPlacements(currentPlacements(rows())),
    digestTryoutCatalog(currentTryoutCatalog(rows())),
    summarizeTryoutCatalog(currentTryoutCatalog(rows())),
  ]);
  yield* verifyTryoutLocaleClosure({
    activeAppLocales: snapshot.manifest.activeAppLocales,
    catalog: currentTryoutCatalog(rows()),
    placements: currentPlacements(rows()),
  });
  yield* requireSnapshotEvidence({
    actual: catalogDigest.digest,
    expected: snapshot.manifest.catalogDigest,
    family: "tryout",
    field: "catalogDigest",
  });
  yield* requireSnapshotEvidence({
    actual: placementDigest.count,
    expected: snapshot.manifest.placementCount,
    family: "tryout",
    field: "placementCount",
  });
  yield* requireSnapshotEvidence({
    actual: placementDigest.digest,
    expected: snapshot.manifest.placementDigest,
    family: "tryout",
    field: "placementDigest",
  });
  for (const kind of ["country", "exam", "section", "set", "track"] as const) {
    yield* requireSnapshotEvidence({
      actual: catalogEvidence.counts[kind],
      expected: snapshot.manifest.counts[kind],
      family: "tryout",
      field: `${kind}Count`,
    });
  }
  yield* requireSnapshotEvidence({
    actual: catalogEvidence.routeCount,
    expected: snapshot.manifest.routeCount,
    family: "tryout",
    field: "routeCount",
  });
  const { format: _format, snapshotId, ...facts } = snapshot.manifest;
  const actualId = makeTryoutSnapshot(facts).snapshotId;
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshotId,
    family: "tryout",
    field: "snapshotId",
  });
  return catalogDigest.count + placementDigest.count;
});
