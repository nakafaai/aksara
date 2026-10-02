import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import {
  changedFiles,
  parseChanges,
  readBase,
  resolveBase,
} from "#nakafa-content/points/base";
import {
  commitAll,
  createRepository,
  git,
  writeFiles,
} from "#nakafa-content/points/test/repository";

/** Real Git repositories take longer than a pure unit test on a busy runner. */
const GIT_TIMEOUT = 30_000;

vi.setConfig({ testTimeout: GIT_TIMEOUT });

layer(NodeServices.layer, { excludeTestServices: true })(
  "points base revision",
  (it) => {
    it.effect("resolves the revision a branch started from", () =>
      Effect.gen(function* () {
        const root = yield* createRepository();
        yield* writeFiles(root, { "lessons/a/id.mdx": "one\n" });
        const fork = yield* commitAll(root, "fork point");
        yield* git(root, "switch", "--quiet", "--create", "feature");
        yield* writeFiles(root, { "lessons/a/id.mdx": "two\n" });
        yield* commitAll(root, "feature work");
        yield* git(root, "switch", "--quiet", "main");
        yield* writeFiles(root, { "lessons/b/id.mdx": "three\n" });
        yield* commitAll(root, "main moves on");
        yield* git(root, "switch", "--quiet", "feature");

        assert.strictEqual(yield* resolveBase(root, "main"), fork);
        assert.strictEqual(yield* resolveBase(root, fork), fork);
      })
    );

    it.effect("fails with a typed error for a base that cannot be used", () =>
      Effect.gen(function* () {
        const root = yield* createRepository();
        yield* writeFiles(root, { "lessons/a/id.mdx": "one\n" });
        yield* commitAll(root, "first history");

        const unknown = yield* resolveBase(root, "origin/missing").pipe(
          Effect.flip
        );
        assert.strictEqual(unknown._tag, "PointsCheckError");
        assert.strictEqual(unknown.reason, "unknown-base");
        assert.include(unknown.detail, "origin/missing");

        yield* git(root, "checkout", "--quiet", "--orphan", "other");
        yield* git(root, "rm", "--quiet", "--force", "-r", ".");
        yield* writeFiles(root, { "lessons/z/id.mdx": "zero\n" });
        yield* commitAll(root, "second history");
        const unrelated = yield* resolveBase(root, "main").pipe(Effect.flip);
        assert.strictEqual(unrelated.reason, "unknown-base");
        assert.include(unrelated.detail, "exit code 1");

        const missing = yield* resolveBase(join(root, "missing"), "main").pipe(
          Effect.flip
        );
        assert.strictEqual(missing.reason, "unknown-base");
      })
    );

    it.effect("lists only the changed files below the checked paths", () =>
      Effect.gen(function* () {
        const root = yield* createRepository();
        yield* writeFiles(root, {
          "lessons/a/id.mdx": "a\n",
          "lessons/b/id.mdx": "b\n",
          "lessons/b/source.ts": "export const b = 1;\n",
          "lessons/d/id.mdx": "d\n",
          "lessons/e/id.mdx": "e\n",
          "other/c.mdx": "c\n",
        });
        const base = yield* commitAll(root, "base");
        assert.deepStrictEqual(
          [...(yield* changedFiles(root, base, ["."]))],
          []
        );

        yield* writeFiles(root, {
          "lessons/a/id.mdx": "a changed\n",
          "lessons/b/source.ts": "export const b = 2;\n",
          "lessons/g/id.mdx": "g is new\n",
          "other/c.mdx": "c changed\n",
        });
        yield* git(root, "rm", "--quiet", "lessons/d/id.mdx");
        yield* git(root, "mv", "lessons/e/id.mdx", "lessons/e/renamed.mdx");

        /** Sorts one map of changed files for a stable comparison. */
        const sorted = (files: ReadonlyMap<string, string>) =>
          [...files].sort();
        assert.deepStrictEqual(
          sorted(yield* changedFiles(root, base, ["lessons"])),
          [
            ["lessons/a/id.mdx", "lessons/a/id.mdx"],
            ["lessons/b/source.ts", "lessons/b/source.ts"],
            ["lessons/e/renamed.mdx", "lessons/e/id.mdx"],
          ]
        );
        assert.deepStrictEqual(
          sorted(
            yield* changedFiles(root, base, ["lessons/a/id.mdx", "other"])
          ),
          [
            ["lessons/a/id.mdx", "lessons/a/id.mdx"],
            ["other/c.mdx", "other/c.mdx"],
          ]
        );
        assert.deepStrictEqual(sorted(yield* changedFiles(root, base, ["."])), [
          ["lessons/a/id.mdx", "lessons/a/id.mdx"],
          ["lessons/b/source.ts", "lessons/b/source.ts"],
          ["lessons/e/renamed.mdx", "lessons/e/id.mdx"],
          ["other/c.mdx", "other/c.mdx"],
        ]);
      })
    );

    it.effect("pairs a renamed and edited file with its path at the base", () =>
      Effect.gen(function* () {
        const root = yield* createRepository();
        const lines = Array.from({ length: 20 }, (_, index) => `line ${index}`);
        yield* writeFiles(root, {
          "lessons/moved/id.mdx": "moved out of the checked paths\n",
          "lessons/old/id.mdx": `${lines.join("\n")}\n`,
        });
        const base = yield* commitAll(root, "base");
        const fileSystem = yield* FileSystem.FileSystem;
        for (const folder of ["lessons/new", "other"]) {
          yield* fileSystem.makeDirectory(join(root, folder), {
            recursive: true,
          });
        }
        yield* git(root, "mv", "lessons/old/id.mdx", "lessons/new/id.mdx");
        yield* git(root, "mv", "lessons/moved/id.mdx", "other/id.mdx");
        yield* writeFiles(root, {
          "lessons/new/id.mdx": `${[...lines.slice(0, 19), "line changed"].join("\n")}\n`,
        });

        assert.deepStrictEqual(
          [...(yield* changedFiles(root, base, ["lessons"]))],
          [["lessons/new/id.mdx", "lessons/old/id.mdx"]]
        );
        assert.deepStrictEqual(
          yield* readBase(root, base, "lessons/old/id.mdx"),
          `${lines.join("\n")}\n`
        );
      })
    );

    it.effect("parses the name-status output that git prints", () =>
      Effect.gen(function* () {
        assert.deepStrictEqual([...(yield* parseChanges(""))], []);
        assert.deepStrictEqual(
          [...(yield* parseChanges("M\0a/id.mdx\0"))],
          [["a/id.mdx", "a/id.mdx"]]
        );
        assert.deepStrictEqual(
          [
            ...(yield* parseChanges(
              "M\0a/id.mdx\0R087\0old/id.mdx\0new/id.mdx\0M\0b/id.mdx\0R100\0x\0y\0"
            )),
          ],
          [
            ["a/id.mdx", "a/id.mdx"],
            ["new/id.mdx", "old/id.mdx"],
            ["b/id.mdx", "b/id.mdx"],
            ["y", "x"],
          ]
        );
      })
    );

    it.effect("fails with a typed error for output it cannot pair", () =>
      Effect.gen(function* () {
        for (const output of ["M\0", "R100\0old\0", "R100\0\0"]) {
          const error = yield* parseChanges(output).pipe(Effect.flip);
          assert.strictEqual(error._tag, "PointsCheckError");
          assert.strictEqual(error.reason, "unreadable-entry");
          assert.include(error.detail, "Unexpected git diff output");
        }
      })
    );

    it.effect("reads a file as it was committed at the base", () =>
      Effect.gen(function* () {
        const root = yield* createRepository();
        yield* writeFiles(root, { "lessons/a/id.mdx": "committed\n" });
        const base = yield* commitAll(root, "base");
        yield* writeFiles(root, { "lessons/a/id.mdx": "edited\n" });

        assert.strictEqual(
          yield* readBase(root, base, "lessons/a/id.mdx"),
          "committed\n"
        );
        const missing = yield* readBase(root, base, "lessons/z/id.mdx").pipe(
          Effect.flip
        );
        assert.strictEqual(missing.reason, "unreadable-entry");
        assert.include(missing.detail, "lessons/z/id.mdx");
      })
    );
  }
);
