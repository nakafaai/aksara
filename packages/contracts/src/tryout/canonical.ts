import { Effect, Schema } from "effect";
import { hashText } from "#contracts/hash/text";

/** Web Crypto could not hash one domain-separated try-out identity. */
export class TryoutCanonicalHashError extends Schema.TaggedError<
  TryoutCanonicalHashError,
  { readonly brand: unique symbol }
>()(
  "TryoutCanonicalHashError",
  { domain: Schema.String }
) {}

/** Computes one domain-separated canonical try-out SHA-256 identity. */
export const hashTryoutCanonical = Effect.fn(
  "AksaraContracts.hashTryoutCanonical"
)((domain: string, canonical: string) =>
  hashText(`${domain}\n${canonical}`).pipe(
    Effect.mapError(() => new TryoutCanonicalHashError({ domain }))
  )
);
