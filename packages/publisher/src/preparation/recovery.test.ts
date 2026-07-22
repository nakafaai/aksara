import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  reuseStoredGitRelease,
  reuseStoredRollbackRelease,
} from "#publisher/preparation/recovery";
import { makeTarget } from "#test/lifecycle";
import {
  makeRelease,
  makeRollbackRelease,
  makeSignedBundle,
  publishPrepared,
  testVerificationResolver,
} from "#test/publication";

/** Runs one stored-envelope recovery through the original verification key. */
function recover<A, E>(
  program: Effect.Effect<A, E, ContentVerificationKeyResolver>
) {
  return Effect.runPromise(
    program.pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        testVerificationResolver
      )
    )
  );
}

describe("stored release recovery", () => {
  it("reuses the exact signed Git envelope after current-key rotation", async () => {
    const rebuilt = await makeRelease("test-stored-git");
    const stored = await makeSignedBundle("test-stored-git");
    const prepared = await recover(
      reuseStoredGitRelease({
        prepared: rebuilt.prepared,
        storedRelease: stored.release,
      })
    );
    const state = makeTarget(prepared);

    await Effect.runPromise(
      publishPrepared(prepared, state.target, undefined, "rotated-current-key")
    );

    expect(prepared.storedRelease).toStrictEqual(stored.release);
    expect(state.stageRelease).toHaveBeenCalledWith({
      release: stored.release,
      rendererManifest: stored.rendererManifest,
    });
  });

  it("reuses the exact signed rollback envelope", async () => {
    const stored = await makeRollbackRelease("test-stored-rollback");
    const prepared = await recover(
      reuseStoredRollbackRelease({
        prepared: stored.prepared,
        storedRelease: stored.release,
      })
    );

    expect(prepared.storedRelease).toStrictEqual(stored.release);
    expect(prepared.kind).toBe("rollback");
  });

  it("rejects an authenticated envelope for another rebuilt manifest", async () => {
    const rebuilt = await makeRelease("test-rebuilt-release");
    const stored = await makeSignedBundle("test-stored-release");
    const error = await recover(
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
  });
});
