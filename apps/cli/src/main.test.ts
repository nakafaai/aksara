import { describe, expect, it } from "@effect/vitest";
import { Effect, Fiber, FileSystem, Option, Path, Stream } from "effect";
import { cliNodeLayer, makeMainProgram } from "#cli/main";

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
  it.effect("hands one real composed program to the Node runtime", () =>
    Effect.gen(function* () {
      expect(runtime.calls).toBe(1);

      const failure = yield* makeMainProgram({
        args: [],
        cwd: process.cwd(),
      }).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "PreviewArgumentsError",
        reason: "missing",
      });
    })
  );

  it.live("observes a real save through the production watcher backend", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const directory = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-watch-",
      });
      const watcher = yield* fileSystem.watch(directory).pipe(
        Stream.filter((change) => change.path.endsWith("selected.mdx")),
        Stream.runHead,
        Effect.forkScoped
      );
      yield* Effect.sleep("100 millis");
      yield* fileSystem.writeFileString(
        path.resolve(directory, "selected.mdx"),
        "# Real save\n"
      );
      const event = yield* Fiber.join(watcher).pipe(
        Effect.timeout("5 seconds")
      );

      expect(Option.isSome(event)).toBe(true);
    }).pipe(Effect.provide(cliNodeLayer))
  );
});
