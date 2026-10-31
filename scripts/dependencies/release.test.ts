import { describe, expect, it } from "@effect/vitest";
import { Effect, Option } from "effect";

import { output, releaseVersions } from "#scripts/dependencies/fixture";
import {
  decodeReleaseVersions,
  newestStableRelease,
} from "#scripts/dependencies/release";

/** Decodes one release list exactly as `bun info <name> versions --json` prints it. */
function versionsOf(versions: readonly string[]) {
  return decodeReleaseVersions(releaseVersions(versions), "example");
}

describe("newest stable release", () => {
  it.effect("types a failed bun info command with its standard error", () =>
    Effect.gen(function* () {
      const error = yield* decodeReleaseVersions(
        output(1, "", "registry unavailable\n"),
        "esbuild"
      ).pipe(Effect.flip);

      expect(error).toHaveProperty("_tag", "DependencyCommandError");
      expect(error.message).toBe("registry unavailable");
    })
  );

  it.effect("names a failed bun info command that prints nothing", () =>
    Effect.gen(function* () {
      const error = yield* decodeReleaseVersions(output(2), "esbuild").pipe(
        Effect.flip
      );

      expect(error.message).toBe("Unable to inspect esbuild.");
    })
  );

  it.effect("types release versions that are not a list of strings", () =>
    Effect.gen(function* () {
      const notAList = yield* decodeReleaseVersions(
        output(0, '{"0.28.2":"2026-01-01T00:00:00.000Z"}'),
        "esbuild"
      ).pipe(Effect.flip);
      const notAString = yield* decodeReleaseVersions(
        output(0, "[1]"),
        "esbuild"
      ).pipe(Effect.flip);

      expect(notAList.message).toBe("esbuild returned no release versions.");
      expect(notAString.message).toBe("esbuild returned no release versions.");
    })
  );

  it.effect("chooses the newest stable release by its numeric parts", () =>
    Effect.gen(function* () {
      const versions = yield* versionsOf(["0.28.2", "0.28.10", "0.28.9"]);

      expect(Option.getOrUndefined(newestStableRelease(versions))).toBe(
        "0.28.10"
      );
    })
  );

  it.effect("ignores prereleases", () =>
    Effect.gen(function* () {
      const versions = yield* versionsOf(["0.9.0", "1.0.0-beta.1"]);

      expect(Option.getOrUndefined(newestStableRelease(versions))).toBe(
        "0.9.0"
      );
    })
  );

  it.effect("reports nothing when no release is stable", () =>
    Effect.gen(function* () {
      const versions = yield* versionsOf(["2.0.1-rc.1"]);

      expect(newestStableRelease(versions)).toEqual(Option.none());
    })
  );

  it.effect("keeps only the release line that a hold names", () =>
    Effect.gen(function* () {
      const versions = yield* versionsOf([
        "24.22.0",
        "24.22.1",
        "24.23.0-rc.1",
        "25.0.0",
      ]);

      expect(Option.getOrUndefined(newestStableRelease(versions, "24"))).toBe(
        "24.22.1"
      );
      expect(Option.getOrUndefined(newestStableRelease(versions))).toBe(
        "25.0.0"
      );
    })
  );

  it.effect(
    "reports nothing when no stable release is in the release line",
    () =>
      Effect.gen(function* () {
        const versions = yield* versionsOf(["24.0.0-rc.1", "25.0.0"]);

        expect(newestStableRelease(versions, "24")).toEqual(Option.none());
      })
  );
});
