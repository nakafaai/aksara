import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

const RollbackIndexSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(-1))
);

/** A forward rollback reused the immutable release identity it reverses. */
export class RollbackIdentityError extends Schema.TaggedError<RollbackIdentityError>()(
  "RollbackIdentityError",
  { releaseId: ReleaseIdSchema, rollbackOf: ReleaseIdSchema }
) {}

/** A signed proof release cannot authenticate this rollback transition. */
export class RollbackProofIdentityError extends Schema.TaggedError<RollbackProofIdentityError>()(
  "RollbackProofIdentityError",
  {
    actualReleaseId: ReleaseIdSchema,
    expectedReleaseId: ReleaseIdSchema,
    rollbackOf: ReleaseIdSchema,
  }
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
    actualManifestHash: Sha256HashSchema,
    actualReleaseId: ReleaseIdSchema,
    afterIndex: RollbackIndexSchema,
    expectedManifestHash: Sha256HashSchema,
    expectedReleaseId: ReleaseIdSchema,
  }
) {}

/** A replay or later page changed the source release's stable total. */
export class RollbackPageTotalError extends Schema.TaggedError<RollbackPageTotalError>()(
  "RollbackPageTotalError",
  {
    actualTotal: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    afterIndex: RollbackIndexSchema,
    expectedTotal: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
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
    actualBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    afterIndex: RollbackIndexSchema,
    maxBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
  }
) {}

/** One target route page failed its exact rollback wire schema. */
export class RoutePageDecodeError extends Schema.TaggedError<RoutePageDecodeError>()(
  "RoutePageDecodeError",
  { afterIndex: RollbackIndexSchema }
) {}

/** A route page belongs to another release than its requested source. */
export class RoutePageIdentityError extends Schema.TaggedError<RoutePageIdentityError>()(
  "RoutePageIdentityError",
  {
    actualManifestHash: Sha256HashSchema,
    actualReleaseId: ReleaseIdSchema,
    afterIndex: RollbackIndexSchema,
    expectedManifestHash: Sha256HashSchema,
    expectedReleaseId: ReleaseIdSchema,
  }
) {}

/** A route replay changed its signed source total between pages. */
export class RoutePageTotalError extends Schema.TaggedError<RoutePageTotalError>()(
  "RoutePageTotalError",
  {
    actualTotal: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    afterIndex: RollbackIndexSchema,
    expectedTotal: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
  }
) {}

/** A route page skipped, repeated, or moved its index cursor backward. */
export class RoutePageCursorError extends Schema.TaggedError<RoutePageCursorError>()(
  "RoutePageCursorError",
  {
    actualIndex: RollbackIndexSchema,
    afterIndex: RollbackIndexSchema,
    expectedIndex: RollbackIndexSchema,
  }
) {}
