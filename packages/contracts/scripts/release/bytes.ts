import { Array as Arr } from "effect";

/** Compares two byte sequences exactly, byte by byte, without a Node buffer. */
export function sameBytes(left: Uint8Array, right: Uint8Array) {
  return (
    left.byteLength === right.byteLength &&
    Arr.every(
      Arr.makeBy(left.byteLength, (index) => left[index] === right[index]),
      (same) => same
    )
  );
}
