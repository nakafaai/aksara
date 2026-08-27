import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  type ProductionCommand,
  parseProductionArguments,
} from "#cli/production/arguments";

const assetHash = `sha256:${"a".repeat(64)}`;

describe("production argument failures", () => {
  it.effect.each([
    {
      args: ["--unknown", "value"],
      command: "release",
      option: "command",
      reason: "unknown",
    },
    {
      args: ["--asset-hash", assetHash],
      command: "release",
      option: "--asset-hash",
      reason: "unknown",
    },
    {
      args: ["--release-id", "release-next"],
      command: "release",
      option: "--recovery-id",
      reason: "missing",
    },
    {
      args: ["--release-id", "release-next", "--recovery-id", "release-next"],
      command: "release",
      option: "--recovery-id",
      reason: "identity",
    },
  ] as const)("rejects invalid production input %#", (input) =>
    Effect.gen(function* () {
      const failure = yield* parseProductionArguments(
        input.command satisfies ProductionCommand,
        input.args
      ).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: input.command,
        option: input.option,
        reason: input.reason,
      });
    })
  );
});
