import { Schema } from "effect";

/** One sanitized post-commit cache request or receipt failure. */
export class ContentCacheError extends Schema.TaggedError<ContentCacheError>()(
  "ContentCacheError",
  { retryable: Schema.Boolean }
) {}
