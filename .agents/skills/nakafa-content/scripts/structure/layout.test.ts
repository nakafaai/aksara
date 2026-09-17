import {
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
import { Effect, type Scope } from "effect";

import { scriptLayoutIssues } from "#nakafa-content/structure/layout";

const SCRIPT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Creates a temporary script root and removes it afterwards. */
const temporaryRoot = (
  setup: (root: string) => void
): Effect.Effect<string, never, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const root = mkdtempSync(resolve(tmpdir(), "aksara-layout-"));
      setup(root);
      return root;
    }),
    (root) => Effect.sync(() => rmSync(root, { force: true, recursive: true }))
  );

it.effect("groups checker scripts by one-word concerns and filenames", () =>
  Effect.gen(function* () {
    const issues = yield* Effect.provide(
      scriptLayoutIssues(SCRIPT_ROOT),
      NodeFileSystem.layer
    );
    assert.deepEqual(issues, []);
  })
);

it.effect("reports root scripts and multiword checker paths", () =>
  Effect.scoped(
    Effect.gen(function* () {
      const root = yield* temporaryRoot((directory) => {
        const validDirectory = resolve(directory, "voice");
        const invalidDirectory = resolve(directory, "lesson-voice");
        mkdirSync(validDirectory);
        mkdirSync(invalidDirectory);
        writeFileSync(resolve(directory, "check.ts"), "");
        writeFileSync(resolve(directory, "README.md"), "");
        writeFileSync(resolve(validDirectory, "check.ts"), "");
        writeFileSync(resolve(invalidDirectory, "lesson-check.ts"), "");
      });
      const issues = yield* Effect.provide(
        scriptLayoutIssues(root),
        NodeFileSystem.layer
      );
      assert.deepEqual(issues.sort(), [
        resolve(root, "check.ts"),
        resolve(root, "lesson-voice"),
        resolve(resolve(root, "lesson-voice"), "lesson-check.ts"),
      ]);
    })
  )
);

it.effect("reports unreadable checker roots with a typed reason", () =>
  Effect.gen(function* () {
    const failure = yield* Effect.flip(
      Effect.provide(
        scriptLayoutIssues(join(tmpdir(), "missing-aksara-scripts")),
        NodeFileSystem.layer
      )
    );
    assert.equal(failure.reason, "unreadable-entry");
  })
);

it.effect("skips symbolic links while collecting checker paths", () =>
  Effect.scoped(
    Effect.gen(function* () {
      const root = yield* temporaryRoot((directory) => {
        const validDirectory = resolve(directory, "voice");
        mkdirSync(validDirectory);
        writeFileSync(resolve(validDirectory, "check.ts"), "");
        symlinkSync(validDirectory, resolve(directory, "linked"));
      });
      const issues = yield* Effect.provide(
        scriptLayoutIssues(root),
        NodeFileSystem.layer
      );
      assert.deepEqual(issues, []);
    })
  )
);
