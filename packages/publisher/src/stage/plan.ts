import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route/spec";
import type { StageOperation } from "@nakafa/aksara-contracts/transport/group";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, Stream } from "effect";
import {
  makeArtifactBatches,
  makeReleaseItemBatches,
  makeRouteBatches,
} from "#publisher/batching";
import type { PreparedContentRelease } from "#publisher/preparation/prepared";
import { makeProjectionBatches } from "#publisher/projection-batch";
import { makeSnapshotRequests } from "#publisher/publication/snapshots";
import type { PublicationTarget } from "#publisher/publication/spec";
import { makeStageGroups } from "#publisher/stage/group";

/** Stages every prepared stream through bounded authenticated request groups. */
export const stagePreparedRelease = Effect.fn(
  "AksaraPublisher.stagePreparedRelease"
)(function* <
  PreparedError,
  PreparedRequirements,
  ArtifactError,
  ArtifactRequirements,
  ItemError,
  ItemRequirements,
  ProjectionError,
  ProjectionRequirements,
  RouteError,
  RouteRequirements,
>(input: {
  readonly artifacts: Stream.Stream<
    SignedContentArtifact,
    ArtifactError,
    ArtifactRequirements
  >;
  readonly items: Stream.Stream<
    ContentReleaseItem,
    ItemError,
    ItemRequirements
  >;
  readonly prepared: PreparedContentRelease<
    PreparedError,
    PreparedRequirements
  >;
  readonly projections: Stream.Stream<
    ContentProjection,
    ProjectionError,
    ProjectionRequirements
  >;
  readonly routes: Stream.Stream<
    ContentRouteItem,
    RouteError,
    RouteRequirements
  >;
  readonly target: typeof PublicationTarget.Service;
  readonly tryoutRuntimeBundles: readonly SignedTryoutRuntimeBundle[];
}) {
  const { prepared } = input;
  const { releaseId } = prepared.manifest;
  const items = makeReleaseItemBatches(releaseId, input.items).pipe(
    Stream.map(
      (batch): StageOperation => ({ ...batch, operation: "stageItemBatch" })
    )
  );
  const projections = makeProjectionBatches(releaseId, input.projections).pipe(
    Stream.map(
      (batch): StageOperation => ({
        ...batch,
        operation: "stageProjectionBatch",
      })
    )
  );
  const routes = makeRouteBatches(releaseId, input.routes).pipe(
    Stream.map(
      (batch): StageOperation => ({ ...batch, operation: "stageRouteBatch" })
    )
  );
  const artifacts = makeArtifactBatches(releaseId, input.artifacts).pipe(
    Stream.map(
      (batch): StageOperation => ({
        ...batch,
        operation: "stageArtifactBatch",
      })
    )
  );
  const runtimeBundles = Stream.fromIterable(input.tryoutRuntimeBundles).pipe(
    Stream.map(
      (bundle): StageOperation => ({
        bundle,
        operation: "stageTryoutRuntimeBundle",
        releaseId,
      })
    )
  );
  const requests = Stream.concat(runtimeBundles, items).pipe(
    Stream.concat(projections),
    Stream.concat(routes),
    Stream.concat(artifacts),
    Stream.concat(makeSnapshotRequests(prepared))
  );
  yield* makeStageGroups(releaseId, requests).pipe(
    Stream.runForEach(input.target.stageGroup)
  );
});
