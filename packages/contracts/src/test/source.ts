import { Effect } from "effect";
import { hash, release } from "#contracts/test/request";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

/** Builds one try-out snapshot of the Git source suite from its exam and section counts. */
function sourceSnapshot(exam: number, section: number, routeCount: number) {
  return makeTryoutSnapshot({
    activeAppLocales: release.manifest.activeAppLocales,
    catalogDigest: hash,
    counts: { country: 1, exam, section, set: 0, track: 0 },
    placementCount: 0,
    placementDigest: hash,
    routeCount,
  });
}

/** Base, result, and unrelated try-out snapshots of the Git source suite, hashed once per process. */
export const sourceTryoutSnapshots = await Effect.runPromise(
  Effect.all({
    base: sourceSnapshot(0, 0, 1),
    result: sourceSnapshot(1, 0, 2),
    unrelated: sourceSnapshot(1, 1, 3),
  })
);
