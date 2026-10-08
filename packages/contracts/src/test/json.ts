import { Schema } from "effect";

/** Encodes a value as JSON text with JSON.stringify, changing nothing else. */
export const encodeJson = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown)
);

/** Decodes JSON text with JSON.parse, changing nothing else. */
export const decodeJson = Schema.decodeUnknownSync(
  Schema.fromJsonString(Schema.Unknown)
);
