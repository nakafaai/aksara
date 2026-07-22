import { type Command, flatten } from "@effect/platform/Command";
import {
  type CommandExecutor,
  ExitCode,
  makeExecutor,
  type Process,
  ProcessId,
  ProcessTypeId,
} from "@effect/platform/CommandExecutor";
import type { PlatformError } from "@effect/platform/Error";
import { Effect, Option, Sink, Stream } from "effect";
import { NodeInspectSymbol } from "effect/Inspectable";

/** Explicit output returned by one completed test command. */
export interface TestCommandResult {
  readonly exitCode?: number;
  readonly stderr?: string | Uint8Array;
  readonly stderrChunks?: readonly Uint8Array[];
  readonly stdout: string | Uint8Array;
}

/** Preserves explicit byte fixtures while encoding ordinary test output. */
function toTestBytes(output: string | Uint8Array) {
  return typeof output === "string" ? new TextEncoder().encode(output) : output;
}

/** Builds one completed process around explicit test-only command output. */
function makeTestProcess(result: TestCommandResult): Process {
  return {
    [NodeInspectSymbol]: () => result,
    [ProcessTypeId]: ProcessTypeId,
    exitCode: Effect.succeed(ExitCode(result.exitCode ?? 0)),
    isRunning: Effect.succeed(false),
    kill: () => Effect.void,
    pid: ProcessId(1),
    stderr: result.stderrChunks
      ? Stream.fromIterable(result.stderrChunks)
      : Stream.make(toTestBytes(result.stderr ?? "")),
    stdin: Sink.drain,
    stdout: Stream.make(toTestBytes(result.stdout)),
    toJSON: () => result,
    toString: () => "Test-only completed command process.",
  };
}

/** Builds the complete platform service around one test command responder. */
export function makeTestExecutor(
  run: (command: Command) => Effect.Effect<TestCommandResult, PlatformError>
): CommandExecutor {
  return makeExecutor((command) =>
    run(command).pipe(Effect.map(makeTestProcess))
  );
}

/** Returns only argument-safety fields relevant to command assertions. */
export function inspectTestCommand(command: Command) {
  const [standard] = flatten(command);
  return {
    args: [...standard.args],
    command: standard.command,
    cwd: Option.getOrNull(standard.cwd),
    shell: standard.shell,
  };
}
