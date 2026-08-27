import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
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
import { verifyReleasePolicyTransition } from "@nakafa/aksara-contracts/release/policy";
import {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "@nakafa/aksara-contracts/release/result/digest";
import {
  createRollbackSnapshotDigest,
  finalizeRollbackSnapshotDigest,
  updateRollbackSnapshotDigest,
  verifyRollbackSnapshot,
} from "@nakafa/aksara-contracts/release/rollback/digest";
import { digestRoutes } from "@nakafa/aksara-contracts/release/route/digest";
import { verifyContentRoutes } from "@nakafa/aksara-contracts/release/route/verify";
import {
  type GitPublicationScope,
  type PublicationScope,
  publicationScopeSelectsSnapshot,
  verifyGitPublicationScope,
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  decodeContentSnapshotManifests,
  decodeContentSnapshotRows,
  verifyContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/verify";
import { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareReleaseBase } from "#publisher/preparation/base";
import { PreparedSnapshotScopeError } from "#publisher/preparation/errors";
import { makePreparedGitRelease } from "#publisher/preparation/prepared";
import { requireSnapshotProvenance } from "#publisher/preparation/provenance";
import { requirePublishedRendererDomain } from "#publisher/preparation/renderer";
import { validatePreparedTryoutRuntime } from "#publisher/preparation/runtime";
import type {
  PrepareContentRelease,
  PrepareContentReleaseInput,
  PreparedReleaseStreamError,
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

/** Rejects a replacement manifest outside the signed publication scope. */
function requireScopedSnapshot(
  scope: GitPublicationScope,
  family: Parameters<typeof publicationScopeSelectsSnapshot>[1]
) {
  if (publicationScopeSelectsSnapshot(scope, family)) {
    return Effect.void;
  }
  return Effect.fail(new PreparedSnapshotScopeError({ family }));
}

/**
 * Expands one Git selection into the stable signed scope wire shape.
 *
 * Git inputs cannot select predecessor-only exact content. Signed manifests
 * retain the explicit empty field so deployed decoders remain compatible.
 */
function makeSignedPublicationScope(
  scope: GitPublicationScope
): PublicationScope {
  return {
    content: [],
    families: scope.families,
    snapshots: scope.snapshots,
  };
}

/** Prepares a self-verified release from one replayable authored record source. */
export const prepareContentRelease: PrepareContentRelease = Effect.fn(
  "AksaraPublisher.prepareContentRelease"
)(function* <E, R>(input: PrepareContentReleaseInput<E, R>) {
  const scope = yield* verifyGitPublicationScope(input.scope);
  const basePolicy = yield* prepareReleaseBase(input);
  const rendererManifest = yield* validateLiveRendererManifestHash(
    input.rendererManifest
  );
  /** Replays strict replacement-manifest decoding and canonical order checks. */
  const snapshotManifests = decodeContentSnapshotManifests(
    input.snapshotManifests
  );
  /** Replays strict immutable-row decoding without retaining row bodies. */
  const snapshotRows = decodeContentSnapshotRows(input.snapshotRows);
  const decodedSnapshotManifests = yield* snapshotManifests.pipe(
    Stream.runCollect
  );
  yield* Effect.forEach(decodedSnapshotManifests, (snapshot) =>
    requireSnapshotProvenance(snapshot).pipe(
      Effect.andThen(requireScopedSnapshot(scope, snapshot.family))
    )
  );
  yield* verifyReleasePolicyTransition({
    basePolicy,
    manifests: decodedSnapshotManifests,
    policy: {
      activeAppLocales: ACTIVE_APP_LOCALES,
    },
    scope,
  });
  const snapshotSummary = yield* verifyContentSnapshots({
    manifests: input.snapshotManifests,
    previousSnapshots: input.previousSnapshots,
    rows: input.snapshotRows,
  });
  yield* validatePreparedTryoutRuntime({
    previousSnapshots: input.previousSnapshots,
    runtime: input.tryoutRuntime,
    snapshots: snapshotSummary.snapshots,
  });
  /** Replays strict decoding, coherence, ordering, and route validation. */
  const records = derivePreparedRecords({
    records: input.records,
    releaseId: input.releaseId,
  });
  /** Replays canonical release items from the proven record source. */
  const items = records.pipe(Stream.map((record) => record.item));
  /** Replays canonical projections from the same proven upsert records. */
  const projections = records.pipe(
    Stream.filter(isDerivedUpsert),
    Stream.map((record) => record.projection)
  );
  /** Replays canonical route versions derived from the same transitions. */
  const routes = makeRouteItems(input.releaseId, input.routes);
  /** Replays exact prior states from the same proven transition records. */
  const rollback = records.pipe(Stream.map((record) => record.rollback));
  const itemState = yield* createReleaseItemsDigest(input.releaseId);
  const projectionState = yield* createProjectionDigest(input.releaseId);
  const rollbackState = yield* createRollbackSnapshotDigest(input.releaseId);
  const resultState = yield* createResultCatalogDigest(input.releaseId);
  yield* records.pipe(
    Stream.runForEach((record) =>
      updateReleaseItemsDigest(input.releaseId, itemState, record.item).pipe(
        Effect.andThen(
          isDerivedUpsert(record)
            ? requirePublishedRendererDomain(
                record.payload,
                rendererManifest
              ).pipe(
                Effect.andThen(
                  updateProjectionDigest(
                    input.releaseId,
                    projectionState,
                    record.projection
                  )
                )
              )
            : Effect.void
        ),
        Effect.andThen(
          updateRollbackSnapshotDigest(
            input.releaseId,
            rollbackState,
            record.rollback
          )
        )
      )
    )
  );
  yield* input.result.pipe(
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
  const routeSummary = yield* digestRoutes(input.releaseId, routes);
  const manifest = ContentReleaseManifestSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    baseActiveAppLocales: input.baseActiveAppLocales,
    baseManifestHash: input.baseManifestHash,
    baseReleaseId: input.baseReleaseId,
    baseResultCount: input.baseResultCount,
    baseResultDigest: input.baseResultDigest,
    deleteCount: itemState.deleteCount,
    format: "localized-content-release",
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
    scope: makeSignedPublicationScope(scope),
    snapshots: snapshotSummary.snapshots,
    upsertCount: itemState.upsertCount,
  });
  yield* verifyContentReleaseItems({ items, manifest });
  yield* verifyContentProjections({ manifest, projections });
  yield* verifyContentRoutes({ manifest, routes });
  yield* verifyResultCatalog({
    expectedCount: manifest.resultCount,
    expectedDigest: manifest.resultDigest,
    heads: input.result,
    releaseId: manifest.releaseId,
  });
  yield* verifyRollbackSnapshot({ entries: rollback, manifest });
  return makePreparedGitRelease<PreparedReleaseStreamError<E>, R>({
    items,
    manifest,
    projections,
    rendererManifest,
    routes,
    snapshotManifests,
    snapshotRows,
    tryoutRuntime: input.tryoutRuntime,
  });
});
