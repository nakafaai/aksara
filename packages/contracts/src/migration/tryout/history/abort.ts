import { Effect, Schema } from "effect";

import type { TryoutHistoryMigrationStatus } from "#contracts/transport/migration/tryout/response";

type AbortableStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "aborting" | "staging" }
>;

const STAGING_ROOT_ROWS = 3;

/** Staging inventory cannot produce one safe finite abort ceiling. */
export class TryoutHistoryAbortLimitError extends Schema.TaggedError<TryoutHistoryAbortLimitError>()(
  "TryoutHistoryAbortLimitError",
  {}
) {}

/** Bounds mapping rows, owned targets, the runtime, snapshot, and root. */
export const computeTryoutHistoryAbortLimit = Effect.fn(
  "AksaraContracts.computeTryoutHistoryAbortLimit"
)(function* (status: AbortableStatus) {
  const mappingRows =
    status.artifactMapCount + status.catalogMapCount + status.placementMapCount;
  const abortLimit = 2 * mappingRows + STAGING_ROOT_ROWS;
  if (!Number.isSafeInteger(abortLimit)) {
    return yield* new TryoutHistoryAbortLimitError();
  }
  return abortLimit;
});
