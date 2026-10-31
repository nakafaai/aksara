import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseProductionArguments } from "#cli/production/arguments";

const baseArguments = [
  "--release-id",
  "release-2026-07-22",
  "--recovery-id",
  "recovery-2026-07-22",
] as const;
const assetHash = `sha256:${"a".repeat(64)}`;
const next = ["--release-id", "release-next"] as const;
const nextInverse = [...next, "--recovery-id", "release-next"] as const;

/** Decodes one production argument collection. */
function parse(args: readonly string[]) {
  return parseProductionArguments("release", args);
}

/** Returns one typed production argument failure. */
function reject(args: readonly string[]) {
  return parseProductionArguments("release", args).pipe(Effect.flip);
}

describe("release production arguments", () => {
  it.effect("decodes one explicit family publication scope", () =>
    Effect.gen(function* () {
      expect(
        yield* parse([...baseArguments, "--scope", "family:material"])
      ).toEqual({
        command: "release",
        releaseId: "release-2026-07-22",
        retention: {
          recoveryId: "recovery-2026-07-22",
        },
        scope: {
          families: ["material"],
          snapshots: [],
        },
      });
    })
  );

  it.effect("decodes one explicit full-family rebuild", () =>
    Effect.gen(function* () {
      expect(
        yield* parse([...baseArguments, "--scope", "family:page", "--rebuild"])
      ).toEqual({
        command: "release",
        rebuild: true,
        releaseId: "release-2026-07-22",
        retention: {
          recoveryId: "recovery-2026-07-22",
        },
        scope: {
          families: ["page"],
          snapshots: [],
        },
      });
    })
  );

  it.effect("rejects a duplicate rebuild flag", () =>
    Effect.gen(function* () {
      expect(
        yield* reject([
          ...baseArguments,
          "--scope",
          "family:page",
          "--rebuild",
          "--rebuild",
        ])
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--rebuild",
        reason: "duplicate",
      });
    })
  );

  it.effect("rejects a release without an explicit publication scope", () =>
    Effect.gen(function* () {
      expect(yield* reject(baseArguments)).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "missing",
      });
    })
  );

  it.effect("rejects an invalid publication scope selector", () =>
    Effect.gen(function* () {
      expect(
        yield* reject([...baseArguments, "--scope", "material"])
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "value",
      });
    })
  );

  it.effect("rejects retired exact-content publication selectors", () =>
    Effect.gen(function* () {
      expect(
        yield* reject([
          ...baseArguments,
          "--scope",
          "content:material:en:material/lesson/mathematics/function-concept",
        ])
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "value",
      });
    })
  );

  it.effect.each([
    { args: ["--unknown", "value"], option: "command", reason: "unknown" },
    { args: ["--asset-hash", assetHash], option: "command", reason: "unknown" },
    { args: next, option: "--recovery-id", reason: "missing" },
    { args: nextInverse, option: "--recovery-id", reason: "identity" },
  ] as const)("rejects invalid production input %#", (input) =>
    Effect.gen(function* () {
      expect(yield* reject(input.args)).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: input.option,
        reason: input.reason,
      });
    })
  );
});

describe("recovery options by command", () => {
  it.effect.each([
    ["accept", "--recovery-id", "missing", next],
    ["parity", "--recovery-id", "missing", next],
    ["recover", "--recovery-id", "missing", next],
    ["accept", "--recovery-id", "identity", nextInverse],
    ["parity", "--recovery-id", "identity", nextInverse],
    ["recover", "--recovery-id", "identity", nextInverse],
  ] as const)("rejects %s with %s as %s", ([command, option, reason, args]) =>
    Effect.gen(function* () {
      expect(
        yield* parseProductionArguments(command, args).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command,
        option,
        reason,
      });
    })
  );
});
