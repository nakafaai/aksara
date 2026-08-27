import type { TryoutSnapshotFacts } from "#contracts/tryout/snapshot/spec";
import { TRYOUT_SNAPSHOT_FORMAT } from "#contracts/tryout/snapshot/spec";

/** Domain separating snapshot identities from every other try-out digest. */
export const TRYOUT_SNAPSHOT_DOMAIN = "nakafa.aksara.localized-tryout-snapshot";

/** Domain separating joined row evidence from individual row digests. */
export const TRYOUT_SNAPSHOT_ROWS_DOMAIN = "nakafa.aksara.tryout-rows";

/** Serializes snapshot facts without content-addressed identity. */
export function canonicalizeTryoutSnapshot(input: TryoutSnapshotFacts) {
  return JSON.stringify({
    activeAppLocales: input.activeAppLocales,
    catalogDigest: input.catalogDigest,
    counts: input.counts,
    format: TRYOUT_SNAPSHOT_FORMAT,
    placementCount: input.placementCount,
    placementDigest: input.placementDigest,
    routeCount: input.routeCount,
  });
}
