import { assert } from "@effect/vitest";
import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import type { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
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
import type { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route/spec";
import type {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Array as Arr, MutableHashMap, MutableList, Option } from "effect";

/** Creates the empty lists that one release fills in stage order. */
function emptyStagedRows() {
  return {
    items: MutableList.make<ContentReleaseItem>(),
    projections: MutableList.make<typeof MaterialLessonProjectionSchema.Type>(),
    routes: MutableList.make<typeof ContentRouteItemSchema.Type>(),
    snapshotRows: MutableList.make<typeof ContentSnapshotRowSchema.Type>(),
    snapshots: MutableList.make<typeof ContentSnapshotManifestSchema.Type>(),
  };
}

type StagedRows = ReturnType<typeof emptyStagedRows>;

/** Builds terminal publication evidence from one exact signed release. */
export function releaseReceipt(
  release: SignedContentRelease
): PublicationReceipt {
  const { manifest } = release;
  return {
    activatedHeads: manifest.upsertCount,
    activeAppLocales: manifest.activeAppLocales,
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
    activeAppLocales: manifest.activeAppLocales,
    baseActiveAppLocales: manifest.baseActiveAppLocales,
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
  const artifacts = MutableHashMap.empty<string, SignedContentArtifact>();
  const rows = MutableHashMap.empty<string, StagedRows>();

  /** Retains immutable artifact bodies independently from release-owned rows. */
  const retainArtifacts = (values: Iterable<SignedContentArtifact>) => {
    for (const artifact of values) {
      MutableHashMap.set(artifacts, artifact.artifactHash, artifact);
    }
  };

  /** Returns release-owned staged rows, creating them on first write. */
  const forRelease = (releaseId: string) => {
    const existing = Option.getOrUndefined(MutableHashMap.get(rows, releaseId));
    if (existing) {
      return existing;
    }
    const created = emptyStagedRows();
    MutableHashMap.set(rows, releaseId, created);
    return created;
  };

  /** Confirms every release upsert still has its immutable artifact body. */
  const hasRetainedArtifacts = (releaseId: string) =>
    Arr.every(
      MutableList.toArray(forRelease(releaseId).items),
      ({ change }) =>
        change.operation === "delete" ||
        MutableHashMap.has(artifacts, change.artifactHash)
    );

  /** Returns one material head reconstructed from exact staged rows. */
  const materialHead = (item: ContentReleaseItem): MaterialHead | null => {
    if (item.change.operation === "delete") {
      return null;
    }
    const staged = forRelease(item.releaseId);
    const { change } = item;
    const artifact = Option.getOrUndefined(
      MutableHashMap.get(artifacts, change.artifactHash)
    );
    const projection = Option.getOrUndefined(
      Arr.findFirst(
        MutableList.toArray(staged.projections),
        (value) =>
          value.contentKey === change.contentKey &&
          value.artifactLocale === change.artifactLocale
      )
    );
    if (!(artifact && projection)) {
      return null;
    }
    return {
      artifactHash: artifact.artifactHash,
      artifactLocale: change.artifactLocale,
      compilerConfigHash: artifact.payload.compilerConfigHash,
      contentKey: change.contentKey,
      delivery: change.delivery,
      family: "material",
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
    if (request.family === "page") {
      return {
        ...request,
        done: true,
        family: "page",
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
    const heads = Arr.filter(
      Arr.map(
        MutableList.toArray(forRelease(request.activeReleaseId).items),
        materialHead
      ),
      (head) => head !== null
    );
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
    const projections = MutableList.toArray(staged.projections);
    const records = Arr.map(MutableList.toArray(staged.items), (item) => {
      const { change } = item;
      const head = materialHead(item);
      assert(
        head && change.operation === "upsert",
        "Expected one staged upsert rollback record."
      );
      const artifact = Option.getOrUndefined(
        MutableHashMap.get(artifacts, change.artifactHash)
      );
      const projection = Option.getOrUndefined(
        Arr.findFirst(
          projections,
          (value) =>
            value.contentKey === change.contentKey &&
            value.artifactLocale === change.artifactLocale
        )
      );
      assert(
        artifact && projection,
        "Expected complete staged rollback state."
      );
      return {
        current: { artifact, change, projection },
        index: item.index,
        prior: {
          change: {
            artifactLocale: change.artifactLocale,
            contentKey: change.contentKey,
            family: change.family,
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
    const records = Arr.map(
      MutableList.toArray(forRelease(request.rollbackOf).routes),
      (route) => ({
        current: route,
        priorContentKey: null,
      })
    );
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
