import { assert, it } from "@effect/vitest";

import { metadataAddressRanges } from "#nakafa-content/mdx/metadata";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

it("collects only learner-facing fields from authored metadata", () => {
  const source = [
    'export { thing } from "./module.js";',
    'export const unrelated = "ignored";',
    "export const metadata = {",
    '  slug: "ignored",',
    '  title: "Sie können starten",',
    '  description: condition ? "Anda mencoba" : "Kalian mencoba",',
    "  ...shared,",
    "};",
  ].join("\n");

  assert.deepEqual(
    metadataAddressRanges(parseLessonMdx(source), source).map((range) =>
      source.slice(range.start?.offset, range.end?.offset)
    ),
    ["Sie können starten", "Anda mencoba", "Kalian mencoba"]
  );
});

it("ignores modules without an object-valued metadata export", () => {
  for (const source of [
    "# Lesson",
    'export const other = "copy";',
    'export const metadata = "not an object";',
  ]) {
    assert.deepEqual(metadataAddressRanges(parseLessonMdx(source), source), []);
  }
});
