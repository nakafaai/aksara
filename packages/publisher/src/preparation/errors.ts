import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

const RecordIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

export const CoherenceFieldSchema = Schema.Literal(
  "artifactHash",
  "contentKey",
  "family",
  "locale",
  "rendererDomain",
  "sourcePath",
  "rawMdx",
  "priorState"
);

/** A release attempted to reuse its immutable base release identity. */
export class PreparedReleaseIdentityError extends Schema.TaggedError<PreparedReleaseIdentityError>()(
  "PreparedReleaseIdentityError",
  { baseReleaseId: ReleaseIdSchema, releaseId: ReleaseIdSchema }
) {}

/** A base release identity omitted exactly one half of its immutable pair. */
export class PreparedReleaseBaseIdentityError extends Schema.TaggedError<PreparedReleaseBaseIdentityError>()(
  "PreparedReleaseBaseIdentityError",
  {
    baseManifestHash: Schema.NullOr(Sha256HashSchema),
    baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  }
) {}

/** A replay factory threw before it could describe its authored stream. */
export class PreparedContentReplayError extends Schema.TaggedError<PreparedContentReplayError>()(
  "PreparedContentReplayError",
  { cause: Schema.Unknown }
) {}

/** One authored record failed its exact v1 schema. */
export class PreparedContentDecodeError extends Schema.TaggedError<PreparedContentDecodeError>()(
  "PreparedContentDecodeError",
  { recordIndex: RecordIndexSchema }
) {}

/** Bound source, change, payload, and projection fields disagree. */
export class PreparedContentCoherenceError extends Schema.TaggedError<PreparedContentCoherenceError>()(
  "PreparedContentCoherenceError",
  { field: CoherenceFieldSchema, recordIndex: RecordIndexSchema }
) {}

/** Authored records are duplicated or outside canonical head order. */
export class PreparedContentOrderError extends Schema.TaggedError<PreparedContentOrderError>()(
  "PreparedContentOrderError",
  { recordIndex: RecordIndexSchema }
) {}
