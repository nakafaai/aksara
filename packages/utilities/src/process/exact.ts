import {
  Array as Arr,
  Chunk,
  Context,
  Effect,
  Layer,
  Path,
  Record as Rec,
  Schema,
  Stream,
} from "effect";
import { constant } from "effect/Function";
import type * as PlatformError from "effect/PlatformError";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import { joinBytes } from "#utilities/bytes/join";

const TERMINATION_GRACE = "250 millis";

/** Exact operating-system process input with no inherited environment. */
const ExactProcessInputSchema = Schema.Struct({
  args: Schema.Array(Schema.String),
  environment: Schema.Record(Schema.String, Schema.String),
  executable: Schema.String,
  root: Schema.String,
  stderrLimit: Schema.Finite,
  stdin: Schema.optionalKey(Schema.Uint8Array),
  stdoutLimit: Schema.Finite,
});

/** Exact operating-system process input with no inherited environment. */
export type ExactProcessInput = typeof ExactProcessInputSchema.Type;

/** Bounded output returned by one successfully observed child process. */
const ExactProcessOutputSchema = Schema.Struct({
  exitCode: Schema.Finite,
  stderr: Schema.Uint8Array,
  stdout: Schema.Uint8Array,
});

/** Bounded output returned by one successfully observed child process. */
export type ExactProcessOutput = typeof ExactProcessOutputSchema.Type;

/** An exact process could not start, stream bounded output, or exit normally. */
export class ExactProcessError extends Schema.TaggedError<ExactProcessError>()(
  "ExactProcessError",
  {
    reason: Schema.Literals([
      "executable",
      "root",
      "limit",
      "spawn",
      "stdin",
      "stdout",
      "stderr",
      "signal",
    ]),
  }
) {}

/** Infrastructure boundary for environment-isolated, bounded child processes. */
export class ExactProcess extends Context.Service<
  ExactProcess,
  {
    /** Runs one executable without a shell or inherited environment values. */
    readonly run: (
      input: ExactProcessInput
    ) => Effect.Effect<ExactProcessOutput, ExactProcessError>;
  }
>()("AksaraExactProcess") {}

const EMPTY_OUTPUT = {
  chunks: Chunk.empty<Uint8Array>(),
  size: 0,
};

/**
 * Validates the operating-system coordinates, output ceilings, and text.
 * Node throws synchronously for NUL bytes, so they are spawn failures.
 */
function validateInput(path: Path.Path, input: ExactProcessInput) {
  if (!path.isAbsolute(input.executable)) {
    return Effect.fail(new ExactProcessError({ reason: "executable" }));
  }
  if (!path.isAbsolute(input.root)) {
    return Effect.fail(new ExactProcessError({ reason: "root" }));
  }
  if (
    !(
      Number.isSafeInteger(input.stdoutLimit) &&
      Number.isSafeInteger(input.stderrLimit)
    ) ||
    input.stdoutLimit < 0 ||
    input.stderrLimit < 0
  ) {
    return Effect.fail(new ExactProcessError({ reason: "limit" }));
  }
  const texts = [
    input.executable,
    input.root,
    ...input.args,
    ...Rec.keys(input.environment),
    ...Rec.values(input.environment),
  ];
  if (Arr.some(texts, (text) => text.includes("\0"))) {
    return Effect.fail(new ExactProcessError({ reason: "spawn" }));
  }
  return Effect.void;
}

/** Drains one process pipe without retaining bytes beyond its exact ceiling. */
function collectOutput(
  stream: Stream.Stream<Uint8Array, PlatformError.PlatformError>,
  limit: number,
  reason: "stdout" | "stderr"
) {
  const error = new ExactProcessError({ reason });
  return stream.pipe(
    Stream.mapError(constant(error)),
    Stream.runFoldEffect(
      () => EMPTY_OUTPUT,
      (output, chunk) => {
        const size = output.size + chunk.byteLength;
        if (size > limit) {
          return Effect.fail(error);
        }
        return Effect.succeed({
          chunks: Chunk.append(output.chunks, Uint8Array.from(chunk)),
          size,
        });
      }
    ),
    Effect.map((output) => joinBytes(output.chunks, output.size))
  );
}

/** Writes exact standard input bytes; without input, stdin was closed at spawn. */
function writeStdin(
  handle: ChildProcessSpawner.ChildProcessHandle,
  stdin: Uint8Array | undefined
) {
  if (stdin === undefined) {
    return Effect.void;
  }
  return Stream.make(stdin).pipe(
    Stream.run(handle.stdin),
    Effect.mapError(constant(new ExactProcessError({ reason: "stdin" })))
  );
}

/** Runs one exact child process and owns its complete detached process group. */
const runExactProcess = Effect.fn("AksaraUtilities.runExactProcess")(function* (
  input: ExactProcessInput
) {
  const path = yield* Path.Path;
  yield* validateInput(path, input);
  const handle = yield* ChildProcess.make(input.executable, input.args, {
    cwd: input.root,
    detached: true,
    env: input.environment,
    extendEnv: false,
    forceKillAfter: TERMINATION_GRACE,
    shell: false,
    // An empty stream closes the child's stdin when the command has no input.
    stdin: input.stdin === undefined ? Stream.empty : "pipe",
  }).pipe(
    Effect.mapError(constant(new ExactProcessError({ reason: "spawn" })))
  );
  const output = yield* Effect.all(
    {
      exitCode: handle.exitCode.pipe(
        Effect.mapError(constant(new ExactProcessError({ reason: "signal" })))
      ),
      stderr: collectOutput(handle.stderr, input.stderrLimit, "stderr"),
      stdin: writeStdin(handle, input.stdin),
      stdout: collectOutput(handle.stdout, input.stdoutLimit, "stdout"),
    },
    { concurrency: "unbounded" }
  );
  return {
    exitCode: output.exitCode,
    stderr: output.stderr,
    stdout: output.stdout,
  };
});

/** Live implementation of the exact process boundary on Effect's child process spawner. */
export const ExactProcessLive = Layer.effect(
  ExactProcess,
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
    return ExactProcess.of({
      run: (input) =>
        runExactProcess(input).pipe(
          Effect.provideService(Path.Path, path),
          Effect.provideService(
            ChildProcessSpawner.ChildProcessSpawner,
            spawner
          ),
          Effect.scoped
        ),
    });
  })
);
