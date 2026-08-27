import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { selectRetainedRecovery } from "#publisher/retention";
import { makeTarget } from "#test/lifecycle/spec";
import { makeRelease } from "#test/publication";
import { publish } from "#test/publication/run";

/** Publishes one isolated release and returns its exact retained inverse state. */
const makeRetentionFixture = Effect.fn("publisher.retention.testFixture")(
  function* () {
    const prepared = yield* Effect.tryPromise(() =>
      makeRelease("test-retention")
    );
    const state = makeTarget(prepared);
    yield* publish(prepared, state.target);
    const current = yield* state.target.current;
    if (!(current.active && current.recovery)) {
      return yield* Effect.die(
        "Expected a published release with retained recovery."
      );
    }
    return {
      current,
      input: {
        recoveryId: current.recovery.release.manifest.releaseId,
        releaseId: current.active.release.manifest.releaseId,
      },
      recovery: current.recovery,
    };
  }
);

/** Returns one retained-state selection failure through the Effect error channel. */
function reject(
  selected: Parameters<typeof selectRetainedRecovery>[0],
  selectedInput: Parameters<typeof selectRetainedRecovery>[1],
  allowAborting = false
) {
  return selectRetainedRecovery(selected, selectedInput, allowAborting).pipe(
    Effect.flip
  );
}

describe("selectRetainedRecovery", () => {
  it.effect("selects the exact verified inverse", () =>
    Effect.gen(function* () {
      const { current, input, recovery } = yield* makeRetentionFixture();

      expect(yield* selectRetainedRecovery(current, input, false)).toEqual(
        recovery
      );
    })
  );

  it.effect("allows an aborting inverse only for acceptance cleanup", () =>
    Effect.gen(function* () {
      const { current, input, recovery } = yield* makeRetentionFixture();
      const aborting = {
        ...current,
        recovery: { ...recovery, phase: "aborting" as const },
      };

      expect(yield* selectRetainedRecovery(aborting, input, true)).toEqual(
        aborting.recovery
      );
      expect(yield* reject(aborting, input)).toMatchObject({
        _tag: "RetainedRecoveryStateError",
        reason: "phase",
      });
    })
  );

  it.effect.each(["active", "missing", "recovery", "phase"] as const)(
    "rejects a mismatched %s selection",
    (reason) =>
      Effect.gen(function* () {
        const { current, input, recovery } = yield* makeRetentionFixture();
        let selected: Parameters<typeof selectRetainedRecovery>[0] = current;
        let selectedInput: Parameters<typeof selectRetainedRecovery>[1] = input;

        if (reason === "active") {
          selectedInput = {
            ...input,
            releaseId: ReleaseIdSchema.make("test-other-active"),
          };
        }
        if (reason === "missing") {
          selected = { ...current, recovery: null };
        }
        if (reason === "recovery") {
          selectedInput = {
            ...input,
            recoveryId: ReleaseIdSchema.make("test-other-recovery"),
          };
        }
        if (reason === "phase") {
          selected = {
            ...current,
            recovery: { ...recovery, phase: "staging" as const },
          };
        }

        expect(yield* reject(selected, selectedInput)).toMatchObject({
          _tag: "RetainedRecoveryStateError",
          reason,
          releaseId: selectedInput.releaseId,
        });
      })
  );
});
