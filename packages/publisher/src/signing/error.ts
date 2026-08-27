import { Schema } from "effect";

/** Ed25519 key configuration or signing failed without exposing key material. */
export class ContentSigningError extends Schema.TaggedError<ContentSigningError>()(
  "ContentSigningError",
  {
    message: Schema.Trimmed.check(Schema.isNonEmpty()),
    stage: Schema.Literals([
      "configuration",
      "artifact",
      "release",
      "tryout-history-migration-plan",
      "tryout-history-migration-receipt",
      "tryout-runtime-bundle",
    ]),
  }
) {}
