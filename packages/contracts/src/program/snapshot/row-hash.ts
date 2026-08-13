import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { CurriculumRoute } from "#contracts/program/curriculum";
import {
  CurriculumRouteRecordSchema,
  canonicalizeProgramSnapshotRow,
  LearningProgramRecordSchema,
  type ProgramSnapshotRow,
  type ProgramSnapshotRowInput,
} from "#contracts/program/snapshot/row";
import type { LearningProgram } from "#contracts/program/spec";

const ROW_DOMAIN = "nakafa.aksara.program-row";

/** Node could not compute one deterministic program row identity. */
export class ProgramRowHashError extends Schema.TaggedError<ProgramRowHashError>()(
  "ProgramRowHashError",
  { scope: Schema.Literal("digest", "row") }
) {}

/** Hashes one current program or curriculum row. */
function hashProgramRow(record: ProgramSnapshotRowInput) {
  return Effect.try({
    catch: () => new ProgramRowHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeProgramSnapshotRow(record)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one authenticated current program record. */
export const makeProgramSnapshotRow = Effect.fn(
  "AksaraContracts.makeProgramSnapshotRow"
)(function* (row: LearningProgram) {
  const input = { kind: "program", row } as const;
  const rowHash = yield* hashProgramRow(input);
  return LearningProgramRecordSchema.make({ ...input, rowHash });
});

/** Creates one authenticated current curriculum record. */
export const makeCurriculumSnapshotRow = Effect.fn(
  "AksaraContracts.makeCurriculumSnapshotRow"
)(function* (row: CurriculumRoute) {
  const input = { kind: "curriculum", row } as const;
  const rowHash = yield* hashProgramRow(input);
  return CurriculumRouteRecordSchema.make({ ...input, rowHash });
});

/** Recomputes one current row identity for streamed integrity checks. */
export function verifyProgramSnapshotRowHash(record: ProgramSnapshotRow) {
  const { rowHash: _rowHash, ...input } = record;
  return hashProgramRow(input);
}
