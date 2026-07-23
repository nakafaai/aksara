import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseItem,
  PublicationReceipt,
  ReleaseVerificationEvidence,
  RollbackSignedContentRelease,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type {
  ContentReleaseCurrent,
  RecoveryLookup,
} from "@nakafa/aksara-contracts/release/current";
import type {
  HeadPage,
  HeadPageRequest,
} from "@nakafa/aksara-contracts/release/head";
import type {
  ContentReleaseBundle,
  ContentReleaseStatus,
  ContentReleaseStatusRequest,
  ReleaseAbortReceipt,
  ReleaseAbortRequest,
  ReleaseAcceptRequest,
  ReleaseCleanupReceipt,
  ReleaseCleanupRequest,
  RollbackContentReleaseBundle,
} from "@nakafa/aksara-contracts/release/lifecycle";
import type { RollbackPageRequest } from "@nakafa/aksara-contracts/release/rollback";
import type { RoutePageRequest } from "@nakafa/aksara-contracts/release/route-page";
import type {
  StageArtifactBatchInput,
  StageItemBatchInput,
  StageProjectionBatchInput,
  StageRouteBatchInput,
} from "@nakafa/aksara-contracts/transport/request";
import type {
  StageSnapshotBatchInput,
  StageSnapshotInput,
} from "@nakafa/aksara-contracts/transport/snapshot";
import {
  Context,
  type Effect,
  type Redacted,
  Schema,
  type Stream,
} from "effect";
import type { PublicationTargetFailure } from "#publisher/target/errors";
/** The exact reviewed Aksara revision could not provide release sources. */
export class PublicationSourceError extends Schema.TaggedError<PublicationSourceError>()(
  "PublicationSourceError",
  {
    aksaraSha: GitCommitShaSchema,
    cause: Schema.Unknown,
    message: Schema.NonEmptyTrimmedString,
  }
) {}
/** A persisted target status belongs to another release identity. */
export class PublicationStatusMismatchError extends Schema.TaggedError<PublicationStatusMismatchError>()(
  "PublicationStatusMismatchError",
  {
    actualManifestHash: Sha256HashSchema,
    actualReleaseId: ReleaseIdSchema,
    expectedManifestHash: Sha256HashSchema,
    expectedReleaseId: ReleaseIdSchema,
  }
) {}
/** A durably aborted immutable release cannot resume under the same identity. */
export class PublicationReleaseAbortedError extends Schema.TaggedError<PublicationReleaseAbortedError>()(
  "PublicationReleaseAbortedError",
  { manifestHash: Sha256HashSchema, releaseId: ReleaseIdSchema }
) {}

/** A stored release is not yet or no longer safe for direct finalization. */
export class PublicationResumePhaseError extends Schema.TaggedError<PublicationResumePhaseError>()(
  "PublicationResumePhaseError",
  {
    phase: Schema.Literal(
      "missing",
      "staging",
      "verifying",
      "verified",
      "aborting",
      "completed"
    ),
    releaseId: ReleaseIdSchema,
  }
) {}

/** A prepared mode disagrees with the provenance signed by its manifest. */
export class PublicationModeMismatchError extends Schema.TaggedError<PublicationModeMismatchError>()(
  "PublicationModeMismatchError",
  {
    manifestMode: Schema.Literal("git", "rollback"),
    preparedMode: Schema.Literal("git", "rollback"),
    releaseId: ReleaseIdSchema,
  }
) {}

