import { MutableList } from "effect";
import { hashBytes } from "#contracts/hash/digest";

/**
 * Collects the UTF-8 bytes of one digest stream so that Web Crypto can digest
 * it in one call. Each piece is encoded on its own, exactly as an incremental
 * hash encoded it, so a lone surrogate keeps the bytes it always had.
 */
export class DigestStream {
  readonly #pieces = MutableList.make<Uint8Array>();
  #length = 0;

  /** Appends one piece of text in the order the stream was built. */
  add(text: string): void {
    const bytes = new TextEncoder().encode(text);
    MutableList.append(this.#pieces, bytes);
    this.#length += bytes.byteLength;
  }

  /** Digests every piece in order and returns the branded sha256 identity. */
  digest() {
    const bytes = new Uint8Array(this.#length);
    let offset = 0;
    for (const piece of MutableList.toArray(this.#pieces)) {
      bytes.set(piece, offset);
      offset += piece.byteLength;
    }
    return hashBytes(bytes);
  }
}
