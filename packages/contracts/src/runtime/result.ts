import { Schema } from "effect";

/** Exact absence response distinct from runtime or integrity failures. */
export const ContentRuntimeMissingSchema = Schema.Struct({
  kind: Schema.Literal("missing"),
});

/** Sanitized failure codes exposed by server-only runtime endpoints. */
export const ContentRuntimeFailureCodeSchema = Schema.Literal(
  "CONTENT_RUNTIME_INTERNAL",
  "CONTENT_RUNTIME_INVALID",
  "CONTENT_RUNTIME_RESPONSE_TOO_LARGE",
  "CONTENT_RUNTIME_UNAUTHORIZED"
);

/** Sanitized runtime failure without implementation details or body bytes. */
export const ContentRuntimeFailureSchema = Schema.Struct({
  code: ContentRuntimeFailureCodeSchema,
  kind: Schema.Literal("failure"),
});
