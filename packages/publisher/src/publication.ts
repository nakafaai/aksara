import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { Effect } from "effect";
import {
  discardFailedCandidate,
  discardOnFailure,
} from "#publisher/publication/discard";
import {
  activateCandidateRelease,
  verifyCandidateActivation,
} from "#publisher/publication/lifecycle";
import {
  type PublicationInvocation,
  preparePublicationPlan,
} from "#publisher/publication/plan";
import type { PublishGitRelease } from "#publisher/publication/program";
import { stageRecoveryRelease } from "#publisher/publication/recovery";
import {
  PublicationActivation,
  PublicationRecoveryIdentityError,
  PublicationRetention,
  PublicationSource,
} from "#publisher/publication/spec";
import { stageCandidateRelease } from "#publisher/publication/verification";
import { prepareRollback } from "#publisher/rollback";

/** Rejects a retained inverse identity that aliases either protected release. */
function validateRecoveryIdentity(
  manifest: ContentReleaseManifest,
  recoveryId: ReleaseId
): Effect.Effect<void, PublicationRecoveryIdentityError> {
  if (recoveryId === manifest.releaseId) {
    return Effect.fail(
      new PublicationRecoveryIdentityError({
        conflictingReleaseId: manifest.releaseId,
        recoveryId,
        releaseId: manifest.releaseId,
      })
    );
  }
  if (manifest.baseReleaseId === recoveryId) {
    return Effect.fail(
      new PublicationRecoveryIdentityError({
        conflictingReleaseId: recoveryId,
        recoveryId,
        releaseId: manifest.releaseId,
      })
    );
  }
  return Effect.void;
}

/** Stages a candidate and its signed inverse before one atomic activation. */
const publishReleaseScoped = Effect.fn("AksaraPublisher.publishReleaseScoped")(
  function* <E, R>(invocation: PublicationInvocation<E, R>) {
    const retention = yield* PublicationRetention;
    yield* validateRecoveryIdentity(
      invocation.input.manifest,
      retention.recoveryId
    );
    const candidate = yield* preparePublicationPlan(invocation);
    /** Removes only this attempt's candidate and its retained inverse. */
    const discard = () =>
      discardFailedCandidate(
        candidate.target,
        candidate.bundle.release.manifest.releaseId,
        retention
      );
    const candidateStage = yield* discardOnFailure(
      stageCandidateRelease(candidate),
      discard
    );
    if (candidateStage.kind === "completed") {
      const activation = yield* PublicationActivation;
      yield* activation.invalidate({
        cacheChanges: candidate.cacheChanges,
        release: candidate.bundle.release,
      });
      return candidateStage.receipt;
    }

    yield* discardOnFailure(
      Effect.gen(function* () {
        const recovery = yield* prepareRollback({
          proofBundle: candidate.bundle,
          releaseId: retention.recoveryId,
          rendererManifest: candidate.bundle.rendererManifest,
          rollbackOf: candidate.bundle.release.manifest.releaseId,
        });
        const plan = yield* preparePublicationPlan({
          input: recovery,
          kind: "rollback",
        });
        yield* stageRecoveryRelease(plan);
      }),
      discard
    );
    yield* discardOnFailure(verifyCandidateActivation(candidate), discard);
    return yield* activateCandidateRelease(candidate);
  }
);

/** Publishes one exact-Git candidate only after its retention decision is safe. */
export const publishGitRelease: PublishGitRelease = Effect.fn(
  "AksaraPublisher.publishGitRelease"
)(function* (input) {
  const source = yield* PublicationSource;
  return yield* Effect.scoped(
    publishReleaseScoped({ input, kind: "git", source })
  );
});
