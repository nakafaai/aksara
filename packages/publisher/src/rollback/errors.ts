import { ReleaseIdSchema } from "@nakafaai/aksara-contracts/ids";
import { Schema } from "effect";

const RollbackIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-1)
);

/** A forward rollback reused the immutable release identity it reverses. */
export class RollbackIdentityError extends Schema.TaggedError<RollbackIdentityError>()(
  "RollbackIdentityError",
  { releaseId: ReleaseIdSchema, rollbackOf: ReleaseIdSchema }
) {}

/** One target page failed the exact rollback wire schema. */
export class RollbackPageDecodeError extends Schema.TaggedError<RollbackPageDecodeError>()(
  "RollbackPageDecodeError",
  { afterIndex: RollbackIndexSchema }
) {}

/** A page belongs to another release than the requested rollback source. */
export class RollbackPageIdentityError extends Schema.TaggedError<RollbackPageIdentityError>()(
  "RollbackPageIdentityError",
  {
    actualReleaseId: ReleaseIdSchema,
    afterIndex: RollbackIndexSchema,
    expectedReleaseId: ReleaseIdSchema,
  }
) {}

/** A replay or later page changed the source release's stable total. */
export class RollbackPageTotalError extends Schema.TaggedError<RollbackPageTotalError>()(
  "RollbackPageTotalError",
  {
    actualTotal: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    afterIndex: RollbackIndexSchema,
    expectedTotal: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  }
) {}

/** A page skipped, repeated, or moved its stable index cursor backward. */
export class RollbackPageCursorError extends Schema.TaggedError<RollbackPageCursorError>()(
  "RollbackPageCursorError",
  {
    actualIndex: RollbackIndexSchema,
    afterIndex: RollbackIndexSchema,
    expectedIndex: RollbackIndexSchema,
  }
) {}

/** A complete decoded rollback page exceeds the publication wire ceiling. */
export class RollbackPageByteLimitError extends Schema.TaggedError<RollbackPageByteLimitError>()(
  "RollbackPageByteLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    afterIndex: RollbackIndexSchema,
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}
