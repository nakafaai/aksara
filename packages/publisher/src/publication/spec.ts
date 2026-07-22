import type { CompileContentError } from "@nakafaai/aksara-compiler/compile";
import type { verifySignedContentArtifact } from "@nakafaai/aksara-contracts/artifact/verify";
import type { ContractDecodeError } from "@nakafaai/aksara-contracts/errors";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import type { verifyContentProjections } from "@nakafaai/aksara-contracts/projection/verify";
import type {
  ContentReleaseItem,
  PublicationReceipt,
  ReleaseVerificationEvidence,
  SignedContentRelease,
} from "@nakafaai/aksara-contracts/release";
import type { verifyContentReleaseItems } from "@nakafaai/aksara-contracts/release/items";
import type {
  ContentReleaseStatus,
  ContentReleaseStatusRequest,
  ReleaseCleanupReceipt,
  ReleaseCleanupRequest,
} from "@nakafaai/aksara-contracts/release/lifecycle";
import type { RollbackPageRequest } from "@nakafaai/aksara-contracts/release/rollback";
import type { verifySignedContentRelease } from "@nakafaai/aksara-contracts/release/verify";
import type { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import {
  Context,
  type Effect,
  type Redacted,
  Schema,
  type Stream,
} from "effect";
import type { PublicationBatchLimitError } from "#publisher/batch/core";
import type { ArtifactBatch, ReleaseItemBatch } from "#publisher/batching";
import type { PreparedContentRelease } from "#publisher/preparation/spec";
import type { ProjectionBatch } from "#publisher/projection-batch";
import type {
  PublicationReceiptMismatchError,
  ReleaseArtifactMismatchError,
  ReleaseRendererManifestMismatchError,
  ReleaseVerificationMismatchError,
} from "#publisher/release-validation";
import type { PublicationSigner } from "#publisher/signing";
import type {
  ContentSigningError,
  SignedArtifactByteLimitError,
} from "#publisher/signing-errors";
import type { PublicationTargetFailure } from "#publisher/target-errors";

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
      batch: ArtifactBatch
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one ordered release-item batch idempotently. */
    readonly stageItemBatch: (
      batch: ReleaseItemBatch
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages one canonical material projection batch idempotently. */
    readonly stageProjectionBatch: (
      batch: ProjectionBatch
    ) => Effect.Effect<void, PublicationTargetFailure>;
    /** Stages the signed release envelope idempotently. */
    readonly stageRelease: (
      release: SignedContentRelease
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
  | PublicationSourceError
  | PublicationStatusMismatchError
  | PublicationTargetFailure
  | ReleaseArtifactMismatchError
  | ReleaseRendererManifestMismatchError
  | ReleaseVerificationMismatchError
  | SignedArtifactByteLimitError;

type PublishContentReleaseRequirements<R> =
  | PublicationSigningKey
  | PublicationSource
  | PublicationTarget
  | Effect.Effect.Context<ReturnType<typeof verifySignedContentArtifact>>
  | Effect.Effect.Context<ReturnType<typeof verifySignedContentRelease>>
  | R;

/** Complete Effect interface for one resumable publication attempt. */
export type PublishContentRelease = <E, R>(
  input: PreparedContentRelease<E, R>
) => Effect.Effect<
  PublicationReceipt,
  PublishContentReleaseError<E>,
  PublishContentReleaseRequirements<R>
>;
