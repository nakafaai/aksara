import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect } from "effect";

import {
  PreparedTryoutRuntimeMissingError,
  PreparedTryoutRuntimeSnapshotError,
  PreparedTryoutRuntimeTransitionError,
} from "#publisher/preparation/errors";
import type { PreparedTryoutRuntimeTransition } from "#publisher/preparation/prepared";

/** Validates the candidate pair and any distinct retained inverse. */
export const validatePreparedTryoutRuntime = Effect.fn(
  "AksaraPublisher.validatePreparedTryoutRuntime"
)(function* (input: {
  readonly previousSnapshots: ContentSnapshotSet | null;
  readonly runtime: PreparedTryoutRuntimeTransition | null;
  readonly snapshots: ContentSnapshotSet;
}) {
  const { runtime } = input;
  if (runtime === null) {
    if (input.snapshots.tryout.mode === "replace") {
      return yield* new PreparedTryoutRuntimeMissingError();
    }
    return;
  }
  if (runtime.result.snapshotId !== input.snapshots.tryout.resultSnapshotId) {
    return yield* new PreparedTryoutRuntimeSnapshotError({
      actualSnapshotId: runtime.result.snapshotId,
      expectedSnapshotId: input.snapshots.tryout.resultSnapshotId,
    });
  }
  const recoverySnapshotId =
    input.previousSnapshots?.tryout.resultSnapshotId ?? null;
  if (
    runtime.recovery !== null &&
    runtime.recovery.snapshotId !== recoverySnapshotId
  ) {
    return yield* new PreparedTryoutRuntimeSnapshotError({
      actualSnapshotId: runtime.recovery.snapshotId,
      expectedSnapshotId: recoverySnapshotId,
    });
  }
  if (
    runtime.recovery !== null &&
    runtime.result.snapshotId === runtime.recovery.snapshotId
  ) {
    return yield* new PreparedTryoutRuntimeTransitionError({
      snapshotId: runtime.recovery.snapshotId,
    });
  }
});
