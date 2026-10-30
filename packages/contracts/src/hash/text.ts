import { Effect } from "effect";
import { hashBytes } from "#contracts/hash/digest";

/** Hashes exact UTF-8 text through the SHA-256 contract. */
export const hashText = Effect.fn("AksaraContracts.hashText")((value: string) =>
  hashBytes(new TextEncoder().encode(value))
);
