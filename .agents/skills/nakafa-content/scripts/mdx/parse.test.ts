import { assert, it } from "@effect/vitest";
import { Effect } from "effect";

import { MdxParseError, parseLessonMdx } from "#nakafa-content/mdx/parse";

it.effect("reports the authored path when lesson MDX is invalid", () =>
  Effect.gen(function* () {
    const error = yield* Effect.flip(
      Effect.try({
        catch: (cause) => {
          assert.ok(cause instanceof MdxParseError);
          return cause;
        },
        try: () => parseLessonMdx("<Broken>", "biology/broken/en.mdx"),
      })
    );
    assert.equal(error.sourcePath, "biology/broken/en.mdx");
  })
);
