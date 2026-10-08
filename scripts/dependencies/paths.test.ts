import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Path } from "effect";
import { defaultBumpConfig } from "#scripts/dependencies/paths";

describe("default dependency policy paths", () => {
  it.effect("derives the workspace root and its policy files", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const config = yield* defaultBumpConfig;

      expect(config.root).toBe(path.dirname(config.manifest));
      expect(config.workspace).toBe(
        path.join(config.root, "pnpm-workspace.yaml")
      );
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
