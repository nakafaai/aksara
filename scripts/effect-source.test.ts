import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, layer } from "@nakafa/testing/effect";
import { Effect, FileSystem, Path, Schema } from "effect";
import { vi } from "vitest";
import {
  type EffectSourceConfig,
  makeEffectSourceProgram,
} from "#scripts/effect-source";
import {
  commitInstalledVersion,
  createOutdatedConsumer,
  createRepository,
  createUpstream,
  git,
  gitValue,
  type RepositoryFixture,
} from "#scripts/effect-source/fixture";

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

const VersionManifest = Schema.fromJsonString(
  Schema.Struct({ version: Schema.String })
);

/** Runs one source command with its repository as the process boundary. */
const runProgram = Effect.fn("EffectSourceTest.runProgram")(
  (root: string, action: string | undefined, config?: EffectSourceConfig) =>
    Effect.acquireUseRelease(
      Effect.sync(() => {
        const previous = process.cwd();
        process.chdir(root);
        return previous;
      }),
      () => makeEffectSourceProgram(action, config),
      (previous) => Effect.sync(() => process.chdir(previous))
    )
);

/** Asserts one expected typed source-maintenance failure. */
const expectFailure = Effect.fn("EffectSourceTest.expectFailure")(function* (
  fixture: RepositoryFixture,
  action: string | undefined,
  tag: string
) {
  const error = yield* runProgram(fixture.root, action, fixture.config).pipe(
    Effect.flip
  );
  assert.strictEqual(error._tag, tag);
});

afterEach(() => vi.unstubAllEnvs());

layer(NodeServices.layer, { excludeTestServices: true })(
  "Effect source maintenance",
  (it) => {
    it.effect("runs one main boundary and accepts matching source", () =>
      Effect.gen(function* () {
        const fixture = yield* createRepository();
        yield* runProgram(fixture.root, "check", fixture.config);
        yield* runProgram(fixture.root, "check");
        assert.strictEqual(runtime.calls, 1);

        yield* git(
          fixture.root,
          "commit",
          "--amend",
          "--quiet",
          "-m",
          "drop identity"
        );
        yield* expectFailure(fixture, "check", "EffectSourceMismatch");
      })
    );

    it.effect("rejects unsupported operations and mismatched versions", () =>
      Effect.gen(function* () {
        const fixture = yield* createRepository({
          vendored: '{"version":"4.0.0-rc.109"}',
        });
        yield* expectFailure(fixture, "unknown", "EffectSourceUsageError");
        yield* expectFailure(fixture, "check", "EffectSourceMismatch");
      })
    );

    it.effect.each([
      ["invalid JSON", "not-json"],
      ["invalid version", '{"version":"latest"}'],
    ] as const)("rejects %s manifests", ([, vendored]) =>
      Effect.gen(function* () {
        const fixture = yield* createRepository({ vendored });
        yield* expectFailure(fixture, "check", "EffectSourceReadError");
      })
    );

    it.effect("rejects missing and locally edited source", () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const missing = yield* createRepository();
        yield* fileSystem.remove(
          path.join(missing.root, missing.config.vendoredManifest)
        );
        yield* git(missing.root, "add", "--all");
        yield* git(missing.root, "commit", "--quiet", "-m", "remove source");
        yield* expectFailure(missing, "check", "EffectSourceReadError");

        const dirty = yield* createRepository();
        const editedSource = path.join(dirty.root, "repos/effect/README.md");
        yield* fileSystem.writeFileString(editedSource, "edited");
        yield* expectFailure(dirty, "check", "EffectSourceMismatch");
        yield* git(dirty.root, "add", "repos/effect/README.md");
        yield* git(
          dirty.root,
          "commit",
          "--quiet",
          "-m",
          "edit vendored source"
        );
        yield* expectFailure(dirty, "check", "EffectSourceMismatch");
      })
    );

    it.effect(
      "keeps current source unchanged and rejects unsafe update states",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const path = yield* Path.Path;
          const fixture = yield* createRepository();
          yield* runProgram(fixture.root, "update", fixture.config);

          yield* fileSystem.writeFileString(
            path.join(fixture.root, "dirty.txt"),
            "dirty"
          );
          yield* expectFailure(fixture, "update", "EffectSourceMismatch");

          yield* git(fixture.root, "add", "dirty.txt");
          yield* git(fixture.root, "commit", "--quiet", "-m", "clean again");
          yield* git(fixture.root, "checkout", "--quiet", "--detach");
          yield* expectFailure(fixture, "update", "EffectSourceGitError");
        })
    );

    it.effect("updates an outdated subtree from the matching release tag", () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const upstream = yield* createUpstream();
        const fixture = yield* createOutdatedConsumer(upstream);
        yield* runProgram(fixture.root, "update", fixture.config);

        const firstSource = yield* fileSystem.readFileString(
          path.join(fixture.root, fixture.config.vendoredManifest)
        );
        assert.deepStrictEqual(
          yield* Schema.decodeEffect(VersionManifest)(firstSource),
          { version: "2.0.0" }
        );

        yield* commitInstalledVersion(fixture.root, "3.0.0");
        yield* runProgram(fixture.root, "update", fixture.config);

        const secondSource = yield* fileSystem.readFileString(
          path.join(fixture.root, fixture.config.vendoredManifest)
        );
        assert.deepStrictEqual(
          yield* Schema.decodeEffect(VersionManifest)(secondSource),
          { version: "3.0.0" }
        );
        assert.strictEqual(
          yield* gitValue(
            fixture.root,
            "rev-list",
            "--count",
            "--merges",
            "HEAD"
          ),
          "0"
        );
      })
    );

    it.effect("maps platform spawn failures into the Git error channel", () =>
      Effect.gen(function* () {
        const fixture = yield* createRepository();
        vi.stubEnv("PATH", "");
        yield* expectFailure(fixture, "check", "EffectSourceGitError");
      })
    );
  }
);
