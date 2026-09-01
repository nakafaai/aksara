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
const recoveryHash = `sha256:${"b".repeat(64)}`;

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

  it.effect("decodes one explicit full-family rebuild", () =>
    Effect.gen(function* () {
      expect(
        yield* parse([...baseArguments, "--scope", "family:page", "--rebuild"])
      ).toEqual({
        command: "release",
        rebuild: true,
        recoveryId: "recovery-2026-07-22",
        releaseId: "release-2026-07-22",
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
    {
      args: ["--unknown", "value"],
      option: "command",
      reason: "unknown",
    },
    {
      args: ["--asset-hash", assetHash],
      option: "command",
      reason: "unknown",
    },
    {
      args: ["--release-id", "release-next"],
      option: "--recovery-id",
      reason: "missing",
    },
    {
      args: ["--release-id", "release-next", "--recovery-id", "release-next"],
      option: "--recovery-id",
      reason: "identity",
    },
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

describe("audit production arguments", () => {
  it.effect("decodes exact active and retained inverse identities", () =>
    Effect.gen(function* () {
      expect(
        yield* parseProductionArguments("audit", [
          ...baseArguments,
          "--manifest-hash",
          assetHash,
          "--recovery-manifest-hash",
          recoveryHash,
        ])
      ).toEqual({
        command: "audit",
        manifestHash: assetHash,
        recoveryId: "recovery-2026-07-22",
        recoveryManifestHash: recoveryHash,
        releaseId: "release-2026-07-22",
      });
    })
  );

  it.effect.each([
    {
      args: baseArguments,
      option: "--manifest-hash",
      reason: "missing",
    },
    {
      args: [...baseArguments, "--manifest-hash", assetHash],
      option: "--recovery-manifest-hash",
      reason: "missing",
    },
    {
      args: [
        ...baseArguments,
        "--manifest-hash",
        "invalid",
        "--recovery-manifest-hash",
        recoveryHash,
      ],
      option: "--manifest-hash",
      reason: "value",
    },
    {
      args: [
        ...baseArguments,
        "--manifest-hash",
        assetHash,
        "--recovery-manifest-hash",
        "invalid",
      ],
      option: "--recovery-manifest-hash",
      reason: "value",
    },
  ] as const)("rejects invalid audit identity input %#", (input) =>
    Effect.gen(function* () {
      expect(
        yield* parseProductionArguments("audit", input.args).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "audit",
        option: input.option,
        reason: input.reason,
      });
    })
  );
});
