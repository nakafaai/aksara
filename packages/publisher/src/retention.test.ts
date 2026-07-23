import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { selectRetainedRecovery } from "#publisher/retention";
import { makeTarget } from "#test/lifecycle";
import { makeRelease } from "#test/publication";
import { publish } from "#test/publication/run";

const prepared = await makeRelease("test-retention");
const state = makeTarget(prepared);
await Effect.runPromise(publish(prepared, state.target));
const current = await Effect.runPromise(state.target.current());
const [active, recovery] = await Effect.runPromise(
  Effect.gen(function* () {
    if (!(current.active && current.recovery)) {
      return yield* Effect.die(
        "Expected a published release with retained recovery."
      );
    }
    return [current.active, current.recovery] as const;
  })
);
const input = {
  recoveryId: recovery.release.manifest.releaseId,
  releaseId: active.release.manifest.releaseId,
};

/** Returns one retained-state selection failure without a FiberFailure wrapper. */
function reject(
  selected: Parameters<typeof selectRetainedRecovery>[0],
  selectedInput = input,
  allowAborting = false
) {
  return Effect.runPromise(
    selectRetainedRecovery(selected, selectedInput, allowAborting).pipe(
      Effect.flip
    )
  );
}

describe("selectRetainedRecovery", () => {
  it("selects the exact verified inverse", async () => {
    await expect(
      Effect.runPromise(selectRetainedRecovery(current, input, false))
    ).resolves.toEqual(recovery);
  });

  it("allows an aborting inverse only for acceptance cleanup", async () => {
    const aborting = {
      ...current,
      recovery: { ...recovery, phase: "aborting" as const },
    };
    await expect(
      Effect.runPromise(selectRetainedRecovery(aborting, input, true))
    ).resolves.toEqual(aborting.recovery);
    await expect(reject(aborting)).resolves.toMatchObject({
      _tag: "RetainedRecoveryStateError",
      reason: "phase",
    });
  });

  it.each([
    [
      "active",
      current,
      { ...input, releaseId: ReleaseIdSchema.make("test-other-active") },
    ],
    ["missing", { ...current, recovery: null }, input],
    [
      "recovery",
      current,
      { ...input, recoveryId: ReleaseIdSchema.make("test-other-recovery") },
    ],
    [
      "phase",
      { ...current, recovery: { ...recovery, phase: "staging" as const } },
      input,
    ],
  ] as const)(
    "rejects a mismatched %s selection",
    async (reason, value, selectedInput) => {
      await expect(reject(value, selectedInput)).resolves.toMatchObject({
        _tag: "RetainedRecoveryStateError",
        reason,
        releaseId: selectedInput.releaseId,
      });
    }
  );
});
