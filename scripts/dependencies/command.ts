import { Effect, Schema, Stream } from "effect";
import { ChildProcess, type ChildProcessSpawner } from "effect/process";

const CommandOutputSchema = Schema.Struct({
  exitCode: Schema.Finite,
  stderr: Schema.String,
  stdout: Schema.String,
});

/** Complete output from one repository-owned Bun command. */
export type CommandOutput = typeof CommandOutputSchema.Type;

/** Injectable Bun process boundary used by dependency policy. */
export type BunRunner = (
  root: string,
  args: readonly string[]
) => Effect.Effect<
  CommandOutput,
  DependencyCommandError,
  ChildProcessSpawner.ChildProcessSpawner
>;

/** A dependency command could not execute or returned unusable output. */
export class DependencyCommandError extends Schema.TaggedError<
  DependencyCommandError,
  { readonly brand: unique symbol }
>()("DependencyCommandError", { message: Schema.String }) {}

/** Runs Bun in the repository and preserves its exact terminal output. */
export const runBun = Effect.fn("DependencyCommand.runBun")(
  (root: string, args: readonly string[]) =>
    Effect.scoped(
      Effect.gen(function* () {
        const command = yield* ChildProcess.make("bun", args, { cwd: root });
        const [exitCode, stdout, stderr] = yield* Effect.all(
          [
            command.exitCode,
            command.stdout.pipe(Stream.decodeText(), Stream.mkString),
            command.stderr.pipe(Stream.decodeText(), Stream.mkString),
          ],
          { concurrency: 3 }
        );
        return { exitCode, stderr, stdout };
      })
    ).pipe(
      Effect.mapError(
        (error) => new DependencyCommandError({ message: error.message })
      )
    )
);
