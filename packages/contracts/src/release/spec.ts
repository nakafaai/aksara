import { Schema } from "effect";
import { ContentFamilySchema } from "#contracts/content";
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
  ActiveAppLocaleListSchema,
  type AppLocale,
  ArtifactLocaleSchema,
} from "#contracts/locale";
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
  snapshotRowCount,
} from "#contracts/release/snapshot/spec";
import { RENDERER_CONTRACT_VERSION } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** Semantic wire identity of the current localized content release. */
export const CONTENT_RELEASE_FORMAT = "localized-content-release";
/** Nonnegative release inventory count authenticated by one manifest. */
export const ReleaseCountSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
/** Stable inventory and provenance fields owned by the current release. */
const ContentReleaseManifestFields = {
  baseActiveAppLocales: Schema.NullOr(ActiveAppLocaleListSchema),
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
function hasCoherentReleaseOrigin(input: {
  readonly baseActiveAppLocales: typeof ActiveAppLocaleListSchema.Type | null;
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
  const hasBaseRelease = input.baseReleaseId !== null;
  if (
    hasBaseRelease !== (input.baseManifestHash !== null) ||
    hasBaseRelease !== (input.baseActiveAppLocales !== null) ||
    input.baseReleaseId === input.releaseId ||
    input.deleteCount + input.upsertCount !== input.itemCount ||
    input.rollbackCount !== input.itemCount ||
    !hasScopedSnapshotTransitions(input.scope, input.snapshots)
  ) {
    return false;
  }
  if (
    !hasBaseRelease &&
    (input.baseResultCount !== 0 ||
      input.baseResultDigest !== EMPTY_RESULT_CATALOG_DIGEST)
  ) {
    return false;
  }
  if (!(hasBaseRelease || hasEmptySnapshotBases(input.snapshots))) {
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
/** One immutable artifact selected for a locale-specific content head. */
export const ContentUpsertSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  family: ContentFamilySchema,
  operation: Schema.Literal("upsert"),
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
});
/** One locale-specific content head removed by an explicit tombstone. */
export const ContentDeleteSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
  operation: Schema.Literal("delete"),
});
/** Complete tagged change vocabulary accepted by the current release. */
export const ContentChangeSchema = Schema.Union([
  ContentUpsertSchema,
  ContentDeleteSchema,
]);
export type ContentChange = typeof ContentChangeSchema.Type;
export const ReleaseItemIndexSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
/** One separately stored, ordered item authenticated by a release digest. */
export const ContentReleaseItemSchema = Schema.Struct({
  change: ContentChangeSchema,
  index: ReleaseItemIndexSchema,
  releaseId: ReleaseIdSchema,
});
export type ContentReleaseItem = typeof ContentReleaseItemSchema.Type;
/** Deterministic desired-state transition with signed source provenance. */
export const ContentReleaseManifestSchema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  ...ContentReleaseManifestFields,
  format: Schema.Literal(CONTENT_RELEASE_FORMAT),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentReleaseOrigin, {
      message: "Expected a new release identity and a coherent source origin.",
    })
  )
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
/** Checks whether one application locale is active in a signed release. */
export function releaseActivatesAppLocale(
  release: SignedContentRelease,
  appLocale: AppLocale
) {
  return release.manifest.activeAppLocales.includes(appLocale);
}
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
    Schema.refine(
      (release): release is RollbackSignedContentRelease =>
        release.manifest.origin.kind === "rollback",
      { message: "Expected a signed rollback release." }
    )
  );

/** Checks that every staged head has exactly one matching item and artifact. */
function hasCoherentVerificationCounts(input: {
  readonly baseActiveAppLocales: typeof ActiveAppLocaleListSchema.Type | null;
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
  const hasBaseRelease = input.baseReleaseId !== null;
  return (
    hasBaseRelease === (input.baseManifestHash !== null) &&
    hasBaseRelease === (input.baseActiveAppLocales !== null) &&
    (hasBaseRelease ||
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
  activeAppLocales: ActiveAppLocaleListSchema,
  baseActiveAppLocales: Schema.NullOr(ActiveAppLocaleListSchema),
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
  Schema.check(
    Schema.makeFilter(hasCoherentVerificationCounts, {
      message:
        "Expected staged head and artifact counts to match the release items.",
    })
  )
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
export const ReleaseVerificationStatusSchema = Schema.Union([
  ReleaseVerificationPendingSchema,
  ReleaseVerificationCompleteSchema,
]);
export type ReleaseVerificationStatus =
  typeof ReleaseVerificationStatusSchema.Type;

/** Delta evidence returned after a release is staged and activated. */
export const PublicationReceiptSchema = Schema.Struct({
  activatedHeads: ReleaseCountSchema,
  activeAppLocales: ActiveAppLocaleListSchema,
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
  Schema.check(
    Schema.makeFilter(
      (receipt) =>
        receipt.activatedHeads + receipt.deletedHeads === receipt.stagedItems &&
        receipt.stagedArtifacts === receipt.activatedHeads &&
        receipt.stagedSnapshotRows === snapshotRowCount(receipt.snapshots),
      {
        message:
          "Expected activated head and artifact counts to match staged items.",
      }
    )
  )
);
export type PublicationReceipt = typeof PublicationReceiptSchema.Type;
