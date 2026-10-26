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
  PublicationBootstrapError,
  PublicationRecoveryIdentityError,
  PublicationRetention,
  type PublicationRetentionDecision,
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

/**
 * Accepts a bootstrap only as a full replacement of its exact declared base.
 * Every head of that base must be superseded, because no inverse can restore it.
 */
function validateBootstrap(
  manifest: ContentReleaseManifest,
  baseReleaseId: ReleaseId
): Effect.Effect<void, PublicationBootstrapError> {
  if (manifest.baseReleaseId !== baseReleaseId) {
    return Effect.fail(
      new PublicationBootstrapError({
        baseReleaseId,
        manifestBaseReleaseId: manifest.baseReleaseId,
        reason: "base",
        releaseId: manifest.releaseId,
      })
    );
  }
  if (manifest.resultCount !== manifest.upsertCount) {
    return Effect.fail(
      new PublicationBootstrapError({
        baseReleaseId,
        manifestBaseReleaseId: manifest.baseReleaseId,
        reason: "replacement",
        releaseId: manifest.releaseId,
      })
    );
  }
  return Effect.void;
}

/** Validates the retention decision against the manifest before any target write. */
function validateRetention(
  manifest: ContentReleaseManifest,
  retention: PublicationRetentionDecision
): Effect.Effect<
  void,
  PublicationRecoveryIdentityError | PublicationBootstrapError
> {
  if (retention.kind === "inverse") {
    return validateRecoveryIdentity(manifest, retention.recoveryId);
  }
  return validateBootstrap(manifest, retention.baseReleaseId);
}

/**
 * Stages a candidate and, unless it bootstraps over a retired base, its signed
 * inverse before one atomic activation.
 */
const publishReleaseScoped = Effect.fn("AksaraPublisher.publishReleaseScoped")(
  function* <E, R>(invocation: PublicationInvocation<E, R>) {
    const retention = yield* PublicationRetention;
    yield* validateRetention(invocation.input.manifest, retention);
    const candidate = yield* preparePublicationPlan(invocation);
    /** Removes only this attempt's candidate and, for an inverse, its retained inverse. */
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

    if (retention.kind === "inverse") {
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
    }
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
