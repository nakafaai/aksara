import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Schema } from "effect";

const RecordIndexSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

export const CoherenceFieldSchema = Schema.Literals([
  "artifactHash",
  "contentKey",
  "family",
  "artifactLocale",
  "rendererDomain",
  "sourcePath",
  "rawMdx",
  "priorState",
]);

/** A release attempted to reuse its immutable base release identity. */
export class PreparedReleaseIdentityError extends Schema.TaggedError<PreparedReleaseIdentityError>()(
  "PreparedReleaseIdentityError",
  { baseReleaseId: ReleaseIdSchema, releaseId: ReleaseIdSchema }
) {}

/** A base release omitted part of its immutable release and snapshot identity. */
export class PreparedReleaseBaseIdentityError extends Schema.TaggedError<PreparedReleaseBaseIdentityError>()(
  "PreparedReleaseBaseIdentityError",
  {
    baseManifestHash: Schema.NullOr(Sha256HashSchema),
    baseReleaseId: Schema.NullOr(ReleaseIdSchema),
    hasBaseActiveAppLocales: Schema.Boolean,
    hasSnapshotBase: Schema.Boolean,
  }
) {}

/** A release attempted to replace an unselected structured snapshot family. */
export class PreparedSnapshotScopeError extends Schema.TaggedError<PreparedSnapshotScopeError>()(
  "PreparedSnapshotScopeError",
  { family: ContentSnapshotKindSchema }
) {}

/** A runtime bundle snapshot differs from the release's resulting try-out state. */
export class PreparedTryoutRuntimeSnapshotError extends Schema.TaggedError<PreparedTryoutRuntimeSnapshotError>()(
  "PreparedTryoutRuntimeSnapshotError",
  {
    actualSnapshotId: Sha256HashSchema,
    expectedSnapshotId: Schema.NullOr(Sha256HashSchema),
  }
) {}

/** One authored record failed its exact current schema. */
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
