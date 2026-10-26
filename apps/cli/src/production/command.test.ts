import { beforeEach, describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import {
  ACTIVE_PRODUCTION_STATE,
  productionCalls,
  productionProgram,
} from "#test/production/harness";
import { BOOTSTRAP_SCOPE, FUNCTION_SCOPE, LIVE_RENDERER } from "#test/real";
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
  calls.current = ACTIVE_PRODUCTION_STATE;
});

/** Runs one release that keeps the named inverse over the material scope. */
function runInverse(id: string, recovery: string) {
  return productionProgram({
    command: "release",
    releaseId: releaseId(id),
    retention: { kind: "inverse", recoveryId: releaseId(recovery) },
    scope: FUNCTION_SCOPE,
  });
}

/** Runs one bootstrap that replaces the active release within the given scope. */
function runBootstrap(scope: typeof BOOTSTRAP_SCOPE) {
  return productionProgram({
    command: "release",
    releaseId: releaseId("release-bootstrap"),
    retention: {
      baseReleaseId: releaseId("release-active"),
      kind: "bootstrap",
    },
    scope,
  });
}

describe("production command", () => {
  it.effect("resumes an active release without reading the signer secret", () =>
    Effect.gen(function* () {
      const active = yield* gitBundle("release-active");
      calls.derivedPublicKeyPem = "unavailable-production-signing-key";
      calls.current = currentState({
        active: yield* completedBundle(active),
        candidate: null,
        recovery: yield* recoveryBundle("recovery-active", active),
      });
      const receipt = yield* runInverse("release-active", "recovery-active");
      expect(receipt).toMatchObject({ releaseId: "release-active" });
      expect(calls).toMatchObject({
        catalogCalls: 0,
        cleanReads: 1,
        publishCalls: 0,
        rendererCalls: 0,
        resumeBundle: active,
        resumeCalls: 1,
        rootReads: 1,
        signingSecretReads: 0,
        sourceLayers: 0,
        targetServiceReads: 1,
      });
    })
  );

  it.effect("resumes a completed release after a lost response", () =>
    Effect.gen(function* () {
      const completed = yield* gitBundle("release-completed");
      calls.current = currentState({
        active: yield* completedBundle(completed),
        candidate: null,
        recovery: null,
      });
      const receipt = yield* runInverse(
        "release-completed",
        "recovery-completed"
      );
      const expectedReceipt = yield* receiptFor(completed.release.manifest);
      expect(receipt).toEqual(expectedReceipt);
      expect(calls).toMatchObject({
        catalogCalls: 0,
        cleanReads: 1,
        publishCalls: 0,
        rendererCalls: 0,
        resumeBundle: completed,
        resumeCalls: 1,
        signingSecretReads: 0,
        sourceLayers: 0,
      });
    })
  );

  it.effect("rejects an active receipt from another source revision", () =>
    Effect.gen(function* () {
      const active = yield* gitBundle("release-active", {
        sha: GitCommitShaSchema.make("b".repeat(40)),
      });
      calls.current = currentState({
        active: yield* completedBundle(active),
        candidate: null,
        recovery: null,
      });
      const error = yield* runInverse("release-active", "recovery-active").pipe(
        Effect.flip
      );
      expect(error).toMatchObject({
        failure: "RecoveryRevisionMismatchError",
        stage: "prepare",
      });
      expect(calls).toMatchObject({
        cleanReads: 1,
        publishCalls: 0,
        resumeCalls: 0,
        signingSecretReads: 0,
      });
    })
  );

  it.effect(
    "rejects signing-key mismatch after selecting a signing action",
    () =>
      Effect.gen(function* () {
        calls.derivedPublicKeyPem = "different-derived-public-key";
        const error = yield* runInverse(
          "release-rejected",
          "recovery-rejected"
        ).pipe(Effect.flip);
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
        const candidate = yield* gitBundle("release-candidate");
        calls.current = currentState({
          active: null,
          candidate: { ...candidate, phase: "staging" },
          recovery: null,
        });
        const error = yield* runInverse("release-other", "recovery-other").pipe(
          Effect.flip
        );
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
      const candidate = yield* gitBundle("release-candidate", {
        sha: GitCommitShaSchema.make("b".repeat(40)),
      });
      calls.current = currentState({
        active: null,
        candidate: { ...candidate, phase: "staging" },
        recovery: null,
      });
      const error = yield* runInverse(
        "release-candidate",
        "recovery-candidate"
      ).pipe(Effect.flip);
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

      const error = yield* runInverse("release-next", "recovery-next").pipe(
        Effect.flip
      );
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
      const candidate = yield* gitBundle("release-candidate");
      calls.current = currentState({
        active: null,
        candidate: { ...candidate, phase: "verifying" },
        recovery: null,
      });
      calls.manifestMismatch = true;
      const error = yield* runInverse(
        "release-candidate",
        "recovery-candidate"
      ).pipe(Effect.flip);
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

  it.effect("bootstraps over the active release", () =>
    Effect.gen(function* () {
      calls.rendererManifestOverride = LIVE_RENDERER;
      const receipt = yield* runBootstrap(BOOTSTRAP_SCOPE);
      expect(receipt).toMatchObject({ releaseId: "release-bootstrap" });
      expect(calls).toMatchObject({
        publicationRetention: { kind: "bootstrap" },
        publishCalls: 1,
      });
    })
  );

  it.effect("refuses a bootstrap that cannot close its renderer", () =>
    Effect.gen(function* () {
      calls.rendererManifestOverride = LIVE_RENDERER;
      const error = yield* runBootstrap(FUNCTION_SCOPE).pipe(Effect.flip);
      expect(error).toMatchObject({ failure: "BootstrapRendererError" });
      expect(calls).toMatchObject({ publishCalls: 0, rendererCalls: 1 });
    })
  );

  it.effect("resumes a bootstrap candidate on the active renderer", () =>
    Effect.gen(function* () {
      const active = yield* gitBundle("release-active");
      const candidate = yield* gitBundle("release-bootstrap", {
        baseManifestHash: active.release.manifestHash,
        baseReleaseId: releaseId("release-active"),
        scope: BOOTSTRAP_SCOPE,
      });
      calls.current = currentState({
        active: yield* completedBundle(active),
        candidate: { ...candidate, phase: "verifying" },
        recovery: null,
      });
      const receipt = yield* runBootstrap(BOOTSTRAP_SCOPE);
      expect(receipt).toMatchObject({ releaseId: "release-bootstrap" });
      expect(calls).toMatchObject({ publishCalls: 1, rendererCalls: 0 });
    })
  );
});
