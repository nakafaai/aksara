import { Effect, Option, Stream } from "effect";

import { digestProgramRows } from "#contracts/program/snapshot/digest";
import { verifyProgramSnapshotHash } from "#contracts/program/snapshot/hash";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowFactory,
} from "#contracts/release/snapshot/evidence-requirement";

/** Selects current program rows while preserving source failures. */
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
  const summary = yield* digestProgramRows({
    activeAppLocales: snapshot.manifest.activeAppLocales,
    expected: snapshot.manifest,
    rows: programRows(rows()),
  });
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
  const actualId = yield* verifyProgramSnapshotHash(snapshot.manifest);
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshot.manifest.snapshotId,
    family: "program",
    field: "snapshotId",
  });
  return summary.rowCount;
});
