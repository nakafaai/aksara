import { Effect, Schema } from "effect";

/** A parsed tree that lacks a shape its MDX or ESTree parser always produces. */
export class MdxShapeError extends Schema.TaggedError<
  MdxShapeError,
  { readonly brand: unique symbol }
>()("MdxShapeError", { message: Schema.String }) {}

/**
 * Narrows a fact that the parser guarantees about the tree or the source it
 * read, such as a node's offsets or a matched pattern's group. A broken fact
 * means the parser changed under the check, so the synchronous scan fails
 * with a typed MdxShapeError, as `parseLessonMdx` fails with its parse error,
 * instead of reporting findings on a tree it cannot read. The error's stack
 * names the fact that broke.
 */
export function expectShape(condition: unknown): asserts condition {
  if (!condition) {
    Effect.runSync(
      Effect.fail(
        new MdxShapeError({
          message: "The parsed tree lacks a shape its parser always produces.",
        })
      )
    );
  }
}
