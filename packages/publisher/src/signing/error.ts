import { Schema } from "effect";

/** Ed25519 key configuration or signing failed without exposing key material. */
export class ContentSigningError extends Schema.TaggedError<
  ContentSigningError,
  { readonly brand: unique symbol }
>()("ContentSigningError", {
  message: Schema.Trimmed.check(Schema.isNonEmpty()),
  stage: Schema.Literals(["configuration", "artifact", "release"]),
}) {}
