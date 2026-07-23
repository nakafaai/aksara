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
  type ContentReleaseCurrent,
  ContentReleaseCurrentSchema,
} from "@nakafa/aksara-contracts/release/current";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import {
  emptyContentSnapshots,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot";
import { Effect, Schema } from "effect";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
import { selectProductionAction } from "#cli/state";
import { RENDERER_MANIFEST } from "#test/real";

export const STATE_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const SIGNATURE = `${"A".repeat(85)}A`;

/** Creates one contract-owned release identity for state assertions. */
export function stateReleaseId(value: string) {
  return ReleaseIdSchema.make(value);
}

/** Creates one structurally valid signed bundle for state-only assertions. */
export function stateBundle(
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
      baseManifestHash: baseReleaseId === null ? null : STATE_HASH,
      baseReleaseId,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: STATE_HASH,
      origin,
      projectionCount: 0,
      projectionDigest: STATE_HASH,
      releaseId: id,
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: STATE_HASH,
      routeCount: 0,
      routeDigest: STATE_HASH,
      snapshots: emptyContentSnapshots(),
      upsertCount: 0,
    },
    manifestHash: STATE_HASH,
    signature: SIGNATURE,
  });
  return { release, rendererManifest: RENDERER_MANIFEST };
}

/** Creates exact durable current state through the public wire contract. */
export function stateCurrent(input: unknown): ContentReleaseCurrent {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(input);
}

/** Creates a completed active release with matching terminal evidence. */
export function stateCompleted(
  id: string,
  origin?: ContentReleaseManifest["origin"]
) {
  const releaseBundle = stateBundle(id, origin);
  return {
    ...releaseBundle,
    receipt: {
      activatedHeads: 0,
      deletedHeads: 0,
      manifestHash: releaseBundle.release.manifestHash,
      projectionDigest: STATE_HASH,
      releaseId: id,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      routeDigest: STATE_HASH,
      snapshots: releaseBundle.release.manifest.snapshots,
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: 0,
      stagedRoutes: 0,
      stagedSnapshotRows: snapshotRowCount(
        releaseBundle.release.manifest.snapshots
      ),
    },
  };
}

/** Creates durable state whose completed release is the active identity. */
export function activeState(
  value: ReturnType<typeof stateCompleted>
): ContentReleaseCurrent {
  return stateCurrent({
    active: value,
    candidate: null,
    recovery: null,
  });
}

/** Creates the verified inverse that protects one candidate or active release. */
export function stateRecovery(
  target: ReturnType<typeof stateBundle>,
  id = "recovery-next"
) {
  return {
    ...stateBundle(
      id,
      { kind: "rollback", releaseId: target.release.manifest.releaseId },
      target.release.manifest.releaseId
    ),
    phase: "verified" as const,
  };
}

/** Returns the typed state failure for one unsafe command. */
export function rejectState(
  args: ReleaseArguments | RollbackArguments,
  state: ReturnType<typeof stateCurrent>
) {
  return Effect.runPromise(
    selectProductionAction(args, state).pipe(Effect.flip)
  );
}

/** Runs one production-state selection through the CLI Effect boundary. */
export function selectState(
  args: ReleaseArguments | RollbackArguments,
  state: ReturnType<typeof stateCurrent>
) {
  return Effect.runPromise(selectProductionAction(args, state));
}
