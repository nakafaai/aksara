import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Path,
  PlatformError,
  Ref,
  Sink,
  Stream,
} from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import {
  NAKAFA_COMMIT,
  NativeCheckError,
  verifyNativeSource,
} from "#scripts/check/native";

const REPOSITORY_URL = "https://github.com/nakafaai/nakafa.com.git";
const INSTALL_ARGUMENTS = ["install", "--frozen-lockfile", "--filter", "{.}"];
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;

/** One command that the fake spawner received, with its executable, arguments, and working directory. */
type Call = readonly [string, readonly string[], string | undefined];

/** Answers one command with a completed process handle or with a platform failure. */
type Responder = (
  command: ChildProcess.StandardCommand
) => Effect.Effect<
  ChildProcessSpawner.ChildProcessHandle,
  PlatformError.PlatformError
>;

/** Creates one completed process handle with a deterministic exit code and standard error text. */
function completed(exitCode: number, stderr = "") {
  const errorOutput =
    stderr.length === 0
      ? Stream.empty
      : Stream.make(new TextEncoder().encode(stderr));
  return ChildProcessSpawner.makeHandle({
    all: errorOutput,
    exitCode: Effect.succeed(ChildProcessSpawner.ExitCode(exitCode)),
    getInputFd: () => Sink.drain,
    getOutputFd: () => Stream.empty,
    isRunning: Effect.succeed(false),
    kill: () => Effect.void,
    pid: ChildProcessSpawner.ProcessId(12_345),
    stderr: errorOutput,
    stdin: Sink.drain,
    stdout: Stream.empty,
    unref: Effect.succeed(Effect.void),
  });
}

/** Answers every command with a successful exit. */
const succeed: Responder = () => Effect.succeed(completed(0));

/** Builds a spawner that answers each command through `respond` and records every command it receives, in order. */
const recordingSpawner = Effect.fn("NativeCheckTest.recordingSpawner")(
  function* (respond: Responder) {
    const calls = yield* Ref.make<readonly Call[]>([]);
    const spawner = ChildProcessSpawner.make(
      Effect.fn("NativeCheckTest.spawn")(function* (command) {
        if (!ChildProcess.isStandardCommand(command)) {
          return yield* Effect.die("Unexpected piped native check command");
        }
        const call: Call = [command.command, command.args, command.options.cwd];
        yield* Ref.update(calls, (list) => Arr.append(list, call));
        return yield* respond(command);
      })
    );
    return { calls: Ref.get(calls), spawner };
  }
);

/** Runs the source check with the given spawner in place of the live one. */
function runWith(spawner: ChildProcessSpawner.ChildProcessSpawner["Service"]) {
  return verifyNativeSource().pipe(
    Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner)
  );
}

/** Returns the temporary checkout that the first command ran in. */
function checkoutOf(calls: readonly Call[]) {
  return calls[0]?.[2] ?? "";
}

/** The three clone commands, which run in the temporary checkout in this order. */
function cloneCalls(checkout: string): readonly Call[] {
  return [
    ["git", ["init"], checkout],
    ["git", ["fetch", "--depth", "1", REPOSITORY_URL, NAKAFA_COMMIT], checkout],
    ["git", ["checkout", "--detach", "FETCH_HEAD"], checkout],
  ];
}

