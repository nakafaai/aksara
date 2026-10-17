import { Effect, Sink, Stream } from "effect";
import { ChildProcessSpawner } from "effect/process";

/** Creates one completed process handle with deterministic output and status. */
export function makeProcessHandle(output: string, exitCode = 0) {
  const bytes = new TextEncoder().encode(output);
  const stdout = output.length === 0 ? Stream.empty : Stream.make(bytes);
  return ChildProcessSpawner.makeHandle({
    all: stdout,
    exitCode: Effect.succeed(ChildProcessSpawner.ExitCode(exitCode)),
    getInputFd: () => Sink.drain,
    getOutputFd: () => Stream.empty,
    isRunning: Effect.succeed(false),
    kill: () => Effect.void,
    pid: ChildProcessSpawner.ProcessId(12_345),
    stderr: Stream.empty,
    stdin: Sink.drain,
    stdout,
    unref: Effect.succeed(Effect.void),
  });
}
