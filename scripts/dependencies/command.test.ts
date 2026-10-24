import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";

import { decodeRegistryVersion, runBun } from "#scripts/dependencies/command";
import { output } from "#scripts/dependencies/fixture";

describe("dependency command boundary", () => {
  it.effect("decodes the registry version that bun info returns", () =>
    Effect.gen(function* () {
      const version = yield* decodeRegistryVersion(
        output(0, '"4.0.0-rc.112"'),
        "effect@rc"
      );

      expect(version).toBe("4.0.0-rc.112");
    })
  );

  it.effect("types every invalid registry response", () =>
    Effect.gen(function* () {
      const registryErrors = yield* Effect.forEach(
        [
          output(2),
          output(2, "", "registry unavailable"),
          output(0, "not-json"),
          output(0, "null"),
        ],
        (response) =>
          decodeRegistryVersion(response, "effect@rc").pipe(Effect.flip)
      );

      for (const error of registryErrors) {
        expect(error).toHaveProperty("_tag", "DependencyCommandError");
      }
    })
  );

  it.effect("maps a missing bun executable to a typed failure", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-command-",
      });
      vi.stubEnv("PATH", root);
      const error = yield* runBun(root, ["--version"]).pipe(
        Effect.flip,
        Effect.ensuring(
          Effect.sync(() => {
            vi.unstubAllEnvs();
          })
        )
      );
      expect(error).toHaveProperty("_tag", "DependencyCommandError");
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
