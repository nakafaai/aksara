import { digestSha256 } from "@nakafa/aksara-contracts/hash/digest";
import { Array as Arr, Effect } from "effect";
import { Hex } from "effect/encoding";

/** Encodes one named source as the exact parts that a domain-separated bundle digest covers. */
export function bundleParts(name: string, bytes: Uint8Array) {
  return [
    new TextEncoder().encode(`${name}\n${bytes.byteLength}\n`),
    bytes,
    new TextEncoder().encode("\n"),
  ];
}

/** Joins byte parts, in order, into one buffer that a single digest can cover. */
function concatBytes(parts: readonly Uint8Array[]) {
  const joined = new Uint8Array(
    Arr.reduce(parts, 0, (size, part) => size + part.byteLength)
  );
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.byteLength;
  }
  return joined;
}

/** Digests the ordered parts of one bundle, which the loader already holds in memory. */
export const digestBundle = Effect.fn("AksaraCorpus.digestQuranBundle")(
  function* (parts: readonly Uint8Array[]) {
    const digest = yield* digestSha256(concatBytes(parts));
    return Hex.encode(digest);
  }
);
