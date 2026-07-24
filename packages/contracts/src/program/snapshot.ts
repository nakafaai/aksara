import { Schema } from "effect";

import {
  type ContentLocaleList,
  ContentLocaleListSchema,
} from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { LearningProgramSchema } from "#contracts/program/spec";

/** Wire format for programs and exact localized curriculum routes. */
export const PROGRAM_SNAPSHOT_FORMAT = "program-v2";

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

const SnapshotFields = {
  ...ProgramCountFields,
  format: Schema.Literal(PROGRAM_SNAPSHOT_FORMAT),
  locales: ContentLocaleListSchema,
  rowDigest: Sha256HashSchema,
};

/** Checks aggregate arithmetic without coupling the wire format to one corpus. */
function hasCompleteProgramSnapshot(input: {
  readonly curriculumRowCount: number;
  readonly locales: ContentLocaleList;
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
export const ProgramSnapshotInputSchema = Schema.Struct(SnapshotFields).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
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
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshot = typeof ProgramSnapshotSchema.Type;
