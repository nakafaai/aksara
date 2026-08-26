import { assert } from "@nakafa/testing/effect";
import { Effect, FileSystem, Path, Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { ChildProcess } from "effect/unstable/process";

import type { EffectSourceConfig } from "#scripts/effect-source";

const installedManifest = "node_modules/effect/package.json";
const vendoredManifest = "repos/effect/packages/effect/package.json";

export interface RepositoryFixture {
  readonly config: EffectSourceConfig;
  readonly root: string;
}

/** Collects one child-process stream as text. */
function collectText(stream: Stream.Stream<Uint8Array, PlatformError>) {
  return stream.pipe(
    Stream.decodeText(),
    Stream.runFold(
      () => "",
      (output, chunk) => output + chunk
    )
  );
}

/** Runs Git in one isolated fixture repository. */
export const git = Effect.fn("EffectSourceFixture.git")(
  (root: string, ...args: readonly string[]) =>
    Effect.scoped(
      Effect.gen(function* () {
        const command = yield* ChildProcess.make("git", args, { cwd: root });
        const [exitCode, stdout, stderr] = yield* Effect.all(
          [
            command.exitCode,
            collectText(command.stdout),
            collectText(command.stderr),
          ],
          { concurrency: 3 }
        );

        assert.strictEqual(
          exitCode,
          0,
          stderr.trim() || stdout.trim() || `git ${args.join(" ")} failed`
        );
        return stdout;
      })
    )
);

/** Reads one scalar Git result. */
export const gitValue = Effect.fn("EffectSourceFixture.gitValue")(
  (root: string, ...args: readonly string[]) =>
    git(root, ...args).pipe(Effect.map((output) => output.trim()))
);

/** Writes one package manifest, including intentionally invalid JSON. */
const writeManifest = Effect.fn("EffectSourceFixture.writeManifest")(function* (
  root: string,
  location: string,
  source: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const target = path.join(root, location);
  yield* fileSystem.makeDirectory(path.dirname(target), { recursive: true });
  yield* fileSystem.writeFileString(target, source);
});

/** Initializes one isolated Git repository. */
const initializeRepository = Effect.fn(
  "EffectSourceFixture.initializeRepository"
)(function* (root: string) {
  yield* git(root, "init", "--quiet");
  yield* git(root, "config", "user.email", "tests@nakafa.com");
  yield* git(root, "config", "user.name", "Nakafa Tests");
});

/** Commits one installed Effect version in an isolated consumer. */
export const commitInstalledVersion = Effect.fn(
  "EffectSourceFixture.commitInstalledVersion"
)(function* (root: string, version: string) {
  yield* writeManifest(root, installedManifest, JSON.stringify({ version }));
  yield* git(root, "add", "--force", installedManifest);
  yield* git(root, "commit", "--quiet", "-m", `install Effect ${version}`);
});

/** Creates a clean Git repository with configurable source data. */
export const createRepository = Effect.fn(
  "EffectSourceFixture.createRepository"
)(function* (input?: { readonly vendored?: string }) {
  const fileSystem = yield* FileSystem.FileSystem;
  const root = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-effect-source-",
  });
  yield* initializeRepository(root);
  yield* writeManifest(root, installedManifest, '{"version":"4.0.0-rc.110"}');
  yield* writeManifest(
    root,
    vendoredManifest,
    input?.vendored ?? '{"version":"4.0.0-rc.110"}'
  );
  yield* git(root, "add", "--force", ".");
  yield* git(
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

  return {
    config: {
      installedManifest,
      repository: root,
      sourcePath: "repos/effect",
      vendoredManifest,
    },
    root,
  } satisfies RepositoryFixture;
});

/** Creates an upstream Effect repository with immutable release tags. */
export const createUpstream = Effect.fn("EffectSourceFixture.createUpstream")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-effect-upstream-",
    });
    yield* initializeRepository(root);

    for (const version of ["1.0.0", "2.0.0", "3.0.0"]) {
      yield* writeManifest(
        root,
        "packages/effect/package.json",
        JSON.stringify({ version })
      );
      yield* git(root, "add", ".");
      yield* git(root, "commit", "--quiet", "-m", `Effect ${version}`);
      yield* git(root, "tag", `effect@${version}`);
    }

    return root;
  }
);

/** Replaces a subtree merge with its equivalent linear source commit. */
const linearizeSubtreeImport = Effect.fn(
  "EffectSourceFixture.linearizeSubtreeImport"
)(function* (root: string, split: string) {
  const mergeHead = yield* gitValue(root, "rev-parse", "HEAD");
  const previousHead = yield* gitValue(root, "rev-parse", "HEAD^1");
  const tree = yield* gitValue(root, "rev-parse", "HEAD^{tree}");
  const linearHead = yield* gitValue(
    root,
    "commit-tree",
    tree,
    "-p",
    previousHead,
    "-m",
    "vendor Effect source",
    "-m",
    `git-subtree-dir: repos/effect\ngit-subtree-split: ${split}`
  );
  yield* git(root, "update-ref", "HEAD", linearHead, mergeHead);
});

/** Creates a consumer whose installed dependency is ahead of its subtree. */
export const createOutdatedConsumer = Effect.fn(
  "EffectSourceFixture.createOutdatedConsumer"
)(function* (upstream: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const root = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-effect-consumer-",
  });
  yield* initializeRepository(root);
  yield* commitInstalledVersion(root, "1.0.0");
  yield* git(
    root,
    "subtree",
    "add",
    "--prefix=repos/effect",
    upstream,
    "effect@1.0.0",
    "--squash"
  );
  const split = yield* gitValue(upstream, "rev-parse", "effect@1.0.0^{commit}");
  yield* linearizeSubtreeImport(root, split);
  yield* commitInstalledVersion(root, "2.0.0");

  return {
    config: {
      installedManifest,
      repository: upstream,
      sourcePath: "repos/effect",
      vendoredManifest,
    },
    root,
  } satisfies RepositoryFixture;
});
