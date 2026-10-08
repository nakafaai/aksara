import { Schema } from "effect";

/** Plain JSON text: decoding parses the text, encoding writes the bytes JSON.stringify writes. */
export const decodeJsonText = Schema.fromJsonString(Schema.Unknown);

/** Encodes one value already held in memory to the exact text JSON.stringify returns. */
export const encodeJsonText = Schema.encodeSync(decodeJsonText);
