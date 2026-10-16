import { describe, expect, it } from "@effect/vitest";
import { Effect, PlatformError } from "effect";
import { Hex } from "effect/encoding";

import {
  digestSha256,
  hashBytes,
  webCryptoService,
} from "#contracts/hash/digest";

describe("Web Crypto random bytes", () => {
  it.effect("fills every byte, including the bytes past one random chunk", () =>
    Effect.gen(function* () {
      const first = yield* webCryptoService.randomBytes(70_000);
      const second = yield* webCryptoService.randomBytes(70_000);

      expect(first.byteLength).toBe(70_000);
      expect(Hex.encode(first.subarray(65_536))).not.toBe(
        Hex.encode(second.subarray(65_536))
      );
      expect(Hex.encode(first)).not.toBe(Hex.encode(second));
    })
  );
});

describe("SHA-256 digests through Effect's Crypto service", () => {
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

  it.effect("maps a rejected digest into the platform error channel", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValueOnce(new TypeError("injected digest failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const error = yield* digestSha256(new Uint8Array()).pipe(Effect.flip);

      expect(error).toBeInstanceOf(PlatformError.PlatformError);
      expect(error.reason.module).toBe("Crypto");
    })
  );
});
