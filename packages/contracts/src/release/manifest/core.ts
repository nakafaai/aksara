import { Schema } from "effect";

import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ReleaseOriginSchema } from "#contracts/release/origin";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  type ContentSnapshotSet,
  ContentSnapshotSetSchema,
  hasEmptySnapshotBases,
  hasGitSnapshotModes,
  hasRollbackSnapshotModes,
  hasScopedSnapshotTransitions,
  PublicationScopeSchema,
} from "#contracts/release/snapshot/spec";
import { RENDERER_CONTRACT_VERSION } from "#contracts/renderer/contract";

/** Nonnegative release inventory count authenticated by one manifest. */
export const ReleaseCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Fields shared by historical and current content release manifests. */
export const ContentReleaseManifestFields = {
  baseManifestHash: Schema.NullOr(Sha256HashSchema),
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  baseResultCount: ReleaseCountSchema,
  baseResultDigest: Sha256HashSchema,
  deleteCount: ReleaseCountSchema,
  itemCount: ReleaseCountSchema,
  itemsDigest: Sha256HashSchema,
  origin: ReleaseOriginSchema,
  projectionCount: ReleaseCountSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  rendererManifestHash: Sha256HashSchema,
  resultCount: ReleaseCountSchema,
  resultDigest: Sha256HashSchema,
  rollbackCount: ReleaseCountSchema,
  rollbackDigest: Sha256HashSchema,
  routeCount: ReleaseCountSchema,
  routeDigest: Sha256HashSchema,
  scope: PublicationScopeSchema,
  snapshots: ContentSnapshotSetSchema,
  upsertCount: ReleaseCountSchema,
};

/** Checks rollback provenance against forward release identities. */
export function hasCoherentReleaseOrigin(input: {
  readonly baseManifestHash: typeof Sha256HashSchema.Type | null;
  readonly baseReleaseId: typeof ReleaseIdSchema.Type | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: typeof Sha256HashSchema.Type;
  readonly deleteCount: number;
  readonly itemCount: number;
  readonly origin: typeof ReleaseOriginSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
  readonly rollbackCount: number;
  readonly scope: typeof PublicationScopeSchema.Type;
  readonly snapshots: ContentSnapshotSet;
  readonly upsertCount: number;
}) {
  if (
    (input.baseReleaseId === null) !== (input.baseManifestHash === null) ||
    input.baseReleaseId === input.releaseId ||
    input.deleteCount + input.upsertCount !== input.itemCount ||
    input.rollbackCount !== input.itemCount ||
    !hasScopedSnapshotTransitions(input.scope, input.snapshots)
  ) {
    return false;
  }
  if (
    input.baseReleaseId === null &&
    (input.baseResultCount !== 0 ||
      input.baseResultDigest !== EMPTY_RESULT_CATALOG_DIGEST)
  ) {
    return false;
  }
  if (input.baseReleaseId === null && !hasEmptySnapshotBases(input.snapshots)) {
    return false;
  }
  if (input.origin.kind === "git") {
    return hasGitSnapshotModes(input.snapshots);
  }
  return (
    input.baseReleaseId === input.origin.releaseId &&
    input.releaseId !== input.origin.releaseId &&
    hasRollbackSnapshotModes(input.snapshots)
  );
}
