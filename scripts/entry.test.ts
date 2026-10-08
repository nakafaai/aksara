import { afterEach, assert, describe, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import { runEntry } from "#scripts/entry";

const runtime = vi.hoisted(() => ({
  runMain: vi.fn<(program: Effect.Effect<unknown, unknown>) => void>(),
}));

vi.mock("@effect/platform-node", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node")>();
  return {
    ...platform,
    NodeRuntime: { ...platform.NodeRuntime, runMain: runtime.runMain },
  };
});

afterEach(() => {
  runtime.runMain.mockReset();
});

describe("script entry", () => {
  it.effect("leaves an imported module inert", () =>
    Effect.sync(() => {
      runEntry(false, Effect.die("An imported module must not run."));
      assert.strictEqual(runtime.runMain.mock.calls.length, 0);
    })
  );

  it.effect("runs the program as the Node main with Node services", () =>
    Effect.gen(function* () {
      runEntry(
        true,
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          return yield* fileSystem.exists(import.meta.filename);
        })
      );

      const [call] = runtime.runMain.mock.calls;
      if (call === undefined) {
        return yield* Effect.die("The entry did not start the Node runtime.");
      }
      assert.strictEqual(runtime.runMain.mock.calls.length, 1);
      assert.strictEqual(yield* call[0], true);
    })
  );
});
