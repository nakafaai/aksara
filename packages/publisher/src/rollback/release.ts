import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  createProjectionDigest,
  finalizeProjectionDigest,
  updateProjectionDigest,
} from "@nakafa/aksara-contracts/projection/digest";
import { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import {
  createReleaseItemsDigest,
  finalizeReleaseItemsDigest,
  updateReleaseItemsDigest,
} from "@nakafa/aksara-contracts/release/digest";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "@nakafa/aksara-contracts/release/result-digest";
import { RollbackSnapshotEntrySchema } from "@nakafa/aksara-contracts/release/rollback";
import {
  createRollbackSnapshotDigest,
  finalizeRollbackSnapshotDigest,
  updateRollbackSnapshotDigest,
  verifyRollbackSnapshot,
} from "@nakafa/aksara-contracts/release/rollback-digest";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route";
import { digestRoutes } from "@nakafa/aksara-contracts/release/route-digest";
import { verifyContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Stream } from "effect";
import {
  makePreparedRollbackRelease,
  type PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import type { ReplaySpoolError } from "#publisher/replay/error";
import {
  rollbackItemStream,
  rollbackProjectionStream,
  rollbackSnapshotStream,
} from "#publisher/rollback/proof";
import {
  type DerivedRollbackRecord,
  isDerivedRollbackUpsert,
  snapshotRollbackState,
} from "#publisher/rollback/records";

/** Exact active identity and root replaced by one rollback release. */
export interface RollbackBaseCatalog {
  readonly manifestHash: Sha256Hash;
  readonly releaseId: ReleaseId;
  readonly resultCount: number;
  readonly resultDigest: Sha256Hash;
  readonly snapshots: ContentSnapshotSet;
}

/** Complete inputs for signing one already-authenticated rollback transition. */
export interface BuildRollbackReleaseInput<E, R> {
  readonly base: RollbackBaseCatalog;
  /** Replays authenticated rollback transitions for release derivation. */
  readonly records: () => Stream.Stream<
    DerivedRollbackRecord,
    ReplaySpoolError
  >;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: RendererManifestEnvelope;
  /** Replays the complete catalog produced by applying this rollback. */
  readonly result: () => Stream.Stream<ContentHead, E, R>;
  /** Replays independent inverse route ownership changes. */
  readonly routes: () => Stream.Stream<ContentRouteItem, ReplaySpoolError>;
}

type BuildRollbackReleaseError<E, R> =
  | E
  | Effect.Effect.Error<ReturnType<typeof createProjectionDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeProjectionDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateProjectionDigest>>
  | Effect.Effect.Error<ReturnType<typeof createReleaseItemsDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeReleaseItemsDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateReleaseItemsDigest>>
  | Effect.Effect.Error<ReturnType<typeof createResultCatalogDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeResultCatalogDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateResultCatalogDigest>>
  | Effect.Effect.Error<ReturnType<typeof createRollbackSnapshotDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeRollbackSnapshotDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateRollbackSnapshotDigest>>
  | Effect.Effect.Error<
      ReturnType<typeof digestRoutes<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof verifyContentReleaseItems<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof verifyContentProjections<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<ReturnType<typeof verifyResultCatalog<E, R>>>
  | Effect.Effect.Error<
      ReturnType<typeof verifyRollbackSnapshot<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof verifyContentRoutes<ReplaySpoolError, never>>
    >;

type BuildRollbackRelease = <E, R>(
  input: BuildRollbackReleaseInput<E, R>
) => Effect.Effect<
  PreparedRollbackRelease<ReplaySpoolError, never>,
  BuildRollbackReleaseError<E, R>,
  R
>;

/** Derives and self-verifies one new rollback release manifest and streams. */
export const buildRollbackRelease: BuildRollbackRelease = Effect.fn(
  "AksaraPublisher.buildRollbackRelease"
)(function* <E, R>(input: BuildRollbackReleaseInput<E, R>) {
  /** Replays canonical prior-state release items. */
  const items = () => rollbackItemStream(input.records, "prior");
  /** Replays canonical prior-state content projections. */
  const projections = () => rollbackProjectionStream(input.records, "prior");
  /** Replays current states as the next rollback snapshot. */
  const rollback = () =>
    rollbackSnapshotStream(input.records, input.releaseId, "current");
  /** Replays canonical route changes that restore each prior state. */
  const { routes } = input;
  /** Replays authenticated prior-state content artifacts. */
  const artifacts = () =>
    input.records().pipe(
      Stream.map((record) => record.prior),
      Stream.filter(isDerivedRollbackUpsert),
      Stream.map((state) => state.artifact)
    );
  const itemState = yield* createReleaseItemsDigest(input.releaseId);
  const projectionState = yield* createProjectionDigest(input.releaseId);
  const resultState = yield* createResultCatalogDigest(input.releaseId);
  const rollbackState = yield* createRollbackSnapshotDigest(input.releaseId);
  yield* input.records().pipe(
    Stream.runForEach((record) => {
      const { prior } = record;
      return updateReleaseItemsDigest(
        input.releaseId,
        itemState,
        prior.item
      ).pipe(
        Effect.zipRight(
          isDerivedRollbackUpsert(prior)
            ? updateProjectionDigest(
                input.releaseId,
                projectionState,
                prior.projection
              )
            : Effect.void
        ),
        Effect.zipRight(
          updateRollbackSnapshotDigest(
            input.releaseId,
            rollbackState,
            RollbackSnapshotEntrySchema.make({
              index: record.current.item.index,
              releaseId: input.releaseId,
              snapshot: snapshotRollbackState(record.current),
            })
          )
        )
      );
    })
  );
  yield* input
    .result()
    .pipe(
      Stream.runForEach((head) =>
        updateResultCatalogDigest(input.releaseId, resultState, head)
      )
    );
  const itemsDigest = yield* finalizeReleaseItemsDigest(
    input.releaseId,
    itemState
  );
  const projectionDigest = yield* finalizeProjectionDigest(
    input.releaseId,
    projectionState
  );
  const resultDigest = yield* finalizeResultCatalogDigest(
    input.releaseId,
    resultState
  );
  const rollbackDigest = yield* finalizeRollbackSnapshotDigest(
    input.releaseId,
    rollbackState
  );
  const routeSummary = yield* digestRoutes(input.releaseId, routes());
  const manifest = ContentReleaseManifestSchema.make({
    baseManifestHash: input.base.manifestHash,
    baseReleaseId: input.base.releaseId,
    baseResultCount: input.base.resultCount,
    baseResultDigest: input.base.resultDigest,
    deleteCount: itemState.deleteCount,
    itemCount: itemState.count,
    itemsDigest,
    origin: { kind: "rollback", releaseId: input.base.releaseId },
    projectionCount: projectionState.count,
    projectionDigest,
    releaseId: input.releaseId,
    rendererContractVersion: input.rendererManifest.rendererContractVersion,
    rendererManifestHash: input.rendererManifest.hash,
    resultCount: resultState.count,
    resultDigest,
    rollbackCount: rollbackState.count,
    rollbackDigest,
    routeCount: routeSummary.count,
    routeDigest: routeSummary.digest,
    snapshots: input.base.snapshots,
    upsertCount: itemState.upsertCount,
  });
  yield* verifyContentReleaseItems({ items: items(), manifest });
  yield* verifyContentProjections({ manifest, projections: projections() });
  yield* verifyContentRoutes({ manifest, routes: routes() });
  yield* verifyResultCatalog({
    expectedCount: manifest.resultCount,
    expectedDigest: manifest.resultDigest,
    heads: input.result(),
    releaseId: manifest.releaseId,
  });
  yield* verifyRollbackSnapshot({ entries: rollback(), manifest });
  return makePreparedRollbackRelease({
    artifacts,
    items,
    manifest,
    projections,
    rendererManifest: input.rendererManifest,
    routes,
    snapshotManifests: () => Stream.empty,
    snapshotRows: () => Stream.empty,
  });
});
