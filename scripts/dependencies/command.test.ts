import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";

import {
  type CommandOutput,
  decodeOutdatedDependencies,
  decodeRegistryVersion,
  runPnpm,
} from "#scripts/dependencies/command";

/** Creates one exact command observation. */
function output(exitCode = 0, stdout = "", stderr = ""): CommandOutput {
  return { exitCode, stderr, stdout };
}

describe("dependency command boundary", () => {
  it.effect("decodes registry and outdated responses", () =>
    Effect.gen(function* () {
      const version = yield* decodeRegistryVersion(
        output(0, '"4.0.0-rc.112"'),
        "effect@rc"
      );
      const outdated = yield* decodeOutdatedDependencies(
        output(1, '{"yaml":{}}')
      );
      const current = yield* decodeOutdatedDependencies(output(0));

      expect(version).toBe("4.0.0-rc.112");
      expect(outdated).toEqual(["yaml"]);
      expect(current).toEqual([]);
    })
  );

  it.effect("types every invalid command response", () =>
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
      const outdatedErrors = yield* Effect.forEach(
        [
          output(2),
          output(2, "", "outdated unavailable"),
          output(1, "not-json"),
          output(1, "null"),
        ],
        (response) => decodeOutdatedDependencies(response).pipe(Effect.flip)
      );

      for (const error of [...registryErrors, ...outdatedErrors]) {
        expect(error).toHaveProperty("_tag", "DependencyCommandError");
      }
    })
  );

  it.effect("maps a missing pnpm executable to a typed failure", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-command-",
      });
      const originalPath = process.env.PATH;
      process.env.PATH = root;
      const error = yield* runPnpm(root, ["--version"]).pipe(
        Effect.flip,
        Effect.ensuring(
          Effect.sync(() => {
            process.env.PATH = originalPath;
          })
        )
      );
      expect(error).toHaveProperty("_tag", "DependencyCommandError");
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
