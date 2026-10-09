import { Effect, Schema } from "effect";

/** Strictly decodes one wire contract into its domain-owned sanitized error. */
export function decodeContract<A, I, E>(
  schema: Schema.Codec<A, I>,
  input: unknown,
  error: E
) {
  return Schema.decodeUnknownEffect(schema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => error));
}
