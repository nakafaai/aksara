import type { AddressInfo } from "node:net";
import { Predicate } from "effect";

/** Narrows a Node listener address without accepting pipes or malformed data. */
export function isAddressInfo(value: unknown): value is AddressInfo {
  return (
    Predicate.isObject(value) &&
    Predicate.isString(value.address) &&
    Predicate.isString(value.family) &&
    Predicate.isNumber(value.port)
  );
}
