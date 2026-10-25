import {
  Array as Arr,
  Clock,
  DateTime,
  Effect,
  type Option,
  Order,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import {
  type BunRunner,
  type CommandOutput,
  DependencyCommandError,
} from "#scripts/dependencies/command";
import { DependencyPolicyError } from "#scripts/dependencies/manifest";

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

/** Reports whether one stable release is newer than another in release order. */
export function isNewerRelease(candidate: string, reviewed: string): boolean {
  return ReleaseOrder(candidate, reviewed) > 0;
}

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
 * resolution. A release line such as `24` keeps only the versions that start
 * with `24.`. Nothing is returned when every stable release is still inside it.
 */
export function newestAdmittedRelease(
  times: ReleaseTimes,
  now: number,
  line?: string
): Option.Option<string> {
  const admitted = pipe(
    Rec.toEntries(times),
    Arr.filter(
      ([version, published]) =>
        STABLE_RELEASE_PATTERN.test(version) &&
        (line === undefined || version.startsWith(`${line}.`)) &&
        now - DateTime.toEpochMillis(published) >= RELEASE_AGE_MILLIS
    ),
    Arr.map(([version]) => version)
  );
  return Arr.last(Arr.sort(admitted, ReleaseOrder));
}

/**
 * Reads the newest stable release of one package that the one-day gate admits,
 * within an optional release line. Bun's `@latest` ignores the gate, so the
 * release times decide every candidate, routine or held.
 */
export const admittedLatest = Effect.fn("DependencyPolicy.admittedLatest")(
  function* (
    name: string,
    line: string | undefined,
    root: string,
    runner: BunRunner
  ) {
    const now = yield* Clock.currentTimeMillis;
    const output = yield* runner(root, ["info", name, "time", "--json"]);
    const times = yield* decodeReleaseTimes(output, name);
    return yield* Effect.fromOption(
      newestAdmittedRelease(times, now, line)
    ).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({
            message: `${name} has no stable release older than the one-day release-age gate.`,
          })
      )
    );
  }
);
