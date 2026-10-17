import { Effect, Schema } from "effect";
import { hashBytes } from "#contracts/hash/digest";

/** Web Crypto could not hash one UTF-8 contract value. */
export class TextHashError extends Schema.TaggedError<
  TextHashError,
  { readonly brand: unique symbol }
>()("TextHashError", { cause: Schema.Unknown }) {}

/** Hashes exact UTF-8 text through the Web Crypto contract. */
export const hashText = Effect.fn("AksaraContracts.hashText")((value: string) =>
  hashBytes(new TextEncoder().encode(value)).pipe(
    Effect.mapError((cause) => new TextHashError({ cause }))
  )
);
