import {
  Array as Arr,
  DateTime,
  Effect,
  type Option,
  Order,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import {
  type CommandOutput,
  DependencyCommandError,
} from "#scripts/dependencies/command";

/** The one-day release-age gate in milliseconds, the value of `minimumReleaseAge` in bunfig.toml. */
export const RELEASE_AGE_MILLIS = 86_400_000;

/** A stable release number such as 0.28.10. Prereleases and Bun's `created` and `modified` keys do not match. */
const STABLE_RELEASE_PATTERN = /^\d+\.\d+\.\d+$/u;

/** Pads every numeric part to twelve digits, so string order matches release order: 0.28.10 follows 0.28.9. */
function releaseSortKey(version: string): string {
  return Arr.join(
    Arr.map(version.split("."), (part) => part.padStart(12, "0")),
    "."
  );
}

const ReleaseOrder = Order.mapInput(Order.String, releaseSortKey);

const ReleaseTimesText = Schema.fromJsonString(
  Schema.Record(Schema.String, Schema.DateTimeUtcFromString)
);

/** The publish time of each release of one package, keyed by version, with Bun's `created` and `modified` keys. */
export type ReleaseTimes = typeof ReleaseTimesText.Type;

/** Decodes the publish times that `bun info <name> time --json` prints for one package. */
export function decodeReleaseTimes(output: CommandOutput, name: string) {
  if (output.exitCode !== 0) {
    return Effect.fail(
      new DependencyCommandError({
        message: output.stderr.trim() || `Unable to inspect ${name}.`,
      })
    );
  }
  return Schema.decodeEffect(ReleaseTimesText)(output.stdout).pipe(
    Effect.mapError(
      () =>
        new DependencyCommandError({
          message: `${name} returned no release times.`,
        })
    )
  );
}

/**
 * Returns the newest stable release that is at least one release age old at
 * `now`, which is the test Bun's `minimumReleaseAge` applies to every new
 * resolution. Nothing is returned when every stable release is still inside it.
 */
export function newestAdmittedRelease(
  times: ReleaseTimes,
  now: number
): Option.Option<string> {
  const admitted = pipe(
    Rec.toEntries(times),
    Arr.filter(
      ([version, published]) =>
        STABLE_RELEASE_PATTERN.test(version) &&
        now - DateTime.toEpochMillis(published) >= RELEASE_AGE_MILLIS
    ),
    Arr.map(([version]) => version)
  );
  return Arr.last(Arr.sort(admitted, ReleaseOrder));
}
