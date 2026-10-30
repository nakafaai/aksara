import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Hex } from "effect/encoding";

import { digestSha256, hashBytes } from "#contracts/hash/digest";

describe("SHA-256 digests through Effect's Digest service", () => {
  it.effect("pins the digest bytes of exact byte sequences", () =>
    Effect.gen(function* () {
      expect(Hex.encode(yield* digestSha256(new Uint8Array()))).toBe(
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      );
      expect(
        Hex.encode(yield* digestSha256(new TextEncoder().encode("abc")))
      ).toBe(
        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
      );
      expect(
        Hex.encode(
          yield* digestSha256(
            Uint8Array.from({ length: 256 }, (_, index) => index)
          )
        )
      ).toBe(
        "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880"
      );
    })
  );

  it.effect("returns the sha256 identity that stored hashes use", () =>
    Effect.gen(function* () {
      expect(yield* hashBytes(new TextEncoder().encode("abc"))).toBe(
        "sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
      );
    })
  );
});
