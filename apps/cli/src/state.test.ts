import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import type { StagedContentRelease } from "@nakafa/aksara-contracts/release/current/state";
import { describe, expect, it } from "vitest";
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
  it("selects new releases against absent or completed active state", async () => {
    await expect(
      selectState(
        releaseArgs("release-first"),
        stateCurrent({ active: null, candidate: null, recovery: null })
      )
    ).resolves.toEqual({
      baseBundle: null,
      baseTryoutRuntimeBundle: null,
      kind: "new",
      scope: FUNCTION_SCOPE,
    });

    const active = stateCompleted("release-active");
    await expect(
      selectState(releaseArgs("release-next"), activeState(active))
    ).resolves.toEqual({
      baseBundle: {
        release: active.release,
        rendererManifest: active.rendererManifest,
      },
      baseTryoutRuntimeBundle: null,
      kind: "new",
      scope: FUNCTION_SCOPE,
    });
  });

  it.each(["staging", "verifying", "verified"] as const)(
    "rebuilds exact candidate %s source state",
    async (phase) => {
      const candidate: StagedContentRelease = {
        ...stateBundle("release-candidate"),
        phase,
      };
      await expect(
        selectState(
          releaseArgs("release-candidate"),
          stateCurrent({ active: null, candidate, recovery: null })
        )
      ).resolves.toEqual({
        baseBundle: null,
        baseTryoutRuntimeBundle: null,
        candidate,
        kind: "rebuild",
        scope: FUNCTION_SCOPE,
        sha: GitCommitShaSchema.make("a".repeat(40)),
      });
    }
  );

  it("rebuilds a verified candidate protected by its matching inverse", async () => {
    const candidate: StagedContentRelease = {
      ...stateBundle("release-candidate"),
      phase: "verified",
    };
    const recovery = stateRecovery(candidate, "recovery-candidate");
    await expect(
      selectState(
        releaseArgs("release-candidate", "recovery-candidate"),
        stateCurrent({ active: null, candidate, recovery })
      )
    ).resolves.toMatchObject({ kind: "rebuild" });
  });

  it("replays an active release with its exact retained recovery", async () => {
    const git = stateCompleted("release-completed");
    const recovery = stateRecovery(git, "recovery-completed");
    await expect(
      selectState(
        releaseArgs("release-completed", "recovery-completed"),
        stateCurrent({ active: git, candidate: null, recovery })
      )
    ).resolves.toMatchObject({ kind: "resume" });

    const rollback = stateCompleted("recovered-active", {
      kind: "rollback",
      releaseId: stateReleaseId("release-previous"),
    });
    await expect(
      rejectState(
        releaseArgs("recovered-active", "recovery-recovered"),
        stateCurrent({
          active: rollback,
          candidate: null,
          recovery: stateRecovery(rollback, "recovery-recovered"),
        })
      )
    ).resolves.toMatchObject({ reason: "mode-mismatch" });
  });

  it.each([
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
  ] as const)("rejects unsafe state %#", async ({ args, reason, state }) => {
    await expect(rejectState(args, state)).resolves.toMatchObject({
      _tag: "ProductionStateError",
      reason,
    });
  });
});
