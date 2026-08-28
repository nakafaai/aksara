import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { Effect } from "effect";

import type { ProductionBaseIdentity } from "#cli/production/base";
import { BaseTryoutRuntimeMismatchError } from "#cli/production/bundle";

/** Selects the candidate pair and any retained inverse that must be re-signed. */
export const selectTryoutRuntimeTransition = Effect.fn(
  "AksaraCli.selectTryoutRuntimeTransition"
)(function* (input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly recovery: TryoutSnapshot | null;
  readonly snapshot: TryoutSnapshot | null;
}) {
  if (input.recovery !== null && input.bundle !== null) {
    return yield* new BaseTryoutRuntimeMismatchError({
      reason: "unexpected-recovery",
    });
  }
  if (input.snapshot === null) {
    if (input.recovery !== null) {
      return yield* new BaseTryoutRuntimeMismatchError({
        reason: "unexpected-recovery",
      });
    }
    return null;
  }
  const baseSnapshotId = input.base?.snapshots.tryout.resultSnapshotId ?? null;
  if (baseSnapshotId === null || input.snapshot.snapshotId === baseSnapshotId) {
    if (input.recovery !== null) {
      return yield* new BaseTryoutRuntimeMismatchError({
        reason: "unexpected-recovery",
      });
    }
    return { recovery: null, result: input.snapshot };
  }
  const recovery = input.bundle?.payload.snapshot ?? input.recovery;
  if (recovery === null) {
    return yield* new BaseTryoutRuntimeMismatchError({
      reason: "missing-recovery",
    });
  }
  if (recovery.snapshotId !== baseSnapshotId) {
    return yield* new BaseTryoutRuntimeMismatchError({ reason: "snapshot" });
  }
  return {
    recovery,
    result: input.snapshot,
  };
});
