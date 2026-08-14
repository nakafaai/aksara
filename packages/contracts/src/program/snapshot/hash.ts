import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  type ProgramSnapshot,
  type ProgramSnapshotFacts,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot/spec";

const SNAPSHOT_DOMAIN = "nakafa.aksara.localized-program-snapshot";

/** Node could not compute a deterministic program snapshot identity. */
export class ProgramSnapshotHashError extends Schema.TaggedError<ProgramSnapshotHashError>()(
  "ProgramSnapshotHashError",
  {}
) {}

/** Serializes current program facts in stable signed field order. */
export function canonicalizeProgramSnapshot(input: ProgramSnapshotFacts) {
  return JSON.stringify({
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
)((input: ProgramSnapshotFacts) =>
  Effect.try({
    catch: () => new ProgramSnapshotHashError(),
    try: () => {
      const snapshotId = Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${SNAPSHOT_DOMAIN}\n${canonicalizeProgramSnapshot(input)}`)
          .digest("hex")}`
      );
      return ProgramSnapshotSchema.make({
        ...input,
        format: PROGRAM_SNAPSHOT_FORMAT,
        snapshotId,
      });
    },
  })
);

/** Recomputes the content identity of one stored current snapshot. */
export function verifyProgramSnapshotHash(snapshot: ProgramSnapshot) {
  const { format: _format, snapshotId: _snapshotId, ...facts } = snapshot;
  return makeProgramSnapshot(facts).pipe(
    Effect.map((value) => value.snapshotId)
  );
}
