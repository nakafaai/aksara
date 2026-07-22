import { Schema } from "effect";
import {
  canonicalizeSignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  canonicalizeMaterialProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import {
  ContentDeleteSchema,
  ContentUpsertSchema,
  canonicalizeContentChange,
  ReleaseItemIndexSchema,
} from "#contracts/release/spec";

/** Maximum body-bearing rollback records returned by one target page. */
export const MAX_ROLLBACK_PAGE_RECORDS = 8;

const RollbackCursorSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-1)
);

/** Checks identity coherence across one prior change, artifact, and projection. */
function hasBoundRollbackUpsert(input: {
  readonly artifact: typeof SignedContentArtifactSchema.Type;
  readonly change: typeof ContentUpsertSchema.Type;
  readonly projection: typeof MaterialLessonProjectionSchema.Type;
}) {
  const { artifact, change, projection } = input;
  const { payload } = artifact;
  return (
    artifact.artifactHash === change.artifactHash &&
    payload.contentKey === change.contentKey &&
    payload.locale === change.locale &&
    payload.rendererDomain === change.rendererDomain &&
    projection.contentKey === change.contentKey &&
    projection.locale === change.locale &&
    projection.publicPath === change.publicPath
  );
}

/** Exact prior upsert state restored without changing its signed artifact. */
export const RollbackUpsertSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  change: ContentUpsertSchema,
  index: ReleaseItemIndexSchema,
  projection: MaterialLessonProjectionSchema,
}).pipe(
  Schema.filter(hasBoundRollbackUpsert, {
    message: () =>
      "Expected rollback change, artifact, and projection identities to match.",
  })
);
export type RollbackUpsert = typeof RollbackUpsertSchema.Type;

/** Body-free tombstone that removes a head created by the source release. */
export const RollbackDeleteSchema = Schema.Struct({
  change: ContentDeleteSchema,
  index: ReleaseItemIndexSchema,
});
export type RollbackDelete = typeof RollbackDeleteSchema.Type;

/** Complete prior-state record vocabulary for one forward rollback. */
export const RollbackRecordSchema = Schema.Union(
  RollbackUpsertSchema,
  RollbackDeleteSchema
);
export type RollbackRecord = typeof RollbackRecordSchema.Type;

/** Indexed request for one bounded page from the exact active release. */
export const RollbackPageRequestSchema = Schema.Struct({
  afterIndex: RollbackCursorSchema,
  limit: Schema.Number.pipe(
    Schema.int(),
    Schema.between(1, MAX_ROLLBACK_PAGE_RECORDS)
  ),
  rollbackOf: ReleaseIdSchema,
});
export type RollbackPageRequest = typeof RollbackPageRequestSchema.Type;

/** Checks that one response describes a real final or progressing page. */
function hasCoherentRollbackPage(page: {
  readonly done: boolean;
  readonly nextIndex: number;
  readonly records: readonly RollbackRecord[];
  readonly total: number;
}) {
  const [first] = page.records;
  const last = page.records.at(-1);
  if (!(first && last)) {
    return page.done && page.nextIndex === -1 && page.total === 0;
  }
  const hasContiguousRecords = page.records.every(
    (record, offset) => record.index === first.index + offset
  );
  return (
    hasContiguousRecords &&
    last.index === page.nextIndex &&
    page.nextIndex < page.total &&
    page.done === (page.nextIndex + 1 === page.total)
  );
}

/** Strict bounded response carrying exact prior changes and artifact bodies. */
export const RollbackPageSchema = Schema.Struct({
  done: Schema.Boolean,
  nextIndex: RollbackCursorSchema,
  records: Schema.Array(RollbackRecordSchema).pipe(
    Schema.maxItems(MAX_ROLLBACK_PAGE_RECORDS)
  ),
  rollbackOf: ReleaseIdSchema,
  total: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
}).pipe(
  Schema.filter(hasCoherentRollbackPage, {
    message: () =>
      "Expected one contiguous rollback page with coherent progress evidence.",
  })
);
export type RollbackPage = typeof RollbackPageSchema.Type;

/** Serializes one rollback record in stable signed-wire field order. */
export function canonicalizeRollbackRecord(record: RollbackRecord) {
  const change = JSON.stringify(canonicalizeContentChange(record.change));
  if (!("artifact" in record)) {
    return `{"change":${change},"index":${record.index}}`;
  }
  return `{"artifact":${canonicalizeSignedContentArtifact(record.artifact)},"change":${change},"index":${record.index},"projection":${canonicalizeMaterialProjection(record.projection)}}`;
}

/** Serializes the complete body-bearing page for an exact byte ceiling. */
export function canonicalizeRollbackPage(page: RollbackPage) {
  return `{"done":${page.done},"nextIndex":${page.nextIndex},"records":[${page.records
    .map(canonicalizeRollbackRecord)
    .join(
      ","
    )}],"rollbackOf":${JSON.stringify(page.rollbackOf)},"total":${page.total}}`;
}

/** Narrows one rollback record to its exact signed prior upsert state. */
export function isRollbackUpsert(
  record: RollbackRecord
): record is RollbackUpsert {
  return "artifact" in record;
}
