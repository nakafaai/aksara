import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseCurrent,
  StagedRollbackContentRelease,
} from "@nakafa/aksara-contracts/release/current";
import { Effect, Schema } from "effect";

/** Operator identities do not select the exact retained inverse state. */
export class RetainedRecoveryStateError extends Schema.TaggedError<RetainedRecoveryStateError>()(
  "RetainedRecoveryStateError",
  {
    reason: Schema.Literal("active", "missing", "phase", "recovery"),
    releaseId: ReleaseIdSchema,
  }
) {}

/** Exact active and inverse identities required by a terminal operator command. */
export interface RetainedRecoveryInput {
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
}

/** Selects one retained inverse without accepting a stale operator identity. */
export function selectRetainedRecovery(
  current: ContentReleaseCurrent,
  input: RetainedRecoveryInput,
  allowAborting: boolean
): Effect.Effect<StagedRollbackContentRelease, RetainedRecoveryStateError> {
  if (current.active?.release.manifest.releaseId !== input.releaseId) {
    return Effect.fail(
      new RetainedRecoveryStateError({
        reason: "active",
        releaseId: input.releaseId,
      })
    );
  }
  const { recovery } = current;
  if (recovery === null) {
    return Effect.fail(
      new RetainedRecoveryStateError({
        reason: "missing",
        releaseId: input.releaseId,
      })
    );
  }
  if (recovery.release.manifest.releaseId !== input.recoveryId) {
    return Effect.fail(
      new RetainedRecoveryStateError({
        reason: "recovery",
        releaseId: input.releaseId,
      })
    );
  }
  const validPhase =
    recovery.phase === "verified" ||
    (allowAborting && recovery.phase === "aborting");
  if (!validPhase) {
    return Effect.fail(
      new RetainedRecoveryStateError({
        reason: "phase",
        releaseId: input.releaseId,
      })
    );
  }
  return Effect.succeed(recovery);
}
