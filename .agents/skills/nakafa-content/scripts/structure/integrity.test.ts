import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeFileSystem } from "@effect/platform-node";
import { assert, it } from "@effect/vitest";
import { Effect, type FileSystem, type Scope } from "effect";

import { filesContainingCharacter } from "#nakafa-content/structure/integrity";

const REPOSITORY_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../.."
);
const OWNED_TEXT_ROOTS = [
  join(REPOSITORY_ROOT, ".agents/skills/nakafa-content"),
  join(REPOSITORY_ROOT, "packages/corpus/material/lesson"),
];

/** Runs one scan effect against the real filesystem. */
const liveFiles = <A, E>(
  self: Effect.Effect<A, E, FileSystem.FileSystem>
): Effect.Effect<A, E, never> => Effect.provide(self, NodeFileSystem.layer);

/** Creates a temporary source root and removes it afterwards. */
const temporaryRoot = (
  entries: Record<string, string>,
  setup: (root: string) => void = () => undefined
): Effect.Effect<string, never, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const root = mkdtempSync(join(tmpdir(), "aksara-integrity-"));
      for (const [path, source] of Object.entries(entries)) {
        const file = join(root, path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, source);
      }
      setup(root);
      return root;
    }),
    (root) => Effect.sync(() => rmSync(root, { force: true, recursive: true }))
  );

it.effect("rejects an em dash in owned lesson and skill source bytes", () =>
  Effect.gen(function* () {
    const emDash = String.fromCodePoint(0x20_14);
    const files = yield* liveFiles(
      filesContainingCharacter(OWNED_TEXT_ROOTS, emDash)
    );
    assert.deepEqual(files, []);
  })
);

it.effect("skips symbolic links while scanning owned sources", () =>
  Effect.scoped(
    Effect.gen(function* () {
      const root = yield* temporaryRoot(
        {
          "real/a.mdx": `x ${String.fromCodePoint(0x20_14)}`,
          "top.mdx": "y",
        },
        (directory) =>
          symlinkSync(join(directory, "real"), join(directory, "linked"))
      );
      const files = yield* liveFiles(
        filesContainingCharacter([root], String.fromCodePoint(0x20_14))
      );
      assert.deepEqual(files, [join(root, "real", "a.mdx")]);
    })
  )
);

it.effect("reports unreadable scan entries with a typed reason", () =>
  Effect.scoped(
    Effect.gen(function* () {
      const missing = yield* liveFiles(
        Effect.flip(
          filesContainingCharacter(
            [join(tmpdir(), "missing-aksara-sources")],
            "x"
          )
        )
      );
      assert.equal(missing.reason, "unreadable-entry");
      const file = "en.mdx";
      const locked = yield* temporaryRoot(
        { [file]: "The value follows from the equation.\n" },
        (root) => chmodSync(join(root, file), 0o000)
      );
      assert.equal(
        (yield* liveFiles(
          Effect.flip(filesContainingCharacter([locked], "value"))
        )).reason,
        "unreadable-entry"
      );
    })
  )
);
