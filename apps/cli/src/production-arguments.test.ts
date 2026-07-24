import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { parseProductionArguments } from "#cli/production-arguments";

const FUNCTION_CONTENT_KEY =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
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
  it("decodes one explicit exact mandatory publication scope", async () => {
    await expect(
      parse([
        ...baseArguments,
        "--scope",
        `content:material:en:${FUNCTION_CONTENT_KEY}`,
        "--scope",
        `content:material:id:${FUNCTION_CONTENT_KEY}`,
      ])
    ).resolves.toEqual({
      command: "release",
      recoveryId: "recovery-2026-07-22",
      releaseId: "release-2026-07-22",
      scope: {
        content: [
          {
            contentKey: FUNCTION_CONTENT_KEY,
            family: "material",
            locale: "en",
          },
          {
            contentKey: FUNCTION_CONTENT_KEY,
            family: "material",
            locale: "id",
          },
        ],
        families: [],
        snapshots: [],
      },
    });
  });

  it("rejects a release without an explicit publication scope", async () => {
    await expect(reject(baseArguments)).resolves.toEqual({
      _tag: "ProductionArgumentsError",
      command: "release",
      option: "--scope",
      reason: "missing",
    });
  });

  it("rejects an invalid publication scope selector", async () => {
    await expect(
      reject([...baseArguments, "--scope", "material"])
    ).resolves.toEqual({
      _tag: "ProductionArgumentsError",
      command: "release",
      option: "--scope",
      reason: "value",
    });
  });
});
