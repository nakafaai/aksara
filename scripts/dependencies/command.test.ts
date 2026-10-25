import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";

import { runBun } from "#scripts/dependencies/command";

describe("dependency command boundary", () => {
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
