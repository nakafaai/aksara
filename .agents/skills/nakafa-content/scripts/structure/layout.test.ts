import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";
import { scriptLayoutIssues } from "#nakafa-content/structure/layout";

const SCRIPT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

it("groups checker scripts by one-word concerns and filenames", () => {
  assert.deepEqual(scriptLayoutIssues(SCRIPT_ROOT), []);
});
