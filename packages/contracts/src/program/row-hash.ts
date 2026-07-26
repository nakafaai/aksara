import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type CurriculumRoute,
  canonicalizeCurriculumRoute,
} from "#contracts/program/curriculum";
import {
  CurriculumRouteRecordSchema,
  LearningProgramRecordSchema,
  type ProgramSnapshotRow,
} from "#contracts/program/snapshot";
import {
  canonicalizeLearningProgram,
  type LearningProgram,
} from "#contracts/program/spec";

const ROW_DOMAIN = "nakafa.aksara.program-row.v3";

/** Node could not complete a deterministic aggregate program hash. */
export class ProgramHashError extends Schema.TaggedError<ProgramHashError>()(
  "ProgramHashError",
  { scope: Schema.Literal("digest", "row") }
) {}

/** Serializes one discriminated snapshot record without its derived hash. */
export function canonicalizeProgramSnapshotRow(record: ProgramSnapshotRow) {
  if (record.kind === "program") {
    return `{"kind":"program","row":${canonicalizeLearningProgram(record.row)}}`;
  }
  return `{"kind":"curriculum","row":${canonicalizeCurriculumRoute(record.row)}}`;
}

/** Computes one learning-program row's domain-separated identity. */
export function hashProgramRow(row: LearningProgram) {
  return Effect.try({
    catch: () => new ProgramHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(
            `${ROW_DOMAIN}\n{"kind":"program","row":${canonicalizeLearningProgram(row)}}`
          )
          .digest("hex")}`
      ),
  });
}

/** Computes one curriculum-route row's domain-separated identity. */
export function hashCurriculumRow(row: CurriculumRoute) {
  return Effect.try({
    catch: () => new ProgramHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(
            `${ROW_DOMAIN}\n{"kind":"curriculum","row":${canonicalizeCurriculumRoute(row)}}`
          )
          .digest("hex")}`
      ),
  });
}

/** Creates one immutable catalog record from a decoded program. */
export const makeProgramSnapshotRow = Effect.fn(
  "AksaraContracts.makeProgramSnapshotRow"
)(function* (row: LearningProgram) {
  const rowHash = yield* hashProgramRow(row);
  return LearningProgramRecordSchema.make({ kind: "program", row, rowHash });
});

/** Creates one immutable route record from a validated curriculum projection. */
export const makeCurriculumSnapshotRow = Effect.fn(
  "AksaraContracts.makeCurriculumSnapshotRow"
)(function* (row: CurriculumRoute) {
  const rowHash = yield* hashCurriculumRow(row);
  return CurriculumRouteRecordSchema.make({
    kind: "curriculum",
    row,
    rowHash,
  });
});
