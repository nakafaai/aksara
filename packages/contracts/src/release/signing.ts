import type { Sha256HashSchema } from "#contracts/ids";
import type { ContentReleaseManifestV2 } from "#contracts/release/manifest/v2";
import { canonicalizeReleaseOrigin } from "#contracts/release/origin";
import {
  canonicalizeContentSnapshotSet,
  canonicalizePublicationScope,
} from "#contracts/release/snapshot/spec";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const CONTENT_RELEASE_SIGNATURE_DOMAIN = "nakafa.aksara.content-release.v1";
const CONTENT_RELEASE_V2_SIGNATURE_DOMAIN = "nakafa.aksara.content-release.v2";

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
    routeCount: manifest.routeCount,
    routeDigest: manifest.routeDigest,
    scope: canonicalizePublicationScope(manifest.scope),
    snapshots: canonicalizeContentSnapshotSet(manifest.snapshots),
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

/** Produces stable current manifest bytes including locale review identity. */
export function canonicalizeContentReleaseManifestV2(
  manifest: ContentReleaseManifestV2
) {
  return JSON.stringify({
    activeAppLocales: manifest.activeAppLocales,
    baseManifestHash: manifest.baseManifestHash,
    baseReleaseId: manifest.baseReleaseId,
    baseResultCount: manifest.baseResultCount,
    baseResultDigest: manifest.baseResultDigest,
    deleteCount: manifest.deleteCount,
    editorialReviewDigest: manifest.editorialReviewDigest,
    format: manifest.format,
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
    routeCount: manifest.routeCount,
    routeDigest: manifest.routeDigest,
    scope: canonicalizePublicationScope(manifest.scope),
    snapshots: canonicalizeContentSnapshotSet(manifest.snapshots),
    upsertCount: manifest.upsertCount,
  });
}

/** Returns domain-separated current release bytes covered by Ed25519. */
export function canonicalizeContentReleaseV2SigningInput(
  manifestHash: typeof Sha256HashSchema.Type,
  manifest: ContentReleaseManifestV2
) {
  return `${CONTENT_RELEASE_V2_SIGNATURE_DOMAIN}\n${manifestHash}\n${canonicalizeContentReleaseManifestV2(manifest)}`;
}