/** A recovery identity aliases the candidate or the active base it protects. */
export class PublicationRecoveryIdentityError extends Schema.TaggedError<PublicationRecoveryIdentityError>()(
  "PublicationRecoveryIdentityError",
  {
    conflictingReleaseId: ReleaseIdSchema,
    recoveryId: ReleaseIdSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Renderer preflight or post-commit cache convergence failed closed. */
export class PublicationActivationError extends Schema.TaggedError<PublicationActivationError>()(
  "PublicationActivationError",
  {
    phase: Schema.Literal("cache", "preflight"),
    releaseId: ReleaseIdSchema,
  }
) {}

/** Signing configuration injected only into the safe publication operation. */
export class PublicationSigningKey extends Context.Tag(
  "AksaraPublicationSigningKey"
)<
  PublicationSigningKey,
  {
    readonly keyId: string;
    readonly privateKeyPem: Redacted.Redacted<string>;
  }
>() {}

/** Operator-selected immutable identity for the pre-activation inverse release. */
export class PublicationRecoveryId extends Context.Tag(
  "AksaraPublicationRecoveryId"
)<PublicationRecoveryId, typeof ReleaseIdSchema.Type>() {}

/** Owns renderer preflight and post-commit Nakafa cache convergence. */
export class PublicationActivation extends Context.Tag(
  "AksaraPublicationActivation"
)<
  PublicationActivation,
  {
    /**
     * Invalidates Nakafa content caches after the pointer commit succeeds.
     *
     * The publisher supplies one replayable family-aware stream derived from
     * exact decoded release items, including body-free deletions.
     */
    readonly invalidate: <E, R>(input: {
      /** Replays the exact family-aware cache transitions for this release. */
      readonly cacheChanges: () => Stream.Stream<ContentCacheChange, E, R>;
      readonly release: SignedContentRelease;
    }) => Effect.Effect<void, E | PublicationActivationError, R>;
    /** Fails closed when the live renderer differs from the signed release. */
    readonly verify: (
      release: SignedContentRelease
    ) => Effect.Effect<void, PublicationActivationError>;
  }
>() {}

/** Loads ordered sources only from one exact reviewed Aksara revision. */
export class PublicationSource extends Context.Tag("AksaraPublicationSource")<
  PublicationSource,
  {
    /** Streams sources in the same order as authenticated upsert items. */
    readonly loadExactRevision: <E, R>(input: {
      readonly aksaraSha: typeof GitCommitShaSchema.Type;
      readonly items: Stream.Stream<ContentReleaseItem, E, R>;
    }) => Stream.Stream<unknown, E | PublicationSourceError, R>;
  }
>() {}

/** Idempotent invisible staging and atomic activation infrastructure seam. */
export class PublicationTarget extends Context.Tag("AksaraPublicationTarget")<
  PublicationTarget,
  {
    /** Accepts one active release and discards its exact retained inverse. */
    readonly accept: (
      request: ReleaseAcceptRequest
    ) => Effect.Effect<ReleaseAbortReceipt, PublicationTargetFailure>;
    /** Advances one bounded server-owned abort page idempotently. */
    readonly abort: (
      request: ReleaseAbortRequest
    ) => Effect.Effect<ReleaseAbortReceipt, PublicationTargetFailure>;
    /** Reads authoritative active and candidate publication identities. */
    readonly current: () => Effect.Effect<
      ContentReleaseCurrent,
      PublicationTargetFailure
    >;
    /** Reads one authoritative material-head page for an active release. */
    readonly headPage: (
      request: HeadPageRequest
    ) => Effect.Effect<HeadPage, PublicationTargetFailure>;
    /** Reads historical completion evidence for one exact recovery pair. */
    readonly recovery: (
      request: ReleaseAcceptRequest
    ) => Effect.Effect<RecoveryLookup, PublicationTargetFailure>;
    /** Atomically activates a fully verified release. */
    readonly activate: (
      release: SignedContentRelease
    ) => Effect.Effect<PublicationReceipt, PublicationTargetFailure>;
    /** Atomically activates one verified inverse retained for the active release. */
    readonly activateRecovery: (
      release: RollbackSignedContentRelease
    ) => Effect.Effect<PublicationReceipt, PublicationTargetFailure>;
    /** Deletes one bounded page of unreachable staged rows. */
    readonly cleanup: (
      request: ReleaseCleanupRequest
    ) => Effect.Effect<ReleaseCleanupReceipt, PublicationTargetFailure>;
    /** Reads one bounded exact prior-state page for forward rollback. */
    readonly rollbackPage: (
      request: RollbackPageRequest
    ) => Effect.Effect<unknown, PublicationTargetFailure>;
    /** Reads one bounded prior-owner page for route rollback. */
    readonly routePage: (
      request: RoutePageRequest
    ) => Effect.Effect<unknown, PublicationTargetFailure>;
    /** Stages one immutable artifact batch idempotently. */
    readonly stageArtifactBatch: (
      batch: StageArtifactBatchInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one ordered release-item batch idempotently. */
    readonly stageItemBatch: (
      batch: StageItemBatchInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one canonical material projection batch idempotently. */
    readonly stageProjectionBatch: (
      batch: StageProjectionBatchInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one structured-family manifest idempotently. */
    readonly stageSnapshot: (
      input: StageSnapshotInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one bounded structured-snapshot row batch idempotently. */
    readonly stageSnapshotBatch: (
      batch: StageSnapshotBatchInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one ordered route batch idempotently. */
    readonly stageRouteBatch: (
      batch: StageRouteBatchInput
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages the signed pre-activation inverse envelope idempotently. */
    readonly stageRecovery: (
      input: RollbackContentReleaseBundle
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages the signed release envelope idempotently. */
    readonly stageRelease: (
      input: ContentReleaseBundle
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Reads the durable resume phase for one release. */
    readonly status: (
      request: ContentReleaseStatusRequest
    ) => Effect.Effect<ContentReleaseStatus, PublicationTargetFailure>;
    /** Recomputes staged evidence before activation is allowed. */
    readonly verify: (
      release: SignedContentRelease
    ) => Effect.Effect<ReleaseVerificationEvidence, PublicationTargetFailure>;
  }
>() {}
