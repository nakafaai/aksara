import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Option, Ref } from "effect";

import { makeBumpDependenciesProgram } from "#scripts/dependencies/bump";
import type { BunRunner } from "#scripts/dependencies/command";
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
  reviewedRegistry,
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
            ...reviewedRegistry,
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

    it.effect(
      "fails before writing or updating when a reviewed hold drifts",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig({
            manifest: approvedManifest({ catalog: { effect: "4.0.6" } }),
          });
          const before = yield* fileSystem.readFileString(config.manifest);
          const commands = yield* Ref.make<readonly (readonly string[])[]>([]);
          /** Records every Bun command that the policy runs before the fixture answers it. */
          const runner: BunRunner = (root, args) =>
            Effect.andThen(
              Ref.update(commands, (list) => Arr.append(list, args)),
              makeRunner()(root, args)
            );

          const error = yield* makeBumpDependenciesProgram(config, runner).pipe(
            Effect.flip
          );

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes("effect declares 4.0.6; approved 4.0.5.")
          );
          const recorded = yield* Ref.get(commands);
          assert.strictEqual(
            Arr.some(recorded, ([command]) => command === "update"),
            false
          );
          assert.strictEqual(
            yield* fileSystem.readFileString(config.manifest),
            before
          );
        })
    );

    it.effect(
      "fails when a reviewed hold has a newer upstream than its review",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({ "effect@latest": output(0, '"4.0.7"') })
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes(
              "effect upstream is 4.0.7; last reviewed 4.0.6."
            )
          );
        })
    );

    it.effect(
      "fails when the manifest no longer declares a reviewed hold",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig({
            manifest: approvedManifest({ omit: "ultracite" }),
          });
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner()
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes(
              "ultracite declares missing; approved 8.0.2."
            )
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
