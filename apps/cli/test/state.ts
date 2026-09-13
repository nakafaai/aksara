import {
  ContentReleaseBundleSchema,
  type ContentReleaseCurrent,
  ContentReleaseCurrentSchema,
} from "@nakafa/aksara-contracts/adoption/schema";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import {
  inheritContentSnapshots,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Schema } from "effect";
import type { ReleaseArguments } from "#cli/production/arguments";
import { selectProductionAction } from "#cli/state";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";

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
  const release = Schema.decodeSync(SignedContentReleaseSchema)({
    keyId: "test-state-key",
    manifest: {
      activeAppLocales: ["en", "id"],
      baseActiveAppLocales: baseReleaseId === null ? null : ["en", "id"],
      baseManifestHash: baseReleaseId === null ? null : STATE_HASH,
      baseReleaseId,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      format: "localized-content-release",
      itemCount: 0,
      itemsDigest: STATE_HASH,
      origin,
      projectionCount: 0,
      projectionDigest: STATE_HASH,
      releaseId: id,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: STATE_HASH,
      routeCount: 0,
      routeDigest: STATE_HASH,
      scope: FUNCTION_SCOPE,
      snapshots: inheritContentSnapshots(null),
      upsertCount: 0,
    },
    manifestHash: STATE_HASH,
    signature: SIGNATURE,
  });
  return { release, rendererManifest: RENDERER_MANIFEST };
}

/** Creates exact durable current state through the public wire contract. */
export function stateCurrent(input: {
  readonly active: unknown;
  readonly candidate: unknown;
  readonly recovery: unknown;
  readonly tryoutRuntimeBundle?: unknown;
}): ContentReleaseCurrent {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)({
    ...input,
    tryoutRuntimeBundle: input.tryoutRuntimeBundle ?? null,
  });
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
      activeAppLocales: releaseBundle.release.manifest.activeAppLocales,
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
export const rejectState = Effect.fn("AksaraCliTest.rejectState")(
  (args: ReleaseArguments, state: ReturnType<typeof stateCurrent>) =>
    selectProductionAction(args, state).pipe(Effect.flip)
);

/** Selects one production action without crossing an Effect runtime boundary. */
export const selectState = Effect.fn("AksaraCliTest.selectState")(
  (args: ReleaseArguments, state: ReturnType<typeof stateCurrent>) =>
    selectProductionAction(args, state)
);

/** Creates a retained wire fixture for state selection without asserting signature authenticity. */
export function retainedStateBundle(id: string) {
  const bundle = stateBundle(id);
  /** Encodes the exact published retained capability structure for this fixture. */
  const components = (names: readonly string[]) =>
    names.map((name) => ({ name, version: 1 }));
  return Schema.decodeUnknownSync(ContentReleaseBundleSchema)({
    release: {
      ...bundle.release,
      manifest: {
        ...bundle.release.manifest,
        rendererContractVersion: "1.0.0",
        rendererManifestHash: STATE_HASH,
      },
    },
    rendererManifest: {
      ...bundle.rendererManifest,
      base: {
        authoringComponents: components(bundle.rendererManifest.base),
        supportedComponents: components(bundle.rendererManifest.base),
      },
      domains: bundle.rendererManifest.domains.map(
        ({ name, components: names }) => ({
          authoringComponents: components(names),
          name,
          supportedComponents: components(names),
        })
      ),
      format: "nakafa-mdx-renderer-v1",
      hash: STATE_HASH,
      rendererContractVersion: "1.0.0",
    },
  });
}
