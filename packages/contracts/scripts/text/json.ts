import { Schema } from "effect";

/** Writes a value as two-space indented JSON text with exactly the bytes JSON.stringify(value, null, 2) writes. */
export const encodePrettyJsonText = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown, { space: 2 })
);
