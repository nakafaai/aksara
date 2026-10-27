import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
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
export class PreparedReleaseIdentityError extends Schema.TaggedError<
  PreparedReleaseIdentityError,
  { readonly brand: unique symbol }
>()("PreparedReleaseIdentityError", {
  baseReleaseId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
}) {}

/** A base release omitted part of its immutable release and snapshot identity. */
export class PreparedReleaseBaseIdentityError extends Schema.TaggedError<
  PreparedReleaseBaseIdentityError,
  { readonly brand: unique symbol }
>()("PreparedReleaseBaseIdentityError", {
  baseManifestHash: Schema.NullOr(Sha256HashSchema),
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  hasBaseActiveAppLocales: Schema.Boolean,
  hasRendererBase: Schema.Boolean,
  hasSnapshotBase: Schema.Boolean,
}) {}

/** A release attempted to replace an unselected structured snapshot family. */
export class PreparedSnapshotScopeError extends Schema.TaggedError<
  PreparedSnapshotScopeError,
  { readonly brand: unique symbol }
>()("PreparedSnapshotScopeError", { family: ContentSnapshotKindSchema }) {}

/** One authored record failed its exact current schema. */
export class PreparedContentDecodeError extends Schema.TaggedError<
  PreparedContentDecodeError,
  { readonly brand: unique symbol }
>()("PreparedContentDecodeError", { recordIndex: RecordIndexSchema }) {}

/** Bound source, change, payload, and projection fields disagree. */
export class PreparedContentCoherenceError extends Schema.TaggedError<
  PreparedContentCoherenceError,
  { readonly brand: unique symbol }
>()("PreparedContentCoherenceError", {
  field: CoherenceFieldSchema,
  recordIndex: RecordIndexSchema,
}) {}

/** Authored records are duplicated or outside canonical head order. */
export class PreparedContentOrderError extends Schema.TaggedError<
  PreparedContentOrderError,
  { readonly brand: unique symbol }
>()("PreparedContentOrderError", { recordIndex: RecordIndexSchema }) {}
