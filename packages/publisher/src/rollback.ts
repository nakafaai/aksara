import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
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
import {
  makePreparedRollbackRelease,
  type PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import { RollbackIdentityError } from "#publisher/rollback/errors";
import {
  deriveRollbackRecords,
  isDerivedRollbackUpsert,
} from "#publisher/rollback/records";
import { streamRollbackRecords } from "#publisher/rollback/stream";

type RollbackSourceStream = ReturnType<typeof streamRollbackRecords>;

type RollbackRecordStream = ReturnType<
  typeof deriveRollbackRecords<
    Stream.Stream.Error<RollbackSourceStream>,
    Stream.Stream.Context<RollbackSourceStream>
  >
>;

type RollbackStreamError = Stream.Stream.Error<RollbackRecordStream>;
type RollbackStreamContext = Stream.Stream.Context<RollbackRecordStream>;

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

type ItemDigestError =
  | Effect.Effect.Error<ReturnType<typeof createReleaseItemsDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeReleaseItemsDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateReleaseItemsDigest>>;

type ProjectionDigestError =
  | Effect.Effect.Error<ReturnType<typeof createProjectionDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeProjectionDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateProjectionDigest>>;

type ItemVerificationError = Effect.Effect.Error<
  ReturnType<
    typeof verifyContentReleaseItems<RollbackStreamError, RollbackStreamContext>
  >
>;

type ProjectionVerificationError = Effect.Effect.Error<
  ReturnType<
    typeof verifyContentProjections<RollbackStreamError, RollbackStreamContext>
  >
>;

/** Exact active release and new identity for one forward rollback. */
export interface PrepareRollbackInput {
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
  readonly rollbackOf: ReleaseId;
}

/** Every typed failure surfaced while preparing one forward rollback. */
export type PrepareRollbackError =
  | ItemDigestError
  | ItemVerificationError
  | ProjectionDigestError
  | ProjectionVerificationError
  | RendererManifestError
  | RollbackIdentityError
  | RollbackStreamError;

/** Complete Effect interface for one bounded forward rollback preparation. */
export type PrepareRollback = (
  input: PrepareRollbackInput
) => Effect.Effect<
  PreparedRollbackRelease<RollbackStreamError, RollbackStreamContext>,
  PrepareRollbackError,
  RollbackStreamContext
>;

/** Prepares one self-verified forward rollback from bounded target pages. */
export const prepareRollback: PrepareRollback = Effect.fn(
  "AksaraPublisher.prepareRollback"
)(function* (input: PrepareRollbackInput) {
  if (input.releaseId === input.rollbackOf) {
    return yield* new RollbackIdentityError({
      releaseId: input.releaseId,
      rollbackOf: input.rollbackOf,
    });
  }
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  /** Replays strict pages and authenticates every old artifact envelope. */
  const records = () =>
    deriveRollbackRecords({
      records: streamRollbackRecords(input.rollbackOf),
      releaseId: input.releaseId,
      rendererManifest,
    });
  /** Replays canonical forward-release items from the same prior records. */
  const items = () => records().pipe(Stream.map((record) => record.item));
  /** Replays only projections restored by authenticated prior upserts. */
  const projections = () =>
    records().pipe(
      Stream.filter(isDerivedRollbackUpsert),
      Stream.map((record) => record.projection)
    );
  /** Replays exact unchanged signed envelopes from those same upserts. */
  const artifacts = () =>
    records().pipe(
      Stream.filter(isDerivedRollbackUpsert),
      Stream.map((record) => record.artifact)
    );
  const itemState = yield* createReleaseItemsDigest(input.releaseId);
  const projectionState = yield* createProjectionDigest(input.releaseId);
  yield* records().pipe(
    Stream.runForEach((record) =>
      updateReleaseItemsDigest(input.releaseId, itemState, record.item).pipe(
        Effect.zipRight(
          isDerivedRollbackUpsert(record)
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
    baseReleaseId: input.rollbackOf,
    itemCount: itemState.count,
    itemsDigest,
    origin: { kind: "rollback", releaseId: input.rollbackOf },
    projectionCount: projectionState.count,
    projectionDigest,
    releaseId: input.releaseId,
    rendererContractVersion: rendererManifest.rendererContractVersion,
    rendererManifestHash: rendererManifest.hash,
  });
  yield* verifyContentReleaseItems({ items: items(), manifest });
  yield* verifyContentProjections({ manifest, projections: projections() });
  return makePreparedRollbackRelease({
    artifacts,
    items,
    manifest,
    projections,
    rendererManifest,
  });
});
