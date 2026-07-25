import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  type EffectSourceConfig,
  makeEffectSourceProgram,
} from "#scripts/effect-source";

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

const originalDirectory = process.cwd();
const originalPath = process.env.PATH;
const temporaryRoots = new Set<string>();
const installedManifest = "node_modules/effect/package.json";
const vendoredManifest = "repos/effect/packages/effect/package.json";

/** Runs Git inside one isolated test repository. */
function git(root: string, ...args: readonly string[]) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

/** Writes one package manifest source, including intentionally invalid JSON. */
function writeManifest(root: string, path: string, source: string) {
  const target = resolve(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, source);
}

/** Commits one installed Effect version in an isolated consumer. */
function commitInstalledVersion(root: string, version: string) {
  writeManifest(root, installedManifest, JSON.stringify({ version }));
  git(root, "add", "--force", installedManifest);
  git(root, "commit", "--quiet", "-m", `install Effect ${version}`);
}

/** Creates a clean Git repository with configurable installed and source data. */
function createRepository(input?: {
  readonly installed?: string;
  readonly vendored?: string;
}) {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-effect-source-"));
  temporaryRoots.add(root);
  git(root, "init", "--quiet");
  git(root, "config", "user.email", "tests@nakafa.com");
  git(root, "config", "user.name", "Nakafa Tests");

  writeManifest(
    root,
    installedManifest,
    input?.installed ?? '{"version":"3.22.0"}'
  );
  writeManifest(
    root,
    vendoredManifest,
    input?.vendored ?? '{"version":"3.22.0"}'
  );

  git(root, "add", "--force", ".");
  git(
    root,
    "commit",
    "--quiet",
    "-m",
    "test repository",
    "-m",
    "git-subtree-dir: repos/effect",
    "-m",
    `git-subtree-split: ${"a".repeat(40)}`
  );
  process.chdir(root);

  return {
    installedManifest,
    repository: root,
    sourcePath: "repos/effect",
    vendoredManifest,
  } satisfies EffectSourceConfig;
}

/** Builds one source command with the real Node platform layer. */
function program(action: string | undefined, config?: EffectSourceConfig) {
  return makeEffectSourceProgram(action, config).pipe(
    Effect.provide(NodeContext.layer)
  );
}

function runProgram(action: string | undefined, config: EffectSourceConfig) {
  return Effect.runPromise(program(action, config));
}

/** Asserts one expected typed failure without discarding its tag. */
async function expectFailure(
  action: string | undefined,
  config: EffectSourceConfig,
  tag: string
) {
  await expect(
    Effect.runPromise(program(action, config).pipe(Effect.flip))
  ).resolves.toHaveProperty("_tag", tag);
}

/** Creates an upstream Effect repository with two immutable release tags. */
function createUpstream() {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-effect-upstream-"));
  temporaryRoots.add(root);
  git(root, "init", "--quiet");
  git(root, "config", "user.email", "tests@nakafa.com");
  git(root, "config", "user.name", "Nakafa Tests");

  for (const version of ["1.0.0", "2.0.0", "3.0.0"]) {
    writeManifest(
      root,
      "packages/effect/package.json",
      JSON.stringify({ version })
    );
    git(root, "add", ".");
    git(root, "commit", "--quiet", "-m", `Effect ${version}`);
    git(root, "tag", `effect@${version}`);
  }

  return root;
}

/** Replaces subtree's initial merge with an equivalent linear source commit. */
function linearizeSubtreeImport(root: string, split: string) {
  const mergeHead = git(root, "rev-parse", "HEAD").trim();
  const previousHead = git(root, "rev-parse", "HEAD^1").trim();
  const tree = git(root, "rev-parse", "HEAD^{tree}").trim();
  const linearHead = git(
    root,
    "commit-tree",
    tree,
    "-p",
    previousHead,
    "-m",
    "vendor Effect source",
    "-m",
    `git-subtree-dir: repos/effect\ngit-subtree-split: ${split}`
  ).trim();
  git(root, "update-ref", "HEAD", linearHead, mergeHead);
}

