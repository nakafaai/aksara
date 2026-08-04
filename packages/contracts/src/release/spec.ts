import { Schema } from "effect";
import { ContentFamilySchema, ContentLocaleSchema } from "#contracts/content";
import { ContentDeliveryClassSchema } from "#contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { ReleaseOriginSchema } from "#contracts/release/origin";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import {
  type ContentSnapshotSet,
  ContentSnapshotSetSchema,
  hasEmptySnapshotBases,
  hasGitSnapshotModes,
  hasRollbackSnapshotModes,
  hasScopedSnapshotTransitions,
  PublicationScopeSchema,
  snapshotRowCount,
} from "#contracts/release/snapshot/spec";
import { RENDERER_CONTRACT_VERSION } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** One immutable artifact selected for a locale-specific content head. */
export const ContentUpsertSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  family: ContentFamilySchema,
  locale: ContentLocaleSchema,
  operation: Schema.Literal("upsert"),
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
});

/** One locale-specific content head removed by an explicit tombstone. */
export const ContentDeleteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
  locale: ContentLocaleSchema,
  operation: Schema.Literal("delete"),
});

/** Complete tagged change vocabulary accepted by a v1 content release. */
export const ContentChangeSchema = Schema.Union(
  ContentUpsertSchema,
  ContentDeleteSchema
);
export type ContentChange = typeof ContentChangeSchema.Type;

export const ReleaseItemIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** One separately stored, ordered item authenticated by a release digest. */
export const ContentReleaseItemSchema = Schema.Struct({
  change: ContentChangeSchema,
  index: ReleaseItemIndexSchema,
  releaseId: ReleaseIdSchema,
});
export type ContentReleaseItem = typeof ContentReleaseItemSchema.Type;

const ProjectionCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Deterministic desired-state transition for one content release. */
const ContentReleaseManifestFields = {
  baseManifestHash: Schema.NullOr(Sha256HashSchema),
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  baseResultCount: ProjectionCountSchema,
  baseResultDigest: Sha256HashSchema,
  deleteCount: ProjectionCountSchema,
  itemCount: ProjectionCountSchema,
  itemsDigest: Sha256HashSchema,
  origin: ReleaseOriginSchema,
  projectionCount: ProjectionCountSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  rendererManifestHash: Sha256HashSchema,
  resultCount: ProjectionCountSchema,
  resultDigest: Sha256HashSchema,
  rollbackCount: ProjectionCountSchema,
  rollbackDigest: Sha256HashSchema,
  routeCount: ProjectionCountSchema,
  routeDigest: Sha256HashSchema,
  scope: PublicationScopeSchema,
  snapshots: ContentSnapshotSetSchema,
  upsertCount: ProjectionCountSchema,
};

