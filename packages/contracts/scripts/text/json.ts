import { Schema } from "effect";

/** The JSON text codec: JSON.stringify when encoding and JSON.parse when decoding, nothing else. */
export const JsonTextSchema = Schema.fromJsonString(Schema.Unknown);

/** Writes a value as JSON text with exactly the bytes JSON.stringify writes. */
export const encodeJsonText = Schema.encodeSync(JsonTextSchema);

/** Writes a value as two-space indented JSON text with exactly the bytes JSON.stringify(value, null, 2) writes. */
export const encodePrettyJsonText = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown, { space: 2 })
);
