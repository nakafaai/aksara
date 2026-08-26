import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseProductionArguments } from "#cli/production/arguments";

const baseArguments = [
  "--release-id",
  "release-2026-07-22",
  "--recovery-id",
  "recovery-2026-07-22",
] as const;

/** Runs production argument decoding at the test runner boundary. */
function parse(args: readonly string[]) {
  return Effect.runPromise(parseProductionArguments("release", args));
}

/** Returns one typed production argument failure without FiberFailure. */
function reject(args: readonly string[]) {
  return Effect.runPromise(
    parseProductionArguments("release", args).pipe(Effect.flip)
  );
}

describe("release production arguments", () => {
  it("decodes one explicit family publication scope", async () => {
    await expect(
      parse([...baseArguments, "--scope", "family:material"])
    ).resolves.toEqual({
      command: "release",
      recoveryId: "recovery-2026-07-22",
      releaseId: "release-2026-07-22",
      scope: {
        families: ["material"],
        snapshots: [],
      },
    });
  });

  it("rejects a release without an explicit publication scope", async () => {
    await expect(reject(baseArguments)).resolves.toMatchObject({
      _tag: "ProductionArgumentsError",
      command: "release",
      option: "--scope",
      reason: "missing",
    });
  });

  it("rejects an invalid publication scope selector", async () => {
    await expect(
      reject([...baseArguments, "--scope", "material"])
    ).resolves.toMatchObject({
      _tag: "ProductionArgumentsError",
      command: "release",
      option: "--scope",
      reason: "value",
    });
  });

  it("rejects retired exact-content publication selectors", async () => {
    await expect(
      reject([
        ...baseArguments,
        "--scope",
        "content:material:en:material/lesson/mathematics/function-concept",
      ])
    ).resolves.toMatchObject({
      _tag: "ProductionArgumentsError",
      command: "release",
      option: "--scope",
      reason: "value",
    });
  });
});
