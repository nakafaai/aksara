import {
  Array as Arr,
  Effect,
  Option,
  Order,
  pipe,
  Schema,
  String as Str,
} from "effect";
import type { BunRunner, CommandOutput } from "#scripts/dependencies/command";
import { DependencyCommandError } from "#scripts/dependencies/command";
import { DependencyPolicyError } from "#scripts/dependencies/manifest";

/** A release number such as 0.28.10, with its prerelease after a hyphen, such as ts7.1.0-beta or beta.tsrs3. */
const RELEASE_PATTERN = /^\d+\.\d+\.\d+(?:-.+)?$/u;
/** The prerelease of a release, from its first hyphen on. */
const PRERELEASE_SUFFIX = /-.*$/u;
/** A prerelease that ends in a revision number: `beta.tsrs` and `3` of `beta.tsrs3`. */
const PRERELEASE_REVISION = /^(?<channel>.*?)(?<revision>\d+)$/u;

/** The prerelease of a release, or none for a stable release. */
function prereleaseOf(version: string): Option.Option<string> {
  const hyphen = version.indexOf("-");
  return hyphen < 0 ? Option.none() : Option.some(version.slice(hyphen + 1));
}

/** The revision number that ends a prerelease, or 0: `3` of `7.1.0-beta.tsrs3`. */
function revisionOf(version: string): string {
  return Option.match(prereleaseOf(version), {
    onNone: () => "0",
    onSome: (prerelease) =>
      PRERELEASE_REVISION.exec(prerelease)?.groups?.revision ?? "0",
  });
}

/**
 * Pads every numeric part of the release number, and the revision that ends
 * its prerelease, to twelve digits, so string order matches release order:
 * 0.28.10 follows 0.28.9, and 7.1.0-beta.tsrs10 follows 7.1.0-beta.tsrs9.
 */
function releaseSortKey(version: string): string {
  const number = version.replace(PRERELEASE_SUFFIX, "");
  return Arr.join(
    Arr.map([...number.split("."), revisionOf(version)], (part) =>
      part.padStart(12, "0")
    ),
    "."
  );
}

/** Whether two releases share one channel, stable or prerelease. */
const sameChannel = Option.makeEquivalence(Str.Equivalence);

/**
 * Returns the prerelease channel of a release, without the revision number
 * that ends it: `ts7.1.0-beta` for `0.23.0-ts7.1.0-beta`, `beta.tsrs` for
 * `7.1.0-beta.tsrs3`, and none for a stable release. So the revisions of one
 * prerelease line, such as the tsrs builds of one TypeScript beta, are one
 * channel.
 */
export function releaseChannel(version: string): Option.Option<string> {
  return Option.map(
    prereleaseOf(version),
    (prerelease) =>
      PRERELEASE_REVISION.exec(prerelease)?.groups?.channel ?? prerelease
  );
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
