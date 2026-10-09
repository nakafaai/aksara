import { Schema } from "effect";

import type { PublicationOperation } from "#contracts/transport/request";

/**
 * Builds one successful publication envelope for one operation. The operation
 * must be a member of PublicationOperationSchema, so a misspelled operation
 * fails the typecheck instead of producing a response no client accepts.
 */
export function successSchema<
  Operation extends PublicationOperation,
  Value extends Schema.Top,
>(operation: Operation, value: Value) {
  return Schema.Struct({
    ok: Schema.Literal(true),
    operation: Schema.Literal(operation),
    value,
  });
}
