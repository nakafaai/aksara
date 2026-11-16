import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";

import { scriptLayoutIssues } from "#nakafa-content/structure/layout";

/** Creates a temporary script root that the test's scope removes. */
const temporaryRoot = Effect.fn("ScriptLayoutTest.temporaryRoot")(function* (
  directories: readonly string[],
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const root = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-layout-",
  });
  for (const directory of directories) {
    yield* fileSystem.makeDirectory(path.resolve(root, directory));
  }
  for (const file of files) {
    yield* fileSystem.writeFileString(path.resolve(root, file), "");
  }
  return root;
});

layer(NodeServices.layer)("script layout", (it) => {
  it.effect("groups checker scripts by one-word concerns and filenames", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const issues = yield* scriptLayoutIssues(
        path.resolve(import.meta.dirname, "..")
      );
      assert.deepEqual(issues, []);
    })
  );

  it.effect("reports root scripts and multiword checker paths", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = yield* temporaryRoot(
        ["voice", "lesson-voice"],
        [
          "check.ts",
          "README.md",
          "voice/check.ts",
          "lesson-voice/lesson-check.ts",
        ]
      );
      const issues = yield* scriptLayoutIssues(root);
      assert.deepEqual(issues.sort(), [
        path.resolve(root, "check.ts"),
        path.resolve(root, "lesson-voice"),
        path.resolve(path.resolve(root, "lesson-voice"), "lesson-check.ts"),
      ]);
    })
  );

  it.effect("reports unreadable checker roots with a typed reason", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const empty = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-layout-",
      });
      const failure = yield* Effect.flip(
        scriptLayoutIssues(path.join(empty, "missing"))
      );
      assert.equal(failure.reason, "unreadable-entry");
    })
  );

  it.effect("skips symbolic links while collecting checker paths", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* temporaryRoot(["voice"], ["voice/check.ts"]);
      yield* fileSystem.symlink(
        path.resolve(root, "voice"),
        path.resolve(root, "linked")
      );
      const issues = yield* scriptLayoutIssues(root);
      assert.deepEqual(issues, []);
    })
  );
});
