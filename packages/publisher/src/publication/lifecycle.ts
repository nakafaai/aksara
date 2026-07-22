import type { VerifiedContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type {
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { VerifiedContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect } from "effect";
import {
  PublicationReleaseAbortedError,
  PublicationResumePhaseError,
  PublicationStatusMismatchError,
  type PublicationTarget,
} from "#publisher/publication/spec";
import {
  type PublicationReceiptMismatchError,
  type ReleaseVerificationMismatchError,
  validatePublicationReceipt,
  validateVerificationEvidence,
} from "#publisher/release-validation";
import type { PublicationTargetFailure } from "#publisher/target/errors";

/** Complete state needed to resume one exact signed publication lifecycle. */
interface PublicationLifecycleInput<E, R> {
  readonly projectionSummary: VerifiedContentProjections;
  readonly release: SignedContentRelease;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly stage: Effect.Effect<void, E, R>;
  readonly summary: VerifiedContentReleaseItems;
  readonly target: typeof PublicationTarget.Service;
}

/** Every expected failure while resuming one persisted release phase. */
type PublicationLifecycleError<E> =
  | E
  | PublicationReceiptMismatchError
  | PublicationReleaseAbortedError
  | PublicationResumePhaseError
  | PublicationStatusMismatchError
  | PublicationTargetFailure
  | ReleaseVerificationMismatchError;

/** Complete Effect interface for exact-manifest staging through finalization. */
type CompletePublicationLifecycle = <E, R>(
  input: PublicationLifecycleInput<E, R>
) => Effect.Effect<PublicationReceipt, PublicationLifecycleError<E>, R>;

/** Rejects a durable status that does not name the exact signed manifest. */
export function validatePublicationStatus(
  release: SignedContentRelease,
  status: ContentReleaseStatus
) {
  if (
    status.releaseId === release.manifest.releaseId &&
    status.manifestHash === release.manifestHash
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new PublicationStatusMismatchError({
      actualManifestHash: status.manifestHash,
      actualReleaseId: status.releaseId,
      expectedManifestHash: release.manifestHash,
      expectedReleaseId: release.manifest.releaseId,
    })
  );
}

/** Stages exact identity first, then resumes only its durable target phase. */
export const completePublicationLifecycle: CompletePublicationLifecycle =
  Effect.fn("AksaraPublisher.completePublicationLifecycle")(function* <E, R>(
    input: PublicationLifecycleInput<E, R>
  ) {
    const {
      projectionSummary,
      release,
      rendererManifest,
      stage,
      summary,
      target,
    } = input;
    const { manifest } = release;
    yield* target.stageRelease({ release, rendererManifest });
    const status = yield* target.status({
      manifestHash: release.manifestHash,
      releaseId: manifest.releaseId,
    });
    yield* validatePublicationStatus(release, status);

    if (status.phase === "aborting") {
      return yield* new PublicationResumePhaseError({
        phase: status.phase,
        releaseId: manifest.releaseId,
      });
    }
    if (status.phase === "aborted") {
      return yield* new PublicationReleaseAbortedError({
        manifestHash: release.manifestHash,
        releaseId: manifest.releaseId,
      });
    }
    if (status.phase === "completed") {
      return yield* validatePublicationReceipt(
        release,
        summary,
        projectionSummary,
        status.receipt
      );
    }
    if (status.phase === "active" || status.phase === "finalizing") {
      const receipt = yield* target.finalize(release);
      return yield* validatePublicationReceipt(
        release,
        summary,
        projectionSummary,
        receipt
      );
    }
    if (status.phase === "missing" || status.phase === "staging") {
      yield* stage;
    }
    if (status.phase !== "verified") {
      // Target-side recomputation binds every staged replay to signed digests.
      const verification = yield* target.verify(release);
      yield* validateVerificationEvidence(
        release,
        summary,
        projectionSummary,
        verification
      );
    }
    const activated = yield* target.activate(release);
    yield* validatePublicationReceipt(
      release,
      summary,
      projectionSummary,
      activated
    );
    const finalized = yield* target.finalize(release);
    return yield* validatePublicationReceipt(
      release,
      summary,
      projectionSummary,
      finalized
    );
  });
