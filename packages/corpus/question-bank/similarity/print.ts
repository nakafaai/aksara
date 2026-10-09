import { Array as Arr, HashSet, Schema } from "effect";

const SHINGLE_SIZE = 3;
const MASKED_FLOOR = 0.8;
const EXACT_FLOOR = 0.25;

/** Word 3-gram shingles of one text, as written and with numbers masked. */
export const PrintSchema = Schema.Struct({
  exact: Schema.HashSet(Schema.String),
  masked: Schema.HashSet(Schema.String),
});
export type Print = typeof PrintSchema.Type;

/** Collects the word 3-gram shingles of one word list. */
export function shingles(list: readonly string[]): HashSet.HashSet<string> {
  if (list.length <= SHINGLE_SIZE) {
    return HashSet.make(Arr.join(list, " "));
  }
  return HashSet.fromIterable(
    Arr.map(list.slice(SHINGLE_SIZE - 1), (_, index) =>
      Arr.join(list.slice(index, index + SHINGLE_SIZE), " ")
    )
  );
}

/** Measures the shared share of two non-empty shingle sets. */
function jaccard(
  left: HashSet.HashSet<string>,
  right: HashSet.HashSet<string>
) {
  const shared = Arr.filter(left, (shingle) =>
    HashSet.has(right, shingle)
  ).length;
  return shared / (HashSet.size(left) + HashSet.size(right) - shared);
}

/** Scores two prints; a masked match counts only when the wording overlaps. */
export function score(
  first: string,
  left: Print,
  second: string,
  right: Print
) {
  const exact = jaccard(left.exact, right.exact);
  const masked = jaccard(left.masked, right.masked);
  const counted = masked >= MASKED_FLOOR && exact >= EXACT_FLOOR;
  return {
    exact,
    first,
    masked,
    score: counted ? Math.max(exact, masked) : exact,
    second,
  };
}
