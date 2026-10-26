import { Array as Arr, Option, Order } from "effect";

/**
 * Orders values by their place in one canonical list. A value outside the list
 * sorts after every member.
 */
export function canonicalOrder<A extends string>(
  canonical: readonly A[]
): Order.Order<A> {
  return Order.mapInput(Order.Number, (value: A) =>
    Option.getOrElse(
      Arr.findFirstIndex(canonical, (member) => member === value),
      () => canonical.length
    )
  );
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