/** Checks rollback provenance against the forward release identities. */
function hasCoherentReleaseOrigin(input: {
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

/** Deterministic desired-state transition with signed source provenance. */
export const ContentReleaseManifestSchema = Schema.Struct(
  ContentReleaseManifestFields
).pipe(
  Schema.filter(hasCoherentReleaseOrigin, {
    message: () =>
      "Expected a new release identity and a coherent source origin.",
  })
);
export type ContentReleaseManifest = typeof ContentReleaseManifestSchema.Type;

/** Immutable release manifest plus its asymmetric authenticity proof. */
export const SignedContentReleaseSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  manifest: ContentReleaseManifestSchema,
  manifestHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedContentRelease = typeof SignedContentReleaseSchema.Type;

/** Signed release whose provenance identifies one exact rollback target. */
export type RollbackSignedContentRelease = SignedContentRelease & {
  readonly manifest: SignedContentRelease["manifest"] & {
    readonly origin: {
      readonly kind: "rollback";
      readonly releaseId: ReleaseId;
    };
  };
};

/** Signed release contract accepted only for rollback-owned operations. */
export const RollbackSignedContentReleaseSchema =
  SignedContentReleaseSchema.pipe(
    Schema.filter(
      (release): release is RollbackSignedContentRelease =>
        release.manifest.origin.kind === "rollback",
      { message: () => "Expected a signed rollback release." }
    )
  );

/** Checks that every staged head has exactly one matching item and artifact. */
function hasCoherentVerificationCounts(input: {
  readonly baseManifestHash: typeof Sha256HashSchema.Type | null;
  readonly baseReleaseId: typeof ReleaseIdSchema.Type | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: typeof Sha256HashSchema.Type;
  readonly deleteHeads: number;
  readonly itemCount: number;
  readonly rollbackCount: number;
  readonly snapshots: ContentSnapshotSet;
  readonly stagedSnapshotRows: number;
  readonly stagedArtifacts: number;
  readonly upsertHeads: number;
}) {
  return (
    (input.baseReleaseId === null) === (input.baseManifestHash === null) &&
    (input.baseReleaseId !== null ||
      (input.baseResultCount === 0 &&
        input.baseResultDigest === EMPTY_RESULT_CATALOG_DIGEST)) &&
    input.deleteHeads + input.upsertHeads === input.itemCount &&
    input.rollbackCount === input.itemCount &&
    input.stagedArtifacts === input.upsertHeads &&
    input.stagedSnapshotRows === snapshotRowCount(input.snapshots)
  );
}

/** Pre-activation evidence proving the fully staged release is coherent. */
export const ReleaseVerificationEvidenceSchema = Schema.Struct({
  baseManifestHash: Schema.NullOr(Sha256HashSchema),
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  baseResultCount: ProjectionCountSchema,
  baseResultDigest: Sha256HashSchema,
  deleteHeads: ProjectionCountSchema,
  itemCount: ProjectionCountSchema,
  itemsDigest: Sha256HashSchema,
  manifestHash: Sha256HashSchema,
  projectionCount: ProjectionCountSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  rendererManifestHash: Sha256HashSchema,
  resultCount: ProjectionCountSchema,
  resultDigest: Sha256HashSchema,
  rollbackCount: ProjectionCountSchema,
  rollbackDigest: Sha256HashSchema,
  routeCount: ProjectionCountSchema,
  routeDigest: Sha256HashSchema,
  snapshots: ContentSnapshotSetSchema,
  stagedArtifacts: ProjectionCountSchema,
  stagedRoutes: ProjectionCountSchema,
  stagedSnapshotRows: ProjectionCountSchema,
  upsertHeads: ProjectionCountSchema,
}).pipe(
  Schema.filter(hasCoherentVerificationCounts, {
    message: () =>
      "Expected staged head and artifact counts to match the release items.",
  })
);
export type ReleaseVerificationEvidence =
  typeof ReleaseVerificationEvidenceSchema.Type;

/** Durable verification has started but has not produced final evidence yet. */
export const ReleaseVerificationPendingSchema = Schema.Struct({
  manifestHash: Sha256HashSchema,
  phase: Schema.Literal("verifying"),
  releaseId: ReleaseIdSchema,
});

/** Durable verification completed with recomputed release evidence. */
export const ReleaseVerificationCompleteSchema = Schema.Struct({
  evidence: ReleaseVerificationEvidenceSchema,
  phase: Schema.Literal("verified"),
});

/** Bounded status returned while durable verification progresses. */
export const ReleaseVerificationStatusSchema = Schema.Union(
  ReleaseVerificationPendingSchema,
  ReleaseVerificationCompleteSchema
);
export type ReleaseVerificationStatus =
  typeof ReleaseVerificationStatusSchema.Type;

/** Delta evidence returned after a release is staged and activated. */
export const PublicationReceiptSchema = Schema.Struct({
  activatedHeads: ProjectionCountSchema,
  deletedHeads: ProjectionCountSchema,
  manifestHash: Sha256HashSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  resultCount: ProjectionCountSchema,
  resultDigest: Sha256HashSchema,
  routeDigest: Sha256HashSchema,
  snapshots: ContentSnapshotSetSchema,
  stagedArtifacts: ProjectionCountSchema,
  stagedItems: ProjectionCountSchema,
  stagedProjections: ProjectionCountSchema,
  stagedRoutes: ProjectionCountSchema,
  stagedSnapshotRows: ProjectionCountSchema,
}).pipe(
  Schema.filter(
    (receipt) =>
      receipt.activatedHeads + receipt.deletedHeads === receipt.stagedItems &&
      receipt.stagedArtifacts === receipt.activatedHeads &&
      receipt.stagedSnapshotRows === snapshotRowCount(receipt.snapshots),
    {
      message: () =>
        "Expected activated head and artifact counts to match staged items.",
    }
  )
);
export type PublicationReceipt = typeof PublicationReceiptSchema.Type;
