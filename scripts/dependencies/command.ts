import { Effect, Record as Rec, Schema } from "effect";
import { ChildProcess, type ChildProcessSpawner } from "effect/process";
import { collectText } from "#scripts/output";

const CommandOutputSchema = Schema.Struct({
  exitCode: Schema.Finite,
  stderr: Schema.String,
  stdout: Schema.String,
});

/** Complete output from one repository-owned pnpm command. */
export type CommandOutput = typeof CommandOutputSchema.Type;

/** Injectable pnpm process boundary used by dependency policy. */
export type PnpmRunner = (
  root: string,
  args: readonly string[]
) => Effect.Effect<
  CommandOutput,
  DependencyCommandError,
  ChildProcessSpawner.ChildProcessSpawner
>;

const OutdatedSchema = Schema.Record(Schema.String, Schema.Unknown);
const RegistryVersionText = Schema.fromJsonString(Schema.String);
const OutdatedText = Schema.fromJsonString(OutdatedSchema);

/** A dependency command could not execute or returned unusable output. */
export class DependencyCommandError extends Schema.TaggedError<DependencyCommandError>()(
  "DependencyCommandError",
  { message: Schema.String }
) {}

/** Runs pnpm in the repository and preserves its exact terminal output. */
export const runPnpm = Effect.fn("DependencyCommand.runPnpm")(
  (root: string, args: readonly string[]) =>
    Effect.scoped(
      Effect.gen(function* () {
        const command = yield* ChildProcess.make("pnpm", args, { cwd: root });
        const [exitCode, stdout, stderr] = yield* Effect.all(
          [
            command.exitCode,
            collectText(command.stdout),
            collectText(command.stderr),
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

/** Decodes one scalar version returned by `pnpm view`. */
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

/** Decodes the unresolved dependency names returned by `pnpm outdated`. */
export function decodeOutdatedDependencies(output: CommandOutput) {
  if (![0, 1].includes(output.exitCode)) {
    return Effect.fail(
      new DependencyCommandError({
        message: output.stderr.trim() || "pnpm outdated failed.",
      })
    );
  }
  // Blank output means pnpm found nothing outdated.
  const text = output.stdout.trim() ? output.stdout : "{}";
  return Schema.decodeEffect(OutdatedText)(text).pipe(
    Effect.map(Rec.keys),
    Effect.mapError(
      () =>
        new DependencyCommandError({
          message: "pnpm outdated returned an invalid shape.",
        })
    )
  );
}
