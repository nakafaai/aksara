import type { ChildProcessByStdio } from "node:child_process";
import { spawn } from "node:child_process";
import { isAbsolute } from "node:path";
import type { Readable, Writable } from "node:stream";
import { NodeSink, NodeStream } from "@effect/platform-node";
import {
  Chunk,
  Context,
  Deferred,
  Effect,
  Layer,
  Schema,
  Stream,
} from "effect";
import { constant, constVoid } from "effect/Function";
import { joinBytes } from "#utilities/bytes/join";
import { terminateProcessGroup } from "#utilities/process/group";

const TERMINATION_GRACE = "250 millis";
const TERMINATION_LIMIT = "250 millis";

/** Exact operating-system process input with no inherited environment. */
export interface ExactProcessInput {
  readonly args: readonly string[];
  readonly environment: Readonly<Record<string, string>>;
  readonly executable: string;
  readonly root: string;
  readonly stderrLimit: number;
  readonly stdin?: Uint8Array;
  readonly stdoutLimit: number;
}

/** Bounded output returned by one successfully observed child process. */
export interface ExactProcessOutput {
  readonly exitCode: number;
  readonly stderr: Uint8Array;
  readonly stdout: Uint8Array;
}

/** An exact process could not start, stream bounded output, or exit normally. */
export class ExactProcessError extends Schema.TaggedError<ExactProcessError>()(
  "ExactProcessError",
  {
    reason: Schema.Literal(
      "executable",
      "root",
      "limit",
      "spawn",
      "stdin",
      "stdout",
      "stderr",
      "signal"
    ),
  }
) {}

/** Infrastructure boundary for environment-isolated, bounded child processes. */
export class ExactProcess extends Context.Tag("AksaraExactProcess")<
  ExactProcess,
  {
    /** Runs one executable without a shell or inherited environment values. */
    readonly run: (
      input: ExactProcessInput
    ) => Effect.Effect<ExactProcessOutput, ExactProcessError>;
  }
>() {}

interface OpenedProcess {
  readonly child: ChildProcessByStdio<Writable, Readable, Readable>;
  readonly exit: Deferred.Deferred<number, ExactProcessError>;
  readonly pid: number;
}

interface OutputState {
  readonly chunks: Chunk.Chunk<Uint8Array>;
  readonly size: number;
}

const EMPTY_OUTPUT: OutputState = {
  chunks: Chunk.empty(),
  size: 0,
};

/** Validates the operating-system coordinates and output ceilings. */
function validateInput(
  input: ExactProcessInput
): Effect.Effect<ExactProcessInput, ExactProcessError> {
  if (!isAbsolute(input.executable)) {
    return Effect.fail(new ExactProcessError({ reason: "executable" }));
  }
  if (!isAbsolute(input.root)) {
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
  return Effect.succeed(input);
}

/** Drains one process pipe without retaining bytes beyond its exact ceiling. */
function collectOutput(
  readable: Readable,
  limit: number,
  reason: "stdout" | "stderr"
) {
  const error = new ExactProcessError({ reason });
  return NodeStream.fromReadable(() => readable, constant(error)).pipe(
    Stream.runFoldEffect(EMPTY_OUTPUT, (output, chunk) => {
      const size = output.size + chunk.byteLength;
      if (size > limit) {
        return Effect.fail(error);
      }
      return Effect.succeed({
        chunks: Chunk.append(output.chunks, Uint8Array.from(chunk)),
        size,
      });
    }),
    Effect.map((output) => joinBytes(output.chunks, output.size))
  );
}

/** Opens one detached process and records its terminal state exactly once. */
const openProcess = Effect.fn("AksaraUtilities.openExactProcess")(function* (
  input: ExactProcessInput
) {
  const exit = yield* Deferred.make<number, ExactProcessError>();
  const child = yield* Effect.try({
    catch: () => new ExactProcessError({ reason: "spawn" }),
    try: () =>
      spawn(input.executable, input.args, {
        cwd: input.root,
        detached: true,
        env: input.environment,
        shell: false,
        stdio: ["pipe", "pipe", "pipe"],
      }),
  });
  const pid = yield* Effect.async<number, ExactProcessError>((resume) => {
    child.once("error", () => {
      const error = new ExactProcessError({ reason: "spawn" });
      Deferred.unsafeDone(exit, Effect.fail(error));
      resume(Effect.fail(error));
    });
    child.once("spawn", () => {
      const error = new ExactProcessError({ reason: "spawn" });
      resume(
        Schema.decodeUnknown(Schema.Positive)(child.pid).pipe(
          Effect.mapError(constant(error))
        )
      );
    });
  });
  child.once("close", (code) =>
    Deferred.unsafeDone(
      exit,
      code === null
        ? Effect.fail(new ExactProcessError({ reason: "signal" }))
        : Effect.succeed(code)
    )
  );
  return { child, exit, pid };
});

/** Runs one acquired process while draining both output pipes concurrently. */
function runOpened(
  opened: OpenedProcess,
  input: ExactProcessInput
): Effect.Effect<ExactProcessOutput, ExactProcessError> {
  const writeStdin =
    input.stdin === undefined
      ? Effect.sync(() => {
          opened.child.stdin.on("error", constVoid);
          opened.child.stdin.end();
        })
      : Stream.make(input.stdin).pipe(
          Stream.run(
            NodeSink.fromWritable(
              () => opened.child.stdin,
              () => new ExactProcessError({ reason: "stdin" })
            )
          )
        );
  return Effect.all(
    {
      exitCode: Deferred.await(opened.exit),
      stderr: collectOutput(opened.child.stderr, input.stderrLimit, "stderr"),
      stdin: writeStdin,
      stdout: collectOutput(opened.child.stdout, input.stdoutLimit, "stdout"),
    },
    { concurrency: "unbounded" }
  ).pipe(
    Effect.map(({ exitCode, stderr, stdout }) => ({
      exitCode,
      stderr,
      stdout,
    }))
  );
}

/** Runs one exact child process and owns its complete detached process group. */
const runExactProcess = Effect.fn("AksaraUtilities.runExactProcess")(
  (input: ExactProcessInput) =>
    validateInput(input).pipe(
      Effect.flatMap((validated) =>
        Effect.acquireUseRelease(
          openProcess(validated),
          (opened) => runOpened(opened, validated),
          (opened) =>
            terminateProcessGroup({
              ...opened,
              grace: TERMINATION_GRACE,
              limit: TERMINATION_LIMIT,
            })
        )
      )
    )
);

/** Live direct-Node implementation of the exact process boundary. */
export const ExactProcessLive = Layer.succeed(
  ExactProcess,
  ExactProcess.of({ run: runExactProcess })
);
