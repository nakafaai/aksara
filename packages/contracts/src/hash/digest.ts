import { Effect } from "effect";
import { Digest } from "effect/crypto";
import { Hex } from "effect/encoding";
import { Sha256HashSchema } from "#contracts/ids";

/**
 * Computes the SHA-256 digest bytes of one byte sequence through Effect's
 * `Digest` service on Web Crypto. Every runtime that Aksara contracts run in
 * has `crypto.subtle`, so digests need no runtime layer, and a runtime without
 * it is a defect rather than an expected failure.
 */
export const digestSha256 = Effect.fn("AksaraContracts.digestSha256")(
  function* (bytes: Uint8Array) {
    const digest = yield* Digest.Digest;
    return yield* digest.digest(Digest.sha256, bytes);
  },
  Effect.provide(Digest.layerWebCrypto)
);

/** Computes the `sha256:` identity of one byte sequence, the form every stored hash uses. */
export const hashBytes = Effect.fn("AksaraContracts.hashBytes")(function* (
  bytes: Uint8Array
) {
  const digest = yield* digestSha256(bytes);
  return Sha256HashSchema.make(`sha256:${Hex.encode(digest)}`);
});
