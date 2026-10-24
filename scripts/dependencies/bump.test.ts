import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@effect/vitest";
import {
  Array as Arr,
  Config,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";

import {
  type BumpDependenciesConfig,
  makeBumpDependenciesProgram,
} from "#scripts/dependencies/bump";
import type { BunRunner } from "#scripts/dependencies/command";
import { makeRunner, output } from "#scripts/dependencies/fixture";
import { DEPENDENCY_HOLDS } from "#scripts/dependencies/policy";

const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Returns the approved declaration for one held dependency. */
function approved(dependency: string) {
  const hold = Option.getOrUndefined(
    Arr.findFirst(DEPENDENCY_HOLDS, (entry) => entry.dependency === dependency)
  );
  assert.ok(hold, `${dependency} has a reviewed hold`);
  return hold.approvedCurrent;
}

/** The registry answer for every reviewed hold, which is its reviewed upstream version. */
const reviewedRegistry = Rec.fromEntries(
  DEPENDENCY_HOLDS.map((hold) => [hold.registry, hold.reviewedLatest] as const)
);

/** A root manifest that declares every reviewed hold at its approved version, plus routine dependencies. */
function approvedManifest(overrides?: {
  readonly catalog?: Readonly<Record<string, string>>;
  readonly omit?: string;
}) {
  const catalog: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  for (const hold of DEPENDENCY_HOLDS) {
    if (hold.source === "catalog") {
      catalog[hold.dependency] = hold.approvedCurrent;
    }
    if (hold.source === "root-dev-dependency") {
      devDependencies[hold.dependency] = hold.approvedCurrent;
    }
  }
  const omitted = overrides?.omit;
  const declared = Rec.filter(
    { ...devDependencies, "@probe/app": "workspace:*", yaml: "2.9.1" },
    (_, name) => name !== omitted
  );
  return {
    devDependencies: declared,
    devEngines: {
      runtime: { name: "node", onFail: "download", version: approved("node") },
    },
    packageManager: `bun@${approved("bun")}`,
    workspaces: {
      catalog: { ...catalog, esbuild: "0.28.2", ...overrides?.catalog },
      packages: ["apps/*", "packages/*"],
    },
  };
}

/** Writes one root manifest, or the exact text given, into a fresh temporary workspace. */
const createConfig = Effect.fn("BumpDependenciesTest.createConfig")(
  function* (input?: { readonly manifest?: unknown; readonly text?: string }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-bump-deps-",
    });
    const manifest = path.join(root, "package.json");
    const text =
      input?.text ??
      (yield* Schema.encodeEffect(JsonText)(
        input?.manifest ?? approvedManifest()
      ));
    yield* fileSystem.writeFileString(manifest, text);
    return { manifest, root } satisfies BumpDependenciesConfig;
  }
);

/** Installs a local bun executable that answers registry lookups from one table and accepts updates. */
const installFakeBun = Effect.fn("BumpDependenciesTest.installFakeBun")(
  function* (root: string, registry: Readonly<Record<string, string>>) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const executable = path.join(root, "bun");
    const registryText = yield* Schema.encodeEffect(JsonText)(registry);
    yield* fileSystem.writeFileString(
      executable,
      `#!/usr/bin/env node
const args = process.argv.slice(2);
const registry = ${registryText};
if (args[0] === "info") {
  console.log(JSON.stringify(registry[args[1]] ?? "missing"));
  process.exit(0);
}
process.exit(args[0] === "update" ? 0 : 2);
`
    );
    yield* fileSystem.chmod(executable, 0o755);
    const originalPath = yield* Config.String("PATH").pipe(
      Config.withDefault("")
    );
    vi.stubEnv("PATH", `${root}:${originalPath}`);
  }
);

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
          yield* installFakeBun(config.root, {
            ...reviewedRegistry,
            "esbuild@latest": "0.28.3",
            "yaml@latest": "2.9.2",
          });

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
          assert.ok(manifest.includes('"@probe/app":"workspace:*"'));
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
              "esbuild@latest": output(0, '"0.28.2"'),
              "yaml@latest": output(0, '"2.9.1"'),
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
          const commands: (readonly string[])[] = [];
          const runner: BunRunner = (root, args) => {
            commands.push(args);
            return makeRunner()(root, args);
          };

          const error = yield* makeBumpDependenciesProgram(config, runner).pipe(
            Effect.flip
          );

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes("effect declares 4.0.6; approved 4.0.5.")
          );
          assert.strictEqual(
            commands.some(([command]) => command === "update"),
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
            "esbuild@latest": output(0, '"0.28.2"'),
            "yaml@latest": output(2, "", "registry unavailable"),
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
                "esbuild@latest": output(0, '"0.28.2"'),
                "yaml@latest": output(0, '"2.9.2"'),
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
              "esbuild@latest": output(0, '"0.28.2"'),
              "yaml@latest": output(0, '"2.9.1"'),
            },
            output(2)
          )
        ).pipe(Effect.flip);

        assert.strictEqual(error.message, "bun update failed.");
      })
    );

    it.effect("types unreadable, invalid JSON, and incomplete manifests", () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const config = yield* createConfig();
        const missing = yield* makeBumpDependenciesProgram(
          { ...config, manifest: path.join(config.root, "missing.json") },
          makeRunner()
        ).pipe(Effect.flip);
        assert.strictEqual(missing._tag, "DependencyPolicyError");

        const invalid = yield* createConfig({ text: "{" });
        const invalidFailure = yield* makeBumpDependenciesProgram(
          invalid,
          makeRunner()
        ).pipe(Effect.flip);
        assert.ok(invalidFailure.message.includes("is not valid"));

        const incomplete = yield* createConfig({ text: "{}" });
        const incompleteFailure = yield* makeBumpDependenciesProgram(
          incomplete,
          makeRunner()
        ).pipe(Effect.flip);
        assert.ok(incompleteFailure.message.includes("has an invalid shape"));
      })
    );
  }
);
