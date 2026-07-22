import { Schema } from "effect";

/** Ed25519 key configuration or signing failed without exposing key material. */
export class ContentSigningError extends Schema.TaggedError<ContentSigningError>()(
  "ContentSigningError",
  {
    message: Schema.NonEmptyTrimmedString,
    stage: Schema.Literal("configuration", "artifact", "release"),
  }
) {}
