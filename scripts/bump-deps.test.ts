import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import { stringify } from "yaml";

import {
  type BumpDependenciesConfig,
  makeBumpDependenciesProgram,
} from "#scripts/bump-deps";
import {
  DependencyCommandError,
  type PnpmRunner,
} from "#scripts/dependency-command";
import {
  DEPENDENCY_HOLDS,
  DEPENDENCY_RELEASE_AGE_EXCLUSIONS,
  DEPENDENCY_RELEASE_AGE_MINUTES,
  expectedIgnoredDependencies,
} from "#scripts/dependency-policy";

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
const temporaryRoots = new Set<string>();

/** Writes one complete dependency-policy fixture. */
function createConfig(input?: {
  readonly invalidManifest?: string;
  readonly invalidWorkspace?: string;
  readonly minimumReleaseAge?: number;
  readonly minimumReleaseAgeExclude?: readonly string[];
  readonly minimumReleaseAgeStrict?: boolean;
  readonly omitUltracite?: boolean;
  readonly omitIgnore?: string;
}) {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-bump-deps-"));
  temporaryRoots.add(root);
  const manifest = resolve(root, "package.json");
  const workspace = resolve(root, "pnpm-workspace.yaml");
  const devDependencies: Record<string, string> = {
    "@biomejs/biome": "2.5.10",
    "@effect/tsgo": "0.36.5",
    "@types/node": "24.13.3",
    "@typescript/native": "npm:typescript@7.0.2",
    ...(input?.omitUltracite ? {} : { ultracite: "7.10.6" }),
  };
  const ignoreDeps = expectedIgnoredDependencies().filter(
    (dependency) => dependency !== input?.omitIgnore
  );

  writeFileSync(
    manifest,
    input?.invalidManifest ??
      JSON.stringify({
        devDependencies,
        devEngines: { runtime: { version: "24.19.0" } },
        packageManager: "pnpm@11.22.0",
      })
  );
  writeFileSync(
    workspace,
    input?.invalidWorkspace ??
      stringify({
        catalog: {
          "@effect/platform-node": "4.0.0-rc.110",
          "@effect/vitest": "4.0.0-rc.110",
          effect: "4.0.0-rc.110",
          typescript: "npm:@typescript/typescript6@6.0.2",
        },
        minimumReleaseAge:
          input?.minimumReleaseAge ?? DEPENDENCY_RELEASE_AGE_MINUTES,
        minimumReleaseAgeExclude:
          input?.minimumReleaseAgeExclude ?? DEPENDENCY_RELEASE_AGE_EXCLUSIONS,
        minimumReleaseAgeStrict: input?.minimumReleaseAgeStrict ?? true,
        update: { ignoreDeps },
      })
  );
  return { manifest, root, workspace } satisfies BumpDependenciesConfig;
}

/** Builds deterministic pnpm output for one policy test. */
function makeRunner(input?: {
  readonly outdated?: CommandResult;
  readonly registry?: Readonly<Record<string, CommandResult>>;
  readonly update?: CommandResult;
}): PnpmRunner {
  return (_root, args) => {
    if (args[0] === "update") {
      return Effect.succeed(input?.update ?? output());
    }
    if (args[0] === "outdated") {
      return Effect.succeed(input?.outdated ?? output(1, "{}"));
    }
    const registry = args[1] ?? "missing";
    const configured = input?.registry?.[registry];
    const reviewed = DEPENDENCY_HOLDS.find(
      (hold) => hold.registry === registry
    )?.reviewedLatest;
    return Effect.succeed(
      configured ?? output(0, JSON.stringify(reviewed ?? "missing"))
    );
  };
}

interface CommandResult {
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
}

/** Creates one exact command observation. */
function output(exitCode = 0, stdout = "", stderr = ""): CommandResult {
  return { exitCode, stderr, stdout };
}

/** Returns one typed program failure at the Vitest boundary. */
function fail(config: BumpDependenciesConfig, runner: PnpmRunner) {
  return Effect.runPromise(
    makeBumpDependenciesProgram(config, runner).pipe(
      Effect.flip,
      Effect.provide(NodeServices.layer)
    )
  );
}

/** Installs a local pnpm executable that serves the reviewed registry view. */
function installFakePnpm(root: string) {
  const versions = Object.fromEntries(
    DEPENDENCY_HOLDS.map(({ registry, reviewedLatest }) => [
      registry,
      reviewedLatest,
    ])
  );
  const executable = resolve(root, "pnpm");
  writeFileSync(
    executable,
    `#!/usr/bin/env node
const args = process.argv.slice(2);
const versions = ${JSON.stringify(versions)};
if (args[0] === "view") console.log(JSON.stringify(versions[args[1]]));
if (args[0] === "outdated") { console.log("{}"); process.exitCode = 1; }
`
  );
  chmodSync(executable, 0o755);
  process.env.PATH = `${root}:${originalPath ?? ""}`;
}

