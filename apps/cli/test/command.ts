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
import { Effect, HashMap, Option, Sink, Stream } from "effect";
import { NodeInspectSymbol } from "effect/Inspectable";

/** Explicit output returned by one completed CLI test command. */
export interface TestCommandResult {
  readonly exitCode?: number;
  readonly exitError?: PlatformError;
  readonly stdout: string | Uint8Array;
}

/** Preserves explicit byte output while encoding ordinary test text. */
function toBytes(output: string | Uint8Array) {
  return typeof output === "string" ? new TextEncoder().encode(output) : output;
}

/** Builds one completed child process around deterministic command output. */
export function makeTestProcess(result: TestCommandResult): Process {
  return {
    [NodeInspectSymbol]: () => result,
    [ProcessTypeId]: ProcessTypeId,
    exitCode: result.exitError
      ? Effect.fail(result.exitError)
      : Effect.succeed(ExitCode(result.exitCode ?? 0)),
    isRunning: Effect.succeed(false),
    kill: () => Effect.void,
    pid: ProcessId(1),
    stderr: Stream.empty,
    stdin: Sink.drain,
    stdout: Stream.make(toBytes(result.stdout)),
    toJSON: () => result,
    toString: () => "Completed CLI test command.",
  };
}

/** Builds the complete command service around one test responder. */
export function makeTestExecutor(
  run: (command: Command) => Effect.Effect<TestCommandResult, PlatformError>
): CommandExecutor {
  return makeExecutor((command) =>
    run(command).pipe(Effect.map(makeTestProcess))
  );
}

/** Returns only command fields relevant to process boundary assertions. */
export function inspectTestCommand(command: Command) {
  const [standard] = flatten(command);
  return {
    args: [...standard.args],
    command: standard.command,
    cwd: Option.getOrNull(standard.cwd),
    environment: Object.fromEntries(HashMap.toEntries(standard.env)),
    shell: standard.shell,
  };
}
