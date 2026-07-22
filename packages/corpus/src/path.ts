import { Schema } from "effect";

const LOGICAL_SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** One stable logical corpus segment before physical path grouping. */
export const LogicalCorpusSegmentSchema = Schema.String.pipe(
  Schema.pattern(LOGICAL_SEGMENT_PATTERN),
  Schema.brand("@NakafaAI/AksaraLogicalCorpusSegment")
);
export type LogicalCorpusSegment = typeof LogicalCorpusSegmentSchema.Type;

/**
 * Encodes one logical segment into reversible physical chunks of at most two
 * semantic words. A trailing underscore marks every non-final chunk.
 */
export function encodeCorpusPath(segment: LogicalCorpusSegment) {
  const words = segment.split("-");
  const chunks: string[] = [];
  for (let index = 0; index < words.length; index += 2) {
    const chunk = words.slice(index, index + 2).join("-");
    const isFinal = index + 2 >= words.length;
    chunks.push(isFinal ? chunk : `${chunk}_`);
  }
  return chunks;
}