afterEach(() => {
  process.env.PATH = originalPath;
  for (const root of temporaryRoots) {
    rmSync(root, { force: true, recursive: true });
  }
  temporaryRoots.clear();
});

describe("dependency update policy", () => {
  it("updates routines and reports every approved hold through real process IO", async () => {
    const config = createConfig();
    installFakePnpm(config.root);

    const reports = await Effect.runPromise(
      makeBumpDependenciesProgram(config).pipe(
        Effect.provide(NodeServices.layer)
      )
    );

    expect(reports).toHaveLength(DEPENDENCY_HOLDS.length);
    expect(
      reports.find(({ dependency }) => dependency === "effect")
    ).toMatchObject({
      current: "4.0.0-rc.110",
      latest: "4.0.0-rc.111",
    });
    expect(runtime.calls).toBe(1);
  });

  it("fails with every unresolved declaration, registry, and routine hold", async () => {
    const config = createConfig({ omitUltracite: true });
    const error = await fail(
      config,
      makeRunner({
        outdated: output(1, '{"yaml":{}}'),
        registry: {
          "ultracite@latest": output(0, '"7.10.7"'),
        },
      })
    );

    expect(error).toMatchObject({ _tag: "DependencyPolicyError" });
    expect(error.detail).toContain("ultracite declares no version");
    expect(error.detail).toContain("ultracite upstream is 7.10.7");
    expect(error.detail).toContain(
      "Routine dependencies remain outdated: yaml"
    );
  });

  it("fails before updating when dependency safety policy drifts", async () => {
    const runner = vi.fn(makeRunner());
    const error = await fail(
      createConfig({
        minimumReleaseAge: 0,
        minimumReleaseAgeExclude: [
          ...DEPENDENCY_RELEASE_AGE_EXCLUSIONS,
          "effect",
        ],
        minimumReleaseAgeStrict: false,
        omitIgnore: "effect",
      }),
      runner
    );

    expect(error).toMatchObject({ _tag: "DependencyPolicyError" });
    expect(error.detail).toContain("update.ignoreDeps");
    expect(error.detail).toContain("exactly 1440 minutes");
    expect(error.detail).toContain("must remain strict");
    expect(error.detail).toContain("minimumReleaseAgeExclude");
    expect(runner).not.toHaveBeenCalled();
  });

  it("types update and repository file failures", async () => {
    const config = createConfig();
    await expect(
      fail(config, makeRunner({ update: output(2, "", "update failed") }))
    ).resolves.toMatchObject({
      _tag: "DependencyCommandError",
      detail: "update failed",
    });
    await expect(
      fail(config, makeRunner({ update: output(2) }))
    ).resolves.toMatchObject({ detail: "pnpm update failed." });

    await expect(
      fail(
        { ...config, manifest: resolve(config.root, "missing.json") },
        makeRunner()
      )
    ).resolves.toHaveProperty("_tag", "DependencyPolicyError");
    await expect(
      fail(createConfig({ invalidManifest: "{" }), makeRunner())
    ).resolves.toMatchObject({
      detail: expect.stringContaining("is not valid"),
    });
    await expect(
      fail(createConfig({ invalidManifest: "{}" }), makeRunner())
    ).resolves.toMatchObject({
      detail: expect.stringContaining("invalid shape"),
    });
    await expect(
      fail(createConfig({ invalidWorkspace: "[invalid" }), makeRunner())
    ).resolves.toMatchObject({
      detail: expect.stringContaining("is not valid"),
    });
    await expect(
      fail(createConfig({ invalidWorkspace: "{}" }), makeRunner())
    ).resolves.toMatchObject({
      detail: expect.stringContaining("invalid shape"),
    });
  });

  it("preserves injected command-service failures", async () => {
    const config = createConfig();
    await expect(
      fail(config, () =>
        Effect.fail(
          new DependencyCommandError({ detail: "runner unavailable" })
        )
      )
    ).resolves.toMatchObject({
      detail: "runner unavailable",
    });
  });

  it("accepts an explicit fake runner without process services", async () => {
    const reports = await Effect.runPromise(
      makeBumpDependenciesProgram(
        createConfig(),
        makeRunner({ outdated: output() })
      ).pipe(Effect.provide(NodeServices.layer))
    );
    expect(reports.every(({ current }) => current !== "missing")).toBe(true);
  });
});
