import { Array as Arr, Effect, Schema, Stream } from "effect";

import { CatalogRowSchema, catalogRowIdentity } from "#contracts/assessment/catalog";
import { ItemExplanationSchema } from "#contracts/assessment/explanation";
import { canonicalJson } from "#contracts/assessment/hash";
import {
  ItemFamilySchema,
  ItemVersionSchema,
} from "#contracts/assessment/item";
import { ItemKeySchema } from "#contracts/assessment/key";
import { PaperSchema } from "#contracts/assessment/paper";
import { ExamProfileSchema } from "#contracts/assessment/profile";
import { StimulusVersionSchema } from "#contracts/assessment/stimulus";
import { DigestStream } from "#contracts/hash/stream";
import { hashText } from "#contracts/hash/text";
import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";
import { compareCodeUnits } from "#contracts/text/order";

/** Semantic wire identity of the assessment snapshot. */
export const ASSESSMENT_SNAPSHOT_FORMAT = "assessment-snapshot";

/** Separates the hash of one snapshot row from the hash of any other record. */
const ROW_DOMAIN = "nakafa.aksara.assessment-row";

/** Separates the digest of the rows of a snapshot from any other digest. */
const ROWS_DOMAIN = "nakafa.aksara.assessment-rows";

/** Separates the identity of a snapshot from the hash of any other record. */
const SNAPSHOT_DOMAIN = "nakafa.aksara.assessment-snapshot";

/**
 * Every row of an assessment snapshot, by kind, in the order a snapshot
 * streams them: the catalog first, then the profiles and papers it names,
 * then the items, their readings, keys, and explanations.
 */
export const AssessmentRowSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("catalog"), row: CatalogRowSchema }),
  Schema.Struct({
    hash: Sha256HashSchema,
    kind: Schema.Literal("profile"),
    profile: ExamProfileSchema,
  }),
  Schema.Struct({
    hash: Sha256HashSchema,
    kind: Schema.Literal("paper"),
    paper: PaperSchema,
  }),
  Schema.Struct({ family: ItemFamilySchema, kind: Schema.Literal("family") }),
  Schema.Struct({ kind: Schema.Literal("item"), version: ItemVersionSchema }),
  Schema.Struct({
    kind: Schema.Literal("stimulus"),
    version: StimulusVersionSchema,
  }),
  Schema.Struct({ key: ItemKeySchema, kind: Schema.Literal("key") }),
  Schema.Struct({
    explanation: ItemExplanationSchema,
    kind: Schema.Literal("explanation"),
  }),
]);
export type AssessmentRow = typeof AssessmentRowSchema.Type;
export type AssessmentRowKind = AssessmentRow["kind"];

/** The kinds of row in the order a snapshot streams them. */
export const ASSESSMENT_ROW_KINDS = Arr.map(
  AssessmentRowSchema.members,
  ({ fields }) => fields.kind.literal
);

/** One row bound to the hash of its canonical encoding. */
export const AssessmentRecordSchema = Schema.Struct({
  row: AssessmentRowSchema,
  rowHash: Sha256HashSchema,
});
export type AssessmentRecord = typeof AssessmentRecordSchema.Type;

const NonNegativeCountSchema = Schema.Int.check(
  Schema.isGreaterThanOrEqualTo(0)
);

/** How many rows of each kind one snapshot holds. */
export const AssessmentCountsSchema = Schema.Struct({
  catalog: NonNegativeCountSchema,
  explanation: NonNegativeCountSchema,
  family: NonNegativeCountSchema,
  item: NonNegativeCountSchema,
  key: NonNegativeCountSchema,
  paper: NonNegativeCountSchema,
  profile: NonNegativeCountSchema,
  stimulus: NonNegativeCountSchema,
});
export type AssessmentCounts = typeof AssessmentCountsSchema.Type;

const SnapshotFactFields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  counts: AssessmentCountsSchema,
  rowDigest: Sha256HashSchema,
};

/** The facts of a snapshot that its identity covers. */
export const AssessmentSnapshotFactsSchema = Schema.Struct(SnapshotFactFields);
export type AssessmentSnapshotFacts = typeof AssessmentSnapshotFactsSchema.Type;

/** One content-addressed assessment snapshot, selected by a release. */
export const AssessmentSnapshotSchema = Schema.Struct({
  ...SnapshotFactFields,
  format: Schema.Literal(ASSESSMENT_SNAPSHOT_FORMAT),
  snapshotId: Sha256HashSchema,
});
export type AssessmentSnapshot = typeof AssessmentSnapshotSchema.Type;

/**
 * The identity of one row, unique within its kind, which orders the rows of a
 * kind in a snapshot: a catalog node, a profile or a paper by identifier, a
 * family by identifier, a version by its family or reading and its language, a
 * key by the version it answers, and an explanation by its version and
 * language.
 */
