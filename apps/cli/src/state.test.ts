import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import type { StagedContentRelease } from "@nakafa/aksara-contracts/release/current";
import { describe, expect, it } from "vitest";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
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
  };
}

/** Creates one exact forward-rollback command with a distinct inverse identity. */
function rollbackArgs(
  releaseId: string,
  rollbackOf: string,
  recoveryId = `recovery-${releaseId}`
): RollbackArguments {
  return {
    command: "rollback",
    recoveryId: stateReleaseId(recoveryId),
    releaseId: stateReleaseId(releaseId),
    rollbackOf: stateReleaseId(rollbackOf),
  };
}

describe("production state", () => {
  it("selects new releases against absent or completed active state", async () => {
    await expect(
      selectState(
        releaseArgs("release-first"),
        stateCurrent({ active: null, candidate: null, recovery: null })
      )
    ).resolves.toEqual({ baseBundle: null, kind: "new", mode: "git" });

    const active = stateCompleted("release-active");
    await expect(
      selectState(releaseArgs("release-next"), activeState(active))
    ).resolves.toEqual({
      baseBundle: {
        release: active.release,
        rendererManifest: active.rendererManifest,
      },
      kind: "new",
      mode: "git",
    });
  });

  it("selects a new rollback only for the exact active release", async () => {
    const active = stateCompleted("release-active");
    await expect(
      selectState(
        rollbackArgs("rollback-next", "release-active"),
        activeState(active)
      )
    ).resolves.toEqual({
      kind: "new",
      mode: "rollback",
      rollbackOf: active.release.manifest.releaseId,
      sourceBundle: {
        release: active.release,
        rendererManifest: active.rendererManifest,
      },
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
        candidate,
        kind: "rebuild",
        mode: "git",
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
    ).resolves.toMatchObject({ kind: "rebuild", mode: "git" });
  });

  it("replays an active release or rollback with exact retained recovery", async () => {
    const git = stateCompleted("release-completed");
    const recovery = stateRecovery(git, "recovery-completed");
    await expect(
      selectState(
        releaseArgs("release-completed", "recovery-completed"),
        stateCurrent({ active: git, candidate: null, recovery })
      )
    ).resolves.toMatchObject({ kind: "resume" });

    const rollbackBase = stateReleaseId("release-previous");
    const rollback = stateCompleted("rollback-completed", {
      kind: "rollback",
      releaseId: rollbackBase,
    });
    await expect(
      selectState(
        rollbackArgs(
          "rollback-completed",
          "release-previous",
          "recovery-rollback"
        ),
        stateCurrent({
          active: rollback,
          candidate: null,
          recovery: stateRecovery(rollback, "recovery-rollback"),
        })
      )
    ).resolves.toMatchObject({ kind: "resume" });
    await expect(
      rejectState(
        releaseArgs("rollback-completed", "recovery-rollback"),
        stateCurrent({
          active: rollback,
          candidate: null,
          recovery: stateRecovery(rollback, "recovery-rollback"),
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
      args: rollbackArgs("release-candidate", "release-active"),
      reason: "mode-mismatch",
      state: stateCurrent({
        active: null,
        candidate: { ...stateBundle("release-candidate"), phase: "staging" },
        recovery: null,
      }),
    },
    {
      args: rollbackArgs("rollback-candidate", "release-other"),
      reason: "rollback-mismatch",
      state: stateCurrent({
        active: stateCompleted("release-active"),
        candidate: {
          ...stateBundle(
            "rollback-candidate",
            {
              kind: "rollback",
              releaseId: stateReleaseId("release-active"),
            },
            stateReleaseId("release-active")
          ),
          phase: "staging",
        },
        recovery: null,
      }),
    },
    {
      args: rollbackArgs("rollback-first", "release-missing"),
      reason: "missing-active",
      state: stateCurrent({ active: null, candidate: null, recovery: null }),
    },
    {
      args: rollbackArgs("rollback-next", "release-other"),
      reason: "rollback-mismatch",
      state: activeState(stateCompleted("release-active")),
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
