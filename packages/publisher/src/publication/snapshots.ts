import { contentSnapshotId } from "@nakafa/aksara-contracts/release/snapshot/data";
import { baseContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  type VerifiedContentSnapshots,
  verifyContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/verify";
import type { StageOperation } from "@nakafa/aksara-contracts/transport/group";
import { Effect, Stream } from "effect";

import type { PreparedContentRelease } from "#publisher/preparation/prepared";
import type { SnapshotVerificationError } from "#publisher/publication/failure";
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

/** Rejects row-bearing sources on a row-free snapshot rollback release. */
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

/** Verifies replacement sources or one row-free snapshot rollback. */
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
      input.snapshotManifests.pipe(Stream.runCount),
      input.snapshotRows.pipe(Stream.runCount),
    ]);
    yield* requireEmptyRollbackSources(manifestCount, rowCount);
    summary = { snapshots: input.manifest.snapshots, stagedRows: 0 };
  }
  yield* validateReleaseSnapshots(input.manifest, summary);
  return summary;
});

/** Streams each replacement manifest before its transaction-safe row batches. */
export function makeSnapshotRequests<E, R>(
  input: PreparedContentRelease<E, R>
) {
  return input.snapshotManifests.pipe(
    Stream.flatMap((snapshot) => {
      const manifest: StageOperation = {
        operation: "stageSnapshot",
        releaseId: input.manifest.releaseId,
        snapshot,
      };
      const rows = input.snapshotRows.pipe(
        Stream.filter((row) => row.family === snapshot.family)
      );
      const batches = makeSnapshotBatches(
        input.manifest.releaseId,
        snapshot.family,
        contentSnapshotId(snapshot),
        rows
      ).pipe(
        Stream.map(
          (batch): StageOperation => ({
            ...batch,
            operation: "stageSnapshotBatch",
          })
        )
      );
      return Stream.concat(Stream.succeed(manifest), batches);
    })
  );
}
