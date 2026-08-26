import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { stageRecoveryRelease } from "#publisher/publication/recovery";
import {
  makeVerificationPlan,
  provideVerificationKey,
  verificationBundle,
  verificationRollbackBundle,
} from "#test/verification";

describe("recovery verification", () => {
  it.effect("stages and verifies the signed recovery envelope", () =>
    Effect.gen(function* () {
      const state = makeVerificationPlan(
        "missing",
        {},
        verificationRollbackBundle
      );
      const result = yield* provideVerificationKey(
        stageRecoveryRelease(state.plan)
      );

      expect(result).toBeUndefined();
      expect(state.stageRecovery).toHaveBeenCalledWith(
        verificationRollbackBundle
      );
    })
  );

  it.effect("rejects a recovery identity that is already completed", () =>
    Effect.gen(function* () {
      const state = makeVerificationPlan(
        "completed",
        {},
        verificationRollbackBundle
      );
      const error = yield* provideVerificationKey(
        stageRecoveryRelease(state.plan).pipe(Effect.flip)
      );
      expect(error).toMatchObject({
        _tag: "PublicationResumePhaseError",
        phase: "completed",
      });
    })
  );

  it.effect(
    "rejects a Git-owned bundle at the recovery-only target boundary",
    () =>
      Effect.gen(function* () {
        const state = makeVerificationPlan("verified", {}, verificationBundle);
        const error = yield* provideVerificationKey(
          stageRecoveryRelease(state.plan).pipe(Effect.flip)
        );
        expect(error).toMatchObject({
          _tag: "PublicationModeMismatchError",
          manifestMode: "git",
          preparedMode: "rollback",
        });
        expect(state.stageRecovery).not.toHaveBeenCalled();
      })
  );
});
