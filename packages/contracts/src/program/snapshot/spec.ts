import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  HistoricalAppLocaleListSchema,
} from "#contracts/locale";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { LearningProgramSchema } from "#contracts/program/spec";

/** Wire format for programs and exact localized curriculum routes. */
export const PROGRAM_SNAPSHOT_FORMAT = "program-v3";

/** Current wire format with active locales and editorial review identity. */
export const PROGRAM_SNAPSHOT_V4_FORMAT = "program-v4";

const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const ProgramCountFields = {
  curriculumRowCount: CountSchema,
  programRowCount: CountSchema,
  rowCount: CountSchema,
  sitemapCount: CountSchema,
  slugCount: CountSchema,
};

/** Source-derived row counts checked against each complete program replay. */
export const ProgramCountsSchema = Schema.Struct(ProgramCountFields);
export type ProgramCounts = typeof ProgramCountsSchema.Type;

/** Hashed immutable learning-program catalog record. */
export const LearningProgramRecordSchema = Schema.Struct({
  kind: Schema.Literal("program"),
  row: LearningProgramSchema,
  rowHash: Sha256HashSchema,
});

/** Hashed immutable localized curriculum-route record. */
export const CurriculumRouteRecordSchema = Schema.Struct({
  kind: Schema.Literal("curriculum"),
  row: CurriculumRouteSchema,
  rowHash: Sha256HashSchema,
});

/** One discriminated record staged inside the aggregate program snapshot. */
export const ProgramSnapshotRowSchema = Schema.Union(
  LearningProgramRecordSchema,
  CurriculumRouteRecordSchema
);
export type ProgramSnapshotRow = typeof ProgramSnapshotRowSchema.Type;

const SnapshotV3Fields = {
  ...ProgramCountFields,
  format: Schema.Literal(PROGRAM_SNAPSHOT_FORMAT),
  locales: HistoricalAppLocaleListSchema,
  rowDigest: Sha256HashSchema,
};

/** Checks aggregate arithmetic without coupling the wire format to one corpus. */
function hasCompleteProgramSnapshot(input: {
  readonly curriculumRowCount: number;
  readonly locales: readonly string[];
  readonly programRowCount: number;
  readonly rowCount: number;
  readonly sitemapCount: number;
  readonly slugCount: number;
}) {
  return (
    input.programRowCount > 0 &&
    input.slugCount === input.programRowCount * input.locales.length &&
    input.rowCount === input.programRowCount + input.curriculumRowCount &&
    input.sitemapCount <= input.curriculumRowCount
  );
}

/** Canonical program snapshot facts before content-addressed identity. */
export const ProgramSnapshotInputSchema = Schema.Struct(SnapshotV3Fields).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshotInput = typeof ProgramSnapshotInputSchema.Type;

/** Content-addressed aggregate program snapshot selected by one release. */
export const ProgramSnapshotSchema = Schema.Struct({
  ...SnapshotV3Fields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshot = typeof ProgramSnapshotSchema.Type;

const SnapshotV4Fields = {
  ...ProgramCountFields,
  activeAppLocales: ActiveAppLocaleListSchema,
  editorialReviewDigest: Sha256HashSchema,
  format: Schema.Literal(PROGRAM_SNAPSHOT_V4_FORMAT),
  rowDigest: Sha256HashSchema,
};

/** Adapts v4 fields to shared aggregate arithmetic. */
function hasCompleteProgramSnapshotV4(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly curriculumRowCount: number;
  readonly programRowCount: number;
  readonly rowCount: number;
  readonly sitemapCount: number;
  readonly slugCount: number;
}) {
  return hasCompleteProgramSnapshot({
    ...input,
    locales: input.activeAppLocales,
  });
}

/** Canonical v4 program facts before content-addressed identity. */
export const ProgramSnapshotV4InputSchema = Schema.Struct(
  SnapshotV4Fields
).pipe(
  Schema.filter(hasCompleteProgramSnapshotV4, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshotV4Input = typeof ProgramSnapshotV4InputSchema.Type;

/** Content-addressed v4 program snapshot selected by one release. */
export const ProgramSnapshotV4Schema = Schema.Struct({
  ...SnapshotV4Fields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteProgramSnapshotV4, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshotV4 = typeof ProgramSnapshotV4Schema.Type;

/** Historical and current program snapshot decoder for retained consumers. */
export const ProgramSnapshotWireSchema = Schema.Union(
  ProgramSnapshotSchema,
  ProgramSnapshotV4Schema
);
export type ProgramSnapshotWire = typeof ProgramSnapshotWireSchema.Type;
