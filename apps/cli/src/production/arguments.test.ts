import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseProductionArguments } from "#cli/production/arguments";

const baseArguments = [
  "--release-id",
  "release-2026-07-22",
  "--recovery-id",
  "recovery-2026-07-22",
] as const;

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
        recoveryId: "recovery-2026-07-22",
        releaseId: "release-2026-07-22",
        scope: {
          families: ["material"],
          snapshots: [],
        },
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
});

describe("genesis runtime arguments", () => {
  it.effect("requires one absolute exclusive bundle destination", () =>
    Effect.gen(function* () {
      const accepted = yield* parseProductionArguments("genesis", [
        "--bundle-path",
        "/tmp/genesis-runtime.json",
      ]);
      const missing = yield* parseProductionArguments("genesis", []).pipe(
        Effect.flip
      );
      const relative = yield* parseProductionArguments("genesis", [
        "--bundle-path",
        "genesis-runtime.json",
      ]).pipe(Effect.flip);
      const unrelated = yield* parseProductionArguments("genesis", [
        "--release-id",
        "genesis",
      ]).pipe(Effect.flip);

      expect(accepted).toEqual({
        bundlePath: "/tmp/genesis-runtime.json",
        command: "genesis",
      });
      expect(missing).toMatchObject({
        option: "--bundle-path",
        reason: "missing",
      });
      expect(relative).toMatchObject({
        option: "--bundle-path",
        reason: "value",
      });
      expect(unrelated).toMatchObject({
        option: "--release-id",
        reason: "unknown",
      });
    })
  );
});
