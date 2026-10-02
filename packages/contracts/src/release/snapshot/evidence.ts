import { Effect } from "effect";

import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import { verifyProgramSnapshotRows } from "#contracts/release/snapshot/evidence/program";
import { verifyQuranSnapshotRows } from "#contracts/release/snapshot/evidence/quran";
import type { SnapshotRowSource } from "#contracts/release/snapshot/evidence/requirement";
import { verifyTryoutSnapshotRows } from "#contracts/release/snapshot/evidence/tryout";

/** Authenticates one replacement manifest through fresh structured-row replays. */
export const verifySnapshotRows = Effect.fn(
  "AksaraContracts.verifySnapshotRows"
)(function* <E, R>(
  snapshot: ContentSnapshotManifest,
  rows: SnapshotRowSource<E, R>
) {
  if (snapshot.family === "program") {
    return yield* verifyProgramSnapshotRows(snapshot, rows);
  }
  if (snapshot.family === "quran") {
    return yield* verifyQuranSnapshotRows(snapshot, rows);
  }
  return yield* verifyTryoutSnapshotRows(snapshot, rows);
});
