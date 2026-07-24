import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { LearningProgramSchema } from "#contracts/program/spec";

/** Wire format for programs and exact localized curriculum routes. */
export const PROGRAM_SNAPSHOT_FORMAT = "program-v2" as const;

/** Exact number of source-controlled learning programs in this format. */
export const PROGRAM_ROW_COUNT = 6;

/** Exact number of localized curriculum routes in the reviewed corpus. */
export const CURRICULUM_ROW_COUNT = 390;

/** Exact en/id public-slug identities authenticated by every snapshot. */
export const PROGRAM_SLUG_COUNT = PROGRAM_ROW_COUNT * 2;

/** Exact number of learner-renderable curriculum routes in the reviewed corpus. */
export const PROGRAM_SITEMAP_COUNT = 52;

const CountSchema = Schema.Int.pipe(Schema.nonNegative());

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

const SnapshotFields = {
  curriculumRowCount: CountSchema,
  format: Schema.Literal(PROGRAM_SNAPSHOT_FORMAT),
  locales: Schema.Tuple(Schema.Literal("en"), Schema.Literal("id")),
  programRowCount: CountSchema,
  rowCount: CountSchema,
  rowDigest: Sha256HashSchema,
  sitemapCount: CountSchema,
  slugCount: CountSchema,
};

/** Checks fixed program coverage and aggregate count arithmetic. */
function hasCompleteProgramSnapshot(input: {
  readonly curriculumRowCount: number;
  readonly programRowCount: number;
  readonly rowCount: number;
  readonly sitemapCount: number;
  readonly slugCount: number;
}) {
  return (
    input.programRowCount === PROGRAM_ROW_COUNT &&
    input.curriculumRowCount === CURRICULUM_ROW_COUNT &&
    input.slugCount === PROGRAM_SLUG_COUNT &&
    input.rowCount === input.programRowCount + input.curriculumRowCount &&
    input.sitemapCount === PROGRAM_SITEMAP_COUNT
  );
}

/** Canonical program snapshot facts before content-addressed identity. */
export const ProgramSnapshotInputSchema = Schema.Struct(SnapshotFields).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected six program rows and a complete aggregate curriculum route set.",
  })
);
export type ProgramSnapshotInput = typeof ProgramSnapshotInputSchema.Type;

/** Content-addressed aggregate program snapshot selected by one release. */
export const ProgramSnapshotSchema = Schema.Struct({
  ...SnapshotFields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected six program rows and a complete aggregate curriculum route set.",
  })
);
export type ProgramSnapshot = typeof ProgramSnapshotSchema.Type;
