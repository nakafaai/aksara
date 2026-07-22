import { verifyCompiledContentSourceHash } from "@nakafaai/aksara-contracts/artifact/source";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import type { ReleaseId } from "@nakafaai/aksara-contracts/ids";
import type { MaterialLessonProjection } from "@nakafaai/aksara-contracts/projection/material";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  compareContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema, Stream } from "effect";
import {
  type CoherenceFieldSchema,
  PreparedContentCoherenceError,
  PreparedContentDecodeError,
  PreparedContentOrderError,
  PreparedContentReplayError,
  PreparedContentRouteError,
} from "#publisher/preparation/errors";
import {
  type PreparedContentRecord,
  PreparedContentRecordSchema,
  type PreparedContentRecordSource,
  type PreparedContentStreamError,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

interface RecordState {
  readonly firstIndexByRoute: Map<string, number>;
  previous: PreparedContentRecord | undefined;
}

/** One item and its optional material projection derived in the same replay. */
export type DerivedContentRecord =
  | { readonly item: ContentReleaseItem; readonly kind: "delete" }
  | {
      readonly item: ContentReleaseItem;
      readonly kind: "upsert";
      readonly projection: MaterialLessonProjection;
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
  if (change.publicPath !== projection.publicPath) {
    return "publicPath";
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

/** Applies canonical ordering and locale-specific route uniqueness. */
function validateOrder(
  state: RecordState,
  record: PreparedContentRecord,
  recordIndex: number
): Effect.Effect<
  PreparedContentRecord,
  PreparedContentOrderError | PreparedContentRouteError
> {
  if (
    state.previous &&
    compareContentChanges(state.previous.change, record.change) >= 0
  ) {
    return Effect.fail(new PreparedContentOrderError({ recordIndex }));
  }
  state.previous = record;
  if (!isPreparedContentUpsert(record)) {
    return Effect.succeed(record);
  }
  const identity = `${record.change.locale}\0${record.change.publicPath}`;
  if (state.firstIndexByRoute.has(identity)) {
    return Effect.fail(
      new PreparedContentRouteError({
        publicPath: record.projection.publicPath,
        recordIndex,
      })
    );
  }
  state.firstIndexByRoute.set(identity, recordIndex);
  return Effect.succeed(record);
}

/** Converts one proven record to its indexed release representation. */
function deriveRecord(
  record: PreparedContentRecord,
  index: number,
  releaseId: ReleaseId
): DerivedContentRecord {
  const item = ContentReleaseItemSchema.make({
    change: record.change,
    index,
    releaseId,
  });
  if (!isPreparedContentUpsert(record)) {
    return { item, kind: "delete" };
  }
  return { item, kind: "upsert", projection: record.projection };
}

/** Replays and derives one canonical stream without collecting the corpus. */
export function derivePreparedRecords<E, R>(input: {
  readonly records: PreparedContentRecordSource<E, R>;
  readonly releaseId: ReleaseId;
}): Stream.Stream<DerivedContentRecord, PreparedContentStreamError<E>, R> {
  return Stream.unwrap(
    Effect.try({
      catch: (cause) => new PreparedContentReplayError({ cause }),
      try: input.records,
    }).pipe(
      Effect.map((records) => {
        const state: RecordState = {
          firstIndexByRoute: new Map(),
          previous: undefined,
        };
        return records.pipe(
          Stream.zipWithIndex,
          Stream.mapEffect(([source, recordIndex]) =>
            Schema.decodeUnknown(PreparedContentRecordSchema)(source, {
              onExcessProperty: "error",
            }).pipe(
              Effect.mapError(
                () => new PreparedContentDecodeError({ recordIndex })
              ),
              Effect.flatMap((record) =>
                validateRecordCoherence(record, recordIndex)
              ),
              Effect.flatMap((record) =>
                validateOrder(state, record, recordIndex)
              ),
              Effect.map((record) =>
                deriveRecord(record, recordIndex, input.releaseId)
              )
            )
          )
        );
      })
    )
  );
}