/** Creates a consumer whose installed dependency is ahead of its subtree. */
function createOutdatedConsumer(upstream: string) {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-effect-consumer-"));
  temporaryRoots.add(root);
  git(root, "init", "--quiet");
  git(root, "config", "user.email", "tests@nakafa.com");
  git(root, "config", "user.name", "Nakafa Tests");
  commitInstalledVersion(root, "1.0.0");
  git(
    root,
    "subtree",
    "add",
    "--prefix=repos/effect",
    upstream,
    "effect@1.0.0",
    "--squash"
  );
  linearizeSubtreeImport(
    root,
    git(upstream, "rev-parse", "effect@1.0.0^{commit}").trim()
  );
  commitInstalledVersion(root, "2.0.0");
  process.chdir(root);

  return {
    installedManifest,
    repository: upstream,
    sourcePath: "repos/effect",
    vendoredManifest,
  } satisfies EffectSourceConfig;
}

afterEach(() => {
  process.chdir(originalDirectory);
  process.env.PATH = originalPath;
  for (const root of temporaryRoots) {
    rmSync(root, { force: true, recursive: true });
  }
  temporaryRoots.clear();
});

describe("Effect source maintenance", () => {
  it("runs one main boundary and accepts matching source", async () => {
    const config = createRepository();

    await expect(runProgram("check", config)).resolves.toBeUndefined();
    await expect(Effect.runPromise(program("check"))).resolves.toBeUndefined();
    expect(runtime.calls).toBe(1);

    git(process.cwd(), "commit", "--amend", "--quiet", "-m", "drop identity");
    await expectFailure("check", config, "EffectSourceMismatch");
  });

  it("rejects unsupported operations and mismatched versions", async () => {
    const config = createRepository({
      vendored: '{"version":"3.21.0"}',
    });

    await expectFailure("unknown", config, "EffectSourceUsageError");
    await expectFailure("check", config, "EffectSourceMismatch");
  });

  it.each([
    ["invalid JSON", "not-json"],
    ["invalid version", '{"version":"latest"}'],
  ])("rejects %s manifests", async (_label, vendored) => {
    const config = createRepository({ vendored });

    await expectFailure("check", config, "EffectSourceReadError");
  });

  it("rejects missing and locally edited source", async () => {
    const missing = createRepository();
    rmSync(missing.vendoredManifest);
    git(process.cwd(), "add", "--all");
    git(process.cwd(), "commit", "--quiet", "-m", "remove source");

    await expectFailure("check", missing, "EffectSourceReadError");

    process.chdir(originalDirectory);
    const dirty = createRepository();
    const editedSource = "repos/effect/README.md";
    writeFileSync(editedSource, "edited");

    await expectFailure("check", dirty, "EffectSourceMismatch");
    git(process.cwd(), "add", editedSource);
    git(process.cwd(), "commit", "--quiet", "-m", "edit vendored source");
    await expectFailure("check", dirty, "EffectSourceMismatch");
  });

  it("keeps current source unchanged and rejects unsafe update states", async () => {
    const current = createRepository();
    await expect(runProgram("update", current)).resolves.toBeUndefined();

    writeFileSync("dirty.txt", "dirty");
    await expectFailure("update", current, "EffectSourceMismatch");

    git(process.cwd(), "add", "dirty.txt");
    git(process.cwd(), "commit", "--quiet", "-m", "clean again");
    git(process.cwd(), "checkout", "--quiet", "--detach");
    await expectFailure("update", current, "EffectSourceGitError");
  });

  it("updates an outdated subtree from the matching release tag", async () => {
    const upstream = createUpstream();
    const config = createOutdatedConsumer(upstream);

    await expect(runProgram("update", config)).resolves.toBeUndefined();
    expect(JSON.parse(readFileSync(config.vendoredManifest, "utf8"))).toEqual({
      version: "2.0.0",
    });

    commitInstalledVersion(process.cwd(), "3.0.0");
    await expect(runProgram("update", config)).resolves.toBeUndefined();

    expect(JSON.parse(readFileSync(config.vendoredManifest, "utf8"))).toEqual({
      version: "3.0.0",
    });
    expect(
      git(process.cwd(), "rev-list", "--count", "--merges", "HEAD").trim()
    ).toBe("0");
  });

  it("maps platform spawn failures into the Git error channel", async () => {
    const config = createRepository();
    process.env.PATH = "";

    await expectFailure("check", config, "EffectSourceGitError");
  });
});
