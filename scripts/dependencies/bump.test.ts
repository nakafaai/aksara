import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import { stringify } from "yaml";

import {
  type BumpDependenciesConfig,
  makeBumpDependenciesProgram,
} from "#scripts/dependencies/bump";
import {
  DependencyCommandError,
  type PnpmRunner,
} from "#scripts/dependencies/command";
import { makeRunner, output } from "#scripts/dependencies/fixture";
import {
  DEPENDENCY_HOLDS,
  expectedIgnoredDependencies,
} from "#scripts/dependencies/policy";

const runtime = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@effect/platform-node", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node")>();
  return {
    ...platform,
    NodeRuntime: {
      ...platform.NodeRuntime,
      runMain: vi.fn(() => {
        runtime.calls += 1;
      }),
    },
  };
});

const originalPath = process.env.PATH;

/** Writes one complete dependency-policy fixture. */
const createConfig = Effect.fn("BumpDependenciesTest.createConfig")(
  function* (input?: {
    readonly invalidManifest?: string;
    readonly invalidWorkspace?: string;
    readonly omitUltracite?: boolean;
    readonly omitIgnore?: string;
  }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-bump-deps-",
    });
    const manifest = path.join(root, "package.json");
    const workspace = path.join(root, "pnpm-workspace.yaml");
    const devDependencies: Record<string, string> = {
      "@biomejs/biome": "2.5.12",
      "@effect/tsgo": "0.41.0",
      "@types/node": "24.13.3",
      "@typescript/native": "npm:typescript@7.0.2",
      ...(input?.omitUltracite ? {} : { ultracite: "7.10.8" }),
    };
    const ignoreDeps = expectedIgnoredDependencies().filter(
      (dependency) => dependency !== input?.omitIgnore
    );

    yield* fileSystem.writeFileString(
      manifest,
      input?.invalidManifest ??
        JSON.stringify({
          devDependencies,
          devEngines: { runtime: { version: "24.20.0" } },
          packageManager: "pnpm@11.25.0",
        })
    );
    yield* fileSystem.writeFileString(
      workspace,
      input?.invalidWorkspace ??
        stringify({
          catalog: {
            "@effect/platform-node": "4.0.0-rc.112",
            "@effect/vitest": "4.0.0-rc.112",
            "@vitest/coverage-istanbul": "4.1.11",
            effect: "4.0.0-rc.112",
            typescript: "npm:@typescript/typescript6@6.0.2",
            vitest: "4.1.11",
          },
          update: { ignoreDeps },
        })
    );
    return { manifest, root, workspace } satisfies BumpDependenciesConfig;
  }
);

/** Returns one typed program failure at the Vitest boundary. */
const fail = Effect.fn("BumpDependenciesTest.fail")(
  (config: BumpDependenciesConfig, runner: PnpmRunner) =>
    makeBumpDependenciesProgram(config, runner).pipe(Effect.flip)
);

/** Installs a local pnpm executable that serves the reviewed registry view. */
const installFakePnpm = Effect.fn("BumpDependenciesTest.installFakePnpm")(
  function* (root: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const versions = Object.fromEntries(
      DEPENDENCY_HOLDS.map(({ registry, reviewedLatest }) => [
        registry,
        reviewedLatest,
      ])
    );
    const executable = path.join(root, "pnpm");
    yield* fileSystem.writeFileString(
      executable,
      `#!/usr/bin/env node
const args = process.argv.slice(2);
const versions = ${JSON.stringify(versions)};
if (args[0] === "view") console.log(JSON.stringify(versions[args[1]]));
if (args[0] === "outdated") { console.log("{}"); process.exitCode = 1; }
`
    );
    yield* fileSystem.chmod(executable, 0o755);
    vi.stubEnv("PATH", `${root}:${originalPath ?? ""}`);
  }
);

afterEach(() => {
  vi.unstubAllEnvs();
});

