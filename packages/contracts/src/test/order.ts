import { Array as Arr, Predicate } from "effect";

/** A value that also reads as a record, so Record.keys accepts it. */
type RecordView<T> = T & Readonly<Record<string, unknown>>;

/** Reverses observable keys without reconstructing a schema-owned value, and returns it as a record. */
export function reverseObjectKeys<T extends Readonly<Record<string, unknown>>>(
  value: T
): RecordView<T> {
  return reverseNestedKeys(value);
}

/** Reverses observable keys of one object and of every object reached from it. */
function reverseNestedKeys<T extends object>(value: T): T {
  return new Proxy(value, {
    /** Preserves reversed insertion evidence for every nested record. */
    get(target, property, receiver) {
      const nested: unknown = Reflect.get(target, property, receiver);
      if (!Predicate.isObjectOrArray(nested)) {
        return nested;
      }
      return reverseNestedKeys(nested);
    },
    ownKeys: (target) => Arr.reverse(Reflect.ownKeys(target)),
  });
}
