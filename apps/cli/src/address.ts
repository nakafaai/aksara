import type { AddressInfo } from "node:net";
import { Predicate } from "effect";

/** Narrows a Node listener address without accepting pipes or malformed data. */
export function isAddressInfo(value: unknown): value is AddressInfo {
  return (
    Predicate.isRecord(value) &&
    typeof value.address === "string" &&
    typeof value.family === "string" &&
    typeof value.port === "number"
  );
}
