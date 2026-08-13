import { Effect, Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";

/** Web Crypto could not hash one UTF-8 contract value. */
export class TextHashError extends Schema.TaggedError<TextHashError>()(
  "TextHashError",
  { cause: Schema.Unknown }
) {}

/** Encodes one SHA-256 digest without depending on a Node runtime. */
function encodeDigest(value: ArrayBuffer) {
  let hex = "";
  for (const byte of new Uint8Array(value)) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return Sha256HashSchema.make(`sha256:${hex}`);
}

/** Hashes exact UTF-8 text through the Web Crypto contract. */
export const hashText = Effect.fn("AksaraContracts.hashText")((value: string) =>
  Effect.tryPromise({
    catch: (cause) => new TextHashError({ cause }),
    try: () =>
      crypto.subtle
        .digest("SHA-256", new TextEncoder().encode(value))
        .then(encodeDigest),
  })
);
