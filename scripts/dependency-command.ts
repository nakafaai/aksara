import { Effect, Schema, Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";
import {
  ChildProcess,
  type ChildProcessSpawner,
} from "effect/unstable/process";

/** Complete output from one repository-owned pnpm command. */
export interface CommandOutput {
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
}

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

/** A dependency command could not execute or returned unusable output. */
export class DependencyCommandError extends Schema.TaggedError<DependencyCommandError>()(
  "DependencyCommandError",
  { detail: Schema.String }
) {}

/** Collects one child-process byte stream as UTF-8 text. */
function collectText(stream: Stream.Stream<Uint8Array, PlatformError>) {
  return stream.pipe(
    Stream.decodeText(),
    Stream.runFold(
      () => "",
      (output, chunk) => output + chunk
    )
  );
}

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
        (error) => new DependencyCommandError({ detail: error.message })
      )
    )
);

/** Decodes one scalar version returned by `pnpm view`. */
export function decodeRegistryVersion(output: CommandOutput, registry: string) {
  if (output.exitCode !== 0) {
    return Effect.fail(
      new DependencyCommandError({
        detail: output.stderr.trim() || `Unable to inspect ${registry}.`,
      })
    );
  }
  return Effect.try({
    catch: () =>
      new DependencyCommandError({
        detail: `${registry} returned invalid JSON.`,
      }),
    try: () => JSON.parse(output.stdout) as unknown,
  }).pipe(
    Effect.flatMap(Schema.decodeUnknownEffect(Schema.String)),
    Effect.mapError(
      () =>
        new DependencyCommandError({
          detail: `${registry} returned no version.`,
        })
    )
  );
}

/** Decodes the unresolved dependency names returned by `pnpm outdated`. */
export function decodeOutdatedDependencies(output: CommandOutput) {
  if (![0, 1].includes(output.exitCode)) {
    return Effect.fail(
      new DependencyCommandError({
        detail: output.stderr.trim() || "pnpm outdated failed.",
      })
    );
  }
  const input = output.stdout.trim()
    ? Effect.try({
        catch: () =>
          new DependencyCommandError({
            detail: "pnpm outdated returned invalid JSON.",
          }),
        try: () => JSON.parse(output.stdout) as unknown,
      })
    : Effect.succeed({});
  return input.pipe(
    Effect.flatMap(Schema.decodeUnknownEffect(OutdatedSchema)),
    Effect.map(Object.keys),
    Effect.mapError(
      () =>
        new DependencyCommandError({
          detail: "pnpm outdated returned an invalid shape.",
        })
    )
  );
}
