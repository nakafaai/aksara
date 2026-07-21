import { Schema } from "effect";
import { ContentKindSchema, ContentLocaleSchema } from "./content.js";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "./ids.js";
import { RENDERER_CONTRACT_VERSION } from "./renderer.js";

/** One immutable artifact selected for a locale-specific content head. */
export const ContentUpsertSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  kind: ContentKindSchema,
  locale: ContentLocaleSchema,
  operation: Schema.Literal("upsert"),
  publicPath: Schema.optional(PublicPathSchema),
});

/** One locale-specific content head removed by an explicit tombstone. */
export const ContentDeleteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  kind: ContentKindSchema,
  locale: ContentLocaleSchema,
  operation: Schema.Literal("delete"),
  publicPath: Schema.optional(PublicPathSchema),
});

/** Complete tagged change vocabulary accepted by a v1 release. */
export const ContentChangeSchema = Schema.Union(
  ContentUpsertSchema,
  ContentDeleteSchema
);
export type ContentChange = typeof ContentChangeSchema.Type;

/** Compares release changes by their stable content-head identity. */
export function compareContentChanges(
  left: ContentChange,
  right: ContentChange
) {
  if (left.contentKey < right.contentKey) {
    return -1;
  }
  if (left.contentKey > right.contentKey) {
    return 1;
  }
  if (left.locale < right.locale) {
    return -1;
  }
  if (left.locale > right.locale) {
    return 1;
  }
  return 0;
}

/** Sorts release changes by content key and then locale. */
export function sortContentChanges(changes: readonly ContentChange[]) {
  return [...changes].sort(compareContentChanges);
}

const ReleaseItemIndexSchema = Schema.Number.pipe(
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

/** Assigns deterministic release identity and order to canonical changes. */
export function indexContentChanges(
  releaseId: typeof ReleaseIdSchema.Type,
  changes: readonly ContentChange[]
) {
  return sortContentChanges(changes).map((change, index) =>
    ContentReleaseItemSchema.make({ change, index, releaseId })
  );
}

const ProjectionCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Expected total read-model counts after atomic release activation. */
export const ContentProjectionCountsSchema = Schema.Struct({
  artifacts: ProjectionCountSchema,
  graphRows: ProjectionCountSchema,
  heads: ProjectionCountSchema,
  llmsDocuments: ProjectionCountSchema,
  routes: ProjectionCountSchema,
  searchRows: ProjectionCountSchema,
  sitemapEntries: ProjectionCountSchema,
});
export type ContentProjectionCounts = typeof ContentProjectionCountsSchema.Type;

/** Deterministic desired-state transition for one content release. */
export const ContentReleaseManifestSchema = Schema.Struct({
  aksaraSha: GitCommitShaSchema,
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  expectedCounts: ContentProjectionCountsSchema,
  expectedDigest: Sha256HashSchema,
  itemCount: ProjectionCountSchema,
  itemsDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  rendererManifestHash: Sha256HashSchema,
});
export type ContentReleaseManifest = typeof ContentReleaseManifestSchema.Type;

/** Immutable release manifest plus its asymmetric authenticity proof. */
export const SignedContentReleaseSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  manifest: ContentReleaseManifestSchema,
  manifestHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedContentRelease = typeof SignedContentReleaseSchema.Type;

export const CONTENT_RELEASE_SIGNATURE_DOMAIN =
  "nakafa.aksara.content-release.v1";

export const CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN =
  "nakafa.aksara.content-release-items.v1";

/** Pre-activation evidence proving the fully staged release is coherent. */
export const ReleaseVerificationEvidenceSchema = Schema.Struct({
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  deleteHeads: ProjectionCountSchema,
  itemCount: ProjectionCountSchema,
  itemsDigest: Sha256HashSchema,
  projectionDigest: Sha256HashSchema,
  recomputedProjectionCounts: ContentProjectionCountsSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  rendererManifestHash: Sha256HashSchema,
  stagedArtifacts: ProjectionCountSchema,
  upsertHeads: ProjectionCountSchema,
});
export type ReleaseVerificationEvidence =
  typeof ReleaseVerificationEvidenceSchema.Type;

/** Delta evidence returned after a release is staged and activated. */
export const PublicationReceiptSchema = Schema.Struct({
  activatedHeads: ProjectionCountSchema,
  deletedHeads: ProjectionCountSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  stagedArtifacts: ProjectionCountSchema,
  stagedItems: ProjectionCountSchema,
});
export type PublicationReceipt = typeof PublicationReceiptSchema.Type;

/** Serializes one change with stable fields for item digest computation. */
export function canonicalizeContentChange(change: ContentChange) {
  if (change.operation === "upsert") {
    return {
      contentKey: change.contentKey,
      kind: change.kind,
      locale: change.locale,
      operation: change.operation,
      ...(change.publicPath === undefined
        ? {}
        : { publicPath: change.publicPath }),
      artifactHash: change.artifactHash,
    };
  }

  return {
    contentKey: change.contentKey,
    kind: change.kind,
    locale: change.locale,
    operation: change.operation,
    ...(change.publicPath === undefined
      ? {}
      : { publicPath: change.publicPath }),
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
    aksaraSha: manifest.aksaraSha,
    baseReleaseId: manifest.baseReleaseId,
    expectedCounts: {
      artifacts: manifest.expectedCounts.artifacts,
      graphRows: manifest.expectedCounts.graphRows,
      heads: manifest.expectedCounts.heads,
      llmsDocuments: manifest.expectedCounts.llmsDocuments,
      routes: manifest.expectedCounts.routes,
      searchRows: manifest.expectedCounts.searchRows,
      sitemapEntries: manifest.expectedCounts.sitemapEntries,
    },
    expectedDigest: manifest.expectedDigest,
    itemCount: manifest.itemCount,
    itemsDigest: manifest.itemsDigest,
    releaseId: manifest.releaseId,
    rendererContractVersion: manifest.rendererContractVersion,
    rendererManifestHash: manifest.rendererManifestHash,
  });
}

/** Returns the domain-separated canonical bytes covered by release Ed25519. */
export function canonicalizeContentReleaseSigningInput(
  manifestHash: typeof Sha256HashSchema.Type,
  manifest: ContentReleaseManifest
) {
  return `${CONTENT_RELEASE_SIGNATURE_DOMAIN}\n${manifestHash}\n${canonicalizeContentReleaseManifest(manifest)}`;
}
