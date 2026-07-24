import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ProgramSnapshotInput } from "#contracts/program/snapshot";

const SNAPSHOT_DOMAIN = "nakafa.aksara.program-snapshot.v2";

/** Node could not compute a deterministic program snapshot identity. */
export class ProgramSnapshotHashError extends Schema.TaggedError<ProgramSnapshotHashError>()(
  "ProgramSnapshotHashError",
  {}
) {}

/** Serializes program snapshot facts in stable signed field order. */
export function canonicalizeProgramSnapshot(input: ProgramSnapshotInput) {
  return JSON.stringify({
    curriculumRowCount: input.curriculumRowCount,
    format: input.format,
    locales: input.locales,
    programRowCount: input.programRowCount,
    rowCount: input.rowCount,
    rowDigest: input.rowDigest,
    sitemapCount: input.sitemapCount,
    slugCount: input.slugCount,
  });
}

/** Computes the content identity of one complete program snapshot. */
export function hashProgramSnapshot(input: ProgramSnapshotInput) {
  return Effect.try({
    catch: () => new ProgramSnapshotHashError(),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${SNAPSHOT_DOMAIN}\n${canonicalizeProgramSnapshot(input)}`)
          .digest("hex")}`
      ),
  });
}
