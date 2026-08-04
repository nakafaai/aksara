import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import type { MaterialLessonProjection } from "@nakafa/aksara-contracts/projection/material";
import type {
  ContentReleaseItem,
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type {
  HeadPage,
  HeadPageRequest,
  MaterialHead,
} from "@nakafa/aksara-contracts/release/head";
import type {
  RollbackPage,
  RollbackPageRequest,
} from "@nakafa/aksara-contracts/release/rollback/spec";
import type {
  RoutePage,
  RoutePageRequest,
} from "@nakafa/aksara-contracts/release/route/page";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot/spec";

interface StagedRows {
  readonly items: ContentReleaseItem[];
  readonly projections: MaterialLessonProjection[];
  readonly routes: ContentRouteItem[];
  readonly snapshotRows: ContentSnapshotRow[];
  readonly snapshots: ContentSnapshotManifest[];
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
    snapshots: manifest.snapshots,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
    stagedRoutes: manifest.routeCount,
    stagedSnapshotRows: snapshotRowCount(manifest.snapshots),
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
    snapshots: manifest.snapshots,
    stagedArtifacts: manifest.upsertCount,
    stagedRoutes: manifest.routeCount,
    stagedSnapshotRows: snapshotRowCount(manifest.snapshots),
    upsertHeads: manifest.upsertCount,
  };
}

/** Owns staged rows and derives exact material heads for one isolated target. */
export function createLifecycleRows() {
  const artifacts = new Map<string, SignedContentArtifact>();
  const rows = new Map<string, StagedRows>();

  /** Retains immutable artifact bodies independently from release-owned rows. */
  const retainArtifacts = (values: Iterable<SignedContentArtifact>) => {
    for (const artifact of values) {
      artifacts.set(artifact.artifactHash, artifact);
    }
  };

  /** Returns release-owned staged rows, creating them on first write. */
  const forRelease = (releaseId: string) => {
    const existing = rows.get(releaseId);
    if (existing) {
      return existing;
    }
    const created: StagedRows = {
      items: [],
      projections: [],
      routes: [],
      snapshotRows: [],
      snapshots: [],
    };
    rows.set(releaseId, created);
    return created;
  };

  /** Confirms every release upsert still has its immutable artifact body. */
  const hasRetainedArtifacts = (releaseId: string) =>
    forRelease(releaseId).items.every(
      ({ change }) =>
        change.operation === "delete" || artifacts.has(change.artifactHash)
    );

  /** Returns one material head reconstructed from exact staged rows. */
  const materialHead = (item: ContentReleaseItem): MaterialHead | null => {
    if (item.change.operation === "delete") {
      return null;
    }
    const staged = forRelease(item.releaseId);
    const { change } = item;
    const artifact = artifacts.get(change.artifactHash);
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
      family: "material",
      locale: change.locale,
      projectionHash: hashContentProjection(projection),
      publicPath: projection.publicPath,
      rendererDomain: change.rendererDomain,
      sourceHash: artifact.payload.sourceHash,
      sourcePath: change.sourcePath,
    };
  };

  /** Derives one complete family-owned head page from staged target rows. */
  const headPage = (request: HeadPageRequest): HeadPage => {
    if (request.family === "article") {
      return {
        ...request,
        done: true,
        family: "article",
        heads: [],
        nextCursor: null,
      };
    }
    if (request.family === "question") {
      return {
        ...request,
        done: true,
        family: "question",
        heads: [],
        nextCursor: null,
      };
    }
    const heads = forRelease(request.activeReleaseId)
      .items.map(materialHead)
      .filter((head) => head !== null);
    return {
      ...request,
      done: true,
      family: "material",
      heads,
      nextCursor: null,
    };
  };

  /** Reconstructs exact current and prior states from one staged release. */
  const rollbackPage = (request: RollbackPageRequest): RollbackPage => {
    const staged = forRelease(request.rollbackOf);
    const records = staged.items.map((item) => {
      const { change } = item;
      const head = materialHead(item);
      if (!(head && change.operation === "upsert")) {
        throw new TypeError("Expected one staged upsert rollback record.");
      }
      const artifact = artifacts.get(change.artifactHash);
      const projection = staged.projections.find(
        (value) =>
          value.contentKey === change.contentKey &&
          value.locale === change.locale
      );
      if (!(artifact && projection)) {
        throw new TypeError("Expected complete staged rollback state.");
      }
      return {
        current: { artifact, change, projection },
        index: item.index,
        prior: {
          change: {
            contentKey: change.contentKey,
            family: change.family,
            locale: change.locale,
            operation: "delete" as const,
          },
        },
      };
    });
    return {
      done: true,
      nextIndex: records.length - 1,
      records,
      rollbackOf: request.rollbackOf,
      rollbackOfManifestHash: request.rollbackOfManifestHash,
      total: records.length,
    };
  };

  /** Pairs staged routes with the empty prior owner used by this target. */
  const routePage = (request: RoutePageRequest): RoutePage => {
    const records = forRelease(request.rollbackOf).routes.map((route) => ({
      current: route,
      priorContentKey: null,
    }));
    return {
      done: true,
      nextIndex: records.length - 1,
      records,
      rollbackOf: request.rollbackOf,
      rollbackOfManifestHash: request.rollbackOfManifestHash,
      total: records.length,
    };
  };

  return {
    forRelease,
    hasRetainedArtifacts,
    headPage,
    retainArtifacts,
    rollbackPage,
    routePage,
  };
}
