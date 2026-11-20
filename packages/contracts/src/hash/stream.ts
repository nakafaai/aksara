import { Effect } from "effect";
import { Hex } from "effect/encoding";
import { Sha256 } from "#contracts/hash/sha256";
import { Sha256HashSchema } from "#contracts/ids";

/**
 * Hashes one digest stream piece by piece. Each piece is encoded to UTF-8 on its
 * own, so a lone surrogate keeps the bytes it always had, and the running
 * SHA-256 keeps memory constant however long the stream grows: a snapshot proof
 * over a hundred megabytes of rows never holds those bytes at once.
 */
export class DigestStream {
  readonly #hash = new Sha256();
  readonly #encoder = new TextEncoder();

  /** Appends one piece of text in the order the stream was built. */
  add(text: string): void {
    this.#hash.update(this.#encoder.encode(text));
  }

  /** Finishes the stream once and returns its branded sha256 identity. */
  digest() {
    return Effect.sync(() =>
      Sha256HashSchema.make(`sha256:${Hex.encode(this.#hash.digest())}`)
    );
  }
}
