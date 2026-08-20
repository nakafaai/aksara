import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Fiber, FileSystem, Option, Stream } from "effect";
import { vi } from "vitest";
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

  it("observes a real save through the production watcher backend", async () => {
    const event = await Effect.runPromise(
      Effect.scoped(
        Effect.acquireRelease(
          Effect.sync(() => mkdtempSync(resolve(tmpdir(), "aksara-watch-"))),
          (directory) =>
            Effect.sync(() =>
              rmSync(directory, { force: true, recursive: true })
            )
        ).pipe(
          Effect.flatMap((directory) =>
            Effect.gen(function* () {
              const fileSystem = yield* FileSystem.FileSystem;
              const watcher = yield* fileSystem.watch(directory).pipe(
                Stream.filter(({ path }) => path.endsWith("selected.mdx")),
                Stream.runHead,
                Effect.forkScoped
              );
              yield* Effect.sleep("100 millis");
              yield* Effect.sync(() =>
                writeFileSync(
                  resolve(directory, "selected.mdx"),
                  "# Real save\n"
                )
              );
              return yield* Fiber.join(watcher).pipe(
                Effect.timeout("5 seconds")
              );
            })
          )
        )
      ).pipe(Effect.provide(cliNodeLayer))
    );

    expect(Option.isSome(event)).toBe(true);
  });
});
