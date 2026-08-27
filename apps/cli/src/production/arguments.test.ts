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

describe("try-out history migration arguments", () => {
  /** Parses one migration command through the production argument boundary. */
  const parseMigration = (args: readonly string[]) =>
    parseProductionArguments("migrate-tryout-history", args);

  it.effect("requires one absolute exclusive receipt destination", () =>
    Effect.gen(function* () {
      const valid = yield* parseMigration([
        "--release-id",
        "retained-history-v1",
        "--receipt-path",
        "/tmp/retained-history-v1.json",
      ]);
      const missing = yield* parseMigration([
        "--release-id",
        "retained-history-v1",
      ]).pipe(Effect.flip);
      const relative = yield* parseMigration([
        "--release-id",
        "retained-history-v1",
        "--receipt-path",
        "retained-history-v1.json",
      ]).pipe(Effect.flip);

      expect(valid).toEqual({
        command: "migrate-tryout-history",
        receiptPath: "/tmp/retained-history-v1.json",
        releaseId: "retained-history-v1",
      });
      expect(missing).toMatchObject({
        option: "--receipt-path",
        reason: "missing",
      });
      expect(relative).toMatchObject({
        option: "--receipt-path",
        reason: "value",
      });
    })
  );

  it.effect("rejects publication and recovery options", () =>
    Effect.gen(function* () {
      const failures = yield* Effect.forEach(
        ["--scope", "--recovery-id"],
        (option) =>
          parseMigration([
            "--release-id",
            "retained-history-v1",
            "--receipt-path",
            "/tmp/retained-history-v1.json",
            option,
            "unexpected",
          ]).pipe(Effect.flip)
      );

      expect(failures).toEqual([
        expect.objectContaining({ option: "--scope", reason: "unknown" }),
        expect.objectContaining({
          option: "--recovery-id",
          reason: "unknown",
        }),
      ]);
    })
  );
});
