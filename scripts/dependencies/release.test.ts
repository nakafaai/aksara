import { describe, expect, it } from "@effect/vitest";
import { DateTime, Effect, Option } from "effect";

import { output, releaseTimes } from "#scripts/dependencies/fixture";
import {
  decodeReleaseTimes,
  newestAdmittedRelease,
  RELEASE_AGE_MILLIS,
} from "#scripts/dependencies/release";

/** The instant that every release in these tests is judged against: 1 January 2050, midnight UTC. */
const NOW = 2_524_608_000_000;
const OLD = "2049-01-01T00:00:00.000Z";
const INSIDE_GATE = "2049-12-31T12:00:00.000Z";

/** Decodes one release-time table exactly as `bun info <name> time --json` prints it. */
function timesOf(entries: Readonly<Record<string, string>>) {
  return decodeReleaseTimes(releaseTimes(entries), "example");
}

describe("release age gate", () => {
  it.effect("types a failed bun info command with its standard error", () =>
    Effect.gen(function* () {
      const error = yield* decodeReleaseTimes(
        output(1, "", "registry unavailable\n"),
        "esbuild"
      ).pipe(Effect.flip);

      expect(error).toHaveProperty("_tag", "DependencyCommandError");
      expect(error.message).toBe("registry unavailable");
    })
  );

  it.effect("names a failed bun info command that prints nothing", () =>
    Effect.gen(function* () {
      const error = yield* decodeReleaseTimes(output(2), "esbuild").pipe(
        Effect.flip
      );

      expect(error.message).toBe("Unable to inspect esbuild.");
    })
  );

  it.effect("types release times that are not a map of dates", () =>
    Effect.gen(function* () {
      const notAMap = yield* decodeReleaseTimes(
        output(0, "[]"),
        "esbuild"
      ).pipe(Effect.flip);
      const notADate = yield* timesOf({ "0.28.2": "not a date" }).pipe(
        Effect.flip
      );

      expect(notAMap.message).toBe("esbuild returned no release times.");
      expect(notADate.message).toBe("example returned no release times.");
    })
  );

  it.effect(
    "chooses the newest stable release that the gate admits by its numeric parts",
    () =>
      Effect.gen(function* () {
        const times = yield* timesOf({
          "0.28.2": OLD,
          "0.28.9": OLD,
          "0.28.10": OLD,
          "0.28.11": INSIDE_GATE,
        });

        expect(Option.getOrUndefined(newestAdmittedRelease(times, NOW))).toBe(
          "0.28.10"
        );
      })
  );

  it.effect("ignores prereleases and the created and modified keys", () =>
    Effect.gen(function* () {
      const times = yield* timesOf({
        "0.9.0": OLD,
        "1.0.0-beta.1": OLD,
        created: OLD,
        modified: OLD,
      });

      expect(Option.getOrUndefined(newestAdmittedRelease(times, NOW))).toBe(
        "0.9.0"
      );
    })
  );

  it.effect("admits a release exactly one release age old", () =>
    Effect.gen(function* () {
      const exactlyOneAgeOld = DateTime.formatIso(
        DateTime.makeUnsafe(NOW - RELEASE_AGE_MILLIS)
      );
      const times = yield* timesOf({ "1.0.0": exactlyOneAgeOld });

      expect(Option.getOrUndefined(newestAdmittedRelease(times, NOW))).toBe(
        "1.0.0"
      );
    })
  );

  it.effect(
    "reports nothing when every stable release is inside the gate",
    () =>
      Effect.gen(function* () {
        const times = yield* timesOf({
          "2.0.0": INSIDE_GATE,
          "2.0.1-rc.1": OLD,
        });

        expect(newestAdmittedRelease(times, NOW)).toEqual(Option.none());
      })
  );
});
