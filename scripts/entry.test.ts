import { afterEach, assert, describe, expect, it } from "@effect/vitest";
import { Cause, Data, Effect, Exit, FileSystem, Runtime } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { TestConsole } from "effect/testing";
import { runEntry } from "#scripts/entry";

const runtime = vi.hoisted(() => ({
  runMain:
    vi.fn<
      (
        program: Effect.Effect<unknown, EntryFailure>,
        options?: { readonly disableErrorReporting?: boolean | undefined }
      ) => void
    >(),
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

/** A failure that its own error marks as already reported to the console. */
class AlreadyReported extends Data.TaggedError("AlreadyReported")<{
  readonly message: string;
}> {
  readonly [Runtime.errorReported] = false;
}

/** Every failure that a program handed to the runtime in this file ends with. */
type EntryFailure = AlreadyReported | PlatformError | string;

/** Returns the program and options that the entry handed to the Node runtime. */
const handedRuntimeCall = Effect.fn("ScriptEntryTest.handedRuntimeCall")(
  function* () {
    const [call] = runtime.runMain.mock.calls;
    if (call === undefined) {
      return yield* Effect.die("The entry did not start the Node runtime.");
    }
    return call;
  }
);

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

      const [program, options] = yield* handedRuntimeCall();
      assert.strictEqual(runtime.runMain.mock.calls.length, 1);
      assert.deepStrictEqual(options, { disableErrorReporting: true });
      assert.strictEqual(yield* program, true);
    })
  );

  it.effect("logs a failed program on stderr and keeps stdout quiet", () =>
    Effect.gen(function* () {
      runEntry(true, Effect.fail("A script failure."));
      const [program] = yield* handedRuntimeCall();

      expect(Exit.isFailure(yield* Effect.exit(program))).toBe(true);
      expect(String(yield* TestConsole.errorLines)).toContain(
        "A script failure."
      );
      expect(yield* TestConsole.logLines).toEqual([]);
    })
  );

  it.effect("logs a failed program on stdout when the script asks for it", () =>
    Effect.gen(function* () {
      runEntry(true, Effect.fail("A script failure."), {
        failureStream: "stdout",
      });
      const [program] = yield* handedRuntimeCall();

      yield* Effect.exit(program);
      expect(String(yield* TestConsole.logLines)).toContain(
        "A script failure."
      );
      expect(yield* TestConsole.errorLines).toEqual([]);
    })
  );

  it.effect("logs a defect on stderr and keeps stdout quiet", () =>
    Effect.gen(function* () {
      runEntry(true, Effect.die(new Error("A script defect.")));
      const [program] = yield* handedRuntimeCall();

      expect(Exit.isFailure(yield* Effect.exit(program))).toBe(true);
      expect(String(yield* TestConsole.errorLines)).toContain(
        "A script defect."
      );
      expect(yield* TestConsole.logLines).toEqual([]);
    })
  );

  it.effect("stays silent when the program is interrupted", () =>
    Effect.gen(function* () {
      runEntry(true, Effect.failCause(Cause.interrupt()));
      const [program] = yield* handedRuntimeCall();

      yield* Effect.exit(program);
      expect(yield* TestConsole.errorLines).toEqual([]);
      expect(yield* TestConsole.logLines).toEqual([]);
    })
  );

  it.effect("does not repeat a failure its error already reported", () =>
    Effect.gen(function* () {
      runEntry(
        true,
        Effect.fail(new AlreadyReported({ message: "Already reported." }))
      );
      const [program] = yield* handedRuntimeCall();

      yield* Effect.exit(program);
      expect(yield* TestConsole.errorLines).toEqual([]);
      expect(yield* TestConsole.logLines).toEqual([]);
    })
  );
});
