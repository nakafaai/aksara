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
import type { SnapshotRowSource } from "#contracts/release/snapshot/evidence/requirement";
import { requireSnapshotEvidence } from "#contracts/release/snapshot/evidence/requirement";

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

/** Rows the digest or the closure may hold ahead of the slower of the two. */
const PASS_BUFFER_CHUNKS = 2;

/**
 * Verifies an assessment snapshot against its rows: the hash and the order of
 * every row, the count of each kind, the digest over all of them, the closure
 * of every reference between them, and the identity of the snapshot. The
 * digest and the closure read one replay of the rows together, and the digest
 * evidence is reported before a closure failure.
 */
export const verifyAssessmentSnapshotRows = Effect.fn(
  "AksaraContracts.verifyAssessmentSnapshotRows"
)(function* <E, R>(
  snapshot: Extract<ContentSnapshotManifest, { family: "assessment" }>,
  rows: SnapshotRowSource<E, R>
) {
  const { manifest } = snapshot;
  const [digested, closed] = yield* Effect.scoped(
    Effect.gen(function* () {
      const [digestRecords, closureRecords] = yield* assessmentRecords(
        rows
      ).pipe(Stream.broadcastN({ capacity: PASS_BUFFER_CHUNKS, n: 2 }));
      return yield* Effect.all(
        [
          digestAssessmentRows(digestRecords),
          verifyAssessmentClosure({
            activeAppLocales: manifest.activeAppLocales,
            records: closureRecords,
          }),
        ],
        { concurrency: "unbounded", mode: "result" }
      );
    })
  );
  const summary = yield* Effect.fromResult(digested);
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
  yield* Effect.fromResult(closed);
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
