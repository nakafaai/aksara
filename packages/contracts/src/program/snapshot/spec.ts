import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";

/** Semantic wire identity of the current localized program snapshot. */
export const PROGRAM_SNAPSHOT_FORMAT = "localized-program-snapshot";

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

/** Checks aggregate arithmetic without coupling it to one corpus size. */
function hasCompleteProgramSnapshot(input: {
  readonly activeAppLocales: readonly string[];
  readonly curriculumRowCount: number;
  readonly programRowCount: number;
  readonly rowCount: number;
  readonly sitemapCount: number;
  readonly slugCount: number;
}) {
  return (
    input.programRowCount > 0 &&
    input.slugCount === input.programRowCount * input.activeAppLocales.length &&
    input.rowCount === input.programRowCount + input.curriculumRowCount &&
    input.sitemapCount <= input.curriculumRowCount
  );
}

const ProgramSnapshotFactFields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  ...ProgramCountFields,
  rowDigest: Sha256HashSchema,
};

/** Canonical current program facts before content-addressed identity. */
export const ProgramSnapshotFactsSchema = Schema.Struct(
  ProgramSnapshotFactFields
).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshotFacts = typeof ProgramSnapshotFactsSchema.Type;

/** Content-addressed current program snapshot selected by one release. */
export const ProgramSnapshotSchema = Schema.Struct({
  ...ProgramSnapshotFactFields,
  format: Schema.Literal(PROGRAM_SNAPSHOT_FORMAT),
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteProgramSnapshot, {
    message: () =>
      "Expected self-consistent program and curriculum snapshot counts.",
  })
);
export type ProgramSnapshot = typeof ProgramSnapshotSchema.Type;
