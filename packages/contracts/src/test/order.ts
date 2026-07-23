/** Reverses observable keys without reconstructing a schema-owned value. */
export function reverseObjectKeys<T extends object>(value: T): T {
  return new Proxy(value, {
    /** Preserves reversed insertion evidence for every nested record. */
    get(target, property, receiver) {
      const nested: unknown = Reflect.get(target, property, receiver);
      if (nested === null || typeof nested !== "object") {
        return nested;
      }
      return reverseObjectKeys(nested);
    },
    ownKeys: (target) => Reflect.ownKeys(target).reverse(),
  });
}
