import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { Cause, Effect } from "effect";
import { abortContentRelease } from "#publisher/abort";
import {
  PublicationRecoveryIdentityError,
  type PublicationRetentionDecision,
  PublicationTarget,
} from "#publisher/publication/spec";

/**
 * Clears one failed candidate. An inverse decision also clears the retained
 * inverse this attempt staged; a bootstrap has none, so only the candidate goes.
 */
export const discardFailedCandidate = Effect.fn(
  "AksaraPublisher.discardFailedCandidate"
)(function* (
  target: typeof PublicationTarget.Service,
  candidateId: ReleaseId,
  retention: PublicationRetentionDecision
) {
  const current = yield* target.current;
  if (retention.kind === "inverse") {
    const retainedId = current.recovery?.release.manifest.releaseId ?? null;
    if (retainedId !== null && retainedId !== retention.recoveryId) {
      return yield* new PublicationRecoveryIdentityError({
        conflictingReleaseId: retainedId,
        recoveryId: retention.recoveryId,
        releaseId: candidateId,
      });
    }
    if (retainedId === retention.recoveryId) {
      yield* abortContentRelease({ releaseId: retention.recoveryId }).pipe(
        Effect.provideService(PublicationTarget, target)
      );
    }
  }
  if (current.candidate?.release.manifest.releaseId === candidateId) {
    yield* abortContentRelease({ releaseId: candidateId }).pipe(
      Effect.provideService(PublicationTarget, target)
    );
  }
});

/** Preserves a publication cause while appending any discard failure cause. */
export function discardOnFailure<A, E, R, E2, R2>(
  effect: Effect.Effect<A, E, R>,
  discard: () => Effect.Effect<unknown, E2, R2>
) {
  return effect.pipe(
    Effect.catchCause((publicationCause) =>
      discard().pipe(
        Effect.catchCause((discardCause) =>
          Effect.failCause(Cause.combine(publicationCause, discardCause))
        ),
        Effect.flatMap(() => Effect.failCause(publicationCause))
      )
    )
  );
}