layer(NodeServices.layer)("native source check", (it) => {
  it.effect("pins the nakafa.com commit as forty hexadecimal characters", () =>
    Effect.sync(() => {
      expect(NAKAFA_COMMIT).toMatch(COMMIT_PATTERN);
    })
  );

  it.effect(
    "runs the pinned clone, install, and check in order, then removes its checkout",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const fake = yield* recordingSpawner(succeed);
        yield* runWith(fake.spawner);
        const calls = yield* fake.calls;
        const checkout = checkoutOf(calls);

        expect(calls).toEqual([
          ...cloneCalls(checkout),
          ["pnpm", INSTALL_ARGUMENTS, checkout],
          [
            "node",
            [path.join(checkout, "scripts", "check", "tests.ts")],
            undefined,
          ],
        ]);
        expect(yield* fileSystem.exists(checkout)).toBe(false);
      })
  );

  it.effect("fails with the clone step when a git command cannot start", () =>
    Effect.gen(function* () {
      const fake = yield* recordingSpawner((command) =>
        command.args[0] === "init"
          ? Effect.fail(
              PlatformError.systemError({
                _tag: "NotFound",
                description: "spawn git ENOENT",
                method: "spawn",
                module: "ChildProcess",
                pathOrDescriptor: "git",
              })
            )
          : succeed(command)
      );
      const error = yield* runWith(fake.spawner).pipe(Effect.flip);
      const calls = yield* fake.calls;

      expect(error).toEqual(
        new NativeCheckError({
          detail: "NotFound: ChildProcess.spawn (git): spawn git ENOENT",
          step: "clone",
        })
      );
      expect(calls).toEqual([["git", ["init"], checkoutOf(calls)]]);
    })
  );

  it.effect(
    "fails with the clone step, its exit code, and the trimmed standard error when git cannot fetch",
    () =>
      Effect.gen(function* () {
        const fake = yield* recordingSpawner((command) =>
          Effect.succeed(
            command.args[0] === "fetch"
              ? completed(128, "fatal: unable to access the repository\n")
              : completed(0)
          )
        );
        const error = yield* runWith(fake.spawner).pipe(Effect.flip);
        const calls = yield* fake.calls;

        expect(error).toEqual(
          new NativeCheckError({
            detail: "fatal: unable to access the repository",
            exitCode: 128,
            step: "clone",
          })
        );
        expect(calls).toEqual(Arr.take(cloneCalls(checkoutOf(calls)), 2));
      })
  );

  it.effect(
    "fails with the install step and its exit code when pnpm install exits unsuccessfully",
    () =>
      Effect.gen(function* () {
        const fake = yield* recordingSpawner((command) =>
          Effect.succeed(
            command.command === "pnpm"
              ? completed(1, "ERR_PNPM_LOCKFILE_CONFIG_MISMATCH\n")
              : completed(0)
          )
        );
        const error = yield* runWith(fake.spawner).pipe(Effect.flip);
        const calls = yield* fake.calls;
        const checkout = checkoutOf(calls);

        expect(error).toEqual(
          new NativeCheckError({
            detail: "ERR_PNPM_LOCKFILE_CONFIG_MISMATCH",
            exitCode: 1,
            step: "install",
          })
        );
        expect(calls).toEqual([
          ...cloneCalls(checkout),
          ["pnpm", INSTALL_ARGUMENTS, checkout],
        ]);
      })
  );

  it.effect(
    "fails with the check step and its exit code when the source check reports findings",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const fake = yield* recordingSpawner((command) =>
          Effect.succeed(
            command.command === "node" ? completed(1) : completed(0)
          )
        );
        const error = yield* runWith(fake.spawner).pipe(Effect.flip);
        const calls = yield* fake.calls;
        const checkout = checkoutOf(calls);

        expect(error).toEqual(
          new NativeCheckError({ detail: "", exitCode: 1, step: "check" })
        );
        expect(calls).toEqual([
          ...cloneCalls(checkout),
          ["pnpm", INSTALL_ARGUMENTS, checkout],
          [
            "node",
            [path.join(checkout, "scripts", "check", "tests.ts")],
            undefined,
          ],
        ]);
      })
  );

  it.effect("removes the checkout when a step fails", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const fake = yield* recordingSpawner((command) =>
        Effect.succeed(
          command.command === "pnpm" ? completed(1, "ERR_PNPM") : completed(0)
        )
      );
      yield* runWith(fake.spawner).pipe(Effect.flip);
      const checkout = checkoutOf(yield* fake.calls);

      expect(checkout).not.toBe("");
      expect(yield* fileSystem.exists(checkout)).toBe(false);
    })
  );
});
