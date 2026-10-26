import { Effect, Result, Stream } from "effect";

import { verifyAssessmentClosure } from "#contracts/assessment/closure";
import {
  ASSESSMENT_ROW_KINDS,
  assessmentRowCount,
  digestAssessmentRows,
  makeAssessmentSnapshot,
} from "#contracts/assessment/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  requireSnapshotEvidence,
  type SnapshotRowSource,
} from "#contracts/release/snapshot/evidence/requirement";

/** Selects the assessment records of a row stream while preserving source failures. */
function assessmentRecords<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "assessment" ? Result.succeed(row.record) : Result.failVoid
    )
  );
}

/**
 * Verifies an assessment snapshot against its rows: the hash and the order of
 * every row, the count of each kind, the digest over all of them, the closure
 * of every reference between them, and the identity of the snapshot.
 */
export const verifyAssessmentSnapshotRows = Effect.fn(
  "AksaraContracts.verifyAssessmentSnapshotRows"
)(function* <E, R>(
  snapshot: Extract<ContentSnapshotManifest, { family: "assessment" }>,
  rows: SnapshotRowSource<E, R>
) {
  const { manifest } = snapshot;
  const summary = yield* digestAssessmentRows(assessmentRecords(rows));
  for (const kind of ASSESSMENT_ROW_KINDS) {
    yield* requireSnapshotEvidence({
      actual: summary.counts[kind],
      expected: manifest.counts[kind],
      family: "assessment",
      field: `${kind}Count`,
    });
  }
  yield* requireSnapshotEvidence({
    actual: summary.rowDigest,
    expected: manifest.rowDigest,
    family: "assessment",
    field: "rowDigest",
  });
  yield* verifyAssessmentClosure({
    activeAppLocales: manifest.activeAppLocales,
    records: assessmentRecords(rows),
  });
  const { format: _format, snapshotId, ...facts } = manifest;
  const actualId = (yield* makeAssessmentSnapshot(facts)).snapshotId;
  yield* requireSnapshotEvidence({
    actual: actualId,
    expected: snapshotId,
    family: "assessment",
    field: "snapshotId",
  });
  return assessmentRowCount(summary.counts);
});
