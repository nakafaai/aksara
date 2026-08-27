import { Effect, Schema } from "effect";

import type { TryoutHistoryMigrationPlanPayload } from "#contracts/migration/tryout/history/spec";

/** Signed migration counts cannot produce one safe finite cleanup ceiling. */
export class TryoutHistoryCleanupLimitError extends Schema.TaggedError<TryoutHistoryCleanupLimitError>()(
  "TryoutHistoryCleanupLimitError",
  {}
) {}

/** Derives the maximum rows one complete retained-history cleanup can delete. */
export const computeTryoutHistoryCleanupLimit = Effect.fn(
  "AksaraContracts.computeTryoutHistoryCleanupLimit"
)(function* (payload: TryoutHistoryMigrationPlanPayload) {
  const { source, target } = payload;
  const sourceRows =
    2 * source.catalogRowCount +
    2 * source.placementRowCount +
    source.legacyBundleCount +
    source.runtimeBundleCount +
    1;
  const scaleRows =
    source.scales.itemCount +
    source.scales.runCount +
    source.scales.versionCount;
  const temporaryRows =
    source.attempts.attemptCount +
    2 * target.artifacts.count +
    target.catalog.count +
    target.placements.count +
    source.scales.versionCount +
    1;
  const cleanupLimit = sourceRows + scaleRows + temporaryRows;
  if (!Number.isSafeInteger(cleanupLimit)) {
    return yield* new TryoutHistoryCleanupLimitError();
  }
  return cleanupLimit;
});
