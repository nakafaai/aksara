import type {
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import { RollbackContentReleaseBundleSchema } from "@nakafa/aksara-contracts/release/lifecycle";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";
import type { PublicationPlan } from "#publisher/publication/plan";
import type { PublishContentReleaseError } from "#publisher/publication/program";
import {
  PublicationActivation,
  PublicationModeMismatchError,
  PublicationReleaseAbortedError,
  PublicationResumePhaseError,
  PublicationStatusMismatchError,
} from "#publisher/publication/spec";
import {
  validatePublicationReceipt,
  validateVerificationEvidence,
} from "#publisher/release-validation";

/** Candidate staging either found a terminal receipt or reached verification. */
export type CandidateStageResult =
  | { readonly kind: "completed"; readonly receipt: PublicationReceipt }
  | { readonly kind: "verified" };

type StageCandidateRelease = <E, R>(
  plan: PublicationPlan<E, R>
) => Effect.Effect<
  CandidateStageResult,
  PublishContentReleaseError<E>,
  ContentVerificationKeyResolver | R
>;

type StageRecoveryRelease = <E, R>(
  plan: PublicationPlan<E, R>
) => Effect.Effect<
  void,
  PublishContentReleaseError<E>,
  ContentVerificationKeyResolver | R
>;

type ActivateCandidateRelease = <E, R>(
  plan: PublicationPlan<E, R>
) => Effect.Effect<
  PublicationReceipt,
  PublishContentReleaseError<E>,
  ContentVerificationKeyResolver | PublicationActivation | R
>;

type VerifyCandidateActivation = <E, R>(
  plan: PublicationPlan<E, R>
) => Effect.Effect<void, PublishContentReleaseError<E>, PublicationActivation>;

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

/** Rejects phases that cannot safely continue invisible release staging. */
function validateStagingPhase(status: ContentReleaseStatus) {
  if (status.phase === "aborting") {
    return Effect.fail(
      new PublicationResumePhaseError({
        phase: status.phase,
        releaseId: status.releaseId,
      })
    );
  }
  if (status.phase === "aborted") {
    return Effect.fail(
      new PublicationReleaseAbortedError({
        manifestHash: status.manifestHash,
        releaseId: status.releaseId,
      })
    );
  }
  return Effect.void;
}

/** Narrows the internally prepared inverse before its recovery-only target call. */
function selectRecoveryBundle<E, R>(plan: PublicationPlan<E, R>) {
  if (Schema.is(RollbackContentReleaseBundleSchema)(plan.bundle)) {
    return Effect.succeed(plan.bundle);
  }
  return Effect.fail(
    new PublicationModeMismatchError({
      manifestMode: plan.bundle.release.manifest.origin.kind,
      preparedMode: "rollback",
      releaseId: plan.bundle.release.manifest.releaseId,
    })
  );
}

/** Replays missing rows and verifies one already-persisted release plan. */
const stageAndVerify = Effect.fn("AksaraPublisher.stageAndVerify")(function* <
  E,
  R,
>(plan: PublicationPlan<E, R>, status: ContentReleaseStatus) {
  const { release } = plan.bundle;
  yield* validatePublicationStatus(release, status);
  yield* validateStagingPhase(status);
  if (status.phase === "completed") {
    return { kind: "completed", receipt: status.receipt } as const;
  }
  if (status.phase === "missing" || status.phase === "staging") {
    yield* plan.stage;
  }
  if (status.phase !== "verified") {
    const verification = yield* plan.target.verify(release);
    yield* validateVerificationEvidence(
      release,
      plan.summary,
      plan.projectionSummary,
      plan.routeSummary,
      verification
    );
  }
  return { kind: "verified" } as const;
});

/** Stages and verifies one normal candidate without changing visibility. */
export const stageCandidateRelease: StageCandidateRelease = Effect.fn(
  "AksaraPublisher.stageCandidateRelease"
)(function* <E, R>(plan: PublicationPlan<E, R>) {
  yield* plan.target.stageRelease(plan.bundle);
  const status = yield* plan.target.status({
    manifestHash: plan.bundle.release.manifestHash,
    releaseId: plan.bundle.release.manifest.releaseId,
  });
  const result = yield* stageAndVerify(plan, status);
  if (result.kind === "verified") {
    return result;
  }
  const receipt = yield* validatePublicationReceipt(
    plan.bundle.release,
    plan.summary,
    plan.projectionSummary,
    plan.routeSummary,
    result.receipt
  );
  return { kind: "completed", receipt } as const;
});

/** Stages and verifies the signed inverse required before candidate activation. */
export const stageRecoveryRelease: StageRecoveryRelease = Effect.fn(
  "AksaraPublisher.stageRecoveryRelease"
)(function* <E, R>(plan: PublicationPlan<E, R>) {
  const bundle = yield* selectRecoveryBundle(plan);
  yield* plan.target.stageRecovery(bundle);
  const status = yield* plan.target.status({
    manifestHash: plan.bundle.release.manifestHash,
    releaseId: plan.bundle.release.manifest.releaseId,
  });
  const result = yield* stageAndVerify(plan, status);
  if (result.kind === "completed") {
    return yield* new PublicationResumePhaseError({
      phase: result.kind,
      releaseId: plan.bundle.release.manifest.releaseId,
    });
  }
});

/** Refetches and validates deployed renderer evidence before activation. */
export const verifyCandidateActivation: VerifyCandidateActivation = Effect.fn(
  "AksaraPublisher.verifyCandidateActivation"
)(function* <E, R>(plan: PublicationPlan<E, R>) {
  const activation = yield* PublicationActivation;
  yield* activation.verify(plan.bundle.release);
});

/** Atomically activates one candidate whose inverse is already verified. */
export const activateCandidateRelease: ActivateCandidateRelease = Effect.fn(
  "AksaraPublisher.activateCandidateRelease"
)(function* <E, R>(plan: PublicationPlan<E, R>) {
  const receipt = yield* plan.target.activate(plan.bundle.release);
  const verified = yield* validatePublicationReceipt(
    plan.bundle.release,
    plan.summary,
    plan.projectionSummary,
    plan.routeSummary,
    receipt
  );
  const activation = yield* PublicationActivation;
  yield* activation.invalidate({
    cacheChanges: plan.cacheChanges,
    release: plan.bundle.release,
  });
  return verified;
});
