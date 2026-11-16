import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";

import { filesContainingCharacter } from "#nakafa-content/structure/integrity";

const EM_DASH = String.fromCodePoint(0x20_14);

/** The skill and lesson sources this repository owns. */
const ownedTextRoots = Effect.fn("StructureIntegrityTest.ownedTextRoots")(
  function* () {
    const path = yield* Path.Path;
    const repositoryRoot = path.resolve(import.meta.dirname, "../../../../..");
    return [
      path.join(repositoryRoot, ".agents/skills/nakafa-content"),
      path.join(repositoryRoot, "packages/corpus/material/lesson"),
    ];
  }
);

/** Creates a temporary source root that the test's scope removes. */
const temporaryRoot = Effect.fn("StructureIntegrityTest.temporaryRoot")(
  function* (entries: Record<string, string>) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-integrity-",
    });
    for (const [entry, source] of Object.entries(entries)) {
      const file = path.join(root, entry);
      yield* fileSystem.makeDirectory(path.dirname(file), { recursive: true });
      yield* fileSystem.writeFileString(file, source);
    }
    return root;
  }
);

layer(NodeServices.layer)("structure integrity", (it) => {
  it.effect("rejects an em dash in owned lesson and skill source bytes", () =>
    Effect.gen(function* () {
      const files = yield* filesContainingCharacter(
        yield* ownedTextRoots(),
        EM_DASH
      );
      assert.deepEqual(files, []);
    })
  );

  it.effect("skips symbolic links while scanning owned sources", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* temporaryRoot({
        "real/a.mdx": `x ${EM_DASH}`,
        "top.mdx": "y",
      });
      yield* fileSystem.symlink(
        path.join(root, "real"),
        path.join(root, "linked")
      );
      const files = yield* filesContainingCharacter([root], EM_DASH);
      assert.deepEqual(files, [path.join(root, "real", "a.mdx")]);
    })
  );

  it.effect("reports unreadable scan entries with a typed reason", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const empty = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-integrity-",
      });
      const missing = yield* Effect.flip(
        filesContainingCharacter([path.join(empty, "missing")], "x")
      );
      assert.equal(missing.reason, "unreadable-entry");
      const file = "en.mdx";
      const locked = yield* temporaryRoot({
        [file]: "The value follows from the equation.\n",
      });
      yield* fileSystem.chmod(path.join(locked, file), 0o000);
      const unreadable = yield* Effect.flip(
        filesContainingCharacter([locked], "value")
      );
      assert.equal(unreadable.reason, "unreadable-entry");
    })
  );
});
