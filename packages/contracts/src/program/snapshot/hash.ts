import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import type { CurriculumRoute } from "#contracts/program/curriculum";
import {
  CurriculumRouteRecordSchema,
  canonicalizeProgramSnapshotRow,
  LearningProgramRecordSchema,
  type ProgramSnapshotRow,
  type ProgramSnapshotRowInput,
} from "#contracts/program/snapshot/row";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  type ProgramSnapshot,
  type ProgramSnapshotFacts,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot/spec";
import type { LearningProgram } from "#contracts/program/spec";
import { encodeJsonText } from "#contracts/text/json";

const SNAPSHOT_DOMAIN = "nakafa.aksara.localized-program-snapshot";
const ROW_DOMAIN = "nakafa.aksara.program-row";

/** Node could not compute a deterministic program snapshot identity. */
export class ProgramSnapshotHashError extends Schema.TaggedError<
  ProgramSnapshotHashError,
  { readonly brand: unique symbol }
>()("ProgramSnapshotHashError", {}) {}

/** Node could not compute one deterministic program row identity. */
export class ProgramRowHashError extends Schema.TaggedError<
  ProgramRowHashError,
  { readonly brand: unique symbol }
>()("ProgramRowHashError", { scope: Schema.Literals(["digest", "row"]) }) {}

/** Serializes current program facts in stable signed field order. */
export function canonicalizeProgramSnapshot(input: ProgramSnapshotFacts) {
  return encodeJsonText({
    activeAppLocales: input.activeAppLocales,
    curriculumRowCount: input.curriculumRowCount,
    format: PROGRAM_SNAPSHOT_FORMAT,
    programRowCount: input.programRowCount,
    rowCount: input.rowCount,
    rowDigest: input.rowDigest,
    sitemapCount: input.sitemapCount,
    slugCount: input.slugCount,
  });
}

/** Creates the content-addressed identity of one complete program snapshot. */
export const makeProgramSnapshot = Effect.fn(
  "AksaraContracts.makeProgramSnapshot"
)(function* (input: ProgramSnapshotFacts) {
  const snapshotId = yield* hashText(
    `${SNAPSHOT_DOMAIN}\n${canonicalizeProgramSnapshot(input)}`
  ).pipe(Effect.mapError(() => new ProgramSnapshotHashError()));
  return ProgramSnapshotSchema.make({
    ...input,
    format: PROGRAM_SNAPSHOT_FORMAT,
    snapshotId,
  });
});

/** Recomputes the content identity of one stored current snapshot. */
export function verifyProgramSnapshotHash(snapshot: ProgramSnapshot) {
  const { format: _format, snapshotId: _snapshotId, ...facts } = snapshot;
  return makeProgramSnapshot(facts).pipe(
    Effect.map((value) => value.snapshotId)
  );
}

/** Hashes one current program or curriculum row. */
function hashProgramRow(record: ProgramSnapshotRowInput) {
  return hashText(
    `${ROW_DOMAIN}\n${canonicalizeProgramSnapshotRow(record)}`
  ).pipe(Effect.mapError(() => new ProgramRowHashError({ scope: "row" })));
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
