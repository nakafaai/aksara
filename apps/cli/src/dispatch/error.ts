import { Schema } from "effect";

/**
 * One release dispatch failure: whether a retry may succeed, the status GitHub
 * answered, and why GitHub refused the dispatch. A transport failure or a
 * dispatch that never answered has neither a status nor a detail.
 */
export class ReleaseDispatchError extends Schema.TaggedError<
  ReleaseDispatchError,
  { readonly brand: unique symbol }
>()("ReleaseDispatchError", {
  detail: Schema.NullOr(Schema.String),
  retryable: Schema.Boolean,
  status: Schema.NullOr(Schema.Int),
}) {}
