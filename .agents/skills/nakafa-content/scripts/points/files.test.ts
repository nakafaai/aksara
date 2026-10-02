import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import { collectFiles } from "#nakafa-content/points/files";
import { writeFiles } from "#nakafa-content/points/test/repository";

/** Creates one scoped folder that holds the given files. */
const folderWith = Effect.fn("PointsFixture.folderWith")(function* (
  files: Readonly<Record<string, string>>
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const root = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-points-files-",
  });
  yield* writeFiles(root, files);
  return root;
});

layer(NodeServices.layer, { excludeTestServices: true })(
  "points files",
  (it) => {
    it.effect("lists the MDX files below a folder, sorted, from the root", () =>
      Effect.gen(function* () {
        const root = yield* folderWith({
          "lessons/a/deep/en.mdx": "a\n",
          "lessons/a/notes.md": "not a lesson\n",
          "lessons/a/source.ts": "export {};\n",
          "lessons/b/id.mdx": "b\n",
          "other/c.mdx": "c\n",
        });

        assert.deepStrictEqual(yield* collectFiles(root, ["lessons"]), [
          "lessons/a/deep/en.mdx",
          "lessons/b/id.mdx",
        ]);
      })
    );

    it.effect("takes a file target as it is and lists each file once", () =>
      Effect.gen(function* () {
        const root = yield* folderWith({
          "lessons/a/id.mdx": "a\n",
          "other/c.mdx": "c\n",
        });

        assert.deepStrictEqual(
          yield* collectFiles(root, [
            "lessons",
            "lessons/a/id.mdx",
            "other/c.mdx",
          ]),
          ["lessons/a/id.mdx", "other/c.mdx"]
        );
      })
    );

    it.effect("fails with a typed error for a target it cannot read", () =>
      Effect.gen(function* () {
        const root = yield* folderWith({ "lessons/a/id.mdx": "a\n" });
        const error = yield* collectFiles(root, ["missing"]).pipe(Effect.flip);

        assert.strictEqual(error._tag, "PointsCheckError");
        assert.strictEqual(error.reason, "unreadable-entry");
        assert.include(error.detail, "Cannot read missing");
      })
    );

    it.effect("fails with a typed error when no MDX file is found", () =>
      Effect.gen(function* () {
        const root = yield* folderWith({ "docs/readme.md": "No lessons.\n" });
        const error = yield* collectFiles(root, ["docs"]).pipe(Effect.flip);

        assert.strictEqual(error.reason, "empty-targets");
        assert.include(error.detail, "No MDX files found under docs");
      })
    );
  }
);
