import { Schema } from "effect";

/** One sanitized release dispatch failure, which says whether a retry may succeed. */
export class ReleaseDispatchError extends Schema.TaggedError<
  ReleaseDispatchError,
  { readonly brand: unique symbol }
>()("ReleaseDispatchError", { retryable: Schema.Boolean }) {}
