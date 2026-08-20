import { Schema } from "effect";

/** Describes a wire value that failed its named Effect Schema contract. */
export class ContractDecodeError extends Schema.TaggedError<ContractDecodeError>()(
  "ContractDecodeError",
  {
    cause: Schema.Unknown,
    contract: Schema.Trimmed.check(Schema.isNonEmpty()),
    message: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}
