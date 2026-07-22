import { Schema } from "effect";
import {
  canonicalizeSignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  ContentKeySchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  canonicalizeMaterialProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import {
  canonicalizeMaterialHead,
  MaterialHeadSchema,
} from "#contracts/release/head";
import {
  ContentDeleteSchema,
  ContentUpsertSchema,
  canonicalizeContentChange,
  ReleaseItemIndexSchema,
} from "#contracts/release/spec";

/** Maximum body-bearing rollback transitions returned by one target page. */
export const MAX_ROLLBACK_PAGE_RECORDS = 8;

const RollbackCursorSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-1)
);

/** Explicit proof that a changed content head did not previously exist. */
export const RollbackAbsentStateSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  locale: ContentUpsertSchema.fields.locale,
  state: Schema.Literal("absent"),
});
export type RollbackAbsentState = typeof RollbackAbsentStateSchema.Type;

/** Compact authoritative prior head protected by one rollback snapshot digest. */
export const RollbackMaterialStateSchema = Schema.Struct({
  head: MaterialHeadSchema,
  state: Schema.Literal("material"),
});
export type RollbackMaterialState = typeof RollbackMaterialStateSchema.Type;

/** Complete compact state vocabulary authenticated for one future rollback. */
export const RollbackSnapshotStateSchema = Schema.Union(
  RollbackAbsentStateSchema,
  RollbackMaterialStateSchema
);
export type RollbackSnapshotState = typeof RollbackSnapshotStateSchema.Type;

/** One ordered prior state covered by a signed release's rollback digest. */
export const RollbackSnapshotEntrySchema = Schema.Struct({
  index: ReleaseItemIndexSchema,
  releaseId: ReleaseIdSchema,
  snapshot: RollbackSnapshotStateSchema,
});
export type RollbackSnapshotEntry = typeof RollbackSnapshotEntrySchema.Type;

/** Serializes one authenticated prior state for incremental digest computation. */
export function canonicalizeRollbackSnapshotEntry(
  entry: RollbackSnapshotEntry
) {
  const snapshot =
    entry.snapshot.state === "absent"
      ? `{"contentKey":${JSON.stringify(entry.snapshot.contentKey)},"locale":${JSON.stringify(entry.snapshot.locale)},"state":"absent"}`
      : `{"head":${canonicalizeMaterialHead(entry.snapshot.head)},"state":"material"}`;
  return `{"index":${entry.index},"releaseId":${JSON.stringify(entry.releaseId)},"snapshot":${snapshot}}`;
}

/** Checks identity coherence across one upsert, artifact, and projection. */
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

/** Complete body-bearing state for one existing material head. */
export const RollbackUpsertStateSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  change: ContentUpsertSchema,
  projection: MaterialLessonProjectionSchema,
}).pipe(
  Schema.filter(hasBoundRollbackUpsert, {
    message: () =>
      "Expected rollback change, artifact, and projection identities to match.",
  })
);
export type RollbackUpsertState = typeof RollbackUpsertStateSchema.Type;

/** Body-free state proving that one locale-specific head is absent. */
export const RollbackDeleteStateSchema = Schema.Struct({
  change: ContentDeleteSchema,
});
export type RollbackDeleteState = typeof RollbackDeleteStateSchema.Type;

/** Complete full-state vocabulary used by one rollback transition. */
export const RollbackStateSchema = Schema.Union(
  RollbackUpsertStateSchema,
  RollbackDeleteStateSchema
);
export type RollbackState = typeof RollbackStateSchema.Type;

/** Checks that current and prior states describe the same content head. */
function hasBoundRollbackTransition(input: {
  readonly current: RollbackState;
  readonly prior: RollbackState;
}) {
  return (
    input.current.change.contentKey === input.prior.change.contentKey &&
    input.current.change.locale === input.prior.change.locale
  );
}

/** Authenticated source state paired with the exact prior state it replaced. */
export const RollbackRecordSchema = Schema.Struct({
  current: RollbackStateSchema,
  index: ReleaseItemIndexSchema,
  prior: RollbackStateSchema,
}).pipe(
  Schema.filter(hasBoundRollbackTransition, {
    message: () =>
      "Expected rollback current and prior states to share one identity.",
  })
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
  rollbackOfManifestHash: Sha256HashSchema,
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

/** Strict bounded response carrying current and exact prior release states. */
export const RollbackPageSchema = Schema.Struct({
  done: Schema.Boolean,
  nextIndex: RollbackCursorSchema,
  records: Schema.Array(RollbackRecordSchema).pipe(
    Schema.maxItems(MAX_ROLLBACK_PAGE_RECORDS)
  ),
  rollbackOf: ReleaseIdSchema,
  rollbackOfManifestHash: Sha256HashSchema,
  total: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
}).pipe(
  Schema.filter(hasCoherentRollbackPage, {
    message: () =>
      "Expected one contiguous rollback page with coherent progress evidence.",
  })
);
export type RollbackPage = typeof RollbackPageSchema.Type;

/** Narrows one full rollback state to its signed prior upsert body. */
export function isRollbackUpsert(
  state: RollbackState
): state is RollbackUpsertState {
  return "artifact" in state;
}

/** Serializes one complete rollback state in stable wire field order. */
function canonicalizeRollbackState(state: RollbackState) {
  const change = JSON.stringify(canonicalizeContentChange(state.change));
  if (!isRollbackUpsert(state)) {
    return `{"change":${change}}`;
  }
  return `{"artifact":${canonicalizeSignedContentArtifact(state.artifact)},"change":${change},"projection":${canonicalizeMaterialProjection(state.projection)}}`;
}

/** Serializes one rollback transition in stable wire field order. */
export function canonicalizeRollbackRecord(record: RollbackRecord) {
  return `{"current":${canonicalizeRollbackState(record.current)},"index":${record.index},"prior":${canonicalizeRollbackState(record.prior)}}`;
}

/** Serializes the complete body-bearing page for an exact byte ceiling. */
export function canonicalizeRollbackPage(page: RollbackPage) {
  return `{"done":${page.done},"nextIndex":${page.nextIndex},"records":[${page.records
    .map(canonicalizeRollbackRecord)
    .join(
      ","
    )}],"rollbackOfManifestHash":${JSON.stringify(page.rollbackOfManifestHash)},"rollbackOf":${JSON.stringify(page.rollbackOf)},"total":${page.total}}`;
}
