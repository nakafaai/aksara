import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Cause, Effect, Exit } from "effect";
import {
  discardFailedCandidate,
  discardOnFailure,
} from "#publisher/publication/discard";
import {
  PublicationActivationError,
  PublicationRecoveryIdentityError,
} from "#publisher/publication/spec";
import { makeTarget } from "#test/lifecycle/spec";
import { rendererManifest } from "#test/publication";
import { makeRollbackRelease, makeSignedBundle } from "#test/publication/run";

/** Stages one candidate and retained inverse in an observable target. */
const makeStaged = Effect.fn("PublicationDiscardTest.makeStaged")(function* (
  name: string
) {
  const candidate = yield* Effect.promise(() =>
    makeSignedBundle(`${name}-candidate`)
  );
  const recovery = yield* Effect.promise(() =>
    makeRollbackRelease(`${name}-recovery`)
  );
  const state = makeTarget(candidate.release);
  yield* state.target.stageRelease(candidate);
  yield* state.target.stageRecovery({
    release: recovery.release,
    rendererManifest,
  });
  return { candidate, recovery, state };
});

describe("publication discard", () => {
  it.effect("aborts the retained inverse before its failed candidate", () =>
    Effect.gen(function* () {
      const { candidate, recovery, state } =
        yield* makeStaged("test-discard-order");

      yield* discardFailedCandidate(
        state.target,
        candidate.release.manifest.releaseId,
        recovery.release.manifest.releaseId
      );
      expect(state.abortOrder).toEqual([
        recovery.release.manifest.releaseId,
        candidate.release.manifest.releaseId,
      ]);
    })
  );

  it.effect("rejects a retained inverse owned by another publication", () =>
    Effect.gen(function* () {
      const { candidate, state } = yield* makeStaged("test-discard-conflict");
      const recoveryId = ReleaseIdSchema.make("expected-recovery");

      const error = yield* discardFailedCandidate(
        state.target,
        candidate.release.manifest.releaseId,
        recoveryId
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PublicationRecoveryIdentityError",
        recoveryId,
      });
      expect(state.abortOrder).toEqual([]);
    })
  );

  it.effect("leaves an already-empty target unchanged", () =>
    Effect.gen(function* () {
      const candidate = yield* Effect.promise(() =>
        makeSignedBundle("test-discard-empty")
      );
      const state = makeTarget(candidate.release);

      yield* discardFailedCandidate(
        state.target,
        candidate.release.manifest.releaseId,
        ReleaseIdSchema.make("test-discard-empty-recovery")
      );
      expect(state.abortOrder).toEqual([]);
    })
  );

  it.effect("preserves the publication cause and appends a discard cause", () =>
    Effect.gen(function* () {
      const releaseId = ReleaseIdSchema.make("test-discard-cause");
      const publication = new PublicationActivationError({
        phase: "preflight",
        releaseId,
      });
      const discard = new PublicationRecoveryIdentityError({
        conflictingReleaseId: releaseId,
        recoveryId: ReleaseIdSchema.make("test-discard-cause-recovery"),
        releaseId,
      });
      const exit = yield* Effect.exit(
        discardOnFailure(Effect.fail(publication), () => Effect.fail(discard))
      );

      expect(Exit.isFailure(exit)).toBe(true);
      if (Exit.isFailure(exit)) {
        expect(
          exit.cause.reasons
            .filter(Cause.isFailReason)
            .map(({ error }) => error._tag)
        ).toEqual([
          "PublicationActivationError",
          "PublicationRecoveryIdentityError",
        ]);
      }
    })
  );

  it.effect("keeps the original failure when discard succeeds", () =>
    Effect.gen(function* () {
      const failure = new PublicationActivationError({
        phase: "preflight",
        releaseId: ReleaseIdSchema.make("test-discard-original"),
      });
      const discard = vi.fn(() => Effect.void);

      const error = yield* discardOnFailure(Effect.fail(failure), discard).pipe(
        Effect.flip
      );
      expect(error).toEqual(failure);
      expect(discard).toHaveBeenCalledOnce();
    })
  );
});
