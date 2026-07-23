import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { Cause, Effect } from "effect";
import { abortContentRelease } from "#publisher/abort";
import {
  PublicationRecoveryIdentityError,
  PublicationTarget,
} from "#publisher/publication/spec";

/** Clears only one failed candidate and its retained inverse. */
export const discardFailedCandidate = Effect.fn(
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

/** Preserves a publication cause while appending any discard failure cause. */
export function discardOnFailure<A, E, R, E2, R2>(
  effect: Effect.Effect<A, E, R>,
  discard: () => Effect.Effect<unknown, E2, R2>
) {
  return effect.pipe(
    Effect.catchAllCause((publicationCause) =>
      discard().pipe(
        Effect.catchAllCause((discardCause) =>
          Effect.failCause(Cause.sequential(publicationCause, discardCause))
        ),
        Effect.flatMap(() => Effect.failCause(publicationCause))
      )
    )
  );
}
