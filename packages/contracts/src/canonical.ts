import { Array as Arr, Order, Record as Rec } from "effect";

/** Orders the members of one canonical list by their place in it. */
export function canonicalOrder<A extends string>(
  canonical: readonly A[]
): Order.Order<A> {
  const places = Rec.fromEntries(
    Arr.map(canonical, (member, index) => [member, index] as const)
  );
  return Order.mapInput(Order.Number, (member: A) => places[member]);
}

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
