import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import type { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type { Effect } from "effect";
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
  SnapshotVerificationError,
} from "#publisher/publication/failure";
import type {
  PublicationActivation,
  PublicationActivationError,
  PublicationModeMismatchError,
  PublicationRecoveryId,
  PublicationRecoveryIdentityError,
  PublicationReleaseAbortedError,
  PublicationResumePhaseError,
  PublicationSigningKey,
  PublicationSource,
  PublicationSourceError,
  PublicationStatusMismatchError,
  PublicationTarget,
} from "#publisher/publication/spec";
import type {
  PublicationReceiptMismatchError,
  ReleaseArtifactMismatchError,
  ReleaseRendererManifestMismatchError,
  ReleaseVerificationMismatchError,
} from "#publisher/release-validation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import type { ContentSigningError } from "#publisher/signing-errors";
import type { SnapshotBatchBindingError } from "#publisher/snapshot/batch";
import type { PublicationTargetFailure } from "#publisher/target/errors";

/** Every expected failure surfaced by one idempotent publication attempt. */
export type PublishContentReleaseError<E> =
  | E
  | ReleaseItemVerificationError<E, never>
  | ProjectionVerificationError<E, never>
  | RouteVerificationError<E, never>
  | SnapshotVerificationError<E, never>
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
  | SnapshotBatchBindingError
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
