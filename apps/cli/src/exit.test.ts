import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  Exit,
  FileSystem,
  Option,
  Path,
  PlatformError,
} from "effect";
import {
  makeLauncherTeardown,
  readExitSignal,
  readSignalTermination,
  setProcessExitCode,
  terminateSelf,
} from "#cli/exit";
import { runLauncher } from "#cli/launcher";

const initialExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = initialExitCode;
});

vi.mock("@effect/platform-node/NodeRuntime", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node/NodeRuntime")>();
  return { ...platform, runMain: vi.fn() };
});

/** Creates one exact Effect child-process signal failure fixture. */
const signalFailure = (cause: unknown) =>
  PlatformError.systemError({
    _tag: "Unknown",
    cause,
    method: "exitCode",
    module: "ChildProcess",
  });

describe("CLI exit boundary", () => {
  it.effect("preserves delegated signal termination", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-signal-",
      });
      const main = path.join(root, "apps", "cli", "src", "main.ts");
      yield* fileSystem.makeDirectory(path.dirname(main), { recursive: true });
      yield* fileSystem.writeFileString(
        path.join(root, "package.json"),
        '{"name":"aksara","private":true}'
      );
      yield* fileSystem.writeFileString(
        main,
        'process.kill(process.pid, "SIGTERM");'
      );

      const termination = yield* runLauncher({
        args: [],
        cwd: root,
        executable: process.execPath,
      });

      expect(termination).toEqual({
        _tag: "SignalTermination",
        signal: "SIGTERM",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it("decodes only the pinned child exit signal failure", () => {
    const signal = readExitSignal(
      signalFailure(
        new Error("Process interrupted due to receipt of signal: 'SIGTERM'")
      )
    );

    expect(Option.getOrNull(signal)).toBe("SIGTERM");
    expect(
      Option.getOrNull(
        readSignalTermination(
          signalFailure(
            new Error("Process interrupted due to receipt of signal: 'SIGINT'")
          )
        )
      )
    ).toEqual({ _tag: "SignalTermination", signal: "SIGINT" });
    expect(Option.isNone(readExitSignal(new Error("signal")))).toBe(true);
    expect(
      Option.isNone(
        readExitSignal(
          PlatformError.systemError({
            _tag: "Unknown",
            cause: new Error(
              "Process interrupted due to receipt of signal: 'SIGTERM'"
            ),
            method: "spawn",
            module: "ChildProcess",
          })
        )
      )
    ).toBe(true);
    expect(Option.isNone(readExitSignal(signalFailure("SIGTERM")))).toBe(true);
    expect(
      Option.isNone(readExitSignal(signalFailure(new Error("not a signal"))))
    ).toBe(true);
    expect(
      Option.isNone(
        readExitSignal(
          signalFailure(
            new Error("Process interrupted due to receipt of signal: 'SIGFAKE'")
          )
        )
      )
    ).toBe(true);
  });

  it("records numeric status without forcing exit and re-emits signals", () => {
    let signals: string[] = [];
    let codes: number[] = [];
    let recorded: number[] = [];
    const teardown = makeLauncherTeardown({
      setExitCode: (exitCode) => {
        recorded = Arr.append(recorded, exitCode);
      },
      terminate: (signal) => {
        signals = Arr.append(signals, signal);
      },
    });

    teardown(Exit.succeed(7), (code) => {
      codes = Arr.append(codes, code);
    });
    teardown(Exit.succeed("complete"), (code) => {
      codes = Arr.append(codes, code);
    });
    teardown(Exit.fail("failure"), (code) => {
      codes = Arr.append(codes, code);
    });
    teardown(
      Exit.succeed({
        _tag: "SignalTermination" as const,
        signal: "SIGTERM" as const,
      }),
      (code) => {
        codes = Arr.append(codes, code);
      }
    );

    expect(codes).toEqual([0, 0, 1]);
    expect(recorded).toEqual([7]);
    expect(signals).toEqual(["SIGTERM"]);
  });

  it("sets one numeric status at the Node boundary", () => {
    setProcessExitCode(7);

    expect(process.exitCode).toBe(7);
  });

  it("re-emits one validated signal at the Node boundary", () => {
    let operations: string[] = [];
    const removeAllListeners = vi
      .spyOn(process, "removeAllListeners")
      .mockImplementation((signal) => {
        operations = Arr.append(operations, `remove:${String(signal)}`);
        return process;
      });
    const kill = vi
      .spyOn(process, "kill")
      .mockImplementation((_pid, signal) => {
        operations = Arr.append(operations, `kill:${String(signal)}`);
        return true;
      });

    terminateSelf("SIGTERM");

    expect(operations).toEqual(["remove:SIGTERM", "kill:SIGTERM"]);
    expect(removeAllListeners).toHaveBeenCalledWith("SIGTERM");
    expect(kill).toHaveBeenCalledWith(process.pid, "SIGTERM");
    removeAllListeners.mockRestore();
    kill.mockRestore();
  });
});
