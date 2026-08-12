import { Effect, Option, Stream } from "effect";

import type { Sha256Hash } from "#contracts/ids";
import { digestQuranRows } from "#contracts/quran/row-digest";
import {
  hashQuranSnapshot,
  hashQuranSnapshotV3,
} from "#contracts/quran/snapshot/hash";
import { QURAN_SNAPSHOT_FORMAT } from "#contracts/quran/snapshot/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowFactory,
} from "#contracts/release/snapshot/evidence-requirement";

/** Selects and binds Quran rows to the manifest's immutable identity. */
function quranRows<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>,
  snapshotId: Sha256Hash
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "quran" ? Option.some(row.record) : Option.none()
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
  rows: SnapshotRowFactory<E, R>
) {
  const summary = yield* digestQuranRows(
    quranRows(rows(), snapshot.manifest.snapshotId)
  );
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
  const { snapshotId, ...identity } = snapshot.manifest;
  const actualId =
    identity.format === QURAN_SNAPSHOT_FORMAT
      ? yield* hashQuranSnapshot(identity)
      : yield* hashQuranSnapshotV3(identity);
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshotId,
    family: "quran",
    field: "snapshotId",
  });
  return summary.projectionCount;
});
