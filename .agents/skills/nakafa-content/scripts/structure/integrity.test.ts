import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";
import { filesContainingCharacter } from "#nakafa-content/structure/integrity";

const REPOSITORY_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../.."
);
const OWNED_TEXT_ROOTS = [
  join(REPOSITORY_ROOT, ".agents/skills/nakafa-content"),
  join(REPOSITORY_ROOT, "packages/corpus/material/lesson"),
];
it("rejects an em dash in owned lesson and skill source bytes", () => {
  const emDash = String.fromCodePoint(0x20_14);
  assert.deepEqual(filesContainingCharacter(OWNED_TEXT_ROOTS, emDash), []);
});
