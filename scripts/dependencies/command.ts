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

const RegistryVersionText = Schema.fromJsonString(Schema.String);

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

/** Decodes one scalar version returned by `bun info <spec> version --json`. */
export function decodeRegistryVersion(output: CommandOutput, registry: string) {
  if (output.exitCode !== 0) {
    return Effect.fail(
      new DependencyCommandError({
        message: output.stderr.trim() || `Unable to inspect ${registry}.`,
      })
    );
  }
  return Schema.decodeEffect(RegistryVersionText)(output.stdout).pipe(
    Effect.mapError(
      () =>
        new DependencyCommandError({
          message: `${registry} returned no version.`,
        })
    )
  );
}
