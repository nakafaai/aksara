import { encodeJsonText } from "#contracts/text/json";

/** Counts the UTF-8 bytes of the JSON text of one value. */
export function encodedBytes(value: unknown) {
  return new TextEncoder().encode(encodeJsonText(value)).byteLength;
}

/**
 * Builds a record whose encoded JSON text is exactly `bytes` long. `build`
 * puts the text it is given into the record once, as a string of letters, so
 * each letter adds one byte and nothing is escaped.
 */
export function recordOfBytes(
  build: (filler: string) => unknown,
  bytes: number
) {
  const overhead = encodedBytes(build("a")) - 1;
  return build("a".repeat(bytes - overhead));
}
