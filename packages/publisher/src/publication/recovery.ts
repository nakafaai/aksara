import { RollbackContentReleaseBundleSchema } from "@nakafa/aksara-contracts/release/lifecycle";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";
import type { PublicationPlan } from "#publisher/publication/plan";
import type { PublishContentReleaseError } from "#publisher/publication/program";
import {
  PublicationModeMismatchError,
  PublicationResumePhaseError,
} from "#publisher/publication/spec";
import { stageAndVerify } from "#publisher/publication/verification";

type StageRecoveryRelease = <E, R>(
  plan: PublicationPlan<E, R>
) => Effect.Effect<
  void,
  PublishContentReleaseError<E>,
  ContentVerificationKeyResolver | R
>;

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
