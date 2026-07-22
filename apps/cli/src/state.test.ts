import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import {
  ContentReleaseCurrentSchema,
  type PendingContentRelease,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
import { selectProductionAction } from "#cli/state";
import { RENDERER_MANIFEST } from "#test/real";

const HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const SIGNATURE = `${"A".repeat(85)}A`;

/** Creates one contract-owned release identity for state assertions. */
function releaseId(value: string) {
  return ReleaseIdSchema.make(value);
}

/** Creates one structurally valid signed bundle for state-only assertions. */
function bundle(
  id: string,
  origin: ContentReleaseManifest["origin"] = {
    kind: "git",
    sha: GitCommitShaSchema.make("a".repeat(40)),
  },
  baseReleaseId = origin.kind === "rollback" ? origin.releaseId : null
) {
  const release = Schema.decodeUnknownSync(SignedContentReleaseSchema)({
    keyId: "test-state-key",
    manifest: {
      baseReleaseId,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: HASH,
      origin,
      projectionCount: 0,
      projectionDigest: HASH,
      releaseId: id,
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      upsertCount: 0,
    },
    manifestHash: HASH,
    signature: SIGNATURE,
  });
  return { release, rendererManifest: RENDERER_MANIFEST };
}

/** Creates exact durable current state through the public wire contract. */
function current(input: unknown) {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(input);
}

/** Creates a completed active release with matching terminal evidence. */
function completed(id: string, origin?: ContentReleaseManifest["origin"]) {
  const releaseBundle = bundle(id, origin);
  return {
    ...releaseBundle,
    receipt: {
      activatedHeads: 0,
      deletedHeads: 0,
      projectionDigest: HASH,
      releaseId: id,
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: 0,
    },
  };
}

/** Creates durable state whose completed release is the active identity. */
function activeState(value: ReturnType<typeof completed>) {
  return current({
    activeReleaseId: value.release.manifest.releaseId,
    completed: value,
    pending: null,
  });
}

/** Returns the typed state failure for one unsafe command. */
function reject(
  args: ReleaseArguments | RollbackArguments,
  state: ReturnType<typeof current>
) {
  return Effect.runPromise(
    selectProductionAction(args, state).pipe(Effect.flip)
  );
}

/** Runs one production-state selection through the CLI Effect boundary. */
function select(
  args: ReleaseArguments | RollbackArguments,
  state: ReturnType<typeof current>
) {
  return Effect.runPromise(selectProductionAction(args, state));
}

describe("production state", () => {
  it("selects new releases against absent or completed active state", async () => {
    await expect(
      select(
        { command: "release", releaseId: releaseId("release-first") },
        current({ activeReleaseId: null, completed: null, pending: null })
      )
    ).resolves.toEqual({ baseReleaseId: null, kind: "new", mode: "git" });

    const active = completed("release-active");
    await expect(
      select(
        { command: "release", releaseId: releaseId("release-next") },
        activeState(active)
      )
    ).resolves.toEqual({
      baseReleaseId: active.release.manifest.releaseId,
      kind: "new",
      mode: "git",
    });
  });

  it("selects a new rollback only for the exact completed active release", async () => {
    const active = completed("release-active");
    await expect(
      select(
        {
          command: "rollback",
          releaseId: releaseId("rollback-next"),
          rollbackOf: active.release.manifest.releaseId,
        },
        activeState(active)
      )
    ).resolves.toEqual({
      baseReleaseId: active.release.manifest.releaseId,
      kind: "new",
      mode: "rollback",
      rollbackOf: active.release.manifest.releaseId,
    });
  });

  it.each(["staging", "verifying", "verified"] as const)(
    "rebuilds exact pending %s source state",
    async (phase) => {
      const pending: PendingContentRelease = {
        ...bundle("release-pending"),
        phase,
      };
      await expect(
        select(
          { command: "release", releaseId: releaseId("release-pending") },
          current({ activeReleaseId: null, completed: null, pending })
        )
      ).resolves.toEqual({
        kind: "rebuild",
        mode: "git",
        pending,
        sha: GitCommitShaSchema.make("a".repeat(40)),
      });
    }
  );

  it.each(["active", "finalizing"] as const)(
    "resumes exact pending %s state without rebuilding",
    async (phase) => {
      const pending: PendingContentRelease = {
        ...bundle("release-pending"),
        phase,
      };
      const action = await select(
        { command: "release", releaseId: releaseId("release-pending") },
        current({
          activeReleaseId: pending.release.manifest.releaseId,
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
    const git = completed("release-completed");
    const rollbackBase = releaseId("release-previous");
    const rollback = completed("rollback-completed", {
      kind: "rollback",
      releaseId: rollbackBase,
    });
    await expect(
      select(
        { command: "release", releaseId: git.release.manifest.releaseId },
        activeState(git)
      )
    ).resolves.toMatchObject({ kind: "resume" });
    await expect(
      select(
        {
          command: "rollback",
          releaseId: rollback.release.manifest.releaseId,
          rollbackOf: rollbackBase,
        },
        activeState(rollback)
      )
    ).resolves.toMatchObject({ kind: "resume" });
    await expect(
      reject(
        { command: "release", releaseId: rollback.release.manifest.releaseId },
        activeState(rollback)
      )
    ).resolves.toMatchObject({ reason: "mode-mismatch" });
  });

  it.each([
    {
      args: { command: "release", releaseId: releaseId("release-other") },
      reason: "pending-conflict",
      state: current({
        activeReleaseId: null,
        completed: null,
        pending: { ...bundle("release-pending"), phase: "staging" },
      }),
    },
    {
      args: { command: "release", releaseId: releaseId("release-pending") },
      reason: "aborting",
      state: current({
        activeReleaseId: null,
        completed: null,
        pending: { ...bundle("release-pending"), phase: "aborting" },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: releaseId("release-pending"),
        rollbackOf: releaseId("release-active"),
      },
      reason: "mode-mismatch",
      state: current({
        activeReleaseId: null,
        completed: null,
        pending: { ...bundle("release-pending"), phase: "staging" },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: releaseId("rollback-pending"),
        rollbackOf: releaseId("release-other"),
      },
      reason: "rollback-mismatch",
      state: current({
        activeReleaseId: releaseId("release-active"),
        completed: null,
        pending: {
          ...bundle("rollback-pending", {
            kind: "rollback",
            releaseId: releaseId("release-active"),
          }),
          phase: "staging",
        },
      }),
    },
    {
      args: {
        command: "rollback",
        releaseId: releaseId("rollback-first"),
        rollbackOf: releaseId("release-missing"),
      },
      reason: "missing-active",
      state: current({ activeReleaseId: null, completed: null, pending: null }),
    },
    {
      args: {
        command: "rollback",
        releaseId: releaseId("rollback-next"),
        rollbackOf: releaseId("release-other"),
      },
      reason: "rollback-mismatch",
      state: current({
        activeReleaseId: releaseId("release-active"),
        completed: completed("release-active"),
        pending: null,
      }),
    },
  ] as const)("rejects unsafe state %#", async ({ args, reason, state }) => {
    await expect(reject(args, state)).resolves.toMatchObject({
      _tag: "ProductionStateError",
      reason,
    });
  });
});
