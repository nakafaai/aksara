import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";

/** Describes a wire value that failed its named Effect Schema contract. */
export class ContractDecodeError extends Schema.TaggedError<ContractDecodeError>()(
  "ContractDecodeError",
  {
    cause: Schema.Unknown,
    contract: Schema.Trimmed.check(Schema.isNonEmpty()),
    message: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Fields that name one SHA-256 hash and the recomputed SHA-256 that failed. */
export const Sha256MismatchFields = {
  actualHash: Sha256HashSchema,
  expectedHash: Sha256HashSchema,
};
