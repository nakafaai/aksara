import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { Effect } from "effect";

import type { ProductionBaseIdentity } from "#cli/production/base";
import { BaseTryoutRuntimeBundleMismatchError } from "#cli/production/bundle";

/** Selects the candidate pair and any retained inverse that must be re-signed. */
export const selectTryoutRuntimeTransition = Effect.fn(
  "AksaraCli.selectTryoutRuntimeTransition"
)(function* (input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly snapshot: TryoutSnapshot | null;
}) {
  if (input.snapshot === null) {
    return null;
  }
  const baseSnapshotId = input.base?.snapshots.tryout.resultSnapshotId ?? null;
  if (baseSnapshotId === null || input.snapshot.snapshotId === baseSnapshotId) {
    return { recovery: null, result: input.snapshot };
  }
  if (input.bundle === null) {
    return yield* new BaseTryoutRuntimeBundleMismatchError({
      reason: "missing-recovery",
    });
  }
  return {
    recovery: input.bundle.payload.snapshot,
    result: input.snapshot,
  };
});
