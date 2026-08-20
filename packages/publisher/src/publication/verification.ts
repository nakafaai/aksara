import type {
  PublicationReceipt,
  ReleaseVerificationEvidence,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Duration, Effect, Schedule } from "effect";
import type { PublicationPlan } from "#publisher/publication/plan";
import type { PublishContentReleaseError } from "#publisher/publication/program";
import {
  PublicationReleaseAbortedError,
  PublicationResumePhaseError,
  PublicationStatusMismatchError,
  PublicationVerificationTimeoutError,
} from "#publisher/publication/spec";
import {
  validatePublicationReceipt,
  validateVerificationEvidence,
} from "#publisher/release-validation";
import type { PublicationTargetFailure } from "#publisher/target/errors";

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

type StageAndVerify = <E, R>(
  plan: PublicationPlan<E, R>,
  status: ContentReleaseStatus
) => Effect.Effect<
  CandidateStageResult,
  PublishContentReleaseError<E>,
  ContentVerificationKeyResolver | R
>;

const VERIFICATION_POLL_DELAY = Duration.seconds(1);
const VERIFICATION_TIMEOUT_SECONDS = 10 * 60;
const VERIFICATION_TIMEOUT = Duration.seconds(VERIFICATION_TIMEOUT_SECONDS);

/** Polls one bounded target request after each pending verification response. */
function pollVerification<E, R>(
  plan: PublicationPlan<E, R>
): Effect.Effect<ReleaseVerificationEvidence, PublicationTargetFailure> {
  const request = plan.target.verify(plan.bundle.release).pipe(
    Effect.retry({
      schedule: Schedule.spaced(VERIFICATION_POLL_DELAY),
      while: (error) => error._tag === "PublicationTargetTransportError",
    })
  );
  return request.pipe(
    Effect.flatMap((verification) => {
      if (verification.phase === "verified") {
        return Effect.succeed(verification.evidence);
      }
      return Effect.sleep(VERIFICATION_POLL_DELAY).pipe(
        Effect.andThen(Effect.suspend(() => pollVerification(plan)))
      );
    })
  );
}

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

/** Polls bounded verification calls until the target exposes final evidence. */
const awaitVerification = Effect.fn("AksaraPublisher.awaitVerification")(
  function* <E, R>(plan: PublicationPlan<E, R>) {
    const { release } = plan.bundle;
    return yield* pollVerification(plan).pipe(
      Effect.timeoutOrElse({
        duration: VERIFICATION_TIMEOUT,
        orElse: () =>
          Effect.fail(
            new PublicationVerificationTimeoutError({
              releaseId: release.manifest.releaseId,
              timeoutSeconds: VERIFICATION_TIMEOUT_SECONDS,
            })
          ),
      })
    );
  }
);

/** Replays missing rows and verifies one already-persisted release plan. */
export const stageAndVerify: StageAndVerify = Effect.fn(
  "AksaraPublisher.stageAndVerify"
)(function* <E, R>(plan: PublicationPlan<E, R>, status: ContentReleaseStatus) {
  const { release } = plan.bundle;
  yield* validatePublicationStatus(release, status);
  yield* validateStagingPhase(status);
  if (status.phase === "completed") {
    return { kind: "completed", receipt: status.receipt };
  }
  if (status.phase === "missing" || status.phase === "staging") {
    yield* plan.stage;
  }
  const verification = yield* awaitVerification(plan);
  yield* validateVerificationEvidence(
    release,
    plan.summary,
    plan.projectionSummary,
    plan.routeSummary,
    plan.snapshotSummary,
    verification
  );
  return { kind: "verified" };
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
    plan.snapshotSummary,
    result.receipt
  );
  return { kind: "completed", receipt };
});
