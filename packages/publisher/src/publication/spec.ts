import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type {
  ContentReleaseItem,
  PublicationReceipt,
  ReleaseVerificationEvidence,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type {
  HeadPage,
  HeadPageRequest,
} from "@nakafa/aksara-contracts/release/head";
import type { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type {
  ContentReleaseBundle,
  ContentReleaseCurrent,
  ContentReleaseStatus,
  ContentReleaseStatusRequest,
  ReleaseAbortReceipt,
  ReleaseAbortRequest,
  ReleaseCleanupReceipt,
  ReleaseCleanupRequest,
} from "@nakafa/aksara-contracts/release/lifecycle";
import type { RollbackPageRequest } from "@nakafa/aksara-contracts/release/rollback";
import type { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type {
  StageArtifactBatchInput,
  StageItemBatchInput,
  StageProjectionBatchInput,
} from "@nakafa/aksara-contracts/transport/request";
import {
  Context,
  type Effect,
  type Redacted,
  Schema,
  type Stream,
} from "effect";
import type { PublicationBatchLimitError } from "#publisher/batch/core";
import type {
  PreparedGitRelease,
  PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import type {
  PublicationReceiptMismatchError,
  ReleaseArtifactMismatchError,
  ReleaseRendererManifestMismatchError,
  ReleaseVerificationMismatchError,
} from "#publisher/release-validation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import type { PublicationSigner } from "#publisher/signing";
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
      "aborting"
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
    /** Advances one bounded server-owned abort page idempotently. */
    readonly abort: (
      request: ReleaseAbortRequest
    ) => Effect.Effect<ReleaseAbortReceipt, PublicationTargetFailure>;
    /** Reads authoritative active and pending publication identities. */
    readonly current: () => Effect.Effect<
      ContentReleaseCurrent,
      PublicationTargetFailure
    >;
    /** Reads one authoritative material-head page for an active release. */
    readonly headPage: (
      request: HeadPageRequest
    ) => Effect.Effect<HeadPage, PublicationTargetFailure>;
    /** Atomically activates a fully verified release. */
    readonly activate: (
      release: SignedContentRelease
    ) => Effect.Effect<PublicationReceipt, PublicationTargetFailure>;
    /** Deletes one bounded page of unreachable staged rows. */
    readonly cleanup: (
      request: ReleaseCleanupRequest
    ) => Effect.Effect<ReleaseCleanupReceipt, PublicationTargetFailure>;
    /** Finalizes live head slots and returns the durable release receipt. */
    readonly finalize: (
      release: SignedContentRelease
    ) => Effect.Effect<PublicationReceipt, PublicationTargetFailure>;
    /** Reads one bounded exact prior-state page for forward rollback. */
    readonly rollbackPage: (
      request: RollbackPageRequest
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

type ReleaseItemVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentReleaseItems<E, R>>
>;

type ProjectionVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentProjections<E, R>>
>;

type RendererManifestValidationError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

type ArtifactVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentArtifact>
>;

type SignedReleaseVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentRelease>
>;

type ArtifactSigningError = Effect.Effect.Error<
  ReturnType<PublicationSigner["signArtifact"]>
>;

/** Every expected failure surfaced by one resumable publication attempt. */
export type PublishContentReleaseError<E> =
  | E
  | ReleaseItemVerificationError<E, never>
  | ProjectionVerificationError<E, never>
  | RendererManifestValidationError
  | ArtifactVerificationError
  | SignedReleaseVerificationError
  | ArtifactSigningError
  | CompileContentError
  | ContractDecodeError
  | ContentSigningError
  | PublicationBatchLimitError
  | PublicationReceiptMismatchError
  | PublicationModeMismatchError
  | PublicationReleaseAbortedError
  | PublicationResumePhaseError
  | PublicationSourceError
  | PublicationStatusMismatchError
  | PublicationTargetFailure
  | ReplaySpoolError
  | ReleaseArtifactMismatchError
  | ReleaseRendererManifestMismatchError
  | ReleaseVerificationMismatchError;

type PublishReleaseRequirements<R> =
  | FileSystem.FileSystem
  | Path.Path
  | PublicationSigningKey
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
