import { Array as Arr, Effect, type Option, Order, pipe, Schema } from "effect";
import {
  type BunRunner,
  type CommandOutput,
  DependencyCommandError,
} from "#scripts/dependencies/command";
import { DependencyPolicyError } from "#scripts/dependencies/manifest";

/** A stable release number such as 0.28.10. Prereleases do not match. */
const STABLE_RELEASE_PATTERN = /^\d+\.\d+\.\d+$/u;

/** Pads every numeric part to twelve digits, so string order matches release order: 0.28.10 follows 0.28.9. */
function releaseSortKey(version: string): string {
  return Arr.join(
    Arr.map(version.split("."), (part) => part.padStart(12, "0")),
    "."
  );
}

const ReleaseOrder = Order.mapInput(Order.String, releaseSortKey);

/** Reports whether one stable release is newer than another in release order. */
export function isNewerRelease(candidate: string, reviewed: string): boolean {
  return ReleaseOrder(candidate, reviewed) > 0;
}

const ReleaseVersionsText = Schema.fromJsonString(Schema.Array(Schema.String));

/** Every published version of one package, as Bun lists them. */
export type ReleaseVersions = typeof ReleaseVersionsText.Type;

/** Decodes the versions that `bun info <name> versions --json` prints for one package. */
export function decodeReleaseVersions(output: CommandOutput, name: string) {
  if (output.exitCode !== 0) {
    return Effect.fail(
      new DependencyCommandError({
        message: output.stderr.trim() || `Unable to inspect ${name}.`,
      })
    );
  }
  return Schema.decodeEffect(ReleaseVersionsText)(output.stdout).pipe(
    Effect.mapError(
      () =>
        new DependencyCommandError({
          message: `${name} returned no release versions.`,
        })
    )
  );
}

/**
 * Returns the newest stable release. A release line such as `24` keeps only the
 * versions that start with `24.`. Nothing is returned when no stable release is
 * in it.
 */
export function newestStableRelease(
  versions: ReleaseVersions,
  line?: string
): Option.Option<string> {
  const stable = pipe(
    versions,
    Arr.filter(
      (version) =>
        STABLE_RELEASE_PATTERN.test(version) &&
        (line === undefined || version.startsWith(`${line}.`))
    )
  );
  return Arr.last(Arr.sort(stable, ReleaseOrder));
}

/** Reads the newest stable release of one package, within an optional release line. */
export const latestStable = Effect.fn("DependencyPolicy.latestStable")(
  function* (
    name: string,
    line: string | undefined,
    root: string,
    runner: BunRunner
  ) {
    const output = yield* runner(root, ["info", name, "versions", "--json"]);
    const versions = yield* decodeReleaseVersions(output, name);
    return yield* Effect.fromOption(newestStableRelease(versions, line)).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({
            message: `${name} has no stable release.`,
          })
      )
    );
  }
);
