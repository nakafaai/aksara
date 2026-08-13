import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  CurriculumRouteSchema,
  canonicalizeCurriculumRoute,
} from "#contracts/program/curriculum";
import {
  canonicalizeLearningProgram,
  LearningProgramSchema,
} from "#contracts/program/spec";

/** Hashed current learning-program catalog record. */
export const LearningProgramRecordSchema = Schema.Struct({
  kind: Schema.Literal("program"),
  row: LearningProgramSchema,
  rowHash: Sha256HashSchema,
});

/** Hashed current localized curriculum-route record. */
export const CurriculumRouteRecordSchema = Schema.Struct({
  kind: Schema.Literal("curriculum"),
  row: CurriculumRouteSchema,
  rowHash: Sha256HashSchema,
});

/** Complete row vocabulary owned by the current program snapshot. */
export const ProgramSnapshotRowSchema = Schema.Union(
  LearningProgramRecordSchema,
  CurriculumRouteRecordSchema
);
export type ProgramSnapshotRow = typeof ProgramSnapshotRowSchema.Type;
export type ProgramSnapshotRowInput =
  | Pick<typeof LearningProgramRecordSchema.Type, "kind" | "row">
  | Pick<typeof CurriculumRouteRecordSchema.Type, "kind" | "row">;

/** Serializes one current program snapshot row without its derived hash. */
export function canonicalizeProgramSnapshotRow(
  record: ProgramSnapshotRowInput
) {
  if (record.kind === "program") {
    return `{"kind":"program","row":${canonicalizeLearningProgram(record.row)}}`;
  }
  return `{"kind":"curriculum","row":${canonicalizeCurriculumRoute(record.row)}}`;
}
