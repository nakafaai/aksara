import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { ContentDeliveryClassSchema } from "#contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  canonicalizeReleaseOrigin,
  ReleaseOriginSchema,
} from "#contracts/release/origin";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { RENDERER_CONTRACT_VERSION } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** One immutable artifact selected for a locale-specific content head. */
export const ContentUpsertSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  locale: ContentLocaleSchema,
  operation: Schema.Literal("upsert"),
  publicPath: Schema.optional(PublicPathSchema),
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
});

/** One locale-specific content head removed by an explicit tombstone. */
export const ContentDeleteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
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
  readonly upsertCount: number;
}) {
  if (
    (input.baseReleaseId === null) !== (input.baseManifestHash === null) ||
    input.baseReleaseId === input.releaseId ||
    input.deleteCount + input.upsertCount !== input.itemCount ||
    input.rollbackCount !== input.itemCount
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
  if (input.origin.kind === "git") {
    return true;
  }
  return (
    input.baseReleaseId === input.origin.releaseId &&
    input.releaseId !== input.origin.releaseId
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

const CONTENT_RELEASE_SIGNATURE_DOMAIN = "nakafa.aksara.content-release.v1";

/** Checks that every staged head has exactly one matching item and artifact. */
function hasCoherentVerificationCounts(input: {
  readonly baseManifestHash: typeof Sha256HashSchema.Type | null;
  readonly baseReleaseId: typeof ReleaseIdSchema.Type | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: typeof Sha256HashSchema.Type;
  readonly deleteHeads: number;
  readonly itemCount: number;
  readonly rollbackCount: number;
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
    input.stagedArtifacts === input.upsertHeads
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
  stagedArtifacts: ProjectionCountSchema,
  upsertHeads: ProjectionCountSchema,
}).pipe(
  Schema.filter(hasCoherentVerificationCounts, {
    message: () =>
      "Expected staged head and artifact counts to match the release items.",
  })
);
export type ReleaseVerificationEvidence =
  typeof ReleaseVerificationEvidenceSchema.Type;

/** Delta evidence returned after a release is staged and activated. */
export const PublicationReceiptSchema = Schema.Struct({
  activatedHeads: ProjectionCountSchema,
  deletedHeads: ProjectionCountSchema,
  manifestHash: Sha256HashSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  resultCount: ProjectionCountSchema,
  resultDigest: Sha256HashSchema,
  stagedArtifacts: ProjectionCountSchema,
  stagedItems: ProjectionCountSchema,
  stagedProjections: ProjectionCountSchema,
}).pipe(
  Schema.filter(
    (receipt) =>
      receipt.activatedHeads + receipt.deletedHeads === receipt.stagedItems &&
      receipt.stagedArtifacts === receipt.activatedHeads,
    {
      message: () =>
        "Expected activated head and artifact counts to match staged items.",
    }
  )
);
export type PublicationReceipt = typeof PublicationReceiptSchema.Type;

/** Serializes one change with stable fields for item digest computation. */
export function canonicalizeContentChange(change: ContentChange) {
  if (change.operation === "upsert") {
    return {
      contentKey: change.contentKey,
      delivery: change.delivery,
      locale: change.locale,
      operation: change.operation,
      ...(change.publicPath === undefined
        ? {}
        : { publicPath: change.publicPath }),
      artifactHash: change.artifactHash,
      rendererDomain: change.rendererDomain,
      sourcePath: change.sourcePath,
    };
  }

  return {
    contentKey: change.contentKey,
    locale: change.locale,
    operation: change.operation,
  };
}

/** Serializes one release item with stable identity, order, and content. */
export function canonicalizeContentReleaseItem(item: ContentReleaseItem) {
  return JSON.stringify({
    change: canonicalizeContentChange(item.change),
    index: item.index,
    releaseId: item.releaseId,
  });
}

/** Produces the stable JSON bytes used for release digest verification. */
export function canonicalizeContentReleaseManifest(
  manifest: ContentReleaseManifest
) {
  return JSON.stringify({
    baseManifestHash: manifest.baseManifestHash,
    baseReleaseId: manifest.baseReleaseId,
    baseResultCount: manifest.baseResultCount,
    baseResultDigest: manifest.baseResultDigest,
    deleteCount: manifest.deleteCount,
    itemCount: manifest.itemCount,
    itemsDigest: manifest.itemsDigest,
    origin: canonicalizeReleaseOrigin(manifest.origin),
    projectionCount: manifest.projectionCount,
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    rendererContractVersion: manifest.rendererContractVersion,
    rendererManifestHash: manifest.rendererManifestHash,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    rollbackCount: manifest.rollbackCount,
    rollbackDigest: manifest.rollbackDigest,
    upsertCount: manifest.upsertCount,
  });
}

/** Returns the domain-separated canonical bytes covered by release Ed25519. */
export function canonicalizeContentReleaseSigningInput(
  manifestHash: typeof Sha256HashSchema.Type,
  manifest: ContentReleaseManifest
) {
  return `${CONTENT_RELEASE_SIGNATURE_DOMAIN}\n${manifestHash}\n${canonicalizeContentReleaseManifest(manifest)}`;
}
