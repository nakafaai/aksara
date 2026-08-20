import { afterEach, describe, expect, it } from "@nakafa/testing/effect";
import { Deferred, Effect } from "effect";
import { vi } from "vitest";
import { terminateProcessGroup } from "#utilities/process/group";

afterEach(() => vi.restoreAllMocks());

/** Creates one test-owned group with short deterministic wait bounds. */
async function processGroup(pid: number) {
  return {
    exit: await Effect.runPromise(Deferred.make<number>()),
    grace: "1 millis",
    limit: "1 millis",
    pid,
  } as const;
}

describe("detached process group termination", () => {
  it("does not signal a process that has already exited", async () => {
    const group = await processGroup(41_240);
    await Effect.runPromise(Deferred.succeed(group.exit, 0));
    const kill = vi.spyOn(process, "kill");

    await Effect.runPromise(terminateProcessGroup(group));

    expect(kill).not.toHaveBeenCalled();
  });

  it("stops after graceful termination completes", async () => {
    const group = await processGroup(41_241);
    const kill = vi.spyOn(process, "kill").mockImplementation(() => {
      Deferred.doneUnsafe(group.exit, Effect.succeed(0));
      return true;
    });

    await Effect.runPromise(terminateProcessGroup(group));

    expect(kill).toHaveBeenCalledExactlyOnceWith(-group.pid, "SIGTERM");
  });

  it("forces termination after a failed graceful signal and bounded wait", async () => {
    const group = await processGroup(41_242);
    const kill = vi
      .spyOn(process, "kill")
      .mockImplementation((_pid, signal) => {
        if (signal === "SIGTERM") {
          throw new Error("Process group changed before the signal.");
        }
        Deferred.doneUnsafe(group.exit, Effect.succeed(0));
        return true;
      });

    await Effect.runPromise(terminateProcessGroup(group));

    expect(kill.mock.calls).toEqual([
      [-group.pid, "SIGTERM"],
      [-group.pid, "SIGKILL"],
    ]);
  });
});
