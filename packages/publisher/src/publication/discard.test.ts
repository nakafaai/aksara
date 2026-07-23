import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Cause, Effect, Exit } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  discardFailedCandidate,
  discardOnFailure,
} from "#publisher/publication/discard";
import {
  PublicationActivationError,
  PublicationRecoveryIdentityError,
} from "#publisher/publication/spec";
import { makeTarget } from "#test/lifecycle";
import {
  makeRollbackRelease,
  makeSignedBundle,
  rendererManifest,
} from "#test/publication";

/** Stages one candidate and retained inverse in an observable target. */
async function makeStaged(name: string) {
  const candidate = await makeSignedBundle(`${name}-candidate`);
  const recovery = await makeRollbackRelease(`${name}-recovery`);
  const state = makeTarget(candidate.release);
  await Effect.runPromise(state.target.stageRelease(candidate));
  await Effect.runPromise(
    state.target.stageRecovery({
      release: recovery.release,
      rendererManifest,
    })
  );
  return { candidate, recovery, state };
}

describe("publication discard", () => {
  it("aborts the retained inverse before its failed candidate", async () => {
    const { candidate, recovery, state } =
      await makeStaged("test-discard-order");

    await expect(
      Effect.runPromise(
        discardFailedCandidate(
          state.target,
          candidate.release.manifest.releaseId,
          recovery.release.manifest.releaseId
        )
      )
    ).resolves.toBeUndefined();
    expect(state.abortOrder).toEqual([
      recovery.release.manifest.releaseId,
      candidate.release.manifest.releaseId,
    ]);
  });

  it("rejects a retained inverse owned by another publication", async () => {
    const { candidate, state } = await makeStaged("test-discard-conflict");
    const recoveryId = ReleaseIdSchema.make("expected-recovery");

    await expect(
      Effect.runPromise(
        discardFailedCandidate(
          state.target,
          candidate.release.manifest.releaseId,
          recoveryId
        ).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({
      _tag: "PublicationRecoveryIdentityError",
      recoveryId,
    });
    expect(state.abortOrder).toEqual([]);
  });

  it("leaves an already-empty target unchanged", async () => {
    const candidate = await makeSignedBundle("test-discard-empty");
    const state = makeTarget(candidate.release);

    await expect(
      Effect.runPromise(
        discardFailedCandidate(
          state.target,
          candidate.release.manifest.releaseId,
          ReleaseIdSchema.make("test-discard-empty-recovery")
        )
      )
    ).resolves.toBeUndefined();
    expect(state.abortOrder).toEqual([]);
  });

  it("preserves the publication cause and appends a discard cause", async () => {
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
    const exit = await Effect.runPromiseExit(
      discardOnFailure(Effect.fail(publication), () => Effect.fail(discard))
    );

    expect(Exit.isFailure(exit)).toBe(true);
    if (Exit.isFailure(exit)) {
      expect(
        Array.from(Cause.failures(exit.cause)).map(({ _tag }) => _tag)
      ).toEqual([
        "PublicationActivationError",
        "PublicationRecoveryIdentityError",
      ]);
    }
  });

  it("keeps the original failure when discard succeeds", async () => {
    const failure = new PublicationActivationError({
      phase: "preflight",
      releaseId: ReleaseIdSchema.make("test-discard-original"),
    });
    const discard = vi.fn(() => Effect.void);

    await expect(
      Effect.runPromise(
        discardOnFailure(Effect.fail(failure), discard).pipe(Effect.flip)
      )
    ).resolves.toEqual(failure);
    expect(discard).toHaveBeenCalledOnce();
  });
});
