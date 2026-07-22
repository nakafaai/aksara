import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { ContentReleaseCurrentSchema } from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
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
      upsertCount: 0,
    },
    manifestHash: STATE_HASH,
    signature: SIGNATURE,
  });
  return { release, rendererManifest: RENDERER_MANIFEST };
}

/** Creates exact durable current state through the public wire contract. */
export function stateCurrent(input: unknown) {
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
      stagedArtifacts: 0,
      stagedItems: 0,
      stagedProjections: 0,
    },
  };
}

/** Creates durable state whose completed release is the active identity. */
export function activeState(value: ReturnType<typeof stateCompleted>) {
  return stateCurrent({
    activeManifestHash: value.release.manifestHash,
    activeReleaseId: value.release.manifest.releaseId,
    completed: value,
    pending: null,
  });
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
