import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Hex } from "effect/encoding";

import { digestSha256 } from "#contracts/hash/digest";
import { Sha256 } from "#contracts/hash/sha256";

/** Hashes bytes with the incremental SHA-256, fed in pieces of the given sizes. */
function incremental(bytes: Uint8Array, pieceSizes: readonly number[]) {
  const hash = new Sha256();
  let offset = 0;
  let piece = 0;
  while (offset < bytes.byteLength) {
    const size = Math.max(1, pieceSizes[piece % pieceSizes.length] ?? 1);
    hash.update(bytes.subarray(offset, offset + size));
    offset += size;
    piece += 1;
  }
  return Hex.encode(hash.digest());
}

/** Fills bytes from a fixed linear congruential sequence, so every run hashes the same input. */
function sequence(length: number, seed: number) {
  const bytes = new Uint8Array(length);
  let value = seed;
  for (let index = 0; index < length; index += 1) {
    value = (value * 1_103_515_245 + 12_345) % 2 ** 32;
    bytes[index] = Math.floor(value / 2 ** 24);
  }
  return bytes;
}

describe("incremental SHA-256", () => {
  it("matches the FIPS 180-4 example digests", () => {
    const encoder = new TextEncoder();
    expect(incremental(new Uint8Array(), [1])).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    expect(incremental(encoder.encode("abc"), [1])).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
    expect(
      incremental(
        encoder.encode(
          "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"
        ),
        [7, 13]
      )
    ).toBe("248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1");
    expect(incremental(new Uint8Array(1_000_000).fill(0x61), [4096])).toBe(
      "cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0"
    );
  });

  it.effect(
    "equals Web Crypto at every padding boundary and for any piece sizes",
    () =>
      Effect.gen(function* () {
        const lengths = [
          0, 1, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 129, 1000, 4099,
        ];
        for (const length of lengths) {
          const bytes = sequence(length, length + 1);
          const expected = Hex.encode(yield* digestSha256(bytes));
          expect(incremental(bytes, [length || 1])).toBe(expected);
          expect(incremental(bytes, [1])).toBe(expected);
          expect(incremental(bytes, [3, 64, 17])).toBe(expected);
        }
      })
  );
});
