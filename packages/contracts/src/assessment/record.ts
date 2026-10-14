import { Schema } from "effect";

import { encodeJsonText } from "#contracts/text/json";

/**
 * Largest record in UTF-8 bytes of its encoded JSON text: 1 MiB, the size that
 * Convex allows for one stored document
 * (https://docs.convex.dev/production/state/limits, section "Documents", row
 * "Size", read 13 October 2026). That limit is on a whole stored document, which
 * is one row, so it belongs to each record that Nakafa stores as one row (an
 * item version, a stimulus version, an answer key, and an explanation) and not
 * to a document inside it. The page does not say how Convex counts the size, so
 * this is the length of the encoded JSON text of the record, and a store that
 * adds fields around the record keeps a lower ceiling of its own.
 */
export const MAX_RECORD_BYTES = 1024 * 1024;

/** Checks that the encoded JSON text of a whole record fits `MAX_RECORD_BYTES`. */
function fitsRecordLimit(record: unknown) {
  return (
    new TextEncoder().encode(encodeJsonText(record)).byteLength <=
    MAX_RECORD_BYTES
  );
}

/**
 * The one size check of a record that Nakafa stores as one row. It measures the
 * whole record, its hash included, so a version whose documents each fit is
 * refused when together they pass the limit.
 */
export const isWithinRecordLimit = Schema.makeFilter(fitsRecordLimit, {
  message: `Expected a record of at most ${MAX_RECORD_BYTES} encoded bytes.`,
});
