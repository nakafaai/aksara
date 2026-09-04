import { assert, it } from "@effect/vitest";

import { parseLessonMdx } from "#nakafa-content/mdx/parse";

const PARSE_ERROR_PATTERN = /Failed to parse biology\/broken\/en\.mdx/u;

it("reports the authored path when lesson MDX is invalid", () => {
  assert.throws(
    () => parseLessonMdx("<Broken>", "biology/broken/en.mdx"),
    PARSE_ERROR_PATTERN
  );
});
