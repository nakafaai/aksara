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
  if (Arr.isArray(value)) {
    return Arr.map(value, (part) => structureOf(part));
  }
  if (Predicate.isObject(value)) {
    return Rec.map(
      Rec.filter(value, (_, key) => !HashSet.has(LANGUAGE_FIELDS, key)),
      (part) => structureOf(part)
    );
  }
  return value;
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
