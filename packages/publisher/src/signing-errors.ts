import { Schema } from "effect";

/** Ed25519 key configuration or signing failed without exposing key material. */
export class ContentSigningError extends Schema.TaggedError<ContentSigningError>()(
  "ContentSigningError",
  {
    message: Schema.NonEmptyTrimmedString,
    stage: Schema.Literal("configuration", "artifact", "release"),
  }
) {}

/** A complete signed artifact exceeded Aksara's evidence-led wire ceiling. */
export class SignedArtifactByteLimitError extends Schema.TaggedError<SignedArtifactByteLimitError>()(
  "SignedArtifactByteLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}
