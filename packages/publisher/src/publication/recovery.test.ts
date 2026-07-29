import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { stageRecoveryRelease } from "#publisher/publication/recovery";
import {
  makeVerificationPlan,
  runVerification,
  verificationBundle,
  verificationRollbackBundle,
} from "#test/verification";

describe("recovery verification", () => {
  it("stages and verifies the signed recovery envelope", async () => {
    const state = makeVerificationPlan(
      "missing",
      {},
      verificationRollbackBundle
    );
    await expect(
      runVerification(stageRecoveryRelease(state.plan))
    ).resolves.toBeUndefined();
    expect(state.stageRecovery).toHaveBeenCalledWith(
      verificationRollbackBundle
    );
  });

  it("rejects a recovery identity that is already completed", async () => {
    const state = makeVerificationPlan(
      "completed",
      {},
      verificationRollbackBundle
    );
    const error = await runVerification(
      stageRecoveryRelease(state.plan).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationResumePhaseError",
      phase: "completed",
    });
  });

  it("rejects a Git-owned bundle at the recovery-only target boundary", async () => {
    const state = makeVerificationPlan("verified", {}, verificationBundle);
    const error = await runVerification(
      stageRecoveryRelease(state.plan).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationModeMismatchError",
      manifestMode: "git",
      preparedMode: "rollback",
    });
    expect(state.stageRecovery).not.toHaveBeenCalled();
  });
});
