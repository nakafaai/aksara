import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import { stringify } from "yaml";

import {
  type BumpDependenciesConfig,
  defaultBumpConfig,
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
const JsonText = Schema.fromJsonString(Schema.Unknown);

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

/** Returns the approved declaration for one held dependency. */
function approved(dependency: string) {
  const hold = DEPENDENCY_HOLDS.find(
    (entry) => entry.dependency === dependency
  );
  assert.ok(hold, `${dependency} has a reviewed hold`);
  return hold.approvedCurrent;
}

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
      "@biomejs/biome": approved("@biomejs/biome"),
      "@effect/tsgo": approved("@effect/tsgo"),
      "@types/node": approved("@types/node"),
      ...(input?.omitUltracite ? {} : { ultracite: approved("ultracite") }),
    };
    const ignoreDeps = Arr.filter(
      expectedIgnoredDependencies(),
      (dependency) => dependency !== input?.omitIgnore
    );

    const manifestText =
      input?.invalidManifest ??
      (yield* Schema.encodeEffect(JsonText)({
        devDependencies,
        devEngines: { runtime: { version: approved("node") } },
        packageManager: `pnpm@${approved("pnpm")}`,
      }));
    yield* fileSystem.writeFileString(manifest, manifestText);
    yield* fileSystem.writeFileString(
      workspace,
      input?.invalidWorkspace ??
        stringify({
          catalog: {
            "@effect/platform-node": approved("@effect/platform-node"),
            "@effect/vitest": approved("@effect/vitest"),
            "@vitest/coverage-istanbul": approved("@vitest/coverage-istanbul"),
            effect: approved("effect"),
            typescript: approved("typescript"),
            vitest: approved("vitest"),
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
    const versions = Rec.fromEntries(
      Arr.map(
        DEPENDENCY_HOLDS,
        ({ registry, reviewedLatest }): readonly [string, string] => [
          registry,
          reviewedLatest,
        ]
      )
    );
    const executable = path.join(root, "pnpm");
    const versionsText = yield* Schema.encodeEffect(JsonText)(versions);
    yield* fileSystem.writeFileString(
      executable,
      `#!/usr/bin/env node
const args = process.argv.slice(2);
const versions = ${versionsText};
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
          const effectReport = Option.getOrUndefined(
            Arr.findFirst(reports, ({ dependency }) => dependency === "effect")
          );

          assert.strictEqual(reports.length, DEPENDENCY_HOLDS.length);
          assert.ok(effectReport);
          assert.strictEqual(effectReport.current, approved("effect"));
          assert.strictEqual(
            effectReport.latest,
            DEPENDENCY_HOLDS.find(({ dependency }) => dependency === "effect")
              ?.reviewedLatest
          );
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
          assert.ok(error.message.includes("ultracite declares no version"));
          assert.ok(error.message.includes("ultracite upstream is 7.10.7"));
          assert.ok(
            error.message.includes("Routine dependencies remain outdated: yaml")
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
          assert.ok(error.message.includes("update.ignoreDeps"));
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
        assert.strictEqual(updateFailure.message, "update failed");

        const emptyUpdateFailure = yield* fail(
          config,
          makeRunner({ update: output(2) })
        );
        assert.strictEqual(emptyUpdateFailure.message, "pnpm update failed.");

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
        assert.ok(invalidManifestFailure.message.includes("is not valid"));

        const emptyManifest = yield* createConfig({ invalidManifest: "{}" });
        const emptyManifestFailure = yield* fail(emptyManifest, makeRunner());
        assert.ok(emptyManifestFailure.message.includes("invalid shape"));

        const invalidWorkspace = yield* createConfig({
          invalidWorkspace: "[invalid",
        });
        const invalidWorkspaceFailure = yield* fail(
          invalidWorkspace,
          makeRunner()
        );
        assert.ok(invalidWorkspaceFailure.message.includes("is not valid"));

        const emptyWorkspace = yield* createConfig({ invalidWorkspace: "{}" });
        const emptyWorkspaceFailure = yield* fail(emptyWorkspace, makeRunner());
        assert.ok(emptyWorkspaceFailure.message.includes("invalid shape"));
      })
    );

    it.effect("preserves injected command-service failures", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const error = yield* fail(config, () =>
          Effect.fail(
            new DependencyCommandError({ message: "runner unavailable" })
          )
        );

        assert.strictEqual(error.message, "runner unavailable");
      })
    );

    it.effect("accepts an explicit fake runner without process services", () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const runner = makeRunner();
        const reports = yield* makeBumpDependenciesProgram(config, runner);
        const missingRegistry = yield* runner(config.root, ["view"]);

        assert.ok(Arr.every(reports, ({ current }) => current !== "missing"));
        assert.deepStrictEqual(missingRegistry, output(0, '"missing"'));
      })
    );

    it.effect("reads the repository policy files by default", () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const config = yield* defaultBumpConfig;

        assert.strictEqual(yield* fileSystem.exists(config.manifest), true);
        assert.strictEqual(yield* fileSystem.exists(config.workspace), true);
      })
    );
  }
);
