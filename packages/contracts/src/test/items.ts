import { compareContentHeads } from "#contracts/content";
import type { ReleaseId } from "#contracts/ids";
import {
  type ContentChange,
  ContentReleaseItemSchema,
} from "#contracts/release/spec";

/** Builds canonically ordered release items with deterministic indexes. */
export function makeReleaseItems(
  releaseId: ReleaseId,
  changes: readonly ContentChange[]
) {
  return [...changes]
    .sort(compareContentHeads)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId })
    );
}
