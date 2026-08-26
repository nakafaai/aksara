import { afterEach, assert, describe, it } from "@effect/vitest";
import { Deferred, Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";
import { vi } from "vitest";
import { terminateProcessGroup } from "#utilities/process/group";

afterEach(() => vi.restoreAllMocks());

/** Creates one test-owned group with short deterministic wait bounds. */
const processGroup = Effect.fn("ProcessGroupTest.make")(function* (
  pid: number
) {
  return {
    exit: yield* Deferred.make<number>(),
    grace: "1 millis",
    limit: "1 millis",
    pid,
  } as const;
});

describe("detached process group termination", () => {
  it.effect("does not signal a process that has already exited", () =>
    Effect.gen(function* () {
      const group = yield* processGroup(41_240);
      yield* Deferred.succeed(group.exit, 0);
      const kill = vi.spyOn(process, "kill");

      yield* terminateProcessGroup(group);

      assert.strictEqual(kill.mock.calls.length, 0);
    })
  );

  it.effect("stops after graceful termination completes", () =>
    Effect.gen(function* () {
      const group = yield* processGroup(41_241);
      const kill = vi.spyOn(process, "kill").mockImplementation(() => {
        Deferred.doneUnsafe(group.exit, Effect.succeed(0));
        return true;
      });

      yield* terminateProcessGroup(group);

      assert.deepStrictEqual(kill.mock.calls, [[-group.pid, "SIGTERM"]]);
    })
  );

  it.effect(
    "forces termination after a failed graceful signal and bounded wait",
    () =>
      Effect.gen(function* () {
        const group = yield* processGroup(41_242);
        const kill = vi
          .spyOn(process, "kill")
          .mockImplementation((_pid, signal) => {
            if (signal === "SIGTERM") {
              throw new Error("Process group changed before the signal.");
            }
            Deferred.doneUnsafe(group.exit, Effect.succeed(0));
            return true;
          });

        const fiber = yield* terminateProcessGroup(group).pipe(
          Effect.forkChild
        );
        yield* Effect.yieldNow;
        yield* TestClock.adjust("1 millis");
        yield* Fiber.join(fiber);

        assert.deepStrictEqual(kill.mock.calls, [
          [-group.pid, "SIGTERM"],
          [-group.pid, "SIGKILL"],
        ]);
      })
  );
});
