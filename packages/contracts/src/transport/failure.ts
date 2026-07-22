import { Schema } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import { PublicationOperationSchema } from "#contracts/transport/request";

/** Stable rejection codes that require no message parsing by clients. */
export const PublicationDomainRejectionCodeSchema = Schema.Literal(
  "CONTENT_RELEASE_INTEGRITY",
  "CONTENT_RELEASE_LIMIT",
  "CONTENT_RELEASE_MISSING",
  "CONTENT_RELEASE_ROUTE",
  "CONTENT_RELEASE_SIZE",
  "CONTENT_RELEASE_STATE",
  "CONTENT_RELEASE_UNSUPPORTED"
);
export type PublicationDomainRejectionCode =
  typeof PublicationDomainRejectionCodeSchema.Type;

/** Stable rejection codes that require no message parsing by clients. */
export const PublicationRejectionCodeSchema = Schema.Union(
  PublicationDomainRejectionCodeSchema,
  Schema.Literal("CONTENT_RELEASE_INVALID_REQUEST")
);
export type PublicationRejectionCode =
  typeof PublicationRejectionCodeSchema.Type;

/** Complete stable code vocabulary with one canonical HTTP status mapping. */
export const PublicationFailureCodeSchema = Schema.Union(
  PublicationRejectionCodeSchema,
  Schema.Literal(
    "CONTENT_RELEASE_UNAUTHORIZED",
    "CONTENT_RELEASE_CONFLICT",
    "CONTENT_RELEASE_STALE_BASE"
  )
);
export type PublicationFailureCode = typeof PublicationFailureCodeSchema.Type;

/** Exact HTTP statuses returned for stable publication failures. */
export const PublicationFailureStatusSchema = Schema.Literal(
  400,
  401,
  404,
  409,
  413,
  415,
  422
);
export type PublicationFailureStatus =
  typeof PublicationFailureStatusSchema.Type;

/** Canonical publication failure-code to HTTP-status contract. */
export const PUBLICATION_FAILURE_STATUSES: Readonly<{
  [Code in PublicationFailureCode]: PublicationFailureStatus;
}> = Object.freeze({
  CONTENT_RELEASE_CONFLICT: 409,
  CONTENT_RELEASE_INTEGRITY: 422,
  CONTENT_RELEASE_INVALID_REQUEST: 400,
  CONTENT_RELEASE_LIMIT: 413,
  CONTENT_RELEASE_MISSING: 404,
  CONTENT_RELEASE_ROUTE: 422,
  CONTENT_RELEASE_SIZE: 413,
  CONTENT_RELEASE_STALE_BASE: 409,
  CONTENT_RELEASE_STATE: 422,
  CONTENT_RELEASE_UNAUTHORIZED: 401,
  CONTENT_RELEASE_UNSUPPORTED: 415,
});

/** Resolves the exact HTTP status owned by one stable failure code. */
export function publicationFailureStatus(code: PublicationFailureCode) {
  return PUBLICATION_FAILURE_STATUSES[code];
}

/** Authentication failed before any publication capability was invoked. */
export const PublicationUnauthorizedSchema = Schema.Struct({
  code: Schema.Literal("CONTENT_RELEASE_UNAUTHORIZED"),
  kind: Schema.Literal("unauthorized"),
});
export type PublicationUnauthorized = typeof PublicationUnauthorizedSchema.Type;

const PublicationInvalidRequestSchema = Schema.Struct({
  code: Schema.Literal("CONTENT_RELEASE_INVALID_REQUEST"),
  kind: Schema.Literal("rejected"),
  operation: Schema.Null,
  releaseId: Schema.Null,
});

const PublicationDomainRejectedSchema = Schema.Struct({
  code: PublicationDomainRejectionCodeSchema,
  kind: Schema.Literal("rejected"),
  operation: PublicationOperationSchema,
  releaseId: ReleaseIdSchema,
});

/** One request was invalid or rejected by a stable authenticated domain rule. */
export const PublicationRejectedSchema = Schema.Union(
  PublicationInvalidRequestSchema,
  PublicationDomainRejectedSchema
);
export type PublicationRejected = typeof PublicationRejectedSchema.Type;

const ReleaseConflictSchema = Schema.Struct({
  code: Schema.Literal("CONTENT_RELEASE_CONFLICT"),
  kind: Schema.Literal("conflict"),
  operation: Schema.Literal("stageRelease"),
  releaseId: ReleaseIdSchema,
});

const BatchConflictSchema = Schema.Struct({
  batchIndex: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  code: Schema.Literal("CONTENT_RELEASE_CONFLICT"),
  kind: Schema.Literal("conflict"),
  operation: Schema.Literal(
    "stageItemBatch",
    "stageProjectionBatch",
    "stageArtifactBatch"
  ),
  releaseId: ReleaseIdSchema,
});

/** Immutable request identity was reused with different persisted bytes. */
export const PublicationConflictSchema = Schema.Union(
  ReleaseConflictSchema,
  BatchConflictSchema
);
export type PublicationConflict = typeof PublicationConflictSchema.Type;

/** Active publication state no longer matches the signed release base. */
export const PublicationStaleBaseSchema = Schema.Struct({
  activeReleaseId: Schema.NullOr(ReleaseIdSchema),
  code: Schema.Literal("CONTENT_RELEASE_STALE_BASE"),
  expectedBaseReleaseId: Schema.NullOr(ReleaseIdSchema),
  kind: Schema.Literal("stale-base"),
  operation: Schema.Literal("stageRelease", "activate"),
  releaseId: ReleaseIdSchema,
});
export type PublicationStaleBase = typeof PublicationStaleBaseSchema.Type;

/** Complete stable publication failure vocabulary returned on the wire. */
export const PublicationFailureSchema = Schema.Union(
  PublicationUnauthorizedSchema,
  PublicationRejectedSchema,
  PublicationConflictSchema,
  PublicationStaleBaseSchema
);
export type PublicationFailure = typeof PublicationFailureSchema.Type;
