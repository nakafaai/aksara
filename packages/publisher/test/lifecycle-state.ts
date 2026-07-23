import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import type { MaterialLessonProjection } from "@nakafa/aksara-contracts/projection/material";
import type {
  ContentReleaseItem,
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route";

interface StagedRows {
  readonly artifacts: SignedContentArtifact[];
  readonly items: ContentReleaseItem[];
  readonly projections: MaterialLessonProjection[];
  readonly routes: ContentRouteItem[];
}

/** Builds terminal publication evidence from one exact signed release. */
export function releaseReceipt(
  release: SignedContentRelease
): PublicationReceipt {
  const { manifest } = release;
  return {
    activatedHeads: manifest.upsertCount,
    deletedHeads: manifest.deleteCount,
    manifestHash: release.manifestHash,
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    routeDigest: manifest.routeDigest,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
    stagedRoutes: manifest.routeCount,
  };
}

/** Builds target-side verification evidence from one signed manifest. */
export function releaseEvidence(
  release: Pick<SignedContentRelease, "manifest" | "manifestHash">
) {
  const { manifest } = release;
  return {
    baseManifestHash: manifest.baseManifestHash,
    baseReleaseId: manifest.baseReleaseId,
    baseResultCount: manifest.baseResultCount,
    baseResultDigest: manifest.baseResultDigest,
    deleteHeads: manifest.deleteCount,
    itemCount: manifest.itemCount,
    itemsDigest: manifest.itemsDigest,
    manifestHash: release.manifestHash,
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
    stagedArtifacts: manifest.upsertCount,
    stagedRoutes: manifest.routeCount,
    upsertHeads: manifest.upsertCount,
  };
}

/** Owns staged rows and derives exact material heads for one isolated target. */
export function createLifecycleRows() {
  const rows = new Map<string, StagedRows>();

  /** Returns release-owned staged rows, creating them on first write. */
  const forRelease = (releaseId: string) => {
    const existing = rows.get(releaseId);
    if (existing) {
      return existing;
    }
    const created: StagedRows = {
      artifacts: [],
      items: [],
      projections: [],
      routes: [],
    };
    rows.set(releaseId, created);
    return created;
  };

  /** Returns one material head reconstructed from exact staged rows. */
  const materialHead = (item: ContentReleaseItem): MaterialHead | null => {
    if (item.change.operation === "delete") {
      return null;
    }
    const staged = forRelease(item.releaseId);
    const { change } = item;
    const artifact = staged.artifacts.find(
      (value) => value.artifactHash === change.artifactHash
    );
    const projection = staged.projections.find(
      (value) =>
        value.contentKey === change.contentKey && value.locale === change.locale
    );
    if (!(artifact && projection)) {
      return null;
    }
    return {
      artifactHash: artifact.artifactHash,
      compilerConfigHash: artifact.payload.compilerConfigHash,
      contentKey: change.contentKey,
      delivery: change.delivery,
      locale: change.locale,
      projectionHash: hashMaterialProjection(projection),
      publicPath: projection.publicPath,
      rendererDomain: change.rendererDomain,
      sourceHash: artifact.payload.sourceHash,
      sourcePath: change.sourcePath,
    };
  };

  return { forRelease, materialHead };
}
