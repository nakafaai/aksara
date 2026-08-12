import { Effect, Option, Stream } from "effect";

import { digestProgramRows } from "#contracts/program/row-digest";
import {
  hashProgramSnapshot,
  hashProgramSnapshotV4,
} from "#contracts/program/snapshot/hash";
import { PROGRAM_SNAPSHOT_FORMAT } from "#contracts/program/snapshot/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowFactory,
} from "#contracts/release/snapshot/evidence-requirement";

/** Selects one program row stream while preserving source failures. */
function programRows<E, R>(rows: Stream.Stream<ContentSnapshotRow, E, R>) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "program" ? Option.some(row.record) : Option.none()
    )
  );
}

/** Verifies all program row and snapshot identity evidence. */
export const verifyProgramSnapshotRows = Effect.fn(
  "AksaraContracts.verifyProgramSnapshotRows"
)(function* <E, R>(
  snapshot: Extract<ContentSnapshotManifest, { family: "program" }>,
  rows: SnapshotRowFactory<E, R>
) {
  const summary = yield* digestProgramRows(programRows(rows()));
  for (const field of [
    "curriculumRowCount",
    "programRowCount",
    "rowCount",
    "rowDigest",
    "sitemapCount",
    "slugCount",
  ] as const) {
    yield* requireSnapshotEvidence({
      actual: summary[field],
      expected: snapshot.manifest[field],
      family: "program",
      field,
    });
  }
  const { snapshotId, ...identity } = snapshot.manifest;
  const actualId =
    identity.format === PROGRAM_SNAPSHOT_FORMAT
      ? yield* hashProgramSnapshot(identity)
      : yield* hashProgramSnapshotV4(identity);
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshotId,
    family: "program",
    field: "snapshotId",
  });
  return summary.rowCount;
});
