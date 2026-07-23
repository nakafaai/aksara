import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { Effect } from "effect";
import {
  discardFailedCandidate,
  discardOnFailure,
} from "#publisher/publication/discard";
import {
  activateCandidateRelease,
  stageCandidateRelease,
  stageRecoveryRelease,
  verifyCandidateActivation,
} from "#publisher/publication/lifecycle";
import {
  type PublicationInvocation,
  preparePublicationPlan,
} from "#publisher/publication/plan";
import type {
  PublishGitRelease,
  PublishRollbackRelease,
} from "#publisher/publication/program";
import {
  PublicationActivation,
  PublicationRecoveryId,
  PublicationRecoveryIdentityError,
  PublicationSource,
} from "#publisher/publication/spec";
import { prepareRollback } from "#publisher/rollback";

/** Rejects a retained inverse identity that aliases either protected release. */
function validateRecoveryIdentity(
  manifest: ContentReleaseManifest,
  recoveryId: ReleaseId
) {
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
    const recoveryId = yield* PublicationRecoveryId;
    yield* validateRecoveryIdentity(invocation.input.manifest, recoveryId);
    const candidate = yield* preparePublicationPlan(invocation);
    /** Removes only this attempt's inverse and candidate after a failure. */
    const discard = () =>
      discardFailedCandidate(
        candidate.target,
        candidate.bundle.release.manifest.releaseId,
        recoveryId
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
          releaseId: recoveryId,
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

/** Publishes one exact-Git candidate only after its inverse is verified. */
export const publishGitRelease: PublishGitRelease = Effect.fn(
  "AksaraPublisher.publishGitRelease"
)(function* (input) {
  const source = yield* PublicationSource;
  return yield* Effect.scoped(
    publishReleaseScoped({ input, kind: "git", source })
  );
});

/** Publishes one forward rollback only after its own inverse is verified. */
export const publishRollbackRelease: PublishRollbackRelease = Effect.fn(
  "AksaraPublisher.publishRollbackRelease"
)((input) => Effect.scoped(publishReleaseScoped({ input, kind: "rollback" })));
