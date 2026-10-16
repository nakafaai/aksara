import { Crypto, Effect, PlatformError } from "effect";
import { Hex } from "effect/encoding";
import { Sha256HashSchema } from "#contracts/ids";

/** Largest byte count that one `crypto.getRandomValues` call accepts. */
const RANDOM_CHUNK_BYTES = 65_536;

/**
 * Web Crypto behind Effect's `Crypto` service. Every runtime that Aksara
 * contracts run in has `crypto.subtle`, so digests need no runtime layer.
 */
export const webCryptoService = Crypto.make({
  digest: (algorithm, data) =>
    Effect.tryPromise({
      catch: (cause) =>
        PlatformError.systemError({
          _tag: "Unknown",
          cause,
          description: "Could not compute digest",
          method: "digest",
          module: "Crypto",
        }),
      try: () =>
        globalThis.crypto.subtle
          .digest(algorithm, new Uint8Array(data))
          .then((digest) => new Uint8Array(digest)),
    }),
  randomBytes: (size) => {
    const bytes = new Uint8Array(size);
    for (let offset = 0; offset < size; offset += RANDOM_CHUNK_BYTES) {
      globalThis.crypto.getRandomValues(
        bytes.subarray(offset, offset + RANDOM_CHUNK_BYTES)
      );
    }
    return bytes;
  },
});

/** Computes the SHA-256 digest bytes of one byte sequence through Effect's Crypto service. */
export const digestSha256 = Effect.fn("AksaraContracts.digestSha256")(
  function* (bytes: Uint8Array) {
    const crypto = yield* Crypto.Crypto;
    return yield* crypto.digest("SHA-256", bytes);
  },
  Effect.provideService(Crypto.Crypto, webCryptoService)
);

/** Computes the `sha256:` identity of one byte sequence, the form every stored hash uses. */
export const hashBytes = Effect.fn("AksaraContracts.hashBytes")(function* (
  bytes: Uint8Array
) {
  const digest = yield* digestSha256(bytes);
  return Sha256HashSchema.make(`sha256:${Hex.encode(digest)}`);
});