export function assessmentRowIdentity(row: AssessmentRow) {
  if (row.kind === "catalog") {
    return catalogRowIdentity(row.row);
  }
  if (row.kind === "profile") {
    return row.profile.id;
  }
  if (row.kind === "paper") {
    return row.paper.id;
  }
  if (row.kind === "family") {
    return row.family.id;
  }
  if (row.kind === "item") {
    return `${row.version.family}\0${row.version.deliveryLanguage}`;
  }
  if (row.kind === "stimulus") {
    return `${row.version.id}\0${row.version.deliveryLanguage}`;
  }
  if (row.kind === "key") {
    return row.key.version;
  }
  return `${row.explanation.version}\0${row.explanation.language}`;
}

/** Orders two rows as a snapshot streams them: by kind, then by identity. */
export function compareAssessmentRows(left: AssessmentRow, right: AssessmentRow) {
  const byKind =
    ASSESSMENT_ROW_KINDS.indexOf(left.kind) -
    ASSESSMENT_ROW_KINDS.indexOf(right.kind);
  return byKind === 0
    ? compareCodeUnits(assessmentRowIdentity(left), assessmentRowIdentity(right))
    : Math.sign(byKind);
}

/** Computes the hash of one row from its canonical encoding. */
export const hashAssessmentRow = Effect.fn("AksaraContracts.hashAssessmentRow")(
  function* (row: AssessmentRow) {
    return yield* hashText(`${ROW_DOMAIN}\n${yield* canonicalJson(row)}`);
  }
);

/** A row stream is out of canonical order, holds a row twice, or carries a wrong hash. */
export class AssessmentRowsError extends Schema.TaggedError<
  AssessmentRowsError,
  { readonly brand: unique symbol }
>()("AssessmentRowsError", {
  identity: Schema.String,
  kind: Schema.Literals(ASSESSMENT_ROW_KINDS),
  reason: Schema.Literals(["hash", "order"]),
}) {}

/** The running state of a digest over a row stream. */
interface DigestState {
  readonly counts: AssessmentCounts;
  readonly previous: AssessmentRow | undefined;
  readonly stream: DigestStream;
}

/**
 * Digests one row stream in canonical order. Each row must carry the hash of
 * its own canonical encoding and follow the row before it, so a stream that
 * is tampered, duplicated, or unsorted fails. Returns the count of each kind
 * and the digest over every row.
 */
export const digestAssessmentRows = Effect.fn(
  "AksaraContracts.digestAssessmentRows"
)(function* <E, R>(records: Stream.Stream<AssessmentRecord, E, R>) {
  const stream = new DigestStream();
  stream.add(`${ROWS_DOMAIN}\n`);
  const initial: DigestState = {
    counts: Schema.decodeSync(AssessmentCountsSchema)({
      catalog: 0,
      explanation: 0,
      family: 0,
      item: 0,
      key: 0,
      paper: 0,
      profile: 0,
      stimulus: 0,
    }),
    previous: undefined,
    stream,
  };
  const state = yield* records.pipe(
    Stream.runFoldEffect(
      () => initial,
      (current, record) =>
        Effect.gen(function* () {
          const identity = assessmentRowIdentity(record.row);
          if (
            current.previous !== undefined &&
            compareAssessmentRows(current.previous, record.row) >= 0
          ) {
            return yield* new AssessmentRowsError({
              identity,
              kind: record.row.kind,
              reason: "order",
            });
          }
          const canonical = yield* canonicalJson(record.row);
          if ((yield* hashText(`${ROW_DOMAIN}\n${canonical}`)) !== record.rowHash) {
            return yield* new AssessmentRowsError({
              identity,
              kind: record.row.kind,
              reason: "hash",
            });
          }
          current.stream.add(`${canonical}\0${record.rowHash}\n`);
          return {
            counts: {
              ...current.counts,
              [record.row.kind]: current.counts[record.row.kind] + 1,
            },
            previous: record.row,
            stream: current.stream,
          };
        })
    )
  );
  return { counts: state.counts, rowDigest: yield* state.stream.digest() };
});

/** Creates one complete content-addressed snapshot from its facts. */
export const makeAssessmentSnapshot = Effect.fn(
  "AksaraContracts.makeAssessmentSnapshot"
)(function* (facts: AssessmentSnapshotFacts) {
  const snapshotId = yield* hashText(
    `${SNAPSHOT_DOMAIN}\n${yield* canonicalJson(facts)}`
  );
  return AssessmentSnapshotSchema.make({
    ...facts,
    format: ASSESSMENT_SNAPSHOT_FORMAT,
    snapshotId,
  });
});

/** Counts every row of a snapshot. */
export function assessmentRowCount(counts: AssessmentCounts) {
  return Arr.reduce(
    ASSESSMENT_ROW_KINDS,
    0,
    (total, kind) => total + counts[kind]
  );
}
