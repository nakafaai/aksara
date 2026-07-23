import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { Cause, Effect } from "effect";
import { abortContentRelease } from "#publisher/abort";
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
import {
  PublicationRecoveryId,
  PublicationRecoveryIdentityError,
  PublicationSource,
  PublicationTarget,
  type PublishGitRelease,
  type PublishRollbackRelease,
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

/** Clears a failed invisible candidate without orphaning its retained inverse. */
const discardFailedCandidate = Effect.fn(
  "AksaraPublisher.discardFailedCandidate"
)(function* (
  target: typeof PublicationTarget.Service,
  candidateId: ReleaseId,
  recoveryId: ReleaseId
) {
  const current = yield* target.current();
  const retainedId = current.recovery?.release.manifest.releaseId ?? null;
  if (retainedId !== null && retainedId !== recoveryId) {
    return yield* new PublicationRecoveryIdentityError({
      conflictingReleaseId: retainedId,
      recoveryId,
      releaseId: candidateId,
    });
  }
  if (retainedId === recoveryId) {
    yield* abortContentRelease({ releaseId: recoveryId }).pipe(
      Effect.provideService(PublicationTarget, target)
    );
  }
  if (current.candidate?.release.manifest.releaseId === candidateId) {
    yield* abortContentRelease({ releaseId: candidateId }).pipe(
      Effect.provideService(PublicationTarget, target)
    );
  }
});

/** Preserves the publication cause while appending any cleanup failure cause. */
function discardOnFailure<A, E, R, E2, R2>(
  effect: Effect.Effect<A, E, R>,
  discard: () => Effect.Effect<unknown, E2, R2>
) {
  return effect.pipe(
    Effect.catchAllCause((publicationCause) =>
      discard().pipe(
        Effect.catchAllCause((cleanupCause) =>
          Effect.failCause(Cause.sequential(publicationCause, cleanupCause))
        ),
        Effect.flatMap(() => Effect.failCause(publicationCause))
      )
    )
  );
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
