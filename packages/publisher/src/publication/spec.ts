import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
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
import type { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type {
  StageArtifactBatchInput,
  StageItemBatchInput,
  StageProjectionBatchInput,
  StageRouteBatchInput,
} from "@nakafa/aksara-contracts/transport/request";
import {
  Context,
  type Effect,
  type Redacted,
  Schema,
  type Stream,
} from "effect";
import type {
  ReleaseAbortContractError,
  ReleaseAbortIncompleteError,
} from "#publisher/abort";
import type { PublicationBatchLimitError } from "#publisher/batch/core";
import type {
  PreparedGitRelease,
  PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import type {
  ArtifactSigningError,
  ArtifactVerificationError,
  ProjectionVerificationError,
  RecoveryPreparationError,
  ReleaseItemVerificationError,
  RendererManifestValidationError,
  RouteVerificationError,
  SignedReleaseVerificationError,
} from "#publisher/publication/failure";
import type {
  PublicationReceiptMismatchError,
  ReleaseArtifactMismatchError,
  ReleaseRendererManifestMismatchError,
  ReleaseVerificationMismatchError,
} from "#publisher/release-validation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import type { ContentSigningError } from "#publisher/signing-errors";
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

/** The deployed renderer no longer satisfies the signed activation contract. */
export class PublicationActivationError extends Schema.TaggedError<PublicationActivationError>()(
  "PublicationActivationError",
  { releaseId: ReleaseIdSchema }
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

/** Revalidates the live Nakafa renderer immediately before atomic activation. */
export class PublicationActivation extends Context.Tag(
  "AksaraPublicationActivation"
)<
  PublicationActivation,
  {
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

/** Every expected failure surfaced by one idempotent publication attempt. */
export type PublishContentReleaseError<E> =
  | E
  | ReleaseItemVerificationError<E, never>
  | ProjectionVerificationError<E, never>
  | RouteVerificationError<E, never>
  | RendererManifestValidationError
  | ArtifactVerificationError
  | SignedReleaseVerificationError
  | ArtifactSigningError
  | CompileContentError
  | ContractDecodeError
  | ContentSigningError
  | ReleaseAbortContractError
  | ReleaseAbortIncompleteError
  | PublicationBatchLimitError
  | PublicationActivationError
  | PublicationReceiptMismatchError
  | PublicationRecoveryIdentityError
  | PublicationModeMismatchError
  | PublicationReleaseAbortedError
  | PublicationResumePhaseError
  | PublicationSourceError
  | PublicationStatusMismatchError
  | PublicationTargetFailure
  | RecoveryPreparationError
  | ReplaySpoolError
  | ReleaseArtifactMismatchError
  | ReleaseRendererManifestMismatchError
  | ReleaseVerificationMismatchError;

type PublishReleaseRequirements<R> =
  | FileSystem.FileSystem
  | Path.Path
  | PublicationSigningKey
  | PublicationRecoveryId
  | PublicationActivation
  | PublicationTarget
  | Effect.Effect.Context<ReturnType<typeof verifySignedContentArtifact>>
  | Effect.Effect.Context<ReturnType<typeof verifySignedContentRelease>>
  | R;

/** Exact-Git publication requires the reviewed source adapter it recompiles. */
export type PublishGitRelease = <E, R>(
  input: PreparedGitRelease<E, R>
) => Effect.Effect<
  PublicationReceipt,
  PublishContentReleaseError<E>,
  PublicationSource | PublishReleaseRequirements<R>
>;

/** Rollback publication reuses authenticated artifacts without a Git source. */
export type PublishRollbackRelease = <E, R>(
  input: PreparedRollbackRelease<E, R>
) => Effect.Effect<
  PublicationReceipt,
  PublishContentReleaseError<E>,
  PublishReleaseRequirements<R>
>;
