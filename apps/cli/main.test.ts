import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { makeMainProgram } from "#cli/main";

const runtime = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@effect/platform-node", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node")>();
  return {
    ...platform,
    NodeRuntime: {
      ...platform.NodeRuntime,
      runMain: vi.fn(() => {
        runtime.calls += 1;
      }),
    },
  };
});

describe("CLI main boundary", () => {
  it("hands one real composed program to the Node runtime", async () => {
    expect(runtime.calls).toBe(1);

    const failure = await Effect.runPromise(
      makeMainProgram({ args: [], cwd: process.cwd() }).pipe(Effect.flip)
    );

    expect(failure).toMatchObject({
      _tag: "PreviewArgumentsError",
      reason: "missing",
    });
  });
});
