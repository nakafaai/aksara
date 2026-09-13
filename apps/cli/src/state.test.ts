import { describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import type { StagedContentRelease } from "@nakafa/aksara-contracts/release/current/state";
import { Effect } from "effect";
import type { ReleaseArguments } from "#cli/production/arguments";
import { FUNCTION_SCOPE } from "#test/real";
import {
  activeState,
  rejectState,
  selectState,
  stateBundle,
  stateCompleted,
  stateCurrent,
  stateRecovery,
  stateReleaseId,
} from "#test/state";

/** Creates one exact release command with a distinct inverse identity. */
function releaseArgs(
  releaseId: string,
  recoveryId = `recovery-${releaseId}`
): ReleaseArguments {
  return {
    command: "release",
    recoveryId: stateReleaseId(recoveryId),
    releaseId: stateReleaseId(releaseId),
    scope: FUNCTION_SCOPE,
  };
}

describe("production state", () => {
  it.effect(
    "selects new releases against absent or completed active state",
    () =>
      Effect.gen(function* () {
        expect(
          yield* selectState(
            releaseArgs("release-first"),
            stateCurrent({ active: null, candidate: null, recovery: null })
          )
        ).toEqual({
          baseBundle: null,
          baseTryoutRuntimeBundle: null,
          kind: "new",
          scope: FUNCTION_SCOPE,
        });
        const active = stateCompleted("release-active");
        expect(
          yield* selectState(releaseArgs("release-next"), activeState(active))
        ).toEqual({
          baseBundle: {
            release: active.release,
            rendererManifest: active.rendererManifest,
          },
          baseTryoutRuntimeBundle: null,
          kind: "new",
          scope: FUNCTION_SCOPE,
        });
      })
  );

  it.effect.each(["staging", "verifying", "verified"] as const)(
    "rebuilds exact candidate %s source state",
    (phase) =>
      Effect.gen(function* () {
        const candidate: StagedContentRelease = {
          ...stateBundle("release-candidate"),
          phase,
        };
        expect(
          yield* selectState(
            releaseArgs("release-candidate"),
            stateCurrent({ active: null, candidate, recovery: null })
          )
        ).toEqual({
          baseBundle: null,
          baseTryoutRuntimeBundle: null,
          candidate,
          kind: "rebuild",
          scope: FUNCTION_SCOPE,
          sha: GitCommitShaSchema.make("a".repeat(40)),
        });
      })
  );

  it.effect(
    "rebuilds a verified candidate protected by its matching inverse",
    () =>
      Effect.gen(function* () {
        const candidate: StagedContentRelease = {
          ...stateBundle("release-candidate"),
          phase: "verified",
        };
        const recovery = stateRecovery(candidate, "recovery-candidate");
        expect(
          yield* selectState(
            releaseArgs("release-candidate", "recovery-candidate"),
            stateCurrent({ active: null, candidate, recovery })
          )
        ).toMatchObject({ kind: "rebuild" });
      })
  );

  it.effect("replays an active release with its exact retained recovery", () =>
    Effect.gen(function* () {
      const git = stateCompleted("release-completed");
      const recovery = stateRecovery(git, "recovery-completed");
      expect(
        yield* selectState(
          releaseArgs("release-completed", "recovery-completed"),
          stateCurrent({ active: git, candidate: null, recovery })
        )
      ).toMatchObject({ kind: "resume" });
      const rollback = stateCompleted("recovered-active", {
        kind: "rollback",
        releaseId: stateReleaseId("release-previous"),
      });
      expect(
        yield* rejectState(
          releaseArgs("recovered-active", "recovery-recovered"),
          stateCurrent({
            active: rollback,
            candidate: null,
            recovery: stateRecovery(rollback, "recovery-recovered"),
          })
        )
      ).toMatchObject({ reason: "mode-mismatch" });
    })
  );

  it.effect.each([
    {
      args: releaseArgs("release-other"),
      reason: "candidate-conflict",
      state: stateCurrent({
        active: null,
        candidate: { ...stateBundle("release-candidate"), phase: "staging" },
        recovery: null,
      }),
    },
    {
      args: releaseArgs("release-candidate"),
      reason: "aborting",
      state: stateCurrent({
        active: null,
        candidate: { ...stateBundle("release-candidate"), phase: "aborting" },
        recovery: null,
      }),
    },
    {
      args: {
        ...releaseArgs("release-candidate"),
        scope: { families: [], snapshots: ["program"] },
      },
      reason: "scope-mismatch",
      state: stateCurrent({
        active: null,
        candidate: { ...stateBundle("release-candidate"), phase: "staging" },
        recovery: null,
      }),
    },
    {
      args: releaseArgs("release-next"),
      reason: "recovery-retained",
      state: stateCurrent({
        active: stateCompleted("release-active"),
        candidate: null,
        recovery: stateRecovery(
          stateCompleted("release-active"),
          "recovery-active"
        ),
      }),
    },
    {
      args: releaseArgs("release-active", "recovery-other"),
      reason: "recovery-conflict",
      state: stateCurrent({
        active: stateCompleted("release-active"),
        candidate: null,
        recovery: stateRecovery(
          stateCompleted("release-active"),
          "recovery-active"
        ),
      }),
    },
    {
      args: releaseArgs("release-candidate", "recovery-other"),
      reason: "recovery-conflict",
      state: (() => {
        const candidate = {
          ...stateBundle("release-candidate"),
          phase: "verified" as const,
        };
        return stateCurrent({
          active: null,
          candidate,
          recovery: stateRecovery(candidate, "recovery-candidate"),
        });
      })(),
    },
  ] as const)("rejects unsafe state %#", ({ args, reason, state }) =>
    Effect.gen(function* () {
      const error = yield* rejectState(args, state);
      expect(error).toMatchObject({
        _tag: "ProductionStateError",
        reason,
      });
    })
  );
});
