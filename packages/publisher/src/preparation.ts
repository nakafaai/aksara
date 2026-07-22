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
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { PreparedReleaseIdentityError } from "#publisher/preparation/errors";
import {
  makePreparedGitRelease,
  type PrepareContentRelease,
  type PrepareContentReleaseInput,
} from "#publisher/preparation/spec";
import {
  type DerivedContentRecord,
  derivePreparedRecords,
} from "#publisher/preparation/stream";

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
  const itemState = yield* createReleaseItemsDigest(input.releaseId);
  const projectionState = yield* createProjectionDigest(input.releaseId);
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
        )
      )
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
  const manifest = ContentReleaseManifestSchema.make({
    baseReleaseId: input.baseReleaseId,
    deleteCount: itemState.deleteCount,
    itemCount: itemState.count,
    itemsDigest,
    origin: { kind: "git", sha: input.aksaraSha },
    projectionCount: projectionState.count,
    projectionDigest,
    releaseId: input.releaseId,
    rendererContractVersion: rendererManifest.rendererContractVersion,
    rendererManifestHash: rendererManifest.hash,
    upsertCount: itemState.upsertCount,
  });
  yield* verifyContentReleaseItems({ items: items(), manifest });
  yield* verifyContentProjections({ manifest, projections: projections() });
  return makePreparedGitRelease({
    items,
    manifest,
    projections,
    rendererManifest,
  });
});
