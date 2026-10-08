import { Schema } from "effect";

/** Writes a value as JSON text with exactly the bytes JSON.stringify writes. */
export const encodeJsonText = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown)
);

/** Reads JSON text into exactly the value JSON.parse reads. */
export const decodeJsonText = Schema.decodeUnknownSync(
  Schema.fromJsonString(Schema.Unknown)
);
