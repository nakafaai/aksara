import { baseContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot";
import { contentSnapshotId } from "@nakafa/aksara-contracts/release/snapshot-data";
import {
  type VerifiedContentSnapshots,
  verifyContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot-verify";
import { Effect, Stream } from "effect";

import type { PreparedContentRelease } from "#publisher/preparation/spec";
import type { SnapshotVerificationError } from "#publisher/publication/failure";
import type { PublicationTarget } from "#publisher/publication/spec";
import {
  ReleaseVerificationMismatchError,
  validateReleaseSnapshots,
} from "#publisher/release-validation";
import { makeSnapshotBatches } from "#publisher/snapshot/batch";

type VerifyPublicationSnapshots = <E, R>(
  input: PreparedContentRelease<E, R>
) => Effect.Effect<
  VerifiedContentSnapshots,
  E | ReleaseVerificationMismatchError | SnapshotVerificationError<E, R>,
  R
>;

/** Rejects row-bearing snapshot sources on a zero-copy rollback release. */
function requireEmptyRollbackSources(manifestCount: number, rowCount: number) {
  if (manifestCount === 0 && rowCount === 0) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseVerificationMismatchError({
      message: "Rollback releases cannot stage replacement snapshot rows.",
    })
  );
}

/** Verifies replacement sources or one zero-copy rollback transition. */
export const verifyPublicationSnapshots: VerifyPublicationSnapshots = Effect.fn(
  "AksaraPublisher.verifyPublicationSnapshots"
)(function* <E, R>(input: PreparedContentRelease<E, R>) {
  let summary: VerifiedContentSnapshots;
  if (input.kind === "git") {
    summary = yield* verifyContentSnapshots({
      manifests: input.snapshotManifests,
      previousSnapshots: baseContentSnapshots(input.manifest.snapshots),
      rows: input.snapshotRows,
    });
  } else {
    const [manifestCount, rowCount] = yield* Effect.all([
      input.snapshotManifests().pipe(Stream.runCount),
      input.snapshotRows().pipe(Stream.runCount),
    ]);
    yield* requireEmptyRollbackSources(manifestCount, rowCount);
    summary = { snapshots: input.manifest.snapshots, stagedRows: 0 };
  }
  yield* validateReleaseSnapshots(input.manifest, summary);
  return summary;
});

/** Stages replacement manifests and their bounded immutable row batches. */
export const stagePublicationSnapshots = Effect.fn(
  "AksaraPublisher.stagePublicationSnapshots"
)(function* <E, R>(
  input: PreparedContentRelease<E, R>,
  target: typeof PublicationTarget.Service
) {
  yield* input.snapshotManifests().pipe(
    Stream.runForEach((snapshot) =>
      Effect.gen(function* () {
        yield* target.stageSnapshot({
          releaseId: input.manifest.releaseId,
          snapshot,
        });
        const rows = input
          .snapshotRows()
          .pipe(Stream.filter((row) => row.family === snapshot.family));
        yield* makeSnapshotBatches(
          input.manifest.releaseId,
          snapshot.family,
          contentSnapshotId(snapshot),
          rows
        ).pipe(Stream.runForEach(target.stageSnapshotBatch));
      })
    )
  );
});
