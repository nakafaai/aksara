import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { vi } from "vitest";

import type { GenesisArguments } from "#cli/production/arguments";

const calls = vi.hoisted(() => ({
  args: undefined as GenesisArguments | undefined,
}));

vi.mock("#cli/genesis/run", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    runGenesisCommand: (args: GenesisArguments) => {
      calls.args = args;
      return TestEffect.succeed("genesis-complete");
    },
  };
});

import {
  isMigrationCommand,
  runMigrationCommand,
} from "#cli/migration/program";

it.effect("dispatches the exact genesis signing operation", () =>
  Effect.gen(function* () {
    const args = {
      bundlePath: "/tmp/genesis-runtime.json",
      command: "genesis",
    } satisfies GenesisArguments;

    expect(isMigrationCommand(args)).toBe(true);
    expect(
      yield* runMigrationCommand(args).pipe(
        Effect.provide(
          Layer.mergeAll(NodeHttpClient.layerNodeHttp, NodeServices.layer)
        )
      )
    ).toBe("genesis-complete");
    expect(calls.args).toEqual(args);
  })
);
