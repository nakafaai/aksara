import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { verifyCompiledContentSourceHash } from "@nakafa/aksara-contracts/artifact/source";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type ContentProjection,
  familyForProjection,
} from "@nakafa/aksara-contracts/projection/spec";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import {
  type RollbackSnapshotEntry,
  RollbackSnapshotEntrySchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { Effect, Schema, Stream } from "effect";
import {
  type CoherenceFieldSchema,
  PreparedContentCoherenceError,
  PreparedContentDecodeError,
  PreparedContentOrderError,
  PreparedContentReplayError,
} from "#publisher/preparation/errors";
import {
  type PreparedContentRecord,
  type PreparedContentStreamError,
  type PreparedContentTransition,
  PreparedContentTransitionSchema,
  type PreparedContentTransitionSource,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

interface RecordState {
  previous: PreparedContentRecord | undefined;
}

/** One item and its optional content projection derived in the same replay. */
export type DerivedContentRecord =
  | {
      readonly item: ContentReleaseItem;
      readonly kind: "delete";
      readonly rollback: RollbackSnapshotEntry;
    }
  | {
      readonly item: ContentReleaseItem;
      readonly kind: "upsert";
      readonly projection: ContentProjection;
      readonly rollback: RollbackSnapshotEntry;
    };

/** Narrows the nested operation to its complete authored upsert record. */
function isPreparedContentUpsert(
  record: PreparedContentRecord
): record is PreparedContentUpsert {
  return "payload" in record;
}

/** Finds the first identity field that disagrees across one upsert. */
function findCoherenceMismatch(
  record: PreparedContentUpsert,
  artifactHash: string
): typeof CoherenceFieldSchema.Type | undefined {
  const { change, payload, projection, source } = record;
  if (artifactHash !== change.artifactHash) {
    return "artifactHash";
  }
  if (
    payload.contentKey !== change.contentKey ||
    source.contentKey !== change.contentKey ||
    projection.contentKey !== change.contentKey
  ) {
    return "contentKey";
  }
  if (familyForProjection(projection) !== change.family) {
    return "family";
  }
  if (
    payload.locale !== change.locale ||
    source.locale !== change.locale ||
    projection.locale !== change.locale
  ) {
    return "locale";
  }
  if (
    payload.rendererDomain !== change.rendererDomain ||
    source.rendererDomain !== change.rendererDomain
  ) {
    return "rendererDomain";
  }
  if (source.sourcePath !== change.sourcePath) {
    return "sourcePath";
  }
  if (source.rawMdx !== payload.rawMdx) {
    return "rawMdx";
  }
}

/** Fails with the first field that breaks one authored upsert binding. */
function validateUpsert(record: PreparedContentUpsert, recordIndex: number) {
  const artifactHash = hashCompiledContentPayload(record.payload);
  const field = findCoherenceMismatch(record, artifactHash);
  if (field !== undefined) {
    return Effect.fail(
      new PreparedContentCoherenceError({ field, recordIndex })
    );
  }
  return verifyCompiledContentSourceHash(record.payload).pipe(
    Effect.as<PreparedContentRecord>(record)
  );
}

/** Proves one decoded record without narrowing the stream's union output. */
function validateRecordCoherence(
  record: PreparedContentRecord,
  recordIndex: number
): Effect.Effect<
  PreparedContentRecord,
  | Effect.Effect.Error<ReturnType<typeof verifyCompiledContentSourceHash>>
  | PreparedContentCoherenceError
> {
  if (!isPreparedContentUpsert(record)) {
    return Effect.succeed(record);
  }
  return validateUpsert(record, recordIndex);
}

/** Requires the prior snapshot to describe the same changed content head. */
function validatePriorState(
  transition: PreparedContentTransition,
  recordIndex: number
) {
  const { change } = transition.record;
  const identity =
    transition.prior.state === "absent"
      ? transition.prior
      : transition.prior.head;
  const matchesIdentity =
    identity.contentKey === change.contentKey &&
    identity.family === change.family &&
    identity.locale === change.locale;
  const validAbsence =
    transition.prior.state !== "absent" || change.operation === "upsert";
  if (matchesIdentity && validAbsence) {
    return validateRecordCoherence(transition.record, recordIndex).pipe(
      Effect.as(transition)
    );
  }
  return Effect.fail(
    new PreparedContentCoherenceError({
      field: "priorState",
      recordIndex,
    })
  );
}

/** Applies canonical content-head ordering. */
function validateOrder(
  state: RecordState,
  record: PreparedContentRecord,
  recordIndex: number
): Effect.Effect<PreparedContentRecord, PreparedContentOrderError> {
  if (
    state.previous &&
    compareContentHeads(state.previous.change, record.change) >= 0
  ) {
    return Effect.fail(new PreparedContentOrderError({ recordIndex }));
  }
  state.previous = record;
  return Effect.succeed(record);
}

/** Converts one proven record to its indexed release representation. */
function deriveRecord(
  transition: PreparedContentTransition,
  index: number,
  releaseId: ReleaseId
): DerivedContentRecord {
  const { record } = transition;
  const item = ContentReleaseItemSchema.make({
    change: record.change,
    index,
    releaseId,
  });
  const rollback = RollbackSnapshotEntrySchema.make({
    index,
    releaseId,
    snapshot: transition.prior,
  });
  if (!isPreparedContentUpsert(record)) {
    return { item, kind: "delete", rollback };
  }
  return { item, kind: "upsert", projection: record.projection, rollback };
}

/** Replays and derives one canonical stream without collecting the corpus. */
export function derivePreparedRecords<E, R>(input: {
  readonly records: PreparedContentTransitionSource<E, R>;
  readonly releaseId: ReleaseId;
}): Stream.Stream<DerivedContentRecord, PreparedContentStreamError<E>, R> {
  return Stream.unwrap(
    Effect.try({
      catch: (cause) => new PreparedContentReplayError({ cause }),
      try: input.records,
    }).pipe(
      Effect.map((records) => {
        const state: RecordState = { previous: undefined };
        return records.pipe(
          Stream.zipWithIndex,
          Stream.mapEffect(([source, recordIndex]) =>
            Schema.decodeUnknown(PreparedContentTransitionSchema)(source, {
              onExcessProperty: "error",
            }).pipe(
              Effect.mapError(
                () => new PreparedContentDecodeError({ recordIndex })
              ),
              Effect.flatMap((transition) =>
                validatePriorState(transition, recordIndex)
              ),
              Effect.flatMap((transition) =>
                validateOrder(state, transition.record, recordIndex).pipe(
                  Effect.as(transition)
                )
              ),
              Effect.map((transition) =>
                deriveRecord(transition, recordIndex, input.releaseId)
              )
            )
          )
        );
      })
    )
  );
}
