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
import { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "@nakafa/aksara-contracts/release/result-digest";
import {
  createRollbackSnapshotDigest,
  finalizeRollbackSnapshotDigest,
  updateRollbackSnapshotDigest,
  verifyRollbackSnapshot,
} from "@nakafa/aksara-contracts/release/rollback-digest";
import { digestRoutes } from "@nakafa/aksara-contracts/release/route-digest";
import { verifyContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import {
  PreparedReleaseBaseIdentityError,
  PreparedReleaseIdentityError,
} from "#publisher/preparation/errors";
import {
  makePreparedGitRelease,
  type PrepareContentRelease,
  type PrepareContentReleaseInput,
} from "#publisher/preparation/spec";
import {
  type DerivedContentRecord,
  derivePreparedRecords,
} from "#publisher/preparation/stream";
import { makeRouteItems } from "#publisher/routes";

/** Narrows one derived record to the material projection it owns. */
function isDerivedUpsert(
  record: DerivedContentRecord
): record is Extract<DerivedContentRecord, { readonly kind: "upsert" }> {
  return record.kind === "upsert";
}

/** Prepares a self-verified release from one replayable authored record source. */
export const prepareContentRelease: PrepareContentRelease = Effect.fn(
  "AksaraPublisher.prepareContentRelease"
)(function* <E, R>(input: PrepareContentReleaseInput<E, R>) {
  if ((input.baseReleaseId === null) !== (input.baseManifestHash === null)) {
    return yield* new PreparedReleaseBaseIdentityError({
      baseManifestHash: input.baseManifestHash,
      baseReleaseId: input.baseReleaseId,
    });
  }
  if (input.baseReleaseId === input.releaseId) {
    return yield* new PreparedReleaseIdentityError({
      baseReleaseId: input.baseReleaseId,
      releaseId: input.releaseId,
    });
  }
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  /** Replays strict decoding, coherence, ordering, and route validation. */
  const records = () =>
    derivePreparedRecords({
      records: input.records,
      releaseId: input.releaseId,
    });
  /** Replays canonical release items from the proven record source. */
  const items = () => records().pipe(Stream.map((record) => record.item));
  /** Replays canonical projections from the same proven upsert records. */
  const projections = () =>
    records().pipe(
      Stream.filter(isDerivedUpsert),
      Stream.map((record) => record.projection)
    );
  /** Replays canonical route versions derived from the same transitions. */
  const routes = () => makeRouteItems(input.releaseId, input.routes());
  /** Replays exact prior states from the same proven transition records. */
  const rollback = () =>
    records().pipe(Stream.map((record) => record.rollback));
  const itemState = yield* createReleaseItemsDigest(input.releaseId);
  const projectionState = yield* createProjectionDigest(input.releaseId);
  const rollbackState = yield* createRollbackSnapshotDigest(input.releaseId);
  const resultState = yield* createResultCatalogDigest(input.releaseId);
  yield* records().pipe(
    Stream.runForEach((record) =>
      updateReleaseItemsDigest(input.releaseId, itemState, record.item).pipe(
        Effect.zipRight(
          isDerivedUpsert(record)
            ? updateProjectionDigest(
                input.releaseId,
                projectionState,
                record.projection
              )
            : Effect.void
        ),
        Effect.zipRight(
          updateRollbackSnapshotDigest(
            input.releaseId,
            rollbackState,
            record.rollback
          )
        )
      )
    )
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
  const rollbackDigest = yield* finalizeRollbackSnapshotDigest(
    input.releaseId,
    rollbackState
  );
  const resultDigest = yield* finalizeResultCatalogDigest(
    input.releaseId,
    resultState
  );
  const routeSummary = yield* digestRoutes(input.releaseId, routes());
  const manifest = ContentReleaseManifestSchema.make({
    baseManifestHash: input.baseManifestHash,
    baseReleaseId: input.baseReleaseId,
    baseResultCount: input.baseResultCount,
    baseResultDigest: input.baseResultDigest,
    deleteCount: itemState.deleteCount,
    itemCount: itemState.count,
    itemsDigest,
    origin: { kind: "git", sha: input.aksaraSha },
    projectionCount: projectionState.count,
    projectionDigest,
    releaseId: input.releaseId,
    rendererContractVersion: rendererManifest.rendererContractVersion,
    rendererManifestHash: rendererManifest.hash,
    resultCount: resultState.count,
    resultDigest,
    rollbackCount: rollbackState.count,
    rollbackDigest,
    routeCount: routeSummary.count,
    routeDigest: routeSummary.digest,
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
  return makePreparedGitRelease({
    items,
    manifest,
    projections,
    rendererManifest,
    routes,
  });
});
