import { beforeEach, describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { productionCalls, productionProgram } from "#test/production/harness";
import { FUNCTION_SCOPE } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
  receiptFor,
  recoveryBundle,
  releaseId,
} from "#test/target";

const calls = productionCalls();
beforeEach(() => {
  calls.reset();
  const active = gitBundle("release-active");
  calls.current = currentState({
    active: completedBundle(active),
    candidate: null,
    recovery: null,
  });
});
describe("production command", () => {
  it.effect("resumes an active release without reading the signer secret", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-active");
      calls.derivedPublicKeyPem = "unavailable-production-signing-key";
      calls.current = currentState({
        active: completedBundle(active),
        candidate: null,
        recovery: recoveryBundle("recovery-active", active),
      });
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-active"),
        releaseId: releaseId("release-active"),
        scope: FUNCTION_SCOPE,
      });
      expect(receipt).toMatchObject({ releaseId: "release-active" });
      expect(calls).toMatchObject({
        catalogCalls: 0,
        cleanReads: 0,
        publishCalls: 0,
        rendererCalls: 0,
        resumeBundle: active,
        resumeCalls: 1,
        rootReads: 0,
        signingSecretReads: 0,
        sourceLayers: 0,
        targetServiceReads: 1,
      });
    })
  );

  it.effect("resumes a completed release after a lost response", () =>
    Effect.gen(function* () {
      const completed = gitBundle("release-completed");
      calls.current = currentState({
        active: completedBundle(completed),
        candidate: null,
        recovery: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-completed"),
        releaseId: releaseId("release-completed"),
        scope: FUNCTION_SCOPE,
      });
      expect(receipt).toEqual(receiptFor(completed.release.manifest));
      expect(calls).toMatchObject({
        catalogCalls: 0,
        cleanReads: 0,
        publishCalls: 0,
        rendererCalls: 0,
        resumeBundle: completed,
        resumeCalls: 1,
        signingSecretReads: 0,
        sourceLayers: 0,
      });
    })
  );

  it.effect(
    "rejects signing-key mismatch after selecting a signing action",
    () =>
      Effect.gen(function* () {
        calls.derivedPublicKeyPem = "different-derived-public-key";
        const error = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-rejected"),
          releaseId: releaseId("release-rejected"),
          scope: FUNCTION_SCOPE,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          failure: "SigningKeyMismatchError",
          stage: "keys",
        });
        expect(calls).toMatchObject({
          publishCalls: 0,
          rendererCalls: 0,
          signingSecretReads: 1,
          targetCalls: 1,
        });
      })
  );

  it.effect(
    "rejects a conflicting candidate release before any content read",
    () =>
      Effect.gen(function* () {
        const candidate = gitBundle("release-candidate");
        calls.current = currentState({
          active: null,
          candidate: { ...candidate, phase: "staging" },
          recovery: null,
        });
        const error = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-other"),
          releaseId: releaseId("release-other"),
          scope: FUNCTION_SCOPE,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          failure: "ProductionStateError",
          stage: "state",
        });
        expect(calls).toMatchObject({
          catalogCalls: 0,
          cleanReads: 0,
          publishCalls: 0,
          rendererCalls: 0,
          resumeCalls: 0,
          signingSecretReads: 0,
        });
      })
  );

  it.effect("rejects recovery from a different checkout revision", () =>
    Effect.gen(function* () {
      const candidate = gitBundle("release-candidate", {
        sha: GitCommitShaSchema.make("b".repeat(40)),
      });
      calls.current = currentState({
        active: null,
        candidate: { ...candidate, phase: "staging" },
        recovery: null,
      });
      const error = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
        scope: FUNCTION_SCOPE,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        failure: "RecoveryRevisionMismatchError",
        stage: "prepare",
      });
      expect(calls).toMatchObject({
        catalogCalls: 0,
        cleanReads: 1,
        publishCalls: 0,
        rendererCalls: 0,
        snapshotCalls: 0,
      });
    })
  );

  it.effect("rejects source changes observed after complete preparation", () =>
    Effect.gen(function* () {
      calls.finalSha = "b".repeat(40);

      const error = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-next"),
        releaseId: releaseId("release-next"),
        scope: FUNCTION_SCOPE,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        failure: "ReleaseRevisionChangedError",
        stage: "prepare",
      });
      expect(calls).toMatchObject({
        catalogCalls: 1,
        cleanReads: 2,
        publishCalls: 0,
        snapshotCalls: 0,
      });
    })
  );

  it.effect("rejects a rebuild that differs from signed candidate state", () =>
    Effect.gen(function* () {
      const candidate = gitBundle("release-candidate");
      calls.current = currentState({
        active: null,
        candidate: { ...candidate, phase: "verifying" },
        recovery: null,
      });
      calls.manifestMismatch = true;
      const error = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
        scope: FUNCTION_SCOPE,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        failure: "PreparedStoredReleaseMismatchError",
        stage: "prepare",
      });
      expect(calls).toMatchObject({
        catalogCalls: 1,
        publishCalls: 0,
        rendererCalls: 0,
        snapshotCalls: 0,
        sourceLayers: 0,
      });
    })
  );
});
