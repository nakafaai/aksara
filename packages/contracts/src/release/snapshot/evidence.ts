import { Effect } from "effect";

import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import type { SnapshotRowFactory } from "#contracts/release/snapshot/evidence-requirement";
import { verifyProgramSnapshotRows } from "#contracts/release/snapshot/program-evidence";
import { verifyQuranSnapshotRows } from "#contracts/release/snapshot/quran-evidence";
import { verifyTryoutSnapshotRows } from "#contracts/release/snapshot/tryout-evidence";

/** Authenticates one replacement manifest through fresh structured-row replays. */
export const verifySnapshotRows = Effect.fn(
  "AksaraContracts.verifySnapshotRows"
)(function* <E, R>(
  snapshot: ContentSnapshotManifest,
  rows: SnapshotRowFactory<E, R>
) {
  if (snapshot.family === "program") {
    return yield* verifyProgramSnapshotRows(snapshot, rows);
  }
  if (snapshot.family === "quran") {
    return yield* verifyQuranSnapshotRows(snapshot, rows);
  }
  return yield* verifyTryoutSnapshotRows(snapshot, rows);
});
