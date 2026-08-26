import { beforeEach, describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { productionCalls, productionProgram } from "#test/production/harness";
import { FUNCTION_SCOPE } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
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

describe("production preparation validation", () => {
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
