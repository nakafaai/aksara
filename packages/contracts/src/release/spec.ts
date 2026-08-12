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
import {
  ContentReleaseManifestFields,
  hasCoherentReleaseOrigin,
  ReleaseCountSchema,
} from "#contracts/release/manifest/core";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  type ContentSnapshotSet,
  ContentSnapshotSetSchema,
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
  baseResultCount: ReleaseCountSchema,
  baseResultDigest: Sha256HashSchema,
  deleteHeads: ReleaseCountSchema,
  itemCount: ReleaseCountSchema,
  itemsDigest: Sha256HashSchema,
  manifestHash: Sha256HashSchema,
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
  snapshots: ContentSnapshotSetSchema,
  stagedArtifacts: ReleaseCountSchema,
  stagedRoutes: ReleaseCountSchema,
  stagedSnapshotRows: ReleaseCountSchema,
  upsertHeads: ReleaseCountSchema,
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
  activatedHeads: ReleaseCountSchema,
  deletedHeads: ReleaseCountSchema,
  manifestHash: Sha256HashSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  resultCount: ReleaseCountSchema,
  resultDigest: Sha256HashSchema,
  routeDigest: Sha256HashSchema,
  snapshots: ContentSnapshotSetSchema,
  stagedArtifacts: ReleaseCountSchema,
  stagedItems: ReleaseCountSchema,
  stagedProjections: ReleaseCountSchema,
  stagedRoutes: ReleaseCountSchema,
  stagedSnapshotRows: ReleaseCountSchema,
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