layer(NodeServices.layer, { excludeTestServices: true })(
  "dependency update policy",
  (it) => {
    it.effect(
      "updates routines and reports every approved hold through real process IO",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          yield* installFakePnpm(config.root);

          const reports = yield* makeBumpDependenciesProgram(config);
          const effectReport = reports.find(
            ({ dependency }) => dependency === "effect"
          );

          assert.strictEqual(reports.length, DEPENDENCY_HOLDS.length);
          assert.ok(effectReport);
          assert.strictEqual(effectReport.current, "4.0.0-rc.112");
          assert.strictEqual(effectReport.latest, "4.0.0-rc.112");
          assert.strictEqual(runtime.calls, 1);
        })
    );

    it.effect(
      "fails with every unresolved declaration, registry, and routine hold",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig({ omitUltracite: true });
          const error = yield* fail(
            config,
            makeRunner({
              outdated: output(1, '{"yaml":{}}'),
              registry: {
                "ultracite@latest": output(0, '"7.10.7"'),
              },
            })
          );

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(error.detail.includes("ultracite declares no version"));
          assert.ok(error.detail.includes("ultracite upstream is 7.10.7"));
          assert.ok(
            error.detail.includes("Routine dependencies remain outdated: yaml")
          );
        })
    );

    it.effect(
      "fails before updating when dependency safety policy drifts",
      () =>
        Effect.gen(function* () {
          const runner = vi.fn(makeRunner());
          const config = yield* createConfig({
            omitIgnore: "effect",
          });
          const error = yield* fail(config, runner);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(error.detail.includes("update.ignoreDeps"));
          assert.strictEqual(runner.mock.calls.length, 0);
        })
    );

    it.effect("types update and repository file failures", () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const config = yield* createConfig();
        const updateFailure = yield* fail(
          config,
          makeRunner({ update: output(2, "", "update failed") })
        );
        assert.strictEqual(updateFailure._tag, "DependencyCommandError");
        assert.strictEqual(updateFailure.detail, "update failed");

        const emptyUpdateFailure = yield* fail(
          config,
          makeRunner({ update: output(2) })
        );
        assert.strictEqual(emptyUpdateFailure.detail, "pnpm update failed.");

        const missingManifest = yield* fail(
          {
            ...config,
            manifest: path.join(config.root, "missing.json"),
          },
          makeRunner()
        );
        assert.strictEqual(missingManifest._tag, "DependencyPolicyError");

        const invalidManifest = yield* createConfig({ invalidManifest: "{" });
        const invalidManifestFailure = yield* fail(
          invalidManifest,
          makeRunner()
        );
        assert.ok(invalidManifestFailure.detail.includes("is not valid"));

        const emptyManifest = yield* createConfig({ invalidManifest: "{}" });
        const emptyManifestFailure = yield* fail(emptyManifest, makeRunner());
        assert.ok(emptyManifestFailure.detail.includes("invalid shape"));

        const invalidWorkspace = yield* createConfig({
          invalidWorkspace: "[invalid",
        });
        const invalidWorkspaceFailure = yield* fail(
          invalidWorkspace,
          makeRunner()
        );
        assert.ok(invalidWorkspaceFailure.detail.includes("is not valid"));

        const emptyWorkspace = yield* createConfig({ invalidWorkspace: "{}" });
        const emptyWorkspaceFailure = yield* fail(emptyWorkspace, makeRunner());
        assert.ok(emptyWorkspaceFailure.detail.includes("invalid shape"));
      })
    );

    it.effect("preserves injected command-service failures", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const error = yield* fail(config, () =>
          Effect.fail(
            new DependencyCommandError({ detail: "runner unavailable" })
          )
        );

        assert.strictEqual(error.detail, "runner unavailable");
      })
    );

    it.effect("accepts an explicit fake runner without process services", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const runner = makeRunner();
        const reports = yield* makeBumpDependenciesProgram(config, runner);
        const missingRegistry = yield* runner(config.root, ["view"]);

        assert.ok(reports.every(({ current }) => current !== "missing"));
        assert.deepStrictEqual(missingRegistry, output(0, '"missing"'));
      })
    );
  }
);
