import type { Sha256HashSchema } from "#contracts/ids";
import { canonicalizeReleaseOrigin } from "#contracts/release/origin";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const CONTENT_RELEASE_SIGNATURE_DOMAIN = "nakafa.aksara.content-release.v1";

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
