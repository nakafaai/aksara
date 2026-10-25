import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Option } from "effect";

import { makeBumpDependenciesProgram } from "#scripts/dependencies/bump";
import {
  approved,
  approvedManifest,
  createConfig,
  GATED_RELEASE,
  installFakeBun,
  makeRunner,
  output,
  PAST_RELEASE,
  releaseTimes,
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
            esbuild: { "0.28.2": PAST_RELEASE, "0.28.3": PAST_RELEASE },
            "source-map-js": { "1.2.2": PAST_RELEASE, "1.2.3": PAST_RELEASE },
            yaml: { "2.9.1": PAST_RELEASE, "2.9.2": PAST_RELEASE },
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
      "keeps a routine declaration on its last release while a newer one is inside the release-age gate",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig();

          yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              esbuild: releaseTimes({
                "0.28.2": PAST_RELEASE,
                "0.28.3": GATED_RELEASE,
              }),
            })
          );
          const manifest = yield* fileSystem.readFileString(config.manifest);

          assert.ok(manifest.includes('"esbuild":"0.28.2"'));
          assert.strictEqual(manifest.includes('"esbuild":"0.28.3"'), false);
        })
    );

    it.effect(
      "fails when no stable release of a routine declaration is older than the release-age gate",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              yaml: releaseTimes({ "2.9.2": GATED_RELEASE }),
            })
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.strictEqual(
            error.message,
            "yaml has no stable release older than the one-day release-age gate."
          );
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
              "@scope/tool": releaseTimes({
                "2.0.0": PAST_RELEASE,
                "2.0.1": PAST_RELEASE,
              }),
              leaf: releaseTimes({
                "1.0.0": PAST_RELEASE,
                "1.0.1": PAST_RELEASE,
              }),
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
              esbuild: releaseTimes({ "0.28.2": PAST_RELEASE }),
              yaml: releaseTimes({ "2.9.1": PAST_RELEASE }),
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
            esbuild: releaseTimes({ "0.28.2": PAST_RELEASE }),
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
                esbuild: releaseTimes({ "0.28.2": PAST_RELEASE }),
                yaml: releaseTimes({
                  "2.9.1": PAST_RELEASE,
                  "2.9.2": PAST_RELEASE,
                }),
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
              esbuild: releaseTimes({ "0.28.2": PAST_RELEASE }),
              yaml: releaseTimes({ "2.9.1": PAST_RELEASE }),
            },
            output(2)
          )
        ).pipe(Effect.flip);

        assert.strictEqual(error.message, "bun update failed.");
      })
    );
  }
);
