import { Array as Arr } from "effect";

/**
 * Checks that a list names members of one canonical list, each at most once,
 * in the canonical order. A value outside the canonical list fails the check.
 */
export function hasCanonicalOrder(
  canonical: readonly string[],
  values: readonly string[]
) {
  const expected = Arr.filter(canonical, (member) =>
    Arr.some(values, (value) => value === member)
  );
  return (
    expected.length === values.length &&
    Arr.every(values, (value, index) => value === expected[index])
  );
}
