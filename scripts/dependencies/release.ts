import {
  Array as Arr,
  Effect,
  Option,
  Order,
  pipe,
  Schema,
  String as Str,
} from "effect";
import {
  type BunRunner,
  type CommandOutput,
  DependencyCommandError,
} from "#scripts/dependencies/command";
import { DependencyPolicyError } from "#scripts/dependencies/manifest";

/** A release number such as 0.28.10, with its prerelease channel after a hyphen, such as ts7.1.0-beta. */
const RELEASE_PATTERN = /^\d+\.\d+\.\d+(?:-.+)?$/u;
/** The prerelease channel of a release, from its first hyphen on. */
const CHANNEL_SUFFIX = /-.*$/u;

/** Pads every numeric part of the release number to twelve digits, so string order matches release order: 0.28.10 follows 0.28.9. */
function releaseSortKey(version: string): string {
  const number = version.replace(CHANNEL_SUFFIX, "");
  return Arr.join(
    Arr.map(number.split("."), (part) => part.padStart(12, "0")),
    "."
  );
}

/** Whether two releases share one channel, stable or prerelease. */
const sameChannel = Option.makeEquivalence(Str.Equivalence);

/**
 * Returns the prerelease channel of a release: `ts7.1.0-beta` for
 * `0.23.0-ts7.1.0-beta`, and none for a stable release.
 */
export function releaseChannel(version: string): Option.Option<string> {
  const hyphen = version.indexOf("-");
  return hyphen < 0 ? Option.none() : Option.some(version.slice(hyphen + 1));
}

const ReleaseOrder = Order.mapInput(Order.String, releaseSortKey);

/** Reports whether one release is newer than another of its channel in release order. */
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
 * Returns the newest release of one channel: stable releases for none, or the
 * prereleases of one channel, such as the tsrs releases built on one TypeScript
 * release. A release line such as `24` keeps only the versions that start with
 * `24.`. Nothing is returned when no release of the channel is in it.
 */
export function newestRelease(
  versions: ReleaseVersions,
  line?: string,
  channel: Option.Option<string> = Option.none()
): Option.Option<string> {
  const releases = pipe(
    versions,
    Arr.filter(
      (version) =>
        RELEASE_PATTERN.test(version) &&
        sameChannel(releaseChannel(version), channel) &&
        (line === undefined || version.startsWith(`${line}.`))
    )
  );
  return Arr.last(Arr.sort(releases, ReleaseOrder));
}

/** Reads the newest release of one package in one channel, within an optional release line. */
export const latestRelease = Effect.fn("DependencyPolicy.latestRelease")(
  function* (
    name: string,
    line: string | undefined,
    root: string,
    runner: BunRunner,
    channel: Option.Option<string> = Option.none()
  ) {
    const output = yield* runner(root, ["info", name, "versions", "--json"]);
    const versions = yield* decodeReleaseVersions(output, name);
    return yield* Effect.fromOption(
      newestRelease(versions, line, channel)
    ).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({
            message: `${name} has no ${Option.getOrElse(channel, () => "stable")} release.`,
          })
      )
    );
  }
);
