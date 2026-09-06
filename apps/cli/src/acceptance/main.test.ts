import { describe, expect, it } from "@effect/vitest";
import { ConfigProvider, Effect } from "effect";

const runtime = vi.hoisted(() => ({
  runMain: vi.fn<(program: Effect.Effect<unknown, unknown>) => void>(),
}));

vi.mock("@effect/platform-node", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@effect/platform-node")>();
  return {
    ...original,
    NodeRuntime: { ...original.NodeRuntime, runMain: runtime.runMain },
  };
});

describe("acceptance executable boundary", () => {
  it.effect(
    "provides the native platform and rejects absent acceptance settings before publication",
    () =>
      Effect.gen(function* () {
        yield* Effect.promise(() => import("#cli/acceptance/main"));
        expect(runtime.runMain).toHaveBeenCalledTimes(1);
        const program = yield* Effect.fromNullishOr(
          runtime.runMain.mock.calls[0]?.[0]
        );
        const error = yield* program.pipe(
          Effect.provideService(
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromUnknown({})
          ),
          Effect.flip
        );
        expect(error).toMatchObject({
          _tag: "ProductionError",
          failure: "ConfigError",
          stage: "publish",
        });
      })
  );
});
