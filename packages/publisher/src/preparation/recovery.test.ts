import { describe, expect, it } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import {
  reuseStoredGitRelease,
  reuseStoredRollbackRelease,
} from "#publisher/preparation/recovery";
import { makeTarget } from "#test/lifecycle/spec";
import { makeRelease } from "#test/publication";
import {
  makeRollbackRelease,
  makeSignedBundle,
  publishPrepared,
  testVerificationResolver,
} from "#test/publication/run";

/** Runs one stored-envelope recovery through the original verification key. */
const recover = Effect.fn("PreparationRecoveryTest.recover")(
  <A, E>(program: Effect.Effect<A, E, ContentVerificationKeyResolver>) =>
    program.pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        testVerificationResolver
      )
    )
);

describe("stored release recovery", () => {
  it.effect(
    "reuses the exact signed Git envelope after current-key rotation",
    () =>
      Effect.gen(function* () {
        const rebuilt = yield* Effect.tryPromise(() =>
          makeRelease("test-stored-git")
        );
        const stored = yield* Effect.tryPromise(() =>
          makeSignedBundle("test-stored-git")
        );
        const prepared = yield* recover(
          reuseStoredGitRelease({
            prepared: rebuilt.prepared,
            storedRelease: stored.release,
          })
        );
        const state = makeTarget(prepared);

        yield* publishPrepared(
          prepared,
          state.target,
          undefined,
          "rotated-current-key"
        );

        expect(prepared.storedRelease).toStrictEqual(stored.release);
        expect(state.stageRelease).toHaveBeenCalledWith({
          release: stored.release,
          rendererManifest: stored.rendererManifest,
        });
      })
  );

  it.effect("reuses the exact signed rollback envelope", () =>
    Effect.gen(function* () {
      const stored = yield* Effect.tryPromise(() =>
        makeRollbackRelease("test-stored-rollback")
      );
      const prepared = yield* recover(
        reuseStoredRollbackRelease({
          prepared: stored.prepared,
          storedRelease: stored.release,
        })
      );

      expect(prepared.storedRelease).toStrictEqual(stored.release);
      expect(prepared.kind).toBe("rollback");
    })
  );

  it.effect(
    "rejects an authenticated envelope for another rebuilt manifest",
    () =>
      Effect.gen(function* () {
        const rebuilt = yield* Effect.tryPromise(() =>
          makeRelease("test-rebuilt-release")
        );
        const stored = yield* Effect.tryPromise(() =>
          makeSignedBundle("test-stored-release")
        );
        const error = yield* recover(
          reuseStoredGitRelease({
            prepared: rebuilt.prepared,
            storedRelease: stored.release,
          }).pipe(Effect.flip)
        );

        expect(error).toMatchObject({
          _tag: "PreparedStoredReleaseMismatchError",
          expectedHash: stored.release.manifestHash,
          releaseId: stored.release.manifest.releaseId,
        });
      })
  );
});
