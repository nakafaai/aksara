import { createHash } from "node:crypto";

import { Effect } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { CurriculumRouteV4 } from "#contracts/program/curriculum";
import { ProgramHashError } from "#contracts/program/row-hash";
import {
  CurriculumRouteV4RecordSchema,
  canonicalizeProgramSnapshotV4Row,
  type LearningProgramV4,
  LearningProgramV4RecordSchema,
  type ProgramSnapshotV4Row,
  type ProgramSnapshotV4RowInput,
} from "#contracts/program/v4";

const ROW_DOMAIN = "nakafa.aksara.program-row.v4";

/** Hashes one current program or curriculum row. */
function hashProgramV4Row(record: ProgramSnapshotV4RowInput) {
  return Effect.try({
    catch: () => new ProgramHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeProgramSnapshotV4Row(record)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one authenticated current program record. */
export const makeProgramSnapshotV4Row = Effect.fn(
  "AksaraContracts.makeProgramSnapshotV4Row"
)(function* (row: LearningProgramV4) {
  const input = { kind: "program-v4", row } as const;
  const rowHash = yield* hashProgramV4Row(input);
  return LearningProgramV4RecordSchema.make({ ...input, rowHash });
});

/** Creates one authenticated current curriculum record. */
export const makeCurriculumSnapshotV4Row = Effect.fn(
  "AksaraContracts.makeCurriculumSnapshotV4Row"
)(function* (row: CurriculumRouteV4) {
  const input = { kind: "curriculum-v4", row } as const;
  const rowHash = yield* hashProgramV4Row(input);
  return CurriculumRouteV4RecordSchema.make({ ...input, rowHash });
});

/** Recomputes one current row identity for streamed integrity checks. */
export function verifyProgramSnapshotV4RowHash(record: ProgramSnapshotV4Row) {
  const { rowHash: _rowHash, ...input } = record;
  return hashProgramV4Row(input);
}
