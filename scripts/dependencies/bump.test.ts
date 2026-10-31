import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Option } from "effect";

import { makeBumpDependenciesProgram } from "#scripts/dependencies/bump";
import {
  approved,
  approvedManifest,
  createConfig,
  installFakeBun,
  makeRunner,
  output,
  releaseVersions,
  reviewedHoldReleases,
} from "#scripts/dependencies/fixture";
import { DEPENDENCY_HOLDS } from "#scripts/dependencies/policy";

afterEach(() => {
  vi.unstubAllEnvs();
});

layer(NodeServices.layer, { excludeTestServices: true })(
  "dependency update policy",
  (it) => {
    it.effect(
      "moves routine declarations to their registry latest and reports every hold through real process IO",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig();
          const path = yield* installFakeBun(config.root, {
            ...reviewedHoldReleases,
            esbuild: ["0.28.2", "0.28.3"],
            "source-map-js": ["1.2.2", "1.2.3"],
            yaml: ["2.9.1", "2.9.2"],
          });
          vi.stubEnv("PATH", path);

          const reports = yield* makeBumpDependenciesProgram(config);
          const effectReport = Option.getOrUndefined(
            Arr.findFirst(reports, ({ dependency }) => dependency === "effect")
          );
          const manifest = yield* fileSystem.readFileString(config.manifest);

          assert.strictEqual(reports.length, DEPENDENCY_HOLDS.length);
          assert.ok(effectReport);
          assert.strictEqual(effectReport.current, approved("effect"));
          assert.ok(manifest.includes('"yaml":"2.9.2"'));
          assert.ok(manifest.includes('"esbuild":"0.28.3"'));
          assert.ok(manifest.includes('"source-map-js":"1.2.3"'));
          assert.ok(manifest.includes('"@probe/app":"workspace:*"'));
        })
    );

    it.effect(
      "keeps a routine declaration on its last stable release while a newer prerelease is out",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig();

          yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              esbuild: releaseVersions(["0.28.2", "0.29.0-beta.1"]),
            })
          );
          const manifest = yield* fileSystem.readFileString(config.manifest);

          assert.ok(manifest.includes('"esbuild":"0.28.2"'));
          assert.strictEqual(manifest.includes("0.29.0-beta.1"), false);
        })
    );

    it.effect("fails when a routine declaration has no stable release", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const error = yield* makeBumpDependenciesProgram(
          config,
          makeRunner({
            yaml: releaseVersions(["3.0.0-rc.1"]),
          })
        ).pipe(Effect.flip);

        assert.strictEqual(error._tag, "DependencyPolicyError");
        assert.strictEqual(error.message, "yaml has no stable release.");
      })
    );

    it.effect(
      "moves the package behind each nested and scoped override key",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig({
            manifest: approvedManifest({
              overrides: {
                "@scope/tool@2.0.0": "2.0.0",
                "parent@1.0.0>leaf": "1.0.0",
              },
            }),
          });

          yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              "@scope/tool": releaseVersions(["2.0.0", "2.0.1"]),
              leaf: releaseVersions(["1.0.0", "1.0.1"]),
            })
          );
          const manifest = yield* fileSystem.readFileString(config.manifest);

          assert.ok(manifest.includes('"@scope/tool@2.0.0":"2.0.1"'));
          assert.ok(manifest.includes('"parent@1.0.0>leaf":"1.0.1"'));
        })
    );

    it.effect(
      "leaves the manifest untouched when every routine declaration is current",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig();
          const before = yield* fileSystem.readFileString(config.manifest);

          const reports = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              esbuild: releaseVersions(["0.28.2"]),
              yaml: releaseVersions(["2.9.1"]),
            })
          );

          assert.strictEqual(reports.length, DEPENDENCY_HOLDS.length);
          assert.strictEqual(
            yield* fileSystem.readFileString(config.manifest),
            before
          );
        })
    );

    it.effect("types a failed registry lookup for a routine dependency", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const error = yield* makeBumpDependenciesProgram(
          config,
          makeRunner({
            esbuild: releaseVersions(["0.28.2"]),
            yaml: output(2, "", "registry unavailable"),
          })
        ).pipe(Effect.flip);

        assert.strictEqual(error._tag, "DependencyCommandError");
        assert.strictEqual(error.message, "registry unavailable");
      })
    );

    it.effect(
      "types a failed bun update after the declarations are written",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner(
              {
                esbuild: releaseVersions(["0.28.2"]),
                yaml: releaseVersions(["2.9.1", "2.9.2"]),
              },
              output(2, "", "update failed")
            )
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyCommandError");
          assert.strictEqual(error.message, "update failed");
        })
    );

    it.effect("names a failed bun update that prints nothing", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const error = yield* makeBumpDependenciesProgram(
          config,
          makeRunner(
            {
              esbuild: releaseVersions(["0.28.2"]),
              yaml: releaseVersions(["2.9.1"]),
            },
            output(2)
          )
        ).pipe(Effect.flip);

        assert.strictEqual(error.message, "bun update failed.");
      })
    );
  }
);
