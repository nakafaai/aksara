import { Array as Arr, Equal, HashSet, Predicate, Record as Rec } from "effect";

/**
 * The fields that hold the words of a language: a label, a text alternative,
 * and a unit. Everything else in an interaction is structure.
 */
const LANGUAGE_FIELDS = HashSet.make("alt", "label", "unit");

/**
 * Returns a value without its words: every field in `LANGUAGE_FIELDS` is
 * dropped at every depth, so what remains is identifiers, counts, bounds, and
 * flags.
 */
export function structureOf(value: unknown): unknown {
  return withoutFields(value, LANGUAGE_FIELDS);
}

/** Returns a value with the named fields dropped at every depth. */
function withoutFields(
  value: unknown,
  fields: HashSet.HashSet<string>
): unknown {
  if (Arr.isArray(value)) {
    return Arr.map(value, (part) => withoutFields(part, fields));
  }
  if (Predicate.isObject(value)) {
    return Rec.map(
      Rec.filter(value, (_, key) => !HashSet.has(fields, key)),
      (part) => withoutFields(part, fields)
    );
  }
  return value;
}

/**
 * The fields of an answer key that hold the words of a language: the accepted
 * texts of a text entry, the descriptors of a rubric, and the feedback of a
 * sketch's criteria. Everything else in a key, such as a choice, a number, a
 * feature, or a tolerance, is the same in every language of an item.
 */
const KEY_WORD_FIELDS = HashSet.make(
  "acceptedAnswers",
  "descriptor",
  "feedback"
);

/**
 * Checks that every answer key has the shape of the first apart from its
 * words, so the language versions of one item agree on every answer and differ
 * only in the texts a learner may type and the words a grader reads.
 */
export function hasSameKeyStructure(keys: Arr.NonEmptyReadonlyArray<unknown>) {
  const first = withoutFields(Arr.headNonEmpty(keys), KEY_WORD_FIELDS);
  return Arr.every(keys, (key) =>
    Equal.equals(withoutFields(key, KEY_WORD_FIELDS), first)
  );
}

/**
 * Checks that every value has the structure of the first. The structure of an
 * interaction is what its answer key and its scoring rule are written
 * against, so translations of one item may change words and never structure.
 */
export function hasSameStructure(values: Arr.NonEmptyReadonlyArray<unknown>) {
  const first = structureOf(Arr.headNonEmpty(values));
  return Arr.every(values, (value) => Equal.equals(structureOf(value), first));
}
