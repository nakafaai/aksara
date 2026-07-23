import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { LearningProgramSchema } from "#contracts/program/spec";

/** Wire format for the reviewed six-row learning-program catalog. */
export const PROGRAM_SNAPSHOT_FORMAT = "program-v1" as const;

/** Exact number of source-controlled learning programs in this format. */
export const PROGRAM_ROW_COUNT = 6;

/** Exact en/id public-slug identities authenticated by every snapshot. */
export const PROGRAM_SLUG_COUNT = PROGRAM_ROW_COUNT * 2;

const CountSchema = Schema.Int.pipe(Schema.nonNegative());

/** Hashed immutable program row accepted by structured publication storage. */
export const ProgramSnapshotRowSchema = Schema.Struct({
  row: LearningProgramSchema,
  rowHash: Sha256HashSchema,
});
export type ProgramSnapshotRow = typeof ProgramSnapshotRowSchema.Type;

const SnapshotFields = {
  format: Schema.Literal(PROGRAM_SNAPSHOT_FORMAT),
  locales: Schema.Tuple(Schema.Literal("en"), Schema.Literal("id")),
  rowCount: CountSchema,
  rowDigest: Sha256HashSchema,
  slugCount: CountSchema,
};

/** Checks fixed catalog and localized public-slug completeness. */
function hasCompleteProgramSnapshot(input: {
  readonly rowCount: number;
  readonly slugCount: number;
}) {
  return (
    input.rowCount === PROGRAM_ROW_COUNT &&
    input.slugCount === PROGRAM_SLUG_COUNT
  );
}

/** Canonical program snapshot facts before content-addressed identity. */
export const ProgramSnapshotInputSchema = Schema.Struct(SnapshotFields).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected six program rows with complete en/id public slugs.",
  })
);
export type ProgramSnapshotInput = typeof ProgramSnapshotInputSchema.Type;

/** Content-addressed program snapshot selected by one global release. */
export const ProgramSnapshotSchema = Schema.Struct({
  ...SnapshotFields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected six program rows with complete en/id public slugs.",
  })
);
export type ProgramSnapshot = typeof ProgramSnapshotSchema.Type;
