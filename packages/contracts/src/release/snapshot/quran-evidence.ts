import { Effect, Result, Stream } from "effect";

import type { Sha256Hash } from "#contracts/ids";
import { digestQuranRows } from "#contracts/quran/snapshot/digest";
import { verifyQuranSnapshotHash } from "#contracts/quran/snapshot/hash";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowSource,
} from "#contracts/release/snapshot/evidence-requirement";

/** Selects and binds current Quran rows to the manifest identity. */
function quranRows<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>,
  snapshotId: Sha256Hash
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "quran" ? Result.succeed(row.record) : Result.failVoid
    ),
    Stream.mapEffect((record) =>
      requireSnapshotEvidence({
        actual: record.snapshotId,
        expected: snapshotId,
        family: "quran",
        field: "snapshotId",
      }).pipe(Effect.as(record))
    )
  );
}

/** Verifies all Quran row, digest, binding, and snapshot evidence. */
export const verifyQuranSnapshotRows = Effect.fn(
  "AksaraContracts.verifyQuranSnapshotRows"
)(function* <E, R>(
  snapshot: Extract<ContentSnapshotManifest, { family: "quran" }>,
  rows: SnapshotRowSource<E, R>
) {
  const summary = yield* digestQuranRows({
    activeAppLocales: snapshot.manifest.activeAppLocales,
    rows: quranRows(rows, snapshot.manifest.snapshotId),
  });
  for (const field of [
    "projectionCount",
    "projectionDigest",
    "runtimeCount",
    "runtimeDigest",
    "searchCount",
    "searchDigest",
  ] as const) {
    yield* requireSnapshotEvidence({
      actual: summary[field],
      expected: snapshot.manifest[field],
      family: "quran",
      field,
    });
  }
  const actualId = yield* verifyQuranSnapshotHash(snapshot.manifest);
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshot.manifest.snapshotId,
    family: "quran",
    field: "snapshotId",
  });
  return summary.projectionCount;
});
