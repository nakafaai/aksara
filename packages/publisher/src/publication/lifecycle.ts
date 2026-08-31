import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import type { PublicationPlan } from "#publisher/publication/plan";
import type { PublishContentReleaseError } from "#publisher/publication/program";
import { PublicationActivation } from "#publisher/publication/spec";
import { validatePublicationReceipt } from "#publisher/release-validation";

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

/** Refetches and validates deployed renderer evidence before activation. */
export const verifyCandidateActivation: VerifyCandidateActivation = Effect.fn(
  "AksaraPublisher.verifyCandidateActivation"
)(function* <E, R>(plan: PublicationPlan<E, R>) {
  const activation = yield* PublicationActivation;
  yield* activation.verify(plan.bundle, plan.rendererPreflight);
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
    plan.snapshotSummary,
    receipt
  );
  const activation = yield* PublicationActivation;
  yield* activation.invalidate({
    cacheChanges: plan.cacheChanges,
    release: plan.bundle.release,
  });
  return verified;
});
