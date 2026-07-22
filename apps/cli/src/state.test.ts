import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import type { PendingContentRelease } from "@nakafa/aksara-contracts/release/lifecycle";
import { describe, expect, it } from "vitest";
import {
  activeState,
  rejectState,
  STATE_HASH,
  selectState,
  stateBundle,
  stateCompleted,
  stateCurrent,
  stateReleaseId,
} from "#test/state";

describe("production state", () => {
  it("selects new releases against absent or completed active state", async () => {
    await expect(
      selectState(
        { command: "release", releaseId: stateReleaseId("release-first") },
        stateCurrent({
          activeManifestHash: null,
          activeReleaseId: null,
          completed: null,
          pending: null,
        })
      )
    ).resolves.toEqual({ baseBundle: null, kind: "new", mode: "git" });

    const active = stateCompleted("release-active");
    await expect(
      selectState(
        { command: "release", releaseId: stateReleaseId("release-next") },
        activeState(active)
      )
    ).resolves.toEqual({
      baseBundle: {
        release: active.release,
        rendererManifest: active.rendererManifest,
      },
      kind: "new",
      mode: "git",
    });
  });

  it("selects a new rollback only for the exact completed active release", async () => {
    const active = stateCompleted("release-active");
    await expect(
      selectState(
        {
          command: "rollback",
          releaseId: stateReleaseId("rollback-next"),
          rollbackOf: active.release.manifest.releaseId,
        },
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

  it.each(["staging", "verifying"] as const)(
    "rebuilds exact pending %s source state",
    async (phase) => {
      const pending: PendingContentRelease = {
        ...stateBundle("release-pending"),
        phase,
      };
      await expect(
        selectState(
          { command: "release", releaseId: stateReleaseId("release-pending") },
          stateCurrent({
            activeManifestHash: null,
            activeReleaseId: null,
            completed: null,
            pending,
          })
        )
      ).resolves.toEqual({
        kind: "rebuild",
        mode: "git",
        pending,
        sha: GitCommitShaSchema.make("a".repeat(40)),
      });
    }
  );

  it.each(["verified", "active", "finalizing"] as const)(
    "resumes exact pending %s state without rebuilding",
    async (phase) => {
      const pending: PendingContentRelease = {
        ...stateBundle("release-pending"),
        phase,
      };
      const action = await selectState(
        { command: "release", releaseId: stateReleaseId("release-pending") },
        stateCurrent({
          activeManifestHash:
            phase === "verified" ? null : pending.release.manifestHash,
          activeReleaseId:
            phase === "verified" ? null : pending.release.manifest.releaseId,
          completed: null,
          pending,
        })
      );
      expect(action).toEqual({
        bundle: {
          release: pending.release,
          rendererManifest: pending.rendererManifest,
        },
        kind: "resume",
      });
    }
  );

  it("resumes a completed release or rollback with the same identity", async () => {
    const git = stateCompleted("release-completed");
    const rollbackBase = stateReleaseId("release-previous");
    const rollback = stateCompleted("rollback-completed", {
      kind: "rollback",
      releaseId: rollbackBase,
    });
    await expect(
      selectState(
        { command: "release", releaseId: git.release.manifest.releaseId },
        activeState(git)
      )
    ).resolves.toMatchObject({ kind: "resume" });
    await expect(
      selectState(
        {
          command: "rollback",
          releaseId: rollback.release.manifest.releaseId,
          rollbackOf: rollbackBase,
        },
        activeState(rollback)
      )
    ).resolves.toMatchObject({ kind: "resume" });
    await expect(
      rejectState(
        { command: "release", releaseId: rollback.release.manifest.releaseId },
        activeState(rollback)
      )
    ).resolves.toMatchObject({ reason: "mode-mismatch" });
  });

  it.each([
    {
      args: { command: "release", releaseId: stateReleaseId("release-other") },
      reason: "pending-conflict",
      state: stateCurrent({
        activeManifestHash: null,
        activeReleaseId: null,
        completed: null,
        pending: { ...stateBundle("release-pending"), phase: "staging" },
      }),
    },
    {
      args: {
        command: "release",
        releaseId: stateReleaseId("release-pending"),
      },
      reason: "aborting",
      state: stateCurrent({
        activeManifestHash: null,
        activeReleaseId: null,
        completed: null,
        pending: { ...stateBundle("release-pending"), phase: "aborting" },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: stateReleaseId("release-pending"),
        rollbackOf: stateReleaseId("release-active"),
      },
      reason: "mode-mismatch",
      state: stateCurrent({
        activeManifestHash: null,
        activeReleaseId: null,
        completed: null,
        pending: { ...stateBundle("release-pending"), phase: "staging" },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: stateReleaseId("rollback-pending"),
        rollbackOf: stateReleaseId("release-other"),
      },
      reason: "rollback-mismatch",
      state: stateCurrent({
        activeManifestHash: STATE_HASH,
        activeReleaseId: stateReleaseId("release-active"),
        completed: null,
        pending: {
          ...stateBundle("rollback-pending", {
            kind: "rollback",
            releaseId: stateReleaseId("release-active"),
          }),
          phase: "staging",
        },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: stateReleaseId("rollback-first"),
        rollbackOf: stateReleaseId("release-missing"),
      },
      reason: "missing-active",
      state: stateCurrent({
        activeManifestHash: null,
        activeReleaseId: null,
        completed: null,
        pending: null,
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: stateReleaseId("rollback-next"),
        rollbackOf: stateReleaseId("release-other"),
      },
      reason: "rollback-mismatch",
      state: stateCurrent({
        activeManifestHash:
          stateCompleted("release-active").release.manifestHash,
        activeReleaseId: stateReleaseId("release-active"),
        completed: stateCompleted("release-active"),
        pending: null,
      }),
    },
  ] as const)("rejects unsafe state %#", async ({ args, reason, state }) => {
    await expect(rejectState(args, state)).resolves.toMatchObject({
      _tag: "ProductionStateError",
      reason,
    });
  });
});
