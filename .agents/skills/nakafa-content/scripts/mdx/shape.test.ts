import { assert, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { expectShape, MdxShapeError } from "#nakafa-content/mdx/shape";

it.effect("passes a fact the parser kept", () =>
  Effect.sync(() => {
    expectShape(true);
  })
);

it.effect("fails a broken parser fact with a typed MdxShapeError", () =>
  Effect.gen(function* () {
    const error = yield* Effect.flip(
      Effect.try({
        catch: (cause) => {
          assert.ok(Schema.is(MdxShapeError)(cause));
          return cause;
        },
        try: () => expectShape(undefined),
      })
    );
    assert.include(error.message, "lacks a shape its parser always produces");
  })
);
