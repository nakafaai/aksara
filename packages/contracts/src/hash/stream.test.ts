import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hashBytes } from "#contracts/hash/digest";
import { DigestStream } from "#contracts/hash/stream";

/** Joins the UTF-8 bytes of each piece encoded on its own, as the stream encodes them. */
function joinedPieces(pieces: readonly string[]) {
  const encoder = new TextEncoder();
  let parts: Uint8Array[] = [];
  let length = 0;
  for (const piece of pieces) {
    const bytes = encoder.encode(piece);
    parts = [...parts, bytes];
    length += bytes.byteLength;
  }
  const joined = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.byteLength;
  }
  return joined;
}

describe("DigestStream", () => {
  it.effect(
    "digests the pieces as one byte sequence, each piece encoded on its own",
    () =>
      Effect.gen(function* () {
        const pieces = [
          "aksara-rows-v1\n",
          '{"kind":"item"}\u0000sha256:abc\n',
          "\uD800",
          "\uDC00 split surrogate halves stay two replacement characters\n",
          "",
          "ü 日本 🎓\n",
        ];
        const stream = new DigestStream();
        for (const piece of pieces) {
          stream.add(piece);
        }

        expect(yield* stream.digest()).toBe(
          yield* hashBytes(joinedPieces(pieces))
        );
      })
  );

  it.effect("digests an empty stream as the empty byte sequence", () =>
    Effect.gen(function* () {
      expect(yield* new DigestStream().digest()).toBe(
        yield* hashBytes(new Uint8Array())
      );
    })
  );
});
