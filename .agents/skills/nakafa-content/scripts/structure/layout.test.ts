import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";
import { scriptLayoutIssues } from "#nakafa-content/structure/layout";

const SCRIPT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

it("groups checker scripts by one-word concerns and filenames", () => {
  assert.deepEqual(scriptLayoutIssues(SCRIPT_ROOT), []);
});

it("reports root scripts and multiword checker paths", () => {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-layout-"));
  try {
    const validDirectory = resolve(root, "voice");
    const invalidDirectory = resolve(root, "lesson-voice");
    mkdirSync(validDirectory);
    mkdirSync(invalidDirectory);
    writeFileSync(resolve(root, "check.ts"), "");
    writeFileSync(resolve(root, "README.md"), "");
    writeFileSync(resolve(validDirectory, "check.ts"), "");
    writeFileSync(resolve(invalidDirectory, "lesson-check.ts"), "");

    assert.deepEqual(scriptLayoutIssues(root).sort(), [
      resolve(root, "check.ts"),
      invalidDirectory,
      resolve(invalidDirectory, "lesson-check.ts"),
    ]);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});
